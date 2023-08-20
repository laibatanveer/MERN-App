import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiCategory } from "react-icons/bi";
import axios from "axios";

const Sidebar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
    .get("https://localhost:3000/category/allCategories")  
      .then((response) => {
       
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  return (
    <aside
      className="shadow p-3 mt-4 bg-body-tertiary rounded h-80 "
      style={{
        backgroundColor: "#F7FBEF",
        padding: "6vh",
        paddingLeft: "8vh",
        borderRadius: "44% 44% 44% 44% / 38% 38% 38% 38%",
      }}
    >
      <h2
        style={{
          color: "black",
          fontSize: "20px",
          marginBottom: "16px",
          fontFamily: "Oswald",
        }}
      >
        <BiCategory style={{ marginRight: "8px" }} />
        Categories
      </h2>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          fontFamily: "Oswald",
        }}
      >
        {categories.map((category, index) => (
          <li
            key={index}
            style={{
              color: "black",
              fontSize: "100%",
              padding: "5vh 12vh",
              margin: "0, auto",
            }}
          >
            <Link
              to={`/products/category/${category.CategoryName}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              {category.CategoryName}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;

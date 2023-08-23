import React, { useState, useEffect } from "react";
// import { BsFillPencilFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import CategoryModal from "../components/CategoryModal";
import axios from "axios";

export default function Category() {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/category/allCategories")
      .then((json) => setCategory(json.data))
      .catch((error) => console.log(error));
  }, []);

  function deleteCategory(_id) {
    axios
      .delete(`http://localhost:3000/category/deleteCategory/${_id}`)
      .then((response) => {
        if (response.data.success) {
          setCategory(category.filter(val => val._id !== _id));
        } else {
          console.error("Error while deleting category.");
        }
      })
      .catch((error) => console.error("Error:", error));
  }

  

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center bg-primary p-2 my-3 rounded">
        <span className="fs-4 fw-bold text-white">CATEGORIES</span>
        <CategoryModal />
      </div>

      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Category Name</th>
              <th scope="col">Category Image</th>
            </tr>
          </thead>
          <tbody>
            {category.map((val, key) => (
              <tr key={key}>
                <th scope="row">{val._id}</th>
                <td>{val.CategoryName}</td>
                <td>
                  <img
                    src={val.CategoryImage}
                    className="img-fluid"
                    style={{ height: "5vh" }}
                    alt={val.CategoryName}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-dark mx-1"
                    onClick={() => deleteCategory(val._id)}
                  >
                    <AiFillDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

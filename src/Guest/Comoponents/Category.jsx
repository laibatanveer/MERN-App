import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Category() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("/api/category/allCategories")
      .then((json) => {
        setCategories(json.data);
      })
      .catch((err) => alert(err.message));
  }, []);

  return (
    <div className="container">
      <div className="my-5 text-center">
        <h2>CATEGORIES</h2>
      </div>

      <div className="row">
        {categories.map((category, index) => (
          <div className="col-md-4 my-4" key={index}>
            <Link
              className="text-decoration-none"
              to={`/products/category/${category.CategoryName}`}
            >
              <Card className="shadow p-2 mb-2 bg-body-tertiary rounded d-flex flex-column ">
                <div className="mt-auto ">
                  <Card.Img
                    variant="top"
                    className="img-fluid"
                    style={{ height: "40vh" }}
                    src={category.CategoryImage}
                  />
                </div>
                <Card.Body>
                  <Card.Title className="text-center ">
                    {category.CategoryName.toUpperCase()}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

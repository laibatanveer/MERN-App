import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "../Components/SideBar.jsx";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/products/allProducts")
      .then((json) => setProducts(json.data.Product))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="container d-flex">
      <div className="col-md-3 me-4 position-sticky">
        <Sidebar />
      </div>
      <div className="col-md-9">
        <div className="my-5 text-center">
          <h1 className="fw-bold">PRODUCTS</h1>
          <p className="text-secondary">
            Voluptatibus illum, laudantium earum sit saepe dolore aperiam vitae
            ullam iusto deserunt, ipsam asperiores temporibus! Quis
            exercitationem neque porro nisi saepe autem?
          </p>
        </div>

        <div className="row ">
          {products.map((product, index) => (
            <div className="col-md-4 my-4" key={index}>
              <Link
                className="text-decoration-none"
                to={`/products/${product._id}`}
              >
                <Card className="shadow rounded-top bg-light bg-gradient h-100">
                  <Card.Body>
                    <Card.Img
                      className="img-fluid"
                      src={product.ProductImage}
                      alt={product.ProductName}
                    />
                    <Card.Title className="text-center">
                      <hr />
                      <small>{product.ProductName.toUpperCase()}</small>
                      

                      <br />
                      <small className="fw-light fst-italic"> {product.brand}</small>
<br />
<br />
                      <small className="fw-light"> {product.price}Rs.</small>
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

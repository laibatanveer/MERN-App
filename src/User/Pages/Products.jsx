import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "../Components/SideBar.jsx";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:3000/products/allProducts")
      .then((response) => {
        // Use response.data.Product based on your provided API structure
        setProducts(response.data.Product);
      })
      .catch((error) => {
        console.error("There was an error fetching the products:", error);
      });
  }, []);

  return (
    <div className="container d-flex">
      <div className="col-md-3 me-4 position-sticky">
        <Sidebar/>
      </div>
      <div className="col-md-9">
        <div className="my-5 text-center">
          <h1 className="fw-bold">PRODUCTS</h1>
          <p className="text-secondary">
            Voluptatibus illum, laudantium earum sit saepe dolore aperiam vitae
            ullam iusto deserunt, ipsam asperiores temporibus! Quis exercitationem
            neque porro nisi saepe autem?
          </p>
        </div>

        <div className="row row-cols-1 row-cols-md-3 g-4">
          {products.map((product, index) => (
            <div className="col" key={index}>
              <Link
                className="text-decoration-none"
                to={`/products/${product._id}`}  
              >
                <Card className="rounded-top bg-light bg-gradient h-100">
                  <Card.Body>
                    <Card.Img
                      className="img-fluid"
                      src={product.ProductImage} 
                      alt={product.ProductName}  
                    />
                    <Card.Title className="text-center">
                      {product.ProductName.toUpperCase()} 
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

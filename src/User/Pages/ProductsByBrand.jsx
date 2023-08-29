import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Sidebar from "../Components/SideBar";
import Card from "react-bootstrap/Card";

export default function ProductsByBrand() {
  const [products, setProducts] = useState([]);
  const { brand } = useParams();

  useEffect(() => {
    axios
      .get(`/api/products/brand/${brand}`)
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.error("There was an error fetching the products:", error);
      });
  }, [brand]);

  return (
    <div className="container d-flex">
      <div className="col-md-3 me-4 position-sticky">
        <Sidebar />
      </div>
      <div className="col-md-9">
        <div className="my-5 text-center">
          <h1 className="fw-bold">{brand}</h1>
          <p className="text-secondary">
            Voluptatibus illum, laudantium earum sit saepe dolore aperiam vitae
            ullam iusto deserunt, ipsam asperiores temporibus! Quis
            exercitationem neque porro nisi saepe autem?
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
                      <hr />
                      <small>{product.ProductName.toUpperCase()}</small>

                      <br />
                      <small className="fw-light fst-italic">
                        {" "}
                        {product.brand}
                      </small>
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

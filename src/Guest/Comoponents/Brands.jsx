import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Brands() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/brands/allBrands")
      .then((response) => {
        setBrands(response.data.Brand);
      })
      .catch((err) => alert(err.message));
  }, []);

  return (
    <div className="container">
      <div className="my-5 text-center">
        <h2>BRANDS</h2>
      </div>

      <div className="row">
        {brands.map((brand, index) => (
          <div className="col-md-4 my-4" key={index}>
            <Link
              className="text-decoration-none"
              to={`/products/brand/${brand.BrandName}`}
            >
              <Card className="shadow p-2 mb-2 bg-body-tertiary rounded d-flex flex-column ">
                <div className="mt-auto ">
                  <Card.Img
                    variant="top"
                    className="card-image "
                    style={{ height: "50vh" }}
                    src={brand.BrandImage}
                  />
                </div>
                <Card.Body>
                  <Card.Title className="text-center ">
                    {brand.BrandName.toUpperCase()}
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

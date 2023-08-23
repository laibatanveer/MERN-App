import React, { useState, useEffect } from "react";
import BrandModal from "../components/BrandModal";
import axios from "axios";

export default function Brands() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/brands/allBrands")
      .then((json) => {
        setBrands(json.data);
      })

      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center bg-primary p-2 my-3 rounded">
        <span className="fs-4 fw-bold text-white">BRANDS</span>
        <BrandModal />
      </div>

      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Brand Name</th>
              <th scope="col">Brand Image</th>
            </tr>
          </thead>
           <tbody>
            {/* {brands.map((val, key) => (
              <tr key={key}>
                <th scope="row">{val._id}</th>
                <td>{val.BrandName}</td>
                <td><img src={val.BrandImage} className="img-fluid" style={{height:'5vh'}} alt={val.BrandName} /></td>
              </tr>
            ))} */}
            {Array.isArray(brands) &&
              brands.map((val, key) => (
                <tr key={key}>
                  <th scope="row">{val._id}</th>
                  <td>{val.BrandName}</td>
                  <td>
                    <img
                      src={val.BrandImage}
                      className="img-fluid"
                      style={{ height: "5vh" }}
                      alt={val.BrandName}
                    />
                  </td>
                </tr>
              ))}
          </tbody>  
      
        </table>
      </div>
    </div>
  );
}

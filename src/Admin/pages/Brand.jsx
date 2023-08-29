import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import BrandModal from "../components/BrandModal";
import { AiOutlineEdit, AiFillDelete } from "react-icons/ai";
import axios from "axios";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [currentBrand, setCurrentBrand] = useState(null);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = () => {
    axios
      .get("/api/brands/allBrands")
      .then((json) => {
        setBrands(json.data.Brand);
      })
      .catch((error) => console.log(error));
  };

  const updateBrand = (_id, updatedData) => {
    axios
      .put(`/api/brands/updateBrand/${_id}`, updatedData)
      .then((json) => {
        fetchBrands();
        setShowUpdateModal(false);
      })
      .catch((error) => console.error("Error:", error));
  };

  const deleteBrand = (id) => {
    axios
      .delete(`/api/brands/deleteBrand/${id}`)
      .then((json) => {
        fetchBrands();
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center bg-warning p-2 my-3 rounded">
        <span className="fs-4 fw-bold text-black">BRANDS</span>
        <BrandModal recallData={fetchBrands} />
      </div>

      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Brand Name</th>
              <th scope="col">Brand Image</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((val, key) => (
              <tr key={key}>
                <td>{val._id}</td>
                <td>{val.BrandName}</td>
                <td>
                  <img
                    src={val.BrandImage}
                    className="img-fluid"
                    style={{ height: "5vh" }}
                    alt={val.BrandName}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-warning mx-1"
                    onClick={() => {
                      setCurrentBrand(val);
                      setShowUpdateModal(true);
                    }}
                  >
                    <AiOutlineEdit />
                  </button>

                  <button
                    className="btn btn-dark mx-1"
                    onClick={() => deleteBrand(val._id)}
                  >
                    <AiFillDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showUpdateModal && (
        <BrandModal
          mode="edit"
          brand={currentBrand}
          onClose={() => setShowUpdateModal(false)}
          onSave={(updatedData) => {
            updateBrand(currentBrand._id, updatedData);
            setShowUpdateModal(false);
          }}
        />
      )}
    </div>
  );
}

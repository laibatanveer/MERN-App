import React, { useState, useEffect } from "react";
import { AiOutlineEdit, AiFillDelete } from "react-icons/ai";
import ProductModal from "../components/ProductModal";
import axios from "axios";
import { AppRoute } from "../../App";

export default function Products() {
  const [product, setProducts] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`${AppRoute}api/products/allProducts`)
      .then((json) => setProducts(json.data.Product))
      .catch((error) => console.log(error));
  }, []);

  function updateProduct(id, updatedData) {
    axios
      .put(
        `http://localhost:3000/api/products/updateProduct/${id}`,
        updatedData
      )
      .then((response) => {
        const updatedProducts = product.map((prod) =>
          prod._id === id ? { ...prod, ...updatedData } : prod
        );
        setProducts(updatedProducts);
      })
      .catch((error) => console.error("Error:", error));
  }

  function openEditModal(product) {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  }

  function deleteProduct(id) {
    axios
      .delete(`http://localhost:3000/api/products/deleteProduct/${id}`)
      .then((response) => {
        setProducts(response.data.product);
      })
      .catch((error) => console.error("Error:", error));
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center bg-warning p-2 my-3 rounded">
        <span className="fs-4 fw-bold text-black">PRODUCTS</span>
        <ProductModal recallData={setProducts} />
      </div>

      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Product Name</th>
              <th scope="col">Product Image</th>
              <th scope="col">Category</th>
              <th scope="col">Brand</th>
              <th scope="col">Price</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {product.map((val, key) => (
              <tr key={key}>
                <th scope="row">{val._id}</th>
                <td>{val.ProductName}</td>
                <td>
                  <img
                    src={val.ProductImage}
                    className="img-fluid"
                    style={{ height: "5vh" }}
                    alt={val.ProductName}
                  />
                </td>
                <td>{val.category}</td>
                <td>{val.brand}</td>
                <td>{val.price}</td>

                <td>
                  <button
                    className="btn btn-warning mx-1"
                    onClick={() => openEditModal(val)}
                  >
                    <AiOutlineEdit />
                  </button>
                  <button
                    className="btn btn-dark mx-1"
                    onClick={() => deleteProduct(val._id)}
                  >
                    <AiFillDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isEditModalOpen && (
        <ProductModal
          mode="edit"
          product={selectedProduct}
          onClose={() => setIsEditModalOpen(false)}
          onSave={(updatedData) => {
            updateProduct(selectedProduct._id, updatedData);
            setIsEditModalOpen(false);
          }}
        />
      )}
    </div>
  );
}

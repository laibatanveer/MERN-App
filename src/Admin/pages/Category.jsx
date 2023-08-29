import React, { useState, useEffect } from "react";
import { AiOutlineEdit, AiFillDelete } from "react-icons/ai";
import CategoryModal from "../components/CategoryModal";
import axios from "axios";

export default function Category() {
  const [category, setCategory] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    axios
      .get("/api/category/allCategories")
      .then((response) => setCategory(response.data))
      .catch((error) => console.log(error));
  }, []);

  function updateCategory(id, updatedData) {
    axios
      .put(
        `/api/category/updateCategory/${id}`,
        updatedData
      )
      .then((response) => {
        const updatedCategories = category.map((cat) =>
          cat._id === id ? { ...cat, ...updatedData } : cat
        );
        setCategory(updatedCategories);
      })
      .catch((error) => console.error("Error:", error));
  }

  function openEditModal(category) {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  }

  function deleteCategory(id) {
    axios
      .delete(`/api/category/deleteCategory/${id}`)
      .then((response) => {
        setCategory(response.data.category);
      })
      .catch((error) => console.error("Error:", error));
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center bg-warning p-2 my-3 rounded">
        <span className="fs-4 fw-bold text-black">CATEGORIES</span>
        <CategoryModal recallData={setCategory} />
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
                    className="btn btn-warning mx-1"
                    onClick={() => openEditModal(val)}
                  >
                    <AiOutlineEdit />
                  </button>
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

      {isEditModalOpen && (
        <CategoryModal
          mode="edit"
          category={selectedCategory}
          onClose={() => setIsEditModalOpen(false)}
          onSave={(updatedData) => {
            updateCategory(selectedCategory._id, updatedData);
            setIsEditModalOpen(false);
          }}
        />
      )}
    </div>
  );
}

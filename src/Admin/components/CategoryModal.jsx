import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { storage } from "../utils/FirebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function CategoryModal({
  mode,
  category,
  onClose,
  onSave,
  recallData,
}) {
  const [show, setShow] = useState(false);
  const [CategoryName, setCategoryName] = useState("");
  const [CategoryImage, setCategoryImage] = useState(null);

  useEffect(() => {
    if (mode === "edit" && category) {
      setCategoryName(category.CategoryName);
    }
  }, [category, mode]);

  const handleModalClose = () => {
    setShow(false);
    if (onClose) onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storageRef = ref(storage, `images/${CategoryImage.name}`);
    uploadBytes(storageRef, CategoryImage).then((snapshot) => {
      getDownloadURL(snapshot.ref)
        .then((url) => {
          const payload = {
            CategoryName,
            CategoryImage: url,
          };

          if (mode === "edit") {
            axios
              .put(
                `/api/category/updateCategory/${category._id}`,
                payload
              )
              .then((response) => {
                if (onSave) onSave(payload);
                handleModalClose();
              })
              .catch((error) => console.error(error.message));
          } else {
            axios
              .post(
                "/api/category/createCategory",
                payload
              )
              .then((response) => {
                if (recallData) recallData(response.data.category);
                handleModalClose();
              })
              .catch((error) => console.error(error.message));
          }
        })
        .catch((error) => console.error(error.message));
    });
  };

  return (
    <>
      {mode !== "edit" && (
        <Button variant="light text-black" onClick={() => setShow(true)}>
          Add Category
        </Button>
      )}

      <Modal
        show={show || mode === "edit"}
        onHide={handleModalClose}
        centered
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {mode === "edit" ? "Edit Category" : "Create Category"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="CategoryName" className="form-label">
                Category Name
              </label>
              <input
                value={CategoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                type="text"
                className="form-control"
                id="CategoryName"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                Category Image
              </label>
              <input
                className="form-control"
                onChange={(e) => setCategoryImage(e.target.files[0])}
                type="file"
                id="formFile"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

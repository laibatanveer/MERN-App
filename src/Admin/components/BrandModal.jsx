import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { storage } from "../utils/FirebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function BrandModal({
  mode,
  brand,
  onClose,
  onSave,
  recallData,
}) {
  const [show, setShow] = useState(false);
  const [BrandName, setBrandName] = useState("");
  const [BrandImage, setBrandImage] = useState(null);

  useEffect(() => {
    if (mode === "edit" && brand) {
      setBrandName(brand.BrandName);
    }
  }, [brand, mode]);

  const handleModalClose = () => {
    setShow(false);
    if (onClose) onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storageRef = ref(storage, `images/${BrandImage.name}`);
    uploadBytes(storageRef, BrandImage).then((snapshot) => {
      getDownloadURL(snapshot.ref)
        .then((url) => {
          const payload = {
            BrandName,
            BrandImage: url,
          };

          if (mode === "edit") {
            axios
              .put(
                `/api/brands/updateBrand/${brand._id}`,
                payload
              )
              .then((response) => {
                if (onSave) onSave(payload);
                handleModalClose();
              })
              .catch((error) => console.error(error.message));
          } else {
            axios
              .post("/api/brands/createBrand", payload)
              .then((response) => {
                if (recallData) recallData(response.data.Brand);
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
          Add Brand
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
            {mode === "edit" ? "Edit Brand" : "Add Brand"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="BrandName" className="form-label">
                Brand Name
              </label>
              <input
                value={BrandName}
                onChange={(e) => setBrandName(e.target.value)}
                type="text"
                className="form-control"
                id="BrandName"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                Brand Image
              </label>
              <input
                className="form-control"
                onChange={(e) => setBrandImage(e.target.files[0])}
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


import React, { useState } from "react";
import axios from "axios"; 
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { storage } from "../utils/FirebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function CategoryModal() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [CategoryName, setCategoryName] = useState("");
  const [CategoryImage, setCategoryImage] = useState(null);

  const AddCategory = (e) => {
    e.preventDefault();

    const storageRef = ref(storage, `images/${CategoryImage.name}`);

    uploadBytes(storageRef, CategoryImage).then((snapshot) => {
      getDownloadURL(snapshot.ref)
        .then((url) => {
          const payload = {
            CategoryName,
            CategoryImage: url,
          };

          axios
            .post("http://localhost:3000/category/createCategory", payload) 
            .then((response) => {
              console.log(response.data);
              handleClose(); 
            
            })
            .catch((error) => {
              console.log(error.message);
              
            });
        })
        .catch((error) => {
          console.log(error.message);
          
        });
    });
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Category
      </Button>

      <Modal show={show} onHide={handleClose} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>ADD CATEGORY</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={AddCategory}>
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

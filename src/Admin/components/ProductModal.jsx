import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { storage } from "../utils/FirebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function ProductModal({ recallData }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [ProductName, setProductName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [ProductImage, setProductImage] = useState(null);
  const [brandsList, setBrandsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/brands/allBrands").then((json) => {
      setBrandsList(json.data.Brand);
      setBrand(json.data.Brand[0].BrandName);
    });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/category/allCategories")
      .then((json) => {
        setCategoriesList(json.data);
        setCategory(json.data[0].CategoryName);
      });
  }, []);

  const AddProduct = (e) => {
    e.preventDefault();

    const storageRef = ref(storage, `images/${ProductImage.name}`);

    uploadBytes(storageRef, ProductImage).then((snapshot) => {
      getDownloadURL(snapshot.ref)
        .then((url) => {
          const payload = {
            ProductName,
            ProductImage: url,
            category,
            brand,
            price,
          };

          axios
            .post("http://localhost:3000/api/products/createProduct", payload)
            .then((response) => {
              console.log(response.data);
              recallData(response.data.Product);
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
      <Button variant="light text-black" onClick={handleShow}>
        Add Product
      </Button>

      <Modal show={show} onHide={handleClose} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title >ADD Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ,, jdtryiynn{" "}
          <form onSubmit={AddProduct}>
            <div className="mb-3">
              <label htmlFor="ProductName" className="form-label">
                Product Name
              </label>
              <input
                value={ProductName}
                onChange={(e) => setProductName(e.target.value)}
                type="text"
                className="form-control"
                id="ProductName"
              />
            </div>

            {/* <div className="mb-3">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                type="text"
                className="form-control"
                id="category"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="brand" className="form-label">
            Brand
              </label>
              <input
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                type="text"
                className="form-control"
                id="brand"
              />
            </div> */}
            <div className="mb-3">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-control"
                id="category"
              >
                {categoriesList.map((cat) => (
                  <option key={cat._id} value={cat.CategoryName}>
                    {cat.CategoryName}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="brand" className="form-label">
                Brand
              </label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="form-control"
                id="brand"
              >
                {brandsList.map((b) => (
                  <option key={b._id} value={b.BrandName}>
                    {b.BrandName}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="text"
                className="form-control"
                id="price"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                Product Image
              </label>
              <input
                className="form-control"
                onChange={(e) => setProductImage(e.target.files[0])}
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

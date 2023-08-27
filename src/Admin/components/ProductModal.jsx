import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { storage } from "../utils/FirebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function ProductModal({
  mode,
  product,
  onClose,
  onSave,
  recallData,
}) {
  const [show, setShow] = useState(false);
  const [ProductName, setProductName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [ProductImage, setProductImage] = useState(null);
  const [brandsList, setBrandsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);

  useEffect(() => {
    if (mode === "edit" && product) {
      setProductName(product.ProductName);
      setBrand(product.brand);
      setCategory(product.category);
      setPrice(product.price);
    }
  }, [product, mode]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/brands/allBrands").then((json) => {
      setBrandsList(json.data.Brand);
      if (!brand) setBrand(json.data.Brand[0].BrandName);
    });
  }, [brand]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/category/allCategories")
      .then((json) => {
        setCategoriesList(json.data);
        if (!category) setCategory(json.data[0].CategoryName);
      });
  }, [category]);

  const handleModalClose = () => {
    setShow(false);
    if (onClose) onClose();
  };

  const handleSubmit = (e) => {
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

          if (mode === "edit") {
            axios
              .put(
                `http://localhost:3000/api/products/updateProduct/${product._id}`,
                payload
              )
              .then((response) => {
                if (onSave) onSave(payload);
                handleModalClose();
              })
              .catch((error) => {
                console.error(error.message);
              });
          } else {
            axios
              .post("http://localhost:3000/api/products/createProduct", payload)
              .then((response) => {
                if (recallData) recallData(response.data.Product);
                handleModalClose();
              })
              .catch((error) => {
                console.error(error.message);
              });
          }
        })
        .catch((error) => {
          console.error(error.message);
        });
    });
  };

  return (
    <>
      {mode !== "edit" && (
        <Button variant="light text-black" onClick={() => setShow(true)}>
          Add Product
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
            {mode === "edit" ? "Edit Product" : "Create Product"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
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

import React, { useContext, useState, useRef } from "react";
import { GlobalContext } from "../../Context/context";
import { decodeToken } from "react-jwt";
import { CartContext } from "../CartContext/context";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Swal from "sweetalert2";

export default function Cart() {
  const { cart_state, cart_dispatch } = useContext(CartContext);
  const { state } = useContext(GlobalContext);

  const total = cart_state?.cart?.reduce(
    (accumulator, Product) =>
      accumulator + Product.price * Product.productQuantity,
    0
  );

  const user = decodeToken(state.token);
  const modalRef = useRef();

  const removeFromCart = (productId) => {
    cart_dispatch({ type: "REMOVE_FROM_CART", payload: productId });
    console.log(productId);
  };

  const checkout = () => {
    if (
      !modalData.customerAddress ||
      !modalData.customerContact ||
      !modalData.customerEmail
    ) {
      Swal.fire({
        title: "Error!",
        text: "All fields are required.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const payload = {
      order: cart_state.cart,
      totalBill: total,
      customerAddress: modalData.customerAddress,
      customerContact: modalData.customerContact,
      customerName: modalData.customerName,
      customerEmail: modalData.customerEmail,
      customerId: user._id,
    };

    axios
      .post("http://localhost:3000/api/order/placeOrder", payload)
      .then((response) => {
        if (response.data.success) {
          cart_dispatch({ type: "CLEAR_CART" });
          Swal.fire({
            title: "Success!",
            text: response.data.message,
            icon: "success",
            confirmButtonText: "Continue Exploring",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: response.data.message || "Error placing order.",
            icon: "error",
            confirmButtonText: "Try Again",
          });
        }
      })
      .catch((err) => {
        console.error("Error placing order:", err);
        Swal.fire({
          title: "Error!",
          text: "Error placing order. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setModalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [modalData, setModalData] = useState({
    customerName: user.username,
    customerEmail: user.email,
    customerContact: "",
    customerAddress: "",
  });

  return (
    <div className="container">
      <h2 className="text-center">Cart</h2>
      <p className="text-center text-secondary">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia eius
        totam nostrum voluptatibus culpa accusamus.
      </p>

      {cart_state.cart?.length > 0 ? (
        <>
          {/* <div
            className="modal fade"
            id="orderModal"
            tabIndex="-1"
            aria-labelledby="orderModalLabel"
            aria-hidden="true"
            role="dialog"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="orderModalLabel">
                    Enter Your Details
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="customerName"
                        value={modalData.customerName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="customerEmail"
                        value={modalData.customerEmail}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Contact</label>
                      <input
                        type="text"
                        className="form-control"
                        name="customerContact"
                        value={modalData.customerContact}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Address</label>
                      <textarea
                        className="form-control"
                        name="customerAddress"
                        value={modalData.customerAddress}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      setShowModal(false);
                      checkout();
                    }}
                  >
                    Confirm and Place Order
                  </button>
                </div>
              </div>
            </div>
          </div> */}
          <Modal  >
                <Modal.Header closeButton>
                  <Modal.Title>Order</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                 
                </Modal.Body>
              </Modal>

          {cart_state.cart.map((product, key) => (
            <div
              className="card mb-4 d-flex bg-shadow bg-rounded"
              style={{ width: "70vw", height: "40vh" }}
              key={key}
            >
              <div className="row ">
                <div className="col-md-2 d-flex justify-content-center align-items-center">
                  <img
                    src={product.ProductImage}
                    alt={product.productName}
                    className="img-fluid rounded-start"
                    style={{ height: "25vh", objectFit: "contain" }}
                  />
                </div>
                <div className="col-md-6">
                  <div className="card-body">
                    <h5 className="card-title">
                      {product.productName} - {product.price}
                    </h5>
                    <p className="card-text">
                      Quantity: {product.productQuantity}
                    </p>
                  </div>
                </div>
                <div className="col-md-2">
                  <p>Total: {product.productQuantity * product.price} </p>
                </div>

                <div className="col-md-2 d-flex justify-content-center align-items-center">
                  <button
                    className="btn btn-danger"
                    onClick={() => removeFromCart(product._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="d-flex justify-content-between my-3">
            <h3>Total</h3>
            <h3>{total}</h3>
          </div>
          <button
            className="btn btn-warning w-100"
            data-toggle="modal"
            data-target="#orderModal"
          >
            Place Order
          </button>
        </>
      ) : (
        <div className="text-center my-5 text-muted">
          <h3>No Items in the Cart</h3>
        </div>
      )}
    </div>
  );
}


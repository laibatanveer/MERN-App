

import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Swal from "sweetalert2";
import { CartContext } from "../CartContext/context";
import { GlobalContext } from "../../Context/context";
import { decodeToken } from "react-jwt";

function PlaceOrder() {
  const { cart_state, cart_dispatch } = useContext(CartContext);
  const { state } = useContext(GlobalContext);
  const user = decodeToken(state.token);

  const [show, setShow] = useState(false);

  const [modalData, setModalData] = useState({
    customerName: user.username,
    customerEmail: user.email,
    customerContact: "",
    customerAddress: "",
  });

  const total = cart_state?.cart?.reduce(
    (accumulator, Product) =>
      accumulator + Product.price * Product.productQuantity,
    0
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setModalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
      ...modalData,
      customerId: user._id,
    };

    axios
      .post("/api/order/placeOrder", payload)
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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="primary"
        className="btn btn-warning w-100"
        onClick={handleShow}
      >
        Place Order
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="customerName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="customerName"
                value={modalData.customerName}
                onChange={handleInputChange}
                placeholder="Enter your name"
              />
            </Form.Group>

            <Form.Group controlId="customerAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="customerAddress"
                value={modalData.customerAddress}
                onChange={handleInputChange}
                placeholder="Enter your address"
              />
            </Form.Group>

            <Form.Group controlId="customerContact">
              <Form.Label>Contact</Form.Label>
              <Form.Control
                type="text"
                name="customerContact"
                value={modalData.customerContact}
                onChange={handleInputChange}
                placeholder="Enter your contact number"
              />
            </Form.Group>
          </Form>
          <button className="btn btn-warning w-100 mt-2" onClick={checkout}>
            Confirm
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PlaceOrder;

import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../Context/context";
import Cookies from "js-cookie";
import axios from "axios";

function UserNav() {
  // const { _id } = useParams();

  const { state, dispatch } = useContext(GlobalContext);

  const [showModal, setShowModal] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);

  const handleTrackOrder = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/order/${orderId}`
      );
      setOrderDetails(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Error tracking order:", error);
    }
  };

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const bgImg =
    "https://image.slidesdocs.com/responsive-images/background/plant-floral-clean-line-yellow-nature-powerpoint-background_324e1ddf60__960_540.jpg";

  return (
    <Navbar
      className="shadow-sm"
      expand="lg"
      style={{
        fontFamily: "Oswald",
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "20vw, 40vh",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container>
        <Link className="navbar-brand" to="/">
          <pre>
            <h1 className="fw-bold fst-italic">.beautify</h1>
          </pre>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link className="nav-link fw-normal" to="/">
              <h4>Home</h4>
            </Link>
            <Link className="nav-link fw-normal" to="/category">
              <h4>Categories</h4>
            </Link>
            <Link className="nav-link fw-normal" to="/brands">
              <h4>Brands</h4>
            </Link>
            <Link className="nav-link fw-normal me-5" to="/products">
              <h4>Products</h4>
            </Link>
         

            <div className="d-flex gap-3">
              <Link
                to="/profile"
                className="btn d-flex align-items-center gap-3"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
                  style={{ height: "3vh", objectFit: "contain" }}
                  alt=""
                />
                <h4> Profile</h4>
              </Link>
              <button className="btn ">
                <h4>
                  <Link to="/cart" className="text-black">
                    Cart
                  </Link>
                </h4>
              </button>

              <button className="btn " onClick={handleShow}>
                <h4>Track order</h4>
              </button>

              <Modal show={showModal} onHide={handleClose}>
    <Modal.Header closeButton>
        <Modal.Title>Order Details</Modal.Title>
    </Modal.Header>
    <Modal.Body className="text-center">
        <input
            className="bg-rounded bg-shadow mb-3"
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Enter Order ID"
        />
        <Button className="btn btn-warning ms-2" onClick={handleTrackOrder}>
            Fetch Order
        </Button>

        {orderDetails && (
            <div className="mt-3">
                <h5>Customer Details</h5>
                <p><strong>Name:</strong> {orderDetails.customerName}</p>
                <p><strong>Email:</strong> {orderDetails.customerEmail}</p>
                <p><strong>Contact:</strong> {orderDetails.customerContact}</p>
                <p><strong>Address:</strong> {orderDetails.customerAddress}</p>

                <h5 className="mt-4">Ordered Products</h5>
                {orderDetails.order.map(product => (
                    <div key={product._id} className="text-center card mt-3">
                        <div className="card-body">
                            <img src={product.ProductImage} alt={product.ProductName} style={{ width: '50px', marginRight: '20px' }} />
                            <p><strong>Product Name:</strong> {product.ProductName}</p>
                            <p><strong>Brand:</strong> {product.brand}</p>
                            <p><strong>Category:</strong> {product.category}</p>
                            <p><strong>Price:</strong> ${product.price}</p>
                            <p><strong>Quantity:</strong> {product.productQuantity}</p>
                            <p><strong>Total Price:</strong> ${product.totalPrice}</p>
                            <p><strong>Status:</strong> Processing</p>

                        </div>
                    </div>
                ))}
                <p><strong>Order Date:</strong> {new Date(orderDetails.order_at).toLocaleDateString()}</p>
            </div>
        )}
    </Modal.Body>
</Modal>


              <button
                className="btn btn-dark"
                onClick={() => {
                  Cookies.remove("token");
                  dispatch({ type: "LOGOUT" });
                }}
              >
                Sign Out
              </button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default UserNav;

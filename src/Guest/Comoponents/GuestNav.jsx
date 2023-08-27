import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function GuestNav() {
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
            <Link className="nav-link fw-normal" to="/products">
              <h4>Products</h4>
            </Link>
            <Link className="ms-2 nav-link fw-normal" to="/signup">
              <h4>SignUp</h4>
            </Link>
            <Link className="btn btn-dark mt-1 ms-2" to="/login">
              <h5>Login</h5>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default GuestNav;

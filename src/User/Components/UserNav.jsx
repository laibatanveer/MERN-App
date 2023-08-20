import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../Context/context'
import Cookies from 'js-cookie';


function UserNav() {
    const { state, dispatch } = useContext(GlobalContext)

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
            <Link className="nav-link fw-normal" to="/products">
              <h4>Products</h4>
            </Link>
            <div className="d-flex gap-3">
                        <Link to='/profile' className="btn d-flex align-items-center gap-3">
                            <img src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png" style={{ height: '3vh', objectFit: 'contain' }} alt="" />
                           <h4> Profile</h4>
                        </Link>
                        <button className='btn '><h4><Link to='/cart' className='text-black'>Cart</Link></h4></button>

                        <button className="btn btn-dark"
                            onClick={() => {
                                Cookies.remove('token')
                                dispatch({ type: "LOGOUT" })
                            }}

                        >Sign Out</button>
                    </div>
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default UserNav;

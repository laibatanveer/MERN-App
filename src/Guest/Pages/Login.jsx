import React, { useContext, useState } from "react";
import { FaUserAlt, FaUserLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { GlobalContext } from "../../Context/context";
import Cookies from "js-cookie";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { state, dispatch } = useContext(GlobalContext);

  const handleLogin = (e) => {
    e.preventDefault();

    const payload = { email, password };
    axios
      .post("http://localhost:3000/api/registration/login", payload)
      .then((json) => {
        Cookies.set("token", json.data.token);

        dispatch({
          type: "LOGIN",
          token: json.data.token,
        });

        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: "You have successfully logged in.",
        });
      })
      .catch((error) => {
        console.error(error);

        Swal.fire({
          icon: "error",
          title: "Login Failed!",
          text: error.response
            ? error.response.data.message
            : "Something went wrong. Please try again.",
        });
      });
  };
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="card rounded-5 shadow-lg p-3 mb-5 bg-body-tertiary rounded">
        <div
          className="card-body rounded-5 "
          style={{
            height: "45vh",
          }}
        >
          <h3 className="text-center mb-4">LOGIN</h3>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">
                {" "}
                <FaUserAlt /> Email
              </label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control rounded-pill"
                  id="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="password">
                <FaUserLock /> Password
              </label>
              <div className="input-group">
                <input
                  type="password"
                  className="form-control rounded-pill"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 btn btn-success btn-block position-absolute top-60 start-50 translate-middle"
            >
              Login
            </button>
          </form>
          <p className="mt-5 text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-decoration-none">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

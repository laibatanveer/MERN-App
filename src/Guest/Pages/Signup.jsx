import React, { useState, useContext } from "react";
import { RiMailFill } from "react-icons/ri";
import { FaUserAlt, FaUserLock } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import { GlobalContext } from '../../Context/context'

function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const { dispatch } = useContext(GlobalContext);

  const handleSignUp = (e) => {
    e.preventDefault();
    const payload = { username, email, password, role };

    axios
      .post("http://localhost:3000/api/registration/signup", payload)
      .then((response) => {
        console.log(response.data);

        // Let's say the response contains a JWT token. You would update your global state like:
        dispatch({ type: "SET_TOKEN", payload: response.data.token });

        Swal.fire({
          icon: "success",
          title: "DONE!",
          text: "You have successfully signed up.",
        });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Signup Failed!",
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
          className="card-body rounded-5"
          style={{
            height: "50vh",
            width: "20vw",
          }}
        >
          <h3 className="text-center fw-bold mb-4">SIGN UP</h3>
          <form onSubmit={handleSignUp}>
            <div className="form-group">
              <label htmlFor="username">
                <FaUserAlt /> Username
              </label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control rounded-pill"
                  id="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="current-password"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email">
                <RiMailFill /> Email
              </label>
              <div className="input-group">
                <input
                  type="email"
                  className="form-control rounded-pill"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="current-password"
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
                  autoComplete="current-password"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                className="form-control"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              className="mt-4 btn btn-success btn-block position-absolute top-60 start-50 translate-middle"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;

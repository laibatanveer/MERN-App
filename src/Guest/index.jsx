import React from "react";
import GuestNav from "./Comoponents/GuestNav";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUpPage from "./Pages/Signup";

export default function Guest() {
  return (
    <>
      <GuestNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpPage />} />

        <Route path="*" element={<Navigate to="/login" replace={true} />} />
      </Routes>
    </>
  );
}

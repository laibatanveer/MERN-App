import React from "react";
import Sidebar from "./components/Sidebar";
import Category from "./pages/Category";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";

export default function Admin() {
  return (
    <>
      <div className="container row">
        <div className="col-md-3 m-0 p-0 bg-dark" style={{ height: "100vh" }}>
          <Sidebar />
        </div>
        <div className="col-md-9">
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/category" element={<Category />}/>
            <Route path="*" element={<Home/>}/>
          </Routes>
        </div>
      </div>
    </>
  );
}

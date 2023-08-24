import React, { useEffect,useContext } from "react";
import { FiHome } from "react-icons/fi";
import { BiCategoryAlt } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import { GlobalContext } from '../../Context/context'


export default function Sidebar() {
  const location = useLocation();
  const { state, dispatch } = useContext(GlobalContext)

  const NavItems = [
    {
      tab: "Home",
      url: "/",
      icon: <FiHome />,
    },

    {
      tab: "Category",
      url: "/category",
      icon: <BiCategoryAlt />,
    },
    {
      tab: "Brand",
      url: "/brand",
      icon: <BiCategoryAlt />,
    },
    ,
    {
      tab: "Products",
      url: "/products",
      icon: <BiCategoryAlt />,
    },
  ];

  return (
    <>
      <div className="bg-warning p-3 d-flex justify-content-between align-items-center text-black">
        <span>Admin Name</span>
        <button className="btn btn-light"
         onClick={() => dispatch({ type: "LOGOUT" })}>Log Out</button>
      </div>
      <ul className="nav flex-column bg-light">
        {NavItems.map((val) => (
          <li
            key={val.url}
            className={`nav-item m-2 bg-light ${
              location.pathname == val.url ? "bg-white rounded" : null
            }`}
          >
            <Link
              to={val.url}
              className="nav-link d-flex align-items-center gap-2 "
            >
              {val.icon}
              {val.tab}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

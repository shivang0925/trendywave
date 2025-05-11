import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const itemSelected = useSelector((state) => state.cart);
  const isLoggedIn = !!localStorage.getItem("loggedInUser");

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
    window.location.reload(); // force UI to reflect logout
  };

  return (
    <div className="navbar">
      <span className="logo">TRENDYwave</span>
      <div className="navLinks">
        <Link className="navLink" to="/">
          Home
        </Link>
        <Link className="navLink" to="/cart">
          Cart
        </Link>
        <span className="cartCount">Cart items: {itemSelected.length}</span>

        {isLoggedIn && (
          <button className="logoutBtn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;

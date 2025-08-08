import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/NavbarStyles.css";

const Navbar = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <nav className="navbar">
      <h1>My Shop</h1>
      <div>
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;

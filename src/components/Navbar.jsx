import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { cart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">🛒 MyShop</Link>
      </div>

      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        </li>
        <li>
          <Link to="/orders" onClick={() => setMenuOpen(false)}>Orders</Link>
        </li>
        <li>
          <Link to="/cart" onClick={() => setMenuOpen(false)}>
            Cart ({cart.length})
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

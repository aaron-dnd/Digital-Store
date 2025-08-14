import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "../styles/Navbar.css";

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container">
        {/* Logo */}
        <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
          <span className="gradient-text">Digital</span>Store
        </Link>

        {/* Hamburger icon */}
        <div
          className={`burger ${menuOpen ? "active" : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Nav links */}
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link
            to="/"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/products"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Products
          </Link>
          <Link
            to="/cart"
            className="nav-link cart-link"
            onClick={() => setMenuOpen(false)}
          >
            Cart
            <span className="cart-count">{cart.length}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

// src/components/Header.jsx
import React, { useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, User, Heart, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import CartDropdown from "./CartDropdown";
import "./Header.css";

const Header = () => {
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { totalItems, dispatch } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();

  const shopCategories = [
    "All Products",
    "Paintings",
    "Return Gifts",
    "Workshops",
    "Custom Orders",
    "Digital Prints",
    "Handcrafted Items",
    "Limited Editions",
  ];

  const handleCartClick = () => {
    if (dispatch) dispatch({ type: "TOGGLE_CART" });
  };

  const handleNavClick = () => {
    setIsOpen(false);
    setIsShopDropdownOpen(false);
  };

  const toggleNavbar = () => setIsOpen((v) => !v);

  // Consider shop "active" on any /shop route (including /shop/category/...)
  const isShopActive = location.pathname.startsWith("/shop");

  return (
    <header className="shadow-sm fixed-top bg-white">
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          {/* Logo */}
          <Link className="navbar-brand d-flex align-items-center" to="/" onClick={handleNavClick}>
            <motion.div
              className="d-flex align-items-center justify-content-center rounded-circle bg-danger text-white fw-bold me-2"
              style={{ width: "48px", height: "48px" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              P
            </motion.div>
            <div>
              <h1 className="h4 mb-0">PnpArtStudio</h1>
              <small className="text-muted">Original Paintings & Art</small>
            </div>
          </Link>

          {/* Toggler: hidden on lg and up */}
          <button
            className="navbar-toggler d-lg-none d-flex align-items-center justify-content-center"
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={isOpen ? "true" : "false"}
            aria-controls="navbarNav"
            onClick={toggleNavbar}
          >
            {isOpen ? <X size={24} /> : <span className="navbar-toggler-icon" />}
          </button>

          {/* Nav Links */}
          <div id="navbarNav" className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  end
                  to="/"
                  onClick={handleNavClick}
                  className={({ isActive }) => `nav-link nav-hover ${isActive ? "active" : ""}`}
                >
                  Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/about"
                  onClick={handleNavClick}
                  className={({ isActive }) => `nav-link nav-hover ${isActive ? "active" : ""}`}
                >
                  About Us
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/art-classes"
                  onClick={handleNavClick}
                  className={({ isActive }) => `nav-link nav-hover ${isActive ? "active" : ""}`}
                >
                  Art Classes
                </NavLink>
              </li>

              {/* Shop Dropdown (hover on desktop, click toggles too) */}
              <li
                className="nav-item dropdown"
                onMouseEnter={() => setIsShopDropdownOpen(true)}
                onMouseLeave={() => setIsShopDropdownOpen(false)}
              >
                <Link
                  id="shopDropdown"
                  className={`nav-link dropdown-toggle nav-hover ${isShopActive ? "active" : ""}`}
                  to="#"
                  role="button"
                  aria-expanded={isShopDropdownOpen ? "true" : "false"}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsShopDropdownOpen((v) => !v);
                  }}
                >
                  Shop
                </Link>

                <ul className={`dropdown-menu ${isShopDropdownOpen ? "show" : ""}`} aria-labelledby="shopDropdown">
                  {shopCategories.map((category) => {
                    const to =
                      category === "All Products"
                        ? "/shop"
                        : `/shop/category/${category.toLowerCase().replace(/\s+/g, "-")}`;

                    return (
                      <li key={category}>
                        <NavLink
                          to={to}
                          onClick={handleNavClick}
                          className={({ isActive }) =>
                            `dropdown-item nav-hover ${isActive ? "active" : ""}`
                          }
                          end={category === "All Products"}
                        >
                          {category}
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/gallery"
                  onClick={handleNavClick}
                  className={({ isActive }) => `nav-link nav-hover ${isActive ? "active" : ""}`}
                >
                  Gallery
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/blog"
                  onClick={handleNavClick}
                  className={({ isActive }) => `nav-link nav-hover ${isActive ? "active" : ""}`}
                >
                  Blog
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/contact"
                  onClick={handleNavClick}
                  className={({ isActive }) => `nav-link nav-hover ${isActive ? "active" : ""}`}
                >
                  Contact
                </NavLink>
              </li>
            </ul>

            {/* Right-side actions in a row */}
            <ul className="navbar-nav ms-3 d-flex align-items-center flex-row gap-2 mt-2 mt-lg-0">
              {/* Wishlist */}
              <li className="nav-item">
                <NavLink
                  to="/wishlist"
                  className={({ isActive }) =>
                    `nav-link d-flex align-items-center nav-hover ${isActive ? "active" : ""}`
                  }
                  onClick={handleNavClick}
                >
                  <Heart size={20} />
                </NavLink>
              </li>

              {/* Cart */}
              <li className="nav-item position-relative">
                <button
                  className="btn nav-link position-relative d-flex align-items-center nav-hover"
                  onClick={handleCartClick}
                >
                  <ShoppingCart size={20} />
                  {totalItems > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {totalItems}
                    </span>
                  )}
                </button>
                <CartDropdown />
              </li>

              {/* User */}
              <li className="nav-item">
                {user ? (
                  <div className="d-flex align-items-center">
                    {user.avatar && (
                      <img
                        src={user.avatar}
                        alt={user.name || "User"}
                        className="rounded-circle me-2"
                        width="32"
                        height="32"
                      />
                    )}
                    <button
                      onClick={() => {
                        logout();
                        handleNavClick();
                      }}
                      className="btn btn-outline-danger btn-sm"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      `nav-link d-flex align-items-center nav-hover ${isActive ? "active" : ""}`
                    }
                    onClick={handleNavClick}
                  >
                    <User size={20} />
                  </NavLink>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  User,
  Heart,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import CartDropdown from "./CartDropdown";

const Header = () => {
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const { totalItems, dispatch } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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
    if (dispatch) {
      dispatch({ type: "TOGGLE_CART" });
    }
  };

  return (
    <header className="shadow-sm fixed-top bg-white">
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          {/* Logo */}
          <Link className="navbar-brand d-flex align-items-center" to="/">
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

          {/* Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Nav Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About Us</Link>
              </li>

              {/* Shop Dropdown */}
              <li
                className="nav-item dropdown"
                onMouseEnter={() => setIsShopDropdownOpen(true)}
                onMouseLeave={() => setIsShopDropdownOpen(false)}
              >
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  role="button"
                  aria-expanded={isShopDropdownOpen ? "true" : "false"}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsShopDropdownOpen(!isShopDropdownOpen);
                  }}
                >
                  Shop
                </Link>

                <ul
                  className={`dropdown-menu ${isShopDropdownOpen ? "show" : ""}`}
                  aria-labelledby="shopDropdown"
                >
                  {shopCategories.map((category) => (
                    <li key={category}>
                      <Link
                        className="dropdown-item"
                        to={
                          category === "All Products"
                            ? "/shop"
                            : `/shop/category/${category
                                .toLowerCase()
                                .replace(/\s+/g, "-")}`
                        }
                      >
                        {category}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/gallery">Gallery</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/blog">Blog</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact</Link>
              </li>
            </ul>

            {/* Right Side Actions */}
            <ul className="navbar-nav ms-3 d-flex align-items-center">
              {/* Wishlist */}
              <li className="nav-item">
                <Link to="/wishlist" className="nav-link">
                  <Heart size={20} />
                </Link>
              </li>

              {/* Cart */}
              <li className="nav-item position-relative">
                <button
                  className="btn nav-link position-relative"
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
                      onClick={logout}
                      className="btn btn-outline-danger btn-sm"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link to="/login" className="nav-link">
                    <User size={20} />
                  </Link>
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

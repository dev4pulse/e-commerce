// src/components/Header.jsx
import React, { useEffect, useRef, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, User, Heart, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import CartDropdown from "./CartDropdown";
import "./Header.css";

// Logo image
import logo from "../assets/pnplogo.png";

const Header = () => {
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [canHover, setCanHover] = useState(false); // true on desktop/trackpad
  const dropdownRef = useRef(null);

  const { totalItems, dispatch } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Detect hover-capable pointers (desktops/laptops)
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanHover(mq.matches);
    update();
    if (mq.addEventListener) mq.addEventListener("change", update);
    else mq.addListener(update);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", update);
      else mq.removeListener(update);
    };
  }, []);

  // Close Shop dropdown when clicking outside or navigating
  useEffect(() => {
    const onDocClick = (e) => {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(e.target)) setIsShopDropdownOpen(false);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  useEffect(() => {
    // Close menus on route change
    setIsShopDropdownOpen(false);
    setIsOpen(false);
  }, [location.pathname]);

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
          {/* Brand: logo links to home (left) */}
          <Link className="navbar-brand d-flex align-items-center" to="/" onClick={handleNavClick}>
            <motion.img
              src={logo}
              alt="PnpArtStudio — by Priyanka Vasishta"
              className="brand-logo me-2"
              height={80}
              width={80}
              loading="eager"
              decoding="async"
              fetchpriority="high"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            />
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

          {/* Collapsible area holds the centered nav (middle) and actions (right) */}
          <div id="navbarNav" className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
            {/* Centered nav on lg+: wrap in a flex-grow container and center its content */}
            <div className="flex-grow-1 d-lg-flex justify-content-center">
              <ul className="navbar-nav mb-2 mb-lg-0 gap-lg-1">
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
                <li className="nav-item">
                  <NavLink
                    to="/custom-order"
                    onClick={handleNavClick}
                    className={({ isActive }) => `nav-link nav-hover ${isActive ? "active" : ""}`}
                  >
                    Custom Art
                  </NavLink>
                </li>

                {/* Shop Dropdown */}
                <li
                  ref={dropdownRef}
                  className={`nav-item dropdown ${canHover ? "" : "dropdown-center"}`}
                  onMouseEnter={canHover ? () => setIsShopDropdownOpen(true) : undefined}
                  onMouseLeave={canHover ? () => setIsShopDropdownOpen(false) : undefined}
                >
                  <Link
                    id="shopDropdown"
                    className={`nav-link dropdown-toggle nav-hover ${isShopActive ? "active" : ""}`}
                    to="#"
                    role="button"
                    aria-expanded={isShopDropdownOpen ? "true" : "false"}
                    onClick={(e) => {
                      // Mobile/tablet: open on first tap, close on second
                      e.preventDefault();
                      setIsShopDropdownOpen((open) => !open);
                    }}
                  >
                    <span className="shop-label">
                      Shop
                      {/* Inline arrow keeps it BESIDE the text, never below */}
                      <span className={`caret-inline ${canHover ? "" : "caret-mobile"}`}>▾</span>
                    </span>
                  </Link>

                  <ul
                    className={`dropdown-menu ${isShopDropdownOpen ? "show" : ""}`}
                    aria-labelledby="shopDropdown"
                  >
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
            </div>

            {/* Right-side actions (stay at the right) */}
            <ul className="navbar-nav ms-lg-3 d-flex align-items-center flex-row gap-2 gap-mobile-icons mt-2 mt-lg-0">
              {/* Wishlist */}
              <li className="nav-item">
                <NavLink
                  to="/wishlist"
                  className={({ isActive }) =>
                    `nav-link d-flex align-items-center nav-hover ${isActive ? "active" : ""}`
                  }
                  onClick={handleNavClick}
                  aria-label="Wishlist"
                  title="Wishlist"
                >
                  <Heart size={20} />
                </NavLink>
              </li>

              {/* Cart */}
              <li className="nav-item position-relative">
                <button
                  className="btn nav-link position-relative d-flex align-items-center nav-hover"
                  onClick={handleCartClick}
                  aria-label="Cart"
                  title="Cart"
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
                    aria-label="Login"
                    title="Login"
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

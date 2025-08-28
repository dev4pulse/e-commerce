// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";

// Layout
import Header from "./components/Header";
import Footer from "./components/Footer";

// Pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ShopPage from "./pages/ShopPage";
import GalleryPage from "./pages/GalleryPage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";
import WishlistPage from "./pages/WishlistPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import CustomOrderPage from "./pages/CustomOrderPage";
import SignupPage from "./pages/SignupPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductViewPage from "./pages/ProductViewPage";
import PageNotFound from "./pages/PageNotFound";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import ReturnsPage from "./pages/ReturnsPage";
import ShippingPage from "./pages/ShippingPage";
import ArtClassesPage from "./pages/ArtClassesPage";
import AdminDashboard from "./pages/AdminDashboard";

// Context
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

// Utils
import ScrollToTop from "./components/ScrollToTop";
import BackToTop from "./components/BackToTop";

// New: floating falling cart button
import FallingCart from "./components/FallingCart";

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          {/* Snap to top on path/query/hash change */}
          <ScrollToTop />
          <div className="flex flex-col min-h-screen">
            {/* If Header is fixed-top/sticky, .pt-nav below prevents overlap */}
            <Header />
            <main className="flex-grow pt-nav">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/shop" element={<ShopPage />} />
                {/* Category route (slug) */}
                <Route path="/shop/category/:category" element={<ShopPage />} />

                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/custom-order" element={<CustomOrderPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                {/* Product details reads ?id=... via useSearchParams */}
                <Route path="/product-details" element={<ProductViewPage />} />
                <Route path="art-classes" element={<ArtClassesPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/admin" element={<AdminDashboard />} />

                {/* Legal/Policy pages */}
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/returns" element={<ReturnsPage />} />
                <Route path="/shipping" element={<ShippingPage />} />

                {/* Fallback 404 */}
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </main>
            <Footer />

            {/* Floating falling cart (click -> /cart).
               bottomOffset should sit just above BackToTop’s position/size. */}
            <FallingCart
              right={16}
              bottomOffset={84}    // sit above BackToTop
              speedFactor={2.2}    // tune scroll sensitivity (higher = slower)
              maxStart={1.1}       // how far above view to start (in viewport heights)
              size={22}
              navigateTo="/cart"
            />

            {/* Floating Go-To-Top button (appears after scrolling) */}
            <BackToTop />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;

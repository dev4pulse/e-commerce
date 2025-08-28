// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Mail, MapPin, Phone, Instagram, Facebook, Twitter, Youtube, ArrowRight
} from 'lucide-react';
import './Footer.css'
const year = new Date().getFullYear();

function Footer() {
  return (
    <footer className="pt-5" style={{ background: 'linear-gradient(135deg,#fff1f2,#fff7ed)' }}>
      {/* Top gradient divider */}
      <div
        className="w-100"
        style={{
          height: 4,
          background: 'linear-gradient(90deg,#d63384,#fd7e14)'
        }}
      />

      <div className="container py-5">
        <div className="row g-4 g-lg-5">
          {/* Brand + About */}
          <div className="col-12 col-md-6 col-lg-4">
            <div className="d-flex align-items-center gap-2 mb-3">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: 48,
                  height: 48,
                  background: 'linear-gradient(135deg,#fb7185,#f59f0b)'
                }}
              >
                <span className="text-white fw-bold fs-5">A</span>
              </div>
              <div className="lh-1">
                <div className="fw-bold fs-5" style={{
                  background: 'linear-gradient(90deg,#d63384,#fd7e14)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  ArtistryStudio
                </div>
                <small className="text-muted">Original Paintings &amp; Art</small>
              </div>
            </div>
            <p className="text-muted mb-3">
              Handcrafted originals, limited editions, and custom commissions made with archival materials and a collector‑first approach.
            </p>

            <div className="d-flex gap-2">
              <motion.a whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }} href="https://instagram.com" aria-label="Instagram" className="btn btn-light rounded-circle p-0 d-flex align-items-center justify-content-center" style={{ width: 40, height: 40 }}>
                <Instagram size={18} />
              </motion.a>
              <motion.a whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }} href="https://facebook.com" aria-label="Facebook" className="btn btn-light rounded-circle p-0 d-flex align-items-center justify-content-center" style={{ width: 40, height: 40 }}>
                <Facebook size={18} />
              </motion.a>
              <motion.a whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }} href="https://twitter.com" aria-label="Twitter" className="btn btn-light rounded-circle p-0 d-flex align-items-center justify-content-center" style={{ width: 40, height: 40 }}>
                <Twitter size={18} />
              </motion.a>
              <motion.a whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }} href="https://youtube.com" aria-label="YouTube" className="btn btn-light rounded-circle p-0 d-flex align-items-center justify-content-center" style={{ width: 40, height: 40 }}>
                <Youtube size={18} />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-6 col-md-3 col-lg-2">
            <h6 className="fw-semibold mb-3">Quick Links</h6>
            <ul className="list-unstyled vstack gap-2 mb-0">
              <li><Link className="text-decoration-none text-muted footer-link" to="/">Home</Link></li>
              <li><Link className="text-decoration-none text-muted footer-link" to="/about">About</Link></li>
              <li><Link className="text-decoration-none text-muted footer-link" to="/gallery">Gallery</Link></li>
              <li><Link className="text-decoration-none text-muted footer-link" to="/blog">Blog</Link></li>
              <li><Link className="text-decoration-none text-muted footer-link" to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Shop */}
          <div className="col-6 col-md-3 col-lg-2">
            <h6 className="fw-semibold mb-3">Shop</h6>
            <ul className="list-unstyled vstack gap-2 mb-0">
              <li><Link className="text-decoration-none text-muted footer-link" to="/shop">All Products</Link></li>
              <li><Link className="text-decoration-none text-muted footer-link" to="/shop/category/paintings">Paintings</Link></li>
              <li><Link className="text-decoration-none text-muted footer-link" to="/shop/category/handcrafted-items">Handcrafted</Link></li>
              <li><Link className="text-decoration-none text-muted footer-link" to="/shop/category/digital-prints">Digital Prints</Link></li>
              <li><Link className="text-decoration-none text-muted footer-link" to="/custom-order">Custom Orders</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-12 col-md-6 col-lg-4">
            <h6 className="fw-semibold mb-3">Contact</h6>
            <div className="vstack gap-2 text-muted small mb-3">
              <div className="d-flex align-items-start gap-2">
                <MapPin size={16} className="mt-1" />
                <span>123 Art Street, Creative District, City, State 12345</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <Phone size={16} />
                <a className="text-muted text-decoration-none footer-link" href="tel:+15551234567">+1 (555) 123‑4567</a>
              </div>
              <div className="d-flex align-items-center gap-2">
                <Mail size={16} />
                <a className="text-muted text-decoration-none footer-link" href="mailto:hello@artistrystudio.com">hello@artistrystudio.com</a>
              </div>
            </div>

            {/* Newsletter */}
            <div className="rounded-4 p-3" style={{ background: '#ffffff' }}>
              <div className="fw-semibold mb-2">Stay in the loop</div>
              <form
                className="d-flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  // Hook up to your newsletter API
                }}
              >
                <input type="email" required className="form-control rounded-pill" placeholder="Email address" />
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="btn btn-danger rounded-pill d-inline-flex align-items-center gap-1"
                >
                  Subscribe <ArrowRight size={16} />
                </motion.button>
              </form>
              <small className="text-muted">No spam. Unsubscribe anytime.</small>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-top">
        <div className="container py-3">
          <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-2">
            <small className="text-muted mb-0">© {year} ArtistryStudio. All rights reserved.</small>
            <div className="d-flex align-items-center gap-3 small">
              <Link to="/terms" className="text-muted text-decoration-none footer-link">Terms</Link>
              <Link to="/privacy" className="text-muted text-decoration-none footer-link">Privacy</Link>
              <Link to="/returns" className="text-muted text-decoration-none footer-link">Returns</Link>
              <Link to="/shipping" className="text-muted text-decoration-none footer-link">Shipping</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

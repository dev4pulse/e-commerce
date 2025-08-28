// src/pages/ProductViewPage.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Share2, Star, Ruler, Calendar, Palette as PaletteIcon } from 'lucide-react';

import { useCart } from '../context/CartContext';
// Note: Ensure the filename casing matches your project (e.g., '../data/products.js' vs '../data/Products.js')
import { getProductById, getProductsByCategory } from '../data/Products.js';
import ProductCard from '../components/ProductCard';

const ProductViewPage = () => {
  // Always call hooks at the top level, before any early returns
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  const { state, dispatch } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Load product by id
  useEffect(() => {
    if (!id) {
      setProduct(null);
      return;
    }
    const found = getProductById(id);
    setProduct(found || null);
    setSelectedImageIndex(0);
  }, [id]);

  // Related products (safe to call each render; returns [] if product is null)
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    const slug = (s) => s.toLowerCase().replace(/\s+/g, '-');
    const listByCategory = getProductsByCategory(slug(product.category));
    return listByCategory.filter((p) => p.id !== product.id).slice(0, 4);
  }, [product]);

  const images = product
    ? (product.images && product.images.length > 0 ? product.images : [product.image])
    : [];

  const addToCart = () => {
    if (!product?.inStock) return;
    // Keep existing behavior: add one item per quantity step to match your reducer
    for (let i = 0; i < quantity; i += 1) {
      dispatch({
        type: 'ADD_ITEM',
        payload: {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          category: product.category
        }
      });
    }
  };

  // Wishlist: derive from global state and toggle via reducer
  const isWishlisted = product
    ? (state?.wishlist || []).some((w) => w.id === product.id)
    : false;

  const toggleWishlist = () => {
    if (!product) return;
    dispatch({
      type: 'WISHLIST_TOGGLE',
      payload: {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        category: product.category
      }
    });
  };

  // Early not found
  if (!product) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ background: 'linear-gradient(135deg,#fff1f2,#fff7ed)' }}>
        <div className="text-center p-4">
          <div className="display-3 mb-3">🎨</div>
          <h2 className="fw-bold mb-2">Artwork not found</h2>
          <p className="text-muted mb-4">The artwork being searched for doesn’t exist or has been moved.</p>
          <Link to="/shop" className="btn btn-danger rounded-3 px-4">Browse All Artworks</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100" style={{ background: 'linear-gradient(135deg,#fff1f2,#fff7ed)' }}>
      <div className="container py-4 py-lg-5">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item"><Link to="/" className="text-decoration-none">Home</Link></li>
            <li className="breadcrumb-item"><Link to="/shop" className="text-decoration-none">Shop</Link></li>
            <li className="breadcrumb-item active" aria-current="page">{product.title}</li>
          </ol>
        </nav>

        <div className="row g-4 g-lg-5 mb-4">
          {/* Gallery */}
          <div className="col-12 col-lg-6">
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="card border-0 shadow rounded-4 overflow-hidden">
              <div className="ratio ratio-1x1">
                <img src={images[selectedImageIndex]} alt={product.title} className="w-100 h-100 object-fit-cover" />
              </div>
            </motion.div>

            {images.length > 1 && (
              <div className="d-flex gap-2 mt-3 overflow-auto pb-1">
                {images.map((img, idx) => {
                  const active = selectedImageIndex === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImageIndex(idx)}
                      className="p-0 bg-transparent border-0"
                      style={{ flex: '0 0 auto' }}
                      aria-label={`Thumbnail ${idx + 1}`}
                    >
                      <div className="rounded-3 overflow-hidden" style={{ width: 80, height: 80, border: active ? '3px solid #d63384' : '2px solid #e5e7eb' }}>
                        <img src={img} alt={`${product.title} ${idx + 1}`} className="w-100 h-100 object-fit-cover" />
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="col-12 col-lg-6">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
              <span className="badge rounded-pill mb-3" style={{ background: '#ffe4e6', color: '#be185d' }}>{product.category}</span>

              <h1 className="fw-bold display-6 mb-2">{product.title}</h1>

              <div className="d-flex align-items-center flex-wrap gap-3 mb-3">
                <div className="fw-bold" style={{ fontSize: 28, color: '#d63384' }}>${product.price}</div>
                <div className="d-flex align-items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={18} color="#f1c40f" fill="#f1c40f" className="me-1" />
                  ))}
                  <span className="text-muted small ms-2">(4.9) • 24 reviews</span>
                </div>
              </div>

              <p className="text-dark lead mb-4" style={{ lineHeight: 1.6 }}>{product.description}</p>

              {/* Details */}
              <div className="card border-0 shadow-sm rounded-4 mb-4">
                <div className="card-body">
                  <h3 className="h6 fw-semibold mb-3">Artwork Details</h3>
                  <div className="row g-3">
                    <div className="col-12 col-sm-4 d-flex align-items-center gap-2">
                      <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: 40, height: 40, background: '#ffe4e6' }}>
                        <Ruler size={18} style={{ color: '#d63384' }} />
                      </div>
                      <div>
                        <div className="text-muted small">Dimensions</div>
                        <div className="fw-medium">{product.dimensions}</div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4 d-flex align-items-center gap-2">
                      <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: 40, height: 40, background: '#ffedd5' }}>
                        <PaletteIcon size={18} style={{ color: '#ea580c' }} />
                      </div>
                      <div>
                        <div className="text-muted small">Medium</div>
                        <div className="fw-medium">{product.medium}</div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4 d-flex align-items-center gap-2">
                      <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: 40, height: 40, background: '#fef3c7' }}>
                        <Calendar size={18} style={{ color: '#d97706' }} />
                      </div>
                      <div>
                        <div className="text-muted small">Year</div>
                        <div className="fw-medium">{product.year}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quantity + Actions */}
              <div className="vstack gap-3">
                <div className="d-flex align-items-center gap-3">
                  <span className="fw-medium">Quantity:</span>
                  <div className="d-inline-flex align-items-center gap-2">
                    <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="btn btn-outline-secondary btn-sm rounded-3">−</button>
                    <span className="fw-medium text-center" style={{ width: 36 }}>{quantity}</span>
                    <button type="button" onClick={() => setQuantity((q) => q + 1)} className="btn btn-outline-secondary btn-sm rounded-3">+</button>
                  </div>
                </div>

                <div className="d-flex gap-2">
                  <motion.button
                    whileHover={{ scale: product.inStock ? 1.02 : 1 }}
                    whileTap={{ scale: product.inStock ? 0.98 : 1 }}
                    onClick={addToCart}
                    disabled={!product.inStock}
                    className="btn btn-danger flex-grow-1 rounded-4 py-3 d-inline-flex align-items-center justify-content-center gap-2 fw-semibold"
                  >
                    <ShoppingCart size={18} />
                    Add to Cart
                  </motion.button>

                  {/* Wishlist toggle (global) */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={toggleWishlist}
                    className="btn rounded-4 d-inline-flex align-items-center justify-content-center"
                    style={{
                      width: 56, height: 56,
                      borderWidth: 2, borderStyle: 'solid',
                      borderColor: isWishlisted ? '#d63384' : '#ced4da',
                      background: isWishlisted ? '#d63384' : 'transparent',
                      color: isWishlisted ? '#fff' : '#6c757d'
                    }}
                    aria-label="Toggle wishlist"
                    title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn rounded-4 d-inline-flex align-items-center justify-content-center"
                    style={{ width: 56, height: 56, border: '2px solid #ced4da', color: '#6c757d' }}
                    aria-label="Share"
                    onClick={() => {
                      const url = window.location.href;
                      if (navigator.clipboard?.writeText) {
                        navigator.clipboard.writeText(url);
                        alert('Link copied to clipboard');
                      }
                    }}
                  >
                    <Share2 size={20} />
                  </motion.button>
                </div>

                <div className={`alert mb-0 ${product.inStock ? 'alert-success' : 'alert-secondary'}`}>
                  <div className="fw-medium mb-1">{product.inStock ? '✅ In Stock - Ready to Ship' : '⏳ Currently Unavailable'}</div>
                  {product.inStock && <div className="small mb-0">Ships within 2–3 business days</div>}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Related */}
        {relatedProducts.length > 0 && (
          <section className="pb-2">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h2 className="fw-bold h4 mb-0">Related Artworks</h2>
              <Link to={`/shop/category/${product.category.toLowerCase().replace(/\s+/g, '-')}`} className="text-decoration-none fw-medium" style={{ color: '#d63384' }}>
                View all in {product.category}
              </Link>
            </div>

            <div className="row g-3 g-lg-4">
              {relatedProducts.map((rp, idx) => (
                <motion.div key={rp.id} className="col-12 col-md-6 col-lg-3" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: idx * 0.05 }} viewport={{ once: true }}>
                  <ProductCard product={rp} />
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductViewPage;

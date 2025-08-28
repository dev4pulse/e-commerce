// src/pages/ShopPage.jsx — uses data from products.js
import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, Grid, List, Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';
// IMPORTANT: ensure this path and filename casing matches your project
import { sampleProducts, getProductsByCategory } from '../data/Products.js';

function ShopPage() {
  const { category } = useParams(); // slug, e.g. "paintings" or "all-products"
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 10000]); // widened to include all items
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    'All Products',
    'Paintings',
    'Return Gifts',
    'Workshops',
    'Custom Orders',
    'Digital Prints',
    'Handcrafted Items',
    'Limited Editions'
  ];

  const filteredProducts = useMemo(() => {
    // Base list from category (slug) or all
    let products = category ? getProductsByCategory(category) : sampleProducts;

    // Search
    if (searchTerm.trim()) {
      const s = searchTerm.toLowerCase();
      products = products.filter(
        (p) =>
          p.title.toLowerCase().includes(s) ||
          p.description.toLowerCase().includes(s)
      );
    }

    // Price range
    products = products.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Sort
    switch (sortBy) {
      case 'price-low':
        products = [...products].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        products = [...products].sort((a, b) => b.price - a.price);
        break;
      case 'name':
        products = [...products].sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'newest':
        products = [...products].sort((a, b) => b.year - a.year);
        break;
      default:
        // featured first
        products = [...products].sort(
          (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
        );
    }

    return products;
  }, [category, searchTerm, sortBy, priceRange]);

  const niceCategory = category
    ? category.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
    : 'All Artworks';

  return (
    <div
      className="min-vh-100"
      style={{ background: 'linear-gradient(135deg,#fff1f2,#fff7ed)' }}
    >
      <div className="container py-4 py-lg-5">
        {/* Header */}
        <div className="mb-4">
          <h1 className="fw-bold display-6 mb-2">{niceCategory}</h1>
          <p className="text-muted mb-0">
            Discover unique, handcrafted artworks that bring beauty to your space
          </p>
        </div>

        {/* Search + Bar */}
        <div className="card border-0 shadow-sm rounded-4 mb-4">
          <div className="card-body">
            <div className="d-flex flex-column flex-lg-row gap-3 align-items-stretch align-items-lg-center justify-content-between">
              {/* Search */}
              <div className="w-100" style={{ maxWidth: 480 }}>
                <div className="input-group">
                  <span className="input-group-text bg-white">
                    <Search size={18} className="text-secondary" />
                  </span>
                  <input
                    type="text"
                    placeholder="Search artworks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="d-flex align-items-center gap-3 flex-wrap">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="form-select"
                  style={{ minWidth: 200 }}
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name A-Z</option>
                </select>

                {/* View mode */}
                <div className="btn-group" role="group" aria-label="View mode">
                  <button
                    type="button"
                    onClick={() => setViewMode('grid')}
                    className={`btn btn-outline-secondary ${
                      viewMode === 'grid' ? 'active' : ''
                    }`}
                    title="Grid"
                  >
                    <Grid size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('list')}
                    className={`btn btn-outline-secondary ${
                      viewMode === 'list' ? 'active' : ''
                    }`}
                    title="List"
                  >
                    <List size={16} />
                  </button>
                </div>

                {/* Filters toggle (UI only) */}
                <button
                  type="button"
                  onClick={() => setShowFilters(!showFilters)}
                  className="btn btn-outline-secondary d-inline-flex align-items-center gap-2"
                >
                  <Filter size={16} />
                  <span>Filters</span>
                </button>
              </div>
            </div>

            {/* Advanced Filters (UI placeholders) */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 pt-4 border-top"
              >
                <div className="row g-4">
                  {/* Categories (display only; wire state if needed) */}
                  <div className="col-12 col-md-4">
                    <h6 className="fw-semibold mb-3">Categories</h6>
                    <div className="vstack gap-2">
                      {categories.map((cat) => (
                        <label key={cat} className="d-flex align-items-center gap-2">
                          <input type="checkbox" className="form-check-input" />
                          <span className="small">{cat}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="col-12 col-md-4">
                    <h6 className="fw-semibold mb-3">Price Range</h6>
                    <div className="d-flex gap-2">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Min"
                        value={priceRange[0]}
                        onChange={(e) =>
                          setPriceRange([
                            parseInt(e.target.value, 10) || 0,
                            priceRange[1],
                          ])
                        }
                      />
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Max"
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([
                            priceRange[0],
                            parseInt(e.target.value, 10) || 10000,
                          ])
                        }
                      />
                    </div>
                  </div>

                  {/* Medium (display only; wire state if needed) */}
                  <div className="col-12 col-md-4">
                    <h6 className="fw-semibold mb-3">Medium</h6>
                    <div className="vstack gap-2">
                      {['Oil on Canvas', 'Acrylic on Canvas', 'Watercolor', 'Mixed Media'].map(
                        (m) => (
                          <label key={m} className="d-flex align-items-center gap-2">
                            <input type="checkbox" className="form-check-input" />
                            <span className="small">{m}</span>
                          </label>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Results count */}
        <p className="text-muted mb-3">
          Showing {filteredProducts.length} result
          {filteredProducts.length !== 1 ? 's' : ''}
        </p>

        {/* Products */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-5">
            <div className="display-3 mb-2">🎨</div>
            <h3 className="h5 fw-semibold mb-2">No artworks found</h3>
            <p className="text-muted mb-0">Try adjusting filters or search terms</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="row g-3 g-lg-4 mb-4">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="col-12 col-md-6 col-lg-4 col-xl-3"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          // List view: single-column rows
          <div className="vstack gap-3 mb-4">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card border-0 shadow-sm rounded-4"
              >
                <div className="card-body">
                  <ProductCard product={product} />
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Load more (placeholder) */}
        {filteredProducts.length > 0 && (
          <div className="text-center">
            <button className="btn btn-danger px-4 py-2 rounded-pill fw-semibold">
              Load More Artworks
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShopPage;

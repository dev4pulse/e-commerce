// CustomOrderPage.jsx (Bootstrap version)
import React, { useState } from 'react';
import { Palette, Upload, MessageSquare, Calendar, DollarSign, CheckCircle } from 'lucide-react';

function CustomOrderPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    artType: '',
    size: '',
    description: '',
    budget: '',
    deadline: '',
    reference: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, reference: e.target.files[0] }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Custom order submitted:', formData);
  };

  return (
    <div
      className="min-vh-100 py-5"
      style={{ background: 'linear-gradient(135deg,#fffbeb,#fff7ed,#ffe4e6)' }}
    >
      <div className="container" style={{ maxWidth: 960 }}>
        {/* Header */}
        <div className="text-center mb-5">
          <div className="d-flex justify-content-center mb-3">
            <div
              className="rounded-circle p-3 d-flex align-items-center justify-content-center"
              style={{ background: 'linear-gradient(90deg,#d63384,#fd7e14)' }}
            >
              <Palette size={28} className="text-white" />
            </div>
          </div>
          <h1 className="fw-bold display-6 mb-2">Custom Art Commission</h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: 720 }}>
            Bring a vision to life with a personalized artwork created just for the brief.
          </p>
        </div>

        {/* Process Steps */}
        <div className="row row-cols-1 row-cols-md-4 g-3 g-md-4 mb-5">
          <div className="col text-center">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2"
              style={{ width: 48, height: 48, background: '#ffe4e6' }}
            >
              <MessageSquare size={22} style={{ color: '#e11d48' }} />
            </div>
            <h3 className="h6 fw-semibold mb-1">1. Consultation</h3>
            <p className="small text-muted mb-0">Share the vision and requirements</p>
          </div>
          <div className="col text-center">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2"
              style={{ width: 48, height: 48, background: '#ffedd5' }}
            >
              <DollarSign size={22} style={{ color: '#ea580c' }} />
            </div>
            <h3 className="h6 fw-semibold mb-1">2. Quote</h3>
            <p className="small text-muted mb-0">Receive detailed pricing and timeline</p>
          </div>
          <div className="col text-center">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2"
              style={{ width: 48, height: 48, background: '#fef3c7' }}
            >
              <Palette size={22} style={{ color: '#d97706' }} />
            </div>
            <h3 className="h6 fw-semibold mb-1">3. Creation</h3>
            <p className="small text-muted mb-0">The artwork comes to life</p>
          </div>
          <div className="col text-center">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2"
              style={{ width: 48, height: 48, background: '#dcfce7' }}
            >
              <CheckCircle size={22} style={{ color: '#16a34a' }} />
            </div>
            <h3 className="h6 fw-semibold mb-1">4. Delivery</h3>
            <p className="small text-muted mb-0">Receive the masterpiece</p>
          </div>
        </div>

        {/* Order Form */}
        <div className="card border-0 shadow-sm rounded-4">
          <div className="card-body p-4 p-lg-5">
            <h2 className="h4 fw-bold mb-4">Commission Request Form</h2>

            <form onSubmit={handleSubmit} className="vstack gap-4">
              {/* Personal Information */}
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="name" className="form-label small fw-semibold">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Your full name"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="email" className="form-label small fw-semibold">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="phone" className="form-label small fw-semibold">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Your phone number"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="artType" className="form-label small fw-semibold">Art Type *</label>
                  <select
                    id="artType"
                    name="artType"
                    required
                    value={formData.artType}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="">Select art type</option>
                    <option value="portrait">Portrait</option>
                    <option value="landscape">Landscape</option>
                    <option value="abstract">Abstract</option>
                    <option value="still-life">Still Life</option>
                    <option value="custom">Custom Design</option>
                  </select>
                </div>
              </div>

              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="size" className="form-label small fw-semibold">Preferred Size *</label>
                  <select
                    id="size"
                    name="size"
                    required
                    value={formData.size}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="">Select size</option>
                    <option value="small">Small (8x10 inches)</option>
                    <option value="medium">Medium (16x20 inches)</option>
                    <option value="large">Large (24x36 inches)</option>
                    <option value="custom">Custom Size</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="budget" className="form-label small fw-semibold">Budget Range</label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="">Select budget range</option>
                    <option value="under-500">Under $500</option>
                    <option value="500-1000">$500 - $1,000</option>
                    <option value="1000-2000">$1,000 - $2,000</option>
                    <option value="2000-plus">$2,000+</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="deadline" className="form-label small fw-semibold">Preferred Completion Date</label>
                <input
                  type="date"
                  id="deadline"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>

              <div>
                <label htmlFor="description" className="form-label small fw-semibold">Project Description *</label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={6}
                  value={formData.description}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Describe the vision: colors, style, subject, mood, and any specific requirements..."
                />
              </div>

              <div>
                <label htmlFor="reference" className="form-label small fw-semibold">Reference Images</label>
                <div
                  className="rounded-3 text-center p-4"
                  style={{
                    border: '2px dashed #d1d5db',
                    transition: 'border-color .2s'
                  }}
                >
                  <Upload size={28} className="text-secondary mb-2" />
                  <input
                    type="file"
                    id="reference"
                    name="reference"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="d-none"
                  />
                  <label htmlFor="reference" className="d-block">
                    <span className="fw-semibold" style={{ color: '#d63384', cursor: 'pointer' }}>
                      Click to upload
                    </span>
                    <span className="text-muted"> or drag and drop</span>
                  </label>
                  <p className="text-secondary small mb-0">PNG, JPG, GIF up to 10MB</p>
                </div>
                {formData.reference && (
                  <div className="mt-2 small text-muted">
                    Selected: {formData.reference.name}
                  </div>
                )}
              </div>

              <div
                className="rounded-3 p-3"
                style={{ background: '#fffbeb', border: '1px solid #fde68a' }}
              >
                <h3 className="h6 fw-semibold mb-2" style={{ color: '#92400e' }}>What happens next?</h3>
                <ul className="small mb-0" style={{ color: '#b45309' }}>
                  <li>I’ll review the request within 24 hours</li>
                  <li>A detailed quote and timeline will be shared</li>
                  <li>We can schedule a consultation call if needed</li>
                  <li>Upon approval, creation of the artwork begins</li>
                </ul>
              </div>

              <button
                type="submit"
                className="btn w-100 text-white fw-semibold py-3 shadow-sm"
                style={{
                  background: 'linear-gradient(90deg,#d63384,#fd7e14)',
                  borderRadius: 12
                }}
              >
                Submit Commission Request
              </button>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="card border-0 shadow-sm rounded-4 mt-5">
          <div className="card-body p-4 p-lg-5">
            <h2 className="h4 fw-bold mb-4">Frequently Asked Questions</h2>
            <div className="vstack gap-3">
              <div>
                <h3 className="h6 fw-semibold mb-1">How long does a commission take?</h3>
                <p className="text-muted mb-0">
                  Typical turnaround is 2–4 weeks depending on size and complexity. Rush options may be available for an additional fee.
                </p>
              </div>
              <div>
                <h3 className="h6 fw-semibold mb-1">What’s included in the price?</h3>
                <p className="text-muted mb-0">
                  Artwork, protective varnish, and a certificate of authenticity. Framing and shipping are additional.
                </p>
              </div>
              <div>
                <h3 className="h6 fw-semibold mb-1">Can changes be requested during the process?</h3>
                <p className="text-muted mb-0">
                  Yes—progress photos are provided and minor adjustments are welcome to ensure complete satisfaction.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default CustomOrderPage;

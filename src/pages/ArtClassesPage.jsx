// src/pages/ArtClassesPage.jsx
import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Calendar, Clock, Users, MapPin, Paintbrush, CheckCircle2, Info, GraduationCap, Wifi
} from "lucide-react";

const ArtClassesPage = () => {
  // Simple mode switch; offline shows a Coming Soon panel
  const [mode, setMode] = useState("online"); // 'online' | 'offline'

  // Online sessions only (offline list can be added later)
  const onlineSessions = useMemo(
    () => [
      {
        id: "ws-101",
        title: "Foundations: Drawing & Composition",
        level: "Beginner",
        date: "Sep 14, 2025",
        time: "10:30 AM – 1:00 PM IST",
        seats: 50,              // larger room online
        location: "Online (Zoom)",
        price: 49,
        highlights: ["Pencil techniques", "Line & shape", "Basic composition"],
      },
      {
        id: "ws-201",
        title: "Acrylics: Color & Texture",
        level: "Intermediate",
        date: "Sep 21, 2025",
        time: "2:00 PM – 5:00 PM IST",
        seats: 50,
        location: "Online (Zoom)",
        price: 69,
        highlights: ["Color mixing", "Layering", "Palette knife"],
      },
      {
        id: "ws-301",
        title: "Watercolor Landscapes",
        level: "All Levels",
        date: "Sep 28, 2025",
        time: "10:30 AM – 1:00 PM IST",
        seats: 50,
        location: "Online (Zoom)",
        price: 59,
        highlights: ["Wet-on-wet", "Atmosphere", "Brush control"],
      },
    ],
    []
  );

  return (
    <div className="min-vh-100" style={{ background: "linear-gradient(135deg,#fff1f2,#fff7ed)" }}>
      <div className="container py-4 py-lg-5">
        {/* Availability banner */}
        <div className="alert alert-light border-0 shadow-sm rounded-4 d-flex align-items-center gap-2 mb-3">
          <div
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: 36, height: 36, background: "#ffe4e6", color: "#d63384" }}
          >
            <Wifi size={18} />
          </div>
          <div className="flex-grow-1">
            <div className="fw-semibold">Online art classes running now</div>
            <div className="text-muted small">Offline studio classes available soon</div>
          </div>
        </div>

        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-3 mb-lg-4"
        >
          <div className="text-center mb-3">
            <div
              className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
              style={{ width: 64, height: 64, background: "#ffe4e6", color: "#d63384" }}
            >
              <GraduationCap size={28} />
            </div>
            <h1 className="fw-bold display-6 mb-2">Art Classes & Workshops</h1>
            <p className="text-muted mb-0">
              Live, guided sessions to master techniques across drawing, watercolor, and acrylics — learn from anywhere.
            </p>
          </div>

          {/* Mode toggle */}
          <div className="d-flex justify-content-center">
            <div className="btn-group" role="group" aria-label="Class delivery mode">
              <button
                type="button"
                className={`btn ${mode === "online" ? "btn-danger" : "btn-outline-secondary"}`}
                onClick={() => setMode("online")}
              >
                Online
              </button>
              <button
                type="button"
                className={`btn ${mode === "offline" ? "btn-danger" : "btn-outline-secondary"}`}
                onClick={() => setMode("offline")}
              >
                Offline (Coming Soon)
              </button>
            </div>
          </div>
        </motion.section>

        {/* What’s included */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="row g-3 g-lg-4 mb-4 mb-lg-5"
        >
          {[
            { icon: <Paintbrush size={18} />, title: "Guided Techniques", text: "Step‑by‑step demos and personalized feedback." },
            { icon: <Users size={18} />, title: "Small Cohorts", text: "Limited seats to maximize instructor attention." },
            { icon: <CheckCircle2 size={18} />, title: "Materials Guidance", text: "Get pre‑class materials list and alternatives." },
          ].map((f, i) => (
            <div key={i} className="col-12 col-lg-4">
              <div className="card border-0 shadow-sm rounded-4 h-100">
                <div className="card-body d-flex gap-3">
                  <div className="rounded-circle d-flex align-items-center justify-content-center"
                       style={{ width: 40, height: 40, background: "#fff1f2", color: "#d63384" }}>
                    {f.icon}
                  </div>
                  <div>
                    <h5 className="fw-semibold mb-1">{f.title}</h5>
                    <p className="text-muted mb-0">{f.text}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.section>

        {/* Online sessions list */}
        {mode === "online" ? (
          <motion.section
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="mb-4 mb-lg-5"
          >
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
              <h2 className="fw-bold h4 mb-0">Upcoming Online Sessions</h2>
              <span className="text-muted small">{onlineSessions.length} scheduled</span>
            </div>

            <div className="row g-3 g-lg-4">
              {onlineSessions.map((s, idx) => (
                <motion.div
                  key={s.id}
                  className="col-12 col-lg-4"
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                >
                  <div className="card border-0 shadow-sm rounded-4 h-100">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <span className="badge rounded-pill" style={{ background: "#e0f2fe", color: "#0369a1" }}>
                          Online Live
                        </span>
                        <div className="fw-semibold" style={{ color: "#d63384" }}>${s.price}</div>
                      </div>
                      <h3 className="h5 fw-bold mb-2">{s.title}</h3>

                      <ul className="list-unstyled text-muted small vstack gap-2 mb-3">
                        <li className="d-flex align-items-center gap-2">
                          <Calendar size={16} /> <span>{s.date}</span>
                        </li>
                        <li className="d-flex align-items-center gap-2">
                          <Clock size={16} /> <span>{s.time}</span>
                        </li>
                        <li className="d-flex align-items-center gap-2">
                          <Users size={16} /> <span>{s.seats} seats</span>
                        </li>
                        <li className="d-flex align-items-center gap-2">
                          <MapPin size={16} /> <span>{s.location}</span>
                        </li>
                      </ul>

                      {s.highlights?.length > 0 && (
                        <div className="mb-3">
                          <div className="text-muted small mb-1">You’ll practice:</div>
                          <div className="d-flex flex-wrap gap-1">
                            {s.highlights.map((h) => (
                              <span key={h} className="badge bg-light text-dark rounded-pill border">
                                {h}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <button
                        type="button"
                        className="btn btn-danger w-100 rounded-pill"
                        onClick={() => alert(`Enquiry for ${s.title} (Online)`)}
                      >
                        Enquire / Reserve Seat
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        ) : (
          // Offline coming soon state
          <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-4 mb-lg-5"
          >
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4 p-lg-5 text-center">
                <div
                  className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                  style={{ width: 64, height: 64, background: "#fff7ed", color: "#ea580c" }}
                >
                  <Info size={28} />
                </div>
                <h2 className="fw-bold h4 mb-2">Offline studio classes are coming soon</h2>
                <p className="text-muted mb-3">
                  We’re setting up the perfect studio experience. Sign up via the enquiry form to get notified.
                </p>
                <button
                  type="button"
                  className="btn btn-outline-secondary rounded-pill"
                  onClick={() => alert("We’ll notify you when studio classes open!")}
                >
                  Notify Me
                </button>
              </div>
            </div>
          </motion.section>
        )}

        {/* Quick enquiry (shared) */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-4 mb-lg-5"
        >
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4 p-lg-5">
              <h2 className="fw-bold h5 mb-2">Enrollment Enquiry</h2>
              <p className="text-muted">
                Share details below and the coordinator will follow up with schedules, materials, and payment options.
              </p>
              <form
                className="row g-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert(`Thanks! We’ll reach out about ${mode === "online" ? "online" : "offline"} classes shortly.`);
                }}
              >
                <div className="col-12 col-md-6">
                  <label className="form-label">Full Name</label>
                  <input className="form-control" required placeholder="Your name" />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" required placeholder="you@example.com" />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label">Phone</label>
                  <input className="form-control" required placeholder="+91 9XXXXXXXXX" />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label">Preferred Mode</label>
                  <select className="form-select" value={mode} onChange={(e) => setMode(e.target.value)}>
                    <option value="online">Online (Live)</option>
                    <option value="offline">Offline (Coming Soon)</option>
                  </select>
                </div>
                <div className="col-12">
                  <label className="form-label">Message</label>
                  <textarea rows={4} className="form-control" placeholder="Tell us what you’d like to learn…" />
                </div>
                <div className="col-12">
                  <button type="submit" className="btn btn-danger rounded-pill px-4">
                    Send Enquiry
                  </button>
                </div>
              </form>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default ArtClassesPage;

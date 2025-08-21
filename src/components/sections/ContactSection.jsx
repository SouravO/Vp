import React from "react";
import "../../pages/Home.css";

export default function ContactSection() {
  return (
    <section id="contact" className="section">
      <div className="container">
        <h2 className="section-title">Get a quote</h2>
        <p className="section-lead">
          Tell us about your site and we’ll propose the right system and budget.
        </p>
        <form
          className="card shadow-sm"
          onSubmit={(e) => e.preventDefault()}
          style={{ padding: 18, display: "grid", gap: 12 }}
        >
          <div
            className="grid"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            }}
          >
            <input
              required
              placeholder="Name"
              style={{
                padding: "12px 14px",
                borderRadius: 8,
                border: "1px solid #e3ebf2",
              }}
            />
            <input
              required
              type="email"
              placeholder="Email"
              style={{
                padding: "12px 14px",
                borderRadius: 8,
                border: "1px solid #e3ebf2",
              }}
            />
            <input
              placeholder="Phone"
              style={{
                padding: "12px 14px",
                borderRadius: 8,
                border: "1px solid #e3ebf2",
              }}
            />
            <input
              placeholder="City"
              style={{
                padding: "12px 14px",
                borderRadius: 8,
                border: "1px solid #e3ebf2",
              }}
            />
          </div>
          <textarea
            rows="4"
            placeholder="Project details (size, sport, surface, timeline)"
            style={{
              padding: "12px 14px",
              borderRadius: 8,
              border: "1px solid #e3ebf2",
              resize: "vertical",
            }}
          ></textarea>
          <div
            style={{
              display: "flex",
              gap: 12,
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <span className="muted">We typically respond within 24 hours.</span>
            <button className="btn" type="submit">
              Request proposal
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

import React from "react";
import "../../pages/Home.css";

export default function TestimonialsSection() {
  const items = [
    {
      q: "They delivered ahead of schedule and the turf plays beautifully even during monsoon.",
      w: "Owner, Arena Five",
    },
    {
      q: "Lighting uniformity is excellent. Our players noticed the difference on day one.",
      w: "Manager, Goal Hub 7s",
    },
    {
      q: "Professional team with strong engineering focus. Highly recommended.",
      w: "Director, City Sports Park",
    },
  ];

  return (
    <section
      id="testimonials"
      className="section testimonials"
      style={{ background: "#f6f9fb" }}
    >
      <div className="container">
        <h2 className="section-title">What clients say</h2>
        <div className="grid">
          {items.map((t, i) => (
            <blockquote key={i} className="testimonial card shadow-sm">
              <p>“{t.q}”</p>
              <div className="who">
                <div className="avatar"></div>
                <span className="muted">{t.w}</span>
              </div>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

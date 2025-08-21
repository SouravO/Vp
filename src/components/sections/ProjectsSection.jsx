import React from "react";
import "../../pages/Home.css";

export default function ProjectsSection() {
  const projects = [
    { name: "Arena Five", city: "Bengaluru" },
    { name: "Goal Hub 7s", city: "Mumbai" },
    { name: "City Sports Park", city: "Kochi" },
    { name: "Northside Football", city: "Delhi" },
  ];

  return (
    <section
      id="projects"
      className="section projects"
      style={{ background: "#f6f9fb" }}
    >
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>
        <p className="section-lead">
          A snapshot of our recent football turf installations.
        </p>
        <div className="grid">
          {projects.map((p, i) => (
            <article className="card project shadow-sm" key={i}>
              <div
                style={{
                  height: 140,
                  background: "#ddd",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                {p.name}
              </div>
              <div className="meta">
                <h4>{p.name}</h4>
                <span>{p.city}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

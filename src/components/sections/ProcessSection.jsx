import React from "react";
import "../../pages/Home.css";

export default function ProcessSection() {
  const steps = [
    {
      t: "Site study & design",
      d: "Soil tests, laser survey, drainage and structural design recommendations.",
    },
    {
      t: "Base & civil works",
      d: "Excavation, sub‑base, levelling, compaction, and drainage implementation.",
    },
    {
      t: "System installation",
      d: "Shock pads, turf laying, seam bonding, infill distribution, and grooming.",
    },
    {
      t: "Lighting & fencing",
      d: "Mast erection, LED fixtures, perimeter fencing, rebound boards, netting.",
    },
    {
      t: "Handover & training",
      d: "Play testing, maintenance training, documentation, and warranty handover.",
    },
  ];

  return (
    <section id="process" className="section process">
      <div className="container">
        <h2 className="section-title">Our process</h2>
        <p className="section-lead">
          Transparent, engineered, and deadline‑driven delivery.
        </p>
        <div
          className="grid"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          }}
        >
          {steps.map((s, i) => (
            <div className="step card shadow-sm" key={i}>
              <div className="num">{i + 1}</div>
              <div className="copy">
                <h4>{s.t}</h4>
                <p>{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

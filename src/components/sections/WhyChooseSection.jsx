import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./WhyChooseSection.css";

gsap.registerPlugin(ScrollTrigger);

export default function WhyChooseSection() {
  const rootRef = useRef(null);

  const items = [
    {
      title: "Proven Excellence",
      text: "With years of experience, we have a track record of delivering top‑quality football grounds.",
      icon: "🏆",
    },
    {
      title: "Safety First",
      text: "We prioritize player safety, ensuring our fields meet the highest standards.",
      icon: "🛡️",
    },
    {
      title: "Custom Solutions",
      text: "We offer customized solutions to meet the unique requirements of each client.",
      icon: "⚙️",
    },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Initial states (no layout jump)
      gsap.set([".why-title", ".why-lead", ".why-card"], {
        autoAlpha: 0,
        y: 24,
        willChange: "opacity, transform",
      });

      gsap
        .timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 80%",
            end: "bottom 40%",
            once: true, // play once; set false to reverse on scroll-up
            // markers: true,
          },
        })
        .to(".why-title", { autoAlpha: 1, y: 0, duration: 0.6 })
        .to(".why-lead", { autoAlpha: 1, y: 0, duration: 0.5 }, "-=0.25")
        .to(
          ".why-card",
          { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.12 },
          "-=0.15"
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="why" className="why-choose" ref={rootRef}>
      <div className="why-inner">
        <h2 className="why-title">Why Choose VP Associated?</h2>
        <p className="why-lead">
          VP Associated is dedicated to delivering exceptional football ground
          solutions tailored to your specific needs. Our expertise and
          commitment to quality ensure your field is always game-ready.
        </p>

        <div className="why-grid">
          {items.map((it, i) => (
            <div className="why-card" key={i}>
              <div className="why-icon" aria-hidden>
                {it.icon}
              </div>
              <h3>{it.title}</h3>
              <p className="muted">{it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

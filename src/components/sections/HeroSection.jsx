import React, { useEffect, useRef } from "react";
import ground from "../../assets/img/ground.png";
import "../../pages/Home.css";
import { gsap } from "../../lib/gsapSetup";

export default function HeroSection() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state
      gsap.set([".hero-hero .bg", ".hero-hero .overlay"], { opacity: 0 });
      gsap.set(".hero-hero h1", { y: 50, opacity: 0 });
      gsap.set(".hero-hero p", { y: 30, opacity: 0 });
      gsap.set(".hero-hero .cta", { y: 20, opacity: 0 });

      // Animation timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to([".hero-hero .bg", ".hero-hero .overlay"], {
        opacity: 1,
        duration: 1.2,
      })
        .from(".hero-hero .bg", { scale: 1.1, duration: 1.5 }, "<")
        .to(".hero-hero h1", { y: 0, opacity: 1, duration: 1 }, "-=0.5")
        .to(".hero-hero p", { y: 0, opacity: 1, duration: 0.8 }, "-=0.7")
        .to(
          ".hero-hero .cta",
          { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
          "-=0.5"
        );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="hero-hero md:height-100vh" aria-label="FieldPro hero">
      <div className="bg" style={{ backgroundImage: `url(${ground})` }}></div>
      <div className="overlay"></div>
      <div className="content">
        <h1>Elevate Your Game with FieldPro</h1>
        <p>
          We specialize in providing top-tier football grounds, ensuring optimal
          performance and safety for players. Our commitment to quality and
          innovation makes us the preferred choice for clubs and organizations.
        </p>
        <a href="#products" className="cta">
          Explore Our Solutions
        </a>
      </div>
    </section>
  );
}

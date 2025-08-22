import React, { useEffect, useRef } from "react";
import ground from "../../assets/img/NetImage.png";
import "../../pages/Home.css";
import { gsap } from "../../lib/gsapSetup";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const ref = useRef(null);
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/products");

  };

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
    <section
      ref={ref}
      className="hero-hero md:height-100vh"
      aria-label="VP Associated hero"
    >
      <div
        className="bg"
        style={{
          backgroundImage: `url(${ground})`,
          backdropFilter: "blur(30px)",
        }}
      ></div>
      <div className="overlay"></div>
      <div className="content">
        <h1>Elevate Your Game with VP Associated</h1>
        <p>
          We specialize in providing top-tier football grounds, ensuring optimal
          performance and safety for players. Our commitment to quality and
          innovation makes us the preferred choice for clubs and organizations.
        </p>
        <a href="" className="cta" onClick={(e) => handleClick(e)}>
          Explore Our Products
        </a>
      </div>
    </section>
  );
}

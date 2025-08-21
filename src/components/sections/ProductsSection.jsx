import React, { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsapSetup";
import "./ProductsSection.css";

export default function ProductsSection() {
  const items = [
    {
      name: "FOOTBALL TURF",
      img: "https://images.unsplash.com/photo-1536122985607-4fe00b283652?w=1200&auto=format&fit=crop",
    },
    {
      name: "CRICKET TURF",
      img: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1200&auto=format&fit=crop",
    },
    {
      name: "SWIMMING POOL",
      img: "https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=1200&auto=format&fit=crop",
    },
    {
      name: "BADMINTON COURT",
      img: "https://images.unsplash.com/photo-1613925433860-648790ef0c3a?w=1200&auto=format&fit=crop",
    },
    {
      name: "TENNIS",
      img: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=1200&auto=format&fit=crop",
    },
    {
      name: "VOLLEY BALL",
      img: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=1200&auto=format&fit=crop",
    },
    {
      name: "MULTI SPORT TURF",
      img: "https://images.unsplash.com/photo-1542652694-40abf526446e?w=1200&auto=format&fit=crop",
    },
    {
      name: "LANDSCAPE GRASS",
      img: "https://images.unsplash.com/photo-1558635924-d11fe7a3d853?w=1200&auto=format&fit=crop",
    },
    {
      name: "PROJECT CONSULTANCY",
      img: "https://images.unsplash.com/photo-1664575600796-ffa828c5cb6e?w=1200&auto=format&fit=crop",
    },
    {
      name: "BASKETBALL COURT",
      img: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&auto=format&fit=crop",
    },
  ];

  const containerRef = useRef(null);
  const headersRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate image containers
      gsap.to(".imagecontainer", {
        ease: "expo.inOut",
        width: "100%",
        duration: 2,
        stagger: 2,
        repeat: -1, // Infinite repeat
        repeatDelay: 0, // No delay between repeats
        yoyo: true, // Animate back and forth
      });

      // Animate headers
      gsap.to(".headers h2", {
        ease: "power3.in",
        top: -150,
        duration: 3,
        delay: 0.2,
        stagger: 1.5,
        repeat: -1, // Infinite repeat
        repeatDelay: 0, // No delay between repeats
        yoyo: true, // Animate back and forth
      });

      // Reset the animation after all items have shown
      const totalDuration = items.length * 2 + 1; // Total time for one complete cycle
      gsap.delayedCall(totalDuration, () => {
        gsap.set([".imagecontainer", ".headers h2"], { clearProps: "all" });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [items.length]);

  return (
    <section className="products-gallery" ref={containerRef}>
      <div className="section-header">
        <h1>Services</h1>
        
      </div>
      <div className="gallery-center">
        {items.map((item, index) => (
          <div
            key={item.name}
            id={`pic${index + 1}`}
            className="imagecontainer"
          >
            <img src={item.img} alt={item.name} />
          </div>
        ))}
      </div>
      <div className="headers" ref={headersRef}>
        {items.map((item) => (
          <h2 key={item.name}>{item.name}</h2>
        ))}
      </div>
    </section>
  );
}

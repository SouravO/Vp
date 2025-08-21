import React, { useEffect, useRef, useState } from "react";
import "./Work.css";

const images = [
  "https://assets.codepen.io/215059/card-stack-demo-05.jpg",
  "https://assets.codepen.io/215059/card-stack-demo-04.jpg",
  "https://assets.codepen.io/215059/card-stack-demo-06.jpg",
  "https://assets.codepen.io/215059/card-stack-demo-07.jpg",
  "https://assets.codepen.io/215059/card-stack-demo-08.jpg",
];

const CARD_COUNT = images.length;

const Work = () => {
  const mainRef = useRef(null);
  const scrollerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const main = mainRef.current;
    if (!scroller || !main) return;

    const onScrollSnapChange = () => {
      const w = main.getBoundingClientRect().width || scroller.clientWidth;
      const idx = Math.round(scroller.scrollLeft / w);
      setActiveIndex(Math.max(0, Math.min(CARD_COUNT - 1, idx)));
    };

    // Use scroll event and debounce to update active index
    let rafId = null;
    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        onScrollSnapChange();
      });
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });

    // warning toggle on mousedown
    const warn = () => {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 3000);
    };
    main.addEventListener("mousedown", warn);

    // initialize
    onScrollSnapChange();

    return () => {
      scroller.removeEventListener("scroll", onScroll);
      main.removeEventListener("mousedown", warn);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const computeCardStyle = (index) => {
    const steps = index - activeIndex;
    const abs = Math.abs(steps);
    // base transforms
    if (steps === 0) {
      return {
        transform: `translateX(0%) rotateY(0deg) translateZ(0px) scale(1)`,
        opacity: 1,
        zIndex: 100 - abs,
      };
    }

    // cards to the right (index > active) move right
    if (steps > 0) {
      const tx = 30 + (abs - 1) * 12; // percent
      const tz = -80 - (abs - 1) * 30; // px
      const ry = -18; // rotateY negative
      const rz = 2 + abs; // small rotateZ
      const opacity = 1 / Math.pow(2.2, abs);
      return {
        transform: `translateX(${tx}%) rotateY(${ry}deg) rotateZ(${rz}deg) translateZ(${tz}px)`,
        opacity,
        zIndex: 100 - abs,
      };
    }

    // cards to the left (index < active) move left
    if (steps < 0) {
      const tx = -30 - (abs - 1) * 12; // percent
      const tz = -80 - (abs - 1) * 30; // px
      const ry = 18;
      const rz = -2 - abs;
      const opacity = 1 / Math.pow(2.2, abs);
      return {
        transform: `translateX(${tx}%) rotateY(${ry}deg) rotateZ(${rz}deg) translateZ(${tz}px)`,
        opacity,
        zIndex: 100 - abs,
      };
    }
  };

  return (
    <main
      ref={mainRef}
      className="work-main"
      data-active-index={activeIndex}
      data-debug={false}
    >
      <div className="card-stack">
        {images.map((src, i) => (
          <div
            key={i}
            className="card"
            style={computeCardStyle(i)}
            aria-hidden={i !== activeIndex}
          >
            <img src={src} alt={`card-${i}`} />
          </div>
        ))}
      </div>

      <div className="scroller" ref={scrollerRef}>
        {images.map((_, i) => (
          <div key={i} className="scroll-item" />
        ))}
      </div>

      <div className={`warning ${showWarning ? "show" : ""}`}>
        <span>
          Mouse drag not supported. Use responsive mode or a touch pad to
          scroll.
        </span>
      </div>
    </main>
  );
};

export default Work;

import React, { useEffect, useRef } from "react";
import { gsap } from "../lib/gsapSetup";
import "./LoadingScreen.css";

const LoadingScreen = ({ setIsLoading }) => {
  const ballRef = useRef(null);
  const textRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Fade out the loading screen
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => setIsLoading(false),
        });
      },
    });

    // Initial ball bounce animation
    tl.from(ballRef.current, {
      y: -100,
      duration: 0.5,
      ease: "bounce.out",
    })
      .to(ballRef.current, {
        y: -80,
        duration: 0.4,
        ease: "power1.inOut",
        yoyo: true,
        repeat: 2,
      })
      // Rotate the ball slightly during bounces
      .to(
        ballRef.current,
        {
          rotation: 360,
          duration: 1.2,
          ease: "none",
        },
        0
      )
      // Animate the text
      .from(
        textRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: "power2.out",
        },
        0.5
      );
  }, [setIsLoading]);

  return (
    <div className="loading-screen" ref={containerRef}>
      <div className="loading-content">
        <div className="football" ref={ballRef}>
          <svg viewBox="0 0 100 100" width="60" height="60">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="#fff"
              stroke="#000"
              strokeWidth="2"
            />
            <path d="M50 5 L50 95 M5 50 L95 50" stroke="#000" strokeWidth="2" />
            <path
              d="M20 20 L80 80 M20 80 L80 20"
              stroke="#000"
              strokeWidth="2"
            />
          </svg>
        </div>
        <h2 ref={textRef}>Loading...</h2>
      </div>
    </div>
  );
};

export default LoadingScreen;

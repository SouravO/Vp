import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ground from "../../assets/img/footballGround.jpg";
gsap.registerPlugin(ScrollTrigger);

export default function Scene() {
  const component = useRef(null);
  const slider = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const sliderEl = slider.current;
      if (!sliderEl) return;

      const panels = gsap.utils.toArray(".panel", sliderEl);
      if (!panels.length) return;

      console.log("Found panels:", panels.length);

      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: sliderEl,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          end: () => "+=" + sliderEl.offsetWidth,
          markers: false, // Enable to see what's happening
        },
      });
    }, component);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={component} style={{ width: "100%" }}>
      {/* First section */}
      <div
        style={{
          height: "50vh",
          background: "#0f2419",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#c1c3c2",
        }}
      >
        <div>
          <h1>Testing horizontal scrolling w/ three sections</h1>
          <h2>First Container</h2>
        </div>
      </div>

      {/* Horizontal slider */}
      <div
        ref={slider}
        style={{
          height: "100vh",
          display: "flex",
          overflow: "hidden",
          width: "100%",
        }}
      >
        <div
          className="panel"
          style={{
            minWidth: "100vw",
            height: "100vh",
            background: "#0e1a12",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "2rem",
          }}
        >
          <div>
            Gallery
            <div>↓</div>
          </div>
        </div>

        <div
          className="panel flex flex-col"
          style={{
            minWidth: "100vw",
            height: "100vh",
            background: "#0e1a12",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "2rem",
          }}
        >
          <div>
            Turf
          </div>
          <div>
            <img src={ground} alt="Description"
            width={"300%"} />
          </div>
        </div>

        <div
          className="panel"
          style={{
            minWidth: "100vw",
            height: "100vh",
            background: "#0e1a12",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "2rem",
          }}
        >
          TWO
        </div>

        <div
          className="panel"
          style={{
            minWidth: "100vw",
            height: "100vh",
            background: "#0e1a12",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "2rem",
          }}
        >
          THREE
        </div>
      </div>

      {/* Last section */}
      {/* <div
        style={{
          height: "100vh",
          background: "#e0e0e0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2>Last Container</h2>
      </div> */}
    </div>
  );
}

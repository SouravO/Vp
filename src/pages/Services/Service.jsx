import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import "../Services/Service.css";

gsap.registerPlugin(ScrollTrigger);

export default function Service() {
  const rootRef = useRef(null);
  const sliderRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const sliderEl = sliderRef.current;
      if (!sliderEl) return;

      const panels = gsap.utils.toArray(sliderEl.querySelectorAll(".panel"));
      if (!panels.length) return;

      const endDistance = () => window.innerWidth * (panels.length - 1);

      // ensure pinned element sits above following sections
      gsap.set(sliderEl, { zIndex: 10 });

      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: sliderEl,
          pin: true,
          pinSpacing: true,
          pinReparent: true,
          anticipatePin: 1,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          end: () => "+=" + endDistance(),
          invalidateOnRefresh: true,
          // markers: true,
        },
      });
    }, rootRef);

    requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative isolate bg-neutral-900 text-white"
    >
      {/* Heading / intro */}
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-3xl md:text-5xl font-semibold leading-tight">
          Our Services
        </h2>
        <p className="mt-4 text-neutral-300 max-w-2xl">
          Scroll to explore — the cards below move horizontally while this
          section is pinned.
        </p>
      </div>

      {/* Pinned horizontal gallery (the trigger) */}
      <div className="h-screen">
        <div ref={sliderRef} className="relative z-10 flex h-full">
          <div className="panel w-screen h-full shrink-0 relative">
            <img
              className="w-full h-full object-cover"
              src="https://images.pexels.com/photos/5207262/pexels-photo-5207262.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1200"
              alt="Work 1"
            />
          </div>
          <div className="panel w-screen h-full shrink-0 relative">
            <img
              className="w-full h-full object-cover"
              src="https://images.pexels.com/photos/3371358/pexels-photo-3371358.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1200"
              alt="Work 2"
            />
          </div>
          <div className="panel w-screen h-full shrink-0 relative">
            <img
              className="w-full h-full object-cover"
              src="https://images.pexels.com/photos/3618545/pexels-photo-3618545.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1200"
              alt="Work 3"
            />
          </div>
          <div className="panel w-screen h-full shrink-0 relative">
            <img
              className="w-full h-full object-cover"
              src="https://images.pexels.com/photos/4791474/pexels-photo-4791474.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1200"
              alt="Work 4"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { useLayoutEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugin once
if (!gsap.core.globals()["ScrollTrigger"]) {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HorizontalPhotoScroller({
  images = [],
  panelWidthVW = 100,
  gapVW = 0,
}) {
  const rootRef = useRef(null);
  const trackRef = useRef(null);

  const slides = useMemo(() => {
    if (images?.length) return images;
    return [
      {
        src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2000&auto=format&fit=crop",
        alt: "Mountain at sunrise",
        caption: "Sunrise over the range",
      },
      {
        src: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=2000&auto=format&fit=crop",
        alt: "City skyline at dusk",
        caption: "City lights",
      },
      {
        src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2000&auto=format&fit=crop",
        alt: "Desert road",
        caption: "The long road",
      },
      {
        src: "https://images.unsplash.com/photo-1501785888041-56a472ef9381?q=80&w=2000&auto=format&fit=crop",
        alt: "Forest waterfall",
        caption: "Hidden falls",
      },
      {
        src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2000&auto=format&fit=crop",
        alt: "Desert road",
        caption: "The long road",
      },
    ];
  }, [images]);

  useLayoutEffect(() => {
    const mm = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mm.matches) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const panels = gsap.utils.toArray(".hps-panel");
      if (!panels.length) return;

      const panelWidthPx = () => (panelWidthVW / 100) * window.innerWidth;
      const gapPx = () => (gapVW / 100) * window.innerWidth;

      gsap.set(track, { position: "relative", display: "flex" });
      gsap.set(panels, {
        minWidth: () => panelWidthPx(),
        width: () => panelWidthPx(),
        marginRight: () => gapPx(),
      });

      // Optimized scroll distance calculation for different screen sizes
      const getScrollDistance = () => {
        const isMobile = window.innerWidth < 768;
        const isTablet = window.innerWidth < 1024;

        // Reduce scroll distance on smaller screens
        let multiplier = 1;
        if (isMobile) {
          multiplier = 0.6; // 60% of normal scroll distance on mobile
        } else if (isTablet) {
          multiplier = 0.8; // 80% on tablet
        }

        const totalWidth = (panelWidthPx() + gapPx()) * (panels.length - 1);
        return totalWidth * multiplier;
      };

      // Initial animation for panels
      gsap.set(panels, { autoAlpha: 0, y: 20 });
      gsap.to(panels, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
      });

      // Horizontal scroll animation
      gsap.to(track, {
        x: () => -(panelWidthPx() + gapPx()) * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          pin: true,
          scrub: 0.5, // Reduced scrub value for smoother scrolling
          start: "top top",
          end: () => "+=" + getScrollDistance(),
          invalidateOnRefresh: true,
          anticipatePin: 1,
          refreshPriority: -1,
          // Add snap points for better mobile experience
          snap: {
            snapTo: 1 / (panels.length - 1),
            duration: { min: 0.2, max: 0.3 },
            delay: 0.1,
            ease: "power1.inOut",
          },
          // markers: true, // Uncomment for debugging
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, [gapVW, panelWidthVW]);

  return (
    <section
      ref={rootRef}
      className="hps-root relative w-full h-screen overflow-hidden bg-neutral-950 text-white"
      aria-label="Horizontal Photo Scroller"
    >
      <div className="absolute inset-x-0 top-4 md:top-10 z-10 mx-auto max-w-6xl px-4 md:px-6">
        <h1 className="text-2xl md:text-3xl lg:text-5xl font-semibold tracking-tight">
          Photographic Journey
        </h1>
        <p className="mt-2 md:mt-3 max-w-prose text-xs md:text-sm lg:text-base text-neutral-300">
          Scroll to explore. The gallery pins and glides horizontally with GSAP
          ScrollTrigger.
        </p>
      </div>

      {/* Gradient overlays - smaller on mobile */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-8 md:w-24 bg-gradient-to-r from-neutral-950/80 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-8 md:w-24 bg-gradient-to-l from-neutral-950/80 to-transparent" />

      <div ref={trackRef} className="h-full items-center">
        {slides.map((img, i) => (
          <figure
            key={i}
            className="hps-panel group relative h-full select-none overflow-hidden rounded-none md:rounded-2xl shadow-2xl"
          >
            <img
              src={img.src}
              alt={img.alt ?? `Slide ${i + 1}`}
              className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
              draggable={false}
              loading={i < 2 ? "eager" : "lazy"}
            />

            {(img.caption || img.alt) && (
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-3 md:p-4 lg:p-6">
                <span className="inline-block rounded-lg bg-neutral-900/60 px-2 md:px-3 py-1 text-xs md:text-sm backdrop-blur">
                  {img.caption || img.alt}
                </span>
              </figcaption>
            )}

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 md:h-32 bg-gradient-to-t from-black/60 to-transparent" />
          </figure>
        ))}
      </div>

      {/* Mobile scroll indicator */}
      <div className="md:hidden absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex items-center gap-1 bg-neutral-900/60 backdrop-blur rounded-full px-3 py-1">
          <span className="text-xs text-neutral-300">Scroll horizontally</span>
          <svg
            className="w-3 h-3 text-neutral-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}

export function DemoHorizontalPhotoScroller() {
  const photos = [
    {
      src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2000&auto=format&fit=crop",
      alt: "Mountains at sunrise",
      caption: "Sunrise ridge",
    },
    {
      src: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=2000&auto=format&fit=crop",
      alt: "City skyline",
      caption: "Evening skyline",
    },
    {
      src: "https://images.unsplash.com/photo-1501785888041-56a472ef9381?q=80&w=2000&auto=format&fit=crop",
      alt: "Waterfall in forest",
      caption: "Hidden falls",
    },
    {
      src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2000&auto=format&fit=crop",
      alt: "Desert road",
      caption: "To the horizon",
    },
  ];

  return (
    <div className="min-h-[200vh] md:min-h-[300vh] bg-neutral-950">
      <div className="mx-auto max-w-5xl px-4 md:px-6 py-12 md:py-24 text-white/80">
        <h2 className="text-xl md:text-2xl lg:text-4xl font-semibold">
          Scroll Down
        </h2>
        <p className="mt-2 text-sm md:text-base text-neutral-300">
          This filler section shows how the pinning engages as you reach the
          gallery.
        </p>
      </div>

      <HorizontalPhotoScroller images={photos} panelWidthVW={100} gapVW={2} />

      <div className="mx-auto max-w-5xl px-4 md:px-6 py-12 md:py-24 text-white/80">
        <h3 className="text-lg md:text-xl lg:text-3xl font-semibold">
          End of Gallery
        </h3>
        <p className="mt-2 text-sm md:text-base text-neutral-300">
          After the horizontal sequence, normal vertical scrolling resumes.
        </p>
      </div>
    </div>
  );
}

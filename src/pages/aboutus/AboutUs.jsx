import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import turfImg from "../../assets/img/ground.jpg";
import "./aboutus.css";

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const rootRef = useRef(null);
  const imgRef = useRef(null);
  const titleRef = useRef(null);
  const paraRef = useRef(null);
  const linkRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // image entrance (slide in + subtle bounce)
      gsap.from(imgRef.current, {
        x: -120,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        onComplete: () => {
          gsap.to(imgRef.current, {
            y: -8,
            repeat: 3,
            yoyo: true,
            duration: 0.35,
            ease: "power1.inOut",
          });
        },
      });

      // heading
      gsap.from(titleRef.current, {
        y: 28,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // paragraph
      gsap.from(paraRef.current, {
        y: 18,
        opacity: 0,
        duration: 0.9,
        delay: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // link
      gsap.from(linkRef.current, {
        y: 10,
        opacity: 0,
        duration: 0.7,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="min-h-screen bg-[#0f2419] text-white flex items-center py-12 md:py-24"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12">
          {/* left image */}
          <div
            className="flex-shrink-0 flex justify-center md:justify-start"
            ref={imgRef}
          >
            <div className="w-48 h-28 md:w-64 md:h-40 rounded-xl overflow-hidden shadow-lg bg-[#12321f]">
              <img
                src={turfImg}
                alt="turf"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* right text */}
          <div className="max-w-2xl w-full md:ml-4 text-center md:text-left px-2 md:px-0">
            <h1
              ref={titleRef}
              className="text-2xl md:text-4xl font-extrabold mb-3 md:mb-4"
            >
              About GroundPro
            </h1>
            <p
              ref={paraRef}
              className="text-green-200 mb-4 md:mb-6 leading-relaxed text-sm md:text-base"
            >
              GroundPro is at the forefront of creating exceptional football
              grounds. We merge years of expertise with a genuine passion for
              football, ensuring every project reflects the highest standards of
              quality and performance. Our commitment to innovation,
              sustainability, and client satisfaction drives us to deliver
              world-class results that consistently exceed expectations.
            </p>
            <a
              ref={linkRef}
              href="/learn-more"
              className="inline-block text-green-400 font-semibold hover:underline"
            >
              Learn More →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;

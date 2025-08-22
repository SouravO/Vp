import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ContactUs = () => {
  const rootRef = useRef(null);
  const location = useLocation();
  const [selectedProduct, setSelectedProduct] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Fix white space by ensuring body matches background
  useEffect(() => {
    const prevMargin = document.body.style.margin;
    const prevPadding = document.body.style.padding;
    const prevBg = document.body.style.backgroundColor;
    const prevHeight = document.body.style.height;

    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.backgroundColor = "#0e1a12";
    document.body.style.height = "auto";

    return () => {
      document.body.style.margin = prevMargin;
      document.body.style.padding = prevPadding;
      document.body.style.backgroundColor = prevBg;
      document.body.style.height = prevHeight;
    };
  }, []);

  // Get product type from navigation state
  useEffect(() => {
    if (location.state?.productType) {
      setSelectedProduct(location.state.productType);
    }
  }, [location.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // Validate form
    if (
      !formData.name ||
      !formData.email ||
      !formData.message ||
      !selectedProduct
    ) {
      alert("Please fill in all fields");
      return;
    }

    // Create email content
    const subject = `New Quote Request - ${selectedProduct}`;
    const body = `
Name: ${formData.name}
Email: ${formData.email}
Product Type: ${selectedProduct}

Message:
${formData.message}
`.trim();

    // Create mailto link
    const mailtoLink = `mailto:vpassociated@yahoo.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    // Open email client
    window.location.href = mailtoLink;

    // Reset form after submission
    setFormData({ name: "", email: "", message: "" });
    setSelectedProduct("");
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Initial states (avoid layout shift)
      gsap.set(".cu-clip", {
        clipPath: "inset(0 100% 0 0)",
        willChange: "clip-path",
      });
      gsap.set(".cu-fade", {
        autoAlpha: 0,
        filter: "blur(6px)",
        willChange: "opacity, filter",
      });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 75%",
          end: "bottom 40%",
          once: true,
          // markers: true,
        },
      });

      tl.to(".cu-clip", {
        clipPath: "inset(0 0% 0 0)",
        duration: 0.9,
        stagger: 0.12,
      })
        // list items fade in
        .to(
          ".cu-list > li",
          { autoAlpha: 1, filter: "blur(0px)", duration: 0.5, stagger: 0.08 },
          "-=0.35"
        )
        // form fields
        .to(
          ".cu-field",
          { autoAlpha: 1, filter: "blur(0px)", duration: 0.5, stagger: 0.08 },
          "-=0.25"
        )
        // button
        .to(
          ".cu-button",
          { autoAlpha: 1, filter: "blur(0px)", duration: 0.4 },
          "-=0.2"
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="bg-[#0e1a12] text-neutral-100 w-full">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="flex gap-6 flex-col md:!flex-row">
          {/* Left: Copy + details */}
          <div className="md:basis-1/2 md:flex-none space-y-8">
            <div>
              <h2 className="cu-clip text-3xl md:text-5xl font-semibold tracking-tight">
                Connect With Us
              </h2>
              <p className="cu-clip mt-4 text-neutral-300 max-w-xl leading-relaxed">
                Have a project in mind? We&apos;d love to hear from you. Reach
                out to our team to discuss your needs and how we can help bring
                your vision to life.
              </p>
            </div>

            {/* Do NOT fade the UL; fade individual LIs */}
            <ul className="cu-list space-y-5">
              <li className="cu-fade flex items-start gap-3">
                <span className="mt-0.5 text-lime-500">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V21a1 1 0 01-1 1C10.3 22 2 13.7 2 3a1 1 0 011-1h4.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.2 2.2z" />
                  </svg>
                </span>
                <a
                  href="tel:+918111816181"
                  className="text-neutral-200 hover:text-lime-400 transition-colors duration-300 cursor-pointer"
                >
                  +91 8111816181
                </a>
              </li>

              <li className="cu-fade flex items-start gap-3">
                <span className="mt-0.5 text-lime-500">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20 4H4a2 2 0 00-2 2v.4l10 6 10-6V6a2 2 0 00-2-2zm0 4.75l-9.4 5.64a1 1 0 01-1.2 0L4 8.75V18a2 2 0 002 2h12a2 2 0 002-2V8.75z" />
                  </svg>
                </span>
                <a
                  href="mailto:vpassociated@yahoo.com"
                  className="text-neutral-200 hover:text-lime-400 transition-colors duration-300 cursor-pointer"
                >
                  vpassociated@yahoo.com
                </a>
              </li>

              <li className="cu-fade flex items-start gap-3">
                <span className="mt-0.5 text-lime-500">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 119.5 9 2.5 2.5 0 0112 11.5z" />
                  </svg>
                </span>
                <a
                  href="https://maps.google.com/?q=Ground Floor, 19/79, VP Associated, Kodampuzha, Kozhikode, Vazhayur- 673632, Kerala, India"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-200 hover:text-lime-400 transition-colors duration-300 cursor-pointer"
                >
                  Ground Floor, 19/79, VP Associated, Kodampuzha, Kozhikode,
                  Vazhayur- 673632, Kerala, India
                </a>
              </li>
            </ul>
          </div>

          {/* Right: Form */}
          <form
            onSubmit={onSubmit}
            className="md:basis-1/2 md:flex-none space-y-5"
          >
            <div className="flex gap-2">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Name"
                required
                className="cu-field cu-fade w-full h-12 rounded-xl bg-black/30 border border-white/10 px-4 text-neutral-200 placeholder:text-neutral-500 outline-none focus:ring-2 focus:ring-lime-500/60"
                aria-label="Your Name"
              />
              <select
                className="cu-field cu-fade w-full h-12 rounded-xl bg-black/30 border border-white/10 px-4 text-neutral-200 placeholder:text-neutral-500 outline-none focus:ring-2 focus:ring-lime-500/60"
                aria-label="Product Type"
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                required
                style={{
                  colorScheme: "dark",
                }}
              >
                <option
                  value=""
                  disabled
                  style={{ backgroundColor: "#0a120d", color: "#e5e5e5" }}
                >
                  Product Type
                </option>
                <option
                  value="Safety Net"
                  style={{ backgroundColor: "#0a120d", color: "#e5e5e5" }}
                >
                  Safety Net
                </option>
                <option
                  value="Webbing Sling"
                  style={{ backgroundColor: "#0a120d", color: "#e5e5e5" }}
                >
                  Webbing Sling
                </option>
                <option
                  value="Artificial Grass"
                  style={{ backgroundColor: "#0a120d", color: "#e5e5e5" }}
                >
                  Artificial Grass
                </option>
                <option
                  value="Artificial Turf FieldsT"
                  style={{ backgroundColor: "#0a120d", color: "#e5e5e5" }}
                >
                  Artificial Turf Fields
                </option>
                {/* Aluminium Foil Container */}
                <option
                  value="Aluminium Foil Container"
                  style={{ backgroundColor: "#0a120d", color: "#e5e5e5" }}
                >
                  Aluminium Foil Container
                </option>
                {/* Football Goal Post */}
                <option
                  value="Football Goal Post"
                  style={{ backgroundColor: "#0a120d", color: "#e5e5e5" }}
                >
                  Football Goal Post
                </option>
                {/* Aluminium Foil Container Making Machine */}
                <option
                  value="Aluminium Foil Container Making Machine"
                  style={{ backgroundColor: "#0a120d", color: "#e5e5e5" }}
                >
                  Aluminium Foil Container Making Machine
                </option>

              </select>

            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Your Email"
              required
              className="cu-field cu-fade w-full h-12 rounded-xl bg-black/30 border border-white/10 px-4 text-neutral-200 placeholder:text-neutral-500 outline-none focus:ring-2 focus:ring-lime-500/60"
              aria-label="Your Email"
            />
            <textarea
              rows={6}
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Your Message"
              required
              className="cu-field cu-fade w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-neutral-200 placeholder:text-neutral-500 outline-none focus:ring-2 focus:ring-lime-500/60 resize-y"
              aria-label="Your Message"
            />
            <button
              type="submit"
              className="cu-button cu-fade inline-flex items-center justify-center rounded-full bg-lime-500 px-6 py-3 text-sm font-semibold text-black shadow-sm hover:bg-lime-400 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-lime-500/70"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;

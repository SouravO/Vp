import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Products.css";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Products() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [index, setIndex] = useState(0);

  // Refs for animation targets
  const headerRef = useRef(null);
  const filtersRef = useRef(null);
  const productsGridRef = useRef(null);

  const filters = ["All", "Turf", "Lighting", "Accessories"];

  const products = [
    {
      id: 1,
      name: "Natural Grass Fields",
      description:
        "Experience the classic feel of natural grass, meticulously maintained for peak performance.",
      image:
        "https://images.unsplash.com/photo-1470440629860-1f4e46e7f7c7?q=80&w=1200&auto=format&fit=crop",
      category: "Turf",
    },
    {
      id: 2,
      name: "Artificial Turf Fields",
      description:
        "Durable and versatile artificial turf, offering consistent playability and low maintenance.",
      image:
        "https://images.unsplash.com/photo-1434648957308-5e6a859697e8?q=80&w=1200&auto=format&fit=crop",
      category: "Turf",
    },
    {
      id: 3,
      name: "Advanced Lighting",
      description:
        "State-of-the-art, energy-efficient lighting to extend playing hours and ensure visibility.",
      image:
        "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1200&auto=format&fit=crop",
      category: "Lighting",
    },
    {
      id: 4,
      name: "Shock Pads",
      description:
        "Professional shock absorption systems for enhanced player safety and comfort.",
      image:
        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop",
      category: "Accessories",
    },
    {
      id: 5,
      name: "Drainage Systems",
      description:
        "Advanced drainage solutions ensuring optimal field conditions in all weather.",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200&auto=format&fit=crop",
      category: "Accessories",
    },
    {
      id: 6,
      name: "Goal Posts",
      description:
        "Professional-grade goal posts built to FIFA standards for competitive play.",
      image:
        "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=1200&auto=format&fit=crop",
      category: "Accessories",
    },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesFilter =
      activeFilter === "All" || product.category === activeFilter;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // GSAP Animations
  useEffect(() => {
    // Header Animation - Fade in from top
    gsap.fromTo(
      headerRef.current.children,
      {
        y: -50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
      }
    );

    // Filters Animation
    gsap.fromTo(
      ".filter-section",
      {
        y: 30,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: filtersRef.current,
          start: "top 90%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Products Grid Animation
    gsap.fromTo(
      ".product-card",
      {
        y: 80,
        opacity: 0,
        scale: 0.9,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: productsGridRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Re-animate products when filter changes
  useEffect(() => {
    if (productsGridRef.current) {
      gsap.fromTo(
        ".product-card",
        {
          y: 20,
          opacity: 0,
          scale: 0.95,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        }
      );
    }
  }, [filteredProducts]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft")
        setIndex((i) => (i - 1 + products.length) % products.length);
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % products.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const prev = () =>
    setIndex((i) => (i - 1 + products.length) % products.length);
  const next = () => setIndex((i) => (i + 1) % products.length);

  const item = products[index];

  return (
    <section className="bg-[#0e1a12] text-white min-h-screen py-16 w-full">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Products</h1>
          <p className="text-neutral-300 text-lg max-w-3xl mx-auto leading-relaxed">
            Explore our wide range of high-quality football ground solutions.
            From natural grass to advanced artificial turf, we have everything
            you need to create the perfect playing surface.
          </p>
        </div>

        {/* Filters and Search */}
        <div
          ref={filtersRef}
          className="filter-section flex flex-col md:flex-row justify-between items-start gap-6 mb-12"
        >
          {/* Filter Buttons */}
          <div className="flex items-center gap-4">
            <span className="text-neutral-400 text-sm">Filter by:</span>
            <div className="flex gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    activeFilter === filter
                      ? "bg-lime-500 text-black shadow-lg shadow-lime-500/25"
                      : "bg-white/10 text-neutral-300 hover:bg-white/20"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-neutral-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-72 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all duration-300"
            />
          </div>
        </div>

        {/* Products Grid */}
        <div
          ref={productsGridRef}
          className="grid grid-cols-1 md:!grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="product-card bg-black/40 rounded-xl overflow-hidden hover:bg-black/60 transition-all duration-500 group hover:scale-105 hover:shadow-2xl hover:shadow-lime-500/10"
            >
              {/* Product Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-lime-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Product Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-lime-300 transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-neutral-300 text-sm leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="text-lime-400 text-sm font-medium hover:text-lime-300 transition-all duration-300 hover:scale-105">
                    View Details
                  </button>
                  <button className="bg-lime-500 text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-lime-400 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-lime-500/25">
                    Request Quote
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-neutral-400 text-lg mb-4">
              No products found matching your criteria.
            </div>
            <button
              onClick={() => {
                setActiveFilter("All");
                setSearchTerm("");
              }}
              className="text-lime-400 hover:text-lime-300 transition-all duration-300 hover:scale-105 bg-white/10 px-6 py-2 rounded-lg hover:bg-white/20"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

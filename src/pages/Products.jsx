import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Products.css";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Products() {
  const navigate = useNavigate();
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
      name: "Safety Net",
      // description for safety net
      
      description:
        "Protective safety nets designed for maximum strength and durability, providing reliable fall protection and ensuring safety in construction, sports, and industrial environments.",
      image:
        "https://images.unsplash.com/photo-1470440629860-1f4e46e7f7c7?q=80&w=1200&auto=format&fit=crop",
      category: "Turf",
    },
    //Webbing Sling
    {
      id: 2,
      name: "Webbing Sling",
      description: "High-strength webbing slings engineered for safe, efficient, and versatile lifting operations. Lightweight yet durable, they provide excellent load stability and are ideal for construction, logistics, and industrial applications.",
      image:
        "https://images.unsplash.com/photo-1542831371-4c8b8c8c8c8c?q=80&w=1200&auto=format&fit=crop",
      category: "Accessories",
    },
    // Artificial Grass
    {
      id: 3,
      name: "Artificial Grass",
     description: "Lush, realistic artificial grass solutions designed for landscaping, sports fields, and recreational areas. Durable, low-maintenance, and weather-resistant, providing year-round greenery with a natural look and feel.",
      image:
        "https://images.unsplash.com/photo-1555685812-3c8c8c8c8c8c?q=80&w=1200&auto=format&fit=crop",
      category: "Turf",
    },
    {
      id: 4,
      name: "Artificial Turf Fields",
      description: "Durable and versatile artificial turf fields designed to deliver consistent playability, reduced maintenance, and enhanced performance. Ideal for sports facilities, schools, and recreational areas.",
      image:
        "https://images.unsplash.com/photo-1434648957308-5e6a859697e8?q=80&w=1200&auto=format&fit=crop",
      category: "Turf",
    },
    //Aluminium Foil Container
    {
      id: 5,
      name: "Aluminium Foil Container",
      description:
        "Durable and versatile aluminium foil containers for food packaging and storage.",
      image:
        "https://images.unsplash.com/photo-1589927986089-358123789b8b?q=80&w=1200&auto=format&fit=crop",
      category: "Accessories",
    },
    // Football Goal Post
    {
      id: 6,
      name: "Football Goal Post",
      description:
        "Professional-grade football goal posts built to FIFA standards for competitive play.",
      image:
        "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1200&auto=format&fit=crop",
      category: "Lighting",
    },
    // Aluminium Foil Container Making Machine
    {
      id: 7,
      name: "Aluminium Foil Container Making Machine",
      description:
        "High-speed machines for efficient production of aluminium foil containers.",
      image:
        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop",
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

  // Navigate to contact page with product type
  const handleRequestQuote = (productName) => {
    navigate('/contact', { state: { productType: productName } });
  };

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
              <div className="p-6 flex flex-col justify-between h-auto">
                <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-lime-300 transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-neutral-300 text-sm leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {/* <button className="text-lime-400 text-sm font-medium hover:text-lime-300 transition-all duration-300 hover:scale-105">
                    View Details
                  </button> */}
                  <button className="bg-lime-500 text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-lime-400 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-lime-500/25" onClick={()=>handleRequestQuote(product.name)}>
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

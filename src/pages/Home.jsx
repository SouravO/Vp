import { useEffect } from "react";
import "./Home.css";
import HeroSection from "../components/sections/HeroSection";
import ProductsSection from "../components/sections/ProductsSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import WhyChooseSection from "../components/sections/WhyChooseSection";
import ProcessSection from "../components/sections/ProcessSection";
import TestimonialsSection from "../components/sections/TestimonialsSection";
import ContactSection from "../components/sections/ContactSection";
import PreviewSection from "../components/sections/PreviewSection";
import AboutUs from "./aboutus/aboutus";
import Service from "./Services/Service";
import Work from "./Works/Work";
import ContactUs from "./ContactUs/ContactUs";
import Footer from "./Footer/Footer";
import Scene from "./Scene/Scene";
import Gallery from "./Gallery/Gallery";

export default function Home() {
  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );
    elements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <HeroSection />
      <ProductsSection />
      <WhyChooseSection />
      {/* <Service /> */}

      {/* <PreviewSection /> */}
      <AboutUs />
      <ContactUs />
      <Gallery />
      {/* <Scene /> */}
      <Footer />

    </>
  );
}

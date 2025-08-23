import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import LoadingScreen from "./components/LoadingScreen";
import WhatsAppButton from "./components/WhatsAppButton";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services/Service";
import Projects from "./pages/Projects";
import Products from "./pages/Products";
import ContactUs from "./pages/ContactUs/ContactUs";

function App() {
  const [isLoading, setIsLoading] = useState(true);

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

  // lightweight parallax for hero background
  useEffect(() => {
    let raf = null;
    const heroBg = () => document.querySelector(".hero-hero .bg");
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        const el = heroBg();
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        // amount between -0.2 and 0.2 of height
        const t = (rect.top / vh) * 0.2;
        el.style.transform = `translateY(${t * 100}px)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <Router basename="/Vp">
      {isLoading ? (
        <LoadingScreen setIsLoading={setIsLoading} />
      ) : (
        <>
          <NavBar />
          <main>
            <Outlet />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/products" element={<Products />} />
              <Route path="/contact" element={<ContactUs />} />
            </Routes>
          </main>
          <WhatsAppButton />
        </>
      )}
    </Router>
  );
}

export default App;

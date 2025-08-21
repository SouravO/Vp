import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const linkClass = ({ isActive }) => (isActive ? "fp-link active" : "fp-link");

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fp-nav" role="banner">
      <div className="fp-nav-inner">
        <div className="fp-brand">
          <span className="fp-logo" aria-hidden="true">
            ▲
          </span>
          <span className="fp-name">FieldPro</span>
        </div>

        <button
          className="fp-hamburger"
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav
          className={`fp-menu ${isMobileMenuOpen ? "fp-menu-open" : ""}`}
          aria-label="Main navigation"
        >
          <NavLink to="/" className={linkClass} onClick={closeMobileMenu}>
            HOME
          </NavLink>
          <NavLink to="/about" className={linkClass} onClick={closeMobileMenu}>
            ABOUT US
          </NavLink>
          <NavLink
            to="/products"
            className={linkClass}
            onClick={closeMobileMenu}
          >
            PRODUCTS
          </NavLink>
          <NavLink
            to="/projects"
            className={linkClass}
            onClick={closeMobileMenu}
          >
            PROJECTS
          </NavLink>
          <NavLink to="/news" className={linkClass} onClick={closeMobileMenu}>
            NEWS
          </NavLink>
          <NavLink
            to="/maintenance"
            className={linkClass}
            onClick={closeMobileMenu}
          >
            MAINTENANCE
          </NavLink>
        </nav>

        <NavLink to="/contact" className="fp-cta" onClick={closeMobileMenu}>
          CONTACT US
        </NavLink>
      </div>
    </header>
  );
};

export default NavBar;

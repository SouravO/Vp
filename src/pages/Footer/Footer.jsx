import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#101510] text-neutral-300">
      <div className="mx-auto max-w-7xl px-6 pt-6 md:pt-8 space-y-7">
        {/* Top row */}
        <div className="grid grid-cols-1 md:!grid-cols-3 items-center gap-6 ">
          {/* Brand */}
          <a href="/" className="flex items-center gap-3 text-neutral-200">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-lime-500/10 text-lime-400">
              {/* Simple turf/leaf mark */}
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <circle cx="12" cy="12" r="9" opacity=".35" />
                <path d="M6.5 14.5c4.5-1.2 7.2-3.9 9-9 1.1 5.3-.3 10-6.4 12.9" />
              </svg>
            </span>
            <span className="text-lg font-medium">GroundPro</span>
          </a>

          {/* Nav (center) */}
          <nav className="flex justify-center">
            <ul className="flex items-center gap-8 text-sm">
              <li>
                <a
                  href="#about"
                  className="hover:text-neutral-100 transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-neutral-100 transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#work"
                  className="hover:text-neutral-100 transition-colors"
                >
                  Work
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-neutral-100 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          {/* Socials (right) */}
          <div className="flex md:justify-end justify-center items-center gap-4 text-lime-400/80">
            <a
              href="#"
              aria-label="Twitter"
              className="hover:text-lime-400 transition-colors"
            >
              {/* X/Twitter */}
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M17.53 3H20l-6.49 7.41L21.5 21H15l-4.69-5.49L4.92 21H2.46l6.93-7.91L2 3h6l4.22 4.94L17.53 3Zm-1.05 16h1.66L7.62 5H5.92l10.56 14Z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="hover:text-lime-400 transition-colors"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M13 22v-8h3l.5-3H13V8.8c0-.9.3-1.5 1.7-1.5H17V4.5c-.3 0-1.4-.1-2.6-.1-2.6 0-4.4 1.6-4.4 4.6V11H7v3h3v8h3Z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-lime-400 transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
                <circle cx="12" cy="12" r="3.2" />
                <circle
                  cx="17.4"
                  cy="6.6"
                  r="1"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Divider */}
        <hr className="mt-6 border-lime-900/50" />

        {/* Copyright */}
        <p className="py-4 text-center text-sm text-neutral-400">
          © 2024 GroundPro. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

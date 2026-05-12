"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll
  useEffect(() => {
    const handler = (e: Event) => {
      const targetElement = e.target as HTMLElement | null;

      if (
        targetElement &&
        targetElement.tagName === "A" &&
        targetElement.getAttribute("href")?.startsWith("#")
      ) {
        e.preventDefault();

        const targetId = targetElement.getAttribute("href");

        if (!targetId) return;

        const scrollTarget = document.querySelector(targetId);

        if (scrollTarget) {
          scrollTarget.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", handler);
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.removeEventListener("click", handler);
      });
    };
  }, []);

  // Active menu item
  useEffect(() => {
    const updateActive = () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollY = window.pageYOffset;

      sections.forEach((section) => {
        const sec = section as HTMLElement;

        const sectionHeight = sec.offsetHeight;
        const sectionTop = sec.offsetTop - 120;
        const sectionId = sec.getAttribute("id");

        const desktopItem = document.querySelector(
          `.nav-links a[href="#${sectionId}"]`
        );

        const bottomItem = document.querySelector(
          `.bottom-mobile-nav a[href="#${sectionId}"]`
        );

        if (
          scrollY > sectionTop &&
          scrollY <= sectionTop + sectionHeight
        ) {
          document
            .querySelectorAll(".nav-links a")
            .forEach((item) => item.classList.remove("active"));

          document
            .querySelectorAll(".bottom-mobile-nav a")
            .forEach((item) => item.classList.remove("active"));

          if (desktopItem) {
            desktopItem.classList.add("active");
          }

          if (bottomItem) {
            bottomItem.classList.add("active");
          }
        }
      });
    };

    window.addEventListener("scroll", updateActive);

    updateActive();

    return () => window.removeEventListener("scroll", updateActive);
  }, []);

  return (
    <>
      {/* TOP NAVBAR */}
      <nav id="navbar" className={scrolled ? "scrolled" : ""}>
        <div className="nav-container">

          <a href="#home" className="logo">
            <div className="logo-image">
              <Image
                src="/images/logı.jpeg"
                alt="ByteQue Logo"
                width={45}
                height={45}
              />
            </div>

            <div className="logo-text">ByteQue</div>
          </a>

          {/* DESKTOP MENU */}
          <ul className="nav-links">
            <li><a href="#home">Anasayfa</a></li>
            <li><a href="#about">Hakkımızda</a></li>
            <li><a href="#portfolio">Projeler</a></li>
            <li><a href="#skills">Sunduklarımız</a></li>
            <li><a href="#contact">İletişim</a></li>
          </ul>

        </div>
      </nav>

      {/* MOBILE BOTTOM NAV */}
      <div className="bottom-mobile-nav">

        {/* HOME */}
        <a href="#home" className="bottom-nav-item active">

          <div className="active-line"></div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="23"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 10.5L12 3l9 7.5"></path>
            <path d="M5 9.5V21h14V9.5"></path>
          </svg>

          <span>Anasayfa</span>
        </a>

        {/* ABOUT */}
        <a href="#about" className="bottom-nav-item">

          <div className="active-line"></div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="23"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21a8 8 0 1 0-16 0"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>

          <span>Hakkımızda</span>
        </a>

        {/* PORTFOLIO */}
        <a href="#portfolio" className="bottom-nav-item">

          <div className="active-line"></div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="23"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="7" width="18" height="13" rx="2"></rect>
            <path d="M8 7V5a4 4 0 0 1 8 0v2"></path>
          </svg>

          <span>Projeler</span>
        </a>

        {/* SERVICES */}
        <a href="#skills" className="bottom-nav-item">

          <div className="active-line"></div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="23"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="7" height="7" rx="1"></rect>
            <rect x="14" y="3" width="7" height="7" rx="1"></rect>
            <rect x="14" y="14" width="7" height="7" rx="1"></rect>
            <rect x="3" y="14" width="7" height="7" rx="1"></rect>
          </svg>

          <span>Sunduklarımız</span>
        </a>

        {/* CONTACT */}
        <a href="#contact" className="bottom-nav-item">

          <div className="active-line"></div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="23"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.63 2.61a2 2 0 0 1-.45 2.11L8.1 9.91a16 16 0 0 0 6 6l1.47-1.14a2 2 0 0 1 2.11-.45c.83.3 1.71.51 2.61.63A2 2 0 0 1 22 16.92z"></path>
          </svg>

          <span>İletişim</span>
        </a>

      </div>
    </>
  );
}
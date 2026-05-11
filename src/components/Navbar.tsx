
"use client";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [mobileActive, setMobileActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile nav on link click
  useEffect(() => {
    if (!mobileActive) return;
    const closeMenu = () => setMobileActive(false);
    document.querySelectorAll(".mobile-nav a").forEach(link => {
      link.addEventListener("click", closeMenu);
    });
    return () => {
      document.querySelectorAll(".mobile-nav a").forEach(link => {
        link.removeEventListener("click", closeMenu);
      });
    };
  }, [mobileActive]);

  // Smooth scroll for nav links
  useEffect(() => {
    const handler = (e: Event) => {
      const targetElement = e.target as HTMLElement | null;
      if (targetElement && targetElement.tagName === "A" && targetElement.getAttribute("href")?.startsWith("#")) {
        e.preventDefault();
        const scrollTarget = document.querySelector(targetElement.getAttribute("href")!);
        if (scrollTarget) {
          scrollTarget.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", handler);
    });
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener("click", handler);
      });
    };
  }, []);

  // Update active nav item on scroll
  useEffect(() => {
    const updateActive = () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollY = window.pageYOffset;
      sections.forEach(section => {
        const sec = section as HTMLElement;
        const sectionHeight = sec.offsetHeight;
        const sectionTop = sec.offsetTop - 100;
        const sectionId = sec.getAttribute("id");
        const menuItem = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
        const mobileMenuItem = document.querySelector(`.mobile-nav a[href="#${sectionId}"]`);
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          document.querySelectorAll(".nav-links a").forEach(item => item.classList.remove("active"));
          document.querySelectorAll(".mobile-nav a").forEach(item => item.classList.remove("active"));
          if (menuItem) menuItem.classList.add("active");
          if (mobileMenuItem) mobileMenuItem.classList.add("active");
        }
      });
    };
    window.addEventListener("scroll", updateActive);
    updateActive();
    return () => window.removeEventListener("scroll", updateActive);
  }, []);

  return (
    <nav id="navbar" className={scrolled ? "scrolled" : ""}>
      <div className="nav-container">
        <a href="#home" className="logo">
          <div className="logo-icon">⚡</div>
          <div className="logo-text">ByteQue</div>
        </a>
        <ul className="nav-links">
          <li><a href="#home">Anasayfa</a></li>
          <li><a href="#about">Hakkımızda</a></li>
          <li><a href="#skills">Yetenekler</a></li>
          <li><a href="#portfolio">Projeler</a></li>
          <li><a href="#timeline">Yolculuk</a></li>
          <li><a href="#contact">İletişim</a></li>
        </ul>
        <div
          className={`mobile-menu-btn${mobileActive ? " active" : ""}`}
          id="mobileMenuBtn"
          onClick={() => setMobileActive(!mobileActive)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className={`mobile-nav${mobileActive ? " active" : ""}`} id="mobileNav">
        <ul>
          <li><a href="#home">Anasayfa</a></li>
          <li><a href="#about">Hakkımda</a></li>
          <li><a href="#skills">Yetenekler</a></li>
          <li><a href="#timeline">Yolculuk</a></li>
          <li><a href="#portfolio">Projeler</a></li>
          <li><a href="#contact">İletişim</a></li>
        </ul>
      </div>
    </nav>
  );
}

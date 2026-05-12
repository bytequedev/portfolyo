"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile nav on route change or link click
  useEffect(() => {
    const close = () => setMobileOpen(false);
    document.querySelectorAll('.mobile-nav-overlay a').forEach((el) => {
      el.addEventListener('click', close);
    });
    return () => {
      document.querySelectorAll('.mobile-nav-overlay a').forEach((el) => {
        el.removeEventListener('click', close);
      });
    };
  }, []);

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll with offset for navbar height
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
          // Find navbar height
          const navbar = document.getElementById("navbar");
          const navbarHeight = navbar ? navbar.offsetHeight : 0;
          const targetTop = (scrollTarget as HTMLElement).getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: targetTop - navbarHeight - 5,
            behavior: "smooth",
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

  // Active menu item (fix for mobile)
  useEffect(() => {
    const updateActive = () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollY = window.pageYOffset;
      let found = false;
      sections.forEach((section, idx) => {
        const sec = section as HTMLElement;
        const sectionHeight = sec.offsetHeight;
        const sectionTop = sec.offsetTop - 130; // offset for navbar
        const sectionId = sec.getAttribute("id");
        const desktopItem = document.querySelector(
          `.nav-links a[href="#${sectionId}"]`
        );
        const bottomItem = document.querySelector(
          `.bottom-mobile-nav a[href="#${sectionId}"]`
        );
        if (
          scrollY >= sectionTop &&
          scrollY < sectionTop + sectionHeight
        ) {
          found = true;
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
      // Eğer hiçbir section görünürde değilse, ilk menüyü aktif yap
      if (!found) {
        const firstDesktop = document.querySelector(".nav-links a");
        const firstMobile = document.querySelector(".bottom-mobile-nav a");
        document
          .querySelectorAll(".nav-links a")
          .forEach((item) => item.classList.remove("active"));
        document
          .querySelectorAll(".bottom-mobile-nav a")
          .forEach((item) => item.classList.remove("active"));
        if (firstDesktop) firstDesktop.classList.add("active");
        if (firstMobile) firstMobile.classList.add("active");
      }
    };
    window.addEventListener("scroll", updateActive);
    // Click event: menüye tıklanınca aktifliği hemen güncelle
    document.querySelectorAll('.bottom-mobile-nav a').forEach((el) => {
      el.addEventListener('click', updateActive);
    });
    updateActive();
    return () => {
      window.removeEventListener("scroll", updateActive);
      document.querySelectorAll('.bottom-mobile-nav a').forEach((el) => {
        el.removeEventListener('click', updateActive);
      });
    };
  }, []);

  return (
    <>
      {/* TOP NAVBAR - Desktop Only */}
      <nav
        id="navbar"
        className={
          `${scrolled ? "scrolled" : ""} navbar-responsive`
        }
        style={{ display: "block" }}
      >
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
          <ul className="nav-links desktop-menu">
            <li><a href="#home">Anasayfa</a></li>
            <li><a href="#about">Hakkımızda</a></li>
            <li><a href="#portfolio">Projeler</a></li>
            <li><a href="#skills">Sunduklarımız</a></li>
            <li><a href="#contact">İletişim</a></li>
          </ul>
        </div>
        {/* Hamburger icon for mobile */}
        <div
          className={`hamburger mobile-menu${mobileOpen ? " open" : ""}`}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>

      {/* MOBILE NAV OVERLAY */}
      <div className={`mobile-nav-overlay${mobileOpen ? " open" : ""}`}>
        <a href="#home">Anasayfa</a>
        <a href="#about">Hakkımızda</a>
        <a href="#portfolio">Projeler</a>
        <a href="#skills">Sunduklarımız</a>
        <a href="#contact">İletişim</a>
      </div>
    </>
  );
}
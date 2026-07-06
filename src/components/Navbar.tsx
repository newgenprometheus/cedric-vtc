"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Mail, Menu, X } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import Magnetic from "@/components/anim/Magnetic";
import { NAV_ITEMS, SITE } from "@/lib/constants";

const ANCHOR_OFFSET = 88;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuTl = useRef<gsap.core.Timeline | null>(null);

  const closeMenu = () => setIsOpen(false);

  const scrollToHash = (href: string) => {
    const targetId = href.replace("#", "");
    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;

    const offset = targetId === "reservation" ? 0 : ANCHOR_OFFSET;
    const lenis = window.__lenis;
    if (lenis) {
      lenis.scrollTo(targetEl, { offset: -offset, duration: 1.4, force: true });
      return;
    }
    const targetTop = targetEl.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
  };

  const handleAnchor = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    event.preventDefault();
    closeMenu();
    scrollToHash(href);
  };

  useGSAP(
    () => {
      const menu = menuRef.current;
      if (!menu) return;
      const panel = menu.querySelector(".vtc-menu__panel");
      const backdrop = menu.querySelector(".vtc-menu__backdrop");
      const brand = menu.querySelectorAll(".vtc-menu__brand span");
      const links = menu.querySelectorAll(".vtc-menu__nav a");
      const actions = menu.querySelectorAll(".vtc-menu__actions a");

      const tl = gsap.timeline({ paused: true });
      tl.set(menu, { autoAlpha: 1 }, 0)
        .fromTo(backdrop, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, ease: "power1.out" }, 0)
        .fromTo(
          panel,
          { xPercent: 106 },
          { xPercent: 0, duration: 0.85, ease: "expo.inOut" },
          0,
        )
        .fromTo(
          brand,
          { autoAlpha: 0, y: 34 },
          { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.09, ease: "power4.out" },
          0.38,
        )
        .fromTo(
          links,
          { autoAlpha: 0, y: 26 },
          { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.06, ease: "power4.out" },
          0.45,
        )
        .fromTo(
          actions,
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.06, ease: "power3.out" },
          0.6,
        );
      menuTl.current = tl;
    },
    { scope: menuRef },
  );

  useEffect(() => {
    const tl = menuTl.current;
    if (!tl) return;

    document.documentElement.dataset.menuOpen = String(isOpen);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    tl.timeScale(reduced ? 99 : isOpen ? 1 : 1.5);

    if (isOpen) {
      window.__lenis?.stop();
      tl.play();
    } else {
      window.__lenis?.start();
      tl.reverse();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <>
      <header className="header header--fixed ui-light vtc-nav" data-nosnippet="">
        <div className="header__content container-h py-layout">
          <nav className="group group--nav group--between header__nav" aria-label="Navigation principale">
            <div className="btn-group btn-group--gap btn-container header__nav-last">
              <button
                className="btn btn--primary btn--sm btn--square vtc-icon-btn"
                type="button"
                onClick={() => setIsOpen((value) => !value)}
                aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
                aria-expanded={isOpen}
                aria-controls="menu"
              >
                <span className="btn__content">
                  <span className="btn__icon">{isOpen ? <X size={20} /> : <Menu size={22} />}</span>
                </span>
              </button>

              <a className="btn btn--secondary btn--sm btn--square vtc-icon-btn" href={SITE.mailto} aria-label="Écrire à Cédric VTC">
                <span className="btn__content">
                  <span className="btn__icon">
                    <Mail size={18} />
                  </span>
                </span>
              </a>
            </div>

            <Magnetic strength={12}>
              <a
                className="btn btn--primary btn--sm btn--rotation header__nav-wide-button vtc-nav-cta"
                href="#reservation"
                aria-label="Réserver une voiture"
                onClick={(event) => handleAnchor(event, "#reservation")}
              >
                <span className="btn__content">
                  <span className="btn__text">Réserver une voiture</span>
                  <span className="btn__icon">
                    <ArrowUpRight size={18} />
                  </span>
                </span>
              </a>
            </Magnetic>
          </nav>
        </div>
      </header>

      <div
        className={`vtc-menu ${isOpen ? "is-open" : ""}`}
        role="dialog"
        aria-hidden={!isOpen}
        aria-modal={isOpen}
        aria-label="Menu principal"
        id="menu"
        ref={menuRef}
      >
        <button className="vtc-menu__backdrop" type="button" aria-label="Fermer le menu" onClick={closeMenu} />
        <div className="vtc-menu__panel">
          <div className="vtc-menu__brand" aria-hidden="true">
            <span>Cédric</span>
            <span>VTC</span>
          </div>

          <nav className="vtc-menu__nav" aria-label="Sections du site">
            {NAV_ITEMS.map((item, index) => (
              <a href={item.href} onClick={(event) => handleAnchor(event, item.href)} key={item.href}>
                <span className="vtc-menu__num">0{index + 1}</span>
                <span className="vtc-menu__label">{item.label}</span>
                <ArrowUpRight size={18} />
              </a>
            ))}
          </nav>

          <div className="vtc-menu__actions">
            <a href="#reservation" onClick={(event) => handleAnchor(event, "#reservation")}>
              Réserver une voiture
            </a>
            <a href={SITE.mailto}>Écrire à Cédric</a>
          </div>
        </div>
      </div>
    </>
  );
}

"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const SEEN_KEY = "vtc-intro-seen";

function markDone() {
  window.__vtcIntroDone = true;
  document.documentElement.classList.remove("is-preloading");
  document.dispatchEvent(new CustomEvent("vtc:intro"));
}

/**
 * Rideau d'ouverture. Rendu côté serveur (couvre l'hydratation), levé en
 * timeline GSAP, puis dispatch `vtc:intro` pour lancer l'entrée du hero.
 * Skips : visite déjà vue dans la session, ou prefers-reduced-motion.
 * Failsafe CSS pur si le JS ne se charge pas (voir globals.css).
 */
export default function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      let seen = false;
      try {
        seen = sessionStorage.getItem(SEEN_KEY) === "1";
      } catch {
        seen = false;
      }
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (seen || reduced) {
        gsap.set(root, { display: "none" });
        markDone();
        return;
      }

      document.documentElement.classList.add("is-preloading");
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        /* stockage indisponible : l'intro rejouera, sans conséquence */
      }

      const kicker = root.querySelector("[data-pre-kicker]");
      const brandLines = root.querySelectorAll(".u-mask > span");
      const line = root.querySelector("[data-pre-line]");
      const progress = root.querySelector("[data-pre-progress]");
      const inner = root.querySelector(".vtc-preloader__inner");

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(progress, { scaleX: 0 }, { scaleX: 1, duration: 1.6, ease: "power2.inOut" }, 0.1)
        .fromTo(kicker, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.15)
        .fromTo(
          brandLines,
          { yPercent: 118 },
          { yPercent: 0, duration: 1.1, stagger: 0.12 },
          0.25,
        )
        .fromTo(
          line,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.9, ease: "expo.inOut", transformOrigin: "left center" },
          0.5,
        )
        .to(inner, { autoAlpha: 0, y: -18, duration: 0.5, ease: "power2.in" }, 1.5)
        .add(markDone, 1.72)
        .to(root, { yPercent: -100, duration: 1.0, ease: "expo.inOut" }, 1.75)
        .set(root, { display: "none" });
    },
    { scope: rootRef },
  );

  return (
    <div className="vtc-preloader" ref={rootRef} aria-hidden="true">
      <span className="vtc-preloader__progress" data-pre-progress />
      <div className="vtc-preloader__inner">
        <p className="vtc-preloader__kicker" data-pre-kicker>
          Chauffeur privé — Toulouse
        </p>
        <div className="vtc-preloader__brand">
          <span className="u-mask">
            <span>
              <em>Cédric</em> VTC
            </span>
          </span>
        </div>
        <span className="vtc-preloader__line" data-pre-line />
      </div>
    </div>
  );
}

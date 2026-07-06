"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Attraction magnétique douce (signature desktop). Coupée sur pointeur
 * grossier (touch) et si prefers-reduced-motion.
 */
export default function Magnetic({
  children,
  strength = 18,
}: {
  children: React.ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const el = ref.current;
      if (!el || !contextSafe) return;
      if (!window.matchMedia("(pointer: fine)").matches) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const xTo = gsap.quickTo(el, "x", { duration: 0.9, ease: "elastic.out(1, 0.5)" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.9, ease: "elastic.out(1, 0.5)" });

      const onMove = contextSafe((event: Event) => {
        const e = event as PointerEvent;
        const r = el.getBoundingClientRect();
        const relX = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
        const relY = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
        xTo(relX * strength);
        yTo(relY * strength * 0.7);
      });
      const onLeave = contextSafe(() => {
        xTo(0);
        yTo(0);
      });

      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope: ref },
  );

  return (
    <span className="u-magnetic" ref={ref}>
      {children}
    </span>
  );
}

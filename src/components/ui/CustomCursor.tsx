"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

type GalleryDir = "prev" | "next" | null;

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [gallery, setGallery] = useState<GalleryDir>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(true); // Default true to prevent SSR mismatch/flash

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // 1. Touch device detection (Norme 42 compliance)
    const checkTouchDevice = () => {
      const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      setIsTouchDevice(hasTouch);
    };

    checkTouchDevice();

    if (isTouchDevice) return;

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Curseur contextuel galerie (cursor--arrow Aircenter) : chip ‹ › selon
      // la moitié survolée d'un [data-cursor-gallery]
      const target = e.target as HTMLElement;
      const galleryEl = target.closest?.("[data-cursor-gallery]");
      if (galleryEl) {
        const rect = galleryEl.getBoundingClientRect();
        setGallery(e.clientX < rect.left + rect.width / 2 ? "prev" : "next");
      } else {
        setGallery(null);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("clickable") ||
        target.closest(".clickable")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible, isTouchDevice]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          pointerEvents: "none",
          zIndex: 99999,
          translateX: "-50%",
          translateY: "-50%",
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: gallery ? 1.7 : isHovered ? 1.5 : 1,
          backgroundColor: gallery
            ? "rgba(8, 8, 8, 0.55)"
            : isHovered
              ? "rgba(214, 192, 141, 0.1)"
              : "rgba(255, 255, 255, 0)",
          borderColor:
            gallery || isHovered ? "rgba(214, 192, 141, 0.85)" : "rgba(255, 255, 255, 0.3)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <motion.span
          className="vtc-cursor-chip"
          animate={{ opacity: gallery ? 1 : 0, scale: gallery ? 1 : 0.5 }}
          transition={{ duration: 0.2 }}
          aria-hidden="true"
        >
          {gallery === "prev" ? <ChevronLeft size={15} /> : <ChevronRight size={15} />}
        </motion.span>
      </motion.div>
      {/* Inner Dot */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          backgroundColor: "var(--c-white)",
          pointerEvents: "none",
          zIndex: 99999,
          translateX: "-50%",
          translateY: "-50%",
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isHovered || gallery ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    </>
  );
}

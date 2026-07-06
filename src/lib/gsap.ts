import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import type Lenis from "lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

declare global {
  interface Window {
    __lenis?: Lenis;
    __vtcIntroDone?: boolean;
  }
}

export { gsap, ScrollTrigger, SplitText, useGSAP };

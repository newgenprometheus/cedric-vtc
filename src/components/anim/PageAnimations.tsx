"use client";

import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";

const EASE_OUT = "power4.out";
const EASE_SOFT = "power3.out";

/**
 * Chef d'orchestre unique des animations de la page (couche scroll
 * déclarative) : les sections posent des attributs `data-*`, zéro JS local.
 *
 *  - data-split           titre revele ligne par ligne (SplitText)
 *  - data-reveal          fondu + translation à l'entrée
 *  - data-reveal-group    stagger des enfants [data-reveal-item]
 *  - data-clip            image dévoilée au clip-path (variante "frame" :
 *                         conteneur seul, l'intérieur est géré ailleurs)
 *  - data-parallax="8"    dérive verticale scrubbée (± %)
 *  - data-line            hairline qui se dessine (scaleX)
 *  - data-count           chiffres comptés à l'entrée
 *  - data-marquee-track   bande défilante scrubbée au scroll
 *  - data-mask-stagger    lignes masquées (.u-mask > span) staggerées
 *  - data-hero="…"        rôles de l'intro hero (media/content/topline/word/lead/actions/cue)
 *
 * Tout vit sous matchMedia("prefers-reduced-motion: no-preference") :
 * si l'OS demande moins de mouvement, rien n'est caché, rien ne bouge.
 */
export default function PageAnimations() {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    let cancelled = false;

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    document.fonts.ready.then(() => {
      if (cancelled) return;

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cleanups: Array<() => void> = [];

        // ————————————————————————————————— Hero : intro chorégraphiée
        const hero = document.querySelector<HTMLElement>(".vtc-hero");
        if (hero) {
          const media = hero.querySelector<HTMLElement>("[data-hero='media']");
          const image = media?.querySelector("img") ?? null;
          const content = hero.querySelector<HTMLElement>("[data-hero='content']");
          const topline = gsap.utils.toArray<HTMLElement>("[data-hero='topline'] > span", hero);
          const wordLines = gsap.utils.toArray<HTMLElement>(
            "[data-hero='word'] .u-mask > span",
            hero,
          );
          const lead = hero.querySelector<HTMLElement>("[data-hero='lead']");
          const actions = gsap.utils.toArray<HTMLElement>("[data-hero='actions'] > *", hero);
          const cue = hero.querySelector<HTMLElement>("[data-hero='cue']");

          const intro = gsap.timeline({ paused: true, defaults: { ease: EASE_OUT } });
          const nav = document.querySelector<HTMLElement>(".vtc-nav");
          if (nav) {
            intro.fromTo(
              nav,
              { yPercent: -120 },
              { yPercent: 0, duration: 1.3, ease: "expo.out" },
              0.35,
            );
          }
          if (image) {
            intro.fromTo(
              image,
              { scale: 1.18 },
              { scale: 1.04, duration: 2.6, ease: "expo.out" },
              0,
            );
          }
          if (wordLines.length) {
            intro.fromTo(
              wordLines,
              { yPercent: 118 },
              { yPercent: 0, duration: 1.5, stagger: 0.14 },
              0.1,
            );
          }
          if (topline.length) {
            intro.fromTo(
              topline,
              { autoAlpha: 0, y: 16 },
              { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.1, ease: EASE_SOFT },
              0.7,
            );
          }
          const late = [lead, ...actions].filter(Boolean) as HTMLElement[];
          if (late.length) {
            intro.fromTo(
              late,
              { autoAlpha: 0, y: 26 },
              { autoAlpha: 1, y: 0, duration: 1, stagger: 0.1, ease: EASE_SOFT },
              0.85,
            );
          }
          if (cue) {
            intro.fromTo(
              cue,
              { autoAlpha: 0, scaleY: 0 },
              {
                autoAlpha: 1,
                scaleY: 1,
                duration: 0.9,
                ease: "expo.inOut",
                transformOrigin: "top center",
              },
              1.2,
            );
          }

          const play = () => intro.play();
          if (window.__vtcIntroDone) {
            play();
          } else {
            document.addEventListener("vtc:intro", play, { once: true });
            cleanups.push(() => document.removeEventListener("vtc:intro", play));
          }

          // Parallaxe du média + retrait du contenu quand on quitte le hero.
          if (media) {
            gsap.to(media, {
              yPercent: 16,
              ease: "none",
              scrollTrigger: {
                trigger: hero,
                start: "clamp(top top)",
                end: "bottom top",
                scrub: true,
              },
            });
          }
          if (content) {
            gsap.to(content, {
              yPercent: -8,
              autoAlpha: 0,
              ease: "none",
              scrollTrigger: {
                trigger: hero,
                start: "clamp(15% top)",
                end: "72% top",
                scrub: true,
              },
            });
          }
        }

        // ————————————————————————————————— Titres : lignes SplitText
        gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
          SplitText.create(el, {
            type: "lines",
            autoSplit: true,
            linesClass: "split-line",
            onSplit(self) {
              return gsap.from(self.lines, {
                autoAlpha: 0,
                yPercent: 55,
                duration: 1.15,
                ease: EASE_OUT,
                stagger: 0.09,
                scrollTrigger: { trigger: el, start: "top 85%", once: true },
              });
            },
          });
        });

        // ————————————————————————————————— Reveals génériques
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            autoAlpha: 0,
            y: 32,
            duration: 1.15,
            ease: EASE_SOFT,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((group) => {
          const items = group.querySelectorAll("[data-reveal-item]");
          if (!items.length) return;
          gsap.from(items, {
            autoAlpha: 0,
            y: 28,
            duration: 1,
            ease: EASE_SOFT,
            stagger: 0.09,
            scrollTrigger: { trigger: group, start: "top 86%", once: true },
          });
        });

        // ————————————————————————————————— Images : reveal masqué
        gsap.utils.toArray<HTMLElement>("[data-clip]").forEach((el) => {
          const tl = gsap.timeline({
            scrollTrigger: { trigger: el, start: "top 82%", once: true },
          });
          tl.fromTo(
            el,
            { clipPath: "inset(100% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.35, ease: "expo.inOut" },
            0,
          );
          const image = el.dataset.clip === "frame" ? null : el.querySelector("img");
          if (image) {
            tl.fromTo(
              image,
              { scale: 1.28 },
              { scale: 1.08, duration: 1.35, ease: "expo.inOut" },
              0,
            );
          }
        });

        // ————————————————————————————————— Parallaxe déclarative
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const amount = parseFloat(el.dataset.parallax ?? "8");
          if (!amount) return;
          gsap.fromTo(
            el,
            { yPercent: -amount * 0.4 },
            {
              yPercent: amount,
              ease: "none",
              scrollTrigger: {
                trigger: (el.closest("section") ?? el) as Element,
                start: "clamp(top bottom)",
                end: "clamp(bottom top)",
                scrub: true,
              },
            },
          );
        });

        // ————————————————————————————————— Hairlines qui se dessinent
        gsap.utils.toArray<HTMLElement>("[data-line]").forEach((el) => {
          gsap.from(el, {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 1.4,
            ease: "expo.inOut",
            scrollTrigger: {
              trigger: (el.closest("[data-line-scope]") ?? el) as Element,
              start: "top 74%",
              once: true,
            },
          });
        });

        // ————————————————————————————————— Carte trajets : pins + pulse
        const map = document.querySelector<HTMLElement>(".vtc-routes__map");
        if (map) {
          const pins = map.querySelectorAll(".vtc-routes__pin, .vtc-routes__center");
          if (pins.length) {
            gsap.from(pins, {
              autoAlpha: 0,
              scale: 0.82,
              y: 10,
              duration: 0.9,
              ease: "back.out(1.6)",
              stagger: 0.09,
              delay: 0.4,
              scrollTrigger: { trigger: map, start: "top 74%", once: true },
            });
          }
          const ping = map.querySelector(".vtc-routes__ping");
          if (ping) {
            gsap.fromTo(
              ping,
              { scale: 0.5, autoAlpha: 0.55 },
              {
                scale: 2.4,
                autoAlpha: 0,
                duration: 1.8,
                ease: "power2.out",
                repeat: 2,
                repeatDelay: 0.6,
                delay: 1.2,
                scrollTrigger: { trigger: map, start: "top 70%", once: true },
              },
            );
          }
        }

        // ————————————————————————————————— Compteurs (durées trajets)
        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
          const node = el.firstChild;
          if (!node || node.nodeType !== Node.TEXT_NODE) return;
          const finalText = node.textContent ?? "";
          if (!/\d/.test(finalText)) return;
          const proxy = { p: 0 };
          gsap.to(proxy, {
            p: 1,
            duration: 1.4,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
            onUpdate() {
              node.textContent = finalText.replace(/\d+/g, (m) =>
                String(Math.round(Number(m) * proxy.p)),
              );
            },
          });
        });

        // ————————————————————————————————— Marquee scrubbé au scroll
        gsap.utils.toArray<HTMLElement>("[data-marquee-track]").forEach((track) => {
          gsap.fromTo(
            track,
            { xPercent: 0 },
            {
              xPercent: -18,
              ease: "none",
              scrollTrigger: {
                trigger: track.parentElement,
                start: "clamp(top bottom)",
                end: "clamp(bottom top)",
                scrub: 1,
              },
            },
          );
        });

        // ————————————————————————————————— Lignes masquées (footer, …)
        gsap.utils.toArray<HTMLElement>("[data-mask-stagger]").forEach((el) => {
          const lines = el.querySelectorAll(".u-mask > span");
          if (!lines.length) return;
          gsap.from(lines, {
            yPercent: 118,
            duration: 1.4,
            ease: EASE_OUT,
            stagger: 0.12,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });

        // ————————————————————————————————— Header : cache/montre + scrim
        const header = document.querySelector<HTMLElement>(".vtc-nav");
        if (header) {
          const yTo = gsap.quickTo(header, "yPercent", { duration: 0.7, ease: "expo.out" });
          ScrollTrigger.create({
            start: 0,
            end: "max",
            onUpdate(self) {
              const y = self.scroll();
              header.classList.toggle("is-scrolled", y > 48);
              if (document.documentElement.dataset.menuOpen === "true" || y < 160) {
                yTo(0);
                return;
              }
              yTo(self.direction === 1 ? -140 : 0);
            },
          });
        }

        ScrollTrigger.refresh();

        return () => {
          cleanups.forEach((fn) => fn());
        };
      });
    });

    return () => {
      cancelled = true;
      window.removeEventListener("load", onLoad);
      mm.revert();
    };
  });

  return null;
}

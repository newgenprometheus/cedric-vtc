"use client";

import { useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { BriefcaseBusiness, MapPinned, Moon, Plane, TrainFront } from "lucide-react";
import LocalImage from "@/components/ui/LocalImage";
import { gsap, useGSAP } from "@/lib/gsap";
import { SERVICE_ITEMS } from "@/lib/constants";

const serviceIcons = [Plane, TrainFront, BriefcaseBusiness, Moon, MapPinned] as const;
const EASE = [0.22, 0.74, 0.22, 0.99] as const;
const COUNT = SERVICE_ITEMS.length;

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const mediaRef = useRef<HTMLDivElement>(null);
  const activeService = SERVICE_ITEMS[activeIndex];
  const ActiveIcon = serviceIcons[activeIndex];

  const { contextSafe } = useGSAP({ scope: mediaRef });

  // Transition d'image en clip vertical (imageClipInVertical Aircenter) :
  // la frame entrante se dévoile de bas en haut au-dessus de la sortante.
  const goTo = contextSafe((next: number) => {
    const index = (next + COUNT) % COUNT;
    setActiveIndex((current) => {
      if (index === current) return current;

      const frames = mediaRef.current?.querySelectorAll<HTMLElement>(".vtc-services__frame");
      const incoming = frames?.[index];
      if (incoming && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const image = incoming.querySelector("img");
        gsap.fromTo(
          incoming,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.85, ease: "expo.inOut", overwrite: true },
        );
        if (image) {
          gsap.fromTo(
            image,
            { scale: 1.16 },
            { scale: 1, duration: 0.85, ease: "expo.inOut", overwrite: true },
          );
        }
      }
      return index;
    });
  });

  const onMediaClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    goTo(activeIndex + (event.clientX < rect.left + rect.width / 2 ? -1 : 1));
  };

  return (
    <MotionConfig reducedMotion="user">
      <section id="services" className="section ui-dark ui-background vtc-services" aria-labelledby="services-title">
        <div className="container-h vtc-section-heading vtc-section-heading--split">
          <div>
            <p className="vtc-section-kicker">Services</p>
            <h2 id="services-title" data-split>
              Aéroport, gare, business, <em className="serif">soirée</em>
            </h2>
          </div>
          <p data-reveal>
            Chaque course est préparée avant le départ: horaire, point de rendez-vous, bagages, marge de sécurité et destination.
          </p>
        </div>

        <div className="container-h vtc-services__stage">
          <div
            className="vtc-services__media"
            data-clip="frame"
            data-cursor-gallery
            onClick={onMediaClick}
            role="presentation"
            ref={mediaRef}
          >
            {SERVICE_ITEMS.map((service, index) => (
              <div
                className={`vtc-services__frame ${index === activeIndex ? "is-active" : ""}`}
                key={service.title}
                aria-hidden={index !== activeIndex}
              >
                <LocalImage
                  src={service.image}
                  alt={index === activeIndex ? `${service.title} avec Cédric VTC en Tesla noire à Toulouse` : ""}
                  loading={index === 0 ? "eager" : "lazy"}
                  width={1920}
                  height={1080}
                  sizes="(max-width: 900px) 100vw, 62vw"
                />
              </div>
            ))}

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeService.eyebrow}
                className="vtc-services__media-label"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <ActiveIcon size={20} />
                <span>{activeService.eyebrow}</span>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="vtc-services__content" data-reveal>
            <div className="vtc-services__counter">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={activeIndex}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  {String(activeIndex + 1).padStart(2, "0")}
                </motion.span>
              </AnimatePresence>
              <span>/ {String(COUNT).padStart(2, "0")}</span>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeService.title}
                className="vtc-services__text"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <h3>{activeService.title}</h3>
                <p>{activeService.text}</p>
              </motion.div>
            </AnimatePresence>

            <div className="vtc-services__selector" role="tablist" aria-label="Choisir un service">
              {SERVICE_ITEMS.map((service, index) => {
                const Icon = serviceIcons[index];
                const isActive = index === activeIndex;

                return (
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={isActive ? "is-active" : ""}
                    onClick={() => goTo(index)}
                    key={service.title}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="service-indicator"
                        className="vtc-services__indicator"
                        transition={{ duration: 0.45, ease: EASE }}
                      />
                    )}
                    <Icon size={18} />
                    <span>{service.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}

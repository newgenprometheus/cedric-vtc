"use client";

import { ArrowUpRight, Check } from "lucide-react";
import LocalImage from "@/components/ui/LocalImage";
import Magnetic from "@/components/anim/Magnetic";
import { ASSETS, TESLA_POINTS } from "@/lib/constants";

export default function Fleet() {
  return (
    <section id="tesla" className="section ui-light ui-background vtc-tesla" aria-labelledby="tesla-title">
      <div className="container-h vtc-section-heading">
        <p className="vtc-section-kicker">Tesla</p>
        <h2 id="tesla-title" data-split>
          Tesla noire,
          <br />
          <em className="serif">présence discrète</em>
        </h2>
      </div>

      <div className="container-h vtc-tesla__grid">
        <div className="vtc-tesla__copy">
          <p data-reveal>
            Le véhicule doit soutenir le service sans prendre toute la place: arrivée nette, habitacle calme, conduite fluide et image cohérente pour les trajets privés comme business.
          </p>

          <ul data-reveal-group>
            {TESLA_POINTS.map((point) => (
              <li key={point} data-reveal-item>
                <Check size={18} />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <div data-reveal>
            <Magnetic>
              <a className="btn btn--secondary btn--rotation" href="#reservation">
                <span className="btn__content">
                  <span className="btn__text">Demander un trajet</span>
                  <span className="btn__icon">
                    <ArrowUpRight size={18} />
                  </span>
                </span>
              </a>
            </Magnetic>
          </div>
        </div>

        <div className="vtc-tesla__images">
          <picture className="vtc-tesla__image vtc-tesla__image--large" data-clip data-parallax="6">
            <LocalImage
              src={ASSETS.blagnac}
              alt="Tesla noire Cédric VTC devant l'aéroport Toulouse-Blagnac de nuit"
              loading="lazy"
              width={1920}
              height={1080}
              sizes="(max-width: 900px) 100vw, 58vw"
            />
          </picture>
          <picture className="vtc-tesla__image vtc-tesla__image--small" data-clip data-parallax="-8">
            <LocalImage
              src={ASSETS.interior}
              alt="Intérieur Tesla pour trajet VTC de nuit à Toulouse"
              loading="lazy"
              width={1920}
              height={1080}
              sizes="(max-width: 900px) 70vw, 24vw"
            />
          </picture>
        </div>
      </div>
    </section>
  );
}

"use client";

import { ArrowDown, ArrowUpRight } from "lucide-react";
import LocalImage from "@/components/ui/LocalImage";
import Magnetic from "@/components/anim/Magnetic";
import { ASSETS } from "@/lib/constants";

export default function Hero() {
  return (
    <section id="accueil" className="section section--no-margin ui-light ui-background vtc-hero">
      <h1 className="sr-only">Cédric VTC - chauffeur privé à Toulouse en Tesla noire</h1>

      <div className="vtc-hero__media" data-hero="media" aria-hidden="true">
        <LocalImage
          src={ASSETS.hero}
          alt=""
          priority
          sizes="100vw"
          width={1920}
          height={1080}
          className="vtc-hero__image"
        />
      </div>

      <div className="vtc-hero__shade" aria-hidden="true" />

      <div className="container-h vtc-hero__content" data-hero="content">
        <div className="vtc-hero__topline" data-hero="topline">
          <span>Chauffeur privé à Toulouse</span>
          <span>Tesla noire · sur réservation</span>
        </div>

        <div className="vtc-hero__wordmark" data-hero="word" aria-hidden="true">
          <span className="u-mask">
            <span>Cédric</span>
          </span>
          <span className="u-mask u-mask--stroke">
            <span>VTC</span>
          </span>
        </div>

        <div className="vtc-hero__footer">
          <p className="vtc-hero__lead" data-hero="lead">
            Transferts aéroport Blagnac, gare Matabiau, trajets business, soirées et longues
            distances depuis Toulouse centre.
          </p>

          <div className="vtc-hero__actions" data-hero="actions">
            <Magnetic>
              <a className="btn btn--primary btn--rotation" href="#reservation">
                <span className="btn__content">
                  <span className="btn__text">Réserver une voiture</span>
                  <span className="btn__icon">
                    <ArrowUpRight size={18} />
                  </span>
                </span>
              </a>
            </Magnetic>
            <Magnetic>
              <a className="btn btn--secondary btn--rotation" href="#services">
                <span className="btn__content">
                  <span className="btn__text">Voir les services</span>
                  <span className="btn__icon">
                    <ArrowDown size={18} />
                  </span>
                </span>
              </a>
            </Magnetic>
          </div>
        </div>
      </div>

      <div className="vtc-hero__cue" data-hero="cue" aria-hidden="true" />
    </section>
  );
}

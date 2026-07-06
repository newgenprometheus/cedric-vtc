"use client";

import { ArrowUpRight, Mail } from "lucide-react";
import { NAV_ITEMS, SITE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="section ui-dark ui-background vtc-footer" data-nosnippet="">
      <div className="container-h">
        <div className="vtc-footer__brand" data-mask-stagger aria-hidden="true">
          <span className="u-mask">
            <span>Cédric</span>
          </span>
          <span className="u-mask u-mask--stroke">
            <span>VTC</span>
          </span>
        </div>

        <div className="vtc-footer__grid" data-reveal-group>
          <div data-reveal-item>
            <p className="vtc-footer__caption">Chauffeur privé à Toulouse</p>
            <p>{SITE.description}</p>
          </div>

          <nav aria-label="Navigation pied de page" data-reveal-item>
            <p className="vtc-footer__caption">Navigation</p>
            {NAV_ITEMS.map((item) => (
              <a href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <div data-reveal-item>
            <p className="vtc-footer__caption">Contact</p>
            <a href={SITE.mailto} className="vtc-footer__mail">
              <Mail size={17} />
              {SITE.email}
            </a>
            <p>Sur réservation uniquement. Téléphone réel à confirmer.</p>
          </div>
        </div>

        <div className="vtc-footer__bottom" data-reveal>
          <p>© 2026 Cédric VTC. Tous droits réservés.</p>
          <a href={SITE.agencyUrl} target="_blank" rel="noopener noreferrer">
            Fait par 42.
            <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </footer>
  );
}

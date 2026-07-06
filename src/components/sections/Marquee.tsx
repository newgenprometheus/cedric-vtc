const DESTINATIONS = [
  "Toulouse",
  "Blagnac",
  "Matabiau",
  "Capitole",
  "Airbus",
  "Colomiers",
  "MEETT",
  "Occitanie",
];

/**
 * Bande destinations — défilement piloté par le scroll (scrub), jamais en
 * boucle autonome. Décorative : aria-hidden, contenu dupliqué du site.
 */
export default function Marquee() {
  const row = [...DESTINATIONS, ...DESTINATIONS, ...DESTINATIONS];

  return (
    <div className="vtc-marquee" aria-hidden="true">
      <div className="vtc-marquee__track" data-marquee-track>
        {row.map((word, index) => (
          <span className="vtc-marquee__item" key={`${word}-${index}`}>
            <em>{word}</em>
            <span className="vtc-marquee__dot" />
          </span>
        ))}
      </div>
    </div>
  );
}

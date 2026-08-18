export const SITE = {
  name: "Cédric VTC",
  shortName: "Cédric",
  url: "https://vtc-sigma.vercel.app",
  agencyUrl: "https://agence-42.com",
  phoneLabel: "Sur réservation",
  phoneHref: "#reservation",
  email: "contact@cedric-vtc.fr",
  mailto: "mailto:contact@cedric-vtc.fr",
  location: "Toulouse et sa région",
  description:
    "Chauffeur privé à Toulouse en Tesla noire pour transferts aéroport, gare Matabiau, trajets business, soirées et longues distances sur réservation.",
};

export const ASSETS = {
  hero: "/media/vtc/tesla-capitole-toulouse-nuit.webp",
  blagnac: "/media/vtc/tesla-blagnac-nuit.webp",
  interior: "/media/vtc/tesla-interieur-toulouse-nuit.webp",
  soiree: "/media/vtc/tesla-soiree-toulouse-nuit.webp",
  matabiau: "/media/vtc/tesla-matabiau-toulouse-nuit.webp",
  longueDistance: "/media/vtc/tesla-longue-distance-nuit.webp",
} as const;

export const NAV_ITEMS = [
  { label: "Tesla", href: "#tesla" },
  { label: "Services", href: "#services" },
  { label: "Trajets", href: "#trajets" },
  { label: "Réserver", href: "#reservation" },
] as const;

export const BOOKING_STEPS = [
  {
    title: "Décrivez",
    text: "Départ, arrivée, horaire et contraintes de prise en charge.",
  },
  {
    title: "Confirmation",
    text: "Cédric confirme la disponibilité, le tarif et le point de rendez-vous.",
  },
  {
    title: "Trajet",
    text: "Prise en charge à l'heure convenue, sans plateforme intermédiaire.",
  },
] as const;

export const SERVICE_ITEMS = [
  {
    title: "Aéroport Blagnac",
    eyebrow: "Vols & bagages",
    text: "Suivi de l'horaire, marge de sécurité et point de prise en charge confirmé avant le départ.",
    image: ASSETS.blagnac,
  },
  {
    title: "Gare Matabiau",
    eyebrow: "Trains & correspondances",
    text: "Accueil coordonné autour des quais, horaires suivis et trajet vers hôtel, rendez-vous ou domicile.",
    image: ASSETS.matabiau,
  },
  {
    title: "Business",
    eyebrow: "Rendez-vous",
    text: "Déplacements clients, journées multi-arrêts, conduite souple et discrétion pendant le trajet.",
    image: ASSETS.interior,
  },
  {
    title: "Soirée",
    eyebrow: "Centre-ville",
    text: "Restaurants, hôtels, événements, retours tardifs et trajets planifiés pour vos proches.",
    image: ASSETS.soiree,
  },
  {
    title: "Longue distance",
    eyebrow: "Sur devis",
    text: "Courses depuis Toulouse et sa région vers vos destinations prioritaires, avec organisation en amont.",
    image: ASSETS.longueDistance,
  },
] as const;

export const ROUTE_POINTS = [
  {
    value: "20-30",
    unit: "min",
    title: "Aéroport Blagnac",
    text: "Repère depuis Toulouse centre selon circulation et terminal.",
  },
  {
    value: "10-15",
    unit: "min",
    title: "Gare Matabiau",
    text: "Accueil coordonné pour arrivées, départs et correspondances.",
  },
  {
    value: "5-15",
    unit: "min",
    title: "Capitole / centre",
    text: "Hôtels, restaurants, bureaux et quartiers historiques.",
  },
  {
    value: "20-30",
    unit: "min",
    title: "Airbus / Colomiers",
    text: "Pôle aéronautique, rendez-vous business et sites industriels.",
  },
  {
    value: "25-35",
    unit: "min",
    title: "MEETT",
    text: "Parc des Expositions, salons, congrès et événements.",
  },
] as const;

export const TESLA_POINTS = [
  "Tesla noire dédiée aux trajets privés à Toulouse",
  "Habitacle silencieux et propre avant chaque prise en charge",
  "Conduite souple, discrète et adaptée au rythme du trajet",
] as const;

export const FAQ_ITEMS = [
  {
    question: "Comment réserver ?",
    answer:
      "Envoyez votre trajet via le formulaire. Cédric répond ensuite avec la disponibilité, le tarif et le point de rendez-vous.",
  },
  {
    question: "Peut-on réserver à l'avance ?",
    answer:
      "Oui. Les trajets aéroport, gare, business et soirées sont traités sur réservation pour éviter les attentes floues.",
  },
  {
    question: "Le service est-il disponible sans téléphone public ?",
    answer:
      "Oui. Tant que les coordonnées définitives ne sont pas confirmées, les demandes passent par le formulaire et l'adresse email.",
  },
  {
    question: "Bagages et équipements ?",
    answer:
      "Précisez les bagages, sièges enfants ou contraintes particulières dans le message afin de confirmer la faisabilité.",
  },
  {
    question: "Annulation ou modification ?",
    answer:
      "Prévenez dès que possible. La réservation est ajustée selon la disponibilité et l'horaire demandé.",
  },
] as const;

export const BOOKING_VEHICLES = ["Tesla noire"] as const;

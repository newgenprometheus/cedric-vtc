"use client";

import React, { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, LockKeyhole, Mail } from "lucide-react";
import { BOOKING_STEPS, BOOKING_VEHICLES, SERVICE_ITEMS, SITE } from "@/lib/constants";

const initialFormData = {
  pickup: "",
  dropoff: "",
  date: "",
  time: "",
  passengers: "1",
  service: SERVICE_ITEMS[0].title,
  vehicle: BOOKING_VEHICLES[0],
  name: "",
  phone: "",
  email: "",
  message: "",
};

const bookingFlow = [
  {
    eyebrow: "Étape 1",
    title: "Où commence et où se termine le trajet ?",
    text: "Indiquez les deux lieux clés. Une adresse approximative suffit pour démarrer.",
    fields: ["pickup", "dropoff"],
  },
  {
    eyebrow: "Étape 2",
    title: "Quand faut-il prévoir la prise en charge ?",
    text: "Date, heure et nombre de passagers permettent de vérifier la disponibilité.",
    fields: ["date", "time", "passengers"],
  },
  {
    eyebrow: "Étape 3",
    title: "Quel type de trajet souhaitez-vous ?",
    text: "Sélectionnez le contexte du déplacement et le véhicule souhaité.",
    fields: ["service", "vehicle"],
  },
  {
    eyebrow: "Étape 4",
    title: "Comment Cédric peut-il vous répondre ?",
    text: "Ces coordonnées servent uniquement à confirmer le trajet, le tarif et le rendez-vous.",
    fields: ["name", "phone", "email"],
  },
  {
    eyebrow: "Étape 5",
    title: "Une précision utile avant l’envoi ?",
    text: "Bagages, numéro de vol, train, siège enfant, attente ou arrêt intermédiaire.",
    fields: ["message"],
  },
] as const;

const TOULOUSE_PLACES = [
  "Aéroport Toulouse-Blagnac",
  "Gare Toulouse Matabiau",
  "Gare Saint-Cyprien Arènes",
  "Gare de Colomiers",
  "Place du Capitole",
  "Jean-Jaurès",
  "Place Wilson",
  "Esquirol",
  "Carmes",
  "Saint-Cyprien",
  "Compans-Caffarelli",
  "Pierre-Baudis - Centre de Congrès",
  "MEETT - Parc des Expositions Toulouse",
  "Zénith Toulouse Métropole",
  "Stadium de Toulouse",
  "Hôpital Purpan",
  "Clinique Pasteur",
  "Oncopole",
  "CHU Rangueil",
  "Université Toulouse Capitole",
  "Université Paul Sabatier",
  "Toulouse Business School",
  "Airbus Saint-Martin-du-Touch",
  "Airbus Colomiers",
  "Blagnac centre",
  "Toulouse Montaudran",
  "Cité de l'Espace",
  "Halle de La Machine",
  "Port de la Daurade",
  "Basilique Saint-Sernin",
  "Jardin des Plantes",
  "Musée des Augustins",
  "Hôtel Dieu Saint-Jacques",
  "Marché Victor Hugo",
  "Rue Alsace-Lorraine",
  "Quartier des Carmes",
  "Quartier Saint-Georges",
  "Quartier Minimes",
  "Quartier Côte Pavée",
  "Quartier Busca",
  "Quartier Saint-Michel",
  "Quartier Croix-Daurade",
  "Quartier Borderouge",
  "Balma-Gramont",
  "Labège Innopole",
  "Ramonville-Saint-Agne",
  "Tournefeuille",
  "Cugnaux",
  "Muret",
] as const;

type LocationField = "pickup" | "dropoff";

const normalizePlace = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export default function Booking() {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [activeLocationField, setActiveLocationField] = useState<LocationField | null>(null);

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const activeStep = bookingFlow[currentStep];
  const isFinalStep = currentStep === bookingFlow.length - 1;
  const progress = ((currentStep + 1) / bookingFlow.length) * 100;
  const activeLocationValue = activeLocationField ? formData[activeLocationField] : "";
  const locationSuggestions = useMemo(() => {
    const query = normalizePlace(activeLocationValue.trim());
    if (query.length < 2) return [];

    return TOULOUSE_PLACES.filter((place) => normalizePlace(place).includes(query)).slice(0, 6);
  }, [activeLocationValue]);

  const mailtoHref = useMemo(() => {
    const subject = `Demande de réservation - ${formData.name || SITE.name}`;
    const body = [
      "Bonjour Cédric,",
      "",
      "Je souhaite réserver un trajet VTC à Toulouse.",
      "",
      `Service : ${formData.service}`,
      `Véhicule : ${formData.vehicle}`,
      `Départ : ${formData.pickup}`,
      `Arrivée : ${formData.dropoff}`,
      `Date : ${formData.date}`,
      `Heure : ${formData.time}`,
      `Passagers : ${formData.passengers}`,
      "",
      `Nom : ${formData.name}`,
      `Téléphone : ${formData.phone}`,
      `Email : ${formData.email}`,
      "",
      `Message : ${formData.message || "Aucune précision ajoutée."}`,
      "",
      "Merci de me confirmer la disponibilité, le tarif et le point de rendez-vous.",
    ].join("\n");

    return `${SITE.mailto}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [formData]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const selectLocationSuggestion = (field: LocationField, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setActiveLocationField(null);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitted(true);
    window.location.href = mailtoHref;
  };

  const canContinue = activeStep.fields.every((field) => {
    if (field === "message") return true;
    return formData[field].trim().length > 0;
  });

  const goToNextStep = () => {
    if (!canContinue) return;
    setCurrentStep((step) => Math.min(step + 1, bookingFlow.length - 1));
  };

  const goToPreviousStep = () => {
    setCurrentStep((step) => Math.max(step - 1, 0));
  };

  return (
    <section id="reservation" className="section ui-light ui-background vtc-booking" aria-labelledby="booking-title">
      <div className="container-h vtc-booking__grid">
        <div className="vtc-booking__intro">
          <p className="vtc-section-kicker">Réservation</p>
          <h2 id="booking-title" data-split>
            Demande de <em className="serif">trajet</em>
          </h2>
          <p data-reveal>
            Décrivez le trajet. Cédric confirme ensuite la disponibilité, le tarif et le point de rendez-vous. Aucun faux numéro, aucune plateforme opaque.
          </p>

          <ol className="vtc-booking__steps" data-reveal-group>
            {BOOKING_STEPS.map((step, index) => (
              <li key={step.title} data-reveal-item>
                <span>{index + 1}</span>
                <div>
                  <strong>{step.title}</strong>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="vtc-booking__panel" data-reveal>
          {isSubmitted ? (
            <div className="vtc-booking__success">
              <Mail size={28} />
              <h3>Demande préparée</h3>
              <p>
                Votre messagerie doit s&apos;ouvrir avec toutes les informations. Si rien ne s&apos;ouvre, utilisez le bouton ci-dessous pour relancer l&apos;email.
              </p>
              <div className="vtc-inline-actions">
                <a className="btn btn--primary btn--rotation" href={mailtoHref}>
                  <span className="btn__content">
                    <span className="btn__text">Envoyer par mail</span>
                    <span className="btn__icon">
                      <ArrowUpRight size={18} />
                    </span>
                  </span>
                </a>
                <button className="btn btn--secondary btn--rotation" type="button" onClick={() => setIsSubmitted(false)}>
                  <span className="btn__content">
                    <span className="btn__text">Modifier</span>
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="vtc-form vtc-booking-flow">
              <div className="vtc-flow__progress" aria-label={`Étape ${currentStep + 1} sur ${bookingFlow.length}`}>
                <div className="vtc-flow__progress-label">
                  <span>{activeStep.eyebrow}</span>
                  <span>{currentStep + 1}/{bookingFlow.length}</span>
                </div>
                <div className="vtc-flow__bar">
                  <span style={{ width: `${progress}%` }} />
                </div>
              </div>

              <div className="vtc-flow__head">
                <h3>{activeStep.title}</h3>
                <p>{activeStep.text}</p>
              </div>

              <div className="vtc-flow__stage">
                {currentStep === 0 && (
                  <div className="vtc-form__row">
                    <label>
                      <span>Lieu de départ</span>
                      <div className="vtc-location-field">
                        <input
                          name="pickup"
                          value={formData.pickup}
                          onChange={handleChange}
                          onFocus={() => setActiveLocationField("pickup")}
                          onBlur={() => window.setTimeout(() => setActiveLocationField(null), 120)}
                          required
                          placeholder="Adresse, hôtel, entreprise..."
                          autoComplete="off"
                        />
                        {activeLocationField === "pickup" && locationSuggestions.length > 0 && (
                          <div className="vtc-location-suggestions" role="listbox" aria-label="Suggestions de départ">
                            {locationSuggestions.map((place) => (
                              <button type="button" key={place} onMouseDown={(event) => event.preventDefault()} onClick={() => selectLocationSuggestion("pickup", place)}>
                                {place}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </label>
                    <label>
                      <span>Lieu d&apos;arrivée</span>
                      <div className="vtc-location-field">
                        <input
                          name="dropoff"
                          value={formData.dropoff}
                          onChange={handleChange}
                          onFocus={() => setActiveLocationField("dropoff")}
                          onBlur={() => window.setTimeout(() => setActiveLocationField(null), 120)}
                          required
                          placeholder="Adresse, gare, aéroport..."
                          autoComplete="off"
                        />
                        {activeLocationField === "dropoff" && locationSuggestions.length > 0 && (
                          <div className="vtc-location-suggestions" role="listbox" aria-label="Suggestions d'arrivée">
                            {locationSuggestions.map((place) => (
                              <button type="button" key={place} onMouseDown={(event) => event.preventDefault()} onClick={() => selectLocationSuggestion("dropoff", place)}>
                                {place}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </label>
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="vtc-form__row vtc-form__row--thirds">
                    <label>
                      <span>Date</span>
                      <input name="date" type="date" min={today} value={formData.date} onChange={handleChange} required />
                    </label>
                    <label>
                      <span>Heure</span>
                      <input name="time" type="time" value={formData.time} onChange={handleChange} required />
                    </label>
                    <label>
                      <span>Passagers</span>
                      <input name="passengers" type="number" min="1" max="4" value={formData.passengers} onChange={handleChange} required />
                    </label>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="vtc-form__row vtc-form__row--split">
                    <label>
                      <span>Type de trajet</span>
                      <select name="service" value={formData.service} onChange={handleChange}>
                        {SERVICE_ITEMS.map((service) => (
                          <option value={service.title} key={service.title}>
                            {service.title}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label>
                      <span>Véhicule</span>
                      <select name="vehicle" value={formData.vehicle} onChange={handleChange}>
                        {BOOKING_VEHICLES.map((vehicle) => (
                          <option value={vehicle} key={vehicle}>
                            {vehicle}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="vtc-form__row">
                    <label>
                      <span>Nom complet</span>
                      <input name="name" value={formData.name} onChange={handleChange} required placeholder="Votre nom" />
                    </label>
                    <label>
                      <span>Téléphone</span>
                      <input name="phone" type="tel" value={formData.phone} onChange={handleChange} required placeholder="Votre numéro" />
                    </label>
                    <label>
                      <span>Email</span>
                      <input name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="votre@email.fr" />
                    </label>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="vtc-form__row">
                    <label>
                      <span>Précisions</span>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Bagages, vol, train, siège enfant, attente, arrêt intermédiaire..."
                      />
                    </label>
                  </div>
                )}
              </div>

              <div className="vtc-flow__recap" aria-live="polite">
                <span>{formData.pickup || "Départ à compléter"}</span>
                <ArrowRight size={15} />
                <span>{formData.dropoff || "Arrivée à compléter"}</span>
              </div>

              <div className="vtc-booking__summary" aria-live="polite">
                <LockKeyhole size={17} />
                <p>
                  Vos informations servent uniquement à organiser le trajet. Réponse par email, sur réservation uniquement.
                </p>
              </div>

              <div className="vtc-flow__actions">
                <button className="btn btn--secondary btn--rotation btn--roll-left" type="button" onClick={goToPreviousStep} disabled={currentStep === 0}>
                  <span className="btn__content">
                    <span className="btn__icon">
                      <ArrowLeft size={18} />
                    </span>
                    <span className="btn__text">Retour</span>
                  </span>
                </button>

                {isFinalStep ? (
                  <button className="btn btn--primary btn--rotation vtc-submit" type="submit">
                    <span className="btn__content">
                      <span className="btn__text">Préparer la demande</span>
                      <span className="btn__icon">
                        <ArrowUpRight size={18} />
                      </span>
                    </span>
                  </button>
                ) : (
                  <button className="btn btn--primary btn--rotation vtc-submit" type="button" onClick={goToNextStep} disabled={!canContinue}>
                    <span className="btn__content">
                      <span className="btn__text">Continuer</span>
                      <span className="btn__icon">
                        <Check size={18} />
                      </span>
                    </span>
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

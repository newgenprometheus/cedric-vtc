"use client";

import React, { useMemo, useState } from "react";
import { ArrowUpRight, LockKeyhole, Mail } from "lucide-react";
import Magnetic from "@/components/anim/Magnetic";
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

export default function Booking() {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitted(true);
    window.location.href = mailtoHref;
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
            <form onSubmit={handleSubmit} className="vtc-form">
              <div className="vtc-form__row vtc-form__row--split">
                <label>
                  <span>Lieu de départ</span>
                  <input name="pickup" value={formData.pickup} onChange={handleChange} required placeholder="Adresse, hôtel, entreprise..." />
                </label>
                <label>
                  <span>Lieu d&apos;arrivée</span>
                  <input name="dropoff" value={formData.dropoff} onChange={handleChange} required placeholder="Adresse, gare, aéroport..." />
                </label>
              </div>

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

              <div className="vtc-form__row vtc-form__row--split">
                <label>
                  <span>Nom complet</span>
                  <input name="name" value={formData.name} onChange={handleChange} required placeholder="Votre nom" />
                </label>
                <label>
                  <span>Téléphone</span>
                  <input name="phone" type="tel" value={formData.phone} onChange={handleChange} required placeholder="Votre numéro" />
                </label>
              </div>

              <div className="vtc-form__row">
                <label>
                  <span>Email</span>
                  <input name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="votre@email.fr" />
                </label>
              </div>

              <div className="vtc-form__row">
                <label>
                  <span>Précisions</span>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Bagages, vol, train, siège enfant, attente, arrêt intermédiaire..."
                  />
                </label>
              </div>

              <div className="vtc-booking__summary" aria-live="polite">
                <LockKeyhole size={17} />
                <p>
                  Vos informations servent uniquement à organiser le trajet. Réponse par email, sur réservation uniquement.
                </p>
              </div>

              <Magnetic strength={8}>
                <button className="btn btn--primary btn--rotation btn--full vtc-submit" type="submit">
                  <span className="btn__content">
                    <span className="btn__text">Préparer la demande</span>
                    <span className="btn__icon">
                      <ArrowUpRight size={18} />
                    </span>
                  </span>
                </button>
              </Magnetic>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

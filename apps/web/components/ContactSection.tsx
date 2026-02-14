'use client';

import { useState } from 'react';
import { RevealOnScroll } from '@/components/landing/RevealOnScroll';

/**
 * Section Contact : fond dégradé sombre, carte glassmorphism, formulaire minimal.
 * SEO, accessibilité (ARIA, clavier, contraste), mobile-first.
 */

const CONTACT = {
  landline: { label: 'Téléphone fixe', value: '+216 31 106 159', href: 'tel:+21631106159' },
  mobile: { label: 'Mobile', value: '+216 98 287 926', href: 'tel:+21698287926' },
  email: {
    label: 'E-mail',
    value: 'comptoireproaluminium@gmail.com',
    href: 'mailto:comptoireproaluminium@gmail.com',
  },
  address: {
    value: 'Cité Zarrouk – Route de Ceinture, route de Tunis – Sousse',
    city: 'Sousse, Tunisie',
  },
} as const;

function IconPhone({ className }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function IconMail({ className }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function IconMapPin({ className }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="contact-section contact-section--dark"
      aria-labelledby="contact-heading"
    >
      <div className="contact-section__bg" aria-hidden />
      <RevealOnScroll as="div" className="container contact-section__container">
        <div className="contact-section__main">
          <header className="contact-section__intro">
            <h2 id="contact-heading" className="contact-section__title">
              Nous contacter
            </h2>
            <p className="contact-section__lead">
              Une question, un devis ou un projet ? Envoyez-nous un message ou appelez-nous directement. Notre équipe à Sousse vous répond rapidement.
            </p>
          </header>

          <form
            className="contact-section__form"
            onSubmit={handleSubmit}
            noValidate
            aria-labelledby="contact-heading"
            aria-describedby="contact-form-hint"
          >
            <p id="contact-form-hint" className="contact-section__form-hint">
              Tous les champs sont requis.
            </p>
            <div className="contact-section__field">
              <label htmlFor="contact-name" className="contact-section__label">
                Nom
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                autoComplete="name"
                required
                className="contact-section__input"
                aria-required="true"
                placeholder="Votre nom"
                minLength={2}
              />
            </div>
            <div className="contact-section__field">
              <label htmlFor="contact-email" className="contact-section__label">
                E-mail
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                autoComplete="email"
                required
                className="contact-section__input"
                aria-required="true"
                placeholder="votre@email.com"
              />
            </div>
            <div className="contact-section__field">
              <label htmlFor="contact-message" className="contact-section__label">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={4}
                className="contact-section__textarea"
                aria-required="true"
                placeholder="Votre message ou demande de devis…"
                minLength={10}
              />
            </div>
            {submitted ? (
              <p className="contact-section__success" role="status">
                Merci. Nous vous recontacterons rapidement.
              </p>
            ) : (
              <button type="submit" className="contact-section__submit btn btn-primary">
                Envoyer le message
              </button>
            )}
          </form>
        </div>

        <aside className="contact-section__aside" aria-label="Coordonnées">
          <div className="contact-section__glass">
            <h3 className="contact-section__glass-title">Coordonnées</h3>
            <ul className="contact-section__list" role="list">
              <li>
                <a
                  href={CONTACT.landline.href}
                  className="contact-section__list-link"
                  rel="noopener noreferrer"
                  aria-label={`${CONTACT.landline.label} : ${CONTACT.landline.value}`}
                >
                  <span className="contact-section__list-icon" aria-hidden>
                    <IconPhone />
                  </span>
                  <span className="contact-section__list-text">
                    <span className="contact-section__list-label">{CONTACT.landline.label}</span>
                    {CONTACT.landline.value}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.mobile.href}
                  className="contact-section__list-link"
                  rel="noopener noreferrer"
                  aria-label={`${CONTACT.mobile.label} : ${CONTACT.mobile.value}`}
                >
                  <span className="contact-section__list-icon" aria-hidden>
                    <IconPhone />
                  </span>
                  <span className="contact-section__list-text">
                    <span className="contact-section__list-label">{CONTACT.mobile.label}</span>
                    {CONTACT.mobile.value}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.email.href}
                  className="contact-section__list-link"
                  rel="noopener noreferrer"
                  aria-label={`Envoyer un e-mail à ${CONTACT.email.value}`}
                >
                  <span className="contact-section__list-icon" aria-hidden>
                    <IconMail />
                  </span>
                  <span className="contact-section__list-text contact-section__list-text--wrap">
                    {CONTACT.email.value}
                  </span>
                </a>
              </li>
              <li>
                <div className="contact-section__list-link contact-section__list-link--static">
                  <span className="contact-section__list-icon" aria-hidden>
                    <IconMapPin />
                  </span>
                  <span className="contact-section__list-text">
                    {CONTACT.address.value}
                    <span className="contact-section__list-city">{CONTACT.address.city}</span>
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </aside>
      </RevealOnScroll>
    </section>
  );
}

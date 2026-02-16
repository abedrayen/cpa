'use client';

import { RevealOnScroll } from '@/components/landing/RevealOnScroll';

const icons = {
  quality: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  price: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  ),
  support: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </svg>
  ),
  local: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
} as const;

const items: Array<{
  id: string;
  icon: keyof typeof icons;
  title: string;
  description: string;
  bullets: string[];
}> = [
  {
    id: 'quality',
    icon: 'quality',
    title: 'Matériaux de qualité',
    description: 'Profilés aluminium certifiés et finitions durables pour fenêtres et portes aluminium à Sousse et en Tunisie.',
    bullets: ['Profilés aluminium certifiés', 'Finitions durables', 'Résultats pérennes'],
  },
  {
    id: 'price',
    icon: 'price',
    title: 'Prix compétitifs',
    description: 'Tarification transparente et devis personnalisés adaptés à votre projet résidentiel ou commercial.',
    bullets: ['Devis gratuits et personnalisés', 'Tarification transparente', 'Adapté à votre budget'],
  },
  {
    id: 'support',
    icon: 'support',
    title: 'Accompagnement expert',
    description: 'Conseils professionnels du choix du produit à la livraison, avec aide à la pose si besoin.',
    bullets: ['Conseil du choix à la livraison', 'Aide à la pose', 'Équipe réactive'],
  },
  {
    id: 'local',
    icon: 'local',
    title: 'Présence locale à Sousse',
    description: 'Implantés à Sousse, nous accompagnons depuis des années particuliers et professionnels en Tunisie.',
    bullets: ['Basés à Sousse', 'Livraison région et Tunisie', 'Proximité et réactivité'],
  },
];

/**
 * Section « Pourquoi nous choisir » : atouts différenciants, confiance, SEO.
 * Structure sémantique, icônes légères (SVG inline), listes à puces, accessible.
 */
export function WhyChooseUsSection() {
  return (
    <section
      id="why-choose-us"
      className="landing-section landing-section--alt why-choose-us"
      aria-labelledby="why-choose-us-heading"
    >
      <RevealOnScroll as="div" className="container why-choose-us__inner">
        <header className="landing-section__header landing-section__header--center">
          <h2 id="why-choose-us-heading" className="landing-section__title">
            Pourquoi nous choisir
          </h2>
          <p className="section-lead section-lead--center">
            Confiance et expertise pour vos projets fenêtres et portes aluminium à Sousse, Tunisie. Qualité, prix compétitifs et accompagnement sur mesure.
          </p>
        </header>
        <ul className="trust-cards why-choose-us__cards" role="list">
          {items.map((item) => (
            <li key={item.id} className="trust-card">
              <span className="trust-card__icon" aria-hidden>
                {icons[item.icon]}
              </span>
              <h3 className="trust-card__title">{item.title}</h3>
              <p className="trust-card__text">{item.description}</p>
              <ul className="trust-card__list" aria-label={`Points forts : ${item.title}`}>
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </RevealOnScroll>
    </section>
  );
}

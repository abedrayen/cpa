'use client';

import Image from 'next/image';
import { RevealOnScroll } from '@/components/landing/RevealOnScroll';

/** Partners / client types: name required, logoUrl optional (img alt = "Logo partenaire {name}"). */
const PARTNERS: Array<{ id: string; name: string; logoUrl?: string | null }> = [
  { id: 'p1', name: 'Particuliers' },
  { id: 'p2', name: 'Artisans & menuisiers' },
  { id: 'p3', name: 'Entreprises' },
  { id: 'p4', name: 'Maîtres d\'ouvrage' },
  { id: 'p5', name: 'Collectivités' },
];

const STATS = [
  { value: '15+', label: 'Années d\'expérience', id: 'stat-years' },
  { value: '500+', label: 'Clients satisfaits', id: 'stat-clients' },
  { value: '100+', label: 'Références produits', id: 'stat-products' },
  { value: 'Sousse & Tunisie', label: 'Zone d\'intervention', id: 'stat-area' },
] as const;

const TESTIMONIALS = [
  {
    quote: 'Équipe réactive et produits de qualité. Devis clair et pose accompagnée. Je recommande.',
    author: 'M. K.',
    role: 'Particulier, Sousse',
    id: 't1',
  },
  {
    quote: 'Fournisseur sérieux pour nos chantiers. Prix compétitifs et livraison dans les délais.',
    author: 'Entreprise B.T.',
    role: 'Artisan, région Sousse',
    id: 't2',
  },
] as const;

const StatIcon = ({ type }: { type: 'years' | 'clients' | 'products' | 'area' }) => {
  const icons = {
    years: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
      </svg>
    ),
    clients: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    products: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><path d="m3.27 6.96 8.73 5.05 8.73-5.05" /><path d="M12 22.08V11" />
      </svg>
    ),
    area: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
  };
  return <span className="stat-card__icon">{icons[type]}</span>;
};

/**
 * Section « Ils nous font confiance » : partenaires, chiffres clés, témoignages.
 * Logo strip (marquee), grille de stats, cartes témoignages. SEO, accessibilité, perfs.
 */
export function SocialProofSection() {
  return (
    <section
      id="proof"
      className="landing-section social-proof"
      aria-labelledby="proof-heading"
    >
      <div className="social-proof__logos-wrap" role="region" aria-label="Partenaires et types de clients">
        <div className="social-proof__logos-track" aria-hidden>
          <ul className="social-proof__logos-list" role="list">
            {[...PARTNERS, ...PARTNERS].map(({ id, name, logoUrl }, index) => (
              <li key={`${id}-${index}`} className="social-proof__logo-item">
                {logoUrl ? (
                  <Image
                    src={logoUrl}
                    alt={`Logo partenaire ${name}`}
                    width={120}
                    height={48}
                    className="social-proof__logo-img"
                    unoptimized={!logoUrl.startsWith('/')}
                  />
                ) : (
                  <span className="social-proof__logo-badge">{name}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <RevealOnScroll as="div" className="container social-proof__inner">
        <header className="landing-section__header landing-section__header--center">
          <h2 id="proof-heading" className="landing-section__title">
            Ils nous font confiance
          </h2>
          <p className="section-lead section-lead--center">
            Particuliers, artisans et professionnels à Sousse et en Tunisie nous font confiance pour leurs projets fenêtres et portes aluminium.
          </p>
        </header>

        <div className="stats-row" role="list" aria-label="Chiffres clés CPA">
          {STATS.map(({ value, label, id }, i) => (
            <div key={id} className="stat-card" role="listitem">
              <StatIcon type={i === 0 ? 'years' : i === 1 ? 'clients' : i === 2 ? 'products' : 'area'} />
              <span className="stat-card__value" aria-hidden>{value}</span>
              <span className="stat-card__label">{label}</span>
            </div>
          ))}
        </div>

        <div className="social-proof__testimonials-wrap">
          <ul className="testimonials-list" role="list">
            {TESTIMONIALS.map(({ quote, author, role, id }) => (
              <li key={id} className="testimonial-card">
                <blockquote className="testimonial-card__quote">
                  <span className="testimonial-card__mark" aria-hidden>&ldquo;</span>
                  <p className="testimonial-card__text">{quote}</p>
                  <footer className="testimonial-card__author">
                    <cite className="testimonial-card__name">{author}</cite>
                    <span className="testimonial-card__role">{role}</span>
                  </footer>
                </blockquote>
              </li>
            ))}
          </ul>
        </div>
      </RevealOnScroll>
    </section>
  );
}

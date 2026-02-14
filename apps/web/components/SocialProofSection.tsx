'use client';

import { RevealOnScroll } from '@/components/landing/RevealOnScroll';

/**
 * Preuves sociales : chiffres clés + témoignages. Sémantique et accessible.
 */

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

export function SocialProofSection() {
  return (
    <section
      id="proof"
      className="landing-section landing-section--proof"
      aria-labelledby="proof-heading"
    >
      <RevealOnScroll as="div" className="container">
        <header className="landing-section__header landing-section__header--center">
          <h2 id="proof-heading" className="landing-section__title">
            Ils nous font confiance
          </h2>
          <p className="section-lead section-lead--center">
            Chiffres clés et retours de nos clients à Sousse et en Tunisie.
          </p>
        </header>

        <div className="stats-row" role="list" aria-label="Chiffres clés">
          {STATS.map(({ value, label, id }) => (
            <div key={id} className="stat-card" role="listitem">
              <span className="stat-card__value" aria-hidden>{value}</span>
              <span className="stat-card__label">{label}</span>
            </div>
          ))}
        </div>

        <ul className="testimonials-list" role="list">
          {TESTIMONIALS.map(({ quote, author, role, id }) => (
            <li key={id} className="testimonial-card">
              <blockquote className="testimonial-card__quote">
                <p className="testimonial-card__text">&ldquo;{quote}&rdquo;</p>
                <footer className="testimonial-card__author">
                  <cite className="testimonial-card__name">{author}</cite>
                  <span className="testimonial-card__role">{role}</span>
                </footer>
              </blockquote>
            </li>
          ))}
        </ul>
      </RevealOnScroll>
    </section>
  );
}

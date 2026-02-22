'use client';

import Image from 'next/image';
import { RevealOnScroll } from '@/components/landing/RevealOnScroll';

const SITE_NAME = 'Comptoir pro aluminium';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com';

/** Partners: name required, logoUrl optional. Use alt "Logo partenaire {name}" when image. */
const PARTNERS: Array<{ id: string; name: string; logoUrl?: string | null }> = [
  { id: 'p1', name: 'Particuliers' },
  { id: 'p2', name: 'Artisans & menuisiers' },
  { id: 'p3', name: 'Entreprises' },
  { id: 'p4', name: 'Maîtres d\'ouvrage' },
  { id: 'p5', name: 'Collectivités' },
];

const RATING = { value: 4.9, max: 5, count: 500, label: 'clients satisfaits' } as const;

const STATS = [
  { value: '15+', label: 'Années d\'expérience', id: 'stat-years' },
  { value: '500+', label: 'Clients satisfaits', id: 'stat-clients' },
  { value: '100+', label: 'Références produits', id: 'stat-products' },
  { value: 'Sousse & Tunisie', label: 'Zone d\'intervention', id: 'stat-area' },
] as const;

const TESTIMONIALS: Array<{
  id: string;
  quote: string;
  author: string;
  role: string;
  rating: number;
  datePublished?: string;
  productContext?: string;
}> = [
  {
    id: 't1',
    quote: 'Équipe réactive et produits de qualité. Devis clair et pose accompagnée. Je recommande.',
    author: 'M. K.',
    role: 'Particulier, Sousse',
    rating: 5,
    datePublished: '2024-06-15',
    productContext: 'Fenêtres aluminium',
  },
  {
    id: 't2',
    quote: 'Fournisseur sérieux pour nos chantiers. Prix compétitifs et livraison dans les délais.',
    author: 'Entreprise B.T.',
    role: 'Artisan, région Sousse',
    rating: 5,
    datePublished: '2024-07-02',
    productContext: 'Portes et fenêtres aluminium',
  },
  {
    id: 't3',
    quote: 'Commande de fenêtres aluminium pour notre résidence. Conformes, livraison à l\'heure, équipe à l\'écoute.',
    author: 'Société H.',
    role: 'Maître d\'ouvrage, Tunisie',
    rating: 5,
    datePublished: '2024-08-10',
    productContext: 'Fenêtres aluminium Sousse',
  },
];


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

function StarRating({ value, max = 5 }: { value: number; max?: number }) {
  const fullCount = Math.min(max, Math.round(value));
  return (
    <span className="rating-stars" aria-label={`${value.toFixed(1).replace('.', ',')} sur ${max} étoiles`}>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={`rating-star ${i < fullCount ? 'rating-star--full' : 'rating-star--empty'}`} aria-hidden>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </span>
      ))}
    </span>
  );
}

const itemReviewedRef = { '@type': 'LocalBusiness' as const, name: SITE_NAME, url: siteUrl };

/** JSON-LD: LocalBusiness with aggregateRating + reviews for SEO. */
function SocialProofStructuredData() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE_NAME,
    url: siteUrl,
    aggregateRating: {
      '@type': 'AggregateRating',
      itemReviewed: itemReviewedRef,
      ratingValue: RATING.value,
      bestRating: RATING.max,
      worstRating: 1,
      ratingCount: RATING.count,
    },
    review: TESTIMONIALS.map((t) => ({
      '@type': 'Review',
      itemReviewed: itemReviewedRef,
      author: { '@type': 'Person', name: t.author },
      reviewBody: t.quote,
      datePublished: t.datePublished ?? undefined,
      reviewRating: { '@type': 'Rating', ratingValue: t.rating, bestRating: 5, worstRating: 1 },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Section « Ils nous font confiance » : notation, stats, logos partenaires, témoignages, réussite client.
 * SEO : JSON-LD LocalBusiness + AggregateRating + Review, sémantique, alt sur images.
 */
export function SocialProofSection() {
  return (
    <section
      id="proof"
      className="landing-section social-proof"
      aria-labelledby="proof-heading"
    >
      <SocialProofStructuredData />

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
            Particuliers, artisans et professionnels à Sousse et en Tunisie nous font confiance pour leurs projets fenêtres et portes aluminium. Avis clients et réussites.
          </p>
        </header>

        <div className="social-proof__rating-block" role="group" aria-label="Note et avis clients">
          <StarRating value={RATING.value} max={RATING.max} />
          <div className="social-proof__rating-meta">
            <span className="social-proof__rating-value">{RATING.value.toFixed(1).replace('.', ',')}</span>
            <span className="social-proof__rating-sep">/</span>
            <span className="social-proof__rating-max">{RATING.max}</span>
            <span className="social-proof__rating-count">{RATING.count}+ {RATING.label}</span>
          </div>
        </div>

        <div className="stats-row" role="list" aria-label="Chiffres clés CPA Aluminium">
          {STATS.map(({ value, label, id }, i) => (
            <div key={id} className="stat-card" role="listitem">
              <StatIcon type={i === 0 ? 'years' : i === 1 ? 'clients' : i === 2 ? 'products' : 'area'} />
              <span className="stat-card__value" aria-hidden>{value}</span>
              <span className="stat-card__label">{label}</span>
            </div>
          ))}
        </div>

        <div className="social-proof__testimonials-wrap">
          <header className="social-proof__testimonials-header">
            <h3 id="testimonials-heading" className="social-proof__testimonials-title">
              Avis clients
            </h3>
            <p className="social-proof__testimonials-lead">
              Témoignages et évaluations de nos clients à Sousse et en Tunisie sur nos fenêtres, portes et profilés aluminium.
            </p>
          </header>
          <ul className="testimonials-list" role="list" aria-labelledby="testimonials-heading">
            {TESTIMONIALS.map(({ id, quote, author, role, rating, datePublished, productContext }) => (
              <li key={id} className="testimonial-card">
                <article
                  className="testimonial-card__inner"
                  itemScope
                  itemType="https://schema.org/Review"
                  itemProp="review"
                >
                  <meta itemProp="datePublished" content={datePublished ?? ''} />
                  <div className="testimonial-card__rating-row">
                    <StarRating value={rating} max={5} />
                    <span className="testimonial-card__rating-meta">
                      <span itemProp="reviewRating" itemScope itemType="https://schema.org/Rating" className="testimonial-card__rating-schema" aria-hidden>
                        <meta itemProp="ratingValue" content={String(rating)} />
                        <meta itemProp="bestRating" content="5" />
                        <meta itemProp="worstRating" content="1" />
                      </span>
                      {productContext && (
                        <span className="testimonial-card__product">{productContext}</span>
                      )}
                    </span>
                  </div>
                  <blockquote className="testimonial-card__quote" cite="#">
                    <span className="testimonial-card__mark" aria-hidden>&ldquo;</span>
                    <p className="testimonial-card__text" itemProp="reviewBody">{quote}</p>
                    <footer className="testimonial-card__author">
                      <cite className="testimonial-card__name" itemProp="author" itemScope itemType="https://schema.org/Person">
                        <span itemProp="name">{author}</span>
                      </cite>
                      <span className="testimonial-card__role">{role}</span>
                    </footer>
                  </blockquote>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </RevealOnScroll>
    </section>
  );
}

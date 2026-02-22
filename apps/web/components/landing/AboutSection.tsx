'use client';

import Link from 'next/link';
import { RevealOnScroll } from '@/components/landing/RevealOnScroll';

const VALUE_ICONS = {
  quality: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  proximity: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  expertise: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 14l9-5-9-5-9 5 9 5z" />
      <path d="M12 14l6.16-3.422a12.083 12.083 0 0 1 .665 6.479A11.952 11.952 0 0 0 12 20.055a11.952 11.952 0 0 0-6.824-2.998 12.078 12.078 0 0 1 .665-6.479L12 14z" />
    </svg>
  ),
  trust: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
} as const;

const VALUES: Array<{ id: string; icon: keyof typeof VALUE_ICONS; title: string; description: string }> = [
  {
    id: 'v1',
    icon: 'quality',
    title: 'Qualité',
    description: 'Profilés aluminium certifiés et finitions durables pour fenêtres et portes à Sousse et en Tunisie.',
  },
  {
    id: 'v2',
    icon: 'proximity',
    title: 'Proximité',
    description: 'Implantés à Sousse, nous accompagnons particuliers et professionnels dans toute la région.',
  },
  {
    id: 'v3',
    icon: 'expertise',
    title: 'Expertise',
    description: 'Conseil technique, devis personnalisés et accompagnement de la commande à la livraison.',
  },
  {
    id: 'v4',
    icon: 'trust',
    title: 'Confiance',
    description: 'Des années d\'expérience au service de projets résidentiels et commerciaux en aluminium.',
  },
];

const EXPERTISE_STEPS: Array<{ id: string; label: string; detail: string }> = [
  { id: 'e1', label: 'Plus de 15 ans d\'expérience', detail: 'Spécialistes aluminium à Sousse' },
  { id: 'e2', label: 'Fenêtres, portes et profilés', detail: 'Gamme complète pour le bâtiment' },
  { id: 'e3', label: 'Sousse et toute la Tunisie', detail: 'Livraison et accompagnement' },
  { id: 'e4', label: 'Devis et conseil sur mesure', detail: 'Projets résidentiels et commerciaux' },
];

/**
 * Section « À propos de CPA » : présentation entreprise, valeurs, expertise.
 * SEO : H2/H3, mots-clés, balises sémantiques. Design : cartes valeurs, timeline, icônes.
 */
export function AboutSection() {
  return (
    <section
      id="about"
      className="landing-section landing-section--alt about-section"
      aria-labelledby="about-heading"
    >
      <RevealOnScroll
        as="div"
        className="container about-section__inner"
        rootMargin="0px 0px -80px 0px"
        threshold={0.05}
      >
        <header className="about-section__header">
          <h2 id="about-heading" className="about-section__title">
            À propos de CPA
          </h2>
          <p className="about-section__lead">
            Comptoir Pro Aluminium est votre fournisseur de confiance en Matériaux de construction et solutions d’isolation à Sousse et en Tunisie. Nous allions matériaux de qualité, prix compétitifs et accompagnement expert pour vos projets résidentiels et commerciaux.
          </p>
          <p className="about-section__meta">
            Implantés à Sousse, nous accompagnons nos clients dans toute la région avec une offre fiable et des conseils professionnels pour chaque projet fenêtres et portes aluminium.
          </p>
        </header>

        <section className="about-section__values" aria-labelledby="about-values-heading">
          <h3 id="about-values-heading" className="about-section__subtitle">
            Nos valeurs
          </h3>
          <ul className="about-values-grid" role="list">
            {VALUES.map(({ id, icon, title, description }) => (
              <li key={id} className="about-value-card">
                <span className="about-value-card__icon" aria-hidden>
                  {VALUE_ICONS[icon]}
                </span>
                <h4 className="about-value-card__title">{title}</h4>
                <p className="about-value-card__text">{description}</p>
              </li>
            ))}
          </ul>
        </section>

        <RevealOnScroll
          as="div"
          className="about-section__expertise-wrap"
          rootMargin="0px 0px -80px 0px"
          threshold={0.05}
        >
          <section className="about-section__expertise" aria-labelledby="about-expertise-heading">
            <h3 id="about-expertise-heading" className="about-section__subtitle">
              Notre expertise
            </h3>
            <ol className="about-timeline" role="list">
              {EXPERTISE_STEPS.map(({ id, label, detail }) => (
                <li key={id} className="about-timeline__item">
                  <span className="about-timeline__marker" aria-hidden />
                  <div className="about-timeline__content">
                    <span className="about-timeline__label">{label}</span>
                    <span className="about-timeline__detail">{detail}</span>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <p className="about-section__cta">
            <Link href="/produits" className="btn btn-primary btn--hover">
              Découvrir nos produits
            </Link>
          </p>
        </RevealOnScroll>
      </RevealOnScroll>
    </section>
  );
}

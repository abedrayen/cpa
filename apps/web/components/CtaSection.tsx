'use client';

import Link from 'next/link';
import { RevealOnScroll } from '@/components/landing/RevealOnScroll';

/**
 * Bandeau d’appel à l’action : devis / contact. Sémantique et accessible.
 */
export function CtaSection() {
  return (
    <section
      id="cta"
      className="cta-section"
      aria-labelledby="cta-heading"
    >
      <RevealOnScroll as="div" className="container cta-section__inner">
        <h2 id="cta-heading" className="cta-section__title">
          Prêt à concrétiser votre projet ?
        </h2>
        <p className="cta-section__lead">
          Consultez notre catalogue ou demandez un devis personnalisé. Notre équipe vous répond à Sousse et en Tunisie.
        </p>
        <div className="cta-section__actions">
          <Link href="/produits" className="btn btn-primary cta-section__btn">
            Voir les produits
          </Link>
          <Link href="/#contact" className="btn btn-outline cta-section__btn">
            Nous contacter
          </Link>
        </div>
      </RevealOnScroll>
    </section>
  );
}

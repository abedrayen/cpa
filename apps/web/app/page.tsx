import Link from 'next/link';
import { fetcher } from '@/lib/api';
import type { Product, Paginated } from '@/lib/types';
import { ProductCard } from '@/components/ProductCard';
import { SiteHeader } from '@/components/SiteHeader';
import { ContactSection } from '@/components/ContactSection';

export const dynamic = 'force-dynamic';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com';

const pageDescription =
  'CPA Aluminium fournit fenêtres, portes et profilés aluminium de qualité à Sousse, Tunisie. Demande de devis ou achat en ligne. Fournisseur de confiance pour projets résidentiels et commerciaux.';

export const metadata = {
  title: 'Fenêtres, portes et profilés aluminium | CPA Aluminium Sousse',
  description: pageDescription,
  alternates: { canonical: siteUrl },
  openGraph: {
    url: siteUrl,
    type: 'website',
    title: 'Fenêtres, portes et profilés aluminium | CPA Aluminium Sousse',
    description:
      'Solutions aluminium de qualité à Sousse, Tunisie. Fenêtres, portes, profilés. Devis sur demande ou achat en ligne.',
  },
};

async function getLandingData(): Promise<Paginated<Product>> {
  try {
    return await fetcher<Paginated<Product>>('/products?limit=8&sort=createdAt&order=desc');
  } catch {
    return { data: [], meta: { total: 0, page: 1, limit: 8, totalPages: 0 } };
  }
}

export default async function HomePage() {
  const products = await getLandingData();

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Fenêtres, portes et profilés aluminium | CPA Aluminium Sousse',
    description: pageDescription,
    url: siteUrl,
    isPartOf: { '@type': 'WebSite', name: 'CPA Aluminium', url: siteUrl },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <SiteHeader homeCurrent>
        <div className="container hero-overlay__content">
          <h1 id="hero-heading" className="hero-overlay__title">
            Fenêtres, portes et profilés aluminium
          </h1>
          <p className="hero-overlay__lead">
            Solutions aluminium de qualité pour projets résidentiels et commerciaux à Sousse, Tunisie.
            Demande de devis ou achat en ligne.
          </p>
          <Link href="/produits" className="btn btn-primary hero-overlay__cta">
            Voir tous les produits
          </Link>
        </div>
      </SiteHeader>

      <main id="main-content">
        {/* About / Company introduction */}
        <section
          id="about"
          className="landing-section landing-section--alt"
          aria-labelledby="about-heading"
        >
          <div className="container landing-about">
            <div className="landing-about__content">
              <h2 id="about-heading">À propos de CPA Aluminium</h2>
              <p className="landing-about__lead">
                Comptoir Pro Aluminium est votre fournisseur de confiance en fenêtres, portes et profilés aluminium à Sousse et en Tunisie. Nous allions matériaux de qualité, prix compétitifs et accompagnement expert pour vos projets résidentiels et commerciaux.
              </p>
              <p className="landing-about__meta">
                Implantés à Sousse, nous accompagnons nos clients dans toute la région avec une offre fiable et des conseils professionnels pour chaque projet.
              </p>
              <Link href="/produits" className="btn btn-primary btn--hover">
                Découvrir nos produits
              </Link>
            </div>
          </div>
        </section>

        {/* Services / Products section */}
        <section
          id="products"
          className="landing-section"
          aria-labelledby="products-heading"
        >
          <div className="container">
            <header className="landing-section__header">
              <h2 id="products-heading">Produits à la une</h2>
              <p className="section-lead">
                Produits aluminium les plus demandés. Demande de devis ou consultation du catalogue complet.
              </p>
            </header>
            <ul className="product-grid" role="list">
              {products.data.map((p) => (
                <li key={p.id}>
                  <ProductCard product={p} basePath="/produits" />
                </li>
              ))}
            </ul>
            <p className="section-cta">
              <Link href="/produits" className="btn btn-outline">
                Voir tous les produits
              </Link>
            </p>
          </div>
        </section>

        {/* Why Choose Us */}
        <section
          id="why-choose-us"
          className="landing-section landing-section--alt"
          aria-labelledby="trust-heading"
        >
          <div className="container">
            <header className="landing-section__header">
              <h2 id="trust-heading">Pourquoi nous choisir</h2>
              <p className="section-lead">
                Confiance et expertise pour vos projets aluminium à Sousse, Tunisie.
              </p>
            </header>
            <ul className="trust-cards" role="list">
              <li className="trust-card">
                <span className="trust-card__dot" aria-hidden />
                <h3 className="trust-card__title">Matériaux de qualité</h3>
                <p className="trust-card__text">Profilés aluminium certifiés et finitions durables pour des résultats pérennes.</p>
              </li>
              <li className="trust-card">
                <span className="trust-card__dot" aria-hidden />
                <h3 className="trust-card__title">Prix compétitifs</h3>
                <p className="trust-card__text">Tarification transparente et devis personnalisés adaptés à votre projet.</p>
              </li>
              <li className="trust-card">
                <span className="trust-card__dot" aria-hidden />
                <h3 className="trust-card__title">Accompagnement expert</h3>
                <p className="trust-card__text">Conseils professionnels du choix à la livraison, avec aide à la pose.</p>
              </li>
              <li className="trust-card">
                <span className="trust-card__dot" aria-hidden />
                <h3 className="trust-card__title">Présence locale</h3>
                <p className="trust-card__text">Implantés à Sousse, nous accompagnons depuis des années la Tunisie et la région.</p>
              </li>
            </ul>
          </div>
        </section>

        {/* Contact */}
        <ContactSection />
      </main>

      <footer className="site-footer" role="contentinfo">
        <div className="container site-footer__inner">
          <p className="site-footer__copy">&copy; {new Date().getFullYear()} CPA Aluminium. Tous droits réservés.</p>
        </div>
      </footer>
    </>
  );
}

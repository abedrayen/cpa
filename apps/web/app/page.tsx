import Link from 'next/link';
import { fetcherNoCache } from '@/lib/api';
import type { Product, Paginated } from '@/lib/types';
import { ProductCard } from '@/components/ProductCard';
import { SiteHeader } from '@/components/SiteHeader';
import { ContactSection } from '@/components/ContactSection';
import { SocialProofSection } from '@/components/SocialProofSection';
import { CtaSection } from '@/components/CtaSection';
import { SiteFooter } from '@/components/SiteFooter';
import { RevealOnScroll } from '@/components/landing/RevealOnScroll';
import { WhyChooseUsSection } from '@/components/landing/WhyChooseUsSection';
import { AboutSection } from '@/components/landing/AboutSection';

export const dynamic = 'force-dynamic';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com';

const pageDescription =
  'CPA fournit Matériaux de construction et solutions d’isolation de qualité à Sousse, Tunisie. Demande de devis ou achat en ligne. Fournisseur de confiance pour projets résidentiels et commerciaux.';

export const metadata = {
  title: 'Matériaux de construction et solutions d’isolation | CPA Sousse',
  description: pageDescription,
  alternates: { canonical: siteUrl },
  openGraph: {
    url: siteUrl,
    type: 'website',
    title: 'Matériaux de construction et solutions d’isolation | CPA Sousse',
    description:
      'Vente de produits de construction performants et d’éléments d’isolation thermique et acoustique  de qualité pour projets résidentiels et commerciaux à Sousse, Tunisie.',
  },
};

async function getLandingData(): Promise<Paginated<Product>> {
  try {
    return await fetcherNoCache<Paginated<Product>>('/products?limit=8&sort=createdAt&order=desc');
  } catch {
    return { data: [], meta: { total: 0, page: 1, limit: 8, totalPages: 0 } };
  }
}

export default async function HomePage() {
  const products = await getLandingData();

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Matériaux de construction et solutions d’isolation | CPA Sousse',
    description: pageDescription,
    url: siteUrl,
    isPartOf: { '@type': 'WebSite', name: 'CPA', url: siteUrl },
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Comptoir Pro Aluminium',
    alternateName: 'CPA',
    description: 'Fournisseur de Matériaux de construction et solutions d’isolation à Sousse et en Tunisie. Qualité, expertise et accompagnement pour projets résidentiels et commerciaux.',
    url: siteUrl,
    areaServed: { '@type': 'Place', name: 'Sousse, Tunisie' },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <SiteHeader homeCurrent>
        <div className="container hero-overlay__content">
          <h1 id="hero-heading" className="hero-overlay__title">
            Matériaux de construction et solutions d’isolation
          </h1>
          <p className="hero-overlay__lead">
          Vente de produits de construction performants et d’éléments d’isolation à Sousse, Tunisie.
          </p>
          <Link href="/produits" className="btn btn-primary btn--hover hero-overlay__cta">
            Voir tous les produits
          </Link>
        </div>
      </SiteHeader>

      <main id="main-content">
        <AboutSection />

        {/* Services / Products section */}
        <section
          id="products"
          className="landing-section"
          aria-labelledby="products-heading"
        >
          <div className="container">
            <RevealOnScroll as="header" className="landing-section__header">
              <h2 id="products-heading">Produits à la une</h2>
              <p className="section-lead">
                Produits aluminium les plus demandés. Demande de devis ou consultation du catalogue complet.
              </p>
            </RevealOnScroll>
            <RevealOnScroll as="div" className="landing-product-grid">
              <ul className="product-grid" role="list">
                {products.data.map((p) => (
                  <li key={p.id}>
                    <ProductCard product={p} basePath="/produits" />
                  </li>
                ))}
              </ul>
            </RevealOnScroll>
            <p className="section-cta">
              <Link href="/produits" className="btn btn-outline btn--hover">
                Voir tous les produits
              </Link>
            </p>
          </div>
        </section>

        <WhyChooseUsSection />

        <SocialProofSection />

        <CtaSection />

        {/* Contact */}
        <ContactSection />
      </main>

      <SiteFooter />
    </>
  );
}

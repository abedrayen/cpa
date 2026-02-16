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

export const dynamic = 'force-dynamic';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com';

const pageDescription =
  'CPA fournit fenêtres, portes et profilés aluminium de qualité à Sousse, Tunisie. Demande de devis ou achat en ligne. Fournisseur de confiance pour projets résidentiels et commerciaux.';

export const metadata = {
  title: 'Fenêtres, portes et profilés aluminium | CPA Sousse',
  description: pageDescription,
  alternates: { canonical: siteUrl },
  openGraph: {
    url: siteUrl,
    type: 'website',
    title: 'Fenêtres, portes et profilés aluminium | CPA Sousse',
    description:
      'Solutions aluminium de qualité à Sousse, Tunisie. Fenêtres, portes, profilés. Devis sur demande ou achat en ligne.',
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
    name: 'Fenêtres, portes et profilés aluminium | CPA Sousse',
    description: pageDescription,
    url: siteUrl,
    isPartOf: { '@type': 'WebSite', name: 'CPA', url: siteUrl },
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
          <Link href="/produits" className="btn btn-primary btn--hover hero-overlay__cta">
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
          <RevealOnScroll as="div" className="container landing-about">
            <div className="landing-about__content">
              <h2 id="about-heading">À propos de CPA</h2>
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
          </RevealOnScroll>
        </section>

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

import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/lib/types';
import { OrderForm } from '@/components/OrderForm';
import { ProductCard } from '@/components/ProductCard';
import { SiteHeader } from '@/components/SiteHeader';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductStickyCta } from '@/components/product/ProductStickyCta';
import { ProductPdpTabs } from '@/components/product/ProductPdpTabs';
import { ProductFaq } from '@/components/product/ProductFaq';

const ORDER_BLOCK_ID = 'pdp-order-block';

function priceCurrency(_specs: Product['specs']): string {
  return 'TND';
}

function ProductSchema({ product, canonical }: { product: Product; canonical: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.metaDescription ?? product.description,
    image: product.images?.map((i) => i.url) ?? [],
    sku: product.id,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: priceCurrency(product.specs),
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: canonical,
      priceValidUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function shortDescription(description: string, maxLen = 200): string {
  const trimmed = description.trim();
  if (trimmed.length <= maxLen) return trimmed;
  const cut = trimmed.slice(0, maxLen).replace(/\s+\S*$/, '');
  return cut + (cut.length < trimmed.length ? '…' : '');
}

function formatPrice(product: Product): string {
  if (product.isQuoteOnly) return 'Demander un devis';
  const unit = (product.specs as { unit?: string } | null)?.unit;
  return `À partir de ${product.price}${unit ? ` ${unit}` : ''}`.trim();
}

const HIGHLIGHTS = [
  { label: 'Matériau', value: 'Aluminium' },
  { label: 'Durabilité', value: 'Résistant à la corrosion' },
  { label: 'Service', value: 'Sousse et Tunisie' },
];

export function ProductPage({
  product,
  related,
  breadcrumb,
  pathSegments = [],
  productsBasePath = '/produits',
}: {
  product: Product;
  related: Product[];
  breadcrumb: { name: string; slug: string }[];
  pathSegments?: string[];
  productsBasePath?: string;
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? '';
  const path = pathSegments.length ? pathSegments.join('/') : product.slug;
  const canonical = `${siteUrl}${productsBasePath}/${path}`.replace(/\/+/g, '/');
  const breadcrumbUrls = [
    { name: 'Accueil', url: siteUrl || '/' },
    { name: 'Produits', url: `${siteUrl}${productsBasePath}` },
    ...breadcrumb.map((b) => ({ name: b.name, url: `${siteUrl}${productsBasePath}/${b.slug}` })),
    { name: product.name, url: canonical },
  ];
  const hasImages = product.images && product.images.length > 0;

  return (
    <>
      <ProductSchema product={product} canonical={canonical} />
      <BreadcrumbSchema items={breadcrumbUrls} />

      <SiteHeader />

      <ProductStickyCta product={product} orderBlockId={ORDER_BLOCK_ID} />

      <main id="main-content" className="pdp">
        <div className="container pdp__container">
          <nav aria-label="Fil d'Ariane" className="breadcrumb pdp__breadcrumb">
            <ol className="breadcrumb__list">
              <li><Link href="/">Accueil</Link></li>
              <li><Link href={productsBasePath}>Produits</Link></li>
              <li aria-current="page">{product.name}</li>
            </ol>
          </nav>

          <article className="pdp__article">
            {/* Hero: gallery + info */}
            <header className="pdp-hero">
              <div className="pdp-hero__gallery">
                {hasImages ? (
                  <ProductGallery images={product.images!} productName={product.name} />
                ) : (
                  <div className="pdp-gallery pdp-gallery--empty" aria-hidden>
                    <span className="pdp-gallery__placeholder">Aucune image</span>
                  </div>
                )}
                <ul className="pdp-hero__highlights" role="list">
                  {HIGHLIGHTS.map((h) => (
                    <li key={h.label} className="pdp-hero__highlight">
                      <span className="pdp-hero__highlight-label">{h.label}</span>
                      <span className="pdp-hero__highlight-value">{h.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pdp-hero__info">
                <h1 className="pdp-hero__title">{product.name}</h1>
                <p className="pdp-hero__short-desc">{shortDescription(product.description)}</p>
                <div className="pdp-hero__price-wrap">
                  <p className="product-price pdp-hero__price">{formatPrice(product)}</p>
                  {!product.isQuoteOnly && (
                    <span
                      className={`pdp-hero__stock ${product.stock > 0 ? 'pdp-hero__stock--in' : 'pdp-hero__stock--out'}`}
                      aria-label={product.stock > 0 ? 'En stock' : 'Rupture de stock'}
                    >
                      {product.stock > 0 ? 'En stock' : 'Rupture de stock'}
                    </span>
                  )}
                </div>
                <section
                  id={ORDER_BLOCK_ID}
                  className="pdp-order pdp-order--in-hero"
                  aria-labelledby="pdp-order-heading"
                >
                  <h2 id="pdp-order-heading" className="pdp-order__title">
                    {product.isQuoteOnly ? 'Demander un devis' : 'Commander'}
                  </h2>
                  <OrderForm product={product} />
                </section>
              </div>
            </header>

            {/* Details: tabs */}
            <section className="pdp-details" aria-labelledby="pdp-details-heading">
              <h2 id="pdp-details-heading" className="pdp-details__title">
                Détails du produit
              </h2>
              <ProductPdpTabs description={product.description} specs={product.specs} />
            </section>

            {/* Trust */}
            <section className="pdp-trust" aria-labelledby="pdp-trust-heading">
              <h2 id="pdp-trust-heading" className="pdp-trust__title">
                Pourquoi nous choisir
              </h2>
              <ul className="pdp-trust__list" role="list">
                <li>Produits aluminium de qualité pour usage résidentiel et commercial</li>
                <li>Prix compétitifs et devis personnalisés</li>
                <li>Livraison à Sousse et en Tunisie</li>
                <li>Conseils d’experts et accompagnement professionnel</li>
              </ul>
            </section>

            {/* FAQ */}
            <ProductFaq />
          </article>

          {/* Related */}
          {related.length > 0 && (
            <section
              className="pdp-related"
              aria-labelledby="pdp-related-heading"
            >
              <h2 id="pdp-related-heading" className="pdp-related__title">
                Produits associés
              </h2>
              <ul className="product-grid" role="list">
                {related.map((p) => (
                  <li key={p.id}>
                    <ProductCard product={p} basePath={productsBasePath} />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </main>

      <footer className="site-footer" role="contentinfo">
        <div className="container site-footer__inner">
          <p className="site-footer__copy">&copy; {new Date().getFullYear()} CPA Aluminium. Tous droits réservés.</p>
        </div>
      </footer>
    </>
  );
}

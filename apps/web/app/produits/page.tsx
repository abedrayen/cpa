import Link from 'next/link';
import { fetcher } from '@/lib/api';
import type { Product, Paginated } from '@/lib/types';
import { ProductCard } from '@/components/ProductCard';
import { SiteHeader } from '@/components/SiteHeader';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com';

export const metadata = {
  title: 'Produits',
  description:
    'Parcourez nos produits aluminium. Demande de devis ou achat en ligne. Fournisseur de confiance pour projets résidentiels et commerciaux.',
  alternates: { canonical: `${siteUrl}/produits` },
  openGraph: { url: `${siteUrl}/produits`, type: 'website' },
};

async function getProducts() {
  return fetcher<Paginated<Product>>('/products?limit=100&sort=name&order=asc');
}

export default async function ProduitsPage() {
  const { data: products } = await getProducts();

  return (
    <>
      <SiteHeader />

      <main id="main-content" className="container main-content">
        <h1>Produits</h1>
        <p className="section-lead">
          Demande de devis ou fiche détaillée pour chaque produit.
        </p>
        {products.length === 0 ? (
          <p className="admin-empty">Aucun produit pour le moment.</p>
        ) : (
          <>
            <ul className="product-grid" role="list">
              {products.map((p) => (
                <li key={p.id}>
                  <ProductCard product={p} basePath="/produits" />
                </li>
              ))}
            </ul>
          </>
        )}
      </main>

      <footer className="site-footer" role="contentinfo">
        <div className="container site-footer__inner">
          <p className="site-footer__copy">&copy; {new Date().getFullYear()} CPA Aluminium. Tous droits réservés.</p>
        </div>
      </footer>
    </>
  );
}

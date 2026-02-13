import { notFound } from 'next/navigation';
import { fetcher } from '@/lib/api';
import type { Product } from '@/lib/types';
import { ProductPage } from '@/components/ProductPage';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com';

async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    return await fetcher<Product>(`/products/${slug}`);
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);
  if (!product) return {};
  const title = product.metaTitle ?? product.name;
  const description = product.metaDescription ?? product.description.slice(0, 160);
  const canonical = `${siteUrl}/produits/${product.slug}`;
  return {
    title,
    description,
    openGraph: { title, description, url: canonical },
    twitter: { card: 'summary_large_image', title, description },
    alternates: { canonical },
  };
}

export default async function ProductSlugPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const related = await fetcher<Product[]>(
    `/products/${product.slug}/related?limit=4`
  ).catch(() => []);

  return (
    <ProductPage
      product={product}
      related={related}
      breadcrumb={[]}
      pathSegments={[product.slug]}
      productsBasePath="/produits"
    />
  );
}

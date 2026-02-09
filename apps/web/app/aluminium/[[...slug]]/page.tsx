import { notFound } from 'next/navigation';
import { fetcher } from '@/lib/api';
import type { Category, Product } from '@/lib/types';
import { CategoryPage } from '@/components/CategoryPage';
import { ProductPage } from '@/components/ProductPage';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

function findCategoryByPath(tree: Category[], pathSlugs: string[]): Category | null {
  if (pathSlugs.length === 0) return null;
  let level: Category[] = tree;
  let found: Category | null = null;
  for (const slug of pathSlugs) {
    found = level.find((c) => c.slug === slug) ?? null;
    if (!found) return null;
    level = found.children ?? [];
  }
  return found;
}

async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    return await fetcher<Category>(`/categories/${slug}`);
  } catch {
    return null;
  }
}

async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    return await fetcher<Product>(`/products/${slug}`);
  } catch {
    return null;
  }
}

async function getCategoryTree(): Promise<Category[]> {
  return fetcher<Category[]>('/categories/tree');
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const segments = slug ?? [];
  if (segments.length === 0) return {};

  const tree = await getCategoryTree();
  const lastSlug = segments[segments.length - 1];
  const product = await getProductBySlug(lastSlug);
  if (product) {
    const title = product.metaTitle ?? product.name;
    const description = product.metaDescription ?? product.description.slice(0, 160);
    return {
      title,
      description,
      openGraph: { title, description },
      twitter: { card: 'summary_large_image', title, description },
      alternates: { canonical: `/aluminium/${segments.join('/')}` },
    };
  }
  const category = await getCategoryBySlug(lastSlug);
  if (category) {
    const title = category.metaTitle ?? category.name;
    const description = category.metaDescription ?? `${category.name} - aluminium products`;
    return {
      title,
      description,
      openGraph: { title, description },
      alternates: { canonical: `/aluminium/${segments.join('/')}` },
    };
  }
  return {};
}

export default async function AluminiumSlugPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const segments = slug ?? [];
  if (segments.length === 0) {
    notFound();
  }

  const tree = await getCategoryTree();
  const lastSlug = segments[segments.length - 1];

  const product = await getProductBySlug(lastSlug);
  if (product) {
    const categoryPath = product.category?.slug;
    const pathMatches =
      segments.length === 1 ||
      (segments.length === 2 && segments[0] === categoryPath);
    if (pathMatches) {
      const related = await fetcher<Product[]>(
        `/products/${product.slug}/related?limit=4`
      ).catch(() => []);
      const breadcrumb = categoryPath
        ? [{ name: product.category!.name, slug: `/aluminium/${categoryPath}` }]
        : [];
      return (
        <ProductPage
          product={product}
          related={related}
          breadcrumb={breadcrumb}
          pathSegments={segments}
        />
      );
    }
  }

  const category = await getCategoryBySlug(lastSlug);
  if (category) {
    const pathMatches =
      segments.length === 1 ||
      (segments.length === 2 &&
        category.parent &&
        segments[0] === category.parent.slug);
    if (pathMatches) {
      const products = await fetcher<{ data: Product[] }>(
        `/products/category/${category.slug}?limit=24`
      );
      const breadcrumb: { name: string; slug: string }[] = [];
      if (category.parent) {
        breadcrumb.push({
          name: category.parent.name,
          slug: `/aluminium/${category.parent.slug}`,
        });
      }
      breadcrumb.push({ name: category.name, slug: `/aluminium/${segments.join('/')}` });
      return (
        <CategoryPage
          category={category}
          products={products.data}
          breadcrumb={breadcrumb}
        />
      );
    }
  }

  notFound();
}

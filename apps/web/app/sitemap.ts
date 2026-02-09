import { MetadataRoute } from 'next';
import { fetcher } from '@/lib/api';
import type { Category, Product } from '@/lib/types';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com';

function* walkCategories(cats: Category[], prefix: string): Generator<{ path: string }> {
  for (const c of cats) {
    const path = `${prefix}/${c.slug}`;
    yield { path };
    if (c.children?.length) yield* walkCategories(c.children, path);
  }
}

function buildCategoryPathMap(tree: Category[], prefix = ''): Map<string, string> {
  const map = new Map<string, string>();
  for (const c of tree) {
    const path = prefix ? `${prefix}/${c.slug}` : c.slug;
    map.set(c.slug, path);
    if (c.children?.length) {
      for (const [k, v] of buildCategoryPathMap(c.children, path)) {
        map.set(k, v);
      }
    }
  }
  return map;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/aluminium`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
  ];

  if (!process.env.NEXT_PUBLIC_API_URL) return staticPages;
  try {
    const categories = await fetcher<Category[]>('/categories/tree');
    const categoryPathMap = buildCategoryPathMap(categories);
    const dynamic: MetadataRoute.Sitemap = [];
    for (const { path } of walkCategories(categories, '/aluminium')) {
      dynamic.push({
        url: `${baseUrl}${path}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    }
    const res = await fetcher<{ data: Product[] }>('/products?limit=5000');
    for (const p of res.data) {
      const catSlug = p.category?.slug;
      const catPath = catSlug ? categoryPathMap.get(catSlug) ?? catSlug : '';
      const path = catPath ? `/aluminium/${catPath}/${p.slug}` : `/aluminium/p/${p.slug}`;
      dynamic.push({
        url: `${baseUrl}${path}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    }
    return [...staticPages, ...dynamic];
  } catch {
    return staticPages;
  }
}

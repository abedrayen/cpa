import { MetadataRoute } from 'next';
import { fetcher } from '@/lib/api';
import type { Product } from '@/lib/types';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/products`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
  ];

  if (!process.env.NEXT_PUBLIC_API_URL) return staticPages;
  try {
    const res = await fetcher<{ data: Product[] }>('/products?limit=5000');
    const dynamic: MetadataRoute.Sitemap = res.data.map((p) => ({
      url: `${baseUrl}/products/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
    return [...staticPages, ...dynamic];
  } catch {
    return staticPages;
  }
}

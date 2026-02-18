/**
 * Custom Next.js image loader. Returns API upload URLs as-is so the browser
 * loads them directly and avoids 404s from /_next/image proxy.
 */
export default function imageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  if (
    src.startsWith('data:') ||
    src.includes('api.comptoirpro.shop') ||
    src.includes('/uploads/')
  ) {
    return src;
  }
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality ?? 75}`;
}

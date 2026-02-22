/** Force HTTPS for API image URLs to avoid mixed content. */
function ensureHttpsForApiImages(src: string): string {
  if (typeof src !== 'string') return src;
  if (src.startsWith('http://') && src.includes('api.comptoirpro.shop')) {
    return src.replace(/^http:\/\//i, 'https://');
  }
  return src;
}

/**
 * Custom Next.js image loader. Returns URLs as-is for same-origin and API
 * images so the browser loads them directly (avoids optimizer 404s and
 * ensures logo/header from public/ work in production). API URLs are forced to HTTPS.
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
  const safeSrc = ensureHttpsForApiImages(src);
  if (safeSrc.startsWith('data:')) return safeSrc;
  if (safeSrc.startsWith('/')) return safeSrc;
  if (safeSrc.includes('api.comptoirpro.shop') || safeSrc.includes('/uploads/')) return safeSrc;
  return `/_next/image?url=${encodeURIComponent(safeSrc)}&w=${width}&q=${quality ?? 75}`;
}

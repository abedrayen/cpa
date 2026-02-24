/**
 * Custom Next.js image loader. Returns URLs as-is for same-origin and API
 * images so the browser loads them directly (avoids optimizer 404s and
 * ensures logo/header from public/ work in production).
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
  if (typeof src !== 'string') return src;
  if (src.startsWith('data:')) return src;
  if (src.startsWith('/')) return src;
  if (src.includes('/api/v1/uploads/') || src.includes('/uploads/')) return src;
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality ?? 75}`;
}

/** Use unoptimized Next/Image for data URLs and API-hosted uploads to avoid optimizer 404s. */
export function isUnoptimizedImage(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  if (url.startsWith('data:')) return true;
  if (url.includes('api.comptoirpro.shop')) return true;
  if (url.includes('/uploads/')) return true;
  return false;
}

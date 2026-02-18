/** Use unoptimized Next/Image for data URLs and API-hosted uploads to avoid optimizer 404s. */
export function isUnoptimizedImage(url: string): boolean {
  if (url.startsWith('data:')) return true;
  try {
    const u = new URL(url);
    if (u.hostname === 'api.comptoirpro.shop') return true;
    if (u.hostname === 'localhost' && u.pathname.startsWith('/uploads/')) return true;
  } catch {
    // ignore
  }
  return false;
}

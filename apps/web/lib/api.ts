const API_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

/**
 * Fetch from the API. By default Next.js caches fetch(); pass cache: 'no-store'
 * (or use fetcherNoCache) for data that must be fresh (e.g. products after admin changes).
 */
export async function fetcher<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...init?.headers },
    next: init?.next as RequestInit['next'],
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(Array.isArray(err.message) ? err.message[0] : err.message);
  }
  return res.json();
}

/** Fetcher that bypasses Next.js data cache — use for product data so visitor sees admin changes. */
export function fetcherNoCache<T>(path: string, init?: Omit<RequestInit, 'cache'>): Promise<T> {
  return fetcher<T>(path, { ...init, cache: 'no-store' });
}

export function apiUrl(path: string): string {
  return `${API_URL}${path}`;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

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

export function apiUrl(path: string): string {
  return `${API_URL}${path}`;
}

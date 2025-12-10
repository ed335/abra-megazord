const TOKEN_KEY = 'abracann_token';
const COOKIE_NAME = 'auth_token';

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export function setToken(token: string) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEY, token);
  document.cookie = `${COOKIE_NAME}=${token}; path=/; SameSite=Lax`;
}

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  const ls = localStorage.getItem(TOKEN_KEY);
  if (ls) return ls;
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export function clearToken() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
  document.cookie = `${COOKIE_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

type FetchOptions = RequestInit & { skipAuthHeader?: boolean };

export async function fetchWithAuth<T = unknown>(
  path: string,
  options: FetchOptions = {}
): Promise<T> {
  const token = options.skipAuthHeader ? null : getToken();
  const headers = new Headers(options.headers || {});

  if (!options.skipAuthHeader && token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    clearToken();
    throw new Error('Sessão expirada. Faça login novamente.');
  }

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    const message = error?.message || 'Erro ao comunicar com o servidor';
    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

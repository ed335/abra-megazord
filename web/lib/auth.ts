const TOKEN_KEY = 'abracann_token';

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export function setToken(token: string) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function clearToken() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
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

const TOKEN_KEY = 'cc-admin-token';
const USER_KEY = 'cc-admin-user';

export type AdminUser = { id: string; email: string; role: string };

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function getAdminUser(): AdminUser | null {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw) as AdminUser; } catch { return null; }
}

export function saveSession(token: string, user: AdminUser): void {
  // Store token in localStorage as fallback for cross-domain cookie issues
  if (token) localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearSession(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function isLoggedIn(): boolean {
  return !!getAdminUser();
}

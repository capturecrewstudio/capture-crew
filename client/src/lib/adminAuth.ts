const USER_KEY = 'cc-admin-user';

export type AdminUser = { id: string; email: string; role: string };

// Token is stored in httpOnly cookie by the server — never accessible here.
// We only store the non-sensitive user profile in localStorage for display.

export function getToken(): string | null {
  // Token is in httpOnly cookie — not readable by JS.
  // Return a placeholder so apiFetch includes credentials.
  return 'cookie';
}

export function getAdminUser(): AdminUser | null {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw) as AdminUser; } catch { return null; }
}

export function saveSession(_token: string, user: AdminUser): void {
  // Token is set as httpOnly cookie by server — we only store display info
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearSession(): void {
  localStorage.removeItem(USER_KEY);
}

export function isLoggedIn(): boolean {
  // Can't read httpOnly cookie — check if we have stored user info
  return !!getAdminUser();
}

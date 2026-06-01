import { getToken, clearSession } from './adminAuth';

const BASE = import.meta.env.VITE_API_BASE_URL ?? '/api';

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(init?.headers as Record<string, string> ?? {}),
  };

  const res = await fetch(`${BASE}${path}`, { ...init, headers });

  if (res.status === 401) {
    clearSession();
    window.location.reload();
    throw new Error('Session expired');
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Request failed' }));
    throw new Error((err as { message?: string }).message ?? 'Request failed');
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

// ─── Auth ────────────────────────────────────────────────────────────────────

export async function apiLogin(email: string, password: string) {
  return apiFetch<{ token: string; user: { id: string; email: string; role: string } }>(
    '/auth/login',
    { method: 'POST', body: JSON.stringify({ email, password }) }
  );
}

// ─── Leads ───────────────────────────────────────────────────────────────────

export type ApiLead = {
  id: string; name: string; email: string; phone: string | null;
  service: string; message: string; status: string; createdAt: string;
};

export async function apiGetLeads(): Promise<ApiLead[]> {
  return apiFetch('/leads');
}

export async function apiPatchLeadStatus(id: string, status: string): Promise<ApiLead> {
  return apiFetch(`/leads/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) });
}

// ─── Categories ──────────────────────────────────────────────────────────────

export type ApiCategory = { id: string; name: string; slug: string; createdAt: string };

export async function apiGetCategories(): Promise<ApiCategory[]> {
  return apiFetch('/categories');
}

export async function apiCreateCategory(data: { name: string; slug?: string }): Promise<ApiCategory> {
  return apiFetch('/categories', { method: 'POST', body: JSON.stringify(data) });
}

export async function apiDeleteCategory(id: string): Promise<void> {
  return apiFetch(`/categories/${id}`, { method: 'DELETE' });
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

export type ApiTestimonial = {
  id: string; name: string; designation: string | null;
  message: string; image: string | null; featured: boolean; createdAt: string;
};

export type TestimonialPayload = {
  name: string; designation?: string; message: string; image?: string; featured: boolean;
};

export async function apiGetTestimonials(): Promise<ApiTestimonial[]> {
  return apiFetch('/testimonials');
}

export async function apiCreateTestimonial(data: TestimonialPayload): Promise<ApiTestimonial> {
  return apiFetch('/testimonials', { method: 'POST', body: JSON.stringify(data) });
}

export async function apiUpdateTestimonial(id: string, data: TestimonialPayload): Promise<ApiTestimonial> {
  return apiFetch(`/testimonials/${id}`, { method: 'PUT', body: JSON.stringify(data) });
}

export async function apiDeleteTestimonial(id: string): Promise<void> {
  return apiFetch(`/testimonials/${id}`, { method: 'DELETE' });
}

// ─── Media ───────────────────────────────────────────────────────────────────

export type ApiMedia = {
  id: string; originalName: string; folder: string;
  variants: unknown; blurDataUrl: string; createdAt: string;
};

export async function apiGetMedia(): Promise<ApiMedia[]> {
  return apiFetch('/media');
}

export async function apiUploadMedia(files: FileList): Promise<{ uploads: ApiMedia[] }> {
  const token = getToken();
  const formData = new FormData();
  Array.from(files).forEach((f) => formData.append('images', f));

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 120_000);

  const res = await fetch(`${BASE}/media/upload`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
    signal: controller.signal,
  }).finally(() => clearTimeout(timer));

  if (res.status === 401) { clearSession(); window.location.reload(); throw new Error('Session expired'); }
  if (!res.ok) { const e = await res.json().catch(() => ({ message: 'Upload failed' })); throw new Error((e as {message?:string}).message ?? 'Upload failed'); }
  return res.json();
}

// ─── Content ──────────────────────────────────────────────────────────────────

export type ApiContent = {
  id: string;
  heroHeadline: string; heroSubheadline: string; heroCta1: string; heroCta2: string;
  stats: Record<string, unknown>; partners: string[];
  socialProofEyebrow: string; socialProofHeadline: string;
  faq: Array<{ q: string; a: string }>;
  packages: Array<Record<string, unknown>>;
  footerTagline: string; footerPhone: string; footerEmail: string; footerCities: string;
  contactHeadline: string; contactSubheadline: string;
  socialDock: Record<string, string>;
};

export async function apiGetContent(): Promise<ApiContent> {
  return apiFetch('/content');
}

export async function apiUpdateContent(data: Partial<ApiContent>): Promise<ApiContent> {
  return apiFetch('/content', { method: 'PUT', body: JSON.stringify(data) });
}

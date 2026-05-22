const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '/api';

export type LeadPayload = {
  name: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
};

export async function submitLead(payload: LeadPayload) {
  const response = await fetch(`${API_BASE}/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Unable to send enquiry' }));
    throw new Error(error.message ?? 'Unable to send enquiry');
  }

  return response.json();
}

export async function uploadMedia(files: FileList, token: string) {
  const formData = new FormData();
  Array.from(files).forEach((file) => formData.append('images', file));

  const response = await fetch(`${API_BASE}/media/upload`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Upload failed' }));
    throw new Error(error.message ?? 'Upload failed');
  }

  return response.json();
}

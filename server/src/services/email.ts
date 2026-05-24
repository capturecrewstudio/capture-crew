import { Resend } from 'resend';
import { env } from '../config/env.js';

const resend = env.RESEND_API_KEY ? new Resend(env.RESEND_API_KEY) : null;

type Lead = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  service: string;
  message: string;
  createdAt: Date;
};

export async function sendNewLeadEmail(lead: Lead): Promise<void> {
  if (!resend || !env.STUDIO_EMAIL) return;

  await resend.emails.send({
    from: 'Capture Crew <noreply@capturecrew.in>',
    to: env.STUDIO_EMAIL,
    subject: `New enquiry: ${lead.name} — ${lead.service}`,
    html: `
      <h2 style="font-family:sans-serif;color:#111">New Enquiry Received</h2>
      <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;width:100%;max-width:540px">
        <tr><td style="padding:8px 0;color:#555;width:120px">Name</td><td style="padding:8px 0"><strong>${lead.name}</strong></td></tr>
        <tr><td style="padding:8px 0;color:#555">Email</td><td style="padding:8px 0"><a href="mailto:${lead.email}">${lead.email}</a></td></tr>
        <tr><td style="padding:8px 0;color:#555">Phone</td><td style="padding:8px 0">${lead.phone || '—'}</td></tr>
        <tr><td style="padding:8px 0;color:#555">Service</td><td style="padding:8px 0">${lead.service}</td></tr>
        <tr><td style="padding:8px 0;color:#555;vertical-align:top">Message</td><td style="padding:8px 0;white-space:pre-wrap">${lead.message}</td></tr>
        <tr><td style="padding:8px 0;color:#555">Received</td><td style="padding:8px 0">${lead.createdAt.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</td></tr>
      </table>
      <p style="font-family:sans-serif;font-size:12px;color:#999;margin-top:24px">Reply directly to <a href="mailto:${lead.email}">${lead.email}</a></p>
    `,
  });
}

import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../config/prisma.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

const contentSchema = z.object({
  heroHeadline: z.string().optional(),
  heroSubheadline: z.string().optional(),
  heroCta1: z.string().optional(),
  heroCta2: z.string().optional(),
  stats: z.record(z.unknown()).optional(),
  partners: z.array(z.string()).optional(),
  socialProofEyebrow: z.string().optional(),
  socialProofHeadline: z.string().optional(),
  faq: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
  packages: z.array(z.record(z.unknown())).optional(),
  footerTagline: z.string().optional(),
  footerPhone: z.string().optional(),
  footerEmail: z.string().optional(),
  footerCities: z.string().optional(),
  contactHeadline: z.string().optional(),
  contactSubheadline: z.string().optional(),
  socialDock: z.record(z.string()).optional(),
});

async function getOrCreateContent() {
  const existing = await prisma.siteContent.findFirst();
  if (existing) return existing;
  return prisma.siteContent.create({ data: {} });
}

router.get('/', async (_req, res) => {
  const content = await getOrCreateContent();
  res.setHeader('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
  res.json(content);
});

router.put('/', requireAdmin, async (req, res) => {
  const body = contentSchema.parse(req.body);
  const existing = await getOrCreateContent();
  const updated = await prisma.siteContent.update({
    where: { id: existing.id },
    data: body as never,
  });
  res.json(updated);
});

export { router as contentRouter };

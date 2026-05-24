import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../config/prisma.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

const seoSchema = z.object({
  path: z.string().min(1),
  title: z.string().min(2),
  description: z.string().min(10),
  ogImage: z.string().url().optional(),
  canonical: z.string().url().optional(),
  structured: z.record(z.unknown()).optional()
});

router.get('/', async (_req, res) => {
  try {
    const settings = await prisma.seoSetting.findMany({ orderBy: { path: 'asc' } });
    res.json(settings);
  } catch {
    res.json([
      {
        path: '/',
        title: 'Capture Crew | Luxury Visual Storytelling',
        description: 'Luxury photography, videography, and brand imagery for architecture, fashion, weddings, product, food, and commercial campaigns.'
      }
    ]);
  }
});

router.put('/:path', requireAdmin, async (req, res) => {
  const body = seoSchema.parse({ ...req.body, path: `/${req.params.path}`.replace('//', '/') });
  const data = { ...body } as never;
  const setting = await prisma.seoSetting.upsert({
    where: { path: body.path },
    update: data,
    create: data
  });
  res.json(setting);
});

export { router as seoRouter };

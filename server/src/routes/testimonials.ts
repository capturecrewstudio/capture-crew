import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../config/prisma.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

const testimonialSchema = z.object({
  name: z.string().min(2),
  designation: z.string().optional(),
  message: z.string().min(10),
  image: z.string().optional(),
  featured: z.boolean().default(false),
});

router.get('/', async (_req, res) => {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
    });
    res.setHeader('Cache-Control', 'public, max-age=120, stale-while-revalidate=600');
    res.json(testimonials);
  } catch {
    res.json([]);
  }
});

router.post('/', requireAdmin, async (req, res) => {
  const body = testimonialSchema.parse(req.body);
  const testimonial = await prisma.testimonial.create({ data: body });
  res.status(201).json(testimonial);
});

router.put('/:id', requireAdmin, async (req, res) => {
  const body = testimonialSchema.parse(req.body);
  const testimonial = await prisma.testimonial.update({
    where: { id: req.params.id as string },
    data: body,
  });
  res.json(testimonial);
});

router.delete('/:id', requireAdmin, async (req, res) => {
  await prisma.testimonial.delete({ where: { id: req.params.id as string } });
  res.status(204).end();
});

export { router as testimonialsRouter };

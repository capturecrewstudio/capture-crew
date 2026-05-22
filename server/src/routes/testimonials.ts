import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../config/prisma.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

const testimonialSchema = z.object({
  name: z.string().min(2),
  designation: z.string().optional(),
  message: z.string().min(10),
  image: z.string().url().optional(),
  featured: z.boolean().default(false)
});

router.get('/', async (_req, res) => {
  try {
    const testimonials = await prisma.testimonial.findMany({ orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }] });
    res.json(testimonials);
  } catch {
    res.json([
      {
        id: 'aarav-mehta',
        name: 'Aarav Mehta',
        designation: 'Principal Architect, AM Studio',
        message: 'Every image felt deliberate, premium, and deeply human.',
        featured: true
      }
    ]);
  }
});

router.post('/', requireAdmin, async (req, res) => {
  const body = testimonialSchema.parse(req.body);
  const testimonial = await prisma.testimonial.create({ data: body });
  res.status(201).json(testimonial);
});

export { router as testimonialsRouter };

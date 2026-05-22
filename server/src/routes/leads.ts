import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../config/prisma.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

const leadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  service: z.string().min(2),
  message: z.string().min(10)
});

router.post('/', async (req, res) => {
  const body = leadSchema.parse(req.body);
  const lead = await prisma.lead.create({ data: body });
  res.status(201).json(lead);
});

router.get('/', requireAdmin, async (_req, res) => {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(leads);
});

export { router as leadsRouter };

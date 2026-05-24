import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../config/prisma.js';
import { requireAdmin } from '../middleware/auth.js';
import { leadsLimiter } from '../middleware/rateLimit.js';
import { sendNewLeadEmail } from '../services/email.js';

const router = Router();

const leadSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().max(30).optional(),
  service: z.string().min(2).max(100),
  message: z.string().min(10).max(2000),
});

const statusSchema = z.object({
  status: z.enum(['NEW', 'CONTACTED', 'QUALIFIED', 'BOOKED', 'ARCHIVED']),
});

router.post('/', leadsLimiter, async (req, res) => {
  const body = leadSchema.parse(req.body);
  const lead = await prisma.lead.create({ data: body });
  // Fire-and-forget email — lead is saved regardless
  sendNewLeadEmail(lead).catch((err) => console.error('Lead email failed:', err));
  res.status(201).json(lead);
});

router.get('/', requireAdmin, async (_req, res) => {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(leads);
});

router.patch('/:id', requireAdmin, async (req, res) => {
  const { status } = statusSchema.parse(req.body);
  const lead = await prisma.lead.update({
    where: { id: req.params.id },
    data: { status },
  });
  res.json(lead);
});

export { router as leadsRouter };

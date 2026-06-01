import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../config/prisma.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

const capabilitySchema = z.object({
  title:       z.string().min(1),
  subtitle:    z.string().optional().default(''),
  description: z.string().optional().default(''),
  image:       z.string().optional().default(''),
  tags:        z.array(z.string()).optional().default([]),
  sortOrder:   z.number().int().optional().default(0),
});

// Public — used by AutoScanPanels
router.get('/', async (_req, res) => {
  const capabilities = await prisma.capability.findMany({
    orderBy: { sortOrder: 'asc' },
  });
  res.json(capabilities);
});

// Admin CRUD
router.post('/', requireAdmin, async (req, res) => {
  const data = capabilitySchema.parse(req.body);
  const capability = await prisma.capability.create({ data: data as never });
  res.status(201).json(capability);
});

router.put('/:id', requireAdmin, async (req, res) => {
  const data = capabilitySchema.parse(req.body);
  const capability = await prisma.capability.update({
    where: { id: String(req.params.id) },
    data: data as never,
  });
  res.json(capability);
});

router.delete('/:id', requireAdmin, async (req, res) => {
  await prisma.capability.delete({ where: { id: String(req.params.id) } });
  res.status(204).end();
});

export { router as capabilitiesRouter };

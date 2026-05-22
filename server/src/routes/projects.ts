import { Router } from 'express';
import slugify from 'slugify';
import { z } from 'zod';
import { prisma } from '../config/prisma.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

const projectSchema = z.object({
  title: z.string().min(2),
  description: z.string().optional(),
  categoryId: z.string().uuid(),
  coverImage: z.string().url().optional(),
  featured: z.boolean().default(false)
});

router.get('/', async (_req, res) => {
  const projects = await prisma.project.findMany({
    include: { category: true, images: { orderBy: { sortOrder: 'asc' } } },
    orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }]
  });
  res.json(projects);
});

router.get('/:slug', async (req, res) => {
  const project = await prisma.project.findUnique({
    where: { slug: req.params.slug },
    include: { category: true, images: { orderBy: { sortOrder: 'asc' } } }
  });

  if (!project) return res.status(404).json({ message: 'Project not found' });
  res.json(project);
});

router.post('/', requireAdmin, async (req, res) => {
  const body = projectSchema.parse(req.body);
  const project = await prisma.project.create({
    data: {
      ...body,
      slug: slugify(body.title, { lower: true, strict: true })
    }
  });
  res.status(201).json(project);
});

export { router as projectsRouter };

import { Router } from 'express';
import slugify from 'slugify';
import { z } from 'zod';
import { prisma } from '../config/prisma.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

const projectSchema = z.object({
  title: z.string().min(2),
  description: z.string().optional(),
  summary: z.string().optional(),
  narrative: z.string().optional(),
  location: z.string().optional(),
  year: z.string().optional(),
  client: z.string().optional(),
  services: z.array(z.string()).default([]),
  categoryId: z.string().uuid(),
  coverImage: z.string().optional(),
  featured: z.boolean().default(false),
});

const imageSchema = z.object({
  imageUrl: z.string().min(1),
  avifUrl: z.string().optional(),
  webpUrl: z.string().optional(),
  blurDataUrl: z.string().optional(),
  sortOrder: z.number().int().default(0),
  altText: z.string().optional(),
});

router.get('/', async (_req, res) => {
  try {
    const projects = await prisma.project.findMany({
      include: { category: true, images: { orderBy: { sortOrder: 'asc' } } },
      orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
    });
    res.json(projects);
  } catch {
    res.json([]);
  }
});

router.get('/:slug', async (req, res) => {
  const project = await prisma.project.findUnique({
    where: { slug: req.params.slug as string },
    include: { category: true, images: { orderBy: { sortOrder: 'asc' } } },
  });
  if (!project) return res.status(404).json({ message: 'Project not found' });
  res.json(project);
});

router.post('/', requireAdmin, async (req, res) => {
  try {
    const body = projectSchema.parse(req.body);
    const baseSlug = slugify(body.title, { lower: true, strict: true });
    // ensure unique slug
    const existing = await prisma.project.findUnique({ where: { slug: baseSlug } });
    const slug = existing ? `${baseSlug}-${Date.now()}` : baseSlug;
    const project = await prisma.project.create({
      data: { ...body, slug },
      include: { category: true, images: true },
    });
    res.status(201).json(project);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to create project';
    res.status(400).json({ message });
  }
});

router.put('/:id', requireAdmin, async (req, res) => {
  try {
    const body = projectSchema.parse(req.body);
    const project = await prisma.project.update({
      where: { id: req.params.id as string },
      data: body,
      include: { category: true, images: { orderBy: { sortOrder: 'asc' } } },
    });
    res.json(project);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to update project';
    res.status(400).json({ message });
  }
});

router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    await prisma.project.delete({ where: { id: req.params.id as string } });
    res.status(204).end();
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to delete project';
    res.status(400).json({ message });
  }
});

// ─── Project Images ───────────────────────────────────────────────────────────

router.post('/:id/images', requireAdmin, async (req, res) => {
  try {
    const body = imageSchema.parse(req.body);
    const image = await prisma.projectImage.create({
      data: { projectId: req.params.id as string, ...body },
    });
    res.status(201).json(image);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to add image';
    res.status(400).json({ message });
  }
});

router.delete('/:id/images/:imageId', requireAdmin, async (req, res) => {
  try {
    await prisma.projectImage.delete({ where: { id: req.params.imageId as string } });
    res.status(204).end();
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to delete image';
    res.status(400).json({ message });
  }
});

export { router as projectsRouter };

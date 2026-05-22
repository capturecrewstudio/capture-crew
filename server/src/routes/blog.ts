import { Router } from 'express';
import slugify from 'slugify';
import { z } from 'zod';
import { prisma } from '../config/prisma.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

const postSchema = z.object({
  title: z.string().min(2),
  excerpt: z.string().optional(),
  body: z.string().min(20),
  coverImage: z.string().url().optional(),
  publishedAt: z.string().datetime().optional()
});

router.get('/', async (_req, res) => {
  try {
    const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(posts);
  } catch {
    res.json([]);
  }
});

router.post('/', requireAdmin, async (req, res) => {
  const body = postSchema.parse(req.body);
  const post = await prisma.blogPost.create({
    data: {
      ...body,
      slug: slugify(body.title, { lower: true, strict: true }),
      publishedAt: body.publishedAt ? new Date(body.publishedAt) : undefined
    }
  });
  res.status(201).json(post);
});

export { router as blogRouter };

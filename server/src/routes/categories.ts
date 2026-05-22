import { Router } from 'express';
import slugify from 'slugify';
import { z } from 'zod';
import { prisma } from '../config/prisma.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

const fallbackCategories = [
  { id: 'architecture', name: 'Architecture', slug: 'architecture' },
  { id: 'luxury-interiors', name: 'Luxury Interiors', slug: 'luxury-interiors' },
  { id: 'fashion', name: 'Fashion', slug: 'fashion' },
  { id: 'commercial', name: 'Commercial', slug: 'commercial' },
  { id: 'product', name: 'Product', slug: 'product' },
  { id: 'food', name: 'Food', slug: 'food' },
  { id: 'weddings', name: 'Weddings', slug: 'weddings' }
];

const categorySchema = z.object({
  name: z.string().min(2),
  slug: z.string().optional()
});

router.get('/', async (_req, res) => {
  try {
    const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } });
    res.json(categories);
  } catch {
    res.json(fallbackCategories);
  }
});

router.post('/', requireAdmin, async (req, res) => {
  const body = categorySchema.parse(req.body);
  const category = await prisma.category.create({
    data: {
      name: body.name,
      slug: body.slug ?? slugify(body.name, { lower: true, strict: true })
    }
  });
  res.status(201).json(category);
});

export { router as categoriesRouter };

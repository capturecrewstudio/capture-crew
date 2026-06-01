import { Router } from 'express';
import multer from 'multer';
import { requireAdmin } from '../middleware/auth.js';
import { uploadLimiter } from '../middleware/rateLimit.js';
import { uploadOptimizedImage, deleteImages } from '../services/s3.js';
import { prisma } from '../config/prisma.js';

const router = Router();

const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif']);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024, files: 12 },
  fileFilter(_req, file, cb) {
    if (ALLOWED_MIME.has(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Unsupported file type: ${file.mimetype}`));
    }
  },
});

router.post('/upload', requireAdmin, uploadLimiter, upload.array('images', 12), async (req, res) => {
  const files = req.files as { originalname: string; buffer: Buffer; mimetype: string }[] | undefined;

  if (!files?.length) {
    return res.status(400).json({ message: 'At least one image is required' });
  }

  try {
    const results = await Promise.all(
      files.map(async (file) => {
        // sharp will throw if the buffer isn't a real image — catches renamed files
        const result = await uploadOptimizedImage(file);

        const record = await prisma.media.create({
          data: {
            originalName: file.originalname,
            folder: 'portfolio',
            variants: result.variants as object,
            blurDataUrl: result.blurDataUrl,
          },
        });

        return { ...result, id: record.id };
      })
    );

    res.status(201).json({ uploads: results });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Upload failed';
    res.status(500).json({ message });
  }
});

router.get('/', requireAdmin, async (_req, res) => {
  try {
    const media = await prisma.media.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(media);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to fetch media';
    res.status(500).json({ message });
  }
});

router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const record = await prisma.media.findUnique({ where: { id: req.params.id as string } });
    if (!record) return res.status(404).json({ message: 'Media not found' });

    // Delete all variant files from R2
    const variants = record.variants as Array<{ key: string }> | null;
    if (Array.isArray(variants)) {
      await deleteImages(variants.map(v => v.key).filter(Boolean));
    }

    await prisma.media.delete({ where: { id: record.id } });
    res.status(204).end();
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to delete media';
    res.status(500).json({ message });
  }
});

export { router as mediaRouter };

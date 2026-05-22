import multer from 'multer';
import { Router } from 'express';
import { requireAdmin } from '../middleware/auth.js';
import { uploadOptimizedImage } from '../services/s3.js';

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 20 * 1024 * 1024,
    files: 12
  }
});

router.post('/upload', requireAdmin, upload.array('images', 12), async (req, res) => {
  const files = req.files as Express.Multer.File[] | undefined;

  if (!files?.length) {
    return res.status(400).json({ message: 'At least one image is required' });
  }

  const uploads = await Promise.all(files.map((file) => uploadOptimizedImage(file)));
  res.status(201).json({ uploads });
});

export { router as mediaRouter };

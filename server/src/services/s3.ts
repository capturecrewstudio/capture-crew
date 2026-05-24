import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import sharp from 'sharp';
import { env } from '../config/env.js';

// R2 is S3-compatible — only the endpoint differs
const s3 = new S3Client({
  region: 'auto',
  endpoint: env.R2_ACCOUNT_ID ? `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com` : undefined,
  credentials: env.R2_ACCESS_KEY_ID && env.R2_SECRET_ACCESS_KEY
    ? {
        accessKeyId: env.R2_ACCESS_KEY_ID,
        secretAccessKey: env.R2_SECRET_ACCESS_KEY
      }
    : undefined
});

type UploadVariant = {
  key: string;
  url: string;
  width: number;
  format: 'webp' | 'avif';
};

function publicUrl(key: string) {
  const baseUrl = env.R2_PUBLIC_URL?.replace(/\/$/, '');
  return baseUrl ? `${baseUrl}/${key}` : key;
}

type UploadFile = { originalname: string; buffer: Buffer; mimetype: string };

export async function uploadOptimizedImage(file: UploadFile, folder = 'portfolio') {
  if (!env.R2_BUCKET) {
    throw new Error('R2_BUCKET is not configured');
  }

  const safeName = file.originalname.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const stamp = Date.now();
  const widths = [720, 1280, 1920];
  const variants: UploadVariant[] = [];

  for (const width of widths) {
    for (const format of ['webp', 'avif'] as const) {
      const body = await sharp(file.buffer)
        .resize({ width, withoutEnlargement: true })
        .toFormat(format, { quality: format === 'avif' ? 58 : 78 })
        .toBuffer();
      const key = `${folder}/${stamp}-${width}-${safeName}.${format}`;

      await s3.send(new PutObjectCommand({
        Bucket: env.R2_BUCKET,
        Key: key,
        Body: body,
        ContentType: `image/${format}`,
        CacheControl: 'public, max-age=31536000, immutable'
      }));

      variants.push({ key, url: publicUrl(key), width, format });
    }
  }

  const placeholder = await sharp(file.buffer)
    .resize({ width: 24, withoutEnlargement: true })
    .blur(8)
    .webp({ quality: 35 })
    .toBuffer();

  return {
    originalName: file.originalname,
    variants,
    blurDataUrl: `data:image/webp;base64,${placeholder.toString('base64')}`
  };
}

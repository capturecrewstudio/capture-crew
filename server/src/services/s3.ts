import { PutObjectCommand, DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';
import sharp from 'sharp';
import { env } from '../config/env.js';

const s3 = new S3Client({
  region: 'auto',
  endpoint: env.R2_ACCOUNT_ID ? `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com` : undefined,
  credentials: env.R2_ACCESS_KEY_ID && env.R2_SECRET_ACCESS_KEY
    ? { accessKeyId: env.R2_ACCESS_KEY_ID, secretAccessKey: env.R2_SECRET_ACCESS_KEY }
    : undefined,
});

type UploadVariant = {
  key: string;
  url: string;
  width: number;
  format: 'webp' | 'original';
};

function publicUrl(key: string) {
  const baseUrl = env.R2_PUBLIC_URL?.replace(/\/$/, '');
  return baseUrl ? `${baseUrl}/${key}` : key;
}

type UploadFile = { originalname: string; buffer: Buffer; mimetype: string };

export async function uploadOptimizedImage(file: UploadFile, folder = 'portfolio') {
  if (!env.R2_BUCKET) throw new Error('R2_BUCKET is not configured');

  const safeName = file.originalname.toLowerCase().replace(/[^a-z0-9.]+/g, '-').replace(/^-|-$/g, '');
  const stamp = Date.now();
  const variants: UploadVariant[] = [];

  // ── 1. Store the original file untouched — zero quality loss ─────────────
  const ext = safeName.split('.').pop() ?? 'jpg';
  const originalKey = `${folder}/${stamp}-original-${safeName}`;
  await s3.send(new PutObjectCommand({
    Bucket: env.R2_BUCKET,
    Key: originalKey,
    Body: file.buffer,
    ContentType: file.mimetype || `image/${ext}`,
    CacheControl: 'public, max-age=31536000, immutable',
  }));

  const meta = await sharp(file.buffer).metadata();
  const originalWidth = meta.width ?? 0;

  variants.push({
    key: originalKey,
    url: publicUrl(originalKey),
    width: originalWidth,
    format: 'original',
  });

  // ── 2. WebP display variant at 1600px — fast load for web display ─────────
  if (originalWidth > 800) {
    const displayBody = await sharp(file.buffer)
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 90, effort: 4 })
      .toBuffer();
    const displayKey = `${folder}/${stamp}-1600-${safeName}.webp`;
    await s3.send(new PutObjectCommand({
      Bucket: env.R2_BUCKET,
      Key: displayKey,
      Body: displayBody,
      ContentType: 'image/webp',
      CacheControl: 'public, max-age=31536000, immutable',
    }));
    variants.push({ key: displayKey, url: publicUrl(displayKey), width: 1600, format: 'webp' });
  }

  // ── 3. WebP thumbnail at 720px — for grids and admin panel ───────────────
  const thumbBody = await sharp(file.buffer)
    .resize({ width: 720, withoutEnlargement: true })
    .webp({ quality: 82, effort: 4 })
    .toBuffer();
  const thumbKey = `${folder}/${stamp}-720-${safeName}.webp`;
  await s3.send(new PutObjectCommand({
    Bucket: env.R2_BUCKET,
    Key: thumbKey,
    Body: thumbBody,
    ContentType: 'image/webp',
    CacheControl: 'public, max-age=31536000, immutable',
  }));
  variants.push({ key: thumbKey, url: publicUrl(thumbKey), width: 720, format: 'webp' });

  // ── 4. Blur placeholder for progressive loading ───────────────────────────
  const placeholder = await sharp(file.buffer)
    .resize({ width: 24, withoutEnlargement: true })
    .blur(8)
    .webp({ quality: 30 })
    .toBuffer();

  return {
    originalName: file.originalname,
    variants,
    blurDataUrl: `data:image/webp;base64,${placeholder.toString('base64')}`,
  };
}

export async function deleteImages(keys: string[]) {
  if (!env.R2_BUCKET || !keys.length) return;
  await Promise.all(
    keys.map(key => s3.send(new DeleteObjectCommand({ Bucket: env.R2_BUCKET!, Key: key })))
  );
}

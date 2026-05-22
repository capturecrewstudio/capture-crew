import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import sharp from 'sharp';
import { env } from '../config/env.js';

const s3 = new S3Client({
  region: env.AWS_REGION,
  credentials: env.AWS_ACCESS_KEY_ID && env.AWS_SECRET_ACCESS_KEY
    ? {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY
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
  const baseUrl = env.AWS_S3_PUBLIC_BASE_URL?.replace(/\/$/, '');
  return baseUrl ? `${baseUrl}/${key}` : `https://${env.AWS_S3_BUCKET}.s3.${env.AWS_REGION}.amazonaws.com/${key}`;
}

export async function uploadOptimizedImage(file: Express.Multer.File, folder = 'portfolio') {
  if (!env.AWS_S3_BUCKET) {
    throw new Error('AWS_S3_BUCKET is not configured');
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
        Bucket: env.AWS_S3_BUCKET,
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

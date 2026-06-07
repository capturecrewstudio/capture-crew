/**
 * One-time migration: update ProjectImage.imageUrl to point to the best
 * available high-res WebP variant instead of the 720px thumbnail.
 *
 * Context: existing records have imageUrl === webpUrl (both 720px WebP).
 * The media table holds variants at 720 and 1280px WebP (older pipeline),
 * or 720 and 1600px WebP (newer pipeline), with no original stored.
 *
 * Strategy:
 *  1. Build a map: 720px URL → largest available WebP URL from Media.variants.
 *  2. For each ProjectImage where imageUrl === webpUrl (720px), update imageUrl
 *     to the largest variant. webpUrl stays as the 720px thumbnail.
 *
 * Run with:
 *   cd /Users/truxo/Documents/caputre-crew
 *   npx tsx prisma/migrate-image-urls.ts
 */

import { config } from 'dotenv';
import { resolve } from 'path';
config({ path: resolve(import.meta.dirname, '../server/.env') });
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Variant = { url: string; format: string; width: number };

function pickBestWebP(variants: Variant[]): string | null {
  const webps = variants.filter(v => v.format === 'webp');
  if (webps.length === 0) return null;
  return webps.sort((a, b) => b.width - a.width)[0].url;
}

function pickThumbWebP(variants: Variant[]): string | null {
  return variants.find(v => v.format === 'webp' && v.width === 720)?.url ?? null;
}

async function main() {
  // 1. Load all media records and build thumb → best map
  const allMedia = await prisma.media.findMany();
  console.log(`Found ${allMedia.length} media records.`);

  const thumbToBest = new Map<string, string>();
  for (const m of allMedia) {
    const variants = m.variants as Variant[] | null;
    if (!Array.isArray(variants)) continue;

    const thumbUrl = pickThumbWebP(variants);
    const bestUrl = pickBestWebP(variants);
    if (thumbUrl && bestUrl && bestUrl !== thumbUrl) {
      thumbToBest.set(thumbUrl, bestUrl);
    }
  }
  console.log(`Built upgrade map for ${thumbToBest.size} media items.`);

  // 2. Load all project images
  const images = await prisma.projectImage.findMany();
  console.log(`Found ${images.length} project images to check.`);

  let updated = 0;
  let skipped = 0;
  let alreadyGood = 0;

  for (const img of images) {
    // Already points somewhere other than the 720px thumb — skip
    if (img.imageUrl !== img.webpUrl) {
      alreadyGood++;
      continue;
    }

    const bestUrl = thumbToBest.get(img.imageUrl);
    if (!bestUrl) {
      skipped++;
      continue;
    }

    await prisma.projectImage.update({
      where: { id: img.id },
      data: { imageUrl: bestUrl },
    });
    console.log(`  ✓ ${img.id.slice(0, 8)} → ${bestUrl.split('/').pop()}`);
    updated++;
  }

  console.log(`\nDone. Updated: ${updated}, Already correct: ${alreadyGood}, No match: ${skipped}`);
}

main()
  .catch(err => { console.error(err); process.exit(1); })
  .finally(() => prisma.$disconnect());

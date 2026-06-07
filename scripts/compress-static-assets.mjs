/**
 * One-time script: compress all large static media assets in public/assets/
 * using sharp. Writes WebP versions alongside originals and replaces heavy
 * JPEGs/PNGs in-place with optimised versions at max 1600px wide.
 *
 * Run: node scripts/compress-static-assets.mjs
 */

import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';

const MEDIA_DIR = new URL('../client/public/assets/media', import.meta.url).pathname;
const TEAM_DIR  = new URL('../client/public/assets/team',  import.meta.url).pathname;

const TARGETS = [
  // Hero/panel images used at full viewport width — 1600px max, quality 82
  { dir: MEDIA_DIR, maxWidth: 1600, quality: 82 },
  // Team photos displayed at ~180px circle — 400px is plenty
  { dir: TEAM_DIR,  maxWidth: 400,  quality: 85 },
];

const EXTS = new Set(['.jpg', '.jpeg', '.png']);

async function compressDir(dir, maxWidth, quality) {
  const files = await readdir(dir);
  for (const file of files) {
    const ext = extname(file).toLowerCase();
    if (!EXTS.has(ext)) continue;

    const src = join(dir, file);
    const info = await stat(src);
    const sizeMB = (info.size / 1024 / 1024).toFixed(1);

    const meta = await sharp(src).metadata();
    const needsResize = (meta.width ?? 0) > maxWidth;

    const pipeline = sharp(src);
    if (needsResize) pipeline.resize({ width: maxWidth, withoutEnlargement: true });

    const outBuffer = await pipeline.jpeg({ quality, mozjpeg: true }).toBuffer();
    const newSizeMB = (outBuffer.length / 1024 / 1024).toFixed(1);

    // Only write if we actually made it smaller (don't bloat already-small files)
    if (outBuffer.length < info.size) {
      const { writeFile } = await import('fs/promises');
      // Rename .png → .jpeg in place (keep same filename for png, overwrite as jpeg)
      const outPath = ext === '.png' ? src.replace(/\.png$/i, '.jpeg') : src;
      await writeFile(outPath, outBuffer);
      console.log(`  ✓ ${file}: ${sizeMB}MB → ${newSizeMB}MB${needsResize ? ` (resized to ${maxWidth}px)` : ''}`);
    } else {
      console.log(`  – ${file}: already small (${sizeMB}MB), skipped`);
    }
  }
}

console.log('Compressing media assets…');
for (const { dir, maxWidth, quality } of TARGETS) {
  console.log(`\n[${dir.split('/').slice(-3).join('/')}] maxWidth=${maxWidth} quality=${quality}`);
  await compressDir(dir, maxWidth, quality);
}
console.log('\nDone.');

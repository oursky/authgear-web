#!/usr/bin/env node
/**
 * Deduplicate zh-Hant content images: update index.md refs to match en WebP
 * assets, remove local rasters, symlink to ../../en/{slug}/{file}.webp
 *
 * Usage: node scripts/symlink-zh-hant-images.mjs [--dry-run]
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT = path.join(path.resolve(__dirname, '..'), 'src', 'content');

const COLLECTIONS = ['blog-posts', 'login-gallery', 'customer-stories'];
const RASTER_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif']);

const dryRun = process.argv.includes('--dry-run');

async function updateZhIndexMd(zhMdPath, enEntryDir) {
  const enFiles = await fs.readdir(enEntryDir);
  const enImages = enFiles.filter((f) => RASTER_EXT.has(path.extname(f).toLowerCase()));
  if (enImages.length === 0) return 0;

  let text = await fs.readFile(zhMdPath, 'utf8');
  let updates = 0;

  for (const enFile of enImages) {
    const base = path.basename(enFile, path.extname(enFile));
    const oldPattern = new RegExp(
      `(\\.\\/|\\./)${base.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\.(png|jpe?g|webp)`,
      'gi',
    );
    const newRef = `./${base}.webp`;
    const next = text.replace(oldPattern, newRef);
    if (next !== text) {
      text = next;
      updates++;
    }
  }

  if (updates > 0 && !dryRun) {
    await fs.writeFile(zhMdPath, text);
  }
  return updates;
}

async function symlinkZhHant(collectionName) {
  const base = path.join(CONTENT, collectionName);
  const enDir = path.join(base, 'en');
  const zhDir = path.join(base, 'zh-Hant');

  let linked = 0;
  let mdUpdates = 0;
  let skipped = 0;

  const zhEntries = await fs.readdir(zhDir, { withFileTypes: true });
  for (const ent of zhEntries) {
    if (!ent.isDirectory()) continue;
    const slug = ent.name;
    const enEntry = path.join(enDir, slug);
    const zhEntry = path.join(zhDir, slug);

    try {
      await fs.access(enEntry);
    } catch {
      continue;
    }

    const zhMd = path.join(zhEntry, 'index.md');
    try {
      mdUpdates += await updateZhIndexMd(zhMd, enEntry);
    } catch {
      /* no index.md */
    }

    const enFiles = await fs.readdir(enEntry);
    const enImages = enFiles.filter((f) => {
      const ext = path.extname(f).toLowerCase();
      return RASTER_EXT.has(ext);
    });

    const zhFiles = await fs.readdir(zhEntry);
    for (const file of zhFiles) {
      const ext = path.extname(file).toLowerCase();
      if (!RASTER_EXT.has(ext)) continue;

      const zhPath = path.join(zhEntry, file);
      const stat = await fs.lstat(zhPath);
      if (stat.isSymbolicLink()) {
        if (!dryRun) await fs.unlink(zhPath);
      } else if (stat.isFile()) {
        if (!dryRun) await fs.unlink(zhPath);
      }
    }

    for (const enFile of enImages) {
      const zhPath = path.join(zhEntry, enFile);
      const relTarget = path.join('..', '..', 'en', slug, enFile);

      if (dryRun) {
        console.log(`  would link: ${zhPath} -> ${relTarget}`);
      } else {
        try {
          await fs.symlink(relTarget, zhPath);
        } catch (err) {
          if (err.code !== 'EEXIST') throw err;
        }
      }
      linked++;
    }
  }

  return { linked, mdUpdates, skipped };
}

async function main() {
  let totalLinked = 0;
  let totalMd = 0;
  for (const name of COLLECTIONS) {
    console.log(`\n=== ${name} ===`);
    const { linked, mdUpdates, skipped } = await symlinkZhHant(name);
    console.log(
      `  symlinks: ${linked}, md ref updates: ${mdUpdates}, skipped: ${skipped}` +
        (dryRun ? ' [dry-run]' : ''),
    );
    totalLinked += linked;
    totalMd += mdUpdates;
  }
  console.log(`\nTotal symlinks: ${totalLinked}, md updates: ${totalMd}${dryRun ? ' [dry-run]' : ''}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

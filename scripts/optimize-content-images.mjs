#!/usr/bin/env node
/**
 * Resize and convert content-collection images to WebP (en locale only).
 * Usage:
 *   node scripts/optimize-content-images.mjs [--dry-run] [--collection NAME]
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CONTENT = path.join(ROOT, 'src', 'content');
const MANIFEST_PATH = path.join(__dirname, 'output', 'image-optimize-manifest.json');

const RASTER_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp']);
const SKIP_EXT = new Set(['.svg', '.gif']);
const SKIP_SIZE_BYTES = 150 * 1024;

const COLLECTIONS = {
  'blog-posts': {
    locales: ['en'],
    maxWidth(fileName) {
      if (/^cover/i.test(fileName)) return 1280;
      if (/^figure/i.test(fileName)) return 1600;
      return 1600;
    },
  },
  'login-gallery': {
    locales: ['en'],
    maxWidth: () => 1280,
  },
  'customer-stories': {
    locales: ['en'],
    maxWidth(fileName) {
      if (/logo/i.test(fileName)) return 400;
      if (/thumbnail/i.test(fileName)) return 800;
      if (/cover/i.test(fileName)) return 1280;
      return 1280;
    },
  },
  'whats-new': {
    locales: ['en'],
    maxWidth(fileName) {
      if (/cover/i.test(fileName)) return 1280;
      return 1280;
    },
  },
};

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const collectionArg = args.find((a) => a.startsWith('--collection='))?.split('=')[1]
  ?? (args.includes('--collection') ? args[args.indexOf('--collection') + 1] : null);

const selectedCollections = collectionArg
  ? [collectionArg]
  : Object.keys(COLLECTIONS);

function webpName(filePath) {
  const base = path.basename(filePath, path.extname(filePath));
  return `${base}.webp`;
}

function replaceExtInRef(ref, oldBase, newBase) {
  const escaped = oldBase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return ref.replace(
    new RegExp(`(\\.\\/|\\./)?${escaped}\\.(png|jpe?g|webp)`, 'gi'),
    `./${newBase}.webp`,
  );
}

async function updateIndexMd(mdPath, renames) {
  if (renames.length === 0) return;
  let text = await fs.readFile(mdPath, 'utf8');
  for (const { oldBase, newBase } of renames) {
    text = replaceExtInRef(text, oldBase, newBase);
  }
  if (!dryRun) await fs.writeFile(mdPath, text);
}

async function hasAlpha(imagePath) {
  const meta = await sharp(imagePath).metadata();
  return meta.hasAlpha === true;
}

async function shouldSkip(filePath, maxWidth) {
  const ext = path.extname(filePath).toLowerCase();
  if (!RASTER_EXT.has(ext)) return true;

  const stat = await fs.stat(filePath);
  if (ext === '.webp' && stat.size < SKIP_SIZE_BYTES) {
    const meta = await sharp(filePath).metadata();
    const w = meta.width ?? 0;
    if (w <= maxWidth) return true;
  }
  return false;
}

async function optimizeImage(filePath, maxWidth) {
  const ext = path.extname(filePath).toLowerCase();
  const beforeBytes = (await fs.stat(filePath)).size;
  const meta = await sharp(filePath).metadata();
  const width = meta.width ?? 0;
  const isPng = ext === '.png';
  const alpha = isPng ? await hasAlpha(filePath) : false;
  const isScreenshot = isPng && !alpha;
  const quality = isScreenshot ? 85 : 82;

  const outPath = path.join(path.dirname(filePath), webpName(filePath));
  const samePath = path.resolve(filePath) === path.resolve(outPath);
  const tmpPath = samePath ? `${outPath}.opt-tmp` : outPath;

  if (dryRun) {
    return {
      action: 'optimize',
      from: filePath,
      to: outPath,
      beforeBytes,
      afterBytes: Math.round(beforeBytes * 0.35),
      width,
      maxWidth,
      skipped: false,
    };
  }

  let pipeline = sharp(filePath);
  if (width > maxWidth) {
    pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
  }

  if (alpha) {
    await pipeline.webp({ quality, alphaQuality: 90, effort: 4 }).toFile(tmpPath);
  } else {
    await pipeline.webp({ quality, effort: 4 }).toFile(tmpPath);
  }

  if (samePath) {
    await fs.rename(tmpPath, outPath);
  } else {
    await fs.unlink(filePath);
  }

  const afterBytes = (await fs.stat(outPath)).size;

  return {
    action: 'optimize',
    from: filePath,
    to: outPath,
    beforeBytes,
    afterBytes,
    width,
    maxWidth,
    skipped: false,
  };
}

async function processEntryDir(entryDir, collectionName) {
  const mdPath = path.join(entryDir, 'index.md');
  let mdExists = false;
  try {
    await fs.access(mdPath);
    mdExists = true;
  } catch {
    return [];
  }

  const cfg = COLLECTIONS[collectionName];
  const files = await fs.readdir(entryDir);
  const results = [];
  const renames = [];

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (SKIP_EXT.has(ext) || file === 'index.md') continue;
    if (!RASTER_EXT.has(ext)) continue;

    const filePath = path.join(entryDir, file);
    const stat = await fs.stat(filePath);
    if (!stat.isFile()) continue;

    const maxWidth = cfg.maxWidth(file);
    if (await shouldSkip(filePath, maxWidth)) {
      results.push({
        action: 'skip',
        path: filePath,
        beforeBytes: stat.size,
        afterBytes: stat.size,
        skipped: true,
      });
      continue;
    }

    const oldBase = path.basename(file, ext);
    const result = await optimizeImage(filePath, maxWidth);
    results.push(result);

    if (oldBase !== path.basename(result.to, '.webp')) {
      renames.push({ oldBase, newBase: path.basename(result.to, '.webp') });
    } else if (ext !== '.webp') {
      renames.push({ oldBase, newBase: oldBase });
    }
  }

  if (mdExists && renames.length > 0) {
    await updateIndexMd(mdPath, renames);
  }

  return results;
}

async function walkCollection(collectionName) {
  const cfg = COLLECTIONS[collectionName];
  const base = path.join(CONTENT, collectionName);
  const allResults = [];

  for (const locale of cfg.locales) {
    const localeDir = path.join(base, locale);
    let entries;
    try {
      entries = await fs.readdir(localeDir, { withFileTypes: true });
    } catch {
      console.warn(`  skip: no ${localeDir}`);
      continue;
    }

    for (const ent of entries) {
      if (!ent.isDirectory()) continue;
      const entryDir = path.join(localeDir, ent.name);
      const results = await processEntryDir(entryDir, collectionName);
      allResults.push(...results);
    }
  }

  return allResults;
}

async function main() {
  await fs.mkdir(path.dirname(MANIFEST_PATH), { recursive: true });

  const manifest = {
    dryRun,
    generatedAt: new Date().toISOString(),
    collections: {},
    summary: { beforeBytes: 0, afterBytes: 0, optimized: 0, skipped: 0 },
  };

  for (const name of selectedCollections) {
    if (!COLLECTIONS[name]) {
      console.error(`Unknown collection: ${name}`);
      process.exit(1);
    }
    console.log(`\n=== ${name} ===`);
    const results = await walkCollection(name);
    manifest.collections[name] = results;

    let before = 0;
    let after = 0;
    let optimized = 0;
    let skipped = 0;
    for (const r of results) {
      before += r.beforeBytes ?? 0;
      after += r.afterBytes ?? r.beforeBytes ?? 0;
      if (r.skipped) skipped++;
      else if (r.action === 'optimize') optimized++;
    }
    manifest.summary.beforeBytes += before;
    manifest.summary.afterBytes += after;
    manifest.summary.optimized += optimized;
    manifest.summary.skipped += skipped;

    console.log(
      `  optimized: ${optimized}, skipped: ${skipped}, ` +
        `${(before / 1048576).toFixed(1)} MB → ${(after / 1048576).toFixed(1)} MB`,
    );
  }

  if (!dryRun) {
    await fs.writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
    console.log(`\nManifest: ${MANIFEST_PATH}`);
  }

  const s = manifest.summary;
  console.log(
    `\nTotal: ${(s.beforeBytes / 1048576).toFixed(1)} MB → ${(s.afterBytes / 1048576).toFixed(1)} MB ` +
      `(${s.optimized} optimized, ${s.skipped} skipped)${dryRun ? ' [dry-run]' : ''}`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

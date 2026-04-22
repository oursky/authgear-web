#!/usr/bin/env node
// Convert Webflow CMS Integrations → Astro content collections (markdown + JSON).
// Reads /tmp/webflow-export-integrations/bundle.json.
// Writes:
//   src/content/integrations/{en,zh-TW}/{slug}/index.md + icon.<ext>
//   src/content/integration-categories/{slug}.json

import { promises as fs } from 'node:fs';
import fssync from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', 'src', 'content');
const INT_ROOT = path.join(ROOT, 'integrations');
const CAT_ROOT = path.join(ROOT, 'integration-categories');
const BUNDLE = '/tmp/webflow-export-integrations/bundle.json';

function loadBundle() {
  const raw = fssync.readFileSync(BUNDLE, 'utf8');
  const arr = JSON.parse(raw);
  const text = arr.map((x) => x.text).join('');
  const parts = JSON.parse('[' + text.replace(/}\{/g, '},{') + ']');
  const by = {};
  for (const p of parts) by[p.label] = p.result;
  return by;
}

function extFromUrl(u, fallback = 'png') {
  try {
    const m = new URL(u).pathname.match(/\.([a-zA-Z0-9]{2,5})$/);
    if (m) return m[1].toLowerCase();
  } catch {}
  return fallback;
}

async function tryDownload(url, destPath) {
  const res = await fetch(url);
  if (!res.ok) { console.warn(`  warn: ${url} -> ${res.status}`); return false; }
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.mkdir(path.dirname(destPath), { recursive: true });
  await fs.writeFile(destPath, buf);
  return true;
}

function yamlEscape(s) {
  if (s == null) return '""';
  const str = String(s);
  if (/^[\w\-./:]+$/.test(str) && !/^(true|false|null|yes|no)$/i.test(str) && str !== '') return str;
  return `"${str.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

async function processItem(item, categoryMap, localeFolder) {
  const f = item.fieldData;
  const slug = f.slug?.trim();
  if (!slug) return null;

  const outDir = path.join(INT_ROOT, localeFolder, slug);
  await fs.mkdir(outDir, { recursive: true });

  const iconUrl = f['integration-icon']?.url;
  if (!iconUrl) { console.warn(`[${slug}/${localeFolder}] no icon; skipping`); return null; }
  const ext = extFromUrl(iconUrl, 'png');
  const ok = await tryDownload(iconUrl, path.join(outDir, `icon.${ext}`));
  if (!ok) return null;

  const L = ['---'];
  L.push(`name: ${yamlEscape(f.name)}`);
  L.push(`excerpt: ${yamlEscape(f['integration-about-excerpt'] ?? '')}`);
  L.push(`icon: ./icon.${ext}`);
  L.push(`website: ${yamlEscape(f['integration-link'] ?? '')}`);
  const categorySlug = categoryMap.get(f['integration-category']);
  if (categorySlug) L.push(`category: ${yamlEscape(categorySlug)}`);
  L.push(`publishedAt: ${item.createdOn ?? item.lastPublished}`);
  L.push('---');

  await fs.writeFile(path.join(outDir, 'index.md'), L.join('\n') + '\n');
  console.log(`wrote ${localeFolder}/${slug}/index.md`);
  return slug;
}

async function writeCategories(categories) {
  await fs.mkdir(CAT_ROOT, { recursive: true });
  for (const c of categories) {
    if (c.isDraft || c.isArchived) continue;
    const { name, slug } = c.fieldData;
    // Source has typo: "communcation" slug. Normalise → "communication".
    const normSlug = slug === 'communcation' ? 'communication' : slug;
    await fs.writeFile(
      path.join(CAT_ROOT, `${normSlug}.json`),
      JSON.stringify({ name, slug: normSlug }, null, 2) + '\n',
    );
  }
}

async function main() {
  const bundle = loadBundle();
  const categories = bundle['categories']?.items ?? [];
  // Map: webflow id → normalised slug.
  const categoryMap = new Map();
  for (const c of categories) {
    const raw = c.fieldData.slug;
    const norm = raw === 'communcation' ? 'communication' : raw;
    categoryMap.set(c.id, norm);
  }

  await fs.rm(INT_ROOT, { recursive: true, force: true });
  await fs.rm(CAT_ROOT, { recursive: true, force: true });

  await writeCategories(categories);

  for (const locale of [
    { bundleKey: 'en-items', folder: 'en' },
    { bundleKey: 'zh-items', folder: 'zh-TW' },
  ]) {
    const items = bundle[locale.bundleKey]?.items ?? [];
    console.log(`\n${locale.folder}: ${items.length} items`);
    for (const item of items) await processItem(item, categoryMap, locale.folder);
  }

  console.log('\ndone.');
}

main().catch((err) => { console.error(err); process.exit(1); });

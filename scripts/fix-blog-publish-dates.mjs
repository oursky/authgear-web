#!/usr/bin/env node
// One-shot repair: the initial migration set `publishedAt` from Webflow's
// `lastPublished` field, but many posts share identical `lastPublished`
// timestamps (bulk republish), which makes the blog listing order unstable
// and does not match the live Webflow /blog page.
//
// The correct "first published" timestamp per post is `createdOn` (unique).
// This script rewrites each post's frontmatter `publishedAt` to the
// `createdOn` from the original Webflow bundle dump, preserving
// `updatedAt` (which stays as `lastUpdated`).

import { promises as fs } from 'node:fs';
import fssync from 'node:fs';
import path from 'node:path';

const FRONTEND_ASTRO_ROOT = path.resolve(import.meta.dirname, '..');
const POSTS_ROOT = path.join(FRONTEND_ASTRO_ROOT, 'src', 'content', 'blog-posts');
const BUNDLE_DIR = '/tmp/webflow-export-blog';

function loadBatch(file) {
  const raw = fssync.readFileSync(file, 'utf8');
  const arr = JSON.parse(raw);
  const text = arr.map((x) => x.text).join('');
  return JSON.parse('[' + text.replace(/}\{/g, '},{') + ']');
}

// Build slug → createdOn map per locale.
function buildCreatedMap() {
  const map = { en: new Map(), 'zh-TW': new Map() };
  const files = fssync.readdirSync(BUNDLE_DIR).filter((f) => f.endsWith('.json')).sort();
  for (const f of files) {
    const parts = loadBatch(path.join(BUNDLE_DIR, f));
    for (const p of parts) {
      if (p.label === 'schema' || p.label === 'categories') continue;
      const items = p.result?.items ?? [];
      const locale = p.label.startsWith('zh') ? 'zh-TW' : 'en';
      for (const it of items) {
        const slug = it.fieldData?.slug;
        if (slug && it.createdOn) map[locale].set(slug, it.createdOn);
      }
    }
  }
  return map;
}

function updateFrontmatter(src, createdOn) {
  // Replace the `publishedAt: …` line in the frontmatter only.
  const m = src.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return src;
  const fm = m[1];
  const newFm = fm.replace(/^publishedAt:\s*.*$/m, `publishedAt: ${createdOn}`);
  return src.replace(fm, newFm);
}

async function walkLocale(locale) {
  const root = path.join(POSTS_ROOT, locale);
  const entries = await fs.readdir(root, { withFileTypes: true });
  const out = [];
  for (const e of entries) {
    if (!e.isDirectory()) continue;
    out.push({ slug: e.name, file: path.join(root, e.name, 'index.md') });
  }
  return out;
}

const map = buildCreatedMap();
let total = 0;
let updated = 0;
for (const locale of ['en', 'zh-TW']) {
  const posts = await walkLocale(locale);
  for (const { slug, file } of posts) {
    total += 1;
    const createdOn = map[locale].get(slug);
    if (!createdOn) {
      console.warn(`[${locale}/${slug}] no createdOn in bundle; leaving publishedAt as-is`);
      continue;
    }
    const before = await fs.readFile(file, 'utf8');
    const after = updateFrontmatter(before, createdOn);
    if (after !== before) {
      await fs.writeFile(file, after);
      updated += 1;
    }
  }
}
console.log(`updated publishedAt on ${updated} / ${total} posts`);

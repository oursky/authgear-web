#!/usr/bin/env node
// One-shot repair: some posts still contain `https://www.authgear.com/{path}`
// in link hrefs (mostly inside raw-HTML <a href='...'> tags that slipped past
// the migration script's double-quote-only rewriter). Strip the origin in place.

import { promises as fs } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..', 'src', 'content', 'blog-posts');
const RE = /(https?:\/\/(?:www\.)?authgear\.com)(?=\/|")/gi;

async function walk(dir) {
  const out = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (entry.name === 'index.md') out.push(full);
  }
  return out;
}

const files = await walk(ROOT);
let changed = 0;
for (const file of files) {
  const before = await fs.readFile(file, 'utf8');
  const after = before.replace(RE, '');
  if (after !== before) {
    await fs.writeFile(file, after);
    changed += 1;
  }
}
console.log(`stripped absolute self-domain links in ${changed} / ${files.length} files`);

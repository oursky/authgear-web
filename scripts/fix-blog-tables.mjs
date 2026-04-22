#!/usr/bin/env node
// One-shot repair: the initial blog migration emitted tables with an
// unterminated `<div class='ag-table-wrap'>` (the outer Webflow
// `<div data-rt-embed-type>` wrapper swallowed the closing </div> due to
// a lazy regex match) AND duplicated an inline <style> block in every post.
//
// This script:
//   1. Strips every inline <style>…</style> block from index.md bodies
//      (the .ag-table-wrap / .ag-table styles now live in global.css).
//   2. Appends a missing </div> after each <table class='ag-table'></table>
//      sequence that follows an unterminated <div class='ag-table-wrap'>.

import { promises as fs } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..', 'src', 'content', 'blog-posts');

async function walk(dir) {
  const out = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (entry.name === 'index.md') out.push(full);
  }
  return out;
}

function fix(src) {
  let s = src;

  // 1) Strip inline <style>…</style> blocks (may span newlines).
  s = s.replace(/<style[^>]*>[\s\S]*?<\/style>\s*/g, '');

  // 2) For every `<div class='ag-table-wrap'>…<table …>…</table>` that is not
  //    followed by a `</div>` before the next blank line / heading / next
  //    `<div` or EOF, append `</div>`.
  s = s.replace(
    /(<div\s+class=['"]ag-table-wrap['"][^>]*>\s*<table[\s\S]*?<\/table>)(?!\s*<\/div>)/g,
    '$1</div>',
  );

  // 3) Collapse runs of 3+ blank lines left behind by the <style> removal.
  s = s.replace(/\n{3,}/g, '\n\n');

  return s;
}

const files = await walk(ROOT);
let changed = 0;
for (const file of files) {
  const before = await fs.readFile(file, 'utf8');
  const after = fix(before);
  if (after !== before) {
    await fs.writeFile(file, after);
    changed += 1;
  }
}
console.log(`repaired ${changed} / ${files.length} files`);

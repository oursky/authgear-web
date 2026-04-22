#!/usr/bin/env node
// One-shot repair: the initial migration's code-block extraction regex required
// double-quoted class attributes. Posts with single-quoted `<code class='language-X'>`
// (some Webflow entries use single quotes) fell through as raw <pre><code> HTML
// that often had entities encoded (&lt; etc.) and — worse — the preceding step
// stripped their surrounding </code></pre> closing tags, so the opening <pre>
// swallows the rest of the document.
//
// Repairs by detecting raw inline `<pre><code class='language-X'>…</code></pre>`
// (and also unterminated variants) and rewriting them to proper fenced code blocks.

import { promises as fs } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..', 'src', 'content', 'blog-posts');

function decodeEntities(t) {
  return t
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&');
}

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

  // 1) Closed form: <pre><code class='language-X'>…</code></pre>  (single or double quotes)
  s = s.replace(
    /<pre[^>]*>\s*<code(?:\s+class=['"]language-([^'"]+)['"])?[^>]*>([\s\S]*?)<\/code>\s*<\/pre>/gi,
    (_, lang, body) => '```' + (lang ?? '') + '\n' + decodeEntities(body).trim() + '\n```',
  );

  // 2) Unterminated form: <pre><code class='...'>…  (no matching </code></pre>)
  //    Grab up to the next heading (## / ###) or EOF and treat that as the code block.
  s = s.replace(
    /<pre[^>]*>\s*<code(?:\s+class=['"]language-([^'"]+)['"])?[^>]*>([\s\S]*?)(?=\n\s*(?:##\s|###\s|<pre\b)|$)/g,
    (_, lang, body) => '```' + (lang ?? '') + '\n' + decodeEntities(body).trim() + '\n```\n',
  );

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

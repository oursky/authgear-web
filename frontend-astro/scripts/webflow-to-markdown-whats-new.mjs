#!/usr/bin/env node
// Convert Webflow CMS What's New (live data pulled via MCP) → Astro content collection.
// Reads /tmp/webflow-export-wn/bundle.json (MCP response with labels: schema, en-items, zh-items).
// Writes src/content/whats-new/{en,zh-TW}/{slug}/index.md + cover + inline figure images.

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FRONTEND_ASTRO_ROOT = path.resolve(__dirname, '..');
const CONTENT_ROOT = path.join(FRONTEND_ASTRO_ROOT, 'src', 'content', 'whats-new');
const BUNDLE_PATH = '/tmp/webflow-export-wn/bundle.json';

async function readMcpBundle(file) {
  const raw = await fs.readFile(file, 'utf8');
  const arr = JSON.parse(raw);
  const text = arr.map((x) => x.text).join('');
  const parts = JSON.parse('[' + text.replace(/}\{/g, '},{') + ']');
  const byLabel = {};
  for (const p of parts) byLabel[p.label] = p.result;
  return byLabel;
}

function extFromUrl(u, fallback = 'jpg') {
  try {
    const { pathname } = new URL(u);
    const m = pathname.match(/\.([a-zA-Z0-9]{2,5})$/);
    if (m) return m[1].toLowerCase();
  } catch {}
  return fallback;
}

async function tryDownload(url, destPath) {
  const res = await fetch(url);
  if (!res.ok) {
    console.warn(`  warn: ${url} -> ${res.status}`);
    return false;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.mkdir(path.dirname(destPath), { recursive: true });
  await fs.writeFile(destPath, buf);
  return true;
}

function yamlEscape(s) {
  if (s == null) return '""';
  const str = String(s);
  if (/^[\w\-./:]+$/.test(str) && !/^(true|false|null|yes|no)$/i.test(str)) return str;
  return `"${str.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

/**
 * Webflow RichText HTML → Markdown.
 * Extended from the customer-stories/login-gallery converter to also unpack `<figure>` blocks
 * that wrap inline images. Figure images are queued into `imageTasks` (for later download)
 * and rewritten to local relative paths like `./figure-1.jpg`.
 */
function htmlToMarkdown(html, imageTasks) {
  if (!html) return '';
  let s = html;
  s = s.replace(/\s+id=""/g, '');
  s = s.replace(/‍/g, '');
  // Move trailing <br> out of <strong>/<em>/<b>/<i>.
  s = s.replace(/<(strong|b|em|i)>([^<]*?)<br\s*\/?>\s*<\/\1>/gi, '<$1>$2</$1><br>');

  // Replace <figure>…<img src>…</figure> with a placeholder <p>![alt](local)</p>
  // so the main block matcher below handles it uniformly.
  let figIdx = 0;
  s = s.replace(
    /<figure\b[\s\S]*?<img[^>]*src="([^"]+)"[^>]*>[\s\S]*?<\/figure>/gi,
    (_, url) => {
      figIdx += 1;
      const ext = extFromUrl(url, 'jpg');
      const rel = `./figure-${figIdx}.${ext}`;
      imageTasks.push({ url, rel });
      return `<p>![](${rel})</p>`;
    },
  );

  const decode = (t) => t
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&rsquo;/g, '’')
    .replace(/&lsquo;/g, '‘')
    .replace(/&rdquo;/g, '”')
    .replace(/&ldquo;/g, '“')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&hellip;/g, '…');

  const inline = (t) => {
    let x = decode(t);
    x = x.replace(/<br\s*\/?>/gi, '  \n');
    x = x.replace(/<strong>([\s\S]*?)<\/strong>/gi, (_, inner) => `**${inner.trim()}**`);
    x = x.replace(/<b>([\s\S]*?)<\/b>/gi, (_, inner) => `**${inner.trim()}**`);
    x = x.replace(/<em>([\s\S]*?)<\/em>/gi, (_, inner) => `*${inner.trim()}*`);
    x = x.replace(/<i>([\s\S]*?)<\/i>/gi, (_, inner) => `*${inner.trim()}*`);
    x = x.replace(/<a\s+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, (_, href, inner) => `[${inner.trim()}](${href})`);
    x = x.replace(/<code>([\s\S]*?)<\/code>/gi, (_, inner) => '`' + inner + '`');
    return x;
  };

  const out = [];
  const blockRe = /<(p|h[1-6]|ul|ol|blockquote)(?:\s[^>]*)?>([\s\S]*?)<\/\1>/gi;
  let m;
  while ((m = blockRe.exec(s))) {
    const tag = m[1].toLowerCase();
    const body = m[2];
    if (tag === 'p') {
      const text = inline(body).trim();
      if (text) out.push(text);
    } else if (/^h[1-6]$/.test(tag)) {
      // Page title is h1; body h1/h2/h3 start at h2.
      let level = parseInt(tag.slice(1), 10);
      if (level === 1) level = 2;
      const text = inline(body).trim();
      if (text) out.push(`${'#'.repeat(level)} ${text}`);
    } else if (tag === 'ul' || tag === 'ol') {
      const ordered = tag === 'ol';
      const liRe = /<li(?:\s[^>]*)?>([\s\S]*?)<\/li>/gi;
      const lines = [];
      let lm;
      while ((lm = liRe.exec(body))) {
        lines.push((ordered ? '1. ' : '- ') + inline(lm[1]).trim().replace(/\n/g, ' '));
      }
      if (lines.length) out.push(lines.join('\n'));
    } else if (tag === 'blockquote') {
      const text = inline(body).trim();
      if (text) out.push(text.split('\n').map((l) => `> ${l}`).join('\n'));
    }
  }
  return out.join('\n\n');
}

async function processItem(item, localeFolder) {
  const f = item.fieldData;
  const slug = f.slug?.trim();
  if (!slug) return;
  const outDir = path.join(CONTENT_ROOT, localeFolder, slug);
  await fs.mkdir(outDir, { recursive: true });

  // Cover image
  let coverRel = null;
  const coverUrl = f['blog-post-featured-image']?.url;
  if (coverUrl) {
    const ext = extFromUrl(coverUrl, 'jpg');
    const ok = await tryDownload(coverUrl, path.join(outDir, `cover.${ext}`));
    coverRel = ok ? `./cover.${ext}` : null;
  }
  if (!coverRel) {
    console.warn(`[${slug}/${localeFolder}] no cover image; skipping`);
    return;
  }

  // Body + inline figure images
  const imageTasks = [];
  const body = htmlToMarkdown(f['blog-post-content'] ?? '', imageTasks);
  await Promise.all(imageTasks.map((t) => tryDownload(t.url, path.join(outDir, t.rel.replace(/^\.\//, '')))));

  const publishedAt = item.lastPublished ?? item.lastUpdated ?? item.createdOn;

  const L = ['---'];
  L.push(`title: ${yamlEscape(f.name)}`);
  L.push(`excerpt: ${yamlEscape(f['blog-post-excerpt'] ?? '')}`);
  L.push(`coverImage: ${coverRel}`);
  L.push(`publishedAt: ${publishedAt}`);
  if (f['canonical-tag']) L.push(`canonicalUrl: ${yamlEscape(f['canonical-tag'])}`);
  L.push(`draft: ${item.isDraft ? 'true' : 'false'}`);
  L.push('---');

  await fs.writeFile(path.join(outDir, 'index.md'), L.join('\n') + '\n\n' + body + '\n');
  console.log(`wrote ${localeFolder}/${slug}/index.md`);
}

async function main() {
  const bundle = await readMcpBundle(BUNDLE_PATH);

  await fs.rm(CONTENT_ROOT, { recursive: true, force: true });

  const en = bundle['en-items'].items;
  console.log(`en: ${en.length} items`);
  for (const item of en) await processItem(item, 'en');

  const zh = bundle['zh-items'].items;
  console.log(`\nzh-TW: ${zh.length} items`);
  for (const item of zh) await processItem(item, 'zh-TW');

  console.log('\ndone.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

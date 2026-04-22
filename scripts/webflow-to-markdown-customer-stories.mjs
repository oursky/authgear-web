#!/usr/bin/env node
// Convert Webflow CMS Customer Stories (live data pulled via MCP) → Astro content collection.
// Reads two JSON bundles the MCP tool produced:
//   /tmp/webflow-export/en-and-schema.json    (label 'schema' + 'items' — en items)
//   /tmp/webflow-export/refs-and-zh.json      ('login-methods' + 'technical-details' + 'zh-items')
// Downloads images from Webflow CDN URLs, writes src/content/customer-stories/{en,zh-TW}/{slug}/index.md.

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FRONTEND_ASTRO_ROOT = path.resolve(__dirname, '..');
const CONTENT_ROOT = path.join(FRONTEND_ASTRO_ROOT, 'src', 'content', 'customer-stories');
const EXPORT_DIR = '/tmp/webflow-export';

async function readMcpBundle(file) {
  const raw = await fs.readFile(file, 'utf8');
  const arr = JSON.parse(raw);
  const text = arr.map((x) => x.text).join('');
  // MCP returns concatenated JSON objects; split between them.
  const parts = JSON.parse('[' + text.replace(/}\{/g, '},{') + ']');
  const byLabel = {};
  for (const p of parts) byLabel[p.label] = p.result;
  return byLabel;
}

function extFromUrl(u, fallback = 'png') {
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
  if (s == null) return '';
  const str = String(s);
  if (/^[\w\-./]+$/.test(str) && !/^(true|false|null|yes|no)$/i.test(str)) return str;
  return `"${str.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

/**
 * Webflow RichText → Markdown.
 * Handles p/h2/h3/h4/ul/ol/li/strong/em/a/br, strips id="" attrs + zero-width joiners.
 * Block-level HTML that doesn't map cleanly is passed through (markdown allows inline HTML).
 */
function htmlToMarkdown(html) {
  if (!html) return '';
  let s = html;
  // Strip Webflow-injected empty id attrs and the stray ZWJ chars used for empty paragraphs.
  s = s.replace(/\s+id=""/g, '');
  s = s.replace(/‍/g, '');
  // Move trailing <br> out of <strong>/<em>/<b>/<i> so inline formatting + line break both survive.
  s = s.replace(/<(strong|b|em|i)>([^<]*?)<br\s*\/?>\s*<\/\1>/gi, '<$1>$2</$1><br>');
  // Decode a handful of common entities.
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

  // Inline conversions
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

  // Match block-level elements sequentially.
  const blockRe = /<(p|h[1-6]|ul|ol|blockquote)(?:\s[^>]*)?>([\s\S]*?)<\/\1>/gi;
  let m;
  while ((m = blockRe.exec(s))) {
    const tag = m[1].toLowerCase();
    const body = m[2];
    if (tag === 'p') {
      const text = inline(body).trim();
      if (text && text !== '') out.push(text);
    } else if (/^h[1-6]$/.test(tag)) {
      // Webflow already uses h1 for page title; demote h1→h2 in body.
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
        const text = inline(lm[1]).trim().replace(/\n/g, ' ');
        lines.push((ordered ? '1. ' : '- ') + text);
      }
      if (lines.length) out.push(lines.join('\n'));
    } else if (tag === 'blockquote') {
      const text = inline(body).trim();
      if (text) out.push(text.split('\n').map((l) => `> ${l}`).join('\n'));
    }
  }

  return out.join('\n\n');
}

function buildFrontmatter(e) {
  const L = ['---'];
  L.push(`title: ${yamlEscape(e.title)}`);
  L.push(`excerpt: ${yamlEscape(e.excerpt)}`);
  L.push(`customerName: ${yamlEscape(e.customerName)}`);
  if (e.industry) L.push(`companyIndustry: ${yamlEscape(e.industry)}`);
  if (e.location) L.push(`companyLocation: ${yamlEscape(e.location)}`);
  if (e.logoRel) L.push(`companyLogo: ${e.logoRel}`);
  L.push(`coverImage: ${e.coverRel}`);
  L.push(`thumbnail: ${e.thumbRel}`);
  if (e.loginMethods.length) {
    L.push('loginMethods:');
    for (const m of e.loginMethods) L.push(`  - ${yamlEscape(m)}`);
  } else {
    L.push('loginMethods: []');
  }
  if (e.technicalDetails.length) {
    L.push('technicalDetails:');
    for (const t of e.technicalDetails) L.push(`  - ${yamlEscape(t)}`);
  } else {
    L.push('technicalDetails: []');
  }
  if (e.metrics.length) {
    L.push('metrics:');
    for (const m of e.metrics) {
      // Always quote metric fields — schema expects strings and bare digits would parse as numbers.
      L.push(`  - num: ${JSON.stringify(String(m.num))}`);
      L.push(`    text: ${JSON.stringify(String(m.text))}`);
    }
  } else {
    L.push('metrics: []');
  }
  L.push(`publishedAt: ${e.publishedAt}`);
  if (e.canonical) L.push(`canonicalUrl: ${yamlEscape(e.canonical)}`);
  L.push('---');
  return L.join('\n');
}

async function processItem(item, refMaps, localeFolder) {
  const f = item.fieldData;
  const slug = f.slug;
  if (!slug || slug === 'testing') return; // skip placeholder rows
  const outDir = path.join(CONTENT_ROOT, localeFolder, slug);
  await fs.mkdir(outDir, { recursive: true });

  // Images
  const downloadField = async (imgField, baseName) => {
    if (!imgField?.url) return null;
    const ext = extFromUrl(imgField.url, 'png');
    const rel = `./${baseName}.${ext}`;
    const ok = await tryDownload(imgField.url, path.join(outDir, `${baseName}.${ext}`));
    return ok ? rel : null;
  };
  let [logoRel, coverRel, thumbRel] = await Promise.all([
    downloadField(f.logo, 'logo'),
    downloadField(f['featured-image'] ?? f['post-banner'], 'cover'),
    downloadField(f.thumbnail, 'thumbnail'),
  ]);
  // Cover + thumbnail are required (fall back between them). Logo is optional
  // — some stories (e.g. NDA-protected) intentionally have no logo.
  thumbRel = thumbRel ?? coverRel;
  coverRel = coverRel ?? thumbRel;
  if (!coverRel || !thumbRel) {
    console.warn(`[${slug}/${localeFolder}] no cover/thumbnail; skipping`);
    return;
  }

  // References
  const lm = (f['login-methods'] ?? []).map((id) => refMaps.login.get(id)).filter(Boolean);
  const td = (f['technical-details'] ?? []).map((id) => refMaps.tech.get(id)).filter(Boolean);

  // Metrics 1..3 (no "3" field defined in schema but handle defensively)
  const metrics = [];
  for (const n of [1, 2, 3]) {
    const num = f[`metric-${n}---num`];
    const text = f[`metric-${n}---text`];
    if ((num && String(num).trim()) || (text && String(text).trim())) {
      metrics.push({ num: String(num ?? ''), text: String(text ?? '') });
    }
  }

  // Rich text body
  const body = htmlToMarkdown(f.content ?? '');

  const frontmatter = buildFrontmatter({
    title: f.name,
    customerName: f['customer-name'],
    excerpt: f.excerpt,
    industry: f.industry,
    location: f.location,
    logoRel,
    coverRel,
    thumbRel,
    loginMethods: lm,
    technicalDetails: td,
    metrics,
    publishedAt: item.lastPublished ?? item.lastUpdated ?? item.createdOn,
    canonical: f['canonical-tag'],
  });

  await fs.writeFile(path.join(outDir, 'index.md'), frontmatter + '\n\n' + body + '\n');
  console.log(`wrote ${localeFolder}/${slug}/index.md`);
}

async function main() {
  const enBundle = await readMcpBundle(path.join(EXPORT_DIR, 'en-and-schema.json'));
  const refsBundle = await readMcpBundle(path.join(EXPORT_DIR, 'refs-and-zh.json'));

  const refMaps = {
    login: new Map(refsBundle['login-methods'].items.map((it) => [it.id, it.fieldData.name])),
    tech: new Map(refsBundle['technical-details'].items.map((it) => [it.id, it.fieldData.name])),
  };

  // Wipe existing generated content first.
  await fs.rm(CONTENT_ROOT, { recursive: true, force: true });

  const enItems = enBundle['items'].items;
  console.log(`en: ${enItems.length} items`);
  for (const item of enItems) await processItem(item, refMaps, 'en');

  const zhItems = refsBundle['zh-items'].items;
  console.log(`\nzh-TW: ${zhItems.length} items`);
  for (const item of zhItems) await processItem(item, refMaps, 'zh-TW');

  console.log('\ndone.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

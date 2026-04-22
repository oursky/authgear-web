#!/usr/bin/env node
// Convert Webflow CMS Login Galleries (live data pulled via MCP) → Astro content collection.
// Reads the MCP response dump at /tmp/webflow-export-lg/bundle.json which contains six labeled
// results: schema, en-items, zh-items, login-methods, technical-details, social-logins.
// Writes src/content/login-gallery/{en,zh-TW}/{slug}/index.md + local images.

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FRONTEND_ASTRO_ROOT = path.resolve(__dirname, '..');
const CONTENT_ROOT = path.join(FRONTEND_ASTRO_ROOT, 'src', 'content', 'login-gallery');
const BUNDLE_PATH = '/tmp/webflow-export-lg/bundle.json';

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
  if (/^[\w\-./]+$/.test(str) && !/^(true|false|null|yes|no)$/i.test(str)) return str;
  return `"${str.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

/** Webflow RichText HTML → Markdown. Same converter as customer-stories script. */
function htmlToMarkdown(html) {
  if (!html) return '';
  let s = html;
  s = s.replace(/\s+id=""/g, '');
  s = s.replace(/‍/g, '');
  s = s.replace(/<(strong|b|em|i)>([^<]*?)<br\s*\/?>\s*<\/\1>/gi, '<$1>$2</$1><br>');

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
      // Webflow uses h1 for body section headings; demote to h2 (h1 is the page title).
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

// Map Webflow field slug → local filename. Note: Webflow's display names differ from slugs
// (slug "mobile-image" is display "Web Image 1", etc.) — we store under cleaner names.
const WEB_SLIDE_FIELDS = ['mobile-image', 'phone-image', 'web-image-3', 'web-image-4'];
const MOBILE_SLIDE_FIELDS = ['mobile-image-1', 'mobile-image-2', 'mobile-image-3', 'mobile-image-4'];

async function processItem(item, refMaps, localeFolder) {
  const f = item.fieldData;
  const slug = f.slug?.trim();
  if (!slug) return;

  const outDir = path.join(CONTENT_ROOT, localeFolder, slug);
  await fs.mkdir(outDir, { recursive: true });

  const downloadField = async (fieldVal, baseName) => {
    const url = fieldVal?.url;
    if (!url) return null;
    const ext = extFromUrl(url, 'jpg');
    const filename = `${baseName}.${ext}`;
    const rel = `./${filename}`;
    const ok = await tryDownload(url, path.join(outDir, filename));
    return ok ? rel : null;
  };

  const mainRel = await downloadField(f['main-image'], 'main');
  const webSlidesRel = (await Promise.all(
    WEB_SLIDE_FIELDS.map((key, i) => downloadField(f[key], `web-${i + 1}`)),
  )).filter(Boolean);
  const mobileSlidesRel = (await Promise.all(
    MOBILE_SLIDE_FIELDS.map((key, i) => downloadField(f[key], `mobile-${i + 1}`)),
  )).filter(Boolean);

  // If there is no mainImage, fall back to the first available web slide or mobile slide.
  const resolvedMain = mainRel ?? webSlidesRel[0] ?? mobileSlidesRel[0];
  if (!resolvedMain) {
    console.warn(`[${slug}/${localeFolder}] no usable images; skipping`);
    return;
  }

  const loginMethods = (f['login-method'] ?? []).map((id) => refMaps.login.get(id)).filter(Boolean);
  const socialLogins = (f['social-login'] ?? []).map((id) => refMaps.social.get(id)).filter(Boolean);
  const technicalDetails = (f['technical-details'] ?? []).map((id) => refMaps.tech.get(id)).filter(Boolean);

  const body = htmlToMarkdown(f['post-body'] ?? '');

  // Frontmatter
  const L = ['---'];
  L.push(`title: ${yamlEscape(f.name)}`);
  L.push(`industry: ${yamlEscape(f.industry ?? '')}`);
  L.push(`mainImage: ${resolvedMain}`);
  if (webSlidesRel.length) {
    L.push('webSlides:');
    for (const r of webSlidesRel) L.push(`  - ${r}`);
  } else {
    L.push('webSlides: []');
  }
  if (mobileSlidesRel.length) {
    L.push('mobileSlides:');
    for (const r of mobileSlidesRel) L.push(`  - ${r}`);
  } else {
    L.push('mobileSlides: []');
  }
  if (loginMethods.length) {
    L.push('loginMethods:');
    for (const m of loginMethods) L.push(`  - ${yamlEscape(m)}`);
  } else {
    L.push('loginMethods: []');
  }
  if (socialLogins.length) {
    L.push('socialLogins:');
    for (const s of socialLogins) L.push(`  - ${yamlEscape(s)}`);
  } else {
    L.push('socialLogins: []');
  }
  if (technicalDetails.length) {
    L.push('technicalDetails:');
    for (const t of technicalDetails) L.push(`  - ${yamlEscape(t)}`);
  } else {
    L.push('technicalDetails: []');
  }
  L.push(`featured: ${f.featured ? 'true' : 'false'}`);
  L.push(`draft: ${item.isDraft ? 'true' : 'false'}`);
  L.push(`publishedAt: ${item.lastPublished ?? item.lastUpdated ?? item.createdOn}`);
  L.push('---');

  await fs.writeFile(path.join(outDir, 'index.md'), L.join('\n') + '\n\n' + body + '\n');
  console.log(`wrote ${localeFolder}/${slug}/index.md`);
}

async function main() {
  const bundle = await readMcpBundle(BUNDLE_PATH);
  const refMaps = {
    login: new Map(bundle['login-methods'].items.map((it) => [it.id, it.fieldData.name])),
    tech: new Map(bundle['technical-details'].items.map((it) => [it.id, it.fieldData.name])),
    social: new Map(bundle['social-logins'].items.map((it) => [it.id, it.fieldData.name])),
  };

  // Wipe existing generated content.
  await fs.rm(CONTENT_ROOT, { recursive: true, force: true });

  const en = bundle['en-items'].items;
  console.log(`en: ${en.length} items`);
  for (const item of en) await processItem(item, refMaps, 'en');

  const zh = bundle['zh-items'].items;
  console.log(`\nzh-TW: ${zh.length} items`);
  for (const item of zh) await processItem(item, refMaps, 'zh-TW');

  console.log('\ndone.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

#!/usr/bin/env node
// Convert Webflow CMS Blog Posts (live data pulled via MCP) → Astro content collection.
// Reads multiple MCP response bundles under /tmp/webflow-export-blog/:
//   batch-0.json, batch-30.json, batch-70.json, batch-110.json    (en, offset-paged + schema + categories)
//   batch-zh-0.json, batch-zh-40.json, batch-zh-80.json, batch-zh-120.json  (zh-Hant-TW)
// Writes src/content/blog-posts/{en,zh-TW}/{slug}/index.md + cover + figure-N.* images.
// Also writes src/content/blog-categories/{slug}.json and scripts audit files under /tmp/.

import { promises as fs } from 'node:fs';
import fssync from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FRONTEND_ASTRO_ROOT = path.resolve(__dirname, '..');
const POSTS_ROOT = path.join(FRONTEND_ASTRO_ROOT, 'src', 'content', 'blog-posts');
const CATEGORIES_ROOT = path.join(FRONTEND_ASTRO_ROOT, 'src', 'content', 'blog-categories');
const BUNDLE_DIR = '/tmp/webflow-export-blog';
const LINK_AUDIT_PATH = '/tmp/blog-link-audit.txt';
const SLUG_AUDIT_PATH = '/tmp/blog-slug-audit.txt';

function loadBatch(file) {
  const raw = fssync.readFileSync(file, 'utf8');
  const arr = JSON.parse(raw);
  const text = arr.map((x) => x.text).join('');
  return JSON.parse('[' + text.replace(/}\{/g, '},{') + ']');
}

function collectBundles() {
  const files = fssync.readdirSync(BUNDLE_DIR).filter((f) => f.endsWith('.json')).sort();
  const en = [];
  const zh = [];
  let categories = null;
  for (const f of files) {
    const parts = loadBatch(path.join(BUNDLE_DIR, f));
    for (const p of parts) {
      if (p.label === 'categories') categories = p.result.items;
      else if (p.label === 'schema') continue;
      else if (p.label.startsWith('en')) en.push(...p.result.items);
      else if (p.label.startsWith('zh')) zh.push(...p.result.items);
    }
  }
  return { en, zh, categories: categories ?? [] };
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
  if (/^[\w\-./:]+$/.test(str) && !/^(true|false|null|yes|no)$/i.test(str) && str !== '') return str;
  return `"${str.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

function decodeEntities(t) {
  return t
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
}

function normaliseHref(href) {
  // Strip absolute self-domain origins so internal links become site-relative.
  return href.replace(/^https?:\/\/(?:www\.)?authgear\.com/i, '');
}

/** Final sweep over the full markdown string: strip any remaining
 *  `https://www.authgear.com/...` origin that slipped through raw-HTML paths. */
function stripAbsoluteSelfDomainLinks(s) {
  return s.replace(/(https?:\/\/(?:www\.)?authgear\.com)(?=\/|")/gi, '');
}

/**
 * Webflow RichText HTML → Markdown (with preserved table/code-block HTML blocks).
 * - <figure><img src=X></figure>  → ![alt](./figure-N.ext), image queued for download
 * - <div data-rt-embed-type='true'> … <table>…</table> … </div>  → keep inline HTML verbatim
 * - <div data-rt-embed-type='true'> … <pre><code class="language-X">…</code></pre> … </div>  → fenced code block
 * - Standard h2..h6, p, ul, ol, li, blockquote, strong, em, a, code
 */
function htmlToMarkdown(html, imageTasks, linkRefs) {
  if (!html) return '';
  let s = html;
  s = s.replace(/\s+id=""/g, '');
  s = s.replace(/‍/g, '');
  s = s.replace(/<(strong|b|em|i)>([^<]*?)<br\s*\/?>\s*<\/\1>/gi, '<$1>$2</$1><br>');

  // 1) Figure blocks → markdown image placeholders
  let figIdx = 0;
  s = s.replace(
    /<figure\b[\s\S]*?<img[^>]*src="([^"]+)"[^>]*>[\s\S]*?<\/figure>/gi,
    (_, url) => {
      figIdx += 1;
      const ext = extFromUrl(url, 'jpg');
      const rel = `./figure-${figIdx}.${ext}`;
      imageTasks.push({ url, rel });
      return `\n\n<!--FIGURE-->![](${rel})<!--/FIGURE-->\n\n`;
    },
  );

  // 2) Preserved embed blocks. Webflow wraps these with balanced nested divs:
  //    <div data-rt-embed-type='true'><div class='ag-table-wrap'><table>…</table></div></div>
  //    — we extract the innermost <table>…</table> or <pre><code>…</code></pre>
  //    and emit a fresh wrapper so nested-div balancing never matters.
  const preserved = [];
  s = s.replace(
    /<div\s+data-rt-embed-type=['"]true['"][\s\S]*?(?:<\/div>\s*<\/div>|<\/div>)/gi,
    (match) => {
      const codeMatch = match.match(/<pre[^>]*>\s*<code(?:\s+class=['"]language-([^'"]+)['"])?[^>]*>([\s\S]*?)<\/code>\s*<\/pre>/i);
      if (codeMatch) {
        const lang = codeMatch[1] ?? '';
        const body = decodeEntities(codeMatch[2]);
        preserved.push('```' + lang + '\n' + body + '\n```');
        return `\n\n<!--PRESERVED-${preserved.length - 1}-->\n\n`;
      }
      const tableMatch = match.match(/<table\b[\s\S]*?<\/table>/i);
      if (tableMatch) {
        preserved.push(`<div class="ag-table-wrap">${tableMatch[0]}</div>`);
        return `\n\n<!--PRESERVED-${preserved.length - 1}-->\n\n`;
      }
      // Strip any inline <style> blocks — table CSS now lives globally.
      const cleaned = match
        .replace(/<style[\s\S]*?<\/style>/gi, '')
        .replace(/<div\s+data-rt-embed-type=['"]true['"][^>]*>/i, '')
        .replace(/<\/div>\s*(?:<\/div>\s*)?$/i, '')
        .trim();
      preserved.push(cleaned);
      return `\n\n<!--PRESERVED-${preserved.length - 1}-->\n\n`;
    },
  );
  // Also strip any bare <style>…</style> blocks that weren't wrapped.
  s = s.replace(/<style[\s\S]*?<\/style>\s*/gi, '');

  // 3) Inline conversions
  const inline = (t) => {
    let x = decodeEntities(t);
    x = x.replace(/<br\s*\/?>/gi, '  \n');
    x = x.replace(/<strong>([\s\S]*?)<\/strong>/gi, (_, inner) => `**${inner.trim()}**`);
    x = x.replace(/<b>([\s\S]*?)<\/b>/gi, (_, inner) => `**${inner.trim()}**`);
    x = x.replace(/<em>([\s\S]*?)<\/em>/gi, (_, inner) => `*${inner.trim()}*`);
    x = x.replace(/<i>([\s\S]*?)<\/i>/gi, (_, inner) => `*${inner.trim()}*`);
    // <a href> — rewrite self-domain to relative, preserve others verbatim.
    x = x.replace(
      /<a\s+([^>]*?)href="([^"]+)"([^>]*?)>([\s\S]*?)<\/a>/gi,
      (_, prefix, href, suffix, inner) => {
        const href2 = normaliseHref(href);
        linkRefs.push(href2);
        // If the anchor carries extra attrs (target="_blank", rel, etc.), keep raw HTML.
        const attrs = (prefix + suffix).trim();
        const hasOpts = /target=|rel=/i.test(attrs);
        if (hasOpts) {
          return `<a href="${href2}" ${attrs.replace(/^\s*|\s*$/g, '')}>${inner}</a>`;
        }
        return `[${inner}](${href2})`;
      },
    );
    x = x.replace(/<code>([\s\S]*?)<\/code>/gi, (_, inner) => '`' + decodeEntities(inner) + '`');
    return x;
  };

  const out = [];
  // 4) Walk block-level elements in document order.
  const blockRe = /<(p|h[1-6]|ul|ol|blockquote)(?:\s[^>]*)?>([\s\S]*?)<\/\1>|(<!--(?:FIGURE|\/FIGURE|PRESERVED-\d+)-->)/gi;
  let m;
  let lastPlaceholder = null;
  while ((m = blockRe.exec(s))) {
    if (m[3]) {
      // Placeholder comment
      const ph = m[3];
      if (ph.startsWith('<!--FIGURE-->')) {
        // The figure renders its own paragraph in the next iteration via the ![] placeholder — but we emitted full markdown already.
        // Actually the figure was replaced with text in s, not a block tag; skip.
        continue;
      }
      if (ph.startsWith('<!--PRESERVED-')) {
        const idxMatch = ph.match(/PRESERVED-(\d+)/);
        if (idxMatch) out.push(preserved[Number(idxMatch[1])]);
        continue;
      }
      continue;
    }
    const tag = m[1].toLowerCase();
    const body = m[2];
    if (tag === 'p') {
      const text = inline(body).trim();
      if (text) out.push(text);
    } else if (/^h[1-6]$/.test(tag)) {
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

  // Also emit the standalone markdown image lines (they live in s as raw markdown inside <!--FIGURE--> wrappers).
  // Extract them via regex on the original s and splice into the output at their approximate positions — simpler: just append markdown figures inline.
  // Since the figure placeholders were already inserted as bare markdown in s but the block-matcher only handles p/h/ul etc., we missed them. Fix: wrap the figure in a <p> so it's caught.
  // (Re-run: we already transformed figure blocks to `<!--FIGURE-->![](./fig-N.ext)<!--/FIGURE-->`; wrap with <p> on next pass.)
  return out.join('\n\n');
}

// Simpler pass: pre-wrap figure placeholders inside paragraphs so they're picked up as <p>.
function preWrapFigures(html) {
  return html.replace(
    /<figure\b[\s\S]*?<\/figure>/gi,
    (block) => `<p>${block}</p>`,
  );
}

function extractFaq(body) {
  // Detect the "Frequently Asked Questions" section: look for "## Frequently Asked Questions" in markdown,
  // then collect ### Q + following paragraph until the next ### or ##.
  const faq = [];
  const lines = body.split('\n');
  let inFaq = false;
  let currentQ = null;
  let currentA = [];
  const pushCurrent = () => {
    if (currentQ) {
      faq.push({ q: currentQ, a: currentA.join('\n\n').trim() });
      currentQ = null;
      currentA = [];
    }
  };
  for (const line of lines) {
    if (/^##\s+/.test(line)) {
      if (/^##\s+Frequently Asked Questions\b/i.test(line)) {
        inFaq = true;
        pushCurrent();
        continue;
      } else {
        if (inFaq) pushCurrent();
        inFaq = false;
        continue;
      }
    }
    if (!inFaq) continue;
    if (/^###\s+/.test(line)) {
      pushCurrent();
      currentQ = line.replace(/^###\s+/, '').trim();
      continue;
    }
    if (currentQ) currentA.push(line);
  }
  pushCurrent();
  return faq;
}

function buildFrontmatter(e) {
  const L = ['---'];
  L.push(`title: ${yamlEscape(e.title)}`);
  if (e.h1 && e.h1 !== e.title) L.push(`h1: ${yamlEscape(e.h1)}`);
  L.push(`excerpt: ${yamlEscape(e.excerpt)}`);
  L.push(`coverImage: ${e.coverRel}`);
  if (e.category) L.push(`category: ${yamlEscape(e.category)}`);
  L.push(`featured: ${e.featured ? 'true' : 'false'}`);
  if (e.readTime) L.push(`readTime: ${e.readTime}`);
  if (e.metaTitle) L.push(`metaTitle: ${yamlEscape(e.metaTitle)}`);
  if (e.metaDescription) L.push(`metaDescription: ${yamlEscape(e.metaDescription)}`);
  if (e.canonicalUrl) L.push(`canonicalUrl: ${yamlEscape(e.canonicalUrl)}`);
  L.push(`publishedAt: ${e.publishedAt}`);
  if (e.updatedAt) L.push(`updatedAt: ${e.updatedAt}`);
  L.push(`draft: ${e.draft ? 'true' : 'false'}`);
  if (e.faq && e.faq.length) {
    L.push('faq:');
    for (const { q, a } of e.faq) {
      L.push(`  - q: ${yamlEscape(q)}`);
      L.push(`    a: ${yamlEscape(a)}`);
    }
  }
  L.push('---');
  return L.join('\n');
}

// Webflow template seed posts — dummy Lorem Ipsum content left over from the initial
// site setup. Skip them on migration so they never land in the content collection.
const DUMMY_SLUGS = new Set([
  '5-principles-of-effective-web-design',
  '10-great-examples-of-responsive-websites',
  '10-quick-tips-about-blogging',
  'how-to-improve-web-design-process',
  'what-will-website-be-like-in-100-years',
]);

async function processItem(item, categoryMap, localeFolder, allLinks) {
  const f = item.fieldData;
  const slug = f.slug?.trim();
  if (!slug) return null;
  if (DUMMY_SLUGS.has(slug)) return null;

  const outDir = path.join(POSTS_ROOT, localeFolder, slug);
  await fs.mkdir(outDir, { recursive: true });

  // Cover
  let coverRel = null;
  const coverUrl = f['blog-post-main-image']?.url;
  if (coverUrl) {
    const ext = extFromUrl(coverUrl, 'webp');
    const ok = await tryDownload(coverUrl, path.join(outDir, `cover.${ext}`));
    coverRel = ok ? `./cover.${ext}` : null;
  }
  if (!coverRel) {
    console.warn(`[${slug}/${localeFolder}] no cover; skipping`);
    return null;
  }

  const imageTasks = [];
  const linkRefs = [];
  const preppedHtml = preWrapFigures(f['blog-post-content'] ?? '');
  const body = stripAbsoluteSelfDomainLinks(htmlToMarkdown(preppedHtml, imageTasks, linkRefs));
  await Promise.all(imageTasks.map((t) => tryDownload(t.url, path.join(outDir, t.rel.replace(/^\.\//, '')))));

  for (const href of linkRefs) allLinks.push({ slug, href });

  const faq = extractFaq(body);
  const category = categoryMap.get(f['blog-post-category']) ?? null;

  const frontmatter = buildFrontmatter({
    title: f.name,
    h1: f.h1,
    excerpt: f['blog-post-excerpt'] ?? '',
    coverRel,
    category,
    featured: Boolean(f['blog-post-featured']),
    readTime: f['blog-post-read-time'] ?? null,
    metaTitle: f['meta-title'] ?? null,
    metaDescription: f['meta-description'] ?? null,
    canonicalUrl: f['canonical-tag'] ?? null,
    // `createdOn` is the first-publish timestamp and is unique per item.
    // `lastPublished` is shared across bulk republishes — don't use for listing order.
    publishedAt: item.createdOn ?? item.lastPublished,
    updatedAt: item.lastUpdated ?? item.lastPublished ?? null,
    draft: Boolean(item.isDraft),
    faq,
  });

  await fs.writeFile(path.join(outDir, 'index.md'), frontmatter + '\n\n' + body + '\n');
  return slug;
}

async function writeCategories(categories) {
  await fs.mkdir(CATEGORIES_ROOT, { recursive: true });
  for (const c of categories) {
    if (c.isDraft || c.isArchived) continue;
    const { name, slug, 'blog-post-category-description': desc } = c.fieldData;
    const payload = { name, slug };
    if (desc && desc.trim() && desc.trim().length > 2) payload.description = desc.trim();
    await fs.writeFile(
      path.join(CATEGORIES_ROOT, `${slug}.json`),
      JSON.stringify(payload, null, 2) + '\n',
    );
  }
}

async function main() {
  const { en, zh, categories } = collectBundles();
  console.log(`en: ${en.length}, zh-TW: ${zh.length}, categories: ${categories.length}`);

  const categoryMap = new Map(categories.map((c) => [c.id, c.fieldData.slug]));

  await fs.rm(POSTS_ROOT, { recursive: true, force: true });
  await fs.rm(CATEGORIES_ROOT, { recursive: true, force: true });

  await writeCategories(categories);

  const allLinks = [];
  const enSlugs = [];
  console.log('\nwriting en…');
  for (const item of en) {
    const slug = await processItem(item, categoryMap, 'en', allLinks);
    if (slug) enSlugs.push(slug);
  }
  console.log(`  wrote ${enSlugs.length} en posts`);

  const zhSlugs = [];
  console.log('\nwriting zh-TW…');
  for (const item of zh) {
    const slug = await processItem(item, categoryMap, 'zh-TW', allLinks);
    if (slug) zhSlugs.push(slug);
  }
  console.log(`  wrote ${zhSlugs.length} zh-TW posts`);

  // Slug + link audits
  await fs.writeFile(SLUG_AUDIT_PATH, 'en:\n' + enSlugs.sort().map((s) => '  ' + s).join('\n') + '\n\nzh-TW:\n' + zhSlugs.sort().map((s) => '  ' + s).join('\n') + '\n');

  const internal = allLinks.filter(({ href }) => href.startsWith('/'));
  const external = allLinks.filter(({ href }) => !href.startsWith('/'));
  const lines = [
    `total links: ${allLinks.length}`,
    `  internal: ${internal.length}`,
    `  external: ${external.length}`,
    '',
    '--- internal links (first 500) ---',
  ];
  for (const { slug, href } of internal.slice(0, 500)) lines.push(`  [${slug}] ${href}`);
  lines.push('', '--- external links sample (first 100) ---');
  for (const { slug, href } of external.slice(0, 100)) lines.push(`  [${slug}] ${href}`);
  await fs.writeFile(LINK_AUDIT_PATH, lines.join('\n') + '\n');

  console.log('\ndone.');
  console.log(`  slug audit: ${SLUG_AUDIT_PATH}`);
  console.log(`  link audit: ${LINK_AUDIT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const STATIC_PATHS = [
  '/',
  '/blog',
  '/pricing',
  '/schedule-demo',
  '/about',
  '/security',
  '/why-authgear',
  '/customer-stories',
  '/login-gallery',
  '/whats-new',
];

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export const GET: APIRoute = async ({ site }) => {
  if (!site) {
    return new Response('site must be configured in astro.config', {
      status: 500,
    });
  }

  const abs = (path: string): string => new URL(path, site).href;

  const posts = await getCollection('blog-posts', ({ data }) => !data.draft);
  const categories = await getCollection('blog-categories');

  type UrlEntry = { loc: string; lastmod?: string };
  const urls: UrlEntry[] = [];

  for (const path of STATIC_PATHS) {
    urls.push({ loc: abs(path) });
    urls.push({ loc: abs(`/zh-TW${path === '/' ? '' : path}`) });
  }

  for (const post of posts) {
    // Blog post ids look like `en/slug/index` or `zh-TW/slug/index`.
    const parts = post.id.split('/');
    const locale = parts[0];
    const slug = parts[1];
    if (!locale || !slug) continue;

    const lastmod = (post.data.updatedAt ?? post.data.publishedAt).toISOString();
    const base = locale === 'en' ? '' : `/${locale}`;
    urls.push({ loc: abs(`${base}/post/${slug}`), lastmod });
  }

  for (const category of categories) {
    const slug = category.data.slug;
    urls.push({ loc: abs(`/post-category/${slug}`) });
    urls.push({ loc: abs(`/zh-TW/post-category/${slug}`) });
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(({ loc, lastmod }) => {
    const parts = [`  <url>`, `    <loc>${escapeXml(loc)}</loc>`];
    if (lastmod) parts.push(`    <lastmod>${lastmod}</lastmod>`);
    parts.push(`  </url>`);
    return parts.join('\n');
  })
  .join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml' },
  });
};

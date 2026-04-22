import type { APIRoute } from 'astro';
import { pathLocaleToStrapiLocale } from '@/lib/i18n';
import { BLOG_LIST_PAGE_SIZE, getBlogPostsSlice } from '@/lib/strapi';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const pathLocale = url.searchParams.get('locale') ?? 'en';
  const offsetRaw = url.searchParams.get('offset');
  const offset = offsetRaw === null ? 0 : parseInt(offsetRaw, 10);

  if (!Number.isFinite(offset) || offset < 0) {
    return new Response(JSON.stringify({ error: 'Invalid offset' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (offset > 0 && offset % BLOG_LIST_PAGE_SIZE !== 0) {
    return new Response(
      JSON.stringify({ error: 'Offset must be a multiple of page size' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    );
  }

  const strapiLocale = pathLocaleToStrapiLocale(pathLocale);
  const { data, hasMore } = await getBlogPostsSlice(strapiLocale, offset, BLOG_LIST_PAGE_SIZE);

  return new Response(JSON.stringify({ posts: data, hasMore }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
    },
  });
};

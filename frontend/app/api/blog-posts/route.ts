import { NextRequest, NextResponse } from 'next/server';
import { pathLocaleToStrapiLocale } from '@/lib/i18n';
import { BLOG_LIST_PAGE_SIZE, getBlogPostsSlice } from '@/lib/strapi';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const pathLocale = searchParams.get('locale') ?? 'en';
  const offsetRaw = searchParams.get('offset');
  const offset = offsetRaw === null ? 0 : parseInt(offsetRaw, 10);

  if (!Number.isFinite(offset) || offset < 0) {
    return NextResponse.json({ error: 'Invalid offset' }, { status: 400 });
  }

  if (offset > 0 && offset % BLOG_LIST_PAGE_SIZE !== 0) {
    return NextResponse.json({ error: 'Offset must be a multiple of page size' }, { status: 400 });
  }

  const strapiLocale = pathLocaleToStrapiLocale(pathLocale);
  const { data, hasMore } = await getBlogPostsSlice(strapiLocale, offset, BLOG_LIST_PAGE_SIZE);

  return NextResponse.json({ posts: data, hasMore });
}

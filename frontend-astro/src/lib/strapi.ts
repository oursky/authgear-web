
const STRAPI_URL = process.env.STRAPI_URL ?? 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN ?? '';

/** Base URL for resolving `/uploads/...` paths in `<Image src>` (browser + optimizer). */
function getStrapiPublicBase(): string {
  const raw =
    (process.env.NEXT_PUBLIC_STRAPI_URL?.trim() ||
      process.env.STRAPI_URL?.trim() ||
      'http://localhost:1337');
  return raw.replace(/\/$/, '');
}

export type StrapiLocale = 'en' | 'zh-Hant-TW';

type FetchOptions = {
  /** Strapi 5: use `*` for all first-level relations/media (comma-separated names are invalid in v5). */
  populate?: string;
  /** Extra query string (e.g. nested populate) merged after buildQuery, without leading `?`. */
  populateQuery?: string;
  filters?: Record<string, unknown>;
  sort?: string;
  pagination?: { page?: number; pageSize?: number };
  /** BCP 47 locale code, e.g. 'en' or 'zh-Hant-TW'. Omit for Strapi default (en). */
  locale?: StrapiLocale;
};

function buildQuery(options: FetchOptions): string {
  const params = new URLSearchParams();

  if (options.populate) params.set('populate', options.populate);
  if (options.sort) params.set('sort', options.sort);
  if (options.locale) params.set('locale', options.locale);
  if (options.pagination?.page) params.set('pagination[page]', String(options.pagination.page));
  if (options.pagination?.pageSize) params.set('pagination[pageSize]', String(options.pagination.pageSize));

  if (options.filters) {
    const flatten = (obj: Record<string, unknown>, prefix = 'filters') => {
      Object.entries(obj).forEach(([key, val]) => {
        const fullKey = `${prefix}[${key}]`;
        if (val !== null && typeof val === 'object' && !Array.isArray(val)) {
          flatten(val as Record<string, unknown>, fullKey);
        } else {
          params.set(fullKey, String(val));
        }
      });
    };
    flatten(options.filters);
  }

  let qs = params.toString();
  if (options.populateQuery) {
    qs = qs ? `${qs}&${options.populateQuery}` : options.populateQuery;
  }
  return qs ? `?${qs}` : '';
}

/** Strapi 5 REST returns flat entries; the app was written for Strapi 4 `{ id, attributes }`. */
function wrapMedia(o: unknown): StrapiImage {
  if (!o || typeof o !== 'object') return { data: null };
  const m = o as Record<string, unknown>;
  if (m.data && typeof m.data === 'object') return o as StrapiImage;
  const url = typeof m.url === 'string' ? m.url : '';
  if (!url) return { data: null };
  return {
    data: {
      attributes: {
        url,
        alternativeText: (m.alternativeText as string | null) ?? null,
        width: typeof m.width === 'number' ? m.width : 0,
        height: typeof m.height === 'number' ? m.height : 0,
      },
    },
  };
}

function wrapRelation(o: unknown): { data: { id: number; attributes: Record<string, unknown> } | null } {
  if (!o || typeof o !== 'object') return { data: null };
  const obj = o as Record<string, unknown>;
  if (obj.data !== undefined) return o as { data: { id: number; attributes: Record<string, unknown> } | null };
  const id = typeof obj.id === 'number' ? obj.id : 0;
  const attrs: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (['id', 'documentId', 'createdAt', 'updatedAt', 'publishedAt'].includes(k)) continue;
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      const x = v as Record<string, unknown>;
      if (typeof x.mime === 'string' && x.mime.startsWith('image/')) {
        attrs[k] = wrapMedia(v);
        continue;
      }
      if (x.documentId != null && x.mime == null) {
        attrs[k] = wrapRelation(v);
        continue;
      }
    }
    attrs[k] = v;
  }
  return { data: { id, attributes: attrs } };
}

function normalizeEntry(item: unknown): { id: number; attributes: Record<string, unknown> } {
  if (!item || typeof item !== 'object') return { id: 0, attributes: {} };
  const row = item as Record<string, unknown>;
  if (row.attributes !== undefined && typeof row.attributes === 'object') {
    return row as { id: number; attributes: Record<string, unknown> };
  }
  const id = typeof row.id === 'number' ? row.id : 0;
  const attributes: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(row)) {
    if (['id', 'documentId'].includes(k)) continue;
    if (['createdAt', 'updatedAt'].includes(k)) continue;
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      const x = v as Record<string, unknown>;
      if (typeof x.mime === 'string' && x.mime.startsWith('image/')) {
        attributes[k] = wrapMedia(v);
        continue;
      }
      if (x.documentId != null && x.mime == null) {
        attributes[k] = wrapRelation(v);
        continue;
      }
    }
    attributes[k] = v;
  }
  return { id, attributes };
}

function normalizeStrapiPayload<T>(json: T): T {
  if (!json || typeof json !== 'object') return json;
  const j = json as Record<string, unknown>;
  const data = j.data;
  if (data === null || data === undefined) return json;
  if (Array.isArray(data)) {
    return { ...j, data: data.map(normalizeEntry) } as T;
  }
  if (typeof data === 'object') {
    return { ...j, data: normalizeEntry(data) } as T;
  }
  return json;
}

async function strapiGet<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const query = buildQuery(options);
  const url = `${STRAPI_URL}/api/${path}${query}`;

  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (STRAPI_API_TOKEN) headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`;

  try {
    const res = await fetch(url, {
      headers,
    });

    if (!res.ok) {
      throw new Error(`Strapi fetch failed: ${res.status} ${res.statusText} (${url})`);
    }

    const raw = (await res.json()) as T;
    return normalizeStrapiPayload(raw);
  } catch (error) {
    // During Docker build, Strapi service may not be available
    // Return empty response structure to allow build to succeed
    const err = error as any;
    const isNetworkError = 
      err?.code === 'ENOTFOUND' || 
      err?.cause?.code === 'ENOTFOUND' ||
      err?.errno === -3008 ||
      err?.message?.includes('getaddrinfo ENOTFOUND') ||
      err?.message?.includes('fetch failed');
    
    if (isNetworkError) {
      console.warn(`[strapi] Service not available during build: ${url}`);
      return { data: [], meta: { pagination: { page: 1, pageSize: 0, pageCount: 0, total: 0 } } } as T;
    }
    throw error;
  }
}

export type StrapiImage = {
  data: {
    attributes: {
      url: string;
      alternativeText: string | null;
      width: number;
      height: number;
    };
  } | null;
};

export type StrapiListResponse<T> = {
  data: Array<{ id: number; attributes: T }>;
  meta: { pagination: { page: number; pageSize: number; pageCount: number; total: number } };
};

export function strapiImageUrl(image: StrapiImage | { url?: string } | null | undefined): string {
  if (!image) return '';
  const base = getStrapiPublicBase();
  const flat = image as { url?: string };
  if (typeof flat.url === 'string' && flat.url) {
    return flat.url.startsWith('http') ? flat.url : `${base}${flat.url}`;
  }
  const nested = image as StrapiImage;
  if (!nested?.data?.attributes?.url) return '';
  const url = nested.data.attributes.url;
  return url.startsWith('http') ? url : `${base}${url}`;
}

function strapiMediaItemToSlide(item: unknown): { src: string; alt: string } | null {
  if (item == null || typeof item !== 'object') return null;
  const readAlt = (o: Record<string, unknown>): string =>
    typeof o.alternativeText === 'string' ? o.alternativeText : '';

  const candidates: unknown[] = [item];
  const o = item as Record<string, unknown>;
  if (o.attributes && typeof o.attributes === 'object') candidates.push(o.attributes);
  if (o.data != null) {
    if (Array.isArray(o.data)) {
      for (const el of o.data) candidates.push(el);
    } else {
      candidates.push(o.data);
      const d = o.data as Record<string, unknown>;
      if (d.attributes && typeof d.attributes === 'object') candidates.push(d.attributes);
    }
  }

  for (const c of candidates) {
    if (!c || typeof c !== 'object') continue;
    const rec = c as Record<string, unknown>;
    const src = strapiImageUrl(rec as StrapiImage);
    if (src) return { src, alt: readAlt(rec) };
  }
  return null;
}

/** 單一 media 欄位 → 一張 slide（`mainImage` 等）。 */
export function strapiSingleMediaToSlide(media: unknown): { src: string; alt: string } | null {
  if (media == null) return null;
  if (Array.isArray(media)) {
    return media.length > 0 ? strapiMediaItemToSlide(media[0]) : null;
  }
  if (typeof media === 'object' && 'data' in media) {
    const d = (media as { data: unknown }).data;
    if (Array.isArray(d) && d.length > 0) return strapiMediaItemToSlide(d[0]);
    if (d != null && typeof d === 'object') return strapiMediaItemToSlide(d);
  }
  return strapiMediaItemToSlide(media);
}

/** Strapi 5 multi-upload、`{ data: [...] }`、巢狀 `attributes` → 輪播用 slides。 */
export function strapiMediaListToSlides(
  media: unknown
): Array<{ src: string; alt: string }> {
  if (media == null) return [];
  let items: unknown[] = [];
  if (Array.isArray(media)) {
    items = media;
  } else if (typeof media === 'object') {
    const d = (media as { data?: unknown }).data;
    if (Array.isArray(d)) items = d;
    else if (d != null && typeof d === 'object') items = [d];
  }
  const out: Array<{ src: string; alt: string }> = [];
  for (const item of items) {
    const slide = strapiMediaItemToSlide(item);
    if (slide) out.push(slide);
  }
  return out;
}

// ── Blog Posts ────────────────────────────────────────────────────────────────
export type BlogPost = {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  publishedAt: string;
  publishedAtOverride: string | null;
  thumbnail: StrapiImage;
  category: { data: { id: number; attributes: { name: string; slug: string } } | null };
  author: {
    data: {
      id: number;
      attributes: {
        name: string;
        role: string;
        photo: StrapiImage;
      };
    } | null;
  };
};

/** Date shown in UI and used for listing order: manual override, else Strapi `publishedAt`. */
export function blogPostDisplayPublishedAt(attrs: {
  publishedAt?: string | null;
  publishedAtOverride?: string | null;
}): string | null {
  const o = attrs.publishedAtOverride;
  if (o != null && String(o).trim() !== '') return o;
  const p = attrs.publishedAt;
  if (p != null && String(p).trim() !== '') return p;
  return null;
}

function compareBlogPostsByDisplayPublishedAt(
  a: { id: number; attributes: BlogPost },
  b: { id: number; attributes: BlogPost }
): number {
  const ta = blogPostDisplayPublishedAt(a.attributes);
  const tb = blogPostDisplayPublishedAt(b.attributes);
  const da = ta ? new Date(ta).getTime() : 0;
  const db = tb ? new Date(tb).getTime() : 0;
  if (db !== da) return db - da;
  return b.id - a.id;
}

/**
 * Strapi cannot sort by COALESCE(override, publishedAt). We fetch a larger page (cap),
 * sort client-side by {@link blogPostDisplayPublishedAt}, then return the first `pageSize` items.
 */
const BLOG_POSTS_LIST_FETCH_PAGE_SIZE_CAP = 500;

/** Strapi 5: nested populate for author.photo (comma-separated populate is invalid). */
const BLOG_POST_POPULATE =
  'populate[thumbnail]=true&populate[category]=true&populate[author][populate][photo]=true';

export type BlogPostEntry = { id: number; attributes: BlogPost };

const STRAPI_BLOG_FULL_LIST_BATCH = 100;
const STRAPI_BLOG_FULL_LIST_MAX_PAGES = 100;

/** Fetch every blog post for a locale, then sort by display publish date (for listing + infinite scroll). */
async function fetchAllBlogPostsSortedUncached(
  locale?: StrapiLocale
): Promise<BlogPostEntry[]> {
  const all: BlogPostEntry[] = [];
  for (let page = 1; page <= STRAPI_BLOG_FULL_LIST_MAX_PAGES; page++) {
    const res = await strapiGet<StrapiListResponse<BlogPost>>('blog-posts', {
      locale,
      populateQuery: BLOG_POST_POPULATE,
      sort: 'publishedAt:desc',
      pagination: { page, pageSize: STRAPI_BLOG_FULL_LIST_BATCH },
    });
    const batch = (res.data ?? []) as BlogPostEntry[];
    all.push(...batch);
    if (batch.length < STRAPI_BLOG_FULL_LIST_BATCH) break;
  }
  return all.sort(compareBlogPostsByDisplayPublishedAt);
}

/** Full sorted list. Use {@link getBlogPostsSlice} for listing pages / API pagination. */
export async function getSortedBlogPostsList(locale?: StrapiLocale): Promise<BlogPostEntry[]> {
  return fetchAllBlogPostsSortedUncached(locale);
}

/** Batch size for blog index SSR + `/api/blog-posts` infinite scroll. */
export const BLOG_LIST_PAGE_SIZE = 50;

/** Slice of globally sorted posts (same order as infinite scroll batches of `limit`). */
export async function getBlogPostsSlice(
  locale: StrapiLocale | undefined,
  offset: number,
  limit: number
): Promise<{ data: BlogPostEntry[]; total: number; hasMore: boolean }> {
  const sorted = await getSortedBlogPostsList(locale);
  const total = sorted.length;
  const data = sorted.slice(offset, offset + limit);
  return { data, total, hasMore: offset + data.length < total };
}

export async function getBlogPosts(options: FetchOptions = {}) {
  const requestedPageSize = options.pagination?.pageSize ?? 25;
  const fetchPageSize = Math.min(
    Math.max(requestedPageSize, BLOG_POSTS_LIST_FETCH_PAGE_SIZE_CAP),
    1000
  );

  const res = await strapiGet<StrapiListResponse<BlogPost>>('blog-posts', {
    ...options,
    populateQuery: BLOG_POST_POPULATE,
    sort: 'publishedAt:desc',
    pagination: {
      page: options.pagination?.page ?? 1,
      pageSize: fetchPageSize,
    },
  });

  const sorted = [...(res.data ?? [])].sort(compareBlogPostsByDisplayPublishedAt);
  const sliced = sorted.slice(0, requestedPageSize);

  return {
    ...res,
    data: sliced,
    meta: {
      ...res.meta,
      pagination: {
        ...res.meta.pagination,
        pageSize: requestedPageSize,
      },
    },
  };
}

export async function getBlogPostBySlug(slug: string, locale?: StrapiLocale) {
  const res = await strapiGet<StrapiListResponse<BlogPost>>('blog-posts', {
    populateQuery: BLOG_POST_POPULATE,
    filters: { slug: { $eq: slug } },
    locale,
  });
  return res.data[0] ?? null;
}

// ── Blog Categories ───────────────────────────────────────────────────────────
export type BlogCategory = { name: string; slug: string };

export async function getBlogCategories(options: FetchOptions = {}) {
  return strapiGet<StrapiListResponse<BlogCategory>>('blog-categories', options);
}

/** Unwrap `loginMethodsTech` component (flat Strapi 5 or `{ data: { attributes } }` after normalize). */
export function strapiLoginMethodsTechFields(loginMethodsTech: unknown): {
  methodsDetail: unknown;
  technicalDetails: unknown;
} {
  if (loginMethodsTech == null || loginMethodsTech === '') {
    return { methodsDetail: undefined, technicalDetails: undefined };
  }
  const root = loginMethodsTech as Record<string, unknown>;
  let inner: Record<string, unknown> = root;
  if (root.data != null && typeof root.data === 'object') {
    const d = root.data as Record<string, unknown>;
    inner =
      d.attributes != null && typeof d.attributes === 'object'
        ? (d.attributes as Record<string, unknown>)
        : d;
  }
  return {
    methodsDetail: inner.methodsDetail,
    technicalDetails: inner.technicalDetails,
  };
}

/** Strapi `multi-select` custom field → label strings (array, JSON string, or empty). */
export function strapiMultiSelectToStrings(value: unknown): string[] {
  if (value == null || value === '') return [];
  if (Array.isArray(value)) {
    return value.filter((x): x is string => typeof x === 'string' && x.trim().length > 0);
  }
  if (typeof value === 'string') {
    const s = value.trim();
    if (!s || s === '[]') return [];
    try {
      const p = JSON.parse(s) as unknown;
      if (Array.isArray(p)) {
        return p.filter((x): x is string => typeof x === 'string' && x.trim().length > 0);
      }
    } catch {
      return s ? [s] : [];
    }
  }
  return [];
}

// ── Integrations ──────────────────────────────────────────────────────────────
export type Integration = {
  name: string;
  slug: string;
  description: string;
  body: string;
  heroImage: StrapiImage;
  logo: StrapiImage;
  category: { data: { id: number; attributes: { name: string; slug: string } } | null };
};

export async function getIntegrations(options: FetchOptions = {}) {
  return strapiGet<StrapiListResponse<Integration>>('integrations', {
    populate: '*',
    sort: 'name:asc',
    ...options,
  });
}

export async function getIntegrationBySlug(slug: string, locale?: StrapiLocale) {
  const res = await strapiGet<StrapiListResponse<Integration>>('integrations', {
    populate: '*',
    filters: { slug: { $eq: slug } },
    locale,
  });
  return res.data[0] ?? null;
}

// ── Integration Categories ────────────────────────────────────────────────────
export type IntegrationCategory = { name: string; slug: string };

export async function getIntegrationCategories(options: FetchOptions = {}) {
  return strapiGet<StrapiListResponse<IntegrationCategory>>('integration-categories', options);
}

// ── Login Gallery ─────────────────────────────────────────────────────────────
export type LoginGalleryItem = {
  title: string;
  slug: string;
  /** Card / OG image (Strapi field `mainImage`). */
  mainImage?: StrapiImage;
  /** Strapi Blocks JSON (`content` field). */
  content?: unknown;
  industry?: string | null;
  socialLogin?: unknown;
  loginMethodsTech?: unknown;
  webImage?: unknown;
  mobileImage?: unknown;
  /** Legacy Webflow import fields (optional). */
  description?: string | null;
  previewImage?: StrapiImage;
  body?: string | null;
};

export async function getLoginGalleryItems(options: FetchOptions = {}) {
  return strapiGet<StrapiListResponse<LoginGalleryItem>>('login-gallery-items', {
    populate: '*',
    ...options,
  });
}

/** Strapi 5：多圖＋ component 需明確 populate，避免 REST 只回 id、輪播變空。 */
const LOGIN_GALLERY_ITEM_POPULATE =
  'populate[mainImage]=true&populate[webImage]=true&populate[mobileImage]=true&populate[loginMethodsTech]=true';

export async function getLoginGalleryItemBySlug(slug: string, locale?: StrapiLocale) {
  const res = await strapiGet<StrapiListResponse<LoginGalleryItem>>('login-gallery-items', {
    populate: '*',
    populateQuery: LOGIN_GALLERY_ITEM_POPULATE,
    filters: { slug: { $eq: slug } },
    locale,
  });
  return res.data[0] ?? null;
}

// ── What's New ────────────────────────────────────────────────────────────────
export type WhatsNewItem = {
  title: string;
  slug: string;
  body: string;
  excerpt: string;
  publishedAt: string;
  coverImage: StrapiImage;
};

export async function getWhatsNewItems(options: FetchOptions = {}) {
  return strapiGet<StrapiListResponse<WhatsNewItem>>('whats-new-items', {
    populate: '*',
    sort: 'publishedAt:desc',
    ...options,
  });
}

export async function getWhatsNewItemBySlug(slug: string, locale?: StrapiLocale) {
  const res = await strapiGet<StrapiListResponse<WhatsNewItem>>('whats-new-items', {
    populate: '*',
    filters: { slug: { $eq: slug } },
    locale,
  });
  return res.data[0] ?? null;
}


// ── Team Members ──────────────────────────────────────────────────────────────
export type TeamMember = {
  name: string;
  slug: string;
  role: string;
  bio: string;
  photo: StrapiImage;
};

export async function getTeamMembers() {
  return strapiGet<StrapiListResponse<TeamMember>>('team-members', {
    populate: '*',
    sort: 'name:asc',
  });
}

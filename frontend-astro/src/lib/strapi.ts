
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

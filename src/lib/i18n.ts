/**
 * Supported locales. Default (`en`) is served at unprefixed URLs (`/pricing`);
 * Traditional Chinese is identified internally as `zh-Hant` (BCP 47 canonical
 * form, used in `<html lang>` and `hreflang`) but served at lowercase
 * `/zh-hant/...` URLs to match standard URL casing conventions.
 */
export const LOCALES = ['en', 'zh-Hant', 'ja', 'es', 'de'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

/** URL-path prefix segment per locale. Lowercase per URL convention. */
const LOCALE_URL_SEGMENT: Record<Locale, string> = {
  en: '',
  'zh-Hant': '/zh-hant',
  ja: '/ja',
  es: '/es',
  de: '/de',
};

/** URL-path prefix for a locale (`''` for English). */
export function localeUrlSegment(locale: string): string {
  return LOCALE_URL_SEGMENT[locale as Locale] ?? '';
}

/**
 * Locales with partial coverage (market test): the home page, the pricing
 * page, the auth-toolkit hub, the schedule-demo page and every `/tools/*` page are translated; every
 * other path falls back to the English page. Links from their pages point at
 * unprefixed URLs for those paths, and `public/_redirects` sends stray prefixed
 * URLs there too. `ja` additionally has translated blog posts under `/ja/post/`.
 * URL slugs are never translated: `/es/pricing/`, not `/es/precios/`.
 */
export const PARTIAL_LOCALES: readonly Locale[] = ['ja', 'es', 'de'];

const PARTIAL_LOCALE_PATHS = ['/', '/pricing/', '/auth-toolkit/', '/schedule-demo/'] as const;
const PARTIAL_LOCALE_PATH_PREFIXES = ['/tools/'] as const;

/**
 * Pages that exist in English only (no `src/pages/zh-hant/` twin): legal
 * pages and UK/EU-market pages. Every other locale links to, and advertises,
 * the English page instead of a prefixed URL that would 404. Keep in sync
 * with `src/pages/`; `i18n.test.ts` checks each entry against disk.
 */
export const EN_ONLY_PATHS: readonly string[] = ['/dpa/', '/sub-processors/'];

/**
 * Paths translated for some partial locales but not all of them. Each entry
 * needs a route at `src/pages/<locale>/<path>.astro`; `i18n.test.ts` checks
 * that against disk.
 */
export const PARTIAL_LOCALE_EXTRA_PATHS: Partial<Record<Locale, readonly string[]>> = {
  es: ['/solutions/data-sovereignty/'],
  de: ['/solutions/data-sovereignty/'],
};

function withTrailingSlash(pathname: string): string {
  if (pathname === '') return '/';
  return pathname.endsWith('/') ? pathname : pathname + '/';
}

/**
 * Blog posts that have a Japanese translation under `/ja/post/`. Keep in sync
 * with `src/content/blog-posts/ja/`; `i18n.test.ts` fails when they drift.
 */
export const JA_POST_SLUGS: readonly string[] = [
  'how-to-implement-passkeys-developer-guide',
  'passwordless-authentication-magic-links-passkeys-otp',
  'sms-otp-vs-whatsapp-otp',
  'two-factor-authentication-cost',
  'whatsapp-api-pricing',
];

function isJaPostPath(pathname: string): boolean {
  const match = withTrailingSlash(pathname).match(/^\/post\/([^/]+)\/$/);
  return match !== null && JA_POST_SLUGS.includes(match[1]);
}

/** Is this locale-neutral pathname one that every partial locale has translated? */
function isPartialLocalePath(pathname: string): boolean {
  const path = withTrailingSlash(pathname);
  return (
    (PARTIAL_LOCALE_PATHS as readonly string[]).includes(path) ||
    PARTIAL_LOCALE_PATH_PREFIXES.some((prefix) => path.startsWith(prefix) && path.length > prefix.length)
  );
}

/** Does `locale` have its own page at this locale-neutral pathname? */
export function hasLocalizedPage(locale: string, pathname: string): boolean {
  if (locale === DEFAULT_LOCALE) return true;
  if (EN_ONLY_PATHS.includes(withTrailingSlash(pathname))) return false;
  if (!PARTIAL_LOCALES.includes(locale as Locale)) return true;
  if (isPartialLocalePath(pathname)) return true;
  if (PARTIAL_LOCALE_EXTRA_PATHS[locale as Locale]?.includes(withTrailingSlash(pathname))) return true;
  if (locale === 'ja' && isJaPostPath(pathname)) return true;
  return false;
}

/**
 * Locales that can be offered as alternates for a page, both to search
 * engines (hreflang) and to people (the footer switcher). Full-coverage
 * locales everywhere except `EN_ONLY_PATHS`; partial locales only on the
 * paths they all translate, so nobody is pointed at a URL that would
 * redirect or 404.
 */
export function localesWithPage(pathname: string): Locale[] {
  return LOCALES.filter((loc) => hasLocalizedPage(loc, pathname));
}

/**
 * Public URL for a path. Default English has no prefix; `zh-Hant` uses `/zh-hant`.
 * `path` must start with `/` or include query (e.g. `/blog?category=x`).
 */
export function localizedPath(locale: string, path: string): string {
  const raw = path.startsWith('/') || path.startsWith('?') ? path : `/${path}`;
  const q = raw.indexOf('?');
  const pathname = q === -1 ? raw : raw.slice(0, q);
  const search = q === -1 ? '' : raw.slice(q);
  const normalized = pathname.endsWith('/') ? pathname : pathname + '/';
  if (locale === DEFAULT_LOCALE || locale === 'en') {
    return normalized + search;
  }
  // Partial locales send untranslated paths, and every locale sends
  // English-only pages, to the unprefixed English URL.
  if (!hasLocalizedPage(locale, normalized)) {
    return normalized + search;
  }
  const prefix = LOCALE_URL_SEGMENT[locale as Locale] ?? '';
  return `${prefix}${normalized}${search}`;
}

/**
 * Strip a recognized locale URL segment from a pathname so the result is
 * locale-neutral. `/zh-hant/about` → `/about`; `/about` → `/about`. Used
 * by the footer language switcher and any other place that needs to map
 * the current URL onto a sibling locale.
 */
export function stripLocaleSegment(pathname: string): string {
  for (const loc of LOCALES) {
    const seg = LOCALE_URL_SEGMENT[loc];
    if (!seg) continue;
    if (pathname === seg) return '/';
    if (pathname.startsWith(`${seg}/`)) return pathname.slice(seg.length);
  }
  return pathname;
}

/** Legacy URL segment; middleware redirects `/zh-Hant-TW/...` → `/zh-hant/...`. */
export const LEGACY_ZH_PATH_LOCALE = 'zh-Hant-TW' as const;

/** Map Accept-Language header value to a supported locale. */
export function resolveLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return DEFAULT_LOCALE;
  const tags = acceptLanguage
    .split(',')
    .map((l) => l.split(';')[0].trim().toLowerCase());
  for (const tag of tags) {
    // Traditional Chinese — covers Taiwan, Hong Kong, Macau readers.
    // Simplified Chinese (zh-Hans, zh-CN) is separate future work.
    if (
      tag === 'zh-tw' ||
      tag === 'zh-hk' ||
      tag === 'zh-mo' ||
      tag === 'zh-hant' ||
      tag === 'zh-hant-tw' ||
      tag === 'zh-hant-hk' ||
      tag === 'zh-hant-mo' ||
      tag.startsWith('zh-tw-') ||
      tag.startsWith('zh-hk-') ||
      tag.startsWith('zh-hant-')
    ) {
      return 'zh-Hant';
    }
    // Japanese
    if (tag === 'ja' || tag.startsWith('ja-')) {
      return 'ja';
    }
    if (tag === 'es' || tag.startsWith('es-')) {
      return 'es';
    }
    if (tag === 'de' || tag.startsWith('de-')) {
      return 'de';
    }
  }
  return DEFAULT_LOCALE;
}

/** Return the HTML lang attribute value for a given locale. */
export function localeToHtmlLang(locale: Locale | typeof LEGACY_ZH_PATH_LOCALE | string): string {
  if (locale === 'zh-Hant' || locale === LEGACY_ZH_PATH_LOCALE) return 'zh-Hant';
  if (locale === 'ja') return 'ja';
  if (locale === 'es') return 'es';
  if (locale === 'de') return 'de';
  // if (locale === 'zh-HK') return 'zh-HK';
  return 'en';
}

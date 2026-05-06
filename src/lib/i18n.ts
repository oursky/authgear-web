/**
 * Supported locales. Default (`en`) is served at unprefixed URLs (`/pricing`);
 * Traditional Chinese is identified internally as `zh-Hant` (BCP 47 canonical
 * form, used in `<html lang>` and `hreflang`) but served at lowercase
 * `/zh-hant/...` URLs to match standard URL casing conventions.
 */
export const LOCALES = ['en', 'zh-Hant'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

/** URL-path prefix segment per locale. Lowercase per URL convention. */
const LOCALE_URL_SEGMENT: Record<Locale, string> = {
  en: '',
  'zh-Hant': '/zh-hant',
};

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
  }
  return DEFAULT_LOCALE;
}

/** Return the HTML lang attribute value for a given locale. */
export function localeToHtmlLang(locale: Locale | typeof LEGACY_ZH_PATH_LOCALE | string): string {
  if (locale === 'zh-Hant' || locale === LEGACY_ZH_PATH_LOCALE) return 'zh-Hant';
  // if (locale === 'zh-HK') return 'zh-HK';
  return 'en';
}

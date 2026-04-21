import type { StrapiLocale } from './strapi';

/**
 * Supported locales. Default (`en`) is served at unprefixed URLs (`/pricing`);
 * Traditional Chinese uses `/zh-TW/...`. Internally, English is routed as `/en/...` via middleware rewrite.
 */
export const LOCALES = ['en', 'zh-TW'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

/**
 * Public URL for a path. Default English has no `/${locale}` prefix; `zh-TW` uses `/zh-TW`.
 * `path` must start with `/` or include query (e.g. `/blog?category=x`).
 */
export function localizedPath(locale: string, path: string): string {
  const raw = path.startsWith('/') || path.startsWith('?') ? path : `/${path}`;
  const q = raw.indexOf('?');
  const pathname = q === -1 ? raw : raw.slice(0, q);
  const search = q === -1 ? '' : raw.slice(q);
  if (locale === DEFAULT_LOCALE || locale === 'en') {
    return pathname + search;
  }
  return `/${locale}${pathname === '/' ? '' : pathname}${search}`;
}

/** Legacy URL segment; middleware redirects `/zh-Hant-TW/...` → `/zh-TW/...`. */
export const LEGACY_ZH_PATH_LOCALE = 'zh-Hant-TW' as const;

/** Map Accept-Language header value to a supported locale. */
export function resolveLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return DEFAULT_LOCALE;
  const tags = acceptLanguage
    .split(',')
    .map((l) => l.split(';')[0].trim().toLowerCase());
  for (const tag of tags) {
    // zh-TW, zh-Hant-TW, zh-hant-tw all map to Traditional Chinese (Taiwan)
    if (
      tag === 'zh-tw' ||
      tag === 'zh-hant-tw' ||
      tag === 'zh-hant' ||
      tag.startsWith('zh-tw-') ||
      tag.startsWith('zh-hant-tw-')
    ) {
      return 'zh-TW';
    }
    // When `zh-HK` is added to LOCALES, map e.g. zh-hk → 'zh-HK' here.
  }
  return DEFAULT_LOCALE;
}

/** Map App Router `[locale]` param (always `en` or `zh-TW` here) to Strapi i18n locale. */
export function pathLocaleToStrapiLocale(pathLocale: string): StrapiLocale {
  if (pathLocale === 'zh-TW' || pathLocale === LEGACY_ZH_PATH_LOCALE) return 'zh-Hant-TW';
  // if (pathLocale === 'zh-HK') return 'zh-Hant-HK'; // when Strapi + StrapiLocale support HK
  return 'en';
}

/** Return the HTML lang attribute value for a given locale. */
export function localeToHtmlLang(locale: Locale | typeof LEGACY_ZH_PATH_LOCALE | string): string {
  if (locale === 'zh-TW' || locale === LEGACY_ZH_PATH_LOCALE) return 'zh-TW';
  // if (locale === 'zh-HK') return 'zh-HK';
  return 'en';
}

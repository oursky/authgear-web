import type { StrapiLocale } from './strapi';

export const LOCALES = ['en', 'zh'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

/** Legacy URL segment; middleware redirects `/zh-Hant-TW/...` → `/zh/...`. */
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
      return 'zh';
    }
  }
  return DEFAULT_LOCALE;
}

/** Map URL path locale (`/en/...`, `/zh/...`) to Strapi i18n locale. */
export function pathLocaleToStrapiLocale(pathLocale: string): StrapiLocale {
  if (pathLocale === 'zh' || pathLocale === LEGACY_ZH_PATH_LOCALE) return 'zh-Hant-TW';
  return 'en';
}

/** Return the HTML lang attribute value for a given locale. */
export function localeToHtmlLang(locale: Locale | typeof LEGACY_ZH_PATH_LOCALE | string): string {
  if (locale === 'zh' || locale === LEGACY_ZH_PATH_LOCALE) return 'zh-TW';
  return 'en';
}

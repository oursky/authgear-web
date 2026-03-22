export const LOCALES = ['en', 'zh-Hant-TW'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

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
      return 'zh-Hant-TW';
    }
  }
  return DEFAULT_LOCALE;
}

/** Return the HTML lang attribute value for a given locale. */
export function localeToHtmlLang(locale: Locale): string {
  return locale === 'zh-Hant-TW' ? 'zh-TW' : 'en';
}

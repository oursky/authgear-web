/**
 * Supported locales. Default (`en`) is served at unprefixed URLs (`/pricing`);
 * Traditional Chinese is identified internally as `zh-Hant` (BCP 47 canonical
 * form, used in `<html lang>` and `hreflang`) but served at lowercase
 * `/zh-hant/...` URLs to match standard URL casing conventions.
 */
export const LOCALES = ['en', 'zh-Hant', 'ja', 'es', 'de', 'fr'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

/** URL-path prefix segment per locale. Lowercase per URL convention. */
const LOCALE_URL_SEGMENT: Record<Locale, string> = {
  en: '',
  'zh-Hant': '/zh-hant',
  ja: '/ja',
  es: '/es',
  de: '/de',
  fr: '/fr',
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
 * URLs there too. `ja` and `de` additionally have a few translated blog posts
 * under `/<locale>/post/` (`PARTIAL_LOCALE_POST_SLUGS`).
 * URL slugs are never translated: `/es/pricing/`, not `/es/precios/`.
 */
export const PARTIAL_LOCALES: readonly Locale[] = ['ja', 'es', 'de', 'fr'];

const PARTIAL_LOCALE_PATHS = ['/', '/pricing/', '/auth-toolkit/', '/schedule-demo/'] as const;
const PARTIAL_LOCALE_PATH_PREFIXES = ['/tools/'] as const;

/**
 * Pages with no Traditional Chinese twin (`src/pages/zh-hant/`), the only
 * full-coverage locale besides English: legal pages and pages aimed at UK/EU
 * buyers. zh-Hant links to, and advertises, the English page instead of a
 * prefixed URL that would 404. A partial locale can still translate such a
 * page through `PARTIAL_LOCALE_EXTRA_PATHS`. Keep in sync with `src/pages/`;
 * `i18n.test.ts` checks each entry against disk.
 */
export const NO_ZH_HANT_PATHS: readonly string[] = ['/dpa/', '/sub-processors/', '/compare/keycloak-alternative/'];

/**
 * Paths translated for some partial locales but not all of them. Each entry
 * needs a route at `src/pages/<locale>/<path>.astro`; `i18n.test.ts` checks
 * that against disk.
 */
export const PARTIAL_LOCALE_EXTRA_PATHS: Partial<Record<Locale, readonly string[]>> = {
  ja: ['/features/mcp-authentication/'],
  es: ['/solutions/data-sovereignty/', '/compare/keycloak-alternative/', '/features/mcp-authentication/'],
  de: ['/solutions/data-sovereignty/', '/compare/keycloak-alternative/', '/features/mcp-authentication/'],
  fr: ['/solutions/data-sovereignty/', '/compare/keycloak-alternative/', '/features/mcp-authentication/'],
};

function withTrailingSlash(pathname: string): string {
  if (pathname === '') return '/';
  return pathname.endsWith('/') ? pathname : pathname + '/';
}

/**
 * Blog posts translated for a partial locale, served at `/<locale>/post/<slug>/`
 * by `src/pages/<locale>/post/[slug].astro` under the same slug as the English
 * post. Keep each list in sync with `src/content/blog-posts/<locale>/`;
 * `i18n.test.ts` fails when they drift.
 */
export const PARTIAL_LOCALE_POST_SLUGS: Partial<Record<Locale, readonly string[]>> = {
  ja: [
    'how-to-implement-passkeys-developer-guide',
    'passwordless-authentication-magic-links-passkeys-otp',
    'sms-otp-vs-whatsapp-otp',
    'two-factor-authentication-cost',
    'whatsapp-api-pricing',
  ],
  de: [
    'best-self-hosted-sso-platforms-compared-authgear-vs-keycloak-vs-authentik',
    'cloud-act-login-anbieter-nutzerdaten',
    'digitale-souveraenitaet-login-identity-provider',
  ],
  fr: [
    'cloud-act-fournisseur-identite-donnees-connexion',
    'souverainete-numerique-authentification',
  ],
};

/**
 * Pages written for specific markets with no English original, where the slug
 * differs per language because each targets its own search terms. Every other
 * page shares one locale-neutral path across locales, so `hasLocalizedPage()`
 * and `localizedPath()` can just swap the URL prefix; these cannot, and each
 * entry therefore lists the full locale-neutral path per locale.
 *
 * A path listed here is advertised (hreflang, footer switcher) only to the
 * locales in its own set, so neither English nor Traditional Chinese is
 * offered a URL that would 404. A set may name a single locale: that is a page
 * written for one market with no counterpart anywhere else. Keep in sync with
 * `src/content/`; `i18n.test.ts` checks each entry against disk.
 */
export const TRANSLATION_SETS: readonly Readonly<Partial<Record<Locale, string>>>[] = [
  {
    de: '/post/cloud-act-login-anbieter-nutzerdaten/',
    fr: '/post/cloud-act-fournisseur-identite-donnees-connexion/',
  },
  // The two digital-sovereignty guides are separate articles, not translations
  // of one another: each is built on its own country's policy and standards
  // (SecNumCloud for France, BSI C5 and C3A for Germany). They are listed
  // individually so neither advertises the other as its alternate.
  { fr: '/post/souverainete-numerique-authentification/' },
  { de: '/post/digitale-souveraenitaet-login-identity-provider/' },
];

/** The translation set this locale-neutral path belongs to, if any. */
function translationSetFor(pathname: string): Readonly<Partial<Record<Locale, string>>> | undefined {
  const path = withTrailingSlash(pathname);
  return TRANSLATION_SETS.find((set) => Object.values(set).includes(path));
}

function isTranslatedPostPath(locale: string, pathname: string): boolean {
  const match = withTrailingSlash(pathname).match(/^\/post\/([^/]+)\/$/);
  return match !== null && (PARTIAL_LOCALE_POST_SLUGS[locale as Locale]?.includes(match[1]) ?? false);
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
  // Market-specific pages exist only in the locales of their own set — English
  // included, which is why this runs before the default-locale shortcut.
  const set = translationSetFor(pathname);
  if (set) return set[locale as Locale] !== undefined;
  if (locale === DEFAULT_LOCALE) return true;
  const path = withTrailingSlash(pathname);
  if (!PARTIAL_LOCALES.includes(locale as Locale)) return !NO_ZH_HANT_PATHS.includes(path);
  if (isPartialLocalePath(pathname)) return true;
  if (PARTIAL_LOCALE_EXTRA_PATHS[locale as Locale]?.includes(path)) return true;
  if (isTranslatedPostPath(locale, pathname)) return true;
  return false;
}

/**
 * Locales that can be offered as alternates for a page, both to search
 * engines (hreflang) and to people (the footer switcher). Full-coverage
 * locales everywhere except `NO_ZH_HANT_PATHS`; partial locales only on the
 * paths they all translate, so nobody is pointed at a URL that would
 * redirect or 404.
 */
export function localesWithPage(pathname: string): Locale[] {
  return LOCALES.filter((loc) => hasLocalizedPage(loc, pathname));
}

/** A locale that has this page, with the locale-neutral path it lives at. */
export type LocaleAlternate = { locale: Locale; path: string };

/**
 * Every locale version of a page, as locale/path pairs. Used for `hreflang`
 * alternates and the footer language switcher. For an ordinary page each
 * locale shares the same path; for a `TRANSLATION_SETS` page each locale
 * carries its own slug.
 */
export function localeAlternates(pathname: string): LocaleAlternate[] {
  const set = translationSetFor(pathname);
  if (set) {
    return LOCALES.filter((loc) => set[loc] !== undefined).map((loc) => ({ locale: loc, path: set[loc]! }));
  }
  const path = withTrailingSlash(pathname);
  return localesWithPage(path).map((loc) => ({ locale: loc, path }));
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
  // Within a translation set the slug differs per locale, so swap the whole
  // path rather than just the prefix. A locale with no version in the set has
  // nowhere to go, so the path is left untouched for the caller to handle.
  const set = translationSetFor(normalized);
  if (set) {
    const target = set[locale as Locale];
    if (!target) return normalized + search;
    return `${LOCALE_URL_SEGMENT[locale as Locale] ?? ''}${target}${search}`;
  }
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
    if (tag === 'fr' || tag.startsWith('fr-')) {
      return 'fr';
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
  if (locale === 'fr') return 'fr';
  // if (locale === 'zh-HK') return 'zh-HK';
  return 'en';
}

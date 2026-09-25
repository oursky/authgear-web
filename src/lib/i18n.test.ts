import { describe, it, expect } from 'vitest';
import {
  LOCALES,
  PARTIAL_LOCALES,
  localizedPath,
  stripLocaleSegment,
  hasLocalizedPage,
  localesWithPage,
  localeToHtmlLang,
  resolveLocale,
} from './i18n';

describe('partial locales (es, de, ja)', () => {
  it('are registered with their own URL segment', () => {
    expect(LOCALES).toContain('es');
    expect(LOCALES).toContain('de');
    expect(LOCALES).toContain('fr');
    expect(localizedPath('es', '/')).toBe('/es/');
    expect(localizedPath('de', '/')).toBe('/de/');
    expect(localizedPath('ja', '/')).toBe('/ja/');
    expect(localizedPath('fr', '/')).toBe('/fr/');
  });

  it('keep their translated pages: home, pricing, toolkit hub, every tool', () => {
    for (const loc of PARTIAL_LOCALES) {
      expect(localizedPath(loc, '/pricing')).toBe(`/${loc}/pricing/`);
      expect(localizedPath(loc, '/schedule-demo')).toBe(`/${loc}/schedule-demo/`);
      expect(localizedPath(loc, '/auth-toolkit/')).toBe(`/${loc}/auth-toolkit/`);
      expect(localizedPath(loc, '/tools/jwt-jwe-debugger')).toBe(`/${loc}/tools/jwt-jwe-debugger/`);
    }
  });

  it('send every untranslated path to the English page', () => {
    for (const loc of PARTIAL_LOCALES) {
      expect(localizedPath(loc, '/about')).toBe('/about/');
      expect(localizedPath(loc, '/tools/')).toBe('/tools/');
      expect(localizedPath(loc, '/blog?category=x')).toBe('/blog/?category=x');
    }
  });

  it('keep translated Japanese blog posts under /ja/', () => {
    expect(localizedPath('ja', '/post/sms-otp-vs-whatsapp-otp')).toBe('/ja/post/sms-otp-vs-whatsapp-otp/');
    expect(localizedPath('ja', '/post/some-untranslated-slug')).toBe('/post/some-untranslated-slug/');
    expect(hasLocalizedPage('ja', '/post/sms-otp-vs-whatsapp-otp/')).toBe(true);
    expect(hasLocalizedPage('ja', '/post/some-untranslated-slug/')).toBe(false);
    expect(hasLocalizedPage('es', '/post/sms-otp-vs-whatsapp-otp/')).toBe(false);
  });

  it('leave full-coverage locales untouched', () => {
    expect(localizedPath('zh-Hant', '/pricing')).toBe('/zh-hant/pricing/');
    expect(localizedPath('en', '/pricing')).toBe('/pricing/');
  });

  it('are offered as alternates only on translated paths', () => {
    expect(localesWithPage('/')).toEqual([...LOCALES]);
    expect(localesWithPage('/pricing/')).toEqual([...LOCALES]);
    expect(localesWithPage('/tools/ssl-checker/')).toEqual([...LOCALES]);
    expect(localesWithPage('/about/')).toEqual(['en', 'zh-Hant']);
    expect(localesWithPage('/post/x/')).toEqual(['en', 'zh-Hant']);
  });

  it('strip their URL segment', () => {
    expect(stripLocaleSegment('/es/')).toBe('/');
    expect(stripLocaleSegment('/de')).toBe('/');
    expect(stripLocaleSegment('/ja/post/x/')).toBe('/post/x/');
  });

  it('map to html lang and Accept-Language', () => {
    expect(localeToHtmlLang('es')).toBe('es');
    expect(localeToHtmlLang('de')).toBe('de');
    expect(resolveLocale('es-MX,es;q=0.9')).toBe('es');
    expect(resolveLocale('de-CH')).toBe('de');
    expect(resolveLocale('fr-BE,fr;q=0.9')).toBe('fr');
    expect(localeToHtmlLang('fr')).toBe('fr');
    expect(resolveLocale('it')).toBe('en');
  });
});

import { readdirSync } from 'node:fs';
import { JA_POST_SLUGS } from './i18n';

describe('JA_POST_SLUGS', () => {
  it('matches the Japanese blog posts on disk', () => {
    const onDisk = readdirSync(new URL('../content/blog-posts/ja/', import.meta.url), { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort();
    expect([...JA_POST_SLUGS].sort()).toEqual(onDisk);
  });

  it('only advertises ja on translated posts', () => {
    expect(localesWithPage('/post/sms-otp-vs-whatsapp-otp/')).toEqual(['en', 'zh-Hant', 'ja']);
    expect(localesWithPage('/post/some-untranslated-slug/')).toEqual(['en', 'zh-Hant']);
  });
});

import { existsSync } from 'node:fs';
import { NO_ZH_HANT_PATHS, PARTIAL_LOCALE_EXTRA_PATHS } from './i18n';

describe('NO_ZH_HANT_PATHS', () => {
  it('each has an English route (static file or dynamic sibling) and no zh-hant route on disk', () => {
    for (const path of NO_ZH_HANT_PATHS) {
      const slug = path.replace(/^\//, '').replace(/\/$/, '');
      const dir = slug.includes('/') ? slug.slice(0, slug.lastIndexOf('/')) + '/' : '';
      const enStatic = existsSync(new URL(`../pages/${slug}.astro`, import.meta.url));
      const enDynamic = existsSync(new URL(`../pages/${dir}[slug].astro`, import.meta.url));
      expect(enStatic || enDynamic, `English route for ${path}`).toBe(true);
      expect(existsSync(new URL(`../pages/zh-hant/${slug}.astro`, import.meta.url)), `src/pages/zh-hant/${slug}.astro`).toBe(false);
    }
  });

  it('never link to or advertise a zh-Hant page', () => {
    for (const path of NO_ZH_HANT_PATHS) {
      expect(hasLocalizedPage('en', path)).toBe(true);
      expect(hasLocalizedPage('zh-Hant', path)).toBe(false);
      expect(localesWithPage(path)).not.toContain('zh-Hant');
      expect(localizedPath('zh-Hant', path)).toBe(path);
    }
    expect(localizedPath('zh-Hant', '/dpa')).toBe('/dpa/');
    expect(localizedPath('zh-Hant', '/about')).toBe('/zh-hant/about/');
  });

  it('legal pages are English only; the Keycloak page adds de and fr', () => {
    for (const path of ['/dpa/', '/sub-processors/']) {
      expect(localesWithPage(path)).toEqual(['en']);
      expect(localizedPath('de', path)).toBe(path);
    }
    const keycloak = '/compare/keycloak-alternative/';
    expect(localesWithPage(keycloak)).toEqual(['en', 'de', 'fr']);
    expect(hasLocalizedPage('es', keycloak)).toBe(false);
    expect(hasLocalizedPage('ja', keycloak)).toBe(false);
    expect(localizedPath('de', '/compare/keycloak-alternative')).toBe('/de/compare/keycloak-alternative/');
    expect(localizedPath('fr', '/compare/keycloak-alternative')).toBe('/fr/compare/keycloak-alternative/');
    expect(localizedPath('es', '/compare/keycloak-alternative')).toBe('/compare/keycloak-alternative/');
    expect(localizedPath('zh-Hant', '/compare/keycloak-alternative')).toBe('/compare/keycloak-alternative/');
  });
});

describe('PARTIAL_LOCALE_EXTRA_PATHS', () => {
  it('each has a route on disk for that locale', () => {
    for (const [loc, paths] of Object.entries(PARTIAL_LOCALE_EXTRA_PATHS)) {
      for (const path of paths ?? []) {
        const slug = path.replace(/^\//, '').replace(/\/$/, '');
        expect(existsSync(new URL(`../pages/${loc}/${slug}.astro`, import.meta.url)), `src/pages/${loc}/${slug}.astro`).toBe(true);
      }
    }
  });

  it('advertise and link the page only for the locales that translate it', () => {
    const path = '/solutions/data-sovereignty/';
    expect(hasLocalizedPage('es', path)).toBe(true);
    expect(hasLocalizedPage('de', path)).toBe(true);
    expect(hasLocalizedPage('ja', path)).toBe(false);
    expect(hasLocalizedPage('zh-Hant', path)).toBe(true);
    expect(hasLocalizedPage('fr', path)).toBe(true);
    expect(localesWithPage(path)).toEqual(['en', 'zh-Hant', 'es', 'de', 'fr']);
    expect(localizedPath('de', '/solutions/data-sovereignty')).toBe('/de/solutions/data-sovereignty/');
    expect(localizedPath('es', '/solutions/data-sovereignty')).toBe('/es/solutions/data-sovereignty/');
    expect(localizedPath('fr', '/solutions/data-sovereignty')).toBe('/fr/solutions/data-sovereignty/');
    expect(localizedPath('ja', '/solutions/data-sovereignty')).toBe('/solutions/data-sovereignty/');
    expect(localizedPath('zh-Hant', '/solutions/data-sovereignty')).toBe('/zh-hant/solutions/data-sovereignty/');
  });
});

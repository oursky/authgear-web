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
    expect(localizedPath('es', '/')).toBe('/es/');
    expect(localizedPath('de', '/')).toBe('/de/');
    expect(localizedPath('ja', '/')).toBe('/ja/');
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
    expect(resolveLocale('fr')).toBe('en');
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

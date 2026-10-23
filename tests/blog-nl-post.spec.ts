import { test, expect } from '@playwright/test';

// Dutch is a blog-only locale (BLOG_ONLY_LOCALES in src/lib/i18n.ts): it has
// posts under /nl/post/<slug>/ and nothing else, no home page, pricing or
// tools. The one post is written for the Dutch market with no English
// original, so it is its own single-locale entry in TRANSLATION_SETS and
// advertises only itself. Every other link on the page goes to English.
const NL_POST = '/nl/post/digitale-soevereiniteit-inloggen/';

const hreflangs = async (page: import('@playwright/test').Page) =>
  (await page.locator('link[rel="alternate"][hreflang]').evaluateAll((els) =>
    els.map((el) => [el.getAttribute('hreflang') ?? '', el.getAttribute('href') ?? '']),
  )).sort(([a], [b]) => a.localeCompare(b));

test.describe('Dutch blog post', () => {
  test(`${NL_POST} renders the Dutch post`, async ({ page }) => {
    const resp = await page.goto(NL_POST);
    expect(resp?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', 'nl');
    await expect(page.locator('main h1')).toContainText('Digitale soevereiniteit en inloggen');
    await expect(page.locator('.blog-post__updated')).toContainText('Laatst bijgewerkt');
    await expect(page.locator('.blog-post__cover-img')).toBeVisible();
    await expect(page.locator('.blog-post__body h2').filter({ hasText: 'Veelgestelde vragen' })).toHaveCount(1);
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute('content', 'nl_NL');
    await expect(page.locator('footer').first()).toBeVisible();
  });

  test('Dutch post emits Article and FAQPage JSON-LD', async ({ page }) => {
    await page.goto(NL_POST);
    const types = await page.locator('script[type="application/ld+json"]').evaluateAll((els) =>
      els.map((el) => {
        try {
          return JSON.parse(el.textContent ?? '')['@type'] as string;
        } catch {
          return null;
        }
      }),
    );
    expect(types).toContain('Article');
    expect(types).toContain('FAQPage');
  });

  test('advertises only itself, with no x-default', async ({ page }) => {
    await page.goto(NL_POST);
    const alts = await hreflangs(page);
    expect(alts.map(([lang]) => lang)).toEqual(['nl']);
    expect(new URL(alts[0][1]).pathname).toBe(NL_POST);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(new URL(canonical ?? '').pathname).toBe(NL_POST);
  });

  test('footer switcher offers no other language', async ({ page }) => {
    await page.goto(NL_POST);
    const opts = page.locator('footer .ds-lang-switcher__option');
    await expect(opts).toHaveCount(1);
    await expect(opts.first()).toHaveAttribute('href', NL_POST);
  });

  test('every other link on the page points at English URLs', async ({ page }) => {
    await page.goto(NL_POST);
    const hrefs = await page.locator('a[href^="/"]').evaluateAll((els) =>
      els.map((el) => el.getAttribute('href') ?? ''),
    );
    expect(hrefs.length).toBeGreaterThan(0);
    expect(hrefs.filter((href) => href.startsWith('/nl/') && href !== NL_POST)).toEqual([]);
    await expect(page.locator('.blog-post__body a[href="/solutions/data-sovereignty"]').first()).toBeVisible();
  });

  test('other pages never advertise the Dutch post', async ({ page }) => {
    for (const url of ['/de/post/digitale-souveraenitaet-login-identity-provider/', '/pricing/', '/']) {
      await page.goto(url);
      expect((await hreflangs(page)).map(([lang]) => lang), url).not.toContain('nl');
    }
  });

  for (const path of ['/', '/pricing/', '/post/sms-otp-vs-whatsapp-otp/']) {
    test(`/nl${path} falls back to the English page`, async ({ request }) => {
      const resp = await request.get(`/nl${path}`, { maxRedirects: 0 });
      expect(resp.status()).toBe(302);
      expect(new URL(resp.headers()['location'], 'http://localhost').pathname).toBe(path);
    });
  }

  test('a Dutch browser still gets the English home page', async ({ browser }) => {
    const context = await browser.newContext({ locale: 'nl-NL', extraHTTPHeaders: { 'Accept-Language': 'nl-NL,nl;q=0.9' } });
    const page = await context.newPage();
    const resp = await page.goto('/');
    expect(resp?.status()).toBe(200);
    expect(new URL(page.url()).pathname).toBe('/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await context.close();
  });
});

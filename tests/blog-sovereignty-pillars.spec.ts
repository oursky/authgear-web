import { test, expect } from '@playwright/test';

// Two digital-sovereignty pillar guides, each written for one market and
// published in that language only: French on souveraineté numérique, German on
// digitale Souveränität. They are separate articles rather than translations of
// one another, so each is its own single-locale entry in TRANSLATION_SETS
// (src/lib/i18n.ts) and neither advertises the other, English or zh-Hant.
const POSTS = [
  {
    lang: 'fr',
    url: '/fr/post/souverainete-numerique-authentification/',
    h1: 'Souveraineté numérique',
    faq: 'Questions fréquentes',
    updated: 'Dernière mise à jour',
    links: ['/fr/solutions/data-sovereignty', '/fr/compare/keycloak-alternative', '/fr/schedule-demo', '/dpa'],
  },
  {
    lang: 'de',
    url: '/de/post/digitale-souveraenitaet-login-identity-provider/',
    h1: 'Digitale Souveränität',
    faq: 'Häufige Fragen',
    updated: 'Zuletzt aktualisiert',
    links: ['/de/solutions/data-sovereignty', '/de/compare/keycloak-alternative', '/de/schedule-demo', '/sub-processors'],
  },
] as const;

const hreflangs = async (page: import('@playwright/test').Page) =>
  (await page.locator('link[rel="alternate"][hreflang]').evaluateAll((els) =>
    els.map((el) => el.getAttribute('hreflang') ?? ''),
  )).sort();

for (const post of POSTS) {
  test.describe(`sovereignty pillar (${post.lang})`, () => {
    test('renders in its own language', async ({ page }) => {
      const resp = await page.goto(post.url);
      expect(resp?.status()).toBe(200);
      await expect(page.locator('html')).toHaveAttribute('lang', post.lang);
      await expect(page.locator('main h1')).toContainText(post.h1);
      await expect(page.locator('.blog-post__updated')).toContainText(post.updated);
      await expect(page.locator('.blog-post__cover-img')).toBeVisible();
      await expect(page.locator('.blog-post__body h2').filter({ hasText: post.faq })).toHaveCount(1);
    });

    test('links to its localised pages', async ({ page }) => {
      await page.goto(post.url);
      const body = page.locator('.blog-post__body');
      for (const href of post.links) {
        await expect(body.locator(`a[href="${href}"]`), href).toHaveCount(
          href.endsWith('data-sovereignty') ? 2 : 1,
        );
      }
    });

    test('emits Article and FAQPage JSON-LD', async ({ page }) => {
      await page.goto(post.url);
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

    test('advertises its own language only, with no x-default', async ({ page }) => {
      await page.goto(post.url);
      expect(await hreflangs(page)).toEqual([post.lang]);
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      expect(new URL(canonical ?? '').pathname).toBe(post.url);
    });

    test('footer switcher offers no other language', async ({ page }) => {
      await page.goto(post.url);
      const opts = page.locator('footer .ds-lang-switcher__option');
      await expect(opts).toHaveCount(1);
      await expect(opts.first()).toHaveAttribute('href', post.url);
    });
  });
}

test('the French guide uses narrow no-break spaces before French punctuation', async ({ page }) => {
  await page.goto(POSTS[0].url);
  const h1 = (await page.locator('main h1').textContent()) ?? '';
  // U+202F NARROW NO-BREAK SPACE is the house standard before `: ; ? !` and
  // inside guillemets — not U+00A0, which reads too wide at body sizes.
  expect(h1).toContain('\u202f:');
  const body = (await page.locator('.blog-post__body').textContent()) ?? '';
  // Neither an ordinary space nor a full-width no-break space may precede
  // French double punctuation.
  expect(body).not.toMatch(/\S[ \u00a0][:;?!]/);
});

import { test, expect } from '@playwright/test';

// German market test: one blog post is translated under /de/post/<slug>/ with
// the same slug as the English post (src/content/blog-posts/de/). The slug is
// registered in PARTIAL_LOCALE_POST_SLUGS (src/lib/i18n.ts), which drives the
// hreflang set and the footer language switcher on both pages.
const SLUG = 'best-self-hosted-sso-platforms-compared-authgear-vs-keycloak-vs-authentik';
const EN_POST = `/post/${SLUG}/`;
const DE_POST = `/de/post/${SLUG}/`;

const hreflangs = async (page: import('@playwright/test').Page) =>
  (await page.locator('link[rel="alternate"][hreflang]').evaluateAll((els) =>
    els.map((el) => [el.getAttribute('hreflang') ?? '', el.getAttribute('href') ?? '']),
  )).sort(([a], [b]) => a.localeCompare(b));

test.describe('German blog post', () => {
  test(`${DE_POST} renders the German post`, async ({ page }) => {
    const resp = await page.goto(DE_POST);
    expect(resp?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', 'de');
    await expect(page.locator('main h1')).toContainText('Authentik vs. Keycloak');
    await expect(page.locator('.blog-post__updated')).toContainText('Zuletzt aktualisiert');
    await expect(page.locator('.blog-post__cover-img')).toBeVisible();
    await expect(page.locator('.blog-post__body h2').filter({ hasText: 'Häufig gestellte Fragen' })).toHaveCount(1);
    await expect(page.locator('footer').first()).toBeVisible();
  });

  test('German post links to the German product pages and the English related posts', async ({ page }) => {
    await page.goto(DE_POST);
    const body = page.locator('.blog-post__body');
    await expect(body.locator('a[href="/de/solutions/data-sovereignty"]')).toHaveCount(1);
    await expect(body.locator('a[href="/de/compare/keycloak-alternative"]')).toHaveCount(1);
    await expect(body.locator('a[href="/de/schedule-demo"]')).toHaveCount(1);
    await expect(body.locator('a[href="/post/oidc-vs-saml"]')).toHaveCount(1);
  });

  test('German post emits Article and FAQPage JSON-LD', async ({ page }) => {
    await page.goto(DE_POST);
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

  test('English and German posts advertise each other in hreflang', async ({ page }) => {
    await page.goto(EN_POST);
    const en = await hreflangs(page);
    expect(en.map(([lang]) => lang)).toEqual(['de', 'en', 'x-default', 'zh-Hant']);
    expect(new URL(en.find(([lang]) => lang === 'de')![1]).pathname).toBe(DE_POST);

    await page.goto(DE_POST);
    const de = await hreflangs(page);
    expect(de.map(([lang]) => lang)).toEqual(['de', 'en', 'x-default', 'zh-Hant']);
    expect(new URL(de.find(([lang]) => lang === 'en')![1]).pathname).toBe(EN_POST);
    expect(new URL(de.find(([lang]) => lang === 'x-default')![1]).pathname).toBe(EN_POST);
  });

  test('footer language switcher pairs the two posts', async ({ page }) => {
    await page.goto(EN_POST);
    await expect(page.locator(`footer a[href="${DE_POST}"]`)).toHaveCount(1);
    await page.goto(DE_POST);
    await expect(page.locator(`footer a[href="${EN_POST}"]`)).toHaveCount(1);
  });

  test('a post without a German translation does not advertise de', async ({ page }) => {
    await page.goto('/post/sms-otp-vs-whatsapp-otp/');
    expect((await hreflangs(page)).map(([lang]) => lang)).toEqual(['en', 'ja', 'x-default', 'zh-Hant']);
    await expect(page.locator('footer a[href^="/de/post/"]')).toHaveCount(0);
  });

  test('an untranslated post under /de/ falls back to the English page', async ({ request }) => {
    const resp = await request.get('/de/post/sms-otp-vs-whatsapp-otp/', { maxRedirects: 0 });
    expect(resp.status()).toBe(302);
    expect(new URL(resp.headers()['location'], 'http://localhost').pathname).toBe('/post/sms-otp-vs-whatsapp-otp/');
  });
});

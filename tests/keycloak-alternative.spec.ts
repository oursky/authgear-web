import { test, expect } from '@playwright/test';

const PATH = '/compare/keycloak-alternative/';

test.describe('/compare/keycloak-alternative', () => {
  test('renders in English with hero, logo strip and footer', async ({ page }) => {
    const resp = await page.goto(PATH);
    expect(resp?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page).toHaveTitle('Keycloak Alternative: Open Source, Self-Hosted or Managed');
    await expect(page.locator('main h1')).toHaveText('Authgear: the open-source Keycloak alternative');
    await expect(page.locator('.logo-section img')).toHaveCount(6);
    await expect(page.locator('footer').first()).toBeVisible();
  });

  test('comparison table has ten rows and the LDAP row is a tie with no text', async ({ page }) => {
    await page.goto(PATH);
    const table = page.locator('[data-compare-table]');
    await table.scrollIntoViewIfNeeded();
    await expect(table.locator('.table-content')).toHaveCount(10);
    const ldap = table.locator('[data-row="ldap"]');
    await expect(ldap.locator('img')).toHaveCount(2);
    await expect(ldap.locator('.table-text:not(.title), .compare-table-text-light')).toHaveCount(0);
    const magic = table.locator('[data-row="magic-link"]');
    await expect(magic.locator('.compare-table-text-light')).toHaveText('Via community extensions');
  });

  test('sovereignty callout links to the data-sovereignty page; FAQ shows six answers', async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator('[data-sovereignty-callout] a')).toHaveAttribute('href', '/solutions/data-sovereignty/');
    await expect(page.locator('.faq-list__item')).toHaveCount(6);
    const ld = await page.locator('script[type="application/ld+json"]').evaluateAll((els) => els.map((el) => el.textContent ?? ''));
    expect(ld.some((s) => s.includes('"FAQPage"'))).toBe(true);
  });

  test('CTAs carry the analytics tags and the demo links', async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator('.plausible-event-location--keycloak-alternative-hero')).toHaveCount(2);
    await expect(page.locator('.plausible-event-location--keycloak-alternative-migrate')).toHaveCount(2);
    await expect(page.locator('a.plausible-event-name--get-demo').first()).toHaveAttribute('href', '/schedule-demo/');
  });

  for (const { prefix, lang, h1 } of [
    { prefix: '/de', lang: 'de', h1: 'Authgear: die Open-Source-Alternative zu Keycloak' },
    { prefix: '/fr', lang: 'fr', h1: "Authgear\u00a0: l'alternative open source à Keycloak" },
  ]) {
    test(`${prefix}${PATH} is translated (lang=${lang})`, async ({ page }) => {
      const resp = await page.goto(`${prefix}${PATH}`);
      expect(resp?.status()).toBe(200);
      await expect(page.locator('html')).toHaveAttribute('lang', lang);
      await expect(page.locator('main h1')).toHaveText(h1);
      await expect(page.locator('[data-sovereignty-callout] a')).toHaveAttribute('href', `${prefix}/solutions/data-sovereignty/`);
    });
  }

  test('advertises en, de and fr only', async ({ page }) => {
    await page.goto(PATH);
    const langs = (await page.locator('link[rel="alternate"][hreflang]').evaluateAll((els) =>
      els.map((el) => el.getAttribute('hreflang')),
    )).sort();
    expect(langs).toEqual(['de', 'en', 'fr', 'x-default']);
  });

  test('other locales fall back to the English page', async ({ request }) => {
    for (const prefix of ['/es', '/ja']) {
      const resp = await request.get(`${prefix}${PATH}`, { maxRedirects: 0 });
      expect(resp.status(), prefix).toBe(302);
      expect(new URL(resp.headers()['location'], 'http://localhost').pathname).toBe(PATH);
    }
    const zh = await request.get(`/zh-hant${PATH}`, { maxRedirects: 0 });
    expect(zh.status()).toBe(404);
  });
});

import { test, expect } from '@playwright/test';

test.describe('home page renders', () => {
  test('en: root serves English home', async ({ page }) => {
    const resp = await page.goto('/');
    expect(resp?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('nav, [role=navigation]').first()).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('zh-Hant: /zh-hant/ serves Traditional Chinese home', async ({ page }) => {
    const resp = await page.goto('/zh-hant/');
    expect(resp?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', 'zh-Hant');
  });
});

test.describe('legacy redirects', () => {
  // Legacy locale prefixes 301 to /zh-hant/ via forced rules in
  // public/_redirects (emulated by the Netlify adapter in dev). The
  // location header may be absolute, so compare pathnames.
  for (const legacy of ['/zh/', '/zh-TW/', '/zh-Hant-TW/']) {
    test(`${legacy} → /zh-hant/ (301)`, async ({ request }) => {
      const resp = await request.get(legacy, { maxRedirects: 0 });
      expect(resp.status()).toBe(301);
      const location = resp.headers()['location'] ?? '';
      expect(new URL(location, 'http://localhost').pathname).toBe('/zh-hant/');
    });
  }
});

test.describe('analytics scripts', () => {
  test('GTM script tag renders when PUBLIC_GTM_ID is set', async ({ page }) => {
    // playwright.config.ts sets PUBLIC_GTM_ID=GTM-TEST0000 for the webServer build.
    await page.goto('/');
    const content = await page.content();
    expect(content).toContain('GTM-TEST0000');
  });
});

import { test, expect } from '@playwright/test';

test.describe('home page renders', () => {
  test('en: root serves English home', async ({ page }) => {
    const resp = await page.goto('/');
    expect(resp?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('nav, [role=navigation]').first()).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('zh-TW: /zh-TW/ serves Traditional Chinese home', async ({ page }) => {
    const resp = await page.goto('/zh-TW/');
    expect(resp?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', 'zh-TW');
  });
});

test.describe('legacy redirects', () => {
  test('/zh/ → /zh-TW/ (308)', async ({ request }) => {
    const resp = await request.get('/zh/', { maxRedirects: 0 });
    expect(resp.status()).toBe(308);
    expect(resp.headers()['location']).toBe('/zh-TW/');
  });

  test('/zh-Hant-TW/ → /zh-TW/ (308)', async ({ request }) => {
    const resp = await request.get('/zh-Hant-TW/', { maxRedirects: 0 });
    expect(resp.status()).toBe(308);
    expect(resp.headers()['location']).toBe('/zh-TW/');
  });
});

test.describe('analytics scripts', () => {
  test('GTM script tag renders when PUBLIC_GTM_ID is set', async ({ page }) => {
    // playwright.config.ts sets PUBLIC_GTM_ID=GTM-TEST0000 for the webServer build.
    await page.goto('/');
    const content = await page.content();
    expect(content).toContain('GTM-TEST0000');
  });
});

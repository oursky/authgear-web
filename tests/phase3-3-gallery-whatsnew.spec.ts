import { test, expect } from '@playwright/test';

test.describe('Phase 3-3: /login-gallery + /whats-new', () => {
  test('/login-gallery returns 200 with lang=en', async ({ page }) => {
    const resp = await page.goto('/login-gallery');
    expect(resp?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });

  test('/zh-TW/login-gallery returns 200 with lang=zh-TW', async ({ page }) => {
    const resp = await page.goto('/zh-TW/login-gallery');
    expect(resp?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', 'zh-TW');
  });

  test('/whats-new returns 200 with lang=en', async ({ page }) => {
    const resp = await page.goto('/whats-new');
    expect(resp?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });

  test('/zh-TW/whats-new returns 200 with lang=zh-TW', async ({ page }) => {
    const resp = await page.goto('/zh-TW/whats-new');
    expect(resp?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', 'zh-TW');
  });

  test('/whats-new cache-control contains s-maxage=60', async ({ request }) => {
    const resp = await request.get('/whats-new');
    expect(resp.status()).toBe(200);
    const cc = resp.headers()['cache-control'] ?? '';
    expect(cc).toContain('s-maxage=60');
  });
});

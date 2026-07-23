import { test, expect } from '@playwright/test';

test.describe('Phase 3-3: /login-gallery + /whats-new', () => {
  test('/login-gallery/ returns 200 with lang=en', async ({ page }) => {
    const resp = await page.goto('/login-gallery/');
    expect(resp?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });

  test('/zh-hant/login-gallery/ returns 200 with lang=zh-Hant', async ({ page }) => {
    const resp = await page.goto('/zh-hant/login-gallery/');
    expect(resp?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', 'zh-Hant');
  });

  test('/whats-new/ returns 200 with lang=en', async ({ page }) => {
    const resp = await page.goto('/whats-new/');
    expect(resp?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });

  test('/zh-hant/whats-new/ returns 200 with lang=zh-Hant', async ({ page }) => {
    const resp = await page.goto('/zh-hant/whats-new/');
    expect(resp?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', 'zh-Hant');
  });

  test('/whats-new/ cache-control enables CDN caching', async ({ request }) => {
    const resp = await request.get('/whats-new/');
    expect(resp.status()).toBe(200);
    // Site-wide CDN cache policy comes from netlify.toml; assert caching is
    // enabled without pinning the tunable duration.
    const cc = resp.headers()['cache-control'] ?? '';
    expect(cc).toMatch(/s-maxage=\d+/);
  });
});

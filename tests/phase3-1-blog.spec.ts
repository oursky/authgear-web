import { test, expect } from '@playwright/test';

test.describe('Phase 3-1: /blog', () => {
  test('/blog listing returns 200 with lang=en', async ({ page }) => {
    const resp = await page.goto('/blog/');
    expect(resp?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('footer').first()).toBeVisible();
  });

  test('/zh-hant/blog listing returns 200 with lang=zh-Hant', async ({ page }) => {
    const resp = await page.goto('/zh-hant/blog/');
    expect(resp?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', 'zh-Hant');
  });

  test('/blog cache-control enables CDN caching', async ({ request }) => {
    const resp = await request.get('/blog/');
    expect(resp.status()).toBe(200);
    const cc = resp.headers()['cache-control'] ?? '';
    expect(cc).toMatch(/s-maxage=\d+/);
    expect(cc).toContain('stale-while-revalidate');
  });
});

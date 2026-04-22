import { test, expect } from '@playwright/test';

test.describe('Phase 2e-1: /once', () => {
  test('/once returns 200 with lang=en', async ({ page }) => {
    const resp = await page.goto('/once');
    expect(resp?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('footer').first()).toBeVisible();
  });

  test('/zh-TW/once returns 200 with lang=zh-TW', async ({ page }) => {
    const resp = await page.goto('/zh-TW/once');
    expect(resp?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', 'zh-TW');
  });

  test('SDK framework tabs switch visible code on click', async ({ page }) => {
    await page.goto('/once');
    const reactTab = page.locator('[data-once-sdk="react"]').first();
    const vueTab = page.locator('[data-once-sdk="vue"]').first();
    const reactPanel = page.locator('[data-once-panel="react"]');
    const vuePanel = page.locator('[data-once-panel="vue"]');

    await reactTab.scrollIntoViewIfNeeded();
    await expect(reactTab).toBeVisible();
    await expect(vueTab).toBeVisible();

    // Wait for the React island (client:idle) to hydrate: it calls setActive('react') on
    // mount, which sets all non-react panels to display:none.
    await expect(vuePanel).toHaveCSS('display', 'none');

    await vueTab.click();
    await expect(vuePanel).toBeVisible();
    await expect(reactPanel).toHaveCSS('display', 'none');
  });
});

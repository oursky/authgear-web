import { test, expect } from '@playwright/test';

test.describe('Phase 2e-2: /pricing', () => {
  test('/pricing returns 200 with lang=en', async ({ page }) => {
    const resp = await page.goto('/pricing');
    expect(resp?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('footer').first()).toBeVisible();
  });

  test('/zh-TW/pricing returns 200 with lang=zh-TW', async ({ page }) => {
    const resp = await page.goto('/zh-TW/pricing');
    expect(resp?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', 'zh-TW');
  });

  test('Pricing page hydrates — Cloud/Once tab switcher toggles', async ({ page }) => {
    await page.goto('/pricing');
    const onceTab = page.getByRole('button', { name: /on your server|ONCE/i }).first();
    const cloudTab = page.getByRole('button', { name: /on the cloud|cloud/i }).first();
    await onceTab.scrollIntoViewIfNeeded();
    await expect(onceTab).toBeVisible();
    await expect(cloudTab).toBeVisible();
    await onceTab.click();
    await cloudTab.click();
    await expect(cloudTab).toBeVisible();
  });

  test('Pricing FAQ accordion items exist and toggle', async ({ page }) => {
    await page.goto('/pricing');
    const firstFaq = page.locator('button[aria-expanded]').first();
    await firstFaq.scrollIntoViewIfNeeded();
    await expect(firstFaq).toBeVisible();
    const before = await firstFaq.getAttribute('aria-expanded');
    await firstFaq.click();
    const after = await firstFaq.getAttribute('aria-expanded');
    expect(after).not.toBe(before);
  });
});

import { test, expect } from '@playwright/test';

const SLUGS = [
  'auth0-alternative',
  'cognito-alternative',
  'firebase-alternative',
  'okta-alternative',
] as const;

test.describe('Phase 2c-1: compare/[slug] — en', () => {
  for (const slug of SLUGS) {
    test(`/compare/${slug} returns 200 with lang=en`, async ({ page }) => {
      const resp = await page.goto(`/compare/${slug}/`);
      expect(resp?.status()).toBe(200);
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
      await expect(page.locator('footer').first()).toBeVisible();
    });
  }
});

test.describe('Phase 2c-1: compare/[slug] — zh-Hant', () => {
  for (const slug of SLUGS) {
    test(`/zh-hant/compare/${slug} returns 200 with lang=zh-Hant`, async ({ page }) => {
      const resp = await page.goto(`/zh-hant/compare/${slug}/`);
      expect(resp?.status()).toBe(200);
      await expect(page.locator('html')).toHaveAttribute('lang', 'zh-Hant');
      await expect(page.locator('footer').first()).toBeVisible();
    });
  }
});

import { test, expect } from '@playwright/test';

const SLUGS = [
  'base64-decode-encode',
  'hmac-signature-generator-verifier',
  'jwk-generator',
  'jwt-jwe-debugger',
  'oidc-discovery-endpoint',
  'password-hash-generator',
  'ssl-checker',
  'totp-authenticator',
  'uuidv7-generator',
] as const;

test.describe('Phase 2d-2: tools/[slug] — en', () => {
  for (const slug of SLUGS) {
    test(`/tools/${slug} returns 200 with lang=en`, async ({ page }) => {
      const resp = await page.goto(`/tools/${slug}`);
      expect(resp?.status()).toBe(200);
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
      await expect(page.locator('footer').first()).toBeVisible();
    });
  }
});

test.describe('Phase 2d-2: tools/[slug] — zh-TW', () => {
  for (const slug of SLUGS) {
    test(`/zh-TW/tools/${slug} returns 200 with lang=zh-TW`, async ({ page }) => {
      const resp = await page.goto(`/zh-TW/tools/${slug}`);
      expect(resp?.status()).toBe(200);
      await expect(page.locator('html')).toHaveAttribute('lang', 'zh-TW');
      await expect(page.locator('footer').first()).toBeVisible();
    });
  }
});

test('Tool page body renders (base64 hero visible)', async ({ page }) => {
  await page.goto('/tools/base64-decode-encode');
  // The ToolHero h1 should be present
  await expect(page.locator('h1.tools-h1').first()).toBeVisible();
  // The iframe for the actual widget should be present
  await expect(page.locator('iframe').first()).toBeVisible();
});

test('Tool page body renders (uuidV7 hero visible)', async ({ page }) => {
  await page.goto('/tools/uuidv7-generator');
  await expect(page.locator('h1.tools-h1').first()).toBeVisible();
  await expect(page.locator('iframe').first()).toBeVisible();
});

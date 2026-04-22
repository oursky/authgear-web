import { test, expect } from '@playwright/test';

const SLUGS = [
  'attack-protection',
  'authentication',
  'authorization',
  'biometric-authentication',
  'biometric-login',
  'customization',
  'extensibility',
  'identity-security',
  'machine-to-machine-token',
  'multi-factor-authentication',
  'passkeys',
  'passwordless-authentication',
  'self-serve-settings-page',
  'single-sign-on',
  'sms-passcode',
  'sms-pumping-fraud',
  'social-login',
  'user-management',
  'whatsapp-otp',
] as const;

test.describe('Phase 2c-3: features/[slug] — en', () => {
  for (const slug of SLUGS) {
    test(`/features/${slug} returns 200 with lang=en`, async ({ page }) => {
      const resp = await page.goto(`/features/${slug}`);
      expect(resp?.status()).toBe(200);
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
      await expect(page.locator('footer').first()).toBeVisible();
    });
  }
});

test.describe('Phase 2c-3: features/[slug] — zh-TW', () => {
  for (const slug of SLUGS) {
    test(`/zh-TW/features/${slug} returns 200 with lang=zh-TW`, async ({ page }) => {
      const resp = await page.goto(`/zh-TW/features/${slug}`);
      expect(resp?.status()).toBe(200);
      await expect(page.locator('html')).toHaveAttribute('lang', 'zh-TW');
      await expect(page.locator('footer').first()).toBeVisible();
    });
  }
});

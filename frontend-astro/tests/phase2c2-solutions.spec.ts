import { test, expect } from '@playwright/test';

const SLUGS = [
  'b2b-saas-authentication',
  'ciam-solution',
  'customer-identity-and-access-management',
  'enterprise-sso',
  'external-identity-access-management',
  'frontline-workers-identity',
  'reduce-sms-otp-cost',
] as const;

test.describe('Phase 2c-2: solutions/[slug] — en', () => {
  for (const slug of SLUGS) {
    test(`/solutions/${slug} returns 200 with lang=en`, async ({ page }) => {
      const resp = await page.goto(`/solutions/${slug}`);
      expect(resp?.status()).toBe(200);
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
      await expect(page.locator('footer').first()).toBeVisible();
    });
  }
});

test.describe('Phase 2c-2: solutions/[slug] — zh-TW', () => {
  for (const slug of SLUGS) {
    test(`/zh-TW/solutions/${slug} returns 200 with lang=zh-TW`, async ({ page }) => {
      const resp = await page.goto(`/zh-TW/solutions/${slug}`);
      expect(resp?.status()).toBe(200);
      await expect(page.locator('html')).toHaveAttribute('lang', 'zh-TW');
      await expect(page.locator('footer').first()).toBeVisible();
    });
  }
});

test('reduce-sms-otp-cost: SmsCostCalculator island hydrates', async ({ page }) => {
  await page.goto('/solutions/reduce-sms-otp-cost');
  // Scroll into view — client:visible requires viewport intersection
  const slider = page.locator('input[type="range"]').first();
  await slider.scrollIntoViewIfNeeded();
  await expect(slider).toBeVisible();
  // No placeholder stub should remain
  const stubs = page.locator('[data-placeholder="SmsCostCalculator"]');
  await expect(stubs).toHaveCount(0);
});

test('ContactForm hydrates on /solutions/enterprise-sso', async ({ page }) => {
  await page.goto('/solutions/enterprise-sso');
  const nameInput = page.locator('input[name="Name"]').first();
  await expect(nameInput).toBeVisible();
  await nameInput.fill('Enterprise Lead');
  await expect(nameInput).toHaveValue('Enterprise Lead');
});

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

test.describe('Phase 2c-3: features/customization — mobile sheet', () => {
  test('sheet opens via pill and closes via X (narrow viewport)', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/features/customization/');
    await page.waitForLoadState('networkidle');

    // Scroll the playground island into view so client:visible hydrates.
    const trigger = page.locator('button.ag-login-play__trigger-pill');
    await trigger.scrollIntoViewIfNeeded();
    await expect(trigger).toBeVisible();

    // Wait for the astro-island to finish hydrating (Astro removes the `ssr`
    // attribute once React has taken over; clicks before that point hit the
    // static SSR HTML and are not processed by React event handlers).
    const island = page
      .locator('astro-island')
      .filter({ has: page.locator('button.ag-login-play__trigger-pill') })
      .first();
    await expect(island).not.toHaveAttribute('ssr');

    // Panel starts closed (no data-open or data-open='false').
    const panel = page.locator('aside.ag-login-play__panel').first();
    await expect(panel).not.toHaveAttribute('data-open', 'true');

    // Open via pill.
    await trigger.click();
    await expect(panel).toHaveAttribute('data-open', 'true');
    await expect(trigger).toBeHidden();

    // Close via X.
    const closeBtn = page.locator('button.ag-login-play__sheet-close');
    await closeBtn.click();
    await expect(panel).not.toHaveAttribute('data-open', 'true');
    await expect(trigger).toBeVisible();
  });
});

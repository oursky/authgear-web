import { test, expect } from '@playwright/test';

const SLUGS = [
  'about',
  'why-authgear',
  'promises',
  'data-privacy',
  'auth-toolkit',
  'migrate-to-authgear',
  'glossary',
  'schedule-demo',
  'terms',
  'terms-of-enterprise-license',
  'policy',
  'security',
  'sla',
] as const;

test.describe('Phase 2b routes — en', () => {
  for (const slug of SLUGS) {
    test(`/${slug} returns 200 with lang=en`, async ({ page }) => {
      const resp = await page.goto(`/${slug}`);
      expect(resp?.status()).toBe(200);
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
      await expect(page.locator('footer').first()).toBeVisible();
    });
  }
});

test.describe('Phase 2b routes — zh-TW', () => {
  for (const slug of SLUGS) {
    test(`/zh-TW/${slug} returns 200 with lang=zh-TW`, async ({ page }) => {
      const resp = await page.goto(`/zh-TW/${slug}`);
      expect(resp?.status()).toBe(200);
      await expect(page.locator('html')).toHaveAttribute('lang', 'zh-TW');
      await expect(page.locator('footer').first()).toBeVisible();
    });
  }
});

test('schedule-demo has a hydrated ContactForm', async ({ page }) => {
  await page.goto('/schedule-demo');
  const nameInput = page.locator('input[name="Name"]').first();
  // ContactForm uses client:visible — scroll into view to trigger hydration.
  await nameInput.scrollIntoViewIfNeeded();
  await expect(nameInput).toBeVisible();
  await nameInput.fill('Demo Seeker');
  await expect(nameInput).toHaveValue('Demo Seeker');
});

test('no data-placeholder divs remain on any phase 2b page', async ({ page }) => {
  for (const slug of SLUGS) {
    await page.goto(`/${slug}`);
    const count = await page.locator('[data-placeholder]').count();
    expect(count, `/${slug} has ${count} placeholder divs`).toBe(0);
  }
});

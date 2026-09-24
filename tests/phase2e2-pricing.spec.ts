import { test, expect } from '@playwright/test';

test.describe('Phase 2e-2: /pricing', () => {
  test('/pricing returns 200 with lang=en', async ({ page }) => {
    const resp = await page.goto('/pricing/');
    expect(resp?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('footer').first()).toBeVisible();
  });

  test('/zh-hant/pricing returns 200 with lang=zh-Hant', async ({ page }) => {
    const resp = await page.goto('/zh-hant/pricing/');
    expect(resp?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', 'zh-Hant');
  });

  test('Pricing page is Cloud-only — no ONCE tab, plans visible', async ({ page }) => {
    await page.goto('/pricing/');
    await expect(page.getByRole('button', { name: /on your server|ONCE/i })).toHaveCount(0);
    await expect(page.locator('#cards-section')).toBeVisible();
    await expect(page.locator('.pricing-card').first()).toBeVisible();
  });

  test('Pricing FAQ accordion items exist and toggle', async ({ page }) => {
    await page.goto('/pricing/');
    // Scope to the FAQ section — the nav's dropdown toggles also carry
    // aria-expanded and come first in DOM order.
    const firstFaq = page.locator('.ds-pricing-faq button[aria-expanded]').first();
    await firstFaq.scrollIntoViewIfNeeded();
    await expect(firstFaq).toBeVisible();

    // Wait for the pricing island to finish hydrating (Astro removes the
    // `ssr` attribute once React has taken over; clicks before that point
    // hit static SSR HTML and are not processed by React event handlers).
    const island = page
      .locator('astro-island')
      .filter({ has: page.locator('.ds-pricing-faq') })
      .first();
    await expect(island).not.toHaveAttribute('ssr');
    const before = await firstFaq.getAttribute('aria-expanded');
    await firstFaq.click();
    const after = await firstFaq.getAttribute('aria-expanded');
    expect(after).not.toBe(before);
  });
});

test.describe('EU data region notice under the plan cards', () => {
  test('en: shows the notice and links to the data-sovereignty waitlist', async ({ page }) => {
    await page.goto('/pricing/');
    const note = page.locator('.pricing-eu-region');
    await note.scrollIntoViewIfNeeded();
    await expect(note).toBeVisible();
    await expect(note.locator('a')).toHaveAttribute('href', '/solutions/data-sovereignty/#waitlist');
  });

  test('de: links to the German page; ja: falls back to the English page', async ({ page }) => {
    await page.goto('/de/pricing/');
    await expect(page.locator('.pricing-eu-region a')).toHaveAttribute('href', '/de/solutions/data-sovereignty/#waitlist');
    await page.goto('/ja/pricing/');
    await expect(page.locator('.pricing-eu-region a')).toHaveAttribute('href', '/solutions/data-sovereignty/#waitlist');
  });
});

import { test, expect } from '@playwright/test';

// Tailwind v4 emits a standalone `.size-N { width/height }` utility. Webflow uses
// those same names only as font-size combo-class labels on card text, so the Tailwind
// utility clamps `.svg-card-content-*` boxes and wraps the text one word per line.
// The global reset lives (unlayered) in src/styles/authgear-design-system.css.
test.describe('svg-card text — Tailwind .size-N collision reset', () => {
  test('biometric page: .size-22 card title is not clamped (width:auto)', async ({ page }) => {
    // Trailing slash is required: astro.config.mjs sets `trailingSlash: 'always'`,
    // so the no-slash form 404s under `astro dev` (the Playwright webServer).
    await page.goto('/features/biometric-authentication/');
    const width = await page
      .locator('.svg-card-content-title.size-22')
      .first()
      .evaluate((el) => getComputedStyle(el).width);
    // Before the reset the Tailwind utility resolves this to "88px" (22 × 4px).
    expect(width).toBe('auto');
  });

  test('single-sign-on page: .size-18 step card title renders full width', async ({ page }) => {
    await page.goto('/features/single-sign-on/');
    const boxWidth = await page
      .locator('.svg-card-content-title.size-18')
      .first()
      .evaluate((el) => el.getBoundingClientRect().width);
    // Clamped state is ~72px (18 × 4px); full-width step cards measure 300px+.
    expect(boxWidth).toBeGreaterThan(200);
  });
});

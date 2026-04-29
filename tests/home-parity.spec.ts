import { test, expect } from '@playwright/test';

test.describe('home page parity — islands hydrate', () => {
  test('LogoMarquee renders customer logos', async ({ page }) => {
    await page.goto('/');
    const logos = page.locator('img.logo');
    await expect(logos.first()).toBeVisible();
    expect(await logos.count()).toBeGreaterThanOrEqual(8);
  });

  test('LogoMarquee CTA links to customer stories on en', async ({ page }) => {
    await page.goto('/');
    const cta = page.locator('a.link-block-7').first();
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('href', '/customer-stories');
  });

  test('LogoMarquee CTA on zh-TW links to localized path', async ({ page }) => {
    await page.goto('/zh-TW/');
    const cta = page.locator('a.link-block-7').first();
    await expect(cta).toHaveAttribute('href', '/zh-TW/customer-stories');
  });

  test('ContactForm hydrates — fields are interactive', async ({ page }) => {
    await page.goto('/');
    const nameInput = page.locator('input[name="Name"]').first();
    await expect(nameInput).toBeVisible();
    await nameInput.fill('Hydration Test');
    await expect(nameInput).toHaveValue('Hydration Test');
  });

  test('no placeholder divs remain', async ({ page }) => {
    await page.goto('/');
    const placeholders = page.locator('[data-placeholder]');
    expect(await placeholders.count()).toBe(0);
  });
});

// E2E contact-form submission test removed: the form now POSTs to
// Netlify's form-handler endpoint, which only resolves on the Netlify
// runtime — not under `astro dev`. Verify the happy path on the deploy
// preview instead.

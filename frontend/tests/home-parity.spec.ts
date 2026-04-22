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

test.describe('contact form submits end-to-end', () => {
  test('submitting valid form reaches /api/contact and shows success', async ({ page }) => {
    await page.goto('/');

    await page.locator('input[name="Name"]').first().fill('E2E User');
    await page.locator('input[name="Email"]').first().fill('e2e@example.com');
    await page.locator('input[name="Company"]').first().fill('Example');
    await page.locator('select[name="how-hear"]').first().selectOption('github');

    // Phone is required via intl-tel-input. Strip the required attr(s) so the form
    // can submit without a phone number for the smoke test.
    await page.evaluate(() => {
      const phoneInput = document.querySelector('input[name="Phone"]') as HTMLInputElement | null;
      if (phoneInput) phoneInput.removeAttribute('required');
    });

    const responsePromise = page.waitForResponse('**/api/contact');
    await page.locator('input[type="submit"]').first().click();
    const resp = await responsePromise;

    expect(resp.status()).toBe(200);
    await expect(page.getByText('Thank you! Your submission has been received!')).toBeVisible();
  });
});

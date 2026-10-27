import { test, expect } from '@playwright/test';

// /help-desk/ is the SaaS support form migrated from Notion. It is an orphan
// page: linked from the Authgear portal, kept out of the nav, the sitemap and
// the search index.

test.describe('help desk page', () => {
  test('renders the form with every question from the Notion original', async ({ page }) => {
    const resp = await page.goto('/help-desk/');
    expect(resp?.status()).toBe(200);
    await expect(page.getByRole('heading', { name: 'Authgear Help Desk', level: 1 })).toBeVisible();

    const form = page.locator('form[name="help-desk"]');
    await expect(form).toBeVisible();

    // "What is the purpose of your enquiry?" is a single-choice radio group.
    const purposes = form.locator('input[name="purpose"]');
    await expect(purposes).toHaveCount(4);
    await expect(purposes.first()).toHaveAttribute('type', 'radio');
    await expect(form.locator('.ds-form-radio span')).toHaveText([
      'Increase number of projects limit',
      'Enable SMS/WhatsApp OTP in the project',
      'Resume suspended project',
      'Other',
    ]);

    for (const name of [
      'project-name',
      'company',
      'company-website',
      'project-description',
      'target-users',
      'name',
      'email',
      'phone',
      'notes',
    ]) {
      await expect(form.locator(`[name="${name}"]`)).toBeVisible();
    }
  });

  test('renders bare — no site nav, no footer', async ({ page }) => {
    await page.goto('/help-desk/');
    await expect(page.locator('[role=banner]')).toHaveCount(0);
    await expect(page.locator('footer')).toHaveCount(0);
    await expect(page.locator('nav#site-nav')).toHaveCount(0);
    // The logo stands in for the nav as the way back to the site.
    await expect(page.locator('.help-desk__brand')).toHaveAttribute('href', '/');
  });

  test('is served noindex and stays out of the sitemap', async ({ page, request }) => {
    await page.goto('/help-desk/');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      'content',
      'noindex, nofollow'
    );

    // No zh-Hant twin exists, so no alternate may advertise one.
    await expect(page.locator('link[rel="alternate"][hreflang="zh-Hant"]')).toHaveCount(0);

    const sitemap = await request.get('/sitemap-0.xml');
    if (sitemap.ok()) {
      expect(await sitemap.text()).not.toContain('/help-desk/');
    }
  });

  test('query params prefill the fields the portal knows', async ({ page }) => {
    await page.goto('/help-desk/?project=acme-prod&email=dev%40acme.com&name=Alex&purpose=sms-otp');
    const form = page.locator('form[name="help-desk"]');
    await expect(form.locator('[name="project-name"]')).toHaveValue('acme-prod');
    await expect(form.locator('[name="email"]')).toHaveValue('dev@acme.com');
    await expect(form.locator('[name="name"]')).toHaveValue('Alex');
    await expect(form.locator('#hd-purpose-sms-otp')).toBeChecked();
  });

  test('requires target countries once OTP is the selected purpose', async ({ page }) => {
    const submissions: string[] = [];
    await page.route('**/', async (route, req) => {
      if (req.method() === 'POST') {
        submissions.push(req.postData() ?? '');
        await route.fulfill({ status: 200, body: 'ok' });
        return;
      }
      await route.fallback();
    });

    await page.goto('/help-desk/');
    // Filling before React hydrates is wiped by the first client render. Astro
    // drops the `ssr` attribute once the island has hydrated, so wait for that.
    await page.locator('astro-island:not([ssr]):has(form[name="help-desk"])').waitFor();
    const form = page.locator('form[name="help-desk"]');

    // Fill everything the browser validates natively, leaving the one rule the
    // component enforces itself to fail.
    await form.locator('#hd-purpose-sms-otp').check();
    await form.locator('[name="project-name"]').fill('acme-prod');
    await form.locator('[name="company"]').fill('Acme');
    await form.locator('[name="company-website"]').fill('https://acme.com');
    await form.locator('[name="project-description"]').fill('A mobile banking app.');
    await form.locator('[name="name"]').fill('Alex');
    await form.locator('[name="email"]').fill('dev@acme.com');

    await form.getByRole('button', { name: 'Submit' }).click();
    await expect(
      page.getByText('Tell us the target countries so we can enable OTP delivery.')
    ).toBeVisible();
    expect(submissions).toHaveLength(0);

    await form.locator('[name="target-users"]').fill('Hong Kong, Taiwan');
    await form.getByRole('button', { name: 'Submit' }).click();

    await expect(page.getByText('Thanks — we got your request.')).toBeVisible();
    expect(submissions).toHaveLength(1);
    const body = new URLSearchParams(submissions[0]);
    expect(body.get('form-name')).toBe('help-desk');
    expect(body.get('purpose')).toBe('Enable SMS/WhatsApp OTP in the project');
    expect(body.get('target-users')).toBe('Hong Kong, Taiwan');
    expect(body.get('source')).toBe('help-desk');
  });
});

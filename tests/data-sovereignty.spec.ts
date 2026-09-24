import { test, expect, type Page } from '@playwright/test';

const PATH = '/solutions/data-sovereignty/';

/** Fill every required field of the shared ContactForm inside the waitlist callout. */
async function fillWaitlistForm(page: Page) {
  const form = page.locator('section#waitlist form[name="contact"]');
  await form.scrollIntoViewIfNeeded();
  // ContactForm is a client:visible island with controlled inputs. Astro drops
  // the `ssr` attribute once React has hydrated; filling before that point is
  // wiped by the first render, so wait for it.
  await page.locator('section#waitlist astro-island:not([ssr])').waitFor();
  await form.locator('input[name="Name"]').fill('EU Buyer');
  await expect(form.locator('input[name="Name"]')).toHaveValue('EU Buyer');
  await form.locator('input[name="Email"]').fill('someone@example.eu');
  await form.locator('input[name="Phone"]').fill('7700900123');
  await form.locator('input[name="Company"]').fill('Example GmbH');
  await form.locator('select[name="how-hear"]').selectOption('github');
  return form;
}

test.describe('/solutions/data-sovereignty', () => {
  test('renders in English with hero, waitlist anchor and footer', async ({ page }) => {
    const resp = await page.goto(PATH);
    expect(resp?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page).toHaveTitle(/Data Sovereignty/);
    await expect(page.locator('main h1')).toHaveText("Keep your users' data where it belongs");
    await expect(page.locator('a[href="#waitlist"]').first()).toBeVisible();
    await expect(page.locator('section#waitlist')).toHaveCount(1);
    await expect(page.locator('footer').first()).toBeVisible();
  });

  test('waitlist section hosts the shared contact form with a "Get in touch" button', async ({ page }) => {
    await page.goto(PATH);
    const form = page.locator('section#waitlist form[name="contact"]');
    await form.scrollIntoViewIfNeeded();
    await page.locator('section#waitlist astro-island:not([ssr])').waitFor();
    await expect(form.locator('button[type="submit"]')).toHaveText('Get in touch');
    await expect(form.locator('input[name="Email"]')).toBeVisible();
  });

  test('waitlist form posts to Netlify Forms and shows the success state', async ({ page }) => {
    let posted: URLSearchParams | null = null;
    await page.route(
      (url) => url.pathname === '/',
      async (route) => {
        if (route.request().method() !== 'POST') return route.fallback();
        posted = new URLSearchParams(route.request().postData() ?? '');
        await route.fulfill({ status: 200, body: '' });
      },
    );

    await page.goto(PATH);
    const form = await fillWaitlistForm(page);
    await form.locator('button[type="submit"]').click();

    await expect(page.locator('section#waitlist .ds-form-success')).toBeVisible();

    expect(posted).not.toBeNull();
    const body = posted as unknown as URLSearchParams;
    expect(body.get('form-name')).toBe('contact');
    expect(body.get('Email')).toBe('someone@example.eu');
    expect(body.get('page')).toBe(PATH);
    expect(body.get('locale')).toBe('en');
  });

  test('waitlist form shows the error state when the POST fails', async ({ page }) => {
    await page.route(
      (url) => url.pathname === '/',
      async (route) => {
        if (route.request().method() !== 'POST') return route.fallback();
        await route.fulfill({ status: 500, body: '' });
      },
    );

    await page.goto(PATH);
    const form = await fillWaitlistForm(page);
    await form.locator('button[type="submit"]').click();

    await expect(form.locator('.ds-form-error')).toBeVisible();
    await expect(form.locator('button[type="submit"]')).toBeEnabled();
    await expect(page.locator('section#waitlist .ds-form-success')).toHaveCount(0);
  });

  for (const { prefix, lang } of [
    { prefix: '/zh-hant', lang: 'zh-Hant' },
    { prefix: '/de', lang: 'de' },
    { prefix: '/es', lang: 'es' },
  ]) {
    test(`${prefix}${PATH} is translated (lang=${lang})`, async ({ page }) => {
      const resp = await page.goto(`${prefix}${PATH}`);
      expect(resp?.status()).toBe(200);
      await expect(page.locator('html')).toHaveAttribute('lang', lang);
      await expect(page.locator('main h1')).not.toHaveText("Keep your users' data where it belongs");
      await expect(page.locator('footer').first()).toBeVisible();
    });
  }

  test('advertises every locale that has the page, and not ja', async ({ page }) => {
    await page.goto(PATH);
    const langs = (await page.locator('link[rel="alternate"][hreflang]').evaluateAll((els) =>
      els.map((el) => el.getAttribute('hreflang')),
    )).sort();
    expect(langs).toEqual(['de', 'en', 'es', 'x-default', 'zh-Hant']);
  });

  test('/ja/ falls back to the English page', async ({ request }) => {
    const resp = await request.get(`/ja${PATH}`, { maxRedirects: 0 });
    expect(resp.status()).toBe(302);
    expect(new URL(resp.headers()['location'], 'http://localhost').pathname).toBe(PATH);
  });

  test('comparison tables keep their row labels on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(PATH);
    const firstLabel = page.locator('table.dsov-table tbody tr td:first-child').first();
    await firstLabel.scrollIntoViewIfNeeded();
    await expect(firstLabel).toBeVisible();
    await expect(firstLabel).toHaveText('Where it runs');
  });
});

import { test, expect } from '@playwright/test';

// Market-test locales (es, de, ja, fr): only the home page, /pricing,
// /auth-toolkit, /schedule-demo and /tools/* are translated (plus
// /solutions/data-sovereignty for es, de and fr). Every other path under the prefix falls back to
// the English page via a non-forced redirect in public/_redirects.
const PARTIAL = [
  { prefix: '/es', lang: 'es' },
  { prefix: '/de', lang: 'de' },
  { prefix: '/ja', lang: 'ja' },
  { prefix: '/fr', lang: 'fr' },
] as const;

const TRANSLATED_PATHS = ['/', '/pricing/', '/auth-toolkit/', '/schedule-demo/', '/tools/oidc-discovery-endpoint/'];

const hreflangs = async (page: import('@playwright/test').Page) =>
  (await page.locator('link[rel="alternate"][hreflang]').evaluateAll((els) =>
    els.map((el) => el.getAttribute('hreflang')),
  )).sort();

for (const { prefix, lang } of PARTIAL) {
  test.describe(`partial locale ${lang}`, () => {
    for (const path of TRANSLATED_PATHS) {
      test(`${prefix}${path} returns 200 with lang=${lang}`, async ({ page }) => {
        const resp = await page.goto(`${prefix}${path}`);
        expect(resp?.status()).toBe(200);
        await expect(page.locator('html')).toHaveAttribute('lang', lang);
        await expect(page.locator('footer').first()).toBeVisible();
      });
    }

    test(`${prefix}/pricing/ lists every locale in hreflang`, async ({ page }) => {
      await page.goto(`${prefix}/pricing/`);
      expect(await hreflangs(page)).toEqual(['de', 'en', 'es', 'fr', 'ja', 'x-default', 'zh-Hant']);
    });

    test(`${prefix}/about/ falls back to the English page`, async ({ request }) => {
      const resp = await request.get(`${prefix}/about/`, { maxRedirects: 0 });
      expect(resp.status()).toBe(302);
      expect(new URL(resp.headers()['location'], 'http://localhost').pathname).toBe('/about/');
    });
  });
}

test('untranslated English page only advertises en and zh-Hant', async ({ page }) => {
  await page.goto('/about/');
  expect(await hreflangs(page)).toEqual(['en', 'x-default', 'zh-Hant']);
});

test('translated tool page links to the English blog, not a prefixed one', async ({ page }) => {
  await page.goto('/es/tools/ssl-checker/');
  const blogLinks = await page.locator('a[href*="/post/"]').evaluateAll((els) =>
    els.map((el) => el.getAttribute('href')),
  );
  expect(blogLinks.length).toBeGreaterThan(0);
  for (const href of blogLinks) expect(href).not.toMatch(/^\/es\//);
});

// The contact form's submission payload must not depend on the page
// language: same Netlify form name, same field names, same option values.
const formSignature = async (page: import('@playwright/test').Page) =>
  page.locator('form[name="contact"]').first().evaluate((form) => {
    const f = form as HTMLFormElement;
    const names = [...f.querySelectorAll<HTMLElement>('input, select, textarea')]
      .map((el) => el.getAttribute('name'))
      .filter(Boolean)
      .sort();
    const options = [...f.querySelectorAll<HTMLOptionElement>('select option')].map((o) => o.value).sort();
    return { name: f.getAttribute('name'), action: f.getAttribute('method'), names, options };
  });

test('localized contact forms submit the same payload shape as English', async ({ page }) => {
  await page.goto('/schedule-demo/');
  const english = await formSignature(page);
  expect(english.names).toContain('Name');
  for (const prefix of ['/es', '/de', '/ja', '/fr']) {
    await page.goto(`${prefix}/schedule-demo/`);
    expect(await formSignature(page)).toEqual(english);
  }
});

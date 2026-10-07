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
    { prefix: '/fr', lang: 'fr' },
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
    expect(langs).toEqual(['de', 'en', 'es', 'fr', 'x-default', 'zh-Hant']);
  });

  test('/ja/ falls back to the English page', async ({ request }) => {
    const resp = await request.get(`/ja${PATH}`, { maxRedirects: 0 });
    expect(resp.status()).toBe(302);
    expect(new URL(resp.headers()['location'], 'http://localhost').pathname).toBe(PATH);
  });

  test('the comparison table keeps its row labels on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(PATH);
    // The vendor comparison still renders as a table; the shared styles would
    // drop its label column on mobile, and this page overrides that.
    const firstLabel = page
      .locator('table.dsov-table:not(.dsov-table--ways) tbody tr td:first-child')
      .first();
    await firstLabel.scrollIntoViewIfNeeded();
    await expect(firstLabel).toBeVisible();
  });

  test('the three ways table becomes one card per option on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(PATH);
    // Sideways scrolling through three columns reads badly on a phone, so the
    // same data is grouped by option instead.
    await expect(page.locator('.dsov-ways-table-wrapper')).toBeHidden();
    const cards = page.locator('.dsov-ways-card');
    await expect(cards).toHaveCount(3);
    await expect(cards.first().locator('.dsov-ways-card__title')).toHaveText('Self-hosted');
    // Every aspect keeps its label, including the row that is only links.
    const terms = cards.first().locator('.dsov-ways-card__term');
    await expect(terms).toHaveCount(5);
    await expect(terms.first()).toHaveText('Where it runs');
    await expect(terms.last()).toHaveText('Get started');
  });

  test('the three ways table stays a table on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(PATH);
    await expect(page.locator('.dsov-ways-cards')).toBeHidden();
    const firstLabel = page.locator('table.dsov-table--ways tbody tr td:first-child').first();
    await expect(firstLabel).toHaveText('Where it runs');
  });

  // --- FAQ: nine questions, with FAQPage structured data on every locale ---

  const LOCALE_PATHS = [
    { lang: 'en', path: PATH, keycloak: '/compare/keycloak-alternative/', cloudAct: '/post/uk-data-sovereignty-login-identity' },
    // zh-Hant is the Taiwan page: EU framing removed, no CLOUD Act answer.
    { lang: 'zh-Hant', path: `/zh-hant${PATH}`, keycloak: '/compare/keycloak-alternative/', cloudAct: null },
    { lang: 'de', path: `/de${PATH}`, keycloak: '/de/compare/keycloak-alternative/', cloudAct: '/de/post/cloud-act-login-anbieter-nutzerdaten' },
    { lang: 'es', path: `/es${PATH}`, keycloak: '/es/compare/keycloak-alternative/', cloudAct: '/post/uk-data-sovereignty-login-identity' },
    { lang: 'fr', path: `/fr${PATH}`, keycloak: '/fr/compare/keycloak-alternative/', cloudAct: '/fr/post/cloud-act-fournisseur-identite-donnees-connexion' },
  ] as const;

  for (const { lang, path, keycloak, cloudAct } of LOCALE_PATHS) {
    test(`${lang}: FAQPage JSON-LD lists every visible question`, async ({ page }) => {
      await page.goto(path);

      const visible = (await page.locator('.dsov-faq__question').allTextContents()).map((t) => t.trim());
      // English also carries "Can I keep user data in the UK?"; the other
      // markets are asking about the EU, so they show eight.
      expect(visible.length, 'every FAQ item is rendered').toBe(lang === 'en' ? 9 : 8);

      const faq = await page.locator('script[type="application/ld+json"]').evaluateAll((els) => {
        for (const el of els) {
          try {
            const parsed = JSON.parse(el.textContent ?? '');
            if (parsed['@type'] === 'FAQPage') return parsed;
          } catch {
            /* not JSON-LD we care about */
          }
        }
        return null;
      });
      expect(faq, 'the page emits FAQPage structured data').not.toBeNull();

      const entities = faq.mainEntity as { name: string; acceptedAnswer: { text: string } }[];
      // Same questions, same order, and no answer left empty.
      expect(entities.map((e) => e.name)).toEqual(visible);
      for (const entity of entities) {
        expect(entity.acceptedAnswer.text.trim(), `answer for "${entity.name}"`).not.toBe('');
      }
      // Answers that contain a link keep the link label in the plain text.
      if (cloudAct) {
        const cloudActEntity = entities.find((e) => /CLOUD Act/i.test(e.name));
        expect(cloudActEntity?.acceptedAnswer.text.length).toBeGreaterThan(60);
      }
    });

    test(`${lang}: FAQ and table link to the right pages`, async ({ page }) => {
      await page.goto(path);
      if (cloudAct) {
        await expect(page.locator(`.dsov-faq__answer a[href="${cloudAct}"]`)).toHaveCount(1);
      }
      await expect(page.locator(`.dsov-table-note a[href="${keycloak}"]`)).toHaveCount(1);
    });
  }

  test('the FAQ covers residency vs sovereignty, the CLOUD Act and UK data', async ({ page }) => {
    await page.goto(PATH);
    const questions = await page.locator('.dsov-faq__question').allTextContents();
    expect(questions[0]).toContain('Where is Authgear based');
    expect(questions[1]).toContain('data residency and data sovereignty');
    expect(questions[2]).toContain('CLOUD Act');
    expect(questions[3]).toContain('keep user data in the UK');
  });

  test('the UK data question is English only', async ({ page }) => {
    for (const { lang, path } of LOCALE_PATHS.filter((l) => l.lang !== 'en')) {
      await page.goto(path);
      const questions = await page.locator('.dsov-faq__question').allTextContents();
      expect(questions.join(' '), `${lang} asks the UK data question`).not.toMatch(
        /Nutzerdaten in Großbritannien|datos de usuarios en el Reino Unido|données utilisateurs au Royaume-Uni|用戶資料留在英國/,
      );
    }
  });

  test('the UK company card no longer claims support stays in Europe', async ({ page }) => {
    await page.goto(PATH);
    const body = (await page.locator('main').textContent()) ?? '';
    expect(body).toContain("Your users' data can stay in the UK or the EU");
    expect(body).not.toContain('Your contract, support and data-protection terms stay in Europe');
  });

  test('self-hosting mentions a UK provider in English only', async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator('main')).toContainText('a UK provider');

    // The other markets are choosing European infrastructure, so their
    // self-hosting card lists European providers only. Scoped to that card:
    // the CLOUD Act answer further down does mention a UK or EU provider,
    // which is correct.
    // zh-Hant is excluded: the Taiwan card lists Taiwan regions, not European
    // providers, and is covered by its own describe block.
    for (const { lang, path } of LOCALE_PATHS.filter((l) => l.lang !== 'en' && l.lang !== 'zh-Hant')) {
      await page.goto(path);
      const cards = await page.locator('.svg-card .ds-svg-card-description').allTextContents();
      const selfHosting = cards.find((text) => text.includes('Hetzner'));
      expect(selfHosting, `${lang} has a self-hosting card`).toBeTruthy();
      expect(selfHosting, `${lang} names a UK provider in the self-hosting card`).not.toMatch(
        /britische[rn]? Anbieter|proveedor británico|fournisseur britannique|英國供應商/,
      );
    }
  });
});

// Inbound links added alongside the data sovereignty page update.
test.describe('links into /solutions/data-sovereignty', () => {
  for (const [label, from, to] of [
    ['auth0 compare', '/compare/auth0-alternative/', '/solutions/data-sovereignty/'],
    ['okta compare', '/compare/okta-alternative/', '/solutions/data-sovereignty/'],
    ['auth0 compare (zh-Hant)', '/zh-hant/compare/auth0-alternative/', '/zh-hant/solutions/data-sovereignty/'],
    ['okta compare (zh-Hant)', '/zh-hant/compare/okta-alternative/', '/zh-hant/solutions/data-sovereignty/'],
  ] as const) {
    test(`${label} links to the page near the migration CTA`, async ({ page }) => {
      await page.goto(from);
      await expect(page.locator(`.compare-sovereignty-note a[href="${to}"]`)).toHaveCount(1);
    });
  }

  test('the Auth0 alternatives post links to the page', async ({ page }) => {
    await page.goto('/post/top-open-source-auth0-alternatives/');
    await expect(
      page.locator('.blog-post__body a[href="/solutions/data-sovereignty"]'),
    ).toHaveCount(1);
  });
});

// The Traditional Chinese page is retargeted to Taiwan: it drops the EU
// framing, leads with on-premise and a Taiwan private cloud, and answers the
// local rules instead of the CLOUD Act. Only zh-Hant changes.
test.describe('/zh-hant/solutions/data-sovereignty — Taiwan', () => {
  const TW = '/zh-hant/solutions/data-sovereignty/';

  test('leads with keeping data in Taiwan', async ({ page }) => {
    const resp = await page.goto(TW);
    expect(resp?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', 'zh-Hant');
    await expect(page.locator('main h1')).toHaveText('會員資料，放在台灣最安心');
    await expect(page).toHaveTitle(/個資不出境/);
  });

  test('shows the three regulated-industry cards', async ({ page }) => {
    await page.goto(TW);
    const section = page.locator('[data-industry-cards]');
    await expect(section).toHaveCount(1);
    await expect(section.locator('.dsov-industry-card')).toHaveCount(3);
    await expect(section).toContainText('金融業');
    await expect(section).toContainText('醫療院所');
    await expect(section).toContainText('政府機關與關鍵基礎設施');
  });

  test('asks the Taiwan questions and drops the EU and CLOUD Act ones', async ({ page }) => {
    await page.goto(TW);
    const questions = await page.locator('.dsov-faq__question').allTextContents();
    expect(questions).toHaveLength(8);
    expect(questions[0]).toContain('留在台灣');
    expect(questions[1]).toContain('個資法');
    expect(questions[2]).toContain('金融業');
    expect(questions[3]).toContain('政府機關');
    const joined = questions.join(' ');
    expect(joined).not.toContain('CLOUD Act');
    expect(joined).not.toContain('EU');
  });

  test('the 個資法 answer links to the statute in a new tab', async ({ page }) => {
    await page.goto(TW);
    const link = page.locator('.dsov-faq__answer a[href*="law.moj.gov.tw"]');
    await expect(link).toHaveCount(1);
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noreferrer');
  });

  test('FAQPage JSON-LD matches the visible Taiwan questions', async ({ page }) => {
    await page.goto(TW);
    const visible = (await page.locator('.dsov-faq__question').allTextContents()).map((t) => t.trim());
    const faq = await page.locator('script[type="application/ld+json"]').evaluateAll((els) => {
      for (const el of els) {
        try {
          const parsed = JSON.parse(el.textContent ?? '');
          if (parsed['@type'] === 'FAQPage') return parsed;
        } catch {
          /* not the block we want */
        }
      }
      return null;
    });
    expect(faq).not.toBeNull();
    expect((faq.mainEntity as { name: string }[]).map((e) => e.name)).toEqual(visible);
  });

  test('drops the EU framing and the European hosting providers', async ({ page }) => {
    await page.goto(TW);
    const body = (await page.locator('main').textContent()) ?? '';
    for (const gone of ['EU 區域', '候補名單', 'Hetzner', 'OVHcloud', 'STACKIT', 'CLOUD Act']) {
      expect(body, `still mentions ${gone}`).not.toContain(gone);
    }
    // Taiwan wording, not the previous mainland-style terms.
    expect(body).not.toContain('用戶');
    expect(body).not.toContain('自主架設');
    expect(body).toContain('地端部署');
  });

  test('other locales keep the EU framing and gain no industry section', async ({ page }) => {
    for (const path of [PATH, '/de/solutions/data-sovereignty/', '/fr/solutions/data-sovereignty/']) {
      await page.goto(path);
      await expect(page.locator('[data-industry-cards]'), path).toHaveCount(0);
    }
    await page.goto(PATH);
    await expect(page.locator('.dsov-faq__question')).toHaveCount(9);
  });
});

import { test, expect, type Page } from '@playwright/test';

// UK/EU campaign promos on the /tools/ pages (src/components/tools/campaign/).
// The browser's time zone and date decide who sees them, so each test fakes both.

const IN_CAMPAIGN = new Date('2026-12-20T12:00:00Z');
const BEFORE = new Date('2026-12-10T12:00:00Z');
const AFTER = new Date('2027-01-18T12:00:00Z');

/** Record Plausible calls; locked so the real script can't replace the stub. */
async function stubPlausible(page: Page) {
  await page.addInitScript(() => {
    const events: unknown[] = [];
    Object.defineProperty(window, '__events', { value: events });
    Object.defineProperty(window, 'plausible', {
      get: () => (name: string, opts?: { props?: unknown }) => events.push({ name, props: opts?.props ?? null }),
      set: () => {},
    });
    // Keep promo clicks on the page so their events can be read.
    document.addEventListener('click', (e) => {
      if ((e.target as Element).closest('a')) e.preventDefault();
    });
  });
}

const events = (page: Page) =>
  page.evaluate(() => (window as unknown as { __events: { name: string; props: Record<string, string> | null }[] }).__events);

async function open(page: Page, path: string, now: Date) {
  // setFixedTime only moves Date; timers still run, so React hydrates normally.
  await page.clock.setFixedTime(now);
  await stubPlausible(page);
  await page.goto(path);
  await page.locator('astro-island:not([ssr])').first().waitFor({ state: 'attached' });
}

test.describe('tool campaign in a campaign time zone', () => {
  test.use({ timezoneId: 'Europe/London' });

  test('password hash tool shows group A in every slot', async ({ page }) => {
    await open(page, '/tools/password-hash-generator/', IN_CAMPAIGN);
    const banner = page.getByTestId('tool-campaign-rail');
    await expect(banner).toBeVisible();
    await expect(banner).toContainText("Where do your users' password hashes live?");
    await expect(banner).toHaveAttribute('href', '/sovereignty-self-check/');
    await expect(page.locator('a.tools-banner')).toHaveCount(0);

    // The GitHub tag gives way to the campaign, with nothing in its place.
    await expect(page.locator('.tools-github-tag')).toHaveCount(0);
    await expect(page.getByTestId('tool-campaign-strip')).toHaveAttribute('href', '/sovereignty-self-check/');
    await expect(page.getByTestId('tool-campaign-card')).toHaveAttribute('href', '/sovereignty-self-check/');
    await expect(page.locator('.more-tools').first()).toHaveAttribute('data-testid', 'tool-campaign-card');

    // "Start Building" and the crafted-by tag are untouched.
    await expect(page.locator('.tools-demo-cta__button')).toHaveAttribute('href', 'https://portal.authgear.com/');
    await expect(page.locator('.tools-authgear-tag')).toBeVisible();
  });

  test('the note appears only after the tool is used', async ({ page }) => {
    await open(page, '/tools/password-hash-generator/', IN_CAMPAIGN);
    await expect(page.getByTestId('tool-campaign-rail')).toBeVisible();
    await expect(page.getByTestId('tool-campaign-note')).toHaveCount(0);
    await page.locator('input[type="password"], input[placeholder*="password" i]').first().fill('correct horse battery staple');
    await page.getByRole('button', { name: /generate password hash/i }).click();
    const note = page.getByTestId('tool-campaign-note');
    await expect(note).toBeVisible();
    await expect(note).toContainText("Where will your users' password hashes be stored?");
  });

  for (const [path, headline, href] of [
    ['/tools/totp-authenticator/', 'MFA secrets are user data too', '/sovereignty-self-check/'],
    ['/tools/jwt-jwe-debugger/', 'Run your own login server in the UK or EU', '/post/self-hosted-authentication-docker-kubernetes/'],
    ['/tools/passkey-demo/', 'Run your own login server in the UK or EU', '/post/self-hosted-authentication-docker-kubernetes/'],
    ['/tools/base64-decode-encode/', 'Keep login data where you choose', '/solutions/data-sovereignty/'],
  ] as const) {
    test(`${path} gets its group`, async ({ page }) => {
      await open(page, path, IN_CAMPAIGN);
      const banner = page.getByTestId('tool-campaign-rail');
      await expect(banner).toContainText(headline);
      await expect(banner).toHaveAttribute('href', href);
    });
  }

  test('promo clicks send tool-promo-click with slot, group, tool and locale', async ({ page }) => {
    await open(page, '/tools/base64-decode-encode/', IN_CAMPAIGN);
    await page.getByTestId('tool-campaign-rail').click();
    await page.getByTestId('tool-campaign-card').click();
    const clicks = (await events(page)).filter((e) => e.name === 'tool-promo-click').map((e) => e.props);
    expect(clicks).toEqual([
      { slot: 'rail', group: 'D', tool: 'base64-decode-encode', locale: 'en' },
      { slot: 'card', group: 'D', tool: 'base64-decode-encode', locale: 'en' },
    ]);
  });

  test('popup shows the campaign version and sends tool-promo-view', async ({ page }) => {
    test.setTimeout(45_000);
    await open(page, '/tools/password-hash-generator/', IN_CAMPAIGN);
    const popup = page.locator('.tool-popup');
    await expect(popup).toBeVisible({ timeout: 20_000 });
    await expect(popup.locator('h2')).toHaveText("Where do your users' password hashes live?");
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(popup.getByTestId('tool-campaign-popup-link')).toHaveAttribute('href', '/sovereignty-self-check/');
    await expect(popup.locator('a', { hasText: 'Start building for Free' })).toHaveAttribute('href', 'https://portal.authgear.com/');
    expect(await events(page)).toContainEqual({
      name: 'tool-promo-view',
      props: { group: 'A', tool: 'password-hash-generator', locale: 'en' },
    });
  });

  test('stays off before the start date and after the end date', async ({ page }) => {
    for (const when of [BEFORE, AFTER]) {
      await open(page, '/tools/password-hash-generator/', when);
      await expect(page.locator('a.tools-banner')).toBeVisible();
      await expect(page.getByTestId('tool-campaign-rail')).toHaveCount(0);
    }
  });

  // German and French pages keep today's version until reviewed copy exists:
  // covered by toolCampaign.test.ts, since /de/ tool pages don't hydrate
  // under `astro dev` with the Netlify emulation.
});

test.describe('tool campaign outside the campaign countries', () => {
  test.use({ timezoneId: 'America/New_York' });

  test('shows today’s version', async ({ page }) => {
    await open(page, '/tools/password-hash-generator/', IN_CAMPAIGN);
    await expect(page.locator('a.tools-banner')).toBeVisible();
    await expect(page.locator('.tools-github-tag')).toBeVisible();
    await expect(page.getByTestId('tool-campaign-rail')).toHaveCount(0);
    await expect(page.getByTestId('tool-campaign-card')).toHaveCount(0);
  });

  test('?tool-promo=on previews it anywhere', async ({ page }) => {
    await open(page, '/tools/password-hash-generator/?tool-promo=on', BEFORE);
    await expect(page.getByTestId('tool-campaign-rail')).toBeVisible();
  });
});

test.describe('tool campaign on a laptop narrower than 1200px', () => {
  test.use({ timezoneId: 'Europe/London', viewport: { width: 1100, height: 800 } });

  test('shows the wide banner under the tool instead of the side column', async ({ page }) => {
    await open(page, '/tools/password-hash-generator/', IN_CAMPAIGN);
    await expect(page.getByTestId('tool-campaign-banner')).toBeVisible();
    await expect(page.getByTestId('tool-campaign-rail')).toBeHidden();
  });
});

test.describe('tool campaign side column', () => {
  test.use({ timezoneId: 'Europe/London', viewport: { width: 1440, height: 900 } });

  test('sits right of the tool, which fills the main column, and the wide banner hides', async ({ page }) => {
    await open(page, '/tools/password-hash-generator/', IN_CAMPAIGN);
    const rail = page.getByTestId('tool-campaign-rail');
    await expect(rail).toBeVisible();
    await expect(page.getByTestId('tool-campaign-banner')).toBeHidden();
    const box = await page.evaluate(() => {
      const main = document.querySelector('.tc-layout__main')!.getBoundingClientRect();
      const tool = document.querySelector('.tools-widget-native')!.firstElementChild!.getBoundingClientRect();
      const rail = document.querySelector('.tc-rail')!.getBoundingClientRect();
      return { mainL: main.left, mainR: main.right, toolL: tool.left, toolR: tool.right, railL: rail.left };
    });
    expect(Math.round(box.toolL)).toBe(Math.round(box.mainL));
    expect(Math.round(box.toolR)).toBe(Math.round(box.mainR));
    expect(Math.round(box.railL - box.mainR)).toBe(32);
  });

  test('iframe tools get the side column too', async ({ page }) => {
    await open(page, '/tools/jwt-jwe-debugger/', IN_CAMPAIGN);
    await expect(page.getByTestId('tool-campaign-rail')).toContainText('Run your own login server in the UK or EU');
  });
});

test.describe('tool campaign on a phone', () => {
  test.use({ timezoneId: 'Europe/London', viewport: { width: 360, height: 780 } });

  test('fits the width', async ({ page }) => {
    await open(page, '/tools/password-hash-generator/', IN_CAMPAIGN);
    await expect(page.getByTestId('tool-campaign-banner')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(360);
  });
});

/**
 * Webflow → Strapi Localization Seed Script
 *
 * Seeds English and Chinese (zh-Hant-TW) content into the Strapi Single Type
 * entries for static pages. Content was extracted from Webflow via the
 * Webflow Designer MCP (the REST API pages-content endpoint requires a plan
 * upgrade and returns 404 on this account).
 *
 * Webflow localization status:
 *   - Homepage (/):            ✓ both EN + ZH
 *   - Pricing (/pricing):      ✓ both EN + ZH
 *   - About (/about):          EN only (not localized in Webflow)
 *   - CIAM (/ciam):            EN only
 *   - Once (/once):            EN only
 *   - Why Authgear:            EN only
 *   - Migrate:                 EN only
 *   - Schedule Demo:           EN only
 *
 * Usage:
 *   node scripts/import-from-webflow-localization.mjs [--dry-run]
 *
 * Required env vars:
 *   STRAPI_ADMIN_TOKEN  — Strapi full-access API token
 *   STRAPI_URL          — Strapi base URL (default: http://localhost:1337)
 */

const STRAPI_URL = process.env.STRAPI_URL ?? 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_ADMIN_TOKEN ?? '';
const ZH = 'zh-Hant-TW';

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');

if (!STRAPI_TOKEN && !DRY_RUN) {
  console.error('Error: STRAPI_ADMIN_TOKEN env var is required (or pass --dry-run).');
  process.exit(1);
}

if (DRY_RUN) console.log('[dry-run] No writes will be made to Strapi.\n');

// ── Seed Data ─────────────────────────────────────────────────────────────────
// Sourced from Webflow Designer API (MCP) on 2026-03-20.

const PAGES = [
  {
    endpoint: 'homepage',
    en: {
      seoTitle: 'Authgear CLOUD - Your Managed IAM Solution',
      seoDescription:
        'Authgear makes it easier for developers to meet complex authentication requirements, delivering a frictionless and exceptional digital experience.',
      heroTitle: 'Your Managed IAM Solution',
      heroSubtitle:
        'Enjoy the convenience of a SaaS platform with enterprise-grade security, high availability, and tailored support. Authgear Cloud simplifies identity management so you can focus on growing your business.',
    },
    zh: {
      seoTitle: 'Authgear CLOUD - Your Managed IAM Solution',
      seoDescription: null,
      heroTitle: '您的一站式身份管理方案',
      heroSubtitle:
        '享受 SaaS 平台帶來的便利，同時擁有企業級安全性、高易用性和客製化支援。 Authgear Cloud 簡化了身分管理，讓您可以專注於業務成長。',
    },
  },
  {
    endpoint: 'pricing-page',
    en: {
      seoTitle: 'Pricing - Authgear',
      seoDescription:
        'Authentication and authorization solution for your applications and APIs, with flexible pricing for developers and corporations.',
      heroTitle: 'Authgear CLOUD\nWe manage everything for you',
      heroSubtitle: 'All-Inclusive Pricing: Full Feature Access with all Plans',
    },
    zh: {
      seoTitle: 'Pricing - Authgear',
      seoDescription: null,
      heroTitle: 'Authgear CLOUD\n我們為您安排一切',
      heroSubtitle: '所有方案皆享有完整功能',
    },
  },
  {
    endpoint: 'about-page',
    en: {
      seoTitle: 'About Us - Authgear',
      seoDescription:
        'Help developers to build better, more secure, privacy-aware software. Add secure and user friendly authentication and user management to your web & mobile apps in minutes.',
      heroTitle: 'About Us',
      heroSubtitle:
        'Authgear is the flagship product of SkyMakers. We have been serving various Enterprises and Startups in the UK, Canada, US, Hong Kong and Taiwan since 2009.\n\nOur mission, is to help developers to build better, more secure, privacy-aware software with our open sources technologies.',
    },
    zh: null, // not localized in Webflow
  },
  {
    endpoint: 'ciam-page',
    en: {
      seoTitle: 'Plug and Play CIAM - Authgear',
      seoDescription:
        'Add secure and user friendly authentication, authorization and user management to your web and mobile apps in minutes.',
      heroTitle: 'Plug and Play Secure Auth for Growth',
      heroSubtitle:
        'Secure auth and user management that converts more users for your apps.',
    },
    zh: null,
  },
  {
    endpoint: 'once-page',
    en: {
      seoTitle: 'Authgear ONCE – Own Your IAM with a Perpetual License',
      seoDescription:
        'Take control of your identity management with Authgear ONCE. A self-hosted IAM solution with no subscriptions, complete data ownership, and developer-friendly SDKs.',
      heroTitle: 'Like Auth0,\nBut Without the Subscription',
      heroSubtitle:
        'Take control of your identity and access management with Authgear ONCE — a self-hosted IAM platform you own forever. No subscriptions, no surprises.',
    },
    zh: null,
  },
  {
    endpoint: 'why-authgear-page',
    en: {
      seoTitle: 'Why Authgear - Your Path to Secure and Scalable Authentication',
      seoDescription:
        'Discover why Authgear is the ideal CIAM solution for your business. Learn how our platform simplifies user authentication, enhances security, and boosts user engagement. Experience the difference with Authgear.',
      heroTitle: 'Streamline Security, Empower Users: Build Faster with Authgear',
      heroSubtitle:
        "In today's digital world, robust security shouldn't come at the expense of user experience or affordability. Authgear bridges the gap, offering a powerful and user-friendly CIAM solution that empowers both you and your users.",
    },
    zh: null,
  },
  {
    endpoint: 'migrate-page',
    en: {
      seoTitle: 'Migrate to Authgear: 6 Months Free, Worry-Free Migration',
      seoDescription:
        "Simplify your authentication with Authgear's free 6-month migration offer. Enjoy expert support, flexible timelines, and a risk-free transition. Upgrade your authentication system and enhance user experience.",
      heroTitle: 'Migrate to Authgear: Get 6 Months Free & Worry-Free Migration',
      heroSubtitle:
        'Stop struggling with your current authentication system. Migrate to Authgear for a seamless and secure experience. Get 6 months free to see the difference, with full support from our expert team.',
    },
    zh: null,
  },
  {
    endpoint: 'schedule-demo-page',
    en: {
      seoTitle: 'Schedule Demo',
      seoDescription: null,
      heroTitle: 'Secure, Streamline & Empower Your Extended Workforce',
      heroSubtitle: 'Request a personalised demo and discover:',
    },
    zh: null,
  },
];

// ── Strapi helpers ────────────────────────────────────────────────────────────

async function strapiRequest(method, path, body) {
  const res = await fetch(`${STRAPI_URL}/api${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Strapi ${method} ${path} failed: ${res.status} ${text}`);
  }
  return res.json();
}

async function upsertLocale(endpoint, locale, fields) {
  const localeParam = locale === 'en' ? '?locale=en' : `?locale=${locale}`;
  let exists = false;
  try {
    const res = await strapiRequest('GET', `/${endpoint}${localeParam}`);
    exists = res?.data != null;
  } catch {
    exists = false;
  }

  // Filter out null values to avoid overwriting fields with null
  const data = Object.fromEntries(Object.entries(fields).filter(([, v]) => v != null));

  if (exists) {
    console.log(`  → [${locale}] Updating ${endpoint}`);
    if (!DRY_RUN) {
      await strapiRequest('PUT', `/${endpoint}${localeParam}`, { data });
    }
  } else if (locale === 'en') {
    console.log(`  → [${locale}] Creating ${endpoint}`);
    if (!DRY_RUN) {
      await strapiRequest('PUT', `/${endpoint}`, { data });
    }
  } else {
    // For non-English locales, we need to create via the localizations sub-endpoint
    console.log(`  → [${locale}] Creating ${endpoint} (new locale)`);
    if (!DRY_RUN) {
      try {
        const base = await strapiRequest('GET', `/${endpoint}?locale=en`);
        const documentId = base?.data?.documentId ?? base?.data?.id;
        if (!documentId) throw new Error('No documentId on English base entry');
        await strapiRequest('POST', `/${endpoint}/${documentId}/localizations`, {
          ...data,
          locale,
        });
      } catch (e) {
        console.warn(`  ⚠ localizations endpoint failed (${e.message}), falling back to PUT`);
        await strapiRequest('PUT', `/${endpoint}${localeParam}`, { data });
      }
    }
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  let ok = 0;
  let failed = 0;

  for (const page of PAGES) {
    console.log(`\nProcessing: ${page.endpoint}`);

    try {
      await upsertLocale(page.endpoint, 'en', page.en);
    } catch (err) {
      console.error(`  ✗ [en] Error:`, err.message);
      failed++;
      continue;
    }

    if (page.zh) {
      try {
        await upsertLocale(page.endpoint, ZH, page.zh);
      } catch (err) {
        console.error(`  ✗ [${ZH}] Error:`, err.message);
        failed++;
        continue;
      }
    } else {
      console.log(`  ℹ [${ZH}] Skipped — no Chinese content in Webflow (editors can add later)`);
    }

    ok++;
  }

  console.log(`\n✓ Done. Pages seeded: ${ok}, Errors: ${failed}`);
  if (DRY_RUN) console.log('(dry-run — no Strapi writes were made)');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});

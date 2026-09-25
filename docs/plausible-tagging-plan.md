# Plausible Analytics Tagging Plan

> Audit of all custom events tracked on the Authgear marketing website.
> Events are fired via Plausible's `script.tagged-events.js` (loaded in
> `BaseLayout.astro`): static elements carry `plausible-event-name--<event>`
> classes (see `src/components/nav/Button.astro`), with event properties as
> `plausible-event-<prop>--<value>` classes; React islands call
> `window.plausible()` directly.

---

## Naming Convention

| Pattern | Meaning |
|---------|---------|
| `signup` | User clicks a sign-up / get-started CTA (goes to the portal) |
| `signup-login` | User clicks the combined Signup/Login CTA (goes to the portal) — renamed from `login` in Aug 2026; pre-rename clicks live under the old `login` goal |
| `contact-form-submit` | User submits the contact / get-demo form |
| `get-demo` | User clicks a get-a-demo CTA (goes to `/schedule-demo`) |
| `*-click` | Explicit click tracking on a UI element (engagement only) |
| `calculator-*` | Interaction with the SMS cost calculator |

**Casing:** lowercase kebab-case throughout. No spaces, no camelCase.

**Conversion events carry a `location` property, not a location-specific
name.** As of Aug 2026 every signup/get-demo CTA fires one of the canonical
goals above with `props.location` identifying the exact button, so the goals
aggregate site-wide and split by location filter. The retired
location-in-name goals (`signup-hero`, `signup-calculator`,
`tool-popup-signup-click`, `tool-demo-click`, `login`) keep their history in
Plausible but receive no new events.

---

## Event Inventory

### Conversion events

These indicate the user took a meaningful step toward becoming a customer.

| Event | Component | Trigger | Destination |
|-------|-----------|---------|-------------|
| `signup` | `HomePage` — hero CTA "Get Started for Free" | Click | `portal.authgear.com` (with UTM) — fires with `props.location = 'home-hero'` |
| `signup` | `LoginCustomizationPlayground` — preview hover-mask CTA | Click | `portal.authgear.com` (with UTM) — fires with `props.location = 'playground-preview-hover'` |
| `signup` | `LoginCustomizationPlayground` — mobile top-right chip | Click | `portal.authgear.com` (with UTM) — fires with `props.location = 'playground-mobile-chip'`. Visible only at `< 900px`. |
| `signup` | `PricingPageClient` — plan finder recommended-plan CTA (Free / Developers / Business) | Click | Portal signup / pricing portal links — fires with `props.location = 'plan-finder'`, `props.plan` = `free` \| `developers` \| `business` |
| `get-demo` | `PricingPageClient` — plan finder recommended-plan CTA (Enterprise) | Click | `schedule-demo` — fires with `props.location = 'plan-finder'`, `props.plan = 'enterprise'` |
| `signup-login` | `SiteNav` — blue "Signup/Login" button (desktop + mobile header bar) | Click | `portal.authgear.com` — fires with `props.location = 'nav-header'` |
| `get-demo` | `SiteNav` — desktop ghost "Get a Demo" link | Click | `/schedule-demo` — fires with `props.location = 'nav-desktop'` |
| `get-demo` | `SiteNav` — mobile drawer "Get a Demo" button | Click | `/schedule-demo` — fires with `props.location = 'nav-mobile'` |
| `get-demo` | `HomePage` — hero product switch "On your Server / Get in touch" chip | Click | `/schedule-demo` — fires with `props.location = 'home-product-switch'` |
| `contact-form-submit` | `ContactForm` | Form submit (any page with `ContactForm`) | Internal API `/api/contact` |
| `signup` | `ReduceSmsOtpCostPage` — hero "Get Started Free →" | Click | `portal.authgear.com` (with UTM) — fires with `props.location = 'sms-hero'` |
| `get-demo` | `SmsCostCalculator` — bottom CTA "Start Saving Now — Get a Demo →" | Click | `/schedule-demo` — fires with `props.location = 'sms-calculator'` |
| `signup` | `SmsCostWidget` — "Start Free" CTA | Click | `portal.authgear.com` — fires with `props.location = 'sms-cost-widget'` |
| `signup` | `ToolWidget` — "Building authentication into your app? / Start Building" banner CTA | Click | `portal.authgear.com` — fires with `props.location = 'tool-widget'`. Replaced the `tool-demo-click` "Book a demo" CTA in Aug 2026 |
| `signup` | `ToolPopup` — "Start building for Free" | Click | `portal.authgear.com` — fires with `props.location = 'tool-popup'`. Popup body is per-tool (`Tools.common.popupPitches`), shows after 15s, dismissal persists 7 days |
| `signup` | Blog posts — inline CTA (what-is-jwks, well-known-openid-configuration, login-signup-ux-guide, top-10-sso-providers, authentication-solutions-guide, authentication-as-a-service, oidc-vs-saml, sms-otp-vulnerabilities-and-alternatives; EN + zh-Hant) | Click | `portal.authgear.com` — fires with `props.location = 'post-inline'` |
| `get-demo` | Blog posts — inline demo CTA (top-10-sso-providers, authentication-solutions-guide, authentication-as-a-service, sms-otp-vulnerabilities-and-alternatives; EN + zh-Hant) | Click | `/schedule-demo` — fires with `props.location = 'post-inline'` |
| `contact-form-submit` | `DataSovereigntyPage` — EU region waitlist callout (`#waitlist`) reuses `ContactForm` with a "Get in touch" button | Form submit | Netlify Forms (`contact`). Same event as every other `ContactForm`; split it out in Plausible by filtering on page `/solutions/data-sovereignty/`. Submissions carry `page = /solutions/data-sovereignty/` in the payload |
| `signup` | `DataSovereigntyPage` — "Start free" link in the Self-hosted vs Cloud table | Click | `portal.authgear.com` (with UTM) — fires with `props.location = 'data-sovereignty-table'` |
| `signup` | `KeycloakAlternativePage` — hero "Start for Free" and migration band "Start for Free" | Click | `portal.authgear.com` (with UTM) — fires with `props.location` = `keycloak-alternative-hero` \| `keycloak-alternative-migrate` |
| `get-demo` | `KeycloakAlternativePage` — hero "Schedule Demo" and migration band "Schedule Demo" | Click | `/schedule-demo` — fires with `props.location` = `keycloak-alternative-hero` \| `keycloak-alternative-migrate` |
| `get-demo` | `DataSovereigntyPage` — "Talk to us" (Private cloud column and note under the table, FAQ cost answer, closing CTA) and "Plan your migration" (migration callout) | Click | `/schedule-demo` — fires with `props.location` = `data-sovereignty-table` \| `data-sovereignty-faq` \| `data-sovereignty-migration` \| `data-sovereignty-footer` |

### Engagement events

These indicate the user is exploring content or interacting with features.

| Event | Component | Trigger | Notes |
|-------|-----------|---------|-------|
| `calculator-preset` | `ReduceSmsOtpCostPage` — preset buttons (10K / 100K / 500K / 1M) | Click | Fires on every preset button; no distinction between which preset was selected |
| `calculator-open` | `ReduceSmsOtpCostPage` — hero "Calculate My Savings" | Click | `#Saving-Calculator` anchor scroll — renamed from `signup-calculator` in Aug 2026 (it never was a signup click) |
| `tool-banner-click` | `ToolWidget` — banner image | Click | Links to `/` (placeholder) |
| `tool-tag-click` | `ToolWidget` — "This tool is crafted by Authgear" tag | Click | Links to `/` (placeholder) |
| `github-star` | `SiteNav` — GitHub star pill in the header bar (shown at ≥1200px) | Click | `github.com/authgear/authgear-server` — fires with `props.location = 'nav-header'` |
| `github-star` | `ToolPopup` — "Star us on GitHub" | Click | `github.com/authgear/authgear-server` — fires with `props.location = 'tool-popup'` (renamed from `tool-github-click` in Sep 2026; earlier clicks live under the old name) |
| `github-star` | `ToolWidget` — GitHub star badge | Click | `github.com/authgear/authgear-server` — fires with `props.location = 'tool-widget'` (renamed from `tool-github-tag-click` in Sep 2026) |
| `popup-close-click` | `ToolPopup` — "Close" button | Click | — |
| `pricing-plan-finder-interact` | `PricingPageClient` — plan finder (SMS toggle, log retention, apps/members/MAU sliders) | First interaction per page view | One-shot per page load (`useRef`). Fires with `props.first_action` = `sms` / `log-retention` / `apps` / `members` / `mau`. Refresh starts a new page view and can fire again. |
| `pricing-plan-finder-result` | `PricingPageClient` — plan finder recommended tier changes | SMS / log retention: on change if tier changes. Sliders: on pointer/key release if tier differs from gesture start | Does not fire on initial mount. Not fired on every slider step while dragging. Props: `recommended_plan`, `sms`, `log_retention`, `apps`, `members`, `mau` (`unlimited` when MAU slider locked). |
| `playground-interact` | `LoginCustomizationPlayground` — any meaningful control change | First interaction per page view | One-shot per session. Fires with `props.first_action` = `preset` / `logo` / `background` / `alignment` / `color` / `radius` / `link-decoration` / `accordion` |
| `playground-sheet-open` | `LoginCustomizationPlayground` — mobile "⚙ Customize" pill | First sheet open per page view | One-shot per page view (mobile only, `< 900px`). Pairs with `playground-interact` to measure open-rate vs. interact-rate. |
| `playground-cta` | `LoginCustomizationPlayground` — "Explore Login Gallery" button | Click | Links to `/login-gallery/` — mid-funnel signal |
| `eu-waitlist-click` | `PricingPageClient` — "Join the waitlist" pill in the EU data region notice under the plan cards | Click | `/solutions/data-sovereignty/#waitlist` — fires with `props.location = 'pricing-cards'`. One name for every entry point into the EU waitlist; sign-ups themselves are `contact-form-submit` on the destination page |
| `self-host-guide-click` | `DataSovereigntyPage` — "Self-host guide" / "Deploy with Helm" links (hero, table, closing CTA) | Click | `docs.authgear.com/deployment/helm` — fires with `props.location` = `hero` \| `table` \| `footer`. Self-host intent signal for the data-sovereignty audience |

---

## Event Properties

Properties unlock filtering in Plausible's dashboard and remove the need for separate event names for variants.

| Event | Property | Value example | Rationale |
|-------|----------|---------------|-----------|
| `signup` | `location` | `"home-hero"`, `"playground-preview-hover"`, `"playground-mobile-chip"`, `"plan-finder"`, `"tool-widget"`, `"tool-popup"`, `"sms-hero"`, `"sms-cost-widget"`, `"post-inline"`, `"data-sovereignty-table"`, `"keycloak-alternative-hero"`, `"keycloak-alternative-migrate"` | Distinguish where signups originate — all implemented |
| `signup` | `plan` | `"free"`, `"developers"`, `"business"` | Plan finder recommended tier when CTA is clicked (`location` must be `plan-finder`; the Enterprise tier fires `get-demo` instead) |
| `signup-login` | `location` | `"nav-header"` | Implemented — the header-bar Signup/Login button serves all widths (the mobile drawer login/signup buttons were removed in Aug 2026); split desktop vs mobile clicks with the device dimension |
| `github-star` | `location` | `"nav-header"`, `"tool-popup"`, `"tool-widget"` | Implemented — every GitHub star click on the site fires this one goal; split by location |
| `get-demo` | `location` | `"nav-desktop"`, `"nav-mobile"`, `"home-product-switch"`, `"sms-calculator"`, `"plan-finder"`, `"data-sovereignty-table"`, `"data-sovereignty-faq"`, `"data-sovereignty-migration"`, `"data-sovereignty-footer"`, `"keycloak-alternative-hero"`, `"keycloak-alternative-migrate"` | Implemented — leaves room for tagging other get-demo CTAs later |
| `get-demo` | `plan` | `"enterprise"` | Sent only from the plan finder's Enterprise CTA (`location` = `plan-finder`) |
| `calculator-preset` | `preset` | `"10K"`, `"100K"`, `"500K"`, `"1M"` | See which preset is most popular |
| `pricing-plan-finder-interact` | `first_action` | `"sms"`, `"log-retention"`, `"apps"`, `"members"`, `"mau"` | Which control drew the first plan-finder interaction on that page view |
| `pricing-plan-finder-result` | `recommended_plan` | `"free"`, `"developers"`, `"business"`, `"enterprise"` | Recommended cloud tier after a qualifying control change |
| `pricing-plan-finder-result` | `sms` | `"yes"`, `"no"` | SMS/WhatsApp toggle at time of event |
| `pricing-plan-finder-result` | `log_retention` | `"1"`, `"60"`, `"180"` | Log retention days at time of event |
| `pricing-plan-finder-result` | `apps`, `members` | numeric (e.g. `10` for 10+) | Effective app/member counts |
| `pricing-plan-finder-result` | `mau` | numeric or `"unlimited"` | MAU used for recommendation, or unlimited when slider locked |
| `contact-form-submit` | `page` | `"schedule-demo"`, `"pricing"` | Form appears on multiple pages — not yet implemented |
| `eu-waitlist-click` | `location` | `"pricing-cards"` | Which page or block sent the visitor to the EU waitlist; more values follow as comparison-page blocks land |
| `self-host-guide-click` | `location` | `"hero"`, `"table"`, `"footer"` | Which self-host link on `/solutions/data-sovereignty` drew the click |

To add a property, pass it as the second argument to `plausible()`:
```tsx
plausible('signup', { props: { location: 'nav-mobile' } });
```

---

## Coverage Gaps

| Gap | Recommendation |
|-----|---------------|
| ~~Goal registration~~ (done 2026-08-21) | `get-demo`, `signup-login`, and `calculator-open` are registered as goals in Plausible. The retired goals (`login`, `tool-demo-click`, `tool-popup-signup-click`, `signup-hero`, `signup-calculator`) no longer receive events — kept for history |
| `tool-banner-click` / `tool-tag-click` destination is `/` | These are placeholder `href` values; update to real URLs and confirm event names still apply |
| No page-context on `contact-form-submit` | The form is used on multiple pages (schedule-demo, pricing, etc.) — add a `page` property to distinguish |
| Calculator interaction depth | Only preset clicks are tracked; slider changes are not — consider adding `calculator-result` event when the user sees the output |
| `github-star` goal not registered | Sep 2026: all GitHub star clicks (nav pill, tool popup, tool widget) fire `github-star` with a `location` prop. Register it as a custom-event goal in Plausible; events are stored regardless, so history backfills once the goal exists. The retired `tool-github-click` and `tool-github-tag-click` goals keep their pre-rename history |
| `self-host-guide-click` / `eu-waitlist-click` goals not registered | Sep 2026: added with the `/solutions/data-sovereignty` page and the pricing-page EU notice. Register both as custom-event goals in Plausible (events are stored regardless, so history backfills once the goals exist) |

---

## Implementation Reference

| Helper | File | Use case |
|--------|------|---------|
| `Button` (`plausibleEvent` / `plausibleLocation` props) | `src/components/nav/Button.astro` | Nav CTAs — emits `plausible-event-name--*` / `plausible-event-location--*` classes |
| `plausible-event-name--*` class | any static element | Astro components — tagged-events class convention |
| `window.plausible()` via `src/lib/plausible.ts` | React islands | Programmatic calls with props |
| Script tag | `src/layouts/BaseLayout.astro` | Loads `script.tagged-events.js`; domain from `PUBLIC_PLAUSIBLE_DOMAIN` |

---

## Event Count Summary

| Category | Count |
|----------|-------|
| Conversion | 15 event placements (5 distinct names) |
| Engagement | 9 event placements (9 distinct names) |
| **Total** | **24 event placements across 14 distinct event names** |

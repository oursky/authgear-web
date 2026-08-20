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
| `signup` | User clicks a sign-up / get-started CTA |
| `signup-login` | User clicks the combined Signup/Login CTA (goes to the portal) — renamed from `login` in Aug 2026; pre-rename clicks live under the old `login` goal |
| `contact-form-submit` | User submits the contact / get-demo form |
| `get-demo` | User clicks a get-a-demo CTA (goes to `/schedule-demo`) |
| `signup-*` | Sign-up CTA specific to a page context |
| `*-click` | Explicit click tracking on a UI element |
| `calculator-*` | Interaction with the SMS cost calculator |

**Casing:** lowercase kebab-case throughout. No spaces, no camelCase.

---

## Event Inventory

### Conversion events

These indicate the user took a meaningful step toward becoming a customer.

| Event | Component | Trigger | Destination |
|-------|-----------|---------|-------------|
| `signup` | `HomePage` — hero CTA "Get Started for Free" | Click | `portal.authgear.com` (with UTM) — fires with `props.location = 'home-hero'` |
| `signup` | `LoginCustomizationPlayground` — preview hover-mask CTA | Click | `portal.authgear.com` (with UTM) — fires with `props.location = 'playground-preview-hover'` |
| `signup` | `LoginCustomizationPlayground` — mobile top-right chip | Click | `portal.authgear.com` (with UTM) — fires with `props.location = 'playground-mobile-chip'`. Visible only at `< 900px`. |
| `signup` | `PricingPageClient` — plan finder recommended-plan CTA | Click | Portal signup / pricing portal links / `schedule-demo` (Enterprise) — fires with `props.location = 'plan-finder'`, `props.plan` = `free` \| `developers` \| `business` \| `enterprise` |
| `signup-login` | `SiteNav` — blue "Signup/Login" button (desktop + mobile header bar) | Click | `portal.authgear.com` — fires with `props.location = 'nav-header'` |
| `get-demo` | `SiteNav` — desktop ghost "Get a Demo" link | Click | `/schedule-demo` — fires with `props.location = 'nav-desktop'` |
| `get-demo` | `SiteNav` — mobile drawer "Get a Demo" button | Click | `/schedule-demo` — fires with `props.location = 'nav-mobile'` |
| `get-demo` | `HomePage` — hero product switch "On your Server / Get in touch" chip | Click | `/schedule-demo` — fires with `props.location = 'home-product-switch'` |
| `contact-form-submit` | `ContactForm` | Form submit (any page with `ContactForm`) | Internal API `/api/contact` |
| `signup-hero` | `ReduceSmsOtpCostPage` — hero "Get Started Free →" | Click | `portal.authgear.com` (with UTM) |
| `signup-calculator` | `ReduceSmsOtpCostPage` — hero "Calculate My Savings" | Click | `#Saving-Calculator` anchor |
| `signup-calculator` | `ReduceSmsOtpCostPage` — bottom CTA "Start Saving Now" | Click | `portal.authgear.com` |
| `tool-popup-signup-click` | `ToolPopup` — "Start building for Free" | Click | `portal.authgear.com` |

### Engagement events

These indicate the user is exploring content or interacting with features.

| Event | Component | Trigger | Notes |
|-------|-----------|---------|-------|
| `calculator-preset` | `ReduceSmsOtpCostPage` — preset buttons (10K / 100K / 500K / 1M) | Click | Fires on every preset button; no distinction between which preset was selected |
| `tool-banner-click` | `ToolWidget` — banner image | Click | Links to `/` (placeholder) |
| `tool-tag-click` | `ToolWidget` — "This tool is crafted by Authgear" tag | Click | Links to `/` (placeholder) |
| `tool-github-click` | `ToolPopup` — "Star us on GitHub" | Click | `github.com/authgear/authgear-server` |
| `tool-github-tag-click` | `ToolWidget` — GitHub star badge | Click | `github.com/authgear/authgear-server` |
| `popup-close-click` | `ToolPopup` — "Close" button | Click | — |
| `pricing-plan-finder-interact` | `PricingPageClient` — plan finder (SMS toggle, log retention, apps/members/MAU sliders) | First interaction per page view | One-shot per page load (`useRef`). Fires with `props.first_action` = `sms` / `log-retention` / `apps` / `members` / `mau`. Refresh starts a new page view and can fire again. |
| `pricing-plan-finder-result` | `PricingPageClient` — plan finder recommended tier changes | SMS / log retention: on change if tier changes. Sliders: on pointer/key release if tier differs from gesture start | Does not fire on initial mount. Not fired on every slider step while dragging. Props: `recommended_plan`, `sms`, `log_retention`, `apps`, `members`, `mau` (`unlimited` when MAU slider locked). |
| `playground-interact` | `LoginCustomizationPlayground` — any meaningful control change | First interaction per page view | One-shot per session. Fires with `props.first_action` = `preset` / `logo` / `background` / `alignment` / `color` / `radius` / `link-decoration` / `accordion` |
| `playground-sheet-open` | `LoginCustomizationPlayground` — mobile "⚙ Customize" pill | First sheet open per page view | One-shot per page view (mobile only, `< 900px`). Pairs with `playground-interact` to measure open-rate vs. interact-rate. |
| `playground-cta` | `LoginCustomizationPlayground` — "Explore Login Gallery" button | Click | Links to `/login-gallery/` — mid-funnel signal |

---

## Event Properties

Currently **no custom properties** are sent with any event. All events are simple hits.

### Recommended properties to add

Adding properties unlocks filtering in Plausible's dashboard and removes the need for separate event names for variants.

| Event | Property to add | Value example | Rationale |
|-------|----------------|---------------|-----------|
| `signup` | `location` | `"home-hero"`, `"playground-preview-hover"`, `"playground-mobile-chip"`, `"plan-finder"` | Distinguish where signups originate — all implemented |
| `signup` | `plan` | `"free"`, `"developers"`, `"business"`, `"enterprise"` | Plan finder recommended tier when CTA is clicked (`location` must be `plan-finder`) |
| `signup-login` | `location` | `"nav-header"` | Implemented — the header-bar Signup/Login button serves all widths (the mobile drawer login/signup buttons were removed in Aug 2026); split desktop vs mobile clicks with the device dimension |
| `get-demo` | `location` | `"nav-desktop"`, `"nav-mobile"`, `"home-product-switch"` | Implemented — leaves room for tagging other get-demo CTAs later |
| `calculator-preset` | `preset` | `"10K"`, `"100K"`, `"500K"`, `"1M"` | See which preset is most popular |
| `pricing-plan-finder-interact` | `first_action` | `"sms"`, `"log-retention"`, `"apps"`, `"members"`, `"mau"` | Which control drew the first plan-finder interaction on that page view |
| `pricing-plan-finder-result` | `recommended_plan` | `"free"`, `"developers"`, `"business"`, `"enterprise"` | Recommended cloud tier after a qualifying control change |
| `pricing-plan-finder-result` | `sms` | `"yes"`, `"no"` | SMS/WhatsApp toggle at time of event |
| `pricing-plan-finder-result` | `log_retention` | `"1"`, `"60"`, `"180"` | Log retention days at time of event |
| `pricing-plan-finder-result` | `apps`, `members` | numeric (e.g. `10` for 10+) | Effective app/member counts |
| `pricing-plan-finder-result` | `mau` | numeric or `"unlimited"` | MAU used for recommendation, or unlimited when slider locked |
| `signup-calculator` | `location` | `"hero"`, `"bottom-cta"` | Two CTAs share the same event name |
| `contact-form-submit` | `page` | `"schedule-demo"`, `"pricing"` | Form appears on multiple pages |

To add a property, pass it as the second argument to `plausible()`:
```tsx
plausible('signup', { props: { location: 'nav-mobile' } });
```

---

## Coverage Gaps

| Gap | Recommendation |
|-----|---------------|
| `get-demo` / `signup-login` goals not registered | Both custom events fire from the site but only show in the Plausible dashboard's Goals panel after adding them as goals in the site settings. The old `login` goal no longer receives events (renamed to `signup-login` in Aug 2026) — keep it for history |
| `tool-banner-click` / `tool-tag-click` destination is `/` | These are placeholder `href` values; update to real URLs and confirm event names still apply |
| No page-context on `contact-form-submit` | The form is used on multiple pages (schedule-demo, pricing, etc.) — add a `page` property to distinguish |
| Calculator interaction depth | Only preset clicks are tracked; slider changes are not — consider adding `calculator-result` event when the user sees the output |
| GitHub star clicks tracked in two places (`tool-github-click` and `tool-github-tag-click`) | Consider unifying under one event name with a `location` property |

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
| Conversion | 10 event placements (5 distinct names) |
| Engagement | 7 event placements (7 distinct names) |
| **Total** | **17 event placements across 12 distinct event names** |

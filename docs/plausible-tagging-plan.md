# Plausible Analytics Tagging Plan

> Audit of all custom events tracked on the Authgear marketing website.
> All events are fired via `usePlausible()` from `next-plausible`. No CSS-class tracking.

---

## Naming Convention

| Pattern | Meaning |
|---------|---------|
| `signup` | User clicks a sign-up / get-started CTA |
| `login` | User clicks a log-in CTA |
| `contact-form-submit` | User submits the contact / get-demo form |
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
| `signup` | `SiteNav` — mobile signup button | Click | `portal.authgear.com` |
| `signup` | `HomePage` — hero CTA "Get Started" | Click | `portal.authgear.com` (with UTM) |
| `login` | `SiteNav` — mobile login button | Click | `portal.authgear.com` |
| `login` | `SiteNav` — desktop login button | Click | `portal.authgear.com` |
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

---

## Event Properties

Currently **no custom properties** are sent with any event. All events are simple hits.

### Recommended properties to add

Adding properties unlocks filtering in Plausible's dashboard and removes the need for separate event names for variants.

| Event | Property to add | Value example | Rationale |
|-------|----------------|---------------|-----------|
| `signup` | `location` | `"nav-mobile"`, `"nav-desktop"`, `"home-hero"` | Distinguish where signups originate |
| `login` | `location` | `"nav-mobile"`, `"nav-desktop"` | Same as above |
| `calculator-preset` | `preset` | `"10K"`, `"100K"`, `"500K"`, `"1M"` | See which preset is most popular |
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
| Desktop signup button missing | The desktop nav has a "Get Demo" `Link` (goes to `/schedule-demo`) but no dedicated signup CTA — verify this is intentional |
| `tool-banner-click` / `tool-tag-click` destination is `/` | These are placeholder `href` values; update to real URLs and confirm event names still apply |
| No page-context on `contact-form-submit` | The form is used on multiple pages (schedule-demo, pricing, etc.) — add a `page` property to distinguish |
| Calculator interaction depth | Only preset clicks are tracked; slider changes are not — consider adding `calculator-result` event when the user sees the output |
| GitHub star clicks tracked in two places (`tool-github-click` and `tool-github-tag-click`) | Consider unifying under one event name with a `location` property |

---

## Implementation Reference

| Helper | File | Use case |
|--------|------|---------|
| `PlausibleLink` | `frontend/components/PlausibleLink.tsx` | Server components — tracked `<a>` |
| `PlausibleButton` | `frontend/components/PlausibleButton.tsx` | Server components — tracked `<button>` |
| `usePlausible()` | `next-plausible` | Client components — programmatic calls |
| `PlausibleProvider` | `frontend/app/layout.tsx` | Root wrapper; domain from `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` |

---

## Event Count Summary

| Category | Count |
|----------|-------|
| Conversion | 9 event placements (5 distinct names) |
| Engagement | 6 event placements (6 distinct names) |
| **Total** | **15 event placements across 11 distinct event names** |

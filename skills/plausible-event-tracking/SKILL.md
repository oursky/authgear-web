---
name: plausible-event-tracking
description: Use when adding, updating, or auditing Plausible analytics events in the authgear-web frontend — tagging CTAs, buttons, links, form submissions, or any user interaction for tracking.
---

# Plausible Event Tracking

## Overview

`next-plausible` is installed. `PlausibleProvider` wraps the root layout. Two ready-made helper components handle most tracking needs without touching server component boundaries. **Always update the tagging plan after adding events.**

## Which mechanism to use?

| Element | Component type | Use |
|---------|---------------|-----|
| `<a>` link | Server or client | `<PlausibleLink>` |
| `<button>` | Server or client | `<PlausibleButton>` |
| Any element | Already `'use client'` | `usePlausible()` in the handler |

**Do not create a new client component just to add tracking.** `PlausibleLink` and `PlausibleButton` are client components that can be imported into server components — use them.

## Mechanisms

### PlausibleLink — tracked `<a>`

```tsx
import PlausibleLink from '@/components/PlausibleLink';

<PlausibleLink
  href="https://portal.authgear.com/"
  target="_blank"
  className="button-primary w-button"
  eventName="signup"
>
  Get Started
</PlausibleLink>
```

Accepts all standard `<a>` props. Drop-in replacement for `<a>`.

### PlausibleButton — tracked `<button>`

```tsx
import PlausibleButton from '@/components/PlausibleButton';

<PlausibleButton className="ag-preset-btn" eventName="calculator-preset">
  100K
</PlausibleButton>
```

Accepts all standard `<button>` props. Drop-in replacement for `<button>`.

### usePlausible() — inside existing client components

```tsx
'use client';
import { usePlausible } from 'next-plausible';

function PricingToggle() {
  const plausible = usePlausible();
  return (
    <button onClick={() => plausible('pricing-toggle', { props: { period: 'annual' } })}>
      Annual
    </button>
  );
}
```

## Naming Convention

- **Format:** `lowercase-kebab-case` — no underscores, no camelCase
- **No page prefix** — `faq-expand` not `pricing-faq-expand`
- **Describe the action** — `signup`, `faq-expand`, `pricing-toggle`

## Event Categories

Check `docs/plausible-tagging-plan.md` first — reuse an existing name if one fits.

**Conversion** (user moving toward becoming a customer):
`signup`, `login`, `contact-form-submit`, `signup-hero`, `signup-calculator`

**Engagement** (user interacting with content):
`calculator-preset`, `faq-expand`, `pricing-toggle`, `tool-tag-click`, `tool-banner-click`, `popup-close-click`, `tool-github-click`

## Adding Properties

Use `props` to distinguish variants instead of creating separate event names:

```tsx
plausible('signup', { props: { location: 'nav-mobile' } });
plausible('signup', { props: { location: 'home-hero' } });
```

## Workflow

1. Check `docs/plausible-tagging-plan.md` — does this event already exist? Reuse the name.
2. Pick the mechanism from the table above.
3. Implement — prefer `PlausibleLink`/`PlausibleButton` over splitting a server component.
4. Update `docs/plausible-tagging-plan.md`: add new events to the inventory table under the correct category (Conversion or Engagement), with component, trigger, and destination.

## Common Mistakes

| Mistake | Correct approach |
|---------|-----------------|
| `snake_case` names (`pricing_toggle_switch`) | `kebab-case`: `pricing-toggle` |
| Page-prefixed names (`pricing-faq-expand`) | Drop the prefix: `faq-expand` |
| New client component just to track a link | `<PlausibleLink>` in the server component |
| `usePlausible()` in a server component | Import `PlausibleLink`/`PlausibleButton` instead |
| Forgetting to update the tagging plan | Always update `docs/plausible-tagging-plan.md` |
| `<PlausibleButton eventName="x" onClick={() => { plausible('x'); }}>` | Double-fires the event — in `'use client'` components with custom `onClick` logic or props, use `usePlausible()` directly on a plain `<button>` instead |

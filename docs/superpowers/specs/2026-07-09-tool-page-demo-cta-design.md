# Tool-page demo CTA — design

**Date:** 2026-07-09
**Status:** Approved, ready for implementation plan
**Author:** Marketing/SEO (via Claude)

## Context

The June 2026 traffic audit found the developer tools drive the most site traffic (base64 ~11.5K entries/mo, password-hash ~4.9K) but convert to the demo at only 0.2–2% — far below the SMS/OTP content cluster (8–20%). The tool pages already promote Authgear (a homepage banner, a "crafted by" tag, and a signup popup, all Plausible-tracked) but nothing points to `/schedule-demo/`.

This is a **volume bet**: even a small lift on the tools' large traffic yields a meaningful absolute number of demo views. We want to add a demo CTA and measure whether it moves demo pull-through.

## Decision summary

- **Method:** ship + measure (not a true split test). No A/B framework exists; the site measures via Plausible tagged events. A before/after read is proportionate for a marketing tool page.
- **Scope:** all tool pages, via the shared `ToolWidget` component (en + zh-Hant).
- **Form:** a dedicated demo CTA bar, added without disturbing the existing banner/popup (no cannibalization of current signup conversions).

## Design

### 1. Component — `src/components/tools/ToolWidget.tsx`

Add a demo CTA block as the first child of `.tools-banner-wrapper`, above the existing crafted-by tag / banner / GitHub row.

- Copy (from i18n): text `demoCtaText` + button `demoCtaButton`.
- Link: `href="/schedule-demo/"`, `target="_blank"`.
- Class includes `plausible-event-name--tool-demo-click` for click tracking (matches the existing `plausible-event-name--…` convention on the tag/banner/github links).
- Wrapped in a new container class (e.g. `tools-demo-cta`) for styling.

### 2. i18n — `src/lib/tools/messages/{en,zh-Hant}/common.ts`

Add two keys to the `common` object:

| Key | en | zh-Hant |
|-----|----|---------| 
| `demoCtaText` | "Building authentication into your app?" | "正在為你的應用程式建置身分驗證嗎？" |
| `demoCtaButton` | "Book a demo" | "預約示範" |

The widget reads these via the existing `t('demoCtaText')` / `t('demoCtaButton')` pattern (`Tools.common.*`).

### 3. Styling

A small, restrained CTA bar consistent with the tool-widget aesthetic (Authgear navy/electric-blue, not shouty). One line of text with an inline button, full width of the tools container, sitting just below the tool and above the banner row. Minimal CSS added alongside the existing `tools-banner-wrapper` styles. Must look correct on mobile (stacks text + button) and in both locales.

### 4. Measurement

- **Primary metric:** Plausible custom event `tool-demo-click`, set up as a goal in Plausible. Because every tool renders the same widget, the event's page breakdown shows **which tools actually convert**.
- **Secondary metric:** `/schedule-demo/` pull-through by tool entry page (the method used in the June audit), compared before vs after ship.
- **Review:** early-August 2026 audit.

## Out of scope

- True A/B split-test infrastructure (variant assignment, Plausible custom properties).
- Any change to the existing homepage banner, crafted-by tag, GitHub tag, or signup popup.
- Copy experiments / multiple CTA variants.

## Testing & validation

- `npm run check` → 0 errors; `npm run build` → clean.
- Visual check on at least one tool page in dev (`/tools/base64-decode-encode`) in both en and zh-Hant: CTA renders, copy is correct, button links to `/schedule-demo/`, layout holds on mobile width.
- Confirm the rendered anchor carries the `plausible-event-name--tool-demo-click` class (so the Plausible goal fires).
- After deploy: create the `tool-demo-click` goal in Plausible.

## Rollout

Feature branch → PR to `oursky/authgear-web` (from fork) → merge → deploy → create Plausible goal → measure through the August audit.

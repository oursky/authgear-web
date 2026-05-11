# Playground mobile bottom-sheet — design

## Problem

On narrow screens (`< 900px`) the `LoginCustomizationPlayground` config panel stacks below the preview. The panel runs ~12 accordion sections deep, which makes the marketing page (`/features/customization/`) several screen-heights tall. Visitors scroll past the playground without realising the panels are interactive, or get fatigued scrolling through controls they will not all use.

## Goal

On mobile, hide the config panel behind a single tap. Keep the preview always visible and editable in real time. Surface the signup CTA without relying on hover (which does not exist on touch).

Out of scope: redesigning the desktop layout, restructuring the accordions, or changing what controls exist.

## Pattern: contained bottom sheet, 40 / 60 split

The playground container becomes a fixed-height "stage" on mobile. A pill button triggers a sheet that slides up over the bottom 60% of the container, leaving the preview visible (and live-updating) in the top 40%.

```
┌──────────── playground container ────────────┐
│                                                │
│  ┌─────────────────────────────────────────┐  │
│  │            preview (top 40%)             │  │  ← always visible
│  │   [Get Started →]   (top-right chip)     │  │
│  │                                          │  │
│  │   Welcome to Acme                        │  │
│  │   ┌──────────────────────────────────┐   │  │
│  │   │ email                            │   │  │
│  │   └──────────────────────────────────┘   │  │
│  │   [ Sign in ]                            │  │
│  └─────────────────────────────────────────┘  │
│                                                │
│            [ ⚙ Customize ]   ← trigger pill   │
└──────────── 640px max ────────────────────────┘

When the trigger is tapped:

┌──────────── playground container ────────────┐
│  ┌─────────────────────────────────────────┐  │
│  │            preview (top 40%)             │  │  ← stays live
│  │   [Get Started →]                        │  │
│  └─────────────────────────────────────────┘  │
│  ┌─────────────────────────────────────────┐  │
│  │              ━━━━ (drag handle)           │  │
│  │  Try it out                          [×] │  │
│  │  ─────────────────────────────────────   │  │
│  │  ‹Your brand› ‹Finance› ‹Health› ...    │  │  ← preset chips
│  │  Your company name                       │  │
│  │  [_________________________________]     │  │
│  │  ▸ Logo                                  │  │
│  │  ▾ Background                            │  │
│  │      Background colour  [#cbd5e1]        │  │
│  │      Image  [Upload]                     │  │
│  │  ▸ Card                                  │  │
│  │  ...                                     │  │
│  │  ─────────────────────────────────────   │  │
│  │  [          Get Started →          ]     │  │  ← sticky inside sheet
│  └─────────────────────────────────────────┘  │
└────────────────────────────────────────────────┘
```

## Detailed behaviour

### Breakpoint

- Mobile rules apply at `(width < 900px)` — matches the existing breakpoint already used in `LoginCustomizationPlayground.css`.
- A `useMediaQuery('(min-width: 900px)')` hook gates the React rendering of the sheet vs. the side-by-side panel so we do not mount both.

### Container

- Mobile-only height: `min(100svh - 6rem, 640px)`. `100svh` (small-viewport-height) avoids the iOS Safari address-bar jump.
- `position: relative` so children can `position: absolute` against it.
- Desktop styling untouched.

### Trigger pill (`⚙ Customize`)

- Anchored to the playground container: `position: absolute; bottom: 18px; left: 50%; transform: translateX(-50%);`
- Dark slate fill (`#0f172a`), white text, full pill radius, soft drop shadow.
- Hidden via `aria-hidden` + `visibility: hidden` while the sheet is open.
- Tap → sets `sheetOpen = true`, transitions sheet in.

### Top-right "Get Started →" chip

- Persistent inside the preview area, top-right corner: `position: absolute; top: 12px; right: 12px;`
- Translucent dark background `rgba(15,23,42,0.85)` with `backdrop-filter: blur(4px)` and white text.
- Smaller than the bottom pill (compact secondary affordance, not the headline).
- Same `href` as the desktop preview-mask CTA (`portal.authgear.com?utm_source=feature-customization&utm_medium=link&utm_campaign=playground-preview-hover`).
- Visible at all times on mobile; hidden on desktop (≥ 900px) where the hover-mask handles this.

### Sheet

- `<aside role="dialog" aria-modal="false" aria-label="Customize the login preview">` rendered inside the playground container.
- `position: absolute; left: 0; right: 0; bottom: 0; height: 60%;`
- `background: #fff; border-top-left-radius: 16px; border-top-right-radius: 16px; box-shadow: 0 -8px 22px rgba(0,0,0,0.12);`
- Anatomy (top to bottom):
  1. Decorative drag-handle bar: 36 × 4 px, `#cbd5e1`, 8 px below top edge, 8 px below itself. Non-interactive.
  2. Header row: `Try it out` (slate-900, 600 weight, 18 px) + close X button on the right (24 px circular, `#f1f5f9` background, `aria-label="Close customization"`).
  3. Body: scrollable, contains the existing preset toolbar + "Your company name" field + all accordion sections. Same DOM as desktop panel, no parallel implementation.
  4. Sticky bottom: primary `Get Started →` button (full width inside the sheet padding, blue `#2563eb`, white text, same destination as the chip). Pinned via `position: sticky; bottom: 0;` with a top border to separate it from scrolled content.

### Dismissal

- Close X.
- Tap on the preview area above the sheet (the preview becomes the "backdrop").
- `Escape` key on physical keyboards / hardware key bindings.
- No drag-down-to-close gesture (avoids extra gesture-handling code; v2 can add).

### Live preview while sheet is open

- Preview is **not** dimmed and remains interactive. Color / preset / radius changes in the sheet update the preview in real time, which is the whole point of the playground.
- The sheet itself receives focus on open; preview controls inside the sheet keep working.

### Transitions

- Open: `transform: translateY(100%) → translateY(0)` over `250ms cubic-bezier(0.2, 0.8, 0.2, 1)`.
- Close: `transform: translateY(0) → translateY(100%)` over `200ms ease-in`.
- `prefers-reduced-motion: reduce` → both transitions become 0 ms.

### Accessibility

- Trigger pill: `aria-expanded={sheetOpen}` `aria-controls={sheetId}`.
- Sheet: `role="dialog"`, `aria-modal="false"` (not full-screen modal; preview remains interactive), `aria-labelledby` pointing at the "Try it out" heading id.
- On open: move focus to the close button (so first `Tab` lands on the preset toolbar).
- On close: return focus to the trigger pill.
- `Escape` key handler bound only while open.
- The preview-area tap-to-close uses an invisible overlay button with `aria-label="Close customization"` to keep keyboard parity.

### Telemetry

Existing events stay; we add two and reuse `location`:

| Event | Trigger | `location` prop |
|---|---|---|
| `signup` (existing) | Mobile top-right chip click | `playground-mobile-chip` |
| `signup` (existing) | Mobile sheet sticky bottom CTA click | `playground-mobile-sheet` |
| `signup` (existing) | Desktop preview-hover CTA click | `playground-preview-hover` (already in place) |
| `playground-sheet-open` (new) | First sheet open per page view | — (one-shot ref, same pattern as `playground-interact`) |

`playground-interact` continues to fire from the existing setter wrappers because the sheet wraps the same controls. No duplication.

Update `docs/plausible-tagging-plan.md` with the new event row and the two extra `location` values.

### Desktop

Unchanged. The sheet markup is not rendered (or is `display: none`) above the 900 px breakpoint; the existing side-by-side panel and hover-mask CTA remain.

## Implementation outline

- **`LoginCustomizationPlayground.tsx`**
  - Add `useMediaQuery` (small inline hook) → `isNarrow` boolean.
  - Add `sheetOpen` state, `sheetOpenedRef` for one-shot telemetry.
  - Add `sheetId` for ARIA wiring.
  - Render the existing panel inside the sheet when `isNarrow`, in place when `!isNarrow`.
  - Render the trigger pill, the top-right chip, and the sheet wrapper inside the playground container, all gated on `isNarrow`.
  - Existing preview-hover-mask `<a>` is wrapped in `{!isNarrow ? ... : null}`.
- **`LoginCustomizationPlayground.css`**
  - Add mobile container height rules under the existing `@media (width < 900px)`.
  - Add `.ag-login-play__trigger-pill`, `.ag-login-play__signup-chip`, `.ag-login-play__sheet`, `.ag-login-play__sheet-header`, `.ag-login-play__sheet-body`, `.ag-login-play__sheet-cta` classes.
  - Reduce-motion override.
- **`src/i18n/en.json` + `src/i18n/zh-Hant.json`**
  - `customizeCta`: "⚙ Customize" / "⚙ 自訂"
  - `closeSheetAria`: "Close customization" / "關閉自訂面板"
  - The "Get Started →" string reuses the existing preview-hover-mask key (`previewHoverMaskCta`).
- **`docs/plausible-tagging-plan.md`**
  - Add `playground-sheet-open` row (engagement).
  - Add the two new `location` values for `signup`.

## Non-goals

- Drag-to-resize / multi-snap-point sheet.
- Replacing the desktop layout.
- Reorganising the accordion content.
- Persisting the sheet open/closed state across reloads.

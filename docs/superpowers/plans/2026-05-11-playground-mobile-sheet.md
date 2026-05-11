# Playground Mobile Bottom-Sheet Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the long stacked customization panel on narrow screens with a contained bottom-sheet pattern: preview keeps the top 40% of a fixed-height stage; a "⚙ Customize" pill opens a sheet over the bottom 60%. Surface signup CTA as a top-right chip plus a sticky bottom CTA inside the sheet (mobile has no hover).

**Architecture:** Same React island (`LoginCustomizationPlayground`) hosts both layouts. A `useMediaQuery('(min-width: 900px)')` hook decides whether the trigger pill / chip / close X / sticky CTA render; the panel DOM is shared between desktop and mobile, only its positioning and chrome change via CSS. Slide-up via CSS `transform` transition.

**Tech Stack:** React 19 (in an Astro 6 `client:visible` island), Tailwind v4 + a scoped `LoginCustomizationPlayground.css`, Plausible (via `trackEvent` from `@/lib/plausible`), Playwright (e2e smoke).

**Spec:** `docs/superpowers/specs/2026-05-11-playground-mobile-sheet-design.md`

## File Inventory

| File | Action | Responsibility |
|---|---|---|
| `src/components/islands/customization/LoginCustomizationPlayground.tsx` | Modify | `useMediaQuery` hook, `sheetOpen` + `sheetOpenedRef` state, conditional rendering of trigger pill / close X / chip / sticky bottom CTA, dismissal handlers, `playground-sheet-open` telemetry |
| `src/components/islands/customization/LoginCustomizationPlayground.css` | Modify | Mobile stage height, sheet positioning + transitions, trigger pill / chip / close X / sticky CTA styles, reduced-motion override, desktop hiding of mobile chrome |
| `src/i18n/en.json` | Modify | `customizeCta`, `closeSheetAria` strings under `CustomizationPlayground` |
| `src/i18n/zh-Hant.json` | Modify | Same two strings, translated |
| `docs/plausible-tagging-plan.md` | Modify | Add `playground-sheet-open` engagement event row; extend `signup` location values |
| `tests/phase2c3-features.spec.ts` | Modify | Add a single narrow-viewport regression test for the mobile sheet open/close cycle |

---

## Task 1: `useMediaQuery` hook + `isNarrow` state

**Files:**
- Modify: `src/components/islands/customization/LoginCustomizationPlayground.tsx`

- [ ] **Step 1: Add hook + `isNarrow` derivation**

In `LoginCustomizationPlayground.tsx`, just below the existing imports (after `import './LoginCustomizationPlayground.css';`), add the hook:

```tsx
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false,
  );
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    setMatches(mql.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);
  return matches;
}
```

Update the imports at the top of the file (the file already imports `useMemo, useRef, useState`):

```tsx
import { useEffect, useMemo, useRef, useState } from 'react';
```

Inside `LoginCustomizationPlaygroundInstance`, after the existing refs/states are declared (around the `interactedRef` block), add:

```tsx
const isNarrow = !useMediaQuery('(min-width: 900px)');
```

- [ ] **Step 2: Verify HMR succeeds, no behaviour change yet**

Run dev server (`npm run dev` if not already running). Open `http://localhost:4321/features/customization/` at desktop width. The page should render exactly as before. Resize the window narrower; still no visible change yet. Check the dev-server log for any TS/Vite errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/islands/customization/LoginCustomizationPlayground.tsx
git commit -m "feat(playground): add useMediaQuery + isNarrow plumbing for mobile sheet"
```

---

## Task 2: Mobile stage + sheet positioning (CSS only, no animation)

**Files:**
- Modify: `src/components/islands/customization/LoginCustomizationPlayground.css`

- [ ] **Step 1: Add mobile stage rules**

Find the existing `@media (width < 900px)` block (around line 97) and replace it with the new sheet rules. The current block reads:

```css
@media (width < 900px) {
  .ag-login-play__panel {
    padding-top: 1.5rem;
    border-top: 1px solid #e2e8f0;
  }
}
```

Replace with:

```css
@media (width < 900px) {
  /* Mobile sheet pattern: the surface becomes a fixed-height stage. */
  .ag-login-play__surface {
    position: relative;
    height: min(100svh - 6rem, 640px);
    overflow: hidden;
    padding: 0;
    grid-template-columns: 1fr;
    gap: 0;
  }

  .ag-login-play__surface-main {
    height: 40%;
    overflow: hidden;
  }

  /* Panel becomes the bottom sheet. */
  .ag-login-play__panel {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 60%;
    padding: 0.5rem 1rem 0;
    border-top: 1px solid #e2e8f0;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    background: #fff;
    box-shadow: 0 -8px 22px rgba(0, 0, 0, 0.12);
    overflow-y: auto;
    transform: translateY(100%);
    will-change: transform;
    z-index: 2;
  }

  .ag-login-play__panel[data-open='true'] {
    transform: translateY(0);
  }
}
```

- [ ] **Step 2: Verify**

Reload `/features/customization/` at narrow width (390 × 844 in DevTools device toolbar). The preview now occupies a fixed top section, and the panel is slid off the bottom (invisible). The page is no longer absurdly long — the playground is one screen tall (capped at 640 px) and the next section ("Two ways to ship it") follows below.

At desktop ≥ 900 px, layout is unchanged.

- [ ] **Step 3: Commit**

```bash
git add src/components/islands/customization/LoginCustomizationPlayground.css
git commit -m "feat(playground): mobile stage + bottom-sheet positioning"
```

---

## Task 3: Trigger pill + open/close state + slide-up transition

**Files:**
- Modify: `src/components/islands/customization/LoginCustomizationPlayground.tsx`
- Modify: `src/components/islands/customization/LoginCustomizationPlayground.css`
- Modify: `src/i18n/en.json`
- Modify: `src/i18n/zh-Hant.json`

- [ ] **Step 1: Add i18n strings `customizeCta` and `getStartedCta`**

The existing `previewHoverMaskCta` ("Build modern login experiences with Authgear") is the desktop hover-mask line — too long for a top-right chip or a sticky button. A shorter `getStartedCta` key is needed for both mobile CTAs.

In `src/i18n/en.json`, inside `"CustomizationPlayground"`, after the existing `panelIntro` line, add:

```json
    "customizeCta": "⚙ Customize",
    "getStartedCta": "Get Started",
```

In `src/i18n/zh-Hant.json`, the same two keys:

```json
    "customizeCta": "⚙ 自訂",
    "getStartedCta": "立即開始",
```

- [ ] **Step 2: Add `sheetOpen` state and `sheetId`**

In `LoginCustomizationPlaygroundInstance`, just after the `isNarrow` line from Task 1, add:

```tsx
const [sheetOpen, setSheetOpen] = useState(false);
const sheetId = `ag-login-play-${instanceId}-sheet`;
const openSheet = () => setSheetOpen(true);
const closeSheet = () => setSheetOpen(false);
```

- [ ] **Step 3: Wire `data-open` onto the panel**

Find the `<aside className="ag-login-play__panel" aria-label={t('configAria')}>` line. Replace with:

```tsx
<aside
  className="ag-login-play__panel"
  aria-label={t('configAria')}
  id={sheetId}
  data-open={isNarrow ? sheetOpen : undefined}
>
```

The `data-open` attribute is only set on mobile; the CSS rule `.ag-login-play__panel[data-open='true']` already gates on the attribute being explicitly `"true"`, so desktop is unaffected.

- [ ] **Step 4: Render the trigger pill**

Inside the playground surface, *outside* the existing `surface-main` and `panel` siblings (so it can be `position: absolute` against the surface), add the pill. Find the closing `</aside>` of the panel, then the closing `</div>` of the surface. Just before the surface closes, add:

```tsx
{isNarrow ? (
  <button
    type="button"
    className="ag-login-play__trigger-pill"
    aria-expanded={sheetOpen}
    aria-controls={sheetId}
    onClick={openSheet}
    hidden={sheetOpen}
  >
    {t('customizeCta')}
  </button>
) : null}
```

- [ ] **Step 5: Add pill styles + slide-up transition**

In `LoginCustomizationPlayground.css`, inside the `@media (width < 900px)` block, append:

```css
  .ag-login-play__panel {
    transition: transform 250ms cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .ag-login-play__trigger-pill {
    position: absolute;
    left: 50%;
    bottom: 18px;
    transform: translateX(-50%);
    padding: 10px 18px;
    border: none;
    border-radius: 999px;
    background: #0f172a;
    color: #fff;
    font-size: 0.875rem;
    font-weight: 600;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
    cursor: pointer;
    z-index: 3;
  }

  .ag-login-play__trigger-pill:focus-visible {
    outline: 2px solid #2563eb;
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    .ag-login-play__panel {
      transition: none;
    }
  }
```

Hide the pill on desktop. At the end of the CSS file (outside any media block), add:

```css
@media (width >= 900px) {
  .ag-login-play__trigger-pill {
    display: none;
  }
}
```

- [ ] **Step 6: Verify**

Reload at 390 × 844:
- Pill "⚙ Customize" visible at bottom-center of the playground.
- Tap pill → sheet slides up smoothly to take the bottom 60%; preview compresses to top 40%; pill disappears (set `hidden`).
- Sheet content is the same panel as before (preset chips, accordions).
- No way to close yet — that's Task 4.
- Refresh at desktop ≥ 900 px → pill is gone, layout unchanged.

- [ ] **Step 7: Commit**

```bash
git add src/components/islands/customization/LoginCustomizationPlayground.tsx src/components/islands/customization/LoginCustomizationPlayground.css src/i18n/en.json src/i18n/zh-Hant.json
git commit -m "feat(playground): trigger pill + slide-up sheet on mobile"
```

---

## Task 4: Close affordances (drag handle, close X, tap-preview backdrop, Escape, focus)

**Files:**
- Modify: `src/components/islands/customization/LoginCustomizationPlayground.tsx`
- Modify: `src/components/islands/customization/LoginCustomizationPlayground.css`
- Modify: `src/i18n/en.json`
- Modify: `src/i18n/zh-Hant.json`

- [ ] **Step 1: i18n — `closeSheetAria`**

`src/i18n/en.json`, add after `customizeCta`:

```json
    "closeSheetAria": "Close customization",
```

`src/i18n/zh-Hant.json`:

```json
    "closeSheetAria": "關閉自訂面板",
```

- [ ] **Step 2: Add a ref to the close button + Escape + focus management**

Above the existing return of `LoginCustomizationPlaygroundInstance`, add:

```tsx
const closeButtonRef = useRef<HTMLButtonElement | null>(null);
const triggerRef = useRef<HTMLButtonElement | null>(null);

useEffect(() => {
  if (!isNarrow) return;
  if (sheetOpen) {
    closeButtonRef.current?.focus();
  } else {
    triggerRef.current?.focus();
  }
}, [isNarrow, sheetOpen]);

useEffect(() => {
  if (!isNarrow || !sheetOpen) return;
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') setSheetOpen(false);
  };
  window.addEventListener('keydown', onKey);
  return () => window.removeEventListener('keydown', onKey);
}, [isNarrow, sheetOpen]);
```

Wire the `triggerRef` onto the pill from Task 3:

```tsx
<button
  type="button"
  ref={triggerRef}
  className="ag-login-play__trigger-pill"
  ...
>
```

- [ ] **Step 3: Add drag handle + restructure panel header to include close X**

Find this line inside the panel:

```tsx
<p className="ag-login-play__panel-intro">{t('panelIntro')}</p>
```

Replace with:

```tsx
{isNarrow ? (
  <div className="ag-login-play__sheet-handle" aria-hidden />
) : null}
<div className="ag-login-play__panel-header">
  <p className="ag-login-play__panel-intro">{t('panelIntro')}</p>
  {isNarrow ? (
    <button
      type="button"
      ref={closeButtonRef}
      className="ag-login-play__sheet-close"
      aria-label={t('closeSheetAria')}
      onClick={closeSheet}
    >
      ×
    </button>
  ) : null}
</div>
```

- [ ] **Step 4: Add the preview-area tap-to-close backdrop**

Inside the surface, as a sibling of `surface-main` and `panel` (before the trigger pill), add:

```tsx
{isNarrow ? (
  <button
    type="button"
    className="ag-login-play__sheet-backdrop"
    aria-label={t('closeSheetAria')}
    onClick={closeSheet}
    tabIndex={-1}
    hidden={!sheetOpen}
  />
) : null}
```

- [ ] **Step 5: CSS for header / handle / close X / backdrop**

In `LoginCustomizationPlayground.css`, inside the `@media (width < 900px)` block, append:

```css
  .ag-login-play__sheet-handle {
    width: 36px;
    height: 4px;
    background: #cbd5e1;
    border-radius: 2px;
    margin: 0 auto 8px;
  }

  .ag-login-play__panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    margin-bottom: 0.25rem;
  }

  /* Reset the existing intro bottom margin since the header row owns spacing now. */
  .ag-login-play__panel-header .ag-login-play__panel-intro {
    margin-bottom: 0;
  }

  .ag-login-play__sheet-close {
    flex: 0 0 auto;
    width: 28px;
    height: 28px;
    padding: 0;
    border: none;
    border-radius: 50%;
    background: #f1f5f9;
    color: #475569;
    font-size: 1.125rem;
    line-height: 1;
    font-weight: 600;
    cursor: pointer;
  }

  .ag-login-play__sheet-close:focus-visible {
    outline: 2px solid #2563eb;
    outline-offset: 2px;
  }

  .ag-login-play__sheet-backdrop {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 40%;
    padding: 0;
    margin: 0;
    border: none;
    background: transparent;
    cursor: pointer;
    z-index: 1;
  }
```

In the desktop `@media (width >= 900px)` block at the bottom of the file (the one added in Task 3, step 5), extend the selector list:

```css
@media (width >= 900px) {
  .ag-login-play__trigger-pill,
  .ag-login-play__sheet-handle,
  .ag-login-play__sheet-close,
  .ag-login-play__sheet-backdrop {
    display: none;
  }
}
```

- [ ] **Step 6: Verify**

At 390 × 844:
- Tap pill → sheet slides up; focus jumps to the close X (visible focus ring).
- Tap close X → sheet slides down; focus returns to the pill.
- Tap close X works; tap on the preview area also closes (backdrop button); pressing `Escape` also closes.
- Drag handle is visible at the top of the sheet (decorative bar).
- At desktop ≥ 900 px: layout unchanged; "Try it out" still appears as the panel header without an X.

- [ ] **Step 7: Commit**

```bash
git add src/components/islands/customization/LoginCustomizationPlayground.tsx src/components/islands/customization/LoginCustomizationPlayground.css src/i18n/en.json src/i18n/zh-Hant.json
git commit -m "feat(playground): close affordances — handle, X, preview tap, Escape, focus"
```

---

## Task 5: Top-right "Get Started →" chip on mobile (with signup tracking)

**Files:**
- Modify: `src/components/islands/customization/LoginCustomizationPlayground.tsx`
- Modify: `src/components/islands/customization/LoginCustomizationPlayground.css`

- [ ] **Step 1: Render the chip**

Find the existing preview-hover-mask CTA (currently around line 681, the `<a className="ds-btn ds-btn-secondary" ...>` inside `<div className="ag-login-play__preview-mask">`). Immediately after the closing `</div>` of `ag-login-play__preview-mask`, add the mobile chip:

```tsx
{isNarrow ? (
  <a
    className="ag-login-play__signup-chip"
    href="https://portal.authgear.com/?utm_source=feature-customization&utm_medium=link&utm_campaign=playground-mobile-chip"
    target="_blank"
    rel="noopener noreferrer"
    onClick={(e) => {
      e.stopPropagation();
      trackEvent('signup', { location: 'playground-mobile-chip' });
    }}
  >
    {t('getStartedCta')} →
  </a>
) : null}
```

`stopPropagation` prevents the click from bubbling to the backdrop button when the sheet is open.

- [ ] **Step 2: Chip styles**

In `LoginCustomizationPlayground.css`, inside the `@media (width < 900px)` block, append:

```css
  .ag-login-play__signup-chip {
    position: absolute;
    top: 12px;
    right: 12px;
    padding: 6px 12px;
    border-radius: 999px;
    background: rgba(15, 23, 42, 0.85);
    color: #fff;
    font-size: 0.75rem;
    font-weight: 600;
    text-decoration: none;
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    z-index: 3;
  }

  .ag-login-play__signup-chip:focus-visible {
    outline: 2px solid #2563eb;
    outline-offset: 2px;
  }
```

Extend the desktop `display: none` rule:

```css
@media (width >= 900px) {
  .ag-login-play__trigger-pill,
  .ag-login-play__signup-chip,
  .ag-login-play__sheet-handle,
  .ag-login-play__sheet-close,
  .ag-login-play__sheet-backdrop {
    display: none;
  }
}
```

- [ ] **Step 3: Verify**

At 390 × 844:
- Chip visible at top-right of the preview area, dark with rounded corners.
- Chip stays visible whether the sheet is open or closed.
- Tap chip → opens `portal.authgear.com` in a new tab; Plausible network panel shows `signup` event fired with `{ location: 'playground-mobile-chip' }`.
- Tap chip while sheet is open → opens portal (does not also close sheet).
- At desktop ≥ 900 px: chip is gone; desktop hover-mask still works as before.

- [ ] **Step 4: Commit**

```bash
git add src/components/islands/customization/LoginCustomizationPlayground.tsx src/components/islands/customization/LoginCustomizationPlayground.css
git commit -m "feat(playground): top-right Get Started chip for mobile (signup CTA)"
```

---

## Task 6: Sheet sticky bottom CTA (with signup tracking)

**Files:**
- Modify: `src/components/islands/customization/LoginCustomizationPlayground.tsx`
- Modify: `src/components/islands/customization/LoginCustomizationPlayground.css`

- [ ] **Step 1: Render the sticky CTA at the bottom of the panel**

Inside the `<aside className="ag-login-play__panel" ...>`, after the closing `</AccordionSection>` of the last (input radius) section, but still inside the `<aside>`, add:

```tsx
{isNarrow ? (
  <div className="ag-login-play__sheet-cta">
    <a
      className="ds-btn ds-btn-primary ag-login-play__sheet-cta-btn"
      href="https://portal.authgear.com/?utm_source=feature-customization&utm_medium=link&utm_campaign=playground-mobile-sheet"
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent('signup', { location: 'playground-mobile-sheet' })}
    >
      {t('getStartedCta')} →
    </a>
  </div>
) : null}
```

- [ ] **Step 2: Sticky bottom styles**

In `LoginCustomizationPlayground.css`, inside the `@media (width < 900px)` block, append:

```css
  /* Reserve room at the bottom of the scroll area so the last accordion doesn't sit under the sticky CTA. */
  .ag-login-play__panel {
    padding-bottom: 0;
  }

  .ag-login-play__sheet-cta {
    position: sticky;
    bottom: 0;
    margin: 0.75rem -1rem 0;
    padding: 0.75rem 1rem;
    background: #fff;
    border-top: 1px solid #e2e8f0;
    z-index: 1;
  }

  .ag-login-play__sheet-cta-btn {
    display: block;
    width: 100%;
    text-align: center;
  }
```

Extend the desktop `display: none` rule:

```css
@media (width >= 900px) {
  .ag-login-play__trigger-pill,
  .ag-login-play__signup-chip,
  .ag-login-play__sheet-handle,
  .ag-login-play__sheet-close,
  .ag-login-play__sheet-backdrop,
  .ag-login-play__sheet-cta {
    display: none;
  }
}
```

- [ ] **Step 3: Verify**

At 390 × 844:
- Open sheet → scroll within it. The "Get Started →" button sticks to the bottom of the sheet at all times, with a thin top border separating it from scrolled content.
- Tap button → opens portal in new tab; Plausible fires `signup` with `{ location: 'playground-mobile-sheet' }`.
- At desktop ≥ 900 px: button gone.

- [ ] **Step 4: Commit**

```bash
git add src/components/islands/customization/LoginCustomizationPlayground.tsx src/components/islands/customization/LoginCustomizationPlayground.css
git commit -m "feat(playground): sticky Get Started CTA at sheet bottom (signup CTA)"
```

---

## Task 7: `playground-sheet-open` one-shot telemetry

**Files:**
- Modify: `src/components/islands/customization/LoginCustomizationPlayground.tsx`

- [ ] **Step 1: Add ref + fire on first open**

In `LoginCustomizationPlaygroundInstance`, just after `interactedRef` and `markInteract` are defined, add:

```tsx
const sheetOpenedRef = useRef(false);
const markSheetOpen = () => {
  if (sheetOpenedRef.current) return;
  sheetOpenedRef.current = true;
  trackEvent('playground-sheet-open');
};
```

Update `openSheet` (defined in Task 3) to fire telemetry:

```tsx
const openSheet = () => {
  markSheetOpen();
  setSheetOpen(true);
};
```

- [ ] **Step 2: Verify**

Open DevTools → Network panel filtered to "plausible". Reload `/features/customization/` at 390 × 844. Tap the "⚙ Customize" pill. A POST to Plausible with `name: "playground-sheet-open"` should fire exactly once per page load. Close and reopen the sheet — no further `playground-sheet-open` events fire. The existing `playground-interact` events still fire on the first control change inside the sheet.

- [ ] **Step 3: Commit**

```bash
git add src/components/islands/customization/LoginCustomizationPlayground.tsx
git commit -m "feat(playground): playground-sheet-open one-shot telemetry"
```

---

## Task 8: Update `docs/plausible-tagging-plan.md`

**Files:**
- Modify: `docs/plausible-tagging-plan.md`

- [ ] **Step 1: Extend the `signup` `location` value list**

Find the row in the Conversion table that lists `signup` for the playground:

```markdown
| `signup` | `LoginCustomizationPlayground` — preview hover-mask CTA | Click | `portal.authgear.com` (with UTM) — fires with `props.location = 'playground-preview-hover'` |
```

Add two more rows directly beneath it:

```markdown
| `signup` | `LoginCustomizationPlayground` — mobile top-right chip | Click | `portal.authgear.com` (with UTM) — fires with `props.location = 'playground-mobile-chip'`. Visible only at `< 900px`. |
| `signup` | `LoginCustomizationPlayground` — mobile sheet sticky bottom CTA | Click | `portal.authgear.com` (with UTM) — fires with `props.location = 'playground-mobile-sheet'`. Visible only when the mobile sheet is open. |
```

- [ ] **Step 2: Add `playground-sheet-open` to the Engagement table**

Find the engagement row for `playground-interact`. Directly beneath it, add:

```markdown
| `playground-sheet-open` | `LoginCustomizationPlayground` — mobile "⚙ Customize" pill | First sheet open per page view | One-shot per page view (mobile only, `< 900px`). Pairs with `playground-interact` to measure open-rate vs. interact-rate. |
```

- [ ] **Step 3: Extend the recommended-properties row for `signup`**

Find the "Recommended properties to add" row for `signup`:

```markdown
| `signup` | `location` | `"nav-mobile"`, `"nav-desktop"`, `"home-hero"`, `"playground-preview-hover"` | Distinguish where signups originate (playground variant already implemented) |
```

Replace the value-example list with the four playground locations:

```markdown
| `signup` | `location` | `"nav-mobile"`, `"nav-desktop"`, `"home-hero"`, `"playground-preview-hover"`, `"playground-mobile-chip"`, `"playground-mobile-sheet"` | Distinguish where signups originate (playground variants implemented for desktop hover, mobile chip, mobile sheet) |
```

- [ ] **Step 4: Commit**

```bash
git add docs/plausible-tagging-plan.md
git commit -m "docs(plausible): playground mobile chip + sheet CTAs and sheet-open event"
```

---

## Task 9: Playwright regression test for the mobile sheet open/close cycle

**Files:**
- Modify: `tests/phase2c3-features.spec.ts`

- [ ] **Step 1: Add a narrow-viewport test**

Append the following at the very end of `tests/phase2c3-features.spec.ts`:

```typescript
test.describe('Phase 2c-3: features/customization — mobile sheet', () => {
  test('sheet opens via pill and closes via X (narrow viewport)', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/features/customization/');

    // Scroll the playground island into view so client:visible hydrates.
    const trigger = page.getByRole('button', { name: /Customize/i });
    await trigger.scrollIntoViewIfNeeded();
    await expect(trigger).toBeVisible();

    // Panel starts closed (no data-open or data-open='false').
    const panel = page.locator('aside.ag-login-play__panel').first();
    await expect(panel).not.toHaveAttribute('data-open', 'true');

    // Open via pill.
    await trigger.click();
    await expect(panel).toHaveAttribute('data-open', 'true');
    await expect(trigger).toBeHidden();

    // Close via X.
    const closeBtn = page.getByRole('button', { name: /Close customization/i });
    await closeBtn.click();
    await expect(panel).not.toHaveAttribute('data-open', 'true');
    await expect(trigger).toBeVisible();
  });
});
```

- [ ] **Step 2: Run the test**

Run: `npx playwright test tests/phase2c3-features.spec.ts -g "mobile sheet"`

Expected: PASS. If it fails with a hydration-timing issue, add `await page.waitForLoadState('networkidle');` after `goto`.

- [ ] **Step 3: Run the full features file to confirm no regression**

Run: `npx playwright test tests/phase2c3-features.spec.ts`

Expected: all existing slug smoke tests + the new mobile-sheet test pass.

- [ ] **Step 4: Commit**

```bash
git add tests/phase2c3-features.spec.ts
git commit -m "test(playground): mobile sheet open/close regression"
```

---

## Task 10: Final manual QA + cleanup commit

- [ ] **Step 1: Cross-viewport manual QA**

Open `http://localhost:4321/features/customization/` and verify each scenario in DevTools device toolbar:

1. **iPhone 14 (390 × 844)** — preview top 40%, ⚙ Customize pill bottom-center, Get Started chip top-right. Tap pill → sheet up smoothly. Tap chip → opens portal. Tap close X → sheet down. Tap on preview while sheet open → closes. Escape key while sheet open → closes. Inside sheet, scroll → sticky Get Started bottom stays visible.
2. **Pixel 7 (412 × 915)** — same checks. Background colour change in sheet updates preview live (because preview is not dimmed).
3. **iPad Mini portrait (768 × 1024)** — still mobile sheet pattern (< 900 px). Pill + chip visible.
4. **iPad portrait (820 × 1180)** — still mobile sheet.
5. **iPad landscape / Desktop (≥ 900 px wide)** — desktop layout: side-by-side panel, preview-hover mask CTA works; pill / chip / close X / sticky CTA / drag handle all hidden.
6. **Resize from narrow → wide while sheet is open** — sheet should not get stuck. (Recovery: `useEffect` already gates rendering on `isNarrow`, and the `data-open` attr only applies under 900 px so the desktop layout displays normally.)
7. **`prefers-reduced-motion: reduce`** — set in DevTools "Rendering" pane. Open sheet → no slide animation; panel appears instantly.

- [ ] **Step 2: Plausible event check**

DevTools → Network → filter "plausible". Verify in this single mobile session:
- One `playground-sheet-open` on first pill tap (not on subsequent opens).
- One `playground-interact` on first control change inside the sheet (e.g., tap a preset chip).
- `signup` with `location: 'playground-mobile-chip'` when tapping the top-right chip.
- `signup` with `location: 'playground-mobile-sheet'` when tapping the sticky bottom CTA.

- [ ] **Step 3: No-op cleanup commit (only if any fixes were needed)**

If any QA scenario above revealed an issue, fix it inline and commit:

```bash
git add -p
git commit -m "fix(playground): <one-line description>"
```

If QA passes cleanly with no further edits, skip the commit and proceed.

- [ ] **Step 4: Final summary**

Inspect `git log --oneline -12`. The branch should now contain ~9–10 new commits implementing the mobile bottom sheet, with no merge conflicts against `main`. Ready for PR review.

---

## Coverage check (self-review)

- Spec §"Pattern: contained bottom sheet, 40 / 60 split" → Tasks 2, 3.
- Spec §"Breakpoint" → Task 1 (`useMediaQuery('(min-width: 900px)')`).
- Spec §"Container" → Task 2 (`height: min(100svh - 6rem, 640px)`).
- Spec §"Trigger pill" → Task 3.
- Spec §"Top-right Get Started chip" → Task 5.
- Spec §"Sheet" anatomy (drag handle, header + close X, scrollable body, sticky CTA) → Tasks 4 (handle, X) + 6 (sticky CTA).
- Spec §"Dismissal" (X, preview tap, Escape) → Task 4.
- Spec §"Live preview while sheet is open" → Task 4 step 5 (no dim/backdrop CSS; backdrop is invisible click-catcher).
- Spec §"Transitions" + reduced-motion → Task 3 step 5.
- Spec §"Accessibility" → Task 3 (aria-expanded, aria-controls, sheetId) + Task 4 (focus management, Escape, aria-labels).
- Spec §"Telemetry" → Task 5 (chip signup), Task 6 (sheet signup), Task 7 (playground-sheet-open).
- Spec §"Desktop unchanged" → CSS `@media (width >= 900px) { display: none }` rules added in Tasks 3, 5, 6.
- Spec §"Implementation outline" file list → matches File Inventory above.
- Spec §"Non-goals" (no drag-to-resize, no panel restructure) → respected.

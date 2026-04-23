# Mobile Drawer Replacement — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Own the mobile nav open/close logic so we can delete the Webflow runtime (`webflow.js` + `jquery`) from `BaseLayout.astro`. No visual redesign — drawer behavior stays "full-width panel drops from under the header on hamburger tap", matching current UX.

**Architecture:** Drop `.w-nav` / `.w-nav-menu` / `.w-nav-brand` / `.w-nav-button` and `data-collapse="medium"`. Replace the hamburger `<div>` with a real `<button aria-expanded aria-controls>`. Add a scoped `<style>` + `<script>` to `SiteNav.astro` that toggles a drawer-open attribute on the nav panel, manages body scroll lock, focus, Escape, outside-click, and auto-close on link tap. Once verified, delete the two `<script>` tags at the bottom of `BaseLayout.astro`.

**Tech Stack:** Astro 5, TypeScript. No new dependencies.

**Spec:** Inline in the brief the user approved (this file is the single source of truth — no separate spec doc).

---

## File Structure

**Modify:**
- `src/layouts/BaseLayout.astro` — drop `data-collapse`, `data-animation`, `data-duration`, `data-easing*` and `w-nav` from the header wrapper. Remove the jQuery + `webflow.js` script tags at the bottom (after verification).
- `src/components/nav/SiteNav.astro` — rewrite the hamburger as a `<button>`, drop `w-nav-menu`, `w-nav-brand`, `w-nav-button`, add scoped CSS + `<script>` for drawer control.
- `src/i18n/en.json` + `src/i18n/zh-TW.json` — one new key under `Navigation`: `menuToggleLabel` ("Open menu" / "開啟選單"). Used as `aria-label` on the hamburger.

**No new files.** Drawer logic stays inline in `SiteNav.astro` — it's <80 lines and only used here.

## Behavior contract

| Trigger | Effect |
|---|---|
| Tap hamburger while closed | Drawer opens; focus moves to first focusable element inside; body locks scroll; hamburger animates to X |
| Tap hamburger while open | Drawer closes; focus returns to hamburger; scroll unlocks |
| Press Escape while open | Drawer closes; focus returns to hamburger |
| Click outside drawer while open | Drawer closes; focus returns to hamburger |
| Click any `<a>` inside drawer | Drawer closes (navigation happens on its own) |
| Viewport crosses from ≤991px to ≥992px | Drawer state resets; scroll unlocks; hamburger hides |
| Tab while focus is on last focusable inside drawer | Focus cycles to first focusable inside drawer |
| Shift+Tab on first focusable | Focus cycles to last focusable |
| `prefers-reduced-motion: reduce` | Skip the slide transition; drawer snaps open/closed |

The existing `NavDropdown` sub-menus (Products / Solutions / Resources / Developers) continue to work inside the drawer as-is — they already own their own accordion behavior on mobile.

## Verification strategy

Per-task ends in:
- `npm run build` (catches TypeScript + content-schema errors).
- Manual check in Chrome at 1280×900 (desktop) and 600×900 (mobile). The user's running dev server is at `http://localhost:4321/`.
- At the viewport-switch task, use chrome-in-chrome MCP to resize the window and verify.

**Do not delete `webflow.js`/`jquery` until Task 3** — Task 2 only replaces the drawer; `webflow.js` stays loaded. This lets us verify no regressions before pulling the runtime out. If anything looks off after Task 2, bisect before Task 3.

---

## Task 1: Add `Navigation.menuToggleLabel` i18n key

**Files:**
- Modify: `src/i18n/en.json` — inside the existing `Navigation` block.
- Modify: `src/i18n/zh-TW.json` — same position.

- [ ] **Step 1: Add the key to `src/i18n/en.json`**

Inside the `Navigation` block, after `"signupLogin": "Signup/Login"`, add a comma then the new key. The resulting block:

```json
  "Navigation": {
    "logoAlt": "Authgear Logo",
    "products": "Products",
    "solutions": "Solutions",
    "resources": "Resources",
    "developers": "Developers",
    "pricing": "Pricing",
    "loginMobile": "Login",
    "signupMobile": "Signup",
    "getDemo": "Get a Demo",
    "signupLogin": "Signup/Login",
    "menuToggleLabel": "Open menu"
  },
```

- [ ] **Step 2: Add the same key to `src/i18n/zh-TW.json`**

```json
    "signupLogin": "註冊／登入",
    "menuToggleLabel": "開啟選單"
  },
```

(Make sure the exact comma placement matches the current zh-TW structure — run the validator below after.)

- [ ] **Step 3: Validate JSON**

```bash
node -e "JSON.parse(require('fs').readFileSync('src/i18n/en.json'))" && \
node -e "JSON.parse(require('fs').readFileSync('src/i18n/zh-TW.json'))" && \
echo OK
```

Expected: `OK`.

- [ ] **Step 4: Commit**

```bash
git add src/i18n/en.json src/i18n/zh-TW.json
git commit -m "feat(nav): add Navigation.menuToggleLabel i18n key

Will be used as the aria-label on the mobile hamburger button in
the next commit.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

Do not push yet — wait until Task 3 is done.

---

## Task 2: Replace Webflow drawer with our own in `SiteNav.astro`

**Files:**
- Modify: `src/layouts/BaseLayout.astro` — drop Webflow nav attributes/classes on the header wrapper.
- Modify: `src/components/nav/SiteNav.astro` — rebuild hamburger + drawer.

- [ ] **Step 1: Update `src/layouts/BaseLayout.astro`**

Locate the `<div>` wrapping `<SiteNav>`. It currently looks like:

```astro
    <div
      data-collapse="medium"
      data-animation="default"
      data-duration="500"
      data-easing="ease-in-out-expo"
      data-easing2="ease-in-out-expo"
      role="banner"
      class="header event w-nav"
    >
      <SiteNav locale={locale} />
    </div>
```

Replace with:

```astro
    <div role="banner" class="header event">
      <SiteNav locale={locale} />
    </div>
```

(Leave the two `<script>` tags at the bottom of the file alone for now — they're Task 3.)

- [ ] **Step 2: Update `src/components/nav/SiteNav.astro` — brand, nav-menu, hamburger markup**

Three targeted edits.

**(a) Brand anchor — drop `w-nav-brand`:**

Find:

```astro
  <a href={localizedPath(locale, '/')} class="brand w-nav-brand">
```

Replace with:

```astro
  <a href={localizedPath(locale, '/')} class="brand">
```

**(b) Nav panel — drop `w-nav-menu`, add id + data attribute:**

Find:

```astro
  <nav role="navigation" class="nav-menu w-nav-menu">
```

Replace with:

```astro
  <nav
    id="site-nav"
    role="navigation"
    class="nav-menu"
    data-site-nav-panel
  >
```

**(c) Hamburger — replace the `<div>` with a real `<button>`:**

Find:

```astro
    <div class="menu-button w-nav-button">
      <div class="menu-button-wrapper">
        <div class="menu-button-icon">
          <div class="menu-line-top"></div>
          <div class="menu-line-middle"></div>
          <div class="menu-line-bottom"></div>
        </div>
      </div>
    </div>
```

Replace with:

```astro
    <button
      type="button"
      class="menu-button"
      aria-expanded="false"
      aria-controls="site-nav"
      aria-label={t(locale, 'Navigation.menuToggleLabel')}
      data-site-nav-toggle
    >
      <span class="menu-button-wrapper">
        <span class="menu-button-icon" aria-hidden="true">
          <span class="menu-line-top"></span>
          <span class="menu-line-middle"></span>
          <span class="menu-line-bottom"></span>
        </span>
      </span>
    </button>
```

- [ ] **Step 3: Append a scoped `<style>` block to the end of `SiteNav.astro`**

Astro's scoped `<style>` doesn't bleed into other components. Add **before** any existing `</>` fragment close (but since the component's root is `<div class="container-header">`, append after it). If a `<style>` block already exists, extend it; otherwise create one.

Add this block at the very end of the file:

```astro
<style>
  /* Mobile drawer: replaces Webflow's w-nav behavior. At >=992px the
     nav renders inline as today; at <=991px it collapses behind the
     hamburger and animates open on tap. */
  .menu-button {
    display: none;
    background: none;
    border: 0;
    padding: 0;
    cursor: pointer;
    color: inherit;
  }
  .menu-button:focus-visible {
    outline: 2px solid var(--primary-1, #0043e0);
    outline-offset: 2px;
    border-radius: 4px;
  }

  @media (max-width: 991px) {
    .menu-button {
      display: inline-flex;
    }
    .nav-menu {
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: #ffffff;
      box-shadow: 0 12px 24px rgba(15, 23, 42, 0.08);
      max-height: calc(100vh - 80px);
      overflow-y: auto;
      padding: 1rem 1.5rem 2rem;
      z-index: 900;
    }
    .nav-menu[data-site-nav-open] {
      display: block;
    }
  }

  /* Hamburger → X animation. The line spacing is ~6px, adjust if the
     design tokens change. */
  .menu-line-top,
  .menu-line-middle,
  .menu-line-bottom {
    transition: transform 0.2s ease, opacity 0.2s ease;
  }
  .menu-button[aria-expanded='true'] .menu-line-top {
    transform: translateY(6px) rotate(45deg);
  }
  .menu-button[aria-expanded='true'] .menu-line-middle {
    opacity: 0;
  }
  .menu-button[aria-expanded='true'] .menu-line-bottom {
    transform: translateY(-6px) rotate(-45deg);
  }

  @media (prefers-reduced-motion: reduce) {
    .menu-line-top,
    .menu-line-middle,
    .menu-line-bottom {
      transition: none;
    }
  }
</style>
```

- [ ] **Step 4: Append the drawer controller `<script>` to `SiteNav.astro`**

Immediately after the `<style>` block added in Step 3, add:

```astro
<script>
  const BREAKPOINT = window.matchMedia('(max-width: 991px)');
  const toggle = document.querySelector<HTMLButtonElement>(
    '[data-site-nav-toggle]',
  );
  const panel = document.querySelector<HTMLElement>(
    '[data-site-nav-panel]',
  );

  if (toggle && panel) {
    const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';

    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(',');

    function setOpen(open: boolean) {
      toggle!.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) {
        panel!.setAttribute('data-site-nav-open', '');
        document.documentElement.style.overflow = 'hidden';
        const first = panel!.querySelector<HTMLElement>(focusableSelectors);
        first?.focus();
      } else {
        panel!.removeAttribute('data-site-nav-open');
        document.documentElement.style.overflow = '';
      }
    }

    function close() {
      setOpen(false);
      toggle!.focus();
    }

    toggle.addEventListener('click', (event) => {
      event.preventDefault();
      setOpen(!isOpen());
    });

    document.addEventListener('keydown', (event) => {
      if (!isOpen()) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
      }
    });

    // Click outside the drawer (not on the toggle either) → close.
    document.addEventListener('click', (event) => {
      if (!isOpen()) return;
      const target = event.target as Node | null;
      if (!target) return;
      if (panel!.contains(target) || toggle!.contains(target)) return;
      setOpen(false);
    });

    // Tapping any link inside the drawer closes it (the browser will
    // follow the link after the click handler returns).
    panel.addEventListener('click', (event) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      if (target.closest('a')) setOpen(false);
    });

    // Simple focus trap — cycle Tab within the drawer while open.
    panel.addEventListener('keydown', (event) => {
      if (!isOpen() || event.key !== 'Tab') return;
      const focusables = Array.from(
        panel!.querySelectorAll<HTMLElement>(focusableSelectors),
      ).filter((el) => el.offsetParent !== null);
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    // Leaving the mobile breakpoint resets state so the nav isn't stuck
    // open when someone resizes from phone to desktop width.
    BREAKPOINT.addEventListener('change', () => {
      if (!BREAKPOINT.matches && isOpen()) setOpen(false);
    });
  }
</script>
```

- [ ] **Step 5: Build**

```bash
npm run build
```

Expected: "Complete!".

- [ ] **Step 6: Manual verification in Chrome (desktop)**

Dev server is already running at `http://localhost:4321/`. Use the chrome-in-chrome MCP tools:

1. Resize window to 1280×900.
2. Navigate to `http://localhost:4321/about`. Screenshot.
3. Confirm the nav renders inline (Products / Solutions / Resources / Developers / Pricing + Get a Demo + Signup/Login). Hamburger is **not** visible.
4. Hover "Products" — confirm dropdown opens (NavDropdown behavior unchanged).

- [ ] **Step 7: Manual verification in Chrome (mobile)**

1. Resize window to 600×900.
2. Refresh. Screenshot.
3. Confirm the nav items are hidden and the hamburger is visible on the right.
4. Click the hamburger. Screenshot. Confirm the drawer slides down with the nav items stacked, and the hamburger bars animate into an X.
5. Click "Products" inside the drawer — confirm the NavDropdown accordion opens.
6. Click the hamburger again (now showing X). Screenshot. Confirm drawer closes and X returns to three bars.
7. Re-open. Press Escape. Confirm drawer closes.
8. Re-open. Click outside the drawer (below it, or on the page underneath). Confirm drawer closes.
9. Re-open. Click "Pricing" link. Confirm drawer closes and the browser navigates to `/pricing`.

If any check fails, do not proceed. Fix and re-verify.

- [ ] **Step 8: Commit**

```bash
git add src/layouts/BaseLayout.astro src/components/nav/SiteNav.astro
git commit -m "feat(nav): own mobile drawer open/close; drop Webflow w-nav hooks

Replace Webflow's w-nav runtime (data-collapse, w-nav-menu,
w-nav-brand, w-nav-button) with a scoped script inside SiteNav.astro.

- Hamburger is now a real <button aria-expanded aria-controls> with
  an a11y label. Lines animate into an X via [aria-expanded=\"true\"].
- Nav panel is hidden at <=991px and toggles via a data-site-nav-open
  attribute our script manages.
- Escape and outside-click close the drawer; link clicks inside
  close the drawer too.
- Body scroll locks while the drawer is open.
- Focus moves to the first focusable on open and back to the toggle
  on close. Tab cycles within the drawer while open.
- Resetting state when the viewport crosses the mobile breakpoint
  prevents a \"stuck open\" drawer when rotating / resizing.
- prefers-reduced-motion: reduce disables the hamburger transitions.

webflow.js is still loaded globally — removed in the next commit.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

Do not push yet.

---

## Task 3: Delete `webflow.js` + jQuery from `BaseLayout.astro`

With the drawer owned by us and no other consumers of the Webflow runtime on the site (tabs gone with WhyAuthgearPage + IdentitySecurityPage; waitlist form gone from OncePage; ContactForm uses React + fetch), the two `<script>` tags at the bottom of `BaseLayout.astro` are dead weight.

**Files:**
- Modify: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Confirm no remaining runtime consumers**

```bash
grep -rnE "w-tabs|w-form\b|w-form-done|w-form-fail|w-form-formrecaptcha|data-w-tab\b|data-collapse|w-nav-menu|w-nav-button|w-lightbox|w-slider" src/ --include='*.astro' --include='*.tsx'
```

Expected matches (the ones that are **fine** — class names only, no runtime needed):
- `src/components/islands/ContactForm.tsx` — `w-form`, `w-form-done`, `w-form-fail` classes used as styling hooks. React owns the show/hide logic.

If anything else appears, STOP — report BLOCKED. Those consumers would break.

- [ ] **Step 2: Delete the two `<script>` tags**

In `src/layouts/BaseLayout.astro`, locate:

```astro
    <script
      src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=60658b46b03f0cf83ac1485d"
      integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
      crossorigin="anonymous"></script>
    <script src="/js/webflow.js" is:inline></script>
```

Delete both lines.

- [ ] **Step 3: Build**

```bash
npm run build
```

Expected: "Complete!".

- [ ] **Step 4: Manual verification in Chrome**

Dev server at `http://localhost:4321/`. Through chrome-in-chrome MCP:

1. Resize to 1280×900. Navigate to `http://localhost:4321/`. Screenshot. Confirm home page renders (no console-driven widgets break).
2. Navigate to `http://localhost:4321/once`. Screenshot. Confirm the ONCE landing page renders — specifically that the hero, pricing section, SDK code tabs (React island, not `w-tabs`), and FAQ work. No "undefined is not a function" errors from missing `$`.
3. Navigate to `http://localhost:4321/about`. Click "Get a Demo" CTA — confirm it navigates to `/schedule-demo`.
4. Resize to 600×900. Reload `http://localhost:4321/`. Open hamburger, tap a link, confirm drawer closes and navigates. Close.
5. Open Chrome DevTools console (via `mcp__claude-in-chrome__read_console_messages`). Confirm no `ReferenceError: $ is not defined`, `Webflow is not defined`, or other runtime errors tied to the deletion.

- [ ] **Step 5: Commit and push everything**

```bash
git add src/layouts/BaseLayout.astro
git commit -m "chore(layout): delete webflow.js + jquery script tags

All consumers are gone: w-tabs pages retired, OncePage waitlist
form removed, mobile drawer owned in SiteNav.astro, ContactForm
React island handles its own form logic. The Webflow runtime is
dead weight on every page.

Payoff: no more jQuery download (~90 KB gz) or webflow.js on any
page load.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
git push origin main
```

---

## Rollback

Each task is its own commit. To roll back:

```bash
git revert <commit-sha>
```

If Task 3 causes issues (some page secretly depended on `$`), revert just that commit and the drawer keeps working.

## Self-review notes (author)

1. **Spec coverage.** Every behavior in the approved brief → Task 2 Step 4 (script) or Task 2 Step 3 (CSS):
   - Hamburger toggle → `toggle.addEventListener('click', …)`.
   - Escape closes → keydown handler.
   - Outside-click closes → document click handler.
   - Auto-close on link → panel click handler.
   - Scroll lock → `document.documentElement.style.overflow`.
   - Focus move / return → `first?.focus()` and `close()`.
   - Focus trap → panel keydown Tab handler.
   - Breakpoint reset → `BREAKPOINT.addEventListener('change', …)`.
   - `prefers-reduced-motion: reduce` → CSS media query.
2. **Type consistency.** `data-site-nav-toggle` / `data-site-nav-panel` / `data-site-nav-open` attribute names match between markup, CSS, and script.
3. **No placeholders.** Every step has literal code to paste.
4. **Risk surface.** Task 2 and Task 3 are reviewed independently; if Task 3 breaks something, Task 2 is still a net improvement (we own the drawer, just with the Webflow runtime still loaded).

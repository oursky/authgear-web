# ContactForm Visual Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the reusable `ContactForm` island to align with the `ds-*` design system — no changes to form fields, validation, or submission.

**Architecture:** Add a new `.ds-form-*` CSS namespace to `src/styles/global.css` (card / label / input / select / textarea / field-error / error-banner / success / submit-button-width). Rewrite the JSX in `ContactForm.tsx` to use the new classes plus the existing `.ds-btn.ds-btn-primary` for submit. Two-file change, single commit, no logic changes.

**Tech Stack:** React (island), TypeScript, plain CSS (no CSS-in-JS, no CSS modules). Build via Astro 5 (`npm run build`).

**Spec:** `docs/superpowers/specs/2026-04-23-contact-form-visual-polish-design.md` (commit `a57a33e`).

---

## File Structure

**Modify:**
- `src/styles/global.css` — append `.ds-form-*` rules at end of file.
- `src/components/islands/ContactForm.tsx` — rewrite JSX to use new classes. Frontmatter (imports, state, handler, submit logic) stays identical.

**No new files.** The class namespace is flat and colocated with other global styles.

## Verification strategy

This is pure visual / markup work with no pure-function tests to write. TDD doesn't apply. Verification is:

1. `npm run build` — catches TypeScript errors, missing imports, invalid JSX.
2. `npm run dev` + chrome-in-chrome MCP screenshots at:
   - `/about` at 1280×900 (desktop)
   - `/about` at 600×900 (mobile)
3. Keyboard check via chrome-in-chrome: click each input, confirm focus ring renders.
4. Phone-validity error path: type "123" in the phone field, confirm the inline error + red border appear.
5. Submit button: confirm it shows the arrow icon and full-width layout.
6. No console errors on page load (via `mcp__claude-in-chrome__read_console_messages`).

Single commit at the end after all checks pass.

---

## Task 1: Append `.ds-form-*` rules to `global.css`

**Files:**
- Modify: `src/styles/global.css` (append to end)

- [ ] **Step 1: Open `src/styles/global.css` and append the block below to the very end of the file**

Add an empty line after the current last rule, then paste:

```css

/* ------------------------------------------------------------------ */
/* ContactForm / reusable form primitives (`.ds-form-*` namespace)     */
/* ------------------------------------------------------------------ */

.ds-form {
  border-radius: var(--radius-card);
  padding: var(--spacing-m);
}

.ds-form__form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.ds-form__field {
  display: flex;
  flex-direction: column;
}

.ds-form-label {
  display: block;
  margin: 0 0 0.5rem;
  font-family: var(--font-sans);
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-text-light-primary);
}

.ds-form-label__required {
  color: #e53e3e;
  margin-left: 2px;
}

.ds-form-input {
  display: block;
  width: 100%;
  min-height: 48px;
  padding: 0.75rem 1rem;
  font-family: var(--font-sans);
  font-size: var(--text-body2);
  line-height: 1.5;
  color: var(--color-text-light-primary);
  background-color: #ffffff;
  border: 1px solid var(--color-border-light-subtle);
  border-radius: var(--radius-product);
  transition: border-color 150ms ease, box-shadow 150ms ease;
}

.ds-form-input::placeholder {
  color: var(--color-text-secondary);
}

.ds-form-input:hover {
  border-color: var(--color-border-default, #8c8c8c);
}

.ds-form-input:focus,
.ds-form-input:focus-visible {
  outline: 0;
  border-color: var(--color-primary-800);
  box-shadow: 0 0 0 3px rgba(0, 67, 224, 0.15);
}

.ds-form-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

textarea.ds-form-input {
  min-height: 120px;
  resize: vertical;
}

select.ds-form-input {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='none' stroke='%233e4f6f' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' d='M2 4l4 4 4-4'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 12px;
  padding-right: 2.5rem;
}

.ds-form-input--error,
.ds-form-input--error:focus {
  border-color: #e53e3e;
  box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.12);
}

.ds-form-field-error {
  margin-top: 0.375rem;
  font-size: 0.8125rem;
  line-height: 1.25rem;
  color: #b42318;
}

.ds-form-error {
  padding: 0.75rem 1rem;
  border-radius: var(--radius-product);
  background-color: #fff1f1;
  color: #b42318;
  font-size: var(--text-body2);
  line-height: 1.5;
}

.ds-form__submit {
  width: 100%;
  justify-content: center;
  margin-top: 0.5rem;
}

.ds-form-success {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.75rem;
  padding: var(--spacing-m);
}

.ds-form-success__icon {
  width: 48px;
  height: 48px;
}

.ds-form-success__title {
  margin: 0;
  font-family: var(--font-sans);
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 600;
  color: var(--color-text-light-primary);
}

.ds-form-success__body {
  margin: 0;
  font-family: var(--font-sans);
  font-size: var(--text-body2);
  line-height: 1.5;
  color: var(--color-text-secondary);
}
```

- [ ] **Step 2: Verify the file parses**

Run:

```bash
npm run build 2>&1 | tail -3
```

Expected: `[build] Complete!`. If the build fails on CSS, the appended block has a syntax error — re-check the braces.

Do not commit yet. The same commit covers Task 2.

---

## Task 2: Rewrite `ContactForm.tsx` JSX to use the new classes

**Files:**
- Modify: `src/components/islands/ContactForm.tsx`

The frontmatter (imports, `Props`, `getQueryParam`, state, `useEffect`, `handleSubmit`, conditionals) stays **identical**. Only the two return statements (success state + form state) are rewritten.

- [ ] **Step 1: Replace the success-state return block**

Find:

```tsx
  if (status === 'success') {
    return (
      <div className="success-message">
        <div>Thank you! Your submission has been received!</div>
      </div>
    );
  }
```

Replace with:

```tsx
  if (status === 'success') {
    return (
      <div className="form-block ds-form">
        <div className="ds-form-success" role="status">
          <svg
            className="ds-form-success__icon"
            aria-hidden="true"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="24" cy="24" r="22" fill="#d1fae5" />
            <path
              d="M15 25 L22 32 L34 18"
              stroke="#047857"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          <h3 className="ds-form-success__title">Thanks — we got it.</h3>
          <p className="ds-form-success__body">
            We'll be in touch within one business day.
          </p>
        </div>
      </div>
    );
  }
```

- [ ] **Step 2: Replace the form-state return block**

Find the entire final `return ( <div className="form-block"> … </div> );` block (starts with `return (` after the success conditional, ends with the matching `);` before the closing `}` of the component).

Replace the whole return with:

```tsx
  return (
    <div className="form-block ds-form">
      <form onSubmit={handleSubmit} className="ds-form__form">
        <div className="ds-form__field">
          <label htmlFor="cf-name" className="ds-form-label">
            Full Name<span className="ds-form-label__required">*</span>
          </label>
          <input
            id="cf-name"
            className="ds-form-input"
            maxLength={256}
            name="Name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="ds-form__field">
          <label htmlFor="cf-email" className="ds-form-label">
            Work Email<span className="ds-form-label__required">*</span>
          </label>
          <input
            id="cf-email"
            className="ds-form-input"
            maxLength={256}
            name="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="ds-form__field">
          <label htmlFor="cf-phone" className="ds-form-label">
            Phone Number<span className="ds-form-label__required">*</span>
          </label>
          <IntlTelInput
            ref={itiRef}
            initOptions={{
              initialCountry: 'auto',
              geoIpLookup: (success, failure) => {
                fetch('https://ipapi.co/json')
                  .then((r) => r.json())
                  .then((data: { country_code?: string }) =>
                    success((data.country_code ?? 'hk') as Iso2)
                  )
                  .catch(() => failure());
              },
              countryOrder: (['hk', 'sg', 'au'] as const) as unknown as Iso2[],
              placeholderNumberType: 'MOBILE',
              nationalMode: true,
            }}
            onChangeNumber={setPhone}
            onChangeValidity={setPhoneValid}
            onChangeCountry={() => {
              const data = itiRef.current?.getInstance()?.getSelectedCountryData();
              setCountry(data?.name ?? '');
            }}
            inputProps={{
              id: 'cf-phone',
              className:
                'ds-form-input' +
                (phone && !phoneValid ? ' ds-form-input--error' : ''),
              required: true,
              name: 'Phone',
              'aria-invalid': phone && !phoneValid ? true : undefined,
              'aria-describedby':
                phone && !phoneValid ? 'cf-phone-error' : undefined,
            }}
          />
          {phone && !phoneValid && (
            <span id="cf-phone-error" className="ds-form-field-error">
              Invalid phone number
            </span>
          )}
        </div>

        <div className="ds-form__field">
          <label htmlFor="cf-company" className="ds-form-label">
            Company Name<span className="ds-form-label__required">*</span>
          </label>
          <input
            id="cf-company"
            className="ds-form-input"
            maxLength={256}
            name="Company"
            type="text"
            required
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>

        <div className="ds-form__field">
          <label htmlFor="cf-how-hear" className="ds-form-label">
            How did you hear about us?
            <span className="ds-form-label__required">*</span>
          </label>
          <select
            id="cf-how-hear"
            name="how-hear"
            required
            className="ds-form-input"
            value={howHear}
            onChange={(e) => setHowHear(e.target.value)}
          >
            <option value="" disabled>
              Select one
            </option>
            <option value="organic-search">Search Engine</option>
            <option value="llm">AI Tools (e.g. ChatGPT, Gemini, etc)</option>
            <option value="github">GitHub</option>
            <option value="others">Others</option>
          </select>
        </div>

        <div className="ds-form__field">
          <label htmlFor="cf-use-case" className="ds-form-label">
            Anything else?
          </label>
          <textarea
            id="cf-use-case"
            placeholder="Tell us more about your project, needs, timeline"
            maxLength={500}
            name="Use-Case"
            className="ds-form-input"
            value={useCase}
            onChange={(e) => setUseCase(e.target.value)}
          />
        </div>

        {status === 'error' && (
          <div className="ds-form-error" role="alert">
            Oops! Something went wrong while submitting the form.
          </div>
        )}

        <button
          type="submit"
          className="ds-btn ds-btn-primary ds-form__submit"
          disabled={status === 'submitting'}
          aria-busy={status === 'submitting'}
        >
          {status === 'submitting' ? 'Submitting…' : 'Submit'}
          {status !== 'submitting' && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="ds-btn__icon-arrow"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          )}
        </button>
      </form>
    </div>
  );
```

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: `[build] Complete!`. TypeScript / JSX errors would show above that line — fix them before moving on. Common issues to watch: JSX closing-tag mismatch on `<IntlTelInput>` (self-closing `/>` was already in the original and stays), misspelled `className`.

- [ ] **Step 4: Grep-check no legacy form classes remain**

Run:

```bash
grep -nE "getdemo-field|getdemo-label|get-demo-form-field|getdemo-submit|text-span-(7|8|9|10)|w-input|w-select|margin-vertical margin-small" src/components/islands/ContactForm.tsx || echo "clean"
```

Expected: `clean`.

If anything appears, it's a leftover from the old markup — go back and scrub it.

---

## Task 3: Browser verification via chrome-in-chrome MCP

Dev server is running in the background at `http://localhost:4321/`. If not running, start it: `npm run dev` (new terminal or background task).

- [ ] **Step 1: Desktop screenshot at 1280×900**

Use the chrome-in-chrome MCP tools:
1. `mcp__claude-in-chrome__resize_window` → 1280×900
2. `mcp__claude-in-chrome__navigate` → `http://localhost:4321/about`
3. Scroll the page to the footer form section. Use `mcp__claude-in-chrome__computer` with action `scroll` (down, ~20 ticks) to reach the dark footer panel.
4. Take a `screenshot`.

Check the screenshot against the spec:
- White card with rounded corners (`var(--radius-card)` = ~1.5rem)
- Labels are uppercase, small-caps style, small gray eyebrow
- Red asterisk on required labels
- Inputs have thin light-gray border, rounded corners, comfortable padding
- Error state styled (only appears after typing a bad phone)
- Submit button is full-width, gradient, with an arrow at the end

If the card still has the old look (sharp corners / weak labels / plain submit), check:
- Is `ds-form` class on the `.form-block` wrapper?
- Did `global.css` rebuild? (Astro hot-reload should pick it up; hard-reload the tab if not.)

- [ ] **Step 2: Mobile screenshot at 600×900**

1. `resize_window` → 600×900
2. Reload the same URL.
3. Scroll to footer form, screenshot.

Check:
- Card padding is still comfortable (doesn't hug the viewport edges awkwardly; the outer `.footer-form-section` has its own padding)
- Inputs are full-width and remain ≥48px tall
- Submit button is full-width and tappable

- [ ] **Step 3: Keyboard + focus spot-check**

Still at 600×900 (or back at 1280×900):

1. Click the Full Name input. Take a screenshot.
2. Confirm a brand-blue focus ring (the `box-shadow: 0 0 0 3px rgba(0, 67, 224, 0.15)` + border-color `--color-primary-800`) is visible.
3. Click the Phone input. Type `123`. Press Tab (to trigger validity change).
4. Confirm the input border turns red and a small red "Invalid phone number" string appears below it.
5. Take a screenshot.

- [ ] **Step 4: Console check**

```
mcp__claude-in-chrome__read_console_messages with pattern: "error|Error|warn|warning|undefined"
```

Expected: no matches related to the form (console-warning noise from extensions is OK).

- [ ] **Step 5: Sanity check the submit button visually**

Take a close-up zoom on the submit button (via `computer` action `zoom` over its region). Confirm:
- Full-width
- Gradient background (ds-btn-primary gets `--gradient-accent`)
- Centered "Submit" text
- Arrow SVG to the right of the text
- On hover (use `hover` action), the arrow nudges right by 4px (that's the `.ds-btn:hover .ds-btn__icon-arrow` transition in the DS stylesheet)

If anything above fails, fix in the CSS or JSX and re-run the build + screenshots.

---

## Task 4: Commit

- [ ] **Step 1: Stage both files**

```bash
git add src/styles/global.css src/components/islands/ContactForm.tsx
```

- [ ] **Step 2: Commit with the message below**

```bash
git commit -m "$(cat <<'EOF'
feat(contact-form): align visuals with ds-* design system

Polish-only redesign of the reusable ContactForm island.

- New .ds-form-* namespace in global.css: card, label, input,
  select, textarea, inline field error, error banner, success
  state, submit-button width.
- ContactForm.tsx JSX rewrites onto the new classes; dropped
  .getdemo-field / .getdemo-label / .getdemo-submit /
  .get-demo-form-field / w-input / w-select / .text-span-7/8/9/10 /
  .margin-vertical hooks.
- Submit is now a real <button> using .ds-btn.ds-btn-primary with
  the standard arrow icon; gets aria-busy while submitting.
- Each input has an explicit id; label uses htmlFor; phone
  invalid-state wires aria-invalid + aria-describedby to the
  inline .ds-form-field-error message.
- Success state gets a checkmark icon and heading in a styled
  card (was a bare div).
- Error banner and inline field error both use design-system
  tokens; focus rings use --color-primary-800 with a soft 3px
  glow.

No changes to form fields, validation, or submission.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

- [ ] **Step 3: Push**

```bash
git push origin main
```

Expected: `main -> main` ref update.

---

## Rollback

Single commit. `git revert <sha>` if any regression.

## Self-review notes (author)

1. **Spec coverage:**
   - Card upgrade → Task 1 (`.ds-form` rule) + Task 2 Step 2 (`<div className="form-block ds-form">`).
   - Label redesign → Task 1 (`.ds-form-label`, `.ds-form-label__required`) + Task 2 Step 2 (all six label usages).
   - Input / textarea / select restyle → Task 1 (`.ds-form-input` + tag-specific overrides) + Task 2 Step 2 (all five input classnames).
   - Phone input integration → Task 2 Step 2 (`inputProps.className` with `--error` modifier, `aria-invalid`, `aria-describedby`, `id`).
   - Form gap / field container → Task 1 (`.ds-form__form`, `.ds-form__field`) + Task 2 Step 2 (removed the six `.margin-vertical margin-small` wrappers).
   - Error banner → Task 1 (`.ds-form-error`) + Task 2 Step 2 (replaces `.error-message`).
   - Submit button → Task 1 (`.ds-form__submit` width helper) + Task 2 Step 2 (real `<button>`, arrow SVG, aria-busy, `.ds-btn.ds-btn-primary`).
   - Success state → Task 1 (`.ds-form-success*`) + Task 2 Step 1 (rewritten block with circle-check icon).
   - Accessibility tidy-ups → Task 2 Step 2 (ids, htmlFor, aria-*).
   - Verification → Task 3.
2. **Placeholder scan:** No TBDs, TODOs, or "implement later" strings. Every CSS and JSX block is complete and pasteable.
3. **Type consistency:** `.ds-form`, `.ds-form__form`, `.ds-form__field`, `.ds-form-label`, `.ds-form-label__required`, `.ds-form-input`, `.ds-form-input--error`, `.ds-form-field-error`, `.ds-form-error`, `.ds-form__submit`, `.ds-form-success`, `.ds-form-success__icon`, `.ds-form-success__title`, `.ds-form-success__body` — all referenced in both Task 1 (CSS) and Task 2 (JSX). IDs: `cf-name`, `cf-email`, `cf-phone`, `cf-company`, `cf-how-hear`, `cf-use-case`, `cf-phone-error`.

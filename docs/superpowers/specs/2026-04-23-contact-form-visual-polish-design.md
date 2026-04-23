# ContactForm Visual Polish — Design Spec

**Date:** 2026-04-23
**Scope:** `src/components/islands/ContactForm.tsx` (visual + structural only, no form logic changes)
**Direction:** Align with the existing `ds-*` design system

## Problem

The reusable `ContactForm` island — rendered inside the `.footer-form-section.form__bg-dark` panel on `/about`, `/solutions/enterprise-sso`, `/solutions/frontline-workers-identity`, `/solutions/reduce-sms-otp-cost` — is functional but visually basic:

- Labels use `.getdemo-label` (neutral gray, regular weight) with no visual hierarchy.
- Inputs use `.getdemo-field` — minimal styling, weak focus state.
- Submit is a plain `<input type="submit">` with no icon or design-system alignment.
- Required asterisks are wrapped in ad-hoc classes (`.text-span-7`, `.text-span-8`, `.text-span-9`, `.text-span-10`).
- Error + success states are unstyled divs.
- Wrapper markup uses `.margin-vertical margin-small` on every field.

The rest of the site uses a consistent `ds-*` design language (ds-btn, ds-section-eyebrow, spacing/radius tokens). The form doesn't.

## Goal

Polish the ContactForm visuals so it feels native to the ds-* design system — same typography, spacing tokens, border-radius, focus states, and button treatment as the rest of the site. No changes to form fields, validation, or submission.

## Non-goals

- No field additions or removals.
- No change to the submission endpoint (`/api/contact`) or payload.
- No change to the `intl-tel-input` integration beyond updating the inner input's className.
- No i18n additions (labels stay hardcoded English — separate future work).
- No multi-step, no progressive disclosure, no field grouping changes.
- No change to the outer `footer-form-section.form__bg-dark` panel wrapper — it's per-page layout, not the component.

## Where styles live

Append new rules to `src/styles/global.css` under a `.ds-form-*` namespace. Global (not scoped) so the form stays visually consistent wherever it's rendered, and the classes become reusable for any future form surface.

## Design tokens used

All from `src/styles/authgear-design-system.css`:

| Token | Value |
|---|---|
| `--color-primary-800` | brand blue (used for eyebrow, focus ring) |
| `--color-text-light-primary` | dark text on light bg |
| `--color-text-secondary` | muted text (placeholders, helper) |
| `--color-border-light-subtle` | `#edebe9` — input border |
| `--color-bg-light` | card / light bg |
| `--radius-product` | 0.5rem — input border-radius |
| `--radius-card` | 1.5rem — card border-radius |
| `--spacing-xxs` / `--spacing-xs` / `--spacing-s` / `--spacing-m` | 0.5/1/1.5/2rem |
| `--font-sans` | IBM Plex Sans + Noto Sans TC |
| `--text-body2` | 1rem |

Error red: `#e53e3e` (border/outline), `#b42318` (error text), `#fff1f1` (error bg) — hardcoded since DS has no semantic-error token yet.

## Component-level changes

### 1. Card (`.form-block`)

Override the current `.form-block` look for forms that opt in via a new `.ds-form` class on the form wrapper:

```css
.ds-form.form-block,
.ds-form {
  border-radius: var(--radius-card);
  padding: var(--spacing-m);
}
```

Apply by adding `ds-form` to the outer `<div className="form-block">` wrapper in the component.

### 2. Form element

Replace the six `<div className="margin-vertical margin-small">` wrappers around each field with a single flex-column `<form>`:

```css
.ds-form__form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
```

Each field is a `<div className="ds-form__field">` containing label + input (+ inline error).

### 3. Label (`.ds-form-label`)

Replace `.getdemo-label`. Style:

```css
.ds-form-label {
  display: block;
  margin-bottom: 0.5rem;
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
```

Drop the four sequential `.text-span-7/8/9/10` classes on asterisks — replace with a single `<span className="ds-form-label__required">*</span>`.

### 4. Inputs / textarea / select (`.ds-form-input`)

Replace `.getdemo-field` + `.get-demo-form-field` + `w-input` + `w-select`. Single class:

```css
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
```

### 5. Inline error (`.ds-form-field-error`)

For the phone-validity message below the input:

```css
.ds-form-field-error {
  margin-top: 0.375rem;
  font-size: 0.8125rem;
  line-height: 1.25rem;
  color: #b42318;
}
```

Replace the current inline style (`style={{ color: '#e53e3e', fontSize: '0.875rem' }}`).

### 6. Phone input integration

Pass `inputProps.className: 'ds-form-input'` (with `+ ' ds-form-input--error'` conditionally). Leave the `intl-tel-input` country-flag dropdown CSS from `intl-tel-input/build/css/intlTelInput.css` alone.

### 7. Submit button

Replace `<input type="submit" className="getdemo-submit">` with a real `<button>`:

```jsx
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
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
  )}
</button>
```

Full-width styling:

```css
.ds-form__submit {
  width: 100%;
  justify-content: center;
  margin-top: 0.5rem;
}
```

### 8. Error banner

Styled variant of the existing `.error-message` div:

```css
.ds-form-error {
  padding: 0.75rem 1rem;
  border-radius: var(--radius-product);
  background-color: #fff1f1;
  color: #b42318;
  font-size: var(--text-body2);
  line-height: 1.5;
}
```

Apply via: `<div className="ds-form-error">…</div>` replacing `<div className="error-message">…</div>`.

### 9. Success state

Replace the plain success div with:

```jsx
<div className="ds-form-success" role="status">
  <svg className="ds-form-success__icon" aria-hidden="true" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="22" fill="#d1fae5" />
    <path d="M15 25 L22 32 L34 18" stroke="#047857" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
  <h3 className="ds-form-success__title">Thanks — we got it.</h3>
  <p className="ds-form-success__body">We'll be in touch within one business day.</p>
</div>
```

```css
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

Wrap the success state in the same `.form-block.ds-form` card so the card's rounded corners and padding are consistent with the form itself — currently the success state renders as a bare `<div>`.

### 10. Accessibility

Small a11y improvements that come naturally with the restyle:

- Each input gets an explicit `id`. `<label htmlFor={id}>` replaces the current implicit nesting.
- Submit button is now a real `<button type="submit">` (was `<input type="submit">`, both work but `<button>` takes children including the SVG arrow).
- `aria-invalid="true"` on phone input when `phone && !phoneValid`.
- `aria-describedby` wires the phone input to the inline `.ds-form-field-error` message (needs matching `id` on the error div).
- Submit button gets `aria-busy="true"` while submitting.

## Component structure after the change

```
<div className="form-block ds-form">
  <form className="ds-form__form" onSubmit={…}>
    <div className="ds-form__field">
      <label htmlFor="cf-name" className="ds-form-label">
        Full Name<span className="ds-form-label__required">*</span>
      </label>
      <input id="cf-name" className="ds-form-input" … />
    </div>
    {/* Email — same pattern */}
    {/* Phone — IntlTelInput with inputProps.className */}
    {/* Company — same pattern */}
    {/* How-did-you-hear — select.ds-form-input with chevron */}
    {/* Textarea — textarea.ds-form-input */}

    {status === 'error' && <div className="ds-form-error">…</div>}

    <button type="submit" className="ds-btn ds-btn-primary ds-form__submit" disabled={…}>
      Submit <svg className="ds-btn__icon-arrow" … />
    </button>
  </form>
</div>
```

## Files changed

1. `src/styles/global.css` — append the `.ds-form-*` rules above.
2. `src/components/islands/ContactForm.tsx` — rewrite the JSX to use the new classes and button pattern. No change to state, handlers, validation, submission, or types.

No other files touched.

## Testing / verification

- `npm run build` — passes.
- `npm run dev` spot-check at 1280×900 desktop and ≤600px mobile on at least:
  - `/about` (footer-form panel)
  - `/solutions/enterprise-sso` (same pattern)
- Manual checks in browser:
  - Tab order reaches every field; focus rings visible on each.
  - Phone validation: enter an invalid number → input border goes red, inline error appears below, `aria-invalid="true"` on the input.
  - Submit without filling required fields → native HTML validation fires (behavior unchanged).
  - Submit with valid data → error or success state renders on a styled card.

## Rollback

Single commit. Revert if any regression.

## Out of scope / follow-ups

- Proper semantic-color tokens (`--color-semantic-error`) in the DS stylesheet — we're hardcoding hex reds for now. Worth adding later.
- i18n the form copy — labels, placeholders, success/error messages are all hardcoded English.
- Consolidating other form surfaces (OncePage has no waitlist anymore, but future forms should use `.ds-form-*` from the start).

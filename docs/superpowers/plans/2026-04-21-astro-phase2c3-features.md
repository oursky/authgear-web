# Astro Migration — Phase 2c-3: Features Subtree

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port the 19 feature pages + 3 React islands (`BiometricMethodsTabs`, `MfaOptionsTabs`, `SmsPumpingWarningFaqItem`) + features metadata module + dynamic `features/[slug]` route.

**Architecture:** Same dynamic-route pattern as Phases 2c-1/2c-2. All 19 feature pages are static English (verified: zero `useTranslations` / `getTranslations` calls in any source page) — no translation namespace work required. Metadata comes from `src/lib/features-meta.ts` (ported from Next's `lib/features/data.ts`). Three small interactive components (tab switchers + accordion) become React islands used by select feature pages.

**Tech Stack:** Same as prior phases.

**References:**
- `docs/ARCHITECTURE-ASTRO.md`
- `docs/superpowers/plans/2026-04-21-astro-phase2c2-solutions.md` — same dynamic route pattern

**What this phase does NOT do:** tools (Phase 2d), Once/Pricing (2e), CMS (3).

**Exit criteria:**

1. `npm run build` — 38 new prerendered files (19 slugs × 2 locales) under `dist/client/features/` + `dist/client/zh-TW/features/`
2. `npm run test:unit` — 5 passed
3. `npm test` — 110 passed (69 existing + 41 new: 19 en + 19 zh-TW + 3 island hydration)
4. All 19 slugs return 200 at `/features/<slug>` and `/zh-TW/features/<slug>`
5. `BiometricMethodsTabs`, `MfaOptionsTabs`, `SmsPumpingWarningFaqItem` hydrate and their interactive behavior (tab switch, accordion open/close) works in the browser

---

## File structure (new)

```
frontend-astro/
├── src/
│   ├── lib/
│   │   └── features-meta.ts                           # metadata per slug
│   ├── components/
│   │   ├── islands/
│   │   │   ├── BiometricMethodsTabs.tsx
│   │   │   ├── MfaOptionsTabs.tsx
│   │   │   └── SmsPumpingWarningFaqItem.tsx
│   │   └── pages/features/
│   │       ├── AttackProtectionPage.astro
│   │       ├── AuthenticationPage.astro
│   │       ├── AuthorizationPage.astro
│   │       ├── BiometricAuthenticationPage.astro
│   │       ├── BiometricLoginPage.astro
│   │       ├── CustomizationPage.astro
│   │       ├── ExtensibilityPage.astro
│   │       ├── IdentitySecurityPage.astro
│   │       ├── MachineToMachineTokenPage.astro
│   │       ├── MultiFactorAuthenticationPage.astro
│   │       ├── PasskeysPage.astro
│   │       ├── PasswordlessAuthenticationPage.astro
│   │       ├── SelfServeSettingsPage.astro
│   │       ├── SingleSignOnPage.astro
│   │       ├── SmsPasscodePage.astro
│   │       ├── SmsPumpingFraudPage.astro
│   │       ├── SocialLoginPage.astro
│   │       ├── UserManagementPage.astro
│   │       └── WhatsappOtpPage.astro
│   └── pages/
│       ├── features/
│       │   └── [slug].astro                           # en — covers 19 slugs
│       └── zh-TW/
│           └── features/
│               └── [slug].astro                       # zh-TW — covers 19 slugs
└── tests/
    └── phase2c3-features.spec.ts
```

**LOC per page (source):** All static English (no translation calls). Largest is `SmsPumpingFraudPage` at 352 LOC.

---

## Standard Conversion Rules (canonical reference)

Same as Phases 2b / 2c-1 / 2c-2. Summary:

- `className`→`class`; `<Link>`→`<a>` (drop next/link); `'use client'`→delete
- Pages in this phase have ZERO `useTranslations`/`getTranslations` — skip the `import { t }` in the body frontmatter
- `<PlausibleLink eventName="x" className="z" href="y">` → `<a href="y" class="z plausible-event-name--x">`
- `<ContactForm>` → `<ContactForm client:load />` from `@/components/islands/ContactForm`
- `<LogoMarquee ...>` → `<LogoMarquee client:idle customerStoriesHref={localizedPath(locale, '/customer-stories')} ... />` from `@/components/islands/LogoMarquee`
- `<BiometricMethodsTabs ...props>` → same with `client:visible` from `@/components/islands/BiometricMethodsTabs`
- `<MfaOptionsTabs ...props>` → same with `client:visible` from `@/components/islands/MfaOptionsTabs`
- `<SmsPumpingWarningFaqItem ...props>` → same with `client:visible` from `@/components/islands/SmsPumpingWarningFaqItem`
- `dangerouslySetInnerHTML` → `set:html`
- SVG camelCase → kebab-case (strokeWidth / fillRule / clipRule / strokeLinecap / strokeLinejoin / strokeMiterlimit)
- Preserve all Webflow classes, `plausible-event-name--*` classes, ids, data-*, inline SVGs, alt text
- Do NOT modify `frontend/messages/*.json`

**Body frontmatter template** (note: no `t` import for this phase):

```astro
---
import { localizedPath } from '@/lib/i18n';
// include island imports only if used:
// import ContactForm from '@/components/islands/ContactForm';
// import BiometricMethodsTabs from '@/components/islands/BiometricMethodsTabs';
interface Props { locale: string }
const { locale } = Astro.props;
---
```

Drop `localizedPath` import if the page doesn't reference it.

**Large-file strategy (>300 LOC):** Write scaffold + `<div class="page-wrapper"></div>`, then Edit per section. Applies to `SocialLoginPage` (305), `AuthenticationPage` (338), `SmsPumpingFraudPage` (352).

---

## Task 1: Port `features-meta.ts`

**Files:**
- Read: `/Users/fung/dev/authgear-web/frontend/lib/features/data.ts`
- Create: `/Users/fung/dev/authgear-web/frontend-astro/src/lib/features-meta.ts`

- [ ] **Step 1: Copy the source + rename**

```bash
cp /Users/fung/dev/authgear-web/frontend/lib/features/data.ts /Users/fung/dev/authgear-web/frontend-astro/src/lib/features-meta.ts
```

- [ ] **Step 2: Add `FeatureSlug` export**

Edit `frontend-astro/src/lib/features-meta.ts`. Rename the exported const from `featuresData` to `featuresMeta` (matches `solutionsMeta` naming from Phase 2c-2). Append at the bottom:

```ts
export type FeatureSlug = keyof typeof featuresMeta;
```

- [ ] **Step 3: Typecheck**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/src/lib/features-meta.ts
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): add features-meta metadata module"
```

---

## Task 2: Port `BiometricMethodsTabs` React island

**Files:**
- Read: `/Users/fung/dev/authgear-web/frontend/components/pages/features/BiometricMethodsTabs.tsx`
- Create: `/Users/fung/dev/authgear-web/frontend-astro/src/components/islands/BiometricMethodsTabs.tsx`

- [ ] **Step 1: Copy, then clean up**

```bash
cp /Users/fung/dev/authgear-web/frontend/components/pages/features/BiometricMethodsTabs.tsx \
   /Users/fung/dev/authgear-web/frontend-astro/src/components/islands/BiometricMethodsTabs.tsx
```

- [ ] **Step 2: Remove Next-specific imports (if any)**

Inspect the file. If it imports from `next/*` or `next-plausible`, remove those. The source should be a pure React component with `useState` — keep it as is.

- [ ] **Step 3: Typecheck**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/islands/BiometricMethodsTabs.tsx
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port BiometricMethodsTabs as React island"
```

---

## Task 3: Port `MfaOptionsTabs` React island

**Files:**
- Read: `/Users/fung/dev/authgear-web/frontend/components/pages/features/MfaOptionsTabs.tsx`
- Create: `/Users/fung/dev/authgear-web/frontend-astro/src/components/islands/MfaOptionsTabs.tsx`

- [ ] **Step 1: Copy**

```bash
cp /Users/fung/dev/authgear-web/frontend/components/pages/features/MfaOptionsTabs.tsx \
   /Users/fung/dev/authgear-web/frontend-astro/src/components/islands/MfaOptionsTabs.tsx
```

- [ ] **Step 2: Remove any Next imports; typecheck**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/islands/MfaOptionsTabs.tsx
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port MfaOptionsTabs as React island"
```

---

## Task 4: Port `SmsPumpingWarningFaqItem` React island

**Files:**
- Read: `/Users/fung/dev/authgear-web/frontend/components/pages/features/SmsPumpingWarningFaqItem.tsx`
- Create: `/Users/fung/dev/authgear-web/frontend-astro/src/components/islands/SmsPumpingWarningFaqItem.tsx`

- [ ] **Step 1: Copy**

```bash
cp /Users/fung/dev/authgear-web/frontend/components/pages/features/SmsPumpingWarningFaqItem.tsx \
   /Users/fung/dev/authgear-web/frontend-astro/src/components/islands/SmsPumpingWarningFaqItem.tsx
```

- [ ] **Step 2: Remove any Next imports; typecheck**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/islands/SmsPumpingWarningFaqItem.tsx
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port SmsPumpingWarningFaqItem as React island"
```

---

## Tasks 5–23: Port feature pages

Each feature page follows the same pattern: read source → apply Standard Conversion Rules → write `.astro` → typecheck → commit. Pages are all static English (no `t()` calls). The only variation is which islands are imported.

Ordered smallest-first. For each task, the prompt specifies:
- Source path
- Destination path
- LOC
- Islands used (determines the frontmatter imports)
- Commit message

### Task 5: `SmsPasscodePage` (98 LOC — smallest; islands: ContactForm)

**Files:**
- Read: `/Users/fung/dev/authgear-web/frontend/components/pages/features/SmsPasscodePage.tsx`
- Create: `/Users/fung/dev/authgear-web/frontend-astro/src/components/pages/features/SmsPasscodePage.astro`

Frontmatter imports: `ContactForm`. Apply Standard Conversion Rules. No `t()` calls in this page.

- [ ] `mkdir -p /Users/fung/dev/authgear-web/frontend-astro/src/components/pages/features`
- [ ] Read source, port body.
- [ ] `cd /Users/fung/dev/authgear-web/frontend-astro && npx tsc --noEmit`
- [ ] `git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/pages/features/SmsPasscodePage.astro && git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port SmsPasscodePage body"`

### Task 6: `BiometricLoginPage` (99 LOC; islands: ContactForm)

- [ ] Read `/Users/fung/dev/authgear-web/frontend/components/pages/features/BiometricLoginPage.tsx`
- [ ] Write `/Users/fung/dev/authgear-web/frontend-astro/src/components/pages/features/BiometricLoginPage.astro`. Frontmatter imports: `ContactForm`.
- [ ] Typecheck; commit: `git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/pages/features/BiometricLoginPage.astro && git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port BiometricLoginPage body"`

### Task 7: `WhatsappOtpPage` (153 LOC; islands: none)

- [ ] Read `/Users/fung/dev/authgear-web/frontend/components/pages/features/WhatsappOtpPage.tsx`
- [ ] Write `/Users/fung/dev/authgear-web/frontend-astro/src/components/pages/features/WhatsappOtpPage.astro`. No island imports.
- [ ] Typecheck; commit: `git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/pages/features/WhatsappOtpPage.astro && git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port WhatsappOtpPage body"`

### Task 8: `IdentitySecurityPage` (167 LOC; islands: ContactForm)

- [ ] Read `/Users/fung/dev/authgear-web/frontend/components/pages/features/IdentitySecurityPage.tsx`
- [ ] Write `/Users/fung/dev/authgear-web/frontend-astro/src/components/pages/features/IdentitySecurityPage.astro`. Frontmatter imports: `ContactForm`.
- [ ] Typecheck; commit: `git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/pages/features/IdentitySecurityPage.astro && git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port IdentitySecurityPage body"`

### Task 9: `AuthorizationPage` (173 LOC; islands: none)

- [ ] Read `/Users/fung/dev/authgear-web/frontend/components/pages/features/AuthorizationPage.tsx`
- [ ] Write `/Users/fung/dev/authgear-web/frontend-astro/src/components/pages/features/AuthorizationPage.astro`. No island imports.
- [ ] Typecheck; commit: `git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/pages/features/AuthorizationPage.astro && git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port AuthorizationPage body"`

### Task 10: `UserManagementPage` (193 LOC; islands: none)

- [ ] Read `/Users/fung/dev/authgear-web/frontend/components/pages/features/UserManagementPage.tsx`
- [ ] Write `/Users/fung/dev/authgear-web/frontend-astro/src/components/pages/features/UserManagementPage.astro`. No island imports.
- [ ] Typecheck; commit: `git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/pages/features/UserManagementPage.astro && git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port UserManagementPage body"`

### Task 11: `MultiFactorAuthenticationPage` (201 LOC; islands: MfaOptionsTabs)

- [ ] Read `/Users/fung/dev/authgear-web/frontend/components/pages/features/MultiFactorAuthenticationPage.tsx`
- [ ] Write `/Users/fung/dev/authgear-web/frontend-astro/src/components/pages/features/MultiFactorAuthenticationPage.astro`. Frontmatter imports: `MfaOptionsTabs`. Use `<MfaOptionsTabs client:visible ...props />`.
- [ ] Typecheck; commit: `git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/pages/features/MultiFactorAuthenticationPage.astro && git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port MultiFactorAuthenticationPage body"`

### Task 12: `ExtensibilityPage` (203 LOC; islands: none)

- [ ] Read `/Users/fung/dev/authgear-web/frontend/components/pages/features/ExtensibilityPage.tsx`
- [ ] Write `/Users/fung/dev/authgear-web/frontend-astro/src/components/pages/features/ExtensibilityPage.astro`. No island imports.
- [ ] Typecheck; commit: `git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/pages/features/ExtensibilityPage.astro && git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port ExtensibilityPage body"`

### Task 13: `SelfServeSettingsPage` (209 LOC; islands: none)

- [ ] Read `/Users/fung/dev/authgear-web/frontend/components/pages/features/SelfServeSettingsPage.tsx`
- [ ] Write `/Users/fung/dev/authgear-web/frontend-astro/src/components/pages/features/SelfServeSettingsPage.astro`. No island imports.
- [ ] Typecheck; commit: `git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/pages/features/SelfServeSettingsPage.astro && git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port SelfServeSettingsPage body"`

### Task 14: `CustomizationPage` (228 LOC; islands: none)

- [ ] Read `/Users/fung/dev/authgear-web/frontend/components/pages/features/CustomizationPage.tsx`
- [ ] Write `/Users/fung/dev/authgear-web/frontend-astro/src/components/pages/features/CustomizationPage.astro`. No island imports.
- [ ] Typecheck; commit: `git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/pages/features/CustomizationPage.astro && git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port CustomizationPage body"`

### Task 15: `PasskeysPage` (235 LOC; islands: ContactForm + MfaOptionsTabs)

- [ ] Read `/Users/fung/dev/authgear-web/frontend/components/pages/features/PasskeysPage.tsx`
- [ ] Write `/Users/fung/dev/authgear-web/frontend-astro/src/components/pages/features/PasskeysPage.astro`. Frontmatter imports: `ContactForm`, `MfaOptionsTabs`. Use `<MfaOptionsTabs client:visible ...>`.
- [ ] Typecheck; commit: `git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/pages/features/PasskeysPage.astro && git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port PasskeysPage body"`

### Task 16: `SingleSignOnPage` (237 LOC; islands: ContactForm)

- [ ] Read `/Users/fung/dev/authgear-web/frontend/components/pages/features/SingleSignOnPage.tsx`
- [ ] Write `/Users/fung/dev/authgear-web/frontend-astro/src/components/pages/features/SingleSignOnPage.astro`. Frontmatter imports: `ContactForm`.
- [ ] Typecheck; commit: `git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/pages/features/SingleSignOnPage.astro && git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port SingleSignOnPage body"`

### Task 17: `AttackProtectionPage` (254 LOC; islands: none)

- [ ] Read `/Users/fung/dev/authgear-web/frontend/components/pages/features/AttackProtectionPage.tsx`
- [ ] Write `/Users/fung/dev/authgear-web/frontend-astro/src/components/pages/features/AttackProtectionPage.astro`. No island imports.
- [ ] Typecheck; commit: `git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/pages/features/AttackProtectionPage.astro && git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port AttackProtectionPage body"`

### Task 18: `MachineToMachineTokenPage` (268 LOC; islands: ContactForm)

- [ ] Read `/Users/fung/dev/authgear-web/frontend/components/pages/features/MachineToMachineTokenPage.tsx`
- [ ] Write `/Users/fung/dev/authgear-web/frontend-astro/src/components/pages/features/MachineToMachineTokenPage.astro`. Frontmatter imports: `ContactForm`.
- [ ] Typecheck; commit: `git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/pages/features/MachineToMachineTokenPage.astro && git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port MachineToMachineTokenPage body"`

### Task 19: `PasswordlessAuthenticationPage` (272 LOC; islands: ContactForm)

- [ ] Read `/Users/fung/dev/authgear-web/frontend/components/pages/features/PasswordlessAuthenticationPage.tsx`
- [ ] Write `/Users/fung/dev/authgear-web/frontend-astro/src/components/pages/features/PasswordlessAuthenticationPage.astro`. Frontmatter imports: `ContactForm`.
- [ ] Typecheck; commit: `git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/pages/features/PasswordlessAuthenticationPage.astro && git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port PasswordlessAuthenticationPage body"`

### Task 20: `BiometricAuthenticationPage` (292 LOC; islands: ContactForm + BiometricMethodsTabs)

- [ ] Read `/Users/fung/dev/authgear-web/frontend/components/pages/features/BiometricAuthenticationPage.tsx`
- [ ] Write `/Users/fung/dev/authgear-web/frontend-astro/src/components/pages/features/BiometricAuthenticationPage.astro`. Frontmatter imports: `ContactForm`, `BiometricMethodsTabs`. Use `<BiometricMethodsTabs client:visible ...>`.
- [ ] Typecheck; commit: `git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/pages/features/BiometricAuthenticationPage.astro && git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port BiometricAuthenticationPage body"`

### Task 21: `SocialLoginPage` (305 LOC; islands: ContactForm; **chunked strategy**)

- [ ] Read `/Users/fung/dev/authgear-web/frontend/components/pages/features/SocialLoginPage.tsx`
- [ ] Write `/Users/fung/dev/authgear-web/frontend-astro/src/components/pages/features/SocialLoginPage.astro` using Write (scaffold) + multiple Edit (per section). Frontmatter imports: `ContactForm`. Do NOT echo file contents in response.
- [ ] Typecheck; commit: `git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/pages/features/SocialLoginPage.astro && git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port SocialLoginPage body"`

### Task 22: `AuthenticationPage` (338 LOC; islands: none; **chunked strategy**)

- [ ] Read `/Users/fung/dev/authgear-web/frontend/components/pages/features/AuthenticationPage.tsx`
- [ ] Write `/Users/fung/dev/authgear-web/frontend-astro/src/components/pages/features/AuthenticationPage.astro` using chunked Edit strategy. No island imports.
- [ ] Typecheck; commit: `git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/pages/features/AuthenticationPage.astro && git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port AuthenticationPage body"`

### Task 23: `SmsPumpingFraudPage` (352 LOC — largest; islands: ContactForm + SmsPumpingWarningFaqItem; **chunked strategy**)

- [ ] Read `/Users/fung/dev/authgear-web/frontend/components/pages/features/SmsPumpingFraudPage.tsx`
- [ ] Write `/Users/fung/dev/authgear-web/frontend-astro/src/components/pages/features/SmsPumpingFraudPage.astro` using chunked Edit. Frontmatter imports: `ContactForm`, `SmsPumpingWarningFaqItem`. Use `<SmsPumpingWarningFaqItem client:visible ...>`.
- [ ] Typecheck; commit: `git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/pages/features/SmsPumpingFraudPage.astro && git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port SmsPumpingFraudPage body"`

---

## Task 24: Create dynamic `features/[slug]` routes (en + zh-TW)

**Files:**
- Create: `/Users/fung/dev/authgear-web/frontend-astro/src/pages/features/[slug].astro`
- Create: `/Users/fung/dev/authgear-web/frontend-astro/src/pages/zh-TW/features/[slug].astro`

- [ ] **Step 1: Create directories**

```bash
mkdir -p /Users/fung/dev/authgear-web/frontend-astro/src/pages/features /Users/fung/dev/authgear-web/frontend-astro/src/pages/zh-TW/features
```

- [ ] **Step 2: Write the en route**

Create `/Users/fung/dev/authgear-web/frontend-astro/src/pages/features/[slug].astro`:

```astro
---
export const prerender = true;

import BaseLayout from '@/layouts/BaseLayout.astro';
import { featuresMeta, type FeatureSlug } from '@/lib/features-meta';

import AttackProtectionPage from '@/components/pages/features/AttackProtectionPage.astro';
import AuthenticationPage from '@/components/pages/features/AuthenticationPage.astro';
import AuthorizationPage from '@/components/pages/features/AuthorizationPage.astro';
import BiometricAuthenticationPage from '@/components/pages/features/BiometricAuthenticationPage.astro';
import BiometricLoginPage from '@/components/pages/features/BiometricLoginPage.astro';
import CustomizationPage from '@/components/pages/features/CustomizationPage.astro';
import ExtensibilityPage from '@/components/pages/features/ExtensibilityPage.astro';
import IdentitySecurityPage from '@/components/pages/features/IdentitySecurityPage.astro';
import MachineToMachineTokenPage from '@/components/pages/features/MachineToMachineTokenPage.astro';
import MultiFactorAuthenticationPage from '@/components/pages/features/MultiFactorAuthenticationPage.astro';
import PasskeysPage from '@/components/pages/features/PasskeysPage.astro';
import PasswordlessAuthenticationPage from '@/components/pages/features/PasswordlessAuthenticationPage.astro';
import SelfServeSettingsPage from '@/components/pages/features/SelfServeSettingsPage.astro';
import SingleSignOnPage from '@/components/pages/features/SingleSignOnPage.astro';
import SmsPasscodePage from '@/components/pages/features/SmsPasscodePage.astro';
import SmsPumpingFraudPage from '@/components/pages/features/SmsPumpingFraudPage.astro';
import SocialLoginPage from '@/components/pages/features/SocialLoginPage.astro';
import UserManagementPage from '@/components/pages/features/UserManagementPage.astro';
import WhatsappOtpPage from '@/components/pages/features/WhatsappOtpPage.astro';

const pageMap = {
  'attack-protection': AttackProtectionPage,
  authentication: AuthenticationPage,
  authorization: AuthorizationPage,
  'biometric-authentication': BiometricAuthenticationPage,
  'biometric-login': BiometricLoginPage,
  customization: CustomizationPage,
  extensibility: ExtensibilityPage,
  'identity-security': IdentitySecurityPage,
  'machine-to-machine-token': MachineToMachineTokenPage,
  'multi-factor-authentication': MultiFactorAuthenticationPage,
  passkeys: PasskeysPage,
  'passwordless-authentication': PasswordlessAuthenticationPage,
  'self-serve-settings-page': SelfServeSettingsPage,
  'single-sign-on': SingleSignOnPage,
  'sms-passcode': SmsPasscodePage,
  'sms-pumping-fraud': SmsPumpingFraudPage,
  'social-login': SocialLoginPage,
  'user-management': UserManagementPage,
  'whatsapp-otp': WhatsappOtpPage,
} as const;

export function getStaticPaths() {
  return [
    'attack-protection',
    'authentication',
    'authorization',
    'biometric-authentication',
    'biometric-login',
    'customization',
    'extensibility',
    'identity-security',
    'machine-to-machine-token',
    'multi-factor-authentication',
    'passkeys',
    'passwordless-authentication',
    'self-serve-settings-page',
    'single-sign-on',
    'sms-passcode',
    'sms-pumping-fraud',
    'social-login',
    'user-management',
    'whatsapp-otp',
  ].map((slug) => ({ params: { slug } }));
}

const { slug } = Astro.params as { slug: FeatureSlug };
const Component = pageMap[slug];
const meta = featuresMeta[slug];
if (!Component || !meta) {
  return Astro.redirect('/404');
}

const locale = 'en';
---

<BaseLayout locale={locale} title={meta.title} description={meta.description}>
  <Component locale={locale} />
</BaseLayout>
```

- [ ] **Step 3: Write zh-TW route**

Same content as Step 2 but with `const locale = 'en';` → `const locale = 'zh-TW';`. Written to `/Users/fung/dev/authgear-web/frontend-astro/src/pages/zh-TW/features/[slug].astro`.

- [ ] **Step 4: Build**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npm run build 2>&1 | tail -30
```

Expected: build succeeds; 38 prerendered features files listed.

- [ ] **Step 5: Verify all 38 files exist**

```bash
for slug in attack-protection authentication authorization biometric-authentication biometric-login customization extensibility identity-security machine-to-machine-token multi-factor-authentication passkeys passwordless-authentication self-serve-settings-page single-sign-on sms-passcode sms-pumping-fraud social-login user-management whatsapp-otp; do
  for path in "features/$slug" "zh-TW/features/$slug"; do
    test -f /Users/fung/dev/authgear-web/frontend-astro/dist/client/$path/index.html && echo "OK: $path" || echo "MISSING: $path"
  done
done
```

Expected: 38 `OK:` lines.

- [ ] **Step 6: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/src/pages/features/\[slug\].astro frontend-astro/src/pages/zh-TW/features/\[slug\].astro
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): add dynamic features/[slug] routes for en and zh-TW"
```

---

## Task 25: Playwright smoke tests

**Files:**
- Create: `/Users/fung/dev/authgear-web/frontend-astro/tests/phase2c3-features.spec.ts`

- [ ] **Step 1: Write the tests**

```ts
import { test, expect } from '@playwright/test';

const SLUGS = [
  'attack-protection',
  'authentication',
  'authorization',
  'biometric-authentication',
  'biometric-login',
  'customization',
  'extensibility',
  'identity-security',
  'machine-to-machine-token',
  'multi-factor-authentication',
  'passkeys',
  'passwordless-authentication',
  'self-serve-settings-page',
  'single-sign-on',
  'sms-passcode',
  'sms-pumping-fraud',
  'social-login',
  'user-management',
  'whatsapp-otp',
] as const;

test.describe('Phase 2c-3: features/[slug] — en', () => {
  for (const slug of SLUGS) {
    test(`/features/${slug} returns 200 with lang=en`, async ({ page }) => {
      const resp = await page.goto(`/features/${slug}`);
      expect(resp?.status()).toBe(200);
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
      await expect(page.locator('footer').first()).toBeVisible();
    });
  }
});

test.describe('Phase 2c-3: features/[slug] — zh-TW', () => {
  for (const slug of SLUGS) {
    test(`/zh-TW/features/${slug} returns 200 with lang=zh-TW`, async ({ page }) => {
      const resp = await page.goto(`/zh-TW/features/${slug}`);
      expect(resp?.status()).toBe(200);
      await expect(page.locator('html')).toHaveAttribute('lang', 'zh-TW');
      await expect(page.locator('footer').first()).toBeVisible();
    });
  }
});

test('MfaOptionsTabs hydrates on /features/multi-factor-authentication', async ({ page }) => {
  await page.goto('/features/multi-factor-authentication');
  // Scroll to the tabs — client:visible requires viewport intersection
  const tabs = page.locator('[role="tablist"]').first();
  await tabs.scrollIntoViewIfNeeded();
  await expect(tabs).toBeVisible();
  // Find any tab button and click it
  const firstTab = tabs.locator('[role="tab"]').first();
  await expect(firstTab).toBeVisible();
  await firstTab.click();
  await expect(firstTab).toHaveAttribute('aria-selected', 'true');
});

test('BiometricMethodsTabs hydrates on /features/biometric-authentication', async ({ page }) => {
  await page.goto('/features/biometric-authentication');
  const tabs = page.locator('[role="tablist"]').first();
  await tabs.scrollIntoViewIfNeeded();
  await expect(tabs).toBeVisible();
  const firstTab = tabs.locator('[role="tab"]').first();
  await expect(firstTab).toBeVisible();
  await firstTab.click();
  await expect(firstTab).toHaveAttribute('aria-selected', 'true');
});

test('SmsPumpingWarningFaqItem hydrates on /features/sms-pumping-fraud', async ({ page }) => {
  await page.goto('/features/sms-pumping-fraud');
  // The accordion has a button that toggles aria-expanded
  const trigger = page.locator('[aria-expanded]').first();
  await trigger.scrollIntoViewIfNeeded();
  await expect(trigger).toBeVisible();
  const initialExpanded = await trigger.getAttribute('aria-expanded');
  await trigger.click();
  const afterClickExpanded = await trigger.getAttribute('aria-expanded');
  expect(afterClickExpanded).not.toBe(initialExpanded);
});
```

- [ ] **Step 2: Run features tests only**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx playwright test tests/phase2c3-features.spec.ts --reporter=line 2>&1 | tail -50
```

Expected: 19 en + 19 zh-TW + 3 island-hydration = 41 passed.

**If an island hydration test fails:** the selectors in the test assume ARIA-standard `role="tablist"`/`role="tab"` and `aria-expanded` patterns. If the actual components use different markup (e.g. Webflow's `w-tab-menu` classes without ARIA), adjust the test selectors to match. Inspect the built HTML at `dist/client/features/multi-factor-authentication/index.html` to see the real markup.

- [ ] **Step 3: Full suite regression check**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx playwright test --reporter=line 2>&1 | tail -10
```

Expected: 69 existing + 41 new = 110 passed.

- [ ] **Step 4: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/tests/phase2c3-features.spec.ts
git -C /Users/fung/dev/authgear-web commit -m "test(astro): smoke tests for features/[slug] routes + island hydration"
```

---

## Task 26: Docs update

**Files:**
- Modify: `frontend-astro/README.md`
- Modify: `docs/ARCHITECTURE-ASTRO.md`

- [ ] **Step 1: Update README Phase status**

Change `- [ ] Phase 2c-3 — Features subtree + tab islands (22 pages + 3 islands)` to `- [x] Phase 2c-3 — Features subtree + tab islands (19 pages + 3 islands)`. Note the correction from "22 pages" to "19 pages" — the Next route only exposes 19 slugs; the extra 3 files were the tab/accordion components (now shipped as islands).

- [ ] **Step 2: Update ARCHITECTURE status marker**

Replace the `**Migration status` line with:

```markdown
**Migration status (2026-04-21):** Phases 1 + 2a + 2b + 2c (1/2/3) shipped on branch `migration/nextjs-to-astro`. Home + 13 static pages + 4 compare + 7 solutions + 19 features pages live in both locales with 3 new hydrated islands. `SmsCostCalculator` stubbed on `reduce-sms-otp-cost` pending Phase 2d. Phase 2d (tools + SMS calculator) plan pending.
```

- [ ] **Step 3: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/README.md docs/ARCHITECTURE-ASTRO.md
git -C /Users/fung/dev/authgear-web commit -m "docs(astro): Phase 2c-3 complete — features subtree shipped"
```

---

## Phase 2c-3 complete

Verification gate before Phase 2d:

1. `npm run build` — 38 new prerendered files under `dist/client/features/` + `dist/client/zh-TW/features/`
2. `npm test` — 110 passed
3. Manual: `PORT=3000 npm start`, visit at minimum:
   - `/features/multi-factor-authentication` — tab-switch in MFA options works
   - `/features/biometric-authentication` — tab-switch in biometric methods works
   - `/features/sms-pumping-fraud` — FAQ accordion item opens/closes
   - `/zh-TW/features/passkeys` — zh-TW locale renders
4. Compare 2-3 pages against current Next.js at `http://localhost:3000/features/…` for visual regressions

---

## Phase 2d outline (to follow in separate plan)

- 9 developer tool pages sharing `ToolHero`/`ToolFaq`/`ToolFeatureCards`/`ToolHowItWorks`/`ToolPopup`/`ToolReadyTo`/`ToolWidget` components
- Several tools have interactive widgets (JWT debugger, base64, HMAC, password hash, TOTP, UUID v7)
- `SmsCostCalculator` island (currently stubbed on `solutions/reduce-sms-otp-cost`)
- Dynamic `tools/[slug]` route pattern

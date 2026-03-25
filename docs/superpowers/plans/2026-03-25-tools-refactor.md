# Tools Pages Refactor Plan

**Goal:** Replace 9 near-identical tool page components with shared components and per-page data objects. Content is preserved; layout fidelity is best-effort (no obligation to match pixel-perfect).

---

## Audit findings

Every tool page has the same 7-section skeleton:

| Section | Varies? | Notes |
|---|---|---|
| Hero (h1 + description) | title, description | |
| Widget (iframe + banner + policy) | src, height, policy text | banner HTML is byte-for-byte identical |
| More Dev Tools grid | current slug only | same 8 cards, same order |
| Feature cards (4-up grid) | title, cards | PasswordHash has no icons |
| How It Works steps | title, N steps | |
| Ready to Supercharge CTA | nothing | byte-for-byte identical |
| FAQ cards | N cards | |
| Popup | nothing | byte-for-byte identical |

**PasswordHash** has one extra section ("Supported Password Hashing Functions") that uses the same feature card grid pattern but a different grid class (`_4-card-grid-tools hashing`).

---

## New file layout

```
frontend/
  components/tools/               <- new shared components
    ToolHero.tsx
    ToolWidget.tsx                 <- iframe + banner + policy
    MoreDevTools.tsx               <- 8-tool grid, currentSlug prop
    ToolFeatureCards.tsx           <- 4-up card grid
    ToolHowItWorks.tsx             <- numbered steps
    ToolReadyTo.tsx                <- CTA (no props)
    ToolFaq.tsx                    <- FAQ cards
    ToolPopup.tsx                  <- popup (no props)
  lib/tools/
    tools-registry.ts              <- typed list of all tools (slug, label, icon, href)
  components/pages/tools/
    JwtDebuggerPage.tsx            <- ~30 lines of data + component calls
    JwkGeneratorPage.tsx
    HmacPage.tsx
    OidcDiscoveryPage.tsx
    PasswordHashPage.tsx
    SslCheckerPage.tsx
    TotpPage.tsx
    UuidV7Page.tsx
    Base64Page.tsx
```

---

## Types

```typescript
// lib/tools/tools-registry.ts

export type ToolEntry = {
  slug: string;           // matches URL segment, e.g. "jwt-jwe-debugger"
  label: string;          // display name in MoreDevTools grid
  icon: string;           // /images/minitools-more-*.svg
  href: string;           // full path or external URL
  external?: boolean;
};

export const TOOLS: ToolEntry[] = [
  { slug: 'jwt-jwe-debugger',                label: 'JWT & JWE Debugger',               icon: '/images/minitools-more-jwt.svg',          href: '/tools/jwt-jwe-debugger' },
  { slug: 'jwk-generator',                   label: 'JWK Generator',                    icon: '/images/minitools-more-jwk.svg',          href: '/tools/jwk-generator' },
  { slug: 'hmac-signature-generator-verifier', label: 'HMAC Tool',                      icon: '/images/minitools-more-hmac.svg',         href: '/tools/hmac-signature-generator-verifier' },
  { slug: 'saml',                            label: 'SAML Testing Tool',                 icon: '/images/minitools-more-saml.svg',         href: 'https://samlsp.com/en/', external: true },
  { slug: 'totp-authenticator',              label: 'TOTP Authenticator',               icon: '/images/minitools-more-totp.svg',         href: '/tools/totp-authenticator' },
  { slug: 'password-hash-generator',         label: 'Password Hash Generator',          icon: '/images/minitools-more-passwordhash.svg', href: '/tools/password-hash-generator' },
  { slug: 'base64-decode-encode',            label: 'Base64 Decode and Encode',         icon: '/images/minitools-more-base64.svg',       href: '/tools/base64-decode-encode' },
  { slug: 'uuidv7-generator',               label: 'UUID v7 Generator & Timestamp Extractor', icon: '/images/uuid-v7.svg',            href: '/tools/uuidv7-generator' },
];
```

---

## Component signatures

### `ToolHero`
```tsx
type Props = { title: React.ReactNode; description: React.ReactNode };
// renders: <section className="tools-section bg-f9f9fb"> ... </section>
```

### `ToolWidget`
```tsx
type Props = {
  src: string;
  iframeTitle: string;
  height: string;          // e.g. "800px"
  policy: React.ReactNode; // JSX for the policy paragraph
};
// renders: widget section (iframe + banner + policy)
// banner HTML is hardcoded inside this component — not a prop
```

### `MoreDevTools`
```tsx
type Props = { currentSlug?: string };
// iterates TOOLS, marks matching slug as aria-current + w--current
```

### `ToolFeatureCards`
```tsx
type FeatureCard = {
  icon?: string;      // optional — PasswordHash "hashing" cards omit icons
  title: React.ReactNode;
  description: React.ReactNode;
};
type Props = {
  sectionTitle: React.ReactNode;
  cards: FeatureCard[];
  gridClass?: string; // default "_4-card-grid-tools"; PasswordHash passes "_4-card-grid-tools hashing"
};
```

### `ToolHowItWorks`
```tsx
type Step = { title: React.ReactNode; items: React.ReactNode[] };
type Props = {
  sectionTitle?: React.ReactNode; // default "How the Tool Works"
  steps: Step[];
};
```

### `ToolReadyTo`
```tsx
// No props. Renders the identical CTA section across all pages.
```

### `ToolFaq`
```tsx
type FaqCard = {
  icon: string;           // /images/tools-qa-*.svg
  title: React.ReactNode;
  content: React.ReactNode;
};
type Props = { cards: FaqCard[] };
```

### `ToolPopup`
```tsx
// No props. Renders the identical popup div.
```

---

## What a refactored page looks like

```tsx
// components/pages/tools/Base64Page.tsx  (~50 lines after refactor vs 218 now)
import ToolHero from '@/components/tools/ToolHero';
import ToolWidget from '@/components/tools/ToolWidget';
import MoreDevTools from '@/components/tools/MoreDevTools';
import ToolFeatureCards from '@/components/tools/ToolFeatureCards';
import ToolHowItWorks from '@/components/tools/ToolHowItWorks';
import ToolReadyTo from '@/components/tools/ToolReadyTo';
import ToolFaq from '@/components/tools/ToolFaq';
import ToolPopup from '@/components/tools/ToolPopup';

export default function Base64Page() {
  return (
    <>
      <ToolHero
        title="Base64 Decode & Encode"
        description="Easily decode or encode Base64 strings directly in your browser."
      />
      <ToolWidget
        src="https://base64-encoder-decoder-authgear.vercel.app/"
        iframeTitle="Base64 Encoder & Decoder"
        height="640px"
        policy="Your data security is our top priority. All encoding and decoding happen locally in your browser. This tool does not store or send any data outside of your device."
      />
      <MoreDevTools currentSlug="base64-decode-encode" />
      <ToolFeatureCards
        sectionTitle="Features"
        cards={[
          { icon: '/images/tools-base64-simple.svg', title: 'Simple & Fast', description: '...' },
          ...
        ]}
      />
      <ToolHowItWorks steps={[
        { title: 'Choose a character set', items: ['Select the character set you want to use...'] },
        ...
      ]} />
      <ToolReadyTo />
      <ToolFaq cards={[
        { icon: '/images/tools-qa-what-is.svg', title: 'What Is Base64 Encoding?', content: '...' },
        ...
      ]} />
      <ToolPopup />
    </>
  );
}
```

---

## Tasks

### Task 1 — `lib/tools/tools-registry.ts`
Create the typed `TOOLS` array. No component changes.

### Task 2 — Zero-prop shared components
Create `ToolReadyTo.tsx` and `ToolPopup.tsx` — extract the identical HTML from any one tool page.

### Task 3 — `MoreDevTools.tsx`
Create the component. Imports `TOOLS` from registry. Renders all 8 tool cards; marks `currentSlug` as active. Eliminates the biggest duplication (8 tool cards × 9 pages = 72 copies reduced to 1).

### Task 4 — `ToolHero.tsx` and `ToolWidget.tsx`
Create both. `ToolWidget` hardcodes the banner HTML internally (it never changes) and accepts `src`, `iframeTitle`, `height`, `policy` as props.

### Task 5 — `ToolFeatureCards.tsx`, `ToolHowItWorks.tsx`, `ToolFaq.tsx`
Create the three remaining shared components.

### Task 6 — Rewrite all 9 page components
Replace each page component with the data-only version using the shared components. Delete the `import Link` that was only needed for the now-extracted sections.

### Task 7 — Verify, commit
- Run `tsc --noEmit` — must be clean
- Spot-check 2–3 pages in the dev server
- Commit

---

## Expected outcome

| Metric | Before | After |
|---|---|---|
| Total lines in `components/pages/tools/` | ~2,000 | ~500 |
| Total lines in `components/tools/` | 0 | ~300 |
| Copies of "More Dev Tools" HTML | 9 | 1 |
| Copies of "Ready to Supercharge" HTML | 9 | 1 |
| Copies of popup HTML | 9 | 1 |
| Copies of banner HTML | 9 | 1 |

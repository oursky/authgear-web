# Layout.tsx Next.js Modernization Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the blocking WebFont.js CDN script and manual GTM script tags in `app/layout.tsx` with Next.js-native equivalents: `next/font/google` for fonts and `@next/third-parties` for Google Tag Manager.

**Architecture:** Two independent changes to `app/layout.tsx`. GTM is a drop-in component swap. Fonts require extra care because the Webflow CSS files (`public/css/authgear-new.webflow.css`, `webflow.css`) reference fonts by their original names (`Inter`, `IBM Plex Sans`, `PT Sans`, `Noto Sans TC`, `Red Hat Display`) — `next/font/google` serves fonts under hashed family names, so we must add `@font-face` aliases with the original names in the existing `<style>` block, pointing to the Next.js-hosted files.

**Tech Stack:** Next.js 16, `@next/third-parties` (new install), `next/font/google` (built into Next.js).

---

## File changes

| File | Change |
|------|--------|
| `package.json` | Add `@next/third-parties` |
| `package-lock.json` | Updated by npm |
| `app/layout.tsx` | Replace WebFont.js scripts + preconnect links; add `next/font/google` imports; add `<GoogleTagManager>`; add `@font-face` aliases in `<style>` block |

---

## Task 1: Install `@next/third-parties`

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install the package**

```bash
npm install @next/third-parties
```

Expected: `@next/third-parties` added to `dependencies` in `package.json`.

- [ ] **Step 2: Verify import resolves**

```bash
node -e "require('@next/third-parties/google')" && echo "OK"
```

Expected: prints `OK`.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install @next/third-parties"
```

---

## Task 2: Replace manual GTM scripts with `<GoogleTagManager>`

**Files:**
- Modify: `app/layout.tsx`

**Background:** The current layout has two manual `<Script>` tags for GTM:
1. A script tag loading `https://www.googletagmanager.com/gtag/js?id=GTM-KTHFL6S`
2. An inline `<Script id="gtm-init">` with the GTM dataLayer bootstrap snippet

Both are replaced by a single `<GoogleTagManager gtmId="GTM-KTHFL6S" />` placed directly inside `<html>` before `<body>`, per Next.js docs convention.

- [ ] **Step 1: Update `app/layout.tsx`**

Replace the two GTM `<Script>` blocks:

```tsx
// REMOVE these two Script tags:
<Script
  src="https://www.googletagmanager.com/gtag/js?id=GTM-KTHFL6S"
  strategy="afterInteractive"
/>
<Script id="gtm-init" strategy="afterInteractive">
  {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-KTHFL6S');`}
</Script>
```

Add at the top of the imports:
```tsx
import { GoogleTagManager } from '@next/third-parties/google';
```

Place the component directly inside `<html>`, before `<body>`:
```tsx
<html lang={htmlLang} suppressHydrationWarning>
  <GoogleTagManager gtmId="GTM-KTHFL6S" />
  <head>
    ...
  </head>
  <body ...>
    ...
  </body>
</html>
```

If `import Script from 'next/script'` is no longer needed after removing the GTM scripts (jQuery and Webflow scripts still use it), keep it. Check other usages before removing.

- [ ] **Step 2: Verify the app builds**

```bash
npm run build 2>&1 | tail -20
```

Expected: build completes without errors.

- [ ] **Step 3: Verify GTM loads in browser**

Start `npm run dev`, open http://localhost:3000, open DevTools → Network tab, filter for `gtm.js`. Confirm the GTM script loads.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: replace manual GTM scripts with GoogleTagManager component"
```

---

## Task 3: Configure `next/font/google` for all five fonts

**Files:**
- Modify: `app/layout.tsx`

**Background:** The current layout loads fonts via a synchronous WebFont.js CDN script (blocking render) plus an inline `WebFont.load()` call. We replace this with `next/font/google`, which downloads fonts at build time and self-hosts them.

**Webflow CSS compatibility note:** `next/font/google` generates `@font-face` declarations with hashed family names (e.g., `__Inter_abc123`). The Webflow CSS files use bare family names (`Inter`, `IBM Plex Sans`, `PT Sans`, `Noto Sans TC`, `Red Hat Display`). Task 4 adds `@font-face` aliases with original names to bridge this gap. In this task, we set up the font imports and get the CSS variable names ready; we do NOT remove WebFont.js yet.

The five fonts currently loaded:
- PT Sans — weights 400, 700; normal + italic styles
- IBM Plex Sans — weights 300, 400, 500, 600, 700
- Inter — weights 300, 400, 500, 600, 700
- Noto Sans TC — weights 300, 400, 500, 600, 700; needs `chinese-traditional` subset
- Red Hat Display — weights 300, 400, 500, 600, 700

- [ ] **Step 1: Add font imports and configuration to `app/layout.tsx`**

Add at the top of the file (after existing imports):

```tsx
import {
  PT_Sans,
  IBM_Plex_Sans,
  Inter,
  Noto_Sans_TC,
  Red_Hat_Display,
} from 'next/font/google';

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-pt-sans',
  display: 'swap',
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-ibm-plex-sans',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin', 'chinese-traditional'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-noto-sans-tc',
  display: 'swap',
});

const redHatDisplay = Red_Hat_Display({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-red-hat-display',
  display: 'swap',
});
```

Apply all variable classes to `<html>`:

```tsx
<html
  lang={htmlLang}
  suppressHydrationWarning
  className={[
    ptSans.variable,
    ibmPlexSans.variable,
    inter.variable,
    notoSansTC.variable,
    redHatDisplay.variable,
  ].join(' ')}
>
```

**Do NOT remove WebFont.js yet** — Webflow CSS still needs named fonts. Removing happens in Task 4.

- [ ] **Step 2: Start dev server and discover font file paths**

```bash
npm run dev
```

Open http://localhost:3000 in Chrome. Open DevTools → Elements tab → `<head>` → find the `<style>` injected by Next.js fonts. It will contain `@font-face` rules like:

```css
@font-face {
  font-family: '__Inter_abc123';
  src: url('/_next/static/media/FILENAME.woff2') format('woff2');
  font-weight: 300 700;
  font-display: swap;
}
```

Record all five families' `@font-face` src URLs from DevTools. You need one URL per family (the one covering weight 100 900, or if separate entries per weight, pick any one — we'll add all needed weights in Task 4).

Alternatively, after dev server starts:

```bash
ls .next/static/media/ | grep -v favicon | grep -v flags
```

This lists the downloaded font files. Match them to their font families by inspecting the DevTools `@font-face` rules.

- [ ] **Step 3: Verify fonts are downloaded**

```bash
ls .next/static/media/*.woff2 2>/dev/null | wc -l
```

Expected: more than 0 files (should be ~10–25 files across all weights and fonts).

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: add next/font/google imports for all five fonts"
```

---

## Task 4: Add `@font-face` aliases and remove WebFont.js

**Files:**
- Modify: `app/layout.tsx`

**Background:** Using the file paths discovered in Task 3, add `@font-face` declarations with the original family names to the existing inline `<style>` block. These declarations shadow the bare font names that Webflow CSS uses (`Inter`, `IBM Plex Sans`, etc.) and point them to the Next.js-hosted files. Then remove the WebFont.js CDN script, the inline `WebFont.load()` call, and the Google Fonts preconnect links.

**Important:** The inline `<style>` block already exists in `<head>` and loads AFTER the Webflow CSS `<link>` tags — so `@font-face` rules added here are available when Webflow CSS resolves font family names.

- [ ] **Step 1: Add `@font-face` aliases to the `<style>` block in `app/layout.tsx`**

Using the font file paths discovered in Task 3 Step 2, add `@font-face` declarations at the top of the existing `<style>` block. Template (fill in actual `FILENAME` values from discovery):

```tsx
<style>{`
/* ── Next.js self-hosted font aliases ──────────────────────────────
   These @font-face rules map the original Google Font family names
   to the locally-served font files downloaded by next/font/google.
   Required because Webflow CSS references fonts by bare family name.
──────────────────────────────────────────────────────────────────── */
@font-face {
  font-family: 'Inter';
  src: url('/_next/static/media/INTER_FILE.woff2') format('woff2');
  font-weight: 300 700;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'IBM Plex Sans';
  src: url('/_next/static/media/IBM_FILE.woff2') format('woff2');
  font-weight: 300 700;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'PT Sans';
  src: url('/_next/static/media/PT_SANS_NORMAL_FILE.woff2') format('woff2');
  font-weight: 400 700;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'PT Sans';
  src: url('/_next/static/media/PT_SANS_ITALIC_FILE.woff2') format('woff2');
  font-weight: 400 700;
  font-style: italic;
  font-display: swap;
}
@font-face {
  font-family: 'Noto Sans TC';
  src: url('/_next/static/media/NOTO_FILE.woff2') format('woff2');
  font-weight: 300 700;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Red Hat Display';
  src: url('/_next/static/media/RED_HAT_FILE.woff2') format('woff2');
  font-weight: 300 700;
  font-style: normal;
  font-display: swap;
}

/* existing rules below unchanged */
.w-container{max-width:1271px;}
...
`}</style>
```

> **Note:** If a font has separate files per weight (non-variable font), add one `@font-face` entry per weight. Check the DevTools output from Task 3 Step 2 to confirm whether the font is variable (one file, `font-weight: 100 900`) or not (multiple files).

- [ ] **Step 2: Remove WebFont.js and Google Fonts preconnect links from `<head>`**

Remove these lines from `<head>`:

```tsx
// REMOVE:
<link href="https://fonts.googleapis.com" rel="preconnect" />
<link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin="anonymous" />
{/* eslint-disable-next-line @next/next/no-sync-scripts */}
<script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js" type="text/javascript" />
<script
  type="text/javascript"
  dangerouslySetInnerHTML={{
    __html: `WebFont.load({google:{families:[...]}});`,
  }}
/>
```

- [ ] **Step 3: Verify the app builds cleanly**

```bash
npm run build 2>&1 | tail -20
```

Expected: no errors.

- [ ] **Step 4: Visual verification in dev**

```bash
npm run dev
```

Open http://localhost:3000. Check:
- Headings and body text render in Inter or IBM Plex Sans (not system sans-serif like Arial)
- Traditional Chinese content (if visible) renders in Noto Sans TC
- No requests to `fonts.googleapis.com` or `ajax.googleapis.com` in DevTools → Network tab

- [ ] **Step 5: Check for `next/script` usage**

If the two GTM `<Script>` tags (removed in Task 2) were the only remaining `Script` usages, check whether `import Script from 'next/script'` is still needed:

```bash
grep -n "Script" app/layout.tsx
```

The jQuery and Webflow JS `<Script>` tags remain — keep the import.

- [ ] **Step 6: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: self-host fonts via next/font/google, remove WebFont.js CDN dependency"
```

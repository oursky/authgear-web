# Logo Marquee Component Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extract the duplicated logo marquee HTML and its inline CSS into a self-contained `LogoMarquee` server component with a co-located CSS module.

**Architecture:** A new `LogoMarquee` server component owns all marquee markup and CSS. It accepts an optional `readStoryLabel` prop for the hover CTA. Both pages that use it (`HomePage`, `ReduceSmsOtpCostPage`) replace their inline marquee HTML with `<LogoMarquee />`. The marquee CSS block is removed from `layout.tsx`. The component uses a CSS Module for the animation/positioning overrides; Webflow class names that carry Webflow base styles (e.g. `flex-block-85`, `link-block-7`, `w-layout-hflex`) are kept alongside the module classes so Webflow CSS continues to apply.

**Tech Stack:** Next.js 16 App Router, React 19 server component, CSS Modules.

---

## Background

### What is currently in layout.tsx (to be removed)

```css
/* Trusted-by logo marquee: Webflow IX2 animation scripts are stripped from static HTML export */
.flex-block-85:has(.logo-marquee-viewport){width:100%;height:60px;}
.logo-marquee-viewport{flex:1;min-width:0;width:100%;height:60px;overflow:hidden;position:relative;z-index:0;}
.logo-marquee-track{position:relative;z-index:0;display:flex;width:max-content;animation:authgear-logo-marquee 38s linear infinite;}
.logo-marquee-track:hover{animation-play-state:paused;}
.logo-marquee-viewport .logos-container{position:relative!important;left:auto!important;z-index:1;height:60px;flex-shrink:0;display:flex;align-items:center;column-gap:60px;width:auto;}
.logo-marquee-viewport .link-block-7{
  position:absolute!important;
  left:50%;
  top:50%;
  transform:translate(-50%,-50%)!important;
  z-index:2;
  opacity:0;
  flex-shrink:0;
  transition:opacity .25s ease!important;
  pointer-events:none;
}
.logo-marquee-viewport:hover .link-block-7,
.logo-marquee-viewport .link-block-7:hover,
.logo-marquee-viewport .link-block-7:focus-visible{
  opacity:1;
  pointer-events:auto;
}
@keyframes authgear-logo-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@media (prefers-reduced-motion:reduce){
  .logo-marquee-track{animation:none;width:100%;justify-content:center;flex-wrap:wrap;}
  .logo-marquee-viewport .logos-container:last-child{display:none;}
}
```

### Why CSS classes are shared with Webflow CSS

`flex-block-85`, `link-block-7`, and `logos-container` appear in `public/css/authgear-new.webflow.css`. They carry base styles (flex layout, gradient button appearance, etc.) that we want to keep. The custom CSS in `layout.tsx` overrides the *positioning* from Webflow's defunct IX2 animation system (which used `position:absolute`). The component must keep those Webflow class names on the relevant elements so Webflow CSS continues to apply its base styles.

### CSS naming strategy

| Element | Webflow class (keep) | CSS Module class (add alongside) | Purpose of module class |
|---------|---------------------|----------------------------------|-------------------------|
| Outer wrapper | `flex-block-85 w-layout-hflex` | `styles.root` | Explicit width/height guarantee |
| Scrolling viewport | — | `styles.viewport` | Override position, add overflow:hidden |
| Animated track | — | `styles.track` | Animation, flex layout |
| Logo row (×2) | `logos-container w-layout-hflex` | `styles.logosContainer` | Reset Webflow's position:absolute |
| CTA overlay link | `link-block-7 w-inline-block` | `styles.ctaLink` | Override to position:absolute, hide/show |

---

## File Structure

| File | Action | Responsibility |
|------|--------|----------------|
| `components/LogoMarquee.module.css` | Create | All marquee CSS (animation, overrides, reduced-motion) |
| `components/LogoMarquee.tsx` | Create | Marquee markup, logo list, CTA link, CSS module import |
| `components/pages/HomePage.tsx` | Modify | Replace inline marquee block with `<LogoMarquee>` |
| `components/pages/solutions/ReduceSmsOtpCostPage.tsx` | Modify | Replace inline marquee block with `<LogoMarquee>` |
| `app/layout.tsx` | Modify | Remove the marquee CSS block from the inline `<style>` |

---

## Task 1: Create LogoMarquee.module.css

**Files:**
- Create: `components/LogoMarquee.module.css`

- [ ] **Step 1: Create the CSS module file**

```css
/* components/LogoMarquee.module.css */

.root {
  width: 100%;
  height: 60px;
}

.viewport {
  flex: 1;
  min-width: 0;
  width: 100%;
  height: 60px;
  overflow: hidden;
  position: relative;
  z-index: 0;
}

.track {
  position: relative;
  z-index: 0;
  display: flex;
  width: max-content;
  animation: marquee 38s linear infinite;
}

.track:hover {
  animation-play-state: paused;
}

/* Resets Webflow IX2 positioning (position:absolute, left:0) on .logos-container */
.logosContainer {
  position: relative !important;
  left: auto !important;
  z-index: 1;
  height: 60px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  column-gap: 60px;
  width: auto;
}

/* Overrides Webflow's position:static on .link-block-7; adds centered overlay behaviour */
.ctaLink {
  position: absolute !important;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) !important;
  z-index: 2;
  opacity: 0;
  flex-shrink: 0;
  transition: opacity 0.25s ease !important;
  pointer-events: none;
}

.viewport:hover .ctaLink,
.ctaLink:hover,
.ctaLink:focus-visible {
  opacity: 1;
  pointer-events: auto;
}

@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

@media (prefers-reduced-motion: reduce) {
  .track {
    animation: none;
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
  }
  .logosContainer:last-child {
    display: none;
  }
}
```

- [ ] **Step 2: Verify the file exists**

```bash
ls -la components/LogoMarquee.module.css
```

Expected: file present.

---

## Task 2: Create LogoMarquee.tsx

**Files:**
- Create: `components/LogoMarquee.tsx`

- [ ] **Step 1: Create the component**

```tsx
// components/LogoMarquee.tsx
import styles from './LogoMarquee.module.css';

const logos = [
  { src: '/images/logo-CIMIC2x.png',      alt: 'CIMIC' },
  { src: '/images/logo-HKL2x.png',        alt: 'HKL' },
  { src: '/images/logo-hkpc2x.png',       alt: 'HKPC' },
  { src: '/images/logo-K112x.png',        alt: 'K11' },
  { src: '/images/logo-MTR2x.png',        alt: 'MTR' },
  { src: '/images/logo-outback2x.png',    alt: 'Outback' },
  { src: '/images/logo-cornerstone2x.png', alt: 'Cornerstone' },
  { src: '/images/logo-place2x.png',      alt: 'PLACE' },
];

interface Props {
  readStoryLabel?: string;
}

export default function LogoMarquee({ readStoryLabel = 'Read customer story' }: Props) {
  return (
    <div className={`w-layout-hflex flex-block-85 ${styles.root}`}>
      <div className={styles.viewport}>
        <div className={styles.track}>
          {[0, 1].map((i) => (
            <div key={i} className={`w-layout-hflex logos-container ${styles.logosContainer}`}>
              {logos.map((logo) => (
                <img
                  key={logo.src}
                  loading="lazy"
                  src={logo.src}
                  alt={logo.alt}
                  className="logo"
                />
              ))}
            </div>
          ))}
        </div>
        <a
          href="/customer-stories"
          target="_blank"
          rel="noopener noreferrer"
          className={`link-block-7 w-inline-block ${styles.ctaLink}`}
        >
          <div>{readStoryLabel}</div>
          <img loading="lazy" src="/images/logo-read-story-arrow.svg" alt="" />
        </a>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify the build compiles**

```bash
npm run build 2>&1 | grep -E "error|Error|LogoMarquee" | head -20
```

Expected: no errors mentioning LogoMarquee.

- [ ] **Step 3: Commit**

```bash
git add components/LogoMarquee.tsx components/LogoMarquee.module.css
git commit -m "feat: add LogoMarquee component with CSS module"
```

---

## Task 3: Replace marquee in HomePage.tsx

**Files:**
- Modify: `components/pages/HomePage.tsx`

**Background:** The marquee block in `HomePage.tsx` is at lines ~73–83:

```tsx
<div className="w-layout-hflex flex-block-85">
  <div className="logo-marquee-viewport">
    <div className="logo-marquee-track">
      <div className="w-layout-hflex logos-container">
        <img loading="lazy" src="/images/logo-CIMIC2x.png" alt="" className="logo" />
        ...8 img tags...
      </div>
      <div className="w-layout-hflex logos-container">
        ...8 img tags (duplicate)...
      </div>
    </div>
    <a href="/customer-stories" target="_blank" rel="noopener noreferrer" className="link-block-7 w-inline-block">
      <div>{t('readCustomerStory')}</div>
      <img loading="lazy" src="/images/logo-read-story-arrow.svg" alt="" />
    </a>
  </div>
</div>
```

Replace it with a single `<LogoMarquee>` call passing the translated label.

- [ ] **Step 1: Add the import to HomePage.tsx**

After the existing imports, add:

```tsx
import LogoMarquee from '@/components/LogoMarquee';
```

- [ ] **Step 2: Replace the marquee block**

Find the outer `<div className="w-layout-hflex flex-block-85">` containing the marquee and replace the entire block (from that `<div>` to its closing `</div>`) with:

```tsx
<LogoMarquee readStoryLabel={t('readCustomerStory')} />
```

- [ ] **Step 3: Verify build**

```bash
npm run build 2>&1 | grep -E "error|Error" | head -10
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add components/pages/HomePage.tsx
git commit -m "refactor: replace inline marquee in HomePage with LogoMarquee component"
```

---

## Task 4: Replace marquee in ReduceSmsOtpCostPage.tsx

**Files:**
- Modify: `components/pages/solutions/ReduceSmsOtpCostPage.tsx`

**Background:** The marquee block in `ReduceSmsOtpCostPage.tsx` is at lines ~317–327:

```tsx
<div className="w-layout-hflex flex-block-85">
  <div className="logo-marquee-viewport">
    <div className="logo-marquee-track">
      <div className="w-layout-hflex logos-container">
        <img loading="lazy" src="/images/logo-CIMIC2x.png" alt="" className="logo" />
        ...8 img tags...
      </div>
      <div className="w-layout-hflex logos-container">
        ...8 img tags (duplicate)...
      </div>
    </div>
    <a href="/customer-stories" target="_blank" className="link-block-7 w-inline-block">
      <div>Read customer story</div>
      <img loading="lazy" src="/images/logo-read-story-arrow.svg" alt="" />
    </a>
  </div>
</div>
```

Replace it with `<LogoMarquee />` (no prop needed — defaults to 'Read customer story').

- [ ] **Step 1: Add the import to ReduceSmsOtpCostPage.tsx**

After the existing imports, add:

```tsx
import LogoMarquee from '@/components/LogoMarquee';
```

- [ ] **Step 2: Replace the marquee block**

Find the outer `<div className="w-layout-hflex flex-block-85">` containing the marquee and replace the entire block with:

```tsx
<LogoMarquee />
```

- [ ] **Step 3: Verify build**

```bash
npm run build 2>&1 | grep -E "error|Error" | head -10
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add components/pages/solutions/ReduceSmsOtpCostPage.tsx
git commit -m "refactor: replace inline marquee in ReduceSmsOtpCostPage with LogoMarquee component"
```

---

## Task 5: Remove marquee CSS from layout.tsx

**Files:**
- Modify: `app/layout.tsx`

**Background:** With the CSS now in `LogoMarquee.module.css`, the marquee CSS block in the inline `<style>` tag is dead weight. The block starts with the `/* Trusted-by logo marquee */` comment and ends before the closing backtick/`</style>`.

The inline `<style>` block after this change should contain only:

```css
.w-container{max-width:1271px;}
/* Replaces Webflow's w-mod-touch JS snippet — disables fixed backgrounds on touch devices */
@media (hover:none) and (pointer:coarse){*{background-attachment:scroll!important;}}
```

- [ ] **Step 1: Remove the marquee CSS block from layout.tsx**

Remove these lines from the inline `<style>` block in `app/layout.tsx`:

```
/* Trusted-by logo marquee: Webflow IX2 animation scripts are stripped from static HTML export */
.flex-block-85:has(.logo-marquee-viewport){width:100%;height:60px;}
.logo-marquee-viewport{flex:1;min-width:0;width:100%;height:60px;overflow:hidden;position:relative;z-index:0;}
.logo-marquee-track{position:relative;z-index:0;display:flex;width:max-content;animation:authgear-logo-marquee 38s linear infinite;}
.logo-marquee-track:hover{animation-play-state:paused;}
.logo-marquee-viewport .logos-container{position:relative!important;left:auto!important;z-index:1;height:60px;flex-shrink:0;display:flex;align-items:center;column-gap:60px;width:auto;}
.logo-marquee-viewport .link-block-7{
  position:absolute!important;
  left:50%;
  top:50%;
  transform:translate(-50%,-50%)!important;
  z-index:2;
  opacity:0;
  flex-shrink:0;
  transition:opacity .25s ease!important;
  pointer-events:none;
}
.logo-marquee-viewport:hover .link-block-7,
.logo-marquee-viewport .link-block-7:hover,
.logo-marquee-viewport .link-block-7:focus-visible{
  opacity:1;
  pointer-events:auto;
}
@keyframes authgear-logo-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@media (prefers-reduced-motion:reduce){
  .logo-marquee-track{animation:none;width:100%;justify-content:center;flex-wrap:wrap;}
  .logo-marquee-viewport .logos-container:last-child{display:none;}
}
```

- [ ] **Step 2: Verify the build**

```bash
npm run build 2>&1 | tail -10
```

Expected: clean build with no errors.

- [ ] **Step 3: Confirm no marquee CSS remains in layout.tsx**

```bash
grep -n "marquee\|logo-marquee\|flex-block-85:has\|authgear-logo-marquee" app/layout.tsx
```

Expected: no output.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx
git commit -m "refactor: remove marquee CSS from layout.tsx (moved to LogoMarquee.module.css)"
```

---
name: localize homepage zh
overview: Make `/zh` serve Chinese homepage body and metadata using the existing Webflow Chinese homepage content, without changing the shared English shell in `layout.tsx`. Keep the change narrow to the homepage route and the static Webflow loader.
todos:
  - id: fetch-zh-homepage-source
    content: Fetch the Chinese homepage content and metadata from Webflow MCP and prepare a repo-backed localized homepage HTML source.
    status: pending
  - id: wire-locale-homepage
    content: Make the localized homepage route choose the English or Chinese homepage source by locale.
    status: pending
  - id: localize-homepage-metadata
    content: Replace hardcoded homepage metadata with locale-aware metadata for `/en` and `/zh`.
    status: pending
  - id: validate-homepage-rendering
    content: Verify `/en` and `/zh` render correctly with existing Webflow asset/script handling.
    status: pending
isProject: false
---

# Localize Homepage to Chinese

## Scope

Localize only the homepage body and page metadata for `/zh`. Leave the shared header, footer, and cookie banner in [frontend/app/layout.tsx](frontend/app/layout.tsx) unchanged for now.

## Current State

- [frontend/app/[locale]/page.tsx](frontend/app/[locale]/page.tsx) always renders the same static export: `index.html`.
- [frontend/lib/webflow-page.ts](frontend/lib/webflow-page.ts) reads HTML only from the local Webflow export directory and has no locale-aware file selection.
- Webflow already has Chinese homepage content available for the `Home` page, including localized static nodes and a locale-specific published path.

## Plan

1. Add a Chinese homepage source file under [authgear-new.webflow](authgear-new.webflow) derived from the Webflow Chinese homepage content.
  - Preferred implementation: create a locale-specific homepage HTML file, such as `index.zh.html`, rather than trying to patch the English export at runtime.
  - Reason: Webflow MCP localized node IDs do not appear in the checked-in static `index.html`, so a runtime node-overlay approach would be brittle.
2. Make the homepage route locale-aware in [frontend/app/[locale]/page.tsx](frontend/app/[locale]/page.tsx).
  - Read `params.locale`.
  - Render `index.zh.html` for `zh` and `index.html` for `en`.
  - Replace the hardcoded English metadata with locale-aware metadata for the homepage.
3. Extend the static Webflow loader in [frontend/components/StaticWebflowPage.tsx](frontend/components/StaticWebflowPage.tsx) and/or [frontend/lib/webflow-page.ts](frontend/lib/webflow-page.ts).
  - Keep the existing extraction/cleanup logic.
  - Add the minimal locale/file-selection support needed so the homepage can choose the correct localized source while other pages remain unchanged.
4. Align root-home behavior in [frontend/app/page.tsx](frontend/app/page.tsx) if necessary.
  - Because middleware redirects `/` to `/{locale}`, this route is mostly fallback behavior.
  - Keep it consistent enough that direct rendering still uses valid homepage metadata/body, but avoid broad refactors.
5. Verify end-to-end behavior.
  - `/en` still matches the current homepage.
  - `/zh` shows Chinese homepage body and Chinese metadata.
  - Asset rewriting, script extraction, and internal link cleanup still work with the new localized homepage file.

## Notes

- This plan intentionally avoids touching the shared shell in [frontend/app/layout.tsx](frontend/app/layout.tsx), since that would expand the change from homepage localization into site-wide chrome localization.
- During implementation, Webflow MCP should be used to fetch the current Chinese homepage copy/SEO text, then that content should be captured into the repo-backed localized homepage source so the app does not depend on MCP at runtime.


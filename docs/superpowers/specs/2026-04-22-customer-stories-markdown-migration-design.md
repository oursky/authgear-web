# Customer Stories — Migrate Strapi → Markdown (Astro Content Collection)

**Date:** 2026-04-22
**Scope:** `frontend-astro/` — move Customer Stories content off Strapi and into Astro Content Collections backed by local markdown files. Other collections (blog, login gallery, etc.) remain in Strapi for now; this is the first phase of a staged CMS exit.

## Goals

- Customer Stories render from `src/content/customer-stories/{locale}/{slug}.md` at build time.
- Preserve the existing URL structure (`/customer-stories`, `/customer-stories/{slug}`, `/zh-TW/customer-stories`, `/zh-TW/customer-stories/{slug}`).
- Preserve both locales (en + zh-TW) as real translated content, per user direction.
- Remove Strapi runtime dependency from the Customer Stories code path (type + fetch helpers + rich-text renderer).
- Route output flips from SSR to static (`prerender = true`) since content is now build-time.

## Non-goals

- Not migrating blog, integrations, login gallery, what's new, or any other Strapi collection. Each gets its own spec later.
- Not rewriting the customer-story **page layout** — visual template stays the same. Only the data source and body renderer change.

## Content model

### Collection config — `src/content/config.ts`

```ts
import { defineCollection, z } from 'astro:content';

const customerStories = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    excerpt: z.string(),
    companyIndustry: z.string().optional(),
    companyLocation: z.string().optional(),
    companyLogo: image(),
    coverImage: image(),
    thumbnail: image(),
    loginMethods: z.array(z.string()).default([]),
    technicalDetails: z.array(z.string()).default([]),
    metrics: z.array(z.object({
      num: z.string(),
      text: z.string(),
    })).max(3).default([]),
    publishedAt: z.coerce.date(),
    order: z.number().optional(),
  }),
});

export const collections = { 'customer-stories': customerStories };
```

### Directory layout

```
src/content/customer-stories/
  en/
    acme/
      index.md
      logo.webp
      cover.webp
      thumbnail.webp
      fig-1.webp
      fig-2.webp
    another-story/
      …
  zh-TW/
    acme/
      index.md
      logo.webp
      cover.webp
      thumbnail.webp
    another-story/
      …
```

- Collection entry id is `{locale}/{slug}/index` (Astro's convention when using `index.md`).
- `slug` used in the URL is the folder name; it is identical across locales so the zh-TW route can fall back to en when a translation is missing.
- Images sit beside `index.md`; markdown references them as `./logo.webp`, `./cover.webp`, `./fig-1.webp`, etc. Astro's `image()` schema helper and markdown-image pipeline optimize them (responsive srcset + WebP variants).

### Frontmatter example

```yaml
---
title: "How Acme boosted sign-ups by 40% with passkeys"
excerpt: "Acme replaced SMS OTP with passkeys and cut login friction."
companyIndustry: "FinTech"
companyLocation: "Singapore"
companyLogo: ./logo.webp
coverImage: ./cover.webp
thumbnail: ./thumbnail.webp
loginMethods: ["Passkeys", "Email OTP"]
technicalDetails: ["SDK", "OIDC"]
metrics:
  - num: "40%"
    text: "faster sign-up"
  - num: "60%"
    text: "fewer support tickets"
publishedAt: 2024-11-12
order: 1
---

Markdown body here …
```

## Migration script

**Path:** `scripts/strapi-to-markdown-customer-stories.mjs` (root-level; one-shot tool).

**Inputs:** `STRAPI_URL`, `STRAPI_API_TOKEN` (or read from `frontend-astro/.env.local`).

**Per locale (`en`, `zh-Hant-TW`):**

1. Fetch all customer-story entries with `populate=*&pagination[pageSize]=100` and `locale=<locale>`.
2. For each entry:
   1. Compute output dir: `frontend-astro/src/content/customer-stories/{pathLocale}/{slug}/` where `pathLocale` is `en` or `zh-TW`.
   2. Download `companyLogo`, `coverImage`, `thumbnail` to `./logo.<ext>`, `./cover.<ext>`, `./thumbnail.<ext>`. Preserve source extension; if Strapi returns multiple sizes, take the largest.
   3. Walk `content` blocks JSON; for each `image` block, download to `./fig-{N}.<ext>` (1-indexed), replace URL in the block with the relative path.
   4. Convert blocks to markdown (see "Blocks → markdown rules" below).
   5. Build frontmatter object from the entry fields (listed in the collection schema).
   6. Write `{outputDir}/index.md` with `--- yaml --- \n\n markdown body`.
3. Log count + any unhandled block types.

**Idempotent:** re-running overwrites existing files. The script does not delete stale entries — stale slugs are flagged but the dev reviews and removes manually (safer than silent deletion).

### Blocks → markdown rules

| Strapi block type | Markdown output |
| --- | --- |
| `paragraph` | one paragraph, blank line separator |
| `heading` (level 1-6) | `#` × level + space + text |
| `list` type=unordered | `- item` per list-item |
| `list` type=ordered | `1. item` per list-item (all `1.`) |
| `quote` | `> …` per line |
| `code` | fenced code block with language if present |
| `image` | `![alt](./fig-N.<ext>)` on its own line |
| `link` inline | `[text](url)` |
| `bold` / `italic` / `code` inline | `**…**` / `*…*` / `` `…` `` |
| underline / strikethrough | keep raw HTML (`<u>`, `<s>`) — markdown has no portable equivalent |

Any block type not in this table is logged and emitted as a fenced ```` ```json ```` dump so it's visible for manual review. Customer story bodies are expected to be plain prose, so this should be rare.

## Page wiring

### Index route — `src/pages/customer-stories/index.astro`

```ts
export const prerender = true;
const entries = (await getCollection('customer-stories', ({ id }) => id.startsWith('en/')))
  .sort((a, b) => (a.data.order ?? 9e9) - (b.data.order ?? 9e9)
                  || b.data.publishedAt.getTime() - a.data.publishedAt.getTime());
```

Each entry renders its card with `entry.data.thumbnail` (an `ImageMetadata` from the schema) passed to `<Image />`, and link `/customer-stories/{entry.slug.replace(/^en\//, '')}`.

### Detail route — `src/pages/customer-stories/[slug].astro`

```ts
export const prerender = true;
export async function getStaticPaths() {
  const entries = await getCollection('customer-stories', ({ id }) => id.startsWith('en/'));
  return entries.map((entry) => ({
    params: { slug: entry.id.replace(/^en\/(.+)\/index$/, '$1') },
    props: { entry },
  }));
}
const { entry } = Astro.props;
const { Content } = await entry.render();
```

Template renders hero + sidebar + `<Content />` inside the `ds-richtext-prose` container. Hero image, logo, thumbnail use `<Image />` — Astro generates responsive srcsets automatically.

zh-TW routes mirror the above but filter `id.startsWith('zh-TW/')`. The detail route looks up the matching zh-TW entry by slug; if absent, falls back to the en entry (so no 404s for missing translations). Locale detection for nav/footer still uses the `locale` path prefix.

### Removed

- `src/lib/strapi.ts` — delete `getCustomerStories`, `getCustomerStoryBySlug`, and the `CustomerStory` type.
- `src/components/customer-story/CustomerStoryBody.tsx` — replaced by inline `<Content />` usage in the route.
- `@strapi/blocks-react-renderer` usage for customer stories (the dep stays until blog/login-gallery also migrate).

## i18n fallback rule

For a given slug and path locale `L`:
- Detail route: look up entry at `{L}/{slug}/index`. If missing, look up `en/{slug}/index`. If still missing → 404.
- Index route: list entries only from the current locale's folder. If the zh-TW folder is empty or sparse, the zh-TW index shows only whatever zh-TW entries exist (not auto-filled with en).

## Testing

- `npm run build` produces HTML files under `dist/customer-stories/*/index.html` for every en slug, and under `dist/zh-TW/customer-stories/*/index.html` for every zh-TW slug (falling back via slug match where applicable).
- Spot check 2–3 stories rendered from markdown match the previous Strapi-rendered output (hero image, metrics, body structure).
- `npm run dev` at port 4321 serves the same routes.
- No references to `getCustomerStories` / `CustomerStory` remain in the codebase (grep).

## Rollback

Customer Stories data was never only-in-markdown — Strapi remains the source until this spec ships. Rollback = `git revert` the switchover commit. Pre-generated markdown files can be left on disk harmlessly (nothing references them after revert).

## Out-of-scope (future phases)

- Blog posts (same treatment, more entries, MDX body may be needed for embedded code snippets).
- Login gallery, what's new, integrations, team members — each a separate spec.
- Removal of the `@strapi/blocks-react-renderer` dependency from `package.json` (last consumer wins).
- Content authoring workflow (editorial tooling) beyond "edit the markdown file and commit".

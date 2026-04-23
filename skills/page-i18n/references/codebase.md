# Codebase i18n Reference

## File locations

| File | Purpose |
|------|---------|
| `src/i18n/en.json` | English messages |
| `src/i18n/zh-TW.json` | Traditional Chinese messages (keys must mirror en.json) |
| `src/i18n/index.ts` | Exports `t(locale, 'Namespace.key')` |
| `src/lib/i18n.ts` | Exports `localizedPath(locale, '/path')` — prepends `/zh-TW` when locale is `zh-TW` |
| `src/components/pages/**/*.astro` | Marketing / feature / solution page components |
| `src/pages/<slug>.astro` | English route wrapper; passes `locale="en"` to the component |
| `src/pages/zh-TW/<slug>.astro` | Traditional Chinese route wrapper; passes `locale="zh-TW"` |
| `src/layouts/BaseLayout.astro` | Takes `locale`, `title`, `description` props; renders `<html lang>` and meta tags |

## The `t` helper

Signature (from `src/i18n/index.ts`):

```ts
export function t(locale: string, key: string): string
```

- Pass the `locale` prop you received into every call. There is no hook, no context, no React.
- Keys are dotted paths: `'MyNamespace.heroTitle'`.
- If a key is missing from the locale, it falls back to `en`. If missing in both, returns the key string itself (visible as raw text in the page — useful signal during development).
- The `Tools` namespace is special (built from per-tool files in `src/lib/tools/messages/`). Leave it alone in i18n JSON work.

## Namespace insertion point

The two JSON files share structure. Namespaces are alphabetized-ish but not strict. You can append new namespaces **before the closing `}` of the root object** (safe default), or insert after a similar namespace (e.g. next to other feature pages).

Typical positions:
- About / Promises / company pages → next to each other near the middle.
- Feature pages (`Passkeys`, `AttackProtection`, etc.) → under the `Features` shared namespace.
- Solution pages (`EnterpriseSso`, `FrontlineWorkersIdentity`, `ReduceSmsOtpCost`, `Ciam`) → a cluster near the end.

**Always check both files have identical keys after edits.** Tooling:

```bash
node -e "
const a = Object.keys(require('./src/i18n/en.json'));
const b = Object.keys(require('./src/i18n/zh-TW.json'));
const missingInZh = a.filter(k => !b.includes(k));
const missingInEn = b.filter(k => !a.includes(k));
console.log('missing in zh-TW:', missingInZh.length ? missingInZh : 'none');
console.log('missing in en:', missingInEn.length ? missingInEn : 'none');
"
```

Per-namespace parity check (replace `About`):

```bash
node -e "
const en = Object.keys(require('./src/i18n/en.json').About);
const zh = Object.keys(require('./src/i18n/zh-TW.json').About);
console.log('en-only:', en.filter(k => !zh.includes(k)));
console.log('zh-only:', zh.filter(k => !en.includes(k)));
"
```

## JSON validation

```bash
node -e "JSON.parse(require('fs').readFileSync('src/i18n/en.json'))" && \
node -e "JSON.parse(require('fs').readFileSync('src/i18n/zh-TW.json'))" && \
echo OK
```

Run after every edit before building.

## Shared `Features` namespace strings

Already present in both locales — reuse instead of adding duplicates:

| Key | English | zh-TW |
|-----|---------|-------|
| `startForFree` | Start for Free | 免費開始 |
| `getDemo` | Get a Demo | 預約示範 |
| `scheduleDemo` | Schedule Demo | 預約示範 |
| `freePlanDescription` | Free plan includes unlimited MAUs | 免費方案包含無限 MAU |

Use in a component: `{t(locale, 'Features.getDemo')}`.

## How locale is resolved

Each page has two route files:
- `src/pages/<slug>.astro` — sets `const locale = 'en'`
- `src/pages/zh-TW/<slug>.astro` — sets `const locale = 'zh-TW'`

Both route files thin-wrap the same component:

```astro
---
export const prerender = true;
import BaseLayout from '@/layouts/BaseLayout.astro';
import { t } from '@/i18n';
import MyPage from '@/components/pages/MyPage.astro';

const locale = 'en'; // or 'zh-TW'
const title = t(locale, 'MyPage.title');
const description = t(locale, 'MyPage.description');
---
<BaseLayout locale={locale} title={title} description={description}>
  <MyPage locale={locale} />
</BaseLayout>
```

The component receives `locale` via `Astro.props` and passes it to every `t(...)` call. No header-based locale lookup, no React context.

## Namespace naming convention

PascalCase, matching the page's concept:

| Page file | Namespace |
|---|---|
| `src/components/pages/AboutPage.astro` | `About` |
| `src/components/pages/PromisesPage.astro` | `Promises` |
| `src/components/pages/features/AttackProtectionPage.astro` | `AttackProtection` |
| `src/components/pages/features/SingleSignOnPage.astro` | `SingleSignOn` |
| `src/components/pages/solutions/EnterpriseSsoPage.astro` | `EnterpriseSso` |
| `src/components/pages/solutions/FrontlineWorkersIdentityPage.astro` | `FrontlineWorkersIdentity` |

## Content-collection pages are different

Blog posts, customer stories, login gallery, what's-new, and integrations are **not** handled by this skill. Their translations live as per-locale markdown files under `src/content/<collection>/{en,zh-TW}/<slug>/index.md`, and the route's `getStaticPaths` falls back to the `en` entry by slug when a `zh-TW` entry is missing. See `CLAUDE.md` → "Routing / i18n" for details.

## Traditional Chinese translation rules

### Typography

- **Fullwidth punctuation between Chinese characters.** Required:
  - Comma: `，` (U+FF0C), not `,`
  - Period: `。` (U+3002), not `.`
  - Colon: `：` (U+FF1A), not `:`
  - Semicolon: `；` (U+FF1B), not `;`
  - Exclamation: `！` (U+FF01), not `!`
  - Question: `？` (U+FF1F), not `?`
  - Quote pair: `「」` (U+300C/U+300D) for Chinese emphasis. Reserve `"..."` for English code, product names or direct quotes of English sources.
  - Middle dot `·` is fine for separating items in a fact strip (same as English usage).
- **Latin text keeps halfwidth punctuation.** Inside a product name, URL, or English fragment, keep `,`, `.`, `:`. E.g. `SkyMakers Digital Group, Inc.` not `SkyMakers Digital Group， Inc。`.
- **Add a halfwidth space between Latin and Chinese.** `使用 Authgear 的團隊`, not `使用Authgear的團隊`.
- **Numerals stay halfwidth.** `2009 年`, not `２００９年`.
- **Em dash for emphasis.** `——` (double em dash, U+2014 ×2) reads most natural in zh-TW prose. Use sparingly; prefer splitting into shorter sentences.
- **No serial comma in lists.** Use `、` (ideographic comma, U+3001) between items: `香港、台灣、英國、加拿大、美國`.

Quick fix for halfwidth commas already in place (run inside the repo root):

```bash
python3 -c "
import re, io
path = 'src/i18n/zh-TW.json'
with io.open(path, encoding='utf-8') as f: text = f.read()
new = re.sub(r'([一-鿿]),', r'\1，', text)
if new != text:
    with io.open(path, 'w', encoding='utf-8') as f: f.write(new)
    print(f'replaced {text.count(chr(44)) - new.count(chr(44))} commas')
else:
    print('no changes')
"
```

The `[一-鿿]` range covers the CJK Unified Ideographs block. This only converts commas that immediately follow a Han character, leaving commas inside Latin text alone.

### Lexicon

- **Use Traditional Chinese (繁體中文) only.** Never simplified: no `无`, `开`, `关`, `体`, `经`; use `無`, `開`, `關`, `體`, `經`.
- **Keep English-only technical terms and product names unchanged:** `Authgear`, `SkyMakers`, `WhatsApp`, `LINE`, `Passkey`, `WebAuthn`, `CAPTCHA`, `MFA`, `OTP`, `SSO`, `SDK`, `API`, `JWT`, `JWKS`, `OIDC`, `SAML`, `OAuth`, `MAU`, `CIAM`, `ISO 27001`, `SoC 2`, `Azure`, `GCP`.
- **Established project glosses** (mirror what's already in `zh-TW.json`):

| Concept | zh-TW |
|---|---|
| Start for Free | 免費開始 |
| Get a Demo / Schedule Demo | 預約示範 (or 預約展示) |
| View Pricing | 查看定價 |
| Free plan includes | 免費方案包含 |
| unlimited MAUs | 無限 MAU |
| Learn more | 了解更多 |
| Read more / Read the story | 閱讀更多 / 閱讀案例 |
| Get started | 立即開始 |
| Contact us / Contact Sales | 聯絡我們 / 聯絡業務 |
| Customer stories / Case studies | 客戶案例 / 案例研究 |
| Authentication | 身份驗證 |
| Open source | 開源 |
| Self-host | 自主架設 |
| Bootstrapped | 自力營運 |
| Compliance | 合規 / 合規認證 |
| Remote team | 遠距團隊 |

### Voice

- Match the English register. Marketing pages use plain, direct zh-TW — not literary, not overly formal. `我們為什麼打造 Authgear`, not `我們為何建構 Authgear`.
- Keep sentences shorter than their English counterparts when possible — zh-TW is denser.
- For opinionated / punchy lines, don't try to translate the construction literally. Translate the *meaning*. English "Shipped, not promised." has no clean zh-TW parallel; use `不是口頭承諾，是已經交付的功能。` or rephrase inline.
- When a fullwidth comma would visually crowd a short phrase, consider splitting into two sentences with `。` instead.

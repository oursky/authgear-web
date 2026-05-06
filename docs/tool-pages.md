# Tool Pages

How `/tools/<slug>` pages are structured and how to add or migrate one.

There are two flavors:

- **Iframe-embedded** (`<ToolWidget src="…" />`) — the default today; 8 of 9 tools use this.
- **Self-hosted React island** (`<ToolWidget>{children}</ToolWidget>`) — first introduced for `/tools/password-hash-generator` (`src/components/widgets/password-hash/`). Use this when you want the tool's source in this repo and on this domain.

The page chrome (hero, feature cards, how-it-works, FAQ, branded footer) is identical between the two — only the widget body differs.

---

## Page anatomy (shared)

```
src/
├── pages/
│   ├── tools/[slug].astro                 # en route — locale='en', client:load island
│   └── zh-hant/tools/[slug].astro         # zh-Hant route — locale='zh-Hant'
├── components/
│   ├── pages/tools/<Name>Page.tsx         # composes ToolHero, ToolWidget, ToolFaq…
│   └── tools/                             # shared chrome (ToolHero, ToolWidget, …)
└── lib/tools/messages/
    ├── en/<name>.ts                       # message bundle (heroLine1, faq1Title, …)
    ├── zh-Hant/<name>.ts                  # same shape
    └── {en,zh-Hant}/index.ts              # aggregator
```

The `[slug].astro` route in each locale picks the matching `<Name>Page` component by slug and mounts it with `client:load`. Both routes already exist — adding a tool means writing the page component and message bundle, not touching routing.

i18n lookup is `t(locale, 'Tools.<name>.<key>')`, which resolves through `src/i18n/index.ts` to the message file you wrote.

---

## Path A — iframe-embedded tool

Use this when the widget lives elsewhere (a Vercel/GH Pages deployment) and you don't need to host its source.

`<Name>Page.tsx`:

```tsx
import ToolWidget from '@/components/tools/ToolWidget';

<ToolWidget
  locale={locale}
  src="https://my-widget.vercel.app/"
  iframeTitle={t('iframeTitle')}
  height="1000px"
  policy={policy}
/>
```

Done. Existing examples: `Base64Page.tsx`, `JwkGeneratorPage.tsx`, `JwtDebuggerPage.tsx`, etc.

---

## Path B — Self-hosted React island

Use this when the widget should live in this repo. Working reference: `src/components/widgets/password-hash/`.

### Folder layout

```
src/components/widgets/<slug>/
├── index.ts                          # barrel: `export { default } from './<Slug>Widget'`
├── <Slug>Widget.tsx                  # root component; sets the widget root class
├── components/                       # presentational components (forms/, layout/, results/, …)
├── hooks/                            # useX… hooks (state, side-effects)
├── lib/                              # pure logic (crypto, parsing, helpers, constants)
├── types.ts                          # shared types
└── <slug>.css                        # scoped styles, imported by the root component
```

The root component:

```tsx
// <Slug>Widget.tsx
import './<slug>.css';

export default function MyWidget() {
  return (
    <div className="my-widget" data-testid="my-widget">
      {/* ... */}
    </div>
  );
}
```

### Wire the page

```tsx
// <Name>Page.tsx
import ToolWidget from '@/components/tools/ToolWidget';
import MyWidget from '@/components/widgets/<slug>';

<ToolWidget locale={locale} iframeTitle={t('iframeTitle')} policy={policy}>
  <MyWidget />
</ToolWidget>
```

`ToolWidget` renders children inside the same outer chrome (border, branded footer, policy banner) it uses for iframes — there's no visual difference between the two paths from outside the widget body.

### CSS scoping is mandatory

`public/css/authgear-new.webflow.css` has many generic class names like `.tab`, `.tab-content`, `.btn`, `.form-group`, `.error-message`. Bare CSS rules from a ported widget will collide and produce broken layouts (`position: absolute`, fixed heights, branded colors leaking in).

**Rule:** in your `<slug>.css` every selector must be prefixed with the widget root class. So:

```css
/* ❌ wrong — will collide with .tab-content in webflow.css */
.tab-content { padding: 24px; }

/* ✅ right */
.my-widget .tab-content { padding: 24px; }
```

#### CSS scoping script

When porting an upstream stylesheet (typical for migrations), this Python script does the prefixing automatically. It strips `*`, `body`, `html` rules, leaves `@media`/`@keyframes` blocks untouched, and prefixes every other top-level selector:

```python
import re

ROOT_CLASS = '.my-widget'  # change per widget

with open('source.css') as f:
    css = f.read()

def strip_top_rule(css, sel):
    p = re.compile(r'^' + sel + r'\s*\{', re.MULTILINE)
    while (m := p.search(css)):
        depth, i = 0, m.end() - 1
        while i < len(css):
            if css[i] == '{': depth += 1
            elif css[i] == '}':
                depth -= 1
                if depth == 0: break
            i += 1
        css = css[:m.start()] + css[i+1:].lstrip('\n')
    return css

for sel in (r'\*', 'body', 'html'):
    css = strip_top_rule(css, sel)

# Walk top-level rules and prefix each selector
out, i, n = [], 0, len(css)
while i < n:
    while i < n and css[i] in ' \t\n\r': out.append(css[i]); i += 1
    if i >= n: break
    if css[i:i+2] == '/*':
        end = css.find('*/', i + 2) + 2
        out.append(css[i:end]); i = end; continue
    if css[i] == '@':                           # leave @media/@keyframes/@import untouched
        brace = css.find('{', i)
        if brace == -1:
            semi = css.find(';', i) + 1
            out.append(css[i:semi]); i = semi; continue
        depth, j = 0, brace
        while j < n:
            if css[j] == '{': depth += 1
            elif css[j] == '}':
                depth -= 1
                if depth == 0: break
            j += 1
        out.append(css[i:j+1]); i = j + 1; continue
    brace = css.find('{', i)
    selector = css[i:brace]
    depth, j = 0, brace
    while j < n:
        if css[j] == '{': depth += 1
        elif css[j] == '}':
            depth -= 1
            if depth == 0: break
        j += 1
    parts = [p.strip() for p in selector.split(',') if p.strip()]
    new_sel = ',\n'.join(p if p.startswith(ROOT_CLASS) else f'{ROOT_CLASS} {p}' for p in parts)
    out.append(new_sel + ' ' + css[brace:j+1])
    i = j + 1

open('<slug>.css', 'w').write(''.join(out))
```

Native CSS nesting (`.my-widget { .tab-content { … } }`) was tried and rejected — the wrap-once approach is shorter but Vite + browsers handled it inconsistently in this codebase. Flat prefixed rules are reliable.

#### Reset webflow collisions

Even with prefix-scoped rules, webflow's globals can still leak through any property your rules don't redeclare. Known offenders (any tool reusing these class names will hit them):

| Class | Webflow leak |
|---|---|
| `.tab-content` | `position: absolute; width: 68%; height: 750px; inset: 0% 0% 0% auto` |
| `.tab` | `color: #bababa; border-left: 3px solid transparent` |
| `.error-message` | branded red bg, white text, `text-align: center`, border-radius |

Add explicit resets near the top of `<slug>.css`:

```css
.my-widget .tab-content {
  position: static;
  width: auto; height: auto; inset: auto;
  background: transparent; border-radius: 0;
  display: block;
}
.my-widget .tab { color: inherit; border-left: none; }
.my-widget .error-message { color: #c0392b; background: transparent; border-radius: 0; text-align: left; }
```

If you reuse other generic class names (`.btn`, `.form-group`, `.form-label`…), check `public/css/authgear-new.webflow.css` for matching rules and reset them the same way.

#### Quick collision check

After porting, run this to list any class names in your widget that have a matching unscoped rule in webflow.css:

```bash
grep -oE "\.<root-class> \.[a-z-]+" src/components/widgets/<slug>/<slug>.css \
  | sort -u | sed 's/.*\.//' \
  | while read c; do
      grep -q "^\.${c} {" public/css/authgear-new.webflow.css && echo "collision: .${c}"
    done
```

### Library choices

- **Cryptography:** prefer `hash-wasm` (single ESM dep, single WASM, supports argon2/bcrypt/scrypt/PBKDF2/SHA-*). Dynamic-import on first use so the WASM doesn't load during initial paint:

  ```ts
  const { argon2id } = await import('hash-wasm');
  ```

- **CommonJS pitfalls:** older crypto libraries are CJS-only and Vite's strict ESM-named-import check rejects `import { x } from 'cjs-pkg'`. Use default import + destructure:

  ```ts
  import scryptPkg from 'scrypt-js';
  const scrypt = (scryptPkg as { scrypt: typeof scryptPkg.scrypt }).scrypt ?? scryptPkg;
  ```

  Seen with `scrypt-js@3`. `bcryptjs@3` is now `"type": "module"` and works fine with named imports.

- **No build-time WASM config needed.** Astro 6's Vite handles `hash-wasm` out of the box.

### i18n

Page chrome (hero, feature cards, FAQ) is in `src/lib/tools/messages/{en,zh-Hant}/<name>.ts` and resolved via `t(locale, 'Tools.<name>.<key>')`. Mirror the existing tools' message shape.

Widget internals (form labels, button text, error messages) **don't have to be in the message bundle for v1** — English-only inside the widget mirrors how the iframe-embedded tools look today. Plumb in `t()` later if you need zh-Hant translation.


### Testing

Add a Playwright case to `tests/phase2d2-tools.spec.ts`:

```ts
test('My tool renders the native widget', async ({ page }) => {
  await page.goto('/tools/<slug>');
  await expect(page.locator('h1.tools-h1').first()).toBeVisible();
  await expect(page.locator('[data-testid="my-widget"]')).toBeVisible();
});
```

The existing slug loop already smoke-tests the route returns 200 and the footer is visible — that doesn't need touching.

---

## Migration checklist (iframe → native)

For converting an existing iframe-embedded tool to self-hosted:

1. **Branch.** `git checkout -b feat/native-<slug>-widget`
2. **Install crypto/etc deps.** `npm install hash-wasm <other libs>`. Watch for CJS-only modules.
3. **Create the widget folder.** Copy structure from `src/components/widgets/password-hash/` and adapt.
4. **Port the CSS** with the script above; reset known webflow collisions; run the collision-check grep for new ones.
5. **Wire the page.** In `<Name>Page.tsx`, drop `src=…` and put `<MyWidget />` inside `<ToolWidget>`.
6. **Update the Playwright spec** to assert the native widget for this slug.
7. **Verify locally:**
   - `npm run check` → 0 errors
   - `npm run dev` → exercise every algorithm / mode in the widget; copy-to-clipboard; tab switching; verify outputs against the source widget's reference values
   - `npm run build` → clean
8. **Push the branch and open a PR.** Don't merge until reviewed; don't push to `live` until merged.

---

## Reference

Working example to imitate: [`src/components/widgets/password-hash/`](../src/components/widgets/password-hash). Migration plan that produced it: [`docs/superpowers/specs/`](superpowers/specs/) (if archived) or the PR description on `feat/native-password-hash-widget`.

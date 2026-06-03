# Passkey Demo & WebAuthn Tester Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship `/tools/passkey-demo` (en + zh-hant) — a first-party React-island WebAuthn playground that creates a real passkey, decodes the credential, and verifies a sign-in entirely in the browser.

**Architecture:** Self-hosted React island (Path B of `docs/tool-pages.md`), mirroring `src/components/widgets/password-hash/` (Tailwind utilities + tiny webflow-reset CSS keyed on the `data-testid` root). All crypto is WebCrypto + a hand-rolled ~100-line CBOR decoder; zero new runtime dependencies. Pure logic lives in `lib/` with colocated Vitest tests; UI hooks/components consume it. Spec: `docs/superpowers/specs/2026-06-03-passkey-demo-tool-design.md`.

**Tech Stack:** Astro 6, React 19, TypeScript (strict), Tailwind 4 utilities, WebCrypto, Vitest, Playwright.

**Branch:** `feat/passkey-demo-tool` (already created off `passkey-demo-tool-spec`).

**RP ID note (resolves a spec/dev-environment tension):** the spec pins `rp.id` to `"www.authgear.com"`, but a hard-coded RP ID would throw `SecurityError` on `localhost` and on Netlify deploy previews. The widget uses `window.location.hostname` as the RP ID and `window.location.origin` as the expected origin — identical to the spec values in production, and working everywhere else. The verification-step labels print the actual values so the page stays honest.

**Spec compliance notes:**
- No backend, no account, no live MDS fetch, no QR flows, no attestation-chain validation (all listed out-of-scope).
- Widget internals are English-only for v1 (sanctioned by `docs/tool-pages.md` §i18n); page chrome is fully translated with **通行密鑰** for "passkey".
- `ToolReadyTo` gains optional `href`/`ctaLabel` props so the CTA can point at `/features/passkeys` without disturbing the other 9 tools.

## File structure

```
scripts/fetch-aaguid-names.mjs                       # one-shot AAGUID snapshot fetcher (audit trail)
public/images/minitools-more-passkey.svg              # registry icon
src/components/widgets/passkey-demo/
├── index.ts                                          # barrel
├── PasskeyDemoWidget.tsx                             # root: feature detection + 3 panels + credential list
├── passkey-demo.css                                  # webflow resets (password-hash pattern)
├── components/
│   ├── Panel.tsx                                     # numbered card shell
│   ├── JsonView.tsx                                  # <pre> JSON / raw-text block
│   ├── CopyField.tsx                                 # label + mono value + copy button
│   ├── FlagBadges.tsx                                # UP/UV/BE/BS/AT badges
│   ├── CreatePanel.tsx                               # panel 1
│   ├── InspectPanel.tsx                              # panel 2
│   ├── SignInPanel.tsx                               # panel 3
│   └── CredentialList.tsx                            # "Your demo passkeys"
├── hooks/
│   ├── useClipboard.ts
│   ├── useCredentialStore.ts
│   └── useFeatureDetection.ts
└── lib/
    ├── base64url.ts        (+ base64url.test.ts)
    ├── cbor.ts             (+ cbor.test.ts)
    ├── testHelpers.ts                                # test-only CBOR *encoder* for fixtures
    ├── authData.ts         (+ authData.test.ts)
    ├── coseKey.ts          (+ coseKey.test.ts)
    ├── derSignature.ts     (+ derSignature.test.ts)
    ├── aaguid.ts           (+ aaguid.test.ts)
    ├── aaguid-names.json                             # generated snapshot (committed)
    ├── createOptions.ts    (+ createOptions.test.ts)
    ├── storage.ts
    ├── errors.ts
    ├── verifyAssertion.ts  (+ verifyAssertion.test.ts)
    └── inspect.ts          (+ inspect.test.ts)
src/components/pages/tools/PasskeyDemoPage.tsx        # page chrome
src/lib/tools/messages/en/passkeyDemo.ts              # en bundle
src/lib/tools/messages/zh-Hant/passkeyDemo.ts         # zh-Hant bundle
```

Modified: `src/lib/tools/messages/{en,zh-Hant}/index.ts`, `src/lib/tools/messages/{en,zh-Hant}/common.ts` (registry), `src/lib/tools/toolSlugPrefix.ts`, `src/lib/tools/tools-registry.ts`, `src/pages/tools/[slug].astro`, `src/pages/zh-hant/tools/[slug].astro`, `src/components/tools/ToolReadyTo.tsx`, `tests/phase2d2-tools.spec.ts`.

Run all unit tests with `npm run test:unit` (vitest picks up `src/**/*.test.ts`). Typecheck with `npm run check`.

---

### Task 1: AAGUID name snapshot

**Files:**
- Create: `scripts/fetch-aaguid-names.mjs`
- Create (generated): `src/components/widgets/passkey-demo/lib/aaguid-names.json`

- [ ] **Step 1: Write the fetch script**

```js
// scripts/fetch-aaguid-names.mjs
//
// One-shot: snapshot the community-maintained AAGUID → authenticator-name
// mapping (passkeydeveloper/passkey-authenticator-aaguids) into the
// passkey-demo widget. We bundle a static snapshot — no runtime fetching.
// Re-run manually to refresh; commit the regenerated JSON.
//
// Usage: node scripts/fetch-aaguid-names.mjs
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const SOURCE =
  'https://raw.githubusercontent.com/passkeydeveloper/passkey-authenticator-aaguids/main/aaguid.json';
const OUT = fileURLToPath(
  new URL('../src/components/widgets/passkey-demo/lib/aaguid-names.json', import.meta.url),
);

const res = await fetch(SOURCE);
if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
const full = await res.json();

// The upstream file maps aaguid → { name, icon_dark, icon_light }. The icons
// are large data URIs — keep only the names to stay bundle-friendly.
const names = Object.fromEntries(
  Object.entries(full)
    .map(([aaguid, meta]) => [aaguid, meta.name])
    .sort(([a], [b]) => a.localeCompare(b)),
);

await mkdir(dirname(OUT), { recursive: true });
await writeFile(OUT, JSON.stringify(names, null, 2) + '\n');
console.log(`Wrote ${Object.keys(names).length} AAGUID names to ${OUT}`);
```

- [ ] **Step 2: Run it**

Run: `node scripts/fetch-aaguid-names.mjs`
Expected: `Wrote <N> AAGUID names to …/aaguid-names.json` with N ≳ 100. Spot-check: `grep -c '": "' src/components/widgets/passkey-demo/lib/aaguid-names.json` returns the same N, and `grep 'ea9b8d66' src/components/widgets/passkey-demo/lib/aaguid-names.json` shows `"ea9b8d66-4d01-1d21-3ce4-b6b48cb575d4": "Google Password Manager"`.

If the network or upstream URL is unavailable, STOP and report — do not hand-write the dataset.

- [ ] **Step 3: Commit**

```bash
git add scripts/fetch-aaguid-names.mjs src/components/widgets/passkey-demo/lib/aaguid-names.json
git commit -m "feat(passkey-demo): bundle AAGUID name snapshot + fetch script"
```

---

### Task 2: base64url helpers

**Files:**
- Create: `src/components/widgets/passkey-demo/lib/base64url.ts`
- Test: `src/components/widgets/passkey-demo/lib/base64url.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// src/components/widgets/passkey-demo/lib/base64url.test.ts
import { describe, expect, it } from 'vitest';
import { b64urlToBuf, bufToB64url } from './base64url';

describe('base64url', () => {
  it('round-trips arbitrary bytes', () => {
    const bytes = new Uint8Array([0, 1, 2, 250, 251, 252, 253, 254, 255]);
    expect(b64urlToBuf(bufToB64url(bytes))).toEqual(bytes);
  });

  it('uses - and _ instead of + and /', () => {
    // 0xfa 0xff produces '+' and '/' chars in plain base64 ("+v8=")
    const s = bufToB64url(new Uint8Array([0xfa, 0xff]));
    expect(s).toBe('-v8');
    expect(s).not.toMatch(/[+/=]/);
  });

  it('decodes unpadded input', () => {
    expect(b64urlToBuf('-v8')).toEqual(new Uint8Array([0xfa, 0xff]));
  });

  it('accepts ArrayBuffer input', () => {
    const buf = new Uint8Array([1, 2, 3]).buffer;
    expect(bufToB64url(buf)).toBe('AQID');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/widgets/passkey-demo/lib/base64url.test.ts`
Expected: FAIL — `Cannot find module './base64url'`.

- [ ] **Step 3: Write the implementation**

```ts
// src/components/widgets/passkey-demo/lib/base64url.ts
//
// WebAuthn exchanges binary fields (challenges, credential IDs, signatures)
// as ArrayBuffers; we render and store them as base64url strings.

export function bufToB64url(buf: ArrayBuffer | Uint8Array): string {
  const bytes = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function b64urlToBuf(s: string): Uint8Array {
  const padded = s.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(s.length / 4) * 4, '=');
  const bin = atob(padded);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/widgets/passkey-demo/lib/base64url.test.ts`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add src/components/widgets/passkey-demo/lib/base64url.ts src/components/widgets/passkey-demo/lib/base64url.test.ts
git commit -m "feat(passkey-demo): base64url helpers"
```

---

### Task 3: Minimal CBOR decoder

**Files:**
- Create: `src/components/widgets/passkey-demo/lib/cbor.ts`
- Create: `src/components/widgets/passkey-demo/lib/testHelpers.ts` (test-only CBOR encoder)
- Test: `src/components/widgets/passkey-demo/lib/cbor.test.ts`

- [ ] **Step 1: Write the test-only CBOR encoder (fixture builder)**

```ts
// src/components/widgets/passkey-demo/lib/testHelpers.ts
//
// TEST-ONLY helpers: a minimal CBOR *encoder* used to build fixtures for the
// decoder tests (cbor / authData / inspect). Never imported by runtime code.

export function concatBytes(...parts: Uint8Array[]): Uint8Array {
  const out = new Uint8Array(parts.reduce((n, p) => n + p.length, 0));
  let o = 0;
  for (const p of parts) {
    out.set(p, o);
    o += p.length;
  }
  return out;
}

export function hexToBytes(hex: string): Uint8Array {
  const clean = hex.replace(/\s+/g, '');
  const out = new Uint8Array(clean.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(clean.slice(i * 2, i * 2 + 2), 16);
  return out;
}

function header(major: number, arg: number): Uint8Array {
  if (arg < 24) return new Uint8Array([(major << 5) | arg]);
  if (arg < 0x100) return new Uint8Array([(major << 5) | 24, arg]);
  if (arg < 0x10000) return new Uint8Array([(major << 5) | 25, arg >> 8, arg & 0xff]);
  return new Uint8Array([
    (major << 5) | 26,
    (arg >>> 24) & 0xff,
    (arg >>> 16) & 0xff,
    (arg >>> 8) & 0xff,
    arg & 0xff,
  ]);
}

export function cborUint(n: number): Uint8Array {
  return header(0, n);
}

/** Encodes a negative integer, e.g. cborNegInt(-7) for the ES256 COSE alg. */
export function cborNegInt(n: number): Uint8Array {
  return header(1, -1 - n);
}

export function cborBytes(b: Uint8Array): Uint8Array {
  return concatBytes(header(2, b.length), b);
}

export function cborText(s: string): Uint8Array {
  const bytes = new TextEncoder().encode(s);
  return concatBytes(header(3, bytes.length), bytes);
}

export function cborArray(items: Uint8Array[]): Uint8Array {
  return concatBytes(header(4, items.length), ...items);
}

/** entries are pre-encoded [key, value] byte pairs. */
export function cborMap(entries: Array<[Uint8Array, Uint8Array]>): Uint8Array {
  return concatBytes(header(5, entries.length), ...entries.flatMap(([k, v]) => [k, v]));
}

/**
 * Inverse of derToRaw: wrap raw r‖s into ASN.1/DER like an authenticator does.
 * Used by the derSignature and verifyAssertion tests to play authenticator.
 */
export function rawToDer(raw: Uint8Array): Uint8Array {
  const encodeInt = (i: Uint8Array): Uint8Array => {
    let b = i;
    let skip = 0;
    while (skip < b.length - 1 && b[skip] === 0) skip++;
    b = b.slice(skip);
    if (b[0] & 0x80) b = concatBytes(new Uint8Array([0]), b); // keep it positive
    return concatBytes(new Uint8Array([0x02, b.length]), b);
  };
  const r = encodeInt(raw.slice(0, raw.length / 2));
  const s = encodeInt(raw.slice(raw.length / 2));
  return concatBytes(new Uint8Array([0x30, r.length + s.length]), r, s);
}
```

- [ ] **Step 2: Write the failing decoder test**

```ts
// src/components/widgets/passkey-demo/lib/cbor.test.ts
import { describe, expect, it } from 'vitest';
import { decode, decodeFirst, type CborMap } from './cbor';
import {
  cborArray,
  cborBytes,
  cborMap,
  cborNegInt,
  cborText,
  cborUint,
  concatBytes,
  hexToBytes,
} from './testHelpers';

describe('cbor decode', () => {
  it('decodes unsigned integers across argument widths', () => {
    expect(decode(hexToBytes('00'))).toBe(0); // inline
    expect(decode(hexToBytes('17'))).toBe(23); // inline max
    expect(decode(hexToBytes('1864'))).toBe(100); // 1-byte arg
    expect(decode(hexToBytes('190100'))).toBe(256); // 2-byte arg
    expect(decode(hexToBytes('1a00010000'))).toBe(65536); // 4-byte arg
  });

  it('decodes negative integers', () => {
    expect(decode(hexToBytes('20'))).toBe(-1);
    expect(decode(cborNegInt(-7))).toBe(-7); // ES256 COSE alg
    expect(decode(cborNegInt(-257))).toBe(-257); // RS256 COSE alg
  });

  it('decodes byte strings, text strings, arrays, and booleans', () => {
    expect(decode(cborBytes(new Uint8Array([1, 2, 3])))).toEqual(new Uint8Array([1, 2, 3]));
    expect(decode(cborText('packed'))).toBe('packed');
    expect(decode(cborArray([cborUint(1), cborText('a')]))).toEqual([1, 'a']);
    expect(decode(hexToBytes('f4'))).toBe(false);
    expect(decode(hexToBytes('f5'))).toBe(true);
    expect(decode(hexToBytes('f6'))).toBe(null);
  });

  it('decodes maps with int and string keys (COSE / attestation shape)', () => {
    const bytes = cborMap([
      [cborUint(1), cborUint(2)], // kty: EC2
      [cborUint(3), cborNegInt(-7)], // alg: ES256
      [cborText('fmt'), cborText('none')],
    ]);
    const m = decode(bytes) as CborMap;
    expect(m.get(1)).toBe(2);
    expect(m.get(3)).toBe(-7);
    expect(m.get('fmt')).toBe('none');
  });

  it('decodeFirst reports consumed length so trailing bytes can follow (authData layout)', () => {
    const item = cborMap([[cborUint(1), cborUint(2)]]);
    const padded = concatBytes(item, new Uint8Array([0xde, 0xad]));
    const { value, byteLength } = decodeFirst(padded);
    expect((value as CborMap).get(1)).toBe(2);
    expect(byteLength).toBe(item.length);
  });

  it('throws on trailing garbage in strict decode', () => {
    expect(() => decode(concatBytes(cborUint(1), cborUint(2)))).toThrow(/trailing/i);
  });

  it('throws on unsupported constructs instead of mis-decoding', () => {
    expect(() => decode(hexToBytes('5f'))).toThrow(); // indefinite-length byte string
    expect(() => decode(hexToBytes('c000'))).toThrow(); // tag (major 6)
    expect(() => decode(hexToBytes('f97e00'))).toThrow(); // float16
    expect(() => decode(new Uint8Array([]))).toThrow(); // empty input
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npx vitest run src/components/widgets/passkey-demo/lib/cbor.test.ts`
Expected: FAIL — `Cannot find module './cbor'`.

- [ ] **Step 4: Write the decoder**

```ts
// src/components/widgets/passkey-demo/lib/cbor.ts
//
// Minimal CBOR decoder — exactly the subset WebAuthn attestation objects and
// COSE keys use: uints, negative ints, byte strings, text strings, arrays,
// maps, and the simple values false/true/null/undefined. Indefinite lengths,
// tags, and floats are rejected loudly. Deliberately dependency-free
// (see design spec: "No CBOR dependency").

export type CborValue =
  | number
  | string
  | Uint8Array
  | boolean
  | null
  | undefined
  | CborValue[]
  | CborMap;

export type CborMap = Map<number | string, CborValue>;

interface ReadResult {
  value: CborValue;
  /** Offset of the first byte AFTER the decoded item. */
  offset: number;
}

/** Decode the first CBOR item; report how many bytes it consumed. */
export function decodeFirst(bytes: Uint8Array): { value: CborValue; byteLength: number } {
  const { value, offset } = readItem(bytes, 0);
  return { value, byteLength: offset };
}

/** Decode a buffer that must contain exactly one CBOR item. */
export function decode(bytes: Uint8Array): CborValue {
  const { value, byteLength } = decodeFirst(bytes);
  if (byteLength !== bytes.length) {
    throw new Error(`CBOR: ${bytes.length - byteLength} trailing byte(s) after value`);
  }
  return value;
}

function readArgument(b: Uint8Array, o: number, ai: number): { arg: number; offset: number } {
  const view = new DataView(b.buffer, b.byteOffset, b.byteLength);
  if (ai < 24) return { arg: ai, offset: o + 1 };
  if (ai === 24) return { arg: view.getUint8(o + 1), offset: o + 2 };
  if (ai === 25) return { arg: view.getUint16(o + 1), offset: o + 3 };
  if (ai === 26) return { arg: view.getUint32(o + 1), offset: o + 5 };
  if (ai === 27) {
    const big = view.getBigUint64(o + 1);
    if (big > BigInt(Number.MAX_SAFE_INTEGER)) throw new Error('CBOR: 64-bit value too large');
    return { arg: Number(big), offset: o + 9 };
  }
  // 28–30 reserved, 31 = indefinite length — not used by WebAuthn
  throw new Error(`CBOR: unsupported additional info ${ai}`);
}

function readItem(b: Uint8Array, o: number): ReadResult {
  if (o >= b.length) throw new Error('CBOR: unexpected end of input');
  const initial = b[o];
  const major = initial >> 5;
  const ai = initial & 0x1f;

  switch (major) {
    case 0: {
      const { arg, offset } = readArgument(b, o, ai);
      return { value: arg, offset };
    }
    case 1: {
      const { arg, offset } = readArgument(b, o, ai);
      return { value: -1 - arg, offset };
    }
    case 2: {
      const { arg, offset } = readArgument(b, o, ai);
      if (offset + arg > b.length) throw new Error('CBOR: byte string overruns input');
      return { value: b.slice(offset, offset + arg), offset: offset + arg };
    }
    case 3: {
      const { arg, offset } = readArgument(b, o, ai);
      if (offset + arg > b.length) throw new Error('CBOR: text string overruns input');
      return {
        value: new TextDecoder().decode(b.slice(offset, offset + arg)),
        offset: offset + arg,
      };
    }
    case 4: {
      const { arg, offset } = readArgument(b, o, ai);
      const items: CborValue[] = [];
      let cur = offset;
      for (let i = 0; i < arg; i++) {
        const r = readItem(b, cur);
        items.push(r.value);
        cur = r.offset;
      }
      return { value: items, offset: cur };
    }
    case 5: {
      const { arg, offset } = readArgument(b, o, ai);
      const map: CborMap = new Map();
      let cur = offset;
      for (let i = 0; i < arg; i++) {
        const k = readItem(b, cur);
        if (typeof k.value !== 'number' && typeof k.value !== 'string') {
          throw new Error('CBOR: only int/string map keys are supported');
        }
        const v = readItem(b, k.offset);
        map.set(k.value, v.value);
        cur = v.offset;
      }
      return { value: map, offset: cur };
    }
    case 7: {
      if (ai === 20) return { value: false, offset: o + 1 };
      if (ai === 21) return { value: true, offset: o + 1 };
      if (ai === 22) return { value: null, offset: o + 1 };
      if (ai === 23) return { value: undefined, offset: o + 1 };
      throw new Error(`CBOR: unsupported simple/float value (ai=${ai})`);
    }
    default:
      // major 6 = tags
      throw new Error(`CBOR: unsupported major type ${major}`);
  }
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run src/components/widgets/passkey-demo/lib/cbor.test.ts`
Expected: PASS (7 tests).

- [ ] **Step 6: Commit**

```bash
git add src/components/widgets/passkey-demo/lib/cbor.ts src/components/widgets/passkey-demo/lib/cbor.test.ts src/components/widgets/passkey-demo/lib/testHelpers.ts
git commit -m "feat(passkey-demo): minimal CBOR decoder for attestation objects"
```

---

### Task 4: Authenticator-data parser

**Files:**
- Create: `src/components/widgets/passkey-demo/lib/authData.ts`
- Test: `src/components/widgets/passkey-demo/lib/authData.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// src/components/widgets/passkey-demo/lib/authData.test.ts
import { describe, expect, it } from 'vitest';
import { parseAuthData } from './authData';
import { cborBytes, cborMap, cborNegInt, cborUint, concatBytes } from './testHelpers';

function buildCoseEc2Key(x: Uint8Array, y: Uint8Array): Uint8Array {
  return cborMap([
    [cborUint(1), cborUint(2)], // kty: EC2
    [cborUint(3), cborNegInt(-7)], // alg: ES256
    [cborNegInt(-1), cborUint(1)], // crv: P-256
    [cborNegInt(-2), cborBytes(x)],
    [cborNegInt(-3), cborBytes(y)],
  ]);
}

function buildAuthData(opts: { flags: number; signCount: number; attested?: boolean }): Uint8Array {
  const rpIdHash = new Uint8Array(32).fill(0x11);
  const head = new Uint8Array(37);
  head.set(rpIdHash, 0);
  head[32] = opts.flags;
  new DataView(head.buffer).setUint32(33, opts.signCount);
  if (!opts.attested) return head;
  const aaguid = new Uint8Array(16).fill(0xaa);
  const credId = new Uint8Array(8).fill(0xcc);
  const credIdLen = new Uint8Array([0, credId.length]);
  const cose = buildCoseEc2Key(new Uint8Array(32).fill(1), new Uint8Array(32).fill(2));
  return concatBytes(head, aaguid, credIdLen, credId, cose);
}

describe('parseAuthData', () => {
  it('parses rpIdHash, flags, and signCount from a 37-byte assertion authData', () => {
    // flags 0x05 = UP (bit 0) + UV (bit 2)
    const parsed = parseAuthData(buildAuthData({ flags: 0x05, signCount: 42 }));
    expect(parsed.rpIdHash).toEqual(new Uint8Array(32).fill(0x11));
    expect(parsed.flags).toMatchObject({ up: true, uv: true, be: false, bs: false, at: false, ed: false });
    expect(parsed.signCount).toBe(42);
    expect(parsed.aaguid).toBeNull();
    expect(parsed.credentialId).toBeNull();
    expect(parsed.cosePublicKey).toBeNull();
  });

  it('parses attested credential data when the AT flag is set', () => {
    // flags 0x5d = UP + UV + BE (bit 3) + BS (bit 4) + AT (bit 6)
    const parsed = parseAuthData(buildAuthData({ flags: 0x5d, signCount: 0, attested: true }));
    expect(parsed.flags).toMatchObject({ up: true, uv: true, be: true, bs: true, at: true });
    expect(parsed.aaguid).toEqual(new Uint8Array(16).fill(0xaa));
    expect(parsed.credentialId).toEqual(new Uint8Array(8).fill(0xcc));
    expect(parsed.cosePublicKey?.get(1)).toBe(2); // kty: EC2
    expect(parsed.cosePublicKey?.get(3)).toBe(-7); // alg: ES256
  });

  it('throws on truncated input', () => {
    expect(() => parseAuthData(new Uint8Array(36))).toThrow(/too short/i);
    // AT flag set (0x41) but nothing after the 37-byte header
    expect(() => parseAuthData(buildAuthData({ flags: 0x41, signCount: 0 }))).toThrow();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/widgets/passkey-demo/lib/authData.test.ts`
Expected: FAIL — `Cannot find module './authData'`.

- [ ] **Step 3: Write the parser**

```ts
// src/components/widgets/passkey-demo/lib/authData.ts
//
// Parses WebAuthn authenticator data (WebAuthn L3 §6.1):
//   rpIdHash (32) ‖ flags (1) ‖ signCount (4) ‖ [attestedCredentialData] ‖ [extensions]
// attestedCredentialData = aaguid (16) ‖ credentialIdLength (2) ‖ credentialId ‖ COSE key (CBOR)

import { decodeFirst, type CborMap } from './cbor';

export interface AuthDataFlags {
  /** User Present — someone interacted with the authenticator. */
  up: boolean;
  /** User Verified — biometric/PIN check passed. */
  uv: boolean;
  /** Backup Eligible — the credential can sync (i.e. it's a passkey). */
  be: boolean;
  /** Backup State — the credential is currently backed up. */
  bs: boolean;
  /** Attested credential data included. */
  at: boolean;
  /** Extension data included. */
  ed: boolean;
  raw: number;
}

export interface ParsedAuthData {
  rpIdHash: Uint8Array;
  flags: AuthDataFlags;
  signCount: number;
  aaguid: Uint8Array | null;
  credentialId: Uint8Array | null;
  cosePublicKey: CborMap | null;
}

export function parseAuthData(authData: Uint8Array): ParsedAuthData {
  if (authData.length < 37) {
    throw new Error(`authData too short: ${authData.length} bytes (minimum 37)`);
  }
  const rpIdHash = authData.slice(0, 32);
  const raw = authData[32];
  const flags: AuthDataFlags = {
    up: !!(raw & 0x01),
    uv: !!(raw & 0x04),
    be: !!(raw & 0x08),
    bs: !!(raw & 0x10),
    at: !!(raw & 0x40),
    ed: !!(raw & 0x80),
    raw,
  };
  const signCount = new DataView(authData.buffer, authData.byteOffset + 33, 4).getUint32(0);

  let aaguid: Uint8Array | null = null;
  let credentialId: Uint8Array | null = null;
  let cosePublicKey: CborMap | null = null;

  if (flags.at) {
    if (authData.length < 55) {
      throw new Error('authData: AT flag set but attested credential data is missing');
    }
    aaguid = authData.slice(37, 53);
    const credIdLen = (authData[53] << 8) | authData[54];
    if (authData.length < 55 + credIdLen) {
      throw new Error('authData: credential ID overruns input');
    }
    credentialId = authData.slice(55, 55 + credIdLen);
    const { value } = decodeFirst(authData.slice(55 + credIdLen));
    if (!(value instanceof Map)) {
      throw new Error('authData: COSE public key is not a CBOR map');
    }
    cosePublicKey = value;
  }

  return { rpIdHash, flags, signCount, aaguid, credentialId, cosePublicKey };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/widgets/passkey-demo/lib/authData.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add src/components/widgets/passkey-demo/lib/authData.ts src/components/widgets/passkey-demo/lib/authData.test.ts
git commit -m "feat(passkey-demo): authenticator data parser"
```

---

### Task 5: COSE key conversion + DER signature conversion

**Files:**
- Create: `src/components/widgets/passkey-demo/lib/coseKey.ts`
- Create: `src/components/widgets/passkey-demo/lib/derSignature.ts`
- Test: `src/components/widgets/passkey-demo/lib/coseKey.test.ts`
- Test: `src/components/widgets/passkey-demo/lib/derSignature.test.ts`

- [ ] **Step 1: Write the failing COSE test**

```ts
// src/components/widgets/passkey-demo/lib/coseKey.test.ts
import { describe, expect, it } from 'vitest';
import type { CborMap, CborValue } from './cbor';
import { coseAlg, coseToJwk, jwkToPem } from './coseKey';
import { b64urlToBuf } from './base64url';

function ec2Map(x: Uint8Array, y: Uint8Array): CborMap {
  return new Map<number | string, CborValue>([
    [1, 2], // kty EC2
    [3, -7], // alg ES256
    [-1, 1], // crv P-256
    [-2, x],
    [-3, y],
  ]);
}

describe('coseToJwk', () => {
  it('converts a real EC2 COSE key to a JWK that WebCrypto can import', async () => {
    // Generate a real P-256 key so x/y are a valid curve point
    const kp = await crypto.subtle.generateKey({ name: 'ECDSA', namedCurve: 'P-256' }, true, ['sign', 'verify']);
    const ref = await crypto.subtle.exportKey('jwk', kp.publicKey);
    const cose = ec2Map(b64urlToBuf(ref.x!), b64urlToBuf(ref.y!));

    const jwk = coseToJwk(cose);
    expect(jwk).toEqual({ kty: 'EC', crv: 'P-256', x: ref.x, y: ref.y });
    expect(coseAlg(cose)).toBe(-7);

    // Round-trip through WebCrypto proves the JWK is well-formed
    await expect(
      crypto.subtle.importKey('jwk', jwk, { name: 'ECDSA', namedCurve: 'P-256' }, false, ['verify']),
    ).resolves.toBeDefined();
  });

  it('converts an RSA COSE key', async () => {
    const kp = await crypto.subtle.generateKey(
      { name: 'RSASSA-PKCS1-v1_5', modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: 'SHA-256' },
      true,
      ['sign', 'verify'],
    );
    const ref = await crypto.subtle.exportKey('jwk', kp.publicKey);
    const cose: CborMap = new Map<number | string, CborValue>([
      [1, 3], // kty RSA
      [3, -257], // alg RS256
      [-1, b64urlToBuf(ref.n!)],
      [-2, b64urlToBuf(ref.e!)],
    ]);

    const jwk = coseToJwk(cose);
    expect(jwk).toEqual({ kty: 'RSA', n: ref.n, e: ref.e });
  });

  it('rejects unsupported key types and curves', () => {
    expect(() => coseToJwk(new Map<number | string, CborValue>([[1, 1]]))).toThrow(/kty/); // OKP not supported
    expect(() =>
      coseToJwk(new Map<number | string, CborValue>([[1, 2], [-1, 2]])),
    ).toThrow(/curve/i); // P-384 not supported
  });
});

describe('jwkToPem', () => {
  it('produces a PEM-wrapped SPKI for an EC key', async () => {
    const kp = await crypto.subtle.generateKey({ name: 'ECDSA', namedCurve: 'P-256' }, true, ['sign', 'verify']);
    const jwk = await crypto.subtle.exportKey('jwk', kp.publicKey);
    const pem = await jwkToPem({ kty: 'EC', crv: 'P-256', x: jwk.x, y: jwk.y });
    expect(pem).toMatch(/^-----BEGIN PUBLIC KEY-----\n/);
    expect(pem).toMatch(/\n-----END PUBLIC KEY-----$/);
    // Body lines wrapped at 64 chars
    const body = pem.split('\n').slice(1, -1);
    expect(body.every((l) => l.length <= 64)).toBe(true);
  });
});
```

- [ ] **Step 2: Write the failing DER test**

```ts
// src/components/widgets/passkey-demo/lib/derSignature.test.ts
import { describe, expect, it } from 'vitest';
import { derToRaw } from './derSignature';
import { hexToBytes, rawToDer } from './testHelpers';

describe('derToRaw', () => {
  it('round-trips a raw signature through DER', () => {
    const raw = new Uint8Array(64);
    crypto.getRandomValues(raw);
    raw[0] = 0x91; // force high bit on r so DER needs a 0x00 prefix
    raw[32] = 0x00; // force a leading zero on s so DER strips it
    raw[33] = 0x01;
    expect(derToRaw(rawToDer(raw))).toEqual(raw);
  });

  it('left-pads short integers to the coordinate size', () => {
    // r = 0x01, s = 0x02
    const der = hexToBytes('3006 020101 020102');
    const raw = derToRaw(der);
    expect(raw.length).toBe(64);
    expect(raw[31]).toBe(0x01);
    expect(raw[63]).toBe(0x02);
  });

  it('rejects non-signature input', () => {
    expect(() => derToRaw(hexToBytes('0102'))).toThrow(/SEQUENCE/);
    expect(() => derToRaw(hexToBytes('3003 030101'))).toThrow(/INTEGER/);
  });
});
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `npx vitest run src/components/widgets/passkey-demo/lib/coseKey.test.ts src/components/widgets/passkey-demo/lib/derSignature.test.ts`
Expected: FAIL — modules not found.

- [ ] **Step 4: Write the implementations**

```ts
// src/components/widgets/passkey-demo/lib/coseKey.ts
//
// COSE_Key (RFC 9052/9053) → JWK / PEM. WebAuthn delivers the credential
// public key as a COSE map inside authData; WebCrypto wants JWK or SPKI.

import { bufToB64url } from './base64url';
import type { CborMap } from './cbor';

// COSE key common parameters and EC2/RSA-specific labels
const KTY = 1;
const ALG = 3;
const EC2_CRV = -1;
const EC2_X = -2;
const EC2_Y = -3;
const RSA_N = -1;
const RSA_E = -2;

export function coseAlg(cose: CborMap): number {
  const alg = cose.get(ALG);
  if (typeof alg !== 'number') throw new Error('COSE key: missing alg');
  return alg;
}

export function coseToJwk(cose: CborMap): JsonWebKey {
  const kty = cose.get(KTY);
  if (kty === 2) {
    // EC2
    const crv = cose.get(EC2_CRV);
    if (crv !== 1) throw new Error(`COSE key: unsupported EC curve ${String(crv)} (only P-256)`);
    const x = cose.get(EC2_X);
    const y = cose.get(EC2_Y);
    if (!(x instanceof Uint8Array) || !(y instanceof Uint8Array)) {
      throw new Error('COSE key: EC2 key missing x/y coordinates');
    }
    return { kty: 'EC', crv: 'P-256', x: bufToB64url(x), y: bufToB64url(y) };
  }
  if (kty === 3) {
    // RSA
    const n = cose.get(RSA_N);
    const e = cose.get(RSA_E);
    if (!(n instanceof Uint8Array) || !(e instanceof Uint8Array)) {
      throw new Error('COSE key: RSA key missing n/e');
    }
    return { kty: 'RSA', n: bufToB64url(n), e: bufToB64url(e) };
  }
  throw new Error(`COSE key: unsupported kty ${String(kty)}`);
}

/** Export a public JWK as a PEM-wrapped SPKI via WebCrypto. */
export async function jwkToPem(jwk: JsonWebKey): Promise<string> {
  const params: EcKeyImportParams | RsaHashedImportParams =
    jwk.kty === 'EC'
      ? { name: 'ECDSA', namedCurve: 'P-256' }
      : { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' };
  const key = await crypto.subtle.importKey('jwk', jwk, params, true, ['verify']);
  const spki = new Uint8Array(await crypto.subtle.exportKey('spki', key));
  let bin = '';
  for (const b of spki) bin += String.fromCharCode(b);
  const lines = btoa(bin).match(/.{1,64}/g) ?? [];
  return `-----BEGIN PUBLIC KEY-----\n${lines.join('\n')}\n-----END PUBLIC KEY-----`;
}
```

```ts
// src/components/widgets/passkey-demo/lib/derSignature.ts
//
// WebAuthn ES256 signatures are ASN.1/DER-encoded (SEQUENCE of two INTEGERs);
// WebCrypto's ECDSA verify expects the raw fixed-width r‖s (IEEE P1363) form.

export function derToRaw(der: Uint8Array, coordinateSize = 32): Uint8Array {
  if (der.length < 8 || der[0] !== 0x30) {
    throw new Error('DER signature: expected SEQUENCE');
  }
  let offset = 2;
  if (der[1] & 0x80) offset += der[1] & 0x7f; // skip long-form length bytes

  const readInteger = (): Uint8Array => {
    if (der[offset] !== 0x02) throw new Error('DER signature: expected INTEGER');
    const len = der[offset + 1];
    offset += 2;
    let bytes = der.slice(offset, offset + len);
    offset += len;
    // Strip the sign-padding zero(s), then left-pad to the coordinate size
    while (bytes.length > coordinateSize && bytes[0] === 0x00) bytes = bytes.slice(1);
    if (bytes.length > coordinateSize) throw new Error('DER signature: integer too large');
    const out = new Uint8Array(coordinateSize);
    out.set(bytes, coordinateSize - bytes.length);
    return out;
  };

  const r = readInteger();
  const s = readInteger();
  const raw = new Uint8Array(coordinateSize * 2);
  raw.set(r, 0);
  raw.set(s, coordinateSize);
  return raw;
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npx vitest run src/components/widgets/passkey-demo/lib/coseKey.test.ts src/components/widgets/passkey-demo/lib/derSignature.test.ts`
Expected: PASS (4 + 3 tests).

- [ ] **Step 6: Commit**

```bash
git add src/components/widgets/passkey-demo/lib/coseKey.ts src/components/widgets/passkey-demo/lib/coseKey.test.ts src/components/widgets/passkey-demo/lib/derSignature.ts src/components/widgets/passkey-demo/lib/derSignature.test.ts
git commit -m "feat(passkey-demo): COSE→JWK/PEM and DER→raw signature conversion"
```

---

### Task 6: AAGUID lookup, creation options, storage, error explanations

**Files:**
- Create: `src/components/widgets/passkey-demo/lib/aaguid.ts`
- Create: `src/components/widgets/passkey-demo/lib/createOptions.ts`
- Create: `src/components/widgets/passkey-demo/lib/storage.ts`
- Create: `src/components/widgets/passkey-demo/lib/errors.ts`
- Test: `src/components/widgets/passkey-demo/lib/aaguid.test.ts`
- Test: `src/components/widgets/passkey-demo/lib/createOptions.test.ts`

- [ ] **Step 1: Write the failing tests**

```ts
// src/components/widgets/passkey-demo/lib/aaguid.test.ts
import { describe, expect, it } from 'vitest';
import { aaguidName, formatAaguid } from './aaguid';

describe('formatAaguid', () => {
  it('formats 16 bytes as a dashed UUID string', () => {
    const bytes = new Uint8Array([
      0xea, 0x9b, 0x8d, 0x66, 0x4d, 0x01, 0x1d, 0x21, 0x3c, 0xe4, 0xb6, 0xb4, 0x8c, 0xb5, 0x75, 0xd4,
    ]);
    expect(formatAaguid(bytes)).toBe('ea9b8d66-4d01-1d21-3ce4-b6b48cb575d4');
  });
});

describe('aaguidName', () => {
  it('resolves a known AAGUID from the bundled snapshot', () => {
    expect(aaguidName('ea9b8d66-4d01-1d21-3ce4-b6b48cb575d4')).toBe('Google Password Manager');
  });

  it('explains the all-zero AAGUID instead of returning null', () => {
    expect(aaguidName('00000000-0000-0000-0000-000000000000')).toMatch(/attestation/i);
  });

  it('returns null for unknown AAGUIDs', () => {
    expect(aaguidName('ffffffff-ffff-ffff-ffff-ffffffffffff')).toBeNull();
  });
});
```

```ts
// src/components/widgets/passkey-demo/lib/createOptions.test.ts
import { describe, expect, it } from 'vitest';
import { buildCreationOptions, creationOptionsPreview, type CreateConfig } from './createOptions';
import { bufToB64url } from './base64url';

const BASE: CreateConfig = {
  userName: 'demo-user',
  attachment: '',
  userVerification: 'preferred',
  residentKey: 'preferred',
  includeRs256: false,
  attestation: 'none',
};
const CHALLENGE = new Uint8Array(32).fill(7);
const USER_ID = new Uint8Array(16).fill(9);

describe('creationOptionsPreview', () => {
  it('renders binary fields as base64url and omits unset attachment', () => {
    const preview = creationOptionsPreview(BASE, CHALLENGE, USER_ID, 'www.authgear.com');
    expect(preview.challenge).toBe(bufToB64url(CHALLENGE));
    expect(preview.user.id).toBe(bufToB64url(USER_ID));
    expect(preview.rp).toEqual({ id: 'www.authgear.com', name: 'Authgear Passkey Demo' });
    expect(preview.pubKeyCredParams).toEqual([{ type: 'public-key', alg: -7 }]);
    expect('authenticatorAttachment' in preview.authenticatorSelection).toBe(false);
  });

  it('adds RS256 and attachment when configured', () => {
    const preview = creationOptionsPreview(
      { ...BASE, includeRs256: true, attachment: 'platform', attestation: 'direct' },
      CHALLENGE,
      USER_ID,
      'localhost',
    );
    expect(preview.pubKeyCredParams).toEqual([
      { type: 'public-key', alg: -7 },
      { type: 'public-key', alg: -257 },
    ]);
    expect(preview.authenticatorSelection.authenticatorAttachment).toBe('platform');
    expect(preview.attestation).toBe('direct');
  });
});

describe('buildCreationOptions', () => {
  it('mirrors the preview but with real buffers', () => {
    const options = buildCreationOptions(BASE, CHALLENGE, USER_ID, 'localhost');
    expect(options.challenge).toBe(CHALLENGE);
    expect(options.user.id).toBe(USER_ID);
    expect(options.user.name).toBe('demo-user');
    expect(options.timeout).toBe(60000);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run src/components/widgets/passkey-demo/lib/aaguid.test.ts src/components/widgets/passkey-demo/lib/createOptions.test.ts`
Expected: FAIL — modules not found.

- [ ] **Step 3: Write the four modules**

```ts
// src/components/widgets/passkey-demo/lib/aaguid.ts
//
// AAGUID → authenticator name, from a bundled snapshot of the community
// passkey-authenticator-aaguids dataset (see scripts/fetch-aaguid-names.mjs).
// Static by design — the spec rules out live FIDO MDS fetching.

import names from './aaguid-names.json';

const ZERO_AAGUID = '00000000-0000-0000-0000-000000000000';

export function formatAaguid(bytes: Uint8Array): string {
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export function aaguidName(aaguid: string): string | null {
  if (aaguid === ZERO_AAGUID) {
    return 'Not provided — attestation "none" zeroes the AAGUID';
  }
  return (names as Record<string, string>)[aaguid] ?? null;
}
```

```ts
// src/components/widgets/passkey-demo/lib/createOptions.ts
//
// Builds PublicKeyCredentialCreationOptions from the panel-1 form state, plus
// a JSON-renderable preview (binary fields as base64url) shown live to the
// visitor as they toggle options.

import { bufToB64url } from './base64url';

export interface CreateConfig {
  userName: string;
  attachment: '' | 'platform' | 'cross-platform';
  userVerification: UserVerificationRequirement;
  residentKey: ResidentKeyRequirement;
  includeRs256: boolean;
  attestation: 'none' | 'direct';
}

const RP_NAME = 'Authgear Passkey Demo';
const TIMEOUT_MS = 60000;

function pubKeyCredParams(cfg: CreateConfig): Array<{ type: 'public-key'; alg: number }> {
  return [
    { type: 'public-key', alg: -7 }, // ES256, always
    ...(cfg.includeRs256 ? [{ type: 'public-key' as const, alg: -257 }] : []),
  ];
}

export function buildCreationOptions(
  cfg: CreateConfig,
  challenge: Uint8Array,
  userId: Uint8Array,
  rpId: string,
): PublicKeyCredentialCreationOptions {
  const authenticatorSelection: AuthenticatorSelectionCriteria = {
    userVerification: cfg.userVerification,
    residentKey: cfg.residentKey,
  };
  if (cfg.attachment) authenticatorSelection.authenticatorAttachment = cfg.attachment;
  return {
    rp: { id: rpId, name: RP_NAME },
    user: { id: userId, name: cfg.userName, displayName: cfg.userName },
    challenge,
    pubKeyCredParams: pubKeyCredParams(cfg),
    timeout: TIMEOUT_MS,
    authenticatorSelection,
    attestation: cfg.attestation,
  };
}

export interface CreationOptionsPreview {
  rp: { id: string; name: string };
  user: { id: string; name: string; displayName: string };
  challenge: string;
  pubKeyCredParams: Array<{ type: 'public-key'; alg: number }>;
  timeout: number;
  authenticatorSelection: {
    authenticatorAttachment?: string;
    userVerification: string;
    residentKey: string;
  };
  attestation: string;
}

export function creationOptionsPreview(
  cfg: CreateConfig,
  challenge: Uint8Array,
  userId: Uint8Array,
  rpId: string,
): CreationOptionsPreview {
  const authenticatorSelection: CreationOptionsPreview['authenticatorSelection'] = {
    userVerification: cfg.userVerification,
    residentKey: cfg.residentKey,
  };
  if (cfg.attachment) authenticatorSelection.authenticatorAttachment = cfg.attachment;
  return {
    rp: { id: rpId, name: RP_NAME },
    user: { id: bufToB64url(userId), name: cfg.userName, displayName: cfg.userName },
    challenge: bufToB64url(challenge),
    pubKeyCredParams: pubKeyCredParams(cfg),
    timeout: TIMEOUT_MS,
    authenticatorSelection,
    attestation: cfg.attestation,
  };
}
```

```ts
// src/components/widgets/passkey-demo/lib/storage.ts
//
// localStorage persistence for demo-passkey metadata. One namespaced key.
// We also keep the raw attestationObject/clientDataJSON (base64url) so the
// inspector panel works for credentials created in earlier visits.

export interface StoredCredential {
  credentialId: string; // base64url
  userName: string;
  alg: number; // COSE alg: -7 ES256 | -257 RS256
  publicKeyJwk: JsonWebKey;
  transports: string[];
  createdAt: string; // ISO timestamp
  signCount: number; // last seen counter
  attestationObject: string; // base64url
  clientDataJSON: string; // base64url (from registration)
  options: {
    attachment: string;
    userVerification: string;
    residentKey: string;
    attestation: string;
  };
}

const STORAGE_KEY = 'authgear.passkey-demo.credentials.v1';

export function loadCredentials(): StoredCredential[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as StoredCredential[]) : [];
  } catch {
    return [];
  }
}

export function saveCredentials(credentials: StoredCredential[]): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(credentials));
  } catch {
    // Storage full or blocked (private browsing) — the demo still works,
    // the credential list just won't survive a reload.
  }
}
```

```ts
// src/components/widgets/passkey-demo/lib/errors.ts
//
// WebAuthn errors as teaching moments — the spec calls for explanations,
// not raw DOMException names.

export function explainWebAuthnError(err: unknown, op: 'create' | 'get'): string {
  if (err instanceof DOMException) {
    switch (err.name) {
      case 'NotAllowedError':
        return op === 'create'
          ? 'The request was cancelled or timed out (NotAllowedError). This is the browser’s catch-all for “the user didn’t complete the prompt” — it deliberately doesn’t reveal why, so a malicious site can’t probe what authenticators you have. Try again and complete the Face ID / fingerprint / PIN prompt.'
          : 'The sign-in was cancelled or timed out (NotAllowedError). The browser reports this for any abandoned prompt — including “no matching passkey was found” — so sites can’t fish for which credentials exist. Create a passkey above first, then try again.';
      case 'InvalidStateError':
        return 'Your authenticator already has a passkey for this user name on this site (InvalidStateError). Real apps use excludeCredentials to trigger exactly this, preventing duplicate registrations. Change the user name, or delete the existing passkey from your device, and try again.';
      case 'SecurityError':
        return 'The browser refused the request for security reasons (SecurityError) — usually the RP ID doesn’t match the page’s domain, or the page isn’t a secure context. WebAuthn only works over HTTPS (localhost is the one exception).';
      case 'AbortError':
        return 'The request was aborted (AbortError) — typically a new WebAuthn request started before this one finished.';
      case 'NotSupportedError':
        return 'Your authenticator doesn’t support the requested options (NotSupportedError) — e.g. none of the offered algorithms. Re-enable ES256 and try again.';
    }
  }
  return `Unexpected error: ${err instanceof Error ? err.message : String(err)}`;
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run src/components/widgets/passkey-demo/lib/aaguid.test.ts src/components/widgets/passkey-demo/lib/createOptions.test.ts`
Expected: PASS. If the `Google Password Manager` AAGUID assertion fails because the snapshot differs, replace that test's AAGUID/name pair with any real entry from the generated `aaguid-names.json` — do not edit the JSON.

- [ ] **Step 5: Commit**

```bash
git add src/components/widgets/passkey-demo/lib/aaguid.ts src/components/widgets/passkey-demo/lib/aaguid.test.ts src/components/widgets/passkey-demo/lib/createOptions.ts src/components/widgets/passkey-demo/lib/createOptions.test.ts src/components/widgets/passkey-demo/lib/storage.ts src/components/widgets/passkey-demo/lib/errors.ts
git commit -m "feat(passkey-demo): creation options, storage, AAGUID lookup, error explanations"
```

---

### Task 7: Server-style assertion verification

**Files:**
- Create: `src/components/widgets/passkey-demo/lib/verifyAssertion.ts`
- Test: `src/components/widgets/passkey-demo/lib/verifyAssertion.test.ts`

- [ ] **Step 1: Write the failing test**

The test plays authenticator: it builds real authData + clientDataJSON, signs with a generated P-256 key (converting WebCrypto's raw signature to DER, since that's what authenticators emit), then expects `verifyAssertion` to pass every step — and to fail the right step when each input is tampered with.

```ts
// src/components/widgets/passkey-demo/lib/verifyAssertion.test.ts
import { describe, expect, it } from 'vitest';
import { bufToB64url } from './base64url';
import type { StoredCredential } from './storage';
import { verifyAssertion } from './verifyAssertion';
import { concatBytes, rawToDer } from './testHelpers';

const RP_ID = 'localhost';
const ORIGIN = 'http://localhost:4321';

interface Fixture {
  credential: StoredCredential;
  clientDataJSON: Uint8Array;
  authenticatorData: Uint8Array;
  signature: Uint8Array;
  challengeB64: string;
}

async function makeAssertion(opts: { signCount?: number; flags?: number } = {}): Promise<Fixture> {
  const kp = await crypto.subtle.generateKey({ name: 'ECDSA', namedCurve: 'P-256' }, true, ['sign', 'verify']);
  const jwk = await crypto.subtle.exportKey('jwk', kp.publicKey);
  const publicKeyJwk: JsonWebKey = { kty: 'EC', crv: 'P-256', x: jwk.x, y: jwk.y };

  const challenge = crypto.getRandomValues(new Uint8Array(32));
  const challengeB64 = bufToB64url(challenge);
  const clientDataJSON = new TextEncoder().encode(
    JSON.stringify({ type: 'webauthn.get', challenge: challengeB64, origin: ORIGIN }),
  );

  const rpIdHash = new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(RP_ID)));
  const authenticatorData = new Uint8Array(37);
  authenticatorData.set(rpIdHash, 0);
  authenticatorData[32] = opts.flags ?? 0x05; // UP + UV
  new DataView(authenticatorData.buffer).setUint32(33, opts.signCount ?? 0);

  const clientDataHash = new Uint8Array(await crypto.subtle.digest('SHA-256', clientDataJSON));
  const signedData = concatBytes(authenticatorData, clientDataHash);
  const rawSig = new Uint8Array(
    await crypto.subtle.sign({ name: 'ECDSA', hash: 'SHA-256' }, kp.privateKey, signedData),
  );

  const credential: StoredCredential = {
    credentialId: 'dGVzdA',
    userName: 'demo-user',
    alg: -7,
    publicKeyJwk,
    transports: [],
    createdAt: new Date().toISOString(),
    signCount: 0,
    attestationObject: '',
    clientDataJSON: '',
    options: { attachment: 'unset', userVerification: 'preferred', residentKey: 'preferred', attestation: 'none' },
  };

  return { credential, clientDataJSON, authenticatorData, signature: rawToDer(rawSig), challengeB64 };
}

function inputFor(f: Fixture) {
  return {
    expectedChallenge: f.challengeB64,
    expectedOrigin: ORIGIN,
    expectedRpId: RP_ID,
    requestedUserVerification: 'preferred' as const,
    clientDataJSON: f.clientDataJSON,
    authenticatorData: f.authenticatorData,
    signature: f.signature,
    credential: f.credential,
  };
}

describe('verifyAssertion', () => {
  it('passes all steps for a genuine assertion', async () => {
    const f = await makeAssertion();
    const result = await verifyAssertion(inputFor(f));
    expect(result.steps.map((s) => [s.id, s.pass])).toEqual([
      ['type', true],
      ['challenge', true],
      ['origin', true],
      ['rpIdHash', true],
      ['flags', true],
      ['signature', true],
      ['signCount', true],
    ]);
    expect(result.allPassed).toBe(true);
  });

  it('fails the challenge step when the expected challenge differs', async () => {
    const f = await makeAssertion();
    const result = await verifyAssertion({ ...inputFor(f), expectedChallenge: bufToB64url(new Uint8Array(32)) });
    expect(result.steps.find((s) => s.id === 'challenge')?.pass).toBe(false);
    expect(result.allPassed).toBe(false);
  });

  it('fails the origin and rpIdHash steps for a different site', async () => {
    const f = await makeAssertion();
    const result = await verifyAssertion({
      ...inputFor(f),
      expectedOrigin: 'https://evil.example',
      expectedRpId: 'evil.example',
    });
    expect(result.steps.find((s) => s.id === 'origin')?.pass).toBe(false);
    expect(result.steps.find((s) => s.id === 'rpIdHash')?.pass).toBe(false);
  });

  it('fails the flags step when UV is required but not set', async () => {
    const f = await makeAssertion({ flags: 0x01 }); // UP only
    const result = await verifyAssertion({ ...inputFor(f), requestedUserVerification: 'required' });
    expect(result.steps.find((s) => s.id === 'flags')?.pass).toBe(false);
  });

  it('fails the signature step when the signed data is tampered with', async () => {
    const f = await makeAssertion();
    const tampered = new Uint8Array(f.authenticatorData);
    tampered[36] ^= 0xff; // flip a bit in signCount
    const result = await verifyAssertion({ ...inputFor(f), authenticatorData: tampered });
    expect(result.steps.find((s) => s.id === 'signature')?.pass).toBe(false);
  });

  it('reports the new sign count', async () => {
    const f = await makeAssertion({ signCount: 7 });
    const result = await verifyAssertion(inputFor(f));
    expect(result.newSignCount).toBe(7);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/widgets/passkey-demo/lib/verifyAssertion.test.ts`
Expected: FAIL — `Cannot find module './verifyAssertion'`.

- [ ] **Step 3: Write the implementation**

```ts
// src/components/widgets/passkey-demo/lib/verifyAssertion.ts
//
// Re-implements, in the browser, the checks a relying-party server performs
// on a WebAuthn assertion (WebAuthn L3 §7.2). Each check becomes a
// pass/fail step with a teaching-moment explanation. The signature check is
// real WebCrypto verification against the public key captured at creation.

import { bufToB64url } from './base64url';
import { parseAuthData } from './authData';
import { derToRaw } from './derSignature';
import type { StoredCredential } from './storage';

export interface VerificationStep {
  id: 'type' | 'challenge' | 'origin' | 'rpIdHash' | 'flags' | 'signature' | 'signCount';
  label: string;
  pass: boolean;
  /** Informational steps render as INFO instead of PASS/FAIL. */
  info?: boolean;
  detail: string;
}

export interface AssertionVerification {
  steps: VerificationStep[];
  allPassed: boolean;
  newSignCount: number;
}

export interface VerifyAssertionInput {
  expectedChallenge: string; // base64url of the issued challenge
  expectedOrigin: string; // e.g. window.location.origin
  expectedRpId: string; // e.g. window.location.hostname
  requestedUserVerification: UserVerificationRequirement;
  clientDataJSON: Uint8Array;
  authenticatorData: Uint8Array;
  signature: Uint8Array;
  credential: StoredCredential;
}

export async function verifyAssertion(input: VerifyAssertionInput): Promise<AssertionVerification> {
  const steps: VerificationStep[] = [];

  let clientData: { type?: string; challenge?: string; origin?: string } = {};
  try {
    clientData = JSON.parse(new TextDecoder().decode(input.clientDataJSON));
  } catch {
    // leave empty — every clientData-based step below will fail with detail
  }

  steps.push({
    id: 'type',
    label: 'clientDataJSON.type is "webauthn.get"',
    pass: clientData.type === 'webauthn.get',
    detail: `Got "${clientData.type ?? 'unparseable clientDataJSON'}". A server checks this so a signature minted during registration ("webauthn.create") can never be replayed as a sign-in.`,
  });

  steps.push({
    id: 'challenge',
    label: 'Challenge matches the one issued',
    pass: clientData.challenge === input.expectedChallenge,
    detail:
      'The browser echoes the server’s random challenge inside the signed clientDataJSON. Matching it proves this assertion was produced for this sign-in attempt — a captured assertion cannot be replayed.',
  });

  steps.push({
    id: 'origin',
    label: `Origin is ${input.expectedOrigin}`,
    pass: clientData.origin === input.expectedOrigin,
    detail: `Got "${clientData.origin ?? 'n/a'}". The browser fills this in and the page cannot forge it — the core of why passkeys are phishing-resistant.`,
  });

  const authData = parseAuthData(input.authenticatorData);
  const expectedRpIdHash = new Uint8Array(
    await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input.expectedRpId)),
  );
  steps.push({
    id: 'rpIdHash',
    label: `rpIdHash matches SHA-256("${input.expectedRpId}")`,
    pass: bufToB64url(authData.rpIdHash) === bufToB64url(expectedRpIdHash),
    detail:
      'The authenticator binds every assertion to the relying-party ID it was created for, so a credential registered on one site can never answer for another.',
  });

  const uvSatisfied = input.requestedUserVerification !== 'required' || authData.flags.uv;
  steps.push({
    id: 'flags',
    label: 'UP / UV flags as requested',
    pass: authData.flags.up && uvSatisfied,
    detail: `UP (user present) = ${authData.flags.up}, UV (user verified) = ${authData.flags.uv}; you requested userVerification: "${input.requestedUserVerification}". UP must always be set; UV must be set when verification is required.`,
  });

  let signatureOk = false;
  let signatureDetail =
    'WebCrypto verified the signature over authenticatorData ‖ SHA-256(clientDataJSON) using the public key captured at registration — the cryptographic heart of WebAuthn.';
  try {
    const clientDataHash = new Uint8Array(await crypto.subtle.digest('SHA-256', input.clientDataJSON));
    const signedData = new Uint8Array(input.authenticatorData.length + clientDataHash.length);
    signedData.set(input.authenticatorData, 0);
    signedData.set(clientDataHash, input.authenticatorData.length);

    if (input.credential.alg === -7) {
      const key = await crypto.subtle.importKey(
        'jwk',
        input.credential.publicKeyJwk,
        { name: 'ECDSA', namedCurve: 'P-256' },
        false,
        ['verify'],
      );
      // WebAuthn ES256 signatures arrive ASN.1/DER-encoded; WebCrypto wants raw r‖s
      signatureOk = await crypto.subtle.verify(
        { name: 'ECDSA', hash: 'SHA-256' },
        key,
        derToRaw(input.signature),
        signedData,
      );
    } else if (input.credential.alg === -257) {
      const key = await crypto.subtle.importKey(
        'jwk',
        input.credential.publicKeyJwk,
        { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
        false,
        ['verify'],
      );
      signatureOk = await crypto.subtle.verify('RSASSA-PKCS1-v1_5', key, input.signature, signedData);
    } else {
      signatureDetail = `Unsupported COSE algorithm ${input.credential.alg} — this demo verifies ES256 (-7) and RS256 (-257).`;
    }
    if (!signatureOk && input.credential.alg === -7) {
      signatureDetail =
        'The ES256 signature did not verify against the stored public key — the signed data or key does not match.';
    } else if (!signatureOk && input.credential.alg === -257) {
      signatureDetail =
        'The RS256 signature did not verify against the stored public key — the signed data or key does not match.';
    }
  } catch (err) {
    signatureDetail = `Verification threw: ${err instanceof Error ? err.message : String(err)}`;
  }
  steps.push({
    id: 'signature',
    label: 'Signature verifies against the stored public key',
    pass: signatureOk,
    detail: signatureDetail,
  });

  const previous = input.credential.signCount;
  steps.push({
    id: 'signCount',
    label: 'Sign count progression',
    pass: true,
    info: true,
    detail:
      authData.signCount === 0
        ? 'This authenticator reports 0. Most passkey providers (iCloud Keychain, Google Password Manager) always do — a credential synced across devices can’t keep one shared counter. Servers treat 0 as "counter not supported".'
        : authData.signCount > previous
          ? `Counter advanced from ${previous} to ${authData.signCount}. Servers can use this to detect cloned credentials — a clone would eventually present a stale counter.`
          : `Counter did not advance (${previous} → ${authData.signCount}). A strict server might flag this, but synced passkeys make the counter unreliable, so most treat it as informational.`,
  });

  return {
    steps,
    allPassed: steps.every((s) => s.pass),
    newSignCount: authData.signCount,
  };
}
```

- [ ] **Step 4: Run all unit tests**

Run: `npm run test:unit`
Expected: PASS — everything from tasks 2–7.

- [ ] **Step 5: Commit**

```bash
git add src/components/widgets/passkey-demo/lib/verifyAssertion.ts src/components/widgets/passkey-demo/lib/verifyAssertion.test.ts
git commit -m "feat(passkey-demo): server-style assertion verification with teaching steps"
```

---

### Task 8: Credential inspector

**Files:**
- Create: `src/components/widgets/passkey-demo/lib/inspect.ts`
- Test: `src/components/widgets/passkey-demo/lib/inspect.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// src/components/widgets/passkey-demo/lib/inspect.test.ts
import { describe, expect, it } from 'vitest';
import { b64urlToBuf, bufToB64url } from './base64url';
import { inspectCredential } from './inspect';
import { cborBytes, cborMap, cborNegInt, cborText, cborUint, concatBytes } from './testHelpers';

async function buildFixture() {
  const kp = await crypto.subtle.generateKey({ name: 'ECDSA', namedCurve: 'P-256' }, true, ['sign', 'verify']);
  const jwk = await crypto.subtle.exportKey('jwk', kp.publicKey);

  const clientDataJSON = new TextEncoder().encode(
    JSON.stringify({ type: 'webauthn.create', challenge: 'Y2hhbGxlbmdl', origin: 'http://localhost:4321' }),
  );

  const rpIdHash = new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode('localhost')));
  const head = new Uint8Array(37);
  head.set(rpIdHash, 0);
  head[32] = 0x45; // UP + UV + AT
  const aaguid = new Uint8Array(16); // all-zero, like attestation "none"
  const credId = new Uint8Array(16).fill(0xcd);
  const xBytes = b64urlToBuf(jwk.x!);
  const yBytes = b64urlToBuf(jwk.y!);
  const cose = cborMap([
    [cborUint(1), cborUint(2)],
    [cborUint(3), cborNegInt(-7)],
    [cborNegInt(-1), cborUint(1)],
    [cborNegInt(-2), cborBytes(xBytes)],
    [cborNegInt(-3), cborBytes(yBytes)],
  ]);
  const authData = concatBytes(head, aaguid, new Uint8Array([0, credId.length]), credId, cose);

  const attestationObject = cborMap([
    [cborText('fmt'), cborText('none')],
    [cborText('attStmt'), cborMap([])],
    [cborText('authData'), cborBytes(authData)],
  ]);

  return {
    attB64: bufToB64url(attestationObject),
    cdB64: bufToB64url(clientDataJSON),
    jwk,
    credId,
  };
}

describe('inspectCredential', () => {
  it('decodes clientDataJSON, attestation object, and the public key', async () => {
    const f = await buildFixture();
    const inspection = await inspectCredential(f.attB64, f.cdB64);

    expect(inspection.clientData).toEqual({
      type: 'webauthn.create',
      challenge: 'Y2hhbGxlbmdl',
      origin: 'http://localhost:4321',
    });
    expect(inspection.fmt).toBe('none');
    expect(inspection.flags).toMatchObject({ up: true, uv: true, at: true });
    expect(inspection.signCount).toBe(0);
    expect(inspection.aaguid).toBe('00000000-0000-0000-0000-000000000000');
    expect(inspection.aaguidName).toMatch(/attestation/i);
    expect(inspection.credentialId).toBe(bufToB64url(f.credId));
    expect(inspection.alg).toBe(-7);
    expect(inspection.publicKeyJwk).toEqual({ kty: 'EC', crv: 'P-256', x: f.jwk.x, y: f.jwk.y });
    expect(inspection.publicKeyPem).toMatch(/^-----BEGIN PUBLIC KEY-----/);
  });

  it('throws on a malformed attestation object', async () => {
    await expect(inspectCredential('AAAA', 'AAAA')).rejects.toThrow();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/widgets/passkey-demo/lib/inspect.test.ts`
Expected: FAIL — `Cannot find module './inspect'`.

- [ ] **Step 3: Write the implementation**

```ts
// src/components/widgets/passkey-demo/lib/inspect.ts
//
// Decodes a registration response into everything panel 2 displays. Works
// from the base64url-stored forms so the inspector also works for
// credentials persisted in localStorage from earlier visits.

import { aaguidName, formatAaguid } from './aaguid';
import { parseAuthData, type AuthDataFlags } from './authData';
import { b64urlToBuf, bufToB64url } from './base64url';
import { decode } from './cbor';
import { coseAlg, coseToJwk, jwkToPem } from './coseKey';

export interface CredentialInspection {
  clientData: { type: string; challenge: string; origin: string };
  fmt: string;
  rpIdHash: string; // base64url
  flags: AuthDataFlags;
  signCount: number;
  aaguid: string | null; // dashed UUID form
  aaguidName: string | null;
  credentialId: string | null; // base64url
  publicKeyJwk: JsonWebKey | null;
  publicKeyPem: string | null;
  alg: number | null;
}

export async function inspectCredential(
  attestationObjectB64: string,
  clientDataJSONB64: string,
): Promise<CredentialInspection> {
  const clientData = JSON.parse(
    new TextDecoder().decode(b64urlToBuf(clientDataJSONB64)),
  ) as CredentialInspection['clientData'];

  const attObj = decode(b64urlToBuf(attestationObjectB64));
  if (!(attObj instanceof Map)) throw new Error('attestationObject is not a CBOR map');
  const fmt = attObj.get('fmt');
  const authDataBytes = attObj.get('authData');
  if (typeof fmt !== 'string' || !(authDataBytes instanceof Uint8Array)) {
    throw new Error('attestationObject is missing fmt or authData');
  }

  const authData = parseAuthData(authDataBytes);

  let publicKeyJwk: JsonWebKey | null = null;
  let publicKeyPem: string | null = null;
  let alg: number | null = null;
  if (authData.cosePublicKey) {
    publicKeyJwk = coseToJwk(authData.cosePublicKey);
    publicKeyPem = await jwkToPem(publicKeyJwk);
    alg = coseAlg(authData.cosePublicKey);
  }

  const aaguid = authData.aaguid ? formatAaguid(authData.aaguid) : null;

  return {
    clientData,
    fmt,
    rpIdHash: bufToB64url(authData.rpIdHash),
    flags: authData.flags,
    signCount: authData.signCount,
    aaguid,
    aaguidName: aaguid ? aaguidName(aaguid) : null,
    credentialId: authData.credentialId ? bufToB64url(authData.credentialId) : null,
    publicKeyJwk,
    publicKeyPem,
    alg,
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/widgets/passkey-demo/lib/inspect.test.ts`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add src/components/widgets/passkey-demo/lib/inspect.ts src/components/widgets/passkey-demo/lib/inspect.test.ts
git commit -m "feat(passkey-demo): credential inspector decoding"
```

---

### Task 9: React hooks

**Files:**
- Create: `src/components/widgets/passkey-demo/hooks/useClipboard.ts`
- Create: `src/components/widgets/passkey-demo/hooks/useCredentialStore.ts`
- Create: `src/components/widgets/passkey-demo/hooks/useFeatureDetection.ts`

Hooks are thin state wrappers over the tested lib — no unit tests; covered by typecheck and the manual checklist.

- [ ] **Step 1: Write the three hooks**

```ts
// src/components/widgets/passkey-demo/hooks/useClipboard.ts
import { useRef, useState } from 'react';

export function useClipboard(resetMs = 1500) {
  const [copied, setCopied] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(null), resetMs);
    } catch {
      // Clipboard blocked — ignore; the value is selectable by hand.
    }
  };

  return { copied, copy };
}
```

```ts
// src/components/widgets/passkey-demo/hooks/useCredentialStore.ts
import { useEffect, useState } from 'react';
import { loadCredentials, saveCredentials, type StoredCredential } from '../lib/storage';

export function useCredentialStore() {
  const [credentials, setCredentials] = useState<StoredCredential[]>([]);

  // Load after mount — localStorage doesn't exist during SSR.
  useEffect(() => {
    setCredentials(loadCredentials());
  }, []);

  const mutate = (fn: (prev: StoredCredential[]) => StoredCredential[]) =>
    setCredentials((prev) => {
      const next = fn(prev);
      saveCredentials(next);
      return next;
    });

  return {
    credentials,
    add: (c: StoredCredential) =>
      mutate((prev) => [...prev.filter((x) => x.credentialId !== c.credentialId), c]),
    remove: (credentialId: string) =>
      mutate((prev) => prev.filter((x) => x.credentialId !== credentialId)),
    clear: () => mutate(() => []),
    updateSignCount: (credentialId: string, signCount: number) =>
      mutate((prev) => prev.map((x) => (x.credentialId === credentialId ? { ...x, signCount } : x))),
  };
}
```

```ts
// src/components/widgets/passkey-demo/hooks/useFeatureDetection.ts
import { useEffect, useState } from 'react';

export interface FeatureDetection {
  /** false until the mount-time check has run (also false during SSR). */
  checked: boolean;
  webauthn: boolean;
  platformAuthenticator: boolean | null;
  conditionalMediation: boolean | null;
}

export function useFeatureDetection(): FeatureDetection {
  const [state, setState] = useState<FeatureDetection>({
    checked: false,
    webauthn: false,
    platformAuthenticator: null,
    conditionalMediation: null,
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (typeof window === 'undefined' || !window.PublicKeyCredential) {
        if (!cancelled) setState({ checked: true, webauthn: false, platformAuthenticator: null, conditionalMediation: null });
        return;
      }
      const [platformAuthenticator, conditionalMediation] = await Promise.all([
        PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable().catch(() => null),
        PublicKeyCredential.isConditionalMediationAvailable?.().catch(() => null) ?? Promise.resolve(null),
      ]);
      if (!cancelled) setState({ checked: true, webauthn: true, platformAuthenticator, conditionalMediation });
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
```

- [ ] **Step 2: Typecheck**

Run: `npm run check`
Expected: 0 errors, 0 warnings.

- [ ] **Step 3: Commit**

```bash
git add src/components/widgets/passkey-demo/hooks/
git commit -m "feat(passkey-demo): clipboard, credential-store, and feature-detection hooks"
```

---

### Task 10: Presentational components (Panel, JsonView, CopyField, FlagBadges)

**Files:**
- Create: `src/components/widgets/passkey-demo/components/Panel.tsx`
- Create: `src/components/widgets/passkey-demo/components/JsonView.tsx`
- Create: `src/components/widgets/passkey-demo/components/CopyField.tsx`
- Create: `src/components/widgets/passkey-demo/components/FlagBadges.tsx`

- [ ] **Step 1: Write the four components**

```tsx
// src/components/widgets/passkey-demo/components/Panel.tsx
import type { ReactNode } from 'react';

interface Props {
  step: number;
  title: string;
  children: ReactNode;
}

export default function Panel({ step, title, children }: Props) {
  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
      <h3 className="flex items-center gap-3 text-lg font-semibold text-slate-900 mb-4">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white text-sm">
          {step}
        </span>
        {title}
      </h3>
      {children}
    </section>
  );
}
```

```tsx
// src/components/widgets/passkey-demo/components/JsonView.tsx

interface Props {
  /** Object is pretty-printed as JSON; a string renders verbatim (e.g. PEM). */
  value: unknown;
}

export default function JsonView({ value }: Props) {
  const text = typeof value === 'string' ? value : JSON.stringify(value, null, 2);
  return (
    <pre className="mt-2 max-h-80 overflow-auto rounded-lg bg-slate-900 text-slate-100 text-xs leading-relaxed p-4 whitespace-pre">
      {text}
    </pre>
  );
}
```

```tsx
// src/components/widgets/passkey-demo/components/CopyField.tsx
import { useClipboard } from '../hooks/useClipboard';

interface Props {
  label: string;
  /** base64url-rendered binary value. */
  value: string;
}

export default function CopyField({ label, value }: Props) {
  const { copied, copy } = useClipboard();
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="w-28 shrink-0 font-medium text-slate-600">{label}</span>
      <code className="min-w-0 flex-1 truncate rounded bg-slate-100 px-2 py-1 text-slate-800">{value}</code>
      <button
        type="button"
        className="shrink-0 rounded border border-slate-300 px-2 py-1 text-slate-600 hover:bg-slate-50"
        onClick={() => copy(label, value)}
      >
        {copied === label ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}
```

```tsx
// src/components/widgets/passkey-demo/components/FlagBadges.tsx
import type { AuthDataFlags } from '../lib/authData';

type FlagKey = keyof Omit<AuthDataFlags, 'raw' | 'ed'>;

const FLAGS: Array<{ key: FlagKey; label: string; title: string }> = [
  { key: 'up', label: 'UP', title: 'User Present — someone interacted with the authenticator' },
  { key: 'uv', label: 'UV', title: 'User Verified — biometric or PIN check passed' },
  { key: 'be', label: 'BE', title: 'Backup Eligible — the credential can sync between devices (a passkey)' },
  { key: 'bs', label: 'BS', title: 'Backup State — the credential is currently backed up' },
  { key: 'at', label: 'AT', title: 'Attested credential data is included' },
];

export default function FlagBadges({ flags }: { flags: AuthDataFlags }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {FLAGS.map(({ key, label, title }) => (
        <span
          key={label}
          title={title}
          className={`rounded border px-2 py-0.5 font-mono text-xs ${
            flags[key]
              ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
              : 'border-slate-200 bg-slate-50 text-slate-400 line-through'
          }`}
        >
          {label}
        </span>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npm run check`
Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/widgets/passkey-demo/components/Panel.tsx src/components/widgets/passkey-demo/components/JsonView.tsx src/components/widgets/passkey-demo/components/CopyField.tsx src/components/widgets/passkey-demo/components/FlagBadges.tsx
git commit -m "feat(passkey-demo): presentational components"
```

---

### Task 11: CreatePanel (panel 1)

**Files:**
- Create: `src/components/widgets/passkey-demo/components/CreatePanel.tsx`

- [ ] **Step 1: Write the component**

```tsx
// src/components/widgets/passkey-demo/components/CreatePanel.tsx
import { useState } from 'react';
import Panel from './Panel';
import JsonView from './JsonView';
import { bufToB64url } from '../lib/base64url';
import { buildCreationOptions, creationOptionsPreview, type CreateConfig } from '../lib/createOptions';
import { explainWebAuthnError } from '../lib/errors';
import { inspectCredential, type CredentialInspection } from '../lib/inspect';
import type { StoredCredential } from '../lib/storage';

interface Props {
  rpId: string;
  onCreated: (record: StoredCredential, inspection: CredentialInspection) => void;
}

const INPUT_CLS = 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800';

function randomBytes(n: number): Uint8Array {
  return crypto.getRandomValues(new Uint8Array(n));
}

export default function CreatePanel({ rpId, onCreated }: Props) {
  const [config, setConfig] = useState<CreateConfig>({
    userName: 'demo-user',
    attachment: '',
    userVerification: 'preferred',
    residentKey: 'preferred',
    includeRs256: false,
    attestation: 'none',
  });
  // Fresh randomness per registration attempt; regenerated after each success
  const [challenge, setChallenge] = useState<Uint8Array>(() => randomBytes(32));
  const [userId, setUserId] = useState<Uint8Array>(() => randomBytes(16));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = <K extends keyof CreateConfig>(key: K, value: CreateConfig[K]) =>
    setConfig((c) => ({ ...c, [key]: value }));

  const handleCreate = async () => {
    setBusy(true);
    setError(null);
    try {
      const options = buildCreationOptions(config, challenge, userId, rpId);
      const cred = (await navigator.credentials.create({ publicKey: options })) as PublicKeyCredential;
      const resp = cred.response as AuthenticatorAttestationResponse;
      const attestationObject = bufToB64url(new Uint8Array(resp.attestationObject));
      const clientDataJSON = bufToB64url(new Uint8Array(resp.clientDataJSON));
      const inspection = await inspectCredential(attestationObject, clientDataJSON);
      if (!inspection.publicKeyJwk || !inspection.credentialId || inspection.alg === null) {
        throw new Error('The authenticator returned no attested credential data.');
      }
      const record: StoredCredential = {
        credentialId: inspection.credentialId,
        userName: config.userName,
        alg: inspection.alg,
        publicKeyJwk: inspection.publicKeyJwk,
        transports: resp.getTransports?.() ?? [],
        createdAt: new Date().toISOString(),
        signCount: inspection.signCount,
        attestationObject,
        clientDataJSON,
        options: {
          attachment: config.attachment || 'unset',
          userVerification: config.userVerification,
          residentKey: config.residentKey,
          attestation: config.attestation,
        },
      };
      onCreated(record, inspection);
      setChallenge(randomBytes(32));
      setUserId(randomBytes(16));
    } catch (err) {
      setError(explainWebAuthnError(err, 'create'));
    } finally {
      setBusy(false);
    }
  };

  return (
    <Panel step={1} title="Create a passkey">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm">
          <span className="mb-1 block font-medium text-slate-700">User name</span>
          <input
            className={INPUT_CLS}
            value={config.userName}
            onChange={(e) => set('userName', e.target.value)}
          />
        </label>
        <label className="text-sm">
          <span className="mb-1 block font-medium text-slate-700">Authenticator attachment</span>
          <select
            className={INPUT_CLS}
            value={config.attachment}
            onChange={(e) => set('attachment', e.target.value as CreateConfig['attachment'])}
          >
            <option value="">unset (any authenticator)</option>
            <option value="platform">platform (this device)</option>
            <option value="cross-platform">cross-platform (security key / phone)</option>
          </select>
        </label>
        <label className="text-sm">
          <span className="mb-1 block font-medium text-slate-700">User verification</span>
          <select
            className={INPUT_CLS}
            value={config.userVerification}
            onChange={(e) => set('userVerification', e.target.value as CreateConfig['userVerification'])}
          >
            <option value="preferred">preferred (default)</option>
            <option value="required">required</option>
            <option value="discouraged">discouraged</option>
          </select>
        </label>
        <label className="text-sm">
          <span className="mb-1 block font-medium text-slate-700">Resident key (discoverable)</span>
          <select
            className={INPUT_CLS}
            value={config.residentKey}
            onChange={(e) => set('residentKey', e.target.value as CreateConfig['residentKey'])}
          >
            <option value="preferred">preferred (default)</option>
            <option value="required">required</option>
            <option value="discouraged">discouraged</option>
          </select>
        </label>
        <label className="text-sm">
          <span className="mb-1 block font-medium text-slate-700">Attestation</span>
          <select
            className={INPUT_CLS}
            value={config.attestation}
            onChange={(e) => set('attestation', e.target.value as CreateConfig['attestation'])}
          >
            <option value="none">none (default)</option>
            <option value="direct">direct</option>
          </select>
        </label>
        <label className="flex items-center gap-2 self-end pb-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={config.includeRs256}
            onChange={(e) => set('includeRs256', e.target.checked)}
          />
          Also offer RS256 (−257) — ES256 (−7) is always included
        </label>
      </div>

      <details className="mt-4" open>
        <summary className="cursor-pointer select-none text-sm font-medium text-slate-700">
          PublicKeyCredentialCreationOptions (updates live)
        </summary>
        <JsonView value={creationOptionsPreview(config, challenge, userId, rpId)} />
      </details>

      {error && (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>
      )}

      <button
        type="button"
        onClick={handleCreate}
        disabled={busy || !config.userName.trim()}
        className="mt-4 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {busy ? 'Waiting for your authenticator…' : 'Create a passkey'}
      </button>
    </Panel>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npm run check`
Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/widgets/passkey-demo/components/CreatePanel.tsx
git commit -m "feat(passkey-demo): create-passkey panel with live options JSON"
```

---

### Task 12: InspectPanel (panel 2)

**Files:**
- Create: `src/components/widgets/passkey-demo/components/InspectPanel.tsx`

- [ ] **Step 1: Write the component**

```tsx
// src/components/widgets/passkey-demo/components/InspectPanel.tsx
import type { ReactNode } from 'react';
import Panel from './Panel';
import JsonView from './JsonView';
import CopyField from './CopyField';
import FlagBadges from './FlagBadges';
import type { CredentialInspection } from '../lib/inspect';

interface Props {
  inspection: CredentialInspection | null;
  error: string | null;
}

function Row({ name, children }: { name: string; children: ReactNode }) {
  return (
    <div className="flex items-baseline gap-2">
      <dt className="w-28 shrink-0 font-medium text-slate-600">{name}</dt>
      <dd className="min-w-0">{children}</dd>
    </div>
  );
}

export default function InspectPanel({ inspection, error }: Props) {
  return (
    <Panel step={2} title="Inspect the credential">
      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>
      )}
      {!inspection && !error && (
        <p className="text-sm text-slate-500">
          Create a passkey above — or pick one from “Your demo passkeys” below — and the decoded credential
          shows up here.
        </p>
      )}
      {inspection && (
        <div className="flex flex-col gap-5">
          <div>
            <h4 className="mb-1 text-sm font-semibold text-slate-900">clientDataJSON (decoded)</h4>
            <JsonView value={inspection.clientData} />
          </div>

          <div>
            <h4 className="mb-2 text-sm font-semibold text-slate-900">attestationObject (CBOR-decoded)</h4>
            <dl className="flex flex-col gap-2 text-sm">
              <Row name="fmt">
                <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">{inspection.fmt}</code>
                <span className="ml-2 text-xs text-slate-500">
                  A real server may validate the attestation statement further; this demo displays it only.
                </span>
              </Row>
              <Row name="flags">
                <FlagBadges flags={inspection.flags} />
              </Row>
              <Row name="signCount">{inspection.signCount}</Row>
              <Row name="AAGUID">
                <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">{inspection.aaguid ?? 'n/a'}</code>
                {inspection.aaguid && (
                  <span className="ml-2 text-xs text-slate-500">
                    {inspection.aaguidName ?? 'Unknown authenticator'}
                  </span>
                )}
              </Row>
            </dl>
            <div className="mt-3 flex flex-col gap-2">
              <CopyField label="rpIdHash" value={inspection.rpIdHash} />
              {inspection.credentialId && <CopyField label="credentialId" value={inspection.credentialId} />}
            </div>
          </div>

          {inspection.publicKeyJwk && (
            <div>
              <h4 className="mb-1 text-sm font-semibold text-slate-900">
                Public key (JWK{inspection.alg !== null && <> — COSE alg {inspection.alg}</>})
              </h4>
              <JsonView value={inspection.publicKeyJwk} />
              {inspection.publicKeyPem && (
                <>
                  <h4 className="mb-1 mt-3 text-sm font-semibold text-slate-900">Public key (PEM)</h4>
                  <JsonView value={inspection.publicKeyPem} />
                </>
              )}
              <p className="mt-2 text-xs text-slate-500">
                Want to generate and convert keys like this?{' '}
                <a className="underline" href="/tools/jwk-generator">
                  Try our JWK Generator
                </a>
                .
              </p>
            </div>
          )}
        </div>
      )}
    </Panel>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npm run check`
Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/widgets/passkey-demo/components/InspectPanel.tsx
git commit -m "feat(passkey-demo): credential inspector panel"
```

---

### Task 13: SignInPanel (panel 3) + CredentialList

**Files:**
- Create: `src/components/widgets/passkey-demo/components/SignInPanel.tsx`
- Create: `src/components/widgets/passkey-demo/components/CredentialList.tsx`

- [ ] **Step 1: Write SignInPanel**

```tsx
// src/components/widgets/passkey-demo/components/SignInPanel.tsx
import { useState } from 'react';
import Panel from './Panel';
import { b64urlToBuf, bufToB64url } from '../lib/base64url';
import { explainWebAuthnError } from '../lib/errors';
import { verifyAssertion, type AssertionVerification } from '../lib/verifyAssertion';
import type { StoredCredential } from '../lib/storage';

interface Props {
  rpId: string;
  credentials: StoredCredential[];
  onVerified: (credentialId: string, newSignCount: number) => void;
}

const INPUT_CLS = 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800';

export default function SignInPanel({ rpId, credentials, onVerified }: Props) {
  const [discoverable, setDiscoverable] = useState(false);
  const [userVerification, setUserVerification] = useState<UserVerificationRequirement>('preferred');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ verification: AssertionVerification; userName: string } | null>(null);

  const handleSignIn = async () => {
    setBusy(true);
    setError(null);
    setResult(null);
    try {
      const challenge = crypto.getRandomValues(new Uint8Array(32));
      const assertion = (await navigator.credentials.get({
        publicKey: {
          challenge,
          rpId,
          userVerification,
          allowCredentials: discoverable
            ? []
            : credentials.map((c) => ({ type: 'public-key' as const, id: b64urlToBuf(c.credentialId) })),
          timeout: 60000,
        },
      })) as PublicKeyCredential;
      const resp = assertion.response as AuthenticatorAssertionResponse;
      const credentialId = bufToB64url(new Uint8Array(assertion.rawId));
      const credential = credentials.find((c) => c.credentialId === credentialId);
      if (!credential) {
        throw new Error(
          'You signed in with a passkey this page has no record of — it was probably created in another browser session, or its record was cleared. Without the stored public key the signature cannot be verified. Create a new passkey above and try again.',
        );
      }
      const verification = await verifyAssertion({
        expectedChallenge: bufToB64url(challenge),
        expectedOrigin: window.location.origin,
        expectedRpId: rpId,
        requestedUserVerification: userVerification,
        clientDataJSON: new Uint8Array(resp.clientDataJSON),
        authenticatorData: new Uint8Array(resp.authenticatorData),
        signature: new Uint8Array(resp.signature),
        credential,
      });
      onVerified(credentialId, verification.newSignCount);
      setResult({ verification, userName: credential.userName });
    } catch (err) {
      setError(
        err instanceof DOMException
          ? explainWebAuthnError(err, 'get')
          : err instanceof Error
            ? err.message
            : String(err),
      );
    } finally {
      setBusy(false);
    }
  };

  const disabled = busy || (!discoverable && credentials.length === 0);

  return (
    <Panel step={3} title="Sign in with it">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm">
          <span className="mb-1 block font-medium text-slate-700">Credential selection</span>
          <select
            className={INPUT_CLS}
            value={discoverable ? 'discoverable' : 'allow-list'}
            onChange={(e) => setDiscoverable(e.target.value === 'discoverable')}
          >
            <option value="allow-list">allowCredentials from this page’s stored passkeys</option>
            <option value="discoverable">empty allowCredentials (discoverable-credential flow)</option>
          </select>
        </label>
        <label className="text-sm">
          <span className="mb-1 block font-medium text-slate-700">User verification</span>
          <select
            className={INPUT_CLS}
            value={userVerification}
            onChange={(e) => setUserVerification(e.target.value as UserVerificationRequirement)}
          >
            <option value="preferred">preferred (default)</option>
            <option value="required">required</option>
            <option value="discouraged">discouraged</option>
          </select>
        </label>
      </div>

      {!discoverable && credentials.length === 0 && (
        <p className="mt-3 text-sm text-slate-500">
          No stored demo passkeys yet — create one in panel 1, or switch to the discoverable-credential flow.
        </p>
      )}

      {error && (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>
      )}

      <button
        type="button"
        onClick={handleSignIn}
        disabled={disabled}
        className="mt-4 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {busy ? 'Waiting for your authenticator…' : 'Sign in with your passkey'}
      </button>

      {result && (
        <div className="mt-5">
          <p className="text-sm text-slate-700">
            Signed in as <strong>{result.userName}</strong>. Here is each check a real server would run:
          </p>
          <ul className="mt-3 flex flex-col gap-2">
            {result.verification.steps.map((s) => (
              <li key={s.id} className="flex items-start gap-3 rounded-lg border border-slate-200 p-3">
                <span
                  className={`mt-0.5 shrink-0 rounded px-2 py-0.5 text-xs font-semibold ${
                    s.info
                      ? 'bg-sky-50 text-sky-700'
                      : s.pass
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-red-50 text-red-700'
                  }`}
                >
                  {s.info ? 'INFO' : s.pass ? 'PASS' : 'FAIL'}
                </span>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-slate-900">{s.label}</div>
                  <div className="mt-0.5 text-xs text-slate-500">{s.detail}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Panel>
  );
}
```

- [ ] **Step 2: Write CredentialList**

```tsx
// src/components/widgets/passkey-demo/components/CredentialList.tsx
import type { StoredCredential } from '../lib/storage';

interface Props {
  credentials: StoredCredential[];
  onInspect: (credential: StoredCredential) => void;
  onDelete: (credentialId: string) => void;
  onClearAll: () => void;
}

function algLabel(alg: number): string {
  return alg === -7 ? 'ES256' : alg === -257 ? 'RS256' : `COSE ${alg}`;
}

export default function CredentialList({ credentials, onInspect, onDelete, onClearAll }: Props) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">Your demo passkeys</h3>
        {credentials.length > 0 && (
          <button
            type="button"
            onClick={onClearAll}
            className="rounded border border-slate-300 px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50"
          >
            Clear all
          </button>
        )}
      </div>

      {credentials.length === 0 ? (
        <p className="mt-3 text-sm text-slate-500">No demo passkeys yet — create one in panel 1.</p>
      ) : (
        <ul className="mt-4 flex flex-col gap-3">
          {credentials.map((c) => (
            <li
              key={c.credentialId}
              className="flex flex-wrap items-center gap-3 rounded-lg border border-slate-200 p-3"
            >
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium text-slate-900">
                  {c.userName}{' '}
                  <span className="ml-1 rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs text-slate-600">
                    {algLabel(c.alg)}
                  </span>
                </div>
                <div className="mt-0.5 truncate text-xs text-slate-500">
                  created {new Date(c.createdAt).toLocaleString()} · uv={c.options.userVerification} · rk=
                  {c.options.residentKey} · transports: {c.transports.join(', ') || 'n/a'}
                </div>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => onInspect(c)}
                  className="rounded border border-slate-300 px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50"
                >
                  Inspect
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(c.credentialId)}
                  className="rounded border border-red-200 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-4 text-xs text-slate-500">
        Deleting here removes only this page’s record (kept in your browser’s localStorage). The passkey itself
        stays in your keychain or password manager until you remove it there — see the FAQ below for per-OS
        instructions.
      </p>
    </section>
  );
}
```

- [ ] **Step 3: Typecheck**

Run: `npm run check`
Expected: 0 errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/widgets/passkey-demo/components/SignInPanel.tsx src/components/widgets/passkey-demo/components/CredentialList.tsx
git commit -m "feat(passkey-demo): sign-in panel with verification steps and credential list"
```

---

### Task 14: Widget root, CSS reset, barrel

**Files:**
- Create: `src/components/widgets/passkey-demo/PasskeyDemoWidget.tsx`
- Create: `src/components/widgets/passkey-demo/passkey-demo.css`
- Create: `src/components/widgets/passkey-demo/index.ts`

- [ ] **Step 1: Write the root component**

```tsx
// src/components/widgets/passkey-demo/PasskeyDemoWidget.tsx
import { useState } from 'react';
import CreatePanel from './components/CreatePanel';
import InspectPanel from './components/InspectPanel';
import SignInPanel from './components/SignInPanel';
import CredentialList from './components/CredentialList';
import { useCredentialStore } from './hooks/useCredentialStore';
import { useFeatureDetection } from './hooks/useFeatureDetection';
import { inspectCredential, type CredentialInspection } from './lib/inspect';
import type { StoredCredential } from './lib/storage';
import './passkey-demo.css';

export default function PasskeyDemoWidget() {
  const features = useFeatureDetection();
  const store = useCredentialStore();
  const [inspection, setInspection] = useState<CredentialInspection | null>(null);
  const [inspectError, setInspectError] = useState<string | null>(null);

  const handleCreated = (record: StoredCredential, insp: CredentialInspection) => {
    store.add(record);
    setInspection(insp);
    setInspectError(null);
  };

  const handleInspectStored = async (record: StoredCredential) => {
    try {
      setInspection(await inspectCredential(record.attestationObject, record.clientDataJSON));
      setInspectError(null);
    } catch (err) {
      setInspection(null);
      setInspectError(err instanceof Error ? err.message : String(err));
    }
  };

  // SSR and pre-mount: render a stable placeholder so hydration is clean.
  if (!features.checked) {
    return (
      <div
        data-testid="passkey-demo-widget"
        className="mx-auto w-full max-w-3xl p-8 text-center font-sans text-sm text-slate-500"
      >
        Checking WebAuthn support…
      </div>
    );
  }

  if (!features.webauthn) {
    return (
      <div
        data-testid="passkey-demo-widget"
        className="mx-auto w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 font-sans text-slate-800"
      >
        <h3 className="mb-2 text-lg font-semibold">Your browser doesn’t support WebAuthn</h3>
        <p className="text-sm text-slate-600">
          This demo needs the WebAuthn API (<code>window.PublicKeyCredential</code>), which isn’t available
          here. Try a current version of Chrome, Edge, Safari, or Firefox — the supported-platforms section
          below shows where passkeys work.
        </p>
      </div>
    );
  }

  const rpId = window.location.hostname;

  return (
    <div
      data-testid="passkey-demo-widget"
      className="mx-auto flex w-full max-w-3xl flex-col gap-6 font-sans text-slate-800"
    >
      <div className="flex flex-wrap gap-2 text-xs">
        <FeatureBadge label="Platform authenticator" state={features.platformAuthenticator} />
        <FeatureBadge label="Conditional mediation (autofill UI)" state={features.conditionalMediation} />
      </div>
      <CreatePanel rpId={rpId} onCreated={handleCreated} />
      <InspectPanel inspection={inspection} error={inspectError} />
      <SignInPanel rpId={rpId} credentials={store.credentials} onVerified={store.updateSignCount} />
      <CredentialList
        credentials={store.credentials}
        onInspect={handleInspectStored}
        onDelete={store.remove}
        onClearAll={store.clear}
      />
    </div>
  );
}

function FeatureBadge({ label, state }: { label: string; state: boolean | null }) {
  const cls = state
    ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
    : 'border-slate-200 bg-slate-50 text-slate-500';
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 ${cls}`}>
      {label}: {state === null ? 'unknown' : state ? 'available' : 'unavailable'}
    </span>
  );
}
```

- [ ] **Step 2: Write the CSS reset and barrel**

```css
/* src/components/widgets/passkey-demo/passkey-demo.css */
/* Reset Webflow's global rules that bleed into the widget so Tailwind
   utility classes drive every visual decision from inside the JSX
   (same approach as password-hash.css). Class-name collisions are avoided
   because the widget uses Tailwind utilities, not generic class names. */
[data-testid='passkey-demo-widget'] label {
  color: inherit;
  margin-bottom: 0;
  font-weight: inherit;
  line-height: inherit;
  display: block;
}

[data-testid='passkey-demo-widget'] ul {
  margin: 0;
  padding-left: 0;
  list-style: none;
}

[data-testid='passkey-demo-widget'] h3,
[data-testid='passkey-demo-widget'] h4 {
  margin-top: 0;
  margin-bottom: 0;
}
```

```ts
// src/components/widgets/passkey-demo/index.ts
export { default } from './PasskeyDemoWidget';
```

- [ ] **Step 3: Run the webflow collision check**

Run:
```bash
grep -roE 'className="[^"]*"' src/components/widgets/passkey-demo \
  | grep -oE '[a-z][a-z0-9-]+' | sort -u \
  | while read c; do grep -q "^\.${c} {" public/css/authgear-new.webflow.css && echo "collision: .${c}"; done
```
Expected: no output (Tailwind utility names don't appear as top-level classes in webflow.css). If any collision prints, add a reset for it in `passkey-demo.css` per `docs/tool-pages.md`.

- [ ] **Step 4: Typecheck**

Run: `npm run check`
Expected: 0 errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/widgets/passkey-demo/PasskeyDemoWidget.tsx src/components/widgets/passkey-demo/passkey-demo.css src/components/widgets/passkey-demo/index.ts
git commit -m "feat(passkey-demo): widget root with feature detection"
```

---

### Task 15: Message bundles (en + zh-Hant)

**Files:**
- Create: `src/lib/tools/messages/en/passkeyDemo.ts`
- Create: `src/lib/tools/messages/zh-Hant/passkeyDemo.ts`
- Modify: `src/lib/tools/messages/en/index.ts`
- Modify: `src/lib/tools/messages/zh-Hant/index.ts`

- [ ] **Step 1: Write the English bundle**

```ts
// src/lib/tools/messages/en/passkeyDemo.ts
export const passkeyDemo = {
  metaTitle: 'Passkey Demo & WebAuthn Tester — Try Passkeys in Your Browser',
  metaDescription:
    'Create a real passkey, inspect the WebAuthn credential, and verify a sign-in — all locally in your browser. Nothing is transmitted or stored on any server.',
  heroTitle: 'Passkey Demo & WebAuthn Tester',
  heroDescription:
    'Create a real passkey with the WebAuthn API, inspect the credential it returns — clientDataJSON, the CBOR attestation object, authenticator flags, AAGUID, and the public key — then sign in with it and watch every verification step a server would run. All computation happens locally in your browser with WebCrypto: no account needed, and nothing is transmitted or stored outside your device.',
  iframeTitle: 'Passkey Demo & WebAuthn Tester',
  policyPrefix:
    'Your data security is our top priority. Passkey creation, credential inspection, and signature verification all happen entirely in your browser using the WebAuthn and WebCrypto APIs — there is no backend. This tool does not transmit or store anything outside of your device. See source code in: ',
  policyLink: 'https://github.com/oursky/authgear-web',
  howSectionTitle: 'How the Passkey Demo Works',
  step1Title: 'Choose Creation Options:',
  step1Body:
    'Pick authenticator attachment, user verification, resident key, attestation, and algorithms — the PublicKeyCredentialCreationOptions JSON updates live as you change them.',
  step2Title: 'Create a Passkey:',
  step2Body:
    'The browser calls navigator.credentials.create() and your device prompts for Face ID, Touch ID, Windows Hello, or a security key.',
  step3Title: 'Inspect the Credential:',
  step3Body:
    'The tool decodes clientDataJSON and CBOR-decodes the attestation object — flags, sign count, AAGUID (the authenticator model), credential ID, and the public key as JWK and PEM.',
  step4Title: 'Sign In With It:',
  step4Body:
    'navigator.credentials.get() produces an assertion — from your stored credential list, or via the discoverable-credential flow with an empty allow-list.',
  step5Title: 'Verify Like a Server:',
  step5Body:
    'Each check a real server runs — ceremony type, challenge, origin, RP ID hash, flags, and the WebCrypto signature verification — gets a pass/fail badge with an explanation.',
  howGuideText: 'Ready to add passkeys to your own app?',
  howGuideLinkText: 'Read the developer guide to implementing passkeys',
  howGuideHref: '/post/how-to-implement-passkeys-developer-guide',
  platformsTitle: 'Supported Platforms',
  platformsIntro:
    'Passkeys work across every major platform and sync within each ecosystem. This demo runs in any browser with WebAuthn support.',
  plat1Name: 'Apple',
  plat1Desc: 'iOS 16+, macOS 13+ — Face ID / Touch ID, synced via iCloud Keychain.',
  plat2Name: 'Android & Chrome',
  plat2Desc: 'Android 9+ — fingerprint or screen lock, synced via Google Password Manager.',
  plat3Name: 'Windows',
  plat3Desc: 'Windows 10/11 — Windows Hello face, fingerprint, or PIN.',
  plat4Name: 'Password Managers',
  plat4Desc: '1Password, Bitwarden, Dashlane, Proton Pass and others store and sync passkeys cross-platform.',
  plat5Name: 'Security Keys',
  plat5Desc: 'YubiKey and other FIDO2 hardware keys work via the cross-platform (USB/NFC) transport.',
  readyTitle: 'Ready to Ship Passkeys in Your Own App?',
  readySubtitle: 'Authgear gives you passkey login out of the box — no WebAuthn plumbing required.',
  readyCta: 'Explore Authgear Passkeys',
  faqWebauthnTitle: 'What is WebAuthn?',
  faqWebauthnBody:
    'WebAuthn (Web Authentication) is the W3C standard browser API behind passkeys. Instead of a shared password, your device creates a public/private key pair per site: the private key never leaves your authenticator, and the site stores only the public key. Sign-in is a challenge–response signature, which is why passkeys are phishing-resistant — the browser binds every credential to the exact origin that created it.',
  faqWebauthnLinkText: 'See our developer guide to implementing passkeys.',
  faqWebauthnLinkHref: '/post/how-to-implement-passkeys-developer-guide',
  faqSafeTitle: 'Is it safe to create a passkey here?',
  faqSafeBody:
    'Yes. The passkey this page creates is real, but it is scoped to this site only and useful for nothing but this demo. The private key stays in your device’s authenticator; the public key and credential metadata are kept only in your browser’s localStorage. There is no server — nothing is transmitted anywhere. You can delete the demo record with one click and remove the passkey itself from your device at any time.',
  faqDeleteTitle: 'How do I delete the demo passkey from my device?',
  faqDeleteIntro:
    'The “Delete” button in the tool only removes this page’s record. To remove the passkey from your device:',
  faqDeleteIos: 'iOS / macOS: Settings → Passwords (or the Passwords app) → find this site → delete the passkey.',
  faqDeleteAndroid: 'Android / Chrome: Google Password Manager → Passwords → find this site → delete.',
  faqDeleteWindows: 'Windows: Settings → Accounts → Passkeys → find this site → remove.',
  faqDeleteManagers: 'Password managers (1Password, Bitwarden, …): find the item for this site and delete it there.',
  faqAaguidTitle: 'What is an AAGUID?',
  faqAaguidBody:
    'The AAGUID (Authenticator Attestation Globally Unique Identifier) is a 16-byte ID that identifies the authenticator model — e.g. Google Password Manager or a YubiKey 5 — not your individual device. This tool resolves it against a bundled snapshot of the community-maintained passkey-authenticator-aaguids list. With attestation set to “none” (the default), many authenticators zero it out for privacy.',
  faqSignCountTitle: 'Why does the sign count show 0?',
  faqSignCountBody:
    'The signature counter was designed to detect cloned credentials: each use should increment it. But a synced passkey lives on several devices at once and can’t maintain one shared counter, so most passkey providers — iCloud Keychain, Google Password Manager — always report 0, meaning “counter not supported”. Hardware security keys usually do increment it.',
} as const;
```

- [ ] **Step 2: Write the zh-Hant bundle**

Use **通行密鑰** consistently for "passkey" (the spec calls this out — do not mix 金鑰/密鑰).

```ts
// src/lib/tools/messages/zh-Hant/passkeyDemo.ts
export const passkeyDemo = {
  metaTitle: '通行密鑰示範與 WebAuthn 測試工具 — 在瀏覽器中試用通行密鑰',
  metaDescription:
    '建立真正的通行密鑰、檢視 WebAuthn 憑證內容，並驗證一次登入 — 全部在你的瀏覽器本機完成，不會傳送或儲存到任何伺服器。',
  heroTitle: '通行密鑰示範與 WebAuthn 測試工具',
  heroDescription:
    '使用 WebAuthn API 建立真正的通行密鑰，檢視回傳的憑證內容 — clientDataJSON、CBOR 編碼的 attestation object、驗證器旗標、AAGUID 與公開金鑰 — 然後用它登入，逐項觀察伺服器會執行的每個驗證步驟。所有運算都透過 WebCrypto 在你的瀏覽器本機完成：無需帳號，任何資料都不會離開你的裝置。',
  iframeTitle: '通行密鑰示範與 WebAuthn 測試工具',
  policyPrefix:
    '你的資料安全是我們的首要考量。通行密鑰的建立、憑證檢視與簽章驗證全部透過 WebAuthn 與 WebCrypto API 在瀏覽器內完成 — 沒有任何後端伺服器。此工具不會將任何資料傳送或儲存到你的裝置之外。原始碼請見：',
  policyLink: 'https://github.com/oursky/authgear-web',
  howSectionTitle: '通行密鑰示範工具的運作方式',
  step1Title: '選擇建立選項：',
  step1Body:
    '設定驗證器類型、使用者驗證、可探索憑證、attestation 與演算法 — PublicKeyCredentialCreationOptions JSON 會隨設定即時更新。',
  step2Title: '建立通行密鑰：',
  step2Body:
    '瀏覽器呼叫 navigator.credentials.create()，你的裝置會跳出 Face ID、Touch ID、Windows Hello 或安全金鑰的提示。',
  step3Title: '檢視憑證內容：',
  step3Body:
    '工具會解碼 clientDataJSON 並以 CBOR 解析 attestation object — 旗標、簽章計數、AAGUID（驗證器型號）、憑證 ID，以及 JWK 與 PEM 格式的公開金鑰。',
  step4Title: '用它登入：',
  step4Body:
    'navigator.credentials.get() 產生斷言（assertion）— 可使用已儲存的憑證清單，或以空的 allowCredentials 走可探索憑證流程。',
  step5Title: '像伺服器一樣驗證：',
  step5Body:
    '伺服器會執行的每項檢查 — 流程類型、challenge、來源、RP ID 雜湊、旗標，以及 WebCrypto 簽章驗證 — 都會以通過/失敗徽章呈現並附上說明。',
  howGuideText: '準備好在自己的應用程式加入通行密鑰了嗎？',
  howGuideLinkText: '閱讀通行密鑰實作開發者指南',
  howGuideHref: '/post/how-to-implement-passkeys-developer-guide',
  platformsTitle: '支援平台',
  platformsIntro: '通行密鑰支援所有主流平台，並在各生態系內同步。此示範可在任何支援 WebAuthn 的瀏覽器中執行。',
  plat1Name: 'Apple',
  plat1Desc: 'iOS 16+、macOS 13+ — Face ID / Touch ID，透過 iCloud 鑰匙圈同步。',
  plat2Name: 'Android 與 Chrome',
  plat2Desc: 'Android 9+ — 指紋或螢幕鎖定，透過 Google 密碼管理員同步。',
  plat3Name: 'Windows',
  plat3Desc: 'Windows 10/11 — Windows Hello 臉部辨識、指紋或 PIN。',
  plat4Name: '密碼管理員',
  plat4Desc: '1Password、Bitwarden、Dashlane、Proton Pass 等可跨平台儲存並同步通行密鑰。',
  plat5Name: '安全金鑰',
  plat5Desc: 'YubiKey 等 FIDO2 硬體金鑰可透過跨平台（USB/NFC）傳輸方式使用。',
  readyTitle: '準備在你的應用程式中提供通行密鑰登入？',
  readySubtitle: 'Authgear 內建通行密鑰登入功能 — 無需自行處理 WebAuthn 細節。',
  readyCta: '探索 Authgear 通行密鑰功能',
  faqWebauthnTitle: '什麼是 WebAuthn？',
  faqWebauthnBody:
    'WebAuthn（Web Authentication）是通行密鑰背後的 W3C 標準瀏覽器 API。它不使用共享密碼，而是讓你的裝置為每個網站建立一組公私金鑰對：私鑰永遠不會離開你的驗證器，網站只儲存公開金鑰。登入是一次 challenge–response 簽章，且瀏覽器會將每個憑證綁定到建立它的網域 — 這正是通行密鑰能防範網路釣魚的原因。',
  faqWebauthnLinkText: '請參閱我們的通行密鑰實作開發者指南。',
  faqWebauthnLinkHref: '/post/how-to-implement-passkeys-developer-guide',
  faqSafeTitle: '在這裡建立通行密鑰安全嗎？',
  faqSafeBody:
    '安全。此頁面建立的是真正的通行密鑰，但它只對本網站有效，除了這個示範之外沒有任何用途。私鑰保存在你裝置的驗證器中；公開金鑰與憑證中繼資料只存在你瀏覽器的 localStorage。沒有伺服器 — 任何資料都不會被傳送。你可以一鍵刪除示範紀錄，並隨時從裝置中移除通行密鑰本身。',
  faqDeleteTitle: '如何從裝置中刪除示範通行密鑰？',
  faqDeleteIntro: '工具中的「Delete」按鈕只會移除此頁面的紀錄。要從裝置中移除通行密鑰本身：',
  faqDeleteIos: 'iOS / macOS：「設定」→「密碼」（或「密碼」App）→ 找到本網站 → 刪除該通行密鑰。',
  faqDeleteAndroid: 'Android / Chrome：Google 密碼管理員 →「密碼」→ 找到本網站 → 刪除。',
  faqDeleteWindows: 'Windows：「設定」→「帳戶」→「密碼金鑰」→ 找到本網站 → 移除。',
  faqDeleteManagers: '密碼管理員（1Password、Bitwarden 等）：在其中找到本網站的項目並刪除。',
  faqAaguidTitle: '什麼是 AAGUID？',
  faqAaguidBody:
    'AAGUID（Authenticator Attestation Globally Unique Identifier）是一組 16 位元組的識別碼，用來標示驗證器的「型號」— 例如 Google 密碼管理員或 YubiKey 5 — 而非你的個別裝置。此工具使用社群維護的 passkey-authenticator-aaguids 清單快照進行比對。當 attestation 設為「none」（預設值）時，許多驗證器會基於隱私將其歸零。',
  faqSignCountTitle: '為什麼簽章計數顯示為 0？',
  faqSignCountBody:
    '簽章計數器的設計目的是偵測被複製的憑證：每次使用都應遞增。但同步的通行密鑰同時存在於多部裝置上，無法維持單一共享計數器，因此大多數通行密鑰供應商 — iCloud 鑰匙圈、Google 密碼管理員 — 一律回報 0，代表「不支援計數器」。硬體安全金鑰通常仍會遞增。',
} as const;
```

- [ ] **Step 3: Register both bundles in the aggregators**

In `src/lib/tools/messages/en/index.ts` add (keeping alphabetical order):

```ts
import { passkeyDemo } from './passkeyDemo';
```
and inside `toolsMessagesEn`, after `oidc,`:
```ts
  passkeyDemo,
```

Mirror exactly the same two edits in `src/lib/tools/messages/zh-Hant/index.ts` (the const there is `toolsMessagesZhHant` — match the existing structure of that file).

- [ ] **Step 4: Typecheck**

Run: `npm run check`
Expected: 0 errors.

- [ ] **Step 5: Commit**

```bash
git add src/lib/tools/messages/en/passkeyDemo.ts src/lib/tools/messages/zh-Hant/passkeyDemo.ts src/lib/tools/messages/en/index.ts src/lib/tools/messages/zh-Hant/index.ts
git commit -m "feat(passkey-demo): en + zh-Hant message bundles"
```

---

### Task 16: ToolReadyTo CTA override + page component

**Files:**
- Modify: `src/components/tools/ToolReadyTo.tsx`
- Create: `src/components/pages/tools/PasskeyDemoPage.tsx`

- [ ] **Step 1: Extend ToolReadyTo with optional href/ctaLabel (backwards-compatible)**

In `src/components/tools/ToolReadyTo.tsx`, change the Props type and the anchor:

```tsx
type Props = {
  locale: string;
  title?: string;
  subtitle?: string;
  href?: string;
  ctaLabel?: string;
};

export default function ToolReadyTo({ locale, title, subtitle, href, ctaLabel }: Props) {
```

and replace the `<a …>` element with:

```tsx
        <a
          href={href ?? 'https://accounts.portal.authgear.com/signup'}
          className="gallery-button gallery-page-button w-button"
        >
          {ctaLabel ?? t('getStartedFree')}
        </a>
```

All existing callers pass neither prop, so nothing else changes.

- [ ] **Step 2: Write the page component**

```tsx
// src/components/pages/tools/PasskeyDemoPage.tsx
import { t as tFn } from '@/i18n';
import { localizedPath } from '@/lib/i18n';
import ToolHero from '@/components/tools/ToolHero';
import ToolWidget from '@/components/tools/ToolWidget';
import MoreDevTools from '@/components/tools/MoreDevTools';
import ToolHowItWorks from '@/components/tools/ToolHowItWorks';
import ToolReadyTo from '@/components/tools/ToolReadyTo';
import ToolFaq, { ToolFaqCard, ToolFaqCheckItem } from '@/components/tools/ToolFaq';
import ToolPopup from '@/components/tools/ToolPopup';
import PasskeyDemoWidget from '@/components/widgets/passkey-demo';

interface Props {
  locale: string;
}

function interpolate(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ''));
}

export default function PasskeyDemoPage({ locale }: Props) {
  const t = (key: string): string => tFn(locale, `Tools.passkeyDemo.${key}`);
  const tCommon = (key: string, vars?: Record<string, string | number>): string => {
    const s = tFn(locale, `Tools.common.${key}`);
    return vars ? interpolate(s, vars) : s;
  };
  const policy = (
    <>
      {t('policyPrefix')}
      <a href={t('policyLink')} target="_blank" rel="noreferrer">
        {t('policyLink')}
      </a>
    </>
  );
  const steps = [1, 2, 3, 4, 5].map((n) => ({
    step: tCommon('stepLabel', { n }),
    title: t(`step${n}Title`),
    body: t(`step${n}Body`),
  }));
  const platforms = [1, 2, 3, 4, 5].map((n) => ({
    name: t(`plat${n}Name`),
    desc: t(`plat${n}Desc`),
  }));
  return (
    <>
      <ToolHero title={t('heroTitle')} description={t('heroDescription')} />
      <ToolWidget locale={locale} iframeTitle={t('iframeTitle')} policy={policy}>
        <PasskeyDemoWidget />
      </ToolWidget>
      <MoreDevTools locale={locale} currentSlug="passkey-demo" />
      <ToolHowItWorks
        sectionTitle={t('howSectionTitle')}
        steps={steps}
        afterSteps={
          <p className="tools-description align-left">
            {t('howGuideText')}{' '}
            <a href={localizedPath(locale, t('howGuideHref'))}>{t('howGuideLinkText')}</a>
          </p>
        }
      />
      <section>
        <div className="container-default">
          <div className="container-default-inner px-0 gap-0 pb-0 horizon-container">
            <div className="top-content feature-flex">
              <h2 className="title features-page-v2 margin-bottom-16 align-left">{t('platformsTitle')}</h2>
              <p className="tools-description align-left">{t('platformsIntro')}</p>
            </div>
            <div className="w-layout-hflex flex-block-80">
              {platforms.map(({ name, desc }) => (
                <div key={name} className="w-layout-vflex algorithms-card">
                  <img src="/images/tools-hmac-supported.svg" loading="lazy" alt="" />
                  <div>{name}</div>
                  <div className="algorithms-description">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <ToolReadyTo
        locale={locale}
        title={t('readyTitle')}
        subtitle={t('readySubtitle')}
        href={localizedPath(locale, '/features/passkeys')}
        ctaLabel={t('readyCta')}
      />
      <ToolFaq>
        <div className="w-layout-vflex tools-faq">
          <ToolFaqCard icon="/images/tools-qa-what-is.svg" title={t('faqWebauthnTitle')}>
            <div className="tools-faq-content">
              {t('faqWebauthnBody')}{' '}
              <a href={localizedPath(locale, t('faqWebauthnLinkHref'))}>{t('faqWebauthnLinkText')}</a>
            </div>
          </ToolFaqCard>
          <ToolFaqCard icon="/images/tools-qa-encryption.svg" title={t('faqSafeTitle')}>
            <div className="tools-faq-content">{t('faqSafeBody')}</div>
          </ToolFaqCard>
          <ToolFaqCard icon="/images/tools-qa-best-practice.svg" title={t('faqDeleteTitle')}>
            <div className="tools-faq-content">{t('faqDeleteIntro')}</div>
            <ToolFaqCheckItem>{t('faqDeleteIos')}</ToolFaqCheckItem>
            <ToolFaqCheckItem>{t('faqDeleteAndroid')}</ToolFaqCheckItem>
            <ToolFaqCheckItem>{t('faqDeleteWindows')}</ToolFaqCheckItem>
            <ToolFaqCheckItem>{t('faqDeleteManagers')}</ToolFaqCheckItem>
          </ToolFaqCard>
          <ToolFaqCard icon="/images/tools-qa-what-is.svg" title={t('faqAaguidTitle')}>
            <div className="tools-faq-content">{t('faqAaguidBody')}</div>
          </ToolFaqCard>
          <ToolFaqCard icon="/images/tools-qa-encryption.svg" title={t('faqSignCountTitle')}>
            <div className="tools-faq-content">{t('faqSignCountBody')}</div>
          </ToolFaqCard>
        </div>
      </ToolFaq>
      <ToolPopup locale={locale} />
    </>
  );
}
```

Before committing, verify the FAQ icon filenames exist (`ls public/images/tools-qa-*.svg`) and that `/features/passkeys` is a real route (`ls src/pages/features/ | grep -i passkey` — if the route has a different name, point the CTA and any links at the actual passkeys feature page path).

- [ ] **Step 3: Typecheck**

Run: `npm run check`
Expected: 0 errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/tools/ToolReadyTo.tsx src/components/pages/tools/PasskeyDemoPage.tsx
git commit -m "feat(passkey-demo): tool page chrome with SEO copy and passkeys CTA"
```

---

### Task 17: Routing, slug registry, icon

**Files:**
- Modify: `src/lib/tools/toolSlugPrefix.ts`
- Modify: `src/lib/tools/tools-registry.ts`
- Modify: `src/lib/tools/messages/en/common.ts`
- Modify: `src/lib/tools/messages/zh-Hant/common.ts`
- Modify: `src/pages/tools/[slug].astro`
- Modify: `src/pages/zh-hant/tools/[slug].astro`
- Create: `public/images/minitools-more-passkey.svg`

- [ ] **Step 1: Register the slug prefix**

In `src/lib/tools/toolSlugPrefix.ts` add to the map (keeping the existing ordering style):

```ts
  'passkey-demo': 'passkeyDemo',
```

- [ ] **Step 2: Add the registry entry**

In `src/lib/tools/tools-registry.ts` append to `TOOLS`:

```ts
  { slug: 'passkey-demo', label: 'Passkey Demo & WebAuthn Tester', icon: '/images/minitools-more-passkey.svg', href: '/tools/passkey-demo' },
```

In `src/lib/tools/messages/en/common.ts` add to `registry`:

```ts
  'passkey-demo': { label: 'Passkey Demo & WebAuthn Tester' },
```

In `src/lib/tools/messages/zh-Hant/common.ts` add to `registry`:

```ts
  'passkey-demo': { label: '通行密鑰示範與 WebAuthn 測試工具' },
```

- [ ] **Step 3: Create the icon**

```xml
<!-- public/images/minitools-more-passkey.svg -->
<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="19" cy="15" r="8" fill="#176DF8"/>
  <path d="M5 41c0-7.732 6.268-14 14-14 2.97 0 5.724.925 7.99 2.503A10.96 10.96 0 0 0 24 36c0 1.79.428 3.48 1.188 4.974L5 41Z" fill="#176DF8"/>
  <circle cx="35" cy="29" r="6" fill="#0F2D71"/>
  <circle cx="35" cy="29" r="2.2" fill="#fff"/>
  <path d="M33.4 34.5h3.2v8.1L35 45l-1.6-2.4 1-1.5-1-1.6v-5Z" fill="#0F2D71"/>
</svg>
```

(Compare visually against the other `minitools-more-*.svg` icons in the MoreDevTools grid during the dev-server check; adjust the viewBox/colors only if it looks out of place.)

- [ ] **Step 4: Wire both slug routes**

In `src/pages/tools/[slug].astro`, make these four edits:

1. Add the import (alphabetical with the others):
```ts
import PasskeyDemoPage from '@/components/pages/tools/PasskeyDemoPage';
```
2. Add `| 'passkey-demo'` to the `ToolSlug` union (after `'oidc-discovery-endpoint'`).
3. Add `'passkey-demo',` to the `getStaticPaths()` array (same position).
4. Add the render branch inside `<BaseLayout>` (after the `oidc-discovery-endpoint` line):
```astro
  {slug === 'passkey-demo' && <PasskeyDemoPage client:load locale={locale} />}
```

Make exactly the same four edits in `src/pages/zh-hant/tools/[slug].astro` (its `locale` is `'zh-Hant'` — leave that as is).

- [ ] **Step 5: Typecheck and smoke-run dev**

Run: `npm run check`
Expected: 0 errors.

Run: `npm run dev`, then `curl -s http://localhost:4321/tools/passkey-demo | grep -o '<h1[^>]*>[^<]*' | head -1`
Expected: the hero H1 containing "Passkey Demo & WebAuthn Tester". Also `curl -s http://localhost:4321/zh-hant/tools/passkey-demo | grep -c '通行密鑰'` returns ≥ 1. Stop the dev server after.

- [ ] **Step 6: Commit**

```bash
git add src/lib/tools/toolSlugPrefix.ts src/lib/tools/tools-registry.ts src/lib/tools/messages/en/common.ts src/lib/tools/messages/zh-Hant/common.ts src/pages/tools/[slug].astro src/pages/zh-hant/tools/[slug].astro public/images/minitools-more-passkey.svg
git commit -m "feat(passkey-demo): register /tools/passkey-demo route in both locales"
```

---

### Task 18: Playwright spec, build, full verification

**Files:**
- Modify: `tests/phase2d2-tools.spec.ts`

- [ ] **Step 1: Add the slug + native-widget assertions**

In `tests/phase2d2-tools.spec.ts`:

1. Add `'passkey-demo',` to the `SLUGS` array (the en + zh loops then cover both routes returning 200).
2. Append at the end of the file:

```ts
test('Passkey demo renders the native widget (not iframe)', async ({ page }) => {
  await page.goto('/tools/passkey-demo');
  await expect(page.locator('h1.tools-h1').first()).toBeVisible();
  await expect(page.locator('[data-testid="passkey-demo-widget"]')).toBeVisible();
});
```

- [ ] **Step 2: Run the unit suite**

Run: `npm run test:unit`
Expected: PASS — all passkey-demo lib tests plus the pre-existing i18n test.

- [ ] **Step 3: Run the tools Playwright spec**

Run: `npx playwright test tests/phase2d2-tools.spec.ts`
Expected: PASS (check `playwright.config.ts` for whether it starts the dev server itself; if not, run `npm run dev` in another shell first).

- [ ] **Step 4: Production build**

Run: `npm run build`
Expected: clean build; `ls dist/tools/passkey-demo/index.html dist/zh-hant/tools/passkey-demo/index.html` both exist; `grep -c 'Passkey Demo' dist/tools/passkey-demo/index.html` ≥ 1.

- [ ] **Step 5: Manual WebAuthn checklist (localhost is a secure context — no special setup)**

With `npm run dev` running, on `http://localhost:4321/tools/passkey-demo`:

1. Feature badges render (platform authenticator / conditional mediation).
2. Toggle every option in panel 1 — the JSON preview updates live; `authenticatorAttachment` disappears when "unset".
3. Create a passkey with Touch ID → panel 2 fills in: clientDataJSON has `type: "webauthn.create"` and `origin: "http://localhost:4321"`; flags show UP/UV/AT (and BE/BS for iCloud-synced); AAGUID resolves to a name (or the attestation-none explanation); JWK + PEM render; copy buttons work.
4. Sign in via allow-list → all 7 verification steps PASS (sign count step shows INFO).
5. Sign in via discoverable flow → also works.
6. Cancel a prompt → friendly NotAllowedError explanation appears.
7. Create a second passkey with the same user name on the same authenticator → InvalidStateError teaching message (if your authenticator triggers it).
8. Reload the page → "Your demo passkeys" persists; Inspect on a stored credential repopulates panel 2; Delete and Clear-all work and the honest-copy line is visible.
9. zh-hant page renders all chrome in zh-Hant with 通行密鑰 used consistently.

Cross-browser minimum bar before launch (from the spec): repeat steps 3–5 in Safari, Chrome, and Firefox, plus one mobile device on the deployed preview.

- [ ] **Step 6: Commit**

```bash
git add tests/phase2d2-tools.spec.ts
git commit -m "test(passkey-demo): cover /tools/passkey-demo routes and native widget"
```

---

## Post-launch follow-ups (separate PRs — not part of this plan)

From the spec's SEO section, after the tool ships:
- "Try it live" callouts linking to `/tools/passkey-demo` from the passkey article cluster: `passkey-vs-password-why-passkeys-are-the-future-of-security`, `how-to-implement-passkeys-developer-guide`, `passkeys-compatibility`, `what-is-fido2-complete-guide-fido-authentication` (all verified present in `src/content/blog-posts/en/`).

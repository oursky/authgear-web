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

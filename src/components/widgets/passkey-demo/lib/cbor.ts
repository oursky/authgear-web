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
  const { value, offset } = readItem(bytes, 0, 0);
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

const MAX_DEPTH = 32;

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

function readItem(b: Uint8Array, o: number, depth = 0): ReadResult {
  if (depth > MAX_DEPTH) throw new Error('CBOR: nesting too deep');
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
        const r = readItem(b, cur, depth + 1);
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
        const k = readItem(b, cur, depth + 1);
        if (typeof k.value !== 'number' && typeof k.value !== 'string') {
          throw new Error('CBOR: only int/string map keys are supported');
        }
        const v = readItem(b, k.offset, depth + 1);
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

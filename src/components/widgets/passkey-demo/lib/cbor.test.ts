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

  it('throws on excessive nesting instead of overflowing the stack', () => {
    // 64 nested single-element arrays around a 0
    const nested = concatBytes(new Uint8Array(64).fill(0x81), cborUint(0));
    expect(() => decode(nested)).toThrow(/deep/i);
  });
});

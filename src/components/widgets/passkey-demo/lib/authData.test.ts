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

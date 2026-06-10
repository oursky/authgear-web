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

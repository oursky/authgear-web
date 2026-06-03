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

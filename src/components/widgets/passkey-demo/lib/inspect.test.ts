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
    // null for the all-zero AAGUID; the UI shows a localized explanation
    expect(inspection.aaguidName).toBeNull();
    expect(inspection.credentialId).toBe(bufToB64url(f.credId));
    expect(inspection.alg).toBe(-7);
    expect(inspection.publicKeyJwk).toEqual({ kty: 'EC', crv: 'P-256', x: f.jwk.x, y: f.jwk.y });
    expect(inspection.publicKeyPem).toMatch(/^-----BEGIN PUBLIC KEY-----/);
  });

  it('throws on a malformed attestation object', async () => {
    await expect(inspectCredential('AAAA', 'AAAA')).rejects.toThrow();
  });
});

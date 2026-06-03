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

  const clientDataHash = new Uint8Array(await crypto.subtle.digest('SHA-256', clientDataJSON as BufferSource));
  const signedData = concatBytes(authenticatorData, clientDataHash);
  const rawSig = new Uint8Array(
    await crypto.subtle.sign({ name: 'ECDSA', hash: 'SHA-256' }, kp.privateKey, signedData as BufferSource),
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

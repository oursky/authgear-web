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

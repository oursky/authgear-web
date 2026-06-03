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

// src/components/widgets/passkey-demo/lib/aaguid.ts
//
// AAGUID → authenticator name, from a bundled snapshot of the community
// passkey-authenticator-aaguids dataset (see scripts/fetch-aaguid-names.mjs).
// Static by design — the spec rules out live FIDO MDS fetching.

import names from './aaguid-names.json';

const ZERO_AAGUID = '00000000-0000-0000-0000-000000000000';

export function formatAaguid(bytes: Uint8Array): string {
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export function aaguidName(aaguid: string): string | null {
  if (aaguid === ZERO_AAGUID) {
    return 'Not provided — attestation "none" zeroes the AAGUID';
  }
  return (names as Record<string, string>)[aaguid] ?? null;
}

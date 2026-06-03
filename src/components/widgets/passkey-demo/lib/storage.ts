// src/components/widgets/passkey-demo/lib/storage.ts
//
// localStorage persistence for demo-passkey metadata. One namespaced key.
// We also keep the raw attestationObject/clientDataJSON (base64url) so the
// inspector panel works for credentials created in earlier visits.

export interface StoredCredential {
  credentialId: string; // base64url
  userName: string;
  alg: number; // COSE alg: -7 ES256 | -257 RS256
  publicKeyJwk: JsonWebKey;
  transports: string[];
  createdAt: string; // ISO timestamp
  signCount: number; // last seen counter
  attestationObject: string; // base64url
  clientDataJSON: string; // base64url (from registration)
  options: {
    attachment: string;
    userVerification: string;
    residentKey: string;
    attestation: string;
  };
}

const STORAGE_KEY = 'authgear.passkey-demo.credentials.v1';

export function loadCredentials(): StoredCredential[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as StoredCredential[]) : [];
  } catch {
    return [];
  }
}

export function saveCredentials(credentials: StoredCredential[]): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(credentials));
  } catch {
    // Storage full or blocked (private browsing) — the demo still works,
    // the credential list just won't survive a reload.
  }
}

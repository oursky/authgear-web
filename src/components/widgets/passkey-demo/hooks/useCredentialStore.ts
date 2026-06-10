import { useEffect, useState } from 'react';
import { loadCredentials, saveCredentials, type StoredCredential } from '../lib/storage';

/**
 * Drop records that don't have the fields the widget relies on — guards
 * against stale/foreign data under the localStorage key (e.g. after a
 * future schema change), which would otherwise surface as confusing
 * WebCrypto errors during verification.
 */
function isUsableRecord(c: StoredCredential): boolean {
  return (
    typeof c === 'object' &&
    c !== null &&
    typeof c.credentialId === 'string' &&
    typeof c.publicKeyJwk === 'object' &&
    c.publicKeyJwk !== null &&
    typeof c.alg === 'number' &&
    typeof c.attestationObject === 'string' &&
    typeof c.clientDataJSON === 'string'
  );
}

export function useCredentialStore() {
  const [credentials, setCredentials] = useState<StoredCredential[]>([]);

  // Load after mount — localStorage doesn't exist during SSR.
  useEffect(() => {
    setCredentials(loadCredentials().filter(isUsableRecord));
  }, []);

  const mutate = (fn: (prev: StoredCredential[]) => StoredCredential[]) =>
    setCredentials((prev) => {
      const next = fn(prev);
      saveCredentials(next);
      return next;
    });

  return {
    credentials,
    add: (c: StoredCredential) =>
      mutate((prev) => [...prev.filter((x) => x.credentialId !== c.credentialId), c]),
    remove: (credentialId: string) =>
      mutate((prev) => prev.filter((x) => x.credentialId !== credentialId)),
    clear: () => mutate(() => []),
    updateSignCount: (credentialId: string, signCount: number) =>
      mutate((prev) => prev.map((x) => (x.credentialId === credentialId ? { ...x, signCount } : x))),
  };
}

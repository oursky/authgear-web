// src/components/widgets/passkey-demo/lib/errors.ts
//
// Turns raw WebAuthn DOMExceptions into short, plain explanations.

export function explainWebAuthnError(err: unknown, op: 'create' | 'get'): string {
  if (err instanceof DOMException) {
    switch (err.name) {
      case 'NotAllowedError':
        return op === 'create'
          ? 'Cancelled or timed out (NotAllowedError). Complete the Face ID, fingerprint, or PIN prompt and try again.'
          : 'Cancelled, timed out, or no matching passkey (NotAllowedError). Create one above, then try again.';
      case 'InvalidStateError':
        return 'This device already has a passkey for that user name (InvalidStateError). Use a different name, or remove the existing one.';
      case 'SecurityError':
        return 'Blocked for security (SecurityError). WebAuthn needs HTTPS and an RP ID matching the page (localhost is exempt).';
      case 'AbortError':
        return 'Request aborted (AbortError). Another WebAuthn request started first.';
      case 'NotSupportedError':
        return 'Your authenticator doesn’t support the chosen options (NotSupportedError). Re-enable ES256 and try again.';
    }
  }
  return `Unexpected error: ${err instanceof Error ? err.message : String(err)}`;
}

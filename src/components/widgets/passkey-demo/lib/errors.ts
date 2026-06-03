// src/components/widgets/passkey-demo/lib/errors.ts
//
// WebAuthn errors as teaching moments — the spec calls for explanations,
// not raw DOMException names.

export function explainWebAuthnError(err: unknown, op: 'create' | 'get'): string {
  if (err instanceof DOMException) {
    switch (err.name) {
      case 'NotAllowedError':
        return op === 'create'
          ? 'The request was cancelled or timed out (NotAllowedError). This is the browser\'s catch-all for "the user didn\'t complete the prompt" — it deliberately doesn\'t reveal why, so a malicious site can\'t probe what authenticators you have. Try again and complete the Face ID / fingerprint / PIN prompt.'
          : 'The sign-in was cancelled or timed out (NotAllowedError). The browser reports this for any abandoned prompt — including "no matching passkey was found" — so sites can\'t fish for which credentials exist. Create a passkey above first, then try again.';
      case 'InvalidStateError':
        return 'Your authenticator already has a passkey for this user name on this site (InvalidStateError). Real apps use excludeCredentials to trigger exactly this, preventing duplicate registrations. Change the user name, or delete the existing passkey from your device, and try again.';
      case 'SecurityError':
        return 'The browser refused the request for security reasons (SecurityError) — usually the RP ID doesn\'t match the page\'s domain, or the page isn\'t a secure context. WebAuthn only works over HTTPS (localhost is the one exception).';
      case 'AbortError':
        return 'The request was aborted (AbortError) — typically a new WebAuthn request started before this one finished.';
      case 'NotSupportedError':
        return 'Your authenticator doesn\'t support the requested options (NotSupportedError) — e.g. none of the offered algorithms. Re-enable ES256 and try again.';
    }
  }
  return `Unexpected error: ${err instanceof Error ? err.message : String(err)}`;
}

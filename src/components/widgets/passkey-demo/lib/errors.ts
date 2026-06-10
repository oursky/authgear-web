// src/components/widgets/passkey-demo/lib/errors.ts
//
// Turns raw WebAuthn DOMExceptions into short, plain explanations. Pure
// function: the caller passes the locale's error strings (WidgetStrings['errors']).

import type { WidgetStrings } from '../strings';

export function explainWebAuthnError(
  err: unknown,
  op: 'create' | 'get',
  s: WidgetStrings['errors'],
): string {
  if (err instanceof DOMException) {
    switch (err.name) {
      case 'NotAllowedError':
        return op === 'create' ? s.notAllowedCreate : s.notAllowedGet;
      case 'InvalidStateError':
        return s.invalidState;
      case 'SecurityError':
        return s.security;
      case 'AbortError':
        return s.abort;
      case 'NotSupportedError':
        return s.notSupported;
    }
  }
  return s.unexpected(err instanceof Error ? err.message : String(err));
}

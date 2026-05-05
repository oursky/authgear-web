// Validation functions return semantic message keys (looked up via the
// widget's message bundle) so they stay locale-agnostic.

export type ValidationKey =
  | 'errorPasswordRequired'
  | 'errorSaltRequired'
  | 'errorHashRequired'
  | 'errorCandidateRequired'
  | '';

export interface ValidationResult {
  isValid: boolean;
  messageKey: ValidationKey;
}

const ok: ValidationResult = { isValid: true, messageKey: '' };

export function validatePassword(password: string): ValidationResult {
  if (!password || !password.trim()) {
    return { isValid: false, messageKey: 'errorPasswordRequired' };
  }
  return ok;
}

export function validateSalt(salt: string): ValidationResult {
  if (!salt || !salt.trim()) {
    return { isValid: false, messageKey: 'errorSaltRequired' };
  }
  return ok;
}

export function validateEncodedHash(hash: string): ValidationResult {
  if (!hash || !hash.trim()) {
    return { isValid: false, messageKey: 'errorHashRequired' };
  }
  return ok;
}

export function validateCandidatePassword(password: string): ValidationResult {
  if (!password || !password.trim()) {
    return { isValid: false, messageKey: 'errorCandidateRequired' };
  }
  return ok;
}

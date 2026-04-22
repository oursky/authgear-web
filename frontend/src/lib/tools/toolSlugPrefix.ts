/** Maps URL slug (app segment) to nested key prefix under namespace `Tools`. */
export const TOOL_SLUG_PREFIX: Record<string, string> = {
  'base64-decode-encode': 'base64',
  'hmac-signature-generator-verifier': 'hmac',
  'jwk-generator': 'jwk',
  'jwt-jwe-debugger': 'jwtJwe',
  'oidc-discovery-endpoint': 'oidc',
  'password-hash-generator': 'passwordHash',
  'ssl-checker': 'ssl',
  'totp-authenticator': 'totp',
  'uuidv7-generator': 'uuidV7',
};


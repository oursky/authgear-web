export type ToolEntry = {
  slug: string;
  label: string;
  icon: string;
  href: string;
  external?: boolean;
};

export const TOOLS: ToolEntry[] = [
  { slug: 'jwt-jwe-debugger', label: 'JWT & JWE Debugger', icon: '/images/minitools-more-jwt.svg', href: '/tools/jwt-jwe-debugger' },
  { slug: 'jwk-generator', label: 'JWK Generator', icon: '/images/minitools-more-jwk.svg', href: '/tools/jwk-generator' },
  { slug: 'hmac-signature-generator-verifier', label: 'HMAC Tool', icon: '/images/minitools-more-hmac.svg', href: '/tools/hmac-signature-generator-verifier' },
  { slug: 'saml', label: 'SAML Testing Tool', icon: '/images/minitools-more-saml.svg', href: 'https://samlsp.com/en/', external: true },
  { slug: 'totp-authenticator', label: 'TOTP Authenticator', icon: '/images/minitools-more-totp.svg', href: '/tools/totp-authenticator' },
  { slug: 'password-hash-generator', label: 'Password Hash Generator', icon: '/images/minitools-more-passwordhash.svg', href: '/tools/password-hash-generator' },
  { slug: 'base64-decode-encode', label: 'Base64 Decode and Encode', icon: '/images/minitools-more-base64.svg', href: '/tools/base64-decode-encode' },
  { slug: 'uuidv7-generator', label: 'UUID v7 Generator & Timestamp Extractor', icon: '/images/uuid-v7.svg', href: '/tools/uuidv7-generator' },
  { slug: 'passkey-demo', label: 'Passkey Demo & WebAuthn Tester', icon: '/images/minitools-more-passkey.svg', href: '/tools/passkey-demo' },
];

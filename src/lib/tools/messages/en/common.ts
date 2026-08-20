export const common = {
  moreDevToolsHeading: 'More Developer Tools',
  readyTitleDefault: 'Ready to Supercharge Your Authentication?',
  readySubtitleDefault:
    'Experience seamless, secure, and scalable identity management with Authgear.',
  getStartedFree: 'Get Started for Free',
  howToolWorksDefault: 'How the Tool Works',
  craftedByTag: 'This tool is crafted by Authgear',
  supportStarUs: 'Support and star us on',
  popupHeading: 'This Dev Tool is crafted by Authgear',
  popupBody:
    'Open source Auth0/Clerk/Firebase alternative. Passkeys, SSO, MFA, passwordless, biometric login.',
  popupStartFree: 'Start building for Free',
  popupStarUs: 'Star us on',
  popupClose: 'Close',
  // Per-tool popup pitch, keyed by tool slug. Falls back to popupBody
  // when a slug has no entry.
  popupPitches: {
    'base64-decode-encode':
      'Decoding tokens by hand? Authgear issues and validates OIDC tokens for you — add login to your app in minutes.',
    'jwt-jwe-debugger':
      'Debugging JWTs? Authgear issues, rotates, and validates these tokens for you — OIDC-compliant out of the box.',
    'jwk-generator':
      'Hand-rolling JWKs? Authgear manages keys and rotation for you — a compliant OIDC provider in minutes.',
    'oidc-discovery-endpoint':
      'Exploring OIDC endpoints? Authgear gives you a fully compliant OIDC provider — discovery, JWKS, and tokens managed for you.',
    'totp-authenticator':
      'Add TOTP MFA to your app in an afternoon — Authgear ships authenticator support out of the box.',
    'password-hash-generator':
      'Never store password hashes yourself again — Authgear handles hashing, storage, and account security for you.',
    'hmac-signature-generator-verifier':
      'Signing requests by hand? Authgear secures your app with standards-based tokens and sessions.',
    'ssl-checker':
      'Certs sorted? Add secure, managed login to your site with Authgear — SSO, MFA, passkeys included.',
    'uuidv7-generator':
      'Generating user IDs? Authgear gives every user a secure identity — signup, SSO, and MFA out of the box.',
    'passkey-demo':
      'Like passkeys? Ship them to your users in an afternoon with Authgear — no protocol code required.',
    'sms-cost-calculator':
      'Worried about OTP costs? Authgear routes OTPs via WhatsApp and email to cut your SMS bill.',
  },
  faqHeading: 'FAQ',
  stepLabel: 'Step {n}.',
  demoCtaText: 'Building authentication into your app?',
  demoCtaButton: 'Start Building',
} as const;

export const registry = {
  'jwt-jwe-debugger': { label: 'JWT & JWE Debugger' },
  'jwk-generator': { label: 'JWK Generator' },
  'hmac-signature-generator-verifier': { label: 'HMAC Tool' },
  saml: { label: 'SAML Testing Tool' },
  'totp-authenticator': { label: 'TOTP Authenticator' },
  'password-hash-generator': { label: 'Password Hash Generator' },
  'base64-decode-encode': { label: 'Base64 Decode and Encode' },
  'uuidv7-generator': { label: 'UUID v7 Generator & Timestamp Extractor' },
  'passkey-demo': { label: 'Passkey Demo & WebAuthn Tester' },
  'sms-cost-calculator': { label: 'SMS Cost Calculator' },
} as const;

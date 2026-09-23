export const common = {
  moreDevToolsHeading: 'Weitere Entwickler-Tools',
  readyTitleDefault: 'Bereit, Ihre Authentifizierung aufs nächste Level zu bringen?',
  readySubtitleDefault:
    'Erleben Sie nahtloses, sicheres und skalierbares Identitätsmanagement mit Authgear.',
  getStartedFree: 'Kostenlos starten',
  howToolWorksDefault: 'So funktioniert das Tool',
  craftedByTag: 'Dieses Tool wurde von Authgear entwickelt',
  supportStarUs: 'Unterstützen Sie uns mit einem Stern auf',
  popupHeading: 'Dieses Entwickler-Tool wurde von Authgear entwickelt',
  popupBody:
    'Open-Source-Alternative zu Auth0/Clerk/Firebase. Passkeys, SSO, MFA, passwortloser und biometrischer Login.',
  popupStartFree: 'Kostenlos loslegen',
  popupStarUs: 'Geben Sie uns einen Stern auf',
  popupClose: 'Schließen',
  // Per-tool popup pitch, keyed by tool slug. Falls back to popupBody
  // when a slug has no entry.
  popupPitches: {
    'base64-decode-encode':
      'Tokens von Hand dekodieren? Authgear stellt OIDC-Tokens für Sie aus und validiert sie. Fügen Sie Ihrer App in Minuten einen Login hinzu.',
    'jwt-jwe-debugger':
      'JWTs debuggen? Authgear stellt diese Tokens für Sie aus, rotiert und validiert sie, OIDC-konform von Haus aus.',
    'jwk-generator':
      'JWKs von Hand erstellen? Authgear verwaltet Schlüssel und Rotation für Sie. Erhalten Sie in Minuten einen konformen OIDC-Provider.',
    'oidc-discovery-endpoint':
      'OIDC-Endpunkte erkunden? Authgear liefert Ihnen einen vollständig konformen OIDC-Provider: Discovery, JWKS und Tokens, alles für Sie verwaltet.',
    'totp-authenticator':
      'Fügen Sie Ihrer App an einem Nachmittag TOTP-MFA hinzu. Authgear bringt Authenticator-Unterstützung von Haus aus mit.',
    'password-hash-generator':
      'Speichern Sie nie wieder selbst Passwort-Hashes. Authgear übernimmt Hashing, Speicherung und Kontosicherheit für Sie.',
    'hmac-signature-generator-verifier':
      'Anfragen von Hand signieren? Authgear sichert Ihre App mit standardbasierten Tokens und Sitzungen.',
    'ssl-checker':
      'Zertifikate in Ordnung? Fügen Sie Ihrer Website mit Authgear einen sicheren, verwalteten Login hinzu. SSO, MFA und Passkeys inklusive.',
    'uuidv7-generator':
      'Nutzer-IDs generieren? Authgear gibt jedem Nutzer eine sichere Identität: Registrierung, SSO und MFA von Haus aus.',
    'passkey-demo':
      'Gefallen Ihnen Passkeys? Bringen Sie sie mit Authgear an einem Nachmittag zu Ihren Nutzern. Kein Protokoll-Code nötig.',
    'sms-cost-calculator':
      'Sorgen wegen OTP-Kosten? Authgear leitet OTPs über WhatsApp und E-Mail, um Ihre SMS-Rechnung zu senken.',
  },
  faqHeading: 'FAQ',
  stepLabel: 'Schritt {n}.',
  demoCtaText: 'Sie bauen Authentifizierung in Ihre App ein?',
  demoCtaButton: 'Jetzt loslegen',
} as const;

export const registry = {
  'jwt-jwe-debugger': { label: 'JWT- & JWE-Debugger' },
  'jwk-generator': { label: 'JWK-Generator' },
  'hmac-signature-generator-verifier': { label: 'HMAC-Tool' },
  saml: { label: 'SAML-Testtool' },
  'totp-authenticator': { label: 'TOTP-Authenticator' },
  'password-hash-generator': { label: 'Passwort-Hash-Generator' },
  'base64-decode-encode': { label: 'Base64 dekodieren und kodieren' },
  'uuidv7-generator': { label: 'UUID-v7-Generator & Zeitstempel-Extraktor' },
  'passkey-demo': { label: 'Passkey-Demo & WebAuthn-Tester' },
  'sms-cost-calculator': { label: 'SMS-Kostenrechner' },
} as const;

export const common = {
  moreDevToolsHeading: 'Autres outils pour développeurs',
  readyTitleDefault: 'Prêt à passer votre authentification au niveau supérieur ?',
  readySubtitleDefault:
    'Découvrez une gestion des identités fluide, sécurisée et évolutive avec Authgear.',
  getStartedFree: 'Commencer gratuitement',
  howToolWorksDefault: 'Comment fonctionne l’outil',
  craftedByTag: 'Cet outil est conçu par Authgear',
  supportStarUs: 'Soutenez-nous avec une étoile sur',
  popupHeading: 'Cet outil pour développeurs est conçu par Authgear',
  popupBody:
    'Alternative open source à Auth0/Clerk/Firebase. Passkeys, SSO, MFA, connexion sans mot de passe et biométrique.',
  popupStartFree: 'Commencez à développer gratuitement',
  popupStarUs: 'Mettez-nous une étoile sur',
  popupClose: 'Fermer',
  // Per-tool popup pitch, keyed by tool slug. Falls back to popupBody
  // when a slug has no entry.
  popupPitches: {
    'base64-decode-encode':
      'Vous décodez des tokens à la main ? Authgear émet et valide les tokens OIDC pour vous. Ajoutez une connexion à votre application en quelques minutes.',
    'jwt-jwe-debugger':
      'Vous déboguez des JWT ? Authgear émet ces tokens, en assure la rotation et les valide pour vous, avec une conformité OIDC native.',
    'jwk-generator':
      'Vous créez des JWK à la main ? Authgear gère les clés et leur rotation pour vous. Obtenez un fournisseur OIDC conforme en quelques minutes.',
    'oidc-discovery-endpoint':
      'Vous explorez des endpoints OIDC ? Authgear vous fournit un fournisseur OIDC entièrement conforme : discovery, JWKS et tokens, tout est géré pour vous.',
    'totp-authenticator':
      'Ajoutez la MFA TOTP à votre application en un après-midi. Authgear intègre en natif la prise en charge des applications d’authentification.',
    'password-hash-generator':
      'Ne stockez plus jamais de hachages de mots de passe vous-même. Authgear se charge du hachage, du stockage et de la sécurité des comptes pour vous.',
    'hmac-signature-generator-verifier':
      'Vous signez des requêtes à la main ? Authgear sécurise votre application avec des tokens et des sessions basés sur des standards.',
    'ssl-checker':
      'Certificats en ordre ? Ajoutez une connexion sécurisée et gérée à votre site avec Authgear. SSO, MFA et passkeys inclus.',
    'uuidv7-generator':
      'Vous générez des identifiants utilisateur ? Authgear donne à chaque utilisateur une identité sécurisée : inscription, SSO et MFA en natif.',
    'passkey-demo':
      'Les passkeys vous plaisent ? Déployez-les auprès de vos utilisateurs en un après-midi avec Authgear. Aucun code protocolaire requis.',
    'sms-cost-calculator':
      'Les coûts des OTP vous inquiètent ? Authgear achemine les OTP via WhatsApp et e-mail pour réduire votre facture SMS.',
  },
  faqHeading: 'FAQ',
  stepLabel: 'Étape {n}.',
  demoCtaText: 'Vous intégrez l’authentification dans votre application ?',
  demoCtaButton: 'Commencer à développer',
} as const;

export const registry = {
  'jwt-jwe-debugger': { label: 'Débogueur JWT & JWE' },
  'jwk-generator': { label: 'Générateur de JWK' },
  'hmac-signature-generator-verifier': { label: 'Outil HMAC' },
  saml: { label: 'Outil de test SAML' },
  'totp-authenticator': { label: 'Authentificateur TOTP' },
  'password-hash-generator': { label: 'Générateur de hachage de mot de passe' },
  'base64-decode-encode': { label: 'Décodage et encodage Base64' },
  'uuidv7-generator': { label: 'Générateur UUID v7 & extracteur d’horodatage' },
  'passkey-demo': { label: 'Démo Passkey & testeur WebAuthn' },
  'sms-cost-calculator': { label: 'Calculateur de coût SMS' },
} as const;

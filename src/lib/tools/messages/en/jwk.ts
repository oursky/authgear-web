export const jwk = {
  metaTitle: 'JWK Generator — PEM to JWK, JWK to PEM & JWKS Generator | Authgear',
  metaDescription:
    'PEM → JWK, JWK → PEM, or generate keys and download JWKS. Choose kid, alg, and use (sig/enc). Browser-only, no signup.',
  heroTitle: 'JWK Generator — Convert PEM to JWK & Generate JWKS',
  heroDescription:
    'Generate and convert cryptographic keys in PEM and JWK formats for secure signing and encryption.',
  iframeTitle: 'JWK Generator Widget',
  policyLearnMore: 'What is JWKS',
  policyGithub: 'https://github.com/authgear/authgear-widget-jwk-generator',
  policyLine1:
    'Our lightweight JWK generator runs entirely in your browser — no keys leave your machine. Use it to convert PEM to JWK, convert JWK to PEM, or generate new keys and export a JWKS for your jwks_uri endpoint. Learn more:',
  policyLine2: 'See source code:',
  card1Title: 'PEM to JWK',
  card1Desc:
    'Paste a PEM-encoded key or X.509 certificate, set kid, choose alg and use (sig / enc), then click Generate JWK. This converts PEM → JWK in the standard jwk format so you can add the JWK to a JWKS or plug it directly into JOSE libraries (Node jose, Python jwcrypto, etc.).',
  card2Title: 'JWK to PEM',
  card2Desc:
    'Paste a JWK JSON object and export a PEM formatted key for CLIs, servers, or legacy tooling. Use JWK to PEM when you need a PEM public key for OpenSSL or server-side libraries while maintaining kid, alg, and use metadata in your JWK set.',
  card3Title: 'Generate JWK',
  card3Desc:
    'Create new keys with the JWK generator mode. Choose key use (signature sig or encryption enc), key type (RSA, EC, OKP, or oct), and configure size/curve/parameters. The generator suggests alg values and auto-generates a kid you can edit. Output options include a single JWK or a full JWKS (jwks.json) ready to host.',
  howSectionTitle: 'How the JWK Generator Works',
  s1Label: 'Step 1.',
  s1Title: 'Convert Between PEM and JWK:',
  s1i1: 'Paste your PEM key to convert it into a JSON Web Key format or vice versa.',
  s1i2: 'Copy the converted key for use in your applications.',
  s1i3:
    'Why use PEM → JWK? Many libraries and identity platforms expect JWK/JWKS. Converting PEM to JWK makes your keys consumable by JWT verification flows and by any service that reads a jwks.json at a jwks_uri.',
  s2Label: 'Step 2.',
  s2Title: 'Generate New Keys:',
  s2i1: 'Select whether you want a key for signature or encryption tasks.',
  s2i2:
    'Choose the key type suitable for your security needs, such as symmetric (oct), RSA, or elliptic curve (EC or OKP).',
  s2i3:
    'Pick the cryptographic algorithm to match your system requirements (e.g., RS256 for RSA signature).',
  s2i4: 'Receive the generated keys:Symmetric:',
  s2i5a: 'a. Secret key string + JWK JSON.',
  s2i5b:
    'b. Asymmetric: PEM-formatted private and public keys + corresponding JWK objects for private and public key parts.',
  s3Label: 'Step 3.',
  s3Title: 'Use Your Keys Securely:',
  s3i1: 'Implement these keys to sign or encrypt JWTs.',
  s3i2: 'Host JWK sets on your authorization servers for key discovery.',
  s3i3: 'Rotate and manage keys easily for robust security posture.',
  faqJwkLinkText: 'What is a JWK',
  faqJwkTitleSuffix: '(JSON Web Key)?',
  faqJwkBody:
    'A JWK is a JSON data structure that represents a cryptographic key. A JWKS (JSON Web Key Set) is an object with a keys array of JWKs. JWKS is the standard format used by identity providers to publish public keys at a jwks_uri so clients can validate JWT tokens (see RFC 7517). If you searched "what is jwks" or "jwks uri", this is the format you need.',
  faqJwkBullet1: 'Machine-friendly JSON format, easy to use across web APIs',
  faqJwkBullet2: 'Supports all key types—symmetric and asymmetric',
  faqJwkBullet3: 'Facilitates key rotation and management for modern applications',
  faqPemTitle: 'What is PEM',
  faqPemBody:
    'PEM (Privacy Enhanced Mail) is the base64-encoded format commonly used to store and share cryptographic keys and certificates. Use PEM to JWK conversions to make PEM keys consumable by JWKS endpoints and modern JOSE libraries.',
  faqPemBase64Part1: 'Since PEM is just Base64-encoded DER data, you can inspect the raw bytes with our ',
  faqPemBase64LinkLabel: 'free Base64 decode tool',
  faqPemBase64Part2: '.',
  bestPracticesTitle: 'Best Practices',
  bp1:
    'Never use generated private keys in production. For production, generate and store private keys in a secure HSM or KMS.',
  bp2: 'Use appropriate key sizes and modern algorithms (e.g., Ed25519 when supported).',
  bp3:
    'Host JWKS over HTTPS at a stable jwks_uri and rotate keys regularly — publish new keys with new kid values and remove deprecated keys safely.',
  bp4: 'Include kid and alg metadata in your JWKs so clients can select the right key when verifying JWTs.',
} as const;

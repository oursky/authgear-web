export const jwtJwe = {
  metaTitle: 'JWT & JWE Debugger — Decode, Verify, Encrypt & Decrypt | Authgear',
  metaDescription:
    'Decode and verify JWTs, encrypt to JWE, decrypt JWEs, and inspect claims. JWT debugger for developers — supports jwk/jwks, signature verification, and encryption.',
  heroTitle: 'JWT & JWE Debugger',
  heroDescription:
    'Decode, verify, sign, encrypt, and decrypt JSON Web Tokens. Our JWT debugger helps you inspect JWT headers and claims, verify signatures, and convert tokens to/from encrypted JWE form.',
  iframeTitle: 'JWT & JWE Debugger',
  policyPrefix:
    'Your data security is our top priority. All encoding, decoding, encryption and decryption happen in this browser. This tool does not store or send your JWT and JWE outside of the browser. See source code in: ',
  policyGithub: 'https://github.com/authgear/authgear-widget-jwt-debugger',
  card1Title: 'Encode/Decode JWT',
  card1Desc:
    'Quickly create and inspect JWTs. Paste a JWT to decode the header and payload, or craft your own for testing.',
  card2Title: 'Sign & Verify JWT',
  card2Desc:
    'Generate cryptographic signatures when creating JWTs, and verify existing JWT signatures to confirm token authenticity and integrity.',
  card3Title: 'JWE Encryption',
  card3Desc:
    'Encrypt any JWT into a JWE using a public key, ensuring data remains confidential during transmission.',
  card4Title: 'JWE Decryption',
  card4Desc:
    'Decrypt a JWE token to retrieve the original JWT—including the payload—for analysis.',
  howSectionTitle: 'How the JWT & JWE Debugger Works',
  s1Label: 'Step 1.',
  s1Title: 'Paste or Generate a JWT:',
  s1i1: 'Input your JWT to see its decoded header and payload instantly.',
  s1i2:
    'The tool can verify the JWT\'s signature to confirm authenticity and integrity, highlighting whether the token is valid or has been tampered with.',
  s2Label: 'Step 2.',
  s2Title: 'Verify signature (JWT verification):',
  s2i1:
    'Supply a JWK or JWKS (jwk format / jwks.json) or paste a PEM public key to verify a token\'s signature and confirm integrity. The debugger shows kid, alg, and verification status.',
  s3Label: 'Step 3.',
  s3Title: 'Sign / Create a JWT:',
  s3i1:
    'Build a signed JWT by choosing algorithm (RS256, ES256, HS256, etc.) and a signing key. This is useful for testing jwt authentication flows and experimenting with jwt best practices.',
  s4Label: 'Step 4.',
  s4Title: 'Encrypt JWT to JWE:',
  s4i1Part1:
    'Encrypt a signed JWT into a JWE (JSON Web Encryption) using a public key to produce confidential tokens. Use JWE when you need payload confidentiality in addition to signature integrity. (See "',
  s4GuideLinkLabel: 'JWE vs JWT',
  s4i1Part2: '" in our guide for when to use each.)',
  s4GuideLink: '/post/jwe-vs-jwt',
  s5Label: 'Step 5.',
  s5Title: 'Decrypt JWE:',
  s5i1:
    'Paste a JWE and provide the private key to decrypt and retrieve the original JWT. The tool supports common JWE algorithms and shows header fields and enc parameters.',
  s6Label: 'Step 6.',
  s6Title: 'Inspect claims & debug',
  s6i1:
    'View claims, check exp/iat/nbf logic, and see human-friendly warnings (expired, not yet valid). Use copy buttons to export tokens or keys for local testing',
  faqJwtLinkText: 'What is a JWT',
  faqJwtTitleSuffix: '(JSON Web Token)?',
  faqJwtBodyP1:
    'A JWT (JSON Web Token) is an open standard (RFC 7519) for transmitting information securely between parties as a compact, URL-safe JSON object. ',
  faqJwtBodyLinkMid: 'JWTs are widely used in authentication systems',
  faqJwtBodyLinkMidHref: '/post/web-application-authentication-guide',
  faqJwtBodyP2:
    ', enabling stateless session management and API security. A standard JWT has three parts:',
  faqJwtBullet1: 'Header: Specifies the token type and hashing algorithm.',
  faqJwtBullet2: 'Payload: Contains claims—statements about the user and additional metadata.',
  faqJwtBullet3:
    'Signature: Verifies that the sender of the JWT is who it says it is and ensures the message wasn\'t changed along the way.',
  faqJwtUseCases: 'Common Use Cases:',
  faqJwtUse1: 'User authentication and single sign-on (SSO)',
  faqJwtUse2: 'Secure API authentication and authorization',
  faqJwtUse3: 'Information exchange between applications',
  faqJweTitle: 'What is a JWE (JSON Web Encryption)?',
  faqJweBody:
    'A JWE (JSON Web Encryption) is another open standard (RFC 7516) for encrypting content, providing confidentiality for transmitted information. JWE wraps content—such as a signed JWT—in an encrypted format that only intended parties can decrypt and read. A standard JWE structure:',
  faqJweB1: 'Protected Header',
  faqJweB2: 'Encrypted Key',
  faqJweB3: 'Initialization Vector',
  faqJweB4: 'Ciphertext (the actual encrypted content)',
  faqJweB5: 'Authentication Tag',
  faqJweUseCases: 'Common Use Cases:',
  faqJweUse1: 'Protect sensitive JWT payloads in transit',
  faqJweUse2: 'Secure confidential data exchange between services',
  faqJweUse3: 'Layer additional security on top of standard JWTs',
  dbgBpTitle: 'JWT & JWE Debugger Best Practices',
  dbgBp1:
    'Signature: Verifies that the sender of the JWT is who it says it is and ensures the message wasn\'t changed along the way.',
  dbgBp2: 'Payload: Contains claims—statements about the user and additional metadata.',
  dbgBp3: 'Header: Specifies the token type and hashing algorithm.',
} as const;

export const totp = {
  metaTitle: 'TOTP Authenticator — Online TOTP Generator & Tester',
  metaDescription:
    'Generate TOTP codes (RFC 6238) online with customizable algorithm (SHA-1/256/512) and digit length (6/8) save up to 10 apps.',
  heroTitle: 'TOTP Authenticator — Online one-time password generator (RFC 6238)',
  heroDescriptionBeforeLink: 'Generate and copy Time-based One-Time Passwords (TOTP) instantly for testing, debugging, and QA. Configure algorithm (SHA-1 / SHA-256 / SHA-512), digit length (6 or 8), and see live codes that refresh every 30 seconds per ',
  heroRfcLink: 'RFC 6238',
  heroRfcHref: 'https://datatracker.ietf.org/doc/html/rfc6238',
  iframeTitle: 'TOTP Authenticator - One-time Password Generator',
  policyLine1:
    'Your data security is our top priority. All TOTP code generation and application management happen entirely in your browser.',
  policyLine2:
    'This tool does not store or transmit your secret keys or codes outside of your browser.',
  s1Label: 'Step 1.',
  s1Title: "Enter Your Application's Secret Key",
  s1Body: "Paste the shared TOTP secret (base32) from your app's 2FA setup screen.",
  s2Label: 'Step 2.',
  s2Title: 'Customise Algorithm and Digit Length',
  s2BodyBefore:
    'Choose SHA-1, SHA-256, or SHA-512, and pick 6 or 8 digits. SHA-1 + 6 digits is the common default; use stronger hashes if your integration requires it.',
  s3Label: 'Step 3.',
  s3Title: 'Generate One-Time Password',
  s3Body:
    'The current OTP is generated and updates automatically on a 30-second timestep (default per RFC 6238). Save up to 10 different application secrets for quick testing.',
  s4Label: 'Step 4.',
  s4Title: 'Copy and use the One-Time Password for authentication',
  s4Body: "Click/tap the code to copy it to your clipboard and paste it into your app's login flow.",
  cautionLead: 'Caution:',
  cautionBody:
    'All code generation and storage happen in your browser memory only.\nAnd therefore, when your browser cache is cleared or if you reinstall your browser, all data saved for this tool will be permanently deleted.',
  troubleshootTitle: 'Troubleshooting',
  tr1Title: "Codes don't match?",
  tr1Item:
    'Check server and client clocks — TOTP depends on accurate time; allow a verification window (±1 timestep) during testing.',
  tr2Title: 'Wrong secret format?',
  tr2Item:
    'Ensure the secret is base32. If you have a QR code, scan it or extract the secret= parameter from the otpauth URI.',
  tr3Title: '"Algorithm mismatch" errors',
  tr3Item:
    'Verify that both the server and authenticator are using the same algorithm (SHA-1/256/512), digit length, and timestep.',
  tr4Title: 'Intermittent failures in tests',
  tr4Item:
    "Confirm you're not reusing a secret in multiple environments (e.g., same secret across staging & prod can cause confusion)",
  readyTitle: 'Secure Your Accounts Seamlessly with Authgear',
  readySubtitle:
    'Authgear gives you scalable identity management, secure authentication, and easy integration.',
  faq1Title: 'What is TOTP?',
  faq1Body:
    'TOTP (Time-Based One-Time Password) is an industry-standard algorithm for generating temporary, single-use codes based on the current time and a shared secret. TOTP is defined by the official IETF standard RFC 6238, which specifies how these codes are calculated to provide short-lived OTP values for secure two-factor authentication across websites, applications, and services.',
  faq2Title: 'Why TOTP?',
  faq2b1: 'Strengthens security with two-factor authentication (2FA)',
  faq2b2: 'Widely adopted by major platforms (Google, Microsoft, GitHub, etc.)',
  faq2b3: 'Tokens expire quickly, minimising the risk of code reuse',
  faq3Title: 'How long is a TOTP valid?',
  faq3Body:
    'By default 30 seconds (RFC 6238 recommends 30s). Server verification often allows a one-step grace window for clock skew.',
  faq4Title: 'Which algorithm should I use — SHA-1, SHA-256 or SHA-512?',
  faq4Body:
    'SHA-1 is widely supported and used by most authenticator apps; SHA-256/512 are more robust if you control both the client and server and want stricter hashing. Ensure all sides use the same algorithm.',
  faq5Title: 'Should I use 6 or 8 digits?',
  faq5Body:
    '6 digits is the common standard (balances usability and security). 8 digits provide slightly more entropy but are less common for consumer authenticators.',
  faq6Title: 'How do I extract a secret from an otpauth:// URI?',
  faq6Body: 'The secret= parameter in the otpauth:// URL is the base32 secret.',
  faq7Title: 'How do authenticator apps generate these codes?',
  faq7Body:
    'Google Authenticator, Microsoft Authenticator, Authy and 1Password all run the same RFC 6238 algorithm you see here: the shared secret and the current 30-second time step go through HMAC, and the result is truncated to 6 or 8 digits. That is why, for the same secret, the code on this page matches the one in your app.',
  faq7GuidePart1: 'For the full walkthrough, read ',
  faq7GuideLinkLabel: 'How do authenticator apps work',
  faq7GuidePart2: '. Prefer to skip codes altogether? Try the ',
  faq7PasskeyLinkLabel: 'passkey demo',
  faq7GuidePart3: ' to see phishing-resistant, passwordless login in action.',
} as const;

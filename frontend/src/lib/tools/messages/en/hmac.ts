export const hmac = {
  metaTitle: 'HMAC Signature Generator/Verifier',
  metaDescription:
    'Free HMAC generator and verifier by Authgear: Create and check HMAC signatures online using SHA-256, SHA-512, and more. All operations happen securely in-browser with no data leaving your device',
  heroTitle: 'HMAC Signature Generator/Verifier',
  heroDescription: 'Securely generate and verify HMAC signatures for your payloads',
  iframeTitle: 'HMAC Signature Generator/Verifier',
  policyPrefix:
    'Your data security is our top priority. All signature generation and verification happen entirely in your browser. This tool does not store or transmit your payloads, secrets, or signatures outside of the browser. See source code in: ',
  policyLink: 'https://github.com/authgear/authgear-widget-hmac-tool',
  howSectionTitle: 'How the HMAC Signature Generator Works',
  supportedAlgorithmsTitle: 'Supported Algorithms',
  supportedAlgorithmsIntro:
    'Generate and convert cryptographic keys in PEM and JWK formats for secure signing and encryption.',
  algHs256: 'HMAC + SHA-256',
  algHs384: 'HMAC + SHA-384',
  algHs512: 'HMAC + SHA-512',
  step1Title: 'Enter Payload:',
  step1Body: 'Input the exact message or payload content you want to sign or verify.',
  step2Title: 'Provide Webhook Secret:',
  step2Body:
    'Insert the shared secret key used for HMAC generation, typically known only to you and your webhook provider.',
  step3Title: 'Select HMAC Algorithm:',
  step3Body: 'Pick from HS256, HS384, or HS512 according to your application\'s configuration.',
  step4Title: 'Generate Signature:',
  step4Body:
    'Click to compute the HMAC signature for your payload and secret using the selected algorithm.',
  step5Title: 'Paste Received Signature to Verify:',
  step5Body:
    'Paste the signature you received from an external system/webhook to compare against your own generated signature.',
  faqWhatTitle: 'What is HMAC?',
  faqWhatBody:
    'HMAC (Hash-Based Message Authentication Code) is a mechanism that uses a cryptographic hash function and a secret key to produce a signature for a message or payload. This signature provides both data integrity and authentication, ensuring that the message has not been tampered with and is genuinely from the claimed sender.',
  faqWhyTitle: 'Why HMAC?',
  faqWhy1: 'Verifies authenticity of messages, especially in webhook or API callbacks',
  faqWhy2: 'Prevents tampering or replay attacks by ensuring message integrity',
  faqWhy3: 'Simple and widely-used cryptographic technique supported by most platforms',
  bestPracticesTitle: 'Best Practices',
  bp1: 'Keep your webhook secret confidential and avoid sharing it publicly.',
  bp2: 'Always verify incoming webhook signatures before processing payloads.',
  bp3: 'Use a secure algorithm compatible with your platform.',
} as const;

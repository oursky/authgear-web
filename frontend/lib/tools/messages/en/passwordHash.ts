export const passwordHash = {
  metaTitle: 'Password Hash Generator and Verifier',
  metaDescription:
    'Free Password Hash Generator & Verifier. Create/verify Argon2id, bcrypt, scrypt, PBKDF2 hashes with salts, presets, and live timing, entirely client-side.',
  heroLine1: 'Password Hash Generator and Verifier',
  heroLine2: '(Argon2id, bcrypt, scrypt, PBKDF2)',
  heroDescription:
    'Client-side tool to generate/verify password hashes with realistic parameters. Helpful for debugging integrations and understanding how salts, memory, and iterations affect cost. Runs locally—no passwords leave your browser.',
  iframeTitle: 'Password Hash Generator',
  policyPrefix:
    'Your data security is our top priority. All hashing and verification happen in this browser. This tool does not store or send your password nor hashes outside of the browser. See source code in: ',
  policyGithub: 'https://github.com/authgear/authgear-widget-password-hash',
  featureSectionTitle: 'Supported Password Hashing Functions',
  f1Title: 'Argon2id Generator & Parameters',
  f1Desc:
    'Argon2id is a modern, memory-hard function that raises the attacker\'s cost on GPUs/ASICs. Tune memory, iterations (t), and parallelism (p) until your authentication path lands around 250–500ms on production hardware. Use a unique random salt per password (16–32 bytes).',
  f2Title: 'bcrypt Generator (cost/rounds)',
  f2Desc:
    'bcrypt is battle-tested and widely available. Increase cost to slow brute-force attempts, while keeping login UX responsive. We output the $2b$ format for broad compatibility.',
  f3Title: 'scrypt Generator (N, r, p)',
  f3Desc:
    'scrypt adds memory-hardness. Increase N (e.g., 2^15–2^19) to raise attacker cost; adjust r and p to balance memory and parallelism.',
  f4Title: 'PBKDF2 Generator (SHA-256 / SHA-512)',
  f4Desc:
    'PBKDF2 remains a compatibility workhorse. Use high iteration counts (hundreds of thousands or more) and revisit yearly as hardware improves.',
  f5Title: 'Salts (and Optional Pepper)',
  f5DescBeforeLinks:
    'The tool generates cryptographically secure salts and lets you set length and encoding (Hex/Base64). Some deployments also add a pepper (site-wide server secret) that\'s not stored in the hash. Use peppers carefully and manage them like other secrets.',
  f5ReadMore: 'Read more:',
  f5Link1: 'Password hashing & salting explained',
  f5Link1Href: '/post/password-hashing-salting-function-and-algorithm-explained',
  f5Link2: 'How to pick the right hashing function',
  f5Link2Href: '/post/password-hashing-how-to-pick-the-right-hashing-function',
  howSectionTitle: 'How to use the Password Hash Generator',
  h1Label: 'Step 1.',
  h1Title: 'Enter a password',
  h1i1: 'Open the Generate tab and type a demo password (avoid real credentials).',
  h2Label: 'Step 2.',
  h2Title: 'Select an algorithm',
  h2i1: 'For new systems, Argon2id is generally recommended.',
  h3Label: 'Step 3.',
  h3Title: 'Set parameters:',
  h3i1: 'Argon2id: Memory (MiB), Iterations (t), Parallelism (p).',
  h3i2: 'bcrypt: Cost (2^cost rounds).',
  h3i3: 'scrypt: N (power of two), r, p.',
  h3i4: 'PBKDF2: Iterations and digest (SHA-256/512).',
  h4Label: 'Step 4.',
  h4Title: 'Generate Password Hash',
  h4i1: 'Click Generate Password Hash. Copy the encoded string.',
  h5Label: 'Step 5.',
  h5Title: 'Verify Password Hash',
  h5i1: 'Switch to Verify Password Hash to test a password + encoded hash pair.',
  faq1Title: 'Is it safe to use this with real passwords?',
  faq1Body:
    'All hashing happens locally in your browser. For your own safety, avoid using production secrets in any online tool.',
  faq2Title: 'Which hashing function should I use?',
  faq2Body:
    'For new systems, Argon2id is generally recommended. bcrypt and scrypt are widely deployed; PBKDF2 is a compatibility fallback. Always benchmark and choose parameters that meet your latency targets.',
  faq3Title: 'How long should hashing take?',
  faq3Body:
    'Many teams target ~250–500ms in the authentication path. Pick the slowest settings that still keep UX smooth on your production hardware.',
  faq4Title: "Why won't my framework verify the hash?",
  faq4Body:
    'Common issues: whitespace/line endings, encoding mismatch (hex vs Base64), bcrypt prefix differences ($2a$ vs $2b$), or forgetting a pepper.',
  faq5Title: 'What salt length should I use?',
  faq5Body:
    '16–32 bytes of random data is standard. The tool defaults to secure randomness and shows length and encoding.',
} as const;

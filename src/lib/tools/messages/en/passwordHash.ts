export const passwordHash = {
  metaTitle: 'Password Hash Generator and Verifier (Argon2id, bcrypt, scrypt, PBKDF2) — 2026',
  metaDescription:
    'Free Password Hash Generator & Verifier with 2026 OWASP / NIST parameter presets. Create and verify Argon2id, bcrypt, scrypt, PBKDF2 hashes with salts and live timing — entirely client-side, nothing leaves your browser.',
  heroLine1: 'Password Hash Generator and Verifier',
  heroLine2: '(Argon2id, bcrypt, scrypt, PBKDF2 — 2026 OWASP defaults)',
  heroDescription:
    'Client-side tool to generate and verify password hashes with realistic, up-to-date parameters. Helpful for debugging integrations and for understanding how salts, memory, and iterations affect cost. Defaults follow the OWASP 2026 baseline (Argon2id m = 19 MiB, t = 2, p = 1) and NIST SP 800-63B PBKDF2 minimums. Runs locally — no passwords leave your browser.',
  iframeTitle: 'Password Hash Generator',
  policyPrefix:
    'Your data security is our top priority. All hashing and verification happen in this browser. This tool does not store or send your password nor hashes outside of the browser.',
  featureSectionTitle: 'Supported Password Hashing Functions',
  f1Title: 'Argon2id Generator & Parameters (2026 settings)',
  f1Desc:
    'Argon2id is a modern, memory-hard function that raises the attacker\'s cost on GPUs and ASICs. The OWASP 2026 baseline is m = 19 MiB, t = 2, p = 1 with a 16-byte random salt. If hardware allows, m = 64 MiB / t = 3 / p = 4 is stronger. Tune until a single verification lands around 250–500 ms on production.',
  f2Title: 'bcrypt Generator (cost / rounds)',
  f2Desc:
    'bcrypt is battle-tested and widely available. Cost factor 12 is the 2026 minimum; cost 13–14 is preferred for new systems. Costs above 14 noticeably affect login latency. We output the $2b$ format for broad compatibility. Note bcrypt only considers the first 72 bytes of input.',
  f3Title: 'scrypt Generator (N, r, p)',
  f3Desc:
    'scrypt adds memory-hardness. The 2026 baseline is N = 2^17, r = 8, p = 1 (~128 MiB per verification). For interactive logins on modest hardware, N = 2^15 with r = 8, p = 1 is acceptable; never use values below 2^14.',
  f4Title: 'PBKDF2 Generator (SHA-256 / SHA-512)',
  f4Desc:
    'PBKDF2 remains the compatibility / FIPS-compliant workhorse. NIST SP 800-63B (2024 update) requires at least 600,000 iterations for PBKDF2-HMAC-SHA256, or 210,000 for PBKDF2-HMAC-SHA512. Revisit yearly as hardware improves.',
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
  faq6Title: 'Can I decrypt a password hash with this tool?',
  faq6Body:
    'No — and no other tool can either. Argon2id, bcrypt, scrypt, and PBKDF2 are one-way hash functions, not encryption. There is no key that "reverses" them. The only way to recover a password from a hash is to guess candidate passwords, hash each one, and compare. That is what password-cracking attacks do, and modern memory-hard parameters are tuned to make it economically prohibitive at scale. To verify a known password against a stored hash, use the Verify tab.',
  faq7Title: 'Argon2id vs bcrypt vs scrypt: which should I pick in 2026?',
  faq7Body:
    'Argon2id is the recommended default for new systems — it is the PHC password-hashing competition winner and is memory-hard against GPU and ASIC attacks. bcrypt is fine for existing deployments at cost ≥ 12, but it is not memory-hard and has a 72-byte input limit. scrypt is also memory-hard and well-studied; pick it only if your runtime lacks a maintained Argon2id library. Use PBKDF2 only when FIPS / NIST compliance requires it.',
  faq8Title: 'How do I migrate from bcrypt to Argon2id without forcing a password reset?',
  faq8Body:
    'Use opportunistic rehashing. Continue verifying existing users with bcrypt; on a successful login, hash the plain-text password they just typed with Argon2id and update the stored credential. Track a per-user hash-version field so you know which algorithm to verify with. Within a few weeks of normal user activity most accounts migrate; you can force the rest with a password-reset prompt for inactive users.',

  widget: {
    ariaLabel: 'Password hash mode',
    tabGenerate: 'Generate',
    tabVerify: 'Verify',

    sectionAlgorithm: 'Algorithm',
    sectionPassword: 'Plaintext password',
    sectionParameters: 'Parameters',
    sectionSalt: 'Salt',

    algoSubtitleArgon2id: 'memory-hard',
    algoSubtitleScrypt: 'memory-hard',
    algoSubtitleBcrypt: 'adaptive',
    algoSubtitlePbkdf2: 'NIST-compliant',

    passwordPlaceholder: 'Enter the password to hash',
    saltPlaceholder: 'Generated automatically',
    saltGenerateAria: 'Generate new salt',
    saltByteUnit: 'B',

    buttonGenerate: 'Generate password hash',
    buttonGenerating: 'Generating…',
    buttonVerify: 'Verify password',
    buttonVerifying: 'Verifying…',

    resultEncodedHash: 'Encoded hash',
    resultCopy: 'Copy',
    resultCopied: 'Copied',
    resultExecutionTime: 'Execution time',
    resultTuningHint: 'Tune memory and iterations to land near 250–500 ms on production hardware.',
    resultSaltLabel: 'Salt',
    resultMillisecondsSuffix: 'ms',

    verifyEncodedHash: 'Encoded hash',
    verifyEncodedHashPlaceholder: 'Paste an encoded password hash (e.g. $argon2id$v=19$m=19456,t=2,p=1$…)',
    verifyCandidatePassword: 'Candidate password',
    verifyCandidatePlaceholder: 'Password to verify against the hash',
    verifySupportedFormatsShow: 'Supported formats',
    verifySupportedFormatsHide: 'Hide formats',
    verifyMatch: 'Password matches',
    verifyNoMatch: 'Password does not match',
    verifyDetectedAlgorithm: 'Detected algorithm:',

    errorPasswordRequired: 'Please enter a plaintext password',
    errorSaltRequired: 'Please enter a salt or generate one',
    errorHashRequired: 'Please enter an encoded password hash',
    errorCandidateRequired: 'Please enter a candidate password',

    paramArgon2idMemory: 'Memory (MiB) (m)',
    paramArgon2idIterations: 'Iterations (t)',
    paramArgon2idParallelism: 'Parallelism (p)',
    paramArgon2idKeyLength: 'Hash Length (bytes)',
    paramBcryptCost: 'Cost Factor',
    paramScryptN: 'N (CPU/Memory cost) (ln)',
    paramScryptR: 'r (Block size)',
    paramScryptP: 'p (Parallelization)',
    paramScryptKeyLength: 'Key Length (bytes)',
    paramPbkdf2Iterations: 'Iterations',
    paramPbkdf2KeyLength: 'Key Length (bytes)',

    warnArgon2idMemory: 'Memory below 19 MiB may be insecure',
    warnArgon2idIterations: 'Iterations below 2 may be insecure',
    warnArgon2idParallelism: 'Parallelism below 1 is invalid',
    warnScryptR: 'r below 8 may be insecure',
    warnBcryptCost: 'Cost factor below 10 may be insecure',
    warnPbkdf2Iterations: 'Iterations below 100,000 may be insecure',
  },
} as const;

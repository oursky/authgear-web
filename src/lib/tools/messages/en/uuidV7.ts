export const uuidV7 = {
  metaTitle: 'UUID v7 / UUIDv7 Generator & Timestamp Extractor — Free Online Tool (RFC 9562)',
  metaDescription:
    'Free online UUID v7 (UUIDv7) generator and timestamp extractor. Generate, inspect, and copy time-ordered UUIDs in your browser, decode the embedded Unix timestamp, and batch-generate up to 10 IDs. Standardised in RFC 9562.',
  heroTitle: 'UUID v7 (UUIDv7) Generator & Timestamp Extractor — RFC 9562',
  heroDescription:
    'UUID v7 — also written UUIDv7 — is a 128-bit identifier standardised in RFC 9562 that embeds a millisecond Unix timestamp, so the IDs sort by creation time while staying globally unique. Use this free tool to generate UUIDv7 values, decode the timestamp from an existing one, and inspect every field — all in your browser, with nothing sent to a server.',
  iframeTitle: 'UUIDv7 Generator & Timestamp Extractor (RFC 9562)',
  policyLine1:
    'Your data security is our top priority. Everything runs locally in your browser.',
  policyLine2: 'This tool does not store or send any data outside of your device',
  card1Title: 'Multiple UUID v7 Values',
  card1Desc:
    'Generate up to 10 UUID v7 values at a time. This is useful for testing, seeding data, or validating ordering behavior.',
  card2Title: 'Flexible Timestamp Modes',
  card2Desc:
    'Choose how the timestamp is generated. You can use the current time or set a custom timestamp to generate UUIDs for a specific moment.',
  card3Title: 'Built-in UUID Inspector',
  card3Desc:
    'Each generated UUID includes an inspector that displays structured details such as the embedded Unix timestamp, UUID version, and variant information.',
  card4Title: 'Timestamp Extraction Tool',
  card4Desc:
    'Extract the Unix timestamp from an existing UUID v7 to verify creation time and debug time-based ordering.',
  s1Label: 'Step 1.',
  s1Title: 'Choose how many IDs to generate (1–10).',
  s2Label: 'Step 2.',
  s2Title: 'Select a timestamp mode: Now or Set a time (ISO 8601 UTC, Unix).',
  s3Label: 'Step 3.',
  s3Title: 'Click Generate UUIDs.',
  s4Label: 'Step 4.',
  s4Title: 'Copy any value with one click, or Copy All.',
  s5Label: 'Step 5.',
  s5Title: 'Read the color-coded inspector to understand each field.',
  s6Label: 'Step 6.',
  s6Title: 'Switch to Timestamp extraction tool to decode an existing UUID v7.',
  faq1Title: 'What is UUID v7?',
  faq1BodyBefore:
    'UUID v7 is a 128-bit identifier defined in ',
  faq1LinkText: 'RFC 9562',
  faq1BodyAfter:
    '. It embeds a 48-bit Unix timestamp in milliseconds, followed by a 4-bit version marker (7), a 12-bit random/sequence segment, a 2-bit variant (RFC 4122), and a 62-bit random segment. The time component yields mostly monotonic, time-ordered IDs that sort well while retaining strong randomness.',
  faq1Href: 'https://www.rfc-editor.org/rfc/rfc9562.html#name-uuid-version-7',
  faq2Title: 'Common uses',
  faq2b1: 'Database keys: time-ordered inserts with good index locality.',
  faq2b2: 'Event IDs: sortable by creation time without extra columns.',
  faq2b3: 'Log correlation: embedded millisecond timestamp for triage.',
  bpTitle: 'Why Use UUID v7 (UUIDv7) Instead of UUID v4?',
  bpBody:
    'UUID v4 is fully random, which means newly inserted rows scatter across a B-tree index and force expensive page splits — a real performance problem at high write volume. UUIDv7 prepends a 48-bit millisecond Unix timestamp before the random bits, so newly generated IDs sort lexicographically by creation time, cluster together in the index, and behave well under concurrent inserts. You keep the global uniqueness of v4 and gain the index locality of an auto-increment integer, without the privacy or coordination cost of either.',
  gridTitle: 'Is UUID v7 globally unique?',
  gridBody:
    'UUIDs are designed for extremely low collision probability when generated correctly. v7 combines a timestamp with large random sections to maintain that property.',
} as const;

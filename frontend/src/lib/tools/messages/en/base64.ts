export const base64 = {
  metaTitle: 'Base64 Decode and Encode | Authgear',
  metaDescription:
    'Encode or decode Base64 with precise charset control. A developer-friendly tool for inspecting raw data, converting payloads, and debugging encoding issues.',
  heroTitle: 'Base64 Decode & Encode',
  heroDescription: 'Easily decode or encode Base64 strings directly in your browser.',
  iframeTitle: 'Base64 Encoder & Decoder',
  policy:
    'Your data security is our top priority. All encoding and decoding happen locally in your browser. This tool does not store or send any data outside of your device.',
  card1Title: 'Simple & Fast',
  card1Desc: 'Encode or decode any text or Base64 string instantly with a single click.',
  card2Title: '100% Client-Side',
  card2Desc: 'No data is sent to any server. Everything runs safely within your browser.',
  card3Title: 'Developer-friendly.',
  card3Desc: 'Easy to use this tool to encode or decode Base64 data accurately and efficiently.',
  card4Title: 'Supports Base64URL',
  card4Desc:
    'Decrypt a JWE token to retrieve the original JWT—including the payload—for analysis.',
  step1Label: 'Step 1.',
  step1Title: 'Choose a character set',
  step1Item1:
    'Select the character set you want to use, such as UTF-8. This determines how your text is converted before encoding or after decoding.',
  step2Label: 'Step 2.',
  step2Title: 'Encode plain text',
  step2Item1:
    'In the Decoded Text section, type or paste your text and click Encode. The Base64 result will appear in the output area of the same section.',
  step3Label: 'Step 3.',
  step3Title: 'Decode Base64',
  step3Item1:
    'In the Encoded Text section, enter your Base64 string and click Decode. The decoded text will be displayed in that section.',
  faqWhatTitle: 'What Is Base64 Encoding?',
  faqWhatBody:
    'Base64 is a binary to text encoding format that represents binary data using ASCII characters.\nIt allows binary content to be included safely inside formats such as JSON, XML, or HTTP headers.\nExample:\nAuthgear → QXV0aGdlYXI=',
  faqUrlTitle: 'What Is the Difference Between Base64 and Base64URL?',
  faqUrlBody:
    'Base64URL is a version of Base64 designed for URLs and token formats. It replaces the characters + with - and / with _, and padding characters (=) are often removed for URL safety.\nThis format is commonly used in JWTs, OAuth tokens, and OpenID Connect.',
} as const;

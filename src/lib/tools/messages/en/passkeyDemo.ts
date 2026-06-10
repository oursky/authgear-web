export const passkeyDemo = {
  metaTitle: 'Passkey Demo & WebAuthn Tester: Try Passkeys in Your Browser',
  metaDescription:
    'Create a real passkey, inspect the WebAuthn credential, and verify a sign-in, all locally in your browser. Nothing is transmitted or stored on any server.',
  heroTitle: 'Passkey Demo & WebAuthn Tester',
  heroDescription:
    'Create a real passkey with the WebAuthn API, inspect the decoded credential, and sign in to watch every verification step a server would run. Everything happens locally in your browser with WebCrypto. No account needed, and nothing leaves your device.',
  iframeTitle: 'Passkey Demo & WebAuthn Tester',
  policyPrefix:
    'Your data security is our top priority. Passkey creation, credential inspection, and signature verification all happen entirely in your browser using the WebAuthn and WebCrypto APIs. There is no backend, and this tool does not transmit or store anything outside of your device. See source code in: ',
  policyLink: 'https://github.com/oursky/authgear-web',
  howSectionTitle: 'How the Passkey Demo Works',
  step1Title: 'Choose Creation Options:',
  step1Body:
    'Pick authenticator attachment, user verification, resident key, attestation, and algorithms. The PublicKeyCredentialCreationOptions JSON updates live as you change them.',
  step2Title: 'Create a Passkey:',
  step2Body:
    'The browser calls navigator.credentials.create() and your device prompts for Face ID, Touch ID, Windows Hello, or a security key.',
  step3Title: 'Inspect the Credential:',
  step3Body:
    'The tool decodes clientDataJSON and CBOR-decodes the attestation object: flags, sign count, AAGUID (the authenticator model), credential ID, and the public key as JWK and PEM.',
  step4Title: 'Sign In With It:',
  step4Body:
    'navigator.credentials.get() produces an assertion, either from your stored credential list or via the discoverable-credential flow with an empty allow-list.',
  step5Title: 'Verify Like a Server:',
  step5Body:
    'Every check a real server runs gets a pass/fail badge with an explanation: ceremony type, challenge, origin, RP ID hash, flags, and the WebCrypto signature verification.',
  howGuideText: 'Ready to add passkeys to your own app?',
  howGuideLinkText: 'Read the developer guide to implementing passkeys',
  howGuideHref: '/post/how-to-implement-passkeys-developer-guide',
  platformsTitle: 'Supported Platforms',
  platformsIntro:
    'Passkeys work across every major platform and sync within each ecosystem. This demo runs in any browser with WebAuthn support.',
  plat1Name: 'Apple',
  plat1Desc: 'iOS 16+ and macOS 13+. Face ID or Touch ID, synced via iCloud Keychain.',
  plat2Name: 'Android & Chrome',
  plat2Desc: 'Android 9+. Fingerprint or screen lock, synced via Google Password Manager.',
  plat3Name: 'Windows',
  plat3Desc: 'Windows 10 and 11. Windows Hello face, fingerprint, or PIN.',
  plat4Name: 'Password Managers',
  plat4Desc: '1Password, Bitwarden, Dashlane, Proton Pass and others store and sync passkeys cross-platform.',
  plat5Name: 'Security Keys',
  plat5Desc: 'YubiKey and other FIDO2 hardware keys work via the cross-platform (USB/NFC) transport.',
  readyTitle: 'Ready to Ship Passkeys in Your Own App?',
  readySubtitle: 'Authgear gives you passkey login out of the box, no WebAuthn plumbing required.',
  readyCta: 'Explore Authgear Passkeys',
  faqWebauthnTitle: 'What is WebAuthn?',
  faqWebauthnBody:
    'WebAuthn (Web Authentication) is the W3C standard browser API behind passkeys. Instead of a shared password, your device creates a public/private key pair per site: the private key never leaves your authenticator, and the site stores only the public key. Sign-in is a challenge-response signature. Passkeys resist phishing because the browser binds every credential to the exact origin that created it.',
  faqWebauthnLinkText: 'See our developer guide to implementing passkeys.',
  faqWebauthnLinkHref: '/post/how-to-implement-passkeys-developer-guide',
  faqSafeTitle: 'Is it safe to create a passkey here?',
  faqSafeBody:
    'Yes. The passkey this page creates is real, but it is scoped to this site only and useful for nothing but this demo. The private key stays in your device’s authenticator; the public key and credential metadata are kept only in your browser’s localStorage. There is no server, so nothing is transmitted anywhere. You can delete the demo record with one click and remove the passkey itself from your device at any time.',
  faqDeleteTitle: 'How do I delete the demo passkey from my device?',
  faqDeleteIntro:
    '“Forget” in the tool only removes this page’s record. To remove the passkey from your device:',
  faqDeleteIos: 'iOS / macOS: Settings → Passwords (or the Passwords app) → find this site → delete the passkey.',
  faqDeleteAndroid: 'Android / Chrome: Google Password Manager → Passwords → find this site → delete.',
  faqDeleteWindows: 'Windows: Settings → Accounts → Passkeys → find this site → remove.',
  faqDeleteManagers: 'Password managers (1Password, Bitwarden, …): find the item for this site and delete it there.',
  faqAaguidTitle: 'What is an AAGUID?',
  faqAaguidBody:
    'The AAGUID (Authenticator Attestation Globally Unique Identifier) is a 16-byte ID that identifies the authenticator model (say, Google Password Manager or a YubiKey 5), not your individual device. This tool resolves it against a bundled snapshot of the community-maintained passkey-authenticator-aaguids list. With attestation set to “none” (the default), many authenticators zero it out for privacy.',
  faqSignCountTitle: 'Why does the sign count show 0?',
  faqSignCountBody:
    'The signature counter was designed to detect cloned credentials: each use should increment it. But a synced passkey lives on several devices at once and can’t maintain one shared counter, so most passkey providers (iCloud Keychain, Google Password Manager) always report 0, meaning “counter not supported”. Hardware security keys usually do increment it.',
} as const;

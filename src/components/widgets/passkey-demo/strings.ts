// src/components/widgets/passkey-demo/strings.ts
//
// All user-facing widget strings, per locale. The page chrome (hero, FAQ)
// lives in src/lib/tools/messages/{en,zh-Hant}/passkeyDemo.ts; this catalog
// covers the interactive island only. Components read it via useStrings()
// (see StringsContext.tsx); the pure lib functions (errors, verifyAssertion)
// take their section as a parameter.
//
// Conventions (mirrors the zh-Hant page copy): 通行密鑰 for passkey, 驗證器
// for authenticator; API names (clientDataJSON, attestation, challenge,
// COSE…) stay in English. No em dashes in either locale.

export type ParamKey =
  | 'userName'
  | 'attachment'
  | 'userVerification'
  | 'residentKey'
  | 'attestation'
  | 'algorithms';

export interface ParamInfo {
  title: string;
  description: string;
  options?: { name: string; desc: string }[];
}

export interface WidgetStrings {
  /** BCP-47 tag for Date#toLocaleString etc. */
  bcp47: string;

  widget: {
    checkingSupport: string;
    unsupportedTitle: string;
    /** Rendered around a <code>window.PublicKeyCredential</code> element. */
    unsupportedBeforeCode: string;
    unsupportedAfterCode: string;
    platformAuthLabel: string;
    platformAuthTip: string;
    condMediationLabel: string;
    condMediationTip: string;
    stateAvailable: string;
    stateUnavailable: string;
    stateUnknown: string;
  };

  create: {
    title: string;
    userName: string;
    attachment: string;
    userVerification: string;
    residentKey: string;
    attestation: string;
    algorithms: string;
    optAttachmentUnset: string;
    optAttachmentPlatform: string;
    optAttachmentCross: string;
    optPreferredDefault: string;
    optRequired: string;
    optDiscouraged: string;
    optNoneDefault: string;
    optDirect: string;
    optEs256: string;
    optEs256AndRs256: string;
    optionsHeading: string;
    button: string;
    buttonBusy: string;
    /** sr-only suffix on the clickable field labels. */
    whatsThis: string;
    noAttestedData: string;
  };

  paramInfo: Record<ParamKey, ParamInfo> & { gotIt: string };

  list: {
    title: string;
    uvButtonPrefix: string;
    emptyTitle: string;
    emptyHint: string;
    anyPasskey: string;
    anyPasskeyHint: string;
    waiting: string;
    forgetAll: string;
    dismiss: string;
    unknownCredential: string;
  };

  row: {
    signIn: string;
    waiting: string;
    forget: string;
    forgetAria: (name: string) => string;
    createdAt: (date: string) => string;
    regOptions: string;
    regUv: string;
    regUvTip: string;
    regRk: string;
    regRkTip: string;
    regAttestation: string;
    regAttestationTip: string;
    regTransports: string;
    regTransportsTip: string;
    decoding: string;
    lastVerification: string;
    dismissVerification: string;
  };

  details: {
    clientDataTip: string;
    clientDataSuffix: string;
    attObjTip: string;
    attObjSuffix: string;
    fmtTip: string;
    fmtNote: string;
    flagsTip: string;
    signCountTip: string;
    aaguidTip: string;
    unknownAuthenticator: string;
    aaguidNotProvided: string;
    rpIdHashTip: string;
    credentialIdTip: string;
    publicKeyJwk: (alg: number | null) => string;
    publicKeyPem: string;
    jwkPromo: string;
    jwkPromoLink: string;
    jwkPromoHref: string;
  };

  copy: { copy: string; copied: string };

  flags: { up: string; uv: string; be: string; bs: string; at: string };

  steps: { pass: string; fail: string; info: string; ariaLabel: string };

  uvModal: {
    title: string;
    /** Rendered around a <code>userVerification</code> element. */
    introBeforeCode: string;
    introAfterCode: string;
    preferredLabel: string;
    preferredTag: string;
    preferredDesc: string;
    requiredLabel: string;
    requiredDesc: string;
    discouragedLabel: string;
    discouragedDesc: string;
    footnote: string;
    done: string;
  };

  forgetAll: { title: string; body: string; cancel: string; confirm: string };

  forgetOne: {
    title: string;
    /** Body renders bodyBefore [<strong>name</strong> nameSuffix] bodyAfter. */
    bodyBefore: string;
    nameOf: string;
    bodyAfter: string;
    cancel: string;
    confirm: string;
  };

  modal: { close: string };

  errors: {
    notAllowedCreate: string;
    notAllowedGet: string;
    invalidState: string;
    security: string;
    abort: string;
    notSupported: string;
    unexpected: (msg: string) => string;
  };

  verify: {
    typeLabel: string;
    typeDetail: (got: string) => string;
    challengeLabel: string;
    challengeDetail: string;
    originLabel: (origin: string) => string;
    originDetail: (got: string) => string;
    authDataParseLabel: string;
    authDataParseDetail: (err: string) => string;
    rpIdHashLabel: (rpId: string) => string;
    rpIdHashDetail: string;
    flagsLabel: string;
    flagsDetail: (up: boolean, uv: boolean, requested: string) => string;
    signatureLabel: string;
    signatureVerified: string;
    signatureUnsupportedAlg: (alg: number) => string;
    signatureFailed: string;
    signatureThrew: (msg: string) => string;
    signCountLabel: string;
    signCountZero: string;
    signCountAdvanced: (prev: number, next: number) => string;
    signCountNotAdvanced: (prev: number, next: number) => string;
  };
}

export const EN: WidgetStrings = {
  bcp47: 'en',

  widget: {
    checkingSupport: 'Checking WebAuthn support…',
    unsupportedTitle: 'Your browser doesn’t support WebAuthn',
    unsupportedBeforeCode: 'This demo needs the WebAuthn API (',
    unsupportedAfterCode: '). Try a current Chrome, Edge, Safari, or Firefox.',
    platformAuthLabel: 'Platform authenticator',
    platformAuthTip: 'Whether this device has Touch ID, Face ID, or Windows Hello to create a passkey.',
    condMediationLabel: 'Conditional mediation',
    condMediationTip:
      'Autofill UI: whether the browser can show your passkeys in the sign-in field’s autofill, instead of a popup.',
    stateAvailable: 'available',
    stateUnavailable: 'unavailable',
    stateUnknown: 'unknown',
  },

  create: {
    title: 'Create a passkey',
    userName: 'User name',
    attachment: 'Authenticator attachment',
    userVerification: 'User verification',
    residentKey: 'Resident key (discoverable)',
    attestation: 'Attestation',
    algorithms: 'Signature algorithms',
    optAttachmentUnset: 'unset (any authenticator)',
    optAttachmentPlatform: 'platform (this device)',
    optAttachmentCross: 'cross-platform (security key / phone)',
    optPreferredDefault: 'preferred (default)',
    optRequired: 'required',
    optDiscouraged: 'discouraged',
    optNoneDefault: 'none (default)',
    optDirect: 'direct',
    optEs256: 'ES256 (−7)',
    optEs256AndRs256: 'ES256 (−7) + RS256 (−257)',
    optionsHeading: 'PublicKeyCredentialCreationOptions',
    button: 'Create a passkey',
    buttonBusy: 'Waiting for your authenticator…',
    whatsThis: ': what’s this?',
    noAttestedData: 'The authenticator returned no attested credential data.',
  },

  paramInfo: {
    gotIt: 'Got it',
    userName: {
      title: 'User name',
      description:
        'The account label this passkey belongs to. It shows in your device’s passkey or password-manager UI. In a real app it’s the username or email; a separate random user ID is generated for you.',
    },
    attachment: {
      title: 'Authenticator attachment',
      description: 'Which kind of authenticator can create the passkey.',
      options: [
        { name: 'unset (any authenticator)', desc: 'No preference; the browser offers whatever is available.' },
        {
          name: 'platform (this device)',
          desc: 'A built-in authenticator like Touch ID or Windows Hello, bound to this device.',
        },
        {
          name: 'cross-platform (security key / phone)',
          desc: 'A roaming authenticator such as a USB security key or a phone.',
        },
      ],
    },
    userVerification: {
      title: 'User verification',
      description:
        'Whether the authenticator must check it’s really you (biometric or PIN) when creating the passkey.',
      options: [
        { name: 'preferred (default)', desc: 'Verify if the device can, but allow it either way.' },
        { name: 'required', desc: 'Must verify, or creation fails. For sensitive apps.' },
        { name: 'discouraged', desc: 'Skip verification; just confirm someone’s present.' },
      ],
    },
    residentKey: {
      title: 'Resident key (discoverable)',
      description:
        'Whether the passkey is “discoverable” (stored on the authenticator). Discoverable passkeys let you sign in without typing a username first.',
      options: [
        { name: 'preferred (default)', desc: 'Make it discoverable if the authenticator supports it.' },
        { name: 'required', desc: 'Must be discoverable, or creation fails. Needed for usernameless sign-in.' },
        { name: 'discouraged', desc: 'Prefer a non-discoverable credential (the server stores its ID).' },
      ],
    },
    attestation: {
      title: 'Attestation',
      description:
        'Whether the authenticator returns a signed statement about its make and model that a server could verify.',
      options: [
        { name: 'none (default)', desc: 'No attestation. Most private; the AAGUID is often zeroed.' },
        {
          name: 'direct',
          desc: 'Return the authenticator’s attestation statement (reveals its model). For enterprise or regulated use.',
        },
      ],
    },
    algorithms: {
      title: 'Signature algorithms',
      description:
        'The signing algorithms your app accepts, in order of preference. The authenticator picks the first one it supports. The numbers are COSE algorithm IDs.',
      options: [
        { name: 'ES256 (−7)', desc: 'ECDSA on P-256 with SHA-256. The near-universal passkey algorithm.' },
        {
          name: 'ES256 (−7) + RS256 (−257)',
          desc: 'Also accept RS256 (RSA with SHA-256), a fallback some authenticators use.',
        },
      ],
    },
  },

  list: {
    title: 'Your passkeys',
    uvButtonPrefix: 'User verification: ',
    emptyTitle: 'No passkeys yet',
    emptyHint: 'Create one above to inspect it and sign in.',
    anyPasskey: 'Sign in with any passkey',
    anyPasskeyHint: 'The browser offers any passkey saved for this site.',
    waiting: 'Waiting…',
    forgetAll: 'Forget all passkeys',
    dismiss: 'Dismiss',
    unknownCredential:
      'This page has no record of that passkey, so its signature can’t be verified. Create one above first.',
  },

  row: {
    signIn: 'Sign in',
    waiting: 'Waiting…',
    forget: 'Forget',
    forgetAria: (name) => `Forget ${name}`,
    createdAt: (date) => `created ${date}`,
    regOptions: 'Registration options',
    regUv: 'User verification',
    regUvTip: 'Whether the authenticator was asked to confirm it’s you (biometric or PIN) during registration.',
    regRk: 'Resident key',
    regRkTip:
      'Whether the passkey is discoverable, stored on the authenticator so you can sign in without typing a username.',
    regAttestation: 'Attestation',
    regAttestationTip: 'Whether the authenticator returned a signed statement about its make and model.',
    regTransports: 'Transports',
    regTransportsTip:
      'How the authenticator can be reached: internal (this device), usb, nfc, ble, or hybrid (a nearby phone).',
    decoding: 'Decoding…',
    lastVerification: 'Last sign-in verification',
    dismissVerification: 'Dismiss verification',
  },

  details: {
    clientDataTip:
      'What the browser saw during this ceremony: the request type, the challenge, and the origin. The authenticator signs over a hash of this.',
    clientDataSuffix: '(decoded)',
    attObjTip: 'The authenticator’s signed registration response, encoded as CBOR. Decoded here into its parts.',
    attObjSuffix: '(CBOR-decoded)',
    fmtTip: 'Attestation statement format, e.g. “none”, “packed”, or “fido-u2f”.',
    fmtNote: 'A real server may validate the attestation statement further; this demo displays it only.',
    flagsTip:
      'Bits the authenticator set at registration: user present (UP), user verified (UV), and whether attested key data is included.',
    signCountTip:
      'A counter the authenticator can raise on each use, to help servers spot cloned credentials. Often 0 for synced passkeys.',
    aaguidTip: 'A 128-bit identifier for the authenticator’s make and model. Often all-zero for privacy.',
    unknownAuthenticator: 'Unknown authenticator',
    aaguidNotProvided: 'Not provided: attestation "none" zeroes the AAGUID',
    rpIdHashTip: 'SHA-256 of the relying party ID (this site’s domain), binding the passkey to this site.',
    credentialIdTip: 'The unique ID of this passkey, sent at sign-in so the server knows which key to check.',
    publicKeyJwk: (alg) => (alg !== null ? `Public key (JWK, COSE alg ${alg})` : 'Public key (JWK)'),
    publicKeyPem: 'Public key (PEM)',
    jwkPromo: 'Want to generate and convert keys like this?',
    jwkPromoLink: 'Try our JWK Generator',
    jwkPromoHref: '/tools/jwk-generator',
  },

  copy: { copy: 'Copy', copied: 'Copied' },

  flags: {
    up: 'User Present: someone interacted with the authenticator',
    uv: 'User Verified: biometric or PIN check passed',
    be: 'Backup Eligible: the credential can sync between devices (a passkey)',
    bs: 'Backup State: the credential is currently backed up',
    at: 'Attested credential data is included',
  },

  steps: { pass: 'PASS', fail: 'FAIL', info: 'INFO', ariaLabel: 'Server verification steps' },

  uvModal: {
    title: 'User verification',
    introBeforeCode: 'Whether the authenticator must verify it’s you (biometric or PIN) on sign-in. Sets ',
    introAfterCode: '; watch the UV flag in the verification steps.',
    preferredLabel: 'Preferred',
    preferredTag: 'default',
    preferredDesc: 'Verify if the device can, but allow sign-in either way. Good default.',
    requiredLabel: 'Required',
    requiredDesc: 'Must verify with biometric or PIN, or sign-in fails. For sensitive actions.',
    discouragedLabel: 'Discouraged',
    discouragedDesc: 'Skip verification; just confirm someone’s present. Fastest, least secure.',
    footnote: 'Applies to both sign-in buttons.',
    done: 'Done',
  },

  forgetAll: {
    title: 'Forget all passkeys?',
    body: 'Removes these passkeys from this page only (your browser’s localStorage). They stay in your keychain or password manager until you remove them there.',
    cancel: 'Cancel',
    confirm: 'Forget all',
  },

  forgetOne: {
    title: 'Forget this passkey?',
    bodyBefore: 'Removes this page’s record',
    nameOf: ' of ',
    bodyAfter:
      ' only (your browser’s localStorage). The passkey stays in your keychain or password manager until you remove it there.',
    cancel: 'Cancel',
    confirm: 'Forget',
  },

  modal: { close: 'Close' },

  errors: {
    notAllowedCreate:
      'Cancelled or timed out (NotAllowedError). Complete the Face ID, fingerprint, or PIN prompt and try again.',
    notAllowedGet:
      'Cancelled, timed out, or no matching passkey (NotAllowedError). Create one above, then try again.',
    invalidState:
      'This device already has a passkey for that user name (InvalidStateError). Use a different name, or remove the existing one.',
    security:
      'Blocked for security (SecurityError). WebAuthn needs HTTPS and an RP ID matching the page (localhost is exempt).',
    abort: 'Request aborted (AbortError). Another WebAuthn request started first.',
    notSupported:
      'Your authenticator doesn’t support the chosen options (NotSupportedError). Re-enable ES256 and try again.',
    unexpected: (msg) => `Unexpected error: ${msg}`,
  },

  verify: {
    typeLabel: 'clientDataJSON.type is "webauthn.get"',
    typeDetail: (got) =>
      `Got "${got}". Must be "webauthn.get" so a registration signature can’t be replayed as a sign-in.`,
    challengeLabel: 'Challenge matches the one issued',
    challengeDetail:
      'Must match the challenge issued for this attempt, so a captured assertion can’t be replayed.',
    originLabel: (origin) => `Origin is ${origin}`,
    originDetail: (got) =>
      `Got "${got}". The browser sets this and the page can’t forge it, which makes passkeys phishing-resistant.`,
    authDataParseLabel: 'Authenticator data parses',
    authDataParseDetail: (err) => `Couldn’t parse authenticatorData: ${err}`,
    rpIdHashLabel: (rpId) => `rpIdHash matches SHA-256("${rpId}")`,
    rpIdHashDetail:
      'Binds the assertion to this site’s RP ID, so a passkey from another site can’t answer here.',
    flagsLabel: 'UP / UV flags as requested',
    flagsDetail: (up, uv, requested) =>
      `UP (user present) = ${up}, UV (user verified) = ${uv}. UP is always required; UV is required when you ask for it (you chose "${requested}").`,
    signatureLabel: 'Signature verifies against the stored public key',
    signatureVerified:
      'WebCrypto verified the signature against the public key saved at registration. This is the core check.',
    signatureUnsupportedAlg: (alg) =>
      `Unsupported COSE algorithm ${alg}. This demo verifies ES256 (-7) and RS256 (-257).`,
    signatureFailed: 'The signature didn’t verify against the stored public key.',
    signatureThrew: (msg) => `Verification threw: ${msg}`,
    signCountLabel: 'Sign count progression',
    signCountZero:
      'Reports 0. Synced passkeys (iCloud Keychain, Google Password Manager) usually do; servers treat 0 as "no counter".',
    signCountAdvanced: (prev, next) =>
      `Advanced from ${prev} to ${next}. Servers can use this to spot cloned credentials.`,
    signCountNotAdvanced: (prev, next) =>
      `Didn’t advance (${prev} to ${next}). Unreliable for synced passkeys, so usually informational.`,
  },
};

export const ZH_HANT: WidgetStrings = {
  bcp47: 'zh-Hant',

  widget: {
    checkingSupport: '正在檢查 WebAuthn 支援…',
    unsupportedTitle: '你的瀏覽器不支援 WebAuthn',
    unsupportedBeforeCode: '此示範需要 WebAuthn API（',
    unsupportedAfterCode: '）。請改用最新版的 Chrome、Edge、Safari 或 Firefox。',
    platformAuthLabel: '平台驗證器',
    platformAuthTip: '此裝置是否具備 Touch ID、Face ID 或 Windows Hello 可建立通行密鑰。',
    condMediationLabel: '條件式中介',
    condMediationTip: '自動填入 UI：瀏覽器能否在登入欄位的自動填入中顯示你的通行密鑰，而不是另開視窗。',
    stateAvailable: '可用',
    stateUnavailable: '不可用',
    stateUnknown: '未知',
  },

  create: {
    title: '建立通行密鑰',
    userName: '使用者名稱',
    attachment: '驗證器類型',
    userVerification: '使用者驗證',
    residentKey: '可探索憑證（resident key）',
    attestation: 'Attestation',
    algorithms: '簽章演算法',
    optAttachmentUnset: '不指定（任何驗證器）',
    optAttachmentPlatform: 'platform（此裝置）',
    optAttachmentCross: 'cross-platform（安全金鑰／手機）',
    optPreferredDefault: 'preferred（預設）',
    optRequired: 'required',
    optDiscouraged: 'discouraged',
    optNoneDefault: 'none（預設）',
    optDirect: 'direct',
    optEs256: 'ES256 (−7)',
    optEs256AndRs256: 'ES256 (−7) + RS256 (−257)',
    optionsHeading: 'PublicKeyCredentialCreationOptions',
    button: '建立通行密鑰',
    buttonBusy: '等待你的驗證器回應…',
    whatsThis: '：這是什麼？',
    noAttestedData: '驗證器沒有回傳憑證資料（attested credential data）。',
  },

  paramInfo: {
    gotIt: '知道了',
    userName: {
      title: '使用者名稱',
      description:
        '這個通行密鑰所屬的帳號標籤，會顯示在裝置的通行密鑰或密碼管理員介面中。實際應用中通常是使用者名稱或電子郵件；系統已為你另外產生一組隨機的使用者 ID。',
    },
    attachment: {
      title: '驗證器類型',
      description: '允許哪一種驗證器建立通行密鑰。',
      options: [
        { name: '不指定（任何驗證器）', desc: '不指定偏好，瀏覽器會提供任何可用的驗證器。' },
        { name: 'platform（此裝置）', desc: '內建驗證器，例如 Touch ID 或 Windows Hello，綁定在此裝置上。' },
        { name: 'cross-platform（安全金鑰／手機）', desc: '可攜式驗證器，例如 USB 安全金鑰或手機。' },
      ],
    },
    userVerification: {
      title: '使用者驗證',
      description: '建立通行密鑰時，驗證器是否必須確認是你本人（生物辨識或 PIN）。',
      options: [
        { name: 'preferred（預設）', desc: '裝置能驗證就驗證，但兩種情況都允許。' },
        { name: 'required', desc: '必須驗證，否則建立失敗。適合高敏感應用。' },
        { name: 'discouraged', desc: '略過驗證，只確認有人在場。' },
      ],
    },
    residentKey: {
      title: '可探索憑證（resident key）',
      description:
        '通行密鑰是否為「可探索」（儲存在驗證器上）。可探索的通行密鑰讓你不用先輸入使用者名稱就能登入。',
      options: [
        { name: 'preferred（預設）', desc: '驗證器支援的話就設為可探索。' },
        { name: 'required', desc: '必須可探索，否則建立失敗。無使用者名稱登入需要此設定。' },
        { name: 'discouraged', desc: '偏好不可探索的憑證（由伺服器儲存其 ID）。' },
      ],
    },
    attestation: {
      title: 'Attestation',
      description: '驗證器是否回傳一份伺服器可驗證的簽署聲明，說明其廠牌與型號。',
      options: [
        { name: 'none（預設）', desc: '不附 attestation。最注重隱私；AAGUID 通常會被歸零。' },
        { name: 'direct', desc: '回傳驗證器的 attestation 聲明（會透露其型號）。適合企業或受監管的場景。' },
      ],
    },
    algorithms: {
      title: '簽章演算法',
      description:
        '你的應用程式接受的簽章演算法，依偏好排序。驗證器會選用第一個它支援的演算法。數字是 COSE 演算法 ID。',
      options: [
        { name: 'ES256 (−7)', desc: 'P-256 曲線上的 ECDSA 搭配 SHA-256，幾乎所有通行密鑰都支援。' },
        { name: 'ES256 (−7) + RS256 (−257)', desc: '同時接受 RS256（RSA 搭配 SHA-256），部分驗證器使用的備援演算法。' },
      ],
    },
  },

  list: {
    title: '你的通行密鑰',
    uvButtonPrefix: '使用者驗證：',
    emptyTitle: '尚未有通行密鑰',
    emptyHint: '在上方建立一個，即可檢視內容並登入。',
    anyPasskey: '使用任一通行密鑰登入',
    anyPasskeyHint: '瀏覽器會提供此網站已儲存的任何通行密鑰。',
    waiting: '等待中…',
    forgetAll: '忘記所有通行密鑰',
    dismiss: '關閉',
    unknownCredential: '此頁面沒有該通行密鑰的紀錄，無法驗證其簽章。請先在上方建立一個。',
  },

  row: {
    signIn: '登入',
    waiting: '等待中…',
    forget: '忘記',
    forgetAria: (name) => `忘記 ${name}`,
    createdAt: (date) => `建立於 ${date}`,
    regOptions: '註冊選項',
    regUv: '使用者驗證',
    regUvTip: '註冊時是否要求驗證器確認是你本人（生物辨識或 PIN）。',
    regRk: '可探索憑證',
    regRkTip: '通行密鑰是否為可探索（儲存在驗證器上），讓你不用輸入使用者名稱即可登入。',
    regAttestation: 'Attestation',
    regAttestationTip: '驗證器是否回傳了說明其廠牌與型號的簽署聲明。',
    regTransports: '傳輸方式',
    regTransportsTip: '驗證器的連接方式：internal（此裝置）、usb、nfc、ble 或 hybrid（鄰近的手機）。',
    decoding: '解碼中…',
    lastVerification: '最近一次登入驗證',
    dismissVerification: '關閉驗證結果',
  },

  details: {
    clientDataTip: '瀏覽器在這次流程中看到的內容：請求類型、challenge 與來源。驗證器簽署的是它的雜湊。',
    clientDataSuffix: '（已解碼）',
    attObjTip: '驗證器簽署的註冊回應，以 CBOR 編碼。這裡解碼成各個欄位。',
    attObjSuffix: '（CBOR 已解碼）',
    fmtTip: 'Attestation 聲明格式，例如「none」、「packed」或「fido-u2f」。',
    fmtNote: '真正的伺服器可能會進一步驗證 attestation 聲明；此示範僅顯示內容。',
    flagsTip: '驗證器在註冊時設定的位元：使用者在場（UP）、使用者已驗證（UV），以及是否包含憑證資料。',
    signCountTip: '驗證器每次使用時可遞增的計數器，協助伺服器偵測被複製的憑證。同步通行密鑰通常為 0。',
    aaguidTip: '標示驗證器廠牌與型號的 128 位元識別碼。基於隱私考量常為全零。',
    unknownAuthenticator: '未知驗證器',
    aaguidNotProvided: '未提供：attestation「none」會將 AAGUID 歸零',
    rpIdHashTip: '依賴方 ID（本網站網域）的 SHA-256 雜湊，將通行密鑰綁定到本網站。',
    credentialIdTip: '此通行密鑰的唯一 ID，登入時送出讓伺服器知道要用哪把金鑰驗證。',
    publicKeyJwk: (alg) => (alg !== null ? `公開金鑰（JWK，COSE 演算法 ${alg}）` : '公開金鑰（JWK）'),
    publicKeyPem: '公開金鑰（PEM）',
    jwkPromo: '想產生並轉換這樣的金鑰？',
    jwkPromoLink: '試試我們的 JWK 產生器',
    jwkPromoHref: '/zh-hant/tools/jwk-generator',
  },

  copy: { copy: '複製', copied: '已複製' },

  flags: {
    up: '使用者在場（User Present）：有人操作了驗證器',
    uv: '使用者已驗證（User Verified）：通過生物辨識或 PIN 檢查',
    be: '可備份（Backup Eligible）：憑證可在裝置間同步（即通行密鑰）',
    bs: '備份狀態（Backup State）：憑證目前已備份',
    at: '包含憑證資料（attested credential data）',
  },

  steps: { pass: '通過', fail: '失敗', info: '資訊', ariaLabel: '伺服器驗證步驟' },

  uvModal: {
    title: '使用者驗證',
    introBeforeCode: '登入時驗證器是否必須確認是你本人（生物辨識或 PIN）。此設定對應 ',
    introAfterCode: '；可在驗證步驟中觀察 UV 旗標。',
    preferredLabel: 'Preferred',
    preferredTag: '預設',
    preferredDesc: '裝置能驗證就驗證，兩種情況都允許登入。建議的預設值。',
    requiredLabel: 'Required',
    requiredDesc: '必須以生物辨識或 PIN 驗證，否則登入失敗。適合敏感操作。',
    discouragedLabel: 'Discouraged',
    discouragedDesc: '略過驗證，只確認有人在場。最快，但安全性最低。',
    footnote: '套用於兩個登入按鈕。',
    done: '完成',
  },

  forgetAll: {
    title: '忘記所有通行密鑰？',
    body: '只會從此頁面移除這些通行密鑰的紀錄（你瀏覽器的 localStorage）。它們仍會保留在你的鑰匙圈或密碼管理員中，直到你在那裡移除。',
    cancel: '取消',
    confirm: '全部忘記',
  },

  forgetOne: {
    title: '忘記這個通行密鑰？',
    bodyBefore: '只會移除此頁面',
    nameOf: '中 ',
    bodyAfter: ' 的紀錄（你瀏覽器的 localStorage）。通行密鑰本身仍會保留在你的鑰匙圈或密碼管理員中，直到你在那裡移除。',
    cancel: '取消',
    confirm: '忘記',
  },

  modal: { close: '關閉' },

  errors: {
    notAllowedCreate: '已取消或逾時（NotAllowedError）。請完成 Face ID、指紋或 PIN 提示後再試一次。',
    notAllowedGet: '已取消、逾時或沒有相符的通行密鑰（NotAllowedError）。請先在上方建立一個再試。',
    invalidState: '此裝置已有該使用者名稱的通行密鑰（InvalidStateError）。請改用其他名稱，或移除現有的。',
    security: '因安全限制被擋下（SecurityError）。WebAuthn 需要 HTTPS，且 RP ID 必須符合頁面（localhost 除外）。',
    abort: '請求已中止（AbortError）。另一個 WebAuthn 請求先開始了。',
    notSupported: '你的驗證器不支援所選的選項（NotSupportedError）。請改回 ES256 後再試。',
    unexpected: (msg) => `未預期的錯誤：${msg}`,
  },

  verify: {
    typeLabel: 'clientDataJSON.type 為 "webauthn.get"',
    typeDetail: (got) => `收到「${got}」。必須是 "webauthn.get"，註冊簽章才無法被重放成登入。`,
    challengeLabel: 'Challenge 與本次發出的一致',
    challengeDetail: '必須與本次嘗試發出的 challenge 一致，被攔截的斷言才無法重放。',
    originLabel: (origin) => `來源為 ${origin}`,
    originDetail: (got) => `收到「${got}」。此值由瀏覽器設定，頁面無法偽造，這是通行密鑰能防範網路釣魚的原因。`,
    authDataParseLabel: 'Authenticator data 可解析',
    authDataParseDetail: (err) => `無法解析 authenticatorData：${err}`,
    rpIdHashLabel: (rpId) => `rpIdHash 符合 SHA-256("${rpId}")`,
    rpIdHashDetail: '將斷言綁定到本網站的 RP ID，其他網站的通行密鑰無法在此使用。',
    flagsLabel: 'UP／UV 旗標符合要求',
    flagsDetail: (up, uv, requested) =>
      `UP（使用者在場）= ${up}，UV（已驗證）= ${uv}。UP 一律必要；UV 在你要求時才必要（你選擇了「${requested}」）。`,
    signatureLabel: '簽章通過儲存的公開金鑰驗證',
    signatureVerified: '已用 WebCrypto 以註冊時儲存的公開金鑰驗證簽章。這是最核心的檢查。',
    signatureUnsupportedAlg: (alg) => `不支援的 COSE 演算法 ${alg}。此示範驗證 ES256 (-7) 與 RS256 (-257)。`,
    signatureFailed: '簽章未能通過儲存的公開金鑰驗證。',
    signatureThrew: (msg) => `驗證時發生例外：${msg}`,
    signCountLabel: '簽章計數變化',
    signCountZero: '回報 0。同步通行密鑰（iCloud 鑰匙圈、Google 密碼管理員）通常如此；伺服器會視為「無計數器」。',
    signCountAdvanced: (prev, next) => `由 ${prev} 遞增至 ${next}。伺服器可藉此偵測被複製的憑證。`,
    signCountNotAdvanced: (prev, next) => `未遞增（${prev} 至 ${next}）。對同步通行密鑰不可靠，通常僅供參考。`,
  },
};

export function stringsForLocale(locale: string): WidgetStrings {
  return locale === 'zh-Hant' ? ZH_HANT : EN;
}

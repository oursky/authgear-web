export const common = {
  moreDevToolsHeading: '更多開發者工具',
  readyTitleDefault: '準備好強化您的驗證體驗了嗎？',
  readySubtitleDefault: '體驗流暢、安全且可擴充的身分管理，盡在 Authgear。',
  getStartedFree: '免費開始使用',
  howToolWorksDefault: '工具運作方式',
  craftedByTag: '此工具由 Authgear 打造',
  supportStarUs: '支持並為我們加星',
  popupHeading: '此開發者工具由 Authgear 打造',
  popupBody:
    '開源的 Auth0／Clerk／Firebase 替代方案。Passkeys、SSO、MFA、無密碼、生物辨識登入。',
  popupStartFree: '免費開始建置',
  popupStarUs: '在 GitHub 為我們加星',
  popupClose: '關閉',
  faqHeading: '常見問題',
  stepLabel: '步驟 {n}.',
  demoCtaText: '正在為您的應用程式建置身分驗證嗎？',
  demoCtaButton: '預約示範',
} as const;

export const registry = {
  'jwt-jwe-debugger': { label: 'JWT 與 JWE 除錯器' },
  'jwk-generator': { label: 'JWK 產生器' },
  'hmac-signature-generator-verifier': { label: 'HMAC 工具' },
  saml: { label: 'SAML 測試工具' },
  'totp-authenticator': { label: 'TOTP 驗證器' },
  'password-hash-generator': { label: '密碼雜湊產生器' },
  'base64-decode-encode': { label: 'Base64 解碼與編碼' },
  'uuidv7-generator': { label: 'UUID v7 產生器與時間戳擷取' },
  'passkey-demo': { label: '通行密鑰示範與 WebAuthn 測試工具' },
  'sms-cost-calculator': { label: 'SMS 成本計算機' },
} as const;

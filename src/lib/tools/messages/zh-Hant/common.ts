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
  // 依工具 slug 顯示的彈窗文案；沒有對應項目時回退到 popupBody。
  popupPitches: {
    'base64-decode-encode':
      '還在手動解碼 token？Authgear 為你簽發並驗證 OIDC token，幾分鐘內為應用程式加入登入功能。',
    'jwt-jwe-debugger':
      '正在除錯 JWT？Authgear 為你簽發、輪換並驗證這些 token，開箱即符合 OIDC 標準。',
    'jwk-generator':
      '手動產生 JWK？Authgear 為你管理金鑰與輪換，幾分鐘內擁有合規的 OIDC 供應商。',
    'oidc-discovery-endpoint':
      '正在研究 OIDC 端點？Authgear 提供完全合規的 OIDC 供應商，discovery、JWKS 與 token 都替你管理。',
    'totp-authenticator':
      '一個下午就能為應用程式加入 TOTP 多因素驗證，Authgear 內建驗證器支援。',
    'password-hash-generator':
      '不必再自行儲存密碼雜湊，Authgear 為你處理雜湊、儲存與帳戶安全。',
    'hmac-signature-generator-verifier':
      '手動簽署請求？Authgear 以標準化 token 與 session 保護你的應用程式。',
    'ssl-checker':
      '憑證沒問題了？用 Authgear 為網站加入安全的託管登入，內建 SSO、MFA 與通行密鑰。',
    'uuidv7-generator':
      '正在產生使用者 ID？Authgear 給每位使用者安全的身分，註冊、SSO 與 MFA 開箱即用。',
    'passkey-demo':
      '喜歡通行密鑰？用 Authgear 一個下午就能讓使用者用上，不必自己寫協定程式碼。',
    'sms-cost-calculator':
      '擔心 OTP 成本？Authgear 可將 OTP 改經 WhatsApp 與電子郵件發送，大幅降低簡訊費用。',
  },
  faqHeading: '常見問題',
  stepLabel: '步驟 {n}.',
  demoCtaText: '正在為您的應用程式建置身分驗證嗎？',
  demoCtaButton: '開始建置',
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

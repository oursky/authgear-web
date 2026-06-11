export type NavLink = {
  path?: string;
  href?: string;
  label: Record<string, string>;
  /** Optional second line rendered under the label (e.g. "(Start for Free)"). */
  note?: Record<string, string>;
};

export type NavColumn =
  | { type: 'simple'; subtitle: Record<string, string>; links: NavLink[] }
  | {
      type: 'stacked';
      sections: { subtitle: Record<string, string>; links: NavLink[] }[];
    }
  | {
      type: 'productColumn';
      subtitle: Record<string, string>;
      links: NavLink[];
    };

export const productsDropdownColumns: NavColumn[] = [
  {
    type: 'simple',
    subtitle: { en: 'SECURITY', 'zh-Hant': '安全性' },
    links: [
      { path: '/features/attack-protection', label: { en: 'Attack Protection', 'zh-Hant': '攻擊防護' } },
      { path: '/features/multi-factor-authentication', label: { en: 'Adaptive MFA', 'zh-Hant': '自適應 MFA' } },
      { path: '/features/sms-pumping-fraud', label: { en: 'SMS Pumping Protection', 'zh-Hant': '簡訊濫發防護' } },
      { path: '/features/authorization', label: { en: 'Authorization', 'zh-Hant': '授權' } },
    ],
  },
  {
    type: 'simple',
    subtitle: { en: 'AUTHENTICATION', 'zh-Hant': '驗證' },
    links: [
      { path: '/features/authentication', label: { en: 'Authentication', 'zh-Hant': '身份驗證' } },
      { path: '/features/single-sign-on', label: { en: 'Single Sign-On', 'zh-Hant': '單一登入' } },
      { path: '/features/social-login', label: { en: 'Social Login', 'zh-Hant': '社群登入' } },
      { path: '/features/passwordless-authentication', label: { en: 'Passwordless', 'zh-Hant': '無密碼登入' } },
      { path: '/features/whatsapp-otp', label: { en: 'WhatsApp OTP', 'zh-Hant': 'WhatsApp OTP' } },
      { path: '/features/passkeys', label: { en: 'Passkeys', 'zh-Hant': '通行密鑰' } },
      { path: '/features/biometric-authentication', label: { en: 'Biometric', 'zh-Hant': '生物辨識' } },
      { path: '/features/machine-to-machine-token', label: { en: 'Machine-to-Machine Token', 'zh-Hant': '機器對機器權杖' } },
    ],
  },
  {
    type: 'simple',
    subtitle: { en: 'USER', 'zh-Hant': '使用者' },
    links: [
      { path: '/features/user-management', label: { en: 'User Management', 'zh-Hant': '使用者管理' } },
      { path: '/features/self-serve-settings-page', label: { en: 'Self-serve Settings', 'zh-Hant': '自助設定' } },
    ],
  },
  {
    type: 'stacked',
    sections: [
      {
        subtitle: { en: 'BRANDING', 'zh-Hant': '品牌' },
        links: [
          { path: '/features/customization', label: { en: 'Customization', 'zh-Hant': '自訂外觀' } },
        ],
      },
      {
        subtitle: { en: 'INTEGRATION', 'zh-Hant': '整合' },
        links: [
          { path: '/features/extensibility', label: { en: 'Extensibility', 'zh-Hant': '擴充性' } },
        ],
      },
    ],
  },
  {
    type: 'productColumn',
    subtitle: { en: 'PRODUCTS', 'zh-Hant': '產品' },
    links: [
      {
        path: '/',
        label: { en: 'On the Cloud', 'zh-Hant': '雲端版' },
        note: { en: '(Start for Free)', 'zh-Hant': '（免費開始）' },
      },
      { path: '/once', label: { en: 'On your Server', 'zh-Hant': '自建版' } },
      { path: '/migrate-to-authgear', label: { en: 'Migrate to Authgear', 'zh-Hant': '遷移至 Authgear' } },
    ],
  },
];

export const solutionsDropdownLinks: NavLink[] = [
  { path: '/solutions/frontline-workers-identity', label: { en: 'Frontline Worker Identity', 'zh-Hant': '第一線員工身份' } },
  { path: '/solutions/ciam-solution', label: { en: 'Customer Identity Management', 'zh-Hant': '客戶身份管理' } },
  { path: '/solutions/b2b-saas-authentication', label: { en: 'B2B SaaS Applications', 'zh-Hant': 'B2B SaaS 應用' } },
  { path: '/solutions/enterprise-sso', label: { en: 'Enterprise SSO', 'zh-Hant': '企業 SSO' } },
  { path: '/solutions/reduce-sms-otp-cost', label: { en: 'SMS Cost Saving', 'zh-Hant': '簡訊成本優化' } },
];

export const solutionsSideImage: {
  path: string;
  src: string;
  width: number;
  alt: Record<string, string>;
} = {
  path: '/migrate-to-authgear',
  src: '/images/nav_solutions_migrate2x.webp',
  width: 810,
  alt: { en: '', 'zh-Hant': '' },
};

export const resourcesDropdownLinks: NavLink[] = [
  { path: '/blog', label: { en: 'Blog', 'zh-Hant': '部落格' } },
  { path: '/customer-stories', label: { en: 'Case Studies', 'zh-Hant': '客戶案例' } },
  { path: '/compare/okta-alternative', label: { en: 'Comparison', 'zh-Hant': '產品比較' } },
  { path: '/login-gallery', label: { en: 'Login Gallery', 'zh-Hant': '登入畫廊' } },
  { path: '/glossary', label: { en: 'Glossary', 'zh-Hant': '名詞解釋' } },
];

export const developersDropdownLinks: NavLink[] = [
  { href: 'https://docs.authgear.com/', label: { en: 'Documentation', 'zh-Hant': '文件' } },
  { href: 'https://github.com/authgear', label: { en: 'Github', 'zh-Hant': 'GitHub' } },
  { path: '/whats-new', label: { en: "What's New", 'zh-Hant': '最新動態' } },
];

export const footerStrings: Record<string, Record<string, string>> = {
  poweredBy: { en: 'Authgear powered by ', 'zh-Hant': 'Authgear 由 ' },
  poweredBySuffix: { en: '', 'zh-Hant': ' 提供' },
  isoCertAlt: { en: 'ISO 27001 Certified', 'zh-Hant': 'ISO 27001 認證' },
  productsTitle: { en: 'Products', 'zh-Hant': '產品' },
  onYourServer: { en: 'On your Server (ONCE)', 'zh-Hant': '自建版（ONCE）' },
  onTheCloud: { en: 'On the Cloud', 'zh-Hant': '雲端版' },
  pricing: { en: 'Pricing', 'zh-Hant': '定價' },
  samlMigration: { en: 'SAML Migration', 'zh-Hant': 'SAML 遷移' },
  alternativeTitle: { en: 'alternative', 'zh-Hant': '產品替代方案' },
  oktaAlternative: { en: 'Okta Alternative', 'zh-Hant': 'Okta 替代方案' },
  auth0Alternative: { en: 'Auth0 Alternative', 'zh-Hant': 'Auth0 替代方案' },
  cognitoAlternative: { en: 'Cognito Alternative', 'zh-Hant': 'Cognito 替代方案' },
  firebaseAlternative: { en: 'Firebase Alternative', 'zh-Hant': 'Firebase 替代方案' },
  developersTitle: { en: 'developers', 'zh-Hant': '開發者' },
  documentation: { en: 'Documentation', 'zh-Hant': '文件' },
  apiReference: { en: 'API Reference', 'zh-Hant': 'API 參考' },
  communityForum: { en: 'Community Forum', 'zh-Hant': '社群論壇' },
  integrations: { en: 'Integrations', 'zh-Hant': '整合' },
  resourcesTitle: { en: 'resources', 'zh-Hant': '資源' },
  blog: { en: 'Blog', 'zh-Hant': '部落格' },
  loginGallery: { en: 'Login Gallery', 'zh-Hant': '登入畫廊' },
  glossary: { en: 'Glossary', 'zh-Hant': '名詞解釋' },
  security: { en: 'Security & Compliance', 'zh-Hant': '安全性與合規' },
  acceptableUsePolicy: { en: 'Acceptable Use Policy', 'zh-Hant': '合理使用政策' },
  complianceText: {
    en: 'Authgear is both ISO 27001 and SoC 2 Type II compliant.',
    'zh-Hant': 'Authgear 已通過 ISO 27001 與 SoC 2 Type II 認證。',
  },
  passkeyPledgeAlt: { en: 'Passkey Pledge Partner', 'zh-Hant': 'Passkey Pledge 合作夥伴' },
  cookieSettings: { en: 'Cookie settings', 'zh-Hant': 'Cookie 設定' },
  termsOfService: { en: 'Terms', 'zh-Hant': '服務條款' },
  privacyPolicy: { en: 'Privacy', 'zh-Hant': '隱私權政策' },
  dataPrivacy: { en: 'Data Privacy', 'zh-Hant': '資料隱私' },
  enterpriseLicenses: { en: 'Enterprise Licenses', 'zh-Hant': '企業授權' },
  dataProcessingAddendum: { en: 'DPA', 'zh-Hant': '資料處理附錄' },
  subProcessors: { en: 'Sub-Processors', 'zh-Hant': '次處理者' },
  sla: { en: 'SLA', 'zh-Hant': 'SLA' },
  freeToolsTitle: { en: 'Free Tools', 'zh-Hant': '免費工具' },
  oidcDiscovery: { en: 'OIDC Discovery Explorer', 'zh-Hant': 'OIDC Discovery 探索器' },
  sslChecker: { en: 'SSL Checker', 'zh-Hant': 'SSL 檢查工具' },
  uuidv7Generator: { en: 'UUID v7 Generator', 'zh-Hant': 'UUID v7 產生器' },
  uuidv7GeneratorNote: {
    en: '& Timestamp Extractor',
    'zh-Hant': '與時間戳解析器',
  },
  base64: { en: 'Base64 Decode/Encode', 'zh-Hant': 'Base64 編解碼' },
  jwtDebugger: { en: 'JWT & JWE Debugger', 'zh-Hant': 'JWT 與 JWE 除錯器' },
  jwkGenerator: { en: 'JWK Generator', 'zh-Hant': 'JWK 產生器' },
  passwordHash: { en: 'Password Hash Generator/Verifier', 'zh-Hant': '密碼雜湊產生／驗證' },
  hmacSignature: { en: 'HMAC Signature Generator/Verifier', 'zh-Hant': 'HMAC 簽章產生／驗證' },
  samlTestingTool: { en: 'SAML Testing Tool', 'zh-Hant': 'SAML 測試工具' },
  totpAuthenticator: { en: 'TOTP Authenticator', 'zh-Hant': 'TOTP 驗證器' },
  passkeyDemo: { en: 'Passkey Demo & WebAuthn Tester', 'zh-Hant': '通行密鑰示範與 WebAuthn 測試工具' },
  companyTitle: { en: 'company', 'zh-Hant': '公司' },
  aboutUs: { en: 'About Us', 'zh-Hant': '關於我們' },
  contactSales: { en: 'Contact Sales', 'zh-Hant': '聯絡業務' },
  ourPromises: { en: 'Our Promises', 'zh-Hant': '我們的承諾' },
  copyright: { en: 'Authgear. All rights reserved.', 'zh-Hant': 'Authgear。保留所有權利。' },
};

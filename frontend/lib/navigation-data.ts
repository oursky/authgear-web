export type NavLink = {
  path?: string;
  href?: string;
  label: Record<string, string>;
  html?: Record<string, string>;
};

export type NavColumn =
  | { type?: undefined; subtitle: Record<string, string>; links: NavLink[] }
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
    subtitle: { en: 'SECURITY', 'zh-TW': '安全性' },
    links: [
      { path: '/features/attack-protection', label: { en: 'Attack Protection', 'zh-TW': '攻擊防護' } },
      { path: '/features/multi-factor-authentication', label: { en: 'Adaptive MFA', 'zh-TW': '自適應 MFA' } },
      { path: '/features/sms-pumping-fraud', label: { en: 'SMS Pumping Protection', 'zh-TW': '簡訊濫發防護' } },
      { path: '/features/authorization', label: { en: 'Authorization', 'zh-TW': '授權' } },
    ],
  },
  {
    subtitle: { en: 'AUTHENTICATION', 'zh-TW': '驗證' },
    links: [
      { path: '/features/authentication', label: { en: 'Authentication', 'zh-TW': '身份驗證' } },
      { path: '/features/social-login', label: { en: 'Social Login', 'zh-TW': '社群登入' } },
      { path: '/features/passwordless-authentication', label: { en: 'Passwordless', 'zh-TW': '無密碼登入' } },
      { path: '/features/whatsapp-otp', label: { en: 'WhatsApp OTP', 'zh-TW': 'WhatsApp OTP' } },
      { path: '/features/passkeys', label: { en: 'Passkeys', 'zh-TW': '通行金鑰' } },
      { path: '/features/biometric-authentication', label: { en: 'Biometric', 'zh-TW': '生物辨識' } },
      { path: '/features/machine-to-machine-token', label: { en: 'Machine-to-Machine Token', 'zh-TW': '機器對機器權杖' } },
    ],
  },
  {
    subtitle: { en: 'USER', 'zh-TW': '使用者' },
    links: [
      { path: '/features/user-management', label: { en: 'User Management', 'zh-TW': '使用者管理' } },
      { path: '/features/self-serve-settings-page', label: { en: 'Self-serve Settings', 'zh-TW': '自助設定' } },
      { path: '/migrate-to-authgear', label: { en: 'SAML', 'zh-TW': 'SAML' } },
    ],
  },
  {
    type: 'stacked',
    sections: [
      {
        subtitle: { en: 'BRANDING', 'zh-TW': '品牌' },
        links: [
          { path: '/features/customization', label: { en: 'Customization', 'zh-TW': '自訂外觀' } },
        ],
      },
      {
        subtitle: { en: 'INTEGRATION', 'zh-TW': '整合' },
        links: [
          { path: '/features/extensibility', label: { en: 'Extensibility', 'zh-TW': '擴充性' } },
        ],
      },
    ],
  },
  {
    type: 'productColumn',
    subtitle: { en: 'PRODUCTS', 'zh-TW': '產品' },
    links: [
      {
        path: '/',
        label: { en: 'On the Cloud (Start for Free)', 'zh-TW': '雲端版（免費開始）' },
        html: { en: 'On the Cloud<br>(Start for Free)', 'zh-TW': '雲端版<br>（免費開始）' },
      },
      { path: '/once', label: { en: 'On your Server', 'zh-TW': '自建版' } },
      { path: '/migrate-to-authgear', label: { en: 'Migrate to Authgear', 'zh-TW': '遷移至 Authgear' } },
    ],
  },
];

export const solutionsDropdownLinks: NavLink[] = [
  { path: '/solutions/frontline-workers-identity', label: { en: 'Frontline Worker Identity', 'zh-TW': '第一線員工身份' } },
  { path: '/solutions/ciam-solution', label: { en: 'Customer Identity Management', 'zh-TW': '客戶身份管理' } },
  { path: '/solutions/b2b-saas-authentication', label: { en: 'B2B SaaS Applications', 'zh-TW': 'B2B SaaS 應用' } },
  { path: '/solutions/enterprise-sso', label: { en: 'Enterprise SSO', 'zh-TW': '企業 SSO' } },
  { path: '/solutions/reduce-sms-otp-cost', label: { en: 'SMS Cost Saving', 'zh-TW': '簡訊成本優化' } },
];

export const solutionsSideImage: {
  path: string;
  src: string;
  width: number;
  alt: Record<string, string>;
} = {
  path: '/migrate-to-authgear',
  src: '/images/nav_solutions_migrate2x.webp',
  width: 405,
  alt: { en: '', 'zh-TW': '' },
};

export const resourcesDropdownLinks: NavLink[] = [
  { path: '/blog', label: { en: 'Blog', 'zh-TW': '部落格' } },
  { path: '/customer-stories', label: { en: 'Case Studies', 'zh-TW': '客戶案例' } },
  { path: '/compare/okta-alternative', label: { en: 'Comparison', 'zh-TW': '產品比較' } },
  { path: '/login-gallery', label: { en: 'Login Gallery', 'zh-TW': '登入畫廊' } },
  { path: '/glossary', label: { en: 'Glossary', 'zh-TW': '名詞解釋' } },
];

export const developersDropdownLinks: NavLink[] = [
  { href: 'https://docs.authgear.com/', label: { en: 'Documentation', 'zh-TW': '文件' } },
  { href: 'https://github.com/authgear', label: { en: 'Github', 'zh-TW': 'GitHub' } },
  { path: '/whats-new', label: { en: "What's New", 'zh-TW': '最新動態' } },
];

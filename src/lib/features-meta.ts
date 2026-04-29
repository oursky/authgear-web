export type FeatureMeta = {
  title: string;
  description: string;
};

const en: Record<string, FeatureMeta> = {
  'attack-protection': {
    title: 'Attack Protection',
    description:
      'Stop bots, fraud, and OTP abuse with built-in attack protection for authentication. Use CAPTCHA, rate limits, and adaptive controls to secure every login.',
  },
  authentication: {
    title: 'Authentication & Login for Modern Apps | Authgear',
    description:
      'Add secure, flexible authentication with passkeys, OTP, social login, MFA, and SSO. Ship faster without compromising user experience.',
  },
  authorization: {
    title: 'Authorization & RBAC with Roles and Groups | Authgear',
    description:
      'Define roles, manage groups, and audit access in one place. Build flexible, scalable RBAC with JWT claims for secure authorization.',
  },
  'biometric-authentication': {
    title: 'Login with Biometrics on Your Apps - Authgear',
    description:
      "Biometric login provides a convenient method to authorize access to private content within your app. Authgear helps you seamlessly integrate biometric login into your apps, featuring the strongest industry encryption standard and architecture.",
  },
  'biometric-login': {
    title: 'Biometric Login',
    description:
      "Easily eliminate authentication friction for your users with Authgear's passwordless authentication solution. It only takes minutes to integrate your apps with Authgear.",
  },
  customization: {
    title: 'Authentication Customization & Branding | Authgear',
    description:
      'Customize authentication to match your brand. Style prebuilt login and account pages in minutes to deliver consistent, conversion-focused user experiences.',
  },
  extensibility: {
    title: 'Extensibility',
    description:
      'Extend and customize authentication with APIs and Hooks. Authgear lets developers tailor auth flows, validate inputs, and enrich tokens to fit any product.',
  },
  'machine-to-machine-token': {
    title: 'Machine-to-Machine Authentication (M2M Tokens) | Authgear',
    description:
      'Secure service-to-service authentication with short-lived M2M tokens. Authgear supports OAuth 2.0 Client Credentials Flow for backend APIs and microservices.',
  },
  'multi-factor-authentication': {
    title: 'Multi-Factor Authentication | Authgear',
    description:
      "Protect your business with Authgear's powerful multi-factor authentication (MFA) software. Enhance security, improve user experience, and achieve compliance.",
  },
  passkeys: {
    title: 'Enable Passkey Login for Your Websites and Apps - Authgear',
    description:
      'Eliminate passwords for your users with a single click. Authgear allows developers to easily integrate passkey login into their apps without any hassle.',
  },
  'passwordless-authentication': {
    title: 'Passwordless Authentication - What Is It and Why Do You Need It? - Authgear',
    description:
      'Discover passwordless authentication and understand how you can leverage this security approach to streamline the sign-in process and minimize the risk of attacks. It only takes minutes to integrate your apps with Authgear.',
  },
  'self-serve-settings-page': {
    title: 'Self-Serve Account Management & Security | Authgear',
    description:
      'Give users control over profiles, security, and sessions. Reduce support overhead while improving security with self-serve settings.',
  },
  'single-sign-on': {
    title: 'Effortless SSO Login: Secure Your App with Authgear',
    description:
      "Simplify user experience and boost security with Authgear's OIDC-based SSO login solution. Learn how to implement SSO, understand its benefits, and start your free trial today.",
  },
  'sms-pumping-fraud': {
    title: 'SMS Pumping Fraud | Authgear',
    description:
      "Safeguard your SMS authentication channels from costly fraud with Authgear's advanced SMS Pumping Detection. Our intelligent system identifies suspicious patterns and stops attacks before they drain your budget.",
  },
  'social-login': {
    title: 'Simplify User Signups with Secure Social Login | Authgear',
    description:
      'Boost user growth and improve user experience with secure social login from Authgear. Easy integration, all major providers supported (Google, Facebook, Apple), and developer-friendly. Streamline registration and watch your user base soar.',
  },
  'user-management': {
    title: 'Master User Access Management with Authgear | Comprehensive User Management Solution',
    description:
      "Simplify user management with Authgear's powerful platform. From user migration and customization to advanced analytics, we offer a comprehensive solution for effective user access management.",
  },
  'whatsapp-otp': {
    title: 'Integrate Whatsapp OTP for Seamless App Logins - Authgear',
    description:
      'Ditch unreliable SMS and level up security! Learn how Authgear seamlessly integrates WhatsApp OTP for secure, convenient app logins.',
  },
};

const zhHant: Record<string, FeatureMeta> = {
  'attack-protection': {
    title: '攻擊防護',
    description:
      '透過內建的身份驗證攻擊防護，阻擋機器人、詐騙與 OTP 濫用。運用 CAPTCHA、速率限制與自適應控制，全面保護每一次登入。',
  },
  authentication: {
    title: '為現代應用程式打造的身份驗證與登入 | Authgear',
    description:
      '加入安全且彈性的身份驗證機制，支援 passkey、OTP、社群登入、MFA 與 SSO，讓您加速產品上線，同時兼顧使用者體驗。',
  },
  authorization: {
    title: '角色與群組授權及 RBAC | Authgear',
    description:
      '在單一平台定義角色、管理群組並稽核存取權限。透過 JWT claims 建立彈性且可擴充的 RBAC，實現安全的授權管理。',
  },
  'biometric-authentication': {
    title: '為應用程式加入生物辨識登入 - Authgear',
    description:
      '生物辨識登入是授權使用者存取應用程式私密內容的便利方式。Authgear 採用業界最高加密標準與架構，協助您將生物辨識登入無縫整合至應用程式。',
  },
  'biometric-login': {
    title: '生物辨識登入',
    description:
      '透過 Authgear 的無密碼身份驗證方案，輕鬆消除使用者登入時的摩擦。只需數分鐘即可完成應用程式整合。',
  },
  customization: {
    title: '身份驗證客製化與品牌設計 | Authgear',
    description:
      '讓身份驗證流程貼合品牌風格。在數分鐘內調整預建的登入與帳戶頁面樣式，提供一致且以轉換為導向的使用者體驗。',
  },
  extensibility: {
    title: '擴充性',
    description:
      '透過 API 與 Hooks 擴充並客製身份驗證流程。Authgear 讓開發者自由調整驗證流程、驗證輸入內容並擴充 token，貼合任何產品需求。',
  },
  'machine-to-machine-token': {
    title: '機器對機器身份驗證（M2M Tokens） | Authgear',
    description:
      '以短效 M2M token 安全地處理服務間身份驗證。Authgear 支援 OAuth 2.0 Client Credentials Flow，適用於後端 API 與微服務架構。',
  },
  'multi-factor-authentication': {
    title: '多重因素驗證 | Authgear',
    description:
      '透過 Authgear 強大的多重因素驗證（MFA）方案守護您的業務，提升安全性、改善使用者體驗並達成合規要求。',
  },
  passkeys: {
    title: '為您的網站與應用程式啟用 passkey 登入 - Authgear',
    description:
      '一鍵為使用者免除密碼負擔。Authgear 讓開發者輕鬆將 passkey 登入整合至應用程式，無需繁瑣設定。',
  },
  'passwordless-authentication': {
    title: '無密碼驗證 — 是什麼？為什麼您需要它？ - Authgear',
    description:
      '深入了解無密碼驗證，掌握如何運用這套安全機制簡化登入流程並降低受攻擊風險。只需數分鐘即可完成 Authgear 整合。',
  },
  'self-serve-settings-page': {
    title: '使用者自助帳戶管理與安全設定 | Authgear',
    description:
      '讓使用者自行管理個人資料、安全選項與登入工作階段，降低客服負擔，同時透過自助設定強化安全性。',
  },
  'single-sign-on': {
    title: '輕鬆實現 SSO 登入：以 Authgear 守護您的應用程式',
    description:
      '透過 Authgear 基於 OIDC 的 SSO 登入方案，簡化使用者體驗並提升安全性。了解 SSO 的實作方式與優勢，立即開始免費試用。',
  },
  'sms-pumping-fraud': {
    title: 'SMS Pumping 詐騙防護 | Authgear',
    description:
      '透過 Authgear 進階 SMS Pumping 偵測機制，守護您的簡訊驗證管道，避免高額詐騙損失。智慧系統能辨識可疑模式，在預算被耗盡前阻止攻擊。',
  },
  'social-login': {
    title: '以安全的社群登入簡化使用者註冊流程 | Authgear',
    description:
      '透過 Authgear 安全的社群登入加速使用者成長並提升體驗。整合簡便、支援所有主流供應商（Google、Facebook、Apple），對開發者友善。簡化註冊流程，使用者規模隨之擴大。',
  },
  'user-management': {
    title: '以 Authgear 掌握使用者存取管理 | 全方位使用者管理方案',
    description:
      '透過 Authgear 強大的平台簡化使用者管理。從使用者遷移、客製化到進階分析，提供一站式方案，協助您有效管理使用者存取。',
  },
  'whatsapp-otp': {
    title: '整合 WhatsApp OTP，打造順暢的應用程式登入體驗 - Authgear',
    description:
      '揮別不穩定的簡訊並提升安全性！了解 Authgear 如何無縫整合 WhatsApp OTP，提供安全且便利的應用程式登入體驗。',
  },
};

export const featuresMeta: Record<'en' | 'zh-Hant', Record<string, FeatureMeta>> = {
  en,
  'zh-Hant': zhHant,
};

export type FeatureSlug = keyof typeof en;

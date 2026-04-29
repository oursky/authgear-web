export type SolutionMeta = {
  title: string;
  description: string;
};

const en: Record<string, SolutionMeta> = {
  'b2b-saas-authentication': {
    title: 'Secure and Scalable B2B SaaS Authentication with Authgear',
    description: "Strengthen your B2B SaaS with Authgear's robust authentication solutions. Protect sensitive data and streamline access.",
  },
  'ciam-solution': {
    title: "Elevate Your B2C Experience with Authgear's CIAM Solution",
    description: "Enhance user experience and security with Authgear's comprehensive CIAM solution. Simplify authentication, boost conversions, and protect your customers.",
  },
  'customer-identity-and-access-management': {
    title: 'Manage Customer Identity and Access with Authgear',
    description: 'More than just a portal to manage customer identity and access, Authgear helps you acquire and retain more customers with frictionless, secure authentication.',
  },
  'enterprise-sso': {
    title: 'Master Enterprise SSO: Secure and Efficient Access Management',
    description: 'Overcome enterprise SSO challenges with expert guidance. Learn best practices, use cases, and solutions to implement a robust SSO strategy.',
  },
  'external-identity-access-management': {
    title: 'Identity and Access Management Solution for Enterprises',
    description: "Authgear's solution for enterprises centralizes identity and access management for your internal and external workforce.",
  },
  'frontline-workers-identity': {
    title: 'Secure & Cost-Effective Access for Your Frontline Workers | Authgear',
    description: 'Managing access for a growing, diverse workforce can be complex. Authgear for Extended Workforce streamlines frontline identity management.',
  },
  'reduce-sms-otp-cost': {
    title: 'Cut SMS OTP Costs by 50-90% | WhatsApp OTP | Authgear',
    description: 'Calculate your SMS OTP savings. Switch to WhatsApp OTP with automatic SMS fallback. See instant results with our interactive calculator.',
  },
};

const zhHant: Record<string, SolutionMeta> = {
  'b2b-saas-authentication': {
    title: '安全且可擴充的 B2B SaaS 身份驗證 — Authgear',
    description: '透過 Authgear 強大的身份驗證方案強化您的 B2B SaaS，保護敏感資料並簡化存取流程。',
  },
  'ciam-solution': {
    title: '以 Authgear 的 CIAM 方案提升您的 B2C 體驗',
    description: '透過 Authgear 全方位的 CIAM 方案，同步提升使用者體驗與安全性。簡化身份驗證、提高轉換率，並守護您的顧客。',
  },
  'customer-identity-and-access-management': {
    title: '以 Authgear 管理顧客身份與存取',
    description: 'Authgear 不只是顧客身份與存取的管理入口，更以無摩擦且安全的身份驗證，協助您獲取並留住更多顧客。',
  },
  'enterprise-sso': {
    title: '駕馭企業 SSO：安全且高效的存取管理',
    description: '透過專業指引克服企業 SSO 的挑戰。掌握最佳實踐、使用情境與解決方案，建構完善的 SSO 策略。',
  },
  'external-identity-access-management': {
    title: '為企業打造的身份與存取管理方案',
    description: 'Authgear 為企業集中管理內部與外部員工的身份與存取權限。',
  },
  'frontline-workers-identity': {
    title: '為前線員工提供安全且具成本效益的存取方案 | Authgear',
    description: '管理規模日益擴大且多元的員工存取權限相當複雜。Authgear for Extended Workforce 簡化前線員工的身份管理。',
  },
  'reduce-sms-otp-cost': {
    title: '節省 50-90% 簡訊 OTP 成本 | WhatsApp OTP | Authgear',
    description: '計算您的簡訊 OTP 節省金額。改用 WhatsApp OTP 並自動以簡訊備援，透過互動式計算器立即查看成效。',
  },
};

export const solutionsMeta: Record<'en' | 'zh-Hant', Record<string, SolutionMeta>> = {
  en,
  'zh-Hant': zhHant,
};

export type SolutionSlug = keyof typeof en;

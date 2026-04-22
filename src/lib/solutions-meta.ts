export type SolutionMeta = {
  title: string;
  description: string;
};

export const solutionsMeta: Record<string, SolutionMeta> = {
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

export type SolutionSlug = keyof typeof solutionsMeta;

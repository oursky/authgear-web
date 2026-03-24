import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import B2bSaasAuthenticationPage from '@/components/pages/solutions/B2bSaasAuthenticationPage';
import CiamSolutionPage from '@/components/pages/solutions/CiamSolutionPage';
import CustomerIdentityAndAccessManagementPage from '@/components/pages/solutions/CustomerIdentityAndAccessManagementPage';
import EnterpriseSsoPage from '@/components/pages/solutions/EnterpriseSsoPage';
import ExternalIdentityAccessManagementPage from '@/components/pages/solutions/ExternalIdentityAccessManagementPage';
import FrontlineWorkersIdentityPage from '@/components/pages/solutions/FrontlineWorkersIdentityPage';
import ReduceSmsOtpCostPage from '@/components/pages/solutions/ReduceSmsOtpCostPage';
import type React from 'react';

interface PageMeta {
  title: string;
  description: string;
  component: React.ComponentType<{ locale: string }>;
}

const pageMap: Record<string, PageMeta> = {
  'b2b-saas-authentication': {
    title: 'Secure and Scalable B2B SaaS Authentication with Authgear',
    description: "Strengthen your B2B SaaS with Authgear's robust authentication solutions. Protect sensitive data and streamline access.",
    component: B2bSaasAuthenticationPage,
  },
  'ciam-solution': {
    title: "Elevate Your B2C Experience with Authgear's CIAM Solution",
    description: "Enhance user experience and security with Authgear's comprehensive CIAM solution. Simplify authentication, boost conversions, and protect your customers.",
    component: CiamSolutionPage,
  },
  'customer-identity-and-access-management': {
    title: 'Manage Customer Identity and Access with Authgear',
    description: 'More than just a portal to manage customer identity and access, Authgear helps you acquire and retain more customers with frictionless, secure authentication.',
    component: CustomerIdentityAndAccessManagementPage,
  },
  'enterprise-sso': {
    title: 'Master Enterprise SSO: Secure and Efficient Access Management',
    description: 'Overcome enterprise SSO challenges with expert guidance. Learn best practices, use cases, and solutions to implement a robust SSO strategy.',
    component: EnterpriseSsoPage,
  },
  'external-identity-access-management': {
    title: 'Identity and Access Management Solution for Enterprises',
    description: "Authgear's solution for enterprises centralizes identity and access management for your internal and external workforce.",
    component: ExternalIdentityAccessManagementPage,
  },
  'frontline-workers-identity': {
    title: 'Secure & Cost-Effective Access for Your Frontline Workers | Authgear',
    description: 'Managing access for a growing, diverse workforce can be complex. Authgear for Extended Workforce streamlines frontline identity management.',
    component: FrontlineWorkersIdentityPage,
  },
  'reduce-sms-otp-cost': {
    title: 'Cut SMS OTP Costs by 50-90% | WhatsApp OTP | Authgear',
    description: 'Calculate your SMS OTP savings. Switch to WhatsApp OTP with automatic SMS fallback. See instant results with our interactive calculator.',
    component: ReduceSmsOtpCostPage,
  },
};

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return Object.keys(pageMap).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const meta = pageMap[slug];
  if (!meta) return {};
  return {
    title: meta.title,
    description: meta.description,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const meta = pageMap[slug];
  if (!meta) notFound();
  const PageComponent = meta.component;
  return <PageComponent locale="en" />;
}

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { LOCALES } from '@/lib/i18n';
import { featuresData } from '@/lib/features/data';

import AttackProtectionPage from '@/components/pages/features/AttackProtectionPage';
import AuthenticationPage from '@/components/pages/features/AuthenticationPage';
import AuthorizationPage from '@/components/pages/features/AuthorizationPage';
import BiometricAuthenticationPage from '@/components/pages/features/BiometricAuthenticationPage';
import BiometricLoginPage from '@/components/pages/features/BiometricLoginPage';
import CustomizationPage from '@/components/pages/features/CustomizationPage';
import ExtensibilityPage from '@/components/pages/features/ExtensibilityPage';
import IdentitySecurityPage from '@/components/pages/features/IdentitySecurityPage';
import MachineToMachineTokenPage from '@/components/pages/features/MachineToMachineTokenPage';
import MultiFactorAuthenticationPage from '@/components/pages/features/MultiFactorAuthenticationPage';
import PasskeysPage from '@/components/pages/features/PasskeysPage';
import PasswordlessAuthenticationPage from '@/components/pages/features/PasswordlessAuthenticationPage';
import SelfServeSettingsPage from '@/components/pages/features/SelfServeSettingsPage';
import SingleSignOnPage from '@/components/pages/features/SingleSignOnPage';
import SmsPasscodePage from '@/components/pages/features/SmsPasscodePage';
import SmsPumpingFraudPage from '@/components/pages/features/SmsPumpingFraudPage';
import SocialLoginPage from '@/components/pages/features/SocialLoginPage';
import UserManagementPage from '@/components/pages/features/UserManagementPage';
import WhatsappOtpPage from '@/components/pages/features/WhatsappOtpPage';
import type React from 'react';

const pageMap: Record<string, React.ComponentType<{ locale: string }>> = {
  'attack-protection': AttackProtectionPage,
  authentication: AuthenticationPage,
  authorization: AuthorizationPage,
  'biometric-authentication': BiometricAuthenticationPage,
  'biometric-login': BiometricLoginPage,
  customization: CustomizationPage,
  extensibility: ExtensibilityPage,
  'identity-security': IdentitySecurityPage,
  'machine-to-machine-token': MachineToMachineTokenPage,
  'multi-factor-authentication': MultiFactorAuthenticationPage,
  passkeys: PasskeysPage,
  'passwordless-authentication': PasswordlessAuthenticationPage,
  'self-serve-settings-page': SelfServeSettingsPage,
  'single-sign-on': SingleSignOnPage,
  'sms-passcode': SmsPasscodePage,
  'sms-pumping-fraud': SmsPumpingFraudPage,
  'social-login': SocialLoginPage,
  'user-management': UserManagementPage,
  'whatsapp-otp': WhatsappOtpPage,
};

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    Object.keys(pageMap).map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = featuresData[slug];
  if (!data) return {};
  return {
    title: data.title,
    description: data.description,
  };
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  const PageComponent = pageMap[slug];
  if (!PageComponent) notFound();
  return <PageComponent locale={locale} />;
}

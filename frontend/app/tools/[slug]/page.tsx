import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { TOOL_SLUG_PREFIX } from '@/lib/tools/toolSlugPrefix';
import type React from 'react';

import Base64Page from '@/components/pages/tools/Base64Page';
import HmacPage from '@/components/pages/tools/HmacPage';
import JwkGeneratorPage from '@/components/pages/tools/JwkGeneratorPage';
import JwtDebuggerPage from '@/components/pages/tools/JwtDebuggerPage';
import OidcDiscoveryPage from '@/components/pages/tools/OidcDiscoveryPage';
import PasswordHashPage from '@/components/pages/tools/PasswordHashPage';
import SslCheckerPage from '@/components/pages/tools/SslCheckerPage';
import TotpPage from '@/components/pages/tools/TotpPage';
import UuidV7Page from '@/components/pages/tools/UuidV7Page';

const pageMap: Record<string, React.ComponentType<{ locale: string }>> = {
  'base64-decode-encode': Base64Page,
  'hmac-signature-generator-verifier': HmacPage,
  'jwk-generator': JwkGeneratorPage,
  'jwt-jwe-debugger': JwtDebuggerPage,
  'oidc-discovery-endpoint': OidcDiscoveryPage,
  'password-hash-generator': PasswordHashPage,
  'ssl-checker': SslCheckerPage,
  'totp-authenticator': TotpPage,
  'uuidv7-generator': UuidV7Page,
};

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return Object.keys(pageMap).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const prefix = TOOL_SLUG_PREFIX[slug];
  if (!prefix) return {};
  const t = await getTranslations({ locale: 'en', namespace: 'Tools' });
  return {
    title: t(`${prefix}.metaTitle` as never),
    description: t(`${prefix}.metaDescription` as never),
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const PageComponent = pageMap[slug];
  if (!PageComponent) notFound();
  return <PageComponent locale="en" />;
}

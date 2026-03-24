import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { LOCALES } from '@/lib/i18n';
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

const metaMap: Record<string, { title: string; description: string }> = {
  'base64-decode-encode': {
    title: 'Base64 Decode and Encode | Authgear',
    description:
      'Encode or decode Base64 with precise charset control. A developer-friendly tool for inspecting raw data, converting payloads, and debugging encoding issues.',
  },
  'hmac-signature-generator-verifier': {
    title: 'HMAC Signature Generator/Verifier',
    description:
      'Free HMAC generator and verifier by Authgear: Create and check HMAC signatures online using SHA-256, SHA-512, and more. All operations happen securely in-browser with no data leaving your device',
  },
  'jwk-generator': {
    title: 'JWK Generator — PEM to JWK, JWK to PEM & JWKS Generator | Authgear',
    description:
      'PEM → JWK, JWK → PEM, or generate keys and download JWKS. Choose kid, alg, and use (sig/enc). Browser-only, no signup.',
  },
  'jwt-jwe-debugger': {
    title: 'JWT & JWE Debugger — Decode, Verify, Encrypt & Decrypt | Authgear',
    description:
      'Decode and verify JWTs, encrypt to JWE, decrypt JWEs, and inspect claims. JWT debugger for developers — supports jwk/jwks, signature verification, and encryption.',
  },
  'oidc-discovery-endpoint': {
    title: 'OIDC Discovery Endpoint Explorer | Authgear',
    description:
      "Fetch and inspect any OIDC provider's .well-known/openid-configuration. View authorization endpoints, token endpoints, JWKS, scopes, and signing algorithms.",
  },
  'password-hash-generator': {
    title: 'Password Hash Generator and Verifier',
    description:
      'Free Password Hash Generator & Verifier. Create/verify Argon2id, bcrypt, scrypt, PBKDF2 hashes with salts, presets, and live timing, entirely client-side.',
  },
  'ssl-checker': {
    title: 'SSL Checker — Free SSL Certificate Checker | Authgear',
    description:
      'Free SSL checker tool. Instantly inspect SSL/TLS certificate details, verify the certificate chain, and check expiration dates for any domain.',
  },
  'totp-authenticator': {
    title: 'TOTP Authenticator — Online TOTP Generator & Tester',
    description:
      'Generate TOTP codes (RFC 6238) online with customizable algorithm (SHA-1/256/512) and digit length (6/8) save up to 10 apps.',
  },
  'uuidv7-generator': {
    title: 'UUID v7 Generator & Timestamp Extractor — Free Online Tool (RFC 9562)',
    description:
      'Generate, inspect, and copy UUID v7 values in your browser. Choose a timestamp (ISO or Unix), batch-generate multiple IDs, decode field segments, and extract timestamps from existing UUIDv7 strings.',
  },
};

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    Object.keys(pageMap).map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const meta = metaMap[slug];
  if (!meta) return {};
  return { title: meta.title, description: meta.description };
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  const PageComponent = pageMap[slug];
  if (!PageComponent) notFound();
  return <PageComponent locale={locale} />;
}

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { LOCALES } from '@/lib/i18n';
import { compareData } from '@/lib/compare/data';

import Auth0AlternativePage from '@/components/pages/compare/Auth0AlternativePage';
import CognitoAlternativePage from '@/components/pages/compare/CognitoAlternativePage';
import FirebaseAlternativePage from '@/components/pages/compare/FirebaseAlternativePage';
import OktaAlternativePage from '@/components/pages/compare/OktaAlternativePage';
import type React from 'react';

const pageMap: Record<string, React.ComponentType<{ locale: string }>> = {
  'auth0-alternative': Auth0AlternativePage,
  'cognito-alternative': CognitoAlternativePage,
  'firebase-alternative': FirebaseAlternativePage,
  'okta-alternative': OktaAlternativePage,
};

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    Object.keys(pageMap).map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (slug === 'okta-alternative') {
    const t = await getTranslations({ locale, namespace: 'OktaAlternative' });
    return {
      title: t('metaTitle'),
      description: t('metaDescription'),
    };
  }
  const data = compareData[slug];
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

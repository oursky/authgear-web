import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
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

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return Object.keys(pageMap).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = compareData[slug];
  if (!data) return {};
  return {
    title: data.title,
    description: data.description,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const PageComponent = pageMap[slug];
  if (!PageComponent) notFound();
  return <PageComponent locale="en" />;
}

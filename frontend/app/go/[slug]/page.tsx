import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type React from 'react';

import Auth0AlternativePage from '@/components/pages/go/Auth0AlternativePage';
import AuthgearDeveloperFocusedSimplicityPage from '@/components/pages/go/AuthgearDeveloperFocusedSimplicityPage';
import AuthgearStrongHongKongPage from '@/components/pages/go/AuthgearStrongHongKongPage';
import AuthgearStrongSingaporePage from '@/components/pages/go/AuthgearStrongSingaporePage';
import AuthgearVsAuth0ChtPage from '@/components/pages/go/AuthgearVsAuth0ChtPage';
import AuthgearVsAuth0Page from '@/components/pages/go/AuthgearVsAuth0Page';
import AuthgearVsOktaChtPage from '@/components/pages/go/AuthgearVsOktaChtPage';
import AuthgearVsOktaPage from '@/components/pages/go/AuthgearVsOktaPage';

const pageMap: Record<string, React.ComponentType<{ locale: string }>> = {
  'auth0-alternative': Auth0AlternativePage,
  'authgear-developer-focused-simplicity': AuthgearDeveloperFocusedSimplicityPage,
  'authgear-strong-hong-kong-localized-support': AuthgearStrongHongKongPage,
  'authgear-strong-singapore-localized-support': AuthgearStrongSingaporePage,
  'authgear-vs-auth0-cht': AuthgearVsAuth0ChtPage,
  'authgear-vs-auth0': AuthgearVsAuth0Page,
  'authgear-vs-okta-cht': AuthgearVsOktaChtPage,
  'authgear-vs-okta': AuthgearVsOktaPage,
};

const metaMap: Record<string, { title: string; description: string }> = {
  'auth0-alternative': {
    title: 'Manage Customer Identity and Access with Authgear',
    description:
      'More than just a portal to manage customer identity and access, Authgear helps you acquire and retain more customers with frictionless, secure customer authentication experience throughout the user journey.',
  },
  'authgear-developer-focused-simplicity': {
    title: 'Simpler Than Auth0, Built for Developers',
    description:
      'Authgear offers an intuitive and lightweight authentication solution designed for developers. Skip the bloat, streamline your workflows, and focus on building. Transition effortlessly from Auth0 to a solution that just works.',
  },
  'authgear-strong-hong-kong-localized-support': {
    title: 'Authgear vs. Auth0 - Strong Hong Kong Localized Support',
    description:
      "Authgear understands your unique regional needs. With dedicated support and compliance tailored to your market, we provide the localized expertise that Auth0 can't match. Get personalized assistance and solutions built for your business.",
  },
  'authgear-strong-singapore-localized-support': {
    title: 'Authgear vs. Auth0 - Strong Singapore Localized Support',
    description:
      "Authgear understands your unique regional needs. With dedicated support and compliance tailored to your market, we provide the localized expertise that Auth0 can't match. Get personalized assistance and solutions built for your business.",
  },
  'authgear-vs-auth0-cht': {
    title: 'Authgear vs. Auth0',
    description: '',
  },
  'authgear-vs-auth0': {
    title: 'Authgear vs. Auth0',
    description: '',
  },
  'authgear-vs-okta-cht': {
    title: 'Authgear vs. Okta',
    description: '',
  },
  'authgear-vs-okta': {
    title: 'Authgear vs. Okta',
    description: '',
  },
};

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return Object.keys(pageMap).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const meta = metaMap[slug];
  if (!meta) return {};
  return { title: meta.title, description: meta.description };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const PageComponent = pageMap[slug];
  if (!PageComponent) notFound();
  return <PageComponent locale="en" />;
}

import { notFound } from 'next/navigation';
import type React from 'react';
import type { Metadata } from 'next';
import { LOCALES } from '@/lib/i18n';
import AuthgearOncePage from '@/components/pages/campaign/AuthgearOncePage';
import OnceCampaignPage from '@/components/pages/campaign/OnceCampaignPage';

type Props = { params: Promise<{ locale: string; slug: string }> };

const pageMap: Record<string, React.ComponentType<{ locale: string }>> = {
  'authgear-once': AuthgearOncePage,
  'once': OnceCampaignPage,
};

const metaMap: Record<string, { title: string; description: string }> = {
  'authgear-once': {
    title: 'Authgear ONCE – Own Your IAM with a Perpetual License',
    description: 'Take control of your identity management with Authgear ONCE. A self-hosted IAM solution with no subscriptions, complete data ownership, and developer-friendly SDKs.',
  },
  'once': {
    title: 'Authgear ONCE – Own Your IAM with a Perpetual License',
    description: 'Take control of your identity management with Authgear ONCE. A self-hosted IAM solution with no subscriptions, complete data ownership, and developer-friendly SDKs.',
  },
};

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
  const { slug, locale } = await params;
  const Component = pageMap[slug];
  if (!Component) notFound();
  return <Component locale={locale} />;
}

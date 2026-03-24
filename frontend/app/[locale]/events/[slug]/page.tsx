import { notFound } from 'next/navigation';
import type React from 'react';
import type { Metadata } from 'next';
import { LOCALES } from '@/lib/i18n';
import IdentityWeekWorkshopPage from '@/components/pages/events/IdentityWeekWorkshopPage';
import PromotionPage from '@/components/pages/events/PromotionPage';
import SsoSeminarPage from '@/components/pages/events/SsoSeminarPage';

type Props = { params: Promise<{ locale: string; slug: string }> };

const pageMap: Record<string, React.ComponentType<{ locale: string }>> = {
  'authgear-x-identityweek-sso-workshop-archived': IdentityWeekWorkshopPage,
  'promotion': PromotionPage,
  'sso-how-to-seminar': SsoSeminarPage,
};

const metaMap: Record<string, { title: string; description: string }> = {
  'authgear-x-identityweek-sso-workshop-archived': {
    title: 'Authgear x IdentityWeek SSO Workshop',
    description: '',
  },
  'promotion': {
    title: 'Promotion',
    description: '',
  },
  'sso-how-to-seminar': {
    title: 'Authgear 掌握身分認證：IT 和系統架構師的關鍵技能',
    description: '一場關於身分認證在現代 IT 和系統架構中關鍵作用的研討會：身分認證是驗證使用者或設備身份的過程，是網路安全的基礎。在日益複雜的科技與雲端環境中， 規劃強大的身分認證策略以保護敏感數據和防止未經授權的存取比什麼都來得重要。',
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

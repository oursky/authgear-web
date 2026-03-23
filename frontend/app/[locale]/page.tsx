import type { Metadata } from 'next';
import StaticWebflowPage from '@/components/StaticWebflowPage';

const title = {
  en: 'Authgear CLOUD - Your Managed IAM Solution',
  'zh-TW': 'Authgear CLOUD — 您的一站式身份管理方案',
} as const;

const description = {
  en: 'Authgear makes it easier for developers to meet complex authentication requirements, delivering a frictionless and exceptional digital experience.',
  'zh-TW':
    '在享有企業級安全、高可用與專屬支援的 SaaS 平台上，輕鬆管理身份。Authgear Cloud 簡化身份管理，讓您專注業務成長。',
} as const;

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const zh = locale === 'zh-TW';
  return {
    title: zh ? title['zh-TW'] : title.en,
    description: zh ? description['zh-TW'] : description.en,
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const htmlFile = locale === 'zh-TW' ? 'zh-TW/index.html' : 'index.html';
  return <StaticWebflowPage htmlFile={htmlFile} />;
}

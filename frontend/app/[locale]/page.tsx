import type { Metadata } from 'next';
import { getWebflowPageBody } from '@/lib/webflow-page';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'zh-Hant-TW') {
    return {
      title: 'Authgear CLOUD - Your Managed IAM Solution',
      description:
        'Authgear makes it easier for developers to meet complex authentication requirements, delivering a frictionless and exceptional digital experience.',
    };
  }
  return {
    title: 'Authgear CLOUD - Your Managed IAM Solution',
    description:
      'Authgear makes it easier for developers to meet complex authentication requirements, delivering a frictionless and exceptional digital experience.',
  };
}

export default async function HomePage({ params: _ }: Props) {
  const body = getWebflowPageBody('index.html');
  return <div dangerouslySetInnerHTML={{ __html: body }} />;
}

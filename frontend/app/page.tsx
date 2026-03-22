import type { Metadata } from 'next';
import { getWebflowPageBody, getWebflowPageTitle, getWebflowPageDescription } from '@/lib/webflow-page';

export const metadata: Metadata = {
  title: 'Authgear CLOUD - Your Managed IAM Solution',
  description: 'Authgear makes it easier for developers to meet complex authentication requirements, delivering a frictionless and exceptional digital experience.',
};

export default function HomePage() {
  const body = getWebflowPageBody('index.html');
  return <div dangerouslySetInnerHTML={{ __html: body }} />;
}

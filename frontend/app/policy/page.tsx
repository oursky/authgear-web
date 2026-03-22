import type { Metadata } from 'next';
import { getWebflowPageTitle, getWebflowPageDescription } from '@/lib/webflow-page';
import StaticWebflowPage from '@/components/StaticWebflowPage';

export function generateMetadata(): Metadata {
  return {
    title: getWebflowPageTitle('policy.html'),
    description: getWebflowPageDescription('policy.html'),
  };
}

export default function Page() {
  return <StaticWebflowPage htmlFile="policy.html" />;
}

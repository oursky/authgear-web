import type { Metadata } from 'next';
import { getWebflowPageTitle, getWebflowPageDescription } from '@/lib/webflow-page';
import StaticWebflowPage from '@/components/StaticWebflowPage';

export function generateMetadata(): Metadata {
  return {
    title: getWebflowPageTitle('promises.html'),
    description: getWebflowPageDescription('promises.html'),
  };
}

export default function Page() {
  return <StaticWebflowPage htmlFile="promises.html" />;
}

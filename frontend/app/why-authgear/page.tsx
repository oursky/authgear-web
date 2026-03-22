import type { Metadata } from 'next';
import { getWebflowPageTitle, getWebflowPageDescription } from '@/lib/webflow-page';
import StaticWebflowPage from '@/components/StaticWebflowPage';

export function generateMetadata(): Metadata {
  return {
    title: getWebflowPageTitle('why-authgear.html'),
    description: getWebflowPageDescription('why-authgear.html'),
  };
}

export default function Page() {
  return <StaticWebflowPage htmlFile="why-authgear.html" />;
}

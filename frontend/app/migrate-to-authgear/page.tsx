import type { Metadata } from 'next';
import { getWebflowPageTitle, getWebflowPageDescription } from '@/lib/webflow-page';
import StaticWebflowPage from '@/components/StaticWebflowPage';

export function generateMetadata(): Metadata {
  return {
    title: getWebflowPageTitle('migrate-to-authgear.html'),
    description: getWebflowPageDescription('migrate-to-authgear.html'),
  };
}

export default function Page() {
  return <StaticWebflowPage htmlFile="migrate-to-authgear.html" />;
}

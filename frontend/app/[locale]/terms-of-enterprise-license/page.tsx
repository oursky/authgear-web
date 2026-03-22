import type { Metadata } from 'next';
import { getWebflowPageTitle, getWebflowPageDescription } from '@/lib/webflow-page';
import StaticWebflowPage from '@/components/StaticWebflowPage';

export function generateMetadata(): Metadata {
  return {
    title: getWebflowPageTitle('terms-of-enterprise-license.html'),
    description: getWebflowPageDescription('terms-of-enterprise-license.html'),
  };
}

export default function Page() {
  return <StaticWebflowPage htmlFile="terms-of-enterprise-license.html" />;
}

import type { Metadata } from 'next';
import { getWebflowPageTitle, getWebflowPageDescription } from '@/lib/webflow-page';
import StaticWebflowPage from '@/components/StaticWebflowPage';

export function generateMetadata(): Metadata {
  return {
    title: getWebflowPageTitle('glossary.html'),
    description: getWebflowPageDescription('glossary.html'),
  };
}

export default function Page() {
  return <StaticWebflowPage htmlFile="glossary.html" />;
}

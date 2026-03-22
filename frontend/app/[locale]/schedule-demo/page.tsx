import type { Metadata } from 'next';
import { getWebflowPageTitle, getWebflowPageDescription } from '@/lib/webflow-page';
import StaticWebflowPage from '@/components/StaticWebflowPage';

export function generateMetadata(): Metadata {
  return {
    title: getWebflowPageTitle('schedule-demo.html'),
    description: getWebflowPageDescription('schedule-demo.html'),
  };
}

export default function Page() {
  return <StaticWebflowPage htmlFile="schedule-demo.html" />;
}

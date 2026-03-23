import type { Metadata } from 'next';
import HomePage from '@/components/pages/HomePage';

export const metadata: Metadata = {
  title: 'Authgear CLOUD - Your Managed IAM Solution',
  description: 'Authgear makes it easier for developers to meet complex authentication requirements, delivering a frictionless and exceptional digital experience.',
};

export default function HomePageRoute() {
  return <HomePage locale="en" />;
}

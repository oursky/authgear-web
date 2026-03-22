import type { Metadata } from 'next';
import { getWebflowPageTitle, getWebflowPageDescription } from '@/lib/webflow-page';
import StaticWebflowPage from '@/components/StaticWebflowPage';
import path from 'path';
import { existsSync, readdirSync } from 'fs';

const WEBFLOW_DIR = path.join(process.cwd(), '..', 'authgear-new.webflow');
const SECTION = 'events';
function htmlFile(slug: string) {
  return `${SECTION}/${slug}.html`;
}

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const sectionDir = path.join(WEBFLOW_DIR, SECTION);
  if (!existsSync(sectionDir)) return [];
  return readdirSync(sectionDir)
    .filter((f) => f.endsWith('.html'))
    .map((f) => ({ locale: 'en', slug: f.replace(/\.html$/, '') }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: getWebflowPageTitle(htmlFile(slug)),
    description: getWebflowPageDescription(htmlFile(slug)),
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <StaticWebflowPage htmlFile={htmlFile(slug)} />;
}

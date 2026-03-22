import { getWebflowPageBody, getWebflowPageScripts } from '@/lib/webflow-page';
import PageScripts from './PageScripts';

interface Props {
  htmlFile: string;
}

export default function StaticWebflowPage({ htmlFile }: Props) {
  const body = getWebflowPageBody(htmlFile);
  if (!body) {
    return (
      <div className="page-wrapper">
        <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
          <h1>Page not found</h1>
          <p>This page could not be located in the site export.</p>
        </div>
      </div>
    );
  }
  const scripts = getWebflowPageScripts(htmlFile);
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <PageScripts scripts={scripts} />
    </>
  );
}

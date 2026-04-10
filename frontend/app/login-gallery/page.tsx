import type { Metadata } from 'next';
import LoginGalleryIndexPage from '@/components/login-gallery/LoginGalleryIndexPage';
import { DEFAULT_LOCALE } from '@/lib/i18n';
import { getLoginGalleryItems } from '@/lib/strapi';

export const metadata: Metadata = {
  title: 'Login Gallery',
  description:
    'Build login experiences that match your brand and convert better. Browse beautiful, secure login UI examples built with Authgear.',
};

export default async function LoginGalleryPage() {
  const res = await getLoginGalleryItems({ pagination: { pageSize: 100 } });
  const items = res.data ?? [];

  return (
    <div className="page-wrapper">
      <LoginGalleryIndexPage locale={DEFAULT_LOCALE} items={items} />
    </div>
  );
}

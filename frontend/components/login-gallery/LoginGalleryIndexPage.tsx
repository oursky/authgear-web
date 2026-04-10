import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { localizedPath } from '@/lib/i18n';
import type { LoginGalleryItem } from '@/lib/strapi';
import { strapiImageUrl } from '@/lib/strapi';

const GET_STARTED_URL =
  'https://portal.authgear.com/?utm_source=login-gallery&utm_medium=link&utm_campaign=start-for-free';
const DOCS_URL = 'https://docs.authgear.com/?utm_source=login-gallery&utm_medium=link&utm_campaign=dev-docs';

export type LoginGalleryIndexItem = { id: number; attributes: LoginGalleryItem };

type Props = {
  locale: string;
  items: LoginGalleryIndexItem[];
};

export default async function LoginGalleryIndexPage({ locale, items }: Props) {
  const t = await getTranslations({ locale, namespace: 'LoginGalleryIndex' });

  return (
    <section className="ds-section ds-login-gallery-index">
      <div className="ds-login-gallery-index__hero">
        <div className="ds-container ds-container--hero">
          <div className="ds-login-gallery-index__hero-inner">
            <p className="ds-login-gallery-index__eyebrow">{t('eyebrow')}</p>
            <h1 className="ds-login-gallery-index__hero-title">
              <span className="ds-login-gallery-index__hero-title-line">{t('heroTitleLine1')}</span>
              <span className="ds-login-gallery-index__hero-title-line">{t('heroTitleLine2')}</span>
            </h1>
            <p className="ds-login-gallery-index__hero-lede">{t('heroSubtitle')}</p>
            <div className="ds-login-gallery-index__hero-actions">
              <a
                href={GET_STARTED_URL}
                target="_blank"
                rel="noreferrer"
                className="ds-btn ds-btn-primary"
              >
                {t('ctaPrimary')}
                <ArrowRightIcon className="ds-btn__icon-arrow" aria-hidden />
              </a>
              <a
                href={DOCS_URL}
                target="_blank"
                rel="noreferrer"
                className="ds-btn ds-btn-tertiary"
              >
                {t('ctaDocs')}
                <ArrowRightIcon className="ds-btn__icon-arrow" aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="ds-login-gallery-index__grid-section">
        <div className="ds-container">
          {items.length === 0 ? (
            <p className="ds-login-gallery-index__empty">{t('emptyState')}</p>
          ) : (
            <ul className="ds-login-gallery-index__grid" role="list">
              {items.map((item) => {
                const { title, slug, mainImage, previewImage } = item.attributes;
                const imgUrl = strapiImageUrl(mainImage ?? previewImage);
                const href = localizedPath(locale, `/login-gallery/${slug}`);
                return (
                  <li key={item.id} className="ds-login-gallery-index__grid-item">
                    <Link
                      href={href}
                      className="ds-login-gallery-index-card"
                      aria-label={t('cardAriaLabel', { title })}
                    >
                      <div className="ds-login-gallery-index-card__frame">
                        <div className="ds-login-gallery-index-card__media">
                          {imgUrl ? (
                            <Image
                              src={imgUrl}
                              alt=""
                              fill
                              className="ds-login-gallery-index-card__img"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                          ) : (
                            <div className="ds-login-gallery-index-card__placeholder" aria-hidden />
                          )}
                        </div>
                      </div>
                      <h3 className="ds-login-gallery-index-card__title">{title}</h3>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

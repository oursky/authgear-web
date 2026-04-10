import type { BlocksContent } from '@strapi/blocks-react-renderer';
import Link from 'next/link';
import {
  type StrapiImage,
  strapiLoginMethodsTechFields,
  strapiMediaListToSlides,
  strapiMultiSelectToStrings,
  strapiSingleMediaToSlide,
} from '@/lib/strapi';
import LoginGalleryCarousel, { type LoginGalleryCarouselLabels } from './LoginGalleryCarousel';
import StrapiBlocksContent from './StrapiBlocksContent';

const META_EMPTY = '\u2014';

export type LoginGalleryDetailLabels = LoginGalleryCarouselLabels & {
  eyebrow: string;
  sidebarIndustry: string;
  sidebarLoginMethods: string;
  sidebarSocialLogin: string;
  sidebarTechnicalDetails: string;
  noContentYet: string;
};

export function buildLoginGalleryDetailLabels(t: (key: string) => string): LoginGalleryDetailLabels {
  return {
    eyebrow: t('eyebrow'),
    web: t('web'),
    mobile: t('mobile'),
    platformPickerAria: t('platformPickerAria'),
    prevSlide: t('prevSlide'),
    nextSlide: t('nextSlide'),
    goToSlide: t('goToSlide'),
    sidebarIndustry: t('sidebarIndustry'),
    sidebarLoginMethods: t('sidebarLoginMethods'),
    sidebarSocialLogin: t('sidebarSocialLogin'),
    sidebarTechnicalDetails: t('sidebarTechnicalDetails'),
    noContentYet: t('noContentYet'),
  };
}

type Props = {
  /** Localized `/login-gallery` listing URL */
  galleryIndexHref: string;
  title: string;
  content: BlocksContent | null | undefined;
  /** Legacy HTML when Blocks are empty. */
  bodyHtml?: string | null;
  webImage: unknown;
  mobileImage: unknown;
  /** 當 web/mobile 多圖未填時，後備為列表用主圖（同一張可同時出現在兩種模式）。 */
  mainImage?: StrapiImage | unknown;
  industry?: string | null;
  socialLogin: unknown;
  loginMethodsTech: unknown;
  labels: LoginGalleryDetailLabels;
};

export default function LoginGalleryDetailLayout({
  galleryIndexHref,
  title,
  content,
  bodyHtml,
  webImage,
  mobileImage,
  mainImage,
  industry,
  socialLogin,
  loginMethodsTech,
  labels,
}: Props) {
  const webRaw = strapiMediaListToSlides(webImage);
  const mobileRaw = strapiMediaListToSlides(mobileImage);
  const mainSlide = strapiSingleMediaToSlide(mainImage);
  const webSlides =
    webRaw.length > 0 ? webRaw : mainSlide ? [mainSlide] : [];
  const mobileSlides =
    mobileRaw.length > 0
      ? mobileRaw
      : webRaw.length === 0 && mainSlide
        ? [mainSlide]
        : [];
  const { methodsDetail, technicalDetails } = strapiLoginMethodsTechFields(loginMethodsTech);
  const methodItems = strapiMultiSelectToStrings(methodsDetail);
  const socialItems = strapiMultiSelectToStrings(socialLogin);
  const techItems = strapiMultiSelectToStrings(technicalDetails);
  const industryText = industry?.trim() ?? '';

  const hasBlocks = Array.isArray(content) && content.length > 0;
  const hasLegacyBody = Boolean(bodyHtml?.trim());

  return (
    <section className="ds-section ds-login-gallery-page">
      <header className="ds-login-gallery-page__header">
        <div className="ds-container ds-login-gallery-page__container">
          <Link
            href={galleryIndexHref}
            className="ds-login-gallery-page__eyebrow ds-section-eyebrow ds-section-eyebrow--on-dark"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={18}
              height={18}
              viewBox="0 0 18 18"
              fill="none"
              aria-hidden
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.57063 9C5.57063 8.78055 5.65463 8.56118 5.82173 8.394L10.9644 3.25135C11.2996 2.91622 11.8413 2.91622 12.1764 3.25135C12.5115 3.58648 12.5115 4.12817 12.1764 4.4633L7.63973 9L12.1764 13.5367C12.5115 13.8719 12.5115 14.4135 12.1764 14.7487C11.8413 15.0838 11.2996 15.0838 10.9644 14.7487L5.82173 9.606C5.65463 9.43883 5.57063 9.21945 5.57063 9Z"
                fill="currentColor"
              />
            </svg>
            {labels.eyebrow}
          </Link>
          <h1 className="ds-login-gallery-page__title">{title}</h1>
        </div>
      </header>

      <div className="ds-login-gallery-page__carousel">
        <div className="ds-container ds-login-gallery-page__container">
          <LoginGalleryCarousel
            webSlides={webSlides}
            mobileSlides={mobileSlides}
            title={title}
            labels={{
              web: labels.web,
              mobile: labels.mobile,
              platformPickerAria: labels.platformPickerAria,
              prevSlide: labels.prevSlide,
              nextSlide: labels.nextSlide,
              goToSlide: labels.goToSlide,
            }}
          />
        </div>
      </div>

      <div className="ds-login-gallery-page__content ds-login-gallery-page__content--split">
        <div className="ds-container ds-login-gallery-page__container">
          <div className="ds-login-gallery-body">
            <div className="ds-login-gallery-body__main">
              {hasBlocks ? <StrapiBlocksContent content={content} /> : null}
              {!hasBlocks && hasLegacyBody ? (
                <div
                  className="ds-richtext-prose ds-richtext-prose--on-dark ds-login-gallery-richtext"
                  dangerouslySetInnerHTML={{ __html: bodyHtml! }}
                />
              ) : null}
              {!hasBlocks && !hasLegacyBody ? (
                <p className="ds-login-gallery-body__empty">{labels.noContentYet}</p>
              ) : null}
            </div>

            <aside className="ds-login-gallery-body__sidebar">
              <div className="ds-login-gallery-body__sidebar-card">
              <dl className="ds-login-gallery-body__meta-list">
                <div className="ds-login-gallery-body__meta">
                  <dt className="ds-login-gallery-body__label">{labels.sidebarIndustry}</dt>
                  <dd className="ds-login-gallery-body__dd ds-login-gallery-body__value">
                    {industryText || META_EMPTY}
                  </dd>
                </div>
                <div className="ds-login-gallery-body__meta">
                  <dt className="ds-login-gallery-body__label">{labels.sidebarLoginMethods}</dt>
                  <dd className="ds-login-gallery-body__dd">
                    {methodItems.length > 0 ? (
                      <ul className="ds-login-gallery-body__chip-list">
                        {methodItems.map((item) => (
                          <li key={item} className="ds-login-gallery-body__chip">
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="ds-login-gallery-body__value ds-login-gallery-body__value--plain">
                        {META_EMPTY}
                      </span>
                    )}
                  </dd>
                </div>
                <div className="ds-login-gallery-body__meta">
                  <dt className="ds-login-gallery-body__label">{labels.sidebarSocialLogin}</dt>
                  <dd className="ds-login-gallery-body__dd">
                    {socialItems.length > 0 ? (
                      <ul className="ds-login-gallery-body__chip-list">
                        {socialItems.map((item) => (
                          <li key={item} className="ds-login-gallery-body__chip">
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="ds-login-gallery-body__value ds-login-gallery-body__value--plain">
                        {META_EMPTY}
                      </span>
                    )}
                  </dd>
                </div>
                <div className="ds-login-gallery-body__meta">
                  <dt className="ds-login-gallery-body__label">{labels.sidebarTechnicalDetails}</dt>
                  <dd className="ds-login-gallery-body__dd">
                    {techItems.length > 0 ? (
                      <ul className="ds-login-gallery-body__chip-list">
                        {techItems.map((item) => (
                          <li key={item} className="ds-login-gallery-body__chip">
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="ds-login-gallery-body__value ds-login-gallery-body__value--plain">
                        {META_EMPTY}
                      </span>
                    )}
                  </dd>
                </div>
              </dl>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}

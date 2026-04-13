'use client';

import { useTranslations } from 'next-intl';

type Props = {
  title?: string;
  subtitle?: string;
};

export default function ToolReadyTo({ title, subtitle }: Props) {
  const t = useTranslations('Tools.common');
  const resolvedTitle = title ?? t('readyTitleDefault');
  const resolvedSubtitle = subtitle ?? t('readySubtitleDefault');
  return (
    <section className="tools-ready-to">
      <div className="login-default-inner-section gallery-footer">
        <img src="/images/ui_gallery_authgear-circle.svg" loading="lazy" alt="" />
        <p className="paragraph-13">{resolvedTitle}</p>
        <p className="paragraph-12 speciial-color">{resolvedSubtitle}</p>
        <a href="https://accounts.portal.authgear.com/signup" className="gallery-button gallery-page-button w-button">
          {t('getStartedFree')}
        </a>
      </div>
    </section>
  );
}

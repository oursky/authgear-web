import type { CSSProperties, ReactNode } from 'react';
import { t as tFn } from '@/i18n';

type Props = {
  locale: string;
  src?: string;
  iframeTitle: string;
  height?: string;
  policy?: ReactNode;
  iframeId?: string;
  iframeStyle?: CSSProperties;
  children?: ReactNode;
};

export default function ToolWidget({ locale, src, iframeTitle, height, policy, iframeId, iframeStyle, children }: Props) {
  const t = (key: string): string => tFn(locale, `Tools.common.${key}`);
  const defaultStyle: CSSProperties = { border: 'none', width: '100%', height, minHeight: '600px' };
  return (
    <section>
      <div className="w-layout-blockcontainer tools-container w-container">
        {children ? (
          <div className="tools-widget-native" data-testid="tool-widget-native" aria-label={iframeTitle}>
            {children}
          </div>
        ) : (
          <div className="w-iframe">
            <iframe
              {...(iframeId ? { id: iframeId } : {})}
              src={src}
              title={iframeTitle}
              width="100%"
              height={height}
              frameBorder="0"
              scrolling="yes"
              style={iframeStyle ?? defaultStyle}
              allow="clipboard-read; clipboard-write"
              allowFullScreen
            />
          </div>
        )}
        <div className="tools-banner-wrapper">
          <div className="div-block-33">
            <a href="/" target="_blank" className="tools-authgear-tag plausible-event-name--tool-tag-click">
              {t('craftedByTag')}
            </a>
          </div>
          <a href="/" target="_blank" className="tools-banner w-inline-block plausible-event-name--tool-banner-click">
            <img
              src="/images/banner2x.png"
              loading="lazy"
              width="1280"
              sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px"
              alt=""
              srcSet="/images/banner2x-p-500.png 500w, /images/banner2x-p-800.png 800w, /images/banner2x-p-1080.png 1080w, /images/banner2x-p-1600.png 1600w, /images/banner2x-p-2000.png 2000w, /images/banner2x.png 2560w"
              className="image-100"
            />
            <img
              src="/images/banner_m2x.png"
              loading="lazy"
              sizes="100vw"
              srcSet="/images/banner_m2x-p-500.png 500w, /images/banner_m2x.png 670w"
              alt=""
              className="image-100 mobile"
            />
          </a>
          <a href="https://github.com/authgear/authgear-server" target="_blank" className="tools-github-tag w-inline-block plausible-event-name--tool-github-tag-click">
            <div className="text-block-92">{t('supportStarUs')}</div>
            <img src="https://img.shields.io/github/stars/authgear/authgear-server" width="110px" alt="" />
          </a>
        </div>
        {policy && (
          <div className="tools-policy">
            <p className="paragraph-18">{policy}</p>
          </div>
        )}
      </div>
    </section>
  );
}

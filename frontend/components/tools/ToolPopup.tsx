'use client';

import { useTranslations } from 'next-intl';
import PlausibleLink from '@/components/PlausibleLink';

export default function ToolPopup() {
  const t = useTranslations('Tools.common');
  return (
    <div className="tool-popup">
      <h1 className="dev-tool-popup-heading">{t('popupHeading')}</h1>
      <p className="paragraph-20">{t('popupBody')}</p>
      <div className="tool-popup-wrapper">
        <PlausibleLink href="https://portal.authgear.com/" target="_blank" className="tool-popup-button w-inline-block" eventName="tool-popup-signup-click">
          <div>{t('popupStartFree')}</div>
        </PlausibleLink>
        <PlausibleLink href="https://github.com/authgear/authgear-server" target="_blank" className="tool-popup-button secondary w-inline-block" eventName="tool-github-click">
          <div>{t('popupStarUs')}</div>
          <img src="https://img.shields.io/github/stars/authgear/authgear-server" width="110px" alt="" />
        </PlausibleLink>
      </div>
      <div className="tool-popup-close-button-wrapper">
        <PlausibleLink href="#" className="tool-popup-close-button w-button" eventName="popup-close-click">
          {t('popupClose')}
        </PlausibleLink>
      </div>
    </div>
  );
}

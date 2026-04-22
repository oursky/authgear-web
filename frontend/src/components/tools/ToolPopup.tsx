import { t as tFn } from '@/i18n';

type Props = { locale: string };

export default function ToolPopup({ locale }: Props) {
  const t = (key: string): string => tFn(locale, `Tools.common.${key}`);
  return (
    <div className="tool-popup">
      <h1 className="dev-tool-popup-heading">{t('popupHeading')}</h1>
      <p className="paragraph-20">{t('popupBody')}</p>
      <div className="tool-popup-wrapper">
        <a href="https://portal.authgear.com/" target="_blank" className="tool-popup-button w-inline-block plausible-event-name--tool-popup-signup-click">
          <div>{t('popupStartFree')}</div>
        </a>
        <a href="https://github.com/authgear/authgear-server" target="_blank" className="tool-popup-button secondary w-inline-block plausible-event-name--tool-github-click">
          <div>{t('popupStarUs')}</div>
          <img src="https://img.shields.io/github/stars/authgear/authgear-server" width="110px" alt="" />
        </a>
      </div>
      <div className="tool-popup-close-button-wrapper">
        <a href="#" className="tool-popup-close-button w-button plausible-event-name--popup-close-click">
          {t('popupClose')}
        </a>
      </div>
    </div>
  );
}

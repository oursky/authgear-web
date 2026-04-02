'use client';

import { useState } from 'react';

const DEFAULT_IMAGE_SOURCES = [
  '/images/features-mfa-options-totp.svg',
  '/images/features-mfa-options-password.svg',
  '/images/features-mfa-options-magiclink.svg',
  '/images/features-mfa-options-smscode.svg',
] as const;

type Props = {
  tabLabels: readonly [string, string, string, string];
  /** 預設為 MFA 四張插圖；Passkeys「如何建立金鑰」等頁可傳入自訂路徑。 */
  imageSources?: readonly [string, string, string, string];
  ariaLabel?: string;
};

export default function MfaOptionsTabs({
  tabLabels,
  imageSources = DEFAULT_IMAGE_SOURCES,
  ariaLabel = 'MFA options',
}: Props) {
  const [active, setActive] = useState(0);

  return (
    <div className="ds-mfa-options">
      <div className="ds-mfa-options__tablist" role="tablist" aria-label={ariaLabel}>
        {tabLabels.map((label, i) => (
          <button
            key={`mfa-tab-${i}`}
            type="button"
            role="tab"
            id={`mfa-tab-${i}`}
            aria-selected={active === i}
            aria-controls={`mfa-tab-panel-${i}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            className={`ds-mfa-options__tab${active === i ? ' ds-mfa-options__tab--active' : ''}`}
          >
            <span className="ds-mfa-options__tab-label">{label}</span>
          </button>
        ))}
      </div>
      <div className="ds-mfa-options__panels">
        {imageSources.map((src, i) => (
          <div
            key={src}
            id={`mfa-tab-panel-${i}`}
            role="tabpanel"
            aria-labelledby={`mfa-tab-${i}`}
            aria-hidden={active !== i}
            className={`ds-mfa-options__panel${active === i ? ' ds-mfa-options__panel--active' : ''}`}
          >
            <img loading={i === 0 ? 'eager' : 'lazy'} src={src} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}

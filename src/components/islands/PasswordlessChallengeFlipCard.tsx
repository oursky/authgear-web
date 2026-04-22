'use client';

import { useCallback, useState } from 'react';

export type PasswordlessChallengeFlipCardProps = {
  webflowNodeId: string;
  frontIconSrc: string;
  frontTitle: string;
  frontDesc: string;
  backText: string;
};

export default function PasswordlessChallengeFlipCard({
  webflowNodeId,
  frontIconSrc,
  frontTitle,
  frontDesc,
  backText,
}: PasswordlessChallengeFlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const toggle = useCallback(() => setFlipped((v) => !v), []);

  const onKeyToggle = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    },
    [toggle]
  );

  return (
    <div className="flip-card min-h-[min(22rem,100%)] w-full self-stretch [perspective:1000px]" role="region" aria-label={frontTitle}>
      <div
        id={webflowNodeId}
        role="button"
        tabIndex={flipped ? -1 : 0}
        aria-label={flipped ? undefined : `${frontTitle} — ${frontDesc}`}
        aria-hidden={flipped}
        onClick={toggle}
        onKeyDown={onKeyToggle}
        className={
          flipped
            ? 'svg-card-front px-24 pb-24 relative drop-shadow space-between flip-back'
            : 'svg-card-front px-24 pb-24 relative drop-shadow space-between'
        }
        style={{
          transition: 'transform 0.55s ease',
          pointerEvents: flipped ? 'none' : 'auto',
        }}
      >
        <div className="flip-card-content-wrap">
          <div className="svg-card-image-container">
            <img src={frontIconSrc} loading="lazy" alt="" />
          </div>
          <div className="ds-svg-card-content">
            <div className="ds-svg-card-title">{frontTitle}</div>
            <div className="ds-svg-card-description">{frontDesc}</div>
          </div>
        </div>
        <div className="flip-card-toggle-wrap">
          <img src="/images/features-passwordless-challenges-icon-plus.svg" loading="lazy" alt="" aria-hidden />
        </div>
      </div>
      <div
        role="button"
        tabIndex={flipped ? 0 : -1}
        aria-label={flipped ? 'Answer — press to flip back' : undefined}
        aria-hidden={!flipped}
        onClick={toggle}
        onKeyDown={onKeyToggle}
        className={
          flipped
            ? 'svg-card-back px-24 pb-24 relative drop-shadow passkeys-card-back flip-front'
            : 'svg-card-back px-24 pb-24 relative drop-shadow passkeys-card-back'
        }
        style={{
          transition: 'transform 0.55s ease',
          pointerEvents: flipped ? 'auto' : 'none',
        }}
      >
        <div className="svg-card-content-container text-center gap-6 mb-50">
          <div className="svg-card-content-description text-align-left mobile-16px passkeys-card-back">{backText}</div>
        </div>
        <div className="flip-card-toggle-wrap">
          <img src="/images/features-passwordless-challenges-icon-close.svg" loading="lazy" alt="" aria-hidden />
        </div>
      </div>
    </div>
  );
}

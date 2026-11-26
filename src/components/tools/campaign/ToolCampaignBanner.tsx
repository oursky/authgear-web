import type { ReactNode } from 'react';
import { trackEvent } from '@/lib/plausible';
import { promoProps, type Campaign, type Group } from './toolCampaign';
import './toolCampaign.css';

const Pin = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

const Check = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m5 12 5 5 9-10" />
  </svg>
);

const Lock = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </svg>
);

export const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const GROUP_ICON_PATHS: Record<Group, ReactNode> = {
  A: (
    <>
      <circle cx="17" cy="24" r="8" />
      <path d="M25 24h16M35 24v6M40 24v4" />
    </>
  ),
  B: (
    <>
      <path d="M24 6 39 12v11c0 9.5-6.4 16.4-15 19-8.6-2.6-15-9.5-15-19V12Z" />
      <path d="m17 24 5 5 9-10" />
    </>
  ),
  C: (
    <>
      <rect x="8" y="9" width="32" height="12" rx="3" />
      <rect x="8" y="27" width="32" height="12" rx="3" />
      <path d="M15 15h.01M15 33h.01" />
    </>
  ),
  D: (
    <>
      <circle cx="24" cy="24" r="16" />
      <path d="M8 24h32M24 8c4.5 4.5 6.5 10 6.5 16S28.5 35.5 24 40c-4.5-4.5-6.5-10-6.5-16S19.5 12.5 24 8Z" />
    </>
  ),
};

/** Line icon for a group (key, shield, server, globe), in the current text colour. */
export const GroupIcon = ({ group, size = 22 }: { group: Group; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {GROUP_ICON_PATHS[group]}
  </svg>
);

/** A placeholder line standing in for text the story doesn't need. */
const Line = ({ w, light }: { w: number; light?: boolean }) => (
  <i className={light ? 'tc-line tc-line--light' : 'tc-line'} style={{ width: w }} />
);

const HASH = '$argon2id$v=19$m=19456,t=2,p=1$';

const Ok = () => <span className="tc-term__ok">✔</span>;

const TERMINAL: ReactNode[] = [
  <>
    <span className="tc-term__p">$</span> docker compose up -d
  </>,
  <>
    <Ok /> Container postgres{'  '}
    <span className="tc-term__ok">Started</span>
  </>,
  <>
    <Ok /> Container redis{'     '}
    <span className="tc-term__ok">Started</span>
  </>,
  <>
    <Ok /> Container authgear{'  '}
    <span className="tc-term__ok">Started</span>
  </>,
  <>
    <span className="tc-term__p">$</span> <i className="tc-term__cursor" />
  </>,
];

/** The small piece of product UI on the left of each group's banner. No words to translate. */
const ART: Record<Group, ReactNode> = {
  A: (
    <>
      <div className="tc-card tc-db">
        <div className="tc-db__head">
          <span className="tc-db__name">users</span>
        </div>
        <div className="tc-db__cols">
          <span>email</span>
          <span>password_hash</span>
        </div>
        <div className="tc-db__row tc-db__row--focus">
          <span>
            <Line w={84} />
          </span>
          <code>{HASH}c2FsdHNhbHQ…</code>
        </div>
        {[70, 92, 64].map((w) => (
          <div className="tc-db__row" key={w}>
            <span>
              <Line w={w} />
            </span>
            <code className="tc-dim">{HASH}…</code>
          </div>
        ))}
      </div>
      <div className="tc-chip tc-chip--a">
        <Pin />
        <span>Stored in</span>
        <b>?</b>
      </div>
    </>
  ),
  B: (
    <>
      <div className="tc-card tc-otp">
        <div className="tc-otp__row">
          <span className="tc-otp__logo">
            <Lock />
          </span>
          <span className="tc-otp__who">
            <b>Your app</b>
            <Line w={96} light />
          </span>
          <svg className="tc-otp__ring" width="30" height="30" viewBox="0 0 36 36" aria-hidden="true">
            <circle cx="18" cy="18" r="15" fill="none" stroke="#e6e9f5" strokeWidth="4" />
            <circle
              cx="18"
              cy="18"
              r="15"
              fill="none"
              stroke="#4f46e5"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="94.2"
              strokeDashoffset="34"
              transform="rotate(-90 18 18)"
            />
          </svg>
        </div>
        <div className="tc-otp__code">482 913</div>
        <div className="tc-otp__row tc-otp__row--dim">
          <span className="tc-otp__logo tc-otp__logo--dim" />
          <span className="tc-otp__who">
            <Line w={80} />
            <Line w={120} light />
          </span>
        </div>
      </div>
      <div className="tc-chip tc-chip--b">
        <Pin />
        <span>Secret stored in</span>
        <b>?</b>
      </div>
    </>
  ),
  C: (
    <>
      <div className="tc-term">
        <div className="tc-term__bar">
          <i />
          <i />
          <i />
          <span>~/authgear</span>
        </div>
        <pre>
          {TERMINAL.map((line, i) => (
            <span key={i} className="tc-term__line">
              {line}
            </span>
          ))}
        </pre>
      </div>
      <div className="tc-chip tc-chip--c">
        <Pin />
        <span>London</span>
        <b className="tc-chip__code">eu-west-2</b>
      </div>
    </>
  ),
  D: (
    <>
      <div className="tc-card tc-login">
        <span className="tc-login__logo">
          <Lock />
        </span>
        <b>Welcome</b>
        <Line w={90} light />
        <span className="tc-login__field">
          <Line w={60} light />
        </span>
        <span className="tc-login__btn">Continue</span>
      </div>
      <div className="tc-regions">
        <div className="tc-region tc-region--on">
          <Pin />
          <span>London</span>
          <i>
            <Check />
          </i>
        </div>
        {['Frankfurt', 'Amsterdam', 'Stockholm'].map((city) => (
          <div className="tc-region" key={city}>
            <Pin />
            <span>{city}</span>
          </div>
        ))}
      </div>
    </>
  ),
};

/**
 * `inline`: the wide banner under the tool. `rail`: the same banner stacked in
 * a column to the right of a narrow tool on wide screens, like a news site's
 * side advert.
 */
export default function ToolCampaignBanner({ campaign, layout = 'inline' }: { campaign: Campaign; layout?: 'inline' | 'rail' }) {
  const { copy, groupCopy, group } = campaign;
  return (
    <a
      className={`tc-banner tc-banner--${group} tc-banner--${layout}`}
      href={groupCopy.href}
      onClick={() => trackEvent('tool-promo-click', promoProps(campaign, layout === 'rail' ? 'rail' : 'banner'))}
      data-testid={layout === 'rail' ? 'tool-campaign-rail' : 'tool-campaign-banner'}
    >
      <span className="tc-banner__art" aria-hidden="true">
        {ART[group]}
      </span>
      <span className="tc-banner__copy">
        <span className="tc-banner__eyebrow">{copy.eyebrow}</span>
        <span className="tc-banner__title">{groupCopy.headline}</span>
        <span className="tc-banner__text">{groupCopy.text}</span>
      </span>
      <span className="tc-banner__btn">
        {groupCopy.cta}
        <Arrow />
      </span>
    </a>
  );
}

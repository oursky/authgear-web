// UK/EU campaign promos on the /tools/ pages ("house ads"). Draft 13 of the
// campaign (handbook). Campaign-country visitors see campaign versions of the
// banner, popup, GitHub tag, privacy strip, a "More Developer Tools" card and
// a note after they use the tool; everyone else sees today's version.
//
// The pages are prerendered, so the choice happens in the browser after
// hydration (see useToolCampaign): the server HTML is always today's version.

export type Group = 'A' | 'B' | 'C' | 'D';
export type Slot = 'banner' | 'rail' | 'popup' | 'card' | 'note' | 'strip';

/** Campaign window, inclusive of both days (UTC). Outside it, today's version. */
export const CAMPAIGN_STARTS = '2026-12-14';
export const CAMPAIGN_ENDS = '2027-01-17';

/** Browser time zones of the campaign countries (UK, IE, NL, SE, DK, NO, FI, DE, FR). */
export const CAMPAIGN_TIME_ZONES: readonly string[] = [
  'Europe/London',
  'Europe/Belfast',
  'Europe/Jersey',
  'Europe/Guernsey',
  'Europe/Isle_of_Man',
  'Europe/Dublin',
  'Europe/Amsterdam',
  'Europe/Stockholm',
  'Europe/Copenhagen',
  'Europe/Oslo',
  'Arctic/Longyearbyen',
  'Europe/Helsinki',
  'Europe/Berlin',
  'Europe/Busingen',
  'Europe/Paris',
];

/** Tool slug → message group. Anything not listed is group D. */
export const TOOL_GROUPS: Record<string, Group> = {
  'password-hash-generator': 'A',
  'totp-authenticator': 'B',
  'passkey-demo': 'C',
  'jwt-jwe-debugger': 'C',
  'jwk-generator': 'C',
  'hmac-signature-generator-verifier': 'C',
  'oidc-discovery-endpoint': 'C',
};

export interface GroupCopy {
  headline: string;
  text: string;
  cta: string;
  href: string;
  /** One line under the tool once the visitor has used it. */
  note: string;
}

export interface LocaleCopy {
  /** Small line above the banner headline. */
  eyebrow: string;
  groups: Record<Group, GroupCopy>;
  /** Appended to the privacy strip under the tool. */
  strip: { lead: string; cta: string };
  /** "More Developer Tools" card. */
  card: { label: string; badge: string; href: string };
}

const SELF_CHECK = '/sovereignty-self-check/';

/**
 * Copy per locale. Only locales listed here get the campaign. German and
 * French go here once a native speaker has checked them (draft 13: no German
 * or French copy goes live unchecked); every link on those pages points to the
 * localised data sovereignty page, and they show the campaign to every
 * visitor, not only by time zone (see `ALWAYS_ON_LOCALES`).
 */
export const COPY: Partial<Record<string, LocaleCopy>> = {
  en: {
    eyebrow: 'From the team behind this tool',
    groups: {
      A: {
        headline: "Where do your users' password hashes live?",
        text: 'Your login database holds every hash. Check where it sits, who can reach it and whether you could take it with you.',
        cta: 'Take the 2-minute self\u2011check',
        href: SELF_CHECK,
        note: "Where will your users' password hashes be stored?",
      },
      B: {
        headline: 'MFA secrets are user data too',
        text: 'TOTP secrets sit in your login database next to email addresses and phone numbers. Do you know which country that is, and who can reach it?',
        cta: 'Take the 2-minute self\u2011check',
        href: SELF_CHECK,
        note: "Your users' TOTP secrets live in your login database. Do you know where?",
      },
      C: {
        headline: 'Run your own login server in the UK or EU',
        text: 'Authgear is open source (Apache\u20112.0), with passkeys, SSO and MFA. Try it with Docker Compose in about 10 minutes.',
        cta: 'Read the self-host guide',
        href: '/post/self-hosted-authentication-docker-kubernetes/',
        note: 'Want your own login server, running in the UK or EU?',
      },
      D: {
        headline: 'Keep login data where you choose',
        text: 'Authgear is open-source login. Self-host it in the UK or EU, or we run a private deployment for you there.',
        cta: 'See how',
        href: '/solutions/data-sovereignty/',
        note: 'Building login for your app? Keep its data in the UK or EU.',
      },
    },
    strip: { lead: "Your users' login data deserves the same.", cta: 'See where it lives' },
    card: { label: 'Sovereignty Self\u2011Check', badge: 'New', href: SELF_CHECK },
  },
};

/** Locales whose tool pages show the campaign to everyone (all their readers are in campaign countries). */
export const ALWAYS_ON_LOCALES: readonly string[] = ['de', 'fr'];

export interface Campaign {
  group: Group;
  tool: string;
  locale: string;
  copy: LocaleCopy;
  groupCopy: GroupCopy;
}

/** Tool slug from a tool page path: `/tools/<slug>/` or `/<locale>/tools/<slug>/`. */
export function toolFromPath(pathname: string): string | null {
  const m = /^\/(?:[a-z]{2}(?:-[a-z]+)?\/)?tools\/([a-z0-9-]+)\/?$/.exec(pathname);
  return m ? m[1] : null;
}

export function inCampaignWindow(now: Date): boolean {
  const day = now.toISOString().slice(0, 10);
  return day >= CAMPAIGN_STARTS && day <= CAMPAIGN_ENDS;
}

/**
 * Decide whether this visitor sees the campaign, and which version.
 * `force` comes from `?tool-promo=on|off` and is for previews and QA only.
 */
export function resolveCampaign(opts: {
  pathname: string;
  locale: string;
  timeZone: string | undefined;
  now: Date;
  force?: 'on' | 'off' | null;
}): Campaign | null {
  const { pathname, locale, timeZone, now, force } = opts;
  if (force === 'off') return null;
  const tool = toolFromPath(pathname);
  const copy = COPY[locale];
  if (!tool || !copy) return null;
  if (force !== 'on') {
    if (!inCampaignWindow(now)) return null;
    const inCountry = ALWAYS_ON_LOCALES.includes(locale) || (!!timeZone && CAMPAIGN_TIME_ZONES.includes(timeZone));
    if (!inCountry) return null;
  }
  const group = TOOL_GROUPS[tool] ?? 'D';
  return { group, tool, locale, copy, groupCopy: copy.groups[group] };
}

/** Plausible props for `tool-promo-view` and `tool-promo-click`. */
export function promoProps(c: Campaign, slot?: Slot): Record<string, string> {
  return { ...(slot ? { slot } : {}), group: c.group, tool: c.tool, locale: c.locale };
}

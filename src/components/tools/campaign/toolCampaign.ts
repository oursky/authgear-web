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
export const CAMPAIGN_STARTS = '2026-11-26';
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
  /** The few words inside the banner pictures. Table names and code stay as they are. */
  art: {
    storedIn: string;
    secretStoredIn: string;
    yourApp: string;
    welcome: string;
    continueLabel: string;
    /** Region chip on the terminal (group C). */
    region: { city: string; code: string };
    /** Region picker (group D); the first one is selected. */
    regions: string[];
  };
}

const SELF_CHECK = '/sovereignty-self-check/';

const DE_SOVEREIGNTY = '/de/solutions/data-sovereignty/';
const FR_SOVEREIGNTY = '/fr/solutions/data-sovereignty/';
/** French puts a non-breaking space before ? : ; and !. */
const NBSP = '\u00a0';

/**
 * Copy per locale. Only locales listed here get the campaign. The self-check,
 * checklist and self-host guide are English only, so every German and French
 * link goes to the localised data sovereignty page, and those pages show the
 * campaign to every visitor, not only by time zone (see `ALWAYS_ON_LOCALES`).
 * The German and French copy went live on 26 Nov 2026 before native review.
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
    art: {
      storedIn: 'Stored in',
      secretStoredIn: 'Secret stored in',
      yourApp: 'Your app',
      welcome: 'Welcome',
      continueLabel: 'Continue',
      region: { city: 'London', code: 'eu-west-2' },
      regions: ['London', 'Frankfurt', 'Amsterdam', 'Stockholm'],
    },
  },
  de: {
    eyebrow: 'Vom Team hinter diesem Tool',
    groups: {
      A: {
        headline: 'Wo liegen die Passwort-Hashes Ihrer Nutzer?',
        text: 'Ihre Login-Datenbank enthält jeden Hash. Prüfen Sie, wo sie liegt, wer darauf zugreifen kann und ob Sie sie mitnehmen könnten.',
        cta: 'Mehr zur Datensouveränität',
        href: DE_SOVEREIGNTY,
        note: 'Wo werden die Passwort-Hashes Ihrer Nutzer gespeichert?',
      },
      B: {
        headline: 'Auch MFA-Secrets sind Nutzerdaten',
        text: 'TOTP-Secrets liegen in Ihrer Login-Datenbank, neben E-Mail-Adressen und Telefonnummern. Wissen Sie, in welchem Land das ist und wer darauf zugreifen kann?',
        cta: 'Mehr zur Datensouveränität',
        href: DE_SOVEREIGNTY,
        note: 'Die TOTP-Secrets Ihrer Nutzer liegen in Ihrer Login-Datenbank. Wissen Sie, wo?',
      },
      C: {
        headline: 'Betreiben Sie Ihren eigenen Login-Server in der EU',
        text: 'Authgear ist Open Source (Apache\u20112.0), mit Passkeys, SSO und MFA. Hosten Sie es selbst in der EU, oder wir betreiben es für Sie.',
        cta: 'Mehr zur Datensouveränität',
        href: DE_SOVEREIGNTY,
        note: 'Möchten Sie Ihren eigenen Login-Server in der EU betreiben?',
      },
      D: {
        headline: 'Login-Daten bleiben, wo Sie es wollen',
        text: 'Authgear ist Open-Source-Login. Hosten Sie es selbst in der EU, oder wir betreiben dort eine dedizierte Bereitstellung für Sie.',
        cta: 'Mehr zur Datensouveränität',
        href: DE_SOVEREIGNTY,
        note: 'Sie bauen Login für Ihre App? Behalten Sie die Daten in der EU.',
      },
    },
    strip: { lead: 'Die Login-Daten Ihrer Nutzer verdienen denselben Schutz.', cta: 'So behalten Sie die Kontrolle' },
    card: { label: 'Datensouveränität', badge: 'Neu', href: DE_SOVEREIGNTY },
    art: {
      storedIn: 'Wo gespeichert',
      secretStoredIn: 'Wo gespeichert',
      yourApp: 'Ihre App',
      welcome: 'Willkommen',
      continueLabel: 'Weiter',
      region: { city: 'Frankfurt', code: 'eu-central-1' },
      regions: ['Frankfurt', 'Amsterdam', 'Paris', 'Stockholm'],
    },
  },
  fr: {
    eyebrow: "Par l'équipe derrière cet outil",
    groups: {
      A: {
        headline: `Où se trouvent les hachages de mots de passe de vos utilisateurs${NBSP}?`,
        text: "Votre base d'authentification contient chaque hachage. Vérifiez où elle se trouve, qui peut y accéder et si vous pourriez l'emporter avec vous.",
        cta: 'Souveraineté des données',
        href: FR_SOVEREIGNTY,
        note: `Où les hachages de mots de passe de vos utilisateurs seront-ils stockés${NBSP}?`,
      },
      B: {
        headline: 'Les secrets MFA sont aussi des données utilisateur',
        text: `Les secrets TOTP sont stockés dans votre base d'authentification, à côté des adresses e-mail et des numéros de téléphone. Savez-vous dans quel pays, et qui peut y accéder${NBSP}?`,
        cta: 'Souveraineté des données',
        href: FR_SOVEREIGNTY,
        note: `Les secrets TOTP de vos utilisateurs sont dans votre base d'authentification. Savez-vous où${NBSP}?`,
      },
      C: {
        headline: "Exploitez votre propre serveur d'authentification dans l'UE",
        text: "Authgear est open source (Apache\u20112.0), avec passkeys, SSO et MFA. Auto-hébergez-le dans l'UE, ou nous l'exploitons pour vous.",
        cta: 'Souveraineté des données',
        href: FR_SOVEREIGNTY,
        note: `Envie d'exploiter votre propre serveur d'authentification dans l'UE${NBSP}?`,
      },
      D: {
        headline: 'Gardez les données de connexion là où vous le choisissez',
        text: "Authgear est une solution d'authentification open source. Auto-hébergez-la dans l'UE, ou nous exploitons pour vous un déploiement privé.",
        cta: 'Souveraineté des données',
        href: FR_SOVEREIGNTY,
        note: `Vous intégrez l'authentification à votre application${NBSP}? Gardez ses données dans l'UE.`,
      },
    },
    strip: { lead: 'Les données de connexion de vos utilisateurs méritent la même protection.', cta: 'Voir comment garder le contrôle' },
    card: { label: 'Souveraineté des données', badge: 'Nouveau', href: FR_SOVEREIGNTY },
    art: {
      storedIn: 'Stocké où',
      secretStoredIn: 'Stocké où',
      yourApp: 'Votre app',
      welcome: 'Bienvenue',
      continueLabel: 'Continuer',
      region: { city: 'Paris', code: 'eu-west-3' },
      regions: ['Paris', 'Francfort', 'Amsterdam', 'Stockholm'],
    },
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

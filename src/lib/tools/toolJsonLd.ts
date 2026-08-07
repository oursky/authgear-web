import { t } from '@/i18n';
import { TOOL_SLUG_PREFIX } from './toolSlugPrefix';

/**
 * One FAQ question for a tool page, expressed as message keys relative to
 * `Tools.<prefix>.`.
 *
 * - `title`: keys concatenated with a space to form the question, matching how
 *   split titles (link text + suffix) are rendered on the page.
 * - `body`: paragraphs of the answer. Each paragraph is a list of inline keys
 *   joined with no separator (for sentences split around links); paragraphs
 *   and list items are joined with a newline.
 */
interface FaqDef {
  title: string[];
  body: string[][];
}

interface ToolJsonLdDef {
  /** Defaults to 'DeveloperApplication'. */
  applicationCategory?: string;
  /** Fixed name override; defaults to metaTitle without the " | Authgear" suffix. */
  name?: string;
  /** Omit for tools without an FAQ section. */
  faq?: FaqDef[];
}

const TOOL_JSONLD_DEFS: Record<string, ToolJsonLdDef> = {
  'base64-decode-encode': {
    faq: [
      { title: ['faqWhatTitle'], body: [['faqWhatBody']] },
      {
        title: ['faqUrlTitle'],
        body: [['faqUrlBody'], ['faqGuidePart1', 'faqGuideLinkLabel', 'faqGuidePart2']],
      },
    ],
  },
  'hmac-signature-generator-verifier': {
    faq: [
      { title: ['faqWhatTitle'], body: [['faqWhatBody']] },
      { title: ['faqWhyTitle'], body: [['faqWhy1'], ['faqWhy2'], ['faqWhy3']] },
    ],
  },
  'jwk-generator': {
    faq: [
      {
        title: ['faqJwkLinkText', 'faqJwkTitleSuffix'],
        body: [['faqJwkBody'], ['faqJwkBullet1'], ['faqJwkBullet2'], ['faqJwkBullet3']],
      },
      {
        title: ['faqPemTitle'],
        body: [['faqPemBody'], ['faqPemBase64Part1', 'faqPemBase64LinkLabel', 'faqPemBase64Part2']],
      },
    ],
  },
  'jwt-jwe-debugger': {
    faq: [
      {
        title: ['faqJwtLinkText', 'faqJwtTitleSuffix'],
        body: [
          ['faqJwtBodyP1', 'faqJwtBodyLinkMid', 'faqJwtBodyP2'],
          ['faqJwtBullet1'],
          ['faqJwtBullet2'],
          ['faqJwtBullet3'],
          ['faqJwtUseCases'],
          ['faqJwtUse1'],
          ['faqJwtUse2'],
          ['faqJwtUse3'],
          ['faqJwtBase64Part1', 'faqJwtBase64LinkLabel', 'faqJwtBase64Part2'],
        ],
      },
      {
        title: ['faqJweTitle'],
        body: [
          ['faqJweBody'],
          ['faqJweB1'],
          ['faqJweB2'],
          ['faqJweB3'],
          ['faqJweB4'],
          ['faqJweB5'],
          ['faqJweUseCases'],
          ['faqJweUse1'],
          ['faqJweUse2'],
          ['faqJweUse3'],
        ],
      },
    ],
  },
  'oidc-discovery-endpoint': {
    faq: [1, 2, 3, 4, 5].map((n) => ({ title: [`faq${n}Title`], body: [[`faq${n}Body`]] })),
  },
  'passkey-demo': {
    faq: [
      { title: ['faqWebauthnTitle'], body: [['faqWebauthnBody'], ['faqWebauthnLinkText']] },
      { title: ['faqSafeTitle'], body: [['faqSafeBody']] },
      {
        title: ['faqDeleteTitle'],
        body: [
          ['faqDeleteIntro'],
          ['faqDeleteIos'],
          ['faqDeleteAndroid'],
          ['faqDeleteWindows'],
          ['faqDeleteManagers'],
        ],
      },
      { title: ['faqAaguidTitle'], body: [['faqAaguidBody']] },
      { title: ['faqSignCountTitle'], body: [['faqSignCountBody']] },
    ],
  },
  'password-hash-generator': {
    faq: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({ title: [`faq${n}Title`], body: [[`faq${n}Body`]] })),
  },
  'sms-cost-calculator': {
    applicationCategory: 'BusinessApplication',
    name: 'SMS Cost Calculator',
    faq: [1, 2, 3, 4, 5, 6].map((n) => ({ title: [`faq${n}Title`], body: [[`faq${n}Body`]] })),
  },
  'ssl-checker': {
    faq: [
      { title: ['faq1Title'], body: [['faq1Body'], ['faq1MetaBody']] },
      {
        title: ['faq2Title'],
        body: [['faq2Body'], ['faq2LearnMoreBefore', 'faq2LearnMoreLinkText']],
      },
      { title: ['faq3Title'], body: [['faq3Body']] },
      { title: ['faq4Title'], body: [['faq4Body'], ['faq4Body2']] },
    ],
  },
  'totp-authenticator': {
    faq: [
      { title: ['faq1Title'], body: [['faq1Body']] },
      { title: ['faq2Title'], body: [['faq2b1'], ['faq2b2'], ['faq2b3']] },
      { title: ['faq3Title'], body: [['faq3Body']] },
      { title: ['faq4Title'], body: [['faq4Body']] },
      { title: ['faq5Title'], body: [['faq5Body']] },
      { title: ['faq6Title'], body: [['faq6Body']] },
    ],
  },
  'uuidv7-generator': {
    faq: [
      { title: ['faq1Title'], body: [['faq1BodyBefore', 'faq1LinkText', 'faq1BodyAfter']] },
      { title: ['faq2Title'], body: [['faq2b1'], ['faq2b2'], ['faq2b3']] },
    ],
  },
};

/**
 * Build the JSON-LD object (SoftwareApplication + optional FAQPage) for a tool
 * page. Returns null for unknown slugs.
 */
export function buildToolJsonLd(locale: string, slug: string): object | null {
  const prefix = TOOL_SLUG_PREFIX[slug];
  const def = TOOL_JSONLD_DEFS[slug];
  if (!prefix || !def) return null;

  const msg = (key: string) => t(locale, `Tools.${prefix}.${key}`);
  const name = def.name ?? msg('metaTitle').replace(/\s*\|\s*Authgear\s*$/, '');

  const graph: object[] = [
    {
      '@type': 'SoftwareApplication',
      name,
      applicationCategory: def.applicationCategory ?? 'DeveloperApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: msg('metaDescription'),
    },
  ];

  if (def.faq && def.faq.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: def.faq.map((q) => ({
        '@type': 'Question',
        name: q.title.map(msg).join(' '),
        acceptedAnswer: {
          '@type': 'Answer',
          text: q.body.map((paragraph) => paragraph.map(msg).join('')).join('\n'),
        },
      })),
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

export type PricingLocaleKey = 'en' | 'zh-Hant';

/** Rich comparison cells — rendered in `PricingPageClient` (must be serializable; no functions). */
export type PricingNodeVariant =
  | 'smsWhatsappBusiness'
  | 'smsWhatsappDevelopers'
  | 'othersBusiness'
  | 'othersEnterprise'
  | 'addonsDevelopers'
  | 'addonsBusiness';

export type PricingCell =
  | { kind: 'check' }
  | { kind: 'text'; value: string }
  | { kind: 'nodeVariant'; variant: PricingNodeVariant }
  | { kind: 'dash' }
  | { kind: 'empty' };

export type CloudPlan = {
  name: string;
  priceLine: string;
  cta: { label: string; href: string; external?: boolean };
  features: string[];
  /** optional badge e.g. Most Popular */
  badge?: string;
  highlight?: boolean;
  enterprise?: boolean;
};

export type PricingCopy = {
  meta: { title: string; description: string };
  tabs: { cloud: string; once: string };
  cloud: {
    titleLine1: string;
    titleHighlight: string;
    titleLine2: string;
    subtitle: string;
    intro: string;
    introStrong: string;
    introRest: string;
    plans: CloudPlan[];
    expandComparison: string;
    fullPlanTitle: string;
  };
  comparison: {
    planNames: [string, string, string, string];
    rows: Array<{
      label: string;
      odd?: boolean;
      cells: [PricingCell, PricingCell, PricingCell, PricingCell];
    }>;
  };
  once: {
    titleLine1: string;
    titleHighlight: string;
    titleLine2: string;
    subtitle: string;
    intro: string;
    plans: CloudPlan[];
    coreTitle: string;
    coreRows: Array<{ label: string; value: PricingCell | string }>;
    enterpriseContactSuffix: string;
  };
  cta: { title: string; subtitle: string; button: string; href: string };
  faq: { heading: string; items: Array<{ q: string; a: string }> };
};

export type PricingShellProps = {
  copy: PricingCopy;
  locale: string;
  whatsappPricingPath: string;
};

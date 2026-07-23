import type { PricingCopy } from './types';
import { fullComparisonEn } from './data/full-comparison-en';

export const pricingCopyEn: PricingCopy = {
  meta: {
    title: 'Pricing - Authgear',
    description:
      'Authentication and authorization solution for your applications and APIs, with flexible pricing for developers and corporations.',
  },
  cloud: {
    titleLine1: 'Authgear ',
    titleHighlight: 'CLOUD',
    titleLine2: 'We manage everything for you',
    subtitle: 'All-Inclusive Pricing: Full Feature Access with all Plans',
    intro:
      'At Authgear CLOUD, we believe in empowering your growth. Our pricing plans have ',
    introStrong: 'no feature gate',
    introRest:
      ', every plan comes with every features. From robust security measures to seamless integrations and advanced customizations, start for free and scale your applications with all the tools you need—without hidden fees.',
    plans: [
      {
        name: 'Free',
        priceLine: '$0',
        cta: { label: 'Get Started', href: 'https://accounts.portal.authgear.com/signup', external: true },
        features: [
          'Unlimited MAUs',
          '100 SMS/WhatsApp Messages',
          '2 Applications',
          '2 Project Members',
          '1 Day Log Retention',
          'Include All Auth Features',
          'Community support',
        ],
      },
      {
        name: 'Developers',
        badge: 'Most Popular',
        priceLine: '$50',
        highlight: true,
        cta: {
          label: 'Get Started',
          href: 'https://portal.authgear.com/?utm_source=pricing&utm_medium=link&utm_campaign=developers-plan',
          external: true,
        },
        features: [
          'Unlimited MAUs',
          'Metered SMS/Whatsapp',
          '2 Applications',
          '2 Project Members',
          '1 Day Log Retention',
          'Include All Auth Features',
          'Priority Email Support',
        ],
      },
      {
        name: 'Business',
        priceLine: '$500',
        cta: {
          label: 'Get Started',
          href: 'https://portal.authgear.com/?utm_source=pricing&utm_medium=link&utm_campaign=business-plan',
          external: true,
        },
        features: [
          '25,000 MAUs (+$50/5k MAUs)',
          'Metered SMS/Whatsapp',
          '5 Applications',
          '5 Project Members',
          '60 Days Log Retention',
          'Include All Auth Features',
          'Dedicated Slack Channel',
        ],
      },
      {
        name: 'Enterprise',
        enterprise: true,
        priceLine: 'Custom Pricing',
        cta: { label: 'Contact Us', href: '__CONTACT__', external: false },
        features: [
          'Volume discount',
          'Data residency',
          'Custom SMS Gateway',
          'Tailored SLA',
          'Dedicated Account Manager',
        ],
      },
    ],
    expandComparison: 'Show full plan comparison',
    fullPlanTitle: 'Full plan comparison',
  },
  comparison: fullComparisonEn,
  cta: {
    title: "Couldn't find the plan you're looking for?",
    subtitle: "Send us a message, and we'll help you identify the best option for your business.",
    button: 'Contact Us',
    href: '__CONTACT__',
  },
  faq: {
    heading: 'Frequently asked questions',
    items: [
      {
        q: 'Is Authgear open source?',
        a: "Yes! Authgear is open source, so you don't have to worry about vendor lock-in. You can find the exact version we are running on Authgear.com at GitHub.",
      },
      {
        q: 'Where is Authgear hosted?',
        a: 'Currently, we are hosted on the Google Cloud Platform in the USA. If you need a managed SaaS in other countries, please contact us.',
      },
      {
        q: 'Can I export all user data if I stop using Authgear?',
        a: 'Yes. You can export all data from Authgear as needed. Authgear is open source and based on PostgreSQL, so you can export the data and run it on your own servers.',
      },
      {
        q: 'Why should I trust Authgear with my data?',
        a: "Authgear is open source, so there's no secret, proprietary code. You can audit everything. We host our data on data centers and cloud providers that comply with information security standards, including ISO 27001 and PCI-DSS. You can read more here. We also design and develop each feature according to the Open Web Application Security Project's (OWASP) checklist.",
      },
      {
        q: 'Does Authgear offer a money-back guarantee?',
        a: 'Yes, we offer a 30-day money-back guarantee for any SaaS plan.',
      },
      {
        q: 'What happens if I reach my MAUs limit?',
        a: 'For the Business plan, you will be charged for the additional MAUs in the next billing cycle.',
      },
      {
        q: 'What is MAUs?',
        a: 'A MAU (Monthly Active User) refers to any unique user who interacted (i.e., signed up, logged in, or had an active session) with your app within a given month.',
      },
      {
        q: 'Do you offer volume discounts or private cloud deployment?',
        a: 'Yes! We work with Corporates to customize the plan that suits their needs. Please contact us!',
      },
      {
        q: 'What does unlimited MAUs mean for me?',
        a: 'With unlimited MAUs, you can scale your user base without any restrictions on the number of active users. This allows you to grow your application without worrying about hitting user caps.',
      },
      {
        q: 'Is the Free plan really free?',
        a: 'Yes! Our Free plan offers essential features at no cost, with no credit card required. You can start building and scaling your application without any upfront investment.',
      },
      {
        q: 'Can I switch plans later?',
        a: 'Absolutely. As your needs grow, you can upgrade to a higher plan at any time. Our flexible pricing structure is designed to support your growth journey.',
      },
      {
        q: 'How do I get custom pricing for the Enterprise plan?',
        a: 'For businesses with unique needs, our Enterprise plan offers tailored solutions. Contact our sales team to discuss your requirements and get a custom quote.',
      },
      {
        q: 'What kind of support do I get with each plan?',
        a: 'Free: Access to our knowledge base and community support. Developers: Priority email support. Business: Dedicated Slack channel. Enterprise: 24/7 dedicated support and a personal account manager.',
      },
    ],
  },
};

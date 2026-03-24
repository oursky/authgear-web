export type ComparePageMeta = {
  title: string;
  description: string;
};

export const compareData: Record<string, ComparePageMeta> = {
  'auth0-alternative': {
    title: 'Authgear vs Auth0',
    description:
      'Transparent pricing, highly customizable features, and an amazing developer experience make Authgear the best alternative to Auth0.',
  },
  'cognito-alternative': {
    title: 'Authgear vs Amazon Cognito',
    description:
      'Amazing developer experience, modern pre-built UI, powerful admin portal & APIs, make Authgear the best alternative to Cognito.',
  },
  'firebase-alternative': {
    title: 'Authgear vs Firebase',
    description:
      'Enterprise-ready IAM features, predictable pricing, and backend agnostic make Authgear the best alternative to Firebase.',
  },
  'okta-alternative': {
    title: 'Authgear vs Okta',
    description:
      'Transparent pricing, highly customizable features, and an amazing developer experience make Authgear the best alternative to Okta.',
  },
};

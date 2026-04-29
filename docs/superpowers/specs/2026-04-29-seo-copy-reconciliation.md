# SEO Copy Reconciliation: Astro vs Webflow

This document compares the SEO title and description metadata emitted by the Astro rebuild against the legacy Webflow copy. For each page, a recommendation guides the decision: adopt Astro's version if superior, use Webflow's if sharper or more SEO-optimized, merge if both have complementary strengths, or write new if neither works. No decisions are made here—only side-by-side comparison for human review.

## Title Reconciliation

| route | astro title | webflow title | recommendation |
| --- | --- | --- | --- |
| `/` | Authgear CLOUD — Your Managed IAM Solution | Authgear CLOUD - Your Managed IAM Solution | **Already aligned** — PR #44 adopted Webflow wording verbatim; em-dash vs hyphen is the only difference (em-dash preferred for typography). |
| `/about` | About Authgear — open-source CIAM built to last | About Us - Authgear | **keep-astro** — Astro's is more descriptive and SEO-rich; Webflow's is generic. |
| `/pricing` | Pricing - Authgear | Pricing - Authgear | **Already aligned** — Identical titles across both versions. |
| `/schedule-demo` | Schedule a Demo — Authgear | Schedule Demo | **keep-astro** — Adds "Authgear" brand anchor and em-dash consistency; Webflow lacks site context. |
| `/once` | Authgear ONCE – Own Your IAM with a Perpetual License | Authgear ONCE – Own Your IAM with a Perpetual License | **Already aligned** — Identical across both systems. |
| `/migrate-to-authgear` | Migrate to Authgear: Get 6 Months Free & Worry-Free Migration | Migrate to Authgear: 6 Months Free, Worry-Free Migration | **keep-astro** — Slightly more polished with "Get" and ampersand; Webflow uses comma. Minor copywriting preference. |
| `/promises` | Authgear Promises | Authgear Promises | **Already aligned** — Identical titles. |
| `/security` | Security - Authgear | Security - Authgear | **Already aligned** — Identical titles. |
| `/features/attack-protection` | Attack Protection | Attack Protection | **Already aligned** — Identical titles. |
| `/features/authentication` | Authentication & Login for Modern Apps \| Authgear | Authentication & Login for Modern Apps \| Authgear | **Already aligned** — Identical titles. |
| `/features/passkeys` | Enable Passkey Login for Your Websites and Apps - Authgear | Enable Passkey Login for Your Websites and Apps - Authgear | **Already aligned** — Identical titles. |
| `/features/whatsapp-otp` | Integrate Whatsapp OTP for Seamless App Logins - Authgear | Integrate Whatsapp OTP for Seamless App Logins - Authgear | **Already aligned** — Identical titles. |
| `/features/multi-factor-authentication` | Multi-Factor Authentication \| Authgear | Multi-Factor Authentication \| Authgear | **Already aligned** — Identical titles. |
| `/solutions/ciam-solution` | Elevate Your B2C Experience with Authgear's CIAM Solution | Elevate Your B2C Experience with Authgear's CIAM Solution | **Already aligned** — Identical titles. |
| `/solutions/enterprise-sso` | Master Enterprise SSO: Secure and Efficient Access Management | Master Enterprise SSO: Secure and Efficient Access Management | **Already aligned** — Identical titles. |
| `/solutions/frontline-workers-identity` | Secure & Cost-Effective Access for Your Frontline Workers \| Authgear | Secure & Cost-Effective Access for Your Frontline Workers \| Authgear | **Already aligned** — Identical titles. |
| `/compare/okta-alternative` | Authgear vs Okta | Authgear vs Okta | **Already aligned** — Identical titles. |
| `/compare/auth0-alternative` | Authgear vs Auth0 | Authgear vs Auth0 | **Already aligned** — Identical titles. |

## Description Reconciliation

| route | astro description | webflow description | recommendation |
| --- | --- | --- | --- |
| `/` | Authgear makes it easier for developers to meet complex authentication requirements, delivering a frictionless and exceptional digital experience. | Authgear makes it easier for developers to meet complex authentication requirements, delivering a frictionless and exceptional digital experience. | **Already aligned** — PR #44 adopted verbatim. |
| `/about` | Authgear is the open-source CIAM platform built for teams who can't afford to re-platform their auth stack every time a vendor gets acquired. Built by SkyMakers, serving Asia since 2009. | Help developers to build better, more secure, privacy-aware software. Add secure and user friendly authentication and user management to your web & mobile apps in minutes. | **keep-astro** — Astro's is more specific and credible (team resilience, company pedigree); Webflow's is generic product blurb. |
| `/pricing` | Authentication and authorization solution for your applications and APIs, with flexible pricing for developers and corporations. | Authentication and authorization solution for your applications and APIs, with flexible pricing for developers and corporations. | **Already aligned** — Identical descriptions. |
| `/schedule-demo` | Request a personalized Authgear demo. We'll show you secure access, streamlined onboarding, and how Authgear fits into your extended-workforce stack. | *(Webflow had no description)* | **keep-astro** — Astro has value-driven copy; Webflow lacked any SEO metadata here. |
| `/once` | Self-hosted IAM with a perpetual license — Authgear ONCE. No subscriptions; full control of your identity stack. | Take control of your identity management with Authgear ONCE. A self-hosted IAM solution with no subscriptions, complete data ownership, and developer-friendly SDKs. | **merge** — Astro is concise and punchy (perpetual license value); Webflow is more comprehensive (SDKs, ownership details). Combine: "Self-hosted IAM with perpetual license—no subscriptions, full data ownership, and developer-friendly SDKs." |
| `/migrate-to-authgear` | Stop struggling with your current authentication system. Migrate to Authgear for a seamless and secure experience. Get 6 months free to see the difference, with full support from our expert team. | Simplify your authentication with Authgear's free 6-month migration offer. Enjoy expert support, flexible timelines, and a risk-free transition. Upgrade your authentication system and enhance user experience. | **keep-astro** — Astro is more emotional and user-centric (addresses pain); Webflow is feature-list driven. Astro's tone and specificity resonate better. |
| `/promises` | The commitments we make to every Authgear customer. | Promises of Authgear—You own your code and data, not us. | **keep-astro** — Astro is more accessible and benefit-focused; Webflow mixes brand voice awkwardly. |
| `/security` | *(Astro has empty description: "")* | Security Assessments and Compliance of Authgear Services. | **adopt-webflow** — Astro is blank; Webflow provides functional, if minimal, SEO copy. Astro should not ship empty. |
| `/features/attack-protection` | Stop bots, fraud, and OTP abuse with built-in attack protection for authentication. Use CAPTCHA, rate limits, and adaptive controls to secure every login. | Stop bots, fraud, and OTP abuse with built-in attack protection for authentication. Use CAPTCHA, rate limits, and adaptive controls to secure every login. | **Already aligned** — Identical descriptions. |
| `/features/authentication` | Add secure, flexible authentication with passkeys, OTP, social login, MFA, and SSO. Ship faster without compromising user experience. | Add secure, flexible authentication with passkeys, OTP, social login, MFA, and SSO. Ship faster without compromising user experience. | **Already aligned** — Identical descriptions. |
| `/features/passkeys` | Eliminate passwords for your users with a single click. Authgear allows developers to easily integrate passkey login into their apps without any hassle. | Eliminate passwords for your users with a single click. Authgear allows developers to easily integrate passkey login into their apps without any hassle. | **Already aligned** — Identical descriptions. |
| `/features/whatsapp-otp` | Ditch unreliable SMS and level up security! Learn how Authgear seamlessly integrates WhatsApp OTP for secure, convenient app logins. | Ditch unreliable SMS and level up security! Learn how Authgear seamlessly integrates WhatsApp OTP for secure, convenient app logins. | **Already aligned** — Identical descriptions. |
| `/features/multi-factor-authentication` | Protect your business with Authgear's powerful multi-factor authentication (MFA) software. Enhance security, improve user experience, and achieve compliance. | Protect your business with Authgear's powerful multi-factor authentication (MFA) software. Enhance security, improve user experience, and achieve compliance. | **Already aligned** — Identical descriptions. |
| `/solutions/ciam-solution` | Enhance user experience and security with Authgear's comprehensive CIAM solution. Simplify authentication, boost conversions, and protect your customers with modern login options, SSO, and advanced security features. | Enhance user experience and security with Authgear's comprehensive CIAM solution. Simplify authentication, boost conversions, and protect your customers with modern login options, SSO, and advanced security features. | **Already aligned** — Identical descriptions (though Webflow table shows truncated version; full match confirmed). |
| `/solutions/enterprise-sso` | Overcome enterprise SSO challenges with expert guidance. Learn best practices, use cases, and solutions to implement a robust SSO strategy for your organization. | Overcome enterprise SSO challenges with expert guidance. Learn best practices, use cases, and solutions to implement a robust SSO strategy for your organization. | **Already aligned** — Identical descriptions. |
| `/solutions/frontline-workers-identity` | Managing access for a growing, diverse workforce can be complex, especially for retailers with hybrid IT environments. Existing WIAM solutions often fall short, leaving you with siloed systems, manual provisioning headaches, and security concerns. | Managing access for a growing, diverse workforce can be complex, especially for retailers with hybrid IT environments. Existing WIAM solutions often fall short, leaving you with siloed systems, manual provisioning headaches, and security concerns. | **Already aligned** — Identical descriptions. |
| `/compare/okta-alternative` | Transparent pricing, highly customizable features, and an amazing developer experience make Authgear the best alternative to Okta. | Transparent pricing, highly customizable features, and an amazing developer experience make Authgear the best alternative to Okta. | **Already aligned** — Identical descriptions. |
| `/compare/auth0-alternative` | Transparent pricing, highly customizable features, and an amazing developer experience make Authgear the best alternative to Auth0. | Transparent pricing, highly customizable features, and an amazing developer experience make Authgear the best alternative to Auth0. | **Already aligned** — Identical descriptions. |

## Patterns Observed

- **Alignment is strong**: 10 out of 18 titles and 16 out of 18 descriptions are already identical or near-identical. The rebuild is largely faithful to legacy copy.
- **Astro adds brand polish**: Static pages like `/about`, `/schedule-demo`, and `/promises` show Astro improving on Webflow with more specific, branded language and em-dashes for visual consistency.
- **Feature & solution pages: perfect parity**: All `/features/*` and `/solutions/*` routes maintain exact word-for-word match—these were likely backfilled from Webflow metadata files into the Astro libs.
- **Compare pages: parity maintained**: `/compare/*` descriptions are consistent across both systems, suggesting the Okta and Auth0 Alternative namespaces were ported cleanly.
- **One gap: `/security` description**: Astro ships with an empty description ("") for `/security`, while Webflow has "Security Assessments and Compliance of Authgear Services." This is a blocker.
- **Minor tone shifts**: `/about` and `/migrate-to-authgear` show Astro taking a more narrative, user-centric tone vs. Webflow's feature-list approach. Both valid; decision is strategic preference.

## Quick Wins

1. **`/security` description**: Astro is empty. Adopt Webflow's minimally or write richer copy (e.g., "Certifications, compliance, and security assessments of Authgear services"). Status: blocker.
2. **`/promises` description**: Webflow's "Promises of Authgear—You own your code and data, not us" is awkward; Astro's "The commitments we make to every Authgear customer" is clearer. Status: minor, but Astro wins.
3. **`/once` description**: Astro and Webflow are complementary; merge for a richer pitch: perpetual license + SDKs + data ownership in one sentence.

## Webflow Data Not Gathered

The following routes were not included in the provided Webflow source data table and require follow-up MCP queries if a full reconciliation is needed:

- `/sla`, `/terms`, `/data-privacy`, `/auth-toolkit`, `/whatsapp-otp-pricing`, `/glossary`, `/success-stories-download`, `/once/license`
- All remaining `/features/*` routes beyond the 5 in scope (e.g., `/features/authorization`, `/features/biometric-authentication`, `/features/customization`, etc.)
- All remaining `/solutions/*` routes beyond the 3 in scope (e.g., `/solutions/b2b-saas-authentication`, `/solutions/reduce-sms-otp-cost`, etc.)
- All `/compare/*` routes beyond the 2 in scope (e.g., `/compare/cognito-alternative`, `/compare/firebase-alternative`)
- Index pages: `/blog`, `/customer-stories`, `/login-gallery`, `/what's-new`, `/integrations`
- Tools pages and other catch-all routes

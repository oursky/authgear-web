---
title: "What Is CIAM? Customer Identity and Access Management Explained"
excerpt: "CIAM is the system that lets your customers sign up, log in and manage their accounts in your apps. Here is how it differs from workforce IAM, the features that matter, and how to choose where it runs."
coverImage: ./cover.webp
publishedAt: 2022-04-25T03:19:50.207Z
updatedAt: 2026-10-23
metaTitle: "What Is CIAM? Customer Identity & Access Management"
metaDescription: "CIAM (customer identity and access management) explained: how it differs from workforce IAM, the features to look for, open-source options and where it runs."
category: industry
readTime: 8
featured: false
draft: false
faq:
  - q: "What is CIAM?"
    a: "CIAM stands for customer identity and access management. It is the system that lets the customers of your app or website sign up, log in, recover their accounts and control their data, and lets your team manage those accounts securely at scale."
  - q: "What is the difference between CIAM and IAM?"
    a: "Workforce IAM manages employees and contractors: a known, fairly small group whose accounts IT creates and controls. CIAM manages customers: a large, unpredictable group who create their own accounts, expect a fast branded login, and need to give and withdraw consent over their data."
  - q: "Is there an open-source CIAM?"
    a: "Yes. Keycloak and Authgear are both open source under the Apache-2.0 licence and can be self-hosted. Keycloak began as a general identity and access management server; Authgear is built for customer-facing apps and can also be run for you as a private cloud."
  - q: "Is Keycloak a CIAM?"
    a: "Keycloak describes itself as open-source identity and access management. It supports self-registration, social login and custom themes, so many teams use it for customer login. Getting a polished customer experience usually means building custom themes and extensions, and maintaining them through upgrades."
  - q: "Do I need CIAM for GDPR?"
    a: "GDPR and UK GDPR do not require a CIAM product. They require you to have a lawful basis for processing, keep personal data secure, record consent where you rely on it, and honour rights such as access and erasure. A CIAM system makes those tasks easier because consent, account data and deletion live in one place."
---

> **tl;dr** — CIAM (customer identity and access management) is the system that lets your customers sign up, log in and manage their own accounts in your apps, while giving you secure, consent-aware control over their identity data at scale.

If you build a product that people outside your company log in to, you already have a CIAM system. It might be a users table and a bcrypt library, a managed service, or an open-source server you run yourself. This guide explains what CIAM is, how it differs from the IAM your IT team uses, which features matter, and how to decide where it should run.

## What is CIAM?

Customer identity and access management covers everything between "a stranger arrives at your sign-up page" and "a known customer reaches the right data":

- **Registration**: customers create their own accounts.
- **Authentication**: proving it is really them, with a password, a passkey, a one-time code or a social account.
- **Authorisation**: deciding what a logged-in customer may see and do.
- **Account management**: profile changes, password resets, linked logins, deleting the account.
- **Consent and privacy**: recording what customers agreed to and letting them change their minds.

**An analogy.** Think of a hotel. Staff come in through a side door with ID badges that HR issued on their first day. That is workforce IAM. Guests arrive at the front desk at any hour, often without a booking, and expect to be checked in within a minute. Some come back every week, some once, and a few try to sneak in. That front desk is CIAM. Same building, very different job.

## CIAM vs IAM: what is the difference?

Workforce IAM (sometimes just "IAM") manages employees and contractors. CIAM manages customers. Both deal with logins, sessions and permissions, but the people on the other side behave differently, so the priorities change.

| | Workforce IAM | CIAM |
|---|---|---|
| **Who the users are** | Employees, contractors, partners | Customers and members of the public |
| **Scale** | Hundreds to tens of thousands, fairly stable | Thousands to millions, with spikes from launches and campaigns |
| **How accounts are created** | IT or HR creates them | Customers sign themselves up |
| **Social login** | Rare | Expected: Google, Apple, Facebook and others |
| **Branding** | Corporate login page is fine | Must look and feel like your product |
| **Consent and privacy** | Covered by employment contracts | Explicit consent, privacy settings, self-service deletion |
| **MFA style** | Can be mandatory and strict | Must be low-friction or customers drop off |
| **Who manages accounts** | IT administrators | Customers themselves, plus your support team |

The biggest shift is that every extra step in a customer login costs you sign-ups. An employee will put up with an awkward MFA prompt because they have to. A customer can simply leave.

### Where Keycloak fits

[Keycloak](https://www.keycloak.org/) is a good example of a tool that sits between the two worlds. Its own site calls it "Open Source Identity and Access Management". It is Apache-2.0 licensed, a Cloud Native Computing Foundation incubating project, and it is strong on workforce-style needs: LDAP and Active Directory federation, SAML and OpenID Connect identity brokering, and a central admin console.

Many teams also use Keycloak for customer login, and it has the building blocks: self-registration, social login set up from the admin console, and an account console where users update their profile, set up two-factor authentication and manage sessions. To make it feel like a customer product, teams usually:

- **Build custom themes.** Login pages are FreeMarker templates, so matching your brand means writing and maintaining your own theme.
- **Write extensions.** Custom behaviour goes in Service Provider Interface (SPI) providers, Java code packaged as JARs and deployed to the server.
- **Re-test after upgrades.** Custom themes and providers have to be checked against each new Keycloak release.

That is a reasonable trade if you have Java skills and want full control. If you would rather not maintain that layer, look at tools built for customer login from the start. Our [Authentik vs Keycloak comparison](/post/best-self-hosted-sso-platforms-compared-authgear-vs-keycloak-vs-authentik) goes through the differences in detail.

## Core CIAM features: a checklist

Use this list to judge any CIAM solution, whether you build, buy or self-host.

- **Self sign-up.** Customers register without waiting for anyone, with email or phone verification.
- **Social login.** "Continue with Google" or "Sign in with Apple" removes a password from the sign-up flow.
- **Passkeys and passwordless login.** Passkeys, magic links and one-time codes cut password resets and resist phishing.
- **MFA customers will accept.** Step-up checks only when risk is higher, such as a new device or a payment, instead of a code on every login.
- **Branded login pages.** Your fonts, colours and wording, on your own domain, so customers trust the page they are typing into.
- **Account linking and de-duplication.** The same person who signed up with email and later used Google should end up with one account, not two.
- **Consent and privacy controls.** Record what each customer agreed to, let them change it, and let them export or delete their data.
- **Bot protection.** CAPTCHA, rate limiting and brute-force protection to stop fake sign-ups, credential stuffing and SMS pumping fraud.
- **User management.** A console where your support team can find a customer, reset access, disable an account and see recent activity.
- **SSO across your apps.** One login for your website, mobile apps and any sub-brands.
- **APIs and SDKs.** Standard OAuth 2.0 and OpenID Connect, plus SDKs for web, iOS, Android and cross-platform frameworks such as React Native and Flutter.
- **Scale and reliability.** Login is on the critical path. If it is down, your product is down.

Audit logs belong on this list too. If you need to prove who did what and when, see our guide to [auditing and compliance in CIAM](/post/auditing-and-compliance-in-ciam-logs-events-controls).

## Where your CIAM runs

A CIAM system holds some of the most sensitive data you have: names, emails, phone numbers, password hashes and login history. So "where does it run, and who runs it?" matters as much as the feature list. There are three common models.

| | Managed SaaS | Self-hosted open source | Private cloud run for you |
|---|---|---|---|
| **Who operates it** | The vendor, on shared infrastructure | Your team | The vendor, on a dedicated deployment |
| **Where data lives** | The vendor's regions | Wherever you deploy it | A region you choose |
| **Effort for your team** | Lowest | Highest: upgrades, scaling, backups, on-call | Low |
| **Control** | Limited to the vendor's settings | Full | High, often with audit rights |

For UK and EU buyers this choice is often about more than convenience. Data residency answers "which country are the servers in?" Data sovereignty also asks "who operates the system, and which country's law applies to them?" A US provider's European data centre gives you residency, but the provider still answers to US law. Our [UK data sovereignty guide](/post/uk-data-sovereignty-login-identity) covers UK GDPR, the US CLOUD Act and what to ask vendors, and our guide to [sovereign cloud and the CLOUD Act](/post/sovereign-cloud-cloud-act-login-data) explains what "sovereign" should mean.

If a regulator, a large customer or a public-sector tender asks where your user data lives, self-hosting or a private cloud in your region gives you a clear answer.

## How to choose a CIAM solution

A short checklist for developers, CTOs and IT leads:

1. **Start with your users.** Consumers, business customers, or both? B2B products may need enterprise SSO (SAML, Microsoft Entra ID) alongside self sign-up.
2. **Decide where data must live.** Write down the countries and the reasons: regulation, contracts, procurement rules. This narrows the hosting model fast.
3. **Check the login experience yourself.** Sign up, log in with a passkey, reset a password and delete the account on a phone. Count the steps.
4. **Check how far branding goes.** Colours and a logo, or full control of the HTML and CSS?
5. **Look at the exit route.** Can you export users with their password hashes? Is the code open source, so you can keep running it if the vendor changes course?
6. **Count the running cost.** For self-hosting, include the engineering time for upgrades, monitoring and security patches, not only server bills.
7. **Price it at your growth target.** Many CIAM plans charge per monthly active user. Model the cost at ten times your current users.

### Open-source CIAM options

If open source matters to you, the main self-hostable choices are Keycloak, Authentik, Ory, Zitadel and Authgear. They differ in language, licence, how much of the customer experience comes ready-made and whether a managed option exists. Our comparison of [open source identity providers](/post/best-open-source-identity-providers) goes through each one.

[Authgear](/solutions/data-sovereignty) is an open-source CIAM, Apache-2.0 licensed, built for customer-facing web and mobile apps. You can self-host it with every feature, or have us run a private cloud for you in the region you choose, including the UK and the EU. Login pages are fully customisable in HTML and CSS on every plan, including self-hosted, and you can import existing users with their bcrypt password hashes. If you are moving off Keycloak, see the [Keycloak alternative](/compare/keycloak-alternative) page.

## Frequently Asked Questions

### What is CIAM?

CIAM stands for customer identity and access management. It is the system that lets the customers of your app or website sign up, log in, recover their accounts and control their data, and lets your team manage those accounts securely at scale.

### What is the difference between CIAM and IAM?

Workforce IAM manages employees and contractors: a known, fairly small group whose accounts IT creates and controls. CIAM manages customers: a large, unpredictable group who create their own accounts, expect a fast branded login, and need to give and withdraw consent over their data.

### Is there an open-source CIAM?

Yes. Keycloak and Authgear are both open source under the Apache-2.0 licence and can be self-hosted. Keycloak began as a general identity and access management server; Authgear is built for customer-facing apps and can also be run for you as a private cloud.

### Is Keycloak a CIAM?

Keycloak describes itself as open-source identity and access management. It supports self-registration, social login and custom themes, so many teams use it for customer login. Getting a polished customer experience usually means building custom themes and extensions, and maintaining them through upgrades.

### Do I need CIAM for GDPR?

GDPR and UK GDPR do not require a CIAM product. They require you to have a lawful basis for processing, keep personal data secure, record consent where you rely on it, and honour rights such as access and erasure. A CIAM system makes those tasks easier because consent, account data and deletion live in one place.

---

**Related reading:** [UK data sovereignty for login and identity data](/post/uk-data-sovereignty-login-identity) · [Authentik vs Keycloak](/post/best-self-hosted-sso-platforms-compared-authgear-vs-keycloak-vs-authentik) · [Auditing and compliance in CIAM](/post/auditing-and-compliance-in-ciam-logs-events-controls)

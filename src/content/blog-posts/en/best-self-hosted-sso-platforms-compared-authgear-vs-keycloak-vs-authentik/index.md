---
title: "Authentik vs Keycloak (and Authgear): Self-Hosted SSO Compared"
excerpt: "Authentik or Keycloak? A fair, up-to-date comparison of the two most popular self-hosted identity providers, with Authgear as a third option, plus what each means for data sovereignty."
coverImage: ./cover.webp
category: industry
featured: false
readTime: 10
metaTitle: "Authentik vs Keycloak vs Authgear: Self-Hosted SSO (2026)"
metaDescription: "Authentik vs Keycloak in 2026: licences, passkeys, MFA, customisation, support and data sovereignty compared, with Authgear as a third self-hosted SSO option."
publishedAt: 2026-02-11T08:47:19.221Z
updatedAt: 2026-09-25T00:00:00.000Z
draft: false
faq:
  - q: "Is Authentik better than Keycloak?"
    a: "Neither is better across the board. Authentik is usually quicker to set up and easier to shape with its visual flow editor, and it can act as an LDAP, RADIUS or proxy provider for older apps. Keycloak is the more mature choice for large enterprises, with deep LDAP and Active Directory federation, identity brokering and a CNCF-governed community."
  - q: "Is Keycloak free?"
    a: "Yes. Keycloak is open source under the Apache-2.0 licence and free to run. Paid, supported builds come from Red Hat as part of its subscriptions, and several third parties sell hosted Keycloak."
  - q: "Is Authentik free?"
    a: "The core of Authentik is open source under the MIT licence and free to self-host. Some features, such as the Google Workspace and Microsoft Entra ID providers and privileged access management, need an Enterprise licence, which is priced per user."
  - q: "What is a lightweight alternative to Keycloak?"
    a: "Authentik is the alternative people mention most, and since version 2025.10 it needs only PostgreSQL, with no Redis. Authgear is another option if you want passkeys, magic links and SMS or WhatsApp OTP built in, and the choice between self-hosting and a managed service."
  - q: "Does Keycloak support passkeys?"
    a: "Yes. Keycloak supports passkeys and WebAuthn, and since version 26.3 passkeys can be switched on in the default login forms."
  - q: "Can I move from Keycloak to Authgear without resetting passwords?"
    a: "Yes. You can import your Keycloak users with their passwords."
  - q: "Is self-hosted SSO better for GDPR and data sovereignty?"
    a: "Self-hosting lets you decide where user data is stored and who can reach it, which makes GDPR and data residency questions easier to answer. It doesn't make you compliant on its own. You still need the right agreements, security controls and processes."
---

Authentik and Keycloak are the two open-source identity providers most teams shortlist when they want single sign-on (SSO) on their own servers. Both are good. They suit different teams.

This guide gives you the short answer first, then the detail: licences, login methods, customisation, support, and what each means for data sovereignty. We also cover Authgear, the open-source identity platform we build, as a third option. We've tried to be fair to all three and to say where each one wins.

## Authentik vs Keycloak: the short answer

- **Choose Keycloak** if you're a larger organisation with existing LDAP or Active Directory, complex federation needs, and a team that's comfortable with Java.
- **Choose Authentik** if you want a quicker start, a visual flow editor, and one tool that can also act as an LDAP, RADIUS or proxy provider for older internal apps.
- **Consider Authgear** if you're building customer-facing or frontline apps and want passkeys, magic links and SMS or WhatsApp OTP built in, with the choice of self-hosting or having us run it.

| | Keycloak | Authentik | Authgear |
|---|---|---|---|
| **Licence** | Apache-2.0 | MIT core; enterprise features under a separate licence | Apache-2.0 |
| **Current release** | 26.x | 2026.8 | Rolling releases |
| **Written in** | Java (Quarkus) | Python, with Go outposts | Go |
| **Protocols** | OIDC, OAuth 2.0, SAML 2.0 | OIDC, OAuth 2.0, SAML 2.0, plus LDAP, RADIUS, SCIM, Kerberos and proxy providers | OIDC, OAuth 2.0, SAML 2.0 |
| **Passkeys** | Yes (in default login forms since 26.3) | Yes (WebAuthn / FIDO2 stage) | Yes |
| **SMS OTP** | Community extensions | Built in (Twilio or a generic HTTP provider) | Built in |
| **WhatsApp OTP** | No | No | Built in |
| **Magic links** | Community extensions | Via a passwordless email-link flow | Built in |
| **LDAP / Active Directory** | Built-in federation | Built-in sources, and can act as an LDAP server | Supported |
| **Login page customisation** | FreeMarker themes, packaged as JARs | Flows, stages and CSS | Branding editor plus full CSS and HTML |
| **Paid support** | Red Hat build of Keycloak | Enterprise, from $5 per internal user a month | Enterprise |
| **Managed service from the maker** | No (third parties only) | No | Yes, plus private cloud |
| **Company behind it** | CNCF project, led by Red Hat (US) | Authentik Security Inc. (US) | Skymakers Digital Limited (UK) |

Prices and features checked against each project's own docs in September 2026.

## Why teams self-host their identity provider

Your identity provider holds your users' email addresses, phone numbers, password hashes and login history. Self-hosting it means:

- **You choose where that data sits.** It lives in your data centre or your cloud account, in the country you pick.
- **You choose whose law applies.** If no outside vendor holds the data, no outside vendor can be asked to hand it over.
- **Costs follow your infrastructure, not your user count.** There's no per-user bill from a SaaS provider (though some paid editions still price per user).
- **You control upgrades.** You decide when to patch and when to move to a new version.

The trade-off is that you run it. Patching, backups, scaling and on-call are your job.

## Data sovereignty: how the three compare

Self-hosting any of these three puts user data wherever you run it. The differences show up when you want help: a supported build, a hosted service, or someone to call at 3am.

- **Keycloak.** The open-source project doesn't offer a managed service. Supported builds come from Red Hat, a US company owned by IBM, as part of its subscriptions, and you still run them yourself. If you want Keycloak hosted, you use a third party, and several are based in Europe.
- **Authentik.** Authentik Security Inc. is a US company. It doesn't currently offer a hosted version, so you always run Authentik yourself. The Enterprise licence adds features and support, not hosting.
- **Authgear.** You can self-host it, use Authgear Cloud, or have us run a private cloud for you in any region you choose. Authgear is built by Skymakers Digital Limited, registered in the UK. Authgear Cloud runs in the US and Hong Kong today, and an EU region is coming soon.

For a longer look at where identity data lives and whose law reaches it, see [data sovereignty for identity](/solutions/data-sovereignty).

## Keycloak

Keycloak is the most established open-source identity and access management server. It became a CNCF Incubating project in 2023, and Red Hat remains its main contributor.

### Where Keycloak wins

- **Enterprise federation.** Built-in LDAP, Active Directory and Kerberos user federation, plus identity brokering to other SAML and OIDC providers.
- **Maturity.** Years of production use at large organisations, lots of documentation, and a big community.
- **Multi-tenancy.** Realms keep tenants apart, and Organisations add B2B tenancy within a realm.
- **Modern login where it counts.** Passkeys are supported and can be switched on in the default login forms since 26.3, alongside TOTP and recovery codes.
- **Vendor-neutral governance** under the CNCF, with an Apache-2.0 licence.

### What to plan for

- **Login pages are FreeMarker themes.** Production themes are packaged as JARs, and the upgrade guide tells you to re-test custom themes after each upgrade.
- **Some login methods need extensions.** SMS OTP, email OTP and magic links aren't built in. Community extensions fill the gap, but you maintain them.
- **Custom logic means Java.** Service Provider Interfaces (SPIs) are powerful, but they're Java code you build, test and redeploy.
- **No official mobile SDK.** Keycloak recommends the AppAuth libraries for iOS and Android.

### Best for

Large organisations with existing directories, complex federation requirements, and a platform team that can own a Java service.

## Authentik

Authentik is a newer open-source identity provider built around flows: you chain stages (identification, password, MFA, consent and so on) in a visual editor to shape each login journey.

### Where Authentik wins

- **Quick to start.** Docker Compose or Helm, and since 2025.10 PostgreSQL is the only datastore it needs (Redis is gone).
- **Flows you can see.** The flow and stage model makes it easy to build and follow custom login and enrolment journeys.
- **One tool for many protocols.** Besides OIDC and SAML, Authentik can act as an LDAP server, a RADIUS server, a SCIM provider, and a proxy that adds SSO to apps that have none.
- **MFA built in.** Passkeys (WebAuthn), TOTP, static codes, Duo, SMS (Twilio or a generic HTTP provider) and email codes are all stages you can drop in.
- **Active development.** Regular releases; 2026.8 added privileged access management, agent accounts, account switching and scheduled offboarding.

### What to plan for

- **Some features need Enterprise.** Google Workspace and Microsoft Entra ID providers, mTLS, device trust, privileged access management and enhanced audit logging need a paid licence ($5 per internal user a month, $0.02 per external user a month).
- **Smaller ecosystem than Keycloak.** Fewer large-enterprise case studies and third-party guides.
- **No WhatsApp OTP.**
- **No hosted option from the vendor**, so you always run it.

### Best for

Small and mid-sized teams, internal tools and homelabs through to company-wide SSO, especially where older apps need LDAP, RADIUS or proxy-based login.

## Authgear

Authgear is an open-source identity platform for customer-facing and frontline apps. It's licensed under Apache-2.0, the same licence as Keycloak.

### Where Authgear wins

- **Modern login built in.** Passkeys, biometric login in native apps through the iOS and Android SDKs, magic links, SMS OTP and WhatsApp OTP. You turn them on in the portal rather than adding extensions.
- **Login pages without templates.** A branding editor for logo, colours and themes, plus full CSS and HTML customisation on every plan, including self-hosted.
- **The same product wherever it runs.** The self-hosted version has every Authgear Cloud feature. Run it yourself with our Helm chart, use Authgear Cloud, or have us run a private cloud for you in any region.
- **LDAP and Active Directory** are supported for teams with existing directories.
- **Security included.** MFA, account lockout, bot protection and rate limiting come as standard.
- **Support when you need it.** Paid support for self-hosted Authgear is part of Enterprise.

### What to plan for

- **Self-hosters bring their own messaging providers.** Magic links, SMS OTP and WhatsApp OTP work on self-hosted Authgear once you connect your own email, SMS or WhatsApp provider.
- **Younger than Keycloak** and with a smaller community than either Keycloak or Authentik.
- **Built for customer and frontline login first.** For deep workforce federation across many enterprise directories, Keycloak has more history.

### Best for

SaaS and consumer apps, frontline staff without corporate email, and teams that want modern login methods without maintaining themes and extensions.

## Recommendations by use case

- **Enterprise with existing AD/LDAP and complex federation:** Keycloak
- **Adding SSO to older apps through LDAP, RADIUS or a proxy:** Authentik
- **Visual, flow-based login journeys:** Authentik
- **Customer-facing apps with passkeys, magic links and WhatsApp OTP:** Authgear
- **Frontline workforce without corporate email:** Authgear
- **Self-hosted today, managed later (or the reverse):** Authgear
- **Vendor-neutral, foundation-governed project:** Keycloak

## Moving between them

All three speak OIDC and SAML, so your applications mostly need new client IDs, redirect URIs and issuer settings rather than new code.

User data is the harder part. You export users, map their attributes, and deal with password hashes. Keycloak uses Argon2 by default since version 25, so check that your new provider can import those hashes, or some users will have to reset their passwords.

If you're moving from Keycloak to Authgear, you can import your Keycloak users with their passwords. See our [Keycloak alternative](/compare/keycloak-alternative) page for how the two compare side by side.

## Bottom line

- **Keycloak** is the safe, mature choice for large enterprises with directories to federate and a team to run it.
- **Authentik** is the friendlier start for small and mid-sized teams, and a good all-rounder for older internal apps.
- **Authgear** fits customer-facing and frontline apps that need modern login methods, with the freedom to self-host or have it run for you.

Want to see how Authgear would fit your setup? [Schedule a demo](/schedule-demo).

## Further reading

- [How to implement passkeys: a developer guide](/post/how-to-implement-passkeys-developer-guide)
- [OIDC vs SAML](/post/oidc-vs-saml)
- [UK data sovereignty for login and identity](/post/uk-data-sovereignty-login-identity)

## Frequently Asked Questions

### Is Authentik better than Keycloak?

Neither is better across the board. Authentik is usually quicker to set up and easier to shape with its visual flow editor, and it can act as an LDAP, RADIUS or proxy provider for older apps. Keycloak is the more mature choice for large enterprises, with deep LDAP and Active Directory federation, identity brokering and a CNCF-governed community.

### Is Keycloak free?

Yes. Keycloak is open source under the Apache-2.0 licence and free to run. Paid, supported builds come from Red Hat as part of its subscriptions, and several third parties sell hosted Keycloak.

### Is Authentik free?

The core of Authentik is open source under the MIT licence and free to self-host. Some features, such as the Google Workspace and Microsoft Entra ID providers and privileged access management, need an Enterprise licence, which is priced per user.

### What is a lightweight alternative to Keycloak?

Authentik is the alternative people mention most, and since version 2025.10 it needs only PostgreSQL, with no Redis. Authgear is another option if you want passkeys, magic links and SMS or WhatsApp OTP built in, and the choice between self-hosting and a managed service.

### Does Keycloak support passkeys?

Yes. Keycloak supports passkeys and WebAuthn, and since version 26.3 passkeys can be switched on in the default login forms.

### Can I move from Keycloak to Authgear without resetting passwords?

Yes. You can import your Keycloak users with their passwords.

### Is self-hosted SSO better for GDPR and data sovereignty?

Self-hosting lets you decide where user data is stored and who can reach it, which makes GDPR and data residency questions easier to answer. It doesn't make you compliant on its own. You still need the right agreements, security controls and processes.

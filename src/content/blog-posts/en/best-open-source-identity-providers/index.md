---
title: "Best Open Source Identity Providers (CIAM and SSO) in 2026"
excerpt: "A fair comparison of eight open source identity providers for single sign-on and customer login in 2026: Keycloak, Authgear, Authentik, Zitadel, Ory, Authelia, SuperTokens and Logto. Licences, protocols, passkeys, hosting and who each one suits."
coverImage: ./cover.webp
publishedAt: 2026-10-23
metaTitle: "Best Open Source Identity Providers for SSO & CIAM (2026)"
metaDescription: "Compare 8 open source identity providers for SSO and CIAM: Keycloak, Authgear, Authentik, Zitadel, Ory and more. Licences, passkeys, SAML and self-hosting."
category: industry
readTime: 13
draft: false
faq:
  - q: "What is the best open source identity provider?"
    a: "There is no single best one. Keycloak is the most mature choice for workforce SSO and enterprise federation. Authentik is easier to start with for internal apps. For customer-facing login, Authgear, Zitadel, Logto, Ory and SuperTokens are stronger fits, depending on how much of the login UI you want to build yourself and which licence you can accept."
  - q: "Is Keycloak still the best open source IAM?"
    a: "It is still the most widely used and the most complete for enterprise federation, with LDAP, Active Directory, Kerberos, identity brokering and, since version 26.8, a supported SCIM API. The trade-offs are a Java codebase, FreeMarker login themes you re-test at each upgrade, and no managed service from the project itself."
  - q: "What is a lightweight alternative to Keycloak?"
    a: "Authelia is the lightest: a single Go service that adds login and two-factor authentication in front of your reverse proxy, with users in LDAP or a YAML file. Authentik is lighter to run than it used to be, since it now needs only PostgreSQL. Authgear, Zitadel and Logto are lighter options when the goal is customer login rather than workforce SSO."
  - q: "Is there a free SSO provider?"
    a: "Yes. All eight providers in this list can be self-hosted for free. Some keep certain features in a paid edition: Authentik Enterprise, the Ory Enterprise License, SuperTokens paid add-ons such as MFA, and Logto's paid self-hosted plans. Keycloak, Authelia and Authgear have no paid feature tier in the open source code."
  - q: "Can I self-host SSO?"
    a: "Yes. Every provider here runs on your own servers, usually with Docker or Kubernetes and a PostgreSQL database. Self-hosting gives you control over where user data lives, but you take on patching, backups, scaling and on-call."
  - q: "What is the difference between open source CIAM and IAM?"
    a: "IAM, or workforce identity, manages employees signing in to internal tools, usually backed by a corporate directory. CIAM, customer identity and access management, manages customers signing up to your own product, so self-service registration, social login, passkeys, branding and scale matter more. Some open source tools cover both; most lean one way."
---

> **tl;dr:** Keycloak is still the default for workforce SSO. For customer login (CIAM), Authgear, Zitadel and Logto give you a ready-made login UI, while Ory and SuperTokens suit teams that build their own. Check the licence: they range from MIT and Apache-2.0 to MPL-2.0 and AGPL-3.0.

An open source identity provider handles sign-up, login, single sign-on (SSO) and multi-factor authentication (MFA) for your apps, and you can run it on your own servers. Search for one and you'll land on Keycloak's homepage. Keycloak is a good answer, but it isn't the only one, and for many teams it isn't the best one.

This guide compares eight of them as they stand in October 2026. We build Authgear, one of the eight, so we have tried to be fair and to say where each one wins.

## Which open source identity provider should you pick?

- **Keycloak** if you need workforce SSO with LDAP, Active Directory or Kerberos, and you have a team that is comfortable running a Java service.
- **Authgear** if you're building customer-facing or frontline apps and want passkeys, magic links and SMS or WhatsApp OTP built in, with the option of having it run for you.
- **Authentik** if you want SSO for internal tools, including older apps that need LDAP, RADIUS or a proxy in front.
- **Zitadel** if you're building B2B SaaS with many customer organisations and can work with AGPL-3.0.
- **Ory** if you want a headless, API-first identity stack and plan to build your own login screens.
- **Authelia** if you want a small, fast login portal in front of a reverse proxy for self-hosted services.
- **SuperTokens** if you want auth embedded in your own app code, with SDKs for your frontend and backend.
- **Logto** if you want a modern TypeScript stack with pre-built sign-in, organisations and RBAC.

## Open source identity providers compared

<div class="ag-table-wrap">
  <table class="ag-table">
    <thead>
      <tr><th></th><th>Licence</th><th>Stack</th><th>OIDC provider</th><th>SAML</th><th>Passkeys</th><th>Vendor-managed cloud</th><th>Best for</th></tr>
    </thead>
    <tbody>
      <tr><td><strong>Keycloak</strong></td><td>Apache-2.0</td><td>Java</td><td>Yes</td><td>Yes</td><td>Yes</td><td>No (third parties only)</td><td>Workforce SSO, enterprise federation</td></tr>
      <tr><td><strong>Authgear</strong></td><td>Apache-2.0</td><td>Go</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes, plus private cloud</td><td>Customer and frontline login</td></tr>
      <tr><td><strong>Authentik</strong></td><td>MIT core, enterprise features under a separate licence</td><td>Python, Go</td><td>Yes</td><td>Yes</td><td>Yes</td><td>No</td><td>Internal tools, older apps, homelabs</td></tr>
      <tr><td><strong>Zitadel</strong></td><td>AGPL-3.0 (some parts Apache-2.0 or MIT)</td><td>Go, Next.js login</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Multi-tenant B2B SaaS</td></tr>
      <tr><td><strong>Ory</strong> (Kratos, Hydra)</td><td>Apache-2.0, with enterprise features under the Ory Enterprise License</td><td>Go</td><td>Yes (Hydra)</td><td>Enterprise licence or Ory Network</td><td>Yes</td><td>Yes (Ory Network)</td><td>Headless, API-first identity</td></tr>
      <tr><td><strong>Authelia</strong></td><td>Apache-2.0</td><td>Go</td><td>Yes (beta)</td><td>No (planned)</td><td>Yes</td><td>No</td><td>Reverse-proxy login for self-hosted services</td></tr>
      <tr><td><strong>SuperTokens</strong></td><td>Apache-2.0 core, <code>ee/</code> folder under a separate licence</td><td>Java core, Node.js / Python / Go SDKs</td><td>Managed service only</td><td>As a client, via multi-tenancy (paid)</td><td>Yes</td><td>Yes</td><td>Auth embedded in your own app</td></tr>
      <tr><td><strong>Logto</strong></td><td>MPL-2.0</td><td>TypeScript (Node.js)</td><td>Yes</td><td>Yes (3 SAML apps in the free edition)</td><td>Yes</td><td>Yes</td><td>Developer-friendly CIAM for SaaS</td></tr>
    </tbody>
  </table>
</div>

Licences and features checked against each project's GitHub repository and official docs in October 2026. They change often, so check current docs before you decide.

## How we compared them

We looked at what decides whether a tool fits, not at feature counts:

- **Licence.** What you may do with the code, and whether some features sit behind a paid licence.
- **Stack.** The language your team will read when something breaks, and what it needs to run.
- **Protocols.** OpenID Connect (OIDC) and SAML for SSO, and SCIM for user provisioning.
- **Login UI.** Whether you get ready-made login pages or build your own.
- **Login methods.** Passkeys, MFA, magic links and one-time codes.
- **Hosting.** Self-host only, or a managed option from the people who build it.
- **Fit.** Workforce SSO (employees and internal apps) or customer identity (CIAM).

## Keycloak

The most established open source identity and access management server. A CNCF project, with Red Hat as its main contributor.

- **Licence:** Apache-2.0.
- **Stack:** Java (Quarkus). Current release 26.8.
- **Protocols:** OIDC, OAuth 2.0 and SAML 2.0. The SCIM API moved to supported in 26.8 (October 2026).
- **Login UI:** FreeMarker theme templates, packaged as JARs for production.
- **Passkeys and MFA:** Passkeys can be switched on in the default login forms since 26.3, alongside TOTP and recovery codes.
- **Hosting:** Self-host only. Supported builds come from Red Hat; hosted Keycloak comes from third parties.

### Where it wins

- Deep LDAP, Active Directory and Kerberos federation, plus identity brokering to other SAML and OIDC providers.
- Realms for tenant isolation and Organisations for B2B within a realm.
- The biggest community, the most documentation, and vendor-neutral governance.

### Watch-outs

- Custom themes need re-testing after each upgrade, according to the upgrade guide.
- SMS OTP and magic links need community extensions.
- Custom logic means Java Service Provider Interfaces (SPIs) you build and redeploy.

**Best for:** larger organisations with directories to federate and a platform team that can own a Java service.

## Authgear

An open source identity platform for customer-facing and frontline apps. We build it.

- **Licence:** Apache-2.0, the same as Keycloak.
- **Stack:** Go, with PostgreSQL and Redis.
- **Protocols:** OIDC, OAuth 2.0 and SAML 2.0. LDAP and Active Directory are supported.
- **Login UI:** Ready-made login pages with full CSS and HTML customisation on every plan, including self-hosted.
- **Passkeys and MFA:** Passkeys, biometric login in native apps, magic links, SMS OTP and WhatsApp OTP, plus MFA.
- **Hosting:** Self-host with the Helm chart, use Authgear Cloud, or have us run a private cloud for you in the region you choose, including the UK and the EU.

### Where it wins

- Modern login methods are built in, not added as extensions.
- The self-hosted version has every Authgear Cloud feature, so you give up nothing by running it yourself.
- Keycloak users can be imported with their passwords.
- Paid support for self-hosted deployments is available as part of Enterprise.

### Watch-outs

- Self-hosters connect their own email, SMS and WhatsApp providers for magic links and one-time codes.
- Younger, with a smaller community than Keycloak or Authentik.
- Built for customer and frontline login first. For deep workforce federation across many enterprise directories, Keycloak has more history.

**Best for:** SaaS and consumer apps, frontline staff without corporate email, and teams that want passwordless login without maintaining themes and extensions.

## Authentik

A self-hosted identity provider built around flows: you chain stages such as identification, password and MFA in a visual editor.

- **Licence:** MIT for the core. Code under `authentik/enterprise/` uses a separate licence.
- **Stack:** Python (Django) with Go outposts. Needs only PostgreSQL since 2025.10. Current release 2026.8.
- **Protocols:** OIDC, OAuth 2.0 and SAML 2.0, plus LDAP, RADIUS, SCIM and proxy providers.
- **Login UI:** Flows and stages, with CSS customisation.
- **Passkeys and MFA:** WebAuthn passkeys, TOTP, static codes, Duo, SMS and email codes.
- **Hosting:** Self-host only; there is no hosted version.

### Where it wins

- Quick to start with Docker Compose or Helm.
- One tool covers OIDC, SAML, LDAP, RADIUS and a proxy for apps with no SSO of their own.
- Visual flows make login journeys easy to follow.

### Watch-outs

- Google Workspace and Microsoft Entra ID integrations, mTLS, privileged access management and enhanced audit logging need Enterprise ($5 per internal user a month, $0.02 per external user a month).
- Smaller enterprise ecosystem than Keycloak.

**Best for:** small and mid-sized teams, internal tools and homelabs, and company-wide SSO where older apps need LDAP, RADIUS or a proxy.

## Zitadel

An identity platform built for multi-tenant SaaS, with an event-sourced core.

- **Licence:** AGPL-3.0 since v3 in 2025, when it moved from Apache-2.0. The `proto/` folder and docs are Apache-2.0; the login app and client packages are MIT. A commercial licence is available.
- **Stack:** Go and PostgreSQL. The new Login V2 is a Next.js app. Current release 4.20.
- **Protocols:** OpenID Certified OIDC, SAML 2.0 and a SCIM 2.0 server.
- **Login UI:** Hosted login pages, with Login V2 as the customisable option.
- **Passkeys and MFA:** Passkeys (FIDO2 / WebAuthn), TOTP, U2F, and email and SMS OTP.
- **Hosting:** Self-host, or Zitadel Cloud in US, EU, Australian and Swiss regions. Both run the same codebase.

### Where it wins

- Organisations, projects and roles fit B2B SaaS that signs up many customer companies.
- A managed cloud with regional choice, plus self-hosting from one codebase.

### Watch-outs

- AGPL-3.0 can create obligations if you modify Zitadel and offer it over a network. Zitadel itself recommends legal advice.
- Smaller community than Keycloak.

**Best for:** B2B SaaS teams that need multi-tenancy and are comfortable with AGPL or a commercial licence.

## Ory (Kratos and Hydra)

A modular, API-first identity stack. Kratos handles identities and login flows; Hydra is the OAuth 2.0 and OIDC server. Keto (permissions) and Oathkeeper (proxy) complete the set.

- **Licence:** Apache-2.0. Some features ship only under the Ory Enterprise License (OEL).
- **Stack:** Go, with PostgreSQL, MySQL or CockroachDB.
- **Protocols:** OAuth 2.0 and OIDC through Hydra. SAML, SCIM and organisation login are OEL features, or available on Ory Network.
- **Login UI:** Headless. You build the screens, or start from Ory's reference UI and components.
- **Passkeys and MFA:** Passkeys, TOTP, WebAuthn and recovery codes.
- **Hosting:** Self-host, or Ory Network (managed).

### Where it wins

- Each piece does one job and scales independently.
- Complete control over the login experience.
- Hydra can sit in front of an existing user database.

### Watch-outs

- You run and connect several services, and you build the UI.
- The Kratos README describes the open source edition as fit for experiments and "unimportant workloads without SLAs". For business-critical use, Ory points you to the OEL, which adds CVE patches with SLAs.

**Best for:** engineering-led teams with microservices who want full control and will build their own login screens.

## Authelia

A login portal and two-factor gate that sits beside your reverse proxy.

- **Licence:** Apache-2.0.
- **Stack:** Go. Current release 4.39.
- **Protocols:** OIDC provider, OpenID Certified, though still marked beta on its roadmap. SAML is planned, not available.
- **Login UI:** Its own portal, used through forward-auth with Traefik, Caddy, NGINX, HAProxy, Envoy and others.
- **Passkeys and MFA:** TOTP, WebAuthn security keys, Duo push, and passkey login since 4.39.
- **Hosting:** Self-host only.

### Where it wins

- Small and fast, and easy to put in front of many self-hosted services.
- Fine-grained access rules by domain, user, group and path.
- A security-focused project with an OpenSSF Best Practices gold badge.

### Watch-outs

- Users live in LDAP or a YAML file. There is no built-in self-registration, so it isn't a CIAM tool.
- No SAML yet.

**Best for:** homelabs and small teams protecting self-hosted web services behind a reverse proxy.

## SuperTokens

An auth framework you embed in your app: a core service plus backend and frontend SDKs.

- **Licence:** Apache-2.0, except the `ee/` folder, which has its own licence.
- **Stack:** Java core, with backend SDKs for Node.js, Python and Go and frontend SDKs for web and mobile.
- **Protocols:** Login inside your own app rather than a central SSO server. SAML login for your customers' identity providers works through multi-tenancy (paid). An OAuth 2.0 provider for many apps, "Unified Login", is available only on the managed service.
- **Login UI:** Pre-built UI or your own, with overrides on both.
- **Passkeys and MFA:** A WebAuthn passkeys recipe. MFA is a paid add-on ($0.01 per MAU, minimum $100 a month).
- **Hosting:** Self-host, or the managed service ($0.02 per MAU after 5,000 free).

### Where it wins

- Auth lives in your codebase, so it feels like part of your app.
- Email and password, social login, magic links and SMS or email OTP are free when self-hosted.

### Watch-outs

- Paid add-ons such as MFA and multi-tenancy are priced even when you self-host.
- Not designed as a company-wide SSO server.

**Best for:** product teams building a single app who want auth in their own code.

## Logto

A developer-focused identity platform for SaaS and AI apps.

- **Licence:** MPL-2.0.
- **Stack:** TypeScript on Node.js, with PostgreSQL. Current release 1.45.
- **Protocols:** OIDC, OAuth 2.1 and SAML. The free self-hosted edition includes three SAML applications.
- **Login UI:** Pre-built sign-in experience with customisable branding and SDKs for 30+ frameworks. "Bring your UI" is a paid self-hosted feature.
- **Passkeys and MFA:** Passkeys for sign-in and as a second factor, plus TOTP.
- **Hosting:** Self-host, or Logto Cloud in US, EU and Australian regions.

### Where it wins

- Quick to start, with a clean admin console.
- Organisations, RBAC, enterprise SSO and just-in-time provisioning included.

### Watch-outs

- Paid self-hosted plans (from $249 a month) add more SAML apps, IdP-initiated SSO, removal of Logto branding and your own UI.
- Younger project with a smaller enterprise track record.

**Best for:** SaaS teams on a TypeScript stack who want CIAM with organisations out of the box.

## Self-hosting in the UK or EU

Many teams in the UK, Ireland, the Netherlands and the Nordics choose open source because they want user data to stay in the country. Self-hosting helps, but be clear about what it does and doesn't do.

### What self-hosting solves

- **Location.** User data sits on servers you choose, in the country you choose.
- **Access.** No identity vendor holds a copy of your users' data.
- **Cost.** You pay for infrastructure, not per user (unless you buy a paid edition).

### What it doesn't solve

- **Your hosting provider's jurisdiction.** A UK or EU region run by a US-owned cloud keeps data local, but the provider remains under US law, including the CLOUD Act. Our guide to [sovereign cloud and the CLOUD Act](/post/sovereign-cloud-cloud-act-login-data) explains what that means for login data, and our [UK data sovereignty guide](/post/uk-data-sovereignty-login-identity) explains why residency and sovereignty differ.
- **Compliance.** Self-hosting doesn't make you compliant on its own. You still need agreements, security controls and processes.
- **Operations.** Patching, backups, high availability and incident response are yours.
- **Licence terms.** AGPL-3.0, as Zitadel uses, has obligations that Apache-2.0 and MIT don't.

If you want UK or EU hosting without running it yourself, we can run Authgear for you as a private cloud in a UK or EU region, or you can self-host it on your own infrastructure.

## How to choose

Work through these questions in order.

- **Workforce SSO or customer login?** Employees signing in to internal tools point to an open source SSO server such as Keycloak, Authentik or Authelia. Customers signing up to your product point to Authgear, Zitadel, Logto, Ory or SuperTokens. See [what CIAM is](/post/what-is-customer-identity-and-access-management-ciam) if the difference is new to you.
- **Do you need SAML?** If enterprise customers will ask for it, rule out Authelia and check whether SAML sits in a paid edition (Ory, SuperTokens, Logto).
- **What does your team know?** Pick a stack you can debug: Java (Keycloak), Python (Authentik), Go (Authgear, Zitadel, Ory, Authelia) or TypeScript (Logto).
- **Who builds the login UI?** Ready-made pages save weeks. Headless tools (Ory, SuperTokens with a custom UI) give control at the cost of building it.
- **How will you upgrade?** Ask how custom themes, extensions and database migrations behave across versions. This is where self-hosting costs most.
- **Which licence can you accept?** Check with whoever signs off on open source use, especially for AGPL-3.0.
- **Who do you call at 3am?** Check whether paid support exists for self-hosted deployments, and whether the maker offers a managed option if running it becomes a burden.

## Further reading

- [Authentik vs Keycloak: self-hosted SSO compared](/post/best-self-hosted-sso-platforms-compared-authgear-vs-keycloak-vs-authentik)
- [Authgear as a Keycloak alternative](/compare/keycloak-alternative)
- [Top open source Auth0 alternatives](/post/top-open-source-auth0-alternatives)

## Frequently Asked Questions

### What is the best open source identity provider?

There is no single best one. Keycloak is the most mature choice for workforce SSO and enterprise federation. Authentik is easier to start with for internal apps. For customer-facing login, Authgear, Zitadel, Logto, Ory and SuperTokens are stronger fits, depending on how much of the login UI you want to build yourself and which licence you can accept.

### Is Keycloak still the best open source IAM?

It is still the most widely used and the most complete for enterprise federation, with LDAP, Active Directory, Kerberos, identity brokering and, since version 26.8, a supported SCIM API. The trade-offs are a Java codebase, FreeMarker login themes you re-test at each upgrade, and no managed service from the project itself.

### What is a lightweight alternative to Keycloak?

Authelia is the lightest: a single Go service that adds login and two-factor authentication in front of your reverse proxy, with users in LDAP or a YAML file. Authentik is lighter to run than it used to be, since it now needs only PostgreSQL. Authgear, Zitadel and Logto are lighter options when the goal is customer login rather than workforce SSO.

### Is there a free SSO provider?

Yes. All eight providers in this list can be self-hosted for free. Some keep certain features in a paid edition: Authentik Enterprise, the Ory Enterprise License, SuperTokens paid add-ons such as MFA, and Logto's paid self-hosted plans. Keycloak, Authelia and Authgear have no paid feature tier in the open source code.

### Can I self-host SSO?

Yes. Every provider here runs on your own servers, usually with Docker or Kubernetes and a PostgreSQL database. Self-hosting gives you control over where user data lives, but you take on patching, backups, scaling and on-call.

### What is the difference between open source CIAM and IAM?

IAM, or workforce identity, manages employees signing in to internal tools, usually backed by a corporate directory. CIAM, customer identity and access management, manages customers signing up to your own product, so self-service registration, social login, passkeys, branding and scale matter more. Some open source tools cover both; most lean one way.

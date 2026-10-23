---
title: "Keycloak vs Zitadel (and Authgear): Open Source Identity Compared"
excerpt: "Keycloak and Zitadel are two of the strongest open source identity providers, but they differ on licence, architecture, multi-tenancy and hosting. Here is how they compare in 2026, and where Authgear fits as a third option."
coverImage: ./cover.webp
publishedAt: 2026-10-23
metaTitle: "Keycloak vs Zitadel: Open Source Identity Compared (2026)"
metaDescription: "Keycloak vs Zitadel compared for 2026: Apache-2.0 vs AGPL-3.0, realms vs organisations, login UI, passkeys, SAML, SCIM and hosting, plus where Authgear fits."
category: industry
readTime: 9
faq:
  - q: "Is Zitadel better than Keycloak?"
    a: "Neither is better across the board. Zitadel suits multi-tenant B2B SaaS and teams that want a managed cloud from the people who build it. Keycloak suits workforce SSO, directory federation and teams that need a permissive Apache-2.0 licence and a choice of databases."
  - q: "Is Zitadel open source?"
    a: "Yes. Since v3 in 2025, the Zitadel server is licensed under AGPL-3.0. The proto definitions and docs are Apache-2.0, and the login app and client packages are MIT. Zitadel also sells a commercial licence for teams that can't use AGPL."
  - q: "What does AGPL mean for me?"
    a: "If you run Zitadel unmodified, AGPL-3.0 generally asks little of you. If you modify it and let users interact with it over a network, you must offer those users the source of your modified version. Your own apps that only talk to Zitadel over its APIs are separate programs. Get legal advice for your situation."
  - q: "Which is easier to self-host, Keycloak or Zitadel?"
    a: "Zitadel is usually lighter to run: a Go binary plus PostgreSQL, though Login V2 is a separate Next.js app. Keycloak is a Java (Quarkus) server that supports more databases. Its custom themes need re-testing at each upgrade. Both need you to own patching, backups and high availability."
  - q: "Can I migrate from Keycloak to Zitadel or Authgear?"
    a: "Yes. Zitadel documents a Keycloak migration that converts a realm export into its import format. Authgear can import Keycloak users with their passwords. In both cases, plan for clients, roles, identity providers and custom themes, not only users."
---

> **tl;dr:** Choose **Keycloak** for workforce SSO, LDAP and Active Directory federation, and a permissive Apache-2.0 licence. Choose **Zitadel** for multi-tenant B2B SaaS if you can work with AGPL-3.0 or buy its commercial licence. Choose **Authgear** for customer-facing login with passkeys and one-time codes built in, under Apache-2.0, self-hosted or as a private cloud we run in the UK or EU.

Keycloak and Zitadel come up together in almost every search for an open source identity provider. Both are mature, both speak OpenID Connect (OIDC) and SAML, and both can run on your own servers. They are built for different jobs, though, and they differ on licence, stack and hosting.

This guide compares them as they stand in October 2026: Keycloak 26.8 and Zitadel 4.20. We build Authgear, so we have added it as a third column and tried to be fair to all three.

## Choose X if…

- **Keycloak** if you need SSO for employees and internal apps, federation with LDAP, Active Directory or Kerberos, and a team comfortable running a Java service.
- **Zitadel** if you are building B2B SaaS that signs up many customer companies, want a managed cloud with a Swiss or EU region, and can accept AGPL-3.0 or a commercial licence.
- **Authgear** if you are building customer-facing or frontline apps, want passkeys, magic links and SMS or WhatsApp OTP without extensions, and want Apache-2.0 with the option of having it run for you.

## Keycloak vs Zitadel vs Authgear at a glance

<div class="ag-table-wrap">
  <table class="ag-table">
    <thead>
      <tr><th></th><th>Keycloak</th><th>Zitadel</th><th>Authgear</th></tr>
    </thead>
    <tbody>
      <tr><td><strong>Licence</strong></td><td>Apache-2.0</td><td>AGPL-3.0 since v3 (2025); proto and docs Apache-2.0; login app and client packages MIT; commercial licence available</td><td>Apache-2.0</td></tr>
      <tr><td><strong>Stack</strong></td><td>Java (Quarkus)</td><td>Go; Login V2 in Next.js (TypeScript)</td><td>Go</td></tr>
      <tr><td><strong>Architecture</strong></td><td>Relational database as the source of truth, with Infinispan caches in front</td><td>Event-sourced: every change stored as an event, current state derived from the events</td><td>Go services with PostgreSQL and Redis</td></tr>
      <tr><td><strong>Multi-tenancy</strong></td><td>Realms for isolation; Organisations for B2B inside a realm</td><td>Instances → organisations → projects → applications</td><td>Not its focus (built for customer and frontline login)</td></tr>
      <tr><td><strong>Protocols</strong></td><td>OIDC, OAuth 2.0, SAML 2.0; SCIM API supported since 26.8</td><td>OIDC (OpenID Certified), SAML 2.0 (SP-initiated), SCIM 2.0 (users)</td><td>OIDC, OAuth 2.0, SAML 2.0; LDAP and Active Directory; no SCIM</td></tr>
      <tr><td><strong>Login UI</strong></td><td>FreeMarker theme templates</td><td>Login V2, a Next.js app you can fork and host; default for new customers since v4</td><td>Ready-made pages with full CSS and HTML customisation</td></tr>
      <tr><td><strong>Passkeys and MFA</strong></td><td>Passkeys in default login forms since 26.3; TOTP, recovery codes</td><td>Passkeys, TOTP, U2F, email and SMS OTP</td><td>Passkeys, biometrics, magic links, SMS and WhatsApp OTP, MFA</td></tr>
      <tr><td><strong>Managed cloud from the vendor</strong></td><td>None (third-party hosts only)</td><td>Zitadel Cloud: EU, US, Switzerland, Australia</td><td>Authgear Cloud (US or Hong Kong), or a private cloud we run in the region you choose, including the UK and EU</td></tr>
      <tr><td><strong>Self-hosting database</strong></td><td>PostgreSQL, MySQL, MariaDB, SQL Server, Oracle, Aurora PostgreSQL</td><td>PostgreSQL (14–18) only</td><td>PostgreSQL (16+ recommended) and Redis</td></tr>
      <tr><td><strong>Support</strong></td><td>Community; Red Hat build of Keycloak through Red Hat subscriptions</td><td>Community; SLOs on Pro; custom SLAs and self-hosted support on Enterprise</td><td>Community; paid support for self-hosted as part of Enterprise</td></tr>
    </tbody>
  </table>
</div>

Checked against each project's docs, GitHub repository and pricing pages in October 2026. These details change, so confirm them before you decide.

## Keycloak

Keycloak is the most established open source identity and access management server. It is a CNCF project, and Red Hat is its main contributor.

- **Licence:** Apache-2.0. You can modify it and build on it without sharing your changes.
- **Stack:** Java on Quarkus. Version 26.8 shipped on 1 October 2026.
- **Multi-tenancy:** Each realm is a separate set of users, clients and settings. Organisations, fully supported since 26.0, model business customers inside one realm. In 26.8, one identity provider can be linked to several organisations.
- **Protocols:** OIDC, OAuth 2.0 and SAML 2.0, plus identity brokering to other providers. The SCIM API moved from preview to supported in 26.8.
- **Login UI:** FreeMarker templates, packaged as themes. Keycloak's upgrade guide tells you to re-test custom themes after each upgrade.
- **Databases:** PostgreSQL, MySQL, MariaDB, Microsoft SQL Server, Oracle and Amazon Aurora PostgreSQL, among others.

### Where Keycloak wins

- The deepest LDAP, Active Directory and Kerberos federation of the three.
- A choice of databases, which helps if your organisation standardises on Oracle or SQL Server.
- The largest community and vendor-neutral governance.

### Watch-outs

- No managed service from the project. Hosted Keycloak comes from third parties.
- SMS OTP and magic links need community extensions.
- Custom logic means writing Java Service Provider Interfaces (SPIs) and redeploying.

## Zitadel

Zitadel is an identity platform built for multi-tenant SaaS. It started in St. Gallen, Switzerland. Today its privacy policy names Zitadel, Inc., based in San Francisco, as the data controller, with CAOS AG in St. Gallen listed as an affiliate. If company jurisdiction matters to your buyers, read that policy and the subprocessor list on Zitadel's Trust Center.

- **Licence:** AGPL-3.0 since v3, released in spring 2025. Earlier versions were Apache-2.0. The `proto/` folder and docs stay Apache-2.0, and the login app and client packages are MIT.
- **Stack:** Go, with PostgreSQL as the only supported database since v3 dropped CockroachDB.
- **Architecture:** Event-sourced. In Zitadel's words, "changes are stored as events in an Event Store." That gives you a full history of every change, which helps with auditing.
- **Multi-tenancy:** An instance is the top level, usually one domain and one issuer. Inside it, organisations represent your business customers, and projects group the applications and roles you grant to them.
- **Protocols:** OpenID Certified OIDC, SAML 2.0 (SP-initiated) and a SCIM 2.0 server, which supports the User schema only.
- **Login UI:** Login V2 is an MIT-licensed Next.js app. Since v4 it has been the default for new customers, and you can fork it and host it yourself.
- **Current release:** 4.20.

### Where Zitadel wins

- Organisations, projects and role grants map neatly onto B2B SaaS with many customer companies.
- One codebase for self-hosting and Zitadel Cloud, with data regions in the EU, US, Switzerland and Australia.
- The event-sourced audit trail comes built in.

### Watch-outs

- AGPL-3.0 needs a closer look than Apache-2.0 (see below).
- PostgreSQL only, and Login V2 is a second app to deploy and upgrade.
- A smaller community than Keycloak.

## What AGPL-3.0 means in practice

AGPL-3.0 is a copyleft licence. Its key condition applies when you **modify** the software and let people use it **over a network**. In that case, you must offer those users the source code of your modified version.

- **Running Zitadel unmodified:** Zitadel's own announcement says sharing unmodified Zitadel "is generally permissible."
- **Your own apps:** apps that sign users in through Zitadel's APIs are separate programs. Zitadel kept its APIs and SDKs under permissive licences to avoid that worry.
- **Modifying Zitadel:** your changes to the AGPL parts must be released under AGPL to the people who use them.
- **Can't accept that?** Zitadel sells a commercial licence, included with its Enterprise plan.

Zitadel's LICENSING.md says compliance is your responsibility and recommends legal advice. We agree: check with whoever signs off on open source use in your company. Keycloak and Authgear are both Apache-2.0, which carries no such source-sharing condition.

## Authgear

Authgear is an open source identity platform for customer-facing and frontline apps, built by a UK company. We make it, so read this section with that in mind.

- **Licence:** Apache-2.0, the same as Keycloak.
- **Stack:** Go, with PostgreSQL and Redis. Self-host with the Helm chart.
- **Protocols:** OIDC, OAuth 2.0 and SAML 2.0, with LDAP and Active Directory supported.
- **Login UI:** Ready-made login pages, with full CSS and HTML customisation on every plan, including self-hosted.
- **Login methods:** Passkeys, biometric login in native apps, magic links, SMS and WhatsApp OTP, and MFA.
- **Hosting:** Self-host with every feature of Authgear Cloud, use Authgear Cloud in the US or Hong Kong, or have us run a private cloud for you in the region you choose, including the UK and the EU.

### Where Authgear wins

- Modern login methods are built in, not added as extensions.
- Apache-2.0 with no feature held back from the self-hosted version.
- A private cloud option for teams that want UK or EU hosting without running it themselves.

### Watch-outs

- Younger, with a smaller community than Keycloak.
- Self-hosters connect their own email, SMS and WhatsApp providers.
- Built for customer and frontline login first. For many B2B tenant organisations, Zitadel's model is more developed.

## When to choose which

- **Workforce SSO with corporate directories:** Keycloak.
- **B2B SaaS with many customer organisations:** Zitadel, if the licence works for you.
- **Consumer or frontline login with passwordless methods:** Authgear.
- **Your company needs Oracle or SQL Server:** Keycloak is the only one of the three that supports them.
- **You want the vendor to run it:** Zitadel Cloud or an Authgear private cloud. Keycloak needs a third-party host.
- **Strict open source policy against copyleft:** Keycloak or Authgear.
- **Data must stay in the UK or EU:** all three can be self-hosted there. Zitadel Cloud offers EU and Swiss regions, and Authgear offers a private cloud in the UK or EU. Remember that hosting location and the provider's legal jurisdiction are separate questions.

For a wider field, see our guide to the [best open source identity providers](/post/best-open-source-identity-providers), or the [Authentik vs Keycloak vs Authgear comparison](/post/best-self-hosted-sso-platforms-compared-authgear-vs-keycloak-vs-authentik) if you are focused on self-hosted SSO.

## Migration notes

Moving between identity providers is mostly about users, passwords and the apps that depend on them.

- **Keycloak to Zitadel:** Zitadel documents a Keycloak migration. You export a realm, convert it with the `zitadel-tools` CLI and post it to Zitadel's import API, one organisation at a time. Check which password hash algorithms your Zitadel instance can verify before you import.
- **Keycloak to Authgear:** Authgear can import Keycloak users with their passwords, so they don't need to reset them. Our [Keycloak alternative page](/compare/keycloak-alternative) covers the differences.
- **Beyond users:** plan for clients and redirect URIs, roles and groups, linked identity providers, and custom login themes. These rarely map one to one.
- **Run in parallel:** move one app at a time and keep the old provider running until every client has switched.

If you are also weighing a commercial option, see [Keycloak vs Auth0](/post/keycloak-vs-auth0).

## Frequently Asked Questions

### Is Zitadel better than Keycloak?

Neither is better across the board. Zitadel suits multi-tenant B2B SaaS and teams that want a managed cloud from the people who build it. Keycloak suits workforce SSO, directory federation and teams that need a permissive Apache-2.0 licence and a choice of databases.

### Is Zitadel open source?

Yes. Since v3 in 2025, the Zitadel server is licensed under AGPL-3.0. The proto definitions and docs are Apache-2.0, and the login app and client packages are MIT. Zitadel also sells a commercial licence for teams that can't use AGPL.

### What does AGPL mean for me?

If you run Zitadel unmodified, AGPL-3.0 generally asks little of you. If you modify it and let users interact with it over a network, you must offer those users the source of your modified version. Your own apps that only talk to Zitadel over its APIs are separate programs. Get legal advice for your situation.

### Which is easier to self-host, Keycloak or Zitadel?

Zitadel is usually lighter to run: a Go binary plus PostgreSQL, though Login V2 is a separate Next.js app. Keycloak is a Java (Quarkus) server that supports more databases. Its custom themes need re-testing at each upgrade. Both need you to own patching, backups and high availability.

### Can I migrate from Keycloak to Zitadel or Authgear?

Yes. Zitadel documents a Keycloak migration that converts a realm export into its import format. Authgear can import Keycloak users with their passwords. In both cases, plan for clients, roles, identity providers and custom themes, not only users.

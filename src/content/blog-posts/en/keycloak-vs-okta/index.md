---
title: "Keycloak vs Okta (and Authgear): Self-Hosted vs SaaS Identity"
excerpt: "Keycloak or Okta? A fair comparison of the open-source identity server you run yourself and the SaaS identity platform: licences, hosting, pricing, workforce and customer identity, protocols, support and data sovereignty, with Authgear as a third option."
coverImage: ./cover.webp
category: industry
readTime: 10
metaTitle: "Keycloak vs Okta (and Authgear): Self-Hosted vs SaaS"
metaDescription: "Keycloak vs Okta in 2026: open source vs SaaS, pricing, SSO, SCIM, passkeys, directories, support and UK/EU data sovereignty, with Authgear as a third option."
publishedAt: 2026-10-23
draft: false
faq:
  - q: "Is Keycloak a replacement for Okta?"
    a: "It can be. Keycloak covers single sign-on, MFA, LDAP and Active Directory federation and, since 26.8, a supported SCIM API. What it doesn't give you is Okta's catalogue of thousands of pre-built app integrations or a service someone else runs. You host and operate Keycloak yourself."
  - q: "Is Keycloak free?"
    a: "Yes. Keycloak is open source under the Apache-2.0 licence and free to run. You pay for infrastructure and the people who operate it. Red Hat sells a supported build as part of its subscriptions."
  - q: "How is Okta priced?"
    a: "Okta Workforce Identity is sold in suites priced per user per month and billed annually, with a minimum annual contract. Some suites have published prices and the larger ones are quoted by sales. Okta Customer Identity runs on the Auth0 platform and is priced by monthly active users."
  - q: "What is the difference between Okta and Auth0?"
    a: "Both belong to Okta. Okta Workforce Identity is for employees and contractors signing in to work apps. Okta Customer Identity, delivered on the Auth0 platform, is for the customers who sign in to your own apps."
  - q: "Can I export password hashes from Okta?"
    a: "Okta's APIs don't return password hashes, and Okta offers no out-of-the-box export. Most teams leaving Okta migrate passwords at login time or ask users to reset them."
  - q: "Can I move from Keycloak to Authgear without resetting passwords?"
    a: "Yes. You can import your Keycloak users with their passwords."
  - q: "Is self-hosted identity better for data sovereignty?"
    a: "Self-hosting lets you decide where user data is stored and who can reach it, which makes residency and sovereignty questions easier to answer. It doesn't make you compliant on its own. You still need the right agreements, controls and processes."
---

> **tl;dr** — Choose **Keycloak** if you want free, open-source identity on your own servers and have a team to run it. Choose **Okta** if you want workforce single sign-on as a service, with thousands of pre-built app integrations and no servers to manage. Consider **Authgear** for customer-facing and frontline apps where you want open source you can self-host, or have run for you.

Keycloak and Okta sit at opposite ends of the identity market. Keycloak is an open-source server you download and run on your own infrastructure. Okta is a SaaS platform you subscribe to. Choosing between them is mostly a choice between self-hosted and SaaS.

This guide compares the two, adds Authgear, the open-source identity platform we build, as a third option, and says where each one wins.

## First, which Okta?

Okta sells two separate product lines, and comparisons often mix them up:

- **Okta Workforce Identity** for employees, contractors and partners signing in to work apps: SSO, MFA, directories and lifecycle management.
- **Okta Customer Identity** for the people who sign in to your own apps. It's delivered on the Auth0 platform, which Okta bought in 2021.

You may still see the older names, Workforce Identity Cloud and Customer Identity Cloud. This post compares Keycloak with **Okta Workforce Identity**, since that's what most people mean by "Okta". For customer identity, read [Keycloak vs Auth0](/post/keycloak-vs-auth0).

## Keycloak vs Okta vs Authgear at a glance

<div class="ag-table-wrap">
  <table class="ag-table">
    <thead>
      <tr><th></th><th>Keycloak</th><th>Okta Workforce Identity</th><th>Authgear</th></tr>
    </thead>
    <tbody>
      <tr><td><strong>Licence</strong></td><td>Open source, Apache-2.0</td><td>Proprietary SaaS</td><td>Open source, Apache-2.0</td></tr>
      <tr><td><strong>Hosting model</strong></td><td>You self-host. No managed service from the project; third parties host it</td><td>SaaS only, run by Okta</td><td>Self-host with every feature, Authgear Cloud, or a private cloud we run for you</td></tr>
      <tr><td><strong>Regions</strong></td><td>Wherever you run it</td><td>Okta cells in the US, EMEA, Japan, Australia, Canada and India</td><td>Self-host anywhere; private cloud in a region you choose, including the UK and EU; Authgear Cloud in the US or Hong Kong</td></tr>
      <tr><td><strong>Pricing model</strong></td><td>Free software; you pay for infrastructure, and optionally a Red Hat subscription</td><td>Suites priced per user per month, billed annually, with a minimum annual contract; larger suites quoted</td><td>Free to self-host; Authgear Cloud has a free plan and flat-priced paid plans; Enterprise quoted</td></tr>
      <tr><td><strong>Main focus</strong></td><td>Workforce and customer identity</td><td>Workforce (customer identity is a separate product on Auth0)</td><td>Customer-facing and frontline apps</td></tr>
      <tr><td><strong>Protocols</strong></td><td>OIDC, OAuth 2.0, SAML 2.0; SCIM API supported since 26.8</td><td>OIDC, OAuth 2.0, SAML; SCIM provisioning to apps through Lifecycle Management</td><td>OIDC, OAuth 2.0, SAML 2.0; no SCIM</td></tr>
      <tr><td><strong>Login UI customisation</strong></td><td>FreeMarker themes, packaged as JARs</td><td>Branding settings, plus a code editor for the sign-in page (needs a custom domain)</td><td>Branding editor plus full CSS and HTML on every plan, self-hosted included</td></tr>
      <tr><td><strong>Passkeys and MFA</strong></td><td>Passkeys in default login forms since 26.3; TOTP, recovery codes</td><td>MFA in every suite; passkeys (FIDO2 WebAuthn) authenticator</td><td>Passkeys, MFA, magic links, SMS and WhatsApp OTP built in</td></tr>
      <tr><td><strong>Enterprise federation</strong></td><td>LDAP, Active Directory, Kerberos; brokering to SAML and OIDC providers</td><td>Active Directory and LDAP agents; Universal Directory; thousands of pre-built app integrations</td><td>LDAP and Active Directory; OIDC and SAML SSO</td></tr>
      <tr><td><strong>Support</strong></td><td>Community, or Red Hat for its build</td><td>Online support 24×5 in every suite; paid Premier Success plans</td><td>Direct from the Authgear team; paid support for self-hosted with Enterprise</td></tr>
      <tr><td><strong>Company behind it</strong></td><td>CNCF project, with Red Hat (US) as main contributor</td><td>Okta, Inc. (US)</td><td>A UK company</td></tr>
    </tbody>
  </table>
</div>

Features and pricing models checked against keycloak.org, okta.com/pricing and Okta's help docs on 23 October 2026. Plans change, so confirm on each vendor's site before you decide.

## Self-hosted vs SaaS: the real trade-off

Before features, decide who you want running your login system.

- **Self-hosted (Keycloak, or Authgear self-hosted).** You control where data lives, when you upgrade and what it costs at scale. You also own uptime, patching, backups and the 3am pager.
- **SaaS (Okta).** Someone else runs it, scales it and patches it. You pay per user, and you accept the vendor's regions, roadmap and contract terms.
- **In between.** A managed or private cloud deployment of an open-source product gives you a vendor to run it while keeping the option to take it in-house later. Third parties offer this for Keycloak; we offer it for Authgear.

## Keycloak: open source you run yourself

Keycloak is the best-known open-source identity and access management server. It's a CNCF project, Red Hat is its main contributor, and the current release is 26.8 (October 2026).

### Where Keycloak wins

- **No per-user bill.** Apache-2.0 and free to run, however many employees or customers you have.
- **Full control over data.** It runs where you put it, under the access rules you set.
- **Directory federation.** Built-in LDAP, Active Directory and Kerberos, plus brokering to other SAML and OIDC providers.
- **Catching up on provisioning.** The SCIM API moved from preview to supported in 26.8.
- **Works for both workforce and customers**, with realms and Organisations for multi-tenancy.

### What to plan for

- **You run it.** That means people with Java and Kubernetes skills, and time for upgrades.
- **Fewer ready-made app connectors.** Any app that speaks OIDC or SAML works, but there's no catalogue of pre-configured SaaS integrations like Okta's.
- **Login pages are FreeMarker themes** packaged as JARs, which Keycloak's upgrade guide says to re-test after each upgrade.
- **Custom logic means Java SPIs** that you build and redeploy.

## Okta Workforce Identity: SaaS for employee sign-in

Okta is one of the most widely used workforce identity services. IT teams use it to give staff one login for hundreds of work apps.

### Where Okta wins

- **Integrations.** The Okta Integration Network lists thousands of pre-built connectors, many with SCIM provisioning, so adding a SaaS app is usually configuration, not code.
- **Lifecycle management.** Joiners, movers and leavers can be provisioned and deprovisioned across apps automatically.
- **Directory integration.** Agents connect Active Directory and LDAP, and Universal Directory holds users from several sources.
- **No servers.** Okta runs, scales and patches the service.
- **Maturity and support.** Years of enterprise use, with online support in every suite and paid Premier Success plans.

### What to plan for

- **Per-user pricing with a floor.** Suites are priced per user per month, billed annually, and Okta states a minimum annual contract. The larger suites are quoted.
- **Features by suite.** Lifecycle Management, for example, is included from Essentials up and an add-on on Starter.
- **Deeper sign-in page changes need a custom domain** before you can use the code editor.
- **A US vendor.** Okta offers cells in several regions, including EMEA, but the company is in the US (more below).
- **Leaving takes planning.** Okta's APIs don't return password hashes.

## Authgear: open source for customer and frontline apps

Authgear is an open-source identity platform under the same Apache-2.0 licence as Keycloak. It's built for customer-facing and frontline apps, so it overlaps more with Keycloak and Auth0 than with Okta's workforce product.

### Where Authgear wins

- **Self-host with every feature**, or have us run a private cloud for you in a region you choose, including the UK and the EU.
- **Modern login built in.** Passkeys, biometric login in iOS and Android apps, magic links, and SMS and WhatsApp OTP.
- **Frontline staff without corporate email** can sign in with a phone number and OTP.
- **Login pages without templates.** Full CSS and HTML customisation on every plan, self-hosted included.
- **Keycloak users can be imported with their passwords.**

### What to plan for

- **Not a workforce SSO catalogue.** If you need thousands of pre-built SaaS connectors for employees, Okta is the stronger fit.
- **Younger and smaller** than Keycloak or Okta.
- **Self-hosters connect their own** email, SMS and WhatsApp providers.

## Data residency and sovereignty for UK and EU buyers

Residency is where data sits. Sovereignty also asks who runs the system and whose law applies to them.

- **Keycloak.** Self-hosted, both answers are you. Red Hat supports the software but doesn't hold your data.
- **Okta.** You can place your org in an EMEA cell, which helps with residency. Okta is a US company, so it falls under the US CLOUD Act, which lets US authorities require US providers to disclose data in their "possession, custody, or control", wherever it is stored. Providers can challenge those orders, and plenty of UK and EU organisations use Okta after their own assessment. It's still worth knowing if your customers or regulator ask.
- **Authgear.** Self-host it, or have us run a private cloud for you in the UK or EU. Authgear is built by a UK company.

Our guide to [UK data sovereignty for login and identity](/post/uk-data-sovereignty-login-identity) goes deeper.

## When to choose which

- **Choose Keycloak** if you want open source, have a platform team, and need SSO and directory federation without per-user fees.
- **Choose Okta** if you're an IT team rolling out SSO across many SaaS apps, want automated provisioning, and would rather pay than operate.
- **Choose Authgear** if you're building customer-facing or frontline apps and want open source with the option of someone else running it.
- **Need both?** Many organisations use a workforce product such as Okta for staff and a separate customer identity platform for their apps.

## Migrating between them

All three speak OIDC and SAML, so apps mostly need new client settings. Users and passwords take more care.

### Okta to Keycloak

- Users and groups can be exported through Okta's APIs.
- Password hashes can't. Okta's APIs don't return them and there's no out-of-the-box export.
- Plan a login-time migration, where Keycloak checks each password against Okta through a User Storage SPI on first sign-in, or ask users to reset their passwords.
- Re-create SCIM provisioning for each app you used to manage from Okta.

### Keycloak to Authgear

- Authgear can import Keycloak users with their passwords, so nobody has to reset.
- See our [Keycloak alternative](/compare/keycloak-alternative) page for a side-by-side view.

### Okta to Authgear

- The same limit on password hashes applies, so talk to us about how to handle passwords for your users. Our [Okta alternative](/compare/okta-alternative) page compares the two.

## Bottom line

- **Keycloak** gives you control and no per-user bill, in exchange for running it.
- **Okta** gives you a mature workforce SaaS with a huge integration catalogue, in exchange for per-user pricing and a US vendor.
- **Authgear** gives you open source for customer and frontline apps, self-hosted or run for you.

Related reading: [Keycloak vs Auth0](/post/keycloak-vs-auth0) and [Authentik vs Keycloak (and Authgear)](/post/best-self-hosted-sso-platforms-compared-authgear-vs-keycloak-vs-authentik).

## Frequently Asked Questions

### Is Keycloak a replacement for Okta?

It can be. Keycloak covers single sign-on, MFA, LDAP and Active Directory federation and, since 26.8, a supported SCIM API. What it doesn't give you is Okta's catalogue of thousands of pre-built app integrations or a service someone else runs. You host and operate Keycloak yourself.

### Is Keycloak free?

Yes. Keycloak is open source under the Apache-2.0 licence and free to run. You pay for infrastructure and the people who operate it. Red Hat sells a supported build as part of its subscriptions.

### How is Okta priced?

Okta Workforce Identity is sold in suites priced per user per month and billed annually, with a minimum annual contract. Some suites have published prices and the larger ones are quoted by sales. Okta Customer Identity runs on the Auth0 platform and is priced by monthly active users.

### What is the difference between Okta and Auth0?

Both belong to Okta. Okta Workforce Identity is for employees and contractors signing in to work apps. Okta Customer Identity, delivered on the Auth0 platform, is for the customers who sign in to your own apps.

### Can I export password hashes from Okta?

Okta's APIs don't return password hashes, and Okta offers no out-of-the-box export. Most teams leaving Okta migrate passwords at login time or ask users to reset them.

### Can I move from Keycloak to Authgear without resetting passwords?

Yes. You can import your Keycloak users with their passwords.

### Is self-hosted identity better for data sovereignty?

Self-hosting lets you decide where user data is stored and who can reach it, which makes residency and sovereignty questions easier to answer. It doesn't make you compliant on its own. You still need the right agreements, controls and processes.

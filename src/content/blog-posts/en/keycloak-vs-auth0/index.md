---
title: "Keycloak vs Auth0 (and Authgear): Which Should You Choose in 2026?"
excerpt: "Keycloak or Auth0? A fair comparison of the open-source identity server and the hosted customer identity platform: licences, hosting, pricing, protocols, customisation, support and data sovereignty, with Authgear as a third option."
coverImage: ./cover.webp
category: industry
readTime: 10
metaTitle: "Keycloak vs Auth0 (and Authgear): Which to Choose in 2026"
metaDescription: "Keycloak vs Auth0 in 2026: licences, hosting, pricing, SAML and SCIM, passkeys, support and UK/EU data sovereignty compared, with Authgear as a third option."
publishedAt: 2026-10-23
draft: false
faq:
  - q: "Is Keycloak better than Auth0?"
    a: "Neither is better across the board. Keycloak is free, open source and runs on your own servers, but you operate it. Auth0 is a hosted service with a polished developer experience and a large ecosystem, and you pay as your user count grows. The right choice depends on whether you want to run identity yourself."
  - q: "Is Keycloak free?"
    a: "Yes. Keycloak is open source under the Apache-2.0 licence and free to run. You pay for the servers and the people who operate it. Red Hat sells a supported build as part of its subscriptions."
  - q: "Is Auth0 owned by Okta?"
    a: "Yes. Okta acquired Auth0 in 2021. Okta now sells its customer identity product, Okta Customer Identity, on the Auth0 platform."
  - q: "Can I export password hashes from Auth0?"
    a: "Yes, but not through the API or the standard user export. You request a password hash export through an Auth0 support ticket, and it isn't available on the Free plan. Auth0 doesn't guarantee a turnaround time."
  - q: "Can Keycloak import Auth0 password hashes?"
    a: "Not out of the box. Auth0 exports bcrypt hashes, and Keycloak's built-in hashing uses PBKDF2 and Argon2. You need a custom or community password hash extension, a login-time migration, or password resets."
  - q: "Can I move from Keycloak to Authgear without resetting passwords?"
    a: "Yes. You can import your Keycloak users with their passwords."
  - q: "Does Auth0 let me keep data in the UK or EU?"
    a: "Auth0's public cloud offers UK and EU regions, among others, so tenant data can be hosted there. Auth0 is still run by Okta, a US company, which matters if your buyers ask whose law applies to the vendor as well as where the data sits."
---

> **tl;dr:** Choose **Keycloak** if you want free, open-source identity on your own servers and have a team to run it. Choose **Auth0** if you want a hosted service with a large ecosystem and are happy to pay per active user. Consider **Authgear** if you want open source you can self-host, or have run for you, with passkeys and branded login pages built in.

Keycloak and Auth0 turn up on the same shortlists, but they are very different products. Keycloak is an open-source server you download and run. Auth0 is a hosted service you sign up for. Comparing them is really a choice about who runs your login system and who you trust with your users' data.

This guide puts them side by side and adds Authgear, the open-source identity platform we build, as a third option. We've tried to be fair and to say where each one wins.

## Keycloak vs Auth0 vs Authgear at a glance

<div class="ag-table-wrap">
  <table class="ag-table">
    <thead>
      <tr><th></th><th>Keycloak</th><th>Auth0</th><th>Authgear</th></tr>
    </thead>
    <tbody>
      <tr><td><strong>Licence</strong></td><td>Open source, Apache-2.0</td><td>Proprietary SaaS (open-source SDKs)</td><td>Open source, Apache-2.0</td></tr>
      <tr><td><strong>Hosting model</strong></td><td>You self-host. No managed service from the project; third parties host it</td><td>Hosted only: public cloud, or a dedicated private cloud on AWS or Azure</td><td>Self-host with every feature, Authgear Cloud, or a private cloud we run for you</td></tr>
      <tr><td><strong>Regions</strong></td><td>Wherever you run it</td><td>Public cloud in the US, EU, UK, Australia, Canada and Japan</td><td>Self-host anywhere; private cloud in a region you choose, including the UK and EU; Authgear Cloud in the US or Hong Kong</td></tr>
      <tr><td><strong>Pricing model</strong></td><td>Free software; you pay for infrastructure, and optionally a Red Hat subscription</td><td>Free plan up to 25,000 MAU, then Essentials and Professional priced by monthly active users (B2C and B2B differ); Enterprise quoted</td><td>Free to self-host; Authgear Cloud has a free plan and flat-priced paid plans; Enterprise quoted</td></tr>
      <tr><td><strong>Main focus</strong></td><td>Workforce and customer identity</td><td>Customer identity (B2C and B2B)</td><td>Customer-facing and frontline apps</td></tr>
      <tr><td><strong>Protocols</strong></td><td>OIDC, OAuth 2.0, SAML 2.0; SCIM API supported since 26.8</td><td>OIDC, OAuth 2.0, SAML; inbound SCIM on every plan</td><td>OIDC, OAuth 2.0, SAML 2.0; no SCIM</td></tr>
      <tr><td><strong>Login UI customisation</strong></td><td>FreeMarker themes, packaged as JARs</td><td>Universal Login branding; page templates and advanced customisation (custom domain required for the advanced option)</td><td>Branding editor plus full CSS and HTML on every plan, self-hosted included</td></tr>
      <tr><td><strong>Passkeys and MFA</strong></td><td>Passkeys in default login forms since 26.3; TOTP, recovery codes</td><td>Passkeys on every plan; MFA from Essentials up</td><td>Passkeys, MFA, magic links, SMS and WhatsApp OTP built in</td></tr>
      <tr><td><strong>Enterprise federation</strong></td><td>LDAP, Active Directory, Kerberos; brokering to SAML and OIDC providers</td><td>Enterprise connections (SAML, AD, LDAP and others), limited by plan</td><td>LDAP and Active Directory; OIDC and SAML SSO</td></tr>
      <tr><td><strong>Support</strong></td><td>Community, or Red Hat for its build</td><td>Community on Free; standard support on paid plans; premier options on Enterprise</td><td>Direct from the Authgear team; paid support for self-hosted with Enterprise</td></tr>
      <tr><td><strong>Company behind it</strong></td><td>CNCF project, with Red Hat (US) as main contributor</td><td>Okta, Inc. (US)</td><td>A UK company</td></tr>
    </tbody>
  </table>
</div>

Features and pricing models checked against keycloak.org, auth0.com/pricing and the Auth0 docs on 23 October 2026. Plans change, so confirm on each vendor's site before you decide.

## Keycloak: open source you run yourself

Keycloak is the best-known open-source identity and access management server. It's a CNCF project, Red Hat is its main contributor, and the current release is 26.8 (October 2026).

### Where Keycloak wins

- **No licence bill.** Apache-2.0 and free to run, however many users you have. The cost is in running it: see [Keycloak pricing](/post/keycloak-pricing).
- **Your data stays on your servers.** You pick the country, the cloud and the people who can reach it.
- **Enterprise federation.** Built-in LDAP, Active Directory and Kerberos, plus brokering to other SAML and OIDC providers.
- **Standards keep moving.** Passkeys arrived in the default login forms in 26.3, and the SCIM API became fully supported in 26.8.
- **Multi-tenancy.** Realms keep tenants apart, and Organisations add B2B tenancy inside a realm.

### What to plan for

- **You run it.** Upgrades, patching, backups, scaling and on-call are your team's job. Our [Keycloak upgrade guide](/post/keycloak-upgrade-guide) shows what that involves, and [managed Keycloak vs a private cloud](/post/managed-keycloak-vs-private-cloud) covers paying someone else to do it.
- **Login pages are FreeMarker themes.** Production themes are packaged as JARs, and Keycloak's upgrade guide tells you to re-test them after each upgrade. See our [Keycloak custom login page](/post/keycloak-custom-login-page) guide.
- **Custom logic means Java.** Extensions are built as Service Provider Interfaces (SPIs) that you compile and redeploy.
- **Some login methods need extensions.** SMS OTP and magic links aren't built in.
- **No official mobile SDK.** Keycloak recommends the AppAuth libraries.

## Auth0: hosted customer identity

Auth0 is a hosted identity platform aimed at developers building customer-facing apps. Okta bought it in 2021, and Okta now sells customer identity as **Okta Customer Identity**, delivered on the Auth0 platform. (You may still see the older name, Customer Identity Cloud.)

### Where Auth0 wins

- **Fast to start.** Sign up, add an SDK and you have a working login in an afternoon. There's nothing to deploy.
- **Ecosystem.** Quickstarts for most languages and frameworks, a large community, and a marketplace of integrations.
- **Maturity.** Years of production use at large scale, with Actions for custom logic in JavaScript.
- **B2B features.** Organisations, enterprise connections and inbound SCIM for selling to businesses.
- **Regions.** Public cloud tenants can live in the US, EU, UK, Australia, Canada or Japan, and private cloud deployments run on AWS or Azure.

### What to plan for

- **Costs grow with active users.** Paid plans are priced by monthly active users, and B2B plans cost more than B2C. Check where your growth lands you before you commit.
- **Features vary by plan.** MFA isn't on the Free plan, standard support starts on Essentials, and enterprise connections are limited by plan.
- **Advanced login customisation has prerequisites.** Auth0's advanced Universal Login customisation needs a custom domain and somewhere to host your assets.
- **You can't self-host it.** Even the private cloud option is run by Auth0.
- **Leaving takes planning.** Password hashes don't come out through the API (more on that below).

## Authgear: open source, self-hosted or run for you

Authgear is an open-source identity platform for customer-facing and frontline apps, under the same Apache-2.0 licence as Keycloak.

### Where Authgear wins

- **Self-host with every feature.** The self-hosted version has everything Authgear Cloud has.
- **Or have us run it.** A private cloud we run for you in a region you choose, including the UK and the EU.
- **Modern login built in.** Passkeys, biometric login in iOS and Android apps, magic links, and SMS and WhatsApp OTP, switched on in the portal.
- **Login pages without templates.** A branding editor, plus full CSS and HTML customisation on every plan, self-hosted included.
- **Imports from both.** Keycloak users can be imported with their passwords, and the User Import API accepts bcrypt hashes like the ones Auth0 exports.

### What to plan for

- **Younger and smaller** than either Keycloak or Auth0, with fewer third-party guides and integrations.
- **Self-hosters connect their own providers** for email, SMS and WhatsApp.
- **Built for customer login first.** For deep workforce federation across many directories, Keycloak has more history.

## Data residency and sovereignty for UK and EU buyers

Data residency is where the data sits. Sovereignty also asks who runs the system and whose law applies to the people who run it.

- **Keycloak.** If you self-host, both answers are you. Red Hat supports the software but doesn't hold your data.
- **Auth0.** You can pick a UK or EU region, which covers residency. Auth0 is run by Okta, a US company, so it is subject to the US CLOUD Act. That law lets US authorities require US providers to hand over data in their "possession, custody, or control", wherever it is stored. Providers can challenge such orders, and many UK and EU organisations use US services after their own risk assessment. It is still a question your customers or regulator may ask.
- **Authgear.** Self-host it, or have us run a private cloud for you in the UK or EU. Authgear is built by a UK company.

For a deeper look, read our guide to [UK data sovereignty for login and identity](/post/uk-data-sovereignty-login-identity).

## When to choose which

- **Choose Keycloak** if you have a platform team, need deep LDAP or Active Directory federation, and want no licence costs.
- **Choose Auth0** if you want to ship quickly, value its ecosystem and quickstarts, and your budget can absorb per-user pricing as you grow.
- **Choose Authgear** if you want open source and control over where data lives, but would rather not maintain themes and extensions, or want the option of someone else running it.

Weighing Okta's workforce product instead? See [Keycloak vs Okta](/post/keycloak-vs-okta).

## Migrating between them

All three speak OIDC and SAML, so your apps mostly need new client IDs, redirect URIs and issuer settings. User data, especially passwords, is the hard part.

### Auth0 to Keycloak

- **Users and profiles** come out through Auth0's bulk user export.
- **Password hashes don't.** You request them through an Auth0 support ticket. The export isn't available on the Free plan, and Auth0 doesn't promise a turnaround time.
- **Keycloak can't read them out of the box.** Auth0's hashes are bcrypt. Keycloak's built-in hashing is PBKDF2 and Argon2, so you'll need a custom or community bcrypt extension, a login-time migration through a User Storage SPI, or password resets.

### Auth0 to Authgear

- Authgear's User Import API accepts bcrypt hashes, so users from an Auth0 hash export can keep their passwords.
- Our guide on [migrating from Auth0 to an open-source identity provider](/post/how-to-migrate-from-auth0-to-open-source-identity-provider) walks through the steps.

### Keycloak to Authgear

- Keycloak uses Argon2 by default since version 25. We migrate those users with a database-level import, so they keep their passwords.
- See the [Keycloak alternative](/compare/keycloak-alternative) page for a side-by-side view, or the [Auth0 alternative](/compare/auth0-alternative) page if you're coming from Auth0.

## Bottom line

- **Keycloak** gives you control and no licence bill, in exchange for running it.
- **Auth0** gives you speed and a big ecosystem, in exchange for per-user pricing and a US vendor.
- **Authgear** gives you open source and the choice between running it and having it run for you.

Related reading: [Top open-source Auth0 alternatives](/post/top-open-source-auth0-alternatives), [Keycloak vs Okta](/post/keycloak-vs-okta) and [Keycloak vs Zitadel](/post/keycloak-vs-zitadel).

## Frequently Asked Questions

### Is Keycloak better than Auth0?

Neither is better across the board. Keycloak is free, open source and runs on your own servers, but you operate it. Auth0 is a hosted service with a polished developer experience and a large ecosystem, and you pay as your user count grows. The right choice depends on whether you want to run identity yourself.

### Is Keycloak free?

Yes. Keycloak is open source under the Apache-2.0 licence and free to run. You pay for the servers and the people who operate it. Red Hat sells a supported build as part of its subscriptions.

### Is Auth0 owned by Okta?

Yes. Okta acquired Auth0 in 2021. Okta now sells its customer identity product, Okta Customer Identity, on the Auth0 platform.

### Can I export password hashes from Auth0?

Yes, but not through the API or the standard user export. You request a password hash export through an Auth0 support ticket, and it isn't available on the Free plan. Auth0 doesn't guarantee a turnaround time.

### Can Keycloak import Auth0 password hashes?

Not out of the box. Auth0 exports bcrypt hashes, and Keycloak's built-in hashing uses PBKDF2 and Argon2. You need a custom or community password hash extension, a login-time migration, or password resets.

### Can I move from Keycloak to Authgear without resetting passwords?

Yes. You can import your Keycloak users with their passwords.

### Does Auth0 let me keep data in the UK or EU?

Auth0's public cloud offers UK and EU regions, among others, so tenant data can be hosted there. Auth0 is still run by Okta, a US company, which matters if your buyers ask whose law applies to the vendor as well as where the data sits.

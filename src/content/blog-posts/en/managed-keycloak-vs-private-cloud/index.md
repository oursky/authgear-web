---
title: "Managed Keycloak vs a Private Cloud: What You Actually Get"
excerpt: "The Keycloak project doesn't run a cloud service. Here is what you get from each route instead: running it yourself, a third-party Keycloak host, Red Hat build of Keycloak, or a vendor-run private cloud, compared on upgrades, support, region and exit."
coverImage: ./cover.webp
publishedAt: 2026-10-23
metaTitle: "Managed Keycloak vs Private Cloud: What You Actually Get"
metaDescription: "There is no official Keycloak cloud. Compare managed Keycloak hosting, Red Hat build of Keycloak and a vendor-run private cloud on upgrades, support and region."
category: industry
readTime: 9
draft: false
faq:
  - q: "Is there an official managed Keycloak service?"
    a: "No. The Keycloak project, a CNCF incubation project, publishes the software but does not run a hosted service. Managed Keycloak comes from third parties such as Cloud-IAM, Phase Two and Skycloak. Red Hat build of Keycloak is supported software that you install and run yourself."
  - q: "What is Keycloak as a service?"
    a: "It usually means a third-party company runs Keycloak for you: it hosts the servers and database, applies upgrades and security patches, takes backups and monitors uptime. You still configure realms, clients, themes and extensions, because it is still Keycloak."
  - q: "Does Red Hat host Keycloak for you?"
    a: "No. Red Hat build of Keycloak is supported by Red Hat but installed and operated by you, including when it runs on Red Hat's managed OpenShift services. Red Hat's own knowledge base describes it there as customer-installed software that Red Hat does not operate."
  - q: "Can I host Keycloak in a UK or EU region?"
    a: "Yes, if you run it yourself you can use any UK or EU data centre. The third-party hosts we checked all offer EU hosting. None of them listed a UK region by name on the pages we checked in October 2026, so ask for one directly if you need it."
  - q: "Can I leave a managed Keycloak provider later?"
    a: "Usually, yes. Keycloak can export realms, clients and users to JSON files, and the hosts we checked describe exports or self-hosting as a way out. Plan for custom themes and extensions, which you will need to bring with you and test on your new setup."
  - q: "What is the difference between managed Keycloak and a private cloud?"
    a: "Managed Keycloak is usually a hosted instance of Keycloak run by a company that didn't build it. A private cloud is a dedicated deployment that the vendor of the product runs for you in a region you choose, so the people who operate it also write the code."
---

> **tl;dr:** The Keycloak project doesn't run a cloud. You can run Keycloak yourself, pay a third party to host it, buy Red Hat's supported build and run it yourself, or choose a different product whose own team runs a private cloud for you. The right answer depends on who you want doing upgrades, who you call when login breaks, and where your data has to live.

Search for "Keycloak cloud" and you'll find plenty of companies offering to host it. What you won't find is a hosted service from the Keycloak project itself. Keycloak is a [Cloud Native Computing Foundation incubation project](https://www.keycloak.org/), and like most CNCF projects it ships software, not a service.

So "managed Keycloak" can mean several quite different things. This guide sets out the four real options, what each one gives you, and what it leaves with you. We build Authgear, which is one of the options, so we've tried to be fair and to say where Keycloak is the better choice.

## Is there an official managed Keycloak?

No. Here is who does what:

- **The Keycloak project** publishes releases. The current release is 26.8, out on [1 October 2026](https://www.keycloak.org/2026/10/keycloak-2680-released), with 26.8.1 following on 13 October.
- **Red Hat** sells a supported build, but you install and run it.
- **Third parties** host Keycloak and run it for you. Cloud-IAM, Phase Two and Skycloak are three of the best known.

If someone tells you they are selling "Keycloak SaaS", they are one of those third parties.

## The four options at a glance

| | Run it yourself | Third-party Keycloak host | Red Hat build of Keycloak | Vendor-run private cloud |
|---|---|---|---|---|
| **Software** | Keycloak | Keycloak | Keycloak, Red Hat's build | A different product (for example Authgear) |
| **Who runs the servers** | You | The host | You | The vendor |
| **Who does upgrades** | You | The host | You, with Red Hat patches and guidance | The vendor |
| **Who maintains themes and extensions** | You | You (the host deploys them) | You | Depends on the product |
| **Support** | Community | The host, by plan | Red Hat | The vendor that builds the product |
| **Region** | Anywhere you can run servers | The host's list | Anywhere you can run servers | A region you choose with the vendor |
| **Exit** | Nothing to leave | Export realms and users | Same as running it yourself | Export data, or self-host if the product is open source |
| **Cost model** | Infrastructure plus your team's time | Monthly plan by size and support level | Red Hat subscription plus infrastructure and your time | Contract with the vendor |

## Option 1: run Keycloak yourself

This is how most teams start. You deploy Keycloak's container or the Kubernetes Operator, point it at a PostgreSQL database and put it behind a load balancer.

**What you get:**

- Full control over the version, configuration, network and data location.
- No licence fee. Keycloak is [Apache-2.0](https://github.com/keycloak/keycloak).
- The largest community of any open source identity server, and plenty of documentation.

**What stays with you:**

- **Upgrades.** Keycloak plans [four minor releases a year](https://www.keycloak.org/2024/10/release-updates), plus patch releases. Each one means reading the [upgrade notes](https://www.keycloak.org/docs/latest/upgrading/index.html), testing and rolling out. Our [Keycloak upgrade guide](/post/keycloak-upgrade-guide) has a checklist.
- **Themes and extensions.** Custom login pages are FreeMarker themes, and custom logic is Java Service Provider Interfaces (SPIs). The upgrade notes regularly ask you to re-test custom themes and extensions; the 26.8 notes, for example, ask you to check that identity provider buttons still display correctly in custom login themes. Our [Keycloak custom login page](/post/keycloak-custom-login-page) guide shows how to keep a theme thin.
- **Sizing and on-call.** Keycloak's own [sizing guide](https://www.keycloak.org/high-availability/multi-cluster/concepts-memory-and-cpu-sizing) starts at 1,250 MB of RAM per pod and recommends 150% CPU headroom for spikes. If login goes down at 3am, it's your pager.

**Best for:** teams with a platform or DevOps group that already runs Java services and wants complete control.

## Option 2: a third-party Keycloak host

A company runs Keycloak for you on its infrastructure. You get an admin console URL and configure realms and clients as usual. We checked three providers on their own sites in October 2026.

| | Cloud-IAM | Phase Two | Skycloak |
|---|---|---|---|
| **What it is** | "Managed Keycloak, hosted in Europe" | Keycloak hosting, plus enterprise support for self-hosted Keycloak | Keycloak "hosted and operated for you" |
| **Based** | France | Not stated on the pages we checked | Not stated on the pages we checked |
| **Upgrades** | Tests each release, backs up before upgrading, can roll back | Keeps instances on the latest Keycloak releases | Handles upgrades and CVE patching |
| **Your themes and extensions** | Your own or from a catalogue | Allowed, with limits by plan | Custom themes on higher plans; bring-your-own extensions as an add-on |
| **Regions** | European providers (Scaleway, 3DS Outscale) plus AWS, Google Cloud and Azure | Americas, EU and Asia-Pacific; custom regions on request | US, EU, Canada, Australia and more |
| **Exit** | Keycloak-compatible exports of realms, users, groups and roles | Not stated on the pages we checked | "Export and self-host any time" |

Sources: [cloud-iam.com](https://www.cloud-iam.com/), [phasetwo.io](https://phasetwo.io/) and [its hosting plans](https://phasetwo.io/pricing/hosting/), [skycloak.io](https://skycloak.io/), checked 23 October 2026.

Phase Two also stands out for publishing its own [open source Keycloak extensions](https://phasetwo.io/), such as organisations, magic links and webhooks, which it includes in every deployment.

**What you get:**

- Someone else handles servers, backups, monitoring and version upgrades.
- It is still Keycloak, so your skills, docs and community answers still apply.
- Support from people who specialise in Keycloak, at a level set by your plan.

**What stays with you:**

- **Your customisations.** The host deploys your theme and extension JARs, but you write them and keep them working on each new Keycloak version.
- **Feature gaps.** If you need something Keycloak doesn't do out of the box, such as SMS one-time codes, you still need an extension.
- **The upstream roadmap.** The host doesn't control what Keycloak builds next.

**Best for:** teams that are happy with Keycloak's features and want to stop running servers.

## Option 3: Red Hat build of Keycloak

This is Keycloak built, tested and supported by Red Hat. It replaced Red Hat Single Sign-On.

According to [Red Hat's knowledge base](https://access.redhat.com/articles/7044244), the entitlement is included in Red Hat Runtimes and Red Hat OpenShift Container Platform subscriptions, and in bundles that include them, such as Red Hat Application Foundations. It is not sold as a separate product, and it is not included in OpenShift Kubernetes Engine.

**What you get:**

- A supported build with a published [life cycle](https://access.redhat.com/node/7092877), so you aren't forced onto every community release.
- Red Hat support when something breaks.
- A good fit if you already run OpenShift.

**What stays with you:**

- **Running it.** Red Hat build of Keycloak is customer-installed software. Even on Red Hat's managed OpenShift services, Red Hat's knowledge base says it is "not operationally managed by Red Hat".
- **Themes and extensions**, as with any Keycloak.

**Best for:** organisations that already have a Red Hat relationship and their own operations team.

## Option 4: a vendor-run private cloud of a different product

The last option is to stop looking for a Keycloak host and look for a product whose own team will run it for you. A private cloud is a dedicated deployment, not shared with other customers, that the vendor operates in a region you agree.

This is how [Authgear](/compare/keycloak-alternative) works. It is open source under Apache-2.0, like Keycloak, and you can self-host it with every feature using our Helm chart. If you'd rather not run it, we run a private cloud for you in the region you choose, including the UK and the EU. Login pages are customised with CSS and HTML rather than theme JARs, and Keycloak users can be imported with their passwords.

**What you get:**

- The people who run your deployment are the people who write the code.
- Upgrades are the vendor's job, not a joint project between you and a host.
- Region choice agreed in the contract.

**What stays with you:**

- **A migration.** Your apps need new client settings and you need to move users. Both products speak OIDC and SAML, so it's mostly configuration, but it is still a project.
- **A different product.** Check that it covers what you use Keycloak for. Keycloak still has more history with deep LDAP, Active Directory and Kerberos federation across many enterprise directories.

**Best for:** teams building customer-facing apps who want someone accountable for the whole thing, in a region they choose.

## Compared on what matters

### Who does upgrades

Self-hosting and Red Hat leave upgrades with you. A third-party host takes on the platform upgrade but not your custom code. A vendor-run private cloud puts both on the vendor, provided you've kept customisation within what the product supports.

### Theme and extension maintenance

This is the cost teams underestimate most. With every Keycloak option, your FreeMarker themes and Java extensions are yours to maintain. Ask any host exactly what it will do when an upgrade breaks one of them.

### Support

Community support is free and good, but nobody is obliged to answer. Hosts sell support by tier, often with response targets. Red Hat supports its own build. A product vendor supports what it builds and runs.

### Region choice

For teams in the UK, Ireland, the Netherlands and the Nordics, this often decides the shortlist. Self-hosting lets you use any data centre. All three hosts above offer EU hosting. None listed a UK region by name on the pages we checked, though Phase Two offers custom regions, so ask. For more on why location and operator both matter, see our page on [data sovereignty](/solutions/data-sovereignty).

### Exit and portability

Keycloak's [export command](https://www.keycloak.org/server/importExport) writes realms, clients and users to JSON, which makes moving between Keycloak hosts fairly straightforward. Moving to a different product takes more work, mainly mapping users and password hashes. Keycloak has used Argon2 by default since version 25, so check that the new product can import those hashes.

### Cost model

Self-hosting costs infrastructure and people. Hosts charge a monthly plan, scaled by cluster size and support. Red Hat charges a subscription, and you still pay for infrastructure and people. A private cloud is a contract with the vendor. We break this down, with a cost model you can fill in, in [Keycloak pricing: what it really costs to run Keycloak](/post/keycloak-pricing).

## Which should you choose?

- **You have a platform team and want full control:** run Keycloak yourself.
- **You like Keycloak but are tired of running it:** a third-party Keycloak host.
- **You already pay Red Hat and run OpenShift:** Red Hat build of Keycloak.
- **You want one company accountable for the software and the servers, in a region you choose:** a vendor-run private cloud.

Keycloak is excellent software, and for workforce single sign-on (SSO) with complex directory federation it is still the default for good reason. The question here isn't whether Keycloak is good. It's who you want doing the work around it.

## Further reading

- [Keycloak pricing: what it really costs to run Keycloak](/post/keycloak-pricing)
- [Authentik vs Keycloak: self-hosted SSO compared](/post/best-self-hosted-sso-platforms-compared-authgear-vs-keycloak-vs-authentik)
- Comparisons: [Keycloak vs Auth0](/post/keycloak-vs-auth0), [Keycloak vs Okta](/post/keycloak-vs-okta) and [Keycloak vs Zitadel](/post/keycloak-vs-zitadel)
- [Best open source identity providers in 2026](/post/best-open-source-identity-providers)
- [Authgear as a Keycloak alternative](/compare/keycloak-alternative)

## Frequently Asked Questions

### Is there an official managed Keycloak service?

No. The Keycloak project, a CNCF incubation project, publishes the software but does not run a hosted service. Managed Keycloak comes from third parties such as Cloud-IAM, Phase Two and Skycloak. Red Hat build of Keycloak is supported software that you install and run yourself.

### What is Keycloak as a service?

It usually means a third-party company runs Keycloak for you: it hosts the servers and database, applies upgrades and security patches, takes backups and monitors uptime. You still configure realms, clients, themes and extensions, because it is still Keycloak.

### Does Red Hat host Keycloak for you?

No. Red Hat build of Keycloak is supported by Red Hat but installed and operated by you, including when it runs on Red Hat's managed OpenShift services. Red Hat's own knowledge base describes it there as customer-installed software that Red Hat does not operate.

### Can I host Keycloak in a UK or EU region?

Yes, if you run it yourself you can use any UK or EU data centre. The third-party hosts we checked all offer EU hosting. None of them listed a UK region by name on the pages we checked in October 2026, so ask for one directly if you need it.

### Can I leave a managed Keycloak provider later?

Usually, yes. Keycloak can export realms, clients and users to JSON files, and the hosts we checked describe exports or self-hosting as a way out. Plan for custom themes and extensions, which you will need to bring with you and test on your new setup.

### What is the difference between managed Keycloak and a private cloud?

Managed Keycloak is usually a hosted instance of Keycloak run by a company that didn't build it. A private cloud is a dedicated deployment that the vendor of the product runs for you in a region you choose, so the people who operate it also write the code.

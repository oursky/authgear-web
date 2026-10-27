---
title: "Keycloak Pricing: What It Really Costs to Run Keycloak"
excerpt: "Keycloak is free to download, but not free to run. A simple cost model you can fill in, an illustrative worked example, and how support, Red Hat build of Keycloak, third-party hosting and a vendor-run private cloud change the numbers."
coverImage: ./cover.webp
publishedAt: 2026-10-23
metaTitle: "Keycloak Pricing: What It Really Costs to Run Keycloak"
metaDescription: "Is Keycloak free? The licence is, but running it isn't. A fill-in cost model covering infrastructure, upgrades, themes, on-call, support and hosting options."
category: industry
readTime: 9
draft: false
faq:
  - q: "Is Keycloak free?"
    a: "Yes. Keycloak is open source under the Apache-2.0 licence, with no licence fee and no paid feature tier. What costs money is running it: servers and a database, the engineering time for upgrades and customisation, on-call cover, and support if you want someone to call."
  - q: "How much does Keycloak cost per month?"
    a: "There is no single figure, because the licence is free and the cost depends on your setup. Third-party hosting is priced per month by plan. Self-hosting costs your infrastructure plus your team's time, which for most teams is the larger part. Use the cost model in this article with your own numbers."
  - q: "Does Keycloak have paid support?"
    a: "The Keycloak project offers community support only. Paid support comes from Red Hat for its build of Keycloak, included in subscriptions such as Red Hat Runtimes and OpenShift Container Platform, and from third-party companies such as Phase Two, Cloud-IAM and Skycloak."
  - q: "Can I buy Red Hat build of Keycloak on its own?"
    a: "No. According to Red Hat's knowledge base, Red Hat build of Keycloak is not sold as a separate product. The entitlement is included in Red Hat Runtimes, Red Hat OpenShift Container Platform and bundles that include them, such as Red Hat Application Foundations."
  - q: "Is managed Keycloak cheaper than self-hosting?"
    a: "It can be, once you count your team's time. A hosting plan replaces infrastructure work, upgrades and much of the on-call burden. You still maintain your own themes and extensions, so compare the plan price against the people cost it removes, not against server costs alone."
  - q: "What is the cheapest way to run Keycloak?"
    a: "Self-hosting with stock themes, few or no custom extensions, and staying close to the latest release. Every custom theme and extension adds work at each upgrade, and falling several versions behind makes the next upgrade bigger and riskier."
---

> **tl;dr:** Keycloak's licence is free (Apache-2.0). The cost of Keycloak is running it: infrastructure, upgrades, theme and extension upkeep, on-call cover and support. For most teams the people time is bigger than the server bill. Use the model below with your own numbers.

"Keycloak pricing" is a slightly odd search, because Keycloak has no price list. It is open source, and there is no paid edition hiding the good features. But teams that run it in production know it isn't free. The cost has moved from a licence to your infrastructure and your engineers.

This guide breaks that cost into lines you can estimate, works through an example, and compares the ways to pay someone else to carry some of it. We build Authgear, an open source alternative, so we've tried to keep the numbers neutral and to show our assumptions.

## Is Keycloak free?

Yes, in the sense that matters for licensing:

- Keycloak is open source under [Apache-2.0](https://github.com/keycloak/keycloak). You can use it commercially, modify it and run it anywhere without paying anyone.
- There is no "enterprise edition" of Keycloak with extra features. The project is a [CNCF incubation project](https://www.keycloak.org/), not a company selling licences.
- Paid offerings exist around it: Red Hat's supported build, third-party hosting, and support contracts. None of them are required.

So Keycloak is free to get. The rest of this article is about what it costs to keep.

## Where the money goes

These are the cost lines for a production Keycloak deployment, and what pushes each one up or down. Fill in the right-hand column for your own setup.

| Cost line | What drives it | Your estimate |
|---|---|---|
| **Compute** | Number of pods, logins per second, sessions kept in memory | |
| **Database** | Managed PostgreSQL size, high availability, storage, backups | |
| **Networking** | Load balancer, TLS certificates, egress, a second site for failover | |
| **Monitoring and logs** | Metrics, log retention, alerting tools | |
| **Upgrades and patching** | Release frequency, number of environments, how far behind you are | |
| **Theme and extension upkeep** | Number of custom login themes and Java extensions (SPIs) | |
| **On-call** | Your uptime target, whether login is customer-facing, your rota | |
| **Day-to-day admin** | New clients and realms, identity provider set-up, user issues | |
| **Support** | Community only, a Red Hat subscription, or a third-party contract | |
| **Security reviews** | Penetration tests, audits, customer security questionnaires | |

A few of these deserve a closer look.

### Infrastructure

Keycloak publishes a [sizing guide](https://www.keycloak.org/high-availability/multi-cluster/concepts-memory-and-cpu-sizing). Its starting points:

- About 1,250 MB of RAM per pod, including realm caches and 10,000 cached sessions.
- One vCPU for every 15 password logins per second.
- One vCPU for every 120 client credential grants or refresh token requests per second.
- 150% extra CPU headroom for spikes.

Password hashing is what makes logins CPU-heavy, so a burst of logins on a Monday morning costs more than steady token refreshes. For most business apps, infrastructure is the smaller part of the bill.

### Upgrades

Keycloak plans [four minor releases a year](https://www.keycloak.org/2024/10/release-updates) and a major release every two to three years, with patch releases in between. The community project doesn't publish a long-term support window, so staying current is the safe path. Each upgrade means reading the [upgrade notes](https://www.keycloak.org/docs/latest/upgrading/index.html), testing in a staging environment and rolling out. Our [Keycloak upgrade guide](/post/keycloak-upgrade-guide) walks through it.

### Themes and extensions

This is the line teams most often leave out. Custom login pages in Keycloak are FreeMarker themes, and custom logic is Java Service Provider Interfaces (SPIs) packaged as JARs. Features many teams need, such as SMS one-time codes or magic links, come from community extensions. The upgrade notes regularly ask you to re-test custom themes and extensions; the 26.8 notes, for example, ask you to check identity provider buttons in custom login themes. The more you customise, the more each upgrade costs. Our [Keycloak custom login page](/post/keycloak-custom-login-page) guide shows how to keep a theme thin.

### On-call

If customers log in through Keycloak, an outage stops your product. Someone needs to be reachable, and they need to know Keycloak well enough to fix it at 3am. Rota allowances and the cost of keeping that knowledge in more than one head both belong here.

## A worked example

This is an **illustrative example built on stated assumptions, not a benchmark**. Your numbers will differ. Swap in your own.

**The scenario:** a B2B SaaS company with one production realm, a staging environment, a custom login theme and two custom extensions. Logins are customer-facing.

**Assumptions:**

- Infrastructure: three Keycloak pods, managed PostgreSQL with a standby, a load balancer, and monitoring, across production and staging. Assume **£600 a month**.
- People: Keycloak takes **0.25 of an engineer**, about 55 working days a year.
- Fully loaded cost of that engineer: assume **£90,000 a year**.
- Support: community only.

How the 55 days might split:

| Activity | Assumed days a year |
|---|---|
| Four minor upgrades plus patch releases, including staging tests | 16 |
| Theme and extension fixes after upgrades | 10 |
| Incidents and on-call | 15 |
| Day-to-day admin: new clients, identity providers, user issues | 14 |
| **Total** | **55** |

**Annual cost under these assumptions:**

| Line | Annual cost |
|---|---|
| Infrastructure (£600 × 12) | £7,200 |
| People (0.25 × £90,000) | £22,500 |
| Support | £0 |
| **Total** | **£29,700**, about £2,475 a month |

In this example, people cost three times as much as the servers. Add paid support, a second region or more custom code, and the total rises from there.

## Keycloak support: your options

The Keycloak project offers community support through its forum, mailing lists and GitHub. It's active and helpful, but nobody is obliged to answer by a deadline. For a guaranteed response you have three routes.

### Red Hat build of Keycloak

Red Hat sells a supported build of Keycloak with a published [life cycle](https://access.redhat.com/node/7092877). According to [Red Hat's knowledge base](https://access.redhat.com/articles/7044244):

- The entitlement is included in Red Hat Runtimes and Red Hat OpenShift Container Platform subscriptions, and in bundles that include them, such as Red Hat Application Foundations.
- It is not sold as a separate product.
- It is not included in OpenShift Kubernetes Engine.
- You install and run it yourself, including on Red Hat's managed OpenShift services.

So Red Hat support reduces your risk but not your workload. If you already pay for OpenShift, you may be entitled already.

### Third-party support and hosting

Several companies host Keycloak for you or support your own deployment. Their public entry prices, checked on 23 October 2026:

| Provider | What it sells | Lowest published paid plan |
|---|---|---|
| [Cloud-IAM](https://www.cloud-iam.com/pricing/) | Managed Keycloak, hosted in Europe | Starter, from €225 a month |
| [Phase Two](https://phasetwo.io/pricing/hosting/) | Keycloak hosting, plus enterprise support for self-hosted Keycloak | Starter, $149 a month |
| [Skycloak](https://skycloak.io/pricing/) | Managed Keycloak | Developer, $29 a month |

Entry plans differ a lot in what they include, especially uptime SLAs, support response times and whether custom themes and extensions are allowed. Higher plans add those, and prices rise steeply with them. Compare like with like, and check the pricing pages, since they change.

A hosting plan removes most of the infrastructure, upgrade and on-call lines from the model above. It doesn't remove theme and extension upkeep, because your custom code is still yours. For a fuller comparison of hosting routes, see [managed Keycloak vs a private cloud](/post/managed-keycloak-vs-private-cloud).

## The other route: a vendor-run private cloud

Some teams look at the model above and decide the expensive part isn't Keycloak's servers but the customisation they've built around it. For them, the question becomes whether a different product would need less of it.

[Authgear](/compare/keycloak-alternative) is one such option. It is open source under Apache-2.0 and free to self-host, with every feature in the self-hosted version. Its login UI and modern login methods are built in, and login pages are customised with CSS and HTML rather than theme JARs. If you'd rather not run it at all, we run a private cloud for you in the region you choose, including the UK and the EU. Private cloud and Enterprise support for self-hosted deployments are priced by quote, so contact sales for numbers.

Whatever you choose, compare total cost, not licence cost. A free licence with a quarter of an engineer attached can cost more than a contract, and the reverse is also true.

## How to keep Keycloak costs down

If Keycloak is the right fit, these habits keep the bill small:

- **Customise less.** Stick to the default theme with CSS tweaks where you can. Every custom template and SPI adds upgrade work.
- **Upgrade often.** Small, regular upgrades are cheaper than a big jump across several versions.
- **Automate the boring parts.** Use the Kubernetes Operator, keep realm configuration in version control, and test upgrades in a pipeline.
- **Keep knowledge in more than one head.** A single Keycloak expert is a cost risk when they go on holiday or leave.
- **Check what you already pay for.** An existing Red Hat subscription may already include Keycloak support.

## Further reading

- [Managed Keycloak vs a private cloud: what you actually get](/post/managed-keycloak-vs-private-cloud)
- [Authentik vs Keycloak: self-hosted SSO compared](/post/best-self-hosted-sso-platforms-compared-authgear-vs-keycloak-vs-authentik)
- Comparisons: [Keycloak vs Auth0](/post/keycloak-vs-auth0), [Keycloak vs Okta](/post/keycloak-vs-okta) and [Keycloak vs Zitadel](/post/keycloak-vs-zitadel)
- [Best open source identity providers in 2026](/post/best-open-source-identity-providers)
- [Data sovereignty for login and identity](/solutions/data-sovereignty)

## Frequently Asked Questions

### Is Keycloak free?

Yes. Keycloak is open source under the Apache-2.0 licence, with no licence fee and no paid feature tier. What costs money is running it: servers and a database, the engineering time for upgrades and customisation, on-call cover, and support if you want someone to call.

### How much does Keycloak cost per month?

There is no single figure, because the licence is free and the cost depends on your setup. Third-party hosting is priced per month by plan. Self-hosting costs your infrastructure plus your team's time, which for most teams is the larger part. Use the cost model in this article with your own numbers.

### Does Keycloak have paid support?

The Keycloak project offers community support only. Paid support comes from Red Hat for its build of Keycloak, included in subscriptions such as Red Hat Runtimes and OpenShift Container Platform, and from third-party companies such as Phase Two, Cloud-IAM and Skycloak.

### Can I buy Red Hat build of Keycloak on its own?

No. According to Red Hat's knowledge base, Red Hat build of Keycloak is not sold as a separate product. The entitlement is included in Red Hat Runtimes, Red Hat OpenShift Container Platform and bundles that include them, such as Red Hat Application Foundations.

### Is managed Keycloak cheaper than self-hosting?

It can be, once you count your team's time. A hosting plan replaces infrastructure work, upgrades and much of the on-call burden. You still maintain your own themes and extensions, so compare the plan price against the people cost it removes, not against server costs alone.

### What is the cheapest way to run Keycloak?

Self-hosting with stock themes, few or no custom extensions, and staying close to the latest release. Every custom theme and extension adds work at each upgrade, and falling several versions behind makes the next upgrade bigger and riskier.

---
title: "SCIM vs SAML: What's the Difference and When to Use Each"
excerpt: "SAML logs your users in. SCIM creates and manages their accounts. Learn how the two protocols divide the work in enterprise SSO, where they overlap, and why most deployments need both."
coverImage: ./cover.webp
category: engineering
featured: false
metaTitle: "SCIM vs SAML: What's the Difference? | Authgear"
metaDescription: "SAML handles authentication (login); SCIM handles provisioning (account lifecycle). See how they differ, how they work together, and when you need each."
publishedAt: 2026-06-03T00:00:00.000Z
draft: false
faq:
  - q: "Is SCIM the same as SAML?"
    a: "No. SAML is an authentication protocol — it verifies who a user is at login and enables single sign-on. SCIM is a provisioning protocol — it creates, updates, and deactivates user accounts between systems. They solve different problems and are usually deployed together."
  - q: "Do I need SCIM if I already have SAML?"
    a: "Often, yes. SAML gets users through the door, but it doesn't remove their accounts when they leave the company, keep profile attributes in sync, or pre-create accounts before first login. If your enterprise customers ask about automated offboarding or directory sync, they are asking for SCIM."
  - q: "Can SCIM work without SSO?"
    a: "Technically yes — SCIM only moves identity data, so you could provision accounts that authenticate with passwords. In practice, almost every SCIM deployment sits alongside SAML or OIDC single sign-on, because the same enterprises that need automated provisioning also require SSO."
  - q: "Does SAML create user accounts?"
    a: "Only in a limited way. Some applications support just-in-time (JIT) provisioning, creating an account from SAML assertion attributes the first time a user logs in. JIT cannot update accounts that don't log in or deactivate users who leave — that is what SCIM is for."
  - q: "Is SCIM replacing SAML?"
    a: "No — they aren't competitors. If anything is replacing SAML, it is OIDC for the authentication layer. SCIM remains the standard for provisioning regardless of which authentication protocol you choose."
---

> **tl;dr** — SAML and SCIM solve different halves of enterprise identity. **SAML authenticates**: it lets users sign in once with their company credentials (SSO). **SCIM provisions**: it creates, updates, and deactivates user accounts automatically as people join, move, and leave. Most enterprise deployments need both — SAML (or OIDC) for the login, SCIM for the account lifecycle around it.

## SCIM vs SAML at a glance

<div class="ag-table-wrap"><table class="ag-table"><thead><tr><th></th><th>SAML</th><th>SCIM</th></tr></thead><tbody><tr><td>What it does</td><td>Authentication — verifies identity at login (SSO)</td><td>Provisioning — manages account lifecycle</td></tr><tr><td>Question it answers</td><td>"Can this person sign in right now?"</td><td>"Does this person's account exist, and is it correct?"</td></tr><tr><td>When it runs</td><td>At every login</td><td>Continuously, in the background</td></tr><tr><td>Data format</td><td>XML assertions</td><td>JSON over REST</td></tr><tr><td>Triggered by</td><td>A user trying to access an app</td><td>HR/directory changes (join, move, leave)</td></tr><tr><td>Standard</td><td>SAML 2.0 (OASIS, 2005)</td><td>SCIM 2.0 (RFC 7643/7644, 2015)</td></tr><tr><td>Typical pairing</td><td>Works with SCIM for provisioning</td><td>Works with SAML or OIDC for login</td></tr></tbody></table></div>

## The two halves of enterprise identity

Think of an office building. **SAML is the badge reader at the door** — every time someone arrives, it checks their badge and lets them in. **SCIM is the facilities team** — it issues badges to new hires before their first day, updates the name on the badge when someone changes roles, and deactivates the badge the moment someone leaves.

A badge reader without a facilities team fails slowly: new employees show up with no badge, and ex-employees keep theirs. A facilities team without a badge reader fails immediately: there's nothing checking anyone at the door. Enterprises need both, which is why "SCIM vs SAML" is usually the wrong framing — the real question is how they divide the work.

## What SAML does

Security Assertion Markup Language (SAML) is an XML-based protocol for exchanging authentication data between an **identity provider** (IdP — e.g. Okta, Microsoft Entra ID) and a **service provider** (SP — your application).

When a user opens your app, the app redirects them to their company IdP. The IdP authenticates them (password, MFA, passkey — its choice) and sends back a signed XML **assertion**: "this is alice@example.com, authenticated at 09:14, member of group Engineering." Your app validates the signature and starts a session.

SAML's job ends there. It says nothing about what happens to Alice's account next week — it only vouches for her at the moment of login. For a deeper look at SAML's roles and message format, see [SAML providers: IdP vs SP roles explained](/post/saml-providers-idp-vs-sp-roles-explained).

## What SCIM does

System for Cross-domain Identity Management (SCIM) is a REST + JSON protocol for synchronizing identity data. Your application exposes SCIM endpoints (`/scim/v2/Users`, `/scim/v2/Groups`), and the IdP calls them whenever something changes in the company directory:

- A new hire is assigned the app → `POST /Users` creates the account before their first login
- Someone changes department → `PATCH /Users/{id}` updates their attributes
- Group membership changes → group sync updates their role in your app
- Someone leaves → `PATCH /Users/{id}` sets `active: false`, and your app revokes sessions and tokens

That last one is the security-critical step. Without SCIM, offboarding depends on someone remembering to remove the user from every app — and orphaned accounts are one of the most common findings in enterprise security audits.

For the full mechanics — endpoints, schemas, provisioning flows, and implementation pitfalls — see our guide to [SCIM provisioning](/post/what-is-scim-provisioning).

## Where people get confused: JIT provisioning

SAML can *appear* to do provisioning. Many apps support **just-in-time (JIT) provisioning**: when a user logs in via SAML for the first time, the app creates an account on the fly from the assertion's attributes.

JIT is genuinely useful for smaller deployments, but it has hard limits:

- **No pre-provisioning** — the account doesn't exist until first login, so you can't set up workspaces, permissions, or licenses ahead of day one
- **No updates without login** — if a user never signs in again, their attributes go stale
- **No offboarding** — JIT can create accounts but never deactivates them; a departed employee's account lingers until someone notices

If a prospect asks "do you support JIT?", they want easy account creation. If they ask "do you support SCIM?", they almost always care about **deprovisioning and directory sync** — requirements JIT cannot meet.

## How SAML and SCIM work together

A typical enterprise integration uses three layers:

1. **SCIM** keeps accounts in sync: created on hire, updated on change, deactivated on exit
2. **SAML (or OIDC)** authenticates users at each login
3. **Groups/roles from SCIM** drive authorization inside the app

The protocols even reference the same identifiers: the `userName` or `externalId` that SCIM provisions is what the SAML assertion's subject must match at login. A stable, shared identifier across both protocols is the single most important design decision in the integration — mismatches are the top cause of duplicate accounts.

> 💡 **Choosing an authentication protocol too?** SAML isn't the only option for the login half — modern apps often pair SCIM with OIDC instead. See [OIDC vs SAML: when to use each](/post/oidc-vs-saml).

## When you need which

<div class="ag-table-wrap"><table class="ag-table"><thead><tr><th>Scenario</th><th>What you need</th></tr></thead><tbody><tr><td>Enterprise customers want single sign-on</td><td>SAML (or OIDC)</td></tr><tr><td>Customers ask for automated onboarding/offboarding</td><td>SCIM</td></tr><tr><td>Security review flags orphaned accounts</td><td>SCIM</td></tr><tr><td>Accounts should exist before first login</td><td>SCIM</td></tr><tr><td>Small team, accounts on first login is fine</td><td>SAML/OIDC + JIT</td></tr><tr><td>Selling to mid-size and large enterprises</td><td>Both</td></tr></tbody></table></div>

The pattern in practice: SSO (SAML/OIDC) is the first enterprise requirement you'll hit, usually at the 50–500 employee customer size. SCIM follows as your customers' IT teams mature — it's a standard line item in enterprise security questionnaires.

## Implementing both without building both

Building a SAML SP, an OIDC RP, and a SCIM server from scratch is months of protocol work — XML signature validation, SCIM PATCH semantics, and group-sync edge cases are all notorious time sinks. An authentication platform like [Authgear](/) provides SAML, OIDC, and enterprise directory integration behind a single API, so your app implements one integration and inherits the full enterprise identity stack.

## Frequently Asked Questions

### Is SCIM the same as SAML?

No. SAML is an authentication protocol — it verifies who a user is at login and enables single sign-on. SCIM is a provisioning protocol — it creates, updates, and deactivates user accounts between systems. They solve different problems and are usually deployed together.

### Do I need SCIM if I already have SAML?

Often, yes. SAML gets users through the door, but it doesn't remove their accounts when they leave the company, keep profile attributes in sync, or pre-create accounts before first login. If your enterprise customers ask about automated offboarding or directory sync, they are asking for SCIM.

### Can SCIM work without SSO?

Technically yes — SCIM only moves identity data, so you could provision accounts that authenticate with passwords. In practice, almost every SCIM deployment sits alongside SAML or OIDC single sign-on, because the same enterprises that need automated provisioning also require SSO.

### Does SAML create user accounts?

Only in a limited way. Some applications support just-in-time (JIT) provisioning, creating an account from SAML assertion attributes the first time a user logs in. JIT cannot update accounts that don't log in or deactivate users who leave — that is what SCIM is for.

### Is SCIM replacing SAML?

No — they aren't competitors. If anything is replacing SAML, it is OIDC for the authentication layer. SCIM remains the standard for provisioning regardless of which authentication protocol you choose.

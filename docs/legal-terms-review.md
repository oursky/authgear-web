# Legal Terms Review — Fairness + Risk-Minimization Pass

**Last reviewed:** 2026-05-29 (refined against FormX.ai's terms + DPA)
**Status:** Drafts pending qualified-counsel review. **Do not deploy to `live` without sign-off.**

## How to read this

This document is the durable record explaining *why* each change was made to `src/pages/terms.astro` (Standard SaaS Terms, SkyMakers Digital Ltd, UK) and `src/pages/terms-of-enterprise-license.astro` (Enterprise/self-host, Oursky Ltd, HK), and why the new `/dpa` page exists. The redlines themselves live in the `.astro` files. Findings tables below identify what was broken before; the "Counsel review checklist" at the end calls out the highest-stakes clauses where outside-counsel sign-off is mandatory.

These drafts were prepared with model assistance for legal counsel to review and harden. They are **not** finished legalese.

---

## Findings

### A. Critical risk exposure (Authgear-side)

| # | Where | Issue | Risk |
|---|---|---|---|
| A1 | `terms.astro` §12 | **No monetary cap on liability.** §12.1 excluded indirect/consequential damages but left **direct** damages uncapped. For a CIAM provider, a single breach incident could expose direct damages with no ceiling. | High |
| A2 | `terms.astro` (missing) | **No "no high-risk use" prohibition.** Enterprise Terms §2.1 banned use in hospitals, power plants, etc. — Standard Terms had no equivalent. An incident in a free/SaaS tier of a regulated use case would be uncapped (see A1) and indefensible. | High |
| A3 | Both documents | **No DPA / GDPR Art. 28 processor clauses.** Authgear processes End User PII (auth identifiers, credentials, MFA factors). Enterprise Terms §11 mentioned GDPR superficially; Standard Terms was silent. EU customers could not lawfully use the service without one. | High |
| A4 | `terms-of-enterprise-license.astro` §4.4 | **Oursky's IP infringement indemnity had no cap.** Standard practice is to cap at fees paid or use a separate sub-cap. | Medium-High |
| A5 | Both | **No clause governing AI/ML training on customer data.** Modern enterprise procurement requires an explicit statement. | Medium (rising) |
| A6 | `terms.astro` §17.7 | English law specified, **but no forum/jurisdiction clause.** Plaintiffs could attempt to sue in any jurisdiction. | Medium |
| A7 | `terms.astro` §5 | "Content" definition lumped End User auth data with general user content. Disclaimers in §5.4–5.5 may not have survived scrutiny when the "Content" was the exact data the CIAM service is paid to safeguard. | Medium |
| A8 | `terms.astro` (missing) | **No sub-processor / data location commitments.** Enterprise customers will require this before signing. | Medium |

### B. Customer-unfair clauses (would hurt enterprise sales / not survive UK/EU consumer-protection review)

| # | Where | Issue |
|---|---|---|
| B1 | `terms.astro` §10.3 | "Authgear may terminate **for any or no reason, without prior notice**." Acceptable for free tier; toxic for paying customers. |
| B2 | `terms.astro` §16.1 | Only **7 days' notice** of substantive Terms changes. UK consumer norm is 30 days. |
| ~~B3~~ | ~~`terms.astro` §8.4~~ | ~~Authgear may use customer logos in marketing without consent.~~ Per business direction: left as-is; enterprises that object will negotiate this in a separate MSA. |
| B4 | `terms.astro` §10.4 | Data export window only "reasonable opportunity" — not defined. Addressed indirectly via 90-day termination notice in updated §10.3. |
| B5 | `terms.astro` §13 | **One-way indemnity** (customer only). For paid tiers, customers expect mutual IP indemnity at minimum. |
| B6 | `terms-of-enterprise-license.astro` §4.3 | Customer's content-indemnity to Oursky was uncapped. |
| B7 | Both | No clear distinction between **free-tier** vs **paid** rights. |

### C. Inconsistencies between the two documents

| # | Issue |
|---|---|
| C1 | Different legal entities (SkyMakers UK vs Oursky HK). Per business direction, this is intentional — kept as-is, with each document explicitly identifying its contracting entity. |
| C2 | Different governing law (England & Wales vs Hong Kong). Acceptable given different entities. |
| C3 | `terms-of-enterprise-license.astro` §1.1 grants **self-hosting + modification rights** — confirmed to align with Enterprise Edition business model. |
| C4 | Liability cap structure now analogous across both documents. |

### D. Smaller cleanup items

- `terms.astro` §4.1: link read `http://authgear.io/pricing` while text said `https://authgear.com/pricing`. **Fixed.**
- `terms.astro` §1.3: under-13 floor is fine for contract capacity (not a data-protection clause). Left as-is.
- `terms.astro` §14: DMCA-only — EU/UK takedown counterpart added.
- `terms.astro` §2.4: "as further explained here" orphan link — per business direction, left as-is.

---

## Operational verification — prerequisite before counsel review

Several proposed clauses are **factual representations**, not aspirational. Confirm each with engineering / security / finance before counsel sign-off:

1. **AI/ML training** — does any current pipeline (analytics, anti-fraud, support automation, internal tooling) consume Customer Content or End User Personal Data in a way that could be characterized as model training or fine-tuning? If yes, scope the §19 / §13 clause accordingly. If no, the unqualified version stands.
2. ~~Sub-processor list~~ — **Resolved (2026-05-29).** Concrete list now published at `/sub-processors` and named inline in DPA §6.2: Google Cloud Platform, Postmark, Stripe, Sentry, PostHog, Google Analytics / GTM. Customer-configured integrations (Twilio, Nexmo, WhatsApp, reCAPTCHA, Turnstile, customer cloud storage) split out as non-sub-processors. Source-of-truth review done against `authgear-server` codebase.
3. ~~Insurance coverage~~ — N/A (no insurance clause added per business direction).
4. ~~Sub-processor change notice mechanism~~ — **Resolved (2026-05-29).** Publication on `/sub-processors` page + opt-in email subscription via `hello@authgear.com`. DPA §6.3 updated.
5. **Data-breach notification capability** — confirm ≤72-hour breach notification (per the DPA draft) is operationally achievable.
6. **Data return/deletion on termination** — confirm the 60-day deletion window and the 90-day backup-rotation cap in DPA §12 align with current backup retention and tenant-offboarding tooling.
7. **ISO/IEC 27001 + SOC 2 Type II status** — DPA §5.1 and §11.1 state these are currently held (matching the footer compliance line). Verify both certifications are in force and obtain current attestation reports before responding to enterprise audit requests.

The clauses for items 1, 2, 4, 5, 6 are drafted with bracketed `[TBD]` placeholders where the factual answer must be filled in before publishing.

---

## Portal click-through reconciliation

The marketing-site `/terms` is reference copy. The legally operative click-through is whatever the **Authgear Portal** (`portal.authgear.com`) presents at signup. After counsel approves this language, someone (product/legal) must confirm the portal either:

- Renders/embeds the updated `/terms` URL from this site, **or**
- Has its own click-through copy that mirrors the approved language.

If the portal hosts a divergent copy, the work in this iteration updates marketing copy only and does not bind new customers. **This is a required follow-up action item before the new Terms take legal effect.**

---

## Recommended counsel review checklist

Items below carry the highest legal/financial weight. Each needs explicit counsel sign-off.

- [ ] **Standard Terms §11/§12 liability cap formulation** (greater of 12-month fees or USD $100; carve-outs list). Confirm enforceable under English law for the customer populations targeted.
- [ ] **Standard Terms §13 mutual IP indemnity** — scope, carve-outs, sole-remedy mechanic.
- [ ] **Standard Terms §10.3 termination** — 90-day notice for paid + immediate triggers (AUP, illegal use, security incident, law/regulator).
- [ ] **Standard Terms §17.7 governing law + forum** — England & Wales (courts of London) — confirm exclusive vs. non-exclusive.
- [ ] **Standard Terms §19 AI/ML** — confirm factual basis (no training on customer data today, or scoped exceptions).
- [ ] **Standard Terms §22 auto-renewal** — alignment with portal billing flow and Chatel/BGB notice requirements.
- [ ] **Standard Terms §23 dispute resolution** — pre-litigation negotiation step, mediation option.
- [ ] **Enterprise §4.3 customer indemnity** — procedural + cap.
- [ ] **Enterprise §4.4 Oursky IP indemnity** — sole remedy + cap to §9.
- [ ] **Enterprise §9 liability cap** — mutual application, §1.1/§2.1 carve-out direction.
- [ ] **Enterprise §10 governing law + forum** — HKSAR courts.
- [ ] **DPA full document** — GDPR Art. 28 sufficiency, SCC/IDTA references, sub-processor mechanism, breach-notification SLA, CCPA stub.
- [ ] **Both: high-risk-use prohibition** — wording sufficiency for industry-specific liability defense.

## Out of scope (deferred)

- Privacy Policy (`/policy`) and Cookie Policy (`/data-privacy`) substantive review — only touched for cross-link consistency.
- SLA contractual integration — `/sla` exists as a marketing page; making it contractually binding is a separate decision.
- Portal-side click-through (lives outside this repo).
- Drafting an MSA template for Enterprise — different work product, typically Word/PDF.

---

## DPA alignment pass (2026-05-31)

A second pass aligned the Authgear DPA with the FormX DPA (`formx.ai/src/content/legal/data-processing-agreement.md`), in the same spirit as the original ToS alignment: same skeleton across both, with deliberate divergence only where product nature forces it. The pass also softened the EU-GDPR-as-master framing and added named coverage for additional jurisdictions (notably Hong Kong PDPO).

### Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Annex strategy | Both DPAs adopt FormX-style Annexes A (Details of Processing), B (Approved Sub-processors), C (Security Measures). Authgear's Annex C is a summary list with full description on the `/security` page; FormX's Annex C remains inline. | Provides a clean SCC Annex I/II/III hook. Was missing in Authgear. |
| §16 restructure | Renamed "CCPA and US State Privacy Laws" → "Regional Provisions" with sub-sections 16.1 EEA/UK/CH, 16.2 CCPA, 16.3 other US states, 16.4 Hong Kong PDPO, 16.5 other jurisdictions (LGPD, PIPEDA, APP, PDPA-SG, APPI, DPDPA). | EU/UK procurement gets a single landing; APAC/LATAM enterprise gets explicit comfort. |
| HK PDPO callout | New §16.4 in both DPAs, naming Schedule 1 DPP4 and DPP5. | SkyMakers (UK) and Oursky (HK) both serve HK customers in practice; PDPO was absent. |
| AI/ML training clause | **FormX only.** Retained in FormX Annex C ("No Personal Data is used to train AI models without explicit customer consent"). Not added to Authgear — out of scope by decision; authentication data is not consumed by any model-training pipeline today. | Avoids performative parity; preserves real product difference. |
| Sub-processor objection window | Aligned to 30-day notice period + 14-day good-faith resolution (FormX phrasing). Sole remedy is termination of the affected Services; **no refund** of prepaid Fees on objection-based termination. | Matches SCC Clause 9 norms on notice/objection. No-refund position preserves FormX's original stance and avoids creating a financial-recovery vector tied solely to a Sub-processor change. |
| Audit notice | Aligned to 30 days (FormX). | Industry standard; 60 days was unusually long. |
| Survival clause | Added §15.3 to Authgear, mirroring FormX. | Closed a real gap. |
| SCC customization clauses | Added §7.1(a)–(g) to Authgear (clauses 7/9/11/17/18, docking, annex mapping). | Authgear previously left these implicit. |
| SCC/IDTA precedence | New §7.4 in Authgear, mirroring FormX. | Cleaner than the prior reliance on §15.1. |
| Definitions order | Both adopt the same 12-term ordering. Authgear retains "End User Personal Data" as its one product-driven definitional divergence. | Equal footing across the two documents while preserving Authgear's "we process *your end users'* data" frame. |
| EU-master framing | Softened §1 intro ("with equivalent meanings under…as the context requires") and §3.1 ("international transfers of Personal Data" replaces the EEA/UK/CH list). | De-privileges EU GDPR without removing it; gives APAC/LATAM customers a parity-of-treatment read. |

### Preserve, do not align (product/legal reality)

Future editors must not flatten these:

- **Contracting entity.** Authgear DPA covers both SkyMakers Digital Ltd (Standard SaaS) and Oursky Ltd (Enterprise Edition); FormX DPA covers only SkyMakers.
- **Services definition.** Authgear = authentication/identity; FormX = document data extraction.
- **Annex A processing details.** Schema shared; cell values diverge by product (auth factors vs. document content).
- **Annex B sub-processor lists.** Authgear has Google Analytics/GTM as a sub-processor; FormX has Microsoft Azure (AI inference) and uses Plausible (listed under "Other Vendors", not Article 28). Customer-configured integrations also differ (SMTP/SMS/WhatsApp/IdPs vs. webhooks/cloud storage/OAuth source connectors).
- **Annex C "Data Minimisation" sub-section.** FormX-only AI training opt-in language; Authgear has a parallel but narrower statement that no End User Personal Data trains ML models.
- **Governing law.** Authgear inherits from the underlying agreement (England & Wales for SkyMakers; Hong Kong SAR for Oursky); FormX names England & Wales directly.
- **"End User Personal Data" terminology.** Authgear's framing throughout; FormX uses plain "Personal Data". The single definitional divergence the alignment retains.

### Counsel-review checklist additions

- [ ] Hong Kong PDPO §16.4 wording sufficiency under DPP4/DPP5 (both DPAs)
- [ ] §16.5 "substantially equivalent obligations" catch-all — enforceability per region (LGPD and DPDPA in particular have explicit-terms requirements that may not be fully satisfied by reference alone)
- [ ] Authgear Annex C summary list — confirm consistency with current `/security` page contents
- [ ] Authgear §7.1(a)–(g) SCC customization adoption — verify Ireland law / Irish courts choice is consistent with target customer base
- [ ] "End User Personal Data" definitional divergence — confirm retention vs. unifying to plain "Personal Data"
- [ ] Authgear §11.2 audit notice reduced from 60 to 30 days — confirm operationally achievable
- [ ] FormX §9.1 trigger switched from "Security Incident" to "Personal Data Breach" — confirm internal incident-classification process maps cleanly
- [ ] Both: PDPO §16.4 wording leans on "data processor" as a defined PDPO concept — confirm that's the right framing (PDPO does not formally use the controller/processor distinction; it uses "data user" and contracts via DPP4(2)). May need adjustment.

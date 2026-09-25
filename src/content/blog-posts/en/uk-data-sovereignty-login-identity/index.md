---
title: "UK Data Sovereignty for Login and Identity Data (2026 Guide)"
excerpt: "What UK data sovereignty means for your login system: where user data sits, who runs the system, and whose law applies, from UK GDPR and the Data (Use and Access) Act 2025 to the US CLOUD Act. With a checklist for choosing an auth provider."
coverImage: ./cover.webp
publishedAt: 2026-09-25
metaTitle: "UK Data Sovereignty for Login and Identity (2026 Guide)"
metaDescription: "UK data sovereignty for login systems: where user data sits, who runs it, whose law applies. UK GDPR, data residency, the CLOUD Act and a vendor checklist."
category: industry
readTime: 9
draft: false
faq:
  - q: "What is data sovereignty in the UK?"
    a: "It is the idea that data is governed by the laws of the place it is held, and by the laws that apply to whoever controls it. For a UK company it means knowing where personal data is stored, who can reach it, and whether a foreign law could force it to be handed over."
  - q: "What is the difference between data residency and data sovereignty?"
    a: "Data residency is about location: which country the servers are in. Data sovereignty is wider. It also asks who operates the system and which country's law applies to that operator. Data can be resident in the UK and still be reachable under another country's law."
  - q: "Is a UK cloud region enough for data sovereignty?"
    a: "It solves residency, not jurisdiction. A UK region run by a US-owned provider keeps data in the UK, but the provider is still subject to US law, including the CLOUD Act. Whether that matters depends on your risk assessment and your customers' requirements."
  - q: "Does the CLOUD Act apply to data stored in the UK?"
    a: "It can. The CLOUD Act says a US provider must disclose data in its possession, custody or control regardless of whether the data is stored inside or outside the United States."
  - q: "Can I send personal data to the US under UK GDPR?"
    a: "Yes, if you use a lawful route. The UK–US data bridge covers transfers to US organisations certified to the UK Extension to the EU-US Data Privacy Framework. For others you need safeguards such as the IDTA or the UK Addendum, plus a transfer risk assessment."
  - q: "Is the EU adequacy decision for the UK still valid?"
    a: "Yes. The European Commission renewed both UK adequacy decisions on 19 December 2025. They now last until 27 December 2031."
  - q: "Does Authgear store data in the UK?"
    a: "Authgear Cloud runs on Google Cloud in the United States or Hong Kong today. To keep data in the UK, self-host Authgear on UK infrastructure, which is free under Apache-2.0, or have us run a private cloud for you in a UK region."
---

> **tl;dr** — Data sovereignty means your users' data is governed by the laws you expect, not just stored where you expect. For a UK login system, ask three questions: where does the data sit, who operates the system, and whose law applies to that operator? A UK data centre answers only the first.

*This article explains the rules in plain English. It is not legal advice. Talk to your data protection officer or a lawyer about your own situation.*

Most writing about data sovereignty is about cloud storage. This guide is about one system: your login, which holds every user's email address, phone number, password hash and login history. If someone asks "where does our user data live, and who can get at it?", the honest answer starts here.

## Data sovereignty vs data residency

Two terms get mixed up:

- **Data residency** is about location. Which country are the servers in?
- **Data sovereignty** is about control. Which country's laws govern the data, and who can be forced to hand it over?

Think of a safe deposit box. Residency is which bank branch the box is in. Sovereignty is who holds the keys, and which courts can order the bank to open it. You can have every server in London and still have a sovereignty question.

## Why the login system matters most

Your identity provider holds some of the most sensitive data you have, and more of it than people expect:

- **Personal data:** names, email addresses, phone numbers, sometimes dates of birth.
- **Credentials:** password hashes, passkey public keys, TOTP secrets for authenticator apps, recovery codes.
- **Login and audit logs:** IP addresses, devices, locations and timestamps for every sign-in.
- **Backups:** full copies of all of the above, often kept in a different place from the live database.
- **Messages in transit:** the email and SMS providers that send one-time codes see phone numbers, email addresses and the codes themselves.

Check all five. Teams most often forget backups and messaging providers.

## The UK rules in plain English

### UK GDPR and the Data Protection Act 2018

The UK's main data protection law is the **UK GDPR**, which sits alongside the [Data Protection Act 2018](https://www.legislation.gov.uk/ukpga/2018/12/contents). The Information Commissioner's Office (ICO) enforces it.

UK GDPR does not say personal data must stay in the UK. It says that if you send it abroad, you need a lawful route.

### Sending data abroad: restricted transfers

The ICO calls this a **restricted transfer**: sending personal data to, or making it accessible to, a separate organisation outside the UK. "Accessible" matters. If a vendor's support team abroad can log in and see your user records, that can count, even if the database never moves. The organisation that starts the transfer is responsible for getting it right ([ICO guide](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/international-transfers/a-brief-guide-to-international-transfers/)).

There are three routes:

1. **Adequacy regulations.** The UK government has decided some countries protect data well enough for free flow: the EEA, Switzerland, New Zealand and South Korea, among others. The US has *partial* adequacy (see the data bridge below). Hong Kong and many other places are not on the list ([ICO adequacy list](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/international-transfers/adequacy-regulations/is-the-restricted-transfer-covered-by-adequacy-regulations/)).
2. **Appropriate safeguards.** Usually a contract: the ICO's **International Data Transfer Agreement (IDTA)**, or the **UK Addendum** that bolts onto the EU's standard contractual clauses. Both came into force on 21 March 2022.
3. **Exceptions.** Narrow cases, such as explicit consent for one transfer. Not something to build a product on.

### What the Data (Use and Access) Act 2025 changed

The [Data (Use and Access) Act 2025](https://www.legislation.gov.uk/ukpga/2025/18/contents) received Royal Assent on 19 June 2025. Its international transfer rules came into force on **5 February 2026** ([SI 2026/82](https://www.legislation.gov.uk/uksi/2026/82/regulation/2/made)).

The main change is a new **data protection test**. Before relying on safeguards such as the IDTA, the sender must decide that the protection the data gets after transfer is **"not materially lower"** than in the UK. The ICO still calls this exercise a transfer risk assessment. It has said it will update the IDTA and Addendum during 2026, and that you should keep using the current versions until then ([ICO](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/international-transfers/appropriate-safeguards/what-are-standard-data-protection-clauses-the-uk-idta-and-the-addendum/)).

### The UK–US data bridge

Since **12 October 2023**, UK organisations can send personal data to US companies without extra safeguards, but only if the recipient is certified to the **UK Extension to the EU-US Data Privacy Framework** ([the regulations](https://www.legislation.gov.uk/uksi/2023/1028/made)). You check this on the public Data Privacy Framework List. Some sectors, including banking, insurance and telecoms, cannot join ([GOV.UK factsheet](https://www.gov.uk/government/publications/uk-us-data-bridge-supporting-documents/uk-us-data-bridge-factsheet-for-uk-organisations)).

The data bridge makes a transfer lawful. It doesn't change which laws apply to the US company once it has the data.

### Data coming from the EU

If you serve EU users, you rely on the EU's adequacy decision for the UK. The European Commission renewed it on **19 December 2025**, and it now lasts until **27 December 2031** ([ICO](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/international-transfers/receiving-personal-information-from-the-eea/)). Some articles still say it ran out in June 2025. It didn't.

## The three questions to ask about any login system

The UK's National Cyber Security Centre puts it simply: "You should be confident that you know where your data is, and who can access your data." It adds that this "may be more complex than simply clarifying the physical locations" ([NCSC Cloud Security Principle 2](https://www.ncsc.gov.uk/collection/cloud/the-cloud-security-principles/principle-2-asset-protection-and-resilience)). Three questions cover it.

### 1. Where does the data sit?

This is residency. Ask for the region of the primary database, the backups, the logs and any disaster-recovery copy. "Hosted in Europe" is not an answer. Get country names.

### 2. Who operates the system?

Whoever runs the servers can usually reach the data. Ask where the operations and support staff are, and whether they can see user records. Remote access from another country can be a restricted transfer in its own right.

### 3. Whose law applies to the company running it?

This is jurisdiction, and it is where the US CLOUD Act comes in.

The CLOUD Act, passed in March 2018, says a US provider must disclose data in its "possession, custody, or control, regardless of whether such communication, record, or other information is located within or outside of the United States" ([18 U.S.C. § 2713](https://www.law.cornell.edu/uscode/text/18/2713)). In plain terms: if your auth vendor, or the cloud it runs on, is a US provider, data it holds in London can be subject to a valid US order.

The CLOUD Act also lets the US sign agreements with trusted countries. The **UK–US Data Access Agreement** came into force on 3 October 2022. It lets UK and US law enforcement ask providers in the other country for data directly, but only to fight serious crime such as terrorism and child sexual abuse. The UK government says it "does not create any new powers": every request must still meet the requesting country's own law ([GOV.UK factsheet](https://www.gov.uk/government/publications/uk-us-data-access-agreement-factsheet/policy-factsheet-on-the-uk-us-data-access-agreement)). Orders under it may not intentionally target the other country's citizens, permanent residents or people located there ([the agreement, Article 4](https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/836969/CS_USA_6.2019_Agreement_between_the_United_Kingdom_and_the_USA_on_Access_to_Electronic_Data_for_the_Purpose_of_Countering_Serious_Crime.pdf)).

This doesn't mean US providers hand over data casually. It means the risk exists, and your transfer risk assessment should show how you weighed it.

## Why "UK region" is not "UK sovereign"

All the big US cloud providers run data centres in the UK. Choosing a UK region answers question 1. It does not answer question 3, because the provider is still a US company.

"Sovereign cloud" is a marketing term, and providers use it to mean different things. When you see it, ask:

- Is the provider, and its parent company, UK-owned?
- Are the operations staff in the UK?
- Do backups and support access stay in the UK too?
- Which foreign laws, if any, apply to the provider?

For many teams a UK region from a US provider is a reasonable choice. For some public sector suppliers and health services, it isn't enough. Know which group you are in before you shortlist vendors.

## Your options for a UK login system

| Option | Where data sits | Who operates it | Whose law applies |
|---|---|---|---|
| **Self-host in the UK** | Your UK servers or a UK provider | Your team | Yours, plus your hosting provider's |
| **Private cloud in a UK region** | A dedicated deployment in a UK region | The vendor, on dedicated infrastructure | The vendor's and the cloud provider's |
| **Managed (shared) cloud** | Wherever the vendor offers | The vendor | The vendor's and the cloud provider's |

## Checklist: questions to ask any auth provider

Copy these into your vendor questionnaire:

- [ ] In which countries are the primary database, backups, logs and disaster-recovery copies stored?
- [ ] Where are your operations and support staff, and can they see our user data?
- [ ] Where are you and your hosting provider incorporated, and which foreign laws, such as the US CLOUD Act, apply to either?
- [ ] Do you publish a data processing agreement (DPA)? Which UK transfer mechanism does it use: adequacy, the data bridge, the IDTA or the Addendum?
- [ ] Do you publish a sub-processor list, and will you tell us before it changes?
- [ ] Which email and SMS providers send our one-time codes, and can we use our own?
- [ ] Can we export all user data, including password hashes, if we leave?
- [ ] Can we self-host the same product if our requirements change?
- [ ] Which independent audits do you hold, such as ISO 27001 or SOC 2?

## Where Authgear fits

We'll be plain about what Authgear offers today.

- **A UK company.** Authgear is built by Skymakers Digital Limited, registered in the UK.
- **Open source, Apache-2.0.** You can self-host Authgear on UK infrastructure with every feature of the cloud version. In a self-hosted setup your user data doesn't reach our servers, and you pick your own email and SMS providers.
- **Private cloud.** We run a dedicated deployment for you in a UK or EU region.
- **Audited.** Authgear holds [ISO 27001 and SOC 2 Type 2](/post/authgear-achieves-iso-27001-and-soc-2-type-2-compliance-enhanced-data-security).

See the options side by side on our [data sovereignty page](/solutions/data-sovereignty). If you're comparing vendors, our list of [open-source Auth0 alternatives](/post/top-open-source-auth0-alternatives) and our guide to [self-hosted MFA for regulated organisations](/post/self-hosted-mfa-for-financial-and-government-organizations-on-premise-authentication-without-saas-lock-in) go deeper on self-hosting.

Ready to keep your users' data where you decide? [Compare the ways to run Authgear](/solutions/data-sovereignty).

## Frequently Asked Questions

### What is data sovereignty in the UK?

It is the idea that data is governed by the laws of the place it is held, and by the laws that apply to whoever controls it. For a UK company it means knowing where personal data is stored, who can reach it, and whether a foreign law could force it to be handed over.

### What is the difference between data residency and data sovereignty?

Data residency is about location: which country the servers are in. Data sovereignty is wider. It also asks who operates the system and which country's law applies to that operator. Data can be resident in the UK and still be reachable under another country's law.

### Is a UK cloud region enough for data sovereignty?

It solves residency, not jurisdiction. A UK region run by a US-owned provider keeps data in the UK, but the provider is still subject to US law, including the CLOUD Act. Whether that matters depends on your risk assessment and your customers' requirements.

### Does the CLOUD Act apply to data stored in the UK?

It can. The CLOUD Act says a US provider must disclose data in its possession, custody or control regardless of whether the data is stored inside or outside the United States.

### Can I send personal data to the US under UK GDPR?

Yes, if you use a lawful route. The UK–US data bridge covers transfers to US organisations certified to the UK Extension to the EU-US Data Privacy Framework. For others you need safeguards such as the IDTA or the UK Addendum, plus a transfer risk assessment.

### Is the EU adequacy decision for the UK still valid?

Yes. The European Commission renewed both UK adequacy decisions on 19 December 2025. They now last until 27 December 2031.

### Does Authgear store data in the UK?

Authgear Cloud runs on Google Cloud in the United States or Hong Kong today. To keep data in the UK, self-host Authgear on UK infrastructure, which is free under Apache-2.0, or have us run a private cloud for you in a UK region.

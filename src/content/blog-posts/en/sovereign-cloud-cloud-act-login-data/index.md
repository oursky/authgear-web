---
title: "Sovereign Cloud and the CLOUD Act: What They Mean for Login Data"
excerpt: "What the US CLOUD Act lets US authorities request, what \"sovereign cloud\" really means, and the three ways to run your login system if you are in the UK or EU. With a checklist of questions for any auth vendor."
coverImage: ./cover.webp
publishedAt: 2026-10-23
metaTitle: "Sovereign Cloud and the CLOUD Act: Your Login Data"
metaDescription: "What the US CLOUD Act is, what sovereign cloud really means, and how UK and EU teams can keep login and user data under their control. With a vendor checklist."
category: industry
readTime: 8
draft: false
faq:
  - q: "What is the CLOUD Act?"
    a: "The Clarifying Lawful Overseas Use of Data Act is a US law from March 2018. It says a provider subject to US jurisdiction must hand over data in its possession, custody or control when served with a valid US order, wherever that data is stored. It also lets the US sign data-sharing agreements with other countries, such as the UK."
  - q: "Does the CLOUD Act apply to data stored in the EU or UK?"
    a: "It can. What matters is who controls the data, not where the server is. If your provider is subject to US jurisdiction, data it holds in Dublin, Amsterdam or London can be covered by a US order."
  - q: "What is a sovereign cloud?"
    a: "There is no single legal definition. In general it means a cloud service where the data stays in a chosen country or region, the people operating it are there too, and the company running it is governed by that region's law rather than a foreign one. Providers use the term for very different things, so ask what it covers."
  - q: "Is an EU region from a US provider sovereign?"
    a: "It gives you data residency, not full sovereignty. The data sits in the EU, but the provider's parent company is still subject to US law, including the CLOUD Act. Some US providers now run separate European entities with EU-based staff, which reduces the risk, but the parent is still a US company."
  - q: "What is the difference between data residency and data sovereignty?"
    a: "Data residency is about location: which country the servers are in. Data sovereignty also asks who operates the system and whose law applies to that operator. Data can sit in the UK or EU and still be reachable under another country's law."
---

> **tl;dr** — The US CLOUD Act lets US authorities require providers under US jurisdiction to hand over data they control, wherever it is stored. A "sovereign cloud" tries to keep the data, the people running it and the law that governs them in one place. For your login system, that means asking where user data sits, who operates it, and whose law applies to whoever runs it.

*This article explains the rules in plain English. It is not legal advice. Talk to your data protection officer or a lawyer about your own situation.*

"Sovereign cloud" is now on most big cloud providers' homepages, and the CLOUD Act comes up more and more often in procurement questionnaires in the UK, Ireland, the Netherlands and the Nordics. Most articles about both focus on file storage and email. This one is about the system that knows every one of your users: your login.

If you want the UK legal detail (UK GDPR, the Data (Use and Access) Act 2025 and the UK–US data bridge), read our [guide to UK data sovereignty for login and identity](/post/uk-data-sovereignty-login-identity). This post takes a wider view for UK and EU readers.

## What the CLOUD Act is

The Clarifying Lawful Overseas Use of Data Act became US law in March 2018. It was introduced as [H.R. 4943](https://www.congress.gov/bill/115th-congress/house-bill/4943) and passed as part of a larger spending bill, after a long court fight between Microsoft and the US Department of Justice over emails stored on a server in Ireland.

Its core is one sentence in [18 U.S.C. § 2713](https://www.law.cornell.edu/uscode/text/18/2713). A provider of email, messaging or cloud services must disclose content and records about a customer that are in its "possession, custody, or control, regardless of whether such communication, record, or other information is located within or outside of the United States".

In plain terms: the location of the server does not decide the question. Control does.

Four points are often missed:

- **It is a law-enforcement tool.** It works through warrants and court orders in criminal investigations. Intelligence surveillance runs under other US laws.
- **It needs US jurisdiction over the provider.** The Department of Justice's [CLOUD Act white paper](https://www.justice.gov/criminal/media/999601/dl?inline) says the Act "does not give U.S. law enforcement any new legal authority to acquire data" and did not extend US jurisdiction to new companies. A US company is clearly covered. Whether a foreign company is covered is "a fact-specific inquiry" that depends on how much business it does in the US.
- **It allows agreements between countries.** The US can sign executive agreements that let each side's investigators ask providers in the other country for data directly. The **UK–US Data Access Agreement** came into force on 3 October 2022. The UK government says it covers only serious crime such as terrorism and child sexual abuse, and "does not create any new powers" ([GOV.UK factsheet](https://www.gov.uk/government/publications/uk-us-data-access-agreement-factsheet/policy-factsheet-on-the-uk-us-data-access-agreement)). Requests made under it may not intentionally target people in the other country ([the agreement, Article 4](https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/836969/CS_USA_6.2019_Agreement_between_the_United_Kingdom_and_the_USA_on_Access_to_Electronic_Data_for_the_Purpose_of_Countering_Serious_Crime.pdf)).
- **The EU has no such agreement yet.** EU–US talks on electronic evidence started in 2019 and resumed in March 2023, according to the [Department of Justice](https://www.justice.gov/criminal/cloud-act-resources). Nothing is in force.

How often does this happen in practice? In a [French Senate hearing on 10 June 2025](https://www.senat.fr/compte-rendu-commissions/20250609/ce_commande_publique.html), Microsoft France's director of public and legal affairs was asked under oath whether he could guarantee that French citizens' data, held under contracts bought through the state purchasing agency, would never be passed to US authorities without the French authorities' explicit agreement. He said he could not, and added that it had never yet happened. The risk is legal rather than routine, but no provider under US law can promise it away.

## What "sovereign cloud" means

There is no single legal definition of a sovereign cloud. Providers use the phrase for anything from "we have a data centre in Frankfurt" to "a separate company, run by local staff, with no foreign parent". It helps to split it into three layers:

- **Data residency.** The data is stored in a country or region you choose. Most "UK region" or "EU region" offers stop here.
- **Operational sovereignty.** The people who run, patch and support the system are in that region too, and staff elsewhere cannot reach the data.
- **Legal sovereignty.** The company running the system, and its parent, are governed only by that region's law. No foreign law can compel them to hand over data.

That is the real difference in data residency vs data sovereignty: residency is the first layer, and sovereignty needs all three. So sovereign cloud vs public cloud comes down to the second and third layers. A public cloud region from a US provider gives you residency, but it doesn't change who owns the provider.

Public bodies are starting to put numbers on this. The European Commission's Cloud Sovereignty Framework scores providers on eight objectives, from legal jurisdiction to supply chain, using levels from SEAL-0 (no sovereignty) to SEAL-4 (a full EU supply chain). In April 2026 the Commission used it to [award its own sovereign cloud contracts](https://commission.europa.eu/news-and-media/news/commission-advances-cloud-sovereignty-through-strategic-procurement-2026-04-17_en). France (SecNumCloud) and Germany (C5) have their own national schemes. In the UK, where there is no official UK sovereign cloud scheme, the National Cyber Security Centre's advice is simpler: "You should be confident that you know where your data is, and who can access your data" ([NCSC Cloud Security Principle 2](https://www.ncsc.gov.uk/collection/cloud/the-cloud-security-principles/principle-2-asset-protection-and-resilience)).

When a provider says "sovereign", ask which of the three layers it means. The checklist below turns that into questions.

## Why login data is the place to start

A file store holds some customers' documents. An identity provider holds something about every user you have:

- **Personal data:** names, email addresses, phone numbers.
- **Credentials:** password hashes, passkey public keys, the secrets behind authenticator-app codes, recovery codes.
- **Login history:** time, IP address and device for every sign-in.
- **Linked accounts:** connections to Google, Apple or Microsoft accounts.
- **Audit logs:** who changed a password or got a new role, and when.

Then there are the data flows people forget:

- **Email and SMS providers** see addresses, phone numbers and often the one-time code itself.
- **Backups and monitoring** may sit with another company or in another region.
- **Support access** may come from another country, under another country's law.

Encrypting with your own keys helps less here than for files: a login server must read an email address to send a code. If you are new to identity providers, our explainer on [customer identity and access management (CIAM)](/post/what-is-customer-identity-and-access-management-ciam) covers the basics.

## Three ways to run login

Broadly, you have three choices.

| Option | Where data sits | Who operates it | Whose law applies |
|---|---|---|---|
| **US SaaS identity provider** | Wherever the vendor offers, often a UK or EU region | The vendor | The vendor's and its cloud provider's, which includes US law |
| **Self-hosted open source** | Your own servers or a hosting provider you choose | Your team | Yours, plus your hosting provider's |
| **Private cloud in a region you choose** | A dedicated deployment in a UK or EU region | The vendor, on dedicated infrastructure | The vendor's and the cloud provider's |

### 1. A US SaaS identity provider

The easiest start, and many offer a UK or EU region for residency. But the vendor stays under US jurisdiction, so the CLOUD Act applies to data it controls. For many teams that is an acceptable risk after a proper assessment. For public-sector suppliers, health services and some financial firms, it often isn't.

### 2. Self-hosted open source

You run the login system yourself, on your own hardware or with a UK or European hosting provider. No outside vendor holds your user data, and you pick the email and SMS providers. Our comparison of [open source identity providers](/post/best-open-source-identity-providers) covers the main options. The trade-off is work: upgrades, security patches, backups and on-call are yours. Check the hosting company too. A European vendor running on a US cloud moves the question one layer down rather than answering it.

### 3. A private cloud run for you

A dedicated deployment, run by the vendor, in a region you choose. You get residency and a managed service without running it yourself. Sovereignty then depends on the vendor and the infrastructure underneath, so use the checklist below.

## Checklist: questions to ask any auth vendor

Copy these into your vendor questionnaire:

- [ ] Which company signs our contract, and where is its parent company incorporated?
- [ ] In which countries are the primary database, backups, logs and disaster-recovery copies?
- [ ] Whose infrastructure does the service run on, and where is that company incorporated?
- [ ] Where are your operations and support staff, and can they see our user data?
- [ ] Are you or your hosting provider subject to US jurisdiction, and so to the CLOUD Act?
- [ ] How do you handle government requests for data, and will you tell us when you get one, where the law allows?
- [ ] Which sub-processors see user data, including email and SMS providers? Can we use our own?
- [ ] Can we export all user data, including password hashes, if we leave?
- [ ] Can we self-host the same product if our requirements change?

## Where Authgear fits

- **Open source.** Authgear is licensed under Apache-2.0. The self-hosted version has every feature, and you connect your own email, SMS and WhatsApp providers. Run it on your own servers or with any UK or European hosting provider, and your user data does not reach our servers.
- **Private cloud.** We run a dedicated deployment for you in a UK or EU region of your choice.
- **Built by a UK company.** That is not a CLOUD Act answer on its own. The UK–US Data Access Agreement limits requests that target people in the UK, which does nothing for your users elsewhere in Europe. Self-hosting or a private cloud in your region is what keeps the data under your control.

See the options side by side on our [data sovereignty page](/solutions/data-sovereignty).

## Frequently Asked Questions

### What is the CLOUD Act?

The Clarifying Lawful Overseas Use of Data Act is a US law from March 2018. It says a provider subject to US jurisdiction must hand over data in its possession, custody or control when served with a valid US order, wherever that data is stored. It also lets the US sign data-sharing agreements with other countries, such as the UK.

### Does the CLOUD Act apply to data stored in the EU or UK?

It can. What matters is who controls the data, not where the server is. If your provider is subject to US jurisdiction, data it holds in Dublin, Amsterdam or London can be covered by a US order.

### What is a sovereign cloud?

There is no single legal definition. In general it means a cloud service where the data stays in a chosen country or region, the people operating it are there too, and the company running it is governed by that region's law rather than a foreign one. Providers use the term for very different things, so ask what it covers.

### Is an EU region from a US provider sovereign?

It gives you data residency, not full sovereignty. The data sits in the EU, but the provider's parent company is still subject to US law, including the CLOUD Act. Some US providers now run separate European entities with EU-based staff, which reduces the risk, but the parent is still a US company.

### What is the difference between data residency and data sovereignty?

Data residency is about location: which country the servers are in. Data sovereignty also asks who operates the system and whose law applies to that operator. Data can sit in the UK or EU and still be reachable under another country's law.

*Up to date as of October 2026.*

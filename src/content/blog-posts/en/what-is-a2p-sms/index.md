---
title: "What Is A2P SMS? (And Why It Costs What It Does)"
excerpt: "A2P SMS is how apps send OTPs, alerts, and marketing texts to users. It's a regulated, paid channel priced differently from personal texting. Here's what A2P means and what drives its cost."
coverImage: ./cover.webp
category: engineering
featured: false
metaTitle: "What Is A2P SMS? A Developer's Guide"
metaDescription: "A2P SMS (application-to-person) is how apps send OTPs and alerts. Learn how it differs from P2P, why it's regulated, and what actually drives the cost."
publishedAt: 2026-07-23T10:30:00.000Z
readTime: 7
draft: false
faq:
  - q: "What is A2P SMS?"
    a: "A2P SMS (application-to-person SMS) is a text message sent from an application or system to a person, rather than between two people. OTPs, appointment reminders, delivery updates, and marketing texts are all A2P. It's the category businesses use to reach users at scale, and it's priced and regulated differently from personal (P2P) texting."
  - q: "What is the difference between A2P and P2P SMS?"
    a: "P2P (person-to-person) is a human typing a text to another human, priced on a consumer plan. A2P (application-to-person) is automated: an app sends messages to users through an SMS API or gateway. A2P is billed per message at commercial rates, must follow A2P registration rules, and is routed differently by carriers."
  - q: "What is A2P 10DLC?"
    a: "10DLC (10-digit long code) is the US framework for sending A2P messages from standard local phone numbers. Businesses register their brand and campaigns with The Campaign Registry, and carriers then allow higher A2P throughput. It adds registration and monthly fees but is required to send A2P SMS reliably in the US."
  - q: "Why is A2P SMS more expensive than personal texting?"
    a: "Three reasons: carriers charge higher commercial termination rates for A2P traffic, A2P registration and compliance add fixed fees, and providers pass through per-message carrier surcharges. Message length (multiple segments) and SMS pumping fraud push the real cost higher still."
  - q: "Do I need to register to send A2P SMS?"
    a: "In most markets, yes, in some form. The US requires 10DLC brand and campaign registration; many other countries require sender ID registration or pre-approved message templates. Sending unregistered A2P traffic risks filtering, blocking, or higher per-message fees."
---

> **tl;dr**: A2P SMS (application-to-person) is any text sent from an app to a person, such as an OTP, alert, or promotion. It's the channel businesses use to reach users at scale, and because it's commercial and regulated, it's priced higher than the personal texting on your phone plan.

Every time an app texts you a login code or a delivery update, that's A2P SMS at work. If you're building on an SMS API and trying to make sense of your bill, or a registration form asking about "campaigns" and "10DLC," this is the concept underneath it. Here's what A2P SMS is and why it costs what it does.

## What is A2P SMS?

A2P stands for **application-to-person**. It describes an SMS sent from a software system to an individual, as opposed to a person tapping out a text to a friend.

Common examples include:

- A one-time password for logging in
- A "your order has shipped" notification
- An appointment or payment reminder
- A marketing promotion

What they have in common is that no human typed them one at a time. An application generated and sent them through an SMS gateway or API, usually to many recipients.

## A2P vs P2P: what's the difference?

The counterpart to A2P is **P2P (person-to-person)**: the ordinary texting between two people, billed on a consumer mobile plan.

<div class="ag-table-wrap">
  <table class="ag-table">
    <thead>
      <tr><th>Factor</th><th>P2P SMS</th><th>A2P SMS</th></tr>
    </thead>
    <tbody>
      <tr><td><strong>Sender</strong></td><td>A person</td><td>An application</td></tr>
      <tr><td><strong>Volume</strong></td><td>Low, conversational</td><td>High, often bulk</td></tr>
      <tr><td><strong>Pricing</strong></td><td>Consumer plan</td><td>Per message, commercial rate</td></tr>
      <tr><td><strong>Regulation</strong></td><td>Minimal</td><td>Registration, sender ID, consent rules</td></tr>
      <tr><td><strong>Routing</strong></td><td>Standard carrier</td><td>Dedicated A2P routes</td></tr>
    </tbody>
  </table>
</div>

Carriers care about the distinction because A2P traffic is commercial and higher-volume. They route it separately, charge more for it, and increasingly require businesses to register before sending.

## Why A2P SMS costs more

If you've ever compared your phone bill to an SMS API invoice and wondered why "the same text" costs more from an app, this is why. A few things stack up:

- **Commercial termination rates.** Mobile operators charge more to terminate A2P (business) traffic than personal messages, and those rates vary enormously by country.
- **A2P registration and compliance fees.** In the US, 10DLC registration carries brand and campaign fees. Other markets require sender ID registration or template pre-approval, sometimes with their own costs.
- **Carrier surcharges.** Providers often add a pass-through fee on top of the base send rate, billed per message.
- **Segments.** Messages over 160 GSM-7 characters (70 for Unicode) split into multiple billed parts, and each part actually holds a little less: 153 characters for GSM-7, 67 for Unicode, since a few characters in every segment are used to stitch the message back together on the recipient's phone.
- **Fraud.** SMS pumping inflates A2P volume with bot-triggered sends, and you pay for every one. See [What Is an SMS Pumping Attack?](/post/sms-pumping-attack).

We break the full pricing model down in [SMS API Pricing Explained](/post/sms-api-pricing). To estimate your own A2P spend across countries and providers, use the [SMS cost calculator](/tools/sms-cost-calculator).

## A2P registration: 10DLC and beyond

Because A2P is regulated, you usually can't just start sending. In the **US**, the framework is **10DLC (10-digit long code)**: you register your business (brand) and your use cases (campaigns) with The Campaign Registry, and carriers then grant higher messaging throughput. Registration typically involves a one-time brand fee, a per-campaign fee, and a small recurring monthly charge per campaign, on top of the carrier surcharges added to every message. Carriers set and change these fees on their own schedule, so treat any specific number you read (including here) as a snapshot rather than a fixed price. What doesn't change is the consequence of skipping it: sending unregistered A2P traffic gets filtered or blocked.

Outside the US, rules differ by country: many markets require a registered **sender ID** (the name or number messages come from) or pre-approved message templates before A2P traffic is allowed. India is the clearest example, where TRAI's DLT (Distributed Ledger Technology) framework requires businesses to register their entity, sender ID, and every message template before sending. This is part of why a global SMS rollout is more work than flipping a switch.

## Is there a cheaper way to reach users?

For OTPs specifically, A2P SMS is the most expensive common channel and the one most exposed to fraud. Many teams cut the bill by sending verification over WhatsApp, which has its own (usually lower) authentication pricing, and keeping SMS only as a fallback. See [SMS OTP vs WhatsApp OTP](/post/sms-otp-vs-whatsapp-otp) for the comparison.

Handling A2P registration, per-country routing, WhatsApp-first delivery, and fraud protection yourself is a lot of moving parts. Authentication platforms like [Authgear](https://www.authgear.com) manage OTP delivery for you, so you get reliable verification without owning the A2P plumbing.

## Frequently Asked Questions

### What is A2P SMS?

A2P SMS (application-to-person SMS) is a text message sent from an application or system to a person, rather than between two people. OTPs, appointment reminders, delivery updates, and marketing texts are all A2P. It's the category businesses use to reach users at scale, and it's priced and regulated differently from personal (P2P) texting.

### What is the difference between A2P and P2P SMS?

P2P (person-to-person) is a human typing a text to another human, priced on a consumer plan. A2P (application-to-person) is automated: an app sends messages to users through an SMS API or gateway. A2P is billed per message at commercial rates, must follow A2P registration rules, and is routed differently by carriers.

### What is A2P 10DLC?

10DLC (10-digit long code) is the US framework for sending A2P messages from standard local phone numbers. Businesses register their brand and campaigns with The Campaign Registry, and carriers then allow higher A2P throughput. It adds registration and monthly fees but is required to send A2P SMS reliably in the US.

### Why is A2P SMS more expensive than personal texting?

Three reasons: carriers charge higher commercial termination rates for A2P traffic, A2P registration and compliance add fixed fees, and providers pass through per-message carrier surcharges. Message length (multiple segments) and SMS pumping fraud push the real cost higher still.

### Do I need to register to send A2P SMS?

In most markets, yes, in some form. The US requires 10DLC brand and campaign registration; many other countries require sender ID registration or pre-approved message templates. Sending unregistered A2P traffic risks filtering, blocking, or higher per-message fees.

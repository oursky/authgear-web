---
title: "SMS API Pricing Explained: What You Actually Pay Per Message"
excerpt: "SMS API pricing is more than a per-message rate. Here's what really drives your SMS OTP bill (destination rates, carrier fees, A2P charges, and fraud) and how to cut it."
coverImage: ./cover.webp
category: engineering
featured: false
metaTitle: "SMS API Pricing Explained: What You Really Pay"
metaDescription: "SMS API pricing isn't just a per-message rate. See what drives your SMS OTP bill (destination rates, carrier fees, A2P charges) and how to cut it."
publishedAt: 2026-07-22T10:00:00.000Z
readTime: 9
draft: false
faq:
  - q: "How much does an SMS message cost through an API?"
    a: "It depends almost entirely on the destination country. On major providers, a single message ranges from roughly $0.03 in low-cost markets like Thailand to $0.36 or more in high-cost markets like Indonesia. US rates are unusually low (around $0.0083 per message on Twilio) but carry separate A2P registration fees. The per-message rate is only the base; carrier surcharges are often added on top."
  - q: "Why is SMS API pricing so expensive?"
    a: "Three things stack up: the mobile operator's termination fee for delivering the message (which varies wildly by country), A2P (application-to-person) registration and compliance fees, and SMS pumping fraud that inflates your volume with messages no real user requested. Long messages also split into multiple billed segments."
  - q: "What are carrier fees on top of the SMS rate?"
    a: "Many providers quote a base send rate and then add a separate 'carrier fee': a pass-through surcharge the destination mobile operator charges. It's billed as its own line item, so your real cost per message is higher than the headline rate in several countries."
  - q: "Is WhatsApp OTP cheaper than SMS?"
    a: "In most high-SMS-cost markets, yes, often 40–90% cheaper per message, and WhatsApp isn't exposed to SMS pumping fraud. The trade-off is reach: the recipient needs WhatsApp installed, so you keep SMS as a fallback for the minority who don't."
  - q: "How do I estimate my SMS OTP cost?"
    a: "Multiply your monthly OTP volume by the per-message rate for each destination country, then add carrier fees and any A2P registration cost. Our free SMS cost calculator does this across Twilio, Bird, and Plivo and shows the WhatsApp OTP alternative side by side."
---

> **tl;dr** — SMS API pricing is charged per message sent and priced by the **recipient's country**, but the headline rate is only part of the bill. Your real cost is the destination rate **plus** carrier surcharges, A2P registration fees, multi-segment charges for long messages, and the fraud tax of SMS pumping.

If you send one-time passwords (OTPs) over SMS, the invoice can be a surprise. A rate sheet says "$0.05 per message," you do the napkin math, and then the real bill comes in higher — sometimes much higher. This guide breaks down what actually goes into SMS API pricing so you can predict your spend, spot the hidden costs, and decide whether a cheaper channel makes sense.

## What actually goes into SMS API pricing

When you send an SMS through a provider like Twilio, Vonage, Bird, or Plivo, you're paying for a chain of hand-offs. Each link adds cost.

- **The destination rate.** This is the big one. Every country's mobile operators charge a termination fee to deliver a message to their subscribers, and providers pass it through. Rates differ enormously — sending to Thailand costs a fraction of sending to Indonesia.
- **Carrier / operator surcharges.** In many markets the provider quotes a base send rate and then adds a separate carrier fee on top, billed as its own line item. The headline number is not the number you pay.
- **A2P registration and compliance fees.** Application-to-person (A2P) messaging — which includes OTPs — is regulated. Depending on the market you may pay one-time or monthly fees to register your brand, campaign, or sender ID before you can send at all.
- **Message segments.** SMS is billed per 160-character segment under standard GSM-7 encoding, but only 70 characters per segment if the message contains non-GSM characters like emoji or non-Latin scripts. A message that looks like "one text" to you can be billed as two or three segments.
- **The fraud tax.** SMS pumping (also called AIT or toll fraud) uses bots to trigger floods of OTP sends to premium numbers the attacker profits from. You pay for every one. We cover it in depth in [What Is an SMS Pumping Attack?](/post/sms-pumping-attack).

## How much does an SMS actually cost?

Because the destination rate dominates, "how much does an SMS cost" has no single answer. Here are representative **base** per-message rates (excluding carrier surcharges) across three providers for a few markets, as of mid-2026:

<div class="ag-table-wrap">
  <table class="ag-table">
    <thead>
      <tr><th>Country</th><th>Twilio</th><th>Bird</th><th>Plivo (from)</th></tr>
    </thead>
    <tbody>
      <tr><td>United Kingdom</td><td>$0.0420</td><td>$0.0499</td><td>$0.0372</td></tr>
      <tr><td>Germany</td><td>$0.0940</td><td>$0.0999</td><td>$0.0950</td></tr>
      <tr><td>Hong Kong</td><td>$0.0682</td><td>$0.0648</td><td>$0.0586</td></tr>
      <tr><td>Singapore</td><td>$0.0415</td><td>$0.0519</td><td>$0.0516</td></tr>
      <tr><td>Malaysia</td><td>$0.0905</td><td>$0.2283</td><td>$0.0316</td></tr>
      <tr><td>Indonesia</td><td>$0.3603</td><td>$0.4106</td><td>$0.3333</td></tr>
      <tr><td>Philippines</td><td>$0.1699</td><td>$0.1947</td><td>$0.1733</td></tr>
    </tbody>
  </table>
</div>

Two things stand out. First, the same message can cost 10x more in one country than another. Second, providers disagree — note how Malaysia swings from $0.03 to $0.23 depending on who you ask, because they route through different carriers. Rates also change several times a year.

That variance is exactly why a static rate sheet is hard to plan against. To model your own spend across countries and providers, use our free [SMS cost calculator](/tools/sms-cost-calculator) — plug in your monthly OTP volume and destination, and it estimates the monthly and annual cost for you.

## The hidden costs that inflate your bill

The base rate is the part you can see. The costs that catch teams off guard are the ones that aren't on the quote:

- **Carrier fees** can add a meaningful surcharge on top of the base rate in several markets, and they're not always shown until the invoice.
- **A2P registration** can add fixed monthly overhead before you've sent anything, especially in the US (10DLC) and a growing list of other regulated markets.
- **Failed deliveries you still pay for.** In some routing configurations you're billed for messages that never arrive — a real problem in markets with poor deliverability.
- **SMS pumping fraud** can inflate a bill overnight. Because attackers earn a cut of the carrier termination fee, they have a direct incentive to hammer your OTP endpoint.

For a full breakdown of how these stack up across authentication methods, see [How Much Does Two-Factor Authentication Cost?](/post/two-factor-authentication-cost).

## SMS vs WhatsApp OTP pricing

Once you see the true cost of SMS, the obvious question is whether there's a cheaper channel. For OTPs, the leading alternative is WhatsApp, priced under Meta's authentication category. Here's the same set of markets, SMS (Twilio base) next to the WhatsApp authentication rate:

<div class="ag-table-wrap">
  <table class="ag-table">
    <thead>
      <tr><th>Country</th><th>SMS (Twilio)</th><th>WhatsApp OTP</th></tr>
    </thead>
    <tbody>
      <tr><td>United Kingdom</td><td>$0.0420</td><td>$0.0220</td></tr>
      <tr><td>Germany</td><td>$0.0940</td><td>$0.0550</td></tr>
      <tr><td>Hong Kong</td><td>$0.0682</td><td>$0.0260</td></tr>
      <tr><td>Singapore</td><td>$0.0415</td><td>$0.0160</td></tr>
      <tr><td>Indonesia</td><td>$0.3603</td><td>$0.0250</td></tr>
    </tbody>
  </table>
</div>

The gap is dramatic in high-SMS-cost markets: Indonesia drops by more than 90%. It's more modest in Western Europe. WhatsApp also sidesteps SMS pumping because it doesn't run on carrier toll systems. The catch is reach: the user needs WhatsApp installed, so you keep SMS as an automatic fallback for the minority who don't.

We compare the two channels in detail in [SMS OTP vs WhatsApp OTP](/post/sms-otp-vs-whatsapp-otp), and break down WhatsApp's own pricing model in [WhatsApp API Pricing](/post/whatsapp-api-pricing).

## How to reduce your SMS costs

You don't have to accept the bill as-is. A few levers, roughly in order of impact:

1. **Route OTPs over WhatsApp first, with SMS fallback.** This captures the savings above for the majority of users while still reaching everyone.
2. **Cut OTP volume for returning users.** Passkeys and biometric login skip the OTP entirely on trusted devices, so you stop paying per login for your most active users.
3. **Protect the send endpoint.** Rate limiting and bot detection keep SMS pumping traffic off your bill.
4. **Pick the right provider per country.** As the tables show, the cheapest provider varies by destination. If you send heavily to one region, the routing matters.
5. **Model it before you commit.** Estimate the spend for your real volume and destinations rather than trusting a single average. If you're weighing providers, [Twilio Verify pricing and alternatives](/post/twilio-verify-pricing-and-alternatives) is a useful comparison.

Building all of this yourself is a real engineering project: WhatsApp-first routing with SMS fallback, passkey step-down for returning users, and bot protection on the send endpoint. Authentication platforms like [Authgear](https://www.authgear.com) ship it out of the box, with WhatsApp OTP and automatic SMS fallback, passkeys and biometric login to cut OTP volume, and built-in SMS pumping protection. You can [estimate your savings with the SMS cost calculator](/tools/sms-cost-calculator) before you change anything.

## Frequently Asked Questions

### How much does an SMS message cost through an API?

It depends almost entirely on the destination country. On major providers, a single message ranges from roughly $0.03 in low-cost markets like Thailand to $0.36 or more in high-cost markets like Indonesia. US rates are unusually low (around $0.0083 per message on Twilio) but carry separate A2P registration fees. The per-message rate is only the base; carrier surcharges are often added on top.

### Why is SMS API pricing so expensive?

Three things stack up: the mobile operator's termination fee for delivering the message (which varies wildly by country), A2P (application-to-person) registration and compliance fees, and SMS pumping fraud that inflates your volume with messages no real user requested. Long messages also split into multiple billed segments.

### What are carrier fees on top of the SMS rate?

Many providers quote a base send rate and then add a separate "carrier fee": a pass-through surcharge the destination mobile operator charges. It's billed as its own line item, so your real cost per message is higher than the headline rate in several countries.

### Is WhatsApp OTP cheaper than SMS?

In most high-SMS-cost markets, yes, often 40–90% cheaper per message, and WhatsApp isn't exposed to SMS pumping fraud. The trade-off is reach: the recipient needs WhatsApp installed, so you keep SMS as a fallback for the minority who don't.

### How do I estimate my SMS OTP cost?

Multiply your monthly OTP volume by the per-message rate for each destination country, then add carrier fees and any A2P registration cost. Our free [SMS cost calculator](/tools/sms-cost-calculator) does this across Twilio, Bird, and Plivo and shows the WhatsApp OTP alternative side by side.

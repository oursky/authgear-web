---
title: "WhatsApp API Pricing Explained (2026)"
excerpt: "WhatsApp switched to per-message pricing in 2025. Here's how WhatsApp Business API pricing works in 2026 — by message category and country — and what it really costs to send authentication (OTP) messages."
coverImage: ./cover.webp
category: industry
featured: false
metaTitle: "WhatsApp API Pricing Explained (2026) | Authgear"
metaDescription: "How WhatsApp Business API pricing works in 2026: per-message rates by category and country, a cost breakdown for OTP/authentication messages, and how to cut costs."
publishedAt: 2026-07-09
updatedAt: 2026-07-09
draft: false
faq:
  - q: "How much does the WhatsApp Business API cost in 2026?"
    a: "There is no flat fee for the WhatsApp Business API itself — you pay per message. Since July 2025, Meta charges per delivered template message, priced by category (marketing, utility, authentication) and by the recipient's country. Authentication (OTP) messages typically range from about $0.0014 per message in India to $0.05+ in some European markets. Service messages inside the 24-hour customer service window are free."
  - q: "Is the WhatsApp Business API free?"
    a: "The platform and Cloud API access are free, and non-template service replies within the 24-hour customer service window — plus utility templates sent inside that window — are free. But template messages you initiate — including marketing, utility, and authentication (OTP) messages — are charged per message based on the recipient's country. If you go through a Business Solution Provider (BSP) like Twilio or MessageBird, they add their own per-message markup on top of Meta's rate."
  - q: "How is WhatsApp authentication (OTP) pricing calculated?"
    a: "Each authentication template message you send is charged at Meta's per-message authentication rate for the recipient's country. Rates vary widely: roughly $0.0014 in India, $0.0034 in the US, and $0.02–$0.055 in Western Europe (UK $0.022, Germany $0.055). A separate, higher **authentication-international** rate applies when you send to a country different from your WhatsApp Business Account's registered country (India's, for example, is $0.0304 — about 22× its domestic rate). You are billed for delivered messages, so cost scales with your OTP volume, your users' countries, and whether the sends are domestic or international."
  - q: "Did WhatsApp change its pricing in 2025?"
    a: "Yes. On July 1, 2025, Meta moved from conversation-based pricing (a flat charge per 24-hour conversation window) to per-message pricing for template messages. Utility messages sent inside an open customer service window also became free. This makes authentication and utility messaging cheaper for many businesses, but it means you now need to model cost per message, not per conversation."
  - q: "Is WhatsApp OTP cheaper than SMS?"
    a: "In most markets, yes — often 50–90% cheaper per message. WhatsApp authentication rates are a fraction of SMS rates in high-cost regions, and WhatsApp is not exposed to SMS pumping (toll) fraud. The main trade-off is reach: the recipient must have WhatsApp installed, so you still need an SMS fallback for the minority who don't."
---

> **tl;dr** — There is no flat fee for the WhatsApp Business API; you pay **per message**. Since **July 1, 2025**, Meta charges per *delivered template message*, priced by **category** (marketing, utility, authentication) and the **recipient's country**. Service messages inside the 24-hour customer-service window are free. For authentication (OTP), expect roughly **$0.0014/message in India to $0.05+ in parts of Europe** — a fraction of SMS in most markets.

If you are evaluating WhatsApp for notifications or one-time passwords (OTPs), "how much does the WhatsApp API cost?" is a surprisingly hard question to answer. The pricing model changed in 2025, and the real number depends on *what* you send and *where* your users are.

This guide breaks down WhatsApp Business API pricing as it works in 2026: the message categories, how per-message billing works, real per-country rates for authentication messages, and a worked example so you can estimate your own bill.

## How WhatsApp API pricing works in 2026

First, the thing that trips everyone up: **there is no subscription fee for the WhatsApp Business API.** Access to the WhatsApp Business Platform (including Meta's Cloud API) is free. What you pay for is the **messages you send**.

The big shift happened on **July 1, 2025**, when Meta replaced its old *conversation-based* pricing (a flat charge per rolling 24-hour "conversation") with **per-message pricing**. Now:

- You are charged for each **template message** you send, per the recipient's country.
- The price depends on the message **category** (see below).
- **Service messages** — non-template replies inside the 24-hour window after a user messages you — are **free**, as are utility templates sent inside that window. (Note: the old "1,000 free conversations per month" allowance was part of the deprecated conversation-based model and no longer applies.)

Think of it like postage. The envelope (the API) is free to use; you pay for each letter you actually mail, and the stamp costs more or less depending on where it's going and what kind of letter it is.

## The four message categories

Every message you send falls into one of four categories, and the category determines the price:

<div class="ag-table-wrap">
<table class="ag-table">
<thead>
<tr><th>Category</th><th>What it's for</th><th>Relative cost</th></tr>
</thead>
<tbody>
<tr><td><strong>Marketing</strong></td><td>Promotions, offers, product announcements, re-engagement</td><td>Highest</td></tr>
<tr><td><strong>Utility</strong></td><td>Order updates, receipts, shipping, account notices</td><td>Low (free inside a service window)</td></tr>
<tr><td><strong>Authentication</strong></td><td>One-time passwords (OTPs), login codes, verification</td><td>Low–medium</td></tr>
<tr><td><strong>Service</strong></td><td>Replies to a user-initiated conversation (support)</td><td>Free (within 24h window)</td></tr>
</tbody>
</table></div>

For login and verification flows, the one that matters is **Authentication**. Every OTP or login code you send is an authentication template message, billed at the authentication rate for that user's country.

> ⚠️ **Common mistake:** assuming all WhatsApp messages cost the same. Marketing messages can cost 5–10× more than authentication messages in the same country. If you model your OTP costs using a marketing rate, you will badly overestimate — and vice versa.

## WhatsApp authentication pricing by market

Authentication rates vary enormously by country. These are the per-message authentication rates from Meta's official rate card, effective July 1, 2026. Meta updates the card periodically, so check the current rates for your specific markets before committing.

<div class="ag-table-wrap">
<table class="ag-table">
<thead>
<tr><th>Market</th><th>≈ Authentication rate / message</th><th>Cost per 100,000 OTPs</th></tr>
</thead>
<tbody>
<tr><td>India</td><td>$0.0014</td><td>$140</td></tr>
<tr><td>United States</td><td>$0.0034</td><td>$340</td></tr>
<tr><td>Brazil</td><td>$0.0068</td><td>$680</td></tr>
<tr><td>United Kingdom</td><td>$0.0220</td><td>$2,200</td></tr>
<tr><td>Germany</td><td>$0.055</td><td>$5,500</td></tr>
<tr><td><strong>Global mix (blended)</strong></td><td><strong>$0.0113</strong></td><td><strong>$1,130</strong></td></tr>
</tbody>
</table></div>

Two things stand out: rates in developing markets are extremely low (fractions of a cent), and European rates are 15–40× higher. Your blended cost depends heavily on where your users actually are.

**One rate to watch: authentication-international.** Meta applies a separate, *higher* rate when an OTP is delivered to a country different from the one your WhatsApp Business Account (WABA) is registered in. The gap is large: India's domestic authentication rate is $0.0014, but its authentication-international rate is **$0.0304 — roughly 22× higher**. If you serve users across many countries from a single WABA, model this carefully; for a globally distributed user base it can dominate your bill.

## Worked example: 100,000 OTPs per month

Say you send 100,000 authentication messages a month across a typical global user base. At the blended rate above, that's about **$1,130/month** in WhatsApp authentication fees.

Scale that up:

- **500K OTPs/month** → ≈ $5,650/month
- **1M OTPs/month** → ≈ $11,300/month

Compare that to SMS. Sending the same 100,000 OTPs over SMS on a global mix runs closer to **$8,750/month**, roughly 7–8× more. The gap is widest exactly where WhatsApp adoption is highest (Asia, Latin America, Africa), and narrowest in the US where both channels are relatively cheap. We break this comparison down market by market in [SMS OTP vs WhatsApp OTP](/post/sms-otp-vs-whatsapp-otp).

## WhatsApp API pricing vs SMS

Cost is usually the reason teams look at WhatsApp in the first place, but it isn't the only difference:

<div class="ag-table-wrap">
<table class="ag-table">
<thead>
<tr><th>Factor</th><th>WhatsApp Authentication</th><th>SMS OTP</th></tr>
</thead>
<tbody>
<tr><td>Cost per message (global mix)</td><td>≈ $0.011</td><td>≈ $0.088</td></tr>
<tr><td>Billing model</td><td>Per delivered message, by category + country</td><td>Per message, by country + carrier</td></tr>
<tr><td>Fraud exposure</td><td>Not exposed to SMS pumping</td><td>Vulnerable to SMS pumping (toll fraud)</td></tr>
<tr><td>Reach</td><td>Requires WhatsApp installed (~5–10% need fallback in high-WhatsApp markets; far more in the US, Japan, Korea)</td><td>Any mobile phone</td></tr>
<tr><td>Delivery</td><td>Over the internet; generally reliable</td><td>Carrier network; variable filtering</td></tr>
</tbody>
</table></div>

That fraud line matters more than it looks. SMS pumping — where bots hammer your OTP endpoint to generate paid messages to premium numbers — can inflate an SMS bill overnight. WhatsApp runs on Meta's network, not carrier toll systems, so it sidesteps that attack entirely. (More on that in [What is an SMS pumping attack?](/post/sms-pumping-attack).)

## Hidden costs and gotchas

The per-message rate isn't the whole bill. Watch for:

- **BSP markup.** If you send through a Business Solution Provider (Twilio, MessageBird, Vonage, etc.) rather than Meta's Cloud API directly, they add a per-message fee on top of Meta's rate — sometimes doubling the authentication cost. Going direct is cheaper at scale but more work to build and maintain.
- **Template approval.** Every template must be approved by Meta before use. Authentication templates have a fixed format, which speeds approval, but rejected or paused templates can interrupt your login flow.
- **The WhatsApp Business Account (WABA) setup.** Meta Business verification and phone-number provisioning take time and, occasionally, back-and-forth.
- **Delivery, not sends.** You are billed for *delivered* messages — but you still need a plan for users without WhatsApp (around 5–10% in high-penetration markets like India or Brazil, but well over half in the US, Japan, or South Korea where other messengers dominate), which usually means maintaining an SMS fallback.

## How to cut WhatsApp authentication costs

A handful of levers actually move your WhatsApp bill:

1. **Send OTPs in the Authentication category — not Marketing or Utility.** The category is set by your message template. The same code sent on a marketing template can cost several times more than on an authentication template, and using the wrong category also risks template rejection. Make sure every verification template is classified as Authentication.
2. **Go direct on the Cloud API, or negotiate your BSP rate.** Business Solution Provider markups can nearly double the per-message cost. At meaningful volume, integrating Meta's Cloud API directly — or pushing your BSP for a better authentication rate — is often the single biggest saving on the line item.
3. **Send fewer OTPs.** Every message you don't send is 100% saved, so the highest-leverage move is to stop sending a code on *every* login. Add passkeys or biometrics for returning users, remember trusted devices, and lengthen sessions so an OTP is only needed for new devices and recovery. At scale this can cut OTP volume — and cost — by 80–90%.
4. **Route by reach, not on both channels.** Send over WhatsApp where it's cheapest and fall back to SMS only for users without WhatsApp (roughly 5–10% in high-WhatsApp markets, but a much larger share in the US, Japan, and South Korea) or where delivery fails. Sending on both channels doubles the cost for no benefit.
5. **Protect the send endpoint.** WhatsApp isn't exposed to SMS pumping, but bots can still trigger real OTP sends that you pay for. Rate-limiting and bot protection on your verification endpoint keep abusive traffic off your bill.
6. **Unlock volume-tier discounts.** Meta offers volume-based pricing for utility and authentication messages — the per-message rate steps down as your monthly volume in a given country and category rises (tiers reset each month). Consolidating your authentication traffic rather than splitting it across accounts helps you reach a cheaper tier.

Assembling all of this yourself — authentication-category templates, direct Cloud API routing, a passkey step-down for returning users, WhatsApp-first-with-SMS-fallback, and endpoint protection — is a lot to build and maintain.

> Authgear does it out of the box: WhatsApp-first OTP with automatic SMS fallback, passkey and biometric login to cut OTP volume for returning users, and built-in SMS pumping protection. Estimate your savings with the [SMS cost reduction calculator](/solutions/reduce-sms-otp-cost), or see [WhatsApp OTP](/features/whatsapp-otp) for how it works.

For a fuller breakdown of authentication cost across channels, including passkeys (which drive the marginal cost of returning-user logins toward zero), see [How much does two-factor authentication cost?](/post/two-factor-authentication-cost).

## Frequently Asked Questions

### How much does the WhatsApp Business API cost in 2026?

There is no flat fee for the WhatsApp Business API itself — you pay per message. Since July 2025, Meta charges per delivered template message, priced by category (marketing, utility, authentication) and by the recipient's country. Authentication (OTP) messages typically range from about $0.0014 per message in India to $0.05+ in some European markets. Service messages inside the 24-hour customer service window are free.

### Is the WhatsApp Business API free?

The platform and Cloud API access are free, and non-template service replies within the 24-hour customer service window — plus utility templates sent inside that window — are free. But template messages you initiate — including marketing, utility, and authentication (OTP) messages — are charged per message based on the recipient's country. If you go through a Business Solution Provider (BSP) like Twilio or MessageBird, they add their own per-message markup on top of Meta's rate.

### How is WhatsApp authentication (OTP) pricing calculated?

Each authentication template message you send is charged at Meta's per-message authentication rate for the recipient's country. Rates vary widely: roughly $0.0014 in India, $0.0034 in the US, and $0.02–$0.055 in Western Europe (UK $0.022, Germany $0.055). A separate, higher **authentication-international** rate applies when you send to a country different from your WhatsApp Business Account's registered country (India's, for example, is $0.0304 — about 22× its domestic rate). You are billed for delivered messages, so cost scales with your OTP volume, your users' countries, and whether the sends are domestic or international.

### Did WhatsApp change its pricing in 2025?

Yes. On July 1, 2025, Meta moved from conversation-based pricing (a flat charge per 24-hour conversation window) to per-message pricing for template messages. Utility messages sent inside an open customer service window also became free. This makes authentication and utility messaging cheaper for many businesses, but it means you now need to model cost per message, not per conversation.

### Is WhatsApp OTP cheaper than SMS?

In most markets, yes — often 50–90% cheaper per message. WhatsApp authentication rates are a fraction of SMS rates in high-cost regions, and WhatsApp is not exposed to SMS pumping (toll) fraud. The main trade-off is reach: the recipient must have WhatsApp installed, so you still need an SMS fallback for the minority who don't.

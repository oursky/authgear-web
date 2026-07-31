---
title: "What Is an SMS Sender ID? Types, Registration, and Trade-offs"
excerpt: "An SMS sender ID is the 'from' field of a text message: the name or number a message appears to come from. Here are the types, how alphanumeric sender IDs work, where registration is required, and the trade-offs for branding and deliverability."
coverImage: ./cover.webp
category: engineering
featured: false
metaTitle: "What Is an SMS Sender ID? A Developer's Guide"
metaDescription: "An SMS sender ID is the 'from' field of a text. Learn the types, how alphanumeric sender IDs work, where registration is required, and the trade-offs."
publishedAt: 2026-07-24T11:00:00.000Z
readTime: 8
draft: false
faq:
  - q: "What is a sender ID in SMS?"
    a: "A sender ID is the 'from' field of a text message: the name or number that shows up as the sender on the recipient's phone. It can be a phone number (a long code or short code) or, in supported countries, a branded name such as your company (an alphanumeric sender ID)."
  - q: "What is an alphanumeric sender ID?"
    a: "An alphanumeric sender ID is a sender ID made of letters and numbers, up to 11 characters, that shows a brand name instead of a phone number, for example a message from 'AUTHGEAR'. It's one-way only, so recipients can't reply, and it isn't supported everywhere, including standard A2P messaging in the US and Canada."
  - q: "Do I need to register a sender ID?"
    a: "It depends on the country. Some markets let you use a sender ID instantly (dynamic), while many require pre-registration with the carriers before your messages are delivered, sometimes with supporting documents. Sending an unregistered sender ID into a market that requires registration usually gets the message filtered, rewritten to a random number, or blocked."
  - q: "Why is my sender ID being replaced with a random number?"
    a: "When you send an unregistered alphanumeric sender ID into a country that doesn't support it or requires registration, many providers fall back to a numeric long code so the message still gets through. That's why a text you branded as your company can arrive from an unfamiliar number."
  - q: "Which sender ID type should I use for OTPs?"
    a: "For one-time passwords you don't need replies, so an alphanumeric sender ID (where supported) or a short code both work well and look trustworthy. In the US and Canada, alphanumeric isn't available for standard A2P, so teams typically use a registered short code or 10DLC long code instead."
---

> **tl;dr**: An SMS sender ID is the "from" field of a text: the name or number a message appears to come from. It can be a phone number or, in supported countries, a branded name, and the rules for using each vary a lot by country.

When a text arrives on your phone, the label at the top (a phone number, or a name like your bank) is the **sender ID**. If you're wiring up an SMS API and deciding what your messages should come *from*, or wondering why your carefully branded sender name showed up as a random number, this is the concept to understand. Here's what a sender ID is, the types you can choose, and the registration rules that trip people up.

## What is an SMS sender ID?

A sender ID is the identifier a message is delivered from: the value the recipient sees as the sender. There are two broad groups:

- A **number**, such as a regular phone number or a short code.
- A **name**, such as your brand, spelled out in letters. This is an alphanumeric sender ID.

Which ones you can actually use depends entirely on the destination country, the messaging use case, and whether you've registered. There's no single global standard, which is what makes sender IDs more involved than they first appear.

## The types of SMS sender ID

Most sender IDs fall into three categories. Here's how they compare.

<div class="ag-table-wrap">
  <table class="ag-table">
    <thead>
      <tr><th>Type</th><th>Looks like</th><th>Two-way?</th><th>Best for</th></tr>
    </thead>
    <tbody>
      <tr><td><strong>Long code (numeric)</strong></td><td>A standard 10-digit phone number</td><td>Yes</td><td>Conversations, replies, lower volume</td></tr>
      <tr><td><strong>Short code</strong></td><td>A 4–6 digit number</td><td>Yes</td><td>High-volume, high-throughput sending</td></tr>
      <tr><td><strong>Alphanumeric</strong></td><td>A brand name, e.g. "AUTHGEAR"</td><td>No</td><td>One-way branded alerts and OTPs</td></tr>
    </tbody>
  </table>
</div>

**Long codes** are ordinary phone numbers. They support two-way conversations and are cheap to get, but in the US and Canada, plain long codes are meant for person-to-person texting. For business (A2P) sending, you register them under the 10DLC framework. (Toll-free numbers are a related North American option with their own verification process.)

**Short codes** are the 4-to-6-digit numbers you've seen from banks and delivery services. They're built for volume and high throughput, but they're comparatively expensive and take time to provision and get approved.

**Alphanumeric sender IDs** replace the number with a name. That's the one worth a closer look.

## How alphanumeric sender IDs work

An alphanumeric sender ID lets a message arrive from a readable name instead of digits, up to **11 characters**, using letters, digits, and spaces (with at least one letter, so it isn't just a number). Instead of a text from `+44 7700 900123`, the recipient sees one from your brand.

The trade-off is baked in: alphanumeric sender IDs are **one-way only**. Because the "from" value isn't a real routable number, the recipient can't reply. Their phone has nowhere to send a response. That's fine for a login code or a shipping alert, and a problem for anything conversational.

They also aren't available everywhere. Support is decided country by country, and there's one big exception worth remembering: **alphanumeric sender IDs are not supported for standard A2P messaging in the US and Canada.** North American carriers don't allow arbitrary brand names in the sender field, largely to curb spoofing, so you use a number-based sender ID (a registered short code or 10DLC long code) there instead.

## Sender ID registration: dynamic vs pre-registered

Even where alphanumeric sender IDs are allowed, using one isn't always instant. Countries fall into roughly two buckets:

- **Dynamic (no pre-registration).** You can set a sender ID on the fly and it's delivered as-is. Convenient, but because anyone can, recipients can't fully trust the name.
- **Pre-registration required.** You have to register the sender ID with the carriers before sending, often submitting company details and supporting documents, with a vetting period of days to weeks. Some markets (India is the well-known example) go further and require every message template to be pre-approved too.

The reason registration matters so much is the failure mode. If you send an **unregistered** sender ID into a market that requires it, the message doesn't quietly succeed. Depending on the carrier and provider, it gets **filtered, blocked, or silently rewritten to a random numeric long code** so it can still be delivered. That last one is why a text you branded as your company sometimes shows up from an unfamiliar number, and why users distrust it. Registration rules also change over time, so treat any country-specific detail (including the ones here) as a snapshot to verify with your provider, not a permanent fact.

## Trade-offs: branding, trust, and deliverability

Picking a sender ID is a balance of three things.

- **Branding and trust.** A named sender ID (`YourBank`) reads as more legitimate than a random number and lifts open rates. That same trust is exactly why carriers gate branded IDs behind registration.
- **Two-way capability.** If you need replies (customer support, appointment confirmations by text), you need a number, not an alphanumeric ID.
- **Deliverability and cost.** A registered, appropriate sender ID lands reliably. The wrong or unregistered one gets filtered, and inconsistent sender IDs can trigger spam heuristics. For more on what makes messages actually arrive, see [SMS deliverability](/post/sms-deliverability).

For OTPs specifically, the calculus is easy: you don't need replies, so a branded alphanumeric sender ID (where supported) or a short code both work and look trustworthy, with a numeric fallback in markets like the US where alphanumeric isn't an option.

## What this means for your bill and your setup

Sender IDs feed directly into cost and compliance. Short codes carry setup and monthly fees; registration in strict markets adds paperwork and lead time; and because sender ID support is per-country, a global rollout means juggling different setups per destination. This is part of the wider picture of what drives SMS pricing: see [SMS API pricing explained](/post/sms-api-pricing) and [What is A2P SMS?](/post/what-is-a2p-sms) for the cost model, or estimate your own spend across countries with the [SMS cost calculator](/tools/sms-cost-calculator).

Managing per-country sender IDs, registration, and numeric fallbacks yourself is a lot of moving parts for what is often just "send the user a login code." Authentication platforms like [Authgear](https://www.authgear.com) handle OTP delivery, including sender ID setup and routing, so you get trustworthy, deliverable verification without owning the SMS plumbing.

## Frequently Asked Questions

### What is a sender ID in SMS?

A sender ID is the "from" field of a text message: the name or number that shows up as the sender on the recipient's phone. It can be a phone number (a long code or short code) or, in supported countries, a branded name such as your company (an alphanumeric sender ID).

### What is an alphanumeric sender ID?

An alphanumeric sender ID is a sender ID made of letters and numbers, up to 11 characters, that shows a brand name instead of a phone number, for example a message from "AUTHGEAR". It's one-way only, so recipients can't reply, and it isn't supported everywhere, including standard A2P messaging in the US and Canada.

### Do I need to register a sender ID?

It depends on the country. Some markets let you use a sender ID instantly (dynamic), while many require pre-registration with the carriers before your messages are delivered, sometimes with supporting documents. Sending an unregistered sender ID into a market that requires registration usually gets the message filtered, rewritten to a random number, or blocked.

### Why is my sender ID being replaced with a random number?

When you send an unregistered alphanumeric sender ID into a country that doesn't support it or requires registration, many providers fall back to a numeric long code so the message still gets through. That's why a text you branded as your company can arrive from an unfamiliar number.

### Which sender ID type should I use for OTPs?

For one-time passwords you don't need replies, so an alphanumeric sender ID (where supported) or a short code both work well and look trustworthy. In the US and Canada, alphanumeric isn't available for standard A2P, so teams typically use a registered short code or 10DLC long code instead.

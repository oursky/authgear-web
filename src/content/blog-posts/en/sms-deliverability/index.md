---
title: "SMS Deliverability: Why Your Texts Fail (And How to Fix It)"
excerpt: "SMS deliverability is the share of texts that actually reach a phone. When OTPs don't arrive, logins fail and you often still pay for the send. Here's why messages get lost and how to raise your delivery rate."
coverImage: ./cover.webp
category: engineering
featured: false
metaTitle: "SMS Deliverability: Why Texts Fail & How to Fix It"
metaDescription: "SMS deliverability is the share of texts that actually reach phones. Learn why OTPs fail, what it costs, and how to improve your delivery rate."
publishedAt: 2026-07-24T10:30:00.000Z
readTime: 9
draft: false
faq:
  - q: "What is SMS deliverability?"
    a: "SMS deliverability is the share of the messages you send that actually reach the recipient's phone. It is usually expressed as a delivery rate: messages delivered divided by messages sent. High deliverability matters most for time-sensitive texts like one-time passwords, because a text that never arrives means a login that never completes."
  - q: "Why are my SMS messages not being delivered?"
    a: "The common causes are missing A2P registration (US carriers have blocked unregistered 10DLC traffic outright since February 2025), an unregistered or wrong sender ID, message content that trips carrier spam filters, invalid or ported phone numbers, and cheap 'grey' routes that drop messages. Device-side issues like no coverage, a full inbox, or an inactive SIM account for the rest."
  - q: "What is a good SMS delivery rate?"
    a: "For business messaging on well-configured direct routes, a delivery rate of 95% or higher is a reasonable target, and many domestic transactional flows sit in the 95–98% range. A perfect 100% is not realistic because some numbers are invalid, switched off, or out of coverage. International traffic is usually less reliable than domestic."
  - q: "Do I pay for SMS messages that are not delivered?"
    a: "Often, yes. Most providers bill when they accept a message and hand it to a carrier, not when it reaches the phone. So a filtered or dropped message can still cost you, and a failed OTP means a failed login on top of the wasted spend. Exact billing depends on your provider's terms, so check whether they charge on submission or on confirmed delivery."
  - q: "How can I improve SMS deliverability?"
    a: "Send over tier-1 direct routes instead of grey routes, complete A2P and sender ID registration in every market you target, keep message templates clean and consistent, monitor delivery receipts to catch problems early, and add a fallback channel such as WhatsApp or voice so a failed text doesn't block the user."
---

> **tl;dr**: SMS deliverability is the percentage of your texts that actually reach a phone; it drops when messages hit carrier filters, skip A2P registration, or travel over cheap grey routes, and you can raise it with direct routes, proper registration, clean templates, and a fallback channel.

You send a login code, the user waits, and nothing arrives. They retry, get frustrated, and maybe give up on signing in altogether. Meanwhile your logs say the message was sent. That gap between "sent" and "actually received" is SMS deliverability, and for anything time-sensitive like a one-time password (OTP), it decides whether people can actually use your app.

## What SMS deliverability means

**SMS deliverability** is the share of the messages you send that actually reach the recipient's device. It's usually measured as a **delivery rate**:

> delivery rate = messages delivered ÷ messages sent

If you send 1,000 verification texts and 940 arrive, your delivery rate is 94%. The other 60 are lost somewhere between your app and the handset, and each one is potentially a user who can't log in.

What counts as a healthy number? For well-configured business messaging on good routes, **95% or higher** is a reasonable target, and many domestic transactional flows land in the 95–98% range. A perfect 100% isn't realistic, because some numbers are invalid, switched off, or simply out of coverage. International traffic tends to run lower than domestic.

One catch: your delivery rate is only as honest as the delivery receipts you get back, and as you'll see below, not all of them tell the truth.

## Why your SMS messages don't get delivered

Texts fail for a mix of network, compliance, and content reasons. The most common ones:

- **Missing A2P registration.** Application-to-person (A2P) traffic is business messaging, and carriers increasingly require it to be registered. In the US, every major carrier has blocked unregistered 10DLC (10-digit long code) traffic outright since February 2025, so unregistered messages simply don't get delivered. If you're fuzzy on this, see [What Is A2P SMS?](/post/what-is-a2p-sms).
- **An unregistered or wrong sender ID.** Many countries require the "from" name or number (the sender ID) to be registered in advance. An unregistered sender ID, or one that doesn't match what was approved, gets filtered.
- **Carrier spam filtering.** Carriers scan content for spam signals: shady link shorteners, all-caps urgency, certain keywords, or a sudden volume spike from a new number. Trip the filter and your message is dropped silently, even if registration is fine.
- **Invalid or ported numbers.** Mistyped numbers, disconnected lines, or landlines that can't receive SMS never deliver. Numbers also get ported between carriers, so routing built on stale data can misfire.
- **Grey routes.** Some providers cut costs by sending traffic through unofficial "grey" routes instead of direct carrier connections. These are cheaper but unreliable, and messages get dropped more often under peak load. Worse, grey routes sometimes fake the delivery receipt: they report "delivered" the moment they hand the message off, even if it never reached the network.
- **Device-side issues.** No coverage, an inactive SIM, a full message inbox, or do-not-disturb settings all stop a text at the last step, outside your control.

For OTPs, the frustrating part is that most of these failures are invisible to the user. They just see a code that never came.

## The hidden cost of poor deliverability

Low deliverability costs you twice: once on your SMS bill, and again in lost conversions.

Start with the bill. **You often pay for the send, not the delivery.** Many SMS providers charge as soon as they accept your message and hand it to a carrier, not when it actually reaches the phone. That depends on your provider's terms, though; some bill only on confirmed delivery, or auto-retry failed sends at no extra charge. If yours bills on submission, a message that gets filtered, dropped on a grey route, or sent to a dead number can still show up on your invoice.

Then there's the conversion cost: a lost OTP is a **failed login or a failed signup**. The user can't get in, so they retry (another paid send), contact support, or abandon the flow entirely. For a signup funnel, undelivered verification texts translate directly into lost conversions.

And because SMS is billed per message and per country, small deliverability problems get expensive at scale. If you want to see how per-message pricing adds up across markets, our [SMS API pricing guide](/post/sms-api-pricing) breaks it down, and the [SMS cost calculator](/tools/sms-cost-calculator) lets you estimate your own spend.

## How to improve SMS deliverability

The good news: most deliverability problems are fixable, and the fixes overlap with good compliance hygiene. Start here.

<div class="ag-table-wrap">
  <table class="ag-table">
    <thead>
      <tr><th>Fix</th><th>What it does</th></tr>
    </thead>
    <tbody>
      <tr><td><strong>Use tier-1 direct routes</strong></td><td>Direct carrier connections deliver reliably and return authoritative delivery receipts, unlike grey routes that drop messages and fake DLRs.</td></tr>
      <tr><td><strong>Complete A2P and sender ID registration</strong></td><td>Register 10DLC in the US and the required sender ID or templates in each market. Unregistered traffic gets blocked or filtered.</td></tr>
      <tr><td><strong>Keep templates clean</strong></td><td>Avoid spammy phrasing, sketchy link shorteners, and all-caps urgency. Keep OTP messages short and consistent so filters learn to trust them.</td></tr>
      <tr><td><strong>Monitor delivery receipts</strong></td><td>Watch your delivery rate per country and per route so you can spot a failing route before users complain.</td></tr>
      <tr><td><strong>Validate numbers</strong></td><td>Check number format and validity before sending to avoid paying for texts to dead or non-mobile numbers.</td></tr>
      <tr><td><strong>Add a fallback channel</strong></td><td>If a text doesn't arrive, retry over another channel like WhatsApp or voice so the user isn't stuck.</td></tr>
    </tbody>
  </table>
</div>

A **delivery receipt** (DLR) is the status a carrier sends back telling you whether a message was delivered. Receipts from direct routes come from the carrier's own systems and are trustworthy; receipts from grey routes may come from an intermediate node that reports success prematurely. This is exactly why the route you send on matters: it decides both whether the message arrives and whether you can believe your own numbers.

## When SMS isn't enough: use a fallback channel

Even a well-tuned SMS setup won't hit 100%, so the most reliable OTP flows don't rely on SMS alone. A common pattern is to send verification over **WhatsApp** first, which tends to be more reliable and often cheaper for authentication, and fall back to SMS (or voice) only when needed. We compare the two in [SMS OTP vs WhatsApp OTP](/post/sms-otp-vs-whatsapp-otp).

Wiring up direct routes, per-country registration, delivery monitoring, and channel fallbacks yourself is a real project. Authentication platforms like [Authgear](https://www.authgear.com) handle OTP delivery across channels for you, so you get reliable verification without managing the routing and registration underneath it.

## Frequently Asked Questions

### What is SMS deliverability?

SMS deliverability is the share of the messages you send that actually reach the recipient's phone. It is usually expressed as a delivery rate: messages delivered divided by messages sent. High deliverability matters most for time-sensitive texts like one-time passwords, because a text that never arrives means a login that never completes.

### Why are my SMS messages not being delivered?

The common causes are missing A2P registration (US carriers have blocked unregistered 10DLC traffic outright since February 2025), an unregistered or wrong sender ID, message content that trips carrier spam filters, invalid or ported phone numbers, and cheap "grey" routes that drop messages. Device-side issues like no coverage, a full inbox, or an inactive SIM account for the rest.

### What is a good SMS delivery rate?

For business messaging on well-configured direct routes, a delivery rate of 95% or higher is a reasonable target, and many domestic transactional flows sit in the 95–98% range. A perfect 100% is not realistic because some numbers are invalid, switched off, or out of coverage. International traffic is usually less reliable than domestic.

### Do I pay for SMS messages that are not delivered?

Often, yes. Most providers bill when they accept a message and hand it to a carrier, not when it reaches the phone. So a filtered or dropped message can still cost you, and a failed OTP means a failed login on top of the wasted spend. Exact billing depends on your provider's terms, so check whether they charge on submission or on confirmed delivery.

### How can I improve SMS deliverability?

Send over tier-1 direct routes instead of grey routes, complete A2P and sender ID registration in every market you target, keep message templates clean and consistent, monitor delivery receipts to catch problems early, and add a fallback channel such as WhatsApp or voice so a failed text doesn't block the user.

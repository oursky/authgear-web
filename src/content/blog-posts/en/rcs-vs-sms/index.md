---
title: "RCS vs SMS: Key Differences, Cost, and Which to Use for OTP"
excerpt: "RCS is the feature-rich successor to SMS: richer messages, read receipts, encrypted chats. But for sending OTPs, cost and reach still matter most. Here's how they compare, and where WhatsApp fits."
coverImage: ./cover.webp
category: engineering
featured: false
metaTitle: "RCS vs SMS: Differences, Cost & When to Use Each"
metaDescription: "RCS vs SMS compared: features, security, reach, and real cost. Plus which channel to use for OTP and verification, and why WhatsApp is often cheaper."
publishedAt: 2026-07-22T10:30:00.000Z
readTime: 8
draft: false
faq:
  - q: "What is the difference between RCS and SMS?"
    a: "SMS is the decades-old carrier text standard: plain text, 160 characters, works on every phone. RCS (Rich Communication Services) is its modern successor: rich media, read receipts, typing indicators, longer messages, verified business senders, and encrypted one-to-one chats in supported apps. RCS needs a data connection and a compatible device and carrier; when those aren't present, it falls back to SMS."
  - q: "Is RCS replacing SMS?"
    a: "Gradually, for person-to-person and rich business messaging, especially now that both Android and iOS support it. But SMS isn't going away, because it's the universal fallback that reaches every phone. For automated one-time passwords, SMS and WhatsApp still dominate on reach and cost."
  - q: "Is RCS free?"
    a: "For consumers, RCS messages travel over data (Wi-Fi or mobile data) rather than your SMS plan, so they don't cost per message the way SMS can. For businesses sending A2P messages, RCS Business Messaging is a paid channel billed per message or per conversation by carriers and aggregators, and rates vary widely by market."
  - q: "Is RCS more secure than SMS?"
    a: "It depends what you're comparing. SMS is unencrypted and vulnerable to interception and SIM-swap attacks. RCS added end-to-end encryption for one-to-one chats in Google Messages, and cross-platform encryption between iPhone and Android only started rolling out in 2026. But that encryption doesn't extend to RCS Business Messaging, the channel OTP codes actually travel on. For verification codes specifically, RCS isn't inherently more secure than SMS: neither is end-to-end encrypted on the business side, and both fall back to plain SMS when RCS isn't available."
  - q: "Can you send an OTP over RCS?"
    a: "Technically yes, via RCS Business Messaging where it's available. In practice most verification traffic still goes over SMS or WhatsApp, because RCS A2P coverage is uneven by country and you need an SMS fallback anyway for non-RCS users. That fallback means you rarely escape SMS costs by switching to RCS."
  - q: "Is WhatsApp cheaper than RCS or SMS for OTP?"
    a: "In most high-SMS-cost markets, WhatsApp OTP is significantly cheaper than SMS, often 40–90% less per message, and it isn't exposed to SMS pumping fraud. Compared with RCS, WhatsApp has broader, more predictable A2P availability today. You still keep SMS as a fallback for users without WhatsApp."
---

> **tl;dr**: SMS is the universal, plain-text standard that reaches every phone. RCS (Rich Communication Services) is its modern successor with rich media, read receipts, and encryption, but it needs a compatible device, carrier, and data connection, and falls back to SMS when they're missing. For sending one-time passwords, reach and cost still decide the winner, and that's often SMS or WhatsApp rather than RCS.

If you've noticed your Android texts gaining typing indicators, read receipts, and high-resolution images, you've seen RCS in action. It's the first real update to carrier texting since MMS arrived in the early 2000s, and now that both Android and iOS support it (Apple added RCS in iOS 18, back in late 2024), "RCS vs SMS" is a real decision for anyone sending messages at scale. This guide compares the two on features, security, reach, and cost, then answers the question that matters for developers: which channel should you use to deliver OTPs and verification codes?

## What is SMS?

SMS (Short Message Service) is the original text-messaging standard, built into the mobile network itself. It's plain text, capped at 160 characters per segment, and it works on literally every mobile phone without an app or a data connection. That universality is its superpower and its limitation: SMS reaches everyone, but it can't do anything beyond text, and it's unencrypted.

## What is RCS?

RCS (Rich Communication Services) is a GSMA standard designed to replace SMS and MMS with a modern messaging experience. Google Messages is the default RCS app on Android, and Google's Jibe platform now handles RCS delivery for all three major US carriers, including AT&T and Verizon, which both migrated to it from their own backends. Apple added RCS support in iOS 18, connecting through whichever backend the recipient's carrier uses. Where SMS is a telegram, RCS is a chat app baked into your default messaging.

RCS adds:

- **Rich media**: high-resolution images, video, and carousels
- **Read receipts and typing indicators**
- **Longer messages** and better group chats
- **Verified business senders**: branded, logo'd profiles via RCS Business Messaging (RBM)
- **Encryption**, though how much you get depends on both ends of the chat: Google Messages has supported end-to-end encryption for one-to-one chats for a while, and cross-platform encryption between iPhone and Android only started rolling out in 2026, gradually and only where both devices and the carrier support it

The catch: RCS runs over a data connection and requires a compatible device and carrier. When either is missing, it falls back to SMS. On iPhone specifically, the carrier still has to switch RCS on, so coverage varies by country and network.

## RCS vs SMS: the key differences

<div class="ag-table-wrap">
  <table class="ag-table">
    <thead>
      <tr><th>Factor</th><th>SMS</th><th>RCS</th></tr>
    </thead>
    <tbody>
      <tr><td><strong>Transport</strong></td><td>Carrier network (no data needed)</td><td>Internet / data connection</td></tr>
      <tr><td><strong>Message length</strong></td><td>160 chars per segment</td><td>Thousands of characters</td></tr>
      <tr><td><strong>Rich media</strong></td><td>No (MMS for basic images)</td><td>Yes: images, video, carousels, buttons</td></tr>
      <tr><td><strong>Read receipts / typing</strong></td><td>No</td><td>Yes</td></tr>
      <tr><td><strong>Encryption</strong></td><td>None</td><td>One-to-one chats only; cross-platform rollout started 2026; business messages aren't covered</td></tr>
      <tr><td><strong>Reach</strong></td><td>Every mobile phone</td><td>RCS-capable device + carrier; falls back to SMS</td></tr>
      <tr><td><strong>Business branding</strong></td><td>Alphanumeric sender ID only</td><td>Verified sender with logo and colors (RBM)</td></tr>
      <tr><td><strong>Cost model</strong></td><td>Per message, by destination country</td><td>Per message/conversation (RBM), varies by market</td></tr>
    </tbody>
  </table>
</div>

## What RCS and SMS actually cost

For consumers, RCS messages ride over data instead of the SMS plan, so they don't rack up per-text charges. For businesses, the picture is different, and this is where teams get tripped up.

**SMS** is billed per delivered message, priced by the recipient's country, plus carrier surcharges. Rates swing enormously, from a few cents in some markets to over $0.35 in others. We break the full model down in [SMS API Pricing Explained](/post/sms-api-pricing).

**RCS Business Messaging** (RBM, renamed "RCS for Business" by Google in 2025) is a paid A2P channel: carriers and aggregators bill it per message for one-off sends like OTPs, or per 24-hour conversation once a user replies. In the US, a plain-text RCS message runs about $0.007–$0.02 at the provider's base rate, similar to a plain SMS segment; add images, carousels, or buttons and the price climbs further. So RCS is rarely the cheaper channel per message. Two other things make it hard to treat as a cost saver today:

1. **Availability is uneven.** RBM isn't live for A2P traffic in every country, and coverage differs by carrier. Where it isn't available, you can't use it.
2. **You still need SMS fallback.** Any recipient without RCS gets an SMS instead, so you keep paying SMS rates for that slice of traffic regardless.

In other words, switching automated messages to RCS rarely removes SMS from your bill. It layers a second, usually pricier, channel on top.

## RCS, SMS, or WhatsApp for OTP?

For one-time passwords and verification codes, the priorities are narrow: the code has to arrive, fast, everywhere, at a predictable cost. Rich media and typing indicators don't help a six-digit code.

On those terms:

- **SMS** wins on universal reach (everyone can receive it), but it's the most expensive and the most exposed to fraud. SMS pumping attacks specifically target OTP endpoints, as we cover in [What Is an SMS Pumping Attack?](/post/sms-pumping-attack).
- **RCS** offers verified branding, but its business messages aren't end-to-end encrypted, and uneven A2P availability plus mandatory SMS fallback mean it's not yet a reliable, cheaper OTP channel in most markets.
- **WhatsApp** has become the practical cost-saver for verification. In high-SMS-cost markets it's often 40–90% cheaper per message, has broad and predictable A2P availability, and isn't exposed to SMS pumping. You keep SMS as a fallback for the minority without WhatsApp.

Here's how SMS and WhatsApp OTP compare on price in a few markets (SMS = Twilio base rate; WhatsApp = Meta authentication rate):

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

We go deeper in [SMS OTP vs WhatsApp OTP](/post/sms-otp-vs-whatsapp-otp) and [WhatsApp API Pricing](/post/whatsapp-api-pricing). To see the numbers for your own volume and destinations, the [SMS cost calculator](/tools/sms-cost-calculator) estimates SMS spend across providers and shows the WhatsApp alternative side by side.

## Which should you use?

- **Marketing and customer engagement:** RCS is genuinely better where it's available. It's branded, interactive, and doesn't feel like a text blast. Use it, with SMS fallback.
- **OTP and verification:** lead with the cheapest channel that reaches your users. In practice that's **WhatsApp OTP with automatic SMS fallback**, not RCS. It cuts cost, keeps universal reach through the fallback, and dodges SMS pumping. See [How Much Does Two-Factor Authentication Cost?](/post/two-factor-authentication-cost) for the full comparison across methods.

Building WhatsApp-first delivery with SMS fallback, plus fraud protection on your send endpoint, is a fair amount of plumbing. Authentication platforms like [Authgear](https://www.authgear.com) handle it out of the box, so you get the cheaper channel without maintaining the routing yourself.

## Frequently Asked Questions

### What is the difference between RCS and SMS?

SMS is the decades-old carrier text standard: plain text, 160 characters, works on every phone. RCS (Rich Communication Services) is its modern successor: rich media, read receipts, typing indicators, longer messages, verified business senders, and encrypted one-to-one chats in supported apps. RCS needs a data connection and a compatible device and carrier; when those aren't present, it falls back to SMS.

### Is RCS replacing SMS?

Gradually, for person-to-person and rich business messaging, especially now that both Android and iOS support it. But SMS isn't going away, because it's the universal fallback that reaches every phone. For automated one-time passwords, SMS and WhatsApp still dominate on reach and cost.

### Is RCS free?

For consumers, RCS messages travel over data (Wi-Fi or mobile data) rather than your SMS plan, so they don't cost per message the way SMS can. For businesses sending A2P messages, RCS Business Messaging is a paid channel billed per message or per conversation by carriers and aggregators, and rates vary widely by market.

### Is RCS more secure than SMS?

It depends what you're comparing. SMS is unencrypted and vulnerable to interception and SIM-swap attacks. RCS added end-to-end encryption for one-to-one chats in Google Messages, and cross-platform encryption between iPhone and Android only started rolling out in 2026. But that encryption doesn't extend to RCS Business Messaging, the channel OTP codes actually travel on. For verification codes specifically, RCS isn't inherently more secure than SMS: neither is end-to-end encrypted on the business side, and both fall back to plain SMS when RCS isn't available.

### Can you send an OTP over RCS?

Technically yes, via RCS Business Messaging where it's available. In practice most verification traffic still goes over SMS or WhatsApp, because RCS A2P coverage is uneven by country and you need an SMS fallback anyway for non-RCS users. That fallback means you rarely escape SMS costs by switching to RCS.

### Is WhatsApp cheaper than RCS or SMS for OTP?

In most high-SMS-cost markets, WhatsApp OTP is significantly cheaper than SMS, often 40–90% less per message, and it isn't exposed to SMS pumping fraud. Compared with RCS, WhatsApp has broader, more predictable A2P availability today. You still keep SMS as a fallback for users without WhatsApp.

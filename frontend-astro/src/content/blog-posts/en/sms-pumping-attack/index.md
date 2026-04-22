---
title: "What Is an SMS Pumping Attack? How to Detect and Prevent SMS Toll Fraud"
excerpt: "SMS pumping fraud is when bots flood your OTP endpoint with fake requests to premium-rate numbers — and you foot the bill. Here's how it works, how to detect it, and how to stop it."
coverImage: ./cover.webp
category: engineering
featured: false
metaTitle: "What Is an SMS Pumping Attack? Detect & Prevent"
metaDescription: "Learn how SMS pumping attacks work, how to spot them in your OTP logs, and the steps to prevent SMS toll fraud before it drains your budget."
publishedAt: 2026-03-30T17:47:49.619Z
updatedAt: 2026-03-19T21:16:18.210Z
draft: false
---

## What Is an SMS Pumping Attack?

Imagine waking up to find your SMS bill has increased by ten times overnight — not because your user base exploded, but because a bot quietly sent thousands of OTP requests to premium-rate phone numbers it controls. That's an SMS pumping attack.

**SMS pumping** (also called **SMS toll fraud** or **artificially inflated traffic, AIT**) is a type of fraud where attackers abuse your app's OTP or verification SMS flow to generate revenue for themselves. They do this by submitting phone numbers associated with premium-rate carriers. Every SMS your app sends earns the attacker a small cut of the carrier revenue — at your expense.

It's a form of telecommunications fraud that has been around for years, but it's become dramatically more common as more apps rely on SMS OTP for authentication. If your app has a "Send OTP" button that any visitor can click, you are a potential target.

## How SMS Pumping Works (Step by Step)

Understanding the mechanics helps you design better defenses. Here's how a typical SMS pumping attack unfold:

<ol>
  <li><strong>The attacker partners with a premium-rate carrier.</strong> In some telecom markets, carriers share a portion of termination fees with whoever controls the receiving number. Fraudsters set up accounts with these carriers to pocket a cut of every SMS delivered to numbers on that network.</li>
  <li><strong>The attacker discovers your OTP endpoint.</strong> They find a public-facing form — login, signup, phone verification — that sends an SMS when a phone number is submitted.</li>
  <li><strong>Bots flood the endpoint with premium-rate numbers.</strong> Automated scripts submit thousands of phone number requests, targeting numbers in high-revenue countries or premium-rate ranges. Your app dutifully sends OTP after OTP.</li>
  <li><strong>Your SMS provider charges you for each message.</strong> You pay the per-message rate to your SMS gateway (e.g., Twilio, Vonage) for every OTP sent, whether or not a real user requested it.</li>
  <li><strong>The attacker collects carrier revenue.</strong> The fraudster earns a share of the termination fees — typically fractions of a cent per message, but multiplied across millions of messages, it adds up fast.</li>
</ol>

The attacker bears almost no cost. You bear all of it.

## Real-World Impact: How Bad Can It Get?

SMS pumping attacks can go from zero to a massive bill in hours. A single attack campaign can generate hundreds of thousands of fraudulent OTP sends in one night. At typical SMS gateway pricing:

<div class='ag-table-wrap'><table class='ag-table'><thead><tr><th>Messages Sent</th><th>Cost at $0.08/SMS (typical Africa/Asia rate)</th><th>Cost at $0.11/SMS (e.g., Germany)</th></tr></thead><tbody><tr><td>10,000</td><td>$800</td><td>$1,100</td></tr><tr><td>100,000</td><td>$8,000</td><td>$11,000</td></tr><tr><td>500,000</td><td>$40,000</td><td>$55,000</td></tr></tbody></table></div>

These aren't hypothetical numbers. Developers on forums like Reddit and Hacker News regularly report waking up to five-figure surprise bills after their OTP endpoint was pumped overnight. Some SMS providers will dispute and refund fraudulent charges — but not all, and the process is slow.

## Warning Signs: How to Detect SMS Pumping in Your Logs

The sooner you catch it, the less it costs. Watch for these signals in your application logs and billing dashboards:

### Spike in OTP Requests

A sudden, steep increase in SMS sends — especially at odd hours or overnight — is the most obvious signal. Compare your hourly SMS volume against a 7-day or 30-day rolling baseline. Any spike above 3× normal should trigger an alert.

### Geographic Concentration

Legitimate users are distributed across your actual user base geography. If you're suddenly seeing a high volume of OTP requests for phone numbers in countries where you have few or no users — especially high-cost countries like Burundi, Egypt, or Azerbaijan — that's a strong indicator.

### Low OTP Completion Rate

Track what percentage of OTP sends are followed by a successful verification within the timeout window. Legitimate users verify their OTP most of the time. Pumped numbers rarely do — the attacker doesn't care about completing login, they just need the SMS to be sent. A completion rate below 30–40% warrants investigation.

### Sequential or Patterned Phone Numbers

Bots often generate phone numbers in sequential ranges or use number lists. If your logs show clusters of numbers with the same country code and sequential prefixes, you're likely looking at automated traffic.

### Same IP, Many Phone Numbers

A single IP address or a small subnet submitting OTP requests for dozens of different phone numbers is a clear red flag. Legitimate users don't switch phone numbers repeatedly from the same browser session.

## How to Prevent SMS Pumping Attacks

Defense against SMS pumping is layered. No single control is sufficient on its own — use several together.

### 1. Rate Limit OTP Requests at Multiple Levels

Implement rate limits at the IP level, device fingerprint level, and phone number level:

<ul><li>Allow a maximum of 3–5 OTP requests per phone number per hour</li><li>Allow a maximum of 10 OTP requests per IP address per hour</li><li>Add exponential backoff after each rejected request</li></ul>

This won't stop determined attackers using rotating IPs, but it dramatically raises their cost and slows down automated campaigns.

### 2. Add CAPTCHA or Proof-of-Work Before Sending

Require the user to pass a CAPTCHA (Google reCAPTCHA, hCaptcha, Cloudflare Turnstile) before your app calls the SMS API. This adds friction that bots struggle with. For most apps, the tradeoff between user friction and fraud prevention is worth it — especially for public-facing signup flows.

### 3. Blocklist High-Risk Country Codes (If You Don't Operate There)

If your app has no legitimate user base in certain high-cost telecom markets, consider rejecting phone numbers with those country codes at the application layer. You can maintain an allowlist of the country codes where you actually operate, and return an error for anything outside that list.

<blockquote><p><strong>⚠️ Be careful with this approach.</strong> Don't block countries where you have real users. Combine it with monitoring so you can add new country codes as your user base grows.</p></blockquote>

### 4. Validate Phone Numbers Before Sending

Use a phone number validation API (e.g., Twilio Lookup, Numverify) to check that the number is a valid, active mobile number (not a landline or VoIP number) and not flagged as high-risk or associated with known fraud networks. This adds a small per-lookup cost but can save you from sending bulk SMS to non-existent or fraudulent numbers.

### 5. Monitor and Alert on Spend Anomalies

Set up billing alerts with your SMS provider. Most providers (Twilio, Vonage, MessageBird) let you configure spend alerts or hard caps. Set a daily cap that represents your normal peak usage × 2. This won't prevent an attack, but it will stop it from running unchecked for days.

### 6. Switch High-Volume OTPs to WhatsApp

SMS pumping exploits the economics of traditional telecom routing. WhatsApp authentication messages operate on a different system — Meta's network — and are far less exposed to carrier-level toll fraud. As a bonus, WhatsApp OTP costs 70–90% less than SMS in most markets.

### 7. Reduce OTP Dependency with Passkeys and Biometrics

Every OTP your app doesn't need to send is one fewer attack surface. Passkeys and biometric login eliminate the OTP step entirely for returning users. Once a user has set up a passkey, they never need to receive an SMS again — which means no SMS pumping exposure for that user session.

Learn more about [why passkeys are replacing passwords and OTPs](/post/passkey-vs-password-why-passkeys-are-the-future-of-security) for modern authentication.

## SMS Pumping vs. OTP Harvesting: What's the Difference?

These two attacks are sometimes confused:

<div class='ag-table-wrap'><table class='ag-table'><thead><tr><th>Attack Type</th><th>Goal</th><th>Who Gets Hurt</th><th>Defense</th></tr></thead><tbody><tr><td><strong>SMS Pumping (Toll Fraud)</strong></td><td>Generate fraudulent SMS sends to earn carrier revenue</td><td>You (the developer/company) via inflated SMS bills</td><td>Rate limiting, CAPTCHA, phone validation, spend caps</td></tr><tr><td><strong>OTP Harvesting (Account Takeover)</strong></td><td>Intercept or socially engineer OTP codes to take over user accounts</td><td>Your users (their accounts get compromised)</td><td>Phishing-resistant authentication (passkeys, FIDO2)</td></tr></tbody></table></div>

SMS pumping hurts your wallet. OTP harvesting hurts your users. Both are reasons to move away from SMS OTP as your primary authentication method. For a deeper look at OTP security pitfalls, see our guide on [5 common TOTP mistakes developers make](/post/5-common-totp-mistakes).

## Does Authgear Protect Against SMS Pumping?

Yes. Authgear includes built-in SMS pumping protection — you don't need to build rate limiting, anomaly detection, or phone validation from scratch. Authgear monitors OTP request patterns, flags suspicious activity, and blocks fraudulent sends automatically.

Beyond fraud protection, Authgear also routes OTPs through WhatsApp by default (with SMS fallback), which reduces your per-message cost by 70–90% compared to SMS-only flows. Combine that with passkey support, and you have a cost curve that trends toward zero as your users adopt passwordless login.

If you're evaluating how much SMS pumping — or just routine SMS costs — is costing your business, see our [SMS cost reduction guide](/solutions/reduce-sms-otp-cost) for a breakdown by market and scale.

## Key Takeaways

- SMS pumping fraud exploits your OTP endpoint to generate carrier revenue for attackers — at your cost
- Early warning signs include overnight volume spikes, geographic anomalies, and low OTP completion rates
- Defense requires layered controls: rate limiting, CAPTCHA, phone number validation, and spend alerts
- WhatsApp OTP, passkeys, and biometric login reduce your SMS attack surface while cutting costs
- Platforms like Authgear include fraud protection built-in, so you don't have to implement it yourself

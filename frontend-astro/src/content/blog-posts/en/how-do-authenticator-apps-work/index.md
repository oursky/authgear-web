---
title: "How Do Authenticator Apps Work?"
h1: "How Do Authenticator Apps Work? (TOTP, Secrets, Clock Drift & Safer Alternatives)"
excerpt: "Learn how authenticator apps work: TOTP secrets, QR provisioning, clock drift, recovery codes, and why passkeys (WebAuthn) stop phishing."
coverImage: ./cover.jpg
category: engineering
featured: false
metaTitle: "How Do Authenticator Apps Work? (TOTP, Secrets, Clock Drift & Safer Alternatives)"
metaDescription: "Learn how authenticator apps work: TOTP secrets, QR provisioning, clock drift, recovery codes, and why passkeys (WebAuthn) stop phishing."
publishedAt: 2026-02-12T02:41:55.931Z
updatedAt: 2026-02-12T02:33:54.747Z
draft: false
---

Authenticator apps generate short-lived 6–8 digit codes using **TOTP** (Time-based One-Time Passwords). Your app and the website share a secret key (seed). Every 30 seconds they both compute the same code from that secret + the current time. If your phone’s clock drifts, codes can fail.

## What is an authenticator app?

An authenticator app (Google Authenticator, Microsoft Authenticator, Authy, etc.) is a **second factor** in multi-factor authentication (MFA). Instead of SMS codes, the app generates codes **offline** on your device. Most apps implement the [TOTP standard (RFC 6238)](/post/what-is-totp), which is built on **HMAC-SHA1/256/512** with a rotating time counter.

Want to see TOTP in action? Try our [TOTP Authenticator tool](/tools/totp-authenticator).

**Why apps over SMS?**

- Works offline once set up
- Independent of your phone number (no SIM-swap risk)
- Faster and usually more reliable than SMS
- Standardized: TOTP is well-understood and widely supported.

For background theory, see our earlier explainer: [**What is TOTP?**](/post/what-is-totp)

## How TOTP actually works (step-by-step)

1. **Seed (secret) is provisioned**   When you enable 2FA, the service gives you a base32-encoded secret (the *seed*). You scan a QR code or paste a key.
1. **Both sides compute a moving counter**   Time is split into windows (typically **30 seconds**). The counter = current Unix time ÷ step.
1. **HMAC the counter with the secret**   The app computes `HMAC(secret, counter)` using SHA-1/256/512.
1. **Dynamic truncation → 6–8 digit code**   A chunk of the HMAC output is converted to an integer and reduced mod 10^digits (e.g., 10^6 → 6 digits).
1. **Server verifies**   The server repeats the same calculation. If your code matches within an allowed window (e.g., current ±1 step), you’re in.

**Parameters you’ll see:**

- `digits`: usually 6 (sometimes 7 or 8)
- `period`: usually 30s (can be 60s)
- `algorithm`: SHA1 (default), SHA256, or SHA512

## Seed provisioning: QR codes & otpauth:// URI

When you click “Enable authenticator app” in any supported apps or website, a QR is displayed with an `otpauth://` URI. Scanning it imports the seed and settings.

**Example `otpauth://` URI**

After you enable the authenticator app, a recovery code is usually provided, and you should store recovery codes immediately! (see below)

## Time drift (clock skew) and why codes sometimes fail

TOTPs depend on the current time. If your phone clock is off, your codes may not match the server’s:

- **Small drift**: Servers typically allow ±1 time verification window (e.g., ±30s), so minor skew still works.
- **Significant drift**: Codes fail. Good authenticator apps use **network time** and **auto-correct**. If you’re offline, manually sync your device clock.

If you’re building auth, **Authgear** supports TOTP, recovery codes, and passkeys out of the box—so you can offer strong MFA without the complexity.

## Recovery codes

If you lose or wipe your phone, that TOTP seed is gone—so you’ll need recovery codes:

- Treat recovery codes like **passwords**
- Use each recovery code **once**; generate a fresh set after use or after changing factors.

## Phishing-resistant alternatives: WebAuthn / Passkeys

TOTPs can still be phished: an attacker can proxy your login and relay your one-time code in real time. WebAuthn (passkeys) is different:

- **Phishing-resistant**: Credentials are bound to the origin (domain), so they won’t authenticate on a fake site.
- **Public-key crypto**: Your device stores a private key; the server keeps a public key. No shared secrets or codes.
- **User verification**: Biometrics or device PIN unlock the credential.
- **Multi-device sync** (platform-dependent) makes recovery easier than with raw

## How to use an authenticator app

1. In supported services, go to **Security** → **Two-Factor Authentication**.
1. Choose **Authenticator app** on your device.
1. Scan the QR in your app (or paste the key).
1. Enter the 6-digit code shown in your app to confirm.
1. **Download recovery codes** and store them safely.

Recommended apps:

- [Google Authenticator](https://support.google.com/accounts/answer/1066447) (iOS/Android) — simple, widely supported, optional cloud backup.
- [Microsoft Authenticator](https://www.microsoft.com/en-gb/security/mobile-authenticator-app) (iOS/Android) — great if you use Microsoft accounts; encrypted cloud backup; works for any TOTP site.
- [1Password](https://1password.com/)(iOS/Android/desktop) — password manager with built-in TOTP. Super convenient, but note the trade-off: storing first and second factors together reduces separation of factors—mitigate with a strong master password + 2FA on the vault.
- [Apple Passwords](https://support.apple.com/en-gb/120758) — built-in TOTP on iOS/iPadOS/macOS; syncs across Apple devices.

## FAQ: How do authenticator apps work?

**How do authenticator apps work without the internet?**  
They compute codes locally from a **shared secret + time**. Once the seed is on your device, it doesn’t need network access.

**Can I move my authenticator to a new phone?**  
Yes, but you must **transfer seeds** or **re-enrol**. Some apps support **encrypted backups/sync**. Otherwise, use each service’s **recovery codes** to re-set TOTP on the new device.

**Why are my codes “incorrect”?**  
Most common causes: **wrong account**, **wrong digit length**, or **clock drift**. Ensure 6 digits, 30-second period, and correct device time.

**Are authenticator apps safer than SMS?**  
Yes. They’re not tied to your phone number and resist SIM-swap. However, they are **not** fully phishing-resistant; **WebAuthn / passkeys** are.

**What’s the difference between TOTP and HOTP?**  
**TOTP** changes codes based on **time**; **HOTP** is **counter-based** (code increments per use). Most consumer apps use TOTP.

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How Do Authenticator Apps Work? (TOTP, Secrets, Clock Drift & Safer Alternatives)",
  "description": "Plain-English guide to authenticator apps: how TOTP works, secret provisioning via QR, clock drift and resync, recovery codes, and phishing-resistant passkeys (WebAuthn).",
  "author": {
    "@type": "Organization",
    "name": "Authgear"
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "/post/how-do-authenticator-apps-work"
  },
  "datePublished": "2025-11-07",
  "dateModified": "2025-11-07"
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do authenticator apps work without the internet?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "They generate codes locally from a shared secret and the current time (TOTP). Once the seed is on your device, no network access is required."
      }
    },
    {
      "@type": "Question",
      "name": "Can I move my authenticator to a new phone?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Either export and import your seeds (if supported) or re-enrol TOTP using each service’s recovery codes or backup methods."
      }
    },
    {
      "@type": "Question",
      "name": "Why are my codes incorrect?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Common causes are clock drift, wrong digit length, or picking the wrong account. Ensure 6-digit, 30-second TOTP and correct device time."
      }
    },
    {
      "@type": "Question",
      "name": "Are authenticator apps safer than SMS?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. They avoid SIM-swap and work offline, but they can be phished. WebAuthn/passkeys provide phishing resistance."
      }
    },
    {
      "@type": "Question",
      "name": "What’s the difference between TOTP and HOTP?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "TOTP changes codes based on time windows. HOTP increments a counter per use. Most consumer authenticator apps use TOTP."
      }
    }
  ]
}
</script>

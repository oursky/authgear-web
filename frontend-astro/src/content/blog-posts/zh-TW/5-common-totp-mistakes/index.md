---
title: "5 Common TOTP Mistakes Developers Make (and How to Fix them)"
excerpt: "TOTP codes not working? See 5 common mistakes developers make — clock drift, Base32 secrets, RFC 6238 parameter mismatches — and how to fix them. Includes a free online TOTP Authenticator tool."
coverImage: ./cover.jpg
category: engineering
featured: false
publishedAt: 2026-03-05T12:11:18.391Z
updatedAt: 2026-03-05T12:11:18.391Z
draft: false
---

**TOTP** (*time-based one-time password*) codes seem simple—6 digits, refresh every 30 seconds—but implementation details can break logins fast. If you’re seeing **“invalid TOTP code”** errors, one of these five issues is likely the culprit. Below we explain the symptoms, why they happen, and how to fix them quickly. You can also test each fix live with our [**TOTP Authenticator tool**](/tools/totp-authenticator) (supports SHA-1/256/512, 6–8 digits, and 30-second periods).

## Mistake 1 — Clock drift (server and authenticator out of sync)

**Symptoms:** Codes fail intermittently; users say “it works sometimes.” QA can reproduce locally but not on CI/containers.

**Why it happens:** TOTP derives a code from the **current time**. Even a 30–60s skew between server and client can invalidate a code.

**How to fix:**

- Sync time with <a href="https://www.ntp.org/" target="_blank">NTP (Network Time Protocol)</a>.
- **Allow a verification window** (e.g., ±1 step) during validation so minor drift doesn’t lock users out.
- Log both server time and received code to spot systematic drift.

## Mistake 2 — Wrong secret format (Base32 vs hex, casing, padding)

**Why it happens:** Provisioning often shares the secret in **Base32**. Some developers accidentally treat it as hex/ASCII or strip padding/whitespace incorrectly.

**How to fix:**

- Ensure the stored secret is Base32-decoded correctly.
- From an `otpauth://` URI, extract the `secret=` parameter as Base32. See the <a href="https://github.com/google/google-authenticator/wiki/Key-Uri-Format" target="_blank">Key URI Format spec by Google</a>

## Mistake 3 — RFC 6238 parameter mismatch (digits, period, algorithm)

**Why it happens:** TOTP has configurable parameters. If the server uses **8 digits** but the client expects **6**, or the server uses **SHA-256** while the app uses **SHA-1**, codes won’t align.

**How to fix:**

- Standard defaults: **6 digits**, **30-second period**, **SHA-1**.
- Read the official <a href="https://www.rfc-editor.org/rfc/rfc6238" target="_blank">RFC 6238 spec (IETF)</a> for parameter details.

## Mistake 4 — Wrong provisioning data (otpauth URI / QR issues)

**Why it happens:** The **`otpauth://totp/...`** provisioning URI encodes the label, issuer, secret, algorithm, digits, and period. Typos or truncation cause authenticator apps to save incorrect parameters.

**How to fix:**

- Validate the provisioning URI.
- Cross-check with a reliable authenticator app such as <a href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2" target="_blank">Google Authenticator </a>or <a href="https://authy.com/" target="_blank">Authy</a>.

## Mistake 5 — Naïve verification logic (no window, replay, or rate limiting)

**Why it happens:** Servers that check only the **current time step** can reject valid codes if the user types near a boundary. Without replay checks and rate limiting, attackers can brute-force.

**How to fix:**

- Verify across a small window (±1 step).
- Add replay protection and rate limiting. For code libraries, check out [PyOTP (Python)](https://pyauth.github.io/pyotp/) or <a href="https://www.npmjs.com/package/otplib" target="_blank">otplib (Node.js)</a> for robust implementations.

## Bonus Checklist: Quick Fix for “Invalid TOTP Code”

- ✅ Clocks are NTP-synced
- ✅ Secret is Base32
- ✅ Parameters match RFC 6238
- ✅ URI encodes same parameters
- ✅ Verification window & rate limiting enabled

Need to isolate the problem quickly? Test your secret and parameters with the [Authgear TOTP Authenticator](/tools/totp-authenticator) and confirm codes before going live.

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a TOTP code?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A TOTP code is a short numeric one-time password generated from a shared secret and the current time. It typically has 6 digits and refreshes every 30 seconds."
      }
    },
    {
      "@type": "Question",
      "name": "Why is my TOTP code invalid even though I just generated it?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The most common causes are clock drift between client and server, a Base32 secret parsing issue, or parameter mismatches (digits, period, or algorithm). Sync time via NTP, confirm the secret is Base32, and ensure RFC 6238 parameters match on both sides."
      }
    },
    {
      "@type": "Question",
      "name": "What parameters does RFC 6238 define for TOTP?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "RFC 6238 defines a time step (commonly 30 seconds), code length (often 6 digits), and the HMAC hash algorithm (SHA-1, SHA-256, or SHA-512). Both generator and verifier must use the same settings."
      }
    },
    {
      "@type": "Question",
      "name": "Should I use 6 or 8 digits for TOTP codes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "6 digits is the most widely supported default. 8 digits slightly increase entropy but may reduce usability and compatibility. Choose the length your ecosystem supports consistently."
      }
    },
    {
      "@type": "Question",
      "name": "What is the recommended TOTP time step (period)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "30 seconds is the de facto standard. During verification, allow a small window (for example, ±1 step) to account for minor clock differences."
      }
    },
    {
      "@type": "Question",
      "name": "How can I quickly test and debug a TOTP implementation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use a developer tool that lets you set algorithm (SHA-1/256/512), digits (6/8), and period (30s). For example, Authgear’s TOTP Authenticator tool can generate and verify codes so you can match server output before going live."
      }
    }
  ]
}
</script>

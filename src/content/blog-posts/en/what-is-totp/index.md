---
title: "What is TOTP? A short guide for developers (RFC 6238 explained)"
excerpt: "What is TOTP (Time-based One-Time Password)? A concise RFC 6238 explanation for developers with code examples (Node, Python, Go), troubleshooting tips, and a free online TOTP tool."
coverImage: ./cover.jpg
category: engineering
featured: false
metaTitle: "What is TOTP? A short guide for developers (RFC 6238 explained)"
metaDescription: "What is TOTP (Time-based One-Time Password)? A concise RFC 6238 explanation for developers with code examples (Node, Python, Go), troubleshooting tips, and a free online TOTP tool."
publishedAt: 2025-08-27T18:26:20.647Z
updatedAt: 2026-05-05T00:00:00.000Z
draft: false
faq:
  - q: "What is TOTP?"
    a: "TOTP (Time-based One-Time Password) is an algorithm defined in RFC 6238 that generates short numeric codes — typically 6 digits, refreshed every 30 seconds — from a shared secret and the current Unix time. It is the mechanism used by Google Authenticator, Authy, 1Password, and most other authenticator apps."
  - q: "How does TOTP work?"
    a: "The server and client share a Base32 secret at enrolment. Both sides divide the current Unix time by a 30-second time step to produce a moving counter, compute HMAC-SHA1 of that counter with the shared secret, then apply a dynamic-truncation step to extract a 6-digit code. Because both sides use the same secret and time, the codes match without any network communication during verification."
  - q: "What is the standard TOTP time step?"
    a: "30 seconds. This is the value RFC 6238 recommends and what every major authenticator app uses by default. Servers typically allow a ±1 step verification window (so codes from the previous and next 30-second window are also accepted) to tolerate small clock differences."
  - q: "How many digits should a TOTP code have?"
    a: "6 digits is the de-facto standard and what RFC 6238 uses in its examples. 8-digit codes add brute-force resistance but are noticeably harder for users to type — most apps and servers stick with 6 and rely on rate limiting for security."
  - q: "Is TOTP secure?"
    a: "TOTP is secure against remote password-only attacks and credential stuffing, provided the shared secret is stored safely on both sides. Its weaknesses are: phishability (users can be tricked into typing a code into a fake site), and shared-secret theft (if the server's TOTP secret store leaks, every user must re-enrol). For phishing-resistant MFA, prefer FIDO2 / passkeys."
  - q: "What is the difference between TOTP and HOTP?"
    a: "HOTP (HMAC-based OTP, RFC 4226) increments a counter on each use; the server and client must keep the counter in sync. TOTP (RFC 6238) replaces the counter with the current time divided by 30 seconds, eliminating the need to track per-use state. TOTP is the basis for almost every modern authenticator app."
  - q: "Why does my TOTP code not match the server?"
    a: "Three causes account for almost all TOTP mismatches: clock skew (one side's clock is wrong — sync via NTP), the wrong Base32 secret (spaces, padding, or copying from the QR's display name instead of the secret parameter), or algorithm/digit mismatch (the server uses SHA-256 + 8 digits but the client defaulted to SHA-1 + 6)."
  - q: "Can the same TOTP code be reused?"
    a: "It should not be. Although a code is mathematically valid for the entire 30-second window (and possibly the ±1-step grace window), the server should reject any code that has already been used by recording the last accepted time step per user. Otherwise an attacker who shoulder-surfs a code has up to 90 seconds to use it."
---

> **tl;dr** — TOTP (Time-based One-Time Password, RFC 6238) is a 6-digit code that refreshes every 30 seconds, computed from a shared Base32 secret plus the current time using HMAC-SHA1. The server and the user's authenticator app independently produce the same code as long as their clocks agree — no network call, no state, just a shared secret and a clock.

TOTP (Time-based One-Time Password) is a simple, widely used method for generating short-lived numeric codes from a shared secret and the current time (RFC 6238). Typical use: 6-digit codes that refresh every 30 seconds. This guide explains how it works, common pitfalls, and shows quick examples in Node, Python, and Go. Try the <a href="/tools/totp-authenticator" target="_blank">live TOTP generator</a>.

## What is TOTP

TOTP stands for **Time-based One-Time Password**. It uses a shared secret (usually a Base32 string) and the current time to create short numeric codes that expire quickly — commonly every 30 seconds. TOTP is standardized by <a href="https://datatracker.ietf.org/doc/html/rfc6238" target="_blank">**IETF RFC 6238** </a>and is the mechanism behind most authenticator apps (<a href="https://en.wikipedia.org/wiki/Google_Authenticator" target="_blank">Google Authenticator</a>, <a href="https://www.authy.com/" target="_blank">Authy</a>, [Authgear TOTP Generator](/tools/totp-authenticator), etc.).

## How TOTP works

1. **Shared secret** — The server and client (authenticator) agree on a shared secret when 2FA is set up. That secret is often encoded in Base32.
1. **Time step** — The current Unix time is divided by a timestep (typically 30 seconds) to create a moving counter.
1. **HMAC** — The server and client compute an HMAC over the counter using a chosen hash algorithm (SHA-1, SHA-256, or SHA-512).
1. **Truncation** — A dynamic truncation step extracts a numeric code of fixed length (commonly 6 digits).
1. **Validation** — On login, the server computes the expected TOTP(s) and checks whether the user-provided code matches (often allowing ±1 timestep for clock skew).

In short:

> `TOTP = Truncate(HMAC(secret, floor(currentTime / timestep))) % 10^digits.`

## Important parameters

- **Secret format:** Base32 (alphanumeric, e.g., `JBSWY3DPEHPK3PXP`).
- **Timestep (period):** Usually **30 seconds** (RFC 6238 recommended).
- **Digits:** Usually **6**, sometimes **8**. 6 balances usability & security.
- **Algorithm:** `SHA-1` (most compatible), `SHA-256` or `SHA-512` (stronger hashes if supported by both ends).

## Quick code examples

Replace `SECRET_BASE32` with your Base32 secret. These examples use standard, well-maintained libraries.

### Node.js (otplib)

```javascript
import { authenticator } from 'otplib';

// Server: generate a secret on enrolment
const secret = authenticator.generateSecret();        // Base32

// Client/server: generate the current code
const token = authenticator.generate(secret);
console.log(token);                                   // e.g. "492039"

// Server: verify a code submitted by the user
const isValid = authenticator.verify({
  token: '492039',
  secret,
  // window: 1,  // optional ±1 step tolerance
});
```

`otplib` defaults to RFC 6238 standard parameters — 30-second step, 6 digits, SHA-1 — which match every major authenticator app.

### Python (pyotp)

```python
import pyotp

# Server: generate a secret on enrolment
secret = pyotp.random_base32()

# Client/server: generate the current code
totp = pyotp.TOTP(secret)
print(totp.now())                  # e.g. "492039"

# Server: verify a code submitted by the user
ok = totp.verify("492039", valid_window=1)   # ±1 step tolerance
```

`pyotp` also generates an `otpauth://` provisioning URI (`totp.provisioning_uri(name=email, issuer_name="My App")`) which you can render as a QR code for users to scan with Google Authenticator.

### Go (pquerna/otp)

```go
package main

import (
    "fmt"
    "time"

    "github.com/pquerna/otp/totp"
)

func main() {
    // Server: generate a secret on enrolment
    key, _ := totp.Generate(totp.GenerateOpts{
        Issuer:      "My App",
        AccountName: "alice@example.com",
    })

    // Client/server: generate the current code
    code, _ := totp.GenerateCode(key.Secret(), time.Now())
    fmt.Println(code) // e.g. "492039"

    // Server: verify a code submitted by the user
    valid := totp.Validate("492039", key.Secret())
    fmt.Println(valid)
}
```

`pquerna/otp` returns a `*otp.Key` whose `URL()` method produces a Google-Authenticator-compatible `otpauth://` URI for QR rendering.

## Common pitfalls & troubleshooting

- **Clock skew** — TOTP depends on accurate time. If codes “don’t match”, sync the server and authenticator clock (NTP) or allow a verification window of ±1 timestep.
- **Wrong secret format** — Ensure the secret is Base32 and remove spaces. If you have a QR `otpauth://` URL, extract `secret=`.
- **Algorithm/digit mismatch** — Server and client must use the same `algorithm` (SHA-1/256/512) and `digits` (6/8). Mismatches are a very common source of failures.
- **Using production secrets in shared tools** — Don’t store production secrets in online tools. Use local/offline generators or internal test secrets.

## Security considerations

- TOTP is **something you have** (the shared secret) — it’s effective against remote password-only attacks but can be bypassed if the secret is stolen.
- Use TOTP as **part of a multi-factor auth** approach, combine with secure server-side policies (rate limiting, anomaly detection).
- Prefer SHA-256/512 if you control both sides and want a stronger HMAC than SHA-1 — but keep compatibility in mind.

## When to use TOTP

- **Good:** human logins, admin access, developer test flows, internal tools.
- **Not great:** high-risk unattended API access (use client certificates, OAuth tokens, or hardware-backed keys for stronger guarantees).
- **Alternative MFA methods:** push-based MFA, FIDO2/WebAuthn i.e. [Passkeys](/features/passkeys) (phishable-resistant), hardware tokens.

## How to test your integration

1. Extract the shared secret from the provisioning flow (Base32).
1. Generate a TOTP locally using one of the library examples above.
1. Verify server-side acceptance with a small window (±1 step) for clock skew.
1. Test algorithm/digits mismatch scenarios intentionally to confirm your server logs clear errors.
1. Use a test-only tool to preview codes without exposing production secrets — try: **Authgear TOTP Authenticator**: <a href="/tools/totp-authenticator" target="_blank">/tools/totp-authenticator</a>

## FAQ

**Q: What is the standard TOTP timestep?**  
A: 30 seconds (RFC 6238 recommends 30s).

**Q: How many digits should I use?**  
A: 6 digits is standard; 8 digits adds entropy but reduces usability.

**Q: Is TOTP secure?**  
A: TOTP is secure against many attacks when secrets are kept safe and used with additional controls (rate limits, device binding). For highest security, consider FIDO2/Passkeys where appropriate.

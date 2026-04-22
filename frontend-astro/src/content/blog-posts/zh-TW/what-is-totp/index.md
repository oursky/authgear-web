---
title: "What is TOTP? A short guide for developers (RFC 6238 explained)"
excerpt: "What is TOTP (Time-based One-Time Password)? A concise RFC 6238 explanation for developers with code examples (Node, Python, Go), troubleshooting tips, and a free online TOTP tool."
coverImage: ./cover.jpg
category: engineering
featured: false
publishedAt: 2025-11-07T16:32:47.393Z
updatedAt: 2025-11-07T16:32:47.393Z
draft: false
---

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

### Node (otplib)

### Python (pyotp)

### Go (pquerna/otp)

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

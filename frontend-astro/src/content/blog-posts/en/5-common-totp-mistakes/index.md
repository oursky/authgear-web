---
title: "5 Common TOTP Mistakes Developers Make (and How to Fix Them in 2026)"
excerpt: "TOTP codes not working in 2026? See the 5 most common mistakes developers make — clock drift, Base32 secrets, RFC 6238 mismatches, and weak verification logic — and how to fix each one with Python and JavaScript code examples."
coverImage: ./cover.jpg
category: engineering
featured: false
metaTitle: "5 Common TOTP Mistakes Developers Make (2026 Guide)"
metaDescription: "TOTP not working? Fix 5 common developer mistakes — clock drift, Base32 format issues, RFC 6238 mismatches, and weak verification. Python and JS code examples."
publishedAt: 2025-08-27T19:07:44.104Z
updatedAt: 2026-03-05T12:11:18.399Z
draft: false
---

**TOTP** (*time-based one-time password*) remains the backbone of two-factor authentication for millions of apps—and in 2026, it's often the fallback 2FA method behind passkey-based login flows. Six digits, 30 seconds, simple. But implementation mistakes can silently break logins for entire user groups.

If you're seeing **"invalid TOTP code"** errors, one of the five mistakes below is almost certainly the cause. Each section explains the symptom, root cause, and a concrete fix—with Python and JavaScript code examples. Test any fix live with our free [**TOTP Authenticator tool**](/tools/totp-authenticator) (supports SHA-1/256/512, 6–8 digits, and custom periods).

## The 5 TOTP Mistakes at a Glance

<div class='ag-table-wrap'><table class='ag-table'><thead><tr><th>#</th><th>Mistake</th><th>Symptom</th><th>Quick Fix</th></tr></thead><tbody><tr><td>1</td><td>Clock drift</td><td>Codes fail intermittently</td><td>Sync server with NTP, allow ±1 step window</td></tr><tr><td>2</td><td>Base32 format error</td><td>All codes fail, consistently</td><td>Decode secret as Base32 from the otpauth URI</td></tr><tr><td>3</td><td>RFC 6238 parameter mismatch</td><td>Codes never match between client and server</td><td>Confirm digits, period, and algorithm on both sides</td></tr><tr><td>4</td><td>Bad provisioning URI</td><td>New users can't scan or set up TOTP</td><td>Validate the otpauth:// URI before QR generation</td></tr><tr><td>5</td><td>Weak verification logic</td><td>Users locked out at step boundaries; brute-force risk</td><td>Add ±1 window, replay protection, and rate limiting</td></tr></tbody></table></div>

## Mistake 1 — Clock Drift (Server and Authenticator Out of Sync)

**Symptoms:** Codes fail intermittently. Users say "it works sometimes." QA reproduces it locally but not on CI or containers.

**Why it happens:** TOTP derives the current code from the Unix timestamp divided by the time step (default: 30 seconds). A clock skew of even 30–60 seconds between server and client will cause a valid code to fail. Containers and VMs are especially prone to drift after hibernation or live migration.

**How to fix:**

- Sync your server with <a href="https://www.ntp.org/" target="_blank">NTP (Network Time Protocol)</a>. On Linux: `systemctl enable --now chronyd`
- Add a **verification window** of ±1 time step. This accepts codes from up to 30 seconds before and after the current step—covering real-world drift without a large attack window.
- Log the server timestamp and code step counter alongside failures to spot systematic drift.

```
import pyotp

def verify_totp_with_window(secret: str, code: str, window: int = 1) -> bool:
    """
    Verify a TOTP code with clock drift tolerance.
    window=1 accepts codes from the previous and next time step (+-30 seconds).
    """
    totp = pyotp.TOTP(secret)
    return totp.verify(code, valid_window=window)

# Usage
secret = "JBSWY3DPEHPK3PXP"  # Base32-encoded secret
user_code = "123456"

if verify_totp_with_window(secret, user_code):
    print("Code accepted")
else:
    print("Code rejected -- check clock sync")

```

```
import { TOTP } from 'otpauth';

function verifyTOTPWithWindow(secret, code, window = 1) {
  // window=1 accepts codes +-1 time step (+-30 seconds)
  const totp = new TOTP({ secret, digits: 6, period: 30 });

  // validate() returns how many steps off the code is, or null if invalid
  const delta = totp.validate({ token: code, window });
  return delta !== null;
}

// Usage
const secret = 'JBSWY3DPEHPK3PXP';
const userCode = '123456';

if (verifyTOTPWithWindow(secret, userCode)) {
  console.log('Code accepted');
} else {
  console.log('Code rejected -- check clock sync');
}

```

⚠️ **Keep the window small:** A window of ±1 gives users a 90-second grace period. A window of ±2 doubles the attack surface to 5 minutes. Stick to window=1 in production.

## Mistake 2 — Wrong Secret Format (Base32 vs Hex, Casing, Padding)

**Symptoms:** All codes fail, consistently, for all users. The authenticator app generates codes, but nothing ever matches. Switching authenticator apps doesn't help.

**Why it happens:** TOTP secrets are encoded in **Base32** inside the provisioning URI. Some developers accidentally treat the Base32 string as raw ASCII bytes, apply a hex decode, or strip the `=` padding characters incorrectly. The result is a completely different byte sequence—so every code is wrong.

**How to fix:** The `secret=` parameter in an `otpauth://` URI is always Base32. Strip whitespace, uppercase it, and decode as Base32.

```
import base64
import pyotp

def parse_secret(secret_str: str) -> str:
    """
    Normalize and validate a TOTP secret string.
    Base32 only uses A-Z and 2-7, plus optional = padding.
    """
    # Strip spaces and uppercase (Base32 is case-insensitive)
    normalized = secret_str.replace(" ", "").upper()

    # Add padding if missing (Base32 strings must be multiples of 8 chars)
    padding_needed = len(normalized) % 8
    if padding_needed:
        normalized += "=" * (8 - padding_needed)

    # Validate it decodes correctly as Base32
    try:
        base64.b32decode(normalized)
    except Exception as e:
        raise ValueError(f"Secret is not valid Base32: {e}")

    return normalized

# Correct usage
secret = parse_secret("JBSWY3DP EHPK3PXP")  # strips spaces, fixes padding
totp = pyotp.TOTP(secret)
print(totp.now())  # generates the correct code

# Wrong: do NOT decode from hex or cast to raw bytes
# secret_bytes = bytes.fromhex(secret_hex)  # this is wrong!

```

```
function parseSecret(secretStr) {
  // Normalize: strip whitespace and uppercase
  const normalized = secretStr.replace(/\s/g, '').toUpperCase();

  // Validate: Base32 only uses A-Z and 2-7
  if (!/^[A-Z2-7]+=*$/.test(normalized)) {
    throw new Error(`Invalid Base32 secret: "${normalized}"`);
  }

  return normalized;
}

// Correct usage
const secret = parseSecret('JBSWY3DP EHPK3PXP');
console.log(secret); // "JBSWY3DPEHPK3PXP"

// Wrong: do NOT treat the secret as UTF-8 or hex
// const secretBytes = Buffer.from(secret, 'hex');  // wrong!

```

Quick check: a valid Base32 secret only contains `A–Z` and `2–7` (plus optional `=` padding). If yours has lowercase letters, numbers outside 2–7, or symbols, something went wrong during generation or storage.

## Mistake 3 — RFC 6238 Parameter Mismatch (Digits, Period, Algorithm)

**Symptoms:** Both client and server generate codes, but they never match. Swapping to a different authenticator app sometimes (but not always) helps.

**Why it happens:** <a href="https://www.rfc-editor.org/rfc/rfc6238" target="_blank">RFC 6238</a> defines three configurable TOTP parameters. If the server and client disagree on any of them, codes will never align:

- **digits** — Code length. Default is 6. If your server generates 8-digit codes but the client expects 6, they'll never match.
- **period** — Time step in seconds. Default is 30. A 60-second step generates completely different codes than a 30-second step.
- **algorithm** — HMAC hash function. Default is SHA-1. Google Authenticator and Authy default to SHA-1; using SHA-256 breaks compatibility with most authenticator apps.

```
import pyotp

# Correct: use RFC 6238 defaults for maximum compatibility
totp = pyotp.TOTP(
    secret,
    digits=6,     # 6 digits -- universal default
    interval=30,  # 30-second period -- standard
    # SHA-1 is pyotp's default -- don't change unless you control both ends
)

# Mismatch example: server uses 8 digits, client expects 6
totp_server = pyotp.TOTP(secret, digits=8)
totp_client = pyotp.TOTP(secret, digits=6)

server_code = totp_server.now()  # e.g., "12345678"
client_code = totp_client.now()  # e.g., "345678" -- last 6 digits of 8
print(server_code == client_code)  # False -- they will never match

```

```
import { TOTP } from 'otpauth';

// Correct: explicit standard parameters
const totp = new TOTP({
  secret,
  digits: 6,        // 6 digits -- universal default
  period: 30,       // 30-second period
  algorithm: 'SHA1' // SHA-1 -- most compatible
});

// Mismatch example: different algorithm breaks compatibility
const totpServer = new TOTP({ secret, digits: 8, period: 30, algorithm: 'SHA256' });
const totpClient = new TOTP({ secret, digits: 6, period: 30, algorithm: 'SHA1' });

console.log(totpServer.generate()); // e.g., "87654321"
console.log(totpClient.generate()); // e.g., "654321" -- different, will never match

```

💡 **Recommendation:** Unless you fully control both the authenticator app and your server, use the RFC 6238 defaults: **6 digits, 30-second period, SHA-1**. Non-standard parameters break Google Authenticator, Authy, 1Password, and most hardware tokens.

## Mistake 4 — Wrong Provisioning Data (otpauth URI / QR Issues)

**Symptoms:** New users scan the QR code successfully but can't log in. Existing users (enrolled before your change) are fine. The issue only affects fresh enrollments.

**Why it happens:** During TOTP enrollment, you generate an `otpauth://totp/...` URI and display it as a QR code. This URI encodes the label, issuer, secret, and all TOTP parameters. A typo, truncated secret, or wrong parameter in the URI means the authenticator app stores the wrong configuration—and you won't find out until the user tries to log in.

The URI format is:

```
otpauth://totp/{LABEL}?secret={BASE32_SECRET}&issuer={ISSUER}&algorithm=SHA1&digits=6&period=30

```

```
import pyotp
import urllib.parse

def generate_and_validate_totp_uri(secret: str, account: str, issuer: str) -> str:
    """
    Generate a TOTP provisioning URI and validate it round-trips correctly.
    Always validate before encoding to a QR code.
    """
    totp = pyotp.TOTP(secret)
    uri = totp.provisioning_uri(name=account, issuer_name=issuer)

    # Parse the URI back and verify the secret is intact
    parsed = urllib.parse.urlparse(uri)
    params = urllib.parse.parse_qs(parsed.query)

    stored_secret = params.get("secret", [None])[0]
    if stored_secret != secret:
        raise ValueError(f"Secret mismatch in URI: expected {secret}, got {stored_secret}")

    return uri

# Usage
uri = generate_and_validate_totp_uri(
    secret="JBSWY3DPEHPK3PXP",
    account="user@example.com",
    issuer="YourApp"
)
print(uri)
# otpauth://totp/YourApp:user%40example.com?secret=JBSWY3DPEHPK3PXP&issuer=YourApp

```

```
import { TOTP, URI } from 'otpauth';

function generateAndValidateTOTPUri(secret, account, issuer) {
  // Generate the otpauth:// URI
  const totp = new TOTP({ issuer, label: account, secret });
  const uri = totp.toString();

  // Validate: parse back and confirm the secret survived
  const parsed = URI.parse(uri);
  if (parsed.secret.base32 !== secret) {
    throw new Error(`Secret mismatch in URI: expected ${secret}, got ${parsed.secret.base32}`);
  }

  return uri;
}

// Usage
const uri = generateAndValidateTOTPUri(
  'JBSWY3DPEHPK3PXP',
  'user@example.com',
  'YourApp'
);
console.log(uri);
// otpauth://totp/YourApp:user%40example.com?secret=JBSWY3DPEHPK3PXP&issuer=YourApp

```

⚠️ **Test with real apps before launch:** Scan your QR code with both Google Authenticator and Authy. If both generate codes your server accepts, your provisioning flow is correct.

## Mistake 5 — Naïve Verification Logic (No Window, Replay Protection, or Rate Limiting)

**Symptoms:** Users get locked out when typing a code at the exact 30-second boundary. Or your security team flags that 6-digit codes are brute-forceable without lockout.

**Why it happens:** A verifier that checks only the current time step rejects valid codes submitted just as the step rolls over. Without replay protection, an attacker who captures a valid code can reuse it within the 30-second window. Without rate limiting, all 1,000,000 possible 6-digit codes can be tried quickly.

```
import pyotp
import time

# In production, use Redis -- in-memory won't survive restarts
used_codes: set = set()
attempt_counts: dict = {}

def verify_totp_secure(
    secret: str,
    code: str,
    user_id: str,
    window: int = 1,
    max_attempts: int = 5,
    lockout_seconds: int = 300
) -> dict:
    """
    Secure TOTP verification with:
    1. Clock window (+-1 step tolerance)
    2. Replay protection (each code accepted once per step)
    3. Rate limiting (lock after N failed attempts)
    """
    now = int(time.time())

    # 1. Rate limiting check
    record = attempt_counts.get(user_id, {"count": 0, "reset_at": now + lockout_seconds})
    if record["count"] >= max_attempts and now < record["reset_at"]:
        return {"success": False, "error": "Too many attempts. Try again later."}

    # 2. Replay protection
    current_step = now // 30
    code_key = f"{user_id}:{code}:{current_step}"
    if code_key in used_codes:
        return {"success": False, "error": "Code already used."}

    # 3. Verify with clock window
    totp = pyotp.TOTP(secret)
    if totp.verify(code, valid_window=window):
        used_codes.add(code_key)
        attempt_counts.pop(user_id, None)  # Reset on success
        return {"success": True}

    # Increment failure counter
    attempt_counts[user_id] = {
        "count": record["count"] + 1,
        "reset_at": record["reset_at"]
    }
    return {"success": False, "error": "Invalid code."}

```

```
import { TOTP } from 'otpauth';

// In production, use Redis -- in-memory won't survive restarts
const usedCodes = new Set();
const attemptCounts = new Map();

function verifyTOTPSecure(secret, code, userId, {
  window = 1,
  maxAttempts = 5,
  lockoutSeconds = 300
} = {}) {
  const now = Math.floor(Date.now() / 1000);

  // 1. Rate limiting check
  const record = attemptCounts.get(userId) ?? { count: 0, resetAt: now + lockoutSeconds };
  if (record.count >= maxAttempts && now < record.resetAt) {
    return { success: false, error: 'Too many attempts. Try again later.' };
  }

  // 2. Replay protection
  const currentStep = Math.floor(now / 30);
  const codeKey = `${userId}:${code}:${currentStep}`;
  if (usedCodes.has(codeKey)) {
    return { success: false, error: 'Code already used.' };
  }

  // 3. Verify with clock window
  const totp = new TOTP({ secret, digits: 6, period: 30 });
  const delta = totp.validate({ token: code, window });

  if (delta !== null) {
    usedCodes.add(codeKey);
    attemptCounts.delete(userId);
    return { success: true };
  }

  attemptCounts.set(userId, { count: record.count + 1, resetAt: record.resetAt });
  return { success: false, error: 'Invalid code.' };
}

```

💡 **Production note:** Replace the in-memory `Set` and `Map` with Redis so state persists across server restarts and works in multi-instance deployments. Set a TTL on used codes of ~60 seconds (2 time steps) to keep memory usage bounded.

Don't want to implement this from scratch? [Authgear]() handles TOTP enrollment, verification, replay protection, and rate limiting out of the box. [See how Authgear implements TOTP](https://docs.authgear.com/concepts/authenticator-and-identity/totp).

## Bonus Checklist: Quick Fix for "Invalid TOTP Code"

- Server clock is NTP-synced
- Verification uses a ±1 step window
- Secret is stored and decoded as Base32
- TOTP parameters match RFC 6238 (6 digits, 30s, SHA-1)
- Provisioning URI encodes the same parameters as the server
- Replay protection: each code accepted only once per time step
- Rate limiting: account locked after N failed attempts

Need to isolate the problem fast? Test your secret and parameters live with the [Authgear TOTP Authenticator](/tools/totp-authenticator)—confirm the server and client generate the same code before going live.

For a deeper look at how TOTP works under the hood, see our guide on [What is TOTP and How Does It Work](/post/what-is-totp). If you're evaluating passkeys as a stronger alternative to TOTP-based 2FA, read [Passkeys vs Passwords: Are Passkeys Safer?](/post/passkey-vs-password-why-passkeys-are-the-future-of-security)

<script type='application/ld+json'>
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a TOTP code?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A TOTP (time-based one-time password) code is a short numeric password generated from a shared secret and the current time. It typically has 6 digits and refreshes every 30 seconds. Both the authenticator app and your server generate the same code independently—if they match, the user is verified."
      }
    },
    {
      "@type": "Question",
      "name": "Why is my TOTP code invalid even though I just generated it?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The most common causes are: (1) clock drift between server and client—sync via NTP and add a ±1 step verification window; (2) Base32 secret parsing error—confirm the secret is decoded as Base32, not hex or raw bytes; (3) RFC 6238 parameter mismatch—verify both sides use the same digits, period, and algorithm."
      }
    },
    {
      "@type": "Question",
      "name": "What parameters does RFC 6238 define for TOTP?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "RFC 6238 defines three configurable parameters: (1) digits—the code length, default 6; (2) period—the time step in seconds, default 30; (3) algorithm—the HMAC hash function, default SHA-1. Both the TOTP generator (authenticator app) and verifier (your server) must use identical values for all three."
      }
    },
    {
      "@type": "Question",
      "name": "Should I use SHA-1 or SHA-256 for TOTP?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use SHA-1 unless you fully control both client and server. SHA-1 is the RFC 6238 default and is supported by Google Authenticator, Authy, 1Password, and virtually all hardware tokens. SHA-256 offers no meaningful security improvement for TOTP because the 6-digit code space is the binding constraint—not the hash algorithm."
      }
    },
    {
      "@type": "Question",
      "name": "How do I protect TOTP verification against brute-force attacks?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Implement three controls: (1) rate limiting—lock the account after 5–10 failed attempts for several minutes; (2) replay protection—mark each accepted code as used so it cannot be reused within the same 30-second window; (3) clock window—accept codes ±1 step to handle minor clock drift without significantly expanding the brute-force window."
      }
    },
    {
      "@type": "Question",
      "name": "How can I quickly test and debug a TOTP implementation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use Authgear's free TOTP Authenticator tool. You can configure the algorithm (SHA-1/256/512), digits (6 or 8), and period (30s), then compare the generated code against what your server produces. If they match, your secret and parameters are correct. If not, work through the five common mistakes listed in this article."
      }
    }
  ]
}
</script>

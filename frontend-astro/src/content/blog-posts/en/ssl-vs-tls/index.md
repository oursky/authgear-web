---
title: "SSL vs TLS: What's the Difference and Why It Matters"
excerpt: "SSL is deprecated and TLS is what your server actually uses — but why does everyone still call it SSL? Learn the history, the attacks that killed SSL, and what changed."
coverImage: ./cover.jpg
category: engineering
featured: false
metaTitle: "SSL vs TLS: What's the Difference and Why It Matters"
metaDescription: "SSL is dead, TLS is what you actually use. Learn the technical differences, the vulnerabilities that killed SSL, and how to check your server's TLS version."
publishedAt: 2026-03-05T15:37:43.005Z
updatedAt: 2026-03-05T15:37:29.698Z
draft: false
---

## Why Are SSL and TLS Used Interchangeably?

If you've spent any time working with web security, you've seen "SSL" and "TLS" used as if they're the same thing. An "SSL certificate" is actually a TLS certificate. An "SSL Checker" checks TLS. An "SSL handshake" is a TLS handshake. The confusion is everywhere.

The simple explanation: **SSL is dead, but its name survived.**

SSL (Secure Sockets Layer) was the original encryption protocol for the web, developed by Netscape in the mid-1990s. TLS (Transport Layer Security) replaced it in 1999. Every version of SSL has been deprecated due to critical, exploitable security vulnerabilities, and is disabled in all modern servers and browsers. But by the time SSL was retired, it had become the generic word for "web encryption" — and the industry never updated its vocabulary.

Today, when anyone says "SSL certificate" or "SSL connection," they mean TLS. The X.509 certificate format hasn't changed. The protocol has. For a full overview of what's inside a certificate and how the connection works, see [What Is an SSL Certificate? A Developer's Guide](/post/what-is-ssl-certificate).

## The History: From SSL to TLS

<div class='ag-table-wrap'><table class='ag-table'><thead><tr><th>Version</th><th>Year</th><th>Status</th><th>Notes</th></tr></thead><tbody><tr><td>SSL 1.0</td><td>Never released</td><td>Abandoned</td><td>Critical flaws found internally; never shipped</td></tr><tr><td>SSL 2.0</td><td>1995</td><td>Deprecated (RFC 6176, 2011)</td><td>First public version; weak cipher design, protocol flaws</td></tr><tr><td>SSL 3.0</td><td>1996</td><td>Deprecated (RFC 7568, 2015)</td><td>Vulnerable to POODLE attack (2014); disabled everywhere</td></tr><tr><td>TLS 1.0</td><td>1999</td><td>Deprecated (RFC 8996, 2021)</td><td>Vulnerable to BEAST and POODLE-over-TLS; PCI-DSS banned it in 2018</td></tr><tr><td>TLS 1.1</td><td>2006</td><td>Deprecated (RFC 8996, 2021)</td><td>Minor fixes over TLS 1.0; also deprecated in 2021</td></tr><tr><td>TLS 1.2</td><td>2008</td><td>Current — widely supported</td><td>SHA-256, modern cipher suites; still the baseline for most traffic</td></tr><tr><td>TLS 1.3</td><td>2018</td><td>Current — preferred</td><td>Faster handshake, forward secrecy mandatory, legacy algorithms removed</td></tr></tbody></table></div>

Today, your server almost certainly negotiates TLS 1.2 or TLS 1.3. Anything older is either disabled by default or actively blocked by browsers and clients trying to connect to you.

## Key Technical Differences: SSL vs TLS

SSL 3.0 and TLS 1.0 were more similar than different — TLS 1.0 was internally called "SSL 3.1" in early drafts. But as TLS matured, the differences became significant:

<div class='ag-table-wrap'><table class='ag-table'><thead><tr><th>Feature</th><th>SSL 3.0</th><th>TLS 1.2</th><th>TLS 1.3</th></tr></thead><tbody><tr><td>Message authentication</td><td>MD5 / SHA-1 (weak)</td><td>HMAC-SHA-256 (strong)</td><td>AEAD ciphers only (stronger)</td></tr><tr><td>Handshake round trips</td><td>2 round trips</td><td>2 round trips</td><td>1 round trip (0-RTT resumption possible)</td></tr><tr><td>Forward secrecy</td><td>Not supported</td><td>Optional (ECDHE/DHE cipher suites)</td><td>Mandatory for all connections</td></tr><tr><td>Legacy cipher suites</td><td>RC4, DES, export-grade ciphers</td><td>Still optionally available (dangerous if enabled)</td><td>All legacy ciphers removed from the spec</td></tr><tr><td>Certificate types supported</td><td>RSA only</td><td>RSA + ECDSA</td><td>RSA + ECDSA + EdDSA</td></tr></tbody></table></div>

### What Is Forward Secrecy?

Forward secrecy (also called Perfect Forward Secrecy, or PFS) means that even if an attacker records all your encrypted traffic today and later obtains your server's private key, they *still cannot decrypt the historical traffic*. Each TLS session generates a fresh, ephemeral encryption key that is never stored and never reused.

Without forward secrecy: an attacker who records traffic now and steals your private key later can decrypt everything. This was the reality with all SSL versions. With forward secrecy: past sessions are safe even if the private key is eventually compromised. TLS 1.3 makes forward secrecy mandatory for every connection.

## The Vulnerabilities That Killed SSL

SSL wasn't deprecated because it went out of fashion. It was killed by specific, publicly demonstrated attacks:

### POODLE (2014)

POODLE (Padding Oracle On Downgraded Legacy Encryption) exploited SSL 3.0's block cipher padding. An attacker who could sit between a user and server and inject JavaScript could force a TLS connection to *downgrade* to SSL 3.0, then use a padding oracle to decrypt session cookies one byte at a time. The practical result: an attacker on the same network could steal authenticated sessions.

The fix required disabling SSL 3.0 entirely — there was no patch. Every browser and server operator disabled SSL 3.0 in 2014–2015.

### BEAST (2011)

BEAST (Browser Exploit Against SSL/TLS) exploited a flaw in how CBC cipher mode worked in TLS 1.0 (inherited from SSL). An attacker who could inject JavaScript into a victim's browser and observe encrypted traffic could gradually recover plaintext — primarily HTTP cookies, enabling session hijacking. BEAST pushed the industry toward TLS 1.2 and accelerated the deprecation of TLS 1.0.

### DROWN (2016)

DROWN (Decrypting RSA with Obsolete and Weakened eNcryption) showed that if *any* server — even a different server — used the same RSA private key and still supported SSL 2.0, an attacker could use that to decrypt TLS 1.2 sessions from the primary server. Organizations that thought they'd fully migrated to TLS were still vulnerable through shared keys.

> 🔒 **What this means today:** If your server is correctly configured for TLS 1.2 or 1.3 only, you are not vulnerable to any of these attacks. Use the [Authgear SSL Checker](/tools/ssl-checker) to confirm the protocol version your server negotiates.

## TLS 1.2 vs TLS 1.3: Should You Upgrade?

TLS 1.2 is still widely used and secure when properly configured. TLS 1.3 is faster and more secure by design:

- **Faster handshake** — TLS 1.3 reduces the handshake from 2 round trips to 1, reducing latency especially on high-latency mobile connections.
- **0-RTT resumption** — for returning connections, TLS 1.3 can send application data before the handshake completes, with some trade-offs around replay attacks.
- **No legacy algorithm negotiation** — TLS 1.3 removed all the weak cipher suites that required careful exclusion in TLS 1.2 configs. You can't accidentally enable a weak cipher suite.

**The recommended configuration:** Support both TLS 1.2 and TLS 1.3, disable everything else. TLS 1.3 is supported by all modern clients, but some older enterprise systems and IoT devices still require TLS 1.2.

```
# Nginx: support TLS 1.2 and 1.3, disable all older versions
ssl_protocols TLSv1.2 TLSv1.3;
ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
ssl_prefer_server_ciphers off;
```

## How to Check Which TLS Version Your Server Negotiates

### Option 1: Authgear SSL Checker (no setup)

The [Authgear SSL Checker](/tools/ssl-checker) reports the TLS protocol version your server negotiates alongside the full certificate details. Not sure which version your server is using? Run it through the SSL Checker — it shows the TLS version, cipher suite, and certificate details together in one view.

### Option 2: OpenSSL

```
# Check what TLS version is negotiated (look for "Protocol" in output)
openssl s_client -connect yourdomain.com:443

# Force TLS 1.3 specifically
openssl s_client -connect yourdomain.com:443 -tls1_3

# Force TLS 1.2 specifically
openssl s_client -connect yourdomain.com:443 -tls1_2

# Verify old versions are disabled (these should fail/refuse to connect)
openssl s_client -connect yourdomain.com:443 -tls1    # TLS 1.0 — should fail
openssl s_client -connect yourdomain.com:443 -tls1_1  # TLS 1.1 — should fail
```

## TLS in Authentication and Security

For authentication systems, TLS is the transport-level security that everything else depends on:

- **Token security** — OAuth access tokens, JWT bearer tokens, and session cookies sent over HTTP are fully exposed. TLS is what makes token-based auth work securely in practice.
- **OAuth 2.0 requires TLS** — the OAuth 2.0 specification (RFC 6749) mandates TLS for all authorization endpoints and token endpoints. No HTTPS, no OAuth.
- **mTLS (mutual TLS)** — in standard TLS, only the server presents a certificate. In mTLS, the client also presents a certificate, enabling cryptographic client authentication. Used in service meshes, zero-trust networks, and high-security API endpoints. Authgear supports mTLS for enterprise deployments.
- **Certificate pinning** — mobile apps sometimes "pin" a specific certificate or public key, refusing connections if the server presents a different certificate. This prevents MITM attacks even with a compromised CA, but requires careful planning around certificate renewals.

## Summary: SSL vs TLS

- **SSL is deprecated** — SSL 2.0 and 3.0 are disabled in all modern software.
- **TLS is what you actually use** — TLS 1.2 and TLS 1.3 are the current standards.
- **The certificate format is the same** — X.509 certificates are unchanged whether you call them SSL or TLS certificates. The name stuck even though the protocol moved on.
- **Configure TLS 1.2 + 1.3, disable everything older** — the correct production configuration for 2026.
- **TLS 1.3 is faster and cleaner** — enable it alongside TLS 1.2 for the best balance of security and compatibility.

## Next Steps

- [Check your TLS version](/tools/ssl-checker) with the free Authgear SSL Checker
- Learn what's inside your certificate in [What Is an SSL Certificate? A Developer's Guide](/post/what-is-ssl-certificate)
- Diagnose chain issues in [SSL Certificate Chain: What It Is and How to Fix a Broken One](/post/ssl-certificate-chain)

---
title: "What Is an SSL Certificate? A Developer's Guide"
excerpt: "An SSL certificate does two things: encrypts your connection and verifies your server's identity. Learn how it works, the 3 certificate types, and what's inside one."
coverImage: ./cover.webp
category: engineering
featured: false
metaTitle: "What Is an SSL Certificate? A Developer's Guide"
metaDescription: "Learn what an SSL certificate is, how HTTPS encryption works, the 3 types of certificates (DV, OV, EV), and how to inspect your own certificate."
publishedAt: 2026-03-05T15:09:12.884Z
updatedAt: 2026-03-05T15:37:24.768Z
draft: false
---

## What Is an SSL Certificate?

An **SSL certificate** is a digital credential that does two things at once: it enables **encrypted HTTPS communication** between a user's browser and a web server, and it **verifies the server's identity**. Without it, any data sent between browser and server — passwords, payment details, session tokens — travels as plain text that anyone on the network could intercept and read.

When you see `https://` in the address bar and a padlock icon, you're looking at a connection protected by an SSL certificate. Every major browser shows a warning — a "Not Secure" label or a full-page block — when a site's certificate is missing, expired, or misconfigured.

> 💡 **A note on naming:** "SSL" stands for Secure Sockets Layer, the original protocol from the 1990s. It was replaced by TLS (Transport Layer Security) in 1999. All versions of SSL have known security vulnerabilities and are disabled in modern servers. But the industry still calls them "SSL certificates" — you'll hear both terms used interchangeably. For the full story, see [SSL vs TLS: What's the Difference and Why It Matters](/post/ssl-vs-tls).

## How an SSL/TLS Connection Works

When your browser connects to a site over HTTPS, a process called the **TLS handshake** happens in milliseconds — before any part of your request is sent:

1. **Your browser says hello** — it tells the server which TLS versions and encryption algorithms (cipher suites) it supports.
1. **The server sends its certificate** — the certificate includes the server's public key and is digitally signed by a Certificate Authority (CA).
1. **Your browser validates the certificate** — it checks the expiration date, the domain name, and that the certificate was signed by a CA it trusts.
1. **A shared encryption key is established** — using asymmetric cryptography, browser and server negotiate a one-time session key that encrypts all further communication.
1. **Data flows securely** — from this point on, everything is encrypted using the session key and is unreadable to anyone in between.

The certificate itself doesn't encrypt the data. Its job is to provide a trusted cryptographic identity so the encrypted channel can be established safely.

## The 3 Types of SSL Certificates

SSL certificates differ in how thoroughly the issuing Certificate Authority (CA) has verified the identity behind them. There are three levels:

<div class='ag-table-wrap'><table class='ag-table'><thead><tr><th>Type</th><th>Full Name</th><th>What the CA Verifies</th><th>Best For</th><th>Common Issuers</th></tr></thead><tbody><tr><td>DV</td><td>Domain Validated</td><td>You control the domain (via DNS or file challenge)</td><td>Personal sites, blogs, web apps, internal tools</td><td>Let's Encrypt, ZeroSSL</td></tr><tr><td>OV</td><td>Organization Validated</td><td>Domain control + legal existence of the organization</td><td>Business websites, B2B portals, e-commerce</td><td>DigiCert, Sectigo, GlobalSign</td></tr><tr><td>EV</td><td>Extended Validation</td><td>Domain + rigorous legal and physical identity checks</td><td>Banks, large enterprises, high-trust transactions</td><td>DigiCert, Entrust</td></tr></tbody></table></div>

**Which type do you need?** For most web applications and developer projects, a DV certificate from Let's Encrypt is sufficient. It provides the same encryption strength as OV or EV. The difference is in identity verification, not security level. Let's Encrypt (DV, free, auto-renewing every 90 days) is the right choice for the vast majority of use cases.

## What's Inside an SSL Certificate?

SSL certificates use the X.509 standard format. When you inspect one, you'll see several structured fields:

<div class='ag-table-wrap'><table class='ag-table'><thead><tr><th>Field</th><th>What It Contains</th><th>Example</th></tr></thead><tbody><tr><td>Subject</td><td>The domain (or organization) the certificate was issued to</td><td><code>CN=www.authgear.com</code></td></tr><tr><td>Issuer</td><td>The Certificate Authority that signed the certificate</td><td><code>Let's Encrypt R11</code></td></tr><tr><td>Valid From / Valid To</td><td>The certificate's active date range</td><td><code>2025-09-01 — 2025-11-30</code></td></tr><tr><td>Subject Alternative Names (SANs)</td><td>All domains and subdomains covered by the certificate</td><td><code>authgear.com, www.authgear.com, *.authgear.com</code></td></tr><tr><td>Public Key</td><td>The server's public key used during the TLS handshake</td><td>RSA 2048-bit or ECDSA P-256</td></tr><tr><td>Signature Algorithm</td><td>The algorithm the CA used to sign the certificate</td><td><code>SHA-256 with RSA</code></td></tr><tr><td>Serial Number</td><td>A unique ID assigned by the CA, used for revocation tracking</td><td>A long hex string</td></tr></tbody></table></div>

You can inspect all of these fields for any domain — expiration date, issuer, SANs, chain status, and more — using the [Authgear SSL Checker](/tools/ssl-checker). Just enter any domain and click Inspect.

## Subject Alternative Names (SANs): Why They Matter

The SANs field defines every domain and subdomain that the certificate covers. A single certificate can include:

- An exact domain: `authgear.com`
- A wildcard: `*.authgear.com` (covers `www`, `api`, `docs`, and any other subdomain)
- Multiple unrelated domains on the same certificate

If your app makes API calls to a subdomain not listed in the certificate's SANs, you'll get an SSL error even if the certificate itself is perfectly valid. Always check the SANs when debugging SSL errors on subdomains or after adding new subdomains to your infrastructure.

## What Happens When an SSL Certificate Expires?

The moment a certificate's validity period ends, browsers show a full-page block: "Your connection is not private." Most users won't proceed. The site is effectively down for real-user traffic.

This happens without warning and with no grace period. A certificate that was valid at 11:59 PM is expired at midnight.

> ⚠️ **A common production incident:** Your Let's Encrypt auto-renewal script runs via cron. You update your server firewall and accidentally block port 80 — required for the HTTP-01 challenge. Renewal silently fails. 90 days later, your certificate expires at 3 AM, and users start hitting SSL errors. This is one of the most preventable — and most common — causes of HTTPS downtime.

The industry is moving toward shorter certificate lifetimes. Apple and Google are pushing the CA/Browser Forum toward 90-day maximums for all certificate types. Auto-renewal isn't optional — it's table stakes.

## How to Check Your SSL Certificate

### Option 1: Authgear SSL Checker (no setup needed)

Visit the [Authgear SSL Checker](/tools/ssl-checker), enter your domain, and get a full breakdown: certificate fields, expiration date, SANs, issuer, and full certificate chain status — all in one view, no login required.

> 🔒 **Pro Tip:** Run the SSL Checker before every production deployment to confirm your certificate is valid, the chain is complete, and all subdomains are covered by the SANs. For more on chains, see our guide on [SSL certificate chains and how to fix a broken one](/post/ssl-certificate-chain).

### Option 2: OpenSSL (command line)

```
# Connect to a server and display the full certificate chain
openssl s_client -connect www.authgear.com:443 -showcerts

# Show just the certificate fields in human-readable form
echo | openssl s_client -connect www.authgear.com:443 2>/dev/null | openssl x509 -noout -text

# Check just the expiration date
echo | openssl s_client -connect www.authgear.com:443 2>/dev/null | openssl x509 -noout -dates
```

## SSL/TLS in Authentication Systems

SSL certificates aren't just about the padlock on a marketing site. In authentication systems, they form a foundational security layer:

- **Login pages must be HTTPS** — submitting credentials over plain HTTP exposes them to network interception. Modern browsers mark HTTP login forms as "Not Secure."
- **OAuth requires HTTPS redirect URIs** — Google, Apple, GitHub, and most OAuth providers reject redirect URIs that aren't HTTPS. Your auth flow will fail without a valid certificate.
- **API clients reject invalid certificates by default** — modern HTTP libraries in every major language will refuse connections to servers with expired or misconfigured certificates. This affects server-to-server API calls, not just browser requests.
- **mTLS (mutual TLS)** — an advanced pattern where both client and server present certificates to each other. Used in zero-trust architectures, internal service meshes, and high-security API endpoints.

Authgear handles HTTPS enforcement automatically across all authentication endpoints. If you're building your own auth layer, properly configured SSL certificates are your starting point. Next, learn about [SSL certificate chains](/post/ssl-certificate-chain) — the leading cause of silent SSL misconfigurations that pass local testing but break in production.

## SSL Certificate Checklist

- Certificate is from a trusted CA (Let's Encrypt, DigiCert, Sectigo, etc.)
- Certificate has not expired — [check expiry date](/tools/ssl-checker)
- Domain in the Subject field matches the domain you're serving
- SANs cover all subdomains you're using
- Certificate chain is complete (intermediate CA certificates are served)
- Signature algorithm is SHA-256 or higher (not MD5 or SHA-1)
- Auto-renewal is configured and monitored

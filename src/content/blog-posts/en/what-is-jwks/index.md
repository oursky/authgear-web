---
title: "What Is JWKS? JSON Web Key Set and JWKS URI Explained"
excerpt: "Learn what JWKS is, how JWKS URI works, JWK format examples, and practical tips to generate and manage keys for secure token verification."
coverImage: ./cover.webp
category: engineering
featured: false
readTime: 6
metaTitle: "What Is JWKS? JSON Web Key Set and JWKS URI Explained"
metaDescription: "Learn what JWKS is, how JWKS URI works, JWK format examples, and practical tips to generate and manage keys for secure token verification."
publishedAt: 2025-08-14T11:39:55.480Z
updatedAt: 2026-03-05T16:38:41.916Z
draft: false
---

If you work with JWTs, OAuth, or any token-based authentication, you've probably seen the term **JWKS**. So — what is JWKS and why does it matter? In short: a **JWKS (JSON Web Key Set)** is a standardized JSON document that publishes one or more public keys (JWKs) so clients and APIs can verify signatures or perform encryption. This guide explains JWKS in plain language, shows the **JWK format** with examples, covers the **jwks_uri** pattern, and gives practical tips for creating and managing JWKS in production.

## Understanding JSON Web Keys (JWK) and JWKS

A **JSON Web Key (JWK)** is a JSON object that represents a cryptographic key — for example, an RSA public key or an EC key. Key fields include `kty` (key type), `kid` (key id), `use` (intended use), `alg` (algorithm), and key material fields like `n`/`e` for RSA or `x`/`y` for EC.

A **JWKS** is simply a JSON object with a `keys` array that bundles multiple JWKs:

```json
{
  "keys": [
    {
      "kty": "RSA",
      "kid": "my-key-1",
      "use": "sig",
      "alg": "RS256",
      "n": "0vx7agoebGcQSuuPiLJXZptN9nndrQmbXEps2aiAFbWhM78LhWx4cbb...",
      "e": "AQAB"
    }
  ]
}
```

Why this matters: services that issue tokens publish a JWKS so other services (APIs, clients) can automatically fetch the public keys they need to verify token signatures or encrypt payloads. The JWKS standard makes this machine-readable and interoperable across libraries.

> 💡 **Try it as you read:** generate a JWK (or convert a PEM key to JWK format) with the free [JWK Generator](/tools/jwk-generator), or fetch a real provider's live JWKS with the [OIDC Discovery Endpoint Explorer](/tools/oidc-discovery-endpoint).

## How JWKS Works in Authentication & APIs

Typical flow in an API ecosystem:

<ol>
  <li><strong>Issuer publishes a JWKS</strong> at a stable URL (the <code>jwks_uri</code>).</li>
  <li><strong>Clients or resource servers fetch the JWKS</strong> and cache it.</li>
  <li>When a JWT arrives, the <code>kid</code> in the token header identifies which JWK to use.</li>
  <li>The client finds the matching JWK inside the JWKS and uses it to verify the token signature or perform encryption-related steps.</li>
</ol>

This pattern decouples key rotation from deployments: when you roll keys, you update the JWKS; consuming services pick up updated public keys without redeploying code. For JWEs (encrypted tokens), the JWKS can provide public keys for encryption as well.

## JWKS URI: How to Find and Use It

Many identity providers expose a discovery document — often at `/.well-known/openid-configuration` — which contains a `jwks_uri` field that points to the JWKS location:

```json
{
  "issuer": "https://auth.example.com",
  "authorization_endpoint": "https://auth.example.com/authorize",
  "token_endpoint": "https://auth.example.com/token",
  "jwks_uri": "https://auth.example.com/.well-known/jwks.json"
}
```

How to use the `jwks_uri`:

<ul>
  <li>Configure your OIDC/OAuth client library to read the discovery document or directly point it to the <code>jwks_uri</code>.</li>
  <li>Libraries will fetch and cache the JWKS, matching the <code>kid</code> in incoming JWTs to the correct JWK.</li>
  <li>Implement a refresh strategy (e.g., periodic refresh or refresh on verification failures) so your service handles key rotation smoothly.</li>
</ul>

Tip: Always serve JWKS over HTTPS and include stable `kid` values for easier rotation handling. If you're configuring TLS for your JWKS endpoint, make sure your server returns the full [SSL certificate chain](/post/ssl-certificate-chain) — a missing intermediate certificate is the most common cause of API clients failing to fetch the JWKS even when the URL works in a browser.

<blockquote>
<p>&#x1F4A1; <strong>Find any provider's JWKS URI instantly:</strong> Use the <a href="/tools/oidc-discovery-endpoint">Authgear OIDC Discovery Endpoint Explorer</a>. Enter the issuer URL and the <code>jwks_uri</code> is shown in the Key Endpoints summary alongside the authorization endpoint and token endpoint &mdash; no curl required.</p>
</blockquote>

## JWK Format Explained (with Example)

A JWK contains a standardized set of fields. Here's a more complete RSA public key example:

```json
{
  "kty": "RSA",
  "kid": "rsa-signing-key-2024",
  "use": "sig",
  "alg": "RS256",
  "n": "0vx7agoebGcQSuuPiLJXZptN9nndrQmbXEps2aiAFbWhM78LhWx4cbbfAAtVT86zwu1RK7aPFFxuhDR1L6tSoc_BJECPebWKRXjBZCiFV4n3oknjhMstn64tZ_2W-5JsGY4Hc5n9yBXArwl93lqt7_RN5w6Cf0h4QyQ5v-65YGjQR0_FDW2QvzqY368QQMicAtaSqzs8KJZgnYb9c7d0zgdAZHzu6qMQvRL5hajrn1n91CbOpbISD08qNLyrdkt-bFTWhAI4vMQFh6WeZu0fM4lFd2NcRwr3XPksINHaQ-G_xBniIqbw0Ls1jF44-csFCur-kEgU8awapJzKnqDKgw",
  "e": "AQAB"
}
```

Field breakdown:

<ul>
  <li><code>kty</code> &mdash; key type (e.g., <code>RSA</code>, <code>EC</code>, <code>oct</code>)</li>
  <li><code>kid</code> &mdash; key ID used to select keys in a JWKS</li>
  <li><code>use</code> &mdash; intended use: <code>sig</code> for signature verification, <code>enc</code> for encryption</li>
  <li><code>alg</code> &mdash; algorithm (e.g., <code>RS256</code>, <code>ES256</code>)</li>
  <li><code>n</code>, <code>e</code> (RSA) or <code>x</code>, <code>y</code>, <code>crv</code> (EC) &mdash; the key material in base64url form</li>
</ul>

Full JWKS example with two keys (one RSA, one EC):

```json
{
  "keys": [
    {
      "kty": "RSA",
      "kid": "rsa-key-2024",
      "use": "sig",
      "alg": "RS256",
      "n": "0vx7agoebGcQSuuPiLJXZptN9nndrQmbXEps2aiAFbWhM78LhWx4cbb...",
      "e": "AQAB"
    },
    {
      "kty": "EC",
      "kid": "ec-key-2024",
      "use": "sig",
      "alg": "ES256",
      "crv": "P-256",
      "x": "f83OJ3D2xF1Bg8vub9tLe1gHMzV76e8Tus9uPHvRVEU",
      "y": "x_FEzRu9m36HLN_tue659LNpXW6pCyStikYjKIWI5a0"
    }
  ]
}
```

Including `use` and `alg` fields helps clients quickly determine whether a key is suitable for signature verification or encryption.

### PEM and converting to JWK

**PEM (Privacy-Enhanced Mail)** is a very common format for storing keys and certificates. It's base64-encoded DER data wrapped in human-readable header/footer lines such as `-----BEGIN PUBLIC KEY-----` and `-----END PUBLIC KEY-----`. You'll often see PEM files with extensions like `.pem`, `.crt`, or `.key`.

If you need to use a PEM key with a JWKS workflow, the usual step is to extract the **public** key from the PEM and convert that public key into a JWK. For RSA keys you can extract the public PEM like this:

```bash
# Extract public key from an RSA private key PEM
openssl rsa -in private.pem -pubout -out public.pem

# Extract public key from a certificate
openssl x509 -in cert.pem -pubkey -noout -out public.pem
```

For EC keys, the extraction looks similar:

```bash
# Extract EC public key from an EC private key PEM
openssl ec -in ec-private.pem -pubout -out ec-public.pem
```

Once you have the public PEM, convert it to a JWK using a JOSE library (node-jose, python-jose, etc.) or a conversion tool. The conversion produces the JWK fields your JWKS needs — for example `kty`, `n`/`e` (RSA) or `x`/`y`/`crv` (EC).

If you want a quick, UI-driven option, the Authgear [JWK Generator](/tools/jwk-generator) can convert PEM public keys into correctly formatted JWK objects (RSA/EC) so you can drop them straight into your JWKS.

**Security note:** never publish private PEM material in a JWKS. Only include public key material, always serve your JWKS over HTTPS, and follow a safe key-rotation strategy.

## Creating and Managing JWKS for Your Application

**Generating keys:** You can create JWKs with various libraries (OpenSSL &rarr; convert to JWK, or use JOSE libraries) or use a purpose-built tool. If you want a quick, standards-compliant way to create JWKs or convert existing PEM keys into JWK format, try the Authgear [JWK Generator](/tools/jwk-generator) — it outputs RSA/EC key pairs and can convert PEM public keys into JWK format, ready for development and testing.

**Publishing a JWKS:**

<ul>
  <li>Host the JWKS JSON at a stable HTTPS endpoint (e.g., <code>https://auth.example.com/.well-known/jwks.json</code>).</li>
  <li>Only include public key material; <strong>never</strong> publish private keys.</li>
  <li>Assign <code>kid</code> values and add new keys before rotating old ones.</li>
</ul>

**Rotation strategy:**

<ol>
  <li>Generate new key pair and add the public JWK to the JWKS with a new <code>kid</code>.</li>
  <li>Update the issuer to sign tokens with the new private key.</li>
  <li>Keep the old public JWK in the JWKS for a grace period to allow clients to validate existing tokens.</li>
  <li>Remove the old JWK once tokens signed with it are expired.</li>
</ol>

**Security best practices:**

<ul>
  <li>Serve JWKS over HTTPS.</li>
  <li>Cache the JWKS but refresh on verification errors.</li>
  <li>Limit JWKS to only the keys you actively use.</li>
  <li>Monitor for failed verifications that might signal a missing or rotated key.</li>
</ul>

## Common Questions About JWKS (FAQ)

### What is JWKS used for?

JWKS is used to publish public keys that clients and APIs can fetch to verify JWT signatures or obtain public keys for encryption workflows — enabling dynamic, interoperable key distribution.

### Is a JWKS file public or private?

A JWKS is typically **public** — it contains **public keys only**. Private keys must stay secure on the issuer's side and should never be included.

### How do I generate a JWK?

You can generate JWKs via libraries (OpenSSL &rarr; convert to JWK, or use JOSE libraries) or use a generator tool like Authgear's [JWK Generator](/tools/jwk-generator) to quickly produce JWK-formatted keys for testing or staging.

## Relationship to JWT and JWE

<ul>
  <li><strong>JWT (signed tokens):</strong> JWTs include a <code>kid</code> in the header that points to a JWK in a JWKS so recipients can verify signatures using the corresponding public key.</li>
  <li><strong>JWE (encrypted tokens):</strong> JWKS can also publish public keys used to encrypt payloads or derive shared keys for decryption on the recipient side.</li>
</ul>

You don't need deep knowledge of JWT/JWE to use JWKS — just remember JWKS is the standard way to distribute public keys that make JWT signature verification and JWE encryption interoperable.

**Related reading:**

- [JWE vs JWT: Key Differences, Use Cases, and Security Tips](/post/jwe-vs-jwt) — when to sign and when to encrypt
- [What Is .well-known/openid-configuration?](/post/well-known-openid-configuration) — the discovery document where the `jwks_uri` lives

## Conclusion

A **JWKS** (JSON Web Key Set) is a small but crucial piece of modern token-based security: it standardizes how public keys (JWKs) are published and fetched via a `jwks_uri`, enabling seamless verification and encryption across services. Use correct JWK format, host your JWKS securely, implement a rotation strategy, and consider using tools like the Authgear [JWK Generator](/tools/jwk-generator) to speed up development, convert PEM public keys, and simplify testing. To find the `jwks_uri` for any OIDC provider, use the [OIDC Discovery Endpoint Explorer](/tools/oidc-discovery-endpoint).

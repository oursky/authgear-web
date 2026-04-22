---
title: "What is JWKS? JSON Web Key Set Explained with Examples"
excerpt: "Learn what JWKS is, how JWKS URI works, JWK format examples, and practical tips to generate and manage keys for secure token verification."
coverImage: ./cover.jpg
category: engineering
featured: false
readTime: 6
publishedAt: 2025-10-17T14:55:41.361Z
updatedAt: 2026-03-05T16:38:41.910Z
draft: false
---

If you work with JWTs, OAuth, or any token-based authentication, you’ve probably seen the term **JWKS**. So — what is JWKS and why does it matter? In short: a **JWKS (JSON Web Key Set)** is a standardized JSON document that publishes one or more public keys (JWKs) so clients and APIs can verify signatures or perform encryption. This guide explains JWKS in plain language, shows the **JWK format** with examples, covers the **jwks uri** pattern, and gives practical tips for creating and managing JWKS in production.

## Understanding JSON Web Keys (JWK) and JWKS

A **JSON Web Key (JWK)** is a JSON object that represents a cryptographic key — for example, an RSA public key or an EC key. Key fields include `kty` (key type), `kid` (key id), `use` (intended use), `alg` (algorithm), and key material fields like `n`/`e` for RSA or `x`/`y` for EC.

A **JWKS** is simply a JSON object with a `keys` array that bundles multiple JWKs:

Why this matters: services that issue tokens publish a JWKS so other services (APIs, clients) can automatically fetch the public keys they need to verify token signatures or encrypt payloads. The JWKS standard makes this machine-readable and interoperable across libraries.

## How JWKS Works in Authentication & APIs

Typical flow in an API ecosystem:

1. **Issuer publishes a JWKS** at a stable URL (the `jwks_uri`).
1. **Clients or resource servers fetch the JWKS** and cache it.
1. When a JWT arrives, the `kid` in the token header identifies which JWK to use.
1. The client finds the matching JWK inside the JWKS and uses it to verify the token signature or perform encryption-related steps.

This pattern decouples key rotation from deployments: when you roll keys, you update the JWKS; consuming services pick up updated public keys without redeploying code. For JWEs (encrypted tokens), the JWKS can provide public keys for encryption as well.

## JWKS URI: How to Find and Use It

Many identity providers expose a discovery document — often at `/.well-known/openid-configuration` — which contains a `jwks_uri` field that points to the JWKS location:``

``How to use the `jwks_uri`:

- Configure your OIDC/OAuth client library to read the discovery document or directly point it to the `jwks_uri`.
- Libraries will fetch and cache the JWKS, matching the `kid` in incoming JWTs to the correct JWK.
- Implement a refresh strategy (e.g., periodic refresh or refresh on verification failures) so your service handles key rotation smoothly.

Tip: Always serve JWKS over HTTPS and include stable `kid` values for easier rotation handling.

## JWK Format Explained (with Example)

A JWK contains a standardized set of fields. Here’s a more complete RSA public key example:

Field breakdown:

- `kty` — key type (e.g., `RSA`, `EC`, `oct`)
- `kid` — key ID used to select keys in a JWKS
- `use` — intended use: `sig` for signature verification, `enc` for encryption
- `alg` — algorithm (e.g., `RS256`, `ES256`)
- `n`, `e` (RSA) or `x`, `y`, `crv` (EC) — the key material in base64url form

Full JWKS example with two keys:

Including `use` and `alg` fields helps clients quickly determine whether a key is suitable for signature verification or encryption.

### PEM and converting to JWK

**EM (Privacy-Enhanced Mail)** is a very common format for storing keys and certificates. It’s base64-encoded DER data wrapped in human-readable header/footer lines such as `-----BEGIN PUBLIC KEY-----` and `-----END PUBLIC KEY-----`. You’ll often see PEM files with extensions like `.pem`, `.crt`, or `.key`.

If you need to use a PEM key with a JWKS workflow, the usual step is to extract the **public** key from the PEM and convert that public key into a JWK. For RSA keys you can extract the public PEM like this:

For EC keys, the extraction looks similar:

Once you have the public PEM, convert it to a JWK using a JOSE library (node-jose, python-jose, etc.) or a conversion tool. The conversion produces the JWK fields your JWKS needs — for example `kty`, `n`/`e` (RSA) or `x`/`y`/`crv` (EC).

If you want a quick, UI-driven option, the Authgear [JWK Generator](/tools/jwk-generator) can convert PEM public keys into correctly formatted JWK objects (RSA/EC) so you can drop them straight into your JWKS.

**Security note:** never publish private PEM material in a JWKS. Only include public key material, always serve your JWKS over HTTPS, and follow a safe key-rotation strategy.

## Creating and Managing JWKS for Your Application

**Generating keys:** You can create JWKs with various libraries (node-jose, python-jose, OpenSSL + converters) or use a purpose-built tool. If you want a quick, standards-compliant way to create JWKs or convert existing PEM keys into JWK format, try the Authgear [JWK Generator](/tools/jwk-generator) — it outputs RSA/EC key pairs and can convert PEM public keys into JWK format, ready for development and testing.

**Publishing a JWKS:**

- Host the JWKS JSON at a stable HTTPS endpoint (e.g., `https://auth.example.com/.well-known/jwks.json`).
- Only include public key material; **never** publish private keys.
- Assign `kid` values and add new keys before rotating old ones.

**Rotation strategy:**

1. Generate new key pair and add the public JWK to the JWKS with a new `kid`.
1. Update the issuer to sign tokens with the new private key.
1. Keep the old public JWK in the JWKS for a grace period to allow clients to validate existing tokens.
1. Remove the old JWK once tokens signed with it are expired.

**Security best practices:**

- Serve JWKS over HTTPS.
- Cache the JWKS but refresh on verification errors.
- Limit JWKS to only the keys you actively use.
- Monitor for failed verifications that might signal a missing or rotated key.

## Common Questions About JWKS (FAQ)

### What is JWKS used for?

JWKS is used to publish public keys that clients and APIs can fetch to verify JWT signatures or obtain public keys for encryption workflows — enabling dynamic, interoperable key distribution.

### Is a JWKS file public or private?

A JWKS is typically **public** — it contains **public keys only**. Private keys must stay secure on the issuer’s side and should never be included.

### How do I generate a JWK?

You can generate JWKs via libraries (OpenSSL → convert to JWK, or use JOSE libraries) or use a generator tool like Authgear’s [JWK Generator](/tools/jwk-generator) to quickly produce JWK-formatted keys for testing or staging.

## Relationship to JWT and JWE

- **JWT (signed tokens):** JWTs include a `kid` in the header that points to a JWK in a JWKS so recipients can verify signatures using the corresponding public key.
- **JWE (encrypted tokens):** JWKS can also publish public keys used to encrypt payloads or derive shared keys for decryption on the recipient side.

You don’t need deep knowledge of JWT/JWE to use JWKS — just remember JWKS is the standard way to distribute public keys that make JWT signature verification and JWE encryption interoperable.

## Conclusion

A **JWKS** (JSON Web Key Set) is a small but crucial piece of modern token-based security: it standardizes how public keys (JWKs) are published and fetched via a `jwks_uri`, enabling seamless verification and encryption across services. Use correct JWK format, host your JWKS securely, implement a rotation strategy, and consider using tools like the Authgear [JWK Generator](/tools/jwk-generator) to speed up development, convert PEM public keys, and simplify testing.

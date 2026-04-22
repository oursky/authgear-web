---
title: "Generate & Verify HMAC Signatures in Python, Node.js, Go"
h1: "How to Generate and Verify HMAC Signatures in Python, Node.js, and Go"
excerpt: "Learn how to generate and verify HMAC signatures in Python, Node.js, and Go. Secure your API with practical examples, code snippets, and a free online HMAC generator."
coverImage: ./cover.jpg
category: engineering
featured: false
publishedAt: 2025-10-17T14:55:41.215Z
updatedAt: 2025-10-17T14:55:41.215Z
draft: false
---

APIs and webhooks depend heavily on HMAC (Hash-based Message Authentication Code) to ensure that every request you receive is authentic and unaltered.  
Without signature verification, your application could be vulnerable to spoofing, data tampering, or replay attacks.

In this guide, you’ll learn:

- What an HMAC signature is and how it works
- How to generate and verify HMAC signatures in Python, Node.js, and Go
- Common mistakes developers make and how to fix them
- How to test your HMACs using a free online tool: Authgear’s HMAC Signature Generator & Verifier

## What Is an HMAC Signature?

An HMAC (Hash-based Message Authentication Code) is a message authentication code created by combining a cryptographic hash function (like SHA256) with a secret key.  
It ensures two critical properties:

1. **Integrity:** The message hasn’t been modified in transit.
1. **Authenticity:** The message came from a trusted source that knows the secret key.

The formula is conceptually simple:

`HMAC = hash(secret_key + message)`

Both the sender and receiver use the same secret key. If both sides compute the same HMAC value, the message is valid.

## Why Use HMAC for APIs?

When APIs accept requests — for example, `POST /payment` — you need to verify that the request came from a trusted client.  
HMAC-based signing ensures that only senders with the correct secret can generate a valid signature.

**Typical flow:**

1. The client computes an HMAC for the request body.
1. It sends the request with a header such as `X-Signature: <hmac_value>`.
1. The server recalculates the HMAC and compares the two.
1. If they match, the request is trusted and processed.

Many large platforms like Stripe, Shopify, GitHub, AWS, and Slack use HMAC for webhook verification and secure request signing.

## How HMAC Works Step by Step

1. Combine the secret and message.
1. Hash the combination using a cryptographic algorithm (e.g., SHA256).
1. Compare both signatures to confirm authenticity.
1. Choose the right algorithm:<ul><li>HMAC-SHA256 (recommended for most cases)
1. HMAC-SHA1 (legacy)
1. HMAC-SHA512 (for high-security applications)

## Generate and Verify HMAC in Python

Python’s `hmac` and `hashlib` libraries make generating HMACs straightforward.

Always use `compare_digest()` for verification — it prevents timing attacks.You can try generating your own message and signature using [Authgear’s free **HMAC Signature Generator & Verifier** tool](/tools/hmac-signature-generator-verifier).

## Generate and Verify HMAC in Node.js

Node’s built-in crypto library provides similar functionality.

The `timingSafeEqual` function avoids timing-based comparison leaks.

## Generate and Verify HMAC in Go

Go’s `crypto/hmac` package provides a clean interface for HMAC generation and verification.

### Real-World Example: Signing API Requests

Here’s an example of how HMAC signatures are used to authenticate API requests.

**Client (Sender):**

**Server (Receiver):**

This ensures only authorized senders can submit valid requests.

### Common Mistakes and How to Fix Them

<div class="ag-table-wrap">
  <table class="ag-table">
    <thead>
      <tr>
        <th>Problem</th>
        <th>Likely Cause</th>
        <th>Solution</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Invalid HMAC Signature</td>
        <td>Encoding mismatch (UTF-8 vs ASCII)</td>
        <td>Ensure both client and server use UTF-8 encoding consistently.</td>
      </tr>
      <tr>
        <td>Mismatched Signatures</td>
        <td>Different algorithms used on each side</td>
        <td>Verify both are using the same algorithm, such as HMAC-SHA256.</td>
      </tr>
      <tr>
        <td>Timing Attack Risk</td>
        <td>Using <code>==</code> for string comparison</td>
        <td>Always use secure comparison functions like <code>compare_digest()</code> or <code>timingSafeEqual()</code>.</td>
      </tr>
      <tr>
        <td>Unexpected Output</td>
        <td>Inconsistent digest formats (hex vs base64)</td>
        <td>Standardize output format with <code>.hexdigest()</code> or <code>.base64encode()</code> consistently.</td>
      </tr>
    </tbody>
  </table></div>

## Choosing the Right Hash Algorithm

<div class="ag-table-wrap">
  <table class="ag-table">
    <thead>
      <tr>
        <th>Algorithm</th>
        <th>Security Level</th>
        <th>Performance</th>
        <th>Recommended Use</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>SHA-1</td>
        <td>Weak / Legacy</td>
        <td>Very fast</td>
        <td>Only for backward compatibility with legacy systems.</td>
      </tr>
      <tr>
        <td>SHA-256</td>
        <td>Strong</td>
        <td>Balanced</td>
        <td>Recommended default for API signing and webhook verification.</td>
      </tr>
      <tr>
        <td>SHA-512</td>
        <td>Very strong</td>
        <td>Slightly slower</td>
        <td>Ideal for high-security or large-payload applications.</td>
      </tr>
    </tbody>
  </table></div>

## Testing Your HMAC Online

You can instantly generate and verify your HMAC signatures using Authgear’s free online tool: [HMAC Signature Generator & Verifier](/tools/hmac-signature-generator-verifier)

The tool supports:

- Algorithms: SHA-1, SHA-256, SHA-512
- Generate and Verify modes
- Copy-to-clipboard output
- Real-time hex output

It’s ideal for quickly testing your request signatures or debugging mismatched API keys.

## Frequently Asked Questions

**What algorithm does HMAC use?**

HMAC can use SHA256, SHA1, or SHA512. SHA256 is most commonly used for APIs because it’s secure and widely supported.

**Can I use HMAC for API authentication?**

Yes. Platforms like Stripe, AWS, and GitHub use HMAC to sign API requests and webhooks.

**What’s the difference between HMAC and hashing?**

Hashing only ensures data integrity, while HMAC ensures both integrity and authenticity by including a shared secret key.

**Is HMAC the same as JWT?**

No. JWTs (JSON Web Tokens) can use HMAC algorithms (like HS256), but JWTs also carry payload data for stateless authentication.

**What tools can I use to test HMAC online?**

Authgear offers a free HMAC Signature Generator & Verifier, plus related tools like a JWK Generator, JWT Decoder, and the complete Authgear Developer Toolkit.

<script type="application/ld+json"> { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [ { "@type": "Question", "name": "What algorithm does HMAC use?", "acceptedAnswer": { "@type": "Answer", "text": "HMAC supports various hash algorithms such as SHA256, SHA1, and SHA512. SHA256 is the most widely used due to its balance of security and speed." } }, { "@type": "Question", "name": "Can I use HMAC for API authentication?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Many APIs like Stripe, AWS, and GitHub use HMAC to sign requests and verify authenticity." } }, { "@type": "Question", "name": "What’s the difference between HMAC and hashing?", "acceptedAnswer": { "@type": "Answer", "text": "Hashing ensures data integrity, while HMAC adds authentication by combining a secret key and hash function." } }, { "@type": "Question", "name": "Is HMAC the same as JWT?", "acceptedAnswer": { "@type": "Answer", "text": "No. JWTs may use HMAC algorithms internally but serve a broader purpose for stateless authentication." } }, { "@type": "Question", "name": "What are the best tools to test HMAC online?", "acceptedAnswer": { "@type": "Answer", "text": "The Authgear HMAC Signature Generator & Verifier tool allows quick generation and validation of HMAC signatures online." } } ] } </script>


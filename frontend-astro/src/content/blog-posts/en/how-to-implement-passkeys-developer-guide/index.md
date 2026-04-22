---
title: "How To Implement Passkeys with WebAuthn: Complete Developer Guide"
excerpt: "A practical developer guide to passkey authentication and WebAuthn. Covers how passkeys work, registration and login flows, JavaScript code examples, best practices, and testing tips."
coverImage: ./cover.webp
category: engineering
featured: false
metaTitle: "How to Implement Passkeys with WebAuthn: Developer Guide"
metaDescription: "Learn how passkey authentication works and how to implement it using the WebAuthn API. Includes registration and login code examples, best practices, and testing tips."
publishedAt: 2026-03-13T17:53:28.938Z
updatedAt: 2026-03-13T17:53:28.938Z
draft: false
---

Passwords have been the default way to authenticate users for decades, but they continue to create security and usability challenges. Users forget them, reuse them across services, and often store them insecurely. For developers, password-based systems mean account recovery queues, phishing risk, and credential breach exposure.

Passkey authentication is the modern alternative. This guide walks through how passkeys work, what the WebAuthn API looks like in practice, and what you need to build a complete passkey implementation — from registration to passkey login.

## Understanding Passkeys

A passkey is a passwordless credential that lets users sign in with a trusted device — a smartphone, laptop, or hardware security key — instead of a password. Under the hood, passkeys use public-key cryptography:

<ul><li><strong>A public key</strong> is stored on the application server.</li><li><strong>A private key</strong> is stored securely on the user's device and never leaves it.</li></ul>

During authentication, the server sends a random challenge to the device. The device signs it with the private key and returns the signature. The server verifies the signature using the stored public key. Because the private key never leaves the device, attackers can't steal it through phishing or server breaches.

Passkeys are built on the **FIDO2 standard**, which combines two components:

<ul><li><strong>WebAuthn</strong> (Web Authentication API) — the browser-side API developers interact with directly</li><li><strong>CTAP</strong> (Client to Authenticator Protocol) — handles communication between the browser and external authenticators like hardware security keys</li></ul>

## Why Developers Are Adopting Passkeys

Apple, Google, and Microsoft have all built passkey support into their platforms. Adoption is accelerating, and the reasons are practical:

<ul><li><strong>Phishing resistance.</strong> Passkeys are bound to the domain where they were created. A credential registered on <code>yourapp.com</code> won't work on a fake <code>yourapp-login.com</code>.</li><li><strong>No stored secrets to breach.</strong> Servers only store public keys. Even if your database is compromised, attackers get nothing they can use to impersonate users.</li><li><strong>Better UX.</strong> Users authenticate with Face ID, Touch ID, or a device PIN — no passwords to forget or reset.</li><li><strong>Lower support costs.</strong> Password resets are one of the top drivers of support tickets. Passkeys eliminate the problem at the source.</li></ul>

## Prerequisites

### HTTPS and Browser Support

WebAuthn only works over HTTPS. Make sure your app is served with a valid TLS certificate — there are no exceptions, even in staging environments (use `localhost` for local development, which is exempted).

Modern browsers — Chrome, Safari, Firefox, and Edge — all support WebAuthn. You can check current coverage on [caniuse.com](https://caniuse.com/webauthn).

### Backend Infrastructure

Your server needs to handle three things:

<ol><li><strong>Challenge generation</strong> — create a random, single-use challenge for each registration or login attempt</li><li><strong>Response verification</strong> — validate the signed assertion returned by the authenticator</li><li><strong>Credential storage</strong> — store public keys, credential IDs, and a signature counter per user</li></ol>

Don't implement the cryptographic verification yourself. Use a well-maintained WebAuthn server library for your stack — for example, [go-webauthn](https://github.com/go-webauthn/webauthn) for Go, [py_webauthn](https://github.com/duo-labs/py_webauthn) for Python, or [@passwordless-id/webauthn](https://github.com/passwordless-id/webauthn) for Node.js.

### Account Recovery

Plan recovery before you launch. If a user loses their only registered device, they need a way back in. Common approaches: allow registering multiple devices, fall back to email verification, or support backup codes. Without a recovery path, locked-out users become support escalations — or lost customers.

## How Passkey Authentication Works

Passkey authentication has two phases: **registration** (creating the credential) and **passkey login** (using it to sign in).

### Registration Flow

Registration creates the key pair and links the public key to the user's account.

<ol><li>The user triggers passkey setup in your app.</li><li>Your server generates a random challenge and sends it to the browser.</li><li>The browser calls <code>navigator.credentials.create()</code> with the challenge and your relying party info.</li><li>The OS prompts the user to verify — Touch ID, Face ID, Windows Hello, or PIN.</li><li>The device generates a key pair. The private key is stored in the secure enclave; the public key is returned to your server along with a credential ID.</li><li>Your server stores the public key and credential ID linked to the user's account.</li></ol>

### Passkey Login Flow

<ol><li>The user selects "Sign in with passkey."</li><li>Your server generates a new random challenge.</li><li>The browser calls <code>navigator.credentials.get()</code> with the challenge.</li><li>The OS finds matching credentials and prompts for biometric/PIN confirmation.</li><li>The device signs the challenge with the stored private key.</li><li>Your server verifies the signature using the stored public key. If it matches, the user is in.</li></ol>

## WebAuthn Example: Registration and Login

Here's what the WebAuthn API looks like in practice. Two browser methods handle everything.

### navigator.credentials.create() — Passkey Registration

```
// Call your server to get a registration challenge first
const response = await fetch('/auth/passkey/register/begin', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ userId: currentUser.id }),
});
const options = await response.json();

// The server returns PublicKeyCredentialCreationOptions.
// The browser needs the challenge decoded from base64.
options.challenge = base64urlToBuffer(options.challenge);
options.user.id = base64urlToBuffer(options.user.id);

// Trigger the authenticator
const credential = await navigator.credentials.create({ publicKey: options });

// Send the new credential to your server to store
await fetch('/auth/passkey/register/complete', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    id: credential.id,
    rawId: bufferToBase64url(credential.rawId),
    response: {
      attestationObject: bufferToBase64url(credential.response.attestationObject),
      clientDataJSON: bufferToBase64url(credential.response.clientDataJSON),
    },
    type: credential.type,
  }),
});
```

### navigator.credentials.get() — Passkey Login

```
// Get an authentication challenge from your server
const response = await fetch('/auth/passkey/login/begin', { method: 'POST' });
const options = await response.json();

options.challenge = base64urlToBuffer(options.challenge);
// If you pass allowCredentials, decode each credential ID too
if (options.allowCredentials) {
  options.allowCredentials = options.allowCredentials.map(c => ({
    ...c,
    id: base64urlToBuffer(c.id),
  }));
}

// Prompt the user — browser handles biometric/PIN UI
const assertion = await navigator.credentials.get({ publicKey: options });

// Send the signed assertion to your server for verification
const verifyResponse = await fetch('/auth/passkey/login/complete', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    id: assertion.id,
    rawId: bufferToBase64url(assertion.rawId),
    response: {
      authenticatorData: bufferToBase64url(assertion.response.authenticatorData),
      clientDataJSON: bufferToBase64url(assertion.response.clientDataJSON),
      signature: bufferToBase64url(assertion.response.signature),
      userHandle: assertion.response.userHandle
        ? bufferToBase64url(assertion.response.userHandle)
        : null,
    },
    type: assertion.type,
  }),
});

if (verifyResponse.ok) {
  // User is authenticated — redirect or update UI
}
```

The `base64urlToBuffer` and `bufferToBase64url` helpers convert between base64url strings (what your server sends) and `ArrayBuffer` (what the WebAuthn API expects). You'll need to implement these or use a library that handles the encoding for you.

<blockquote><p>⚠️ <strong>Common mistake:</strong> Sending the raw challenge as a string instead of an <code>ArrayBuffer</code> will cause <code>navigator.credentials.create()</code> to throw. Always decode base64url values from your server before passing them to the WebAuthn API.</p></blockquote>

## Integrating with an Authentication Platform

Building WebAuthn from scratch is doable, but it's a significant surface area — challenge management, attestation validation, signature counter verification, multi-device sync, and more. Many teams use an authentication platform to handle this instead.

Authgear has built-in support for passkey registration and login. You connect your app to Authgear and the passkey flows — including the WebAuthn ceremony, credential storage, and device management — are handled for you. This is worth considering if your team's core product isn't authentication infrastructure. [See how Authgear handles passkeys.](/features/passkeys)

## Testing Your Passkey Implementation

Test across environments before shipping:

<ul><li><strong>Registration</strong> — create a passkey on at least two different devices/browsers</li><li><strong>Login</strong> — verify the authentication flow end to end</li><li><strong>Multi-device</strong> — register a passkey on one device, sign in on another (synced passkeys via iCloud Keychain or Google Password Manager)</li><li><strong>Hardware security keys</strong> — test with a FIDO2 key if your app needs to support them</li><li><strong>Recovery</strong> — simulate a lost device and walk through your recovery flow</li></ul>

Chrome DevTools has a **WebAuthn emulator** (DevTools → More tools → WebAuthn) that lets you test registration and authentication flows without a physical authenticator.

## Best Practices

### Register Multiple Devices

Encourage users to register at least two devices during onboarding. A user who only has one registered device and loses it will be locked out. Multiple devices — or a mix of a synced passkey plus a hardware key — provide a natural fallback.

### Design Onboarding for Unfamiliar Users

Many users have never seen a passkey prompt. Show a brief explanation before triggering `navigator.credentials.create()`: what passkeys are, what will happen next, and that they're more secure than passwords. A confused user will hit cancel and never try again.

### Generate Fresh Challenges Every Time

Every registration and login attempt must use a unique, server-generated random challenge (at least 16 bytes, ideally 32). Challenges must be single-use and short-lived (expire within 5 minutes). Reusing or accepting stale challenges opens the door to replay attacks.

### Verify the Signature Counter

Authenticators maintain a signature counter that increments with each use. Your server should store and check this counter. If you receive a counter value lower than the stored one, it may indicate a cloned authenticator — flag it and require re-authentication.

### Support Cross-Platform Passkeys

Passkeys can be device-bound (tied to one authenticator, like a hardware key) or synced (backed up via iCloud Keychain, Google Password Manager, or 1Password). Synced passkeys work across a user's devices automatically. Don't set `authenticatorAttachment: "platform"` if you want to allow hardware keys too.

### Log Authentication Events

Keep server-side logs of registration attempts, successful logins, failed verifications, and credential deletions. These logs are essential for detecting anomalies — like repeated failed assertions against the same credential — and for debugging when users report problems.

## Bottom Line

Passkeys replace shared secrets with cryptographic key pairs that stay on the user's device. The result is passkey authentication that's resistant to phishing, immune to credential breaches, and faster for users.

The WebAuthn API is well-supported in all modern browsers. The client-side code is straightforward; the complexity lives on the server — challenge management, assertion verification, and credential storage. Use a server library to handle the cryptographic heavy lifting rather than implementing it yourself.

If you'd rather not manage the infrastructure at all, [Authgear](/) provides passkey signup and login out of the box, so your team can focus on building the product instead of the authentication layer.

<ul><li><a href='/post/passkey-vs-password-why-passkeys-are-the-future-of-security'>Passkey vs Password: Why Passkeys Are the Future of Security</a></li><li><a href='/post/what-is-fido2-complete-guide-fido-authentication'>What Is FIDO2? Complete Guide to FIDO Authentication</a></li></ul>

## FAQs

### What is passkey authentication?

Passkey authentication is a passwordless login method that uses public-key cryptography instead of passwords. The user's device holds a private key; the server stores the matching public key. At login, the server issues a challenge, the device signs it using the private key (after biometric/PIN verification), and the server confirms the signature. No password is ever created, stored, or transmitted.

### What is a passkey?

A passkey is the credential created during passkey authentication. It consists of a cryptographic key pair: a public key on the server and a private key locked to the user's device. Users authenticate with biometrics or a device PIN — the private key never leaves the device.

### How do passkeys work technically?

Passkeys use public-key cryptography. The device holds a private key; the server stores the corresponding public key. At login, the server issues a challenge, the device signs it with the private key, and the server verifies the signature. No shared secret is ever transmitted.

### What is WebAuthn?

WebAuthn (Web Authentication API) is the browser API that applications use to create and use passkeys. It's a W3C standard supported in all major browsers.

### Are passkeys more secure than passwords?

Yes. Passkeys can't be phished (they're domain-bound), can't be leaked in a server breach (only public keys are stored), and can't be reused across sites. They're also resistant to brute-force attacks since there's no secret to guess.

### Can passkeys sync across multiple devices?

Yes. Apple (iCloud Keychain), Google (Password Manager), and Microsoft (Windows Hello) sync passkeys across a user's devices. Third-party password managers like 1Password and Dashlane also support passkey sync.

### Is there a WebAuthn example I can run locally?

Yes. [webauthn.io](https://webauthn.io/) is an interactive WebAuthn demo you can test in your browser without any setup. For a local example, Google's [Build your first WebAuthn app](https://developers.google.com/codelabs/webauthn-reauth) codelab walks through a full registration and authentication flow. The code examples in this article show the client-side WebAuthn calls you'd use in your own app.

<script type='application/ld+json'>{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is passkey authentication?","acceptedAnswer":{"@type":"Answer","text":"Passkey authentication is a passwordless login method that uses public-key cryptography instead of passwords."}},{"@type":"Question","name":"What is a passkey?","acceptedAnswer":{"@type":"Answer","text":"A passkey is a cryptographic credential: a public key on the server and a private key locked to the user's device."}},{"@type":"Question","name":"What is WebAuthn?","acceptedAnswer":{"@type":"Answer","text":"WebAuthn (Web Authentication API) is the browser API that applications use to create and use passkeys. It's a W3C standard supported in all major browsers."}},{"@type":"Question","name":"Are passkeys more secure than passwords?","acceptedAnswer":{"@type":"Answer","text":"Yes. Passkeys can't be phished, can't be leaked in a server breach, and can't be reused across sites."}},{"@type":"Question","name":"Can passkeys sync across multiple devices?","acceptedAnswer":{"@type":"Answer","text":"Yes. Apple (iCloud Keychain), Google (Password Manager), and Microsoft (Windows Hello) sync passkeys across devices."}}]}</script>

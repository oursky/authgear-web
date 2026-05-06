---
title: "How To Implement Passkeys with WebAuthn: Complete Developer Guide"
excerpt: "A practical developer guide to passkey authentication and WebAuthn. Covers how passkeys work, registration and login flows, JavaScript code examples, best practices, and testing tips."
coverImage: ./cover.webp
category: engineering
featured: false
metaTitle: "How to Implement Passkeys with WebAuthn: Developer Guide"
metaDescription: "Learn how passkey authentication works and how to implement it using the WebAuthn API. Includes registration and login code examples, best practices, and testing tips."
publishedAt: 2026-03-13T17:35:55.681Z
updatedAt: 2026-05-06T00:00:00.000Z
draft: false
faq:
  - q: "What is passkey authentication?"
    a: "Passkey authentication is a passwordless login method that uses public-key cryptography instead of passwords. The user's device holds a private key; the server stores the matching public key. At login, the server issues a challenge, the device signs it using the private key (after biometric/PIN verification), and the server confirms the signature. No password is ever created, stored, or transmitted."
  - q: "What is a passkey?"
    a: "A passkey is the credential created during passkey authentication. It consists of a cryptographic key pair: a public key on the server and a private key locked to the user's device. Users authenticate with biometrics or a device PIN — the private key never leaves the device."
  - q: "How do passkeys work technically?"
    a: "Passkeys use public-key cryptography. The device holds a private key; the server stores the corresponding public key. At login, the server issues a challenge, the device signs it with the private key, and the server verifies the signature. No shared secret is ever transmitted."
  - q: "What is WebAuthn?"
    a: "WebAuthn (Web Authentication API) is the browser API that applications use to create and use passkeys. It's a W3C standard supported in all major browsers."
  - q: "Are passkeys more secure than passwords?"
    a: "Yes. Passkeys can't be phished (they're domain-bound), can't be leaked in a server breach (only public keys are stored), and can't be reused across sites. They're also resistant to brute-force attacks since there's no secret to guess."
  - q: "Can passkeys sync across multiple devices?"
    a: "Yes. Apple (iCloud Keychain), Google (Password Manager), and Microsoft (Windows Hello) sync passkeys across a user's devices. Third-party password managers like 1Password and Dashlane also support passkey sync."
  - q: "Is there a WebAuthn example I can run locally?"
    a: "Yes. webauthn.io is an interactive WebAuthn demo you can test in your browser without any setup. For a local example, Google's 'Build your first WebAuthn app' codelab walks through a full registration and authentication flow. The code examples in this article show the client-side WebAuthn calls you'd use in your own app."
  - q: "How do I create a passkey on iPhone?"
    a: "To create a passkey on iPhone from a native iOS app, use the AuthenticationServices framework. Your app needs an Associated Domains entitlement (webcredentials:yourdomain.com) and your server must serve an apple-app-site-association file at /.well-known/apple-app-site-association. Call ASAuthorizationPlatformPublicKeyCredentialProvider.createCredentialRegistrationRequest() with a server-issued challenge — the OS handles Face ID or Touch ID automatically."
  - q: "What is the difference between WebAuthn and a passkey?"
    a: "WebAuthn is the W3C API (navigator.credentials.create() / .get()) that your code calls to create and verify credentials. A passkey is a WebAuthn credential that syncs across a user's devices via iCloud Keychain, Google Password Manager, or a similar platform service. All passkeys are WebAuthn credentials, but not all WebAuthn credentials are passkeys — a FIDO2 hardware key (like a YubiKey) is WebAuthn but device-bound and does not sync."
  - q: "Does Windows Hello support passkeys?"
    a: "Yes. Windows Hello is a platform authenticator that exposes passkey support through the standard WebAuthn API in Chrome and Edge on Windows 11. There is no Windows-specific SDK — you use the same navigator.credentials.create() call as any other WebAuthn implementation, with authenticatorAttachment of 'platform' and userVerification of 'required' to trigger Windows Hello. Credentials are bound to the device's TPM 2.0 chip and do not sync across devices."
---

Passwords have been the default way to authenticate users for decades, but they continue to create security and usability challenges. Users forget them, reuse them across services, and often store them insecurely. For developers, password-based systems mean account recovery queues, phishing risk, and credential breach exposure.

Passkey authentication is the modern alternative. This guide walks through how passkeys work, what the WebAuthn API looks like in practice, and what you need to build a complete passkey implementation — from registration to passkey login.

## Understanding Passkeys

A passkey is a passwordless credential that lets users sign in with a trusted device — a smartphone, laptop, or hardware security key — instead of a password. Under the hood, passkeys use public-key cryptography:

<ul><li><strong>A public key</strong> is stored on the application server.</li><li><strong>A private key</strong> is stored securely on the user's device and never leaves it.</li></ul>

During authentication, the server sends a random challenge to the device. The device signs it with the private key and returns the signature. The server verifies the signature using the stored public key. Because the private key never leaves the device, attackers can't steal it through phishing or server breaches.

Passkeys are built on the **FIDO2 standard**, which combines two components:

<ul><li><strong>WebAuthn</strong> (Web Authentication API) — the browser-side API developers interact with directly</li><li><strong>CTAP</strong> (Client to Authenticator Protocol) — handles communication between the browser and external authenticators like hardware security keys</li></ul>

<blockquote><p><strong>WebAuthn vs passkey — what's the difference?</strong> <em>WebAuthn</em> is the W3C API your code calls (<code>navigator.credentials.create()</code> / <code>.get()</code>). <em>Passkey</em> is the user-facing name for a WebAuthn credential that syncs across a user's devices via iCloud Keychain, Google Password Manager, or a similar platform service. Every passkey is a WebAuthn credential — but a hardware key like a YubiKey is also WebAuthn and is <strong>not</strong> a passkey (it doesn't sync). All the code in this article is WebAuthn. It produces passkeys when the platform authenticator (Face ID, Windows Hello, Android Credential Manager) creates a syncable credential.</p></blockquote>

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

## Implementing Passkeys on iOS (Swift)

If you're building a native iOS app and want to know how to create a passkey on iPhone or how to set up passkey on iPhone, the `AuthenticationServices` framework is where you start. Apple added passkey support in iOS 16 — no third-party library needed.

### Requirements

Before writing any Swift code, make sure three things are in place:

**1. Associated Domains entitlement.** Add the entitlement `com.apple.developer.authentication-services.autofill-credential-provider` to your app target, and add an associated domain entry `webcredentials:yourdomain.com` in your app's entitlements file (or via Xcode's Signing & Capabilities → Associated Domains).

**2. `apple-app-site-association` file on your server.** Your web server must serve the following JSON at `https://yourdomain.com/.well-known/apple-app-site-association` (no file extension, over HTTPS only):

```json
{
  "webcredentials": {
    "apps": ["TEAMID.com.example.yourapp"]
  }
}
```

Replace `TEAMID` with your Apple Developer Team ID and the bundle identifier with your app's bundle ID. The file must be served with `Content-Type: application/json`.

**3. `rpId` matches the domain.** The `rpId` you pass to the WebAuthn server (and that the server includes in its challenge response) must match the domain in your `apple-app-site-association`. A mismatch causes the OS to silently refuse the credential.

Face ID or Touch ID is invoked by the OS automatically during the passkey ceremony — you do not need to call `LocalAuthentication` directly.

### Registration (creating a passkey on iPhone)

```swift
import AuthenticationServices

class PasskeyManager: NSObject, ASAuthorizationControllerDelegate,
                      ASAuthorizationControllerPresentationContextProviding {

    // Step 1: Fetch a challenge from your server, then call this.
    func registerPasskey(username: String, challenge: Data, userID: Data) {
        let provider = ASAuthorizationPlatformPublicKeyCredentialProvider(
            relyingPartyIdentifier: "yourdomain.com"
        )

        let registrationRequest = provider.createCredentialRegistrationRequest(
            challenge: challenge,
            name: username,       // displayed to the user in the system sheet
            userID: userID        // your app's user identifier, stored on device
        )

        // Optional: set attestation preference
        // registrationRequest.attestationPreference = .none

        let controller = ASAuthorizationController(
            authorizationRequests: [registrationRequest]
        )
        controller.delegate = self
        controller.presentationContextProvider = self
        controller.performRequests()
    }

    // Delegate: registration succeeded
    func authorizationController(
        controller: ASAuthorizationController,
        didCompleteWithAuthorization authorization: ASAuthorization
    ) {
        guard let credential = authorization.credential
            as? ASAuthorizationPlatformPublicKeyCredentialRegistration
        else { return }

        // Send these to your server to store against the user account
        let credentialID = credential.credentialID
        let attestationObject = credential.rawAttestationObject
        let clientDataJSON = credential.rawClientDataJSON

        // POST /auth/passkey/register/complete with the above data
    }

    func authorizationController(
        controller: ASAuthorizationController,
        didCompleteWithError error: Error
    ) {
        // Handle cancellation (ASAuthorizationError.canceled) separately
        // from other errors — users cancel legitimately
        print("Passkey registration error: \(error)")
    }

    func presentationAnchor(
        for controller: ASAuthorizationController
    ) -> ASPresentationAnchor {
        return UIApplication.shared.connectedScenes
            .compactMap { ($0 as? UIWindowScene)?.keyWindow }
            .first!
    }
}
```

### Sign-in (passkey login on iPhone)

```swift
func signInWithPasskey(challenge: Data) {
    let provider = ASAuthorizationPlatformPublicKeyCredentialProvider(
        relyingPartyIdentifier: "yourdomain.com"
    )

    let assertionRequest = provider.createCredentialAssertionRequest(
        challenge: challenge
    )

    // Optional: restrict to specific credentials
    // assertionRequest.allowedCredentials = [...]

    let controller = ASAuthorizationController(
        authorizationRequests: [assertionRequest]
    )
    controller.delegate = self
    controller.presentationContextProvider = self
    controller.performRequests()
}

// Delegate: authentication succeeded
func authorizationController(
    controller: ASAuthorizationController,
    didCompleteWithAuthorization authorization: ASAuthorization
) {
    guard let credential = authorization.credential
        as? ASAuthorizationPlatformPublicKeyCredentialAssertion
    else { return }

    // Send these to your server for verification
    let credentialID = credential.credentialID
    let authenticatorData = credential.rawAuthenticatorData
    let clientDataJSON = credential.rawClientDataJSON
    let signature = credential.signature
    let userID = credential.userID  // your app's user identifier

    // POST /auth/passkey/login/complete with the above data
}
```

### Common pitfalls

<ul><li><strong>Missing Associated Domains entitlement.</strong> The system sheet will never appear. Check Xcode → Signing &amp; Capabilities → Associated Domains and confirm the entry is <code>webcredentials:yourdomain.com</code>.</li><li><strong><code>apple-app-site-association</code> not served correctly.</strong> It must be at <code>/.well-known/apple-app-site-association</code>, served over HTTPS with a valid certificate, and with <code>Content-Type: application/json</code>. Apple's CDN caches this file aggressively — allow up to 24 hours for changes to propagate.</li><li><strong>Mismatched <code>rpId</code>.</strong> The <code>relyingPartyIdentifier</code> in Swift must exactly match the <code>rpId</code> your server sends in the challenge response and the domain in the <code>apple-app-site-association</code> file.</li><li><strong>Simulator limitations.</strong> Passkey registration and assertion on the iOS simulator may behave differently from a physical device. Use a real iPhone for final testing.</li></ul>

## Implementing Passkeys on Android (Kotlin)

Android's modern approach to passkeys is the **Credential Manager API** (`androidx.credentials`), introduced as stable in late 2023. It replaces the older FIDO2 API — if you find tutorials referencing `Fido2ApiClient`, those are outdated. Use Credential Manager instead.

Credential Manager requires API level 28 (Android 9) or higher. On Android 9–13, passkeys require Google Play Services. On Android 14+, full native support is available.

### Requirements

**Digital Asset Links file.** Your server must host a `assetlinks.json` file at `https://yourdomain.com/.well-known/assetlinks.json`:

```json
[{
  "relation": ["delegate_permission/common.handle_all_urls",
               "delegate_permission/common.get_login_creds"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.example.yourapp",
    "sha256_cert_fingerprints": [
      "AA:BB:CC:DD:EE:FF:..."
    ]
  }
}]
```

Get your SHA-256 certificate fingerprint with:

```bash
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey \
  -storepass android -keypass android
```

Use your **release keystore** fingerprint in production. Debug and release builds have different signing keys — a common source of `assetlinks.json` mismatches.

In your `AndroidManifest.xml`, add the Digital Asset Links association:

```xml
<activity ...>
    <intent-filter>
        <action android:name="android.intent.action.MAIN" />
    </intent-filter>
    <meta-data
        android:name="asset_statements"
        android:resource="@string/asset_statements" />
</activity>
```

Also add your domain to `strings.xml`:

```xml
<string name="asset_statements" translatable="false">
[{"include": "https://yourdomain.com/.well-known/assetlinks.json"}]
</string>
```

Add the dependency to `build.gradle`:

```kotlin
dependencies {
    implementation("androidx.credentials:credentials:1.3.0")
    implementation("androidx.credentials:credentials-play-services-auth:1.3.0")
}
```

The fingerprint biometric prompt is shown automatically by the OS — no `BiometricPrompt` setup is required.

### Registration

```kotlin
import androidx.credentials.CreatePublicKeyCredentialRequest
import androidx.credentials.CredentialManager
import androidx.credentials.exceptions.CreateCredentialCancellationException
import androidx.credentials.exceptions.CreateCredentialException

suspend fun registerPasskey(activity: Activity, requestJson: String) {
    // requestJson is the JSON-serialised PublicKeyCredentialCreationOptions
    // from your server — challenge, rp, user, pubKeyCredParams, etc.
    val createRequest = CreatePublicKeyCredentialRequest(
        requestJson = requestJson,
        preferImmediatelyAvailableCredentials = false
    )

    val credentialManager = CredentialManager.create(activity)

    try {
        val result = credentialManager.createCredential(
            context = activity,
            request = createRequest
        )
        // result.data contains the attestation response as a JSON string
        val responseJson = result.data
            .getString("androidx.credentials.BUNDLE_KEY_REGISTRATION_RESPONSE_JSON")
        // POST responseJson to your server at /auth/passkey/register/complete
    } catch (e: CreateCredentialCancellationException) {
        // User dismissed the prompt — handle gracefully
    } catch (e: CreateCredentialException) {
        // Other failure — log and surface an error to the user
        Log.e("Passkey", "Registration failed: ${e.message}")
    }
}
```

### Sign-in

```kotlin
import androidx.credentials.CredentialManager
import androidx.credentials.GetCredentialRequest
import androidx.credentials.GetPublicKeyCredentialOption
import androidx.credentials.PublicKeyCredential
import androidx.credentials.exceptions.GetCredentialCancellationException
import androidx.credentials.exceptions.GetCredentialException

suspend fun signInWithPasskey(activity: Activity, requestJson: String) {
    // requestJson is the JSON-serialised PublicKeyCredentialRequestOptions
    // from your server — challenge, rpId, allowCredentials, userVerification
    val getCredentialOption = GetPublicKeyCredentialOption(
        requestJson = requestJson
    )

    val getRequest = GetCredentialRequest(
        credentialOptions = listOf(getCredentialOption)
    )

    val credentialManager = CredentialManager.create(activity)

    try {
        val result = credentialManager.getCredential(
            context = activity,
            request = getRequest
        )
        val credential = result.credential
        if (credential is PublicKeyCredential) {
            val responseJson = credential.authenticationResponseJson
            // POST responseJson to your server at /auth/passkey/login/complete
        }
    } catch (e: GetCredentialCancellationException) {
        // User dismissed
    } catch (e: GetCredentialException) {
        Log.e("Passkey", "Sign-in failed: ${e.message}")
    }
}
```

### Common pitfalls

<ul><li><strong>Missing or wrong <code>assetlinks.json</code>.</strong> The file must be at <code>/.well-known/assetlinks.json</code>, served over HTTPS, and the SHA-256 fingerprint must match the signing certificate used to build the APK you're testing.</li><li><strong>Debug vs release signing key mismatch.</strong> Your debug build and release build use different signing keys. Add both fingerprints to <code>assetlinks.json</code> during development, then remove the debug fingerprint before shipping.</li><li><strong>Too-low <code>minSdk</code>.</strong> Credential Manager's passkey flow requires API 28+. Users on Android 8 (API 27) or earlier cannot use passkeys.</li><li><strong>Using <code>Fido2ApiClient</code> instead of Credential Manager.</strong> The older FIDO2 API is deprecated. Credential Manager is the supported path as of 2024 and handles both passkeys and passwords in a unified sheet.</li></ul>

## Implementing Passkeys with Windows Hello

Unlike iOS and Android, there is no Windows-specific SDK to call from a web application. Windows Hello is a **platform authenticator** that exposes itself through the standard WebAuthn API in the browser. Chrome and Edge on Windows 11 both support Windows Hello via `navigator.credentials.create()` and `navigator.credentials.get()` — the same calls shown earlier in this guide.

The key is in the `authenticatorSelection` options you pass.

### Registration with Windows Hello

```javascript
// Fetch the challenge JSON from your server first
const response = await fetch('/auth/passkey/register/begin', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ userId: currentUser.id }),
});
const options = await response.json();

options.challenge = base64urlToBuffer(options.challenge);
options.user.id = base64urlToBuffer(options.user.id);

// Force Windows Hello (platform authenticator) and require user verification
options.authenticatorSelection = {
  authenticatorAttachment: 'platform',   // Windows Hello, Face ID, etc. — not a roaming key
  userVerification: 'required',          // Forces Hello PIN / face / fingerprint prompt
  residentKey: 'required',               // Required for discoverable passkey credentials
};

// Set attestation to 'none' — 'direct' triggers a separate user consent dialog
// that surprises most users and rarely adds value for typical web apps
options.attestation = 'none';

const credential = await navigator.credentials.create({ publicKey: options });

// Send the credential to your server
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

### Sign-in with Windows Hello

```javascript
const response = await fetch('/auth/passkey/login/begin', { method: 'POST' });
const options = await response.json();

options.challenge = base64urlToBuffer(options.challenge);
options.userVerification = 'required';

// Optional: restrict to platform authenticators only
// options.rpId = 'yourdomain.com';

const assertion = await navigator.credentials.get({ publicKey: options });

await fetch('/auth/passkey/login/complete', {
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
```

### How Windows Hello stores passkey credentials

Windows 11 binds the passkey private key to the device's **TPM 2.0** chip. The credential cannot be exported — it is device-bound and does not sync through a cloud account the way iCloud Keychain or Google Password Manager credentials do. If a user sets up a Windows Hello passkey and later gets a new PC, they will need to re-register.

### Common pitfalls

<ul><li><strong><code>attestation: 'direct'</code> triggers a consent dialog.</strong> Windows will show a secondary prompt asking the user to consent to sharing attestation data with the relying party. Most apps don't need attestation data. Set <code>attestation: 'none'</code> unless you have a specific enterprise requirement.</li><li><strong>The Windows Hello PIN is a valid authenticator.</strong> If a user has not configured facial recognition or a fingerprint reader, Windows Hello falls back to the PIN. This is expected behaviour — the PIN is a <em>platform credential</em>, not a password. The WebAuthn call still succeeds.</li><li><strong>No hardware key when <code>authenticatorAttachment: 'platform'</code> is set.</strong> Setting this forces the OS to use the local platform authenticator only. If you also want to support FIDO2 hardware keys (e.g., YubiKey), omit <code>authenticatorAttachment</code> or set it to <code>'cross-platform'</code> separately.</li><li><strong>Windows 10 support is limited.</strong> Windows Hello passkey support is most reliable on Windows 11. Windows 10 supports WebAuthn but passkey sync and certain credential management features require Windows 11.</li></ul>

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

### How do I create a passkey on iPhone?

To create a passkey on iPhone from a native iOS app, use the `AuthenticationServices` framework. Your app needs an Associated Domains entitlement (`webcredentials:yourdomain.com`) and your server must serve an `apple-app-site-association` file at `/.well-known/apple-app-site-association`. Call `ASAuthorizationPlatformPublicKeyCredentialProvider.createCredentialRegistrationRequest()` with a server-issued challenge — the OS handles Face ID or Touch ID automatically. See the iOS section above for a full Swift example.

### What is the difference between WebAuthn and a passkey?

WebAuthn is the W3C API (`navigator.credentials.create()` / `.get()`) that your code calls to create and verify credentials. A passkey is a WebAuthn credential that syncs across a user's devices via iCloud Keychain, Google Password Manager, or a similar platform service. All passkeys are WebAuthn credentials, but not all WebAuthn credentials are passkeys — a FIDO2 hardware key (like a YubiKey) is WebAuthn but device-bound and does not sync.

### Does Windows Hello support passkeys?

Yes. Windows Hello is a platform authenticator that exposes passkey support through the standard WebAuthn API in Chrome and Edge on Windows 11. There is no Windows-specific SDK — you use the same `navigator.credentials.create()` call as any other WebAuthn implementation, with `authenticatorAttachment: 'platform'` and `userVerification: 'required'` to trigger Windows Hello. Credentials are bound to the device's TPM 2.0 chip and do not sync across devices.

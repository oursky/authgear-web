---
title: "Passkeys Compatibility: Which Platforms Support Passkeys?"
excerpt: "Passkeys are now supported by iOS, macOS, Chrome and Android. Learn more about passkeys and their compatibility with major browsers and platforms."
coverImage: ./cover.webp
category: highlight
featured: false
metaTitle: "Passkeys Compatibility: Which Platforms Support Passkeys?"
metaDescription: "Passkeys are now supported by iOS, macOS, Chrome and Android. Learn more about passkeys and their compatibility with major browsers and platforms."
publishedAt: 2022-08-25T02:34:49.697Z
updatedAt: 2026-02-12T02:36:01.233Z
draft: false
---

Apple previewed iOS 16, which was released in September 2022, during its developer conference. One fascinating feature of iOS 16 is Passkeys, which are digital credentials that can potentially eliminate passwords once and for all.

Passkeys is a marketing term for “<a href="https://fidoalliance.org/multi-device-fido-credentials/" target="_blank">multi-device FIDO credentials</a>.” It allows users to create a credential (encryption key) on a device to sign up for a service, such as an e-commerce site. The encryption key is also backed up to the user’s Google Account or Apple ID to be used on another device.

It is very similar to how one would use password managers today to securely sign up and log in to a website, which is far more secure as the server only has a public key instead of a password.

Aside from Apple, Google also <a href="https://android-developers.googleblog.com/2022/10/bringing-passkeys-to-android-and-chrome.html" target="_blank">announced</a> that they have brought passkey support to both Chrome and Android in October 2022. As <a href="https://arstechnica.com/information-technology/2022/05/how-apple-google-and-microsoft-will-kill-passwords-and-phishing-in-1-stroke/" target="_blank">Google, Microsoft and Apple committed to</a> support Passkeys and to eliminate passwords together, it’s the first time that we have a promising technology that not only is capable of eliminating passwords but is also easy to use and compatible with major platforms.

So besides iOS 16, how far are we from adopting Passkeys and eliminating Passwords? This article will look into the current compatibility state and supports of Safari (iOS), Chrome (Android, Google), and Firefox.

## Compatibility of WebAuthn

Passkey relies on WebAuthn, a protocol that supports the use of <a href="https://www.w3.org/TR/webauthn-2/#authenticator" target="_blank">Authenticator</a>. An authenticator is something that can store a credential. There are 2 kinds of authenticators, namely platform authenticators and cross-platform authenticators. A platform authenticator (e.g., browsers) resides on the device, while a cross-platform authenticator (e.g., security keys like Yubikeys) can be attached to devices.

So why do we still need Passkeys support if we got WebAuthn already?

Because without Passkeys, a credential only lives on the same device (e.g., for Safari, credentials will be cleared along with the browsing history), which can be quite inconvenient for end-users. You can’t log in to another platform (e.g. if your credential is created from iOS Safari, you can’t transfer it to Android for logging in to the same site).

According to <a href="https://caniuse.com/?search=webauthn" target="_blank">caniuse.com</a>, WebAuthn is supported by all the latest major browsers. This means you can use the WebAuthn API without running into compatibility issues if you are only targeting modern browsers.

<div id="table-container">
    <table>
        <tbody>
            <tr>
                <td></td>
                <td>Chrome/Edge</td>
                <td>Safari</td>
                <td>Firefox</td>
            </tr>
            <tr>
                <td>WebAuthn</td>
                <td>79 and onward</td>
                <td>13 and onward</td>
                <td>60 and onward</td>
            </tr>
            <tr>
                <td>Platform Authenticator<br>(e.g. Credential stored in Browser)</td>
                <td>79 and onward</td>
                <td>13 and onward</td>
                <td>No (<a href="https://bugzilla.mozilla.org/show_bug.cgi?id=1529973" target="_blank">source 1)</a></td>
            </tr>
            <tr>
                <td>Cross-Platform Authenticator<br>(e.g. Credential stored in Yubikey, or <a href="https://blog.1password.com/1password-is-joining-the-fido-alliance/" target="_blank">1Password Passkey</a>)</td>
                <td>79 and onward</td>
                <td>13 and onward</td>
                <td>60 and onward</td>
            </tr>
        </tbody>
    </table>

## Compatibility of Passkeys

iOS 16 is the first platform that supports Passkeys. Credentials could be stored in iCloud Keychain (or other services) and can be synced across devices.

Passkey could also let you sign in to another device running another platform without the credential leaving the original device. When users want to sign in on a new device, they could simply use the device with the credential to scan a QR code generated on the target device. Technically, it is supported by <a href="https://fidoalliance.org/specs/fido-v2.0-ps-20190130/fido-client-to-authenticator-protocol-v2.0-ps-20190130.html" target="_blank">FIDO2 CTAP2</a>.

Passkey-supported browsers would also show an **autofill prompt** when you visit a login screen, which allows the end-user to select one of the credentials and then log in instantly. This feature depends on <a href="https://www.w3.org/TR/webauthn-2/#client-side-discoverable-credential" target="_blank">Client-side discoverable credential</a> and <a href="https://github.com/w3c/webauthn/wiki/Explainer:-WebAuthn-Conditional-UI#conditional-ui" target="_blank">Conditional mediation</a>.

> 💡 **Check your own device:** the free [Passkey Demo & WebAuthn Tester](/tools/passkey-demo) detects whether your browser supports passkeys, platform authenticators, and conditional UI — and lets you create and test a real passkey on the spot.

<div id="table-container">
    <table>
        <tbody>
            <tr>
                <td></td>
                <td>Chrome/Edge</td>
                <td>Safari</td>
                <td>Firefox</td>
            </tr>
            <tr>
                <td>Login to a nearby device by QR code</td>
                <td>79 and onward (<a href="https://chromestatus.com/feature/6288375388569600" target="_blank">source 1</a>, <a href="https://chromestatus.com/feature/5078137018777600" target="_blank">source 2</a>)</td>
                <td>13 and onward</td>
                <td>No (<a href="https://bugzilla.mozilla.org/show_bug.cgi?id=1530370" target="_blank">source 1</a>, <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=1752089" target="_blank">source 2</a>)</td>
            </tr>
             <tr>
                <td>Sync Credentials across Devices</td>
                <td>Toward the end of 2022 (<a href="https://developers.google.com/identity/fido#who_supports_passkeys" target="_blank">source 1</a>, <a href="https://bugs.chromium.org/p/chromium/issues/detail?id=1223853&q=component%3ABlink%3EWebAuthentication&sort=status" target="_blank">source 2</a>)</td>
                <td>16 and onward (via iCloud Keychain)</td>
                <td>No (<a href="https://bugzilla.mozilla.org/show_bug.cgi?id=1529973" target="_blank">source 1</a>)</td>
            </tr>
              <tr>
              	<td>Autofill Prompt</td>
                <td>To be shipped in 106 (<a href="https://chromestatus.com/feature/5144633101778944" target="_blank">source 1</a>)</td>
                <td>16 and onward</td>
                <td>No (<a href="https://bugzilla.mozilla.org/show_bug.cgi?id=1782803" target="_blank">source 1</a>)</td>
            </tr>
        </tbody>
    </table>

## Conclusion

Currently, iOS 16 and Safari deliver the best support for passkeys. The passkeys on iOS 16 are syncing via iCloud Keychain, and it is also usable on an Android phone via QR code and supports autofill to sign the end-user in instantly. Passkeys support from other vendors is expected to come by the end of 2022. We are looking forward to a future without passwords!

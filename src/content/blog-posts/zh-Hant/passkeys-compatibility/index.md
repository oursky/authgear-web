---
title: "金鑰相容性：哪些平台支援金鑰？"
excerpt: "iOS、macOS、Chrome 和 Android 現在支援金鑰。了解有關密鑰及其與主要瀏覽器和平台的兼容性的更多資訊。"
coverImage: ./cover.png
category: highlight
featured: false
metaTitle: "Passkeys Compatibility: Which Platforms Support Passkeys?"
metaDescription: "iOS、macOS、Chrome 和 Android 現在支援金鑰。了解有關密鑰及其與主要瀏覽器和平台的兼容性的更多資訊。"
publishedAt: 2022-08-25T02:34:49.697Z
updatedAt: 2026-02-12T02:36:01.233Z
draft: false
---

<script type="application/ld+json">
    {
        "@context":"http://schema.org",
        "@type":"NewsArticle",
        "mainEntityOfPage":{
                            "@type":"WebPage",
                            "@id":"/post/passkeys-compatibility#webpage",
														"url":"/post/passkeys-compatibility"
                        },
        "headline":"Passkeys Compatibility: Which Platforms Support Passkeys?",
        "image":{
            "@type":"ImageObject",
            "url":"https://uploads-ssl.webflow.com/60658b47b03f0c77e8c14884/6306dea4c54a6b4834b4f191_passkey-compatibility.png",
            "width":1173,
            "height":560
        },
        "datePublished":"2022-08-26",
        "dateModified":"2022-08-26",
        "description":"Passkeys will soon be supported in iOS 16. Learn more about passkeys and their compatibility with Chrome, Safari, and Firefox.",
        "author":{
            "@id":"https://www.oursky.com/#organization"
        },
        "publisher":{
            "@type":"Organization",
            "name":"Oursky",
            "@id":"https://www.oursky.com/#organization",
            "logo":{
                "@type":"ImageObject",
                "@id":"https://www.oursky.com/#logo",
                "url":"https://oursky.com/assets/img/og-image.png",
                "caption":"Oursky"
              }
        }
    }
    </script>

Apple 在開發者大會上預覽了 2022 年 9 月推出的 iOS 16。iOS 16 其中一項引人矚目的功能是 **Passkeys（通行密鑰）**：這類數位憑證有機會從根本取代傳統密碼。

Passkeys 是「<a href="https://fidoalliance.org/multi-device-fido-credentials/" target="_blank">multi-device FIDO credentials（多重裝置 FIDO 憑證）</a>」的行銷名稱。使用者可在裝置上建立憑證（加密金鑰）以註冊服務（例如電商網站），金鑰也會備份到使用者的 Google 帳戶或 Apple ID，以便在其他裝置上使用。

這與今日透過密碼管理員安全註冊、登入網站的概念非常接近，但安全性更高：伺服器端只保存公開金鑰，而不是密碼。

除了 Apple，Google 也在 2022 年 10 月<a href="https://android-developers.googleblog.com/2022/10/bringing-passkeys-to-android-and-chrome.html" target="_blank">宣布</a>將 passkey 支援帶到 Chrome 與 Android。正如同 <a href="https://arstechnica.com/information-technology/2022/05/how-apple-google-and-microsoft-will-kill-passwords-and-phishing-in-1-stroke/" target="_blank">Apple、Google 與 Microsoft 的承諾</a>：三大平台共同支援 passkeys、攜手邁向淘汰密碼。這是我們第一次擁有同時「有潛力消除密碼」、又能在主要平台上善用且相對易用的關鍵技術。

那麼除了 iOS 16，我們離全面採用 passkeys、淘汰密碼還有多遠？本文將檢視 Safari（iOS）、Chrome（Android／桌面）與 Firefox 目前的相容性與支援程度。

## WebAuthn 的相容性

Passkey 依賴 WebAuthn；這個通訊協定支援使用 <a href="https://www.w3.org/TR/webauthn-2/#authenticator" target="_blank">驗證器（Authenticator）</a>。驗證器是能保存憑證的實體或軟體，分為兩類：**平台驗證器（platform authenticators）**與**跨平台驗證器（cross-platform authenticators）**。平台驗證器（例如內建在瀏覽器或作業系統中）位於裝置本機；跨平台驗證器（例如 YubiKey 等安全金鑰）則可外接於不同裝置。

既然已有 WebAuthn，為什麼還需要 Passkeys？

因為若沒有 passkeys，憑證往往只存在於同一台裝置上（例如在 Safari，憑證可能隨著瀏覽記錄被清除），對終端使用者很不方便。你也無法輕易在另一平台登入（例如憑證是在 iOS Safari 建立，就很難轉到 Android 上登入同一個網站）。

根據 <a href="https://caniuse.com/?search=webauthn" target="_blank">caniuse.com</a>，所有最新版主流瀏覽器都支援 WebAuthn。若你的產品只鎖定現代瀏覽器，通常可以直接使用 WebAuthn API 而不必擔心相容性。

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
                <td>79 起</td>
                <td>13 起</td>
                <td>60 起</td>
            </tr>
            <tr>
                <td>平台驗證器<br>（例如保存在瀏覽器中的憑證）</td>
                <td>79 起</td>
                <td>13 起</td>
                <td>否（<a href="https://bugzilla.mozilla.org/show_bug.cgi?id=1529973" target="_blank">來源 1</a>）</td>
            </tr>
            <tr>
                <td>跨平台驗證器<br>（例如保存在 YubiKey 的憑證，或 <a href="https://blog.1password.com/1password-is-joining-the-fido-alliance/" target="_blank">1Password 密碼</a>）</td>
                <td>79 起</td>
                <td>13 起</td>
                <td>60 起</td>
            </tr>
        </tbody>
    </table>
</div>

## Passkeys 的相容性

iOS 16 是第一個支援 passkeys 的平台。憑證可存放在 iCloud 鑰匙圈（或其他服務）並跨裝置同步。

Passkey 也能讓你在**另一台、跑著另一個平台的裝置**上登入，而不必把憑證「搬出」原始裝置：當使用者要在新裝置登入時，只要用已保存憑證的裝置掃描目標裝置上顯示的 QR code 即可。技術上這由 <a href="https://fidoalliance.org/specs/fido-v2.0-ps-20190130/fido-client-to-authenticator-protocol-v2.0-ps-20190130.html" target="_blank">FIDO2 CTAP2</a> 支援。

當你前往登入頁面時，支援 passkey 的瀏覽器也可能顯示**自動填入提示（autofill prompt）**，讓終端使用者挑選其中一組憑證後立即登入。此功能仰賴 <a href="https://www.w3.org/TR/webauthn-2/#client-side-discoverable-credential" target="_blank">client-side discoverable credential（客戶端可發現憑證）</a> 與 <a href="https://github.com/w3c/webauthn/wiki/Explainer:-WebAuthn-Conditional-UI#conditional-ui" target="_blank">Conditional UI（條件式 UI／conditional mediation）</a>。

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
                <td>透過 QR code 登入附近裝置</td>
                <td>79 起（<a href="https://chromestatus.com/feature/6288375388569600" target="_blank">來源 1</a>、<a href="https://chromestatus.com/feature/5078137018777600" target="_blank">來源 2</a>）</td>
                <td>13 起</td>
                <td>否（<a href="https://bugzilla.mozilla.org/show_bug.cgi?id=1530370" target="_blank">來源 1</a>、<a href="https://bugzilla.mozilla.org/show_bug.cgi?id=1752089" target="_blank">來源 2</a>）</td>
            </tr>
            <tr>
                <td>跨裝置同步憑證</td>
                <td>2022 年底前陸續到位（<a href="https://developers.google.com/identity/fido#who_supports_passkeys" target="_blank">來源 1</a>、<a href="https://bugs.chromium.org/p/chromium/issues/detail?id=1223853&q=component%3ABlink%3EWebAuthentication&sort=status" target="_blank">來源 2</a>）</td>
                <td>16 起（透過 iCloud 鑰匙圈）</td>
                <td>否（<a href="https://bugzilla.mozilla.org/show_bug.cgi?id=1529973" target="_blank">來源 1</a>）</td>
            </tr>
            <tr>
                <td>自動填入提示</td>
                <td>預計在 Chromium 106 推出（<a href="https://chromestatus.com/feature/5144633101778944" target="_blank">來源 1</a>）</td>
                <td>16 起</td>
                <td>否（<a href="https://bugzilla.mozilla.org/show_bug.cgi?id=1782803" target="_blank">來源 1</a>）</td>
            </tr>
        </tbody>
    </table>
</div>

## 結論

目前 iOS 16 與 Safari 對 passkeys 的支援最完整：iOS 16 上的 passkeys 可透過 iCloud 鑰匙圈同步，也可透過 QR code 在 Android 手機上使用，並支援自動填入以立即完成登入。其他廠商的 passkeys 支援預計在 2022 年底前陸續推出。我們期待一個不再依賴密碼的未來！

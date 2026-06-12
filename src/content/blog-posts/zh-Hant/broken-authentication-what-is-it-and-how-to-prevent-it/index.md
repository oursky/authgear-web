---
title: "失效驗證（Broken Authentication）是什麼？如何預防？"
excerpt: "失效驗證是 OWASP Top 10 常見漏洞之一，攻擊者可冒用使用者身分危及資料安全。本文說明成因與防範做法。"
coverImage: ./cover.webp
category: highlight
featured: false
metaTitle: "失效驗證（Broken Authentication）是什麼？如何預防？"
metaDescription: "失效驗證是 OWASP Top 10 常見漏洞之一，攻擊者可冒用使用者身分危及資料安全。本文說明成因與防範做法。"
publishedAt: 2022-11-03T08:22:30.152Z
updatedAt: 2026-02-12T02:33:17.660Z
draft: false
---
    驗證（Authentication）是確認一個人是否真的是其所聲稱身分的流程，也是任何網站或應用程式安全的關鍵。

然而，若實作方式不正確，驗證機制就會出現失效。根據 OWASP Foundation，Broken Authentication 屬於<a href="https://owasp.org/www-project-top-ten/" target="_blank">十大 Web 應用程式安全風險</a>之一，2017 年排名第 2、2021 年排名第 7。Broken Authentication 的成因在於驗證與 Session 管理實作不佳。攻擊者可利用這些弱點存取敏感資訊，例如財務資料或個人資訊。

換句話說，Broken Authentication 會讓攻擊者繞過驗證機制，取得與受害使用者相同的權限。那麼，到底什麼是 Broken Authentication？

本篇文章將深入探討此主題，並說明 Broken Authentication 的成因，以及如何預防。

<nav id="table-of-content"> Table of Content
    <ul>
        <li><a href="#definition">什麼是 Broken Authentication？</a></li>
        <li style="margin-bottom:0"><a href="#session-management">Session 管理實作不佳</a>
            <ul>
                <li><a href="#hijack">Session Hijacking</a></li>
                <li><a href="#rewrite">Session ID URL Rewriting</a></li>
                <li><a href="#fixation">Session Fixation</a></li>
            </ul>
        </li>
        <li style="margin-bottom:0"><a href="#loose-policy">寬鬆密碼政策與遭竊／外洩憑證</a>
            <ul>
                <li><a href="#stuffing">Credential Stuffing</a></li>
                <li><a href="#spraying">Password Spraying</a></li>
                <li><a href="#phishing">Phishing Attacks</a></li>
            </ul>
        </li>
        <li style="margin-bottom:0"><a href="#prevent-broken">如何防止 Broken Authentication？</a>
            <ul>
                <li style="margin-bottom:0"><a href="#session-tips">更好的 Session 管理建議</a>
                    <ul style="margin-bottom:0">
                        <li style="margin-top:15px"><a href="#avoid-session-url">避免在 URL 顯示 Session ID</a></li>
                        <li><a href="#session-length">設定適當的 Session 長度</a></li>
                        <li><a href="#rotate-id">輪替並作廢 Session ID</a></li>
                    </ul>
                </li>
                <li style="margin-top:0;margin-bottom:0"><a href="#strong-policies">更強的密碼政策與驗證機制</a>
                    <ul style="margin-bottom:0">
                        <li style="margin-top:15px"><a href="#passkey">以 Passkeys 作為主要驗證方式</a></li>
                        <li><a href="#mfa">導入多因素驗證</a></li>
                        <li><a href="#hash-salt">使用強健的密碼雜湊演算法</a></li>
                        <li><a href="#password-policies">建立強密碼政策</a></li>
                    </ul>
                </li>
            </ul>
        </li>
        <li><a href="#authgear">讓 Authgear 保護你的應用程式免於 Broken Authentication</a></li>
    </ul>
</nav>

<h2 id="definition">什麼是 Broken Authentication？</h2>

Broken Authentication 指的是攻擊者可在應用程式中冒用原始使用者身分的各種漏洞。也就是說，當攻擊者可以透過破解密碼、Session Token、使用者帳號資訊或其他細節來取得使用者身分時，驗證機制就算失效。Broken Authentication 的主要成因，是 Session 管理實作不佳，以及密碼政策過於寬鬆或其他安全措施薄弱，進而導致憑證遭竊或遭外洩。接下來我們將深入說明這些成因及相關攻擊。

<h2 id="session-management">Session 管理實作不佳</h2>

<!--FIGURE-->
![](./figure-1.webp)
<!--/FIGURE-->

在說明 Session 管理不良如何導致 Broken Authentication 之前，先解釋幾個必要概念。

如今，大多數 Web 應用程式都要求使用者登入線上帳號。多數情況下，使用者會以帳號密碼登入。當成功登入後，應用程式會指派一個不可重複的 **Session ID**，作為身分識別鍵。

這個過程會建立一個 **Session**，也就是一連串與使用者相關、且會被一起追蹤的請求。Session 用於儲存你與應用程式互動狀態的資訊。Session ID 通常存在於 Cookie 或 Authorization Header 中。

舉例來說，使用者登入網站時會建立 Session。這個 Session 會追蹤使用者在登入狀態下發出的所有請求。當使用者登出或 Session 逾時，Session 就會被銷毀。

Session 管理指的是網站與應用程式如何定義某個 Session 的參數，像是 Session 多久後登出、如何簽發 Session ID，以及當 Session 連線到不同使用者 IP 位址時的安全控管。

你也要注意，每當使用者以身分登入應用程式或網站時，都會建立一個 Session。此 Session 是經過驗證的，也就是使用者必須提供憑證才能進入該 Session。

因此，OWASP 指出：「已驗證 Session 的 Session ID，在短時間內等同於該應用所使用最強驗證方法。」這個驗證方法可能是帳號密碼、一次性密碼（OTP）或生物辨識。

與 Session 管理相關的 Broken Authentication 攻擊有多種類型，包括：

<h3 id="hijack">Session Hijacking</h3>

這類 Session 管理攻擊發生在攻擊者竊取使用者 Session ID 並接管其 Session 時。攻擊者可透過多種方式達成，例如攔截使用者與伺服器之間傳輸的 Session ID。

當使用者使用完應用程式後未登出並離開裝置時，攻擊者也可趁機利用。網路犯罪者可存取該裝置，直接沿用仍有效的 Session。

<h3 id="rewrite">Session ID URL Rewriting</h3>

Session ID URL Rewriting 指的是使用者 Session ID 被顯示在網站 URL 中。任何人在不安全的 Wi-Fi 環境中取得該 URL，都可能延續該 Session。

這類攻擊常見於 Session ID 被放進 URL，而不是儲存在 Cookie 的情況。使用者在把連結傳給他人時，可能無意中一併分享了 Session ID。取得連結的人便可冒用原使用者。這類攻擊在使用 URL 參數儲存 Session ID 的應用程式中特別常見。

<h3 id="fixation">Session Fixation</h3>

當 Web 應用程式在使用者登入後未產生新的 Session ID，就會出現這種攻擊風險。在這種情況下，應用程式在驗證前後給了同一個 ID。若應用程式產生的是固定不變或容易猜測的 Session ID，也會導致同樣問題。

<h3 id="loose-policy">寬鬆密碼政策與遭竊／外洩憑證</h3>

<!--FIGURE-->
![](./figure-2.webp)
<!--/FIGURE-->

若你的應用程式沒有強健的密碼政策，網路犯罪者同樣能破壞驗證流程。使用者可能傾向選用容易被猜中的密碼，讓攻擊者更容易入侵帳號。

與遭竊或外洩憑證相關的攻擊包括：

<h3 id="stuffing">Credential Stuffing</h3>

Credential stuffing 是把遭竊的帳號密碼配對，自動大量灌入網站登入表單的攻擊手法。攻擊者會取得外洩憑證清單，並利用機器人自動嘗試登入不同系統。其前提是很多使用者會重複使用容易猜測、或已遭外洩的帳號密碼。

一旦發生資料外洩，把偷來的憑證提交到其他網站，攻擊者就更容易入侵更多帳號。攻擊者也可能出售這些憑證，或分享給其他網路犯罪者。這代表會有更多駭客在不同帳號上嘗試你的使用者憑證，成功攻擊的風險也隨之上升。

<h3 id="spraying">Password Spraying</h3>

在這類攻擊中，網路犯罪者會用常見密碼去猜大量帳號，例如 123456、髒話、運動名稱和 "password"。事實上，<a href="https://edition.cnn.com/2020/11/19/tech/common-passwords-2020-trnd/index.html" target="_blank">仍有 250 萬人使用「123456」作為密碼</a>。攻擊者通常會在一段時間內針對大量使用者，而不是只猛攻單一帳號。

這類攻擊的問題在於容易被忽略，因為大多數組織並未妥善追蹤失敗登入嘗試。

<h3 id="phishing">Phishing Attacks</h3>

Phishing 攻擊是指網路犯罪者寄送惡意 Email，誘騙使用者透露憑證。他們也可用同一手法在受害者裝置植入惡意程式，或把受害者導向假網站。

Phishing 攻擊會暴露使用者憑證，接著可被用來登入其他網站帳號。這些攻擊可能是一封詐騙郵件廣泛鎖定所有使用者，也可能是針對特定個人的魚叉式釣魚攻擊。後者很常見，因為攻擊者可利用可取得的個資，更容易操縱使用者情緒。

<h2 id="prevent-broken">如何防止 Broken Authentication？</h2>

<!--FIGURE-->
![](./figure-3.webp)
<!--/FIGURE-->

雖然 Broken Authentication 相關攻擊很常見，但你仍可採取一些措施來預防。以下保護措施可幫助你加固驗證流程：

<h3 id="session-tips">更好的 Session 管理建議</h3>

以下最佳實務可協助你保護 Session 管理流程：

<h4 id="avoid-session-url">避免在 URL 顯示 Session ID</h4>

如前所述，Session ID 不應出現在 URL，因為任何取得該 URL 的人都可續用該 Session。

取而代之，Session ID 應存放於 Cookie 或 HTTP authorization header。

<h4 id="session-length">設定適當的 Session 長度</h4>

Web 應用程式會在特定時間點自動結束 Session。這可能發生在使用者登出，或長時間無操作時。你應依應用場景或使用者類型調整 Session 長度。

例如，轉帳 App 為了降低 Session Hijacking 風險，應在幾分鐘內定期讓使用者重新登入；但若是串流影音服務，Session 可延長到數週，避免使用者每次都要重登。

<h4 id="rotate-id">輪替並作廢 Session ID</h4>

你也應定期輪替或作廢 Session ID。如此可確保攻擊者無法長時間利用遭竊 Session ID。常見作法是每個 Session 使用 refresh token 與 access token；其中 access token 的有效期較短，客戶端可透過 refresh token 取得新的 access token 以維持 Session。

<h3 id="strong-policies">更強的密碼政策與驗證機制</h3>

你也可透過多項措施，保護使用者免受憑證外洩相關攻擊。包括：

<h4 id="passkey">以 Passkeys 作為主要驗證方式</h4>

<a href="/features/passkeys" target="_blank">Passkeys</a> 是新一類數位憑證，讓使用者在網站應用程式中不必使用容易受攻擊的複雜密碼即可登入。使用者註冊時只需提供使用者名稱，接著透過生物辨識或 PIN 驗證，就像解鎖手機一樣。Passkeys 不僅降低登入與註冊流程摩擦，也提升資料安全，因為攻擊者無法誘騙使用者交出憑證。

<h4 id="mfa">導入多因素驗證</h4>

<a href="/zh-hant/post/what-is-multi-factor-authentication-mfa" target="_blank">多因素驗證</a>（MFA）是一種需要兩種以上因子來驗證使用者身分的方法。最常見因子是使用者知道的資訊（通常是密碼）、使用者持有的物件（如安全權杖）、以及使用者本身特徵（如指紋）。

舉例來說，當使用者登入你的網站應用程式時，除了密碼外，還可能需要輸入發送至手機的驗證碼。MFA 為登入流程增加了額外安全層。即使網路犯罪者成功竊取密碼，沒有第二因子仍無法存取帳號。

<h4 id="hash-salt">使用強健的密碼雜湊演算法</h4>

另一項防範密碼型攻擊的措施，是對密碼進行<a href="/zh-hant/post/password-hashing-salting-function-and-algorithm-explained" target="_blank">雜湊與加鹽</a>。雜湊是把密碼轉換為隨機字串（雜湊值）；加鹽是在雜湊前加入隨機資料（salt）。

這會讓攻擊者更難破解密碼，因為他們必須知道 salt 值才能逆向推回原密碼。<a href="https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html#password-hashing-algorithms" target="_blank">OWASP 建議多種適合儲存密碼的雜湊演算法</a>，如 Argon2id、scrypt、bcrypt 與 PBKDF2。

重要的一點是，請使用具密碼學強度的密碼雜湊演算法，把密碼轉換為不可逆字串。強健演算法會對密碼做雜湊與加鹽，因此即使駭客入侵驗證伺服器，也無法取得明文密碼。

<h4 id="password-policies">建立強密碼政策</h4>

你也可建立強密碼政策，讓攻擊者更難猜出密碼或透過 brute force 入侵使用者帳號。可採取的措施包括：

- 強制最低密碼強度
- 禁止常見密碼
- 實作密碼到期政策
- 限制失敗登入次數，達門檻後鎖定帳號

目標是排除攻擊者可輕易猜測的弱密碼。

<h2 id="authgear">讓 Authgear 保護你的應用程式免於 Broken Authentication</h2>

要處理上述所有安全措施相當耗時，而且開發者難免會忽略某些步驟，進而導致 Broken Authentication。你的團隊應把重心放在核心功能開發，而不是被驗證風險拖住進度。

將應用程式整合到 Authgear 後，你可輕鬆保護使用者免受前述網路攻擊。在 Portal 上，你可不寫任何程式碼就建立強密碼政策，降低憑證遭竊風險。此外，Authgear 也會為密碼做雜湊與加鹽，確保使用者密碼不會以明文儲存。

Authgear 為你的應用程式提供完整的安全功能與驗證機制，確保更強防護與更佳使用者體驗。立即<a href="https://accounts.portal.authgear.com/signup" target="_blank">免費註冊 Authgear</a>，或<a href="/schedule-demo/" target="_blank">聯絡我們</a>，了解如何使用 Authgear 擴展你的使用者基礎。

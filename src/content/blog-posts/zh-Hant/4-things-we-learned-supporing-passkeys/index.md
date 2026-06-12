---
title: "我們在支持通行密鑰方面學到的 4 件事"
excerpt: "通行密鑰有可能完全取代密碼，但它還不夠完美。詳細了解您在支持他們時可能遇到的情況。"
coverImage: ./cover.webp
category: engineering
featured: false
metaTitle: "我們在支持通行密鑰方面學到的 4 件事"
metaDescription: "通行密鑰有可能完全取代密碼，但它還不夠完美。詳細了解您在支持他們時可能遇到的情況。"
publishedAt: 2022-08-29T03:24:43.364Z
updatedAt: 2026-02-12T02:33:17.663Z
draft: false
---

你知道密碼「123456」仍然被使用嗎 <a href="https://www.ncsc.gov.uk/news/most-hacked-passwords-revealed-as-uk-cyber-survey-exposes-gaps-in-online-security" target="_blank">超過2300萬人</a>？人們通常認為駭客不會費心破解他們的帳戶，並決定在不同平台上使用相同的簡單密碼。

我的一位朋友告訴我，他的帳號遭到駭客攻擊，惡意訊息被傳送給他的 Facebook 好友。他還為所有社交帳戶使用了類似於“12345678”的簡單密碼，因為他認為沒有人會破解他的帳戶。可悲的是，事實證明任何可能出錯的事情都會出錯，

密碼易於使用，使其成為最常見的身份驗證方法。然而，人們傾向於使用容易被破解的簡單密碼。此外，用戶可能會被欺騙，在不知情的情況下向駭客提供密碼。

2022年，我們終於迎來了好消息！行業領導者喜歡 <a href="https://developer.apple.com/passkeys/" target="_blank">蘋果</a>, <a href="https://developers.google.com/identity/fido#who_supports_passkeys" target="_blank">Google</a> 微軟正在研究一種稱為金鑰的新身份驗證方法。通行密鑰有可能完全取代密碼。儘管如此， <a href="/zh-hant/post/passkeys-compatibility" target="_blank">在技​​術更加成熟之前，存在各種相容性和支援問題</a>.

在這篇文章中，我們將簡要討論金鑰的基礎以及我們在透過 Authgear 幫助開發人員在其應用程式上輕鬆支援金鑰時遇到的問題。

## 什麼是通行密鑰？

金鑰是基於用戶身份驗證行業標準的數位憑證。它們遵循使用公鑰加密的 FIDO 和 WebAuthn 標準，這是最受歡迎和最安全的協定。每當用戶建立新帳戶時，都會建立一對公鑰和私鑰。公鑰是公開的，而相應的私鑰通常是在用戶的裝置內保密的。用公鑰加密的資料只能用對應的私鑰解密。用戶只需使用 PIN、生物辨識感應器等解鎖設備，即可解鎖私鑰並存取應用程式或網站。這樣，與基於密碼的身份驗證不同，用戶永遠不必向任何人透露他們的私鑰。

雖然科技巨頭努力將金鑰引入行動設備，但我們的團隊正在努力支援以下領域的金鑰 <a href="/zh-hant/" target="_blank">Authgear</a> 以便每個人都可以輕鬆地在其應用程式上使用密碼登入。由於對密鑰的支援還遠未成熟，我們在將密鑰與各種設備和平台整合時遇到了一些問題。

對於嘗試開發支援金鑰的網站和我們的解決方案的開發人員來說，以下是 4 個問題（也許也是您可能想要使用 Authgear 而不是開發解決方案的原因）：

<nav id="table-of-content">
    <ul> 
        <li><a href="#backward">需要保持與非密鑰支援平台的向後相容性 </a></li>
        <li><a href="#autofill">自動填充提示支援有限</a></li>
        <li><a href="#platform-experience">不同平台的使用者體驗有所不同</a></li>
        <li><a href="#error-handling">平台之間的錯誤處理不一致</a></li>
    </ul>
 </nav>

<h2 id="backward">需要保持與非密鑰支援平台的向後相容性</h2>

<!--FIGURE-->
![](./figure-1.webp)
<!--/FIGURE-->

在我們動手之前，我們花了一些時間研究密鑰在各種平台上的兼容性。

在 iOS 16 之前， <a href="https://www.w3.org/TR/webauthn-2/#enum-attachment" target="_blank">平台驗證器</a> 就像 Safari 創建的 <a href="https://fidoalliance.org/white-paper-multi-device-fido-credentials/" target="_blank">單一設備 FIDO 憑證</a>。這意味著雖然最終用戶可以建立憑證，但它會與 cookie 一起清除。如果最終用戶僅使用單設備憑證註冊您的應用程序，那麼當他們清除瀏覽歷史記錄時，他們將永久失去對其帳戶的存取權。 Android 和 Chrome 桌面等平台也具有這項特色。

<!--FIGURE-->
![](./figure-2.webp)
<!--/FIGURE-->

借助 iOS16 上的密鑰支持，Safari 創建了 <a href="https://fidoalliance.org/multi-device-fido-credentials/#faq" target="_blank">多裝置 FIDO 憑證</a> 儲存在 iCloud 鑰匙圈中。多裝置 FIDO 憑證也稱為 **金鑰**。密鑰仍然被認為具有 <a href="https://www.w3.org/TR/webauthn-2/#enum-attachment" target="_blank">平台附件</a>s，但這些金鑰在最終用戶設備之間同步。因此，通行密鑰在最終用戶擁有的所有設備上都可用，並且不會隨瀏覽歷史記錄一起清除。這項特性也是讓通行密鑰可供消費者使用的關鍵點。

<!--FIGURE-->
![](./figure-3.webp)
<!--/FIGURE-->

由於憑證有兩種，「單設備憑證」和「多設備憑證」。為了確保我們的最終用戶獲得最佳體驗，您的應用程式必須準備好在技術上處理這兩個問題。

這意味著我們需要支援每個帳戶多個憑證，以便最終用戶可以根據需要自由添加憑證 - 在受支援的平台上新增金鑰，在不支援金鑰的平台上新增單設備憑證。

<h2 id="autofill">自動填充提示支援有限</h2>

<a href="https://www.w3.org/TR/webauthn-2/#client-side-discoverable-credential" target="_blank">用戶端可發現的憑證</a> 是指無需先識別最終使用者即可使用的憑證。客戶端可發現憑證的主要用例是**支援自動填充提示** - 在登錄頁面上，您顯示一個典型的輸入字段，供最終用戶輸入其用戶名；當他們單擊輸入字段時，系統將提示他們提供可用的密鑰列表。然後，最終用戶可以點擊選擇金鑰並立即登錄，從而使身份驗證變得更加簡單。

客戶端可發現的憑證在使用者體驗方面非常令人印象深刻，但我們遇到了一個問題，阻止我們將其推廣給客戶。實現自動填充的程式碼是違反直覺的。我們需要在等待自動填入結果時創建一個待處理的承諾。當承諾解決後，必須重新創建新的待處理承諾。偽代碼如下所示：

```

<span class="keyword">function</span> <span class="function">autofill</span>() {
 <span class="comment">// This function is recursive.</span>
 <span class="comment">// PublicKeyCredential.isConditionalMediationAvailable is available on iOS 16 and onward.</span>
 <span class="comment">// So autofill is only available on iOS 16 and onward.</span>
 <span class="keyword">if</span> (<span class="keyword">typeof</span> PublicKeyCredential.is<span class="function"></span>ConditionalMediationAvailable <span class="operator">===</span> <span class> <span class="string">"function"</span> {
  <span class="keyword">const</span> available <span class="operator">=</span> <span class="keyword">await</span> PublicKeyCredential.<span class="function">isConditionalMediationAvailable</span>();
  <span class="keyword">if</span> (available) {
   <span class="keyword">const</span> options <span class="operator">=</span> <span class="comment">// options are omitted for brevity.</span>
   <span class="keyword">try</span> {
    <span class="keyword">const</span> response <span class="operator">=</span> <span class="keyword">await</span> navigator.credentials.<span class="function">get</span>({
     ...options,
     <span class="property">mediation</span>: <span class="string">"conditional"</span>,
    });
    <span class="comment">// Send the assertion response to your server to sign in.</span>
   } <span class="keyword">catch</span> (e) {
    <span class="comment">// Inspect the error to see if we should recursively</span>
    <span class="comment">// call the function again.</span>
     <span class="function">autofill</span>();
    }
   }  
  }
}
    </span>
```

中介選項是決定係統行為的選項。當中介是有條件的時，系統不會顯示模式對話框。在 iOS 16 上，可用的通行密鑰在鍵盤配件視圖中顯示為選項。因此，它的工作原理類似於自動填充。當未指定中介時，系統會顯示典型的模式對話框，要求使用者選擇金鑰。

<p>我們遇到了一個問題 <span class="inline-code">navigator.credentials.get({ 中介: "條件"})</span> 將立即被拒絕 <span class="inline-code">DOMException(名稱=“NotAllowedError”)</span>。當觀察到此類異常時，下一次調用 <span class="inline-code">navigator.credentials.get()</span> 將正常顯示模式對話框。但是，當最終用戶選擇密鑰時，模式對話框將變得無響應，並且承諾永遠不會實現。這個錯誤有效地破壞了流程。我們別無選擇，只能暫時停用自動填充。這可能是個bug，我們必須等到iOS 16正式發布。此錯誤已被跟踪 <a href="https://bugs.webkit.org/show_bug.cgi?id=241126" target="_blank">這裡</a>.</p>

<!--FIGURE-->
![](./figure-4.webp)
<!--/FIGURE-->

<!--FIGURE-->
![](./figure-5.webp)
<!--/FIGURE-->

<h2 id="platform-experience">不同平台的使用者體驗有所不同</h2>

我們依靠平台/瀏覽器提供的 WebAuthn API 來使用金鑰。我們無法控制呈現給最終用戶的使用者介面。如果平台不提供有用和解釋性的錯誤訊息，最終用戶可能很容易陷入困境，不知道如何繼續。

<p>Chrome 桌面上就發生了這樣一種情況。假設最終用戶已經使用密鑰註冊。當他們嘗試登入時， <span class="inline-code">navigator.credentials.get</span> 方法支援一個選項 <span class="inline-code"><a href="https://www.w3.org/TR/webauthn-2/#dom-publickeycredentialrequestoptions-allowcredentials" target="_blank">允許憑證</a></span> 讓我們告訴設備用戶可以使用哪些密鑰。</p>

<p>當 Safari 發現憑證 <span class="inline-code">允許憑證</span> 如果與可用的金鑰不匹配，它會智慧地要求使用者透過掃描二維碼或使用安全金鑰來使用其他裝置。</p>

然而，在 Chrome 桌面上，瀏覽器不夠智能，無法隱藏在裝置上使用憑證的選項。最終用戶可以點擊該選項，然後看到一條無用的錯誤訊息，指出“無法驗證您的身份”，而沒有任何其他訊息。

<!--FIGURE-->
![](./figure-6.webp)
<!--/FIGURE-->

在 Firefox 桌面上，模式對話方塊看起來與普通權限對話框非常相似。模式對話框未居中且不夠大，不足以吸引最終用戶的注意。如果最終使用者習慣了權限對話框，則可能很容易錯過模式對話框。

<!--FIGURE-->
![](./figure-7.webp)
<!--/FIGURE-->

<h2 id="error-handling">跨平台的錯誤處理不一致</h2>

儘管規範確實指定了在某些異常情況下拋出什麼錯誤，但異常的粒度取決於 <a href="https://www.w3.org/TR/webauthn-2/#CreateCred-DetermineRpId" target="_blank">姓名</a>。有時會拋出同名異常，迫使我們查看訊息以了解其含義。該訊息沒有指定，並且所有平台都有其專有的訊息。這使得我們不得不將訊息與一些正則表達式進行匹配來猜測異常情況，這是相當棘手的。

## 結論

雖然整合只涉及兩個功能，但如果我們決心讓密鑰的使用體驗像密碼一樣簡單易用，這並不是一件容易的事。對於想要在其 Web 或應用程式上啟用金鑰的開發人員來說，平台之間相容性的差異和錯誤處理的不一致是一個挑戰。

如果穩健性對您的應用程式和使用者至關重要，那麼手動實施您的實作可能並不好。 <a href="https://accounts.portal.authgear.com/signup" target="_blank">開始免費試用</a> 或者 <a href="/zh-hant/schedule-demo/" target="_blank">聯絡我們</a> 了解如何從 Authgear 中受益，並為您的用戶提供順暢的體驗，而不會遇到任何麻煩。

---
title: "用 Magic Link 與 Authgear 打造輕鬆無密碼登入體驗"
excerpt: "本文介紹什麼是 Magic Link，以及如何用 Authgear 建立以 Email 為核心的無密碼登入流程。"
coverImage: ./cover.webp
featured: false
metaTitle: "用 Magic Link 與 Authgear 打造輕鬆無密碼登入體驗"
metaDescription: "本文介紹什麼是 Magic Link，以及如何用 Authgear 建立以 Email 為核心的無密碼登入流程。"
publishedAt: 2023-07-21T07:13:22.684Z
updatedAt: 2026-02-12T02:33:54.727Z
draft: false
---

如今，我們在日常活動中，像是溝通、金融交易、購物與娛樂，都需要**輸入帳號憑證**。傳統的密碼登入流程迫使我們為每個帳號記住特定的使用者名稱與密碼，必須依靠**記憶**，或使用可產生並儲存高強度密碼、讓登入更安全的**密碼管理器**。儘管有這些工具可用，許多人在使用時仍有抗拒與猶豫，原因不一：

1. 多數人覺得把密碼記在別處或自己背下來就可以。
1. 他們不知道該選哪一款，或不知道如何開始使用。
1. 他們不想為密碼保護付費。
1. 他們不信任密碼管理軟體。

不過，還有另一種替代方案叫做 **magic links**，可以省去記密碼的負擔。透過 <a href="https://docs.authgear.com/strategies/email-login-link" target="_blank">magic links</a>，你只需要輸入 Email、在收件匣收到連結、點一下，登入就完成了。這篇文章會介紹**什麼是 magic links**，以及你在使用 <a href="/" target="_blank">Authgear</a> 為使用者建立 Email 驅動登入流程時**需要了解的重點**。

## 什麼是 magic links?

**Magic links** 是一種<a href="/features/passwordless-authentication" target="_blank">passwordless authentication</a>方式：使用者輸入 Email/使用者名稱後，系統會把連結寄到對應信箱，使用者點擊即可登入。

Magic links 可降低密碼相關漏洞的風險。密碼可能過弱、在多個帳號重複使用，或被駭客透過暴力破解猜中。相對地，magic links 對每次登入嘗試都是獨一無二，且具有時效性。

它們也為使用者提供便利性。使用傳統密碼時，使用者經常需要定期重設密碼，造成額外步驟，甚至可能導致帳號鎖定；而使用 magic links，則不需要管理密碼或定期更新密碼。

## Magic Links 如何運作？

在 Authgear 中**使用 magic links** 的流程很直覺。

1. 當使用者想登入網站或應用程式時，他們會在登入頁輸入 Email。
1. 應用程式會把登入連結寄到該註冊信箱。
1. 使用者點擊信中的連結後即可存取應用程式。

<!--FIGURE-->
![](./figure-1.webp)
<!--/FIGURE-->

## Magic Links 的 5 種使用情境

Magic links 可用在多種情境，從登入應用程式到存取受保護資源都適用。以下是一些 magic links 已成功落地的真實使用案例：

**1. 重設密碼**

當使用者忘記密碼，或認為密碼可能已不再安全時，通常會進入密碼重設流程。Magic links 可以用於重設密碼。使用者會透過 Email 或簡訊收到一個特殊連結；當他們點擊該連結後，會被導向可輸入新密碼的頁面。這樣一來，就能在不必記住舊密碼的情況下輕鬆完成重設。

**2. 時效性交易**

有時驗證流程可能花費較長時間，對於像銀行轉帳或線上付款這類時間敏感交易會不方便。為了解決這個問題，可以產生 magic link，讓使用者快速且輕鬆完成驗證，避免額外延遲。如此一來，交易可在更少摩擦的情況下安全完成。

**3. 一次性存取**

想像一個情境：某人只需要存取一次某項內容，例如共享文件或活動邀請。此時 magic links 就很實用。系統可建立只能使用一次的特殊連結，當使用者點擊連結並取得文件或活動存取權後，該連結就會失效，無法再次使用。

**4. 更順暢的等候名單 onboarding**

在產品尚未準備好前，等候名單是觀察市場興趣的好方式。但等候名單常見問題是：當你嘗試把候補名單轉為實際使用者時，很多人會流失。要解決這個問題，關鍵是讓開始使用的流程盡可能簡單。與其寄送要求先註冊帳號的連結，不如直接寄送可立即開始使用產品的連結，讓他們無需額外步驟或等待即可進入。

**In-store purchases**

隨著越來越多人在購物時不再使用現金或實體卡片，而改用新的支付方式，商家可以把特殊連結寄到客戶 Email。客戶點擊後即可完成交易，不需要再填寫額外個人或付款資訊。若使用者先前已在商家端註冊並留有付款資料，商家也可只寄送一封確認信，讓使用者用既有付款資訊確認付款。

## 使用 Authgear 優化你的 magic link Email

如果你想為產品導入 magic link 驗證，以下是 Authgear 如何提供優秀使用者體驗，並協助降低 magic link 缺點所帶來風險的一些重點。

**1. Email verification**

使用 Authgear 時，Email 驗證服務開箱即用。預設情況下，Authgear 也會在使用者註冊時寄送 magic links。你也可以自訂 Authgear **寄送驗證信**的時機。例如，若你需要**批次驗證 Email**，或希望等到使用者執行需要已驗證 Email 的操作時才**延後驗證**。

**2. Guaranteed Email delivery**

Magic links 的成效取決於你用來寄信的**Email 服務**。若信件遺失或延遲到達，使用者就無法順利登入。Email 寄送過慢會讓使用者挫折，並讓他們在登入流程中分心。Authgear **使用可信賴的 Email（SMTP）供應商**，確保 magic links 能送達目的地，並降低連結進垃圾信匣的機率。你也可以使用<a href="https://docs.authgear.com/customize/custom-email-provider" target="_blank">自訂 Email 供應商</a>管理、監控與排除信件問題，同時客製 Email 模板。

**3. 提供 one-time-use links**

Authgear 透過將 magic links 設為**僅可使用一次**，確保其安全性與有效性。設定為單次使用可避免連結被分享給未授權使用者。

**4. 強制 multi-factor authentication (MFA)**

使用 magic links 的其中一項缺點，是高度依賴使用者主要 Email。若該 Email 被駭，攻擊者可能輕易竊取單因子 magic links，未經授權地存取相關服務與工具。你可在 Authgear Portal 中，除了 magic links 外再**啟用 MFA**，以**降低這些風險**。

**5. 可設定連結到期時間**

另一種提升 magic links 安全性的方式是設定有效期限。使用 Authgear 時，你設定的連結只會在你指定時間內有效（通常約 1 分鐘），之後會自動失效。

**6. 自訂登入方式**

假設你有一種情境：只對**少數使用者寄送 magic links**，並讓他們僅能透過 magic link 登入；其餘使用者則維持一般 **Email & Password** 流程。在這種情況下，你可以在 Authgear 定義多種登入方式，以符合不同使用者群組的需求。

<!--FIGURE-->
![](./figure-2.webp)
<!--/FIGURE-->

<!--FIGURE-->
![](./figure-3.webp)
<!--/FIGURE-->

**7. Customize branding**

你可以調整終端使用者看到的登入頁面，並<a href="https://docs.authgear.com/customize/branding" target="_blank">客製化外觀</a>來符合你的品牌識別。

**8. Customer Support Link**

同樣重要的是，你可以讓終端使用者在登入流程中需要協助時，透過<a href="https://docs.authgear.com/customize/customer-support-link" target="_blank">聯絡客服</a>取得幫助，並把這個支援連結放在 magic links 相關流程中。

## 如何把 magic link 流程整合到你的 App

乍看之下，自建 magic link 流程似乎很簡單，但它其實伴隨一系列挑戰。常見困難包括安全性、Email 送達率、錯誤處理、維護成本，以及與其他 Email 供應商的整合。你可以考慮使用 Authgear 這類成熟的驗證工具。這裡有一份<a href="https://docs.authgear.com/strategies/email-login-link" target="_blank">更詳細的教學</a>，協助你開始把 **magic links** 整合進 App。

Authgear 能卸載大量與驗證相關的複雜度，讓你專注在為應用程式打造**更具價值的功能**。它可整合到各種類型的應用中，從**單頁 Web App**、**行動應用程式**到**後端服務**都適用。

## Summary

總結來說，Authgear 透過 magic links 提供的無密碼登入體驗，為密碼帶來的挑戰提供了兼具易用與安全的解法。只要一個可點擊連結就能完成登入，對使用者更具吸引力。Authgear 最棒的部分在於提供預建介面，只需最少設定即可啟用 magic links。更好的是，還有免費方案可讓你立即開始！  
  
Related resources

- [Authentication-as-a-Service: What Is It and Why You Need It](/zh-hant/post/authentication-as-a-service)
- [Frictionless Authentication: What Is It & How To Implement It?](/zh-hant/post/frictionless-authentication)

---
title: "如何保護你的使用者免受自動化攻擊"
excerpt: "一起來看看保護使用者免受快速演進的自動化攻擊威脅的最佳做法。"
coverImage: ./cover.jpg
category: industry
featured: false
metaTitle: "如何保護你的使用者免受自動化攻擊"
metaDescription: "一起來看看保護使用者免受快速演進的自動化攻擊威脅的最佳做法。"
publishedAt: 2021-12-13T05:04:41.126Z
updatedAt: 2026-02-12T02:35:14.204Z
draft: false
---

<script type="application/ld+json">
    {
        "@context":"http://schema.org",
        "@type":"NewsArticle",
        "mainEntityOfPage":{
                            "@type":"WebPage",
                            "@id":"/post/how-to-protect-your-users-from-automated-attacks/#webpage",
                            "url":"/post/how-to-protect-your-users-from-automated-attacks"
                        },
        "headline":"如何保護你的使用者免受自動化攻擊",
        "image":{
            "@type":"ImageObject",
            "url":"https://uploads-ssl.webflow.com/60658b47b03f0c77e8c14884/61b6d451403cc3fa26c67f19_How%20to%20protect%20your%20users%20from%20automated%20attacks.jpg",
            "width":1223,
            "height":689
        },
        "datePublished":"2021-12-13",
        "dateModified":"2022-04-07",
        "description":"一起來看看保護使用者免受快速演進的自動化攻擊威脅的最佳做法。",
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

Gartner 預測，<a href="https://www.gartner.com/en/newsroom/press-releases/2021-07-21-gartner-predicts-by-2025-cyber-attackers-will-have-we" target="_blank">到 2025 年</a>網路攻擊者將會把營運技術（OT）環境完整武器化，對人類使用者造成關鍵性傷害。因此，企業必須投入更多防護，避免自動化攻擊帶來的破壞。本文將帶你了解保護使用者的關鍵方法。

## 什麼是自動化攻擊？

自動化攻擊（Automated Attack）是指攻擊者使用機器人等工具，以極低成本惡意執行大量重複任務（例如密碼噴灑攻擊）。例如，攻擊者可能利用惡意機器人掃描你網站的漏洞，發動 DDoS 攻擊並最終讓網站癱瘓。

### 常見的自動化攻擊類型

攻擊者在入侵使用者帳號時有很多自動化手法，以下是最常見的幾種。

#### 機器人（Bots）

惡意機器人是自動化攻擊的核心。駭客利用它們執行資料索引、攻擊流程自動化等任務。這類攻擊正快速成為主流。僅 2020 年上半年，北美就出現了 <a href="https://www.statista.com/statistics/1180124/human-initiated-automated-bot-attacks-volume-worldwide-region/" target="_blank">4.42 億次自動化機器人攻擊</a>。

#### 暴力破解（Brute Force）

傳統上，<a href="https://www.kaspersky.com/resource-center/definitions/brute-force-attack" target="_blank">暴力破解攻擊</a>是指反覆嘗試大量密碼（如字典檔）去破解單一帳號。除了密碼，攻擊者也可能用暴力破解猜測加密金鑰或挖出隱藏頁面。雖然試誤法看起來慢，但透過機器人可大幅加速。

#### 憑證填充（Credential Stuffing）

<a href="/zh-hant/post/credential-stuffing" target="_blank">憑證填充攻擊</a>利用的是使用者常重複使用密碼的習慣。攻擊者拿其他外洩事件中的帳密組合（username/password）來嘗試登入。配合機器人後可大規模自動化。你也可以參考<a href="/zh-hant/post/authentication-security-password-reset-best-practices-and-more" target="_blank">密碼重設最佳實踐</a>。

#### 密碼噴灑（Password Spraying）

這是暴力破解的另一種形式。攻擊者會用同一組常見弱密碼（例如 Password@123）嘗試大量帳號。因為每個帳號的嘗試次數較少，較容易繞過帳號鎖定機制。接下來我們會依據 <a href="https://cheatsheetseries.owasp.org/cheatsheets/Credential_Stuffing_Prevention_Cheat_Sheet.html" target="_blank">OWASP 指南</a> 說明防禦實務。

<div class="cta-v2">
	<h2 class="title cta-split-content-left">用 Authgear 領先防禦網路攻擊</h2>
  <p class="cta-v2-paragraph">為你的應用加入使用者驗證與更多安全功能</p>
  <a href="/zh-hant/schedule-demo/" target="_blank" class="w-inline-block">
  	<div class="cta-v2-ctabtn button-primary">預約示範

## 緩解自動化攻擊的最佳做法

若你要保護使用者免受自動化攻擊，可在組織層面部署以下機制。

### 多因素驗證（MFA）

<a href="/zh-hant/post/what-is-multi-factor-authentication-mfa" target="_blank">多因素驗證（MFA）</a>是防禦自動化攻擊的關鍵。它為登入增加額外防線，讓攻擊更難成功。<a href="https://techcommunity.microsoft.com/t5/Azure-Active-Directory-Identity/Your-Pa-word-doesn-t-matter/ba-p/731984" target="_blank">Microsoft 分析</a>顯示 MFA 可阻擋 99.99% 的帳號入侵。OWASP 的<a href="https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html#protect-against-automated-attacks" target="_blank">驗證安全指引</a>也建議可行時應全面導入 MFA。

### 帳號鎖定（Account Lockout）

這是最常見也很實用的防護方式。帳號鎖定機制會在登入失敗達到門檻後阻止繼續嘗試。因為鎖的是帳號而非來源 IP，即使攻擊者輪替大量 IP 也會被阻擋。實作時要考慮三個因素：

- **鎖定門檻（Lockout threshold）：** 觸發鎖定前可容許的失敗次數。
- **觀察視窗（Observation window）：** 失敗嘗試要在多長時間內累積才算。
- **鎖定時間（Lockout duration）：** 帳號被鎖多久。

同時要避免被反向利用成阻斷服務攻擊（DoS）。例如：即使帳號被鎖，仍允許使用者重設密碼。

### CAPTCHA

CAPTCHA 能降低自動化登入嘗試，但部分實作仍可被繞過。因此不要把 CAPTCHA 當唯一防線。它更像是增加攻擊成本與時間。

### 日誌與監控（Logging）

攻擊不會先通知你。你需要記錄並監控應用與網路中的所有驗證活動，尤其是密碼失敗與帳號鎖定事件，並做到即時審查。

### 無密碼登入（Passwordless Login）

雖然「帳號密碼 + MFA」很常見，但在某些情境不理想。比如第三方 App 透過手機連你系統時，不適合儲存帳密。此時採用無密碼驗證可有效縮小攻擊面並降低風險。

### 設計成密碼管理器友善

全球有<a href="https://www.infosecurity-magazine.com/news/password-reuse-60-15-billion/" target="_blank">60% 密碼被重複使用</a>，這會放大憑證填充與密碼噴灑風險。密碼管理器能協助使用者建立與安全保存高強度密碼；若你的產品流程對密碼管理器友善，也是在保護使用者。

## 結語

面對駭客可用工具愈來愈多，企業必須持續升級防禦。保護使用者免受自動化網攻，不是一次性任務，而是持續優化與提高警覺的過程。

Authgear 提供可快速整合的身分驗證與使用者管理方案，讓你無縫加入驗證與多種安全功能。像是無密碼驗證、社群登入與 2FA，都能有效降低自動化攻擊風險。<a href="/zh-hant/schedule-demo/" target="_blank">想了解 Authgear？歡迎與我們聊聊</a>。

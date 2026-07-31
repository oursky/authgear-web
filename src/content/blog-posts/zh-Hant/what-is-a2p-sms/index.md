---
title: "什麼是 A2P SMS？（以及它為何是這個價錢）"
excerpt: "A2P SMS 是應用程式向用戶發送 OTP、通知和行銷簡訊的方式。這是一個受監管的付費通道，定價方式與個人傳簡訊不同。以下說明 A2P 的意思，以及影響其成本的因素。"
coverImage: ./cover.webp
category: engineering
featured: false
metaTitle: "什麼是 A2P SMS？開發者指南"
metaDescription: "A2P SMS（application-to-person）是應用程式發送 OTP 和通知的方式。了解它與 P2P 有何不同、為何受監管，以及真正推高成本的因素。"
publishedAt: 2026-07-23T10:30:00.000Z
readTime: 7
draft: false
faq:
  - q: "什麼是 A2P SMS？"
    a: "A2P SMS（application-to-person SMS）是由應用程式或系統發送給個人的簡訊，而非兩個人之間的往來。OTP、預約提醒、送貨更新和行銷簡訊都屬於 A2P。這是企業用來大規模觸及用戶的類別，其定價和監管方式都與個人（P2P）傳簡訊不同。"
  - q: "A2P 和 P2P SMS 有什麼分別？"
    a: "P2P（person-to-person）是一個人打字傳簡訊給另一個人，按消費者方案計費。A2P（application-to-person）是自動化的：應用程式透過 SMS API 或閘道向用戶發送訊息。A2P 以商業費率按則計費，必須遵守 A2P 註冊規則，並由電信商以不同方式路由。"
  - q: "什麼是 A2P 10DLC？"
    a: "10DLC（10-digit long code，10 位數長碼）是美國用來從標準本地電話號碼發送 A2P 訊息的框架。企業向 The Campaign Registry 註冊其品牌和活動（campaign），電信商隨後便允許更高的 A2P 傳輸量。它會增加註冊費和每月費用，但在美國要可靠地發送 A2P SMS 就必須這樣做。"
  - q: "為什麼 A2P SMS 比個人傳簡訊貴？"
    a: "三個原因：電信商對 A2P 流量收取較高的商業終端費率；A2P 註冊和合規會增加固定費用；供應商還會轉嫁每則訊息的電信商附加費。訊息長度（拆成多段）和 SMS pumping（簡訊泵送詐騙）更會把實際成本推得更高。"
  - q: "發送 A2P SMS 需要註冊嗎？"
    a: "在大多數市場，是的，形式各有不同。美國要求 10DLC 品牌和活動註冊；許多其他國家則要求 sender ID 註冊或預先核准的訊息範本。發送未註冊的 A2P 流量有被過濾、封鎖或每則訊息收費更高的風險。"
---

> **tl;dr**：A2P SMS（application-to-person）是任何由應用程式發送給個人的簡訊，例如 OTP、通知或推廣訊息。這是企業用來大規模觸及用戶的通道，由於它屬於商業性質且受監管，因此定價比你電話方案上的個人傳簡訊要高。

每次應用程式傳一個登入驗證碼或送貨更新給你，那就是 A2P SMS 在運作。如果你正在 SMS API 上開發、想搞清楚帳單，或面對一個問到「campaign」和「10DLC」的註冊表單，這就是背後的概念。以下說明 A2P SMS 是什麼，以及它為何是這個價錢。

## 什麼是 A2P SMS？

A2P 代表 **application-to-person**（應用程式對個人）。它指的是由軟件系統發送給個人的簡訊，有別於一個人打字傳簡訊給朋友。

常見例子包括：

- 用於登入的一次性密碼（OTP）
- 「你的訂單已出貨」通知
- 預約或付款提醒
- 行銷推廣

它們的共通點是：沒有人逐一打字發送。是應用程式產生並透過 SMS 閘道或 API 發送，通常是發給大量收件人。

## A2P 對 P2P：有什麼分別？

A2P 的對照組是 **P2P（person-to-person）**：兩個人之間的普通傳簡訊，按消費者流動方案計費。

<div class="ag-table-wrap">
  <table class="ag-table">
    <thead>
      <tr><th>因素</th><th>P2P SMS</th><th>A2P SMS</th></tr>
    </thead>
    <tbody>
      <tr><td><strong>發送方</strong></td><td>一個人</td><td>一個應用程式</td></tr>
      <tr><td><strong>發送量</strong></td><td>低，對話式</td><td>高，通常是大量群發</td></tr>
      <tr><td><strong>定價</strong></td><td>消費者方案</td><td>按則計費，商業費率</td></tr>
      <tr><td><strong>監管</strong></td><td>極少</td><td>註冊、sender ID、同意規則</td></tr>
      <tr><td><strong>路由</strong></td><td>標準電信商</td><td>專用 A2P 路由</td></tr>
    </tbody>
  </table>
</div>

電信商在意這個區別，因為 A2P 流量屬於商業性質且量更大。他們會把它分開路由、收取更高費用，並愈來愈要求企業在發送前先註冊。

## 為什麼 A2P SMS 更貴

如果你曾經拿電話帳單和 SMS API 發票作比較，好奇為什麼「同一則簡訊」由應用程式發出會更貴，原因就在這裡。有幾項成本疊加起來：

- **商業終端費率。** 流動網絡商對終接 A2P（商業）流量收取的費用比個人訊息高，而且這些費率因國家而異，差別極大。
- **A2P 註冊和合規費用。** 在美國，10DLC 註冊帶有品牌和活動（campaign）費用。其他市場則要求 sender ID 註冊或範本預先核准，有時各有其成本。
- **電信商附加費。** 供應商往往會在基本發送費率之上再加一筆轉嫁費用，按則計費。
- **訊息段（segment）。** 超過 160 個 GSM-7 字元（Unicode 為 70 個）的訊息會拆成多個計費部分，而每一部分實際能容納的字元更少：GSM-7 為 153 個，Unicode 為 67 個，因為每一段都有幾個字元用來在收件人手機上把訊息重新拼合起來。
- **詐騙。** SMS pumping（簡訊泵送詐騙）會以機械人觸發的發送灌爆 A2P 發送量，而你要為每一則付費。詳見 [什麼是 SMS Pumping 攻擊？](/zh-hant/post/sms-pumping-attack)。

我們在 [SMS API 定價詳解](/zh-hant/post/sms-api-pricing) 中完整拆解了整個定價模型。若要估算你自己在各國和各供應商的 A2P 開支，請使用 [SMS 成本計算機](/zh-hant/tools/sms-cost-calculator)。

## A2P 註冊：10DLC 以及更多

由於 A2P 受監管，你通常不能說發就發。在**美國**，框架是 **10DLC（10-digit long code，10 位數長碼）**：你向 The Campaign Registry 註冊你的企業（品牌）和你的用途（campaign），電信商隨後便給予更高的傳訊傳輸量。註冊通常涉及一次性品牌費、每個 campaign 的費用，以及每個 campaign 一筆小額的每月經常性收費，再加上每則訊息附加的電信商附加費。電信商會按自己的時間表制訂和調整這些費用，所以你讀到的任何具體數字（包括這裡的）都應視為一個快照，而非固定價格。不變的是略過註冊的後果：發送未註冊的 A2P 流量會被過濾或封鎖。

在美國以外，規則因國家而異：許多市場要求先有已註冊的 **sender ID**（訊息來源的名稱或號碼）或預先核准的訊息範本，才允許 A2P 流量。印度是最清晰的例子，TRAI 的 DLT（Distributed Ledger Technology）框架要求企業在發送前註冊其實體、sender ID 和每一個訊息範本。這也是為什麼全球性的 SMS 部署遠比按一下開關要費工夫的原因之一。

## 有沒有更便宜的方式觸及用戶？

單就 OTP 而言，A2P SMS 是最貴的常見通道，也是最容易受詐騙影響的一個。許多團隊會透過 WhatsApp 發送驗證來削減帳單，WhatsApp 有其自成一套（通常較低）的驗證定價，並只把 SMS 留作備援。比較請見 [SMS OTP 對 WhatsApp OTP](/zh-hant/post/sms-otp-vs-whatsapp-otp)。

自行處理 A2P 註冊、按國家路由、WhatsApp 優先送遞和詐騙防護，會有很多環節要顧。像 [Authgear](https://www.authgear.com) 這類驗證平台會替你管理 OTP 送遞，讓你獲得可靠的驗證，而不必自己打理 A2P 的底層管線。

## 常見問題

### 什麼是 A2P SMS？

A2P SMS（application-to-person SMS）是由應用程式或系統發送給個人的簡訊，而非兩個人之間的往來。OTP、預約提醒、送貨更新和行銷簡訊都屬於 A2P。這是企業用來大規模觸及用戶的類別，其定價和監管方式都與個人（P2P）傳簡訊不同。

### A2P 和 P2P SMS 有什麼分別？

P2P（person-to-person）是一個人打字傳簡訊給另一個人，按消費者方案計費。A2P（application-to-person）是自動化的：應用程式透過 SMS API 或閘道向用戶發送訊息。A2P 以商業費率按則計費，必須遵守 A2P 註冊規則，並由電信商以不同方式路由。

### 什麼是 A2P 10DLC？

10DLC（10-digit long code，10 位數長碼）是美國用來從標準本地電話號碼發送 A2P 訊息的框架。企業向 The Campaign Registry 註冊其品牌和活動（campaign），電信商隨後便允許更高的 A2P 傳輸量。它會增加註冊費和每月費用，但在美國要可靠地發送 A2P SMS 就必須這樣做。

### 為什麼 A2P SMS 比個人傳簡訊貴？

三個原因：電信商對 A2P 流量收取較高的商業終端費率；A2P 註冊和合規會增加固定費用；供應商還會轉嫁每則訊息的電信商附加費。訊息長度（拆成多段）和 SMS pumping（簡訊泵送詐騙）更會把實際成本推得更高。

### 發送 A2P SMS 需要註冊嗎？

在大多數市場，是的，形式各有不同。美國要求 10DLC 品牌和活動註冊；許多其他國家則要求 sender ID 註冊或預先核准的訊息範本。發送未註冊的 A2P 流量有被過濾、封鎖或每則訊息收費更高的風險。

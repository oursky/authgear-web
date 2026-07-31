---
title: "什麼是 SMS sender ID？類型、註冊與取捨"
excerpt: "SMS sender ID（寄件者 ID）就是簡訊的「寄件人」欄位：訊息看起來是由哪個名稱或號碼發出。本文介紹各種類型、alphanumeric sender ID 的運作方式、哪些地方需要註冊，以及品牌形象與送達率之間的取捨。"
coverImage: ./cover.webp
category: engineering
featured: false
metaTitle: "什麼是 SMS sender ID？開發者指南"
metaDescription: "SMS sender ID 就是簡訊的「寄件人」欄位。了解各種類型、alphanumeric sender ID 的運作方式、哪些地方需要註冊，以及當中的取捨。"
publishedAt: 2026-07-24T11:00:00.000Z
readTime: 8
draft: false
faq:
  - q: "SMS 中的 sender ID 是什麼？"
    a: "sender ID 就是簡訊的「寄件人」欄位：在收件人手機上顯示為寄件者的名稱或號碼。它可以是電話號碼（long code 或 short code），或在支援的國家/地區，是像你公司名稱這樣的品牌名稱（也就是 alphanumeric sender ID）。"
  - q: "什麼是 alphanumeric sender ID？"
    a: "alphanumeric sender ID 是由字母與數字組成的 sender ID，最長 11 個字元，用來顯示品牌名稱而非電話號碼，例如一則來自「AUTHGEAR」的訊息。它是單向的，收件人無法回覆，而且並非所有地方都支援，包括美國和加拿大的標準 A2P 訊息。"
  - q: "我需要註冊 sender ID 嗎？"
    a: "這取決於國家/地區。有些市場讓你即時使用 sender ID（動態），而許多市場則要求在訊息送達前先向電信商預先註冊，有時還需要提供佐證文件。在需要註冊的市場發送未註冊的 sender ID，通常會導致訊息被過濾、改寫成隨機號碼，或被封鎖。"
  - q: "為什麼我的 sender ID 被換成了隨機號碼？"
    a: "當你把未註冊的 alphanumeric sender ID 發送到不支援它、或要求註冊的國家/地區時，許多供應商會備援改用數字 long code，讓訊息仍然能送達。這就是為什麼你以公司名稱標示的簡訊，有時會從一個陌生號碼寄達。"
  - q: "OTP 應該使用哪一種 sender ID 類型？"
    a: "一次性密碼（OTP）不需要回覆，因此 alphanumeric sender ID（在支援的地方）或 short code 都很適合，看起來也值得信任。在美國和加拿大，標準 A2P 無法使用 alphanumeric，因此團隊通常改用已註冊的 short code 或 10DLC long code。"
---

> **tl;dr**：SMS sender ID 就是簡訊的「寄件人」欄位：訊息看起來是由哪個名稱或號碼發出。它可以是電話號碼，或在支援的國家/地區，是一個品牌名稱，而使用每一種的規則會因國家/地區而有很大差異。

當一則簡訊送到你的手機上時，最上方的標籤（一個電話號碼，或像你銀行這樣的名稱）就是 **sender ID**。如果你正在串接 SMS API 並決定你的訊息應該從什麼身分*發出*，或想搞清楚為什麼你精心設計的品牌寄件者名稱最後顯示成一個隨機號碼，這就是你需要理解的概念。以下說明 sender ID 是什麼、你可以選擇哪些類型，以及那些讓人踩坑的註冊規則。

## 什麼是 SMS sender ID？

sender ID 是訊息發出時所使用的識別符：收件人看到的寄件者值。大致分為兩大類：

- 一個**號碼**，例如一般的電話號碼或 short code。
- 一個**名稱**，例如你的品牌，以字母拼寫出來。這就是 alphanumeric sender ID。

你實際上能用哪些，完全取決於目的地國家/地區、訊息的使用情境，以及你是否已完成註冊。這方面沒有單一的全球標準，這也是 sender ID 比初看之下更複雜的原因。

## SMS sender ID 的類型

大多數 sender ID 可分為三類。以下是它們的比較。

<div class="ag-table-wrap">
  <table class="ag-table">
    <thead>
      <tr><th>類型</th><th>看起來像</th><th>雙向？</th><th>最適合</th></tr>
    </thead>
    <tbody>
      <tr><td><strong>Long code（數字）</strong></td><td>標準的 10 位數電話號碼</td><td>是</td><td>對話、回覆、較低量</td></tr>
      <tr><td><strong>Short code</strong></td><td>4 至 6 位數的號碼</td><td>是</td><td>高流量、高吞吐量發送</td></tr>
      <tr><td><strong>Alphanumeric</strong></td><td>品牌名稱，例如「AUTHGEAR」</td><td>否</td><td>單向的品牌通知與 OTP</td></tr>
    </tbody>
  </table>
</div>

**Long code** 是一般的電話號碼。它們支援雙向對話，取得也便宜，但在美國和加拿大，普通的 long code 是設計用於個人對個人（P2P）發送簡訊的。若要用於商業（A2P）發送，你要在 10DLC 框架下註冊它們。（Toll-free 號碼是北美相關的另一個選項，有自己的一套驗證流程。）

**Short code** 就是你在銀行和快遞服務看過的 4 到 6 位數號碼。它們是為高量與高吞吐量而設計的，但相對昂貴，而且要花時間才能開通與獲得核准。

**Alphanumeric sender ID** 以名稱取代號碼。這一種值得深入看看。

## alphanumeric sender ID 如何運作

alphanumeric sender ID 讓訊息以可讀的名稱、而非數字送達，最長 **11 個字元**，使用字母、數字和空格（至少要有一個字母，所以它不會只是一個號碼）。收件人看到的不是來自 `+44 7700 900123` 的簡訊，而是來自你品牌的簡訊。

這當中的取捨是天生的：alphanumeric sender ID 是**單向**的。因為「寄件人」的值不是一個真正可路由的號碼，收件人無法回覆。他們的手機沒有地方可以送出回覆。對登入驗證碼或出貨通知來說這沒問題，但對任何需要對話的用途來說就是個問題。

它們也並非到處都能用。是否支援由各國家/地區各自決定，而且有一個值得記住的重大例外：**美國和加拿大的標準 A2P 訊息不支援 alphanumeric sender ID。**北美的電信商不允許在寄件者欄位使用任意的品牌名稱，主要是為了遏止假冒（spoofing），因此在當地你要改用以號碼為基礎的 sender ID（已註冊的 short code 或 10DLC long code）。

## sender ID 註冊：動態 vs 預先註冊

即使在允許使用 alphanumeric sender ID 的地方，要用它也不總是即時的。國家/地區大致分為兩類：

- **動態（免預先註冊）。**你可以即時設定一個 sender ID，並會原樣送達。很方便，但因為人人都可以這樣做，收件人無法完全信任這個名稱。
- **需要預先註冊。**你必須在發送前向電信商註冊 sender ID，通常要提交公司資料與佐證文件，審核期從數天到數週不等。有些市場（印度是最著名的例子）更進一步，還要求每一個訊息範本也都要事先核准。

註冊之所以如此重要，原因在於它的失敗模式。如果你把**未註冊**的 sender ID 發送到一個要求註冊的市場，訊息不會悄悄地成功送達。視電信商與供應商而定，它會被**過濾、封鎖，或悄悄改寫成一個隨機的數字 long code**，好讓它仍然能送達。最後那種情況，就是為什麼你以公司名稱標示的簡訊有時會從一個陌生號碼寄達，也是為什麼使用者會不信任它。註冊規則也會隨時間改變，因此任何特定國家/地區的細節（包括本文提到的）都應視為需要向你的供應商查證的快照，而非永久不變的事實。

## 取捨：品牌、信任與送達率

挑選 sender ID 是三件事之間的平衡。

- **品牌與信任。**有名稱的 sender ID（`YourBank`）看起來比隨機號碼更正當，能提升開啟率。而正是這份信任，讓電信商用註冊來把關這些品牌化的 sender ID。
- **雙向能力。**如果你需要回覆（客戶支援、以簡訊確認預約），你需要的是一個號碼，而非 alphanumeric ID。
- **送達率與成本。**一個已註冊、合適的 sender ID 會可靠地送達。錯誤或未註冊的則會被過濾，而不一致的 sender ID 可能觸發垃圾訊息偵測機制。想深入了解怎樣讓訊息真正送達，請看 [SMS 送達率](/zh-hant/post/sms-deliverability)。

具體到 OTP，這個算計很簡單：你不需要回覆，因此品牌化的 alphanumeric sender ID（在支援的地方）或 short code 都可行，看起來也值得信任，並在像美國這種無法使用 alphanumeric 的市場搭配數字備援。

## 這對你的帳單和設定意味著什麼

sender ID 直接影響成本與合規。Short code 有開通與月費；在規範嚴格的市場，註冊會增加文書作業與前置時間；而由於 sender ID 的支援是逐國家/地區而定的，全球推行就意味著要針對不同目的地張羅不同的設定。這是驅動 SMS 定價這更大圖景的一部分：成本模型可參考 [SMS API 定價解析](/zh-hant/post/sms-api-pricing) 與 [什麼是 A2P SMS？](/zh-hant/post/what-is-a2p-sms)，或用 [SMS 成本計算機](/zh-hant/tools/sms-cost-calculator) 估算你自己跨國家/地區的花費。

自己管理逐國家/地區的 sender ID、註冊與數字備援，為了往往只是「發一組登入驗證碼給使用者」這件事，卻要處理一堆環節。像 [Authgear](https://www.authgear.com) 這樣的身分驗證平台會處理 OTP 遞送，包括 sender ID 的設定與路由，讓你在不必自己維護 SMS 底層管線的情況下，就能獲得值得信任、可送達的驗證。

## 常見問題

### SMS 中的 sender ID 是什麼？

sender ID 就是簡訊的「寄件人」欄位：在收件人手機上顯示為寄件者的名稱或號碼。它可以是電話號碼（long code 或 short code），或在支援的國家/地區，是像你公司名稱這樣的品牌名稱（也就是 alphanumeric sender ID）。

### 什麼是 alphanumeric sender ID？

alphanumeric sender ID 是由字母與數字組成的 sender ID，最長 11 個字元，用來顯示品牌名稱而非電話號碼，例如一則來自「AUTHGEAR」的訊息。它是單向的，收件人無法回覆，而且並非所有地方都支援，包括美國和加拿大的標準 A2P 訊息。

### 我需要註冊 sender ID 嗎？

這取決於國家/地區。有些市場讓你即時使用 sender ID（動態），而許多市場則要求在訊息送達前先向電信商預先註冊，有時還需要提供佐證文件。在需要註冊的市場發送未註冊的 sender ID，通常會導致訊息被過濾、改寫成隨機號碼，或被封鎖。

### 為什麼我的 sender ID 被換成了隨機號碼？

當你把未註冊的 alphanumeric sender ID 發送到不支援它、或要求註冊的國家/地區時，許多供應商會備援改用數字 long code，讓訊息仍然能送達。這就是為什麼你以公司名稱標示的簡訊，有時會從一個陌生號碼寄達。

### OTP 應該使用哪一種 sender ID 類型？

一次性密碼（OTP）不需要回覆，因此 alphanumeric sender ID（在支援的地方）或 short code 都很適合，看起來也值得信任。在美國和加拿大，標準 A2P 無法使用 alphanumeric，因此團隊通常改用已註冊的 short code 或 10DLC long code。

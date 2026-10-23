---
title: "2026 年最佳 Twilio 替代方案：SMS 與 OTP 轉換指南"
excerpt: "團隊為什麼離開 Twilio、2026 年 SMS 與 OTP 的最佳 Twilio 替代方案（Telnyx、Plivo、Vonage、Sinch、Bird、AWS、Authgear），以及一份轉換時不會讓登入出問題的遷移檢查清單。"
coverImage: ./cover.webp
category: industry
featured: false
metaTitle: "Twilio 替代方案（2026）：SMS 與 OTP 比較與轉換"
metaDescription: "2026 年 SMS 與 OTP 的最佳 Twilio 替代方案、什麼時候值得轉換，以及不讓登入流程出問題的逐步遷移檢查清單。"
publishedAt: 2026-09-03
updatedAt: 2026-09-03
readTime: 11
draft: false
faq:
  - q: "Twilio 有哪些最好的替代方案？"
    a: "如果要找同類型的 SMS API：Telnyx、Plivo、Vonage、Sinch、Bird、Infobip 與 AWS End User Messaging。如果專門針對 OTP：Plivo Verify（不收每次驗證費）、Vonage Verify，或是像 Authgear 這樣的身分驗證平台，透過 WhatsApp 傳送 OTP 並以 SMS 備援。若使用者在印度與東南亞，MSG91 這類區域型供應商通常比任何全球供應商都便宜。"
  - q: "Twilio 跟替代方案比起來很貴嗎？"
    a: "Twilio 的美國 SMS 費率（每個區段 $0.0083，另加電信商附加費）屬於中段價位。讓 Twilio 在規模放大後變貴的，是疊在上面的那些費用：Twilio Verify 每次驗證 $0.05 的費用、按每月支出 4% 到 8% 計價且最低 $250 到 $5,000 的支援方案，以及在印尼或印度等市場可能是區域型供應商好幾倍的各國費率。"
  - q: "在美國，最便宜的 Twilio SMS 替代方案是哪一家？"
    a: "在有公開費率的供應商中，Telnyx 的美國 10DLC 訊息標價為每則 $0.004 另加電信商附加費，Plivo 則是 $0.0077。兩者都低於 Twilio 的 $0.0083。每家供應商都會加收每則約 $0.0035 到 $0.005 的電信商附加費，所以請用你自己的流量比較含所有費用的總價。"
  - q: "我可以在不更換電話號碼的情況下離開 Twilio 嗎？"
    a: "通常可以。美國的 long code 與免付費號碼可以攜碼到其他供應商，不過攜碼需要幾天到幾週，在攜碼完成前應該繼續透過 Twilio 發送。你大概得在新供應商那邊重新註冊 10DLC campaign，並確認品牌註冊能否沿用。美國以外的英數字 sender ID 則要在每家供應商分別重新註冊。"
  - q: "如果我把 SMS 移出 Twilio，需要一併換掉 Twilio Verify 嗎？"
    a: "不一定。你可以把通知與行銷流量移到別處，同時讓 Twilio Verify 繼續運作。但如果你想砍掉的正是每次驗證 $0.05 的那一項費用，就需要換一個驗證層：一個不收這筆費用的 verify API（Plivo），或是像 Authgear 這樣的身分驗證平台，把 OTP 傳送、備援與 SMS pumping 防護都納入登入流程之中。"
---

> **tl;dr**：最適合的 Twilio 替代方案，取決於你實際上在為什麼付錢。如果是純 SMS，Telnyx（美國每則 $0.004）與 Plivo（$0.0077）都比 Twilio 的 $0.0083 便宜，而在亞洲，區域型供應商則是完勝。如果是 Twilio Verify 每次驗證 $0.05 的費用，要換的是驗證層，而不只是底下的傳送管道。如果是整張帳單，就把 OTP 流量移到 WhatsApp，並用通行密鑰減少要發送的驗證碼。不管選哪一條路，都要在抽象層後面進行遷移、切換前先雙軌並行，並且保留你的詐騙防護。

要從應用程式發送 SMS，Twilio 是預設的選擇：文件寫得很好、生態系龐大，一個帳號就涵蓋 SMS、語音、WhatsApp、電子郵件與驗證。大多數搜尋 Twilio 替代方案的團隊，對產品本身並沒有不滿。讓他們不滿的，是一張帳單、一個合規審核佇列，或是某個特定國家的送達率。

這份指南就是為那個時刻而寫。內容涵蓋團隊為什麼轉換、2026 年值得列入候選的替代方案，以及一份遷移檢查清單，讓你把 SMS 與 OTP 流量移出 Twilio，又不會讓使用者的登入出問題。

## 團隊為什麼要找 Twilio 替代方案

有五個理由一再出現。

### 1. 帳單成長得比流量還快

Twilio 公布的美國 SMS 價格是每個訊息區段 $0.0083，發送與接收都一樣，另加電信商附加費。單看這個數字並不特別。成本問題出在疊在上面的所有東西：

- **Twilio Verify** 會在通道費用之外，每次成功驗證再加收 $0.05。以一則美國 SMS OTP 來說，每次驗證大約是 $0.058，其中 $0.05 的平台費用約占 86%。每月 100,000 次驗證，光是這筆費用就是 $5,000。我們在 [Twilio Verify 定價與替代方案](/post/twilio-verify-pricing-and-alternatives) 中有詳細拆解。
- **支援方案** 按支出比例計價：Production 方案是 $250 或每月帳單的 4%（取較高者），Business 是 $1,500 或 6%，Personalized 是 $5,000 或 8%。免費的 Developer 方案不保證回應時間。如果你需要在幾小時內找到真人，你的實際 SMS 費率就會再加上方案的百分比。
- **電信商附加費** 在美國的每家供應商上，每則都會多出大約 $0.0035 到 $0.005。Twilio 會把這筆費用轉嫁給你，所以一則 $0.0083 的訊息，實際送達的成本是 $0.012 到 $0.013。

### 2. 各國定價跟你的使用者分布對不上

SMS 依收件人所在國家計費，而全球供應商與區域型供應商之間的差距可能很大。Twilio 發送到印尼的基礎費率大約是每則 $0.36。透過 MSG91 發送一則印度國內的 OTP SMS 是 ₹0.18 到 ₹0.25，換算成美元不到一美分。如果你有很大比例的使用者在印度、東南亞或拉丁美洲，全球供應商的費率表往往就是你帳單上最大的問題。想了解這些費率是怎麼組成的，請參閱 [SMS API 定價全解析](/zh-hant/post/sms-api-pricing)。

### 3. 美國 10DLC 合規流程很慢，而且有自己的費用

要從標準美國號碼發送 A2P（應用程式對個人）簡訊，就必須依照電信商的 10DLC 框架註冊你的品牌與每一個訊息 campaign。每家供應商都得做這件事，但體驗各不相同：註冊費、每月固定的 campaign 費用、每則訊息的電信商轉嫁費用，以及可能卡住產品上線的審核佇列。經歷過一次痛苦 10DLC 審核的團隊，常常會去找審核更快或指引更清楚的供應商，而不是每則費率更低的。我們的 [A2P SMS 指南](/zh-hant/post/what-is-a2p-sms) 有說明這個框架。

### 4. 詐騙風險

[SMS pumping](/zh-hant/post/sms-pumping-attack)是一種攻擊：機器人觸發成千上萬次 OTP 發送到付費號碼，詐騙者再從終端費中分一杯羹。Twilio 的 Verify 產品內建 Fraud Guard，但原始的 Messaging API 並不會保護你，而一次 pumping 事件在一個週末造成的損失，可能超過一整年的費率差距。不論你是否轉換供應商，這一項都應該列在檢查清單上。

### 5. 一個登入流程用了太多家供應商

許多團隊用一個身分提供者處理登入、用 Twilio 傳送 OTP、用第二個閘道處理便宜的區域，再用自己寫的限流機制把它們串起來。把 OTP 驗證整合進身分驗證層，往往才是「Twilio 替代方案」搜尋背後真正的動機，即使一開始只是在比價。

## 轉換之前要先決定的事

適合的替代方案取決於四個問題的答案。

**你實際用的是哪些 Twilio 產品？** Programmable Messaging（原始 SMS）、Verify（託管式 OTP）、Lookup（號碼情報）、Voice、透過 Twilio 的 WhatsApp，或是好幾項。大多數「離開 Twilio」的專案，在盤點完之後都會變成「把 OTP 移出 Verify」或「把印度移出 Twilio」。

**你的訊息都發到哪裡？** 拉一份過去 90 天依目的地國家統計的發送報表。美國最便宜的供應商，很少同時是印尼最便宜的，而前三大國家通常就決定了結果。可以用 [SMS 成本計算器](/zh-hant/tools/sms-cost-calculator) 來模擬。

**你要的是同樣的架構，還是不同的架構？** 換一家同類型的 SMS API 只能省下幾個百分點。改變通道（用 WhatsApp 取代 SMS）或減少訊息數量（讓回訪使用者使用通行密鑰）才能省下大部分的帳單。比較費率表之前，先想清楚你要的是哪一種改變。

**遷移之後，誰負責詐騙防護？** 如果你今天的答案是「Twilio Verify」，要確保明天的答案不會變成「沒有人」。

## 2026 年最佳 Twilio 替代方案

<div class="ag-table-wrap">
  <table class="ag-table">
    <thead>
      <tr><th>替代方案</th><th>最適合</th><th>美國 SMS（公開費率）</th><th>OTP／驗證</th><th>需要注意</th></tr>
    </thead>
    <tbody>
      <tr><td><strong>Telnyx</strong></td><td>公開的美國費率最低，電信等級網路</td><td>$0.004 + 電信商附加費（10DLC）</td><td>在訊息 API 上自行建構</td><td>沒有託管式驗證產品；生態系較小</td></tr>
      <tr><td><strong>Plivo</strong></td><td>大量發送時划算，對開發者友善</td><td>$0.0077</td><td>Plivo Verify，不收每次驗證費</td><td>通道比 Twilio 少（沒有電子郵件、TOTP）</td></tr>
      <tr><td><strong>Vonage</strong></td><td>最接近同類替換，備援能力強</td><td>依國家計價</td><td>Vonage Verify，每次成功 $0.06084 + 通道費</td><td>帳面上 Verify 比 Twilio 貴</td></tr>
      <tr><td><strong>Sinch</strong></td><td>Tier-1 路由，flash call 驗證</td><td>$0.0078 起 + 電信商附加費</td><td>Sinch Verification，按嘗試次數計費</td><td>驗證費率只在後台查得到</td></tr>
      <tr><td><strong>Bird</strong>（前身為 MessageBird）</td><td>歐洲，價格有競爭力</td><td>依報價</td><td>Bird Verify</td><td>公開的定價資訊很少</td></tr>
      <tr><td><strong>Infobip</strong></td><td>企業級，RCS 與 Viber</td><td>依報價</td><td>有，依報價</td><td>未達企業級用量就不透明</td></tr>
      <tr><td><strong>AWS End User Messaging</strong></td><td>以 AWS 為主的團隊</td><td>$0.02（含所有費用）</td><td>自行建構</td><td>OTP 邏輯與詐騙防禦都要自己負責</td></tr>
      <tr><td><strong>MSG91</strong></td><td>印度與新興市場</td><td>$0.0065（美國）；₹0.18 到 ₹0.25（印度）</td><td>OTP API 與託管小工具</td><td>以區域為主；在印度需要 DLT 註冊</td></tr>
      <tr><td><strong>WhatsApp Business API</strong>（直接串接）</td><td>大量使用 WhatsApp 的使用者族群</td><td>每則驗證訊息 $0.0034（北美）</td><td>驗證範本（authentication templates）</td><td>需要 WhatsApp Business Account 與 SMS 備援</td></tr>
      <tr><td><strong>Authgear</strong></td><td>換掉驗證層，而不只是傳送管道</td><td>方案費用之外按用量計費</td><td>WhatsApp 優先的 OTP 搭配 SMS 備援、通行密鑰、pumping 防護</td><td>是身分驗證平台，不是獨立的 SMS API</td></tr>
    </tbody>
  </table>
</div>

*以上為各供應商官方定價頁面公布的牌價，查核時間為 2026 年 9 月（Twilio、Telnyx）與 2026 年 8 月（其他）。除非另有註明，美國費率不含電信商附加費。每家供應商都會提供量大折扣。*

### 同類型的 SMS API

**Telnyx** 公布的美國 10DLC 費率是這份清單中最低的，每個訊息區段 $0.004 另加電信商附加費，並在帳單上逐項列出這些附加費；它經營自己的網路，而不是轉售路由。用量很大時會自動開始套用量大折扣。它沒有提供託管式驗證產品，所以 OTP 的產生、過期、重試與詐騙防護都要由你自己處理。

**Plivo** 適合想同時擁有便宜傳送管道與託管式 OTP 產品的團隊，是最划算的選擇。美國 SMS 是 $0.0077，而 Plivo Verify 不收每次驗證費，所以一則美國 SMS OTP 的成本就只有訊息費用。取捨是通道選擇比 Twilio 少。

**Vonage** 是這群供應商中最像 Twilio 的，其 Verify 產品具備強大的多通道備援。它公布的 Verify Conversion 價格是每次成功驗證 €0.052（約 $0.061）另加通道費用，所以在 OTP 價格上贏不了 Twilio。選它是為了覆蓋範圍與備援邏輯，而不是為了省錢。

**Sinch** 提供 tier-1 電信商路由與 flash call 驗證：一通被掛斷的來電，來電號碼的最後幾位數就是驗證碼，Android 應用程式不需要使用者接聽就能自動讀取。公布的美國 SMS 費率從 $0.0078 起，另加電信商附加費。驗證按嘗試次數計費，費率只在後台的費率表中看得到。

**Bird** 與 **Infobip** 在企業級用量下都值得信賴，Bird 在歐洲表現強勁，Infobip 則提供其他家沒有的通道（Viber、RCS）。兩者都沒有公布有參考價值的定價，所以如果你的用量足以支撐一場業務洽談，再把它們列入候選。

**AWS End User Messaging** 是美國 SMS 含所有費用 $0.02 的傳送管道，適合已經深度使用 AWS 的團隊。它不是驗證服務，OTP 邏輯與 pumping 防禦要你自己建構。

想看這些閘道更完整的並排比較，請參閱 [最佳 SMS API 供應商比較](/zh-hant/post/best-sms-api-providers)。

### 區域型專業供應商

如果你的使用者集中在某個區域，國內供應商通常會以很大的差距勝過所有全球供應商。**MSG91** 是最明顯的例子：在印度，每則 OTP SMS 是 ₹0.18 到 ₹0.25，而 Firebase 對同一則訊息收 $0.07。同樣的邏輯也適用於巴西、印尼與菲律賓的在地供應商。行得通的做法是依目的地路由：最大的國家用區域型供應商，其餘長尾用全球供應商。

### 換通道，而不是換供應商

就 OTP 而言，能省下最多錢的方法不是找更便宜的 SMS 供應商，而是不發 SMS。依 Meta 公布的費率，WhatsApp 驗證訊息在北美是 $0.0034、在印度是 $0.0014，只在送達時計費，而且不會受到 SMS pumping 影響。上面大多數供應商都能發送這類訊息，你也可以直接串接 WhatsApp Business API。標準做法是 WhatsApp 優先，對沒有 WhatsApp 的使用者以 SMS 備援。我們的 [WhatsApp API 定價](/post/whatsapp-api-pricing) 指南有各國費率，[SMS OTP 與 WhatsApp OTP 比較](/zh-hant/post/sms-otp-vs-whatsapp-otp) 則涵蓋了使用者體驗上的取捨。在行動裝置上，[靜默網路驗證](/zh-hant/post/silent-network-authentication) 可以完全省去訊息。

### 換掉驗證層

如果你來這裡是因為 Twilio Verify 的每次驗證費，那麼換掉它底下的 SMS 管道並不會改變任何事。你需要的是不同的驗證層。**Plivo Verify** 是直接替換、又沒有這筆費用的選擇。**Authgear** 走的是另一條路：OTP 是登入流程的一部分，而不是另一支 API；採 WhatsApp 優先並自動以 SMS 備援，搭配通行密鑰與記住裝置功能，讓回訪使用者完全不必收驗證碼，並內建 SMS pumping 防護。沒有另外的每次驗證費需要計算；訊息費用是在方案定價之外按用量計費。用這種方式換掉整個身分驗證架構，通常比同時跑一個身分提供者加一支 verify API 更便宜；如果你只想要一個驗證端點，獨立的 API 會比較簡單。我們在 [最佳 OTP 服務供應商](/zh-hant/post/best-otp-service-providers) 中比較了十個最常被列入候選的選項。

## 如何在不讓登入出問題的情況下離開 Twilio

OTP 是使用者絕對不能錯過的那一則訊息。把這次遷移當成資料庫遷移來處理：盤點、抽象化、雙軌並行、切換、保留回退路徑。

### 步驟 1：盤點你實際使用的東西

匯出 90 天的 Twilio 用量，列出每一項產品、號碼與整合點：

- 依目的地國家與用途（OTP、通知、行銷）統計的 Messaging API 發送量
- Verify 服務、它們使用的通道，以及上面設定的 速率限制
- 電話號碼：各國的 long code、免付費號碼、short code 與英數字 sender ID
- 10DLC 品牌與 campaign 註冊，以及免付費號碼驗證
- 狀態回呼 webhook，以及你的程式碼如何處理每一種送達狀態
- 新供應商也必須涵蓋的 Lookup、Voice 或 WhatsApp 用量

大多數團隊會發現，一項產品加上兩個國家就占了大部分的支出。這就是你的遷移範圍，其他的可以先留在 Twilio。

### 步驟 2：盡早處理號碼與發送者身分

號碼是最耗時的一環。美國的 long code 與免付費號碼通常可以攜碼到新供應商，但攜碼需要幾天到幾週，所以要最先開始，並在完成前繼續透過 Twilio 發送。你大概得透過新供應商重新註冊 10DLC campaign，並確認現有的品牌註冊能否沿用。在美國以外，[英數字 sender ID](/zh-hant/post/sms-sender-id) 要按供應商、按國家分別註冊，有些國家需要好幾週。如果你用 short code 發送，在決定之前先確認新供應商的 short code 租用條款。

### 步驟 3：把供應商放在介面後面

如果你的程式碼在二十個地方直接呼叫 Twilio 的 SDK，遷移就是二十處修改，回退又是另外二十處。先在前面加一層薄薄的介面。以下是一個完整的 TypeScript 範例，包含兩家供應商，以及一個在兩者之間自動切換備援的 router：

```typescript
// sms/provider.ts
export interface SmsProvider {
  readonly name: string;
  send(input: { to: string; from: string; body: string }): Promise<{ id: string }>;
}

// sms/twilio.ts
export class TwilioProvider implements SmsProvider {
  readonly name = "twilio";
  constructor(private accountSid: string, private authToken: string) {}

  async send({ to, from, body }: { to: string; from: string; body: string }) {
    const url = `https://api.twilio.com/2010-04-01/Accounts/${this.accountSid}/Messages.json`;
    const auth = Buffer.from(`${this.accountSid}:${this.authToken}`).toString("base64");
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ To: to, From: from, Body: body }),
    });
    if (!res.ok) throw new Error(`twilio ${res.status}: ${await res.text()}`);
    const data = (await res.json()) as { sid: string };
    return { id: data.sid };
  }
}

// sms/telnyx.ts
export class TelnyxProvider implements SmsProvider {
  readonly name = "telnyx";
  constructor(private apiKey: string) {}

  async send({ to, from, body }: { to: string; from: string; body: string }) {
    const res = await fetch("https://api.telnyx.com/v2/messages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ to, from, text: body }),
    });
    if (!res.ok) throw new Error(`telnyx ${res.status}: ${await res.text()}`);
    const data = (await res.json()) as { data: { id: string } };
    return { id: data.data.id };
  }
}

// sms/router.ts
export class SmsRouter implements SmsProvider {
  readonly name = "router";
  constructor(
    private primary: SmsProvider,
    private fallback: SmsProvider,
    private onEvent: (e: { provider: string; ok: boolean; to: string; error?: string }) => void,
  ) {}

  async send(input: { to: string; from: string; body: string }) {
    try {
      const result = await this.primary.send(input);
      this.onEvent({ provider: this.primary.name, ok: true, to: input.to });
      return result;
    } catch (err) {
      this.onEvent({ provider: this.primary.name, ok: false, to: input.to, error: String(err) });
      const result = await this.fallback.send(input);
      this.onEvent({ provider: this.fallback.name, ok: true, to: input.to });
      return result;
    }
  }
}

// usage
const sms = new SmsRouter(
  new TelnyxProvider(process.env.TELNYX_API_KEY!),
  new TwilioProvider(process.env.TWILIO_ACCOUNT_SID!, process.env.TWILIO_AUTH_TOKEN!),
  (e) => console.log(JSON.stringify(e)),
);

await sms.send({ to: "+14155550123", from: "+14155550100", body: "Your code is 482913" });
```

號碼攜碼或更換之後，每家供應商的 `from` 號碼都會不同，所以在正式的程式碼中，要針對每家供應商分別決定，而不是把同一個值一路傳下去。`onEvent` hook 是你送出指標的地方，這樣步驟 4 才有資料可用。

### 步驟 4：雙軌並行，並按國家衡量

把一小部分流量（5% 到 10%）導到新供應商，舊供應商作為備援。依目的地國家比較送達率、送達時間與 OTP 完成率（輸入的驗證碼數除以發送的驗證碼數）。一條比較便宜、但晚 40 秒才送達的路由，會反映在完成率下降上，而不是送達報告裡。我們的 [SMS 送達率指南](/zh-hant/post/sms-deliverability) 說明了要注意哪些地方。至少跑一週，這樣你才會看到一個週末和一個週一早上。

### 步驟 5：對應 webhook 與狀態碼

每家供應商回報送達狀態的方式都不一樣。Twilio 的 `queued`、`sent`、`delivered`、`undelivered` 與 `failed`，並不會一對一對應到其他供應商的狀態，而「電信商拒絕」與「號碼無法接通」的錯誤碼也各不相同。把對應關係寫下來，在 webhook handler 中把它正規化，並確保你的重試邏輯是根據正規化後的狀態，而不是供應商的原始字串。

### 步驟 6：把詐騙防護一起帶走

如果原本是 Twilio Verify 在幫你擋 pumping，新架構在接手正式流量之前就需要同等的防護：依電話號碼與 IP 的速率限制、對你從未正當服務過的號碼區段進行封鎖或增加摩擦、依國家與電信商監控轉換率並發出警示，以及在供應商端設定每日支出硬上限。[OTP Bot 如何運作](/zh-hant/post/otp-bot-explained) 很適合負責撰寫這些規則的團隊一讀。

### 步驟 7：切換，然後保留退路

在 router 中對調主要與備援供應商。讓 Twilio 帳戶保持儲值、號碼保持啟用至少 30 天，這樣回退只需要改設定，而不用重新註冊。等你有把握之後，再釋出不用的號碼、取消支援方案，並關閉不再需要的 campaign，免得繼續為它們付月費。

## 什麼時候留在 Twilio 才是對的

一份公允的指南應該把這點講清楚。如果你的用量低到整張帳單不值得花一個工程師月去處理、如果你依賴它的廣度（在一個帳號裡同時用 Voice、Lookup、WhatsApp、Verify 與 SMS）、如果你已經談好量大費率，或是如果你的團隊對其文件與 SDK 的熟悉度，比每則訊息省下的零點幾美分更有價值，那就留在 Twilio。轉換指南的目的，是讓你審慎地做決定，而不是替你做決定。

如果結論是要轉換，而 OTP 正是你想改變的部分，Authgear 會把它作為登入的一部分來提供：WhatsApp 優先並以 SMS 備援、讓回訪使用者跳過驗證碼的通行密鑰，以及內建的 pumping 防護。你可以用 [SMS 成本節省計算器](/zh-hant/solutions/reduce-sms-otp-cost) 估算差異，或參閱 [WhatsApp OTP](/zh-hant/features/whatsapp-otp)。

## 常見問題

### Twilio 有哪些最好的替代方案？

如果要找同類型的 SMS API：Telnyx、Plivo、Vonage、Sinch、Bird、Infobip 與 AWS End User Messaging。如果專門針對 OTP：Plivo Verify（不收每次驗證費）、Vonage Verify，或是像 Authgear 這樣的身分驗證平台，透過 WhatsApp 傳送 OTP 並以 SMS 備援。若使用者在印度與東南亞，MSG91 這類區域型供應商通常比任何全球供應商都便宜。

### Twilio 跟替代方案比起來很貴嗎？

Twilio 的美國 SMS 費率（每個區段 $0.0083，另加電信商附加費）屬於中段價位。讓 Twilio 在規模放大後變貴的，是疊在上面的那些費用：Twilio Verify 每次驗證 $0.05 的費用、按每月支出 4% 到 8% 計價且最低 $250 到 $5,000 的支援方案，以及在印尼或印度等市場可能是區域型供應商好幾倍的各國費率。

### 在美國，最便宜的 Twilio SMS 替代方案是哪一家？

在有公開費率的供應商中，Telnyx 的美國 10DLC 訊息標價為每則 $0.004 另加電信商附加費，Plivo 則是 $0.0077。兩者都低於 Twilio 的 $0.0083。每家供應商都會加收每則約 $0.0035 到 $0.005 的電信商附加費，所以請用你自己的流量比較含所有費用的總價。

### 我可以在不更換電話號碼的情況下離開 Twilio 嗎？

通常可以。美國的 long code 與免付費號碼可以攜碼到其他供應商，不過攜碼需要幾天到幾週，在攜碼完成前應該繼續透過 Twilio 發送。你大概得在新供應商那邊重新註冊 10DLC campaign，並確認品牌註冊能否沿用。美國以外的英數字 sender ID 則要在每家供應商分別重新註冊。

### 如果我把 SMS 移出 Twilio，需要一併換掉 Twilio Verify 嗎？

不一定。你可以把通知與行銷流量移到別處，同時讓 Twilio Verify 繼續運作。但如果你想砍掉的正是每次驗證 $0.05 的那一項費用，就需要換一個驗證層：一個不收這筆費用的 verify API（Plivo），或是像 Authgear 這樣的身分驗證平台，把 OTP 傳送、備援與 SMS pumping 防護都納入登入流程之中。

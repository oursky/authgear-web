---
title: "RCS vs SMS：主要差異、成本，以及 OTP 該用哪一種"
excerpt: "RCS 是 SMS 功能更豐富的後繼者：更多元的訊息、已讀回條、加密對話。但對於發送 OTP 來說，成本與觸及率仍然最為關鍵。以下是兩者的比較，以及 WhatsApp 適合切入的位置。"
coverImage: ./cover.webp
category: engineering
featured: false
metaTitle: "RCS vs SMS：差異、成本，以及各自的適用時機"
metaDescription: "RCS 與 SMS 完整比較：功能、安全性、觸及率與實際成本。並說明 OTP 與驗證該用哪個管道，以及為何 WhatsApp 往往更便宜。"
publishedAt: 2026-07-22T10:30:00.000Z
readTime: 8
draft: false
faq:
  - q: "RCS 與 SMS 有什麼分別？"
    a: "SMS 是行之有年的電信商文字訊息標準：純文字、160 個字元、在每一部手機上都能用。RCS（Rich Communication Services）是它的現代後繼者：豐富媒體、已讀回條、輸入中提示、更長的訊息、經過驗證的商業寄件者，以及在支援的應用程式中的一對一加密對話。RCS 需要數據連線，以及相容的裝置與電信商；當這些條件不具備時，就會備援回 SMS。"
  - q: "RCS 會取代 SMS 嗎？"
    a: "在點對點與豐富的商業訊息上正逐步取代，尤其是現在 Android 與 iOS 都已支援。但 SMS 不會消失，因為它是能觸及每一部手機的通用備援。至於自動化的一次性密碼，SMS 與 WhatsApp 在觸及率與成本上仍然佔主導地位。"
  - q: "RCS 免費嗎？"
    a: "對消費者而言，RCS 訊息走數據（Wi-Fi 或行動數據），而不是你的 SMS 方案，因此不會像 SMS 那樣按則收費。對於發送 A2P 訊息的企業，RCS Business Messaging 是付費管道，由電信商與匯集商按則或按對話計費，費率因市場而有很大差異。"
  - q: "RCS 比 SMS 更安全嗎？"
    a: "這要看你在比較什麼。SMS 未加密，容易被攔截與遭受 SIM 卡調換攻擊。RCS 在 Google Messages 為一對一對話加入了端對端加密，而 iPhone 與 Android 之間的跨平台加密要到 2026 年才開始推出。但那層加密並不涵蓋 RCS Business Messaging，也就是 OTP 驗證碼實際傳遞的管道。專就驗證碼而言，RCS 本質上並不比 SMS 更安全：兩者在商業端都沒有端對端加密，而且在無法使用 RCS 時都會備援回純 SMS。"
  - q: "可以透過 RCS 發送 OTP 嗎？"
    a: "技術上可以，在有提供的地方透過 RCS Business Messaging 進行。實務上大多數驗證流量仍走 SMS 或 WhatsApp，因為 RCS 的 A2P 涵蓋度在各國並不一致，而且你無論如何都需要為非 RCS 使用者準備 SMS 備援。這層備援意味著改用 RCS 也很少能真正省下 SMS 成本。"
  - q: "OTP 用 WhatsApp 會比 RCS 或 SMS 便宜嗎？"
    a: "在大多數 SMS 成本偏高的市場，WhatsApp OTP 都明顯比 SMS 便宜，每則往往少 40–90%，而且不會暴露在 SMS pumping（簡訊泵送詐騙）之下。相較於 RCS，WhatsApp 目前的 A2P 供應更廣、更可預測。你仍然可以保留 SMS 作為沒有 WhatsApp 使用者的備援。"
---

> **tl;dr**：SMS 是能觸及每一部手機的通用純文字標準。RCS（Rich Communication Services）是它的現代後繼者，具備豐富媒體、已讀回條與加密，但它需要相容的裝置、電信商與數據連線，而在這些條件缺失時會備援回 SMS。對於發送一次性密碼，觸及率與成本仍是決勝關鍵，而這往往指向 SMS 或 WhatsApp，而非 RCS。

如果你發現自己的 Android 簡訊多了輸入中提示、已讀回條與高解析度圖片，你就見過 RCS 的實際運作。這是自 2000 年代初 MMS 出現以來，電信商文字訊息的第一次真正更新，而現在 Android 與 iOS 都已支援它（Apple 早在 2024 年底的 iOS 18 就加入了 RCS），對於任何要大規模發送訊息的人而言，「RCS vs SMS」都是一個實際的決定。本指南從功能、安全性、觸及率與成本比較兩者，再回答對開發者最重要的問題：你該用哪個管道來遞送 OTP 與驗證碼？

## 什麼是 SMS？

SMS（Short Message Service）是最原始的文字訊息標準，內建於行動網路本身。它是純文字、每個區段上限 160 個字元，而且在幾乎每一部手機上都能運作，不需要應用程式或數據連線。這種通用性既是它的超能力，也是它的侷限：SMS 觸及所有人，但除了文字以外什麼都做不到，而且未加密。

## 什麼是 RCS？

RCS（Rich Communication Services）是一項 GSMA 標準，設計用來以現代化的訊息體驗取代 SMS 與 MMS。Google Messages 是 Android 上預設的 RCS 應用程式，而 Google 的 Jibe 平台現在為美國三大電信商處理 RCS 遞送，包括 AT&T 與 Verizon，兩者都已從自家後端遷移至此。Apple 在 iOS 18 加入了 RCS 支援，透過收件者電信商所使用的後端連接。如果說 SMS 是一封電報，那 RCS 就是內建於你預設訊息應用程式中的一款聊天工具。

RCS 增加了：

- **豐富媒體**：高解析度圖片、影片與輪播
- **已讀回條與輸入中提示**
- **更長的訊息**與更好的群組聊天
- **經過驗證的商業寄件者**：透過 RCS Business Messaging（RBM）提供帶品牌、帶標誌的檔案
- **加密**，不過你能得到多少取決於對話的兩端：Google Messages 已為一對一對話支援端對端加密一段時間，而 iPhone 與 Android 之間的跨平台加密要到 2026 年才開始推出，且是逐步進行，僅在雙方裝置與電信商都支援的情況下才有

但有個前提：RCS 走數據連線，並需要相容的裝置與電信商。當其中任一項缺失時，就會備援回 SMS。特別是在 iPhone 上，電信商仍必須把 RCS 開啟，因此涵蓋度會因國家與網路而異。

## RCS vs SMS：主要差異

<div class="ag-table-wrap">
  <table class="ag-table">
    <thead>
      <tr><th>面向</th><th>SMS</th><th>RCS</th></tr>
    </thead>
    <tbody>
      <tr><td><strong>傳輸方式</strong></td><td>電信商網路（不需數據）</td><td>網際網路／數據連線</td></tr>
      <tr><td><strong>訊息長度</strong></td><td>每區段 160 個字元</td><td>數千個字元</td></tr>
      <tr><td><strong>豐富媒體</strong></td><td>不支援（基本圖片需靠 MMS）</td><td>支援：圖片、影片、輪播、按鈕</td></tr>
      <tr><td><strong>已讀回條／輸入中提示</strong></td><td>不支援</td><td>支援</td></tr>
      <tr><td><strong>加密</strong></td><td>無</td><td>僅限一對一對話；跨平台推出於 2026 年開始；不涵蓋商業訊息</td></tr>
      <tr><td><strong>觸及率</strong></td><td>每一部手機</td><td>需支援 RCS 的裝置＋電信商；會備援回 SMS</td></tr>
      <tr><td><strong>商業品牌</strong></td><td>僅限英數字 sender ID</td><td>經驗證、帶標誌與色彩的寄件者（RBM）</td></tr>
      <tr><td><strong>計費模式</strong></td><td>按則計費，依目的地國家而定</td><td>按則／按對話計費（RBM），因市場而異</td></tr>
    </tbody>
  </table>
</div>

## RCS 與 SMS 實際的成本

對消費者而言，RCS 訊息走數據而非 SMS 方案，因此不會累積按則的費用。對企業來說，情況就不同了，而這正是團隊容易踩坑的地方。

**SMS** 按已遞送的訊息計費，依收件者所在國家定價，再加上電信商附加費。費率差異極大，從某些市場的幾美分到其他市場超過 $0.35 都有。我們在 [SMS API 定價說明](/zh-hant/post/sms-api-pricing) 中拆解了完整的模式。

**RCS Business Messaging**（RBM，Google 於 2025 年更名為「RCS for Business」）是一個付費的 A2P 管道：對於像 OTP 這種一次性發送，電信商與匯集商按則計費；而一旦使用者回覆，則按 24 小時對話計費。在美國，一則純文字 RCS 訊息在供應商基本費率下約為 $0.007–$0.02，與一個純 SMS 區段相近；一旦加上圖片、輪播或按鈕，價格就會再往上攀。所以 RCS 很少是每則更便宜的管道。另外還有兩件事讓它今天難以被視為省錢工具：

1. **供應並不一致。** RBM 並非在每個國家都對 A2P 流量上線，而且涵蓋度因電信商而異。在無法使用的地方，你就用不上它。
2. **你仍然需要 SMS 備援。** 任何沒有 RCS 的收件者都會收到 SMS，所以那部分流量你照樣得付 SMS 費率。

換句話說，把自動化訊息改走 RCS，很少能把 SMS 從你的帳單上移除。它只是在既有基礎上再疊加一個通常更貴的管道。

## OTP 該用 RCS、SMS 還是 WhatsApp？

對於一次性密碼與驗證碼，重點很單純：驗證碼必須送達，要快、要無所不在、成本要可預測。豐富媒體與輸入中提示對一組六位數的驗證碼毫無幫助。

以這些標準來看：

- **SMS** 在通用觸及率上勝出（人人都能收到），但它最昂貴，也最容易遭受詐騙。SMS pumping 攻擊會專門鎖定 OTP 端點，我們在 [什麼是 SMS Pumping 攻擊？](/zh-hant/post/sms-pumping-attack) 中有詳述。
- **RCS** 提供經驗證的品牌形象，但它的商業訊息並非端對端加密，加上不一致的 A2P 供應與強制性的 SMS 備援，意味著它在多數市場尚未成為可靠、更便宜的 OTP 管道。
- **WhatsApp** 已成為驗證的實用省錢選擇。在 SMS 成本偏高的市場，它每則往往便宜 40–90%、A2P 供應廣泛且可預測，而且不會暴露在 SMS pumping 之下。你仍保留 SMS，作為少數沒有 WhatsApp 使用者的備援。

以下是 SMS 與 WhatsApp OTP 在幾個市場的價格比較（SMS = Twilio 基本費率；WhatsApp = Meta 驗證費率）：

<div class="ag-table-wrap">
  <table class="ag-table">
    <thead>
      <tr><th>國家／地區</th><th>SMS（Twilio）</th><th>WhatsApp OTP</th></tr>
    </thead>
    <tbody>
      <tr><td>英國</td><td>$0.0420</td><td>$0.0220</td></tr>
      <tr><td>德國</td><td>$0.0940</td><td>$0.0550</td></tr>
      <tr><td>香港</td><td>$0.0682</td><td>$0.0260</td></tr>
      <tr><td>新加坡</td><td>$0.0415</td><td>$0.0160</td></tr>
      <tr><td>印尼</td><td>$0.3603</td><td>$0.0250</td></tr>
    </tbody>
  </table>
</div>

我們在 [SMS OTP vs WhatsApp OTP](/zh-hant/post/sms-otp-vs-whatsapp-otp) 與 [WhatsApp API 定價](/post/whatsapp-api-pricing) 中有更深入的探討。想看你自己的量與目的地的實際數字，[SMS 成本計算機](/zh-hant/tools/sms-cost-calculator) 能估算跨供應商的 SMS 支出，並把 WhatsApp 替代方案並排呈現。

## 你該選哪一個？

- **行銷與客戶互動：** 在有提供的地方，RCS 確實更好。它帶品牌、可互動，也不會讓人覺得像群發簡訊。用它吧，並搭配 SMS 備援。
- **OTP 與驗證：** 優先選擇能觸及你使用者、又最便宜的管道。實務上那就是 **WhatsApp OTP 搭配自動 SMS 備援**，而不是 RCS。它降低成本、透過備援維持通用觸及率，並閃避 SMS pumping。想看各種方法的完整比較，請參閱 [雙重驗證要花多少錢？](/zh-hant/post/two-factor-authentication-cost)。

要打造以 WhatsApp 優先、搭配 SMS 備援的遞送，再加上發送端點的詐騙防護，是相當可觀的一套管線工程。像 [Authgear](https://www.authgear.com) 這樣的身分驗證平台開箱即支援，讓你不必自行維護路由，就能用上更便宜的管道。

## 常見問題

### RCS 與 SMS 有什麼分別？

SMS 是行之有年的電信商文字訊息標準：純文字、160 個字元、在每一部手機上都能用。RCS（Rich Communication Services）是它的現代後繼者：豐富媒體、已讀回條、輸入中提示、更長的訊息、經過驗證的商業寄件者，以及在支援的應用程式中的一對一加密對話。RCS 需要數據連線，以及相容的裝置與電信商；當這些條件不具備時，就會備援回 SMS。

### RCS 會取代 SMS 嗎？

在點對點與豐富的商業訊息上正逐步取代，尤其是現在 Android 與 iOS 都已支援。但 SMS 不會消失，因為它是能觸及每一部手機的通用備援。至於自動化的一次性密碼，SMS 與 WhatsApp 在觸及率與成本上仍然佔主導地位。

### RCS 免費嗎？

對消費者而言，RCS 訊息走數據（Wi-Fi 或行動數據），而不是你的 SMS 方案，因此不會像 SMS 那樣按則收費。對於發送 A2P 訊息的企業，RCS Business Messaging 是付費管道，由電信商與匯集商按則或按對話計費，費率因市場而有很大差異。

### RCS 比 SMS 更安全嗎？

這要看你在比較什麼。SMS 未加密，容易被攔截與遭受 SIM 卡調換攻擊。RCS 在 Google Messages 為一對一對話加入了端對端加密，而 iPhone 與 Android 之間的跨平台加密要到 2026 年才開始推出。但那層加密並不涵蓋 RCS Business Messaging，也就是 OTP 驗證碼實際傳遞的管道。專就驗證碼而言，RCS 本質上並不比 SMS 更安全：兩者在商業端都沒有端對端加密，而且在無法使用 RCS 時都會備援回純 SMS。

### 可以透過 RCS 發送 OTP 嗎？

技術上可以，在有提供的地方透過 RCS Business Messaging 進行。實務上大多數驗證流量仍走 SMS 或 WhatsApp，因為 RCS 的 A2P 涵蓋度在各國並不一致，而且你無論如何都需要為非 RCS 使用者準備 SMS 備援。這層備援意味著改用 RCS 也很少能真正省下 SMS 成本。

### OTP 用 WhatsApp 會比 RCS 或 SMS 便宜嗎？

在大多數 SMS 成本偏高的市場，WhatsApp OTP 都明顯比 SMS 便宜，每則往往少 40–90%，而且不會暴露在 SMS pumping（簡訊泵送詐騙）之下。相較於 RCS，WhatsApp 目前的 A2P 供應更廣、更可預測。你仍然可以保留 SMS 作為沒有 WhatsApp 使用者的備援。

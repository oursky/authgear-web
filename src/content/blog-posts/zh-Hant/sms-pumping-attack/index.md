---
title: "什麼是 SMS Pumping 攻擊？如何偵測與防範簡訊話費詐欺"
excerpt: "SMS pumping 是機器人對你的 OTP 端點狂發假請求到高費率號碼——帳單由你買單。說明原理、如何從紀錄發現，以及如何阻擋。"
coverImage: ./cover.webp
category: engineering
featured: false
metaTitle: "什麼是 SMS Pumping 攻擊？偵測與防範"
metaDescription: "了解 SMS pumping 如何運作、如何從 OTP 紀錄察覺異常，以及在預算被掏空前先阻擋簡訊話費詐欺。"
publishedAt: 2026-03-17T16:48:12.266Z
updatedAt: 2026-03-19T21:16:18.210Z
draft: false
---

## 什麼是 SMS Pumping 攻擊？

想像一早醒來，SMS 帳單一夜暴增十倍——不是因為使用者爆量，而是機器人悄悄對**高費率電話號碼**發了數千次 OTP 請求，而費用全算在你頭上。這就是 **SMS pumping** 攻擊。

**SMS pumping**（亦稱 **SMS toll fraud** 或 **人為灌量 AIT, artificially inflated traffic**）是一種詐欺：攻擊者濫用你 App 的 OTP 或驗證簡訊流程來**替自己創造收入**。做法是提交與**高費率電信商**關聯的門號。你 App 每發出一則簡訊，攻擊者就能從電信**終端費**分潤一小部分——**由你付費**。

這類電信詐欺存在多年，但隨愈來愈多 App 依賴 SMS OTP 驗證，近年**急遽增加**。若你的 App 有任何人都能按的「發送 OTP」，你就可能是目標。

## SMS Pumping 如何運作（步驟）

了解機制有助設計防禦。典型流程如下：

<ol>
  <li><strong>攻擊者與高費率電信商合作。</strong> 部分電信市場會將終端費一部分分給控制接收號碼的一方。詐欺者與這類業者開戶，每則送達該網路的簡訊都能分潤。</li>
  <li><strong>攻擊者找到你的 OTP 端點。</strong> 例如公開的登入、註冊、手機驗證表單——送出門號就會發 SMS。</li>
  <li><strong>機器人以高費率門號灌爆端點。</strong> 自動腳本大量提交門號，鎖定高費率國家或號段。你的 App 照單全收、一則接一則發 OTP。</li>
  <li><strong>簡訊供應商向你收費。</strong> 每則 OTP 你都要付給閘道（如 Twilio、Vonage）——不論是否真有使用者要驗證。</li>
  <li><strong>攻擊者收取電信分潤。</strong> 詐欺者從終端費抽成——每則可能只有不到一美分，但乘上數百萬則就非小數。</li>
</ol>

攻擊者幾乎零成本。**全部成本由你承擔。**

## 實際影響：可以有多慘？

SMS pumping 可在數小時內從零變成天價帳單。單一攻擊行動一夜可產生數十萬則詐欺 OTP。以常見閘道單價估算：

<div class='ag-table-wrap'><table class='ag-table'><thead><tr><th>發送則數</th><th>每則 $0.08（非洲／亞洲常見）</th><th>每則 $0.11（例如德國）</th></tr></thead><tbody><tr><td>10,000</td><td>$800</td><td>$1,100</td></tr><tr><td>100,000</td><td>$8,000</td><td>$11,000</td></tr><tr><td>500,000</td><td>$40,000</td><td>$55,000</td></tr></tbody></table></div>

這不是假設數字。Reddit、Hacker News 等論壇上，開發者常描述一夜醒來 OTP 端點被灌、收到五位數意外帳單。部分 SMS 供應商會爭議並退費——並非全部，且流程緩慢。

## 警訊：如何從紀錄偵測 SMS Pumping

越早發現，損失越小。請在應用程式紀錄與計費儀表板留意：

### OTP 請求暴增

簡訊量**突然、陡峭**上升——尤其離峰或深夜——是最明顯訊號。將每小時 SMS 量與 7 天或 30 天滾動基線比較；超過正常值 **3 倍** 即應告警。

### 地理過度集中

合法使用者會分散在你實際營運的地理分布。若突然大量 OTP 指向**你幾乎沒有使用者的國家**——尤其是高費率國如蒲隆地、埃及、亞塞拜然——高度可疑。

### OTP 完成率低

追蹤「發送 OTP 後，在逾時視窗內成功驗證」的比例。真人多半會完成驗證；被灌的號碼很少完成——攻擊者不在乎登入，只要簡訊**被發出**。完成率低於 **30–40%** 值得調查。

### 連號或規律門號

機器人常以連號區間或名單產生門號。若紀錄顯示相同國碼、前綴呈規律群集，多半是自動流量。

### 同一 IP、大量不同門號

單一 IP 或小網段對**許多**不同門號請求 OTP，是明顯紅旗。真人很少在同一次瀏覽工作階段不斷換門號。

## 如何防範 SMS Pumping

防禦需**多層**並用，單一控制不足。

### 1. 多層級限制 OTP 請求頻率

在 IP、裝置指紋、門號等層級實作速率限制：

<ul><li>同一門號每小時最多 3–5 次 OTP 請求</li><li>同一 IP 每小時最多 10 次 OTP 請求</li><li>被拒後採指數型退避（exponential backoff）</li></ul>

無法完全擋下會輪換 IP 的堅定攻擊者，但可大幅提高成本、拖慢自動化攻勢。

### 2. 發送前先過 CAPTCHA 或工作量證明

在呼叫 SMS API 前要求通過 CAPTCHA（Google reCAPTCHA、hCaptcha、Cloudflare Turnstile）。機器人較難通過。多數 App 在**使用者摩擦**與**防詐**之間可接受——公開註冊流程尤其值得做。

### 3. 封鎖高風險國碼（若你未在該地營運）

若 App 在特定高費率電信市場**沒有**合法使用者，可在應用層拒絕該國碼門號。可維護**允許清單**（實際營運國家），清單外回傳錯誤。

<blockquote><p><strong>⚠️ 謹慎使用。</strong> 不要封鎖仍有真實使用者的國家；並搭配監控，隨使用者拓展新增國碼。</p></blockquote>

### 4. 發送前驗證門號

使用門號驗證 API（如 Twilio Lookup、Numverify）確認為有效、使用中門號（非市話或高風險 VoIP），且未標記為詐欺網路。每次查詢有小額成本，但可避免對不存在或詐欺門號大量發送。

### 5. 監控並對支出異常告警

向 SMS 供應商設定帳務告警。多數供應商（Twilio、Vonage、MessageBird）可設支出警示或**硬性上限**。日上限可設為「正常峰值 × 2」。無法阻止攻擊開始，但能避免**數日**無限制狂燒。

### 6. 高量 OTP 改走 WhatsApp

SMS pumping 利用傳統電信分潤經濟。**WhatsApp 驗證訊息**走 Meta 網路，較不易受電信層級話費詐欺影響。且多數市場 WhatsApp OTP 比 SMS **便宜 70–90%**。

### 7. 以通行密鑰與生物辨識降低 OTP 依賴

**每少發一則 OTP，就少一個攻擊面。** 通行密鑰與生物辨識登入可讓回訪使用者完全不必再收簡訊——該使用者工作階段即無 SMS pumping 暴露。

進一步了解為何 [通行密鑰正取代密碼與 OTP](/zh-hant/post/passkey-vs-password-why-passkeys-are-the-future-of-security) 成為現代驗證趨勢。

## SMS Pumping 與 OTP 盜用：有何不同？

兩者有時被混淆：

<div class='ag-table-wrap'><table class='ag-table'><thead><tr><th>攻擊類型</th><th>目的</th><th>誰受害</th><th>防禦</th></tr></thead><tbody><tr><td><strong>SMS Pumping（話費詐欺）</strong></td><td>製造詐欺簡訊發送以赚取電信分潤</td><td>你（開發者／公司）——帳單暴增</td><td>速率限制、CAPTCHA、門號驗證、支出上限</td></tr><tr><td><strong>OTP 盜用（帳戶接管）</strong></td><td>攔截或社交工程騙取 OTP 以接管帳戶</td><td>你的使用者——帳戶遭入侵</td><td>釣魚抗性驗證（通行密鑰、FIDO2）</td></tr></tbody></table></div>

SMS pumping 傷的是**你的荷包**；OTP 盜用傷的是**使用者**。兩者都是應降低對 SMS OTP 依賴的理由。OTP 安全陷阱可再讀 [開發者常犯的 5 個 TOTP 錯誤](/zh-hant/post/5-common-totp-mistakes)。

## Authgear 是否防範 SMS Pumping？

是。Authgear **內建** SMS pumping 防護——不必從零自建速率限制、異常偵測或門號驗證。Authgear 會監控 OTP 請求模式、標記可疑活動並自動阻擋詐欺發送。

除詐欺防護外，Authgear 預設透過 **WhatsApp** 路由 OTP（並附 SMS 後援），相較僅 SMS 流程每則成本常可降 **70–90%**。再搭配通行密鑰，隨使用者採用無密碼登入，**成本曲線可趨近零**。

若正在評估 SMS pumping——或單純例行 SMS——對業務的成本，見我們的 [SMS 成本優化指南](/zh-hant/solutions/reduce-sms-otp-cost)，含各市場與規模拆解。

## 重點整理

- SMS pumping 濫用你的 OTP 端點替攻擊者創造電信分潤——**費用由你承擔**
- 早期警訊包含：深夜量暴增、地理異常、OTP 完成率偏低
- 防禦需多層：速率限制、CAPTCHA、門號驗證、支出告警
- WhatsApp OTP、通行密鑰與生物辨識可縮小 SMS 攻擊面並降低成本
- 像 Authgear 等平台內建詐欺防護，無須完全自行實作

---
title: "雙因素驗證要花多少錢？2026 定價指南"
excerpt: "2FA 不是單一價格——SMS OTP、WhatsApp OTP、TOTP 與通行密鑰的成本結構差很大。以下是各規模下的實際成本。"
coverImage: ./cover.webp
category: engineering
featured: false
metaTitle: "雙因素驗證（2FA）成本多少？（2026）"
metaDescription: "釐清 2FA 真實成本：SMS OTP、WhatsApp、TOTP、通行密鑰與驗證平台。含不同 MAU／OTP 量級的月費對照表。"
publishedAt: 2026-03-17T16:54:57.184Z
updatedAt: 2026-03-19T21:16:27.848Z
draft: false
---

## 雙因素驗證的真實成本

雙因素驗證（2FA）已是現代 App 的標配。但「2FA」不是單一產品、單一價格——它涵蓋成本結構差異極大的多種方式。SMS OTP、WhatsApp OTP、驗證器 App（TOTP）、硬體金鑰與通行密鑰都能提供第二因子，但**總持有成本**天差地遠。

本指南拆解各方式的實際成本，含每則訊息費、平台授權與工程成本——協助你依規模與使用者組成做決策。

## 四種主要 2FA 方式與成本結構

### 1. SMS OTP——按則計費

最常見的 2FA：每次登入（或敏感操作）透過 SMS 將一次性密碼送到使用者手機。你依簡訊閘道商**每則**付費。

**成本結構：** 變動、按則、持續發生。成本與每月活躍使用者（MAU）及驗證頻率直接連動。

各國 SMS 單價差異大。以下為透過 Twilio 的代表性每則費率（約 2026 年初）：

<div class="ag-table-wrap"><table class="ag-table"><thead><tr><th>國家</th><th>每則 OTP（Twilio SMS）</th></tr></thead><tbody><tr><td>美國</td><td>$0.0083</td></tr><tr><td>英國</td><td>$0.0524</td></tr><tr><td>德國</td><td>$0.1120</td></tr><tr><td>印度</td><td>$0.0170</td></tr><tr><td>巴西</td><td>$0.0599</td></tr><tr><td>奈及利亞</td><td>$0.0920</td></tr><tr><td>埃及</td><td>$0.3959</td></tr><tr><td>全球平均</td><td>~$0.0875</td></tr></tbody></table></div>

**別忽略的隱藏成本：**

<ul><li>SMS 詐欺（pumping 攻擊可能帶來意外帳單——見我們的 <a href="/zh-hant/post/sms-pumping-attack">SMS pumping 攻擊</a>指南）</li><li>部分設定下，送達失敗仍計費</li><li>部分市場的 A2P（應用到人）註冊費（美國、印度等）</li><li>建置速率限制、詐欺偵測與後援流程的工程時間</li></ul>

### 2. WhatsApp OTP——每則較便宜、模式類似

WhatsApp 驗證訊息使用 Meta 商業平台，以「驗證對話」計價。仍為按則付費，但多數市場費率遠低於 SMS。

**成本結構：** 變動、按則（最低建置成本略高，但經常性費用較低）。

<div class="ag-table-wrap"><table class="ag-table"><thead><tr><th>國家</th><th>每則 WhatsApp OTP</th><th>相較 SMS</th></tr></thead><tbody><tr><td>美國</td><td>$0.0034</td><td>−59%</td></tr><tr><td>英國</td><td>$0.0220</td><td>−58%</td></tr><tr><td>德國</td><td>$0.0550</td><td>−51%</td></tr><tr><td>印度</td><td>$0.0014</td><td>−92%</td></tr><tr><td>巴西</td><td>$0.0068</td><td>−89%</td></tr><tr><td>奈及利亞</td><td>$0.0067</td><td>−93%</td></tr><tr><td>埃及</td><td>$0.0036</td><td>−99%</td></tr><tr><td>全球平均</td><td>~$0.0113</td><td>−87%</td></tr></tbody></table></div>

限制：使用者需安裝 WhatsApp。在 WhatsApp 主導的市場，通常仍有約 5–10% 使用者沒有。**WhatsApp 為主、SMS 後援** 可在維持觸及下省下大部分費用。

### 3. TOTP（驗證器 App）——邊際成本近乎零

基於時間的一次性密碼（TOTP）——Google Authenticator、Authy、1Password 等——在使用者裝置上以共用密鑰產生代碼。**不傳送訊息**，無按次費用。

**成本結構：** 實作工程時間（通常用 `speakeasy`（Node）或 `pyotp`（Python）等函式庫數小時可完成）。持續成本近乎零。備援碼儲存僅增加少量資料庫負擔。

**取捨：**

<ul><li>使用者須安裝並管理驗證器 App（消費型 App 摩擦較高、採用率較低）</li><li>使用者遺失裝置時，帳戶復原流程須審慎設計</li><li>非釣魚抗性——即時釣魚仍可能騙取代碼</li><li>最佳實務見 <a href="/zh-hant/post/5-common-totp-mistakes">5 個常見 TOTP 錯誤</a></li></ul>

**最適合：** B2B SaaS、開發者工具、管理後台——使用者技術程度高、願意使用驗證器 App 的情境。消費型 App 若便利優先，較不適合。

### 4. 通行密鑰——無傳送成本，實作需投資

通行密鑰以公開金鑰密碼學取代密碼與 OTP。使用者以 Face ID、Touch ID 或裝置 PIN 驗證。**不發訊息**、**不輸入代碼**。設計上具釣魚抗性。

**成本結構：** 無按次費用。工程投資以實作 WebAuthn／FIDO2（複雜度中等——完整實作常需約 1–3 週）。可選驗證平台以縮短工期。

長期而言，通行密鑰是大規模下**最便宜的 2FA**：每次驗證的邊際成本實質為零。回訪使用者愈多，相對 SMS OTP 省愈多。實作細節見我們的 [通行密鑰指南](/zh-hant/post/passkey-vs-password-why-passkeys-are-the-future-of-security)。

## 不同規模下的每月總成本

以下為全球使用者混合（219 國平均，2026 年 2 月資料）在不同每月 OTP 量下的加總：

<div class="ag-table-wrap"><table class="ag-table"><thead><tr><th>每月 OTP 則數</th><th>僅 SMS</th><th>WhatsApp + SMS 後援</th><th>TOTP（驗證器 App）</th><th>通行密鑰</th></tr></thead><tbody><tr><td>10,000</td><td>$875</td><td>~$113</td><td>~$0</td><td>~$0</td></tr><tr><td>100,000</td><td>$8,750</td><td>~$1,130</td><td>~$0</td><td>~$0</td></tr><tr><td>1,000,000</td><td>$87,500</td><td>~$11,300</td><td>~$0</td><td>~$0</td></tr></tbody></table></div>

*註：WhatsApp + SMS 後援假設約 90% 由 WhatsApp 送達、10% 改 SMS。TOTP 與通行密鑰欄位僅為「每則訊息」成本——實作成本為一次性，未列入表內。*

## 驗證平台授權：實際要付多少？

除每則訊息費用外，你可能還要付驗證平台費用（使用者管理、工作階段、MFA 註冊流程、通行密鑰支援等）。常見選項：

### 自建

工程成本落差極大。基本 SMS OTP 可能數日可成；含 TOTP、通行密鑰、工作階段管理、詐欺防護與帳戶復原的**生產級**驗證系統常需數月，且維運無上限。

### Duo Security（Cisco）

此類最常搜尋到的平台之一。免費層最多 10 位使用者。Essentials 約 $3／使用者／月；Business 約 $6／使用者／月；企業版為客製報價。500 人團隊僅 MFA 平台就可能 **$1,500–$3,000／月**——尚未含 SMS。Duo 強在員工／工作力 2FA，較不適合大規模消費者驗證。

### Auth0／Okta

常見企業驗證平台。Auth0 免費層約至 25,000 MAU；付費方案約自 $23／月起，隨 MAU 遞增。企業方案可達每月數千美元。Okta 多為按席位計價，類似 Duo。兩者皆含 MFA 與廣泛企業功能——價格也反映這點。

### Firebase Authentication

多數功能免費，含電話驗證（SMS OTP）在部分區域有免費額度，之後按量計費。與 Google 生態綁较深；客製彈性較有限。

### Authgear

內建 WhatsApp OTP、SMS OTP、TOTP、通行密鑰與 SSO 的驗證平台。目標不只是「管理」OTP，而是**降低** OTP 成本。含 SMS pumping 防護、生物辨識登入與跨 App 的 SSO。採用量計價並有寬鬆免費額度。**平台費 + 較低的每則成本（WhatsApp 對 SMS）** 組合下，總成本常低於 Auth0／Okta 另加獨立 SMS 閘道。個人化估算見 [SMS 成本優化方案](/zh-hant/solutions/reduce-sms-otp-cost)。

## 成本曲線：為何 2FA 會隨時間變便宜（若規劃得當）

多數 2FA 成本討論忽略一點：**隨使用者成熟，你的成本結構應改善。**

使用者首次驗證（註冊）時，幾乎一定要發 OTP 驗證電話——別無他法。但回訪使用者若已設定通行密鑰或生物辨識登入，**不必每次工作階段都再發 OTP**。

成熟的驗證組合大致如下：

1. **新使用者註冊：** WhatsApp OTP（或 SMS 後援）驗證電話——一次性成本  
1. **註冊後首次登入：** 提示設定通行密鑰或生物辨識登入  
1. **回訪登入（第 2 個月起）：** 通行密鑰或生物辨識——**零 OTP 成本**  
1. **帳戶復原／新裝置：** WhatsApp OTP 作為後援——偶發成本  

如此一來，**OTP 量成長速度遠低於使用者基數**。100 萬 MAU 的企業每月可能僅發 5 萬–10 萬則 OTP（涵蓋新註冊、新裝置與復原），而非每月 100 萬則「每次登入」——訊息量與成本可降 **90% 以上**。

## 2FA 預算該抓多少？

依每月 OTP 量與市場的粗略框架：

<div class="ag-table-wrap"><table class="ag-table"><thead><tr><th>階段</th><th>每月 OTP</th><th>建議作法</th><th>粗估月費</th></tr></thead><tbody><tr><td>早期／MVP</td><td>&lt;1 萬</td><td>SMS OTP（任一閘道）</td><td>約 $50–$500，視市場而定</td></tr><tr><td>成長期</td><td>1 萬–10 萬</td><td>WhatsApp + SMS 後援</td><td>約 $150–$1,200（對照僅 SMS 約 $1K–$9K）</td></tr><tr><td>規模化</td><td>10 萬–100 萬</td><td>WhatsApp + SMS 後援 + 回訪使用者通行密鑰</td><td>約 $1K–$12K（對照僅 SMS 約 $9K–$88K）</td></tr><tr><td>企業</td><td>100 萬+</td><td>通行密鑰為主 + 僅新使用者 WhatsApp OTP</td><td>平台費 + 極低 OTP 成本</td></tr></tbody></table></div>

## 重點整理

- 大規模下 **SMS OTP 最貴**——每次登入成本都疊加  
- **WhatsApp OTP** 在幾乎所有市場可比 SMS **便宜約 50–99%**  
- **TOTP** 與 **通行密鑰** 邊際成本近乎零，但實作與維護工較高  
- 長期最聰明組合：**新使用者用 WhatsApp OTP + 回訪用通行密鑰**——成本曲線趨近零  
- 驗證平台（Auth0、Authgear、Firebase）會增加月費，但降低工程負擔——須兩邊一併評估  

若想依你的實際用量與市場組合試算，可使用 [Authgear SMS 成本試算](/zh-hant/solutions/reduce-sms-otp-cost)。

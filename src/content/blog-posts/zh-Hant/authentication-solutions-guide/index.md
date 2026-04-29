---
title: "驗證方案：現代應用完整指南"
excerpt: "選對驗證方案是 App 最關鍵的技術決策之一。本指南涵蓋主要驗證類型、自建／採購框架，以及主流平台對照。"
coverImage: ./cover.webp
category: industry
featured: false
metaTitle: "驗證方案：完整指南（2026）"
metaDescription: "比較現代 App 最佳驗證方案：驗證類型、自建與採購取捨，以及如何為團隊選對平台。"
publishedAt: 2026-03-13T22:26:16.162Z
updatedAt: 2026-03-17T16:09:17.815Z
draft: false
---

選對驗證方案是 App 最關鍵的技術決策之一。選錯可能 18 個月後整個打掉重練，或一直補洞卻永遠蓋不滿邊角案例。選對則驗證近乎隱形——使用者登入、存取所需內容、繼續使用。

本指南涵蓋評估與選型所需的一切：有哪些驗證類型、實用的自建／採購框架、功能檢查清單，以及 **Authgear、Auth0、Okta、Keycloak、Supertokens、Firebase Auth** 等平台的高層比較。

## 什麼是使用者驗證？

**使用者驗證**是在授予系統存取權前，確認「此人是否為其所聲稱身分」的流程。它是每個應用的**大門**。

驗證回答：**「真的是你嗎？」** 這與 **授權** 不同——授權回答：**「你可以做這件事嗎？」** 兩者常在平台上打包，但本質是分開的議題。

完整的驗證系統通常涵蓋：

<ul><li><strong>憑證驗證</strong>（密碼、通行密鑰、權杖、生物辨識）</li><li><strong>工作階段管理</strong>（發放與撤銷權杖）</li><li><strong>多因素挑戰</strong>（OTP、推播通知）</li><li><strong>身分聯盟</strong>（SSO、社交登入）</li><li><strong>權杖標準</strong>（JWT、OIDC、SAML）</li></ul>

現代 App 需要以上多項，因此「驗證方案」自成一類產品。

## 驗證類型

### 密碼式驗證

最熟悉的方式：使用者輸入電子郵件與密碼，伺服器比對資料庫中雜湊後的值，相符則發放工作階段。

密碼驗證大家熟悉，但險顯著：弱密碼、撞庫、釣魚仍是帳戶遭入侵主因。若仍使用密碼，應強制強密碼政策、以 bcrypt 或 Argon2 雜湊，並提供 MFA。

### 無密碼驗證

無密碼**完全移除**共享密鑰。改以**持有之物**或**身體特徵**證明身分。常見方式：

<ul><li><strong>魔法連結</strong>——一次性網址寄到使用者信箱；無需密碼，信箱即身分證明。</li><li><strong>通行密鑰</strong>——密碼學憑證存在使用者裝置，以生物辨識或 PIN 解鎖。設計上具釣魚抗性，因私密金鑰不離開裝置。實作見我們的 <a href="/zh-hant/post/how-to-implement-passkeys-developer-guide">WebAuthn 實作通行密鑰完整指南</a>。</li><li><strong>生物辨識</strong>——Face ID、Touch ID 等，通常與通行密鑰並用，較少單獨作網路層驗證。</li></ul>

無密碼一般比密碼更安全，登入轉換率也較佳——產業正朝此方向移動。

### 多因素驗證（MFA）

MFA 在第一因子之外再要求第二證明。因子分類：

<div class='ag-table-wrap'><table class='ag-table'><thead><tr><th>因子</th><th>範例</th></tr></thead><tbody><tr><td>你知道的事</td><td>密碼、PIN</td></tr><tr><td>你持有的物</td><td>TOTP App、SMS 代碼、硬體金鑰</td></tr><tr><td>你的特徵</td><td>指紋、臉部掃描</td></tr></tbody></table></div>

常見實作：

<ul><li><strong>TOTP</strong>——Google Authenticator、Authhy 等每 30 秒換六碼；廣泛支援且不需電話號碼。</li><li><strong>SMS OTP</strong>——簡訊寄代碼；使用者容易，但易受 SIM 換卡攻擊。低風險可接受；高價值帳戶不建議單靠 SMS。</li><li><strong>硬體金鑰</strong>——如實作 FIDO2／WebAuthn 的 YubiKey；MFA 中最強選項。細節見 <a href="/zh-hant/post/what-is-fido2-complete-guide-fido-authentication">FIDO2 指南</a>。</li><li><strong>推播通知</strong>——在驗證器 App 核准登入；體驗與安全兼具。</li></ul>

依 Microsoft 對 Azure AD 遭入侵帳戶的分析，MFA 約可降低 **99%** 帳戶接管風險。持有敏感資料的 App 應將 MFA 視為必備。

### 單一登入（SSO）

SSO 讓使用者向中央 IdP 驗證一次即可存取多個應用而無需重複登入。常見協定：

<ul><li><strong>OIDC（OpenID Connect）</strong>——建構在 OAuth 2.0 上的現代標準，回傳含使用者宣告的 ID Token（JWT）。多數新整合採用。</li><li><strong>SAML 2.0</strong>——企業標準，XML 較冗長，但深植企業 IT。若客戶以 Okta、Azure AD、Google Workspace 為 IdP，常需要 SAML。</li></ul>

SSO 是 **B2B SaaS** 關鍵功能；企業採購常列為必要條件。若面向企業客戶，應**一開始**就規劃 SAML——事後補極痛苦。

可使用我們的 [OIDC Discovery 端點探索工具](/zh-hant/tools/oidc-discovery-endpoint) 檢視任何 OIDC 提供者的設定。

### 社交登入（OAuth）

社交登入讓使用者以既有帳戶（Google、Apple、GitHub、Facebook 等）登入。底層為 OAuth 2.0 加上 OIDC。

優點：不必記新密碼、一鍵註冊轉換率較高、電子郵件已由社交提供者驗證。

取捨：依賴第三方可用性、部分使用者不願連結帳戶、Apple／Google 對隱私有嚴格要求。

多數 App 將社交登入與電子郵件／密碼並列，而非完全取代。

### 機器對機器（M2M）驗證

並非所有驗證都與人有關。服務、背景工作與 API 也需證明身分。標準作法是 **OAuth 2.0 client credentials flow**：服務向驗證伺服器出示 client ID 與 secret，取得 access token 再呼叫下游 API。

M2M 宜及早規劃。若使用者與服務共用同一驗證平台，權杖發行與稽核模型一致——合規較單純。

## 自建 vs 採購：何時該自建驗證？

想自建很自然。驗譊感覺很直覺——存雜湊密碼、發 JWT，完成。但**生產級**驗證遠不止於此。

### 「自建驗證」實際包含

<ul><li>安全憑證儲存與正確雜湊（<code>bcrypt</code>、<code>Argon2</code>）</li><li>權杖生命週期（發放、輪替、撤銷）</li><li>跨裝置工作階段管理</li><li>MFA 與備援碼流程</li><li>抗枚舉與計時攻擊的重設密碼流程</li><li>速率限制與暴力破解防護</li><li>社交登入與 M2M 的 OAuth 2.0 伺服器</li><li>SSO 的 OIDC 提供者整合</li><li>稽核記錄</li><li>符合 GDPR／CCPA 的資料處理</li><li>漏洞與標準演進下的持續維護</li></ul>

這是**數月**工程，且幾乎**沒有終點**——新攻擊模式、標準演進、企業客戶要求的功能都可能超出你已建置範圍。

### 何時自建合理

- 有現成平台**無法**滿足的特殊驗證需求  
- 威脅模型要求完全掌控憑證儲存（例如受嚴格資料主權規範的金融機構）  
- 規模大到授權費已高於內部團隊成本  

### 何時採購合理

對**絕大多數**產品，驗證平台很快就能回本：上線更快、使用者體驗更完整、工程團隊專注在產品本身而非驗證管線。

「採購」也包含 **開源自架** 如 Keycloak 或 Authgear 自架版——你維運基礎建設，但不必自己寫核心程式。

經驗法則：若驗證**不是**你產品的核心差異化，就不要自建。

## 如何評估驗證方案

評估任何平台時可用此檢查清單。

### 安全功能

- MFA：TOTP、SMS、硬體金鑰、推播  
- 通行密鑰／FIDO2  
- 異常偵測與機器人防護（可疑登入告警、速率限制）  
- 外洩密碼偵測  
- 暴力破解防護與鎖帳政策  
- 安全權杖儲存與輪替  
- 具防竄改紀錄的稽核日誌  

### 開發者體驗

<ul><li>你技術棧的 SDK（React、Next.js、iOS、Android、Flutter 等）</li><li>文件清楚且含可執行範例</li><li>本地開發流程不必直連正式環境</li><li>驗證事件的 webhooks（使用者建立、登入失敗、MFA 註冊）——模式背景見 <a href="/zh-hant/post/webhooks-vs-apis-difference">Webhooks 與 API 說明</a></li><li>以 REST 或 GraphQL 程式化管理使用者</li><li>活躍社群或即時支援</li></ul>

### 合規與資料處理

- SOC 2 Type II（多數企業採購必要）  
- GDPR 合規處理（必要時歐盟資料落地選項）  
- 處理健康資料時是否提供 HIPAA BAA  
- 資料匯出：遷移平台時能否取出所有使用者資料  
- 可設定的資料保留與刪除政策  

### 定價模型

<div class='ag-table-wrap'><table class='ag-table'><thead><tr><th>模型</th><th>注意事項</th></tr></thead><tbody><tr><td>每月活躍使用者（MAU）</td><td>成長時成本陡升；釐清何謂「活躍」</td></tr><tr><td>按功能（SSO、MFA 加購）</td><td>SSO 常另外計價——確認企業功能是否捆綁</td></tr><tr><td>固定費／用量計費</td><td>預測較簡單；確認超額計價</td></tr><tr><td>開源 + 基礎建設</td><td>無授權費，但須計入工程與維運時間</td></tr></tbody></table></div>

### 雲端 vs 自架

雲端託管最快上手、無需管基礎建設。自架可完全掌控資料存放位置——對受監管產業與嚴格資料主權客戶重要。

部分平台兩者皆提供。例如 Authgear 可作雲端服務，或以 Docker／Kubernetes 自架。

## 主流驗證方案比較

以下為高層比較；各平台細節繁多——僅作起點。**定價變動頻繁**，請以各廠商官網為準。

<div class='ag-table-wrap'><table class='ag-table'><thead><tr><th>平台</th><th>最適合</th><th>MFA</th><th>通行密鑰</th><th>SSO</th><th>自架</th><th>定價</th></tr></thead><tbody><tr><td><strong>Authgear</strong></td><td>新創到企業；需雲端或自架彈性</td><td>是（TOTP、SMS、生物辨識）</td><td>是</td><td>是（OIDC + SAML）</td><td>是（開源）</td><td>MAU 計價；有免費額度</td></tr><tr><td><strong>Auth0</strong></td><td>要受管雲端與大生態系</td><td>是</td><td>是</td><td>是（OIDC + SAML）</td><td>否</td><td>MAU；規模大時較昂貴</td></tr><tr><td><strong>Okta</strong></td><td>企業 IT 與工作力身分</td><td>是（完整）</td><td>是</td><td>是（OIDC + SAML）</td><td>否</td><td>按使用者；企業報價</td></tr><tr><td><strong>Keycloak</strong></td><td>能自行維運基礎建設的團隊</td><td>是</td><td>是</td><td>是（OIDC + SAML）</td><td>是（開源）</td><td>免費；自付基礎建設與維運</td></tr><tr><td><strong>Supertokens</strong></td><td>開發者優先；開源＋雲端選項</td><td>是</td><td>路線圖中</td><td>是（OIDC）</td><td>是（開源）</td><td>自架免費；雲端 MAU</td></tr><tr><td><strong>Firebase Auth</strong></td><td>已在 Google 生態的行動優先 App</td><td>有限（TOTP、電話）</td><td>否</td><td>有限</td><td>否</td><td>10K MAU 內免費；以上依 Google Cloud</td></tr></tbody></table></div>

### 進一步看 Authgear

Authgear 是面向開發者的開源驗證與身分平台。差異化重點：

<ul><li><strong>部署彈性</strong>：Authgear 雲端或自行在任何 Kubernetes 叢集部署。程式碼 MIT 授權，見 GitHub。</li><li><strong>完整驗證堆疊</strong>：通行密鑰、TOTP、SMS OTP、生物辨識登入、社交登入（Google、Apple、GitHub 等）、SAML 與 OIDC SSO、M2M client credentials——多數無需加購。</li><li><strong>驗證入口網站</strong>：代管登入、註冊與 MFA 畫面，可品牌化並嵌入 App，省自建前端驗證 UI。</li><li><strong>管理入口</strong>：網頁 UI 管理使用者、工作階段、角色與稽核。</li><li><strong>開發者友善</strong>：React、React Native、iOS、Android、Flutter 等 SDK；本地開發 CLI。</li></ul>

若需要自架彈性又不想從零寫驗證，Authgear 值得列入首選評估。

## 如何導入驗證方案

不論選哪個平台，整合路徑大致相似。

### 步驟 1：定義驗證需求

寫程式前先回答：

- 使用者是誰？消費者、員工或兩者？  
- 上線時支援哪些登入方式？未來可能加什麼？  
- 未來 12 個月是否需要企業 SSO？  
- 產品適用哪些合規框架？  
- 使用者資料須落在哪些地區？  

答案可立刻縮小候選名單。

### 步驟 2：註冊並設定平台

多數平台有開發免費額度。建立專案、設定應用（Web、行動或 API）、啟用所需登入方式。此時一併設定重新導向 URL、權杖生命週期與品牌。

### 步驟 3：安裝 SDK

在前後端加入平台 SDK。多數現代 SDK 會代處理 OIDC 流程——呼叫 `login()`、使用者被導向驗證入口、回呼由 SDK 處理權杖儲存。

```
// Authgear React SDK 範例（偽程式）
import authgear from "@authgear/web";

await authgear.configure({ endpoint: "https://your-project.authgear.cloud", clientID: "..." });
await authgear.startAuthentication({ redirectURI: "https://your-app.com/callback" });
```

### 步驟 4：保護路由與 API

以驗證伺服器發放的 access token 保護 API。後端應驗證權杖簽章（使用提供者的 JWKS 端點——可用 [OIDC Discovery 探索工具](/zh-hant/tools/oidc-discovery-endpoint) 查找）、檢查過期與 audience 等宣告。

### 步驟 5：啟用 MFA

基礎驗證穩定後再疊加 MFA。設定提供的因子、MFA 為選用或強制、復原流程（備援碼、信任裝置）。完整測試含遺失驗證器時的行為。

### 步驟 6：測試邊界情境

驗證的 bug 常躲在邊界：

- 過期權杖與重新整理流程  
- 多裝置同時工作階段  
- 帳戶復原（忘密碼、遺失 MFA 裝置）  
- 社交提供者不可用時  
- 機器人與暴力破解防護行為  

### 步驟 7：上線與監控

上線前啟用稽核記錄。對可疑活動（高失敗率、異常地理）設告警。定期檢視稽核紀錄——是偵測攻擊的主要訊號。

## 常見問題

### 什麼是驗證入口網站（authentication portal）？

由驗證平台代管的登入、註冊、重設密碼、MFA 挑戰等 UI。你將使用者導向入口，平台處理互動後再以權杖導回你的 App。多數平台可自訂品牌（Logo、色彩、自訂網域），讓體驗貼近你的產品。

### 驗證與授權差在哪？

驗證確認身分（「你是誰？」）；授權決定可執行動作（「你能做什麼？」）。驗證永遠在前。像 Authgear 這類平台常透過 OIDC 權杖與 RBAC 同時涵蓋兩者。

### 使用第三方驗證安全嗎？

對多數團隊**比自建更安全**。專職平台投入安全研究、定期滲透測試並維持合規認證。**設定錯誤的自建實作**風險往往高於依賴成熟廠商。若要最大掌控度，可選可稽核程式碼的開源自架方案。

### 新創最適合哪種驗證方案？

依技術棧與兩年後預期而定。純消費型 App 用 Firebase Auth 可快速起步，但 MFA 有限且無自架。若為開發者向或 B2B、日後需要 SSO 與更強安全，一開始選較完整平台如 Authgear 或 Auth0，可避免痛苦遷移。Authgear 雲端免費額度可低風險試用。

### 何時該加入 SSO？

當企業潛在客戶開始詢問時——通常比你想的早。**SAML 整合**常是企業採購的 deal-breaker。第一天就選支援 OIDC 與 SAML SSO 的平台幾乎無額外成本；事後補則昂貴。若路線圖含任何企業區隔，請納入 SSO。

## 結論

驗證不是做一次就忘的功能；它是對使用者安全、工程生產力與合規的**持續投資**。對的驗證方案能卸下團隊負擔，讓你專注在產品本質。

對多數 App，問題不是「要不要用驗證平台」，而是「用哪一個」。請用本指南檢查清單對照真實需求，特別留意 **SSO、通行密鑰成熟度**，以及若資料落地重要時的**自架選項**。

**準備開始？** Authgear 提供無需信用卡的雲端免費額度，約一小時內即可把驗證入口接到你的 App。[開始使用 Authgear](https://portal.authgear.com/)。

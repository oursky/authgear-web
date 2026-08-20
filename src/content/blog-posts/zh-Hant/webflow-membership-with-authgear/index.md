---
title: "使用 Authgear 為 Webflow 建立會員系統"
h1: "透過 Authgear 為 Webflow 網站加入會員功能"
excerpt: "Webflow 正在淘汰原生 User Accounts 功能，許多網站經營者因此需要新的會員登入與內容門檻方案。若你目前依賴 Webflow 做驗證，現在就該提早評估替代方案，避免使用者失去存取權。本文將示範如何以 Authgear 無縫接手 Webflow 即將退場的帳號功能，持續守住安全與會員體驗。"
coverImage: ./cover.webp
category: integrations
featured: false
metaTitle: "透過 Authgear 為 Webflow 網站加入會員功能"
metaDescription: "Webflow 正在淘汰原生 User Accounts 功能，許多網站經營者因此需要新的會員登入與內容門檻方案。若你目前依賴 Webflow 做驗證，現在就該提早評估替代方案，避免使用者失去存取權。本文將示範如何以 Authgear 無縫接手 Webflow 即將退場的帳號功能，持續守住安全與會員體驗。"
publishedAt: 2025-06-27T12:48:36.371Z
updatedAt: 2026-02-12T02:35:14.225Z
draft: false
---

*隨著 Webflow 逐步淘汰原生 User Accounts 功能*，許多開發者正面臨同一個挑戰：如何找到安全、穩健且易於整合的替代方案。想像你正在打造一個忠誠會員計畫網站：一個活躍的數位空間，會員可以輕鬆登入，查看專屬內容與累積點數。社群對於專屬福利與進度追蹤充滿期待；但在既有驗證方式退場後，你要如何確保流程依舊順暢又安全？

這時候就輪到 Authgear 上場。這個強大工具能補上 Webflow 留下的缺口。Authgear 提供慷慨的免費方案與多元功能組合，非常適合接手你在忠誠會員網站上的驗證需求。無論你是資深開發者，或剛踏入開發旅程，都能透過整合 Authgear，讓會員流暢登入、互動專屬內容，並在每一步都感到安心。

在這份教學中，你將一步步把 Authgear 整合到 Webflow 網站。完成後你將學會：

- 建立 Authgear 專案與應用程式。
- 新增 Login、Logout、Sign Up 按鈕，並正確控制顯示/隱藏。
- 在 Webflow 站點中實作核心驗證邏輯。
- 於受保護區塊顯示標準與自訂使用者資訊。
- 建立並管理僅限已登入使用者可見的內容。

你可以在[這裡](https://authgear-webflow.webflow.io/)查看本教學的成品，也可以在[這裡](https://webflow.com/made-in-webflow/website/authgear-webflow)複製 Webflow 專案。

### 先備條件

- 一個可用的 **Authgear 帳號**。若尚未註冊，可前往[免費註冊](https://portal.authgear.com/)。
- 一個 **Webflow 帳號**，以及你希望加入驗證功能的專案。

## 步驟 1：建立你的 Authgear 專案

首先，我們要建立專案。專案可視為你的應用程式與使用者的容器。

1. 登入 [Authgear Portal](https://portal.authgear.com/) 後，系統會提示你建立新專案。
1. 輸入專案名稱（例如：`My Webflow Site`）。
1. 完成 endpoint 網域設定，建立你的專屬 Authgear endpoint：`https://<your-project-name>.authgear.cloud`，然後點擊「Next」。

<!--FIGURE-->
![](./figure-1.webp)
<!--/FIGURE-->

1. 選擇終端使用者的登入方式。本教學請確保選擇 Email。
1. 上傳 logo 並挑選品牌色彩，完成品牌設定。

## 步驟 2：建立並設定應用程式

有了專案後，你需要在專案內建立一個應用程式。

1. 在 Authgear Portal 左側選單前往 Applications。
1. 點擊上方工具列的 + Add Application。
1. 在對話框中輸入應用程式名稱（例如「Webflow Site」），並選擇 Single Page Application 類型，點擊「Save」。

<!--FIGURE-->
![](./figure-2.webp)
<!--/FIGURE-->

1. 下一頁會顯示各種框架教學。點擊 Next 跳過，進入應用程式設定頁。
1. 在 URIs 區塊找到 Authorized Redirect URIs 欄位。
1. 輸入你已發布的 Webflow 網站根網址（例如：`https://my-awesome-site.webflow.io/`）。注意：網址結尾的 `/` 必須保留。
1. 點擊頁面底部的 Save。
1. 最後記下你的 Client ID 與 Endpoint，後續步驟會用到。

<!--FIGURE-->
![](./figure-3.webp)
<!--/FIGURE-->

## 步驟 3：在 Webflow 加入自訂樣式

1. 在 Webflow 專案中前往 Site Settings > Custom Code。
1. 於 Head Code 區塊貼上以下 CSS。這些樣式可避免在腳本執行前出現內容閃爍（flash）。腳本本體會在下一步加到頁尾，以取得較佳頁面效能。
1. 點擊「Save Changes」。

## 步驟 4：加入 SDK 並設定驗證按鈕樣式

1. 在 Webflow Designer 中加入三個 Button 元素。
1. 文字分別設為「Login」、「Sign Up」與「Logout」。
1. 指派 class 與 ID：<ul><li>**Login Button**：Class **`auth---invisible`**、ID **`login-btn`**
1. **Sign Up Button**：Class **`auth---invisible`**、ID **`signup-btn`**
1. **Logout Button**：Class **`auth---visible`**、ID **`logout-btn`**
1. 回到 Site Settings > Custom Code，將以下內容貼到 Footer Code 區塊。此段包含 Authgear SDK 與按鈕初始邏輯。

## 步驟 5：實作核心驗證與 UI 邏輯

更新 Footer Code：

在 Webflow 的 Footer Code 中，將*第二個* `<script>` 標籤的內容替換為下方完整邏輯。記得把其中的 placeholder 值改成步驟 2 取得的憑證。

接著你可以註冊第一位使用者：

1. 發布你的 Webflow 網站。
1. 開啟正式網址並點擊「Sign Up」建立帳號。
1. 註冊完成後會導回原頁面，此時應可看到「Logout」按鈕。
1. 到 Authgear Admin Portal 的 User Management > Users，確認新使用者已建立。

## 步驟 6：加入標準使用者資訊顯示元素

1. 在 Webflow Designer 中加入兩個 Paragraph 元素。
1. 設定其 ID 與文字：<ul><li>第一個 Paragraph：ID **`user-email`**、文字 **Membership Email:**
1. 第二個 Paragraph：ID **`user-email-verified`**、文字 Verification Status:
1. 在 Footer Code 中更新 `updateUI` 函式，以取得並附加這些資料。

## 步驟 7：新增並顯示自訂屬性

### 7a. 建立、設定並指派自訂屬性

1. 定義屬性：<ol><li>在 Authgear Admin Portal 前往 User Profile > Custom Attributes。
1. 點擊「+ Add New Attribute」。
1. 設定：Name **`points_collected`**、Type 選 Number，然後點擊「Save」。
1. 在清單中將 Token Bearer Access Right 與 End-user Access Right 都設為 Read-only。

<!--FIGURE-->
![](./figure-4.webp)
<!--/FIGURE-->

1. 為使用者指派數值：<ol><li>前往 User Management > Users，點入你的測試使用者。
1. 在 Profile 分頁往下捲動至 Custom Attributes。
1. 在 Points Collected 欄位輸入數字（例如 50）並點擊「Save」。

<!--FIGURE-->
![](./figure-5.webp)
<!--/FIGURE-->

### 7b. 在 Webflow 顯示自訂屬性

1. 在 Webflow Designer 中新增一個 Paragraph 元素。
1. 設定 ID 為 **`points-collected`**，文字設為 **FlowPoints Collected:**。
1. 再次更新 Footer Code 中的 `updateUI` 函式，以取得並顯示該值。

## 步驟 8：保護內容

### 8a. 保護頁面中的某個區塊

1. 在 Webflow Designer 中加入一個 Div Block 作為「未登入」檢視。<ul><li>設定 class 為 **`auth---invisible`**。
1. 其中加入一段 Paragraph，文字為「Please login to see this locked content」。
1. 再加入一個 Button，文字為「Login to View」，class 為 `content-button`。
1. 再建立第二個 Div Block 作為「已登入」檢視。<ul><li>設定 class 為 **`auth---visible`**。
1. 將步驟 6 與步驟 7 的三個 Paragraph 拖入此 div。
1. 最後為新的 `content-button` 加上 click listener。

### 8b. 保護整個頁面

1. 在 Webflow 建立新頁面（例如「locked-content」）。
1. 在 Navigator 面板選取 Body 元素。
1. 在 Style Panel（S）中，給 Body 加上 **`auth---visible`** class。腳本之後會自動把未驗證使用者導離此頁。

## 最終程式碼

以下是要放到 Webflow 專案 **Footer Code** 的完整最終腳本。

## 結語

透過這份教學，你已看到 Authgear 如何無縫補上 Webflow 原生 User Accounts 退場後的空缺，讓你持續提供安全、直覺的驗證流程與個人化體驗。藉由易整合、可客製 UI 與完整使用者管理能力，Authgear 能幫助你更有信心地保護內容並打造蓬勃社群。

準備好保護你的 Webflow 網站並提升使用者體驗了嗎？<a href="https://portal.authgear.com/" target="_blank">立即免費註冊 Authgear</a>，今天就開始打造！

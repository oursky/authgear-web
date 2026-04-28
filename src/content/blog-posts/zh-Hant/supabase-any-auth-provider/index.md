---
title: "將 Supabase 連接到任何驗證提供者"
excerpt: "使用你現有的 SSO 或 IdP 與 Supabase 整合。了解如何交換 JWT 以取得完整 RLS 存取與單一登入整合。"
coverImage: ./cover.jpg
category: integrations
featured: false
metaTitle: "將 Supabase 連接到任何驗證提供者"
metaDescription: "使用你現有的 SSO 或 IdP 與 Supabase 整合。了解如何交換 JWT 以取得完整 RLS 存取與單一登入整合。"
publishedAt: 2025-10-24T15:20:09.390Z
updatedAt: 2026-02-12T02:33:54.737Z
draft: false
---

你已經把登入問題解決了。你的公司正在使用身分識別提供者（IdP）做 SSO，而且你技術堆疊中的每個應用程式都已經信任它。然後新專案來了，你的團隊想試用 [Supabase](https://supabase.com/)**。**

唯一的問題是：你的使用者 **不在 Supabase Auth 裡**，而 Supabase 內建的第三方選項（Clerk、WorkOS、Auth0、Amazon Cognito）不符合你的架構。你不會遷移使用者，也絕對不想有兩份真實來源。

好消息是？你不需要。Supabase 的資料庫其實 *不要求* 使用 Supabase Auth；它只需要 **Supabase 簽發的 JWT** 來評估列層級安全（RLS）。只要你能驗證現有 JWT，就可以在邊緣把它們 **交換** 成 Supabase 簽發的權杖，並完全維持既有 SSO／IdP 不變。無需匯入使用者。無需重複 session。

在這篇指南中，你會學到如何：

- 驗證你的 IdP JWT（任何有 JWKS 端點的發行者都可以）。
- 簽發 Supabase 簽名 JWT。
- 設定 `supabase-js` 按需取得該權杖。
- 撰寫根據使用者 `sub` claim 的 RLS policy。

如果你還沒有 IdP，**Authgear** 也很適合放在這個位置，提供 MFA、生物辨識、社群登入。但這套模式可套用在 *任何* JWT 發行者。現在就讓你的既有 SSO 以正確方式接上 Supabase。

<!--FIGURE-->
![](./figure-1.png)
<!--/FIGURE-->

這篇指南是給無法使用這些選項的團隊——你仍然可以使用 Supabase。

## 完整範例程式碼

完整範例應用程式原始碼已公開於 GitHub：[https://github.com/authgear/authgear-example-supabase](https://github.com/authgear/authgear-example-supabase)

你可以把它當作範本，把自己的 JWT 型 IdP 與 Supabase 整合。

## 運作方式

Supabase 的 Postgres RLS 會期待請求攜帶 **Supabase 簽發** 的 JWT，通常還要有 `authenticated` 角色。如果你已經有會簽發 JWT 的 SSO/IdP，不能直接把那些 token 丟給 Supabase。解法是 **自帶 JWT（bring-your-own-JWT）** 流程：

1. 使用發行者的 JWKS 驗證你 IdP 的 JWT。
1. **用 Supabase 專案密鑰簽發新 JWT**，並加入 `role: "authenticated"`。
1. 前端在請求 Supabase 時使用這顆新 JWT。

## 步驟 1 - 設定你的驗證提供者

先檢查既有驗證提供者簽發的 JWT payload。通常會包含 `sub`、`email`、`phone_number` 等 claim。

也要確認如何驗證該 token。一般可透過 `https://<your-idp>/.well-known/openid-configuration` 下的 JWKS 端點。

可參考 [Authgear 的 JWT Token 文件](https://docs.authgear.com/reference/tokens/jwt-access-token)。

## 步驟 2 - **建立伺服器端函式交換 JWT**

接著要實作一個伺服器端函式處理 token 交換。常見做法之一是部署 Supabase Edge Function。

在 Supabase 控制台：**Project Settings → API → JWT Keys → Legacy JWT Secret**，複製這個 secret 值，稍後要用來簽發 Supabase token。

現在建立關鍵元件：Supabase Edge Function。它會接收你的 IdP JWT，並回傳用 Supabase 密鑰簽發的新 JWT。

以下以 Authgear 為例，其他可簽發 JWT 的 IdP 流程相同。

1. 到「Edge Functions」->「Secrets」，新增兩個 secret：   <ol><li>`AUTHGEAR_ENDPOINT` = 你的 Authgear App endpoint（例如 `https://myapp.authgear.cloud`）。``
1. `SB_JWT_SECRET` = 你的 Supabase JWT secret（來自上方步驟）。

1. 到 Supabase 網頁介面的「Edge Functions」->「Functions」，貼上程式碼並部署，函式命名為 `exchange-jwt`。

部署後，函式可透過以下 URL 存取：

`${SUPABASE_URL}/functions/v1/exchange-jwt`

## 步驟 3：建立資料表與 RLS policies

現在在 Supabase 建立資料表與 RLS 規則。我們會建立一個存放使用者擁有資料的資料表，並用 RLS 確保每位使用者只能操作自己的資料列。

打開 Supabase 專案中的 SQL 編輯器，執行以下 SQL 指令：

我們建立了一個 SQL 函式 `current_user_id()`，它會從當前請求 JWT 取出 `sub` claim（subject）。Supabase Postgres 內建 `auth.jwt()` 可取出請求者的 JWT claims；`auth.jwt() ->> 'sub'` 會把 `sub` 以文字形式取出。

- `instruments` 表有 `user_id` 欄位，用來儲存每筆 instrument 對應的 Authgear 使用者 ID。

- 我們對此表啟用了 RLS，代表預設不允許存取任何資料列，除非有 policy 明確允許。

接著定義了 READ 操作 policy，你可以用同樣方式建立 INSERT、UPDATE、DELETE。每個 policy 都限制在 `authenticated` 角色，並要求資料列的 `user_id` 必須符合 JWT 中的使用者 ID。

## 步驟 4：把交換後 JWT 接到 Supabase Client

現在你可以在後續請求 Supabase 時使用交換後 JWT。Supabase client 暴露了 `accessToken` hook，可用來提供自訂的 access token 函式。

若你前端使用 Authgear，會像這樣（若用其他 IdP SDK，替換即可）：

在這個設定中：

- 我們在 Supabase client 關閉 `autoRefreshToken` 與 `persistSession`，讓 Authgear 成為 session 的唯一真實來源。

- 我們提供 `accessToken` 非同步函式。Supabase Client 每次需要 JWT 發出受保護請求時都會呼叫它。對我們的案例來說，就是每次查詢 `instruments` 表都會呼叫。

現在你就能透過 Supabase client 安全地存取資料庫，並受 RLS policy 保護。

### 結論

你不必在 Supabase 與既有 SSO 之間二選一。透過驗證 IdP JWT，並在邊緣簽發 Supabase JWT，你可以同時得到乾淨的 RLS、單一身分來源與零使用者遷移。這是把 Supabase 納入既有 JWT 架構最簡單的方式。你也能持續使用驗證提供者的全部能力，例如 [Authgear](/zh-Hant/)。

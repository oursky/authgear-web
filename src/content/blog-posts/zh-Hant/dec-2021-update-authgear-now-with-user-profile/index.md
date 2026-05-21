---
title: "2021 年 12 月更新：Authgear 現已支援使用者檔案"
excerpt: "我們很高興把使用者檔案管理能力帶進你的專案！"
coverImage: ./cover.webp
category: features
featured: false
metaTitle: "2021 年 12 月更新：Authgear 現已支援使用者檔案"
metaDescription: "我們很高興把使用者檔案管理能力帶進你的專案！"
publishedAt: 2021-12-10T08:52:05.430Z
updatedAt: 2026-02-12T02:33:54.729Z
draft: true
---

使用者管理不只是註冊與登入，還包含安全保存使用者檔案，以及讓管理員與終端使用者都能友善地編輯資料。我們很高興把這些能力帶進你的所有專案！

## **使用者檔案（User Profile）**

每位使用者在 Authgear 專案中都會有一份檔案，包含姓名、性別、聯絡資訊等欄位。你可依專案需要自訂欄位，只保留必要資料；也可分別設定 App、管理員與終端使用者的存取權限。

Authgear 目前內建支援這些欄位：Name、Given Name、Family Name、Middle Name、Nickname、Profile（Webpage）、Picture、Website、Gender、Birthdate、Timezone、Language、Address、Email、Phone、Preferred Username。

### Admin Portal

在 Portal 的使用者詳情頁中，你會看到新的「Profile」分頁，管理員可快速檢視與修改使用者資料。

<!--FIGURE-->
![](./figure-1.webp)
<!--/FIGURE-->

### 透過預建前端快速上線

在 [User Settings](https://docs.authgear.com/integrate/auth-ui) 頁面，新增了可供使用者管理個人檔案的區塊。是的，前端已為你預建完成，你不需要另外撰寫程式即可在最終產品提供此功能。

<!--FIGURE-->
![](./figure-2.webp)
<!--/FIGURE-->

### 如何讀取使用者檔案

你可以在伺服器端透過 Admin API 存取使用者檔案，或在客戶端透過 [SDK 與 `userinfo` endpoint](https://docs.authgear.com/integrate/user-profile#userinfo-endpoint) 取得資料。

### **從社群平台帶入基本資訊**

許多開發者使用 Authgear 串接社群登入。當使用者以社群帳號註冊時，平台通常會回傳基礎個資；Authgear 會將這些資訊同步到使用者檔案，讓首次使用時即可自動填入。

想了解更多整合方式，請參考[官方文件](https://docs.authgear.com/integrate/user-profile)。

---
title: "Profile Enrichment 如何提升你的產品成效"
excerpt: "了解使用者檔案增豐（Profile Enrichment）如何運作、帶來哪些效益，以及如何用 Authgear 啟用它來更理解你的客戶。"
coverImage: ./cover.webp
category: engineering
featured: false
metaTitle: "Profile Enrichment 如何提升你的產品成效"
metaDescription: "了解使用者檔案增豐（Profile Enrichment）如何運作、帶來哪些效益，以及如何用 Authgear 啟用它來更理解你的客戶。"
publishedAt: 2023-07-28T12:38:13.692Z
updatedAt: 2026-02-12T02:33:54.763Z
draft: false
---

有時候，企業需要的使用者資訊，會比使用者在初次註冊或登入時提供的資料更多。但要如何取得這些資訊呢？如果每次登入都反覆要求使用者填寫相同資料，會讓他們的體驗**變得更差**。另外，也不可能或不具效率地讓公司內部人員逐一人工查找並補齊每位使用者的額外資料。在這種情況下，**Profile Enrichment** 方法可以協助你找出並補充公開可取得的資訊到使用者檔案中。

在這篇文章中，我們會探討使用者檔案增豐如何運作、它的好處，以及你如何使用 <a href="/" target="_blank">Authgear</a> 啟用它，透過更了解你的客戶來提升產品使用成效。

## 什麼是 Profile Enrichment?

Profile enrichment 如名稱所示，代表透過加入**外部來源**的資訊來強化你現有的客戶資料。核心概念是把其他地方可取得的客戶補充資訊，與你已擁有的基礎資料整合在一起。舉例來說，當使用者登入或在註冊流程中，你可以呼叫公開的 <a href="https://ip-api.com/" target="_blank">Geolocation API</a>，透過其 IP 位址取得更多資訊，例如使用者所在國家、城市或時區。

## 透過 Profile Enrichment 提升產品價值

使用 profile enrichment 的好處很多，以下是其中幾項你可以考慮的方向：

1. **個人化（Personalization）**：在當前商業環境中，個人化不只是趨勢，而是必要條件。舉例來說，如果你知道客戶的職稱或所屬產業，就能打造高度個人化的溝通與體驗，直接回應他們的需求與興趣。
1. **提高客戶互動（Increased Customer Engagement）**：Profile enrichment 能提供對使用者行為、偏好與生活型態更深入的洞察。這些洞察可用於制定提升互動的策略，例如寄送個人化 Email、展示相關產品推薦，或依據使用者行為與偏好優化 UI。
1. **更佳分群（Better Segmentation）**：當使用者檔案更完整時，分群會更精準且更有洞察價值。企業可以依據人口統計、行為、興趣或偏好進行分群。這種強化後的分群可帶來更有效的行銷活動、更好的使用者體驗，以及更高的轉換率。
1. **改善客戶留存（Improved Customer Retention）**：真正理解客戶是提升留存的關鍵。Profile enrichment 讓你更深入了解使用者，進而能主動處理問題、預測未來行為，並提供更符合需求的產品或服務，最終提升滿意度與忠誠度。

<!--FIGURE-->
![](./figure-1.webp)
<!--/FIGURE-->

## 如何透過 Authgear 啟用 profile enrichment？

若要在 Authgear 中進行 profile enrichment，你可以建立一個 <a href="https://docs.authgear.com/integrate/events-hooks/denohooks" target="_blank">Hook</a>，呼叫像 <a href="https://www.fullcontact.com/" target="_blank">FullContact</a>、<a href="https://clearbit.com/" target="_blank">Clearbit</a> 這類外部 API 以擷取資料，接著把額外資訊寫入每位透過 Authgear 註冊的使用者 User Profile。你也可以把這些資料整合到既有使用者的 profile custom attributes 中，特別是對那些正在登入但缺少特定資訊的使用者。

Hooks 是以 **JavaScript / TypeScript** 撰寫的程式碼片段，會在身分流程中的特定 <a href="https://docs.authgear.com/integrate/events-hooks/event-list" target="_blank">Events</a> 觸發，例如使用者登入、註冊帳號，或更新個人檔案時都會觸發新事件。

預設情況下，Authgear 提供了 <a href="https://docs.authgear.com/integrate/user-profile#standard-attributes" target="_blank">standard attributes</a>，在 <a href="https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims" target="_blank">OIDC specification</a> 預先定義的欄位中包含姓名、Email、最近一次登入時間戳等基本資訊。你可以在 <a href="https://docs.authgear.com/integrate/user-profile#standard-attributes" target="_blank">這裡</a> 查看完整欄位清單。你可以用<a href="https://docs.authgear.com/how-to-guide/integration/access-user-profiles" target="_blank">不同方式</a>存取使用者檔案，也可以在 <a href="https://portal.authgear.com/" target="_blank">Authgear</a> 介面和透過 Hooks 程式化地在 custom attributes 區段<a href="https://docs.authgear.com/integrate/user-profile#add-new-attributes" target="_blank">新增新欄位</a>。

<!--FIGURE-->
![](./figure-2.webp)
<!--/FIGURE-->

## 使用 Authgear 進行 profile enrichment 的範例

假設你希望取得比使用者初次註冊時提供的基本資訊更細緻的資料。在這種情況下，你可以使用 Hook。這個 Hook 可以在使用者建立帳號後立刻執行（使用 <a href="https://docs.authgear.com/integrate/events-hooks/event-list#user.pre_create" target="_blank">user.pre_create</a> event），並串接地理位置資料 API 來蒐集更多人口統計資訊：城市、國家與時區。接著，Hook 會把這些額外資訊寫入**使用者檔案 custom attributes**。以下是實作步驟：

Step 1. 請先確認你有 Authgear 帳號。若還沒有，可到 Authgear 官網<a href="https://accounts.portal.authgear.com/signup" target="_blank">免費建立</a>。接著登入你的 <a href="https://portal.authgear.com/" target="_blank">Authgear dashboard</a>，這是你管理 App 驗證功能的控制中心。

Step 2. 前往 **User Profile** → **Custom Attributes** 頁面。

Step 3. 在該頁新增 3 個欄位，分別是 *city*、*name*、*timezone*：

<!--FIGURE-->
![](./figure-3.webp)
<!--/FIGURE-->

Step 4. 前往 Authgear Dashboard 的 **Advanced**->**Hooks** 區段。

Step 5.**Add** 一個新的 **Blocking Event**。

Step 6. 將 Block Hook **Type** 選為 *TypeSctipt*，並將 Event 設為 *User* *pre-create*。接著你會從零開始撰寫一個新的 Typescript function。

Step 7. 在 **Config** 選項下點擊 **Edit Script**。

Step 8. 在編輯器中撰寫如何整合外部 API 來填入 custom attributes 的函式邏輯。範例如下：

```

export default async function(e: EventUserPreCreate): Promise
			<hookresponse> {
  // API Key for IP Geolocation
  const apiKey = 'MY_API_KEY';
  // Any random IP address
	const ipAddress = '8.8.8.8' 

  // Fetch data from the IP Geolocation API
  const response = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${ipAddress}`);
  const data = await response.json();

return {
    is_allowed: true,
    mutations:{
      user: {
          custom_attributes: {
            "city": data.city, 
            "country": data.country_name,
            "timezone": data.time_zone.name
        }
      }
    },
  };
}
  
			</hookresponse>
```

Step 9. 現在你可以前往 **User Management** 並 **Add** 一位新使用者。

<!--FIGURE-->
![](./figure-4.webp)
<!--/FIGURE-->

Step 10. 建立使用者後，你應該可以看到該使用者的 custom attributes 值已更新：

<!--FIGURE-->
![](./figure-5.webp)
<!--/FIGURE-->

## Progressive Profiling

一次要求太多資訊會讓使用者感到負擔。**Progressive profiling** 是另一種聰明的方式，能逐步了解你的客戶。你不需要在使用者**首次註冊**時就丟出大量問題，而是在每次登入或更新個人檔案時，只提出少量問題。將 progressive profiling 與 Authgear 搭配使用，可以透過縮短註冊表單、避免反覆詢問相同問題、蒐集更有用的資訊，以及協助更多使用者完成註冊，來改善整體體驗。

## Summary

Profile Enrichment 在有效運用時，能為企業帶來顯著效益。它有助於與客戶建立更深層的連結，進而帶來更好的使用者體驗、更有效的行銷，以及更高的客戶忠誠度。

### Related resources

- <a href="/zh-hant/post/authentication-as-a-service" target="_blank">Authentication-as-a-Service: What Is It and Why You Need It</a>
- <a href="/zh-hant/post/frictionless-authentication" target="_blank">Frictionless Authentication: What Is It & How To Implement It?</a>

### Recommended content

- <a href="/zh-hant/post/simplifying-authentication-integration-with-authgear-sdks" target="_blank">Simplifying Authentication Integration For Developers With Authgear SDKs</a>
- <a href="/zh-hant/post/social-login-guide" target="_blank">Social Login - Why You Should Implement It</a>

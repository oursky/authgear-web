---
title: "使用 Authgear 和 OpenID Connect 對 ASP.NET 應用程式進行身份驗證"
excerpt: "這篇部落格文章示範如何透過實作 OpenID Connect 流程，使用 Authgear 將驗證功能新增至 ASP.NET 應用程式。"
coverImage: ./cover.webp
category: engineering
featured: false
metaTitle: "使用 Authgear 和 OpenID Connect 對 ASP.NET 應用程式進行身份驗證"
metaDescription: "這篇部落格文章示範如何透過實作 OpenID Connect 流程，使用 Authgear 將驗證功能新增至 ASP.NET 應用程式。"
publishedAt: 2023-08-15T10:53:36.816Z
updatedAt: 2026-02-12T02:33:17.669Z
draft: false
---

<a href="/zh-hant/" target="_blank">Authgear</a> 充當 IAM 提供者，它是您以 Web 和行動應用程式、API 等形式提供給客戶的資源**的看門人。看門人啟動授權，如 <a href="https://oauth.net/2/" target="_blank">OAuth 2.0</a>。添加的 <a href="https://openid.net/developers/how-connect-works/" target="_blank">OpenID 連接</a> 層添加身份驗證以保護使用者的數位身分和產品。

這篇部落格文章提供了一個使用 [網路平台](http://ASP.NET) 創建的基本演示 Web 應用程序，並演示瞭如何添加身份驗證功能 <a href="/zh-hant/" target="_blank">Authgear</a> 透過實作 [OpenID 連線](https://docs.authgear.com/concepts/identity-fundamentals#open-id-connect) 流程，然後擷取 OAuth 令牌，以便呼叫 API。看法 <a href="https://github.com/authgear/authgear-example-dotnet/blob/main/README.md" target="_blank">執行</a> 在 GitHub 上。

## 學習目標

您將在整篇文章中了解到以下內容：

- 如何新增使用者登入、註冊和登出 <a href="http://ASP.NET" target="_blank">網路平台</a> 核心應用程式。
- 如何使用 <a href="http://ASP.NET" target="_blank">網路平台</a> 核心授權中介軟體保護 <a href="http://ASP.NET" target="_blank">網路平台</a> 核心申請路線。

## [網路平台](http://ASP.NET) Core App新增認證

## **先決條件**

在開始之前，您將需要以下內容：

- **免費的 Authgear 帳號**。 <a href="https://oursky.typeform.com/to/S5lvI8rN" target="_blank">報名</a> 如果您還沒有的話。
- <a href="https://dotnet.microsoft.com/en-us/download" target="_blank">.NET 7</a> 下載並安裝在您的電腦上。您也可以使用 <a href="https://visualstudio.microsoft.com/" target="_blank">視覺工作室</a> 和 <a href="https://code.visualstudio.com/" target="_blank">VS程式碼</a> 自動偵測 .NET 版本。

## 第 1 部分：配置 Authgear

要使用 Authgear 服務，您需要在 Authgear 中設定一個應用程式 <a href="https://portal.authgearapps.com/" target="_blank">儀表板</a>。您可以在 Authgear 應用程式中設定如何驗證和管理使用者。

### 第 1 步：配置應用程式

使用互動式選擇器建立新的**Authgear OIDC 用戶端應用程式**或選擇代表您要整合的專案的現有應用程式。

<!--FIGURE-->
![](./figure-1.webp)
<!--/FIGURE-->

Authgear 中的每個應用程式都指派一個字母數字的唯一客戶端 ID，您的應用程式程式碼將使用該 ID 透過 .NET 應用程式中的 OpenID Connect 用戶端呼叫 Authgear API。記下 Authgear ISSUER（例如，[https://example-auth.authgear-apps.com](https://example-auth.authgear-apps.com)）、CLIENT ID、CLIENT SECRET 和 OpenID 令牌端點（<a href="https://example-auth.authgear-apps.com/oauth2/token" target="_blank">https://example-auth.authgear-apps.com/oauth2/token</a>）從輸出。您將在客戶端應用程式配置的下一步中使用這些值。

<!--FIGURE-->
![](./figure-2.webp)
<!--/FIGURE-->

### 步驟 2：設定**重定向 URI**

應用程式的 **重定向 URI** 是 Authgear 在使用者進行身份驗證後將重定向到的 URL，以便 **OpenID Connect 中間件** 完成身份驗證程序。在我們的例子中，它將是我們的主頁 <a href="http://ASP.NET" target="_blank">網路平台</a> 它將運行在 <a href="http://localhost:5002" target="_blank">http://本地主機:5002</a>.

設定以下重定向 URI： <a href="http://localhost:5002/signin-oidc" target="_blank">http://localhost:5002/signin-oidc</a> 如果未設置，用戶登入後將不會返回您的應用程式。

### 步驟 3：啟用訪問令牌

另外，在應用程式配置的 **存取權杖** 部分下啟用 **將 JWT 作為存取權杖** 選項：

<!--FIGURE-->
![](./figure-3.webp)
<!--/FIGURE-->

### 第四步：選擇登入方式

建立 **Authgear 應用程式**後，您可以選擇使用者需要如何**在登入頁面上進行身份驗證**。從 **身份驗證** 選項卡，導航至 **登入方法**，您可以從各種選項中選擇 **登入方法**，包括透過電子郵件、行動裝置或社交媒體，只需使用使用者名稱或您指定的自訂方法。對於此演示，我們選擇 **電子郵件+無密碼** 方法，要求使用者註冊帳戶並使用電子郵件登入。他們的電子郵件將收到一次性密碼 (OTP)，並驗證代碼以使用該應用程式。

<!--FIGURE-->
![](./figure-4.webp)
<!--/FIGURE-->

## 第 2 部分：配置 <a href="http://ASP.NET" target="_blank">網路平台</a> 使用 Authgear 的核心應用程式

本指南將為您的使用者提供一種登入您的網站的方法 <a href="http://asp.net/" target="_blank">網路平台</a> 核心應用程式。這 <a href="https://github.com/authgear/authgear-example-dotnet" target="_blank">專案原始碼</a> 可以在 GitHub 上找到。如果您熟悉這些步驟，可以跳過這一部分，克隆程式碼儲存庫並按照以下步驟運行程式碼範例 <a href="https://github.com/authgear/authgear-example-dotnet/blob/main/README.md" target="_blank">自述文件.md</a> 文件在那裡。

### 步驟1：安裝依賴項

若要將 Authgear 與 [網路平台](http://asp.net/) Core 集成，您將使用 Cookie 和 OpenID Connect (OIDC) 驗證處理程序。如果您不使用範例專案並將 Authgear 整合到您自己的現有專案中，請確保將 Microsoft.AspNetCore.Authentication.OpenIdConnect 套件新增至您的應用程式。在終端機中執行以下命令或使用編輯器在其中包含 NuGet 套件：

```

Install-Package Microsoft.AspNetCore.Authentication.OpenIdConnect
			
```

### 步驟 2：**安裝並設定 OpenID Connect 中間件**

若要在 [網路平台](http://ASP.NET) Core 應用程式中啟用驗證，請使用 OpenID Connect (OIDC) 中間件。開啟 Startup 類，在ConfigureServices 方法中新增身份驗證服務，然後呼叫AddAuthentication 方法。若要啟用 cookie 驗證，請呼叫 AddCookie 方法。接下來，透過新增方法 AddOpenIdConnect 方法實作來設定 OIDC 驗證處理程序。配置其他參數，例如 *Issuer、ClientId、ClientSecret 和 Scope*。套用這些變更後 Startup.cs 的外觀如下：

```

public class Startup
 {

     public IWebHostEnvironment Environment { get; }
     public IConfiguration Configuration { get; }

     public Startup(IWebHostEnvironment environment, IConfiguration config)
     {
         Environment = environment;
         Configuration = config;
     }

     // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
     public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
     {
         app.UseRouting();
         app.UseAuthentication();
         app.UseAuthorization();
         app.UseEndpoints(endpoints =>
         {
             endpoints.MapRazorPages();
         });
     }

     public void ConfigureServices(IServiceCollection services)
     {
         // Prevent WS-Federation claim names being written to tokens
         JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

         services.AddAuthentication(options =>
         {
             options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
             options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
         })
         .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, options =>
         {
             // Use the strongest setting in production, which also enables HTTP on developer workstations
             options.Cookie.SameSite = SameSiteMode.Strict;
         })
         .AddOpenIdConnect(options =>
         {

             // Use the same settings for temporary cookies
             options.NonceCookie.SameSite = SameSiteMode.Strict;
             options.CorrelationCookie.SameSite = SameSiteMode.Strict;

             // Set the main OpenID Connect settings
             options.Authority = Configuration.GetValue<string>("OpenIdConnect:Issuer");
             options.ClientId = Configuration.GetValue<string>("OpenIdConnect:ClientId");
             options.ClientSecret = Configuration.GetValue<string>("OpenIdConnect:ClientSecret");
             options.ResponseType = OpenIdConnectResponseType.Code;
             options.ResponseMode = OpenIdConnectResponseMode.Query;
             string scopeString = Configuration.GetValue<string>("OpenIDConnect:Scope");
             options.Scope.Clear();
             scopeString.Split(" ", StringSplitOptions.TrimEntries).ToList().ForEach(scope =>
             {
                 options.Scope.Add(scope);
             });

             // If required, override the issuer and audience used to validate ID tokens
             options.TokenValidationParameters = new TokenValidationParameters
             {
                 ValidIssuer = options.Authority,
                 ValidAudience = options.ClientId
             };

             // This example gets user information for display from the user info endpoint
             options.GetClaimsFromUserInfoEndpoint = true;

             // Handle the post logout redirect URI
             options.Events.OnRedirectToIdentityProviderForSignOut = (context) =>
             {
                 context.ProtocolMessage.PostLogoutRedirectUri = Configuration.GetValue<string>("OpenIdConnect:PostLogoutRedirectUri");
                 return Task.CompletedTask;
             };

             // Save tokens issued to encrypted cookies
             options.SaveTokens = true;

             // Set this in developer setups if the OpenID Provider uses plain HTTP
             options.RequireHttpsMetadata = false;
         });

         services.AddAuthorization();
         services.AddRazorPages();

         // Add this app's types to dependency injection
         services.AddSingleton<tokenclient>();
     }
 }
			</tokenclient></string></string></string></string></string>
```

### 步驟3：新增受保護資源

假設有一個受保護的資源，例如 Razor 頁面 Protected.cshtml，用於表示視圖：

```

page "/protected"
model ProtectedModel

addTagHelper*, Microsoft.AspNetCore.Mvc.TagHelpers

<h1>Protected View</h1>

<h3>
    <p>Welcome: &Model.Username</a>
    <p>Current Access Token: &Model.AccessToken</a>
    <p>Current Refresh Token: &Model.RefreshToken</a>
    
    <form method="post">
        <p><button value="RefreshToken" asp-page-handler="RefreshToken">Refresh Token</button></p>
        <p><button value="Logout" asp-page-handler="Logout">Logout</button></p>
    </form>
</h3>
			
```

應用了 Authorize 屬性的 ProtectedModel.cs 類別需要授權。

```

[Authorize]
public class ProtectedModel : PageModel
{
    public string Username { get; set; }
    public string AccessToken { get; set; }
    public string RefreshToken { get; set; }

    private readonly TokenClient tokenClient;

    public ProtectedModel(TokenClient tokenClient)
    {
        this.tokenClient = tokenClient;
    }

    public async Task OnGet()
    {
        ClaimsPrincipal user = this.User;
        var givenName = user.FindFirstValue("given_name");
        var familyName = user.FindFirstValue("family_name");
        this.Username = $"{givenName} {familyName}";

        this.AccessToken = await this.tokenClient.GetAccessToken(this.HttpContext);
        this.RefreshToken = await this.tokenClient.GetRefreshToken(this.HttpContext);
    }

    public async Task<iactionresult> OnPostRefreshToken()
    {
        await this.tokenClient.RefreshAccessToken(this.HttpContext);
        this.AccessToken = await this.tokenClient.GetAccessToken(this.HttpContext);
        this.RefreshToken = await this.tokenClient.GetRefreshToken(this.HttpContext);
        return Page();
    }

    public async Task OnPostLogout()
    {
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        await HttpContext.SignOutAsync(OpenIdConnectDefaults.AuthenticationScheme);
    }
}
			</iactionresult>
```

要查看受保護的數據，使用者需要透過 Authgear 完成身份驗證過程。

<!--FIGURE-->
![](./figure-5.webp)
<!--/FIGURE-->

如果使用者尚未進行身份驗證，則會呈現 Unauthenticated.chtml 頁面，觸發 OpenID Connect 重定向串流，且使用者需要透過 Authgear 登入頁面進行身份驗證。請參閱**運行應用程式**部分

身份驗證成功後，您應該會看到受保護的頁面，其中包含以下詳細資訊：

<!--FIGURE-->
![](./figure-6.webp)
<!--/FIGURE-->

### 第 4 步：設定並運行應用程式

首先將項目克隆到本地計算機中：

```

git clone
			
```

將專案目錄設定為目前工作目錄：

```

cd authgear-example-dotnet
			
```

使用 **第 1 部分** 中的 Authgear 應用程式設定值（例如 Issuer、ClientId、ClientSecret 和 Authgear 端點）更新 appsettings.json 檔案中的下列配置變數：

```

{
    "OpenIDConnect": {
        "ClientId": "{your-client-id}",
        "ClientSecret": "{your-client-secret}",
        "Issuer": "{your-authgear-app-endpoint}",
        "Scope": "openid",
        "PostLogoutRedirectUri": "http://localhost:5002",
        "TokenEndpoint": "{your-authgear-app-endpoint}/oauth2/token"
    },
    "Urls": "http://localhost:5002",
    "Logging": {
        "LogLevel": {
            "Default": "Information",
            "Microsoft": "Warning",
            "Microsoft.Hosting.Lifetime": "Information"
        }
    }
}
			
```

執行以下命令來運行 <a href="http://asp.net/" target="_blank">網路平台</a> 核心網路應用程式：

dotnet 建置 dotnet 運行

您現在可以訪問 <a href="http://localhost:5002" target="_blank">http://本地主機:5002</a> 訪問該應用程式。當您按一下 **「查看受保護的資料」** 按鈕時， <a href="http://ASP.NET" target="_blank">網路平台</a> Core 將您帶到 **Authgear 的登入頁面**。

<!--FIGURE-->
![](./figure-7.webp)
<!--/FIGURE-->

您的用戶可以透過 Authgear 託管的頁面登入您的應用程序，該頁面為他們提供安全、基於標準的登入體驗，您可以使用自己的品牌和各種身份驗證方法進行自訂，例如 <a href="/zh-hant/features/social-login" target="_blank">社群登入</a>, <a href="/zh-hant/features/passwordless-authentication" target="_blank">無密碼</a>, [生物登錄](/zh-hant/features/biometric-authentication), <a href="/zh-hant/features/whatsapp-otp" target="_blank">一次性密碼 (OTP)</a> 具有 SMS/WhatsApp 和多重身份驗證 (MFA)。

<!--FIGURE-->
![](./figure-8.webp)
<!--/FIGURE-->

經過身份驗證後，將呈現受保護的視圖。應用程式接收一個存取令牌，用於在螢幕上呈現使用者數據，以及可在對某些後端 API 的上游請求中使用的令牌，以代表使用者存取資料。

<!--FIGURE-->
![](./figure-9.webp)
<!--/FIGURE-->

### 後續步驟

本教學課程展示如何使用 Authgear 在 .NET 中快速實作端對端 OpenID Connect 流程。只需要簡單的程式碼，然後使用內建 UI 登入頁面來保護受保護的視圖。

---
title: "10 分鐘內為 React Native App 加入使用者驗證"
excerpt: "本篇教你如何在 10 分鐘內，為任何 React Native 應用快速加入完整的使用者驗證功能。"
coverImage: ./cover.webp
category: engineering
featured: false
metaTitle: "10 分鐘內為 React Native App 加入使用者驗證"
metaDescription: "本篇教你如何在 10 分鐘內，為任何 React Native 應用快速加入完整的使用者驗證功能。"
publishedAt: 2024-08-01T11:19:27.895Z
updatedAt: 2026-02-12T02:35:14.203Z
draft: false
---

React Native 應用程式中使用者驗證的簡單定義是一項功能，允許應用程式的使用者使用使用者名稱和密碼註冊，然後使用相同的詳細資訊登入以存取其他功能。使用者身份驗證是任何現代應用程式的重要組成部分，它為每個使用者提供個人化或自訂體驗。  例如，如果您正在建立電子商務應用程序，添加身份驗證可以更輕鬆地保存用戶的購物車和購買歷史記錄。

在這篇文章中，您將在 10 分鐘內了解如何為 React Native 應用程式新增身份驗證。

在這篇文章中，我們將使用身分驗證即服務解決方案 Authgear，為您節省與建置後端服務相關的壓力、時間和成本，以保存使用者的登入詳細資訊和處理身分驗證邏輯。 Authgear 可以快速、安全地向 React Native 應用程式新增使用者驗證。

## 先決條件

要無縫地遵循本指南，您應該具備以下條件：

- 您的電腦上安裝了 Node.js（版本 18.20.4 或更高版本）。
- Android 或 iOS 開發 在您的電腦上設定。有關更多詳細信息，請參閱官方 React Native 文件的 [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) 部分。
- 程式碼編輯器（例如 Visual Studio Code）

## 步驟：如何為 React Native 新增使用者驗證

在下一節中，我們將提供建立一個簡單的 React Native 應用程式的逐步指南，該應用程式具有一個登入按鈕，使用者可以點擊該按鈕來開始身份驗證。用戶成功登入後，他們將被重定向回應用程序，並顯示自訂歡迎訊息。

以下螢幕截圖顯示了帶有上述登入按鈕的歡迎畫面：

<!--FIGURE-->
![](./figure-1.webp)
<!--/FIGURE-->

在底層，Authgear 使用 [OpenID Connect](https://docs.authgear.com/how-to-guide/authenticate/oidc-provider) (OIDC) 驗證協定。因此，在身份驗證期間，使用者將被重定向到授權頁面，然後在授權完成後重定向回客戶端應用程式（您的 React Native 應用程式）。

下面的流程圖解釋了 OIDC 的工作原理。

<!--FIGURE-->
![](./figure-2.webp)
<!--/FIGURE-->

### 1.建立React Native專案或使用現有項目

首先，您需要建立要新增使用者驗證的 React Native 專案。如果您已有 React Native 項目，則可以跳過此步驟。

若要建立新的 React Native 項目，請從要儲存項目的目錄執行以下命令：

```
npx react-native init reactnativeauth 
```

如果提示安裝react-native，請輸入「y」並按Enter鍵繼續。

等待項目創建過程完成。

### 2. 將 Authgear RN SDK 新增到您的 React Native 項目

現在您已經有了一個 React Native 項目，您可以在其中新增 Authgear SDK。我們之前提到，Authgear 是一種身份驗證即服務解決方案，可以輕鬆快速地在 React Native 應用程式中新增安全性身份驗證。

在繼續之前，如果您在上一個步驟中建立了新項目，請將 **App.tsx** 的內容更新為以下內容，請刪除預設的 React Native 入門應用程式畫面：

```

import React, {useCallback} from 'react';
import {Alert, Button, Text, View} from 'react-native';

function App(): React.JSX.Element {
  return &#60;LoginScreen /&#62;;
}

function LoginScreen() {
  const initiateAuthentication = useCallback(() => {
    // Normally you should only configure once when the app launches.
    // TODO
  }, []);

  return (
    &#60;View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      &#60;Text style={{fontSize: 48}}>Demo&#60;/Text&#62;
      &#60;Text>A simple authentication example. Click login to continue.&#60;/Text&#62;
      &#60;Button title="Login" onPress={initiateAuthentication} /&#62;
    &#60;/View&#62;
  );
}

export default App;

```

透過從 React Native 專案的根目錄執行以下命令來安裝 Authgear SDK：

```
npm install @authgear/react-native
```

### 3.配置Authgear

接下來，使用 Authgear 應用程式中的憑證來設定 Authgear SDK。要取得憑證，您需要 [sign up](https://accounts.portal.authgear.com/signup) 取得 Authgear 帳戶並建立一個應用程式。

您可以透過導覽至 **應用程式** > **新增應用程式** 在 Authgear 入口網站上建立應用程式。然後選擇**本機應用程式**並點擊**儲存**。

<!--FIGURE-->
![](./figure-3.webp)
<!--/FIGURE-->

建立完 Authgear 應用程式後，您將被重定向到應用程式的設定頁面，您可以在其中找到您的憑證並設定 **授權重定向 URI**。授權重定向 URI 是應用程式上的一個有效頁面，Authgear 可以在授權後將使用者重新導向到該頁面。 Authgear SDK 將在您的 React Native 專案中建立此頁面。

對於此範例，請新增 *com.reactnativeauth://host/path* 作為授權重定向 URI。在您自己的個人或工作項目中，此值可能是您的應用程式的 **{namespace}://host/path** （您可以在 **android/app/build.gradle** 中找到 **namespace**）。

現在，更新 **App.tsx** 以包含 Authgear 應用程式的用戶端 ID 和 [endpoint](https://docs.authgear.com/reference/glossary#your-authgear-endpoint)。

首先，在 App.tsx 中找到以下行：

```
// TODO 
```

將上面的行替換為以下程式碼：

```

authgear
  .configure({
    clientID: '&#60;YOUR_CLIENT_ID&#62;',
    endpoint: '&#60;YOUR_AUTHGEAR_ENDPOINT&#62;',
  })
  .then(() => {
    authgear
      .authenticate({
        redirectURI: 'com.reactnativeauth://host/path',
      })
      .then(({userInfo}) => {
        Alert.alert('Login successful, welcome ' + userInfo.email);
      });
  });

```

將 **YOUR_CLIENT_ID** 和 **YOUR_AUTHGEAR_ENDPOINT** 替換為您的 Authgear 應用程式的正確值。

### 4. 實作授權重定向 URI

為了使您的應用程式能夠在使用者完成身份驗證時處理重定向，您需要更改專案的特定於平台（iOS 和 Android）的配置。

**安卓**

對於 Android，打開 android/app/src/main/AndroidManifest.xml 檔案並在 <application> 標記內新增以下程式碼，如下所示：

```

&#60;application&#62;
  &#60;activity android:name="com.authgear.reactnative.OAuthRedirectActivity"
      android:exported="true"
      android:launchMode="singleTask"&#62;
      &#60;intent-filter&#62;
          &#60;action android:name="android.intent.action.VIEW" /&#62;
          &#60;category android:name="android.intent.category.DEFAULT" /&#62;
          &#60;category android:name="android.intent.category.BROWSABLE" /&#62;
          &#60;!-- Configure data to be the exact redirect URI your app uses. --&#62;
          &#60;!-- NOTE: The redirectURI supplied in AuthenticateOptions *has* to match as well --&#62;
          &#60;data android:scheme="com.reactnativeauth"
              android:host="host"
              android:pathPrefix="/path"/&#62;
      &#60;/intent-filter&#62;
  &#60;/activity&#62;
&#60;/application&#62;

```

另外，請在 **AndroidManifest.xml 中包含以下查詢部分（**Android API 等級 30 或更高版本（即 Android 11 或更高版本）需要）：

```

&#60;?xml version="1.0" encoding="utf-8"?&#62;
&#60;manifest xmlns:android="http://schemas.android.com/apk/res/android"&#62;
  <!-- Other elements such <application> -->
  &#60;queries&#62;
    &#60;intent&#62;
      &#60;action android:name="android.support.customtabs.action.CustomTabsService" /&#62;
    &#60;/intent&#62;
  &#60;/queries&#62;
&#60;/manifest&#62;

```

**iOS**

對於 iOS，在 **ios/reactnativeauth/Info.plist** 中新增符合的重定向 URI，如下所示：

```

&#60;?xml version="1.0" encoding="UTF-8"?&#62;
&#60;!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd"&#62;
&#60;plist version="1.0"&#62;
&#60;dict&#62;
      <!-- Other entries -->
      &#60;key&#62;CFBundleURLTypes&#60;/key&#62;
      &#60;array&#62;
              &#60;dict&#62;
                      &#60;key&#62;CFBundleTypeRole&#60;/key&#62;
                      &#60;string&#62;Editor&#60;/string&#62;
                      &#60;key&#62;CFBundleURLSchemes&#60;/key&#62;
                      &#60;array&#62;
                              &#60;string&#62;com.reactnativeauth&#60;/string&#62;
                      &#60;/array&#62;
              &#60;/dict&#62;
      &#60;/array&#62;
&#60;/dict&#62;
&#60;/plist&#62;

```

接下來，透過將以下程式碼新增至 **ios/reactnativeauth/AppDelegate.mm** 來插入 SDK 整合程式碼：

```

// Other imports...
#import &#60;authgear-react-native/AGAuthgearReactNative.h&#62;

// Other methods...

// For handling deeplink
- (BOOL)application:(UIApplication *)app
            openURL:(NSURL *)url
            options:
                (NSDictionary&#60;UIApplicationOpenURLOptionsKey, id&#62; *)options {
    return [AGAuthgearReactNative application:app openURL:url options:options];
}

// For handling deeplink
// deprecated, for supporting older devices (iOS &#60; 9.0)
- (BOOL)application:(UIApplication *)application
              openURL:(NSURL *)url
    sourceApplication:(NSString *)sourceApplication
          annotation:(id)annotation {
    return [AGAuthgearReactNative application:application
                                      openURL:url
                            sourceApplication:sourceApplication
                                  annotation:annotation];
}

// for handling universal link
- (BOOL)application:(UIApplication *)application
    continueUserActivity:(NSUserActivity *)userActivity
      restorationHandler:
          (void (^)(NSArray&#60;id&#60;UIUserActivityRestoring&#62;&#62; *_Nullable))
              restorationHandler {
    return [AGAuthgearReactNative application:application
                        continueUserActivity:userActivity
                          restorationHandler:restorationHandler];
}

```

### 5. 測試您的應用程式

如果您正確執行了上述步驟，現在應該能夠在您的應用程式上測試使用者身份驗證。

要測試您的應用程序，請執行 **npm start** 命令，然後按鍵盤上的 **“a”** 鍵（對於 Android）或 **“i”** 鍵（對於 iOS）。

您應該會看到歡迎畫面和登入按鈕。

點選登入按鈕啟動身份驗證會話。您將被重新導向至 Authgear 的安全身份驗證使用者介面 (AuthUI)，您的使用者可以在其中註冊新帳戶或登入他們建立的帳戶。

<!--FIGURE-->
![](./figure-4.webp)
<!--/FIGURE-->

成功登入後，用戶將被重定向回您的應用程序，並顯示我們添加到本教程範例程式碼中的歡迎訊息。如果您研究程式碼，您也會注意到 Authgear SDK 傳回的 **userInfo** 對象，您可以使用此對象取得目前使用者的詳細資訊。在我們的範例中，我們使用 **userInfo.email** 來顯示目前使用者的電子郵件地址。

<!--FIGURE-->
![](./figure-5.webp)
<!--/FIGURE-->

## 結論

透過上述步驟，我們已經能夠快速地在 React Native 應用程式中添加身份驗證，而無需建立自己的後端。

Authgear 提供稱為 AuthUI 的預先建置登入和註冊畫面。此外，您還可以在 Authgear 入口網站中自訂 AuthUI，以符合應用程式品牌的其餘部分。

您可以使用 Authgear Portal 執行更多操作來自訂您的應用程式並管理您的使用者。

最後，Authgear 擁有 API 和登入方法（例如 [biometric](https://docs.authgear.com/how-to-guide/authenticate/biometric)、OTP、TOTP 等），讓開發人員可以建立更多自訂體驗。要了解有關 Authgear 的更多信息，請查看我們的 [official documentation](https://docs.authgear.com/) 或加入我們的 [discord server](https://discord.gg/Kdn5vcYwAS)，向我們熱衷於身份驗證的開發人員社區提出問題並獲得答案。

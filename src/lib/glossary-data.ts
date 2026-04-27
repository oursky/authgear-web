import type { Locale } from '@/lib/i18n';

export interface GlossaryEntry {
  term: string;
  /** HTML body (allowed: <br>, <strong>, <span>, <a>, <em>). */
  body: string;
  /** Optional internal link wrapping the term heading. */
  link?: string;
}

export interface GlossarySection {
  letter: string;
  entries: GlossaryEntry[];
}

export const ALPHABET = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'] as const;

const en: GlossarySection[] = [
  {
    letter: 'A',
    entries: [
      { term: 'Access token', body: 'An access token is a credential that a client application uses to authenticate on behalf of the users to access resources on a backend server. In a logged-in session, the requests from the client application to the backend servers should contain an access token. An access token can be in different formats, but JWT is a common choice.' },
      { term: 'Admin API', body: 'The Admin API provides a GraphQL interface for developers to interact with services and data on Authgear from their own code or a custom application.<br /><br />You can also inspect the GraphQL schema and build queries and mutations with the GraphiQL Explorer in the Authgear portal.' },
      { term: 'Anonymous Users', body: 'Anonymous users are users who do not have any identity (e.g. email or phone number) attached to their account. However, they can be later promoted to normal users.<br /><br />This concept makes it possible to create a temporary account for guests on your website or application so that they can access features before they sign up using their email or phone number. When you promote an anonymous user, the value of their <strong>sub</strong> (User ID) remains the same, and as a result, you can easily link their previous activities after they sign up.' },
      { term: 'Auth UI', body: 'By default, Authgear provides a customizable User Interface (UI) for login, user registration, and profile settings pages for your project. These pages make up what is referred to as Auth UI.' },
      { term: 'Audit Logs', body: 'There are two types of Audit logs in Authgear. "Audit Log For Users Activities" allows you to monitor the changes and actions of your end-users, such as added phone number, logged in, logged out. While "Audit Log For Admin API" lets you analyze the activities that occur on Admin API and the Authgear Portal of your project.' },
      { term: 'Authgear Endpoint', body: "Your Authgear endpoint or project endpoint is the active domain name that points to your Authgear project. The Authgear endpoint has many uses. For example, you'll need it to connect a client application to your Authgear project or redirect users to your login and sign-up page. The easiest way to find out what your Authgear endpoint is is to navigate to Custom Domains in the Authgear Portal. Your endpoint is the domain in the row with a green Active status." },
      { term: 'Authentication', link: '/features/authentication', body: 'Authentication is the process of verifying the identity of a user on your application. Authgear supports different methods for authentication, including email, mobile phone, username, password, OTP, passkeys, biometric, social and enterprise login.' },
      { term: 'Authorization', link: '/features/authorization', body: "Authorization is the process of granting or denying access to resources based on the identity of a user. For example, a user may grant a client application the authorization to their own data on Authgear, this authorization may not be used to access another user's data." },
      { term: 'Authorization code', body: 'access token. In the OAuth 2.0 Authorization Code Flow, the authorization server sends this authorization code to the client via the redirect URI after the user grants the client authorization.' },
      { term: 'Authorized Redirect URIs', body: "These are the URLs that point to valid pages on the client's application that users are redirected to after auth. Usually, this is the page where you implement the code that gets the value of the authorization code from the URL parameter and initiates token exchange with the authorization code for an access token.<br /><br />In Authgear, you can also set the page to redirect anonymous users after promotion in the Authorized Redirect URIs for your project." },
    ],
  },
  {
    letter: 'B',
    entries: [
      { term: 'Biometric authentication', link: '/features/biometric-authentication', body: 'Biometric authentication allows you to authenticate users on your application using biometric attributes such as fingerprint and face scan. This makes use of the native system feature such as FaceID and keychain on iOS, and Keystore on Android. Therefore, no biometric data is stored on Authgear. This feature is only available on Android 6.0+ and iOS 11.3+.' },
      { term: 'Blocking events', body: 'Blocking events are events that are triggered before an operation such as user creation and the block of the operation from completion until the associated hook returns a JSON with is_allowed set to true.<br /><br />Examples of blocking events Authgear supports include: user.pre_create, user.profile.pre_update, user.pre_schedule_deletion, and oidc.jwt.pre_create.' },
    ],
  },
  {
    letter: 'C',
    entries: [
      { term: 'Claims', body: "Claims contain details that can be used to identify a user or application. They are typically included in the authentication tokens such as JWT and can contain details like username, scope, and role.<br /><br />See this post for instructions on how to add custom fields (details) to Authgear's JWT access token to meet your specific needs." },
      { term: 'Client ID', body: 'This is a unique string that is used to identify your Authgear application when sending requests from your client application.' },
      { term: 'Client Secret', body: "The client secret is a confidential string sent together with the client ID as credentials for authenticating your client application on Authgear's server." },
      { term: 'Cloudflare Turnstile', link: '/features/attack-protection', body: 'Turnstile is a service provided by Cloudflare that protects websites from bots and automated abuse without frustrating users with visual puzzles. It analyzes user behavior in the background to verify that a visitor is human, adapting the difficulty as needed and only requiring user interaction if suspicious activity is detected. In Authgear, Cloudflare Turnstile is one of the services you can integrate for bot protection.' },
      { term: 'Custom Attributes', body: "Custom Attributes allow you to add extra fields to the user attributes. Custom attributes can help capture extra data that isn't already included in the standard attributes." },
    ],
  },
  {
    letter: 'F',
    entries: [
      { term: 'FIDO2', link: '/features/passkeys', body: 'FIDO2 is an open authentication standard that enables secure, passwordless logins to online services by using public key cryptography instead of traditional passwords (passkeys). It allows users to authenticate with biometrics, PINs, or physical security keys, ensuring that private credentials never leave their device and making logins resistant to phishing and credential theft.' },
    ],
  },
  {
    letter: 'G',
    entries: [
      { term: 'Google reCAPTCHA', link: '/features/attack-protection', body: 'reCAPTCHA is a security service provided by Google that helps websites distinguish between human users and automated bots, protecting against spam, abuse, and fraudulent activities like credential stuffing and fake account creation. In Authgear, Google reCAPTCHA is one of the services you can integrate for bot protection.' },
      { term: 'Groups', body: 'Groups is an access management feature in Authgear that makes it possible to create one or more groups, add roles to the groups, and add users to the groups.<br /><br />If a user is in a group, all the roles for that group are returned for their profile. See our roles and group documentation to learn more about using groups.' },
    ],
  },
  {
    letter: 'J',
    entries: [
      { term: 'JWT', body: 'JWT stands for JSON Web Token. JWTs are self-contained and can be securely used to share authentication and authorization information between a server and a client.' },
      { term: 'JavaScript / TypeScript Hooks', link: '/features/extensibility', body: 'JavaScript / TypeScript hooks is a feature on the Authgear portal that allows you to write custom JavaScript / TypeScript code that will run when a specific event is triggered. This works very similar to traditional webhooks except from the fact that it eliminates the need to host your script on an external server.' },
    ],
  },
  {
    letter: 'M',
    entries: [
      { term: 'Magic link', link: '/features/passwordless-authentication', body: "Magic link, also known as Email Login Link is a type of user authentication method that uses a unique login link that's sent to a user's email instead of a traditional password." },
      { term: 'Multi-factor authentication (MFA)', link: '/features/multi-factor-authentication', body: "Multi-factor authentication, or MFA, is an application security measure that requires users to provide two or more factors to verify that it's them actually trying to access their account. For example, when an application requires a user to enter their password (something they know) and an OTP sent to their phone (something they have)." },
      { term: 'Machine-to-Machine Token', link: '/features/machine-to-machine-token', body: "Machine-to-machine (M2M) tokens are access tokens used by software systems or devices to authenticate and authorize themselves when communicating with other machines, without human involvement. These tokens are typically issued through protocols like OAuth 2.0's Client Credentials flow, allowing trusted services to securely access protected resources by presenting the token in API requests." },
    ],
  },
  {
    letter: 'N',
    entries: [
      { term: 'Non-Blocking Events', link: '/features/extensibility', body: "Non-blocking events are hook events that don't block the operations that trigger them. You can get notified and invoke custom logic when an event happens in Authgear." },
    ],
  },
  {
    letter: 'O',
    entries: [
      { term: 'One-Time Password (OTP)', link: '/features/multi-factor-authentication', body: 'A one-time password (OTP) is a unique, automatically generated code that is valid for only a single login session or transaction, providing an extra layer of security compared to static passwords. OTPs are typically delivered via SMS, email, or authenticator apps, and are widely used in multi-factor authentication to help prevent unauthorized access and reduce the risk of password reuse or interception.' },
      { term: 'OAuth', body: 'OAuth is an open authorization standard that makes it possible for users to securely grant third-party applications access to their profile and data without requiring their password.<br /><br />Authgear supports the OAuth 2.0 standard and you can use it to access your user\'s data from your custom application.' },
      { term: 'OpenID Connect (OIDC)', body: 'OpenID Connect (OIDC) is an authentication protocol based on the OAuth 2.0 standard. It makes it possible for applications to verify the identity of a user using data from an authorization provider.<br /><br />You can use Authgear as an OpenID Connect provider to enable user authentication on your application without having to store or manage user passwords on your application.' },
    ],
  },
  {
    letter: 'P',
    entries: [
      { term: 'Passkey', link: '/features/passkeys', body: "The use of passkeys is a modern method of passwordless login. When using passkeys, the user's browser or operating system helps them select the current passkey associated with their account on a website or application. Passkey verifies the user using biometrics or PIN on their device and can replace traditional OTP or biometric login." },
      { term: 'Passwordless', link: '/features/passwordless-authentication', body: 'This refers to any login method that does not require the user to remember and enter a password. For example, using a one-time code or link to verify the identity of a user.' },
      { term: 'Project', body: 'Your Authgear project is a container that holds all the configuration and data associated with your implementation of Authgear. You can create multiple projects for multiple implementations to separate their configuration and data. Each project has a unique URL that you can use to interact with it.' },
    ],
  },
  {
    letter: 'R',
    entries: [
      { term: 'Role-Based Access Control (RBAC)', link: '/post/what-is-role-based-access-control-rbac-benefits-comparisons-and-best-practices', body: "Role-based access control (RBAC) is a security model that manages user access to systems, applications, and data by assigning permissions based on a user's predefined role within an organization. Instead of configuring permissions for each individual, RBAC groups users by roles—such as administrator, HR manager, or end-user—and grants access rights according to the responsibilities and requirements of those roles, simplifying administration and enhancing security by enforcing the principle of least privilege." },
      { term: 'Roles', body: "Roles can be assigned to a user in Authgear for RBAC. Roles are returned using the <a href=\"#\">https://authgear.com/claims/user/roles</a> attribute in Authgear's JWT access token and UserInfo as an array." },
      { term: 'Reauthentication', body: "Reauthentication is the process of verifying the identity of a user that's already authenticated before they can perform sensitive operations. This process can help improve security by making sure a user doesn't perform sensitive operations with old grants that might have been compromised." },
      { term: 'Refresh token', body: 'A refresh token is a special token that can be used to obtain a new access token without having to re-authenticate a user.' },
    ],
  },
  {
    letter: 'S',
    entries: [
      { term: 'SAML', link: '/post/oidc-vs-saml', body: 'SAML (Security Assertion Markup Language) is an open standard that enables secure exchange of authentication and authorization data between an identity provider (IdP) and a service provider (SP), most commonly to facilitate single sign-on (SSO) across multiple web applications. It uses XML-based assertions to communicate user identity and access rights, allowing users to authenticate once and access multiple services without needing to log in again for each one.' },
      { term: 'SDK', body: 'SDK stands for Software Development Kit. It is a set of tools and code that developers can use to build and debug their own applications for a target platform. Authgear provides SDKs for adding Authentication to your own application using popular languages, frameworks, and platforms like JavaScript/React-native, Android, iOS, Flutter, and Xamarin.' },
      { term: 'Single sign-on (SSO)', link: '/features/single-sign-on', body: 'Single sign-on, or in short SSO, is an authentication method that allows users to log in once and access multiple application applications without needing to log in again for each one.<br /><br />In Authgear, you can enable SSO for multiple applications that use the same Authgear project.' },
      { term: 'Social login', link: '/features/social-login', body: 'Authgear simplifies the process of allowing your users to sign in to your application using their existing accounts on popular social media sites like Facebook, Google, LinkedIn, Github, and Apple.<br /><br />You can enable this feature from Authentication &gt; Social / Enterprise Login in the Authgear Portal.' },
      { term: 'Standard Attributes', body: 'Standard Attributes consist of common user attributes such as email, phone number, name, gender, and birthday. Authgear determines the fields in Standard Attributes. You can view a full list of standard attributes under User Profile &gt; Standard Attributes.' },
    ],
  },
  {
    letter: 'T',
    entries: [
      { term: 'TOTP', link: '/features/multi-factor-authentication', body: "TOTP is short for Time-based One-time Password. This is a method of two-factor authentication (2FA) that requires the user to enter a time-based single-use code that's generated using a mobile app like Google Authenticator or Authy.<br /><br />The user will first need to register their device on the service they wish to log in to by scanning a QR code or entering a secret key from the service." },
    ],
  },
  {
    letter: 'U',
    entries: [
      { term: 'User Anonymization', body: 'User anonymization is the process of deleting the identity and all other data of a normal user. When you anonymize a user, only the user ID is kept. You can anonymize a user immediately or schedule their anonymization.' },
      { term: 'User Deletion', body: "User delete is the process of completely deleting a user's account account and all their associated data. This can be scheduled or done immediately." },
      { term: 'User Settings', link: '/features/self-serve-settings-page', body: 'This is one of the default pages Authgear provides as part of Auth UI. On this page, your users can view their account details and settings.' },
      { term: 'UserInfo Endpoint', body: "The UserInfo endpoint is an HTTP endpoint in your Authgear application that your client application can send requests to on behalf of an authenticated user for their account information. This endpoint returns a JSON response with data such as the user's email, and sub." },
    ],
  },
  {
    letter: 'W',
    entries: [
      { term: 'Webhooks', link: '/features/extensibility', body: 'A webhook is a method of sending notifications of events on one web application to another web application.<br /><br />Authgear webhooks can send HTTP POST requests to a URL you specify when an event like new user creation is triggered. The HTTP request contains a payload with data related to the event. Using webhooks you can implement more custom features for your Authgear project.' },
    ],
  },
  {
    letter: 'Y',
    entries: [
      { term: 'YubiKey', link: '/features/passkeys', body: 'A YubiKey is a small hardware security device developed by Yubico that provides strong authentication for computers, networks, and online services by requiring users to physically insert or tap the key to verify their identity. It supports the FIDO2 standard and ensure that access cannot be gained without the physical key, making it highly resistant to phishing and account takeovers.' },
    ],
  },
  {
    letter: 'Z',
    entries: [
      { term: 'Zero-Trust', link: '/post/securing-the-perimeterless-dive-deep-into-zero-trust-architecture-with-continuous-authentication', body: "Zero trust is a security model that assumes no user, device, or system—whether inside or outside an organisation's network—should be trusted by default, requiring strict identity verification and continuous authentication for every access request. Instead of relying on a traditional network perimeter, zero trust enforces least-privilege access, granular controls, and ongoing monitoring, aiming to minimise the risk of breaches and prevent attackers from moving laterally within the network." },
    ],
  },
];

const zhHant: GlossarySection[] = [
  {
    letter: 'A',
    entries: [
      { term: 'Access Token(存取權杖)', body: '存取權杖是用戶端應用程式代表使用者向後端伺服器存取資源時使用的憑證。在已登入的工作階段中,用戶端對後端的請求應夾帶存取權杖。存取權杖可以採用多種格式,而 JWT 是常見的選擇。' },
      { term: 'Admin API', body: 'Admin API 提供 GraphQL 介面,讓開發者可以從自己的程式碼或自訂應用程式與 Authgear 上的服務及資料互動。<br /><br />您也可以在 Authgear Portal 中使用 GraphiQL Explorer 檢視 GraphQL Schema,並建立查詢與變更操作。' },
      { term: 'Anonymous Users(匿名使用者)', body: '匿名使用者是指帳號上沒有任何身分(例如電子郵件或電話號碼)的使用者,但日後可以升級為一般使用者。<br /><br />這個概念讓您可以在網站或應用程式上為訪客建立暫時帳號,讓他們能在以電子郵件或電話號碼註冊前先體驗功能。將匿名使用者升級時,其 <strong>sub</strong>(使用者 ID)的值會保持不變,因此您可以輕鬆地在使用者註冊後串接其先前的活動紀錄。' },
      { term: 'Auth UI', body: 'Authgear 預設為您的專案提供可自訂的登入、註冊與個人資料設定頁面使用者介面(UI)。這些頁面合稱為 Auth UI。' },
      { term: 'Audit Logs(稽核紀錄)', body: 'Authgear 中有兩種稽核紀錄。「Audit Log For Users Activities」可讓您監控終端使用者的變更與行為,例如新增電話號碼、登入、登出等;而「Audit Log For Admin API」可讓您分析發生在 Admin API 與 Authgear Portal 上的活動。' },
      { term: 'Authgear Endpoint(Authgear 端點)', body: 'Authgear 端點(或專案端點)是指向您 Authgear 專案的有效網域。Authgear 端點有許多用途,例如將用戶端應用程式連線至 Authgear 專案,或將使用者導向您的登入與註冊頁面。要快速找出 Authgear 端點,可以前往 Authgear Portal 的 Custom Domains,標示為綠色 Active 狀態的網域即為您的端點。' },
      { term: 'Authentication(身份驗證)', link: '/features/authentication', body: '身份驗證是確認應用程式上使用者身分的程序。Authgear 支援多種驗證方式,包括電子郵件、行動電話、使用者名稱、密碼、OTP、Passkey、生物辨識、社交與企業登入。' },
      { term: 'Authorization(授權)', link: '/features/authorization', body: '授權是依據使用者身分決定是否允許存取資源的程序。例如使用者可以授權某個用戶端應用程式存取自己在 Authgear 上的資料,但這個授權不能用來存取其他使用者的資料。' },
      { term: 'Authorization Code(授權碼)', body: '在 OAuth 2.0 Authorization Code Flow 中,當使用者同意授權後,授權伺服器會透過 redirect URI 將授權碼傳送給用戶端,用戶端再以授權碼換取存取權杖。' },
      { term: 'Authorized Redirect URIs(授權重新導向網址)', body: '這些是用戶端應用程式中合法頁面的網址,使用者完成驗證後會被導向這些頁面。通常這是您實作從 URL 參數讀取授權碼,並使用授權碼向 Authgear 換取存取權杖的頁面。<br /><br />在 Authgear 中,您也可以在 Authorized Redirect URIs 設定匿名使用者升級後要導向的頁面。' },
    ],
  },
  {
    letter: 'B',
    entries: [
      { term: 'Biometric Authentication(生物辨識驗證)', link: '/features/biometric-authentication', body: '生物辨識驗證讓您可以使用指紋、人臉等生物特徵驗證應用程式上的使用者。它運用裝置原生功能,例如 iOS 上的 FaceID 與 Keychain、Android 上的 Keystore,因此 Authgear 不會儲存任何生物辨識資料。此功能僅在 Android 6.0+ 與 iOS 11.3+ 上可用。' },
      { term: 'Blocking Events(阻擋型事件)', body: '阻擋型事件會在使用者建立等操作執行前觸發,並會封鎖該操作直到對應的 Hook 回傳含有 is_allowed 為 true 的 JSON。<br /><br />Authgear 支援的阻擋型事件包含:user.pre_create、user.profile.pre_update、user.pre_schedule_deletion 與 oidc.jwt.pre_create 等。' },
    ],
  },
  {
    letter: 'C',
    entries: [
      { term: 'Claims', body: 'Claim 包含可用來識別使用者或應用程式的資訊,通常會夾帶在 JWT 等驗證權杖中,內容可能包含使用者名稱、scope 與角色等。<br /><br />您可以參考相關文章,將自訂欄位加入 Authgear 的 JWT 存取權杖,以滿足特定需求。' },
      { term: 'Client ID', body: '這是用來識別您 Authgear 應用程式的唯一字串,當用戶端應用程式發送請求時會帶上它。' },
      { term: 'Client Secret', body: 'Client Secret 是與 Client ID 一起傳送的機密字串,用於在 Authgear 伺服器上驗證您的用戶端應用程式。' },
      { term: 'Cloudflare Turnstile', link: '/features/attack-protection', body: 'Turnstile 是 Cloudflare 提供的服務,可在不需要使用者解圖形驗證的情況下保護網站免於機器人與自動化濫用。它會在背景分析使用者行為以判斷是否為真人,並僅在偵測到可疑行為時才要求互動。在 Authgear 中,Cloudflare Turnstile 是您可以整合用於防止機器人攻擊的服務之一。' },
      { term: 'Custom Attributes(自訂屬性)', body: '自訂屬性可讓您在使用者屬性中新增額外欄位,協助您捕捉標準屬性未包含的資料。' },
    ],
  },
  {
    letter: 'F',
    entries: [
      { term: 'FIDO2', link: '/features/passkeys', body: 'FIDO2 是一項開放的驗證標準,以公鑰密碼學取代傳統密碼(Passkey),讓使用者可以安全且無密碼地登入線上服務。它支援以生物辨識、PIN 或實體安全金鑰進行驗證,確保私鑰永不離開裝置,有效抵抗釣魚攻擊與帳密竊取。' },
    ],
  },
  {
    letter: 'G',
    entries: [
      { term: 'Google reCAPTCHA', link: '/features/attack-protection', body: 'reCAPTCHA 是 Google 提供的安全服務,協助網站區分真人使用者與自動化機器人,防止垃圾訊息、濫用以及帳密填充與假帳號等詐騙行為。在 Authgear 中,Google reCAPTCHA 是您可以整合用於防止機器人攻擊的服務之一。' },
      { term: 'Groups(群組)', body: 'Groups 是 Authgear 中的存取管理功能,可讓您建立一或多個群組、為群組指派角色,並把使用者加入群組。<br /><br />當使用者屬於某個群組時,該群組擁有的所有角色都會出現在其使用者資料中。詳情請參閱我們的 Roles 與 Groups 文件。' },
    ],
  },
  {
    letter: 'J',
    entries: [
      { term: 'JWT', body: 'JWT 為 JSON Web Token 的縮寫。JWT 是自包含的權杖,可在伺服器與用戶端之間安全地傳遞驗證與授權資訊。' },
      { term: 'JavaScript / TypeScript Hooks', link: '/features/extensibility', body: 'JavaScript / TypeScript Hooks 是 Authgear Portal 上的功能,讓您撰寫自訂的 JavaScript / TypeScript 程式碼,在特定事件觸發時執行。其運作方式與傳統 Webhook 類似,但無須將指令稿託管在外部伺服器上。' },
    ],
  },
  {
    letter: 'M',
    entries: [
      { term: 'Magic Link(魔術連結)', link: '/features/passwordless-authentication', body: 'Magic Link,又稱 Email Login Link(電子郵件登入連結),是一種免密碼的驗證方式;系統會將獨一無二的登入連結寄到使用者的電子郵件,取代傳統密碼。' },
      { term: 'Multi-factor Authentication (MFA,多因素驗證)', link: '/features/multi-factor-authentication', body: '多因素驗證(MFA)是一種應用程式安全機制,要求使用者提供兩個以上的驗證因素來證明身分。例如同時要求輸入密碼(知道的東西)以及收到的手機 OTP(擁有的東西)。' },
      { term: 'Machine-to-Machine Token(機器對機器權杖)', link: '/features/machine-to-machine-token', body: 'M2M(Machine-to-Machine)權杖是供軟體系統或裝置之間相互驗證與授權的存取權杖,過程中不需要人為介入。這類權杖通常透過 OAuth 2.0 的 Client Credentials Flow 發行,讓受信任的服務透過在 API 請求中帶上權杖來安全存取受保護資源。' },
    ],
  },
  {
    letter: 'N',
    entries: [
      { term: 'Non-Blocking Events(非阻擋型事件)', link: '/features/extensibility', body: '非阻擋型事件是不會封鎖觸發操作的 Hook 事件。當 Authgear 上發生事件時,您可以接到通知並執行自訂邏輯。' },
    ],
  },
  {
    letter: 'O',
    entries: [
      { term: 'One-Time Password(OTP,一次性密碼)', link: '/features/multi-factor-authentication', body: '一次性密碼(OTP)是自動產生、僅在單次登入工作階段或交易中有效的代碼,相較於靜態密碼提供更高安全性。OTP 通常透過 SMS、電子郵件或驗證器 App 傳送,廣泛用於多因素驗證,以降低未授權存取與密碼重複使用、攔截的風險。' },
      { term: 'OAuth', body: 'OAuth 是一項開放授權標準,讓使用者可以安全地授權第三方應用程式存取自己的個人資料與資源,而無須交出密碼。<br /><br />Authgear 支援 OAuth 2.0 標準,您可以使用它從自訂應用程式存取使用者資料。' },
      { term: 'OpenID Connect (OIDC)', body: 'OpenID Connect(OIDC)是建構於 OAuth 2.0 之上的驗證協定,讓應用程式可以透過授權提供者的資料驗證使用者身分。<br /><br />您可以將 Authgear 作為 OpenID Connect Provider,讓應用程式可以驗證使用者身分,而不需要自行儲存或管理使用者密碼。' },
    ],
  },
  {
    letter: 'P',
    entries: [
      { term: 'Passkey', link: '/features/passkeys', body: 'Passkey 是現代的免密碼登入方式。使用 Passkey 時,使用者的瀏覽器或作業系統會協助挑選與該網站或應用程式帳號對應的 Passkey,並透過裝置上的生物辨識或 PIN 驗證使用者身分,可取代傳統 OTP 或生物辨識登入。' },
      { term: 'Passwordless(免密碼)', link: '/features/passwordless-authentication', body: '泛指任何不需要使用者記住與輸入密碼的登入方式,例如以一次性代碼或登入連結驗證使用者身分。' },
      { term: 'Project(專案)', body: '您的 Authgear 專案就像一個容器,存放與您 Authgear 實作相關的所有設定與資料。您可以為不同的實作建立多個專案,以區隔設定與資料,每個專案都有獨立的網址供您互動使用。' },
    ],
  },
  {
    letter: 'R',
    entries: [
      { term: 'Role-Based Access Control (RBAC,角色型存取控制)', link: '/post/what-is-role-based-access-control-rbac-benefits-comparisons-and-best-practices', body: '角色型存取控制(RBAC)是一種安全模型,依據使用者在組織中預先定義的角色來授予系統、應用程式與資料的權限。RBAC 不會為每位使用者單獨設定權限,而是把使用者依角色(例如管理員、HR 主管、終端使用者)分組,並依該角色的職責授予存取權限,簡化管理並落實最小權限原則,提升安全性。' },
      { term: 'Roles(角色)', body: '在 Authgear 中可以為使用者指派角色以實作 RBAC。角色會以陣列形式透過 Authgear JWT 存取權杖與 UserInfo 中的 <a href="#">https://authgear.com/claims/user/roles</a> 屬性回傳。' },
      { term: 'Reauthentication(重新驗證)', body: '重新驗證是指在已驗證的使用者執行敏感操作前,再次確認其身分的程序。此程序可避免使用者使用可能已被攻陷的舊授權執行敏感操作,藉此提升安全性。' },
      { term: 'Refresh Token(更新權杖)', body: '更新權杖是一種特殊的權杖,讓您可以在不重新驗證使用者的情況下取得新的存取權杖。' },
    ],
  },
  {
    letter: 'S',
    entries: [
      { term: 'SAML', link: '/post/oidc-vs-saml', body: 'SAML(Security Assertion Markup Language)是一項開放標準,用於在身份提供者(IdP)與服務提供者(SP)之間安全交換驗證與授權資料,常用於跨多個 Web 應用程式的單一登入(SSO)。它以 XML 為基礎傳遞使用者身分與存取權限的斷言,使用者只需驗證一次,便可存取多個服務,而不需要重複登入。' },
      { term: 'SDK', body: 'SDK 為 Software Development Kit(軟體開發套件)的縮寫,是一組讓開發者為目標平台打造與除錯應用程式的工具與程式碼。Authgear 提供多種語言、框架與平台的 SDK,例如 JavaScript / React Native、Android、iOS、Flutter、Xamarin。' },
      { term: 'Single Sign-on (SSO,單一登入)', link: '/features/single-sign-on', body: '單一登入(SSO)是一種驗證方式,讓使用者只需登入一次,就可以存取多個應用程式而不必為每個應用程式重新登入。<br /><br />在 Authgear 中,您可以為共用同一個 Authgear 專案的多個應用程式啟用 SSO。' },
      { term: 'Social Login(社交登入)', link: '/features/social-login', body: 'Authgear 簡化了讓使用者以既有 Facebook、Google、LinkedIn、Github、Apple 等社交平台帳號登入您應用程式的流程。<br /><br />您可以在 Authgear Portal 的 Authentication &gt; Social / Enterprise Login 中啟用此功能。' },
      { term: 'Standard Attributes(標準屬性)', body: '標準屬性是常見的使用者屬性,例如電子郵件、電話號碼、姓名、性別與生日。標準屬性的欄位由 Authgear 定義,您可以在 User Profile &gt; Standard Attributes 查看完整清單。' },
    ],
  },
  {
    letter: 'T',
    entries: [
      { term: 'TOTP', link: '/features/multi-factor-authentication', body: 'TOTP 是 Time-based One-time Password(基於時間的一次性密碼)的縮寫,屬於雙因素驗證(2FA)的一種,使用者需輸入由 Google Authenticator、Authy 等行動 App 產生、會隨時間變動的單次代碼。<br /><br />使用者首次使用前需在欲登入的服務上掃描 QR Code 或輸入秘密金鑰來註冊裝置。' },
    ],
  },
  {
    letter: 'U',
    entries: [
      { term: 'User Anonymization(使用者匿名化)', body: '使用者匿名化是指刪除一般使用者的身分與其他資料的程序,匿名化後僅保留使用者 ID。您可以立即匿名化使用者,或安排排程匿名化。' },
      { term: 'User Deletion(使用者刪除)', body: '使用者刪除是指完整刪除使用者帳號及其所有相關資料的程序,可立即執行或排程刪除。' },
      { term: 'User Settings(使用者設定)', link: '/features/self-serve-settings-page', body: 'User Settings 是 Authgear 提供的 Auth UI 預設頁面之一,使用者可以在此檢視帳號詳情與設定。' },
      { term: 'UserInfo Endpoint', body: 'UserInfo Endpoint 是 Authgear 應用程式中的一個 HTTP 端點,用戶端應用程式可代表已驗證的使用者向其請求帳號資訊。此端點會回傳 JSON 格式的回應,包含使用者的電子郵件與 sub 等資料。' },
    ],
  },
  {
    letter: 'W',
    entries: [
      { term: 'Webhooks', link: '/features/extensibility', body: 'Webhook 是一種將某個 Web 應用程式上的事件通知傳送到另一個 Web 應用程式的方式。<br /><br />當 Authgear 上發生新使用者建立等事件時,Webhook 會向您指定的網址發送 HTTP POST 請求,請求內含與事件相關的資料。透過 Webhook,您可以為 Authgear 專案實作更多自訂功能。' },
    ],
  },
  {
    letter: 'Y',
    entries: [
      { term: 'YubiKey', link: '/features/passkeys', body: 'YubiKey 是 Yubico 開發的小型硬體安全裝置,使用者必須實際插入或感應該金鑰才能完成驗證,藉此為電腦、網路與線上服務提供強驗證。它支援 FIDO2 標準,沒有實體金鑰就無法存取,具高度的釣魚攻擊與帳號接管抗性。' },
    ],
  },
  {
    letter: 'Z',
    entries: [
      { term: 'Zero-Trust(零信任)', link: '/post/securing-the-perimeterless-dive-deep-into-zero-trust-architecture-with-continuous-authentication', body: '零信任是一種安全模型,假設組織網路內外的任何使用者、裝置或系統預設皆不可信任,每次存取請求都需嚴格驗證身分並進行持續驗證。它不依賴傳統的網路邊界,而是落實最小權限存取、細緻控管與持續監控,以降低資料外洩風險,並阻止攻擊者在網路內橫向移動。' },
    ],
  },
];

export const glossaryTerms: Record<Locale, GlossarySection[]> = {
  en,
  'zh-Hant': zhHant,
};

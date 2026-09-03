export const totp = {
  metaTitle: 'TOTP 驗證器 — 線上一次性密碼產生與測試',
  metaDescription:
    '線上產生 TOTP（RFC 6238），可自訂演算法（SHA-1／256／512）與位數（6／8），最多儲存 10 個應用程式。',
  heroTitle: 'TOTP 驗證器 — 線上一次性密碼產生（RFC 6238）',
  heroDescriptionBeforeLink:
    '即時產生與複製基於時間的一次性密碼（TOTP），供測試、除錯與 QA。可設定演算法（SHA-1／SHA-256／SHA-512）、位數（6 或 8），並依 ',
  heroRfcLink: 'RFC 6238',
  heroRfcHref: 'https://datatracker.ietf.org/doc/html/rfc6238',
  iframeTitle: 'TOTP 驗證器 — 一次性密碼產生器',
  policyLine1:
    '您的資料安全是我們的首要考量。所有 TOTP 產生與應用程式管理完全在瀏覽器內完成。',
  policyLine2: '本工具不會儲存或將密鑰與驗證碼傳送到瀏覽器以外。',
  s1Label: '步驟 1.',
  s1Title: '輸入應用程式密鑰',
  s1Body: '貼上應用程式 2FA 設定畫面提供的共用 TOTP secret（base32）。',
  s2Label: '步驟 2.',
  s2Title: '自訂演算法與位數',
  s2BodyBefore:
    '選擇 SHA-1、SHA-256 或 SHA-512，以及 6 或 8 位數。預設常為 SHA-1 + 6 位；若整合需要可使用較強雜湊。',
  s3Label: '步驟 3.',
  s3Title: '產生一次性密碼',
  s3Body:
    '目前 OTP 會自動產生並依 RFC 6238 預設每 30 秒更新。最多可儲存 10 組應用程式密鑰供快速測試。',
  s4Label: '步驟 4.',
  s4Title: '複製並用於驗證',
  s4Body: '點擊驗證碼即可複製到剪貼簿，貼到應用程式登入流程。',
  cautionLead: '注意：',
  cautionBody:
    '所有產生與儲存僅在瀏覽器記憶體中。\n因此清除快取或重裝瀏覽器後，本工具儲存的資料將永久消失。',
  troubleshootTitle: '疑難排解',
  tr1Title: '驗證碼對不起來？',
  tr1Item:
    '檢查伺服器與客戶端時間—TOTP 依賴準確時間；測試時可允許 ±1 個時間步的驗證窗口。',
  tr2Title: '密鑰格式錯誤？',
  tr2Item:
    '確認 secret 為 base32。若有 QR 碼可掃描，或從 otpauth URI 取出 secret= 參數。',
  tr3Title: '「演算法不符」錯誤',
  tr3Item: '確認伺服器與驗證器使用相同演算法、位數與時間步。',
  tr4Title: '測試時不穩定',
  tr4Item:
    '確認未在多環境重複使用同一密鑰（例如 staging 與 prod 共用會造成混淆）。',
  readyTitle: '以 Authgear 無縫強化帳戶安全',
  readySubtitle: '可擴充的身分管理、安全驗證與簡易整合。',
  faq1Title: '什麼是 TOTP？',
  faq1Body:
    'TOTP（基於時間的一次性密碼）依目前時間與共用密鑰產生短效單次碼，標準為 RFC 6238，廣泛用於網站與應用的雙因素驗證。',
  faq2Title: '為何使用 TOTP？',
  faq2b1: '以 2FA 強化安全',
  faq2b2: '獲 Google、Microsoft、GitHub 等廣採用',
  faq2b3: '權杖快速過期，降低重複使用風險',
  faq3Title: 'TOTP 多久有效？',
  faq3Body:
    '預設 30 秒（RFC 6238 建議 30s）。伺服器驗證常允許一步寬容以因應時鐘誤差。',
  faq4Title: '該用 SHA-1、SHA-256 還是 SHA-512？',
  faq4Body:
    'SHA-1 相容性最佳；若雙端皆可控制且需更強雜湊可用 SHA-256／512。務必兩端一致。',
  faq5Title: '該用 6 位還是 8 位？',
  faq5Body:
    '6 位為常見標準（平衡易用與安全）。8 位熵稍高但消費型驗證器較少見。',
  faq6Title: '如何從 otpauth:// URI 取出密鑰？',
  faq6Body: 'otpauth:// URL 中的 secret= 參數即 base32 密鑰。',
  faq7Title: '驗證器 App 是如何產生這些驗證碼的？',
  faq7Body:
    'Google Authenticator、Microsoft Authenticator、Authy 與 1Password 都使用與本工具相同的 RFC 6238 演算法：以共享密鑰加上目前的 30 秒時間區段計算 HMAC，再截短為 6 或 8 位數。因此只要密鑰相同，本頁顯示的驗證碼就會與你 App 上的一致。',
  faq7GuidePart1: '完整原理請閱讀 ',
  faq7GuideLinkLabel: '驗證器 App 是如何運作的',
  faq7GuidePart2: '。想完全不用輸入驗證碼？試試 ',
  faq7PasskeyLinkLabel: '通行密鑰示範',
  faq7GuidePart3: '，體驗防釣魚的無密碼登入。',
} as const;

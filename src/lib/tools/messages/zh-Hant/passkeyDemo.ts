export const passkeyDemo = {
  metaTitle: '通行密鑰示範與 WebAuthn 測試工具 — 在瀏覽器中試用通行密鑰',
  metaDescription:
    '建立真正的通行密鑰、檢視 WebAuthn 憑證內容，並驗證一次登入 — 全部在你的瀏覽器本機完成，不會傳送或儲存到任何伺服器。',
  heroTitle: '通行密鑰示範與 WebAuthn 測試工具',
  heroDescription:
    '使用 WebAuthn API 建立真正的通行密鑰，檢視回傳的憑證內容 — clientDataJSON、CBOR 編碼的 attestation object、驗證器旗標、AAGUID 與公開金鑰 — 然後用它登入，逐項觀察伺服器會執行的每個驗證步驟。所有運算都透過 WebCrypto 在你的瀏覽器本機完成：無需帳號，任何資料都不會離開你的裝置。',
  iframeTitle: '通行密鑰示範與 WebAuthn 測試工具',
  policyPrefix:
    '你的資料安全是我們的首要考量。通行密鑰的建立、憑證檢視與簽章驗證全部透過 WebAuthn 與 WebCrypto API 在瀏覽器內完成 — 沒有任何後端伺服器。此工具不會將任何資料傳送或儲存到你的裝置之外。原始碼請見：',
  policyLink: 'https://github.com/oursky/authgear-web',
  howSectionTitle: '通行密鑰示範工具的運作方式',
  step1Title: '選擇建立選項：',
  step1Body:
    '設定驗證器類型、使用者驗證、可探索憑證、attestation 與演算法 — PublicKeyCredentialCreationOptions JSON 會隨設定即時更新。',
  step2Title: '建立通行密鑰：',
  step2Body:
    '瀏覽器呼叫 navigator.credentials.create()，你的裝置會跳出 Face ID、Touch ID、Windows Hello 或安全金鑰的提示。',
  step3Title: '檢視憑證內容：',
  step3Body:
    '工具會解碼 clientDataJSON 並以 CBOR 解析 attestation object — 旗標、簽章計數、AAGUID（驗證器型號）、憑證 ID，以及 JWK 與 PEM 格式的公開金鑰。',
  step4Title: '用它登入：',
  step4Body:
    'navigator.credentials.get() 產生斷言（assertion）— 可使用已儲存的憑證清單，或以空的 allowCredentials 走可探索憑證流程。',
  step5Title: '像伺服器一樣驗證：',
  step5Body:
    '伺服器會執行的每項檢查 — 流程類型、challenge、來源、RP ID 雜湊、旗標，以及 WebCrypto 簽章驗證 — 都會以通過/失敗徽章呈現並附上說明。',
  howGuideText: '準備好在自己的應用程式加入通行密鑰了嗎？',
  howGuideLinkText: '閱讀通行密鑰實作開發者指南',
  howGuideHref: '/post/how-to-implement-passkeys-developer-guide',
  platformsTitle: '支援平台',
  platformsIntro: '通行密鑰支援所有主流平台，並在各生態系內同步。此示範可在任何支援 WebAuthn 的瀏覽器中執行。',
  plat1Name: 'Apple',
  plat1Desc: 'iOS 16+、macOS 13+ — Face ID / Touch ID，透過 iCloud 鑰匙圈同步。',
  plat2Name: 'Android 與 Chrome',
  plat2Desc: 'Android 9+ — 指紋或螢幕鎖定，透過 Google 密碼管理員同步。',
  plat3Name: 'Windows',
  plat3Desc: 'Windows 10/11 — Windows Hello 臉部辨識、指紋或 PIN。',
  plat4Name: '密碼管理員',
  plat4Desc: '1Password、Bitwarden、Dashlane、Proton Pass 等可跨平台儲存並同步通行密鑰。',
  plat5Name: '安全金鑰',
  plat5Desc: 'YubiKey 等 FIDO2 硬體金鑰可透過跨平台（USB/NFC）傳輸方式使用。',
  readyTitle: '準備在你的應用程式中提供通行密鑰登入？',
  readySubtitle: 'Authgear 內建通行密鑰登入功能 — 無需自行處理 WebAuthn 細節。',
  readyCta: '探索 Authgear 通行密鑰功能',
  faqWebauthnTitle: '什麼是 WebAuthn？',
  faqWebauthnBody:
    'WebAuthn（Web Authentication）是通行密鑰背後的 W3C 標準瀏覽器 API。它不使用共享密碼，而是讓你的裝置為每個網站建立一組公私金鑰對：私鑰永遠不會離開你的驗證器，網站只儲存公開金鑰。登入是一次 challenge–response 簽章，且瀏覽器會將每個憑證綁定到建立它的網域 — 這正是通行密鑰能防範網路釣魚的原因。',
  faqWebauthnLinkText: '請參閱我們的通行密鑰實作開發者指南。',
  faqWebauthnLinkHref: '/post/how-to-implement-passkeys-developer-guide',
  faqSafeTitle: '在這裡建立通行密鑰安全嗎？',
  faqSafeBody:
    '安全。此頁面建立的是真正的通行密鑰，但它只對本網站有效，除了這個示範之外沒有任何用途。私鑰保存在你裝置的驗證器中；公開金鑰與憑證中繼資料只存在你瀏覽器的 localStorage。沒有伺服器 — 任何資料都不會被傳送。你可以一鍵刪除示範紀錄，並隨時從裝置中移除通行密鑰本身。',
  faqDeleteTitle: '如何從裝置中刪除示範通行密鑰？',
  faqDeleteIntro: '工具中的「Delete」按鈕只會移除此頁面的紀錄。要從裝置中移除通行密鑰本身：',
  faqDeleteIos: 'iOS / macOS：「設定」→「密碼」（或「密碼」App）→ 找到本網站 → 刪除該通行密鑰。',
  faqDeleteAndroid: 'Android / Chrome：Google 密碼管理員 →「密碼」→ 找到本網站 → 刪除。',
  faqDeleteWindows: 'Windows：「設定」→「帳戶」→「密碼金鑰」→ 找到本網站 → 移除。',
  faqDeleteManagers: '密碼管理員（1Password、Bitwarden 等）：在其中找到本網站的項目並刪除。',
  faqAaguidTitle: '什麼是 AAGUID？',
  faqAaguidBody:
    'AAGUID（Authenticator Attestation Globally Unique Identifier）是一組 16 位元組的識別碼，用來標示驗證器的「型號」— 例如 Google 密碼管理員或 YubiKey 5 — 而非你的個別裝置。此工具使用社群維護的 passkey-authenticator-aaguids 清單快照進行比對。當 attestation 設為「none」（預設值）時，許多驗證器會基於隱私將其歸零。',
  faqSignCountTitle: '為什麼簽章計數顯示為 0？',
  faqSignCountBody:
    '簽章計數器的設計目的是偵測被複製的憑證：每次使用都應遞增。但同步的通行密鑰同時存在於多部裝置上，無法維持單一共享計數器，因此大多數通行密鑰供應商 — iCloud 鑰匙圈、Google 密碼管理員 — 一律回報 0，代表「不支援計數器」。硬體安全金鑰通常仍會遞增。',
} as const;

export const hmac = {
  metaTitle: 'HMAC 產生與驗證 — SHA-256、SHA-384、SHA-512 | Authgear',
  metaDescription:
    '免費線上 HMAC 產生與驗證工具，支援 SHA-256、SHA-384、SHA-512，輸出 Hex 或 Base64。所有運算皆在瀏覽器本機完成，密鑰與資料絕不離開您的裝置。',
  heroTitle: 'HMAC 簽章產生／驗證',
  heroDescription:
    '產生並驗證 HMAC-SHA256、SHA-384、SHA-512 簽章，支援 Hex 與 Base64 輸出。所有運算皆在瀏覽器本機完成——您的密鑰與承載內容絕不離開裝置。',
  iframeTitle: 'HMAC 簽章產生／驗證',
  policyPrefix:
    '您的資料安全是我們的首要考量。簽章產生與驗證完全在您的瀏覽器內完成。本工具不會儲存或將承載、密鑰或簽章傳送到瀏覽器以外。原始碼請見：',
  policyLink: 'https://github.com/authgear/authgear-widget-hmac-tool',
  howSectionTitle: 'HMAC 簽章產生器如何運作',
  supportedAlgorithmsTitle: '支援的演算法',
  supportedAlgorithmsIntro:
    '使用以下雜湊演算法計算 HMAC 簽章，輸出 Hex 或 Base64，適用於 webhook 簽章驗證、API 請求簽署與資料完整性檢查。',
  algHs256: 'HMAC + SHA-256',
  algHs384: 'HMAC + SHA-384',
  algHs512: 'HMAC + SHA-512',
  step1Title: '輸入承載：',
  step1Body: '輸入要簽章或驗證的完整訊息或承載內容。',
  step2Title: '提供 Webhook 密鑰：',
  step2Body:
    '輸入用於產生 HMAC 的共用密鑰，通常僅您與 webhook 提供者知悉。',
  step3Title: '選擇 HMAC 演算法：',
  step3Body: '依應用程式設定從 HS256、HS384 或 HS512 中選擇。',
  step4Title: '產生簽章：',
  step4Body: '點擊以依選定演算法為承載與密鑰計算 HMAC 簽章。',
  step5Title: '貼上收到的簽章以驗證：',
  step5Body:
    '貼上從外部系統／webhook 收到的簽章，與您自行產生的簽章比對。',
  faqWhatTitle: '什麼是 HMAC？',
  faqWhatBody:
    'HMAC（基於雜湊的訊息鑑別碼）使用密碼雜湊函式與密鑰為訊息產生簽章，可同時確保資料完整性與來源真實性。',
  faqWhyTitle: '為何使用 HMAC？',
  faqWhy1: '驗證訊息真實性，特別適用於 webhook 或 API 回呼',
  faqWhy2: '透過完整性檢查防止竄改或重放攻擊',
  faqWhy3: '簡單且廣為支援的密碼技術',
  bestPracticesTitle: '最佳實踐',
  bp1: '妥善保管 webhook 密鑰，勿公開分享。',
  bp2: '處理承載前務必先驗證收到的 webhook 簽章。',
  bp3: '優先使用 SHA-256 或更強的演算法；新系統應避免使用以 MD5 或 SHA-1 為基礎的 HMAC。',
} as const;

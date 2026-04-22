export const hmac = {
  metaTitle: 'HMAC 簽章產生／驗證',
  metaDescription:
    'Authgear 提供的免費 HMAC 產生與驗證：在線上以 SHA-256、SHA-512 等建立並檢查 HMAC 簽章。所有運算皆在瀏覽器內安全完成，資料不離開您的裝置。',
  heroTitle: 'HMAC 簽章產生／驗證',
  heroDescription: '安全地為承載內容產生並驗證 HMAC 簽章',
  iframeTitle: 'HMAC 簽章產生／驗證',
  policyPrefix:
    '您的資料安全是我們的首要考量。簽章產生與驗證完全在您的瀏覽器內完成。本工具不會儲存或將承載、密鑰或簽章傳送到瀏覽器以外。原始碼請見：',
  policyLink: 'https://github.com/authgear/authgear-widget-hmac-tool',
  howSectionTitle: 'HMAC 簽章產生器如何運作',
  supportedAlgorithmsTitle: '支援的演算法',
  supportedAlgorithmsIntro:
    '在 PEM 與 JWK 格式之間產生與轉換密鑰，用於安全簽章與加密。',
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
  bp3: '使用與平台相容的安全演算法。',
} as const;

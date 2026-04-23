export const passwordHash = {
  metaTitle: '密碼雜湊產生與驗證',
  metaDescription:
    '免費密碼雜湊產生與驗證。以 Argon2id、bcrypt、scrypt、PBKDF2 建立／驗證雜湊，含 salt、預設與即時耗時，僅在客戶端執行。',
  heroLine1: '密碼雜湊產生與驗證',
  heroLine2: '（Argon2id、bcrypt、scrypt、PBKDF2）',
  heroDescription:
    '在客戶端產生／驗證密碼雜湊，參數貼近實務。便於除錯整合並理解 salt、記憶體與迭代對成本的影響。僅在本機執行—密碼不離開瀏覽器。',
  iframeTitle: '密碼雜湊產生器',
  policyPrefix:
    '您的資料安全是我們的首要考量。所有雜湊與驗證皆在此瀏覽器完成。本工具不會儲存或將密碼與雜湊傳送到瀏覽器以外。原始碼：',
  policyGithub: 'https://github.com/authgear/authgear-widget-password-hash',
  featureSectionTitle: '支援的密碼雜湊函式',
  f1Title: 'Argon2id 參數',
  f1Desc:
    'Argon2id 為現代記憶體困難函式，可提高 GPU／ASIC 攻擊成本。調整記憶體、迭代（t）與平行度（p），使驗證路徑在正式硬體上約 250–500ms。每個密碼使用唯一隨機 salt（16–32 bytes）。',
  f2Title: 'bcrypt（成本／輪數）',
  f2Desc:
    'bcrypt 經廣泛部署。提高 cost 以減緩暴力嘗試，同時維持可接受的登入體驗。輸出相容廣泛的 $2b$ 格式。',
  f3Title: 'scrypt（N, r, p）',
  f3Desc:
    'scrypt 具記憶體困難性。提高 N（例如 2^15–2^19）以提高攻擊成本；調整 r、p 以平衡記憶體與平行度。',
  f4Title: 'PBKDF2（SHA-256／SHA-512）',
  f4Desc:
    'PBKDF2 仍常作相容用途。使用高迭代次數（數十萬以上）並隨硬體進步定期檢視。',
  f5Title: 'Salt（與選用的 Pepper）',
  f5DescBeforeLinks:
    '工具可產生密碼學安全的 salt 並設定長度與編碼（Hex／Base64）。部分部署另加 pepper（站點級密鑰）不存入雜湊。請謹慎使用並如其他密鑰般管理。',
  f5ReadMore: '延伸閱讀：',
  f5Link1: '密碼雜湊與加鹽說明',
  f5Link1Href: '/post/password-hashing-salting-function-and-algorithm-explained',
  f5Link2: '如何選擇雜湊函式',
  f5Link2Href: '/post/password-hashing-how-to-pick-the-right-hashing-function',
  howSectionTitle: '如何使用密碼雜湊產生器',
  h1Label: '步驟 1.',
  h1Title: '輸入密碼',
  h1i1: '開啟「產生」分頁並輸入示範密碼（請勿使用真實憑證）。',
  h2Label: '步驟 2.',
  h2Title: '選擇演算法',
  h2i1: '新系統一般建議 Argon2id。',
  h3Label: '步驟 3.',
  h3Title: '設定參數：',
  h3i1: 'Argon2id：記憶體（MiB）、迭代（t）、平行度（p）。',
  h3i2: 'bcrypt：Cost（2^cost 輪數）。',
  h3i3: 'scrypt：N（2 的幂）、r、p。',
  h3i4: 'PBKDF2：迭代與摘要（SHA-256／512）。',
  h4Label: '步驟 4.',
  h4Title: '產生密碼雜湊',
  h4i1: '按「產生密碼雜湊」，複製編碼字串。',
  h5Label: '步驟 5.',
  h5Title: '驗證密碼雜湊',
  h5i1: '切換至「驗證密碼雜湊」測試密碼與編碼雜湊是否成對。',
  faq1Title: '用真實密碼安全嗎？',
  faq1Body: '所有雜湊皆在瀏覽器本機完成。為自身安全起見，請避免在任何線上工具使用正式密鑰。',
  faq2Title: '該用哪種雜湊函式？',
  faq2Body:
    '新系統一般建議 Argon2id。bcrypt 與 scrypt 部署廣泛；PBKDF2 作相容後備。務必實測並選擇符合延遲目標的參數。',
  faq3Title: '雜湊應該花多久？',
  faq3Body:
    '許多團隊以驗證路徑約 250–500ms 為目標。在正式硬體上選擇最慢但仍可接受 UX 的設定。',
  faq4Title: '為什麼框架驗證不過？',
  faq4Body:
    '常見原因：空白／換行、編碼不一致（hex 與 Base64）、bcrypt 前綴差異（$2a$ 與 $2b$），或遺漏 pepper。',
  faq5Title: 'Salt 長度該多少？',
  faq5Body: '標準為 16–32 bytes 隨機資料。工具預設使用安全亂數並顯示長度與編碼。',
} as const;

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
  f1Title: 'Argon2id 參數（2026 設定）',
  f1Desc:
    'Argon2id 為現代記憶體困難函式，可提高 GPU／ASIC 攻擊成本。OWASP 2026 基線為 m = 19 MiB、t = 2、p = 1，搭配 16 bytes 隨機 salt。硬體允許時可採 m = 64 MiB、t = 3、p = 4 提升強度。調整參數使單次驗證約落在 250–500 ms。',
  f2Title: 'bcrypt（成本／輪數）',
  f2Desc:
    'bcrypt 經廣泛部署。2026 最低 cost 為 12，新系統建議 13–14。cost 超過 14 會明顯影響登入延遲。輸出相容廣泛的 $2b$ 格式。注意 bcrypt 僅取輸入前 72 bytes。',
  f3Title: 'scrypt（N, r, p）',
  f3Desc:
    'scrypt 具記憶體困難性。2026 基線為 N = 2^17、r = 8、p = 1（每次驗證約 128 MiB）。在較弱硬體上做互動登入可採 N = 2^15、r = 8、p = 1；切勿低於 2^14。',
  f4Title: 'PBKDF2（SHA-256／SHA-512）',
  f4Desc:
    'PBKDF2 為相容性與 FIPS 規範下的工作主力。NIST SP 800-63B（2024 更新）要求 PBKDF2-HMAC-SHA256 至少 600,000 次迭代，PBKDF2-HMAC-SHA512 至少 210,000 次。請隨硬體進步逐年檢視。',
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
  faq6Title: '可以用這個工具解密 password hash 嗎？',
  faq6Body:
    '不行——任何工具都做不到。Argon2id、bcrypt、scrypt 與 PBKDF2 都是單向雜湊函式，不是加密，沒有任何金鑰可以「反推」原始密碼。要從 hash 還原密碼的唯一辦法，是逐一猜測候選密碼、計算 hash 再比對——也就是密碼破解攻擊本身。現代記憶體強化的雜湊參數，正是為了讓這個過程在大規模上經濟上難以負擔。要驗證已知密碼是否符合儲存的 hash，請使用 Verify 分頁。',
  faq7Title: '2026 年該選 Argon2id、bcrypt 還是 scrypt？',
  faq7Body:
    '新系統建議優先使用 Argon2id：它是 PHC 密碼雜湊競賽的優勝者，並具備抗 GPU 與 ASIC 攻擊的記憶體強化特性。bcrypt 仍可接受，前提是 cost ≥ 12，但缺乏記憶體強化、且輸入只取前 72 bytes。scrypt 同樣具備記憶體強化與成熟研究，僅在運行環境缺乏可維護的 Argon2id 函式庫時選用。PBKDF2 僅在需要符合 FIPS／NIST 規範時使用。',
  faq8Title: '如何把 bcrypt 遷移到 Argon2id 而不強制使用者重設密碼？',
  faq8Body:
    '採用機會式重新雜湊（opportunistic rehashing）。既有使用者持續以 bcrypt 驗證；當登入成功時，使用該次輸入的明文密碼以 Argon2id 重新計算 hash 並更新儲存。每位使用者記錄一個雜湊版本欄位，以便知道驗證時該採哪一種演算法。一般情況下幾週內大多數帳戶就會自然遷移完成，剩餘長期未登入的帳戶可透過密碼重設提示完成切換。',
} as const;

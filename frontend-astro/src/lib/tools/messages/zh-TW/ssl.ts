export const ssl = {
  metaTitle: 'SSL 檢測 — 免費 SSL 憑證檢查 | Authgear',
  metaDescription:
    '免費 SSL 檢測工具。即時檢視 SSL／TLS 憑證詳情、驗證憑證鏈並查看到期日。',
  heroTitle: '免費 SSL 檢測',
  heroDescription:
    '輸入任意網域即可檢查 SSL／TLS 憑證。檢視到期日、發行者、主旨替代名稱（SAN）與完整憑證鏈狀態—無需登入。',
  iframeTitle: 'SSL 憑證檢視器',
  card1Title: '憑證詳情檢視',
  card1Desc:
    '檢視任意 HTTPS 網域的 SSL 憑證資訊，包含主旨、發行者、有效期、SAN、指紋與其他技術屬性。',
  card2Title: '憑證鏈狀態',
  card2Desc:
    '驗證憑證鏈是否完整且受信任。快速檢查鏈結有效性、受信任根狀態與鏈上憑證數量。',
  card3Title: '憑證鏈視覺化',
  card3Desc:
    '檢視從葉節點（您的網域）經中介 CA 到根 CA 的完整階層。',
  s1Label: '步驟 1.',
  s1Title: '輸入網站 URL（例如：https://www.authgear.com/）並按檢視。',
  s2Label: '步驟 2.',
  s2Title: '擷取憑證資訊。工具會連線伺服器並取得網站呈現的 SSL／TLS 憑證。',
  s3Label: '步驟 3.',
  s3Title: '檢視憑證詳情與鏈結。結果顯示中繼資料、鏈結狀態與完整階層。',
  readyTitle: '準備好為應用程式加上 HTTPS 與驗證了嗎？',
  readySubtitle:
    'Authgear 是驗證平台，為您的應用程式處理登入、MFA、SSO 與工作階段管理，無需從頭自建。',
  faq1Title: '什麼是 SSL 憑證？',
  faq1Body:
    'SSL 憑證（更準確為 TLS 憑證—SSL 是較舊的通稱）讓瀏覽器與網站伺服器之間能以 HTTPS 加密通訊。主要有兩件事：\n\n加密—傳輸中的資料無法被竊聽。\n\n身分驗證—證明您連線的伺服器確為所聲稱者。憑證由 CA（如 Let\'s Encrypt、DigiCert、Sectigo）簽發。瀏覽器會檢查是否由信任的 CA 簽發、網域是否相符、憑證是否未過期。',
  faq1MetaBody:
    'SSL／TLS 憑證類型：\n\nDV（網域驗證）\n僅驗證網域所有權。快速便宜（Let\'s Encrypt 即 DV）。多數網站適用。\n\nOV（組織驗證）\n驗證背後組織。常見於企業網站。\n\nEV（延伸驗證）\n最高等級，需嚴格身分審查。銀行與大型企業使用。',
  faq2Title: '什麼是憑證鏈？',
  faq2Body:
    '憑證鏈將您網站的憑證連結回瀏覽器信任的根 CA。包含三層：\n\n葉節點憑證（您的網域）—直接簽發給您的網域。\n\n中介憑證—根 CA 簽發給中介 CA，再由中介簽發給網站，以保護離線的根。\n\n根憑證—由受信任 CA 自簽。預先內建於瀏覽器與作業系統。\n\n為何重要？若伺服器設定缺少中介憑證，瀏覽器無法完成驗證並顯示錯誤—即使葉憑證本身有效。本工具可視覺化完整鏈結以利找出斷鏈。',
  faq3Title: 'SSL 憑證效期多久？',
  faq3Body:
    'Let\'s Encrypt 約 90 天（通常自動續約）。付費 CA 常為 1–2 年。自 2020 年 9 月起，公開信任憑證最長約 398 天。產業趨勢朝向更短效期。\n\n憑證過期會怎樣？\n\n瀏覽器會立即顯示「連線不安全」並阻擋使用者進入網站，因此監控到期日很重要。',
  faq4Title: 'SSL 與 TLS 有何不同？',
  faq4Body:
    'SSL 為較舊協定，已棄用，已知存在漏洞。TLS 為後繼者，現代 HTTPS 實際使用 TLS 1.2 與 1.3。',
  faq4Body2:
    '「SSL 憑證」一詞仍常用，但技術上今日皆為 TLS 憑證。本工具會報告協商的 TLS 版本與憑證詳情。',
} as const;

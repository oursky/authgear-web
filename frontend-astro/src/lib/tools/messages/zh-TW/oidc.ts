export const oidc = {
  metaTitle: 'OIDC Discovery 端點瀏覽器 | Authgear',
  metaDescription:
    '擷取並檢視任何 OIDC 提供者的 .well-known/openid-configuration。檢視授權端點、權杖端點、JWKS、範圍與簽章演算法。',
  heroTitle: 'OpenID Connect Discovery 瀏覽器',
  heroDescription:
    '輸入任意 OIDC issuer URL 擷取 discovery 端點。立即檢視 .well-known/openid-configuration、支援範圍、簽章演算法與 JWKS，無需登入。',
  iframeTitle: 'OIDC Discovery 端點瀏覽器',
  policyLine1: '您的資料安全是我們的首要考量。一切在您的瀏覽器本機執行。',
  policyLine2:
    '工具由瀏覽器直接向 OIDC 提供者擷取 discovery 文件。Authgear 不會看到或記錄您的請求。',
  card1Title: '擷取 OpenID 設定',
  card1Desc:
    '依您提供的 issuer URL 自動擷取 OpenID Connect discovery 文件（/.well-known/openid-configuration）。',
  card2Title: '重點端點摘要',
  card2Desc:
    '快速檢視 issuer、授權端點、權杖端點、JWKS URI 及其他常用欄位。',
  card3Title: 'JSON Discovery 輸出',
  card3Desc:
    '以語法高亮檢視完整 discovery 文件，可複製整份回應或單一欄位供除錯或文件使用。',
  s1Label: '步驟 1.',
  s1Title:
    '輸入 Discovery URL（例如：https://accounts.google.com/.well-known/openid-configuration 或 https://project.authgear.cloud/.well-known/openid-configuration）並按擷取。',
  s2Label: '步驟 2.',
  s2Title: '檢視解析後的中繼資料、核心端點與提供者能力。',
  s3Label: '步驟 3.',
  s3Title: '一鍵複製欄位、檢視原始 JSON 或 JWKS。',
  faq1Title: 'OIDC 的 discovery 端點是什麼？',
  faq1Body:
    'OIDC discovery 端點是 {issuer}/.well-known/openid-configuration 的標準化 URL，回傳描述提供者設定的 JSON。內含授權端點、權杖端點、JWKS URI、支援範圍、回應類型、簽章演算法等，客戶端可自動設定而無需硬編碼 URL。',
  faq2Title: '所有 OIDC 提供者都支援 discovery 嗎？',
  faq2Body:
    '多數現代相容的 OIDC 提供者皆支援。規格要求欲支援自動客戶端設定的提供者提供 discovery。部分舊系統或封閉系統可能沒有 /.well-known/openid-configuration，則需手動設定。若此工具擷取失敗，可能是提供者不支援 discovery 或端點有存取限制。',
  faq3Title: '實際的 OpenID discovery URL 是什麼？',
  faq3Body:
    '格式為 {issuer}/.well-known/openid-configuration，{issuer} 為 OIDC 提供者的基底 URL。例如：Google 為 https://accounts.google.com/.well-known/openid-configuration；Okta 為 https://{yourOktaDomain}/.well-known/openid-configuration；Authgear 為 https://{your-project}.authgear.cloud/.well-known/openid-configuration。在上方輸入 issuer 即可自動擷取。',
  faq4Title: '什麼是 discovery 端點？',
  faq4Body:
    'Discovery 端點是服務用來描述能力與設定的知名 URL。在 OIDC 中路徑為 /.well-known/openid-configuration（RFC 8414），讓客戶端動態探索端點與功能。',
  faq5Title: '同一廠商（Okta、Azure、Keycloak）的 OIDC discovery URL 會不同嗎？',
  faq5Body:
    '會。路徑格式一致，但 issuer 基底不同。Azure AD 常為 https://login.microsoftonline.com/{tenant-id}/v2.0；Keycloak 為 https://{host}/realms/{realm}；Okta 為 https://{yourOktaDomain}。在上方輸入您的 issuer 即可自動解析完整 discovery URL。',
} as const;

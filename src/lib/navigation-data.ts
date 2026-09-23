export type NavLink = {
  path?: string;
  href?: string;
  label: Record<string, string>;
  /** Optional second line rendered under the label (e.g. "(Start for Free)"). */
  note?: Record<string, string>;
};

export type NavColumn =
  | { type: 'simple'; subtitle: Record<string, string>; links: NavLink[] }
  | {
      type: 'stacked';
      sections: { subtitle: Record<string, string>; links: NavLink[] }[];
    }
  | {
      type: 'productColumn';
      subtitle: Record<string, string>;
      links: NavLink[];
    };

export const productsDropdownColumns: NavColumn[] = [
  {
    type: 'simple',
    subtitle: { en: 'SECURITY', 'zh-Hant': '安全性', ja: 'セキュリティ', es: 'SEGURIDAD', de: 'SICHERHEIT' },
    links: [
      { path: '/features/attack-protection', label: { en: 'Attack Protection', 'zh-Hant': '攻擊防護', ja: '攻撃対策', es: 'Protección contra ataques', de: 'Angriffsschutz' } },
      { path: '/features/multi-factor-authentication', label: { en: 'Adaptive MFA', 'zh-Hant': '自適應 MFA', ja: 'アダプティブ MFA', es: 'MFA adaptativa', de: 'Adaptive MFA' } },
      { path: '/features/sms-pumping-fraud', label: { en: 'SMS Pumping Protection', 'zh-Hant': '簡訊濫發防護', ja: 'SMS ポンピング対策', es: 'Protección contra SMS pumping', de: 'Schutz vor SMS-Pumping' } },
      { path: '/features/authorization', label: { en: 'Authorization', 'zh-Hant': '授權', ja: '認可', es: 'Autorización', de: 'Autorisierung' } },
    ],
  },
  {
    type: 'simple',
    subtitle: { en: 'AUTHENTICATION', 'zh-Hant': '驗證', ja: '認証', es: 'AUTENTICACIÓN', de: 'AUTHENTIFIZIERUNG' },
    links: [
      { path: '/features/authentication', label: { en: 'Authentication', 'zh-Hant': '身份驗證', ja: '認証', es: 'Autenticación', de: 'Authentifizierung' } },
      { path: '/features/single-sign-on', label: { en: 'Single Sign-On', 'zh-Hant': '單一登入', ja: 'シングルサインオン', es: 'Inicio de sesión único (SSO)', de: 'Single Sign-On' } },
      { path: '/features/social-login', label: { en: 'Social Login', 'zh-Hant': '社群登入', ja: 'ソーシャルログイン', es: 'Login social', de: 'Social Login' } },
      { path: '/features/passwordless-authentication', label: { en: 'Passwordless', 'zh-Hant': '無密碼登入', ja: 'パスワードレス', es: 'Sin contraseña', de: 'Passwortlos' } },
      { path: '/features/whatsapp-otp', label: { en: 'WhatsApp OTP', 'zh-Hant': 'WhatsApp OTP', ja: 'WhatsApp OTP', es: 'WhatsApp OTP', de: 'WhatsApp OTP' } },
      { path: '/features/passkeys', label: { en: 'Passkeys', 'zh-Hant': '通行密鑰', ja: 'パスキー', es: 'Passkeys', de: 'Passkeys' } },
      { path: '/features/biometric-authentication', label: { en: 'Biometric', 'zh-Hant': '生物辨識', ja: '生体認証', es: 'Biometría', de: 'Biometrie' } },
      { path: '/features/machine-to-machine-token', label: { en: 'Machine-to-Machine Token', 'zh-Hant': '機器對機器 Token', ja: 'マシン間トークン', es: 'Tokens machine-to-machine', de: 'Machine-to-Machine-Token' } },
    ],
  },
  {
    type: 'simple',
    subtitle: { en: 'USER', 'zh-Hant': '使用者', ja: 'ユーザー', es: 'USUARIO', de: 'NUTZER' },
    links: [
      { path: '/features/user-management', label: { en: 'User Management', 'zh-Hant': '使用者管理', ja: 'ユーザー管理', es: 'Gestión de usuarios', de: 'Nutzerverwaltung' } },
      { path: '/features/self-serve-settings-page', label: { en: 'Self-serve Settings', 'zh-Hant': '自助設定', ja: 'セルフサービス設定', es: 'Ajustes de autoservicio', de: 'Self-Service-Einstellungen' } },
    ],
  },
  {
    type: 'stacked',
    sections: [
      {
        subtitle: { en: 'BRANDING', 'zh-Hant': '品牌', ja: 'ブランディング', es: 'MARCA', de: 'BRANDING' },
        links: [
          { path: '/features/customization', label: { en: 'Customization', 'zh-Hant': '自訂外觀', ja: 'カスタマイズ', es: 'Personalización', de: 'Anpassung' } },
        ],
      },
      {
        subtitle: { en: 'INTEGRATION', 'zh-Hant': '整合', ja: '連携', es: 'INTEGRACIÓN', de: 'INTEGRATION' },
        links: [
          { path: '/features/extensibility', label: { en: 'Extensibility', 'zh-Hant': '擴充性', ja: '拡張性', es: 'Extensibilidad', de: 'Erweiterbarkeit' } },
        ],
      },
    ],
  },
  {
    type: 'productColumn',
    subtitle: { en: 'PRODUCTS', 'zh-Hant': '產品', ja: '製品', es: 'PRODUCTOS', de: 'PRODUKTE' },
    links: [
      {
        path: '/',
        label: { en: 'On the Cloud', 'zh-Hant': '雲端版', ja: 'クラウドで', es: 'En la nube', de: 'In der Cloud' },
        note: { en: '(Start for Free)', 'zh-Hant': '（免費開始）', ja: '（無料で始める）', es: '(Empieza gratis)', de: '(Kostenlos starten)' },
      },
      { path: '/migrate-to-authgear', label: { en: 'Migrate to Authgear', 'zh-Hant': '遷移至 Authgear', ja: 'Authgear への移行', es: 'Migra a Authgear', de: 'Zu Authgear migrieren' } },
    ],
  },
];

export const solutionsDropdownLinks: NavLink[] = [
  { path: '/solutions/frontline-workers-identity', label: { en: 'Frontline Worker Identity', 'zh-Hant': '第一線員工身份', ja: 'フロントラインワーカー向け ID', es: 'Identidad para trabajadores de primera línea', de: 'Identität für Frontline-Mitarbeiter' } },
  { path: '/solutions/ciam-solution', label: { en: 'Customer Identity Management', 'zh-Hant': '客戶身份管理', ja: '顧客 ID 管理', es: 'Gestión de identidad de clientes', de: 'Customer Identity Management' } },
  { path: '/solutions/b2b-saas-authentication', label: { en: 'B2B SaaS Applications', 'zh-Hant': 'B2B SaaS 應用', ja: 'B2B SaaS アプリケーション', es: 'Aplicaciones SaaS B2B', de: 'B2B-SaaS-Anwendungen' } },
  { path: '/solutions/enterprise-sso', label: { en: 'Enterprise SSO', 'zh-Hant': '企業 SSO', ja: 'エンタープライズ SSO', es: 'SSO empresarial', de: 'Enterprise SSO' } },
  { path: '/solutions/reduce-sms-otp-cost', label: { en: 'SMS Cost Saving', 'zh-Hant': '簡訊成本優化', ja: 'SMS コスト削減', es: 'Ahorro en costes de SMS', de: 'SMS-Kosten senken' } },
];

export const solutionsSideImage: {
  path: string;
  src: string;
  width: number;
  alt: Record<string, string>;
} = {
  path: '/migrate-to-authgear',
  src: '/images/nav_solutions_migrate2x.webp',
  width: 810,
  alt: { en: '', 'zh-Hant': '', ja: '', es: '', de: '' },
};

export const resourcesDropdownLinks: NavLink[] = [
  { path: '/blog', label: { en: 'Blog', 'zh-Hant': '部落格', ja: 'ブログ', es: 'Blog', de: 'Blog' } },
  { path: '/customer-stories', label: { en: 'Case Studies', 'zh-Hant': '客戶案例', ja: '導入事例', es: 'Casos de éxito', de: 'Fallstudien' } },
  { path: '/compare/okta-alternative', label: { en: 'Comparison', 'zh-Hant': '產品比較', ja: '比較', es: 'Comparativa', de: 'Vergleich' } },
  { path: '/login-gallery', label: { en: 'Login Gallery', 'zh-Hant': '登入畫廊', ja: 'ログインギャラリー', es: 'Galería de logins', de: 'Login-Galerie' } },
  { path: '/glossary', label: { en: 'Glossary', 'zh-Hant': '名詞解釋', ja: '用語集', es: 'Glosario', de: 'Glossar' } },
  { path: '/partners', label: { en: 'Partners', 'zh-Hant': '合作夥伴', ja: 'パートナー', es: 'Partners', de: 'Partner' } },
];

export const developersDropdownLinks: NavLink[] = [
  { href: 'https://docs.authgear.com/', label: { en: 'Documentation', 'zh-Hant': '文件', ja: 'ドキュメント', es: 'Documentación', de: 'Dokumentation' } },
  { href: 'https://github.com/authgear', label: { en: 'Github', 'zh-Hant': 'GitHub', ja: 'GitHub', es: 'GitHub', de: 'GitHub' } },
  { path: '/whats-new', label: { en: "What's New", 'zh-Hant': '最新動態', ja: '最新情報', es: 'Novedades', de: 'Neuigkeiten' } },
];

export const footerStrings: Record<string, Record<string, string>> = {
  poweredBy: { en: 'Designed by ', 'zh-Hant': '由 ', ja: 'デザイン：', es: 'Diseñado por ', de: 'Gestaltet von ' },
  poweredBySuffix: { en: '', 'zh-Hant': ' 設計', ja: '', es: '', de: '' },
  isoCertAlt: { en: 'ISO 27001 Certified', 'zh-Hant': 'ISO 27001 認證', ja: 'ISO 27001 認証取得', es: 'Certificación ISO 27001', de: 'ISO 27001 zertifiziert' },
  productsTitle: { en: 'Products', 'zh-Hant': '產品', ja: '製品', es: 'Productos', de: 'Produkte' },
  home: { en: 'Home', 'zh-Hant': '首頁', ja: 'ホーム', es: 'Inicio', de: 'Startseite' },
  pricing: { en: 'Pricing', 'zh-Hant': '定價', ja: '料金', es: 'Precios', de: 'Preise' },
  migrateToAuthgear: { en: 'Migrate to Authgear', 'zh-Hant': '遷移至 Authgear', ja: 'Authgear への移行', es: 'Migra a Authgear', de: 'Zu Authgear migrieren' },
  alternativeTitle: { en: 'alternative', 'zh-Hant': '產品替代方案', ja: '代替ソリューション', es: 'alternativas', de: 'Alternativen' },
  oktaAlternative: { en: 'Okta Alternative', 'zh-Hant': 'Okta 替代方案', ja: 'Okta の代替', es: 'Alternativa a Okta', de: 'Okta-Alternative' },
  auth0Alternative: { en: 'Auth0 Alternative', 'zh-Hant': 'Auth0 替代方案', ja: 'Auth0 の代替', es: 'Alternativa a Auth0', de: 'Auth0-Alternative' },
  cognitoAlternative: { en: 'Cognito Alternative', 'zh-Hant': 'Cognito 替代方案', ja: 'Cognito の代替', es: 'Alternativa a Cognito', de: 'Cognito-Alternative' },
  firebaseAlternative: { en: 'Firebase Alternative', 'zh-Hant': 'Firebase 替代方案', ja: 'Firebase の代替', es: 'Alternativa a Firebase', de: 'Firebase-Alternative' },
  developersTitle: { en: 'developers', 'zh-Hant': '開發者', ja: '開発者', es: 'desarrolladores', de: 'Entwickler' },
  documentation: { en: 'Documentation', 'zh-Hant': '文件', ja: 'ドキュメント', es: 'Documentación', de: 'Dokumentation' },
  apiReference: { en: 'API Reference', 'zh-Hant': 'API 參考', ja: 'API リファレンス', es: 'Referencia de la API', de: 'API-Referenz' },
  communityForum: { en: 'Community Forum', 'zh-Hant': '社群論壇', ja: 'コミュニティフォーラム', es: 'Foro de la comunidad', de: 'Community-Forum' },
  integrations: { en: 'Integrations', 'zh-Hant': '整合', ja: '連携', es: 'Integraciones', de: 'Integrationen' },
  resourcesTitle: { en: 'resources', 'zh-Hant': '資源', ja: 'リソース', es: 'recursos', de: 'Ressourcen' },
  blog: { en: 'Blog', 'zh-Hant': '部落格', ja: 'ブログ', es: 'Blog', de: 'Blog' },
  loginGallery: { en: 'Login Gallery', 'zh-Hant': '登入畫廊', ja: 'ログインギャラリー', es: 'Galería de logins', de: 'Login-Galerie' },
  glossary: { en: 'Glossary', 'zh-Hant': '名詞解釋', ja: '用語集', es: 'Glosario', de: 'Glossar' },
  partners: { en: 'Partners', 'zh-Hant': '合作夥伴', ja: 'パートナー', es: 'Partners', de: 'Partner' },
  security: { en: 'Security & Compliance', 'zh-Hant': '安全性與合規', ja: 'セキュリティとコンプライアンス', es: 'Seguridad y cumplimiento', de: 'Sicherheit & Compliance' },
  acceptableUsePolicy: { en: 'Acceptable Use Policy', 'zh-Hant': '合理使用政策', ja: '利用規定', es: 'Política de uso aceptable', de: 'Richtlinie zur zulässigen Nutzung' },
  complianceText: {
    en: 'Authgear is both ISO 27001 and SoC 2 Type II compliant.',
    'zh-Hant': 'Authgear 已通過 ISO 27001 與 SoC 2 Type II 認證。',
    ja: 'Authgear は ISO 27001 と SOC 2 Type II に準拠しています。',
    es: 'Authgear cumple con ISO 27001 y SOC 2 Type II.',
    de: 'Authgear ist nach ISO 27001 und SOC 2 Type II zertifiziert.',
  },
  passkeyPledgeAlt: { en: 'Passkey Pledge Partner', 'zh-Hant': 'Passkey Pledge 合作夥伴', ja: 'Passkey Pledge パートナー', es: 'Miembro del Passkey Pledge', de: 'Passkey-Pledge-Partner' },
  cookieSettings: { en: 'Cookie settings', 'zh-Hant': 'Cookie 設定', ja: 'Cookie 設定', es: 'Configuración de cookies', de: 'Cookie-Einstellungen' },
  termsOfService: { en: 'Terms', 'zh-Hant': '服務條款', ja: '利用規約', es: 'Términos', de: 'AGB' },
  privacyPolicy: { en: 'Privacy', 'zh-Hant': '隱私權政策', ja: 'プライバシーポリシー', es: 'Privacidad', de: 'Datenschutzerklärung' },
  dataPrivacy: { en: 'Data Privacy', 'zh-Hant': '資料隱私', ja: 'データプライバシー', es: 'Privacidad de datos', de: 'Datenschutz' },
  enterpriseLicenses: { en: 'Enterprise Licenses', 'zh-Hant': '企業授權', ja: 'エンタープライズライセンス', es: 'Licencias Enterprise', de: 'Enterprise-Lizenzen' },
  dataProcessingAddendum: { en: 'DPA', 'zh-Hant': '資料處理附錄', ja: 'DPA', es: 'DPA', de: 'DPA' },
  subProcessors: { en: 'Sub-Processors', 'zh-Hant': '次處理者', ja: '副処理者', es: 'Subencargados', de: 'Unterauftragsverarbeiter' },
  sla: { en: 'SLA', 'zh-Hant': 'SLA', ja: 'SLA', es: 'SLA', de: 'SLA' },
  freeToolsTitle: { en: 'Free Tools', 'zh-Hant': '免費工具', ja: '無料ツール', es: 'Herramientas gratuitas', de: 'Kostenlose Tools' },
  oidcDiscovery: { en: 'OIDC Discovery Explorer', 'zh-Hant': 'OIDC Discovery 探索器', ja: 'OIDC Discovery エクスプローラー', es: 'Explorador de OIDC Discovery', de: 'OIDC-Discovery-Explorer' },
  sslChecker: { en: 'SSL Checker', 'zh-Hant': 'SSL 檢查工具', ja: 'SSL チェッカー', es: 'Comprobador SSL', de: 'SSL-Checker' },
  uuidv7Generator: { en: 'UUID v7 Generator', 'zh-Hant': 'UUID v7 產生器', ja: 'UUID v7 ジェネレーター', es: 'Generador de UUID v7', de: 'UUID-v7-Generator' },
  uuidv7GeneratorNote: {
    en: '& Timestamp Extractor',
    'zh-Hant': '與時間戳解析器',
    ja: '& タイムスタンプ抽出',
    es: 'y extractor de marcas de tiempo',
    de: '& Zeitstempel-Extraktor',
  },
  base64: { en: 'Base64 Decode/Encode', 'zh-Hant': 'Base64 編解碼', ja: 'Base64 デコード／エンコード', es: 'Codificar/decodificar Base64', de: 'Base64 dekodieren/kodieren' },
  jwtDebugger: { en: 'JWT & JWE Debugger', 'zh-Hant': 'JWT 與 JWE 除錯器', ja: 'JWT & JWE デバッガー', es: 'Depurador de JWT y JWE', de: 'JWT- & JWE-Debugger' },
  jwkGenerator: { en: 'JWK Generator', 'zh-Hant': 'JWK 產生器', ja: 'JWK ジェネレーター', es: 'Generador de JWK', de: 'JWK-Generator' },
  passwordHash: { en: 'Password Hash Generator/Verifier', 'zh-Hant': '密碼雜湊產生／驗證', ja: 'パスワードハッシュ生成・検証', es: 'Generador/verificador de hashes de contraseña', de: 'Passwort-Hash-Generator/-Verifier' },
  hmacSignature: { en: 'HMAC Signature Generator/Verifier', 'zh-Hant': 'HMAC 簽章產生／驗證', ja: 'HMAC 署名生成・検証', es: 'Generador/verificador de firmas HMAC', de: 'HMAC-Signatur-Generator/-Verifier' },
  samlTestingTool: { en: 'SAML Testing Tool', 'zh-Hant': 'SAML 測試工具', ja: 'SAML テストツール', es: 'Herramienta de pruebas SAML', de: 'SAML-Testtool' },
  totpAuthenticator: { en: 'TOTP Authenticator', 'zh-Hant': 'TOTP 驗證器', ja: 'TOTP オーセンティケーター', es: 'Autenticador TOTP', de: 'TOTP-Authenticator' },
  passkeyDemo: { en: 'Passkey Demo & WebAuthn Tester', 'zh-Hant': '通行密鑰示範與 WebAuthn 測試工具', ja: 'パスキーデモ & WebAuthn テスター', es: 'Demo de passkeys y probador WebAuthn', de: 'Passkey-Demo & WebAuthn-Tester' },
  smsCostCalculator: { en: 'SMS Cost Calculator', 'zh-Hant': '簡訊成本計算器', ja: 'SMS コスト計算ツール', es: 'Calculadora de costes de SMS', de: 'SMS-Kostenrechner' },
  companyTitle: { en: 'company', 'zh-Hant': '公司', ja: '会社情報', es: 'empresa', de: 'Unternehmen' },
  aboutUs: { en: 'About Us', 'zh-Hant': '關於我們', ja: '会社概要', es: 'Sobre nosotros', de: 'Über uns' },
  contactSales: { en: 'Contact Sales', 'zh-Hant': '聯絡業務', ja: '営業に問い合わせ', es: 'Contactar con ventas', de: 'Vertrieb kontaktieren' },
  ourPromises: { en: 'Our Promises', 'zh-Hant': '我們的承諾', ja: '私たちの約束', es: 'Nuestros compromisos', de: 'Unsere Versprechen' },
  copyright: { en: 'Skymakers Digital Ltd. All rights reserved.', 'zh-Hant': 'Skymakers Digital Ltd. 保留所有權利。', ja: 'Skymakers Digital Ltd. All rights reserved.', es: 'Skymakers Digital Ltd. Todos los derechos reservados.', de: 'Skymakers Digital Ltd. Alle Rechte vorbehalten.' },
};

export const common = {
  moreDevToolsHeading: 'その他の開発者ツール',
  readyTitleDefault: '認証を強化する準備はできましたか？',
  readySubtitleDefault:
    'Authgear で、シームレスで安全、そしてスケーラブルなアイデンティティ管理を体験してください。',
  getStartedFree: '無料で始める',
  howToolWorksDefault: 'ツールの使い方',
  craftedByTag: 'このツールは Authgear が開発しました',
  supportStarUs: 'GitHub でスターを付けて応援してください',
  popupHeading: 'この開発者ツールは Authgear が開発しました',
  popupBody:
    'オープンソースの Auth0／Clerk／Firebase 代替。パスキー、SSO、MFA、パスワードレス、生体認証ログインに対応。',
  popupStartFree: '無料で開発を始める',
  popupStarUs: 'GitHub でスターを付ける',
  popupClose: '閉じる',
  // ツール slug ごとのポップアップ文言。該当する項目がない場合は popupBody にフォールバックします。
  popupPitches: {
    'base64-decode-encode':
      'トークンを手作業でデコードしていませんか？Authgear が OIDC トークンの発行と検証を代行します。数分でアプリにログイン機能を追加できます。',
    'jwt-jwe-debugger':
      'JWT をデバッグ中ですか？Authgear がトークンの発行、ローテーション、検証を代行します。標準で OIDC に準拠。',
    'jwk-generator':
      'JWK を手作業で作っていませんか？Authgear が鍵とローテーションを管理します。数分で OIDC 準拠のプロバイダーを手に入れましょう。',
    'oidc-discovery-endpoint':
      'OIDC エンドポイントを調べていますか？Authgear は完全準拠の OIDC プロバイダーを提供し、Discovery、JWKS、トークンをすべて管理します。',
    'totp-authenticator':
      'TOTP による MFA を半日でアプリに追加。Authgear は認証アプリ対応を標準で備えています。',
    'password-hash-generator':
      'パスワードハッシュを自分で保存する必要はもうありません。Authgear がハッシュ化、保存、アカウントの保護を担います。',
    'hmac-signature-generator-verifier':
      'リクエストに手作業で署名していませんか？Authgear は標準準拠のトークンとセッションでアプリを守ります。',
    'ssl-checker':
      '証明書は万全ですか？Authgear で安全なマネージドログインをサイトに追加しましょう。SSO、MFA、パスキーを標準搭載。',
    'uuidv7-generator':
      'ユーザー ID を生成していますか？Authgear はすべてのユーザーに安全なアイデンティティを提供します。サインアップ、SSO、MFA を標準搭載。',
    'passkey-demo':
      'パスキーが気に入りましたか？Authgear なら半日でユーザーに提供できます。プロトコルのコードを書く必要はありません。',
    'sms-cost-calculator':
      'OTP のコストが気になりますか？Authgear は OTP を WhatsApp とメールで配信し、SMS 費用を削減します。',
  },
  faqHeading: 'よくある質問',
  stepLabel: 'ステップ {n}.',
  demoCtaText: 'アプリに認証機能を組み込んでいますか？',
  demoCtaButton: '開発を始める',
} as const;

export const registry = {
  'jwt-jwe-debugger': { label: 'JWT & JWE デバッガー' },
  'jwk-generator': { label: 'JWK ジェネレーター' },
  'hmac-signature-generator-verifier': { label: 'HMAC ツール' },
  saml: { label: 'SAML テストツール' },
  'totp-authenticator': { label: 'TOTP オーセンティケーター' },
  'password-hash-generator': { label: 'パスワードハッシュ生成ツール' },
  'base64-decode-encode': { label: 'Base64 デコード・エンコード' },
  'uuidv7-generator': { label: 'UUID v7 ジェネレーター & タイムスタンプ抽出' },
  'passkey-demo': { label: 'パスキーデモ & WebAuthn テスター' },
  'sms-cost-calculator': { label: 'SMS コスト計算ツール' },
} as const;

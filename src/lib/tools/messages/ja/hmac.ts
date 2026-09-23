export const hmac = {
  metaTitle: 'HMAC 生成・検証ツール: SHA-256、SHA-384、SHA-512 | Authgear',
  metaDescription:
    'HMAC-SHA256、SHA-384、SHA-512 の署名を生成・検証し、Hex または Base64 で出力。すべてブラウザ内で動作し、秘密鍵はデバイスの外に出ません。',
  heroTitle: 'HMAC 署名生成・検証ツール',
  heroDescription:
    'HMAC-SHA256、SHA-384、SHA-512 の署名を生成・検証し、Hex または Base64 で出力します。計算はすべてブラウザ内のローカルで行われ、秘密鍵とペイロードはデバイスの外に出ません。',
  iframeTitle: 'HMAC 署名生成・検証ツール',
  policyPrefix:
    'お客様のデータの安全を最優先にしています。署名の生成と検証はすべてブラウザ内で完結します。このツールはペイロード、シークレット、署名を保存したり、ブラウザの外に送信したりすることはありません。ソースコード: ',
  policyLink: 'https://github.com/authgear/authgear-widget-hmac-tool',
  howSectionTitle: 'HMAC 署名生成ツールの使い方',
  supportedAlgorithmsTitle: '対応アルゴリズム',
  supportedAlgorithmsIntro:
    '次のハッシュアルゴリズムで HMAC 署名を計算し、Hex または Base64 で出力できます。Webhook の署名検証、API リクエストの署名、データ整合性チェックに便利です。',
  algHs256: 'HMAC + SHA-256',
  algHs384: 'HMAC + SHA-384',
  algHs512: 'HMAC + SHA-512',
  step1Title: 'ペイロードを入力:',
  step1Body: '署名または検証したいメッセージやペイロードの内容をそのまま入力します。',
  step2Title: 'Webhook シークレットを入力:',
  step2Body:
    'HMAC の生成に使う共有秘密鍵を入力します。通常はお客様と Webhook プロバイダーだけが知っている値です。',
  step3Title: 'HMAC アルゴリズムを選択:',
  step3Body: 'アプリケーションの設定に合わせて HS256、HS384、HS512 から選びます。',
  step4Title: '署名を生成:',
  step4Body:
    'クリックすると、選択したアルゴリズムでペイロードとシークレットから HMAC 署名を計算します。',
  step5Title: '受信した署名を貼り付けて検証:',
  step5Body:
    '外部システムや Webhook から受け取った署名を貼り付け、生成した署名と比較します。',
  faqWhatTitle: 'HMAC とは？',
  faqWhatBody:
    'HMAC（Hash-Based Message Authentication Code）は、暗号学的ハッシュ関数と秘密鍵を使ってメッセージやペイロードの署名を生成する仕組みです。この署名はデータの完全性と認証の両方を提供し、メッセージが改ざんされておらず、確かに主張どおりの送信者から届いたことを保証します。',
  faqWhyTitle: 'なぜ HMAC なのか？',
  faqWhy1: 'Webhook や API コールバックなどでメッセージの真正性を検証できる',
  faqWhy2: 'メッセージの完全性を保証し、改ざんやリプレイ攻撃を防ぐ',
  faqWhy3: 'シンプルで広く使われ、ほとんどのプラットフォームがサポートする暗号技術',
  bestPracticesTitle: 'ベストプラクティス',
  bp1: 'Webhook シークレットは秘密にし、公開の場で共有しないでください。',
  bp2: 'ペイロードを処理する前に、必ず受信した Webhook の署名を検証してください。',
  bp3: 'SHA-256 以上を推奨します。新しいシステムでは MD5 や SHA-1 ベースの HMAC を避けてください。',
} as const;

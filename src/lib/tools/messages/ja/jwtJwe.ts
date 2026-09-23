export const jwtJwe = {
  metaTitle: 'JWT & JWE デバッガー: デコード、検証、暗号化、復号 | Authgear',
  metaDescription:
    'JWT のデコードと検証、JWE への暗号化、JWE の復号、クレームの確認。jwk／jwks、署名検証、暗号化に対応した開発者向け JWT デバッガー。',
  heroTitle: 'JWT & JWE デバッガー',
  heroDescription:
    'JSON Web Token のデコード、検証、署名、暗号化、復号を行えます。この JWT デバッガーで、JWT のヘッダーとクレームの確認、署名の検証、暗号化された JWE 形式との相互変換ができます。',
  iframeTitle: 'JWT & JWE デバッガー',
  policyPrefix:
    'お客様のデータの安全を最優先にしています。エンコード、デコード、暗号化、復号はすべてこのブラウザ内で行われます。このツールは JWT や JWE を保存したり、ブラウザの外に送信したりすることはありません。ソースコード: ',
  policyGithub: 'https://github.com/authgear/authgear-widget-jwt-debugger',
  card1Title: 'JWT のエンコード／デコード',
  card1Desc:
    'JWT をすばやく作成・確認できます。JWT を貼り付けてヘッダーとペイロードをデコードするか、テスト用に自分で組み立てます。',
  card2Title: 'JWT の署名と検証',
  card2Desc:
    'JWT 作成時に暗号署名を生成し、既存の JWT の署名を検証してトークンの真正性と完全性を確認します。',
  card3Title: 'JWE 暗号化',
  card3Desc:
    '公開鍵を使って任意の JWT を JWE に暗号化し、転送中もデータの機密性を保ちます。',
  card4Title: 'JWE 復号',
  card4Desc:
    'JWE トークンを復号して、ペイロードを含む元の JWT を取り出し、分析できます。',
  howSectionTitle: 'JWT & JWE デバッガーの使い方',
  s1Label: 'ステップ 1.',
  s1Title: 'JWT を貼り付けるか生成する:',
  s1i1: 'JWT を入力すると、デコードされたヘッダーとペイロードが即座に表示されます。',
  s1i2:
    'ツールは JWT の署名を検証して真正性と完全性を確認し、トークンが有効か改ざんされているかを表示します。',
  s2Label: 'ステップ 2.',
  s2Title: '署名を検証する（JWT 検証）:',
  s2i1:
    'JWK または JWKS（jwk 形式 / jwks.json）を指定するか、PEM 公開鍵を貼り付けてトークンの署名を検証し、完全性を確認します。デバッガーは kid、alg、検証状況を表示します。',
  s3Label: 'ステップ 3.',
  s3Title: 'JWT に署名する / 作成する:',
  s3i1:
    'アルゴリズム（RS256、ES256、HS256 など）と署名鍵を選んで、署名付き JWT を組み立てます。JWT 認証フローのテストや、JWT のベストプラクティスを試すのに便利です。',
  s4Label: 'ステップ 4.',
  s4Title: 'JWT を JWE に暗号化する:',
  s4i1Part1:
    '公開鍵を使って署名付き JWT を JWE（JSON Web Encryption）に暗号化し、機密性のあるトークンを生成します。署名による完全性に加えてペイロードの機密性が必要な場合に JWE を使います。（使い分けはガイド「',
  s4GuideLinkLabel: 'JWE と JWT の違い',
  s4i1Part2: '」をご覧ください。）',
  s4GuideLink: '/post/jwe-vs-jwt',
  s5Label: 'ステップ 5.',
  s5Title: 'JWE を復号する:',
  s5i1:
    'JWE を貼り付けて秘密鍵を指定すると、復号して元の JWT を取り出せます。一般的な JWE アルゴリズムに対応し、ヘッダーのフィールドと enc パラメーターを表示します。',
  s6Label: 'ステップ 6.',
  s6Title: 'クレームを確認してデバッグする',
  s6i1:
    'クレームを表示し、exp／iat／nbf のロジックを確認し、わかりやすい警告（期限切れ、有効期間前）を確認できます。コピーボタンでトークンや鍵をローカルテスト用にエクスポートできます。',
  faqJwtLinkText: 'JWT',
  faqJwtTitleSuffix: '（JSON Web Token）とは？',
  faqJwtBodyP1:
    'JWT（JSON Web Token）は、コンパクトで URL セーフな JSON オブジェクトとして当事者間で情報を安全にやり取りするためのオープン標準（RFC 7519）です。',
  faqJwtBodyLinkMid: 'JWT は認証システムで広く使われており',
  faqJwtBodyLinkMidHref: '/post/web-application-authentication-guide',
  faqJwtBodyP2:
    '、ステートレスなセッション管理と API のセキュリティを実現します。標準的な JWT は次の 3 つの部分で構成されます:',
  faqJwtBullet1: 'ヘッダー: トークンの種類とハッシュアルゴリズムを指定します。',
  faqJwtBullet2: 'ペイロード: クレーム、つまりユーザーに関する主張と追加のメタデータを含みます。',
  faqJwtBullet3:
    '署名: JWT の送信者が本人であることを検証し、途中でメッセージが改変されていないことを保証します。',
  faqJwtUseCases: '主なユースケース:',
  faqJwtUse1: 'ユーザー認証とシングルサインオン（SSO）',
  faqJwtUse2: '安全な API 認証と認可',
  faqJwtUse3: 'アプリケーション間の情報交換',
  faqJwtBase64Part1: 'ヒント: ヘッダーとペイロードの各セグメントは Base64URL でエンコードされています。1 つのセグメントを',
  faqJwtBase64LinkLabel: '無料の Base64 デコードツール',
  faqJwtBase64Part2: 'に貼り付けると中身を確認できます。',
  faqJweTitle: 'JWE（JSON Web Encryption）とは？',
  faqJweBody:
    'JWE（JSON Web Encryption）は、コンテンツを暗号化して転送情報の機密性を確保するもう一つのオープン標準（RFC 7516）です。JWE は署名付き JWT などのコンテンツを暗号化された形式で包み、意図した相手だけが復号して読めるようにします。標準的な JWE の構造:',
  faqJweB1: '保護ヘッダー',
  faqJweB2: '暗号化された鍵',
  faqJweB3: '初期化ベクトル',
  faqJweB4: '暗号文（実際に暗号化されたコンテンツ）',
  faqJweB5: '認証タグ',
  faqJweUseCases: '主なユースケース:',
  faqJweUse1: '転送中の機密性の高い JWT ペイロードを保護する',
  faqJweUse2: 'サービス間の機密データ交換を安全にする',
  faqJweUse3: '標準的な JWT の上にセキュリティの層を追加する',
  dbgBpTitle: 'JWT & JWE デバッガーのベストプラクティス',
  dbgBp1:
    '署名: JWT の送信者が本人であることを検証し、途中でメッセージが改変されていないことを保証します。',
  dbgBp2: 'ペイロード: クレーム、つまりユーザーに関する主張と追加のメタデータを含みます。',
  dbgBp3: 'ヘッダー: トークンの種類とハッシュアルゴリズムを指定します。',
} as const;

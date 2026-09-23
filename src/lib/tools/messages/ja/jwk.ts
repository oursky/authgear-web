export const jwk = {
  metaTitle: 'JWK ジェネレーター: PEM から JWK、JWK から PEM、JWKS 生成 | Authgear',
  metaDescription:
    'PEM → JWK、JWK → PEM の変換、または鍵の生成と JWKS のダウンロード。kid、alg、use（sig/enc）を指定可能。ブラウザ内のみで動作、登録不要。',
  heroTitle: 'JWK ジェネレーター: PEM から JWK への変換と JWKS の生成',
  heroDescription:
    '安全な署名と暗号化のために、PEM 形式と JWK 形式の暗号鍵を生成・変換できます。',
  iframeTitle: 'JWK ジェネレーターウィジェット',
  policyLearnMore: 'JWKS とは',
  policyGithub: 'https://github.com/authgear/authgear-widget-jwk-generator',
  policyLine1:
    'この軽量な JWK ジェネレーターはすべてブラウザ内で動作し、鍵がお使いのマシンの外に出ることはありません。PEM から JWK、JWK から PEM への変換、あるいは新しい鍵の生成と jwks_uri エンドポイント用 JWKS のエクスポートに使えます。詳しくはこちら:',
  policyLine2: 'ソースコード:',
  card1Title: 'PEM から JWK',
  card1Desc:
    'PEM エンコードされた鍵または X.509 証明書を貼り付け、kid を設定し、alg と use（sig / enc）を選んで「Generate JWK」をクリックします。PEM → JWK を標準の jwk 形式に変換するので、JWKS に追加したり、JOSE ライブラリ（Node の jose、Python の jwcrypto など）にそのまま渡せます。',
  card2Title: 'JWK から PEM',
  card2Desc:
    'JWK の JSON オブジェクトを貼り付け、CLI、サーバー、レガシーなツール向けに PEM 形式の鍵をエクスポートします。JWK セット内の kid、alg、use のメタデータを維持しつつ、OpenSSL やサーバーサイドライブラリ用の PEM 公開鍵が必要なときに使います。',
  card3Title: 'JWK を生成',
  card3Desc:
    'JWK ジェネレーターモードで新しい鍵を作成します。鍵の用途（署名 sig または暗号化 enc）、鍵の種類（RSA、EC、OKP、oct）を選び、サイズ／曲線／パラメーターを設定します。ジェネレーターは alg の候補を提案し、編集可能な kid を自動生成します。出力は単一の JWK か、そのままホストできる完全な JWKS（jwks.json）から選べます。',
  howSectionTitle: 'JWK ジェネレーターの使い方',
  s1Label: 'ステップ 1.',
  s1Title: 'PEM と JWK を相互変換する:',
  s1i1: 'PEM 鍵を貼り付けて JSON Web Key 形式に変換します。逆方向の変換も可能です。',
  s1i2: '変換した鍵をコピーして、アプリケーションで使用します。',
  s1i3:
    'なぜ PEM → JWK なのか？多くのライブラリやアイデンティティプラットフォームは JWK／JWKS を前提としています。PEM を JWK に変換すれば、JWT 検証フローや、jwks_uri で jwks.json を読み取るあらゆるサービスから鍵を利用できるようになります。',
  s2Label: 'ステップ 2.',
  s2Title: '新しい鍵を生成する:',
  s2i1: '署名用と暗号化用のどちらの鍵が必要かを選びます。',
  s2i2:
    'セキュリティ要件に合った鍵の種類を選びます。対称鍵（oct）、RSA、楕円曲線（EC または OKP）などです。',
  s2i3:
    'システム要件に合わせて暗号アルゴリズムを選びます（例: RSA 署名なら RS256）。',
  s2i4: '生成された鍵を受け取ります:対称鍵:',
  s2i5a: 'a. 秘密鍵の文字列 + JWK JSON。',
  s2i5b:
    'b. 非対称鍵: PEM 形式の秘密鍵と公開鍵 + それぞれに対応する秘密鍵部分・公開鍵部分の JWK オブジェクト。',
  s3Label: 'ステップ 3.',
  s3Title: '鍵を安全に使う:',
  s3i1: 'これらの鍵を使って JWT の署名や暗号化を行います。',
  s3i2: '鍵の検出のために、認可サーバー上で JWK セットをホストします。',
  s3i3: '鍵のローテーションと管理を容易にし、堅牢なセキュリティ体制を維持します。',
  faqJwkLinkText: 'JWK',
  faqJwkTitleSuffix: '（JSON Web Key）とは？',
  faqJwkBody:
    'JWK は暗号鍵を表す JSON データ構造です。JWKS（JSON Web Key Set）は、JWK の keys 配列を持つオブジェクトです。JWKS は、アイデンティティプロバイダーが jwks_uri で公開鍵を公開し、クライアントが JWT トークンを検証できるようにするための標準形式です（RFC 7517 参照）。「JWKS とは」「jwks uri」で検索してたどり着いた方は、まさにこの形式が必要です。',
  faqJwkBullet1: '機械可読な JSON 形式で、Web API 全般で扱いやすい',
  faqJwkBullet2: '対称鍵・非対称鍵を含むすべての鍵タイプに対応',
  faqJwkBullet3: 'モダンなアプリケーションの鍵のローテーションと管理を容易にする',
  faqPemTitle: 'PEM とは',
  faqPemBody:
    'PEM（Privacy Enhanced Mail）は、暗号鍵や証明書の保存・共有に広く使われる Base64 エンコード形式です。PEM から JWK への変換を使えば、PEM 鍵を JWKS エンドポイントやモダンな JOSE ライブラリから利用できるようになります。',
  faqPemBase64Part1: 'PEM は Base64 エンコードされた DER データにすぎないため、',
  faqPemBase64LinkLabel: '無料の Base64 デコードツール',
  faqPemBase64Part2: 'で生のバイト列を確認できます。',
  bestPracticesTitle: 'ベストプラクティス',
  bp1:
    '生成した秘密鍵を本番環境で使わないでください。本番環境では、安全な HSM や KMS で秘密鍵を生成・保管してください。',
  bp2: '適切な鍵長とモダンなアルゴリズムを使ってください（例: 対応環境では Ed25519）。',
  bp3:
    'JWKS は安定した jwks_uri で HTTPS 経由でホストし、鍵を定期的にローテーションしてください。新しい kid で新しい鍵を公開し、廃止する鍵は安全に取り除きます。',
  bp4: 'JWT 検証時にクライアントが正しい鍵を選べるよう、JWK に kid と alg のメタデータを含めてください。',
} as const;

export const oidc = {
  metaTitle: 'OIDC Discovery エンドポイントエクスプローラー | Authgear',
  metaDescription:
    '任意の OIDC プロバイダーの .well-known/openid-configuration を取得して確認。認可エンドポイント、トークンエンドポイント、JWKS、スコープ、署名アルゴリズムを表示します。',
  heroTitle: 'OpenID Connect Discovery エクスプローラー',
  heroDescription:
    'OIDC の issuer URL を入力すると、その Discovery エンドポイントを取得します。.well-known/openid-configuration の全エンドポイント、対応スコープ、署名アルゴリズム、JWKS をログイン不要で即座に確認できます。',
  iframeTitle: 'OIDC Discovery エンドポイントエクスプローラー',
  policyLine1:
    'お客様のデータの安全を最優先にしています。すべてブラウザ内のローカルで動作します。',
  policyLine2:
    'このツールはお使いのブラウザから OIDC プロバイダーに直接 Discovery ドキュメントを取得します。Authgear がリクエストを見たり記録したりすることはありません。',
  card1Title: 'OpenID Configuration の取得',
  card1Desc:
    '入力した issuer URL に基づいて、/.well-known/openid-configuration から OpenID Connect の Discovery ドキュメントを自動取得します。',
  card2Title: '主要エンドポイントの概要',
  card2Desc:
    'issuer、認可エンドポイント、トークンエンドポイント、JWKS URI など、よく使われる設定フィールドと識別子をすばやく確認できます。',
  card3Title: 'Discovery の JSON 出力',
  card3Desc:
    'シンタックスハイライト付きの JSON ビューで Discovery ドキュメント全体を確認できます。デバッグやドキュメント作成のために、レスポンス全体や個々のフィールドを簡単にコピーできます。',
  s1Label: 'ステップ 1.',
  s1Title:
    'Discovery URL（例: https://accounts.google.com/.well-known/openid-configuration や https://project.authgear.cloud/.well-known/openid-configuration）を入力して「Fetch」をクリックします。',
  s2Label: 'ステップ 2.',
  s2Title: 'パースされたメタデータ、主要エンドポイント、プロバイダーの機能を確認します。',
  s3Label: 'ステップ 3.',
  s3Title: '個々のフィールドをワンクリックでコピーしたり、生の JSON や JWKS を確認したりできます。',
  faq1Title: 'OIDC の Discovery エンドポイントとは？',
  faq1Body:
    'OIDC の Discovery エンドポイントは {issuer}/.well-known/openid-configuration にある標準化された URL で、プロバイダーの設定を記述した JSON ドキュメントを返します。認可エンドポイント、トークンエンドポイント、JWKS URI、対応スコープ、レスポンスタイプ、署名アルゴリズムなどの機能が列挙されています。クライアントはこれを使って、エンドポイント URL をハードコードせずに自動的に設定を行えます。',
  faq2Title: 'すべての OIDC プロバイダーが Discovery に対応していますか？',
  faq2Body:
    '最近の準拠したほとんどの OIDC プロバイダーは Discovery に対応しています。クライアントの自動設定をサポートしたいプロバイダーには、OpenID Connect 仕様で必須とされています。古いシステムや独自のアイデンティティシステムでは /.well-known/openid-configuration エンドポイントを公開していない場合があり、その場合はエンドポイントを手動で設定する必要があります。このツールでの取得に失敗した場合、そのプロバイダーが Discovery に対応していないか、エンドポイントにアクセス制限がかかっています。',
  faq3Title: '実際の OpenID Discovery URL はどのようなものですか？',
  faq3Body:
    'Discovery URL の形式は {issuer}/.well-known/openid-configuration で、{issuer} は OpenID Connect プロバイダーのベース URL です。例えば、Google は https://accounts.google.com/.well-known/openid-configuration、Okta は https://{yourOktaDomain}/.well-known/openid-configuration、Authgear は https://{your-project}.authgear.cloud/.well-known/openid-configuration を使います。上に issuer URL を入力すると、このツールが自動的に取得します。',
  faq4Title: 'Discovery エンドポイントとは？',
  faq4Body:
    'Discovery エンドポイントとは、サービスが自身の機能や設定を公開するための well-known な URL です。OpenID Connect では、Discovery エンドポイントは /.well-known/openid-configuration というパスに従います（RFC 8414 で定義）。クライアントアプリケーションはこれを使って、手動設定なしにプロバイダーのエンドポイントと対応機能を動的に検出できます。',
  faq5Title:
    '同じベンダー（Okta、Azure、Keycloak）の OIDC プロバイダーでも Discovery URL は異なりますか？',
  faq5Body:
    'はい。Discovery URL の形式（/.well-known/openid-configuration）は共通ですが、ベースとなる issuer URL が異なります。Azure AD では通常「https://login.microsoftonline.com/{tenant-id}/v2.0」、Keycloak では「https://{host}/realms/{realm}」、Okta では「https://{yourOktaDomain}」です。上にお使いのプロバイダーの issuer URL を入力すると、ツールが完全な Discovery URL を自動的に解決します。',
} as const;

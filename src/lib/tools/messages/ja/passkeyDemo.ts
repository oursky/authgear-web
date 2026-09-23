export const passkeyDemo = {
  metaTitle: 'パスキーデモ & WebAuthn テスター: ブラウザでパスキーを試す',
  metaDescription:
    '本物のパスキーを作成し、WebAuthn クレデンシャルを確認し、サインインを検証。すべてブラウザ内のローカルで完結し、サーバーには何も送信・保存されません。',
  heroTitle: 'パスキーデモ & WebAuthn テスター',
  heroDescription:
    'WebAuthn API で本物のパスキーを作成し、デコードされたクレデンシャルを確認し、サインインしてサーバーが実行するすべての検証ステップを観察できます。すべて WebCrypto を使ってブラウザ内のローカルで処理されます。アカウント不要で、データがデバイスの外に出ることはありません。',
  iframeTitle: 'パスキーデモ & WebAuthn テスター',
  policyPrefix:
    'お客様のデータの安全を最優先にしています。パスキーの作成、クレデンシャルの確認、署名の検証は、WebAuthn API と WebCrypto API を使ってすべてブラウザ内で完結します。バックエンドは存在せず、このツールがデバイスの外に何かを送信・保存することはありません。ソースコード: ',
  policyLink: 'https://github.com/oursky/authgear-web',
  howSectionTitle: 'パスキーデモの仕組み',
  step1Title: '作成オプションを選ぶ:',
  step1Body:
    'オーセンティケーターの種類、ユーザー検証、レジデントキー、アテステーション、アルゴリズムを選びます。PublicKeyCredentialCreationOptions の JSON は変更に応じてリアルタイムに更新されます。',
  step2Title: 'パスキーを作成する:',
  step2Body:
    'ブラウザが navigator.credentials.create() を呼び出し、デバイスが Face ID、Touch ID、Windows Hello、またはセキュリティキーを求めます。',
  step3Title: 'クレデンシャルを確認する:',
  step3Body:
    'ツールが clientDataJSON をデコードし、アテステーションオブジェクトを CBOR デコードします。フラグ、署名カウント、AAGUID（オーセンティケーターのモデル）、クレデンシャル ID、そして JWK と PEM 形式の公開鍵を表示します。',
  step4Title: 'パスキーでサインインする:',
  step4Body:
    'navigator.credentials.get() がアサーションを生成します。保存済みクレデンシャルの一覧から選ぶか、空の allow-list を使った discoverable credential フローで行います。',
  step5Title: 'サーバーのように検証する:',
  step5Body:
    '実際のサーバーが行うすべてのチェックに、説明付きの合格／不合格バッジが付きます。セレモニーの種類、チャレンジ、オリジン、RP ID ハッシュ、フラグ、WebCrypto による署名検証です。',
  howGuideText: '自分のアプリにパスキーを追加する準備はできましたか？',
  howGuideLinkText: 'パスキー実装の開発者ガイドを読む',
  howGuideHref: '/post/how-to-implement-passkeys-developer-guide',
  platformsTitle: '対応プラットフォーム',
  platformsIntro:
    'パスキーはすべての主要プラットフォームで動作し、各エコシステム内で同期されます。このデモは WebAuthn に対応したあらゆるブラウザで実行できます。',
  plat1Name: 'Apple',
  plat1Desc: 'iOS 16 以降と macOS 13 以降。Face ID または Touch ID、iCloud キーチェーンで同期。',
  plat2Name: 'Android & Chrome',
  plat2Desc: 'Android 9 以降。指紋または画面ロック、Google パスワードマネージャーで同期。',
  plat3Name: 'Windows',
  plat3Desc: 'Windows 10 と 11。Windows Hello の顔認証、指紋、または PIN。',
  plat4Name: 'パスワードマネージャー',
  plat4Desc: '1Password、Bitwarden、Dashlane、Proton Pass などがパスキーをクロスプラットフォームで保存・同期します。',
  plat5Name: 'セキュリティキー',
  plat5Desc: 'YubiKey などの FIDO2 ハードウェアキーは、クロスプラットフォーム（USB/NFC）トランスポートで動作します。',
  readyTitle: '自分のアプリにパスキーを導入する準備はできましたか？',
  readySubtitle: 'Authgear ならパスキーログインを標準で利用できます。WebAuthn の配線作業は不要です。',
  readyCta: 'Authgear のパスキーを見る',
  faqWebauthnTitle: 'WebAuthn とは？',
  faqWebauthnBody:
    'WebAuthn（Web Authentication）は、パスキーを支える W3C 標準のブラウザ API です。共有のパスワードの代わりに、デバイスがサイトごとに公開鍵と秘密鍵のペアを作成します。秘密鍵はオーセンティケーターの外に出ず、サイトは公開鍵だけを保存します。サインインはチャレンジレスポンス方式の署名で行われます。ブラウザがすべてのクレデンシャルを作成元のオリジンに厳密に結び付けるため、パスキーはフィッシングに耐性があります。',
  faqWebauthnLinkText: 'パスキー実装の開発者ガイドをご覧ください。',
  faqWebauthnLinkHref: '/post/how-to-implement-passkeys-developer-guide',
  faqSafeTitle: 'ここでパスキーを作成しても安全ですか？',
  faqSafeBody:
    'はい。このページで作成されるパスキーは本物ですが、このサイトだけに限定されており、このデモ以外には使えません。秘密鍵はデバイスのオーセンティケーターに留まり、公開鍵とクレデンシャルのメタデータはブラウザの localStorage にのみ保存されます。サーバーが存在しないため、どこにも送信されません。デモの記録はワンクリックで削除でき、パスキー自体もいつでもデバイスから削除できます。',
  faqDeleteTitle: 'デモのパスキーをデバイスから削除するには？',
  faqDeleteIntro:
    'ツール内の「Forget」はこのページの記録を削除するだけです。パスキーをデバイスから削除するには:',
  faqDeleteIos: 'iOS / macOS: 設定 → パスワード（またはパスワードアプリ）→ このサイトを探す → パスキーを削除。',
  faqDeleteAndroid: 'Android / Chrome: Google パスワードマネージャー → パスワード → このサイトを探す → 削除。',
  faqDeleteWindows: 'Windows: 設定 → アカウント → パスキー → このサイトを探す → 削除。',
  faqDeleteManagers: 'パスワードマネージャー（1Password、Bitwarden など）: このサイトの項目を探して、そこで削除します。',
  faqAaguidTitle: 'AAGUID とは？',
  faqAaguidBody:
    'AAGUID（Authenticator Attestation Globally Unique Identifier）は、個々のデバイスではなくオーセンティケーターのモデル（例: Google パスワードマネージャーや YubiKey 5）を識別する 16 バイトの ID です。このツールは、コミュニティが管理する passkey-authenticator-aaguids リストのスナップショットと照合して解決します。アテステーションが「none」（デフォルト）の場合、多くのオーセンティケーターはプライバシーのためにこれをゼロにします。',
  faqSignCountTitle: '署名カウントが 0 と表示されるのはなぜ？',
  faqSignCountBody:
    '署名カウンターは複製されたクレデンシャルを検出するために設計されたもので、使用ごとに増えるはずのものです。しかし同期されるパスキーは複数のデバイスに同時に存在し、単一の共有カウンターを維持できません。そのため、ほとんどのパスキープロバイダー（iCloud キーチェーン、Google パスワードマネージャー）は常に 0 を返し、「カウンター非対応」を意味します。ハードウェアセキュリティキーは通常、カウンターを増やします。',
} as const;

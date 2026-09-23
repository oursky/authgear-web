export const passwordHash = {
  metaTitle: 'パスワードハッシュ生成・検証ツール（Argon2id、bcrypt、scrypt、PBKDF2）: 2026 年版',
  metaDescription:
    '2026 年の OWASP / NIST パラメータープリセットを備えた無料のパスワードハッシュ生成・検証ツール。Argon2id、bcrypt、scrypt、PBKDF2 のハッシュをソルト付きで生成・検証し、実行時間をリアルタイム表示。完全クライアントサイドで、ブラウザの外に何も出ません。',
  heroLine1: 'パスワードハッシュ生成・検証ツール',
  heroLine2: '（Argon2id、bcrypt、scrypt、PBKDF2: 2026 年 OWASP デフォルト）',
  heroDescription:
    '現実的で最新のパラメーターを使ってパスワードハッシュを生成・検証するクライアントサイドツールです。連携のデバッグや、ソルト、メモリ、イテレーションがコストにどう影響するかの理解に役立ちます。デフォルト値は OWASP 2026 のベースライン（Argon2id m = 19 MiB、t = 2、p = 1）と NIST SP 800-63B の PBKDF2 最小値に従います。ローカルで動作し、パスワードがブラウザの外に出ることはありません。',
  iframeTitle: 'パスワードハッシュ生成ツール',
  policyPrefix:
    'お客様のデータの安全を最優先にしています。ハッシュ化と検証はすべてこのブラウザ内で行われます。このツールはパスワードやハッシュを保存したり、ブラウザの外に送信したりすることはありません。',
  featureSectionTitle: '対応するパスワードハッシュ関数',
  f1Title: 'Argon2id 生成とパラメーター（2026 年設定）',
  f1Desc:
    'Argon2id はメモリハードなモダンな関数で、GPU や ASIC を使う攻撃者のコストを引き上げます。OWASP 2026 のベースラインは m = 19 MiB、t = 2、p = 1 に 16 バイトのランダムなソルトです。ハードウェアが許せば m = 64 MiB / t = 3 / p = 4 の方が強固です。本番環境で 1 回の検証が 250〜500 ms 程度になるように調整してください。',
  f2Title: 'bcrypt 生成（コスト / ラウンド）',
  f2Desc:
    'bcrypt は実績があり、広く利用できます。コストファクター 12 が 2026 年の最小値で、新しいシステムではコスト 13〜14 が推奨されます。14 を超えるとログインの遅延が目立つようになります。互換性を重視して $2b$ 形式で出力します。bcrypt は入力の先頭 72 バイトしか考慮しない点に注意してください。',
  f3Title: 'scrypt 生成（N、r、p）',
  f3Desc:
    'scrypt はメモリハード性を加えます。2026 年のベースラインは N = 2^17、r = 8、p = 1（検証 1 回あたり約 128 MiB）です。控えめなハードウェアでのインタラクティブなログインでは N = 2^15、r = 8、p = 1 でも許容されますが、2^14 未満の値は決して使わないでください。',
  f4Title: 'PBKDF2 生成（SHA-256 / SHA-512）',
  f4Desc:
    'PBKDF2 は互換性と FIPS 準拠のための定番です。NIST SP 800-63B（2024 年更新）は PBKDF2-HMAC-SHA256 で 600,000 回以上、PBKDF2-HMAC-SHA512 で 210,000 回以上のイテレーションを要求しています。ハードウェアの進化に合わせて毎年見直してください。',
  f5Title: 'ソルト（と任意のペッパー）',
  f5DescBeforeLinks:
    'このツールは暗号学的に安全なソルトを生成し、長さとエンコード（Hex/Base64）を設定できます。ハッシュには保存しないペッパー（サイト全体のサーバーシークレット）を追加する構成もあります。ペッパーは慎重に使い、他のシークレットと同様に管理してください。',
  f5ReadMore: '関連記事:',
  f5Link1: 'パスワードのハッシュ化とソルトの解説',
  f5Link1Href: '/post/password-hashing-salting-function-and-algorithm-explained',
  f5Link2: '適切なハッシュ関数の選び方',
  f5Link2Href: '/post/password-hashing-how-to-pick-the-right-hashing-function',
  howSectionTitle: 'パスワードハッシュ生成ツールの使い方',
  h1Label: 'ステップ 1.',
  h1Title: 'パスワードを入力する',
  h1i1: '「生成」タブを開き、デモ用のパスワードを入力します（本物の認証情報は避けてください）。',
  h2Label: 'ステップ 2.',
  h2Title: 'アルゴリズムを選ぶ',
  h2i1: '新しいシステムには、一般的に Argon2id が推奨されます。',
  h3Label: 'ステップ 3.',
  h3Title: 'パラメーターを設定する:',
  h3i1: 'Argon2id: メモリ（MiB）、イテレーション（t）、並列度（p）。',
  h3i2: 'bcrypt: コスト（2^cost ラウンド）。',
  h3i3: 'scrypt: N（2 のべき乗）、r、p。',
  h3i4: 'PBKDF2: イテレーションとダイジェスト（SHA-256/512）。',
  h4Label: 'ステップ 4.',
  h4Title: 'パスワードハッシュを生成する',
  h4i1: '「パスワードハッシュを生成」をクリックし、エンコードされた文字列をコピーします。',
  h5Label: 'ステップ 5.',
  h5Title: 'パスワードハッシュを検証する',
  h5i1: '「検証」タブに切り替えて、パスワードとエンコード済みハッシュの組み合わせをテストします。',
  faq1Title: '本物のパスワードで使っても安全ですか？',
  faq1Body:
    'ハッシュ化はすべてブラウザ内のローカルで行われます。ただし安全のため、オンラインツールでは本番のシークレットを使わないようにしてください。',
  faq2Title: 'どのハッシュ関数を使うべきですか？',
  faq2Body:
    '新しいシステムには一般的に Argon2id が推奨されます。bcrypt と scrypt は広く導入されており、PBKDF2 は互換性のためのフォールバックです。必ずベンチマークを取り、レイテンシー目標を満たすパラメーターを選んでください。',
  faq3Title: 'ハッシュ化にはどれくらい時間をかけるべきですか？',
  faq3Body:
    '多くのチームは認証パスで約 250〜500 ms を目標にしています。本番ハードウェアで UX を損なわない範囲で、最も遅い設定を選んでください。',
  faq4Title: 'フレームワークでハッシュが検証できないのはなぜ？',
  faq4Body:
    'よくある原因: 空白や改行コード、エンコードの不一致（Hex と Base64）、bcrypt のプレフィックスの違い（$2a$ と $2b$）、ペッパーの付け忘れです。',
  faq5Title: 'ソルトの長さはどれくらいにすべきですか？',
  faq5Body:
    '16〜32 バイトのランダムデータが標準です。このツールはデフォルトで安全な乱数を使い、長さとエンコードを表示します。',
  faq6Title: 'このツールでパスワードハッシュを復号できますか？',
  faq6Body:
    'できません。他のどんなツールでも不可能です。Argon2id、bcrypt、scrypt、PBKDF2 は一方向のハッシュ関数であり、暗号化ではありません。これらを「元に戻す」鍵は存在しません。ハッシュからパスワードを復元する唯一の方法は、候補となるパスワードを推測し、それぞれをハッシュ化して比較することです。これがパスワードクラッキング攻撃の手法であり、モダンなメモリハードなパラメーターは、それを大規模に行うことが経済的に成り立たないように調整されています。既知のパスワードを保存済みハッシュと照合するには「検証」タブを使ってください。',
  faq7Title: 'Argon2id、bcrypt、scrypt: 2026 年にはどれを選ぶべき？',
  faq7Body:
    'Argon2id が新しいシステムの推奨デフォルトです。PHC（パスワードハッシュコンペティション）の優勝者であり、GPU や ASIC による攻撃に対してメモリハードです。bcrypt はコスト 12 以上であれば既存の導入には問題ありませんが、メモリハードではなく、72 バイトの入力制限があります。scrypt もメモリハードでよく研究されていますが、実行環境にメンテナンスされた Argon2id ライブラリがない場合にのみ選んでください。PBKDF2 は FIPS / NIST 準拠が求められる場合にのみ使ってください。',
  faq8Title: 'パスワードリセットを強制せずに bcrypt から Argon2id へ移行するには？',
  faq8Body:
    '機会的リハッシュ（opportunistic rehashing）を使います。既存ユーザーは引き続き bcrypt で検証し、ログインに成功したときに、入力されたプレーンテキストのパスワードを Argon2id でハッシュ化して保存済みの認証情報を更新します。どのアルゴリズムで検証すべきかを判断できるように、ユーザーごとにハッシュバージョンのフィールドを管理してください。通常のユーザー活動が数週間続けば大半のアカウントが移行します。残りの非アクティブなユーザーには、パスワードリセットの案内で強制移行できます。',

  widget: {
    ariaLabel: 'パスワードハッシュのモード',
    tabGenerate: '生成',
    tabVerify: '検証',

    sectionAlgorithm: 'アルゴリズム',
    sectionPassword: 'プレーンテキストのパスワード',
    sectionParameters: 'パラメーター',
    sectionSalt: 'ソルト',

    algoSubtitleArgon2id: 'メモリハード',
    algoSubtitleScrypt: 'メモリハード',
    algoSubtitleBcrypt: '適応型',
    algoSubtitlePbkdf2: 'NIST 準拠',

    passwordPlaceholder: 'ハッシュ化するパスワードを入力',
    saltPlaceholder: '自動生成されます',
    saltGenerateAria: '新しいソルトを生成',
    saltByteUnit: 'B',

    buttonGenerate: 'パスワードハッシュを生成',
    buttonGenerating: '生成中…',
    buttonVerify: 'パスワードを検証',
    buttonVerifying: '検証中…',

    resultEncodedHash: 'エンコード済みハッシュ',
    resultCopy: 'コピー',
    resultCopied: 'コピーしました',
    resultExecutionTime: '実行時間',
    resultTuningHint: '本番ハードウェアで 250〜500 ms 前後になるように、メモリとイテレーションを調整してください。',
    resultSaltLabel: 'ソルト',
    resultMillisecondsSuffix: 'ms',

    verifyEncodedHash: 'エンコード済みハッシュ',
    verifyEncodedHashPlaceholder: 'エンコード済みのパスワードハッシュを貼り付け（例: $argon2id$v=19$m=19456,t=2,p=1$…）',
    verifyCandidatePassword: '検証するパスワード',
    verifyCandidatePlaceholder: 'ハッシュと照合するパスワード',
    verifySupportedFormatsShow: '対応形式',
    verifySupportedFormatsHide: '形式を隠す',
    verifyMatch: 'パスワードが一致しました',
    verifyNoMatch: 'パスワードが一致しません',
    verifyDetectedAlgorithm: '検出されたアルゴリズム:',

    errorPasswordRequired: 'プレーンテキストのパスワードを入力してください',
    errorSaltRequired: 'ソルトを入力するか生成してください',
    errorHashRequired: 'エンコード済みのパスワードハッシュを入力してください',
    errorCandidateRequired: '検証するパスワードを入力してください',

    paramArgon2idMemory: 'メモリ（MiB）(m)',
    paramArgon2idIterations: 'イテレーション (t)',
    paramArgon2idParallelism: '並列度 (p)',
    paramArgon2idKeyLength: 'ハッシュ長（バイト）',
    paramBcryptCost: 'コストファクター',
    paramScryptN: 'N（CPU/メモリコスト）(ln)',
    paramScryptR: 'r（ブロックサイズ）',
    paramScryptP: 'p（並列度）',
    paramScryptKeyLength: '鍵長（バイト）',
    paramPbkdf2Iterations: 'イテレーション',
    paramPbkdf2KeyLength: '鍵長（バイト）',

    warnArgon2idMemory: 'メモリが 19 MiB 未満だと安全でない可能性があります',
    warnArgon2idIterations: 'イテレーションが 2 未満だと安全でない可能性があります',
    warnArgon2idParallelism: '並列度が 1 未満は無効です',
    warnScryptR: 'r が 8 未満だと安全でない可能性があります',
    warnBcryptCost: 'コストファクターが 10 未満だと安全でない可能性があります',
    warnPbkdf2Iterations: 'イテレーションが 100,000 未満だと安全でない可能性があります',
  },
} as const;

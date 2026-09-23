export const base64 = {
  metaTitle: 'Base64 デコード・エンコード | Authgear',
  metaDescription:
    'Base64 をテキストにデコード、またはテキストを Base64 にエンコード。すべてブラウザ内で即時処理。JWT 向け Base64URL、UTF-8、UTF-16、ASCII に対応。無料・オープンソース、データは一切送信されません。',
  heroTitle: 'Base64 デコード & エンコード',
  heroDescription: 'Base64 文字列のデコードとエンコードをブラウザ上で手軽に行えます。',
  iframeTitle: 'Base64 エンコーダー & デコーダー',
  policy:
    'お客様のデータの安全を最優先にしています。エンコードとデコードはすべてブラウザ内のローカルで処理されます。このツールはデータを保存したり、お使いのデバイスの外に送信したりすることはありません。',
  card1Title: 'シンプルで高速',
  card1Desc: 'テキストや Base64 文字列をワンクリックで即座にエンコード／デコードできます。',
  card2Title: '100% クライアントサイド',
  card2Desc: 'データはサーバーに一切送信されません。すべてブラウザ内で安全に動作します。',
  card3Title: '開発者フレンドリー',
  card3Desc: 'Base64 データを正確かつ効率的にエンコード／デコードできる、使いやすいツールです。',
  card4Title: 'Base64URL に対応',
  card4Desc:
    'URL セーフな Base64URL のデコードとエンコードに対応。JWT、OAuth トークン、URL で使われる形式です。',
  step1Label: 'ステップ 1.',
  step1Title: '文字セットを選ぶ',
  step1Item1:
    'UTF-8 など、使用する文字セットを選択します。エンコード前やデコード後にテキストをどう変換するかがここで決まります。',
  step2Label: 'ステップ 2.',
  step2Title: 'プレーンテキストをエンコードする',
  step2Item1:
    '「プレーンテキスト」欄にテキストを入力または貼り付けて「エンコード」をクリックします。Base64 の結果が同じ欄の出力エリアに表示されます。',
  step3Label: 'ステップ 3.',
  step3Title: 'Base64 をデコードする',
  step3Item1:
    '「Base64」欄に Base64 文字列を入力して「デコード」をクリックします。デコードされたテキストがその欄に表示されます。',
  faqWhatTitle: 'Base64 エンコードとは？',
  faqWhatBody:
    'Base64 は、バイナリデータを ASCII 文字で表現する、バイナリからテキストへのエンコード形式です。\nJSON、XML、HTTP ヘッダーなどの形式の中にバイナリコンテンツを安全に含めることができます。\n例:\nAuthgear → QXV0aGdlYXI=',
  faqUrlTitle: 'Base64 と Base64URL の違いは？',
  faqUrlBody:
    'Base64URL は URL やトークン形式向けに設計された Base64 の一種です。+ を - に、/ を _ に置き換え、URL の安全性のためにパディング文字（=）は省略されることが多くあります。\nJWT、OAuth トークン、OpenID Connect で広く使われている形式です。',
  faqGuidePart1: 'Base64 の仕組みや使いどころをもっと詳しく知りたい方は、',
  faqGuideLinkLabel: 'Base64 エンコード & デコードガイド',
  faqGuidePart2: 'をご覧ください。',

  widget: {
    charsetLabel: '文字セット',
    urlSafeLabel: 'URL セーフ',
    withoutPaddingLabel: 'パディングなし',

    plainTextLabel: 'プレーンテキスト',
    plainTextHint: 'エンコードするテキストを入力または貼り付け',
    plainTextPlaceholder: 'エンコードするテキストを入力…',

    base64Label: 'Base64',
    base64Hint: 'デコードする Base64 を入力または貼り付け',
    base64Placeholder: 'デコードする Base64 テキストを入力…',

    buttonEncode: 'エンコード',
    buttonDecode: 'デコード',
    buttonReset: 'リセット',
    buttonCopy: 'コピー',
    buttonCopied: 'コピーしました',
    buttonClear: 'クリア',

    errorEncode: '入力をエンコードできませんでした',
    errorDecode: 'デコードできませんでした: Base64 として無効な入力です',
  },
} as const;

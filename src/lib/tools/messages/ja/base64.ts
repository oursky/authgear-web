export const base64 = {
  metaTitle: 'Base64 デコード・エンコード（オンライン変換ツール） | Authgear',
  metaDescription:
    'Base64 のデコード・エンコード（変換）をブラウザ上で無料で行えます。Base64 文字列をテキストに戻すことも、テキストを Base64 に変換することも可能で、データはサーバーに送信されません。JWT の Base64URL や UTF-8、UTF-16、ASCII にも対応したオープンソースのツールです。',
  heroTitle: 'Base64 デコード・エンコードツール',
  heroDescription:
    'Base64 デコードとエンコードをブラウザ上で手軽に行えます。Base64 文字列をテキストに戻したり、テキストを Base64 に変換したりできます。',
  iframeTitle: 'Base64 デコーダー・エンコーダー',
  policy:
    'データの安全性を最優先に考えています。エンコードとデコードはすべてブラウザ内で処理され、入力したデータが保存されたり、お使いの端末の外に送信されたりすることはありません。',
  card1Title: 'シンプルで高速',
  card1Desc: 'テキストや Base64 文字列を、ワンクリックですぐにエンコード・デコードできます。',
  card2Title: '100% クライアントサイド',
  card2Desc: 'データがサーバーに送信されることはありません。すべての処理がブラウザ内で安全に完結します。',
  card3Title: '開発者に使いやすい',
  card3Desc: 'Base64 データのエンコード・デコードを、正確かつ効率よく行えます。',
  card4Title: 'Base64URL にも対応',
  card4Desc:
    'URL セーフな Base64URL のデコード・エンコードにも対応しています。JWT や OAuth トークン、URL で使われる形式です。',
  step1Label: 'ステップ 1.',
  step1Title: '文字コードを選ぶ',
  step1Item1:
    'UTF-8 など、使用する文字コードを選択します。エンコード前とデコード後のテキストを、どの文字コードで扱うかが決まります。',
  step2Label: 'ステップ 2.',
  step2Title: 'テキストを Base64 にエンコードする',
  step2Item1:
    '「プレーンテキスト」欄にテキストを入力または貼り付け、「エンコード」をクリックします。同じ欄の出力エリアに Base64 の結果が表示されます。',
  step3Label: 'ステップ 3.',
  step3Title: 'Base64 をテキストにデコードする',
  step3Item1:
    '「Base64」欄に Base64 文字列を入力し、「デコード」をクリックします。デコードされたテキストが同じ欄に表示されます。',
  faqWhatTitle: 'Base64 エンコードとは？',
  faqWhatBody:
    'Base64 は、バイナリデータを ASCII 文字だけで表すエンコード方式です。\nJSON、XML、HTTP ヘッダーなどの形式にも、バイナリデータを安全に含めることができます。\n例:\nAuthgear → QXV0aGdlYXI=',
  faqUrlTitle: 'Base64 と Base64URL の違いは？',
  faqUrlBody:
    'Base64URL は、URL やトークンで使いやすいように調整された Base64 の派生形式です。+ を - に、/ を _ に置き換え、URL で安全に扱えるようパディング文字（=）を省略することもよくあります。\nJWT、OAuth トークン、OpenID Connect などで広く使われています。',
  faqGuidePart1: 'Base64 の仕組みや使いどころをさらに詳しく知りたい方は、',
  faqGuideLinkLabel: 'Base64 エンコード・デコードの解説記事',
  faqGuidePart2: 'をご覧ください。',

  widget: {
    charsetLabel: '文字コード',
    urlSafeLabel: 'URL セーフ',
    withoutPaddingLabel: 'パディングなし',

    plainTextLabel: 'プレーンテキスト',
    plainTextHint: 'エンコードするテキストを入力または貼り付けてください',
    plainTextPlaceholder: 'エンコードするテキストを入力…',

    base64Label: 'Base64',
    base64Hint: 'デコードする Base64 文字列を入力または貼り付けてください',
    base64Placeholder: 'デコードする Base64 文字列を入力…',

    buttonEncode: 'エンコード',
    buttonDecode: 'デコード',
    buttonReset: 'リセット',
    buttonCopy: 'コピー',
    buttonCopied: 'コピーしました',
    buttonClear: 'クリア',

    errorEncode: '入力内容をエンコードできませんでした',
    errorDecode: 'デコードできませんでした。有効な Base64 文字列ではありません',
  },
} as const;

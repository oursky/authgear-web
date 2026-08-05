export const base64 = {
  metaTitle: 'Base64 解碼與編碼——免費線上工具 | Authgear',
  metaDescription:
    '以精確字元集控制編解碼 Base64。適合檢視原始資料、轉換承載與除錯編碼問題的開發者工具。',
  heroTitle: 'Base64 解碼與編碼',
  heroDescription: '在瀏覽器中輕鬆將文字編碼或解碼為 Base64。',
  iframeTitle: 'Base64 編碼與解碼器',
  policy:
    '您的資料安全是我們的首要考量。所有編解碼皆在您的瀏覽器本機完成。本工具不會儲存或將任何資料傳送到您的裝置以外。',
  card1Title: '簡單快速',
  card1Desc: '一鍵即可立即編碼或解碼任意文字或 Base64 字串。',
  card2Title: '100% 端側處理',
  card2Desc: '資料不會送到任何伺服器，一切安全地在瀏覽器內執行。',
  card3Title: '開發者友善',
  card3Desc: '易於準確且有效率地編解碼 Base64 資料。',
  card4Title: '支援 Base64URL',
  card4Desc: '可編解碼網址安全的 Base64URL——JWT、OAuth 權杖與網址常用的變體。',
  step1Label: '步驟 1.',
  step1Title: '選擇字元集',
  step1Item1:
    '選擇要使用的字元集（例如 UTF-8）。這會決定編碼前與解碼後文字如何轉換。',
  step2Label: '步驟 2.',
  step2Title: '編碼純文字',
  step2Item1:
    '在「解碼文字」區輸入或貼上文字並按編碼，Base64 結果會顯示於同區輸出位置。',
  step3Label: '步驟 3.',
  step3Title: '解碼 Base64',
  step3Item1:
    '在「編碼文字」區輸入 Base64 字串並按解碼，解碼後文字會顯示於該區。',
  faqWhatTitle: '什麼是 Base64 編碼？',
  faqWhatBody:
    'Base64 是一種二進位轉文字的編碼格式，以 ASCII 字元表示二進位資料。\n可安全地將二進位內容嵌入 JSON、XML 或 HTTP 標頭等格式。\n範例：\nAuthgear → QXV0aGdlYXI=',
  faqUrlTitle: 'Base64 與 Base64URL 有什麼不同？',
  faqUrlBody:
    'Base64URL 是為網址與權杖格式設計的 Base64 變體，將 + 換成 -、/ 換成 _，並常省略填充字元 = 以符合網址安全。\n常見於 JWT、OAuth 權杖與 OpenID Connect。',
  faqGuidePart1: '想深入了解 Base64 的原理與使用時機？請閱讀我們的',
  faqGuideLinkLabel: 'Base64 編碼與解碼指南',
  faqGuidePart2: '。',

  widget: {
    charsetLabel: '字元集',
    urlSafeLabel: '網址安全',
    withoutPaddingLabel: '不含填充',

    plainTextLabel: '明文',
    plainTextHint: '輸入或貼上要編碼的文字',
    plainTextPlaceholder: '輸入要編碼的文字⋯',

    base64Label: 'Base64',
    base64Hint: '輸入或貼上要解碼的 Base64',
    base64Placeholder: '輸入要解碼的 Base64⋯',

    buttonEncode: '編碼',
    buttonDecode: '解碼',
    buttonReset: '重設',
    buttonCopy: '複製',
    buttonCopied: '已複製',
    buttonClear: '清除',

    errorEncode: '無法編碼輸入內容',
    errorDecode: '無法解碼——Base64 格式無效',
  },
} as const;

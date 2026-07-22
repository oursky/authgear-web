export const smsCost = {
  metaTitle: 'SMS 成本計算機 — 各國 SMS OTP 費用估算 | Authgear',
  metaDescription:
    '免費 SMS 成本計算機：估算各國、各供應商（Twilio、Bird、Plivo）的 SMS OTP 費用，並看看改用具 SMS 備援的 WhatsApp OTP 能省下多少。',
  heroTitle: 'SMS 成本計算機',
  heroDescription:
    '看看您的 SMS OTP 在不同國家與供應商下的真實成本，以及把高成本驗證流量改用具 SMS 備援的 WhatsApp OTP 後，能省下多少。',
  iframeTitle: 'SMS 成本計算機',
  policy:
    '此計算機完全在您的瀏覽器中執行。所示費率為參考基本價，未含電信商附加費，且經常變動——實際採用前請向您的供應商確認。',

  compTitle: '各國與各供應商 SMS 費率',
  compIntro:
    '熱門市場的對外 A2P SMS 參考費率（每則訊息，美元），並列出 WhatsApp OTP 驗證費率。僅為基本費率——電信商費用另計。',
  compColCountry: '國家／地區',
  compColWhatsapp: 'WhatsApp OTP',
  compNote: '費率截至 {date}。為參考基本費率，未含電信商附加費。請向各供應商確認。',

  card1Title: '真實的各國費率',
  card1Desc: '涵蓋 Twilio、Bird、Plivo，提供您實際發送市場的 SMS 價格。',
  card2Title: 'WhatsApp 節省',
  card2Desc: '以可調整的採用率與 SMS 備援，模擬改用 WhatsApp OTP 的情況。',
  card3Title: '納入詐欺因素',
  card3Desc: '不只看公告價，也把推高帳單的 SMS pumping 損失一併計入。',

  step1Label: '步驟 1.',
  step1Title: '選擇國家、供應商與用量',
  step1Item1: '選擇目的地國家、您的 SMS 供應商，以及每月 OTP 用量。',
  step2Label: '步驟 2.',
  step2Title: '查看您的 SMS 成本',
  step2Item1: '計算機會顯示該組合下每月與每年的預估 SMS 支出。',
  step3Label: '步驟 3.',
  step3Title: '比較 WhatsApp OTP',
  step3Item1: '調整 WhatsApp 採用率，看看改用後能省下多少。',

  faq1Title: '一則 SMS OTP 要多少錢？',
  faq1Body:
    '各國差異很大——在主要供應商上，泰國約每則 $0.03，印尼則可達 $0.36 以上。請用上方計算機查詢您的市場與用量。',
  faq2Title: '為什麼 SMS OTP 這麼貴？',
  faq2Body:
    '電信商終端費、各國 A2P 費率，以及會膨脹訊息量的 SMS pumping 詐欺，都會推高成本，在高費率市場尤其明顯。',
  faq3Title: 'WhatsApp OTP 比 SMS 便宜嗎？',
  faq3Body:
    '在東南亞等高 SMS 成本市場便宜非常多，在西歐則差距較小。節省幅度取決於您的目的地組合——計算機會顯示您的情況。',
  faq4Title: 'SMS 費用如何計算？',
  faq4Body:
    'SMS 以每則送達訊息計費，依目的地國家定價，另加電信商附加費。超過 160 個 GSM-7 字元的訊息會拆成多則計費。',
  faq5Title: '這些費率準確嗎？',
  faq5Body:
    '不完全準確——這些是未含電信商費用且經常變動的參考基本費率。請視為估算，並於採用前向供應商確認。',

  widget: {
    countryLabel: '目的地國家',
    countryPlaceholder: '搜尋國家…',
    countryNoResults: '找不到符合的國家',
    providerLabel: 'SMS 供應商',
    volumeLabel: '每月 OTP 用量',
    volumeUnit: 'OTP／月',
    resultLabel: '您的預估 SMS 成本',
    perMonth: '{value}／月',
    perYear: '{value}／年',
    resultNote: '基本費率，未含電信商費用 · 費率截至 {date}',
    savingsTitle: '改用 WhatsApp OTP 省下費用',
    savingsPct: '較 SMS ↓ {pct}%',
    savingsAnnual: '使用 Authgear 每年約可省下 {value}。',
    waLabel: 'WhatsApp 採用率',
    waHint: '以 WhatsApp 送達的 OTP 比例；其餘則以 SMS 備援。',
    advancedLabel: '進階',
    pumpLabel: '納入 SMS pumping 損失',
    pumpHint: '推高 SMS 帳單的詐欺性 OTP 觸發。WhatsApp OTP 可抵禦這類攻擊。',
    ctaStartFree: '免費開始',
    ctaSeeHow: '了解 Authgear 如何降低成本',
  },
} as const;

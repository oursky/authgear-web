export const smsCost = {
  metaTitle: 'SMS コスト計算ツール: 国別の SMS OTP コストを見積もる | Authgear',
  metaDescription:
    '無料の SMS コスト計算ツール。国とプロバイダー（Twilio、Bird、Plivo）ごとの SMS OTP 費用を見積もり、SMS フォールバック付き WhatsApp OTP でどれだけ節約できるかを確認できます。',
  heroTitle: 'SMS コスト計算ツール',
  heroDescription:
    '国やプロバイダーごとに SMS OTP の実際のコストを確認し、高コストな認証トラフィックを SMS フォールバック付きの WhatsApp OTP に移した場合にどれだけ節約できるかを把握できます。',
  iframeTitle: 'SMS コスト計算ツール',
  policy:
    'この計算ツールはすべてブラウザ内で動作します。表示される料金は参考用の基本料金で、キャリアの追加料金は含まれておらず、頻繁に変わります。導入前に必ずプロバイダーにご確認ください。',

  // Provider comparison section (static, indexable)
  compTitle: '国別・プロバイダー別の SMS 料金',
  compIntro:
    '主要市場向けの A2P SMS 送信料金（USD／メッセージ、参考値）と、WhatsApp OTP の認証メッセージ料金を並べて表示します。基本料金のみで、キャリア料金は別途かかります。',
  compColCountry: '国',
  compColWhatsapp: 'WhatsApp OTP',
  compNote: '料金は {date} 時点。キャリアの追加料金を除いた参考基本料金です。各プロバイダーにご確認ください。',

  card1Title: '国ごとの実際の料金',
  card1Desc: '送信先の市場ごとに、Twilio、Bird、Plivo の実際の SMS 料金を確認できます。',
  card2Title: 'WhatsApp での節約額',
  card2Desc: '採用率を調整しながら、SMS フォールバック付き WhatsApp OTP への移行をシミュレーションできます。',
  card3Title: '不正利用を考慮',
  card3Desc: '公開されている定価だけでなく、請求額を膨らませる SMS ポンピングによる損失も織り込めます。',

  step1Label: 'ステップ 1.',
  step1Title: '国、プロバイダー、送信量を選ぶ',
  step1Item1: '送信先の国、利用中の SMS プロバイダー、月間の OTP 送信量を選択します。',
  step2Label: 'ステップ 2.',
  step2Title: 'SMS コストを確認する',
  step2Item1: 'その構成での月間および年間の SMS 費用の見積もりが表示されます。',
  step3Label: 'ステップ 3.',
  step3Title: 'WhatsApp OTP と比較する',
  step3Item1: 'WhatsApp の採用率を調整して、切り替えでどれだけ節約できるかを確認します。',

  faq1Title: 'SMS OTP 1 通あたりのコストは？',
  faq1Body:
    '国によって大きく異なります。主要プロバイダーでは、タイで 1 通あたり約 $0.03、インドネシアでは $0.36 以上になることもあります。上の計算ツールで、対象市場と送信量に合わせて確認してください。',
  faq2Title: 'SMS OTP はなぜこんなに高いのですか？',
  faq2Body:
    'キャリアの着信料、国ごとの A2P 料金、そして送信量を膨らませる SMS ポンピング詐欺が、特に高料金の市場でコストを押し上げます。',
  faq3Title: 'WhatsApp OTP は SMS より安いですか？',
  faq3Body:
    '東南アジアなど SMS 料金が高い市場では劇的に、西ヨーロッパでは控えめに安くなります。節約額は送信先の構成によって異なるため、計算ツールでご自身のケースを確認してください。',
  faq4Title: 'SMS 料金はどのように計算されますか？',
  faq4Body:
    'SMS は配信されたメッセージごとに課金され、送信先の国に基づく料金にキャリアの追加料金が加わります。GSM-7 で 160 文字を超えるメッセージは複数のセグメントに分割され、それぞれ課金されます。',
  faq5Title: 'これらの料金は正確ですか？',
  faq5Body:
    'いいえ。キャリア料金を除いた参考用の基本料金であり、頻繁に変わります。見積もりとして扱い、導入前にプロバイダーにご確認ください。',
  faq6Title: 'SMS ポンピングとは？',
  faq6Body:
    'SMS ポンピング（AIT や通話料詐欺とも呼ばれます）とは、攻撃者がボットを使って自分たちが利益を得るプレミアム番号宛てに大量の OTP メッセージを発生させ、実際のユーザーが要求していないメッセージで請求額を膨らませる手口です。WhatsApp OTP はキャリアの通話料課金システム上で動作しないため、この攻撃の影響を受けません。',
  faq6LinkText: '詳しくはこちら: SMS ポンピング攻撃とは？',

  widget: {
    countryLabel: '送信先の国',
    countryPlaceholder: '国を検索…',
    countryNoResults: '該当する国がありません',
    providerLabel: 'SMS プロバイダー',
    volumeLabel: '月間 OTP 送信量',
    volumeUnit: 'OTP / 月',
    resultLabel: 'SMS コストの見積もり',
    perMonth: '{value} / 月',
    perYear: '{value} / 年',
    resultNote: '基本料金、キャリア料金を除く · 料金は {date} 時点',
    savingsTitle: 'WhatsApp OTP でコストを削減',
    savingsPct: 'SMS 比 ↓ {pct}%',
    savingsAnnual: 'Authgear で年間約 {value} を節約できます。',
    waLabel: 'WhatsApp 採用率',
    waHint: 'WhatsApp で配信する OTP の割合。残りは SMS にフォールバックします。',
    pumpLabel: 'SMS ポンピングの損失を含める',
    pumpHint: 'SMS の請求額を膨らませる不正な OTP 発生。WhatsApp OTP はこれに耐性があります。',
    ctaStartFree: '無料で始める',
    ctaSeeHow: 'Authgear の削減方法を見る',
  },
} as const;

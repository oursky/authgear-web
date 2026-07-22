export const smsCost = {
  metaTitle: 'SMS Cost Calculator — Estimate SMS OTP Costs by Country | Authgear',
  metaDescription:
    'Free SMS cost calculator: estimate what you spend on SMS OTP per country and provider (Twilio, Bird, Plivo), and see how much WhatsApp OTP with SMS fallback saves you.',
  heroTitle: 'SMS Cost Calculator',
  heroDescription:
    'See what your SMS OTP really costs across countries and providers — and how much you would save moving high-cost verification traffic to WhatsApp OTP with SMS fallback.',
  iframeTitle: 'SMS Cost Calculator',
  policy:
    'This calculator runs entirely in your browser. Rates shown are indicative base prices, exclude carrier surcharges, and change frequently — always confirm with your provider before committing.',

  // Provider comparison section (static, indexable)
  compTitle: 'SMS pricing by country and provider',
  compIntro:
    'Indicative outbound A2P SMS rates (USD per message) for popular markets, alongside the WhatsApp OTP authentication rate. Base rates only — carrier fees apply on top.',
  compColCountry: 'Country',
  compColWhatsapp: 'WhatsApp OTP',
  compNote: 'Rates as of {date}. Indicative base rates, excluding carrier surcharges. Verify with each provider.',

  card1Title: 'Real per-country rates',
  card1Desc: 'Actual SMS prices for the markets you send to, across Twilio, Bird, and Plivo.',
  card2Title: 'WhatsApp savings',
  card2Desc: 'Model the switch to WhatsApp OTP with an adjustable adoption rate and SMS fallback.',
  card3Title: 'Fraud-aware',
  card3Desc: 'Factor in SMS-pumping losses that inflate your bill, not just published list prices.',

  step1Label: 'Step 1.',
  step1Title: 'Pick country, provider, and volume',
  step1Item1: 'Choose the destination country, your SMS provider, and your monthly OTP volume.',
  step2Label: 'Step 2.',
  step2Title: 'See your SMS cost',
  step2Item1: 'The calculator shows your estimated monthly and annual SMS spend for that setup.',
  step3Label: 'Step 3.',
  step3Title: 'Compare WhatsApp OTP',
  step3Item1: 'Adjust the WhatsApp adoption rate to see how much switching would save you.',

  faq1Title: 'How much does an SMS OTP cost?',
  faq1Body:
    'It varies widely by country — from around $0.03 per message in Thailand to $0.36 or more in Indonesia on major providers. Use the calculator above for your specific market and volume.',
  faq2Title: 'Why is SMS OTP so expensive?',
  faq2Body:
    'Carrier termination fees, per-country A2P rates, and SMS-pumping fraud (which inflates your message volume) all drive the cost up, especially in high-rate markets.',
  faq3Title: 'Is WhatsApp OTP cheaper than SMS?',
  faq3Body:
    'Dramatically so in high-SMS-cost markets such as Southeast Asia, and more modestly in Western Europe. The savings depend on your destination mix — the calculator shows your case.',
  faq4Title: 'How is SMS pricing calculated?',
  faq4Body:
    'SMS is billed per delivered message, priced on the destination country, plus carrier surcharges. Messages longer than 160 GSM-7 characters are split into multiple billed segments.',
  faq5Title: 'Are these rates exact?',
  faq5Body:
    'No — they are indicative base rates that exclude carrier fees and change frequently. Treat them as estimates and verify with your provider before committing.',
  faq6Title: 'What is SMS pumping?',
  faq6Body:
    'SMS pumping (also called AIT or toll fraud) is when attackers use bots to trigger large volumes of OTP texts to premium numbers they profit from, inflating your bill with messages no real user asked for. WhatsApp OTP is not exposed to it because it does not run on carrier toll systems.',
  faq6LinkText: 'Learn more: What is an SMS pumping attack?',

  widget: {
    countryLabel: 'Destination country',
    countryPlaceholder: 'Search a country…',
    countryNoResults: 'No matching country',
    providerLabel: 'SMS provider',
    volumeLabel: 'Monthly OTP volume',
    volumeUnit: 'OTPs / month',
    resultLabel: 'Your estimated SMS cost',
    perMonth: '{value} / mo',
    perYear: '{value} / yr',
    resultNote: 'Base rate, excludes carrier fees · rates as of {date}',
    savingsTitle: 'Cut it with WhatsApp OTP',
    savingsPct: '↓ {pct}% vs SMS',
    savingsAnnual: 'Save about {value} per year with Authgear.',
    waLabel: 'WhatsApp adoption',
    waHint: 'Share of OTPs delivered over WhatsApp; the rest fall back to SMS.',
    pumpLabel: 'Include SMS pumping losses',
    pumpHint: 'Fraudulent OTP triggers that inflate your SMS bill. WhatsApp OTP resists this.',
    ctaStartFree: 'Start free',
    ctaSeeHow: 'See how Authgear cuts this',
  },
} as const;

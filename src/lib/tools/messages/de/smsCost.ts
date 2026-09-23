export const smsCost = {
  metaTitle: 'SMS-Kostenrechner: SMS-OTP-Kosten nach Land schätzen | Authgear',
  metaDescription:
    'Kostenloser SMS-Kostenrechner: Schätzen Sie Ihre Ausgaben für SMS-OTP nach Land und Anbieter (Twilio, Bird, Plivo) und sehen Sie, wie viel WhatsApp-OTP mit SMS-Fallback Ihnen spart.',
  heroTitle: 'SMS-Kostenrechner',
  heroDescription:
    'Sehen Sie, was Ihre SMS-OTPs in verschiedenen Ländern und bei verschiedenen Anbietern wirklich kosten, und wie viel Sie sparen, wenn Sie teuren Verifizierungsverkehr auf WhatsApp-OTP mit SMS-Fallback verlagern.',
  iframeTitle: 'SMS-Kostenrechner',
  policy:
    'Dieser Rechner läuft vollständig in Ihrem Browser. Die angezeigten Tarife sind indikative Basispreise ohne Carrier-Zuschläge und ändern sich häufig. Bestätigen Sie sie immer bei Ihrem Anbieter, bevor Sie sich festlegen.',

  // Provider comparison section (static, indexable)
  compTitle: 'SMS-Preise nach Land und Anbieter',
  compIntro:
    'Indikative Tarife für ausgehende A2P-SMS (USD pro Nachricht) in beliebten Märkten, neben dem Tarif für WhatsApp-OTP-Authentifizierung. Nur Basistarife, Carrier-Gebühren kommen hinzu.',
  compColCountry: 'Land',
  compColWhatsapp: 'WhatsApp-OTP',
  compNote: 'Tarife, Stand {date}. Indikative Basistarife ohne Carrier-Zuschläge. Prüfen Sie sie bei jedem Anbieter.',

  card1Title: 'Echte Tarife pro Land',
  card1Desc: 'Tatsächliche SMS-Preise für die Märkte, in die Sie senden, bei Twilio, Bird und Plivo.',
  card2Title: 'WhatsApp-Einsparungen',
  card2Desc: 'Simulieren Sie den Wechsel zu WhatsApp-OTP mit einstellbarer Nutzungsquote und SMS-Fallback.',
  card3Title: 'Betrug einkalkuliert',
  card3Desc: 'Berücksichtigen Sie Verluste durch SMS-Pumping, die Ihre Rechnung aufblähen, nicht nur veröffentlichte Listenpreise.',

  step1Label: 'Schritt 1.',
  step1Title: 'Land, Anbieter und Volumen wählen',
  step1Item1: 'Wählen Sie das Zielland, Ihren SMS-Anbieter und Ihr monatliches OTP-Volumen.',
  step2Label: 'Schritt 2.',
  step2Title: 'SMS-Kosten ansehen',
  step2Item1: 'Der Rechner zeigt Ihre geschätzten monatlichen und jährlichen SMS-Ausgaben für diese Konfiguration.',
  step3Label: 'Schritt 3.',
  step3Title: 'Mit WhatsApp-OTP vergleichen',
  step3Item1: 'Passen Sie die WhatsApp-Nutzungsquote an, um zu sehen, wie viel der Wechsel Ihnen sparen würde.',

  faq1Title: 'Was kostet ein SMS-OTP?',
  faq1Body:
    'Das variiert stark je nach Land: von etwa $0.03 pro Nachricht in Thailand bis zu $0.36 oder mehr in Indonesien bei den großen Anbietern. Nutzen Sie den Rechner oben für Ihren konkreten Markt und Ihr Volumen.',
  faq2Title: 'Warum ist SMS-OTP so teuer?',
  faq2Body:
    'Terminierungsgebühren der Carrier, länderspezifische A2P-Tarife und SMS-Pumping-Betrug (der Ihr Nachrichtenvolumen aufbläht) treiben die Kosten in die Höhe, besonders in Märkten mit hohen Tarifen.',
  faq3Title: 'Ist WhatsApp-OTP günstiger als SMS?',
  faq3Body:
    'Deutlich günstiger in Märkten mit hohen SMS-Kosten wie Südostasien, etwas weniger in Westeuropa. Die Einsparung hängt von Ihrem Ziel-Mix ab; der Rechner zeigt Ihren Fall.',
  faq4Title: 'Wie wird der SMS-Preis berechnet?',
  faq4Body:
    'SMS werden pro zugestellter Nachricht abgerechnet, bepreist nach Zielland, plus Carrier-Zuschläge. Nachrichten mit mehr als 160 GSM-7-Zeichen werden in mehrere abgerechnete Segmente aufgeteilt.',
  faq5Title: 'Sind diese Tarife exakt?',
  faq5Body:
    'Nein, es sind indikative Basistarife ohne Carrier-Gebühren, die sich häufig ändern. Betrachten Sie sie als Schätzung und prüfen Sie sie bei Ihrem Anbieter, bevor Sie sich festlegen.',
  faq6Title: 'Was ist SMS-Pumping?',
  faq6Body:
    'Beim SMS-Pumping (auch AIT oder Toll Fraud genannt) lösen Angreifer mit Bots große Mengen OTP-SMS an Premiumnummern aus, an denen sie verdienen, und blähen so Ihre Rechnung mit Nachrichten auf, die kein echter Nutzer angefordert hat. WhatsApp-OTP ist davon nicht betroffen, weil es nicht über die Abrechnungssysteme der Carrier läuft.',
  faq6LinkText: 'Mehr erfahren: Was ist ein SMS-Pumping-Angriff?',

  widget: {
    countryLabel: 'Zielland',
    countryPlaceholder: 'Land suchen…',
    countryNoResults: 'Kein passendes Land',
    providerLabel: 'SMS-Anbieter',
    volumeLabel: 'Monatliches OTP-Volumen',
    volumeUnit: 'OTPs / Monat',
    resultLabel: 'Ihre geschätzten SMS-Kosten',
    perMonth: '{value} / Monat',
    perYear: '{value} / Jahr',
    resultNote: 'Basistarif ohne Carrier-Gebühren · Stand {date}',
    savingsTitle: 'Mit WhatsApp-OTP senken',
    savingsPct: '↓ {pct}% vs. SMS',
    savingsAnnual: 'Sparen Sie mit Authgear etwa {value} pro Jahr.',
    waLabel: 'WhatsApp-Anteil',
    waHint: 'Anteil der OTPs, die über WhatsApp zugestellt werden; der Rest fällt auf SMS zurück.',
    pumpLabel: 'SMS-Pumping-Verluste einbeziehen',
    pumpHint: 'Betrügerische OTP-Auslösungen, die Ihre SMS-Rechnung aufblähen. WhatsApp-OTP ist dagegen resistent.',
    ctaStartFree: 'Kostenlos starten',
    ctaSeeHow: 'So senkt Authgear diese Kosten',
  },
} as const;

export const base64 = {
  metaTitle: 'Base64 dekodieren und kodieren | Authgear',
  metaDescription:
    'Base64 sofort in Text dekodieren oder Text in Base64 kodieren, zu 100 % in Ihrem Browser. Base64URL für JWTs, UTF-8, UTF-16, ASCII. Kostenlos, Open Source, nichts wird hochgeladen.',
  heroTitle: 'Base64 dekodieren & kodieren',
  heroDescription: 'Dekodieren oder kodieren Sie Base64-Strings ganz einfach direkt in Ihrem Browser.',
  iframeTitle: 'Base64-Encoder & -Decoder',
  policy:
    'Die Sicherheit Ihrer Daten hat für uns höchste Priorität. Kodierung und Dekodierung erfolgen ausschließlich lokal in Ihrem Browser. Dieses Tool speichert keine Daten und sendet nichts von Ihrem Gerät nach außen.',
  card1Title: 'Einfach & schnell',
  card1Desc: 'Kodieren oder dekodieren Sie beliebigen Text oder Base64-Strings sofort mit einem Klick.',
  card2Title: '100 % clientseitig',
  card2Desc: 'Es werden keine Daten an einen Server gesendet. Alles läuft sicher in Ihrem Browser.',
  card3Title: 'Entwicklerfreundlich.',
  card3Desc: 'Mit diesem Tool kodieren oder dekodieren Sie Base64-Daten präzise und effizient.',
  card4Title: 'Unterstützt Base64URL',
  card4Desc:
    'Dekodieren und kodieren Sie URL-sicheres Base64URL, die Variante, die in JWTs, OAuth-Tokens und URLs verwendet wird.',
  step1Label: 'Schritt 1.',
  step1Title: 'Zeichensatz wählen',
  step1Item1:
    'Wählen Sie den gewünschten Zeichensatz, zum Beispiel UTF-8. Er bestimmt, wie Ihr Text vor dem Kodieren bzw. nach dem Dekodieren umgewandelt wird.',
  step2Label: 'Schritt 2.',
  step2Title: 'Klartext kodieren',
  step2Item1:
    'Geben Sie im Bereich „Dekodierter Text“ Ihren Text ein oder fügen Sie ihn ein und klicken Sie auf „Kodieren“. Das Base64-Ergebnis erscheint im Ausgabefeld desselben Bereichs.',
  step3Label: 'Schritt 3.',
  step3Title: 'Base64 dekodieren',
  step3Item1:
    'Geben Sie im Bereich „Kodierter Text“ Ihren Base64-String ein und klicken Sie auf „Dekodieren“. Der dekodierte Text wird in diesem Bereich angezeigt.',
  faqWhatTitle: 'Was ist Base64-Kodierung?',
  faqWhatBody:
    'Base64 ist ein Binär-zu-Text-Kodierungsformat, das Binärdaten mit ASCII-Zeichen darstellt.\nSo lassen sich binäre Inhalte sicher in Formate wie JSON, XML oder HTTP-Header einbetten.\nBeispiel:\nAuthgear → QXV0aGdlYXI=',
  faqUrlTitle: 'Was ist der Unterschied zwischen Base64 und Base64URL?',
  faqUrlBody:
    'Base64URL ist eine Variante von Base64 für URLs und Token-Formate. Sie ersetzt die Zeichen + durch - und / durch _; die Füllzeichen (=) werden zur URL-Sicherheit häufig weggelassen.\nDieses Format wird häufig in JWTs, OAuth-Tokens und OpenID Connect verwendet.',
  faqGuidePart1: 'Sie möchten genauer verstehen, wie Base64 funktioniert und wann man es einsetzt? Lesen Sie unseren ',
  faqGuideLinkLabel: 'Leitfaden zum Base64-Kodieren & -Dekodieren',
  faqGuidePart2: '.',

  widget: {
    charsetLabel: 'Zeichensatz',
    urlSafeLabel: 'URL-sicher',
    withoutPaddingLabel: 'Ohne Padding',

    plainTextLabel: 'Klartext',
    plainTextHint: 'Text zum Kodieren eingeben oder einfügen',
    plainTextPlaceholder: 'Text zum Kodieren eingeben…',

    base64Label: 'Base64',
    base64Hint: 'Base64 zum Dekodieren eingeben oder einfügen',
    base64Placeholder: 'Base64-Text zum Dekodieren eingeben…',

    buttonEncode: 'Kodieren',
    buttonDecode: 'Dekodieren',
    buttonReset: 'Zurücksetzen',
    buttonCopy: 'Kopieren',
    buttonCopied: 'Kopiert',
    buttonClear: 'Leeren',

    errorEncode: 'Eingabe konnte nicht kodiert werden',
    errorDecode: 'Dekodierung fehlgeschlagen: ungültige Base64-Eingabe',
  },
} as const;

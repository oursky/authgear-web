export const uuidV7 = {
  metaTitle: 'UUID v7 / UUIDv7-Generator & Zeitstempel-Extraktor: Kostenloses Online-Tool (RFC 9562)',
  metaDescription:
    'Kostenloser Online-Generator für UUID v7 (UUIDv7) mit Zeitstempel-Extraktor. Erzeugen, prüfen und kopieren Sie zeitlich sortierbare UUIDs in Ihrem Browser, dekodieren Sie den eingebetteten Unix-Zeitstempel und erzeugen Sie bis zu 10 IDs auf einmal. Standardisiert in RFC 9562.',
  heroTitle: 'UUID v7 (UUIDv7) Generator & Zeitstempel-Extraktor: RFC 9562',
  heroDescription:
    'UUID v7, auch UUIDv7 geschrieben, ist eine in RFC 9562 standardisierte 128-Bit-Kennung, die einen Unix-Zeitstempel in Millisekunden einbettet. So sortieren sich die IDs nach Erstellungszeit und bleiben dennoch global eindeutig. Mit diesem kostenlosen Tool erzeugen Sie UUIDv7-Werte, dekodieren den Zeitstempel einer vorhandenen UUID und prüfen jedes Feld, alles in Ihrem Browser, ohne dass etwas an einen Server gesendet wird.',
  iframeTitle: 'UUIDv7-Generator & Zeitstempel-Extraktor (RFC 9562)',
  policyLine1:
    'Die Sicherheit Ihrer Daten hat für uns höchste Priorität. Alles läuft lokal in Ihrem Browser.',
  policyLine2: 'Dieses Tool speichert keine Daten und sendet nichts von Ihrem Gerät nach außen',
  card1Title: 'Mehrere UUID-v7-Werte',
  card1Desc:
    'Erzeugen Sie bis zu 10 UUID-v7-Werte auf einmal. Nützlich für Tests, Seed-Daten oder zur Prüfung des Sortierverhaltens.',
  card2Title: 'Flexible Zeitstempel-Modi',
  card2Desc:
    'Wählen Sie, wie der Zeitstempel erzeugt wird. Verwenden Sie die aktuelle Zeit oder legen Sie einen eigenen Zeitstempel fest, um UUIDs für einen bestimmten Zeitpunkt zu erzeugen.',
  card3Title: 'Integrierter UUID-Inspektor',
  card3Desc:
    'Jede erzeugte UUID hat einen Inspektor, der strukturierte Details wie den eingebetteten Unix-Zeitstempel, die UUID-Version und die Varianteninformation anzeigt.',
  card4Title: 'Zeitstempel-Extraktion',
  card4Desc:
    'Extrahieren Sie den Unix-Zeitstempel aus einer vorhandenen UUID v7, um die Erstellungszeit zu prüfen und zeitbasierte Sortierung zu debuggen.',
  s1Label: 'Schritt 1.',
  s1Title: 'Wählen Sie, wie viele IDs erzeugt werden sollen (1–10).',
  s2Label: 'Schritt 2.',
  s2Title: 'Wählen Sie einen Zeitstempel-Modus: „Jetzt“ oder „Zeit festlegen“ (ISO 8601 UTC, Unix).',
  s3Label: 'Schritt 3.',
  s3Title: 'Klicken Sie auf „UUIDs erzeugen“.',
  s4Label: 'Schritt 4.',
  s4Title: 'Kopieren Sie einen Wert mit einem Klick oder alle mit „Alle kopieren“.',
  s5Label: 'Schritt 5.',
  s5Title: 'Lesen Sie den farbcodierten Inspektor, um jedes Feld zu verstehen.',
  s6Label: 'Schritt 6.',
  s6Title: 'Wechseln Sie zur Zeitstempel-Extraktion, um eine vorhandene UUID v7 zu dekodieren.',
  faq1Title: 'Was ist UUID v7?',
  faq1BodyBefore:
    'UUID v7 ist eine 128-Bit-Kennung, definiert in ',
  faq1LinkText: 'RFC 9562',
  faq1BodyAfter:
    '. Sie bettet einen 48-Bit-Unix-Zeitstempel in Millisekunden ein, gefolgt von einer 4-Bit-Versionsmarkierung (7), einem 12-Bit-Zufalls-/Sequenzsegment, einer 2-Bit-Variante (RFC 4122) und einem 62-Bit-Zufallssegment. Die Zeitkomponente liefert weitgehend monotone, zeitlich geordnete IDs, die sich gut sortieren lassen und dennoch stark zufällig bleiben.',
  faq1Href: 'https://www.rfc-editor.org/rfc/rfc9562.html#name-uuid-version-7',
  faq2Title: 'Typische Einsatzzwecke',
  faq2b1: 'Datenbankschlüssel: zeitlich geordnete Inserts mit guter Index-Lokalität.',
  faq2b2: 'Event-IDs: nach Erstellungszeit sortierbar ohne zusätzliche Spalten.',
  faq2b3: 'Log-Korrelation: eingebetteter Millisekunden-Zeitstempel für die Triage.',
  bpTitle: 'Warum UUID v7 (UUIDv7) statt UUID v4?',
  bpBody:
    'UUID v4 ist vollständig zufällig, sodass neu eingefügte Zeilen über den gesamten B-Tree-Index verstreut werden und teure Page-Splits erzwingen, ein echtes Performance-Problem bei hohem Schreibvolumen. UUIDv7 stellt den Zufallsbits einen 48-Bit-Unix-Zeitstempel in Millisekunden voran, sodass neu erzeugte IDs lexikografisch nach Erstellungszeit sortieren, im Index beieinander liegen und sich bei gleichzeitigen Inserts gut verhalten. Sie behalten die globale Eindeutigkeit von v4 und gewinnen die Index-Lokalität eines Auto-Increment-Integers, ohne die Datenschutz- oder Koordinationskosten von beiden.',
  gridTitle: 'Ist UUID v7 global eindeutig?',
  gridBody:
    'UUIDs sind bei korrekter Erzeugung auf eine extrem geringe Kollisionswahrscheinlichkeit ausgelegt. v7 kombiniert einen Zeitstempel mit großen Zufallsabschnitten, um diese Eigenschaft zu erhalten.',
} as const;

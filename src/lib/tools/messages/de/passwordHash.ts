export const passwordHash = {
  metaTitle: 'Passwort-Hash-Generator und -Verifier (Argon2id, bcrypt, scrypt, PBKDF2) – 2026',
  metaDescription:
    'Kostenloser Passwort-Hash-Generator & -Verifier mit OWASP-/NIST-Parametervorgaben für 2026. Argon2id-, bcrypt-, scrypt- und PBKDF2-Hashes mit Salt und Live-Timing erzeugen und prüfen, vollständig clientseitig, nichts verlässt Ihren Browser.',
  heroLine1: 'Passwort-Hash-Generator und -Verifier',
  heroLine2: '(Argon2id, bcrypt, scrypt, PBKDF2 – OWASP-Standardwerte 2026)',
  heroDescription:
    'Clientseitiges Tool zum Erzeugen und Prüfen von Passwort-Hashes mit realistischen, aktuellen Parametern. Hilfreich beim Debuggen von Integrationen und um zu verstehen, wie Salt, Speicher und Iterationen die Kosten beeinflussen. Die Standardwerte folgen der OWASP-Baseline 2026 (Argon2id m = 19 MiB, t = 2, p = 1) und den PBKDF2-Mindestwerten aus NIST SP 800-63B. Läuft lokal, kein Passwort verlässt Ihren Browser.',
  iframeTitle: 'Passwort-Hash-Generator',
  policyPrefix:
    'Die Sicherheit Ihrer Daten hat für uns höchste Priorität. Hashing und Verifizierung erfolgen in diesem Browser. Dieses Tool speichert oder sendet weder Ihr Passwort noch Hashes außerhalb des Browsers.',
  featureSectionTitle: 'Unterstützte Passwort-Hash-Funktionen',
  f1Title: 'Argon2id-Generator & Parameter (Einstellungen 2026)',
  f1Desc:
    'Argon2id ist eine moderne, speicherharte Funktion, die die Kosten für Angreifer auf GPUs und ASICs erhöht. Die OWASP-Baseline 2026 ist m = 19 MiB, t = 2, p = 1 mit einem zufälligen 16-Byte-Salt. Erlaubt es die Hardware, ist m = 64 MiB / t = 3 / p = 4 stärker. Passen Sie die Werte an, bis eine einzelne Verifizierung in der Produktion etwa 250–500 ms dauert.',
  f2Title: 'bcrypt-Generator (Cost / Rounds)',
  f2Desc:
    'bcrypt ist praxiserprobt und überall verfügbar. Cost-Faktor 12 ist das Minimum für 2026; für neue Systeme wird Cost 13–14 empfohlen. Werte über 14 wirken sich spürbar auf die Login-Latenz aus. Wir geben das $2b$-Format für breite Kompatibilität aus. Beachten Sie, dass bcrypt nur die ersten 72 Bytes der Eingabe berücksichtigt.',
  f3Title: 'scrypt-Generator (N, r, p)',
  f3Desc:
    'scrypt bringt Speicherhärte mit. Die Baseline 2026 ist N = 2^17, r = 8, p = 1 (~128 MiB pro Verifizierung). Für interaktive Logins auf bescheidener Hardware ist N = 2^15 mit r = 8, p = 1 akzeptabel; verwenden Sie nie Werte unter 2^14.',
  f4Title: 'PBKDF2-Generator (SHA-256 / SHA-512)',
  f4Desc:
    'PBKDF2 bleibt das Arbeitstier für Kompatibilität und FIPS-Konformität. NIST SP 800-63B (Aktualisierung 2024) verlangt mindestens 600.000 Iterationen für PBKDF2-HMAC-SHA256 bzw. 210.000 für PBKDF2-HMAC-SHA512. Prüfen Sie die Werte jährlich, da Hardware schneller wird.',
  f5Title: 'Salts (und optionaler Pepper)',
  f5DescBeforeLinks:
    'Das Tool erzeugt kryptografisch sichere Salts und lässt Sie Länge und Kodierung (Hex/Base64) festlegen. Manche Deployments ergänzen einen Pepper (ein serverseitiges, standortweites Secret), der nicht im Hash gespeichert wird. Setzen Sie Pepper mit Bedacht ein und verwalten Sie ihn wie andere Secrets.',
  f5ReadMore: 'Mehr dazu:',
  f5Link1: 'Passwort-Hashing & Salting erklärt',
  f5Link1Href: '/post/password-hashing-salting-function-and-algorithm-explained',
  f5Link2: 'So wählen Sie die richtige Hash-Funktion',
  f5Link2Href: '/post/password-hashing-how-to-pick-the-right-hashing-function',
  howSectionTitle: 'So verwenden Sie den Passwort-Hash-Generator',
  h1Label: 'Schritt 1.',
  h1Title: 'Passwort eingeben',
  h1i1: 'Öffnen Sie den Tab „Erzeugen“ und geben Sie ein Demo-Passwort ein (keine echten Zugangsdaten).',
  h2Label: 'Schritt 2.',
  h2Title: 'Algorithmus wählen',
  h2i1: 'Für neue Systeme wird in der Regel Argon2id empfohlen.',
  h3Label: 'Schritt 3.',
  h3Title: 'Parameter festlegen:',
  h3i1: 'Argon2id: Speicher (MiB), Iterationen (t), Parallelität (p).',
  h3i2: 'bcrypt: Cost (2^cost Runden).',
  h3i3: 'scrypt: N (Zweierpotenz), r, p.',
  h3i4: 'PBKDF2: Iterationen und Digest (SHA-256/512).',
  h4Label: 'Schritt 4.',
  h4Title: 'Passwort-Hash erzeugen',
  h4i1: 'Klicken Sie auf „Passwort-Hash erzeugen“. Kopieren Sie den kodierten String.',
  h5Label: 'Schritt 5.',
  h5Title: 'Passwort-Hash prüfen',
  h5i1: 'Wechseln Sie zu „Passwort-Hash prüfen“, um ein Paar aus Passwort und kodiertem Hash zu testen.',
  faq1Title: 'Kann ich das Tool sicher mit echten Passwörtern verwenden?',
  faq1Body:
    'Das gesamte Hashing erfolgt lokal in Ihrem Browser. Zu Ihrer eigenen Sicherheit sollten Sie Produktions-Secrets trotzdem in keinem Online-Tool verwenden.',
  faq2Title: 'Welche Hash-Funktion sollte ich verwenden?',
  faq2Body:
    'Für neue Systeme wird in der Regel Argon2id empfohlen. bcrypt und scrypt sind weit verbreitet; PBKDF2 ist ein Kompatibilitäts-Fallback. Messen Sie immer nach und wählen Sie Parameter, die Ihre Latenzziele einhalten.',
  faq3Title: 'Wie lange sollte das Hashing dauern?',
  faq3Body:
    'Viele Teams zielen im Authentifizierungspfad auf etwa 250–500 ms. Wählen Sie die langsamsten Einstellungen, bei denen die UX auf Ihrer Produktionshardware noch flüssig bleibt.',
  faq4Title: 'Warum verifiziert mein Framework den Hash nicht?',
  faq4Body:
    'Häufige Ursachen: Leerzeichen/Zeilenenden, abweichende Kodierung (Hex vs. Base64), unterschiedliche bcrypt-Präfixe ($2a$ vs. $2b$) oder ein vergessener Pepper.',
  faq5Title: 'Welche Salt-Länge sollte ich verwenden?',
  faq5Body:
    '16–32 Bytes Zufallsdaten sind Standard. Das Tool verwendet standardmäßig sichere Zufallswerte und zeigt Länge und Kodierung an.',
  faq6Title: 'Kann ich mit diesem Tool einen Passwort-Hash entschlüsseln?',
  faq6Body:
    'Nein, und kein anderes Tool kann das. Argon2id, bcrypt, scrypt und PBKDF2 sind Einweg-Hash-Funktionen, keine Verschlüsselung. Es gibt keinen Schlüssel, der sie „umkehrt“. Ein Passwort lässt sich aus einem Hash nur wiedergewinnen, indem man Kandidaten rät, jeden hasht und vergleicht. Genau das tun Passwort-Cracking-Angriffe, und moderne speicherharte Parameter sind so gewählt, dass dies im großen Maßstab wirtschaftlich unrentabel wird. Um ein bekanntes Passwort gegen einen gespeicherten Hash zu prüfen, nutzen Sie den Tab „Prüfen“.',
  faq7Title: 'Argon2id vs. bcrypt vs. scrypt: Was soll ich 2026 wählen?',
  faq7Body:
    'Argon2id ist der empfohlene Standard für neue Systeme: Es hat die Password Hashing Competition (PHC) gewonnen und ist speicherhart gegen GPU- und ASIC-Angriffe. bcrypt ist für bestehende Deployments mit Cost ≥ 12 in Ordnung, aber nicht speicherhart und auf 72 Bytes Eingabe begrenzt. scrypt ist ebenfalls speicherhart und gut untersucht; wählen Sie es nur, wenn Ihre Laufzeitumgebung keine gepflegte Argon2id-Bibliothek hat. PBKDF2 nur dann, wenn FIPS-/NIST-Konformität es verlangt.',
  faq8Title: 'Wie migriere ich von bcrypt zu Argon2id, ohne einen Passwort-Reset zu erzwingen?',
  faq8Body:
    'Nutzen Sie opportunistisches Rehashing. Verifizieren Sie bestehende Nutzer weiterhin mit bcrypt; bei einem erfolgreichen Login hashen Sie das gerade eingegebene Klartext-Passwort mit Argon2id und aktualisieren das gespeicherte Credential. Führen Sie pro Nutzer ein Feld für die Hash-Version, damit Sie wissen, mit welchem Algorithmus Sie prüfen müssen. Innerhalb weniger Wochen normaler Nutzeraktivität sind die meisten Konten migriert; den Rest können Sie für inaktive Nutzer mit einer Passwort-Reset-Aufforderung erzwingen.',

  widget: {
    ariaLabel: 'Passwort-Hash-Modus',
    tabGenerate: 'Erzeugen',
    tabVerify: 'Prüfen',

    sectionAlgorithm: 'Algorithmus',
    sectionPassword: 'Klartext-Passwort',
    sectionParameters: 'Parameter',
    sectionSalt: 'Salt',

    algoSubtitleArgon2id: 'speicherhart',
    algoSubtitleScrypt: 'speicherhart',
    algoSubtitleBcrypt: 'adaptiv',
    algoSubtitlePbkdf2: 'NIST-konform',

    passwordPlaceholder: 'Passwort zum Hashen eingeben',
    saltPlaceholder: 'Wird automatisch erzeugt',
    saltGenerateAria: 'Neuen Salt erzeugen',
    saltByteUnit: 'B',

    buttonGenerate: 'Passwort-Hash erzeugen',
    buttonGenerating: 'Wird erzeugt…',
    buttonVerify: 'Passwort prüfen',
    buttonVerifying: 'Wird geprüft…',

    resultEncodedHash: 'Kodierter Hash',
    resultCopy: 'Kopieren',
    resultCopied: 'Kopiert',
    resultExecutionTime: 'Ausführungszeit',
    resultTuningHint: 'Stimmen Sie Speicher und Iterationen so ab, dass Sie auf Produktionshardware bei etwa 250–500 ms landen.',
    resultSaltLabel: 'Salt',
    resultMillisecondsSuffix: 'ms',

    verifyEncodedHash: 'Kodierter Hash',
    verifyEncodedHashPlaceholder: 'Kodierten Passwort-Hash einfügen (z. B. $argon2id$v=19$m=19456,t=2,p=1$…)',
    verifyCandidatePassword: 'Zu prüfendes Passwort',
    verifyCandidatePlaceholder: 'Passwort, das gegen den Hash geprüft wird',
    verifySupportedFormatsShow: 'Unterstützte Formate',
    verifySupportedFormatsHide: 'Formate ausblenden',
    verifyMatch: 'Passwort stimmt überein',
    verifyNoMatch: 'Passwort stimmt nicht überein',
    verifyDetectedAlgorithm: 'Erkannter Algorithmus:',

    errorPasswordRequired: 'Bitte geben Sie ein Klartext-Passwort ein',
    errorSaltRequired: 'Bitte geben Sie einen Salt ein oder erzeugen Sie einen',
    errorHashRequired: 'Bitte geben Sie einen kodierten Passwort-Hash ein',
    errorCandidateRequired: 'Bitte geben Sie ein zu prüfendes Passwort ein',

    paramArgon2idMemory: 'Speicher (MiB) (m)',
    paramArgon2idIterations: 'Iterationen (t)',
    paramArgon2idParallelism: 'Parallelität (p)',
    paramArgon2idKeyLength: 'Hash-Länge (Bytes)',
    paramBcryptCost: 'Cost-Faktor',
    paramScryptN: 'N (CPU-/Speicherkosten) (ln)',
    paramScryptR: 'r (Blockgröße)',
    paramScryptP: 'p (Parallelisierung)',
    paramScryptKeyLength: 'Schlüssellänge (Bytes)',
    paramPbkdf2Iterations: 'Iterationen',
    paramPbkdf2KeyLength: 'Schlüssellänge (Bytes)',

    warnArgon2idMemory: 'Speicher unter 19 MiB kann unsicher sein',
    warnArgon2idIterations: 'Weniger als 2 Iterationen können unsicher sein',
    warnArgon2idParallelism: 'Parallelität unter 1 ist ungültig',
    warnScryptR: 'r unter 8 kann unsicher sein',
    warnBcryptCost: 'Cost-Faktor unter 10 kann unsicher sein',
    warnPbkdf2Iterations: 'Weniger als 100.000 Iterationen können unsicher sein',
  },
} as const;

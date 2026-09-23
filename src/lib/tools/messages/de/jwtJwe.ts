export const jwtJwe = {
  metaTitle: 'JWT- & JWE-Debugger: Dekodieren, Verifizieren, Verschlüsseln & Entschlüsseln | Authgear',
  metaDescription:
    'JWTs dekodieren und verifizieren, zu JWE verschlüsseln, JWEs entschlüsseln und Claims prüfen. JWT-Debugger für Entwickler mit jwk/jwks, Signaturprüfung und Verschlüsselung.',
  heroTitle: 'JWT- & JWE-Debugger',
  heroDescription:
    'Dekodieren, verifizieren, signieren, verschlüsseln und entschlüsseln Sie JSON Web Tokens. Unser JWT-Debugger hilft Ihnen, JWT-Header und Claims zu prüfen, Signaturen zu verifizieren und Tokens in die verschlüsselte JWE-Form und zurück zu konvertieren.',
  iframeTitle: 'JWT- & JWE-Debugger',
  policyPrefix:
    'Die Sicherheit Ihrer Daten hat für uns höchste Priorität. Kodierung, Dekodierung, Ver- und Entschlüsselung erfolgen in diesem Browser. Dieses Tool speichert oder sendet Ihre JWTs und JWEs nicht außerhalb des Browsers. Quellcode: ',
  policyGithub: 'https://github.com/authgear/authgear-widget-jwt-debugger',
  card1Title: 'JWT kodieren/dekodieren',
  card1Desc:
    'Erstellen und prüfen Sie JWTs im Handumdrehen. Fügen Sie ein JWT ein, um Header und Payload zu dekodieren, oder bauen Sie zum Testen ein eigenes.',
  card2Title: 'JWT signieren & verifizieren',
  card2Desc:
    'Erzeugen Sie beim Erstellen von JWTs kryptografische Signaturen und verifizieren Sie vorhandene JWT-Signaturen, um Echtheit und Integrität des Tokens zu bestätigen.',
  card3Title: 'JWE-Verschlüsselung',
  card3Desc:
    'Verschlüsseln Sie jedes JWT mit einem öffentlichen Schlüssel zu einem JWE, damit die Daten bei der Übertragung vertraulich bleiben.',
  card4Title: 'JWE-Entschlüsselung',
  card4Desc:
    'Entschlüsseln Sie ein JWE-Token, um das ursprüngliche JWT inklusive Payload zur Analyse zurückzugewinnen.',
  howSectionTitle: 'So funktioniert der JWT- & JWE-Debugger',
  s1Label: 'Schritt 1.',
  s1Title: 'JWT einfügen oder erzeugen:',
  s1i1: 'Geben Sie Ihr JWT ein, um Header und Payload sofort dekodiert zu sehen.',
  s1i2:
    'Das Tool kann die Signatur des JWT verifizieren, um Echtheit und Integrität zu bestätigen, und zeigt an, ob das Token gültig ist oder manipuliert wurde.',
  s2Label: 'Schritt 2.',
  s2Title: 'Signatur verifizieren (JWT-Verifizierung):',
  s2i1:
    'Geben Sie einen JWK oder ein JWKS (jwk-Format / jwks.json) an oder fügen Sie einen öffentlichen PEM-Schlüssel ein, um die Signatur eines Tokens zu verifizieren und die Integrität zu bestätigen. Der Debugger zeigt kid, alg und den Verifizierungsstatus.',
  s3Label: 'Schritt 3.',
  s3Title: 'JWT signieren / erstellen:',
  s3i1:
    'Erstellen Sie ein signiertes JWT, indem Sie einen Algorithmus (RS256, ES256, HS256 usw.) und einen Signaturschlüssel wählen. Das ist nützlich, um JWT-Authentifizierungs-Flows zu testen und mit JWT-Best-Practices zu experimentieren.',
  s4Label: 'Schritt 4.',
  s4Title: 'JWT zu JWE verschlüsseln:',
  s4i1Part1:
    'Verschlüsseln Sie ein signiertes JWT mit einem öffentlichen Schlüssel zu einem JWE (JSON Web Encryption), um vertrauliche Tokens zu erzeugen. Verwenden Sie JWE, wenn Sie neben der Signaturintegrität auch die Vertraulichkeit der Payload brauchen. (Siehe „',
  s4GuideLinkLabel: 'JWE vs. JWT',
  s4i1Part2: '“ in unserem Leitfaden, wann welches Format passt.)',
  s4GuideLink: '/post/jwe-vs-jwt',
  s5Label: 'Schritt 5.',
  s5Title: 'JWE entschlüsseln:',
  s5i1:
    'Fügen Sie ein JWE ein und geben Sie den privaten Schlüssel an, um es zu entschlüsseln und das ursprüngliche JWT zurückzugewinnen. Das Tool unterstützt gängige JWE-Algorithmen und zeigt Header-Felder und enc-Parameter.',
  s6Label: 'Schritt 6.',
  s6Title: 'Claims prüfen & debuggen',
  s6i1:
    'Sehen Sie Claims ein, prüfen Sie die exp/iat/nbf-Logik und erhalten Sie verständliche Warnungen (abgelaufen, noch nicht gültig). Mit den Kopier-Buttons exportieren Sie Tokens oder Schlüssel für lokale Tests',
  faqJwtLinkText: 'Was ist ein JWT',
  faqJwtTitleSuffix: '(JSON Web Token)?',
  faqJwtBodyP1:
    'Ein JWT (JSON Web Token) ist ein offener Standard (RFC 7519) zur sicheren Übertragung von Informationen zwischen Parteien als kompaktes, URL-sicheres JSON-Objekt. ',
  faqJwtBodyLinkMid: 'JWTs sind in Authentifizierungssystemen weit verbreitet',
  faqJwtBodyLinkMidHref: '/post/web-application-authentication-guide',
  faqJwtBodyP2:
    ' und ermöglichen zustandslose Sitzungsverwaltung und API-Sicherheit. Ein Standard-JWT besteht aus drei Teilen:',
  faqJwtBullet1: 'Header: Gibt den Token-Typ und den Hash-Algorithmus an.',
  faqJwtBullet2: 'Payload: Enthält Claims, also Aussagen über den Nutzer und zusätzliche Metadaten.',
  faqJwtBullet3:
    'Signatur: Bestätigt, dass der Absender des JWT der ist, der er vorgibt zu sein, und stellt sicher, dass die Nachricht unterwegs nicht verändert wurde.',
  faqJwtUseCases: 'Typische Anwendungsfälle:',
  faqJwtUse1: 'Nutzerauthentifizierung und Single Sign-on (SSO)',
  faqJwtUse2: 'Sichere API-Authentifizierung und -Autorisierung',
  faqJwtUse3: 'Informationsaustausch zwischen Anwendungen',
  faqJwtBase64Part1: 'Tipp: Header- und Payload-Segment sind Base64URL-kodiert. Fügen Sie ein einzelnes Segment in unseren ',
  faqJwtBase64LinkLabel: 'kostenlosen Base64-Decoder',
  faqJwtBase64Part2: ' ein, um es zu untersuchen.',
  faqJweTitle: 'Was ist ein JWE (JSON Web Encryption)?',
  faqJweBody:
    'Ein JWE (JSON Web Encryption) ist ein weiterer offener Standard (RFC 7516) zum Verschlüsseln von Inhalten, der die Vertraulichkeit übertragener Informationen sichert. JWE verpackt Inhalte, etwa ein signiertes JWT, in ein verschlüsseltes Format, das nur die vorgesehenen Empfänger entschlüsseln und lesen können. Ein Standard-JWE besteht aus:',
  faqJweB1: 'Protected Header (geschützter Header)',
  faqJweB2: 'Encrypted Key (verschlüsselter Schlüssel)',
  faqJweB3: 'Initialization Vector (Initialisierungsvektor)',
  faqJweB4: 'Ciphertext (der eigentliche verschlüsselte Inhalt)',
  faqJweB5: 'Authentication Tag',
  faqJweUseCases: 'Typische Anwendungsfälle:',
  faqJweUse1: 'Sensible JWT-Payloads bei der Übertragung schützen',
  faqJweUse2: 'Vertraulichen Datenaustausch zwischen Diensten absichern',
  faqJweUse3: 'Zusätzliche Sicherheit auf Standard-JWTs aufsetzen',
  dbgBpTitle: 'Best Practices für den JWT- & JWE-Debugger',
  dbgBp1:
    'Signatur: Bestätigt, dass der Absender des JWT der ist, der er vorgibt zu sein, und stellt sicher, dass die Nachricht unterwegs nicht verändert wurde.',
  dbgBp2: 'Payload: Enthält Claims, also Aussagen über den Nutzer und zusätzliche Metadaten.',
  dbgBp3: 'Header: Gibt den Token-Typ und den Hash-Algorithmus an.',
} as const;

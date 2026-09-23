export const passkeyDemo = {
  metaTitle: 'Passkey-Demo & WebAuthn-Tester: Passkeys im Browser ausprobieren',
  metaDescription:
    'Erstellen Sie einen echten Passkey, prüfen Sie das WebAuthn-Credential und verifizieren Sie einen Login, alles lokal in Ihrem Browser. Nichts wird übertragen oder auf einem Server gespeichert.',
  heroTitle: 'Passkey-Demo & WebAuthn-Tester',
  heroDescription:
    'Erstellen Sie mit der WebAuthn-API einen echten Passkey, prüfen Sie das dekodierte Credential und melden Sie sich an, um jeden Verifizierungsschritt zu sehen, den ein Server ausführen würde. Alles geschieht lokal in Ihrem Browser mit WebCrypto. Kein Konto nötig, und nichts verlässt Ihr Gerät.',
  iframeTitle: 'Passkey-Demo & WebAuthn-Tester',
  policyPrefix:
    'Die Sicherheit Ihrer Daten hat für uns höchste Priorität. Passkey-Erstellung, Credential-Prüfung und Signaturverifizierung erfolgen vollständig in Ihrem Browser über die WebAuthn- und WebCrypto-APIs. Es gibt kein Backend, und dieses Tool überträgt oder speichert nichts außerhalb Ihres Geräts. Quellcode: ',
  policyLink: 'https://github.com/oursky/authgear-web',
  howSectionTitle: 'So funktioniert die Passkey-Demo',
  step1Title: 'Erstellungsoptionen wählen:',
  step1Body:
    'Wählen Sie Authenticator-Attachment, User Verification, Resident Key, Attestation und Algorithmen. Das PublicKeyCredentialCreationOptions-JSON aktualisiert sich live, während Sie die Optionen ändern.',
  step2Title: 'Passkey erstellen:',
  step2Body:
    'Der Browser ruft navigator.credentials.create() auf, und Ihr Gerät fragt nach Face ID, Touch ID, Windows Hello oder einem Sicherheitsschlüssel.',
  step3Title: 'Credential prüfen:',
  step3Body:
    'Das Tool dekodiert clientDataJSON und das Attestation-Objekt per CBOR: Flags, Sign Count, AAGUID (das Authenticator-Modell), Credential-ID und den öffentlichen Schlüssel als JWK und PEM.',
  step4Title: 'Damit anmelden:',
  step4Body:
    'navigator.credentials.get() erzeugt eine Assertion, entweder aus Ihrer gespeicherten Credential-Liste oder über den Discoverable-Credential-Flow mit leerer Allow-List.',
  step5Title: 'Wie ein Server verifizieren:',
  step5Body:
    'Jede Prüfung, die ein echter Server durchführt, erhält ein Bestanden/Fehlgeschlagen-Badge mit Erklärung: Ceremony-Typ, Challenge, Origin, RP-ID-Hash, Flags und die WebCrypto-Signaturverifizierung.',
  howGuideText: 'Bereit, Passkeys in Ihre eigene App einzubauen?',
  howGuideLinkText: 'Lesen Sie den Entwicklerleitfaden zur Implementierung von Passkeys',
  howGuideHref: '/post/how-to-implement-passkeys-developer-guide',
  platformsTitle: 'Unterstützte Plattformen',
  platformsIntro:
    'Passkeys funktionieren auf allen großen Plattformen und synchronisieren sich innerhalb des jeweiligen Ökosystems. Diese Demo läuft in jedem Browser mit WebAuthn-Unterstützung.',
  plat1Name: 'Apple',
  plat1Desc: 'iOS 16+ und macOS 13+. Face ID oder Touch ID, synchronisiert über den iCloud-Schlüsselbund.',
  plat2Name: 'Android & Chrome',
  plat2Desc: 'Android 9+. Fingerabdruck oder Bildschirmsperre, synchronisiert über den Google Passwortmanager.',
  plat3Name: 'Windows',
  plat3Desc: 'Windows 10 und 11. Windows Hello per Gesicht, Fingerabdruck oder PIN.',
  plat4Name: 'Passwortmanager',
  plat4Desc: '1Password, Bitwarden, Dashlane, Proton Pass und andere speichern und synchronisieren Passkeys plattformübergreifend.',
  plat5Name: 'Sicherheitsschlüssel',
  plat5Desc: 'YubiKey und andere FIDO2-Hardwareschlüssel funktionieren über den plattformübergreifenden Transport (USB/NFC).',
  readyTitle: 'Bereit, Passkeys in Ihrer eigenen App auszuliefern?',
  readySubtitle: 'Authgear liefert Passkey-Login von Haus aus, ganz ohne eigene WebAuthn-Verdrahtung.',
  readyCta: 'Authgear Passkeys entdecken',
  faqWebauthnTitle: 'Was ist WebAuthn?',
  faqWebauthnBody:
    'WebAuthn (Web Authentication) ist die standardisierte W3C-Browser-API hinter Passkeys. Statt eines gemeinsamen Passworts erzeugt Ihr Gerät pro Website ein Schlüsselpaar aus öffentlichem und privatem Schlüssel: Der private Schlüssel verlässt nie Ihren Authenticator, die Website speichert nur den öffentlichen. Der Login ist eine Challenge-Response-Signatur. Passkeys widerstehen Phishing, weil der Browser jedes Credential an genau den Origin bindet, der es erstellt hat.',
  faqWebauthnLinkText: 'Siehe unseren Entwicklerleitfaden zur Implementierung von Passkeys.',
  faqWebauthnLinkHref: '/post/how-to-implement-passkeys-developer-guide',
  faqSafeTitle: 'Ist es sicher, hier einen Passkey zu erstellen?',
  faqSafeBody:
    'Ja. Der auf dieser Seite erstellte Passkey ist echt, gilt aber nur für diese Website und ist zu nichts anderem als dieser Demo zu gebrauchen. Der private Schlüssel bleibt im Authenticator Ihres Geräts; der öffentliche Schlüssel und die Credential-Metadaten liegen nur im localStorage Ihres Browsers. Es gibt keinen Server, also wird nichts irgendwohin übertragen. Sie können den Demo-Eintrag mit einem Klick löschen und den Passkey selbst jederzeit von Ihrem Gerät entfernen.',
  faqDeleteTitle: 'Wie lösche ich den Demo-Passkey von meinem Gerät?',
  faqDeleteIntro:
    '„Vergessen“ im Tool entfernt nur den Eintrag dieser Seite. So entfernen Sie den Passkey von Ihrem Gerät:',
  faqDeleteIos: 'iOS / macOS: Einstellungen → Passwörter (oder die Passwörter-App) → diese Website suchen → Passkey löschen.',
  faqDeleteAndroid: 'Android / Chrome: Google Passwortmanager → Passwörter → diese Website suchen → löschen.',
  faqDeleteWindows: 'Windows: Einstellungen → Konten → Passkeys → diese Website suchen → entfernen.',
  faqDeleteManagers: 'Passwortmanager (1Password, Bitwarden, …): den Eintrag für diese Website suchen und dort löschen.',
  faqAaguidTitle: 'Was ist eine AAGUID?',
  faqAaguidBody:
    'Die AAGUID (Authenticator Attestation Globally Unique Identifier) ist eine 16-Byte-Kennung, die das Authenticator-Modell identifiziert (etwa Google Passwortmanager oder einen YubiKey 5), nicht Ihr einzelnes Gerät. Dieses Tool löst sie gegen einen mitgelieferten Snapshot der von der Community gepflegten Liste passkey-authenticator-aaguids auf. Ist Attestation auf „none“ gesetzt (Standard), setzen viele Authenticator sie aus Datenschutzgründen auf null.',
  faqSignCountTitle: 'Warum zeigt der Sign Count 0?',
  faqSignCountBody:
    'Der Signaturzähler wurde entwickelt, um geklonte Credentials zu erkennen: Jede Nutzung sollte ihn erhöhen. Ein synchronisierter Passkey liegt aber gleichzeitig auf mehreren Geräten und kann keinen gemeinsamen Zähler führen, deshalb melden die meisten Passkey-Anbieter (iCloud-Schlüsselbund, Google Passwortmanager) immer 0, was „Zähler nicht unterstützt“ bedeutet. Hardware-Sicherheitsschlüssel erhöhen ihn in der Regel.',
} as const;

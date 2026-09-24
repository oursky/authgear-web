export const base64 = {
  metaTitle: 'Décodage et encodage Base64 | Authgear',
  metaDescription:
    'Décodez du Base64 en texte ou encodez du texte en Base64 instantanément, à 100 % dans votre navigateur. Base64URL pour les JWT, UTF-8, UTF-16, ASCII. Gratuit, open source, rien n’est envoyé.',
  heroTitle: 'Décoder & encoder en Base64',
  heroDescription: 'Décodez ou encodez facilement des chaînes Base64 directement dans votre navigateur.',
  iframeTitle: 'Encodeur & décodeur Base64',
  policy:
    'La sécurité de vos données est notre priorité absolue. L’encodage et le décodage s’effectuent entièrement en local dans votre navigateur. Cet outil ne stocke aucune donnée et n’envoie rien hors de votre appareil.',
  card1Title: 'Simple & rapide',
  card1Desc: 'Encodez ou décodez n’importe quel texte ou chaîne Base64 instantanément, en un seul clic.',
  card2Title: '100 % côté client',
  card2Desc: 'Aucune donnée n’est envoyée à un serveur. Tout s’exécute en toute sécurité dans votre navigateur.',
  card3Title: 'Pensé pour les développeurs.',
  card3Desc: 'Cet outil vous permet d’encoder ou de décoder des données Base64 avec précision et efficacité.',
  card4Title: 'Prise en charge de Base64URL',
  card4Desc:
    'Décodez et encodez du Base64URL, la variante compatible avec les URL utilisée dans les JWT, les tokens OAuth et les URL.',
  step1Label: 'Étape 1.',
  step1Title: 'Choisir un jeu de caractères',
  step1Item1:
    'Sélectionnez le jeu de caractères souhaité, par exemple UTF-8. Il détermine la façon dont votre texte est converti avant l’encodage ou après le décodage.',
  step2Label: 'Étape 2.',
  step2Title: 'Encoder du texte brut',
  step2Item1:
    'Dans la section « Texte décodé », saisissez ou collez votre texte, puis cliquez sur « Encoder ». Le résultat Base64 s’affiche dans la zone de sortie de la même section.',
  step3Label: 'Étape 3.',
  step3Title: 'Décoder du Base64',
  step3Item1:
    'Dans la section « Texte encodé », saisissez votre chaîne Base64, puis cliquez sur « Décoder ». Le texte décodé s’affiche dans cette section.',
  faqWhatTitle: 'Qu’est-ce que l’encodage Base64 ?',
  faqWhatBody:
    'Base64 est un format d’encodage binaire vers texte qui représente des données binaires à l’aide de caractères ASCII.\nIl permet d’inclure du contenu binaire en toute sécurité dans des formats tels que JSON, XML ou les en-têtes HTTP.\nExemple :\nAuthgear → QXV0aGdlYXI=',
  faqUrlTitle: 'Quelle est la différence entre Base64 et Base64URL ?',
  faqUrlBody:
    'Base64URL est une variante de Base64 conçue pour les URL et les formats de tokens. Elle remplace les caractères + par - et / par _, et les caractères de remplissage (=) sont souvent omis pour la compatibilité avec les URL.\nCe format est couramment utilisé dans les JWT, les tokens OAuth et OpenID Connect.',
  faqGuidePart1: 'Vous souhaitez comprendre plus en détail le fonctionnement de Base64 et savoir quand l’utiliser ? Consultez notre ',
  faqGuideLinkLabel: 'guide d’encodage & de décodage Base64',
  faqGuidePart2: '.',

  widget: {
    charsetLabel: 'Jeu de caractères',
    urlSafeLabel: 'Compatible URL',
    withoutPaddingLabel: 'Sans padding',

    plainTextLabel: 'Texte brut',
    plainTextHint: 'Saisissez ou collez le texte à encoder',
    plainTextPlaceholder: 'Saisissez le texte à encoder…',

    base64Label: 'Base64',
    base64Hint: 'Saisissez ou collez le Base64 à décoder',
    base64Placeholder: 'Saisissez le texte Base64 à décoder…',

    buttonEncode: 'Encoder',
    buttonDecode: 'Décoder',
    buttonReset: 'Réinitialiser',
    buttonCopy: 'Copier',
    buttonCopied: 'Copié',
    buttonClear: 'Effacer',

    errorEncode: 'Impossible d’encoder l’entrée',
    errorDecode: 'Décodage impossible : entrée Base64 invalide',
  },
} as const;

export const totp = {
  metaTitle: 'Authentificateur TOTP : générateur & testeur TOTP en ligne',
  metaDescription:
    'Générez des codes TOTP (RFC 6238) en ligne avec un algorithme (SHA-1/256/512) et un nombre de chiffres (6/8) personnalisables, et enregistrez jusqu’à 10 applications.',
  heroTitle: 'Authentificateur TOTP : générateur de mots de passe à usage unique en ligne (RFC 6238)',
  heroDescriptionBeforeLink: 'Générez et copiez instantanément des mots de passe à usage unique basés sur le temps (TOTP) pour vos tests, votre débogage et votre QA. Configurez l’algorithme (SHA-1 / SHA-256 / SHA-512) et le nombre de chiffres (6 ou 8), et observez des codes en direct qui se renouvellent toutes les 30 secondes conformément à la ',
  heroRfcLink: 'RFC 6238',
  heroRfcHref: 'https://datatracker.ietf.org/doc/html/rfc6238',
  iframeTitle: 'Authentificateur TOTP - Générateur de mots de passe à usage unique',
  policyLine1:
    'La sécurité de vos données est notre priorité absolue. La génération des codes TOTP et la gestion des applications s’effectuent entièrement dans votre navigateur.',
  policyLine2:
    'Cet outil ne stocke ni ne transmet vos clés secrètes ou vos codes hors de votre navigateur.',
  s1Label: 'Étape 1.',
  s1Title: 'Saisir la clé secrète de votre application',
  s1Body: 'Collez le secret TOTP partagé (Base32) depuis l’écran de configuration 2FA de votre application.',
  s2Label: 'Étape 2.',
  s2Title: 'Personnaliser l’algorithme et le nombre de chiffres',
  s2BodyBefore:
    'Choisissez SHA-1, SHA-256 ou SHA-512, ainsi que 6 ou 8 chiffres. SHA-1 + 6 chiffres est la valeur par défaut la plus courante ; utilisez des hachages plus forts si votre intégration l’exige.',
  s3Label: 'Étape 3.',
  s3Title: 'Générer le mot de passe à usage unique',
  s3Body:
    'L’OTP actuel est généré et se met à jour automatiquement par pas de 30 secondes (valeur par défaut selon la RFC 6238). Enregistrez jusqu’à 10 secrets d’applications différentes pour des tests rapides.',
  s4Label: 'Étape 4.',
  s4Title: 'Copier et utiliser le mot de passe à usage unique pour vous authentifier',
  s4Body: 'Cliquez ou appuyez sur le code pour le copier dans le presse-papiers, puis collez-le dans le flux de connexion de votre application.',
  cautionLead: 'Attention :',
  cautionBody:
    'La génération et le stockage des codes s’effectuent uniquement dans la mémoire de votre navigateur.\nPar conséquent, si vous videz le cache de votre navigateur ou le réinstallez, toutes les données enregistrées pour cet outil seront définitivement supprimées.',
  troubleshootTitle: 'Dépannage',
  tr1Title: 'Les codes ne correspondent pas ?',
  tr1Item:
    'Vérifiez les horloges du serveur et du client ; TOTP dépend d’une heure exacte. Autorisez une fenêtre de vérification (±1 pas de temps) pendant les tests.',
  tr2Title: 'Mauvais format de secret ?',
  tr2Item:
    'Assurez-vous que le secret est en Base32. Si vous avez un QR code, scannez-le ou extrayez le paramètre secret= de l’URI otpauth.',
  tr3Title: 'Erreurs « Algorithm mismatch »',
  tr3Item:
    'Vérifiez que le serveur et l’authentificateur utilisent le même algorithme (SHA-1/256/512), le même nombre de chiffres et le même pas de temps.',
  tr4Title: 'Échecs intermittents dans les tests',
  tr4Item:
    'Assurez-vous de ne pas réutiliser un secret dans plusieurs environnements (par ex. le même secret en staging et en production peut créer de la confusion)',
  readyTitle: 'Sécurisez vos comptes en toute simplicité avec Authgear',
  readySubtitle:
    'Authgear vous offre une gestion des identités évolutive, une authentification sécurisée et une intégration facile.',
  faq1Title: 'Qu’est-ce que TOTP ?',
  faq1Body:
    'TOTP (Time-based One-Time Password) est un algorithme standard du secteur qui génère des codes temporaires à usage unique à partir de l’heure actuelle et d’un secret partagé. TOTP est défini par la norme officielle de l’IETF RFC 6238, qui spécifie comment ces codes sont calculés afin de fournir des valeurs OTP éphémères pour une authentification à deux facteurs sécurisée sur les sites web, les applications et les services.',
  faq2Title: 'Pourquoi TOTP ?',
  faq2b1: 'Renforce la sécurité grâce à l’authentification à deux facteurs (2FA)',
  faq2b2: 'Largement adopté par les grandes plateformes (Google, Microsoft, GitHub, etc.)',
  faq2b3: 'Les codes expirent rapidement, ce qui réduit au minimum le risque de réutilisation',
  faq3Title: 'Combien de temps un TOTP est-il valide ?',
  faq3Body:
    '30 secondes par défaut (la RFC 6238 recommande 30 s). La vérification côté serveur tolère souvent un pas de temps de marge pour compenser le décalage d’horloge.',
  faq4Title: 'Quel algorithme utiliser : SHA-1, SHA-256 ou SHA-512 ?',
  faq4Body:
    'SHA-1 est largement pris en charge et utilisé par la plupart des applications d’authentification ; SHA-256/512 sont plus robustes si vous contrôlez à la fois le client et le serveur et souhaitez un hachage plus strict. Assurez-vous que toutes les parties utilisent le même algorithme.',
  faq5Title: 'Faut-il utiliser 6 ou 8 chiffres ?',
  faq5Body:
    '6 chiffres est la norme courante (équilibre entre facilité d’utilisation et sécurité). 8 chiffres offrent un peu plus d’entropie, mais sont moins répandus dans les authentificateurs grand public.',
  faq6Title: 'Comment extraire un secret d’une URI otpauth:// ?',
  faq6Body: 'Le paramètre secret= de l’URL otpauth:// est le secret Base32.',
  faq7Title: 'Comment les applications d’authentification génèrent-elles ces codes ?',
  faq7Body:
    'Google Authenticator, Microsoft Authenticator, Authy et 1Password exécutent tous le même algorithme RFC 6238 que celui présenté ici : le secret partagé et le pas de temps de 30 secondes actuel passent par HMAC, et le résultat est tronqué à 6 ou 8 chiffres. C’est pourquoi, pour un même secret, le code de cette page correspond à celui de votre application.',
  faq7GuidePart1: 'Pour l’explication complète, lisez ',
  faq7GuideLinkLabel: 'Comment fonctionnent les applications d’authentification',
  faq7GuidePart2: '. Vous préférez vous passer totalement des codes ? Essayez la ',
  faq7PasskeyLinkLabel: 'démo Passkey',
  faq7GuidePart3: ' pour voir une connexion sans mot de passe et résistante au phishing en action.',
} as const;

export const hmac = {
  metaTitle: 'Générateur & vérificateur HMAC : SHA-256, SHA-384, SHA-512 | Authgear',
  metaDescription:
    'Générez et vérifiez des signatures HMAC-SHA256, SHA-384 et SHA-512 avec une sortie Hex ou Base64. S’exécute entièrement dans votre navigateur, votre clé secrète ne quitte jamais votre appareil.',
  heroTitle: 'Générateur/vérificateur de signature HMAC',
  heroDescription:
    'Générez et vérifiez des signatures HMAC-SHA256, SHA-384 et SHA-512 avec une sortie Hex ou Base64. Tous les calculs s’effectuent en local dans votre navigateur : votre clé secrète et votre charge utile (payload) ne quittent jamais votre appareil.',
  iframeTitle: 'Générateur/vérificateur de signature HMAC',
  policyPrefix:
    'La sécurité de vos données est notre priorité absolue. La génération et la vérification des signatures s’effectuent entièrement dans votre navigateur. Cet outil ne stocke ni ne transmet vos charges utiles, secrets ou signatures hors du navigateur. Code source : ',
  policyLink: 'https://github.com/authgear/authgear-widget-hmac-tool',
  howSectionTitle: 'Comment fonctionne le générateur de signature HMAC',
  supportedAlgorithmsTitle: 'Algorithmes pris en charge',
  supportedAlgorithmsIntro:
    'Calculez des signatures HMAC avec l’un de ces algorithmes de hachage, en sortie Hex ou Base64. Utile pour vérifier les signatures de webhooks, signer des requêtes API et contrôler l’intégrité des données.',
  algHs256: 'HMAC + SHA-256',
  algHs384: 'HMAC + SHA-384',
  algHs512: 'HMAC + SHA-512',
  step1Title: 'Saisir la charge utile :',
  step1Body: 'Saisissez exactement le message ou le contenu de la charge utile que vous souhaitez signer ou vérifier.',
  step2Title: 'Fournir le secret du webhook :',
  step2Body:
    'Insérez la clé secrète partagée utilisée pour la génération HMAC, généralement connue de vous seul et de votre fournisseur de webhooks.',
  step3Title: 'Choisir l’algorithme HMAC :',
  step3Body: 'Choisissez HS256, HS384 ou HS512 selon la configuration de votre application.',
  step4Title: 'Générer la signature :',
  step4Body:
    'Cliquez pour calculer la signature HMAC de votre charge utile et de votre secret avec l’algorithme sélectionné.',
  step5Title: 'Coller la signature reçue pour la vérifier :',
  step5Body:
    'Collez la signature reçue d’un système externe ou d’un webhook afin de la comparer à celle que vous avez générée.',
  faqWhatTitle: 'Qu’est-ce que HMAC ?',
  faqWhatBody:
    'HMAC (Hash-based Message Authentication Code) est un mécanisme qui utilise une fonction de hachage cryptographique et une clé secrète pour produire la signature d’un message ou d’une charge utile. Cette signature garantit à la fois l’intégrité des données et l’authentification : le message n’a pas été altéré et provient bien de l’expéditeur annoncé.',
  faqWhyTitle: 'Pourquoi HMAC ?',
  faqWhy1: 'Vérifie l’authenticité des messages, en particulier pour les webhooks et les callbacks d’API',
  faqWhy2: 'Empêche l’altération et les attaques par rejeu en garantissant l’intégrité des messages',
  faqWhy3: 'Technique cryptographique simple et largement répandue, prise en charge par la plupart des plateformes',
  bestPracticesTitle: 'Bonnes pratiques',
  bp1: 'Gardez le secret de votre webhook confidentiel et ne le partagez jamais publiquement.',
  bp2: 'Vérifiez toujours les signatures des webhooks entrants avant de traiter les charges utiles.',
  bp3: 'Privilégiez SHA-256 ou plus fort ; évitez les HMAC basés sur MD5 et SHA-1 dans les nouveaux systèmes.',
} as const;

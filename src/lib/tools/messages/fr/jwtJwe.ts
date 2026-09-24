export const jwtJwe = {
  metaTitle: 'Débogueur JWT & JWE : décoder, vérifier, chiffrer & déchiffrer | Authgear',
  metaDescription:
    'Décodez et vérifiez des JWT, chiffrez en JWE, déchiffrez des JWE et inspectez les claims. Débogueur JWT pour développeurs : prise en charge de jwk/jwks, vérification de signature et chiffrement.',
  heroTitle: 'Débogueur JWT & JWE',
  heroDescription:
    'Décodez, vérifiez, signez, chiffrez et déchiffrez des JSON Web Tokens. Notre débogueur JWT vous aide à inspecter les en-têtes et les claims des JWT, à vérifier les signatures et à convertir les tokens vers et depuis la forme chiffrée JWE.',
  iframeTitle: 'Débogueur JWT & JWE',
  policyPrefix:
    'La sécurité de vos données est notre priorité absolue. L’encodage, le décodage, le chiffrement et le déchiffrement s’effectuent dans ce navigateur. Cet outil ne stocke ni n’envoie vos JWT et JWE hors du navigateur. Code source : ',
  policyGithub: 'https://github.com/authgear/authgear-widget-jwt-debugger',
  card1Title: 'Encoder/décoder un JWT',
  card1Desc:
    'Créez et inspectez rapidement des JWT. Collez un JWT pour décoder l’en-tête et la charge utile, ou créez le vôtre pour vos tests.',
  card2Title: 'Signer & vérifier un JWT',
  card2Desc:
    'Générez des signatures cryptographiques lors de la création de JWT et vérifiez les signatures de JWT existants pour confirmer l’authenticité et l’intégrité du token.',
  card3Title: 'Chiffrement JWE',
  card3Desc:
    'Chiffrez n’importe quel JWT en JWE à l’aide d’une clé publique, afin que les données restent confidentielles pendant la transmission.',
  card4Title: 'Déchiffrement JWE',
  card4Desc:
    'Déchiffrez un token JWE pour récupérer le JWT d’origine, charge utile incluse, à des fins d’analyse.',
  howSectionTitle: 'Comment fonctionne le débogueur JWT & JWE',
  s1Label: 'Étape 1.',
  s1Title: 'Coller ou générer un JWT :',
  s1i1: 'Saisissez votre JWT pour voir instantanément son en-tête et sa charge utile décodés.',
  s1i2:
    'L’outil peut vérifier la signature du JWT pour confirmer son authenticité et son intégrité, et indique si le token est valide ou a été altéré.',
  s2Label: 'Étape 2.',
  s2Title: 'Vérifier la signature (vérification du JWT) :',
  s2i1:
    'Fournissez un JWK ou un JWKS (format jwk / jwks.json) ou collez une clé publique PEM pour vérifier la signature d’un token et confirmer son intégrité. Le débogueur affiche kid, alg et l’état de la vérification.',
  s3Label: 'Étape 3.',
  s3Title: 'Signer / créer un JWT :',
  s3i1:
    'Créez un JWT signé en choisissant un algorithme (RS256, ES256, HS256, etc.) et une clé de signature. Utile pour tester des flux d’authentification par JWT et expérimenter les bonnes pratiques JWT.',
  s4Label: 'Étape 4.',
  s4Title: 'Chiffrer un JWT en JWE :',
  s4i1Part1:
    'Chiffrez un JWT signé en JWE (JSON Web Encryption) à l’aide d’une clé publique pour produire des tokens confidentiels. Utilisez JWE lorsque vous avez besoin de la confidentialité de la charge utile en plus de l’intégrité de la signature. (Voir « ',
  s4GuideLinkLabel: 'JWE vs JWT',
  s4i1Part2: ' » dans notre guide pour savoir quand utiliser chaque format.)',
  s4GuideLink: '/post/jwe-vs-jwt',
  s5Label: 'Étape 5.',
  s5Title: 'Déchiffrer un JWE :',
  s5i1:
    'Collez un JWE et fournissez la clé privée pour le déchiffrer et récupérer le JWT d’origine. L’outil prend en charge les algorithmes JWE courants et affiche les champs d’en-tête et les paramètres enc.',
  s6Label: 'Étape 6.',
  s6Title: 'Inspecter les claims & déboguer',
  s6i1:
    'Consultez les claims, vérifiez la logique exp/iat/nbf et obtenez des avertissements lisibles (expiré, pas encore valide). Utilisez les boutons de copie pour exporter les tokens ou les clés pour vos tests locaux',
  faqJwtLinkText: 'Qu’est-ce qu’un JWT',
  faqJwtTitleSuffix: '(JSON Web Token) ?',
  faqJwtBodyP1:
    'Un JWT (JSON Web Token) est un standard ouvert (RFC 7519) permettant de transmettre des informations de manière sécurisée entre des parties sous la forme d’un objet JSON compact et compatible avec les URL. ',
  faqJwtBodyLinkMid: 'Les JWT sont largement utilisés dans les systèmes d’authentification',
  faqJwtBodyLinkMidHref: '/post/web-application-authentication-guide',
  faqJwtBodyP2:
    ', permettant une gestion de session sans état et la sécurisation des API. Un JWT standard comporte trois parties :',
  faqJwtBullet1: 'En-tête : indique le type de token et l’algorithme de hachage.',
  faqJwtBullet2: 'Charge utile : contient les claims, c’est-à-dire des déclarations sur l’utilisateur et des métadonnées supplémentaires.',
  faqJwtBullet3:
    'Signature : vérifie que l’émetteur du JWT est bien celui qu’il prétend être et garantit que le message n’a pas été modifié en chemin.',
  faqJwtUseCases: 'Cas d’usage courants :',
  faqJwtUse1: 'Authentification des utilisateurs et authentification unique (SSO)',
  faqJwtUse2: 'Authentification et autorisation sécurisées des API',
  faqJwtUse3: 'Échange d’informations entre applications',
  faqJwtBase64Part1: 'Astuce : les segments d’en-tête et de charge utile sont encodés en Base64URL. Collez un segment seul dans notre ',
  faqJwtBase64LinkLabel: 'décodeur Base64 gratuit',
  faqJwtBase64Part2: ' pour l’inspecter.',
  faqJweTitle: 'Qu’est-ce qu’un JWE (JSON Web Encryption) ?',
  faqJweBody:
    'Un JWE (JSON Web Encryption) est un autre standard ouvert (RFC 7516) destiné au chiffrement de contenu, qui assure la confidentialité des informations transmises. Le JWE encapsule un contenu, par exemple un JWT signé, dans un format chiffré que seuls les destinataires prévus peuvent déchiffrer et lire. Un JWE standard se compose de :',
  faqJweB1: 'Protected Header (en-tête protégé)',
  faqJweB2: 'Encrypted Key (clé chiffrée)',
  faqJweB3: 'Initialization Vector (vecteur d’initialisation)',
  faqJweB4: 'Ciphertext (le contenu chiffré proprement dit)',
  faqJweB5: 'Authentication Tag',
  faqJweUseCases: 'Cas d’usage courants :',
  faqJweUse1: 'Protéger les charges utiles JWT sensibles en transit',
  faqJweUse2: 'Sécuriser les échanges de données confidentielles entre services',
  faqJweUse3: 'Ajouter une couche de sécurité supplémentaire aux JWT standard',
  dbgBpTitle: 'Bonnes pratiques du débogueur JWT & JWE',
  dbgBp1:
    'Signature : vérifie que l’émetteur du JWT est bien celui qu’il prétend être et garantit que le message n’a pas été modifié en chemin.',
  dbgBp2: 'Charge utile : contient les claims, c’est-à-dire des déclarations sur l’utilisateur et des métadonnées supplémentaires.',
  dbgBp3: 'En-tête : indique le type de token et l’algorithme de hachage.',
} as const;

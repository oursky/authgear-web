export const passwordHash = {
  metaTitle: 'Générateur et vérificateur de hachage de mot de passe (Argon2id, bcrypt, scrypt, PBKDF2) – 2026',
  metaDescription:
    'Générateur & vérificateur de hachage de mot de passe gratuit avec les préréglages de paramètres OWASP / NIST 2026. Créez et vérifiez des hachages Argon2id, bcrypt, scrypt et PBKDF2 avec sels et mesure du temps en direct, entièrement côté client, rien ne quitte votre navigateur.',
  heroLine1: 'Générateur et vérificateur de hachage de mot de passe',
  heroLine2: '(Argon2id, bcrypt, scrypt, PBKDF2 – valeurs par défaut OWASP 2026)',
  heroDescription:
    'Outil côté client pour générer et vérifier des hachages de mots de passe avec des paramètres réalistes et à jour. Utile pour déboguer des intégrations et comprendre comment le sel, la mémoire et les itérations influent sur le coût. Les valeurs par défaut suivent la référence OWASP 2026 (Argon2id m = 19 MiB, t = 2, p = 1) et les minimums PBKDF2 du NIST SP 800-63B. S’exécute en local, aucun mot de passe ne quitte votre navigateur.',
  iframeTitle: 'Générateur de hachage de mot de passe',
  policyPrefix:
    'La sécurité de vos données est notre priorité absolue. Le hachage et la vérification s’effectuent dans ce navigateur. Cet outil ne stocke ni n’envoie votre mot de passe ou vos hachages hors du navigateur.',
  featureSectionTitle: 'Fonctions de hachage de mot de passe prises en charge',
  f1Title: 'Générateur Argon2id & paramètres (réglages 2026)',
  f1Desc:
    'Argon2id est une fonction moderne à forte consommation mémoire (memory-hard) qui augmente le coût pour un attaquant sur GPU et ASIC. La référence OWASP 2026 est m = 19 MiB, t = 2, p = 1 avec un sel aléatoire de 16 octets. Si le matériel le permet, m = 64 MiB / t = 3 / p = 4 est plus robuste. Ajustez jusqu’à ce qu’une vérification unique prenne environ 250 à 500 ms en production.',
  f2Title: 'Générateur bcrypt (cost / rounds)',
  f2Desc:
    'bcrypt a fait ses preuves et est disponible partout. Le facteur de coût 12 est le minimum pour 2026 ; un coût de 13 à 14 est préférable pour les nouveaux systèmes. Au-delà de 14, la latence de connexion est sensiblement affectée. Nous produisons le format $2b$ pour une large compatibilité. Notez que bcrypt ne prend en compte que les 72 premiers octets de l’entrée.',
  f3Title: 'Générateur scrypt (N, r, p)',
  f3Desc:
    'scrypt ajoute une résistance basée sur la mémoire. La référence 2026 est N = 2^17, r = 8, p = 1 (~128 MiB par vérification). Pour des connexions interactives sur du matériel modeste, N = 2^15 avec r = 8, p = 1 est acceptable ; n’utilisez jamais de valeurs inférieures à 2^14.',
  f4Title: 'Générateur PBKDF2 (SHA-256 / SHA-512)',
  f4Desc:
    'PBKDF2 reste la valeur sûre pour la compatibilité et la conformité FIPS. Le NIST SP 800-63B (mise à jour 2024) exige au moins 600 000 itérations pour PBKDF2-HMAC-SHA256, ou 210 000 pour PBKDF2-HMAC-SHA512. Réévaluez ces valeurs chaque année à mesure que le matériel progresse.',
  f5Title: 'Sels (et pepper facultatif)',
  f5DescBeforeLinks:
    'L’outil génère des sels cryptographiquement sûrs et vous laisse définir la longueur et l’encodage (Hex/Base64). Certains déploiements ajoutent aussi un pepper (secret côté serveur, commun à tout le site) qui n’est pas stocké dans le hachage. Utilisez les peppers avec précaution et gérez-les comme les autres secrets.',
  f5ReadMore: 'En savoir plus :',
  f5Link1: 'Hachage & salage des mots de passe expliqués',
  f5Link1Href: '/post/password-hashing-salting-function-and-algorithm-explained',
  f5Link2: 'Comment choisir la bonne fonction de hachage',
  f5Link2Href: '/post/password-hashing-how-to-pick-the-right-hashing-function',
  howSectionTitle: 'Comment utiliser le générateur de hachage de mot de passe',
  h1Label: 'Étape 1.',
  h1Title: 'Saisir un mot de passe',
  h1i1: 'Ouvrez l’onglet « Générer » et saisissez un mot de passe de démonstration (évitez de vrais identifiants).',
  h2Label: 'Étape 2.',
  h2Title: 'Choisir un algorithme',
  h2i1: 'Pour les nouveaux systèmes, Argon2id est généralement recommandé.',
  h3Label: 'Étape 3.',
  h3Title: 'Définir les paramètres :',
  h3i1: 'Argon2id : mémoire (MiB), itérations (t), parallélisme (p).',
  h3i2: 'bcrypt : coût (2^cost rounds).',
  h3i3: 'scrypt : N (puissance de deux), r, p.',
  h3i4: 'PBKDF2 : itérations et digest (SHA-256/512).',
  h4Label: 'Étape 4.',
  h4Title: 'Générer le hachage du mot de passe',
  h4i1: 'Cliquez sur « Générer le hachage du mot de passe ». Copiez la chaîne encodée.',
  h5Label: 'Étape 5.',
  h5Title: 'Vérifier le hachage du mot de passe',
  h5i1: 'Passez à « Vérifier le hachage du mot de passe » pour tester une paire mot de passe + hachage encodé.',
  faq1Title: 'Est-il sûr d’utiliser cet outil avec de vrais mots de passe ?',
  faq1Body:
    'Tout le hachage s’effectue en local dans votre navigateur. Pour votre propre sécurité, évitez néanmoins d’utiliser des secrets de production dans un outil en ligne, quel qu’il soit.',
  faq2Title: 'Quelle fonction de hachage utiliser ?',
  faq2Body:
    'Pour les nouveaux systèmes, Argon2id est généralement recommandé. bcrypt et scrypt sont largement déployés ; PBKDF2 est une solution de repli pour la compatibilité. Mesurez toujours les performances et choisissez des paramètres qui respectent vos objectifs de latence.',
  faq3Title: 'Combien de temps le hachage doit-il prendre ?',
  faq3Body:
    'De nombreuses équipes visent environ 250 à 500 ms dans le parcours d’authentification. Choisissez les réglages les plus lents qui gardent une expérience fluide sur votre matériel de production.',
  faq4Title: 'Pourquoi mon framework ne vérifie-t-il pas le hachage ?',
  faq4Body:
    'Causes fréquentes : espaces ou fins de ligne, encodage différent (hex vs Base64), préfixes bcrypt différents ($2a$ vs $2b$) ou pepper oublié.',
  faq5Title: 'Quelle longueur de sel utiliser ?',
  faq5Body:
    '16 à 32 octets de données aléatoires sont la norme. L’outil utilise par défaut un aléa sûr et affiche la longueur et l’encodage.',
  faq6Title: 'Puis-je déchiffrer un hachage de mot de passe avec cet outil ?',
  faq6Body:
    'Non, et aucun autre outil ne le peut. Argon2id, bcrypt, scrypt et PBKDF2 sont des fonctions de hachage à sens unique, pas du chiffrement. Il n’existe aucune clé permettant de les « inverser ». La seule façon de retrouver un mot de passe à partir d’un hachage est de deviner des candidats, de hacher chacun d’eux et de comparer. C’est exactement ce que font les attaques de cassage de mots de passe, et les paramètres modernes à forte consommation mémoire sont réglés pour rendre cela économiquement prohibitif à grande échelle. Pour vérifier un mot de passe connu contre un hachage stocké, utilisez l’onglet « Vérifier ».',
  faq7Title: 'Argon2id vs bcrypt vs scrypt : que choisir en 2026 ?',
  faq7Body:
    'Argon2id est le choix recommandé par défaut pour les nouveaux systèmes : lauréat de la Password Hashing Competition (PHC), il résiste aux attaques GPU et ASIC grâce à sa forte consommation mémoire. bcrypt convient aux déploiements existants avec un coût ≥ 12, mais il n’est pas memory-hard et limite l’entrée à 72 octets. scrypt est également memory-hard et bien étudié ; ne le choisissez que si votre environnement d’exécution ne dispose pas d’une bibliothèque Argon2id maintenue. N’utilisez PBKDF2 que lorsque la conformité FIPS / NIST l’exige.',
  faq8Title: 'Comment migrer de bcrypt vers Argon2id sans forcer une réinitialisation des mots de passe ?',
  faq8Body:
    'Utilisez le rehachage opportuniste. Continuez à vérifier les utilisateurs existants avec bcrypt ; lors d’une connexion réussie, hachez avec Argon2id le mot de passe en clair qu’ils viennent de saisir et mettez à jour le credential stocké. Conservez un champ de version de hachage par utilisateur pour savoir avec quel algorithme vérifier. En quelques semaines d’activité normale, la plupart des comptes sont migrés ; vous pouvez forcer le reste avec une invite de réinitialisation du mot de passe pour les utilisateurs inactifs.',

  widget: {
    ariaLabel: 'Mode de hachage de mot de passe',
    tabGenerate: 'Générer',
    tabVerify: 'Vérifier',

    sectionAlgorithm: 'Algorithme',
    sectionPassword: 'Mot de passe en clair',
    sectionParameters: 'Paramètres',
    sectionSalt: 'Sel',

    algoSubtitleArgon2id: 'memory-hard',
    algoSubtitleScrypt: 'memory-hard',
    algoSubtitleBcrypt: 'adaptatif',
    algoSubtitlePbkdf2: 'conforme NIST',

    passwordPlaceholder: 'Saisissez le mot de passe à hacher',
    saltPlaceholder: 'Généré automatiquement',
    saltGenerateAria: 'Générer un nouveau sel',
    saltByteUnit: 'o',

    buttonGenerate: 'Générer le hachage du mot de passe',
    buttonGenerating: 'Génération…',
    buttonVerify: 'Vérifier le mot de passe',
    buttonVerifying: 'Vérification…',

    resultEncodedHash: 'Hachage encodé',
    resultCopy: 'Copier',
    resultCopied: 'Copié',
    resultExecutionTime: 'Temps d’exécution',
    resultTuningHint: 'Ajustez la mémoire et les itérations pour viser environ 250 à 500 ms sur du matériel de production.',
    resultSaltLabel: 'Sel',
    resultMillisecondsSuffix: 'ms',

    verifyEncodedHash: 'Hachage encodé',
    verifyEncodedHashPlaceholder: 'Collez un hachage de mot de passe encodé (par ex. $argon2id$v=19$m=19456,t=2,p=1$…)',
    verifyCandidatePassword: 'Mot de passe à vérifier',
    verifyCandidatePlaceholder: 'Mot de passe à comparer au hachage',
    verifySupportedFormatsShow: 'Formats pris en charge',
    verifySupportedFormatsHide: 'Masquer les formats',
    verifyMatch: 'Le mot de passe correspond',
    verifyNoMatch: 'Le mot de passe ne correspond pas',
    verifyDetectedAlgorithm: 'Algorithme détecté :',

    errorPasswordRequired: 'Veuillez saisir un mot de passe en clair',
    errorSaltRequired: 'Veuillez saisir un sel ou en générer un',
    errorHashRequired: 'Veuillez saisir un hachage de mot de passe encodé',
    errorCandidateRequired: 'Veuillez saisir un mot de passe à vérifier',

    paramArgon2idMemory: 'Mémoire (MiB) (m)',
    paramArgon2idIterations: 'Itérations (t)',
    paramArgon2idParallelism: 'Parallélisme (p)',
    paramArgon2idKeyLength: 'Longueur du hachage (octets)',
    paramBcryptCost: 'Facteur de coût',
    paramScryptN: 'N (coût CPU/mémoire) (ln)',
    paramScryptR: 'r (taille de bloc)',
    paramScryptP: 'p (parallélisation)',
    paramScryptKeyLength: 'Longueur de clé (octets)',
    paramPbkdf2Iterations: 'Itérations',
    paramPbkdf2KeyLength: 'Longueur de clé (octets)',

    warnArgon2idMemory: 'Une mémoire inférieure à 19 MiB peut être non sécurisée',
    warnArgon2idIterations: 'Moins de 2 itérations peut être non sécurisé',
    warnArgon2idParallelism: 'Un parallélisme inférieur à 1 est invalide',
    warnScryptR: 'Un r inférieur à 8 peut être non sécurisé',
    warnBcryptCost: 'Un facteur de coût inférieur à 10 peut être non sécurisé',
    warnPbkdf2Iterations: 'Moins de 100 000 itérations peut être non sécurisé',
  },
} as const;

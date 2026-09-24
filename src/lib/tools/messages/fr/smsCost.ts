export const smsCost = {
  metaTitle: 'Calculateur de coût SMS : estimez le coût des OTP par SMS selon le pays | Authgear',
  metaDescription:
    'Calculateur de coût SMS gratuit : estimez vos dépenses en OTP par SMS selon le pays et le fournisseur (Twilio, Bird, Plivo) et découvrez combien l’OTP WhatsApp avec repli SMS vous fait économiser.',
  heroTitle: 'Calculateur de coût SMS',
  heroDescription:
    'Découvrez ce que vos OTP par SMS coûtent réellement selon les pays et les fournisseurs, et combien vous économiseriez en déplaçant le trafic de vérification coûteux vers l’OTP WhatsApp avec repli SMS.',
  iframeTitle: 'Calculateur de coût SMS',
  policy:
    'Ce calculateur s’exécute entièrement dans votre navigateur. Les tarifs affichés sont des prix de base indicatifs, hors surcharges opérateur, et changent fréquemment. Confirmez-les toujours auprès de votre fournisseur avant de vous engager.',

  // Provider comparison section (static, indexable)
  compTitle: 'Tarifs SMS par pays et par fournisseur',
  compIntro:
    'Tarifs indicatifs des SMS A2P sortants (USD par message) sur les marchés populaires, à côté du tarif d’authentification par OTP WhatsApp. Tarifs de base uniquement, les frais opérateur s’ajoutent.',
  compColCountry: 'Pays',
  compColWhatsapp: 'OTP WhatsApp',
  compNote: 'Tarifs au {date}. Tarifs de base indicatifs, hors surcharges opérateur. Vérifiez auprès de chaque fournisseur.',

  card1Title: 'Tarifs réels par pays',
  card1Desc: 'Prix SMS réels pour les marchés vers lesquels vous envoyez, chez Twilio, Bird et Plivo.',
  card2Title: 'Économies WhatsApp',
  card2Desc: 'Simulez le passage à l’OTP WhatsApp avec un taux d’adoption réglable et un repli SMS.',
  card3Title: 'Fraude prise en compte',
  card3Desc: 'Intégrez les pertes liées au SMS pumping qui gonflent votre facture, et pas seulement les prix catalogue publiés.',

  step1Label: 'Étape 1.',
  step1Title: 'Choisir le pays, le fournisseur et le volume',
  step1Item1: 'Sélectionnez le pays de destination, votre fournisseur SMS et votre volume mensuel d’OTP.',
  step2Label: 'Étape 2.',
  step2Title: 'Voir votre coût SMS',
  step2Item1: 'Le calculateur affiche vos dépenses SMS mensuelles et annuelles estimées pour cette configuration.',
  step3Label: 'Étape 3.',
  step3Title: 'Comparer avec l’OTP WhatsApp',
  step3Item1: 'Ajustez le taux d’adoption de WhatsApp pour voir combien le changement vous ferait économiser.',

  faq1Title: 'Combien coûte un OTP par SMS ?',
  faq1Body:
    'Cela varie fortement selon le pays : d’environ $0.03 par message en Thaïlande à $0.36 ou plus en Indonésie chez les grands fournisseurs. Utilisez le calculateur ci-dessus pour votre marché et votre volume.',
  faq2Title: 'Pourquoi l’OTP par SMS est-il si cher ?',
  faq2Body:
    'Les frais de terminaison des opérateurs, les tarifs A2P propres à chaque pays et la fraude par SMS pumping (qui gonfle votre volume de messages) font tous grimper le coût, surtout sur les marchés à tarifs élevés.',
  faq3Title: 'L’OTP WhatsApp est-il moins cher que le SMS ?',
  faq3Body:
    'Nettement moins cher sur les marchés où le SMS coûte cher, comme l’Asie du Sud-Est, et plus modestement en Europe de l’Ouest. Les économies dépendent de votre répartition par destination ; le calculateur montre votre cas.',
  faq4Title: 'Comment le prix des SMS est-il calculé ?',
  faq4Body:
    'Les SMS sont facturés par message délivré, au tarif du pays de destination, plus les surcharges opérateur. Les messages de plus de 160 caractères GSM-7 sont découpés en plusieurs segments facturés.',
  faq5Title: 'Ces tarifs sont-ils exacts ?',
  faq5Body:
    'Non, ce sont des tarifs de base indicatifs, hors frais opérateur, qui changent fréquemment. Considérez-les comme des estimations et vérifiez-les auprès de votre fournisseur avant de vous engager.',
  faq6Title: 'Qu’est-ce que le SMS pumping ?',
  faq6Body:
    'Le SMS pumping (aussi appelé AIT ou toll fraud) consiste, pour des attaquants, à utiliser des bots pour déclencher de grands volumes de SMS OTP vers des numéros premium dont ils tirent profit, gonflant votre facture avec des messages qu’aucun utilisateur réel n’a demandés. L’OTP WhatsApp n’y est pas exposé, car il ne transite pas par les systèmes de facturation des opérateurs.',
  faq6LinkText: 'En savoir plus : qu’est-ce qu’une attaque par SMS pumping ?',

  widget: {
    countryLabel: 'Pays de destination',
    countryPlaceholder: 'Rechercher un pays…',
    countryNoResults: 'Aucun pays correspondant',
    providerLabel: 'Fournisseur SMS',
    volumeLabel: 'Volume mensuel d’OTP',
    volumeUnit: 'OTP / mois',
    resultLabel: 'Votre coût SMS estimé',
    perMonth: '{value} / mois',
    perYear: '{value} / an',
    resultNote: 'Tarif de base hors frais opérateur · tarifs au {date}',
    savingsTitle: 'Réduisez-le avec l’OTP WhatsApp',
    savingsPct: '↓ {pct} % vs SMS',
    savingsAnnual: 'Économisez environ {value} par an avec Authgear.',
    waLabel: 'Adoption de WhatsApp',
    waHint: 'Part des OTP délivrés via WhatsApp ; le reste bascule sur SMS.',
    pumpLabel: 'Inclure les pertes liées au SMS pumping',
    pumpHint: 'Déclenchements frauduleux d’OTP qui gonflent votre facture SMS. L’OTP WhatsApp y résiste.',
    ctaStartFree: 'Commencer gratuitement',
    ctaSeeHow: 'Voir comment Authgear réduit ces coûts',
  },
} as const;

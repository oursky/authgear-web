import type { PricingCopy } from './types';
import { fullComparisonFr } from './data/full-comparison-fr';

export const pricingCopyFr: PricingCopy = {
  meta: {
    title: 'Tarifs - Authgear',
    description:
      "Solution d'authentification et d'autorisation pour vos applications et vos API, avec des tarifs flexibles pour les développeurs et les entreprises.",
  },
  cloud: {
    titleLine1: 'Des tarifs simples et ',
    titleHighlight: 'transparents',
    titleLine1Suffix: '',
    titleLine2: '',
    subtitle: 'Pas de fonctionnalités verrouillées. Pas de frais cachés.',
    intro: 'Chez Authgear, nous avons à cœur de soutenir votre croissance. ',
    introStrong: 'Chaque plan inclut toutes les fonctionnalités',
    introRest:
      ' : des mesures de sécurité robustes aux intégrations fluides, en passant par les personnalisations avancées. Commencez gratuitement et faites évoluer vos applications avec tous les outils dont vous avez besoin.',
    plans: [
      {
        name: 'Free',
        priceLine: '$0',
        cta: { label: 'Commencer', href: 'https://portal.authgear.com/', external: true },
        features: [
          'MAUs illimités',
          '100 messages SMS/WhatsApp',
          '2 applications',
          '2 sièges administrateur',
          '1 jour de rétention des logs',
          "Toutes les fonctions d'authentification incluses",
          'Support communautaire',
        ],
      },
      {
        name: 'Developers',
        badge: 'Le plus populaire',
        priceLine: '$50',
        highlight: true,
        cta: {
          label: 'Commencer',
          href: 'https://portal.authgear.com/?utm_source=pricing&utm_medium=link&utm_campaign=developers-plan',
          external: true,
        },
        features: [
          'MAUs illimités',
          "SMS/WhatsApp facturés à l'usage",
          '2 applications',
          '2 sièges administrateur',
          '1 jour de rétention des logs',
          "Toutes les fonctions d'authentification incluses",
          'Support prioritaire par e-mail',
        ],
      },
      {
        name: 'Business',
        priceLine: '$500',
        cta: {
          label: 'Commencer',
          href: 'https://portal.authgear.com/?utm_source=pricing&utm_medium=link&utm_campaign=business-plan',
          external: true,
        },
        features: [
          '25,000 MAUs (+$50/5k MAUs)',
          "SMS/WhatsApp facturés à l'usage",
          '5 applications',
          '5 sièges administrateur',
          '60 jours de rétention des logs',
          "Toutes les fonctions d'authentification incluses",
          'Canal Slack dédié',
        ],
      },
      {
        name: 'Enterprise',
        enterprise: true,
        priceLine: 'Tarif sur mesure',
        cta: { label: 'Contactez-nous', href: '__CONTACT__', external: false },
        features: [
          'Remise sur volume',
          'Résidence des données',
          'Passerelle SMS personnalisée',
          'SLA sur mesure',
          'Responsable de compte dédié',
        ],
      },
    ],
    expandComparison: 'Afficher la comparaison complète des plans',
    fullPlanTitle: 'Comparaison complète des plans',
  },
  comparison: fullComparisonFr,
  cta: {
    title: "Vous ne trouvez pas le plan qu'il vous faut ?",
    subtitle: 'Écrivez-nous et nous vous aiderons à trouver la meilleure option pour votre entreprise.',
    button: 'Contactez-nous',
    href: '__CONTACT__',
  },
  faq: {
    heading: 'Questions fréquentes',
    items: [
      {
        q: 'Authgear est-il open source ?',
        a: "Oui ! Authgear est open source, vous n'avez donc pas à craindre la dépendance à un fournisseur. Vous trouverez sur GitHub la version exacte que nous exécutons sur Authgear.com.",
      },
      {
        q: 'Où Authgear est-il hébergé ?',
        a: "Nous sommes actuellement hébergés sur Google Cloud Platform, aux États-Unis. Si vous avez besoin d'un SaaS géré dans d'autres pays, contactez-nous.",
      },
      {
        q: "Puis-je exporter toutes les données utilisateur si j'arrête d'utiliser Authgear ?",
        a: "Oui. Vous pouvez exporter toutes les données d'Authgear selon vos besoins. Authgear est open source et repose sur PostgreSQL : vous pouvez donc exporter les données et les exploiter sur vos propres serveurs.",
      },
      {
        q: 'Pourquoi confier mes données à Authgear ?',
        a: "Authgear est open source : il n'y a donc aucun code propriétaire caché. Vous pouvez tout auditer. Nous hébergeons nos données dans des centres de données et chez des fournisseurs cloud conformes aux normes de sécurité de l'information, dont ISO 27001 et PCI-DSS. Vous pouvez en savoir plus ici. Nous concevons et développons également chaque fonctionnalité selon la liste de contrôle de l'Open Web Application Security Project (OWASP).",
      },
      {
        q: 'Authgear propose-t-il une garantie de remboursement ?',
        a: 'Oui, nous offrons une garantie de remboursement de 30 jours sur tous les plans SaaS.',
      },
      {
        q: "Que se passe-t-il si j'atteins ma limite de MAUs ?",
        a: 'Pour le plan Business, les MAUs supplémentaires vous seront facturés lors du cycle de facturation suivant.',
      },
      {
        q: 'Que sont les MAUs ?',
        a: "Un MAU (Monthly Active User, utilisateur actif mensuel) désigne tout utilisateur unique ayant interagi avec votre application (inscription, connexion ou session active) au cours d'un mois donné.",
      },
      {
        q: 'Proposez-vous des remises sur volume ou un déploiement en cloud privé ?',
        a: 'Oui ! Nous travaillons avec les entreprises pour adapter le plan à leurs besoins. Contactez-nous !',
      },
      {
        q: 'Que signifient pour moi des MAUs illimités ?',
        a: "Avec des MAUs illimités, vous pouvez faire croître votre base d'utilisateurs sans aucune restriction sur le nombre d'utilisateurs actifs. Votre application peut ainsi se développer sans que vous ayez à vous soucier d'un plafond d'utilisateurs.",
      },
      {
        q: 'Le plan Free est-il vraiment gratuit ?',
        a: 'Oui ! Notre plan Free offre les fonctionnalités essentielles sans frais et sans carte bancaire. Vous pouvez commencer à développer et à faire évoluer votre application sans aucun investissement initial.',
      },
      {
        q: 'Puis-je changer de plan plus tard ?',
        a: 'Absolument. À mesure que vos besoins évoluent, vous pouvez passer à un plan supérieur à tout moment. Notre structure tarifaire flexible est conçue pour accompagner votre croissance.',
      },
      {
        q: 'Comment obtenir un tarif sur mesure pour le plan Enterprise ?',
        a: 'Pour les entreprises ayant des besoins spécifiques, notre plan Enterprise propose des solutions sur mesure. Contactez notre équipe commerciale pour discuter de vos besoins et obtenir un devis personnalisé.',
      },
      {
        q: 'Quel type de support est inclus dans chaque plan ?',
        a: "Free : accès à notre base de connaissances et support communautaire. Developers : support prioritaire par e-mail. Business : canal Slack dédié. Enterprise : support dédié 24h/24 et 7j/7, ainsi qu'un responsable de compte personnel.",
      },
    ],
  },
};

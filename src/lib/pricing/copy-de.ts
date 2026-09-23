import type { PricingCopy } from './types';
import { fullComparisonDe } from './data/full-comparison-de';

export const pricingCopyDe: PricingCopy = {
  meta: {
    title: 'Preise - Authgear',
    description:
      'Authentifizierungs- und Autorisierungslösung für Ihre Anwendungen und APIs, mit flexiblen Preisen für Entwickler und Unternehmen.',
  },
  cloud: {
    titleLine1: 'Einfache, ',
    titleHighlight: 'transparente',
    titleLine1Suffix: ' Preise',
    titleLine2: '',
    subtitle: 'Keine Feature-Schranken. Keine versteckten Gebühren.',
    intro: 'Bei Authgear glauben wir daran, Ihr Wachstum zu fördern. ',
    introStrong: 'Jeder Plan enthält jede Funktion',
    introRest:
      ', von robusten Sicherheitsmaßnahmen über nahtlose Integrationen bis zu erweiterten Anpassungen. Starten Sie kostenlos und skalieren Sie Ihre Anwendungen mit allen Tools, die Sie brauchen.',
    plans: [
      {
        name: 'Free',
        priceLine: '$0',
        cta: { label: 'Jetzt starten', href: 'https://portal.authgear.com/', external: true },
        features: [
          'Unbegrenzte MAUs',
          '100 SMS-/WhatsApp-Nachrichten',
          '2 Anwendungen',
          '2 Admin-Plätze',
          '1 Tag Log-Aufbewahrung',
          'Alle Auth-Funktionen inklusive',
          'Community-Support',
        ],
      },
      {
        name: 'Developers',
        badge: 'Am beliebtesten',
        priceLine: '$50',
        highlight: true,
        cta: {
          label: 'Jetzt starten',
          href: 'https://portal.authgear.com/?utm_source=pricing&utm_medium=link&utm_campaign=developers-plan',
          external: true,
        },
        features: [
          'Unbegrenzte MAUs',
          'SMS/WhatsApp nach Verbrauch',
          '2 Anwendungen',
          '2 Admin-Plätze',
          '1 Tag Log-Aufbewahrung',
          'Alle Auth-Funktionen inklusive',
          'Priorisierter E-Mail-Support',
        ],
      },
      {
        name: 'Business',
        priceLine: '$500',
        cta: {
          label: 'Jetzt starten',
          href: 'https://portal.authgear.com/?utm_source=pricing&utm_medium=link&utm_campaign=business-plan',
          external: true,
        },
        features: [
          '25,000 MAUs (+$50/5k MAUs)',
          'SMS/WhatsApp nach Verbrauch',
          '5 Anwendungen',
          '5 Admin-Plätze',
          '60 Tage Log-Aufbewahrung',
          'Alle Auth-Funktionen inklusive',
          'Dedizierter Slack-Kanal',
        ],
      },
      {
        name: 'Enterprise',
        enterprise: true,
        priceLine: 'Preis auf Anfrage',
        cta: { label: 'Kontakt aufnehmen', href: '__CONTACT__', external: false },
        features: [
          'Mengenrabatt',
          'Data Residency',
          'Eigenes SMS-Gateway',
          'Maßgeschneidertes SLA',
          'Dedizierter Account Manager',
        ],
      },
    ],
    expandComparison: 'Vollständigen Planvergleich anzeigen',
    fullPlanTitle: 'Vollständiger Planvergleich',
  },
  comparison: fullComparisonDe,
  cta: {
    title: 'Nicht den passenden Plan gefunden?',
    subtitle: 'Schreiben Sie uns, und wir helfen Ihnen, die beste Option für Ihr Unternehmen zu finden.',
    button: 'Kontakt aufnehmen',
    href: '__CONTACT__',
  },
  faq: {
    heading: 'Häufig gestellte Fragen',
    items: [
      {
        q: 'Ist Authgear Open Source?',
        a: 'Ja! Authgear ist Open Source, Sie müssen sich also keine Sorgen um Vendor-Lock-in machen. Die exakte Version, die wir auf Authgear.com betreiben, finden Sie auf GitHub.',
      },
      {
        q: 'Wo wird Authgear gehostet?',
        a: 'Derzeit hosten wir auf der Google Cloud Platform in den USA. Wenn Sie ein verwaltetes SaaS in anderen Ländern benötigen, kontaktieren Sie uns bitte.',
      },
      {
        q: 'Kann ich alle Nutzerdaten exportieren, wenn ich Authgear nicht mehr nutze?',
        a: 'Ja. Sie können bei Bedarf alle Daten aus Authgear exportieren. Authgear ist Open Source und basiert auf PostgreSQL, Sie können die Daten also exportieren und auf Ihren eigenen Servern betreiben.',
      },
      {
        q: 'Warum sollte ich Authgear meine Daten anvertrauen?',
        a: 'Authgear ist Open Source, es gibt also keinen geheimen, proprietären Code. Sie können alles prüfen. Wir hosten unsere Daten in Rechenzentren und bei Cloud-Anbietern, die Informationssicherheitsstandards wie ISO 27001 und PCI-DSS erfüllen. Mehr dazu lesen Sie hier. Außerdem entwerfen und entwickeln wir jede Funktion nach der Checkliste des Open Web Application Security Project (OWASP).',
      },
      {
        q: 'Bietet Authgear eine Geld-zurück-Garantie?',
        a: 'Ja, wir bieten für jeden SaaS-Plan eine 30-Tage-Geld-zurück-Garantie.',
      },
      {
        q: 'Was passiert, wenn ich mein MAU-Limit erreiche?',
        a: 'Im Business-Plan werden Ihnen die zusätzlichen MAUs im nächsten Abrechnungszeitraum berechnet.',
      },
      {
        q: 'Was sind MAUs?',
        a: 'Ein MAU (Monthly Active User, monatlich aktiver Nutzer) ist jeder eindeutige Nutzer, der in einem bestimmten Monat mit Ihrer App interagiert hat (also sich registriert oder angemeldet hat oder eine aktive Sitzung hatte).',
      },
      {
        q: 'Bieten Sie Mengenrabatte oder Private-Cloud-Deployments an?',
        a: 'Ja! Wir arbeiten mit Unternehmen zusammen, um den Plan auf ihre Bedürfnisse zuzuschneiden. Kontaktieren Sie uns!',
      },
      {
        q: 'Was bedeuten unbegrenzte MAUs für mich?',
        a: 'Mit unbegrenzten MAUs können Sie Ihre Nutzerbasis ohne Beschränkung der Anzahl aktiver Nutzer skalieren. So wächst Ihre Anwendung, ohne dass Sie sich um Nutzerobergrenzen sorgen müssen.',
      },
      {
        q: 'Ist der kostenlose Plan wirklich kostenlos?',
        a: 'Ja! Unser kostenloser Plan bietet die wesentlichen Funktionen ohne Kosten und ohne Kreditkarte. Sie können Ihre Anwendung ohne Vorabinvestition entwickeln und skalieren.',
      },
      {
        q: 'Kann ich später den Plan wechseln?',
        a: 'Selbstverständlich. Wenn Ihre Anforderungen wachsen, können Sie jederzeit auf einen höheren Plan upgraden. Unsere flexible Preisstruktur ist darauf ausgelegt, Ihr Wachstum zu begleiten.',
      },
      {
        q: 'Wie erhalte ich individuelle Preise für den Enterprise-Plan?',
        a: 'Für Unternehmen mit besonderen Anforderungen bietet unser Enterprise-Plan maßgeschneiderte Lösungen. Kontaktieren Sie unser Vertriebsteam, um Ihre Anforderungen zu besprechen und ein individuelles Angebot zu erhalten.',
      },
      {
        q: 'Welchen Support erhalte ich mit den einzelnen Plänen?',
        a: 'Free: Zugang zu unserer Wissensdatenbank und Community-Support. Developers: Priorisierter E-Mail-Support. Business: Dedizierter Slack-Kanal. Enterprise: Dedizierter 24/7-Support und ein persönlicher Account Manager.',
      },
    ],
  },
};

import type { PricingCell, PricingCopy } from '../types';
import { comparisonFeature, comparisonSection } from '../comparison-rows';
import {
  chk,
  dash,
  emp,
  txt,
  addonPrice,
  whatsappOtpMeteredSeePricing,
} from '../cells';

const smsOtpMeteredFr: PricingCell = txt('États-Unis/Canada : $0.02\nAutres : $0.1');
const smsOtpMeteredOrGatewayFr: PricingCell = txt('États-Unis/Canada : $0.02\nAutres : $0.1\nOu passerelle personnalisée');
const smsOtpFreeQuotaFr: PricingCell = txt('100/mois\n(SMS + WhatsApp OTP)');
const whatsappOtpFreeIncludedFr: PricingCell = txt('Inclus dans le quota partagé');

/** Full "static" CLOUD comparison table, French. */
export const fullComparisonFr: Pick<PricingCopy['comparison'], 'planNames' | 'rows'> = {
  planNames: ['Free', 'Developers', 'Business', 'Enterprise'],
  rows: [
    comparisonSection('Utilisation et limites'),
    comparisonFeature('MAUs', [txt('Illimités'), txt('Illimités'), txt('25,000'), txt('Sur mesure')]),
    comparisonFeature('Applications', [txt('2'), txt('2'), txt('5'), txt('Sur mesure')]),
    comparisonFeature('Sièges administrateur', [txt('2'), txt('2'), txt('5'), txt('Sur mesure')]),
    comparisonFeature('Messages OTP par SMS', [
      smsOtpFreeQuotaFr,
      smsOtpMeteredFr,
      smsOtpMeteredOrGatewayFr,
      smsOtpMeteredOrGatewayFr,
    ]),
    comparisonFeature('Messages OTP par WhatsApp', [
      whatsappOtpFreeIncludedFr,
      smsOtpMeteredFr,
      whatsappOtpMeteredSeePricing,
      whatsappOtpMeteredSeePricing,
    ]),

    comparisonSection('Authentification'),
    comparisonFeature('Connexion sociale (p. ex. Google, Facebook)', [chk, chk, chk, chk]),
    comparisonFeature('MFA', [chk, chk, chk, chk]),
    comparisonFeature('MFA adaptative', [chk, chk, chk, chk]),
    comparisonFeature('Passkeys', [chk, chk, chk, chk]),
    comparisonFeature('Connexion entreprise (p. ex. AD)', [chk, chk, chk, chk]),
    comparisonFeature('SAML SSO', [chk, chk, chk, chk]),

    comparisonSection('Autorisation'),
    comparisonFeature('RBAC (rôles et groupes)', [chk, chk, chk, chk]),

    comparisonSection('Image de marque et expérience'),
    comparisonFeature('Domaine personnalisé', [chk, chk, chk, chk]),
    comparisonFeature('Suppression de la marque Authgear', [dash, dash, chk, chk]),

    comparisonSection('Opérations et conformité'),
    comparisonFeature('Rétention des logs', [txt('1 jour'), txt('1 jour'), txt('60 jours'), txt('180 jours')]),

    comparisonSection('Support'),
    comparisonFeature('Support', [
      txt('Communauté Discord'),
      txt('Support prioritaire par e-mail'),
      txt('Canal Slack dédié'),
      txt('Responsable de compte dédié'),
    ]),

    comparisonSection('Enterprise et plateforme'),
    comparisonFeature('Cloud privé', [dash, dash, dash, chk]),
    comparisonFeature('Résidence des données', [dash, dash, dash, chk]),
    comparisonFeature('SLA sur mesure', [dash, dash, dash, txt('SLA sur mesure')]),
    comparisonFeature('Votre propre passerelle\nSMS/WhatsApp/e-mail', [dash, dash, chk, chk]),

    comparisonSection('Options et dépassements'),
    comparisonFeature('Environnement', [
      dash,
      addonPrice('$100', 'par environnement supplémentaire'),
      addonPrice('$100', 'par environnement supplémentaire'),
      emp,
    ]),
    comparisonFeature('Applications', [
      dash,
      addonPrice('$100', 'par application supplémentaire'),
      addonPrice('$100', 'par application supplémentaire'),
      emp,
    ]),
    comparisonFeature('Sièges administrateur', [
      dash,
      addonPrice('$50', 'par siège supplémentaire'),
      addonPrice('$50', 'par siège supplémentaire'),
      emp,
    ]),
    comparisonFeature('MAUs', [dash, dash, addonPrice('$50', 'par tranche de 5K MAUs'), emp]),
  ],
};

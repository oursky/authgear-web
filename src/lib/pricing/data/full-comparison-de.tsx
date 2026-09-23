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

const smsOtpMeteredDe: PricingCell = txt('USA/Kanada: $0.02\nAndere: $0.1');
const smsOtpMeteredOrGatewayDe: PricingCell = txt('USA/Kanada: $0.02\nAndere: $0.1\nOder eigenes Gateway');
const smsOtpFreeQuotaDe: PricingCell = txt('100/Monat\n(SMS + WhatsApp OTP)');
const whatsappOtpFreeIncludedDe: PricingCell = txt('Im gemeinsamen Kontingent enthalten');

/** Full "static" CLOUD comparison table, German. */
export const fullComparisonDe: Pick<PricingCopy['comparison'], 'planNames' | 'rows'> = {
  planNames: ['Free', 'Developers', 'Business', 'Enterprise'],
  rows: [
    comparisonSection('Nutzung & Limits'),
    comparisonFeature('MAUs', [txt('Unbegrenzt'), txt('Unbegrenzt'), txt('25,000'), txt('Individuell')]),
    comparisonFeature('Anwendungen', [txt('2'), txt('2'), txt('5'), txt('Individuell')]),
    comparisonFeature('Admin-Plätze', [txt('2'), txt('2'), txt('5'), txt('Individuell')]),
    comparisonFeature('SMS-OTP-Nachrichten', [
      smsOtpFreeQuotaDe,
      smsOtpMeteredDe,
      smsOtpMeteredOrGatewayDe,
      smsOtpMeteredOrGatewayDe,
    ]),
    comparisonFeature('WhatsApp-OTP-Nachrichten', [
      whatsappOtpFreeIncludedDe,
      smsOtpMeteredDe,
      whatsappOtpMeteredSeePricing,
      whatsappOtpMeteredSeePricing,
    ]),

    comparisonSection('Authentifizierung'),
    comparisonFeature('Social Login (z. B. Google, Facebook)', [chk, chk, chk, chk]),
    comparisonFeature('MFA', [chk, chk, chk, chk]),
    comparisonFeature('Adaptive MFA', [chk, chk, chk, chk]),
    comparisonFeature('Passkeys', [chk, chk, chk, chk]),
    comparisonFeature('Enterprise-Login (z. B. AD)', [chk, chk, chk, chk]),
    comparisonFeature('SAML SSO', [chk, chk, chk, chk]),

    comparisonSection('Autorisierung'),
    comparisonFeature('RBAC (Rollen und Gruppen)', [chk, chk, chk, chk]),

    comparisonSection('Branding & Nutzererlebnis'),
    comparisonFeature('Eigene Domain', [chk, chk, chk, chk]),
    comparisonFeature('Authgear-Branding entfernen', [dash, dash, chk, chk]),

    comparisonSection('Betrieb & Compliance'),
    comparisonFeature('Log-Aufbewahrung', [txt('1 Tag'), txt('1 Tag'), txt('60 Tage'), txt('180 Tage')]),

    comparisonSection('Support'),
    comparisonFeature('Support', [
      txt('Discord-Community'),
      txt('Priorisierter E-Mail-Support'),
      txt('Dedizierter Slack-Kanal'),
      txt('Dedizierter Account Manager'),
    ]),

    comparisonSection('Enterprise & Plattform'),
    comparisonFeature('Private Cloud', [dash, dash, dash, chk]),
    comparisonFeature('Data Residency', [dash, dash, dash, chk]),
    comparisonFeature('Maßgeschneidertes SLA', [dash, dash, dash, txt('Maßgeschneidertes SLA')]),
    comparisonFeature('Eigenes\nSMS-/WhatsApp-/E-Mail-Gateway', [dash, dash, chk, chk]),

    comparisonSection('Add-ons & Mehrverbrauch'),
    comparisonFeature('Umgebung', [
      dash,
      addonPrice('$100', 'je zusätzliche Umgebung'),
      addonPrice('$100', 'je zusätzliche Umgebung'),
      emp,
    ]),
    comparisonFeature('Anwendungen', [
      dash,
      addonPrice('$100', 'je zusätzliche Anwendung'),
      addonPrice('$100', 'je zusätzliche Anwendung'),
      emp,
    ]),
    comparisonFeature('Admin-Plätze', [
      dash,
      addonPrice('$50', 'je zusätzlicher Platz'),
      addonPrice('$50', 'je zusätzlicher Platz'),
      emp,
    ]),
    comparisonFeature('MAUs', [dash, dash, addonPrice('$50', 'pro 5K MAUs'), emp]),
  ],
};

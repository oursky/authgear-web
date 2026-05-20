import type { PricingCopy } from '../types';
import { comparisonFeature, comparisonSection } from '../comparison-rows';
import {
  chk,
  dash,
  emp,
  txt,
  addonPrice,
  smsOtpMeteredEn,
  smsOtpFreeQuotaEn,
  smsOtpMeteredOrGatewayEn,
  whatsappOtpFreeIncludedEn,
  whatsappOtpMeteredSeePricing,
} from '../cells';

/** Full "static" CLOUD comparison table (visible on page). */
export const fullComparisonEn: Pick<PricingCopy['comparison'], 'planNames' | 'rows'> = {
  planNames: ['Free', 'Developers', 'Business', 'Enterprise'],
  rows: [
    comparisonSection('Usage & limits'),
    comparisonFeature('MAUs', [txt('Unlimited'), txt('Unlimited'), txt('25,000'), txt('Custom')]),
    comparisonFeature('Applications', [txt('2'), txt('2'), txt('5'), txt('Custom')]),
    comparisonFeature('Project Members', [txt('2'), txt('2'), txt('5'), txt('Custom')]),
    comparisonFeature('SMS OTP Messages', [
      smsOtpFreeQuotaEn,
      smsOtpMeteredEn,
      smsOtpMeteredOrGatewayEn,
      smsOtpMeteredOrGatewayEn,
    ]),
    comparisonFeature('WhatsApp OTP Messages', [
      whatsappOtpFreeIncludedEn,
      smsOtpMeteredEn,
      whatsappOtpMeteredSeePricing,
      whatsappOtpMeteredSeePricing,
    ]),

    comparisonSection('Authentication'),
    comparisonFeature('Social login (e.g. Google, Facebook)', [chk, chk, chk, chk]),
    comparisonFeature('MFA', [chk, chk, chk, chk]),
    comparisonFeature('Adaptive MFA', [chk, chk, chk, chk]),
    comparisonFeature('Passkeys', [chk, chk, chk, chk]),
    comparisonFeature('Enterprise login (e.g. AD)', [chk, chk, chk, chk]),
    comparisonFeature('SAML SSO', [chk, chk, chk, chk]),

    comparisonSection('Authorization'),
    comparisonFeature('RBAC (Roles and Groups)', [chk, chk, chk, chk]),

    comparisonSection('Branding & experience'),
    comparisonFeature('Custom Domain', [chk, chk, chk, chk]),
    comparisonFeature('Remove Authgear branding', [dash, dash, chk, chk]),

    comparisonSection('Operations & compliance'),
    comparisonFeature('Log Retention', [txt('1-Day'), txt('1-Day'), txt('60-Day'), txt('180-Day')]),

    comparisonSection('Support'),
    comparisonFeature('Support', [
      txt('Discord Community'),
      txt('Priority Email Support'),
      txt('Dedicated Slack Channel'),
      txt('Dedicated Account Manager'),
    ]),

    comparisonSection('Enterprise & platform'),
    comparisonFeature('Private Cloud', [dash, dash, dash, chk]),
    comparisonFeature('Data Residency', [dash, dash, dash, chk]),
    comparisonFeature('Tailored SLA', [dash, dash, dash, txt('Tailored SLA')]),
    comparisonFeature('Bring your own\nSMS/WhatsApp / Email gateway', [dash, dash, chk, chk]),

    comparisonSection('Add-ons & overages'),
    comparisonFeature('Environment', [
      dash,
      addonPrice('$100', 'each extra environment'),
      addonPrice('$100', 'each extra environment'),
      emp,
    ]),
    comparisonFeature('Applications', [
      dash,
      addonPrice('$100', 'each extra applications'),
      addonPrice('$100', 'each extra applications'),
      emp,
    ]),
    comparisonFeature('Project members', [
      dash,
      addonPrice('$50', 'each extra members'),
      addonPrice('$50', 'each extra members'),
      emp,
    ]),
    comparisonFeature('MAUs', [dash, dash, addonPrice('$50', 'per 5K MAUs'), emp]),
  ],
};

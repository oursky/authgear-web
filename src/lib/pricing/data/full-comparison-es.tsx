import type { PricingCopy } from '../types';
import { comparisonFeature, comparisonSection } from '../comparison-rows';
import { chk, dash, emp, txt, addonPrice, whatsappOtpMeteredSeePricing } from '../cells';

const smsOtpMeteredEs = txt('EE. UU./Canadá: $0.02\nOtros: $0.1');
const smsOtpMeteredOrGatewayEs = txt('EE. UU./Canadá: $0.02\nOtros: $0.1\nO pasarela personalizada');
const smsOtpFreeQuotaEs = txt('100/mes\n(SMS + WhatsApp OTP)');
const whatsappOtpFreeIncludedEs = txt('Incluido en la cuota compartida');

/** Full "static" CLOUD comparison table (visible on page). Spanish. */
export const fullComparisonEs: Pick<PricingCopy['comparison'], 'planNames' | 'rows'> = {
  planNames: ['Free', 'Developers', 'Business', 'Enterprise'],
  rows: [
    comparisonSection('Uso y límites'),
    comparisonFeature('MAUs', [txt('Ilimitados'), txt('Ilimitados'), txt('25,000'), txt('Personalizado')]),
    comparisonFeature('Aplicaciones', [txt('2'), txt('2'), txt('5'), txt('Personalizado')]),
    comparisonFeature('Asientos de administrador', [txt('2'), txt('2'), txt('5'), txt('Personalizado')]),
    comparisonFeature('Mensajes OTP por SMS', [
      smsOtpFreeQuotaEs,
      smsOtpMeteredEs,
      smsOtpMeteredOrGatewayEs,
      smsOtpMeteredOrGatewayEs,
    ]),
    comparisonFeature('Mensajes OTP por WhatsApp', [
      whatsappOtpFreeIncludedEs,
      smsOtpMeteredEs,
      whatsappOtpMeteredSeePricing,
      whatsappOtpMeteredSeePricing,
    ]),

    comparisonSection('Autenticación'),
    comparisonFeature('Inicio de sesión social (p. ej. Google, Facebook)', [chk, chk, chk, chk]),
    comparisonFeature('MFA', [chk, chk, chk, chk]),
    comparisonFeature('MFA adaptativa', [chk, chk, chk, chk]),
    comparisonFeature('Passkeys', [chk, chk, chk, chk]),
    comparisonFeature('Inicio de sesión empresarial (p. ej. AD)', [chk, chk, chk, chk]),
    comparisonFeature('SAML SSO', [chk, chk, chk, chk]),

    comparisonSection('Autorización'),
    comparisonFeature('RBAC (roles y grupos)', [chk, chk, chk, chk]),

    comparisonSection('Marca y experiencia'),
    comparisonFeature('Dominio personalizado', [chk, chk, chk, chk]),
    comparisonFeature('Quitar la marca de Authgear', [dash, dash, chk, chk]),

    comparisonSection('Operaciones y cumplimiento'),
    comparisonFeature('Retención de logs', [txt('1 día'), txt('1 día'), txt('60 días'), txt('180 días')]),

    comparisonSection('Soporte'),
    comparisonFeature('Soporte', [
      txt('Comunidad en Discord'),
      txt('Soporte prioritario por correo'),
      txt('Canal de Slack dedicado'),
      txt('Gestor de cuenta dedicado'),
    ]),

    comparisonSection('Enterprise y plataforma'),
    comparisonFeature('Private Cloud (nube privada)', [dash, dash, dash, chk]),
    comparisonFeature('Residencia de datos', [dash, dash, dash, chk]),
    comparisonFeature('SLA a medida', [dash, dash, dash, txt('SLA a medida')]),
    comparisonFeature('Usa tu propia pasarela\nde SMS/WhatsApp / correo', [dash, dash, chk, chk]),

    comparisonSection('Complementos y excedentes'),
    comparisonFeature('Entorno', [
      dash,
      addonPrice('$100', 'por entorno adicional'),
      addonPrice('$100', 'por entorno adicional'),
      emp,
    ]),
    comparisonFeature('Aplicaciones', [
      dash,
      addonPrice('$100', 'por aplicación adicional'),
      addonPrice('$100', 'por aplicación adicional'),
      emp,
    ]),
    comparisonFeature('Asientos de administrador', [
      dash,
      addonPrice('$50', 'por asiento adicional'),
      addonPrice('$50', 'por asiento adicional'),
      emp,
    ]),
    comparisonFeature('MAUs', [dash, dash, addonPrice('$50', 'por cada 5K MAUs'), emp]),
  ],
};

import type { OnceCoreRow } from '../types';
import { onceCoreFeature, onceCoreSection } from '../comparison-rows';
import { chk } from '../cells';

/** ONCE "Core Features" comparison table (On your Server tab). */
export const onceCoreEn: OnceCoreRow[] = [
  onceCoreSection('Usage & limits'),
  onceCoreFeature('SMS/WhatsApp\nOTP Messages', 'Bring-in SMS provider\nWhatsApp support coming soon'),
  onceCoreFeature('MAUs', 'Unlimited'),
  onceCoreFeature('Number of project', '1 per purchase'),
  onceCoreFeature('Applications', 'Unlimited'),
  onceCoreFeature('Project Members', 'Unlimited'),

  onceCoreSection('Authentication'),
  onceCoreFeature('Social login', chk),
  onceCoreFeature('MFA', chk),
  onceCoreFeature('Adaptive MFA', chk),
  onceCoreFeature('Passkeys', chk),
  onceCoreFeature('Enterprise login', chk),
  onceCoreFeature('SAML SSO', chk),

  onceCoreSection('Authorization'),
  onceCoreFeature('RBAC (Roles and Groups)', chk),

  onceCoreSection('Branding & experience'),
  onceCoreFeature('Custom Domain', chk),
  onceCoreFeature('Others', 'All Features Included, Remove Authgear Branding'),

  onceCoreSection('Operations & compliance'),
  onceCoreFeature('Log Retention', '120-Day'),

  onceCoreSection('Support'),
  onceCoreFeature('Support', 'Discord and Email support'),

  onceCoreSection('Enterprise & platform'),
  onceCoreFeature('Scale to multiple servers and High Availability support', '__ENTERPRISE_CONTACT__'),
  onceCoreFeature('Managed security updates', '__ENTERPRISE_CONTACT__'),
  onceCoreFeature('Enterprise support with SLA', '__ENTERPRISE_CONTACT__'),
];

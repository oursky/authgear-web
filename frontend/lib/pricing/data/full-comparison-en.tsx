import type { PricingCopy } from '../types';
import { chk, dash, emp, txt, nod } from '../cells';

const smsWhatsappBusinessCell = nod((whatsappPath) => (
  <>
    <div className="plan-data-sub-row"><strong>SMS</strong><br />US/Canada: $0.02<br />Others: $0.1</div>
    <div className="plan-data-sub-row"><strong>WhatsApp</strong><br /><a href={whatsappPath} className="comparison-label">See Pricing</a></div>
    <div className="plan-data-sub-row">Or Custom Gateway</div>
  </>
));

/** Full "static" CLOUD comparison table (visible on page). */
export const fullComparisonEn: Pick<PricingCopy['comparison'], 'planNames' | 'rows'> = {
  planNames: ['Free', 'Developers', 'Business', 'Enterprise'],
  rows: [
    {
      label: 'SMS/WhatsApp OTP Messages',
      cells: [
        txt('Up to 100/month'),
        nod(() => <><strong>SMS and WhatsApp</strong><br />US/Canada: $0.02<br />Others: $0.1</>),
        smsWhatsappBusinessCell,
        smsWhatsappBusinessCell,
      ],
    },
    {
      label: 'MAUs',
      odd: true,
      cells: [txt('Unlimited'), txt('Unlimited'), txt('25,000'), txt('Custom')],
    },
    {
      label: 'Social login (e.g. Google, Facebook)',
      cells: [chk, chk, chk, chk],
    },
    {
      label: 'MFA',
      odd: true,
      cells: [chk, chk, chk, chk],
    },
    {
      label: 'Adaptive MFA',
      cells: [chk, chk, chk, chk],
    },
    {
      label: 'Passkeys',
      odd: true,
      cells: [chk, chk, chk, chk],
    },
    {
      label: 'Enterprise login (e.g. AD)',
      cells: [chk, chk, chk, chk],
    },
    {
      label: 'SAML SSO',
      odd: true,
      cells: [chk, chk, chk, chk],
    },
    {
      label: 'RBAC (Roles and Groups)',
      cells: [chk, chk, chk, chk],
    },
    {
      label: 'Applications',
      odd: true,
      cells: [txt('2'), txt('2'), txt('5'), txt('Custom')],
    },
    {
      label: 'Project Members',
      cells: [txt('2'), txt('2'), txt('5'), txt('Custom')],
    },
    {
      label: 'Log Retention',
      odd: true,
      cells: [txt('1-Day'), txt('1-Day'), txt('60-Day'), txt('180-Day')],
    },
    {
      label: 'Support',
      cells: [
        txt('Discord Community'),
        txt('Priority Email Support'),
        txt('Dedicated Slack Channel'),
        txt('Dedicated Account Manager'),
      ],
    },
    {
      label: 'Custom Domain',
      odd: true,
      cells: [chk, chk, chk, chk],
    },
    {
      label: 'Remove Authgear branding',
      cells: [dash, dash, chk, chk],
    },
    {
      label: 'Others',
      odd: true,
      cells: [
        txt('All Features Included'),
        txt('All Features Included'),
        nod(() => <>All Features Included<br /><br />Bring your own<br />SMS/WhatsApp / Email Gateway</>),
        nod(() => <>Bring your own<br />SMS/WhatsApp / Email Gateway<br /><br />Tailored SLA<br /><br />Private Cloud Option<br /><br />Data Residency</>),
      ],
    },
    {
      label: 'Add-ons',
      cells: [
        dash,
        nod(() => <>$100/Environment<br />$100/Applications<br />$50/Project Member</>),
        nod(() => <>$100/Environment<br />$100/Applications<br />$50/Project Member<br /><br />$50/5,000 additional MAU</>),
        emp,
      ],
    },
  ],
};

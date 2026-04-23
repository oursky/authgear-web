import type { PricingCopy } from '../types';
import {
  chk,
  dash,
  emp,
  txt,
  smsWhatsappBusiness,
  smsWhatsappDevelopers,
  othersBusiness,
  othersEnterprise,
  addonsDevelopers,
  addonsBusiness,
} from '../cells';

/** Full "static" CLOUD comparison table — Traditional Chinese. */
export const fullComparisonZhHant: Pick<PricingCopy['comparison'], 'planNames' | 'rows'> = {
  planNames: ['免費版', '開發者版', '商業版', '企業版'],
  rows: [
    {
      label: 'SMS/WhatsApp OTP 訊息',
      cells: [
        txt('每月最多 100 則'),
        smsWhatsappDevelopers,
        smsWhatsappBusiness,
        smsWhatsappBusiness,
      ],
    },
    {
      label: 'MAU',
      odd: true,
      cells: [txt('無限'), txt('無限'), txt('25,000'), txt('客製')],
    },
    {
      label: '社群登入（例如 Google、Facebook）',
      cells: [chk, chk, chk, chk],
    },
    {
      label: '多因素驗證（MFA）',
      odd: true,
      cells: [chk, chk, chk, chk],
    },
    {
      label: '自適應多因素驗證',
      cells: [chk, chk, chk, chk],
    },
    {
      label: 'Passkeys',
      odd: true,
      cells: [chk, chk, chk, chk],
    },
    {
      label: '企業登入（例如 AD）',
      cells: [chk, chk, chk, chk],
    },
    {
      label: 'SAML SSO',
      odd: true,
      cells: [chk, chk, chk, chk],
    },
    {
      label: 'RBAC（角色與群組）',
      cells: [chk, chk, chk, chk],
    },
    {
      label: '應用程式',
      odd: true,
      cells: [txt('2'), txt('2'), txt('5'), txt('客製')],
    },
    {
      label: '專案成員',
      cells: [txt('2'), txt('2'), txt('5'), txt('客製')],
    },
    {
      label: '日誌保留',
      odd: true,
      cells: [txt('1 天'), txt('1 天'), txt('60 天'), txt('180 天')],
    },
    {
      label: '支援',
      cells: [
        txt('Discord 社群'),
        txt('優先電子郵件支援'),
        txt('專屬 Slack 頻道'),
        txt('專屬客戶經理'),
      ],
    },
    {
      label: '自訂網域',
      odd: true,
      cells: [chk, chk, chk, chk],
    },
    {
      label: '移除 Authgear 品牌標識',
      cells: [dash, dash, chk, chk],
    },
    {
      label: '其他',
      odd: true,
      cells: [
        txt('包含所有功能'),
        txt('包含所有功能'),
        othersBusiness,
        othersEnterprise,
      ],
    },
    {
      label: '附加項目',
      cells: [
        dash,
        addonsDevelopers,
        addonsBusiness,
        emp,
      ],
    },
  ],
};

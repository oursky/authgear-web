import type { PricingCopy } from '../types';
import { comparisonFeature, comparisonSection } from '../comparison-rows';
import {
  chk,
  dash,
  emp,
  txt,
  addonPrice,
  smsOtpMeteredZh,
  smsOtpFreeQuotaZh,
  smsOtpMeteredOrGatewayZh,
  whatsappOtpFreeIncludedZh,
  whatsappOtpMeteredSeePricing,
} from '../cells';

/** Full "static" CLOUD comparison table — Traditional Chinese. */
export const fullComparisonZhHant: Pick<PricingCopy['comparison'], 'planNames' | 'rows'> = {
  planNames: ['免費版', '開發者版', '商業版', '企業版'],
  rows: [
    comparisonSection('用量與配額'),
    comparisonFeature('MAU', [txt('無限'), txt('無限'), txt('25,000'), txt('客製')]),
    comparisonFeature('應用程式', [txt('2'), txt('2'), txt('5'), txt('客製')]),
    comparisonFeature('專案成員', [txt('2'), txt('2'), txt('5'), txt('客製')]),
    comparisonFeature('SMS OTP 訊息', [
      smsOtpFreeQuotaZh,
      smsOtpMeteredZh,
      smsOtpMeteredOrGatewayZh,
      smsOtpMeteredOrGatewayZh,
    ]),
    comparisonFeature('WhatsApp OTP 訊息', [
      whatsappOtpFreeIncludedZh,
      smsOtpMeteredZh,
      whatsappOtpMeteredSeePricing,
      whatsappOtpMeteredSeePricing,
    ]),

    comparisonSection('使用者驗證'),
    comparisonFeature('社群登入（例如 Google、Facebook）', [chk, chk, chk, chk]),
    comparisonFeature('多因素驗證（MFA）', [chk, chk, chk, chk]),
    comparisonFeature('自適應多因素驗證', [chk, chk, chk, chk]),
    comparisonFeature('Passkeys', [chk, chk, chk, chk]),
    comparisonFeature('企業登入（例如 AD）', [chk, chk, chk, chk]),
    comparisonFeature('SAML SSO', [chk, chk, chk, chk]),

    comparisonSection('授權與存取控制'),
    comparisonFeature('RBAC（角色與群組）', [chk, chk, chk, chk]),

    comparisonSection('品牌與體驗'),
    comparisonFeature('自訂網域', [chk, chk, chk, chk]),
    comparisonFeature('移除 Authgear 品牌標識', [dash, dash, chk, chk]),

    comparisonSection('維運與合規'),
    comparisonFeature('日誌保留', [txt('1 天'), txt('1 天'), txt('60 天'), txt('180 天')]),

    comparisonSection('支援服務'),
    comparisonFeature('支援', [
      txt('Discord 社群'),
      txt('優先電子郵件支援'),
      txt('專屬 Slack 頻道'),
      txt('專屬客戶經理'),
    ]),

    comparisonSection('企業級與平台'),
    comparisonFeature('私有雲', [dash, dash, dash, chk]),
    comparisonFeature('資料落地', [dash, dash, dash, chk]),
    comparisonFeature('專屬 SLA', [dash, dash, dash, txt('專屬 SLA')]),
    comparisonFeature('自備\nSMS/WhatsApp / 電子郵件閘道', [dash, dash, chk, chk]),

    comparisonSection('加購與超量'),
    comparisonFeature('環境', [
      dash,
      addonPrice('$100', '每個額外環境'),
      addonPrice('$100', '每個額外環境'),
      emp,
    ]),
    comparisonFeature('應用程式', [
      dash,
      addonPrice('$100', '每個額外應用程式'),
      addonPrice('$100', '每個額外應用程式'),
      emp,
    ]),
    comparisonFeature('專案成員', [
      dash,
      addonPrice('$50', '每位額外成員'),
      addonPrice('$50', '每位額外成員'),
      emp,
    ]),
    comparisonFeature('MAU', [dash, dash, addonPrice('$50', '每 5K MAU'), emp]),
  ],
};

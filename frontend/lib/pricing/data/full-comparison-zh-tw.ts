import type { PricingCopy } from '../types';
import { chk, dash, emp, txt } from '../cells';

/** Full CLOUD comparison table — Traditional Chinese (Taiwan). */
export const fullComparisonZhTw: Pick<PricingCopy['comparison'], 'planNames' | 'rows'> = {
  planNames: ['免費方案', '開發者方案', '商業方案', '企業方案'],
  rows: [
    {
      label: '簡訊／WhatsApp OTP 訊息',
      cells: [
        txt('每月最多 100 則'),
        txt('<strong>簡訊與 WhatsApp</strong><br>美國／加拿大：$0.02<br>其他：$0.1', true),
        txt(
          '<div class="plan-data-sub-row"><strong>簡訊</strong><br>美國／加拿大：$0.02<br>其他：$0.1</div><div class="plan-data-sub-row"><strong>WhatsApp</strong><br><a href="__WHATSAPP_PRICING__" class="comparison-label">查看定價</a></div><div class="plan-data-sub-row">或自訂閘道</div>',
          true
        ),
        txt(
          '<div class="plan-data-sub-row"><strong>簡訊</strong><br>美國／加拿大：$0.02<br>其他：$0.1</div><div class="plan-data-sub-row"><strong>WhatsApp</strong><br><a href="__WHATSAPP_PRICING__" class="comparison-label">查看定價</a></div><div class="plan-data-sub-row">或自訂閘道</div>',
          true
        ),
      ],
    },
    {
      label: '月活躍用戶（MAU）',
      odd: true,
      cells: [txt('無上限'), txt('無上限'), txt('25,000'), txt('客製')],
    },
    {
      label: '社群登入（如 Google、Facebook）',
      cells: [chk, chk, chk, chk],
    },
    {
      label: '多因素驗證（MFA）',
      odd: true,
      cells: [chk, chk, chk, chk],
    },
    {
      label: '自適應 MFA',
      cells: [chk, chk, chk, chk],
    },
    {
      label: 'Passkey',
      odd: true,
      cells: [chk, chk, chk, chk],
    },
    {
      label: '企業登入（如 AD）',
      cells: [chk, chk, chk, chk],
    },
    {
      label: 'SAML 單一登入',
      odd: true,
      cells: [chk, chk, chk, chk],
    },
    {
      label: '角色與群組（RBAC）',
      cells: [chk, chk, chk, chk],
    },
    {
      label: '應用數量',
      odd: true,
      cells: [txt('2'), txt('2'), txt('5'), txt('客製')],
    },
    {
      label: '專案成員數',
      cells: [txt('2'), txt('2'), txt('5'), txt('客製')],
    },
    {
      label: '紀錄保留天數',
      odd: true,
      cells: [txt('1 日'), txt('1 日'), txt('60 日'), txt('180 日')],
    },
    {
      label: '支援方式',
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
      label: '移除 Authgear 品牌標示',
      cells: [dash, dash, chk, chk],
    },
    {
      label: '其他',
      odd: true,
      cells: [
        txt('包含所有功能'),
        txt('包含所有功能'),
        txt('包含所有功能<br><br>自備<br>簡訊／WhatsApp／郵件閘道', true),
        txt(
          '自備<br>簡訊／WhatsApp／郵件閘道<br><br>量身訂製 SLA<br><br>私有雲選項<br><br>資料落地',
          true
        ),
      ],
    },
    {
      label: '加購項目',
      cells: [
        dash,
        txt('$100／環境<br>$100／應用<br>$50／專案成員', true),
        txt('$100／環境<br>$100／應用<br>$50／專案成員<br><br>每 5,000 額外 MAU $50', true),
        emp,
      ],
    },
  ],
};

import type { OnceCoreRow } from '../types';
import { onceCoreFeature, onceCoreSection } from '../comparison-rows';
import { chk } from '../cells';

/** ONCE「核心功能」比較表（自建版分頁）。 */
export const onceCoreZhHant: OnceCoreRow[] = [
  onceCoreSection('使用量與限制'),
  onceCoreFeature('SMS/WhatsApp\nOTP 訊息', '自帶 SMS 提供商\nWhatsApp 支援即將推出'),
  onceCoreFeature('MAU', '無限'),
  onceCoreFeature('專案數量', '每次購買 1 個'),
  onceCoreFeature('應用程式', '無限'),
  onceCoreFeature('專案成員', '無限'),

  onceCoreSection('驗證'),
  onceCoreFeature('社群登入', chk),
  onceCoreFeature('多因素驗證（MFA）', chk),
  onceCoreFeature('自適應多因素驗證', chk),
  onceCoreFeature('Passkeys', chk),
  onceCoreFeature('企業登入', chk),
  onceCoreFeature('SAML SSO', chk),

  onceCoreSection('授權'),
  onceCoreFeature('RBAC（角色與群組）', chk),

  onceCoreSection('品牌與體驗'),
  onceCoreFeature('自訂網域', chk),
  onceCoreFeature('其他', '包含所有功能，移除 Authgear 品牌標識'),

  onceCoreSection('營運與合規'),
  onceCoreFeature('日誌保留', '120 天'),

  onceCoreSection('支援'),
  onceCoreFeature('支援', 'Discord 及電子郵件支援'),

  onceCoreSection('企業與平台'),
  onceCoreFeature('多伺服器擴展及高可用性支援', '__ENTERPRISE_CONTACT__'),
  onceCoreFeature('管理型安全更新', '__ENTERPRISE_CONTACT__'),
  onceCoreFeature('含 SLA 的企業支援', '__ENTERPRISE_CONTACT__'),
];

import type { PricingCopy } from './types';
import { fullComparisonZhTw } from './data/full-comparison-zh-tw';

export const pricingCopyZhTw: PricingCopy = {
  meta: {
    title: '定價 - Authgear',
    description:
      '為您的應用程式與 API 提供驗證與授權解決方案，並為開發者與企業提供彈性定價。',
  },
  tabs: { cloud: '雲端版', once: '自建版' },
  cloud: {
    titleLine1: 'Authgear ',
    titleHighlight: 'CLOUD',
    titleLine2: '我們為您打理一切',
    subtitle: '方案全功能：所有方案皆享有完整功能',
    intro: 'Authgear CLOUD 致力於支援您的成長。方案不鎖功能，每個方案都包含',
    introStrong: '全部功能',
    introRest:
      '。從穩健的安全措施、無縫整合到進階自訂，免費即可開始，並以所需工具隨應用擴展，無隱藏費用。',
    plans: [
      {
        name: '免費方案',
        priceLine: '$0',
        cta: { label: '立即開始', href: 'https://accounts.portal.authgear.com/signup', external: true },
        features: [
          '無限月活躍用戶（MAU）',
          '100 則簡訊／WhatsApp 訊息',
          '2 個應用',
          '2 位專案成員',
          '1 日紀錄保留',
          '包含所有驗證功能',
          '社群支援',
        ],
      },
      {
        name: '開發者方案',
        badge: '最受歡迎',
        priceLine: '$50',
        highlight: true,
        cta: {
          label: '立即購買',
          href: 'https://portal.authgear.com/?utm_source=pricing&utm_medium=link&utm_campaign=developers-plan',
          external: true,
        },
        features: [
          '無限月活躍用戶（MAU）',
          '簡訊／WhatsApp 依量計費',
          '2 個應用',
          '2 位專案成員',
          '1 日紀錄保留',
          '包含所有驗證功能',
          '優先電子郵件支援',
        ],
      },
      {
        name: '商業方案',
        priceLine: '$500',
        cta: {
          label: '立即購買',
          href: 'https://portal.authgear.com/?utm_source=pricing&utm_medium=link&utm_campaign=business-plan',
          external: true,
        },
        features: [
          '25,000 MAU（超出部分每 5,000 MAU +$50）',
          '簡訊／WhatsApp 依量計費',
          '5 個應用',
          '5 位專案成員',
          '60 日紀錄保留',
          '包含所有驗證功能',
          '專屬 Slack 頻道',
        ],
      },
      {
        name: '企業方案',
        enterprise: true,
        priceLine: '客製報價',
        cta: { label: '聯絡我們', href: '__CONTACT__', external: false },
        features: ['大量折扣', '資料落地', '自訂簡訊閘道', '量身訂製 SLA', '專屬客戶經理'],
      },
    ],
    expandComparison: '查看完整方案對照',
    fullPlanTitle: '完整方案對照',
  },
  comparison: fullComparisonZhTw,
  once: {
    titleLine1: 'Authgear ',
    titleHighlight: 'ONCE',
    titleLine2: '',
    subtitle: '像 Auth0，但無需訂閱',
    intro:
      '以 Authgear ONCE 掌握身份與存取管理：自架 IAM 平台，永久擁有。無訂閱、無隱藏費用。',
    plans: [
      {
        name: 'ONCE 方案',
        priceLine: '$299',
        cta: {
          label: '結帳',
          href: 'https://once-license.authgear.com/v1/stripe/checkout',
          external: true,
        },
        features: [
          '完整 CIAM 平台與 SDK',
          '資料完全自主、自架部署',
          '10 分鐘內完成安裝',
          '含 2 年更新',
          '電子郵件與 Discord 支援',
        ],
        highlight: true,
      },
      {
        name: '企業方案',
        enterprise: true,
        priceLine: '客製報價',
        cta: { label: '聯絡我們', href: '__CONTACT__', external: false },
        features: [
          '高可用支援',
          '客製化部署',
          '高流量可擴展',
          '代管安全更新',
          '具 SLA 的企業支援',
        ],
      },
    ],
    coreTitle: '核心功能',
    coreRows: [
      { label: '簡訊／WhatsApp\nOTP 訊息', value: '自備簡訊供應商\nWhatsApp 即將支援' },
      { label: '月活躍用戶（MAU）', value: '無上限' },
      { label: '專案數量', value: '每筆購買 1 個' },
      { label: '社群登入', value: { kind: 'check' } },
      { label: '多因素驗證（MFA）', value: { kind: 'check' } },
      { label: '自適應 MFA', value: { kind: 'check' } },
      { label: 'Passkey', value: { kind: 'check' } },
      { label: '企業登入', value: { kind: 'check' } },
      { label: 'SAML 單一登入', value: { kind: 'check' } },
      { label: '角色與群組（RBAC）', value: { kind: 'check' } },
      { label: '應用數量', value: '無上限' },
      { label: '專案成員數', value: '無上限' },
      { label: '紀錄保留天數', value: '120 日' },
      { label: '支援方式', value: 'Discord 與電子郵件支援' },
      { label: '自訂網域', value: { kind: 'check' } },
      { label: '其他', value: '所有功能，可移除 Authgear 品牌' },
      { label: '多機擴展與高可用支援', value: '__ENTERPRISE_CONTACT__' },
      { label: '代管安全更新', value: '__ENTERPRISE_CONTACT__' },
      { label: '具 SLA 的企業支援', value: '__ENTERPRISE_CONTACT__' },
    ],
    enterpriseContactSuffix: '（企業版請聯絡我們）',
  },
  cta: {
    title: '找不到符合需求的方案？',
    subtitle: '傳訊息給我們，我們會協助您找出最適合的選項。',
    button: '聯絡我們',
    href: '__CONTACT__',
  },
  faq: {
    heading: '常見問題',
    items: [
      {
        q: 'Authgear 是開源的嗎？',
        a: '是。Authgear 為開源專案，無需擔心供應商鎖定。您可在 GitHub 找到我們在 Authgear.com 上運行的相同版本。',
      },
      {
        q: 'Authgear 架設在哪裡？',
        a: '目前我們架設於美國的 Google Cloud Platform。若您需要其他國家的代管 SaaS，請與我們聯絡。',
      },
      {
        q: '若不再使用 Authgear，可以匯出所有用戶資料嗎？',
        a: '可以。您可依需求從 Authgear 匯出所有資料。Authgear 為開源且基於 PostgreSQL，您可匯出資料並在自有伺服器上運行。',
      },
      {
        q: '為何能放心把資料交給 Authgear？',
        a: 'Authgear 為開源，沒有不公開的專有程式碼，您可審查一切。我們將資料託管於符合資訊安全標準（含 ISO 27001、PCI-DSS）的資料中心與雲端供應商。更多說明請見此處。我們也依 OWASP（開放網頁應用安全計畫）檢查表設計與開發各項功能。',
      },
      {
        q: 'Authgear 有退款保證嗎？',
        a: '有。我們對所有 SaaS 方案提供 30 天退款保證。',
      },
      {
        q: '若達到 MAU 上限會怎樣？',
        a: '商業方案會在下一個帳單週期對超出部分計費。',
      },
      {
        q: '什麼是 MAU？',
        a: 'MAU（月活躍用戶）指在該月內曾與您應用互動（例如註冊、登入或持有有效工作階段）的不重複用戶。',
      },
      {
        q: '是否提供大量折扣或私有雲部署？',
        a: '有。我們可與企業客戶合作，依需求客製方案。請與我們聯絡。',
      },
      {
        q: '無限 MAU 對我代表什麼？',
        a: '無限 MAU 表示您可無限制擴展用戶數，不必擔心觸及用戶上限，專心讓應用成長。',
      },
      {
        q: '免費方案真的免費嗎？',
        a: '是。免費方案提供核心功能且無需信用卡。您無需預先付費即可開始開發與擴展應用。',
      },
      {
        q: '之後可以更換方案嗎？',
        a: '可以。隨需求成長，您可隨時升級至更高方案。我們的彈性定價旨在支援您的成長。',
      },
      {
        q: '如何取得企業方案的客製報價？',
        a: '企業方案為有特殊需求的企業提供量身方案。請聯絡業務團隊討論需求並取得客製報價。',
      },
      {
        q: '各方案分別提供哪些支援？',
        a: '免費：知識庫與社群支援。開發者：優先電子郵件支援。商業：專屬 Slack 頻道。企業：24/7 專屬支援與專屬客戶經理。',
      },
    ],
  },
};

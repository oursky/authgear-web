import type { PricingCopy } from './types';
import { fullComparisonZhHant } from './data/full-comparison-zh-Hant';

export const pricingCopyZhHant: PricingCopy = {
  meta: {
    title: '定價 - Authgear',
    description: '為您的應用程式與 API 提供驗證與授權解決方案，並為開發者與企業提供彈性定價。',
  },
  cloud: {
    titleLine1: '簡單',
    titleHighlight: '透明',
    titleLine1Suffix: '的定價',
    titleLine2: '',
    subtitle: '不鎖功能，無隱藏費用',
    intro: 'Authgear 致力於支援您的成長。',
    introStrong: '每個方案都包含全部功能',
    introRest: '——從穩健的安全措施、無縫整合到進階自訂，免費即可開始，隨業務擴展。',
    plans: [
      {
        name: '免費版',
        priceLine: '$0',
        cta: { label: '立即開始', href: 'https://accounts.portal.authgear.com/signup', external: true },
        features: [
          '無限 MAU',
          '100 則 SMS/WhatsApp 訊息',
          '2 個應用程式',
          '2 位專案成員',
          '1 天日誌保留',
          '包含所有驗證功能',
          '社群支援',
        ],
      },
      {
        name: '開發者版',
        badge: '最受歡迎',
        priceLine: '$50',
        highlight: true,
        cta: {
          label: '立即開始',
          href: 'https://portal.authgear.com/?utm_source=pricing&utm_medium=link&utm_campaign=developers-plan',
          external: true,
        },
        features: [
          '無限 MAU',
          '按量計費 SMS/WhatsApp',
          '2 個應用程式',
          '2 位專案成員',
          '1 天日誌保留',
          '包含所有驗證功能',
          '優先電子郵件支援',
        ],
      },
      {
        name: '商業版',
        priceLine: '$500',
        cta: {
          label: '立即開始',
          href: 'https://portal.authgear.com/?utm_source=pricing&utm_medium=link&utm_campaign=business-plan',
          external: true,
        },
        features: [
          '25,000 MAU（額外每 5,000 +$50）',
          '按量計費 SMS/WhatsApp',
          '5 個應用程式',
          '5 位專案成員',
          '60 天日誌保留',
          '包含所有驗證功能',
          '專屬 Slack 頻道',
        ],
      },
      {
        name: '企業版',
        enterprise: true,
        priceLine: '客製定價',
        cta: { label: '聯絡我們', href: '__CONTACT__', external: false },
        features: [
          '批量折扣',
          '資料駐留',
          '自訂 SMS 閘道',
          '客製化 SLA',
          '專屬客戶經理',
        ],
      },
    ],
    expandComparison: '查看完整方案對照',
    fullPlanTitle: '完整方案對照',
  },
  comparison: fullComparisonZhHant,
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
        a: '是的！Authgear 是開源的，所以您不必擔心供應商鎖定問題。您可以在 GitHub 上找到我們在 Authgear.com 上運行的確切版本。',
      },
      {
        q: 'Authgear 托管在哪裡？',
        a: '目前，我們托管在美國的 Google Cloud Platform 上。如果您需要在其他國家/地區的托管 SaaS 服務，請聯絡我們。',
      },
      {
        q: '如果我停止使用 Authgear，可以匯出所有用戶資料嗎？',
        a: '可以。您可以根據需要從 Authgear 匯出所有資料。Authgear 是開源的，基於 PostgreSQL，因此您可以匯出資料並在自己的伺服器上運行。',
      },
      {
        q: '為什麼應該信任 Authgear 處理我的資料？',
        a: 'Authgear 是開源的，沒有秘密的專有程式碼。您可以審查所有內容。我們將資料托管在符合資訊安全標準的資料中心和雲端供應商上，包括 ISO 27001 和 PCI-DSS。您可以閱讀更多詳情。我們還根據開放網路應用安全專案（OWASP）清單設計和開發每個功能。',
      },
      {
        q: 'Authgear 是否提供退款保證？',
        a: '是的，我們為所有 SaaS 方案提供 30 天退款保證。',
      },
      {
        q: '如果達到 MAU 上限會怎樣？',
        a: '對於商業版方案，您將在下一個計費週期收取額外 MAU 的費用。',
      },
      {
        q: '什麼是 MAU？',
        a: 'MAU（月活躍用戶）是指在特定月份內與您的應用程式互動（即註冊、登入或有活躍會話）的任何唯一用戶。',
      },
      {
        q: '您是否提供批量折扣或私有雲部署？',
        a: '是的！我們與企業合作，客製化適合其需求的方案。請聯絡我們！',
      },
      {
        q: '無限 MAU 對我意味著什麼？',
        a: '有了無限 MAU，您可以不受限制地擴展用戶群。這使您可以在不擔心達到用戶上限的情況下發展應用程式。',
      },
      {
        q: '免費版真的免費嗎？',
        a: '是的！我們的免費版提供基本功能，無需信用卡。您可以在沒有任何前期投資的情況下開始建構和擴展您的應用程式。',
      },
      {
        q: '以後可以切換方案嗎？',
        a: '當然可以。隨著您的需求增長，您可以隨時升級到更高的方案。我們靈活的定價結構旨在支持您的成長旅程。',
      },
      {
        q: '如何獲得企業版方案的客製定價？',
        a: '對於有特殊需求的企業，我們的企業版方案提供客製化解決方案。請聯絡我們的銷售團隊討論您的需求並獲取客製報價。',
      },
      {
        q: '每個方案都提供什麼樣的支援？',
        a: '免費版：存取知識庫和社群支援。開發者版：優先電子郵件支援。商業版：專屬 Slack 頻道。企業版：全天候專屬支援和個人客戶經理。',
      },
    ],
  },
};

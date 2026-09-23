import type { PricingCopy } from '../types';
import { comparisonFeature, comparisonSection } from '../comparison-rows';
import { chk, dash, emp, txt, addonPrice, whatsappOtpMeteredSeePricing } from '../cells';

const smsOtpMeteredJa = txt('米国/カナダ: $0.02\nその他: $0.1');
const smsOtpMeteredOrGatewayJa = txt('米国/カナダ: $0.02\nその他: $0.1\nまたはカスタムゲートウェイ');
const smsOtpFreeQuotaJa = txt('月 100 通\n(SMS + WhatsApp OTP)');
const whatsappOtpFreeIncludedJa = txt('共有枠に含まれます');

/** Full "static" CLOUD comparison table (Japanese). */
export const fullComparisonJa: Pick<PricingCopy['comparison'], 'planNames' | 'rows'> = {
  planNames: ['Free', 'Developers', 'Business', 'Enterprise'],
  rows: [
    comparisonSection('利用量と上限'),
    comparisonFeature('MAU', [txt('無制限'), txt('無制限'), txt('25,000'), txt('カスタム')]),
    comparisonFeature('アプリケーション', [txt('2'), txt('2'), txt('5'), txt('カスタム')]),
    comparisonFeature('管理者シート', [txt('2'), txt('2'), txt('5'), txt('カスタム')]),
    comparisonFeature('SMS OTP メッセージ', [
      smsOtpFreeQuotaJa,
      smsOtpMeteredJa,
      smsOtpMeteredOrGatewayJa,
      smsOtpMeteredOrGatewayJa,
    ]),
    comparisonFeature('WhatsApp OTP メッセージ', [
      whatsappOtpFreeIncludedJa,
      smsOtpMeteredJa,
      whatsappOtpMeteredSeePricing,
      whatsappOtpMeteredSeePricing,
    ]),

    comparisonSection('認証'),
    comparisonFeature('ソーシャルログイン（Google、Facebook など）', [chk, chk, chk, chk]),
    comparisonFeature('MFA', [chk, chk, chk, chk]),
    comparisonFeature('アダプティブ MFA', [chk, chk, chk, chk]),
    comparisonFeature('パスキー', [chk, chk, chk, chk]),
    comparisonFeature('エンタープライズログイン（AD など）', [chk, chk, chk, chk]),
    comparisonFeature('SAML SSO', [chk, chk, chk, chk]),

    comparisonSection('認可'),
    comparisonFeature('RBAC（ロールとグループ）', [chk, chk, chk, chk]),

    comparisonSection('ブランディングと体験'),
    comparisonFeature('カスタムドメイン', [chk, chk, chk, chk]),
    comparisonFeature('Authgear ブランディングの非表示', [dash, dash, chk, chk]),

    comparisonSection('運用とコンプライアンス'),
    comparisonFeature('ログ保持', [txt('1 日'), txt('1 日'), txt('60 日'), txt('180 日')]),

    comparisonSection('サポート'),
    comparisonFeature('サポート', [
      txt('Discord コミュニティ'),
      txt('優先メールサポート'),
      txt('専用 Slack チャンネル'),
      txt('専任アカウントマネージャー'),
    ]),

    comparisonSection('エンタープライズとプラットフォーム'),
    comparisonFeature('プライベートクラウド', [dash, dash, dash, chk]),
    comparisonFeature('データレジデンシー', [dash, dash, dash, chk]),
    comparisonFeature('個別の SLA', [dash, dash, dash, txt('個別の SLA')]),
    comparisonFeature('独自の\nSMS/WhatsApp / メールゲートウェイを利用', [dash, dash, chk, chk]),

    comparisonSection('アドオンと超過分'),
    comparisonFeature('環境', [
      dash,
      addonPrice('$100', '追加環境 1 つごと'),
      addonPrice('$100', '追加環境 1 つごと'),
      emp,
    ]),
    comparisonFeature('アプリケーション', [
      dash,
      addonPrice('$100', '追加アプリケーション 1 つごと'),
      addonPrice('$100', '追加アプリケーション 1 つごと'),
      emp,
    ]),
    comparisonFeature('管理者シート', [
      dash,
      addonPrice('$50', '追加シート 1 つごと'),
      addonPrice('$50', '追加シート 1 つごと'),
      emp,
    ]),
    comparisonFeature('MAU', [dash, dash, addonPrice('$50', '5K MAU ごと'), emp]),
  ],
};

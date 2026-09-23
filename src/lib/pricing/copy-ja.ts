import type { PricingCopy } from './types';
import { fullComparisonJa } from './data/full-comparison-ja';

export const pricingCopyJa: PricingCopy = {
  meta: {
    title: '料金 - Authgear',
    description:
      'アプリケーションと API のための認証・認可ソリューション。開発者から企業まで、柔軟な料金プランをご用意しています。',
  },
  cloud: {
    titleLine1: 'シンプルで',
    titleHighlight: '透明',
    titleLine1Suffix: 'な料金体系',
    titleLine2: '',
    subtitle: '機能制限なし。隠れた費用なし。',
    intro: 'Authgear は、お客様の成長を後押しすることを大切にしています。',
    introStrong: 'すべてのプランにすべての機能が含まれます',
    introRest:
      '。堅牢なセキュリティ対策からシームレスな連携、高度なカスタマイズまで。無料で始めて、必要なツールをすべて手にしたままアプリケーションをスケールさせましょう。',
    plans: [
      {
        name: 'Free',
        priceLine: '$0',
        cta: { label: '今すぐ始める', href: 'https://portal.authgear.com/', external: true },
        features: [
          '無制限の MAU',
          'SMS/WhatsApp メッセージ 100 通',
          'アプリケーション 2 個',
          '管理者シート 2',
          'ログ保持 1 日',
          'すべての認証機能を含む',
          'コミュニティサポート',
        ],
      },
      {
        name: 'Developers',
        badge: '一番人気',
        priceLine: '$50',
        highlight: true,
        cta: {
          label: '今すぐ始める',
          href: 'https://portal.authgear.com/?utm_source=pricing&utm_medium=link&utm_campaign=developers-plan',
          external: true,
        },
        features: [
          '無制限の MAU',
          'SMS/WhatsApp 従量課金',
          'アプリケーション 2 個',
          '管理者シート 2',
          'ログ保持 1 日',
          'すべての認証機能を含む',
          '優先メールサポート',
        ],
      },
      {
        name: 'Business',
        priceLine: '$500',
        cta: {
          label: '今すぐ始める',
          href: 'https://portal.authgear.com/?utm_source=pricing&utm_medium=link&utm_campaign=business-plan',
          external: true,
        },
        features: [
          '25,000 MAU（5K MAU ごとに +$50）',
          'SMS/WhatsApp 従量課金',
          'アプリケーション 5 個',
          '管理者シート 5',
          'ログ保持 60 日',
          'すべての認証機能を含む',
          '専用 Slack チャンネル',
        ],
      },
      {
        name: 'Enterprise',
        enterprise: true,
        priceLine: 'カスタム料金',
        cta: { label: 'お問い合わせ', href: '__CONTACT__', external: false },
        features: [
          'ボリュームディスカウント',
          'データレジデンシー',
          'カスタム SMS ゲートウェイ',
          '個別の SLA',
          '専任アカウントマネージャー',
        ],
      },
    ],
    expandComparison: 'プランの詳細比較を表示',
    fullPlanTitle: 'プランの詳細比較',
  },
  comparison: fullComparisonJa,
  cta: {
    title: 'お探しのプランが見つかりませんか？',
    subtitle: 'メッセージをお送りください。お客様のビジネスに最適な選択肢を一緒に見つけます。',
    button: 'お問い合わせ',
    href: '__CONTACT__',
  },
  faq: {
    heading: 'よくある質問',
    items: [
      {
        q: 'Authgear はオープンソースですか？',
        a: 'はい。Authgear はオープンソースなので、ベンダーロックインを心配する必要はありません。Authgear.com で稼働しているバージョンそのものを GitHub で確認できます。',
      },
      {
        q: 'Authgear はどこでホストされていますか？',
        a: '現在は米国の Google Cloud Platform 上でホストしています。他の国でのマネージド SaaS が必要な場合は、お問い合わせください。',
      },
      {
        q: 'Authgear の利用をやめる場合、すべてのユーザーデータをエクスポートできますか？',
        a: 'はい。必要に応じて Authgear からすべてのデータをエクスポートできます。Authgear はオープンソースで PostgreSQL をベースにしているため、データをエクスポートして自社サーバーで運用することも可能です。',
      },
      {
        q: 'なぜ Authgear にデータを預けて安心できるのですか？',
        a: 'Authgear はオープンソースであり、隠された独自コードはありません。すべてを監査できます。データは ISO 27001 や PCI-DSS などの情報セキュリティ基準に準拠したデータセンターとクラウドプロバイダーでホストしています。詳しくはこちらをご覧ください。また、各機能は Open Web Application Security Project（OWASP）のチェックリストに沿って設計・開発しています。',
      },
      {
        q: 'Authgear には返金保証がありますか？',
        a: 'はい。すべての SaaS プランに 30 日間の返金保証を提供しています。',
      },
      {
        q: 'MAU の上限に達した場合はどうなりますか？',
        a: 'Business プランでは、超過した MAU 分の料金が次の請求サイクルで課金されます。',
      },
      {
        q: 'MAU とは何ですか？',
        a: 'MAU（月間アクティブユーザー）とは、特定の月にアプリを操作した（サインアップ、ログイン、またはアクティブなセッションがあった）ユニークユーザーのことです。',
      },
      {
        q: 'ボリュームディスカウントやプライベートクラウドへのデプロイは提供していますか？',
        a: 'はい。企業のお客様と協力して、ニーズに合ったプランをカスタマイズしています。ぜひお問い合わせください。',
      },
      {
        q: '無制限の MAU は私にとってどういう意味がありますか？',
        a: 'MAU が無制限なので、アクティブユーザー数の制限を受けずにユーザーベースを拡大できます。ユーザー数の上限を気にせずにアプリケーションを成長させられます。',
      },
      {
        q: 'Free プランは本当に無料ですか？',
        a: 'はい。Free プランでは、クレジットカード不要で必須機能を無料でご利用いただけます。初期投資なしでアプリケーションの構築とスケールを始められます。',
      },
      {
        q: '後からプランを変更できますか？',
        a: 'もちろんです。ニーズの拡大に合わせて、いつでも上位プランにアップグレードできます。柔軟な料金体系は、お客様の成長を支えるために設計されています。',
      },
      {
        q: 'Enterprise プランのカスタム料金はどのように入手できますか？',
        a: '特別な要件をお持ちの企業向けに、Enterprise プランでは個別のソリューションを提供しています。要件についてご相談いただき、カスタム見積もりを受け取るには営業チームにお問い合わせください。',
      },
      {
        q: '各プランではどのようなサポートを受けられますか？',
        a: 'Free: ナレッジベースへのアクセスとコミュニティサポート。Developers: 優先メールサポート。Business: 専用 Slack チャンネル。Enterprise: 24 時間 365 日の専任サポートと専属アカウントマネージャー。',
      },
    ],
  },
};

---
title: "SMS OTP vs WhatsApp OTP：認証に最適なのはどちらか？"
excerpt: "SMS OTPは無難な初期設定に思えます。しかしユーザー数が増えると、コストは急速に膨らみます。WhatsApp OTPはほとんどの市場で1通あたり70〜90%も安くなります。両者を比較します。"
coverImage: ./cover.webp
category: case-studies
featured: false
metaTitle: "SMS OTP vs WhatsApp OTP：認証に最適なのは？"
metaDescription: "SMS OTPとWhatsApp OTPをコスト・セキュリティ・到達性で比較。219か国の実際の削減データと、それぞれが適するケースを解説します。"
publishedAt: 2026-03-17T16:40:50.355Z
updatedAt: 2026-07-09T00:00:00.000Z
draft: false
---

## 「無料」のSMS認証に隠れたコスト

SMS OTPは無難な初期設定に思えます。どの携帯電話でもSMSを受信でき、開発者なら誰でもTwilioの組み込み方を知っており、最初の数千通は安価です。しかしユーザー数が増えると、SMSのコストは急速に膨らみます。さらに、OTPエンドポイントが不正の標的になれば、コストは予測不能に跳ね上がることもあります。

WhatsApp OTPは、その代替として導入が進んでいます。SMSの代わりにWhatsApp経由でワンタイムパスワード（OTP）を配信するもので、ほとんどの市場では1通あたりのコストが70〜90%低くなります。しかし、あなたのアプリにとって本当に正しい選択でしょうか。両者を正面から比較してみましょう。

## WhatsApp OTPとは？

WhatsApp OTPは、**Meta（WhatsApp）Business Platform**を使って、ワンタイムパスワード・確認コード・ログイン確認といった認証メッセージを、ユーザーのWhatsAppアプリに直接送信します。メッセージはユーザーと自社とのWhatsAppの会話に表示され、多くの場合はコードをコピーまたは自動入力できるボタンが付きます。

ユーザーから見れば、ほかのWhatsAppメッセージを受け取るのとまったく同じ感覚です。開発者から見れば、API（MetaのCloud APIを直接、またはTwilioやMessageBirdのようなBusiness Solution Provider経由）を呼び出して電話番号を渡すだけです。ユーザーはそのメッセージを自分のWhatsAppアプリで受け取ります。

ひとつ重要な制約があります。**ユーザーがWhatsAppをインストールしている必要がある**という点です。ほとんどの市場ではスマートフォン利用者の圧倒的多数がこれに該当し、WhatsAppの月間アクティブユーザーは全世界で20億人を超えます。ただし、利用していない少数のユーザーのために、SMSのフォールバックが必要になります。

## 一対一の比較

<div class="ag-table-wrap"><table class="ag-table"><thead><tr><th>項目</th><th>SMS OTP</th><th>WhatsApp OTP</th></tr></thead><tbody><tr><td><strong>コスト</strong></td><td>国によって1通あたり$0.01〜$0.51</td><td>1通あたり$0.001〜$0.055 — 50〜99%安い</td></tr><tr><td><strong>到達範囲</strong></td><td>世界中のあらゆる携帯電話</td><td>WhatsAppが必要（約20億ユーザー。WhatsApp普及率の高い市場では約5〜10%にフォールバックが必要だが、アメリカ・日本・韓国ではそれよりはるかに多い）</td></tr><tr><td><strong>到達性</strong></td><td>不安定 — キャリアのフィルタリング、SIMの問題、番号ポータビリティの隙間</td><td>概して信頼性が高い。キャリア網ではなくインターネット経由で配信</td></tr><tr><td><strong>セキュリティ</strong></td><td>SIMスワップやSS7攻撃に脆弱</td><td>エンドツーエンドで暗号化。SS7/SIMスワップの影響を受けにくい</td></tr><tr><td><strong>不正リスク</strong></td><td>高い — SMSポンピング（通話料詐欺）は現実的かつ高コストな脅威</td><td>低い — WhatsAppはキャリアの課金網ではなくMetaのネットワーク上で動作</td></tr><tr><td><strong>ユーザー体験</strong></td><td>馴染みがあり、普遍的</td><td>より現代的。コードの自動入力に対応し、使い慣れたアプリに届く</td></tr><tr><td><strong>遅延</strong></td><td>通常30秒以内。市場によっては遅いことも</td><td>インターネット接続経由で通常はほぼ即時</td></tr><tr><td><strong>導入の複雑さ</strong></td><td>簡単 — ほとんどのSMSゲートウェイは数行のコードで済む</td><td>初期設定が多い（Meta Businessの認証、WABAの承認）</td></tr><tr><td><strong>規制順守</strong></td><td>国によって異なる。A2P登録が必要な市場もある</td><td>MetaのMessaging Policyに従う。規制業種では審査が必要な場合も</td></tr></tbody></table></div>

## コストの差：実際の数字

乗り換えの主な動機になるのはたいていコストです。以下は、TwilioのSMS料金とMeta WhatsApp Business Platformの認証料金にもとづく具体的な比較です（データ：2026年2月）。

### 月間10万通のOTP — 市場別コスト比較

<div class="ag-table-wrap"><table class="ag-table"><thead><tr><th>市場</th><th>SMSコスト/月</th><th>WhatsAppコスト/月</th><th>月間削減額</th><th>削減率</th></tr></thead><tbody><tr><td>グローバル平均</td><td>$8,750</td><td>$1,130</td><td>$7,620</td><td>87%</td></tr><tr><td>インド</td><td>$1,700</td><td>$140</td><td>$1,560</td><td>92%</td></tr><tr><td>ブラジル</td><td>$5,990</td><td>$680</td><td>$5,310</td><td>89%</td></tr><tr><td>イギリス</td><td>~$5,240</td><td>~$2,200</td><td>~$3,040</td><td>58%</td></tr><tr><td>ドイツ</td><td>~$11,200</td><td>~$5,500</td><td>~$5,700</td><td>51%</td></tr><tr><td>アメリカ</td><td>$830</td><td>$340</td><td>$490</td><td>59%</td></tr></tbody></table></div>

削減効果はとくに新興市場（アフリカ・アジア・ラテンアメリカ）で大きく、これらはWhatsAppの普及率が最も高い地域でもあります。219か国を分析したところ、SMSからWhatsAppへ切り替えると**100%の国で少なくとも44%の削減**が見られ、58%の国では90%以上の削減が得られました。

エンタープライズ規模（月間100万通）では、グローバル平均での削減額は月あたり約$76,000 — 年間では$914,000超に達します。

## セキュリティ：WhatsApp OTPはSMSより安全か？

はい、いくつかの重要な点で安全です。

### エンドツーエンド暗号化

WhatsAppのメッセージは、Metaのサーバーと受信者のデバイスとの間でエンドツーエンドに暗号化されます。SMSは暗号化されないままキャリアのインフラを通るため、送信途中で傍受されるおそれがあります。

### SS7の脆弱性がない

SMSはSS7（Signaling System No. 7）攻撃に脆弱で、攻撃者は通信シグナリングプロトコルの弱点を突いてメッセージを傍受・転送します。WhatsAppはSS7網を完全に迂回し、インターネット上で動作します。

### SIMスワップのリスク低減

SIMスワップ — 攻撃者がキャリアを説得して、あなたの電話番号を自分の管理下にあるSIMへ移す手口 — は、SMSベースのあらゆるOTPを侵害しかねません。WhatsAppは（SIMだけでなくデバイスに紐づく）独自の登録レイヤーを持ち、SIMスワップ攻撃者にとってのハードルを上げます。ただし、攻撃者がWhatsAppへのアクセスも得た場合には、リスクを完全になくせるわけではありません。

### 不正リスクの低減

SMSポンピング攻撃（ボットがOTPエンドポイントを悪用し、プレミアムレート番号宛てに不正なメッセージを大量生成する攻撃）は、SMS特有の現象です。WhatsAppはMetaのネットワーク上で動作し、キャリアの課金分配のような仕組みを持ちません。WhatsAppへ切り替えることで、この種の不正リスクをまるごと排除できます。詳しくは[SMSポンピング攻撃の仕組みと防ぎ方](/post/sms-pumping-attack)をご覧ください。

<blockquote><p><strong>重要な注意点：</strong>WhatsApp OTPもSMS OTPと同じく、依然として知識要素（ユーザーが受け取るもの）です。偽サイトでOTPコードを入力させるフィッシングは防げません。フィッシング耐性のある認証については、<a href="/post/passkey-vs-password-why-passkeys-are-the-future-of-security">パスキーとFIDO2</a>をご覧ください。</p></blockquote>

## SMS OTPを使うべきとき

SMS OTPが依然として正しい選択となる場面もあります。

<ul><li><strong>普遍的な到達が必須の場合。</strong>ユーザーの年齢層が高めであったり、WhatsApp普及率の低い市場にいたりする場合、SMSのほうがより多くのユーザーに届く可能性があります。</li><li><strong>SMS送信量が少ない場合。</strong>月間で約1万通未満であれば、コスト差の絶対額は小さく、追加の設定に見合わないこともあります。</li><li><strong>規制上の要件。</strong>一部の規制業種（銀行、医療）には、認証チャネルに関する固有のガイダンスがあります。自分の管轄区域で何が承認されているか確認してください。</li><li><strong>WhatsAppのフォールバック。</strong>主にWhatsApp OTPを使う場合でも、WhatsAppを持たないユーザー向けにSMSをフォールバックとして維持すべきです — インドやブラジルのような高普及率市場では約5〜10%ですが、他のメッセンジャーが主流のアメリカ・日本・韓国では半数をはるかに超えます。</li></ul>

## WhatsApp OTPを使うべきとき

<ul><li><strong>SMS送信量が多い場合。</strong>削減効果は月間5万通以上で意味を持ち始めます。月間10万通以上になると、差は大きくなります。</li><li><strong>グローバル/新興市場のユーザーベース。</strong>アジア・アフリカ・ラテンアメリカの多くの地域ではWhatsApp普及率がほぼ全域に及び、そこはSMSが最も高額な市場でもあります。</li><li><strong>不正対策を優先する場合。</strong>SMSポンピング攻撃を経験した、あるいは懸念している場合、WhatsAppへの切り替えでその攻撃経路を排除できます。</li><li><strong>現代的なUX。</strong>WhatsApp OTPはコードの自動入力に対応し、使い慣れた信頼できるアプリのコンテキストで届きます。WhatsApp普及率の高い市場では、SMSより完了率が高い傾向があります。</li></ul>

## 最適な構成：WhatsAppを主、SMSをフォールバックに

切り替えを済ませた本番アプリの多くは、SMSを完全には捨てず、**WhatsApp優先・SMSフォールバック**の方式を採用しています。

1. まずWhatsAppでの配信を試みる
1. ユーザーがWhatsAppを持っていない、またはWhatsAppメッセージの配信に失敗した場合は、自動的にSMSへフォールバックする
1. どちらのチャネルが使われたかを記録し、チャネル構成比を継続的にレポートする

これにより、（WhatsAppは高普及率市場で送信の90〜95%を処理するため）コスト削減の大半を取り込みつつ、SMSフォールバックによって普遍的な到達を維持できます。

## WhatsApp OTPの実装方法

方法は2つあります。

### 方法1：Meta Cloud APIを直接利用する

MetaのWhatsApp Business Cloud APIに対して直接構築します。Meta Businessアカウントの用意、WhatsApp Business Account（WABA）の承認取得、そしてAPI統合の自作が必要です。制御性が高く、規模が大きくなれば1通あたりのコストも下がりますが、設定の手間は増えます。

### 方法2：WhatsApp OTP内蔵の認証プラットフォームを使う

[Authgear](/solutions/reduce-sms-otp-cost)のようなプラットフォームは、SMSフォールバック付きのWhatsApp OTPをすぐに使える形で提供しており、別途WABAを設定する必要はありません。Authgearは既定でWhatsApp経由でメッセージをルーティングし、自動的にSMSへフォールバックします。しかも両チャネルに不正対策が組み込まれています。ルーティングのロジックを自作せずにコスト削減を取り込みたいなら、これが最短の道です。

## 要点まとめ

- WhatsApp OTPは、世界のほぼすべての市場でSMSより50〜99%安い
- WhatsAppのほうが安全：エンドツーエンド暗号化、SS7の脆弱性なし、不正リスクが低い
- 主な制約はWhatsAppの到達範囲 — WhatsAppを使わないユーザー向けにSMSをフォールバックとして維持する
- WhatsApp優先・SMSフォールバックの構成なら、普遍的な到達を保ちつつ削減の大半を取り込める
- グローバル平均で月間10万通のOTPなら、WhatsAppへの切り替えで月あたり約$7,600（年間$91,400）を削減できる

SMS OTPのコストを削減する準備はできましたか？ [ライブデモを予約](/schedule-demo/)して、AuthgearがどのようにOTPをWhatsApp経由でルーティングし、自動的にSMSへフォールバックするかをご確認ください。あるいは[SMSコスト削減計算ツール](/solutions/reduce-sms-otp-cost)で削減額を見積もってみてください。

**あわせて読みたい：**[二要素認証（2FA）のコストはどれくらいか？](/ja/post/two-factor-authentication-cost)、[SMS OTPの脆弱性と代替手段](/post/sms-otp-vulnerabilities-and-alternatives)、[SMSポンピング攻撃](/post/sms-pumping-attack)。

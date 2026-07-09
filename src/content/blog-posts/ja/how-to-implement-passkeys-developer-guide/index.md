---
title: "WebAuthn でパスキーを実装する方法：開発者向け完全ガイド"
excerpt: "パスキー認証と WebAuthn の実践的な開発者ガイド。パスキーの仕組み、登録とログインのフロー、JavaScript のコード例、ベストプラクティス、テストのコツを解説します。"
coverImage: ./cover.webp
category: engineering
featured: false
metaTitle: "WebAuthn でパスキーを実装する方法：開発者ガイド"
metaDescription: "パスキー認証の仕組みと、WebAuthn API を使った実装方法を学びましょう。登録とログインのコード例、ベストプラクティス、テストのコツを掲載しています。"
publishedAt: 2026-03-13T17:35:55.681Z
updatedAt: 2026-05-06T00:00:00.000Z
draft: false
faq:
  - q: "パスキー認証とは何ですか？"
    a: "パスキー認証は、パスワードの代わりに公開鍵暗号を使うパスワードレスのログイン方式です。ユーザーのデバイスが秘密鍵を保持し、サーバーは対応する公開鍵を保存します。ログイン時にはサーバーがチャレンジを発行し、デバイスが（生体認証／PIN による確認のうえ）秘密鍵で署名し、サーバーがその署名を検証します。パスワードは一切作成・保存・送信されません。"
  - q: "パスキーとは何ですか？"
    a: "パスキーは、パスキー認証の際に作成される認証情報です。暗号鍵ペア、つまりサーバー上の公開鍵と、ユーザーのデバイスに固定された秘密鍵で構成されます。ユーザーは生体認証またはデバイスの PIN で認証し、秘密鍵がデバイスから外に出ることはありません。"
  - q: "パスキーは技術的にどのように動作しますか？"
    a: "パスキーは公開鍵暗号を使います。デバイスが秘密鍵を保持し、サーバーは対応する公開鍵を保存します。ログイン時にサーバーがチャレンジを発行し、デバイスが秘密鍵で署名し、サーバーがその署名を検証します。共有シークレットが送信されることは一切ありません。"
  - q: "WebAuthn とは何ですか？"
    a: "WebAuthn（Web Authentication API）は、アプリケーションがパスキーを作成・利用するために使うブラウザ API です。すべての主要ブラウザでサポートされている W3C 標準です。"
  - q: "パスキーはパスワードより安全ですか？"
    a: "はい。パスキーはフィッシングされません（ドメインに紐付いています）、サーバー侵害でも漏洩しません（保存されるのは公開鍵のみ）、サイト間で使い回すこともできません。推測すべきシークレットが存在しないため、総当たり攻撃にも強いです。"
  - q: "パスキーは複数のデバイス間で同期できますか？"
    a: "はい。Apple（iCloud キーチェーン）、Google（パスワード マネージャー）、Microsoft（Windows Hello）は、ユーザーのデバイス間でパスキーを同期します。1Password や Dashlane などのサードパーティ製パスワードマネージャーもパスキーの同期に対応しています。"
  - q: "ローカルで実行できる WebAuthn の例はありますか？"
    a: "はい。webauthn.io は、セットアップ不要でブラウザ上から試せるインタラクティブな WebAuthn デモです。ローカルでの例としては、Google の「Build your first WebAuthn app」コードラボが、登録から認証までの完全なフローを解説しています。本記事のコード例は、自分のアプリで使うクライアント側の WebAuthn 呼び出しを示しています。"
  - q: "iPhone でパスキーを作成するにはどうすればよいですか？"
    a: "ネイティブ iOS アプリから iPhone でパスキーを作成するには、AuthenticationServices フレームワークを使います。アプリには Associated Domains エンタイトルメント（webcredentials:yourdomain.com）が必要で、サーバーは /.well-known/apple-app-site-association に apple-app-site-association ファイルを配信する必要があります。サーバーが発行したチャレンジを渡して ASAuthorizationPlatformPublicKeyCredentialProvider.createCredentialRegistrationRequest() を呼び出すと、OS が Face ID や Touch ID を自動的に処理します。"
  - q: "WebAuthn とパスキーの違いは何ですか？"
    a: "WebAuthn は、認証情報を作成・検証するためにコードから呼び出す W3C の API（navigator.credentials.create() / .get()）です。パスキーは、iCloud キーチェーン、Google パスワード マネージャー、または同様のプラットフォームサービスを通じてユーザーのデバイス間で同期する WebAuthn 認証情報です。すべてのパスキーは WebAuthn 認証情報ですが、すべての WebAuthn 認証情報がパスキーとは限りません。FIDO2 ハードウェアキー（YubiKey など）は WebAuthn ですが、デバイスに固定され同期しません。"
  - q: "Windows Hello はパスキーに対応していますか？"
    a: "はい。Windows Hello はプラットフォーム認証器で、Windows 11 上の Chrome と Edge で標準の WebAuthn API を通じてパスキーサポートを提供します。Windows 専用の SDK はありません。他の WebAuthn 実装と同じ navigator.credentials.create() の呼び出しを使い、authenticatorAttachment を 'platform'、userVerification を 'required' に設定して Windows Hello を起動します。認証情報はデバイスの TPM 2.0 チップに紐付けられ、デバイス間で同期しません。"
---

パスワードは何十年もの間、ユーザーを認証するための既定の方法でしたが、依然としてセキュリティとユーザビリティの課題を生み続けています。ユーザーはパスワードを忘れ、サービス間で使い回し、安全でない方法で保管しがちです。開発者にとって、パスワードベースのシステムはアカウント復旧の対応、フィッシングのリスク、認証情報漏洩へのさらされやすさを意味します。

パスキー認証は、その現代的な代替手段です。本ガイドでは、パスキーの仕組み、WebAuthn API が実際にどのようなものか、そして登録からパスキーによるログインまで、完全なパスキー実装を構築するために必要なことを順を追って解説します。

## パスキーを理解する

パスキーは、パスワードの代わりに信頼できるデバイス（スマートフォン、ノートパソコン、ハードウェアセキュリティキー）でサインインできるパスワードレスの認証情報です。内部的には、パスキーは公開鍵暗号を使います。

<ul><li><strong>公開鍵</strong>はアプリケーションサーバーに保存されます。</li><li><strong>秘密鍵</strong>はユーザーのデバイスに安全に保存され、外に出ることはありません。</li></ul>

認証時、サーバーはランダムなチャレンジをデバイスに送信します。デバイスは秘密鍵でそれに署名し、署名を返します。サーバーは保存済みの公開鍵を使ってその署名を検証します。秘密鍵がデバイスから出ることはないため、攻撃者はフィッシングやサーバー侵害を通じてそれを盗むことができません。

パスキーは **FIDO2 標準**の上に構築されており、次の 2 つのコンポーネントを組み合わせています。

<ul><li><strong>WebAuthn</strong>（Web Authentication API）— 開発者が直接扱うブラウザ側の API</li><li><strong>CTAP</strong>（Client to Authenticator Protocol）— ブラウザと、ハードウェアセキュリティキーのような外部認証器との通信を担う</li></ul>

<blockquote><p><strong>WebAuthn とパスキー — 何が違う？</strong> <em>WebAuthn</em> は、コードから呼び出す W3C の API（<code>navigator.credentials.create()</code> / <code>.get()</code>）です。<em>パスキー</em>は、iCloud キーチェーン、Google パスワード マネージャー、または同様のプラットフォームサービスを通じてユーザーのデバイス間で同期する WebAuthn 認証情報を指す、ユーザー向けの呼び名です。すべてのパスキーは WebAuthn 認証情報ですが、YubiKey のようなハードウェアキーも WebAuthn であり、これはパスキーでは<strong>ありません</strong>（同期しないため）。本記事のコードはすべて WebAuthn です。プラットフォーム認証器（Face ID、Windows Hello、Android の Credential Manager）が同期可能な認証情報を作成すると、それがパスキーになります。</p></blockquote>

## 開発者がパスキーを採用している理由

Apple、Google、Microsoft はいずれも自社プラットフォームにパスキーサポートを組み込んでいます。採用は加速しており、その理由は実務的です。

<ul><li><strong>フィッシング耐性。</strong> パスキーは作成されたドメインに紐付けられます。<code>yourapp.com</code> で登録した認証情報は、偽の <code>yourapp-login.com</code> では機能しません。</li><li><strong>侵害される保存シークレットがない。</strong> サーバーは公開鍵しか保存しません。データベースが侵害されても、攻撃者はユーザーになりすませるものを何も得られません。</li><li><strong>より良い UX。</strong> ユーザーは Face ID、Touch ID、またはデバイスの PIN で認証します。忘れたりリセットしたりするパスワードはありません。</li><li><strong>サポートコストの削減。</strong> パスワードのリセットはサポートチケットの主要な発生源の 1 つです。パスキーはこの問題を根本から解消します。</li></ul>

## 前提条件

### HTTPS とブラウザサポート

WebAuthn は HTTPS 上でのみ動作します。アプリが有効な TLS 証明書で配信されていることを確認してください。ステージング環境であっても例外はありません（ローカル開発では、例外扱いされる `localhost` を使ってください）。

Chrome、Safari、Firefox、Edge といった最新のブラウザはすべて WebAuthn をサポートしています。現在の対応状況は [caniuse.com](https://caniuse.com/webauthn) で確認できます。

### バックエンドのインフラ

サーバーは次の 3 つを処理する必要があります。

<ol><li><strong>チャレンジの生成</strong> — 登録またはログインの試行ごとに、ランダムで単回限りのチャレンジを作成する</li><li><strong>レスポンスの検証</strong> — 認証器が返す署名済みアサーションを検証する</li><li><strong>認証情報の保存</strong> — ユーザーごとに公開鍵、認証情報 ID、署名カウンターを保存する</li></ol>

暗号的な検証を自前で実装しないでください。自分のスタックに合った、よくメンテナンスされた WebAuthn サーバーライブラリを使いましょう。たとえば Go なら [go-webauthn](https://github.com/go-webauthn/webauthn)、Python なら [py_webauthn](https://github.com/duo-labs/py_webauthn)、Node.js なら [@passwordless-id/webauthn](https://github.com/passwordless-id/webauthn) があります。

### アカウント復旧

リリース前に復旧手段を計画してください。ユーザーが唯一登録したデバイスを失った場合、戻る手段が必要です。一般的なアプローチとしては、複数デバイスの登録を許可する、メール認証にフォールバックする、バックアップコードをサポートする、などがあります。復旧経路がなければ、締め出されたユーザーはサポートへのエスカレーション、あるいは失った顧客になってしまいます。

## パスキー認証の仕組み

パスキー認証には 2 つのフェーズがあります。**登録**（認証情報の作成）と、**パスキーによるログイン**（それを使ってサインインすること）です。

### 登録フロー

登録では鍵ペアを作成し、公開鍵をユーザーのアカウントに紐付けます。

<ol><li>ユーザーがアプリでパスキーのセットアップを開始します。</li><li>サーバーがランダムなチャレンジを生成し、ブラウザに送信します。</li><li>ブラウザが、チャレンジとリライングパーティー情報を添えて <code>navigator.credentials.create()</code> を呼び出します。</li><li>OS がユーザーに確認を求めます — Touch ID、Face ID、Windows Hello、または PIN。</li><li>デバイスが鍵ペアを生成します。秘密鍵はセキュアエンクレーブに保存され、公開鍵は認証情報 ID とともにサーバーに返されます。</li><li>サーバーが、ユーザーのアカウントに紐付けて公開鍵と認証情報 ID を保存します。</li></ol>

### パスキーによるログインフロー

<ol><li>ユーザーが「パスキーでサインイン」を選択します。</li><li>サーバーが新しいランダムなチャレンジを生成します。</li><li>ブラウザが、チャレンジを添えて <code>navigator.credentials.get()</code> を呼び出します。</li><li>OS が一致する認証情報を見つけ、生体認証／PIN の確認を求めます。</li><li>デバイスが、保存済みの秘密鍵でチャレンジに署名します。</li><li>サーバーが、保存済みの公開鍵を使って署名を検証します。一致すれば、ユーザーはログインできます。</li></ol>

## WebAuthn の例：登録とログイン

WebAuthn API が実際にどのようなものかを見てみましょう。2 つのブラウザメソッドがすべてを処理します。

### navigator.credentials.create() — パスキーの登録

```
// Call your server to get a registration challenge first
const response = await fetch('/auth/passkey/register/begin', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ userId: currentUser.id }),
});
const options = await response.json();

// The server returns PublicKeyCredentialCreationOptions.
// The browser needs the challenge decoded from base64.
options.challenge = base64urlToBuffer(options.challenge);
options.user.id = base64urlToBuffer(options.user.id);

// Trigger the authenticator
const credential = await navigator.credentials.create({ publicKey: options });

// Send the new credential to your server to store
await fetch('/auth/passkey/register/complete', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    id: credential.id,
    rawId: bufferToBase64url(credential.rawId),
    response: {
      attestationObject: bufferToBase64url(credential.response.attestationObject),
      clientDataJSON: bufferToBase64url(credential.response.clientDataJSON),
    },
    type: credential.type,
  }),
});
```

### navigator.credentials.get() — パスキーによるログイン

```
// Get an authentication challenge from your server
const response = await fetch('/auth/passkey/login/begin', { method: 'POST' });
const options = await response.json();

options.challenge = base64urlToBuffer(options.challenge);
// If you pass allowCredentials, decode each credential ID too
if (options.allowCredentials) {
  options.allowCredentials = options.allowCredentials.map(c => ({
    ...c,
    id: base64urlToBuffer(c.id),
  }));
}

// Prompt the user — browser handles biometric/PIN UI
const assertion = await navigator.credentials.get({ publicKey: options });

// Send the signed assertion to your server for verification
const verifyResponse = await fetch('/auth/passkey/login/complete', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    id: assertion.id,
    rawId: bufferToBase64url(assertion.rawId),
    response: {
      authenticatorData: bufferToBase64url(assertion.response.authenticatorData),
      clientDataJSON: bufferToBase64url(assertion.response.clientDataJSON),
      signature: bufferToBase64url(assertion.response.signature),
      userHandle: assertion.response.userHandle
        ? bufferToBase64url(assertion.response.userHandle)
        : null,
    },
    type: assertion.type,
  }),
});

if (verifyResponse.ok) {
  // User is authenticated — redirect or update UI
}
```

`base64urlToBuffer` と `bufferToBase64url` のヘルパーは、base64url 文字列（サーバーが送るもの）と `ArrayBuffer`（WebAuthn API が期待するもの）を相互に変換します。これらは自分で実装するか、エンコード処理を代わりに行ってくれるライブラリを使う必要があります。

<blockquote><p>⚠️ <strong>よくある間違い：</strong> 生のチャレンジを <code>ArrayBuffer</code> ではなく文字列として送ると、<code>navigator.credentials.create()</code> は例外をスローします。WebAuthn API に渡す前に、サーバーからの base64url 値を必ずデコードしてください。</p></blockquote>

## iOS でパスキーを実装する（Swift）

ネイティブ iOS アプリを構築していて、iPhone でパスキーを作成する方法や iPhone でパスキーを設定する方法を知りたい場合、出発点は `AuthenticationServices` フレームワークです。Apple は iOS 16 でパスキーサポートを追加しました。サードパーティ製ライブラリは不要です。

### 要件

Swift のコードを書く前に、次の 3 点が整っていることを確認してください。

**1. Associated Domains エンタイトルメント。** アプリターゲットにエンタイトルメント `com.apple.developer.authentication-services.autofill-credential-provider` を追加し、アプリのエンタイトルメントファイル（または Xcode の Signing & Capabilities → Associated Domains）に関連ドメインのエントリ `webcredentials:yourdomain.com` を追加します。

**2. サーバー上の `apple-app-site-association` ファイル。** Web サーバーは、次の JSON を `https://yourdomain.com/.well-known/apple-app-site-association` に配信する必要があります（拡張子なし、HTTPS 経由のみ）。

```json
{
  "webcredentials": {
    "apps": ["TEAMID.com.example.yourapp"]
  }
}
```

`TEAMID` を自分の Apple Developer チーム ID に、バンドル識別子をアプリのバンドル ID に置き換えてください。このファイルは `Content-Type: application/json` で配信する必要があります。

**3. `rpId` がドメインと一致していること。** WebAuthn サーバーに渡す（そしてサーバーがチャレンジのレスポンスに含める）`rpId` は、`apple-app-site-association` 内のドメインと一致している必要があります。不一致があると、OS は認証情報を黙って拒否します。

パスキーのセレモニー中、Face ID または Touch ID は OS によって自動的に呼び出されます。`LocalAuthentication` を直接呼び出す必要はありません。

### 登録（iPhone でパスキーを作成する）

```swift
import AuthenticationServices

class PasskeyManager: NSObject, ASAuthorizationControllerDelegate,
                      ASAuthorizationControllerPresentationContextProviding {

    // Step 1: Fetch a challenge from your server, then call this.
    func registerPasskey(username: String, challenge: Data, userID: Data) {
        let provider = ASAuthorizationPlatformPublicKeyCredentialProvider(
            relyingPartyIdentifier: "yourdomain.com"
        )

        let registrationRequest = provider.createCredentialRegistrationRequest(
            challenge: challenge,
            name: username,       // displayed to the user in the system sheet
            userID: userID        // your app's user identifier, stored on device
        )

        // Optional: set attestation preference
        // registrationRequest.attestationPreference = .none

        let controller = ASAuthorizationController(
            authorizationRequests: [registrationRequest]
        )
        controller.delegate = self
        controller.presentationContextProvider = self
        controller.performRequests()
    }

    // Delegate: registration succeeded
    func authorizationController(
        controller: ASAuthorizationController,
        didCompleteWithAuthorization authorization: ASAuthorization
    ) {
        guard let credential = authorization.credential
            as? ASAuthorizationPlatformPublicKeyCredentialRegistration
        else { return }

        // Send these to your server to store against the user account
        let credentialID = credential.credentialID
        let attestationObject = credential.rawAttestationObject
        let clientDataJSON = credential.rawClientDataJSON

        // POST /auth/passkey/register/complete with the above data
    }

    func authorizationController(
        controller: ASAuthorizationController,
        didCompleteWithError error: Error
    ) {
        // Handle cancellation (ASAuthorizationError.canceled) separately
        // from other errors — users cancel legitimately
        print("Passkey registration error: \(error)")
    }

    func presentationAnchor(
        for controller: ASAuthorizationController
    ) -> ASPresentationAnchor {
        return UIApplication.shared.connectedScenes
            .compactMap { ($0 as? UIWindowScene)?.keyWindow }
            .first!
    }
}
```

### サインイン（iPhone でのパスキーログイン）

```swift
func signInWithPasskey(challenge: Data) {
    let provider = ASAuthorizationPlatformPublicKeyCredentialProvider(
        relyingPartyIdentifier: "yourdomain.com"
    )

    let assertionRequest = provider.createCredentialAssertionRequest(
        challenge: challenge
    )

    // Optional: restrict to specific credentials
    // assertionRequest.allowedCredentials = [...]

    let controller = ASAuthorizationController(
        authorizationRequests: [assertionRequest]
    )
    controller.delegate = self
    controller.presentationContextProvider = self
    controller.performRequests()
}

// Delegate: authentication succeeded
func authorizationController(
    controller: ASAuthorizationController,
    didCompleteWithAuthorization authorization: ASAuthorization
) {
    guard let credential = authorization.credential
        as? ASAuthorizationPlatformPublicKeyCredentialAssertion
    else { return }

    // Send these to your server for verification
    let credentialID = credential.credentialID
    let authenticatorData = credential.rawAuthenticatorData
    let clientDataJSON = credential.rawClientDataJSON
    let signature = credential.signature
    let userID = credential.userID  // your app's user identifier

    // POST /auth/passkey/login/complete with the above data
}
```

### よくある落とし穴

<ul><li><strong>Associated Domains エンタイトルメントの欠落。</strong> システムシートが一切表示されません。Xcode → Signing &amp; Capabilities → Associated Domains を確認し、エントリが <code>webcredentials:yourdomain.com</code> になっているか確かめてください。</li><li><strong><code>apple-app-site-association</code> が正しく配信されていない。</strong> <code>/.well-known/apple-app-site-association</code> に、有効な証明書で HTTPS 経由、かつ <code>Content-Type: application/json</code> で配信する必要があります。Apple の CDN はこのファイルを積極的にキャッシュするため、変更の反映には最大 24 時間かかることがあります。</li><li><strong><code>rpId</code> の不一致。</strong> Swift の <code>relyingPartyIdentifier</code> は、サーバーがチャレンジのレスポンスで送る <code>rpId</code> および <code>apple-app-site-association</code> ファイル内のドメインと完全に一致している必要があります。</li><li><strong>シミュレータの制限。</strong> iOS シミュレータ上でのパスキーの登録とアサーションは、実機と異なる挙動をすることがあります。最終テストには実機の iPhone を使ってください。</li></ul>

## Android でパスキーを実装する（Kotlin）

Android におけるパスキーの現代的なアプローチは、2023 年後半に安定版として導入された **Credential Manager API**（`androidx.credentials`）です。これは古い FIDO2 API を置き換えるもので、`Fido2ApiClient` を参照しているチュートリアルを見かけたら、それは古い情報です。代わりに Credential Manager を使ってください。

Credential Manager には API レベル 28（Android 9）以上が必要です。Android 9〜13 では、パスキーに Google Play 開発者サービスが必要です。Android 14 以降では、完全なネイティブサポートが利用できます。

### 要件

**Digital Asset Links ファイル。** サーバーは `https://yourdomain.com/.well-known/assetlinks.json` に `assetlinks.json` ファイルをホストする必要があります。

```json
[{
  "relation": ["delegate_permission/common.handle_all_urls",
               "delegate_permission/common.get_login_creds"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.example.yourapp",
    "sha256_cert_fingerprints": [
      "AA:BB:CC:DD:EE:FF:..."
    ]
  }
}]
```

SHA-256 証明書フィンガープリントは次のコマンドで取得します。

```bash
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey \
  -storepass android -keypass android
```

本番環境では**リリース用キーストア**のフィンガープリントを使ってください。デバッグビルドとリリースビルドは署名キーが異なり、これは `assetlinks.json` の不一致のよくある原因です。

`AndroidManifest.xml` に Digital Asset Links の関連付けを追加します。

```xml
<activity ...>
    <intent-filter>
        <action android:name="android.intent.action.MAIN" />
    </intent-filter>
    <meta-data
        android:name="asset_statements"
        android:resource="@string/asset_statements" />
</activity>
```

`strings.xml` にもドメインを追加します。

```xml
<string name="asset_statements" translatable="false">
[{"include": "https://yourdomain.com/.well-known/assetlinks.json"}]
</string>
```

`build.gradle` に依存関係を追加します。

```kotlin
dependencies {
    implementation("androidx.credentials:credentials:1.3.0")
    implementation("androidx.credentials:credentials-play-services-auth:1.3.0")
}
```

指紋の生体認証プロンプトは OS によって自動的に表示されます。`BiometricPrompt` のセットアップは不要です。

### 登録

```kotlin
import androidx.credentials.CreatePublicKeyCredentialRequest
import androidx.credentials.CredentialManager
import androidx.credentials.exceptions.CreateCredentialCancellationException
import androidx.credentials.exceptions.CreateCredentialException

suspend fun registerPasskey(activity: Activity, requestJson: String) {
    // requestJson is the JSON-serialised PublicKeyCredentialCreationOptions
    // from your server — challenge, rp, user, pubKeyCredParams, etc.
    val createRequest = CreatePublicKeyCredentialRequest(
        requestJson = requestJson,
        preferImmediatelyAvailableCredentials = false
    )

    val credentialManager = CredentialManager.create(activity)

    try {
        val result = credentialManager.createCredential(
            context = activity,
            request = createRequest
        )
        // result.data contains the attestation response as a JSON string
        val responseJson = result.data
            .getString("androidx.credentials.BUNDLE_KEY_REGISTRATION_RESPONSE_JSON")
        // POST responseJson to your server at /auth/passkey/register/complete
    } catch (e: CreateCredentialCancellationException) {
        // User dismissed the prompt — handle gracefully
    } catch (e: CreateCredentialException) {
        // Other failure — log and surface an error to the user
        Log.e("Passkey", "Registration failed: ${e.message}")
    }
}
```

### サインイン

```kotlin
import androidx.credentials.CredentialManager
import androidx.credentials.GetCredentialRequest
import androidx.credentials.GetPublicKeyCredentialOption
import androidx.credentials.PublicKeyCredential
import androidx.credentials.exceptions.GetCredentialCancellationException
import androidx.credentials.exceptions.GetCredentialException

suspend fun signInWithPasskey(activity: Activity, requestJson: String) {
    // requestJson is the JSON-serialised PublicKeyCredentialRequestOptions
    // from your server — challenge, rpId, allowCredentials, userVerification
    val getCredentialOption = GetPublicKeyCredentialOption(
        requestJson = requestJson
    )

    val getRequest = GetCredentialRequest(
        credentialOptions = listOf(getCredentialOption)
    )

    val credentialManager = CredentialManager.create(activity)

    try {
        val result = credentialManager.getCredential(
            context = activity,
            request = getRequest
        )
        val credential = result.credential
        if (credential is PublicKeyCredential) {
            val responseJson = credential.authenticationResponseJson
            // POST responseJson to your server at /auth/passkey/login/complete
        }
    } catch (e: GetCredentialCancellationException) {
        // User dismissed
    } catch (e: GetCredentialException) {
        Log.e("Passkey", "Sign-in failed: ${e.message}")
    }
}
```

### よくある落とし穴

<ul><li><strong><code>assetlinks.json</code> の欠落や誤り。</strong> ファイルは <code>/.well-known/assetlinks.json</code> に HTTPS 経由で配信され、SHA-256 フィンガープリントはテスト対象の APK のビルドに使った署名証明書と一致している必要があります。</li><li><strong>デバッグとリリースの署名キーの不一致。</strong> デバッグビルドとリリースビルドは異なる署名キーを使います。開発中は両方のフィンガープリントを <code>assetlinks.json</code> に追加し、出荷前にデバッグ用のフィンガープリントを削除してください。</li><li><strong><code>minSdk</code> が低すぎる。</strong> Credential Manager のパスキーフローには API 28 以上が必要です。Android 8（API 27）以前のユーザーはパスキーを使えません。</li><li><strong>Credential Manager ではなく <code>Fido2ApiClient</code> を使っている。</strong> 古い FIDO2 API は非推奨です。Credential Manager が 2024 年時点でサポートされる方法であり、パスキーとパスワードを統一されたシートで扱います。</li></ul>

## Windows Hello でパスキーを実装する

iOS や Android と異なり、Web アプリケーションから呼び出す Windows 専用の SDK はありません。Windows Hello は**プラットフォーム認証器**で、ブラウザ内の標準 WebAuthn API を通じて自身を公開します。Windows 11 上の Chrome と Edge はいずれも、本ガイドで前述したのと同じ `navigator.credentials.create()` と `navigator.credentials.get()` の呼び出しを通じて Windows Hello に対応しています。

鍵となるのは、渡す `authenticatorSelection` オプションです。

### Windows Hello での登録

```javascript
// Fetch the challenge JSON from your server first
const response = await fetch('/auth/passkey/register/begin', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ userId: currentUser.id }),
});
const options = await response.json();

options.challenge = base64urlToBuffer(options.challenge);
options.user.id = base64urlToBuffer(options.user.id);

// Force Windows Hello (platform authenticator) and require user verification
options.authenticatorSelection = {
  authenticatorAttachment: 'platform',   // Windows Hello, Face ID, etc. — not a roaming key
  userVerification: 'required',          // Forces Hello PIN / face / fingerprint prompt
  residentKey: 'required',               // Required for discoverable passkey credentials
};

// Set attestation to 'none' — 'direct' triggers a separate user consent dialog
// that surprises most users and rarely adds value for typical web apps
options.attestation = 'none';

const credential = await navigator.credentials.create({ publicKey: options });

// Send the credential to your server
await fetch('/auth/passkey/register/complete', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    id: credential.id,
    rawId: bufferToBase64url(credential.rawId),
    response: {
      attestationObject: bufferToBase64url(credential.response.attestationObject),
      clientDataJSON: bufferToBase64url(credential.response.clientDataJSON),
    },
    type: credential.type,
  }),
});
```

### Windows Hello でのサインイン

```javascript
const response = await fetch('/auth/passkey/login/begin', { method: 'POST' });
const options = await response.json();

options.challenge = base64urlToBuffer(options.challenge);
options.userVerification = 'required';

// Optional: restrict to platform authenticators only
// options.rpId = 'yourdomain.com';

const assertion = await navigator.credentials.get({ publicKey: options });

await fetch('/auth/passkey/login/complete', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    id: assertion.id,
    rawId: bufferToBase64url(assertion.rawId),
    response: {
      authenticatorData: bufferToBase64url(assertion.response.authenticatorData),
      clientDataJSON: bufferToBase64url(assertion.response.clientDataJSON),
      signature: bufferToBase64url(assertion.response.signature),
      userHandle: assertion.response.userHandle
        ? bufferToBase64url(assertion.response.userHandle)
        : null,
    },
    type: assertion.type,
  }),
});
```

### Windows Hello がパスキー認証情報を保存する方法

Windows 11 は、パスキーの秘密鍵をデバイスの **TPM 2.0** チップに紐付けます。この認証情報はエクスポートできません。デバイスに固定されており、iCloud キーチェーンや Google パスワード マネージャーの認証情報のようにクラウドアカウントを通じて同期することはありません。ユーザーが Windows Hello のパスキーを設定し、後で新しい PC を入手した場合は、再登録が必要になります。

### よくある落とし穴

<ul><li><strong><code>attestation: 'direct'</code> は同意ダイアログを引き起こす。</strong> Windows は、アテステーションデータをリライングパーティーと共有することへの同意をユーザーに求める二次的なプロンプトを表示します。ほとんどのアプリはアテステーションデータを必要としません。特定のエンタープライズ要件がない限り <code>attestation: 'none'</code> を設定してください。</li><li><strong>Windows Hello の PIN は有効な認証器である。</strong> ユーザーが顔認証や指紋リーダーを設定していない場合、Windows Hello は PIN にフォールバックします。これは想定どおりの挙動です。PIN はパスワードではなく<em>プラットフォーム認証情報</em>です。WebAuthn の呼び出しは問題なく成功します。</li><li><strong><code>authenticatorAttachment: 'platform'</code> を設定するとハードウェアキーが使えない。</strong> これを設定すると、OS はローカルのプラットフォーム認証器のみを使うよう強制されます。FIDO2 ハードウェアキー（YubiKey など）もサポートしたい場合は、<code>authenticatorAttachment</code> を省略するか、別途 <code>'cross-platform'</code> に設定してください。</li><li><strong>Windows 10 のサポートは限定的。</strong> Windows Hello のパスキーサポートは Windows 11 で最も安定しています。Windows 10 は WebAuthn をサポートしますが、パスキーの同期や一部の認証情報管理機能には Windows 11 が必要です。</li></ul>

## 認証プラットフォームと統合する

WebAuthn をゼロから構築することは可能ですが、対応範囲は広大です。チャレンジ管理、アテステーション検証、署名カウンターの検証、マルチデバイス同期など多岐にわたります。多くのチームは、これらを処理するために認証プラットフォームを利用します。

Authgear には、パスキーの登録とログインのサポートが組み込まれています。アプリを Authgear に接続すれば、WebAuthn のセレモニー、認証情報の保存、デバイス管理を含むパスキーのフローが代わりに処理されます。チームの中核プロダクトが認証インフラでない場合は、検討する価値があります。[Authgear がパスキーをどのように扱うかをご覧ください。](/features/passkeys)

## パスキー実装をテストする

出荷前に、さまざまな環境でテストしてください。

<ul><li><strong>登録</strong> — 少なくとも 2 つの異なるデバイス／ブラウザでパスキーを作成する</li><li><strong>ログイン</strong> — 認証フローをエンドツーエンドで検証する</li><li><strong>マルチデバイス</strong> — あるデバイスでパスキーを登録し、別のデバイスでサインインする（iCloud キーチェーンや Google パスワード マネージャー経由の同期パスキー）</li><li><strong>ハードウェアセキュリティキー</strong> — アプリが対応する必要がある場合は FIDO2 キーでテストする</li><li><strong>復旧</strong> — デバイスの紛失をシミュレートし、復旧フローを一通り試す</li></ul>

Chrome DevTools には **WebAuthn エミュレータ**（DevTools → その他のツール → WebAuthn）があり、物理的な認証器なしで登録と認証のフローをテストできます。

> 💡 **まずコードを書かずに試す：** 無料の [Passkey Demo & WebAuthn Tester](/tools/passkey-demo) は、ブラウザ内で実際のパスキーを作成し、その認証情報（アテステーションオブジェクト、認証器フラグ、公開鍵）をデコードして表示します。バックエンドを構築する前に、サーバーが実際に受け取る内容を正確に確認できます。

## ベストプラクティス

### 複数のデバイスを登録する

オンボーディング時に、少なくとも 2 つのデバイスを登録するようユーザーに促してください。登録デバイスが 1 つだけのユーザーがそれを失うと、締め出されてしまいます。複数デバイス、あるいは同期パスキーとハードウェアキーの組み合わせは、自然なフォールバックになります。

### 不慣れなユーザー向けにオンボーディングを設計する

多くのユーザーはパスキーのプロンプトを見たことがありません。`navigator.credentials.create()` を起動する前に、簡単な説明を表示しましょう。パスキーとは何か、次に何が起こるか、そしてパスワードより安全であること。混乱したユーザーはキャンセルを押し、二度と試さなくなります。

### 毎回新しいチャレンジを生成する

登録とログインのすべての試行で、サーバーが生成した一意でランダムなチャレンジ（最低 16 バイト、理想的には 32 バイト）を使う必要があります。チャレンジは単回限りで短命（5 分以内に失効）でなければなりません。チャレンジの使い回しや、古いチャレンジの受け入れは、リプレイ攻撃の入り口を開いてしまいます。

### 署名カウンターを検証する

認証器は、使用ごとに増加する署名カウンターを保持しています。サーバーはこのカウンターを保存し、チェックすべきです。保存済みの値より低いカウンター値を受け取った場合、それは複製された認証器を示している可能性があります。フラグを立て、再認証を求めてください。

### クロスプラットフォームのパスキーをサポートする

パスキーは、デバイス固定（ハードウェアキーのように 1 つの認証器に紐付く）か、同期型（iCloud キーチェーン、Google パスワード マネージャー、1Password でバックアップされる）のいずれかになります。同期型のパスキーは、ユーザーのデバイス間で自動的に機能します。ハードウェアキーも許可したい場合は、`authenticatorAttachment: "platform"` を設定しないでください。

### 認証イベントをログに記録する

登録の試行、成功したログイン、失敗した検証、認証情報の削除について、サーバー側のログを保持してください。これらのログは、同一の認証情報に対する繰り返しのアサーション失敗のような異常の検出や、ユーザーから問題が報告されたときのデバッグに不可欠です。

## まとめ

パスキーは、共有シークレットを、ユーザーのデバイス上に留まる暗号鍵ペアに置き換えます。その結果、フィッシングに強く、認証情報の漏洩に対して免疫があり、ユーザーにとってより速いパスキー認証が実現します。

WebAuthn API は、すべての最新ブラウザで十分にサポートされています。クライアント側のコードはシンプルで、複雑さはサーバー側（チャレンジ管理、アサーション検証、認証情報の保存）にあります。暗号的な重労働は自前で実装するのではなく、サーバーライブラリに任せましょう。

インフラの管理を一切したくない場合は、[Authgear](/) がパスキーによるサインアップとログインをすぐに使える形で提供します。チームは認証レイヤーではなく、プロダクトの構築に集中できます。

<ul><li><a href='/post/passkey-vs-password-why-passkeys-are-the-future-of-security'>パスキーとパスワード：なぜパスキーがセキュリティの未来なのか</a></li><li><a href='/post/what-is-fido2-complete-guide-fido-authentication'>FIDO2 とは？ FIDO 認証の完全ガイド</a></li></ul>

## よくある質問

### パスキー認証とは何ですか？

パスキー認証は、パスワードの代わりに公開鍵暗号を使うパスワードレスのログイン方式です。ユーザーのデバイスが秘密鍵を保持し、サーバーは対応する公開鍵を保存します。ログイン時にはサーバーがチャレンジを発行し、デバイスが（生体認証／PIN による確認のうえ）秘密鍵で署名し、サーバーがその署名を検証します。パスワードは一切作成・保存・送信されません。

### パスキーとは何ですか？

パスキーは、パスキー認証の際に作成される認証情報です。暗号鍵ペア、つまりサーバー上の公開鍵と、ユーザーのデバイスに固定された秘密鍵で構成されます。ユーザーは生体認証またはデバイスの PIN で認証し、秘密鍵がデバイスから外に出ることはありません。

### パスキーは技術的にどのように動作しますか？

パスキーは公開鍵暗号を使います。デバイスが秘密鍵を保持し、サーバーは対応する公開鍵を保存します。ログイン時にサーバーがチャレンジを発行し、デバイスが秘密鍵で署名し、サーバーがその署名を検証します。共有シークレットが送信されることは一切ありません。

### WebAuthn とは何ですか？

WebAuthn（Web Authentication API）は、アプリケーションがパスキーを作成・利用するために使うブラウザ API です。すべての主要ブラウザでサポートされている W3C 標準です。

### パスキーはパスワードより安全ですか？

はい。パスキーはフィッシングされません（ドメインに紐付いています）、サーバー侵害でも漏洩しません（保存されるのは公開鍵のみ）、サイト間で使い回すこともできません。推測すべきシークレットが存在しないため、総当たり攻撃にも強いです。

### パスキーは複数のデバイス間で同期できますか？

はい。Apple（iCloud キーチェーン）、Google（パスワード マネージャー）、Microsoft（Windows Hello）は、ユーザーのデバイス間でパスキーを同期します。1Password や Dashlane などのサードパーティ製パスワードマネージャーもパスキーの同期に対応しています。

### ローカルで実行できる WebAuthn の例はありますか？

はい。[webauthn.io](https://webauthn.io/) は、セットアップ不要でブラウザ上から試せるインタラクティブな WebAuthn デモです。ローカルでの例としては、Google の [Build your first WebAuthn app](https://developers.google.com/codelabs/webauthn-reauth) コードラボが、登録から認証までの完全なフローを解説しています。本記事のコード例は、自分のアプリで使うクライアント側の WebAuthn 呼び出しを示しています。

### iPhone でパスキーを作成するにはどうすればよいですか？

ネイティブ iOS アプリから iPhone でパスキーを作成するには、`AuthenticationServices` フレームワークを使います。アプリには Associated Domains エンタイトルメント（`webcredentials:yourdomain.com`）が必要で、サーバーは `/.well-known/apple-app-site-association` に `apple-app-site-association` ファイルを配信する必要があります。サーバーが発行したチャレンジを渡して `ASAuthorizationPlatformPublicKeyCredentialProvider.createCredentialRegistrationRequest()` を呼び出すと、OS が Face ID や Touch ID を自動的に処理します。完全な Swift の例は上記の iOS セクションを参照してください。

### WebAuthn とパスキーの違いは何ですか？

WebAuthn は、認証情報を作成・検証するためにコードから呼び出す W3C の API（`navigator.credentials.create()` / `.get()`）です。パスキーは、iCloud キーチェーン、Google パスワード マネージャー、または同様のプラットフォームサービスを通じてユーザーのデバイス間で同期する WebAuthn 認証情報です。すべてのパスキーは WebAuthn 認証情報ですが、すべての WebAuthn 認証情報がパスキーとは限りません。FIDO2 ハードウェアキー（YubiKey など）は WebAuthn ですが、デバイスに固定され同期しません。

### Windows Hello はパスキーに対応していますか？

はい。Windows Hello はプラットフォーム認証器で、Windows 11 上の Chrome と Edge で標準の WebAuthn API を通じてパスキーサポートを提供します。Windows 専用の SDK はありません。他の WebAuthn 実装と同じ `navigator.credentials.create()` の呼び出しを使い、`authenticatorAttachment: 'platform'` と `userVerification: 'required'` を設定して Windows Hello を起動します。認証情報はデバイスの TPM 2.0 チップに紐付けられ、デバイス間で同期しません。

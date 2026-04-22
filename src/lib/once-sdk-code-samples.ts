/**
 * ONCE page — SDK tab code samples (multiline strings for reliable layout).
 */
export const ONCE_SDK_CODE_SAMPLES = {
  react: `import authgear from "@authgear/web";

const login = async () => {
	await authgear.startAuthentication({
        redirectURI: "https://www.myapps.com/auth-redirect"
  })
}`,

  vue: `import authgear from "@authgear/web";

const login = async () => {
	await authgear.startAuthentication({
        redirectURI: "https://www.myapps.com/auth-redirect"
  })
}`,

  angular: `import authgear from "@authgear/web";

startLogin(): void {
  authgear.startAuthentication({
    redirectURI: 'http://localhost:4000/auth-redirect'
  })
}`,

  'react-native': `import authgear from "@authgear/react-native";

const authenticate = useCallback(async () => {
  try {
    authgear.authenticate({
      redirectURI: 'com.authgear.example.rn://host/path',
    });
  } catch (error) {
    // Login failed
  }
}, []);`,

  flutter: `import 'package:flutter_authgear/flutter_authgear.dart';

late Authgear _authgear;
UserInfo? _userInfo;

Future<void> _onPressedAuthenticate() async {
  try {
    final userInfo = await _authgear.authenticate(redirectURI: "com.example.authgeardemo.flutter://host/path");
    setState(() {
      _userInfo = userInfo;
    });
  } catch (e) {
    // Login failed
  } finally {
    // Finally
  }
}`,

  ios: `authgear.authenticate(redirectURI: "com.example.authgear://host/path", handler: { result in
  switch result {
    case let .success(userInfo):
      // login successfully
      loginState = authgear.sessionState
      userId = userInfo.sub
    case let .failure(error):
      if let authgearError = error as? AuthgearError, case .cancel = authgearError {
        // user cancel
      } else {
        // Something went wrong
      }
  }
})`,

  android: `fun startLogin() {
  val options = AuthenticateOptions("com.example.authgear://host/path")
  authgear.authenticate(options, object : OnAuthenticateListener {
    override fun onAuthenticated(userInfo: UserInfo) {
      // Login successfully
    }
    override fun onAuthenticationFailed(throwable: Throwable) {
      // Login failed
    }
  })
}`,
} as const;

export type OnceSdkPanelId = keyof typeof ONCE_SDK_CODE_SAMPLES;

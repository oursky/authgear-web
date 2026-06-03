import { useEffect, useState } from 'react';

export interface FeatureDetection {
  /** false until the mount-time check has run (also false during SSR). */
  checked: boolean;
  webauthn: boolean;
  platformAuthenticator: boolean | null;
  conditionalMediation: boolean | null;
}

export function useFeatureDetection(): FeatureDetection {
  const [state, setState] = useState<FeatureDetection>({
    checked: false,
    webauthn: false,
    platformAuthenticator: null,
    conditionalMediation: null,
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (typeof window === 'undefined' || !window.PublicKeyCredential) {
        if (!cancelled) setState({ checked: true, webauthn: false, platformAuthenticator: null, conditionalMediation: null });
        return;
      }
      const [platformAuthenticator, conditionalMediation] = await Promise.all([
        PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable().catch(() => null),
        PublicKeyCredential.isConditionalMediationAvailable?.().catch(() => null) ?? Promise.resolve(null),
      ]);
      if (!cancelled) setState({ checked: true, webauthn: true, platformAuthenticator, conditionalMediation });
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

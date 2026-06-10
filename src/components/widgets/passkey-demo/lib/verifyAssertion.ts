// src/components/widgets/passkey-demo/lib/verifyAssertion.ts
//
// Re-implements, in the browser, the checks a relying-party server performs
// on a WebAuthn assertion (WebAuthn L3 §7.2). Each check becomes a
// pass/fail step with a teaching-moment explanation. The signature check is
// real WebCrypto verification against the public key captured at creation.
// Step labels/details come from the caller's locale strings, so results
// render in the page language.

import { bufToB64url } from './base64url';
import { parseAuthData } from './authData';
import { derToRaw } from './derSignature';
import type { StoredCredential } from './storage';
import type { WidgetStrings } from '../strings';

export interface VerificationStep {
  id: 'type' | 'challenge' | 'origin' | 'rpIdHash' | 'flags' | 'signature' | 'signCount';
  label: string;
  pass: boolean;
  /** Informational steps render as INFO instead of PASS/FAIL. */
  info?: boolean;
  detail: string;
}

export interface AssertionVerification {
  steps: VerificationStep[];
  allPassed: boolean;
  newSignCount: number;
}

export interface VerifyAssertionInput {
  expectedChallenge: string; // base64url of the issued challenge
  expectedOrigin: string; // e.g. window.location.origin
  expectedRpId: string; // e.g. window.location.hostname
  requestedUserVerification: UserVerificationRequirement;
  clientDataJSON: Uint8Array;
  authenticatorData: Uint8Array;
  signature: Uint8Array;
  credential: StoredCredential;
  strings: WidgetStrings['verify'];
}

export async function verifyAssertion(input: VerifyAssertionInput): Promise<AssertionVerification> {
  const s = input.strings;
  const steps: VerificationStep[] = [];

  let clientData: { type?: string; challenge?: string; origin?: string } = {};
  try {
    clientData = JSON.parse(new TextDecoder().decode(input.clientDataJSON));
  } catch {
    // leave empty — every clientData-based step below will fail with detail
  }

  steps.push({
    id: 'type',
    label: s.typeLabel,
    pass: clientData.type === 'webauthn.get',
    detail: s.typeDetail(clientData.type ?? 'unparseable clientDataJSON'),
  });

  steps.push({
    id: 'challenge',
    label: s.challengeLabel,
    pass: clientData.challenge === input.expectedChallenge,
    detail: s.challengeDetail,
  });

  steps.push({
    id: 'origin',
    label: s.originLabel(input.expectedOrigin),
    pass: clientData.origin === input.expectedOrigin,
    // crossOrigin check (L3 §7.2 step 9) omitted: this demo page is always same-origin
    detail: s.originDetail(clientData.origin ?? 'n/a'),
  });

  let authData: ReturnType<typeof parseAuthData>;
  try {
    authData = parseAuthData(input.authenticatorData);
  } catch (err) {
    steps.push({
      id: 'rpIdHash',
      label: s.authDataParseLabel,
      pass: false,
      detail: s.authDataParseDetail(err instanceof Error ? err.message : String(err)),
    });
    return { steps, allPassed: false, newSignCount: 0 };
  }

  const expectedRpIdHash = new Uint8Array(
    await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input.expectedRpId)),
  );
  steps.push({
    id: 'rpIdHash',
    label: s.rpIdHashLabel(input.expectedRpId),
    pass: bufToB64url(authData.rpIdHash) === bufToB64url(expectedRpIdHash),
    detail: s.rpIdHashDetail,
  });

  const uvSatisfied = input.requestedUserVerification !== 'required' || authData.flags.uv;
  steps.push({
    id: 'flags',
    label: s.flagsLabel,
    pass: authData.flags.up && uvSatisfied,
    detail: s.flagsDetail(authData.flags.up, authData.flags.uv, input.requestedUserVerification),
  });

  let signatureOk = false;
  let signatureDetail = s.signatureVerified;
  try {
    const clientDataHash = new Uint8Array(await crypto.subtle.digest('SHA-256', input.clientDataJSON as BufferSource));
    const signedData = new Uint8Array(input.authenticatorData.length + clientDataHash.length);
    signedData.set(input.authenticatorData, 0);
    signedData.set(clientDataHash, input.authenticatorData.length);

    if (input.credential.alg === -7) {
      const key = await crypto.subtle.importKey(
        'jwk',
        input.credential.publicKeyJwk,
        { name: 'ECDSA', namedCurve: 'P-256' },
        false,
        ['verify'],
      );
      // WebAuthn ES256 signatures arrive ASN.1/DER-encoded; WebCrypto wants raw r‖s
      signatureOk = await crypto.subtle.verify(
        { name: 'ECDSA', hash: 'SHA-256' },
        key,
        derToRaw(input.signature) as BufferSource,
        signedData as BufferSource,
      );
    } else if (input.credential.alg === -257) {
      const key = await crypto.subtle.importKey(
        'jwk',
        input.credential.publicKeyJwk,
        { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
        false,
        ['verify'],
      );
      signatureOk = await crypto.subtle.verify('RSASSA-PKCS1-v1_5', key, input.signature as BufferSource, signedData as BufferSource);
    } else {
      signatureDetail = s.signatureUnsupportedAlg(input.credential.alg);
    }
    if (!signatureOk && (input.credential.alg === -7 || input.credential.alg === -257)) {
      signatureDetail = s.signatureFailed;
    }
  } catch (err) {
    signatureDetail = s.signatureThrew(err instanceof Error ? err.message : String(err));
  }
  steps.push({
    id: 'signature',
    label: s.signatureLabel,
    pass: signatureOk,
    detail: signatureDetail,
  });

  const previous = input.credential.signCount;
  steps.push({
    id: 'signCount',
    label: s.signCountLabel,
    pass: true,
    info: true,
    detail:
      authData.signCount === 0
        ? s.signCountZero
        : authData.signCount > previous
          ? s.signCountAdvanced(previous, authData.signCount)
          : s.signCountNotAdvanced(previous, authData.signCount),
  });

  return {
    steps,
    // info-only steps (sign count) never affect the verdict
    allPassed: steps.every((step) => step.info || step.pass),
    newSignCount: authData.signCount,
  };
}

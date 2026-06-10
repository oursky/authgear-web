// src/components/widgets/passkey-demo/lib/verifyAssertion.ts
//
// Re-implements, in the browser, the checks a relying-party server performs
// on a WebAuthn assertion (WebAuthn L3 §7.2). Each check becomes a
// pass/fail step with a teaching-moment explanation. The signature check is
// real WebCrypto verification against the public key captured at creation.

import { bufToB64url } from './base64url';
import { parseAuthData } from './authData';
import { derToRaw } from './derSignature';
import type { StoredCredential } from './storage';

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
}

export async function verifyAssertion(input: VerifyAssertionInput): Promise<AssertionVerification> {
  const steps: VerificationStep[] = [];

  let clientData: { type?: string; challenge?: string; origin?: string } = {};
  try {
    clientData = JSON.parse(new TextDecoder().decode(input.clientDataJSON));
  } catch {
    // leave empty — every clientData-based step below will fail with detail
  }

  steps.push({
    id: 'type',
    label: 'clientDataJSON.type is "webauthn.get"',
    pass: clientData.type === 'webauthn.get',
    detail: `Got "${clientData.type ?? 'unparseable clientDataJSON'}". Must be "webauthn.get" so a registration signature can’t be replayed as a sign-in.`,
  });

  steps.push({
    id: 'challenge',
    label: 'Challenge matches the one issued',
    pass: clientData.challenge === input.expectedChallenge,
    detail:
      'Must match the challenge issued for this attempt, so a captured assertion can’t be replayed.',
  });

  steps.push({
    id: 'origin',
    label: `Origin is ${input.expectedOrigin}`,
    pass: clientData.origin === input.expectedOrigin,
    // crossOrigin check (L3 §7.2 step 9) omitted: this demo page is always same-origin
    detail: `Got "${clientData.origin ?? 'n/a'}". The browser sets this and the page can’t forge it, which makes passkeys phishing-resistant.`,
  });

  let authData: ReturnType<typeof parseAuthData>;
  try {
    authData = parseAuthData(input.authenticatorData);
  } catch (err) {
    steps.push({
      id: 'rpIdHash',
      label: 'Authenticator data parses',
      pass: false,
      detail: `Couldn’t parse authenticatorData: ${err instanceof Error ? err.message : String(err)}`,
    });
    return { steps, allPassed: false, newSignCount: 0 };
  }

  const expectedRpIdHash = new Uint8Array(
    await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input.expectedRpId)),
  );
  steps.push({
    id: 'rpIdHash',
    label: `rpIdHash matches SHA-256("${input.expectedRpId}")`,
    pass: bufToB64url(authData.rpIdHash) === bufToB64url(expectedRpIdHash),
    detail:
      'Binds the assertion to this site’s RP ID, so a passkey from another site can’t answer here.',
  });

  const uvSatisfied = input.requestedUserVerification !== 'required' || authData.flags.uv;
  steps.push({
    id: 'flags',
    label: 'UP / UV flags as requested',
    pass: authData.flags.up && uvSatisfied,
    detail: `UP (user present) = ${authData.flags.up}, UV (user verified) = ${authData.flags.uv}. UP is always required; UV is required when you ask for it (you chose "${input.requestedUserVerification}").`,
  });

  let signatureOk = false;
  let signatureDetail =
    'WebCrypto verified the signature against the public key saved at registration. This is the core check.';
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
      signatureDetail = `Unsupported COSE algorithm ${input.credential.alg}. This demo verifies ES256 (-7) and RS256 (-257).`;
    }
    if (!signatureOk && (input.credential.alg === -7 || input.credential.alg === -257)) {
      signatureDetail = 'The signature didn’t verify against the stored public key.';
    }
  } catch (err) {
    signatureDetail = `Verification threw: ${err instanceof Error ? err.message : String(err)}`;
  }
  steps.push({
    id: 'signature',
    label: 'Signature verifies against the stored public key',
    pass: signatureOk,
    detail: signatureDetail,
  });

  const previous = input.credential.signCount;
  steps.push({
    id: 'signCount',
    label: 'Sign count progression',
    pass: true,
    info: true,
    detail:
      authData.signCount === 0
        ? 'Reports 0. Synced passkeys (iCloud Keychain, Google Password Manager) usually do; servers treat 0 as "no counter".'
        : authData.signCount > previous
          ? `Advanced from ${previous} to ${authData.signCount}. Servers can use this to spot cloned credentials.`
          : `Didn’t advance (${previous} to ${authData.signCount}). Unreliable for synced passkeys, so usually informational.`,
  });

  return {
    steps,
    // info-only steps (sign count) never affect the verdict
    allPassed: steps.every((s) => s.info || s.pass),
    newSignCount: authData.signCount,
  };
}

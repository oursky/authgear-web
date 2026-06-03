// src/components/widgets/passkey-demo/lib/createOptions.ts
//
// Builds PublicKeyCredentialCreationOptions from the panel-1 form state, plus
// a JSON-renderable preview (binary fields as base64url) shown live to the
// visitor as they toggle options.

import { bufToB64url } from './base64url';

export interface CreateConfig {
  userName: string;
  attachment: '' | 'platform' | 'cross-platform';
  userVerification: UserVerificationRequirement;
  residentKey: ResidentKeyRequirement;
  includeRs256: boolean;
  attestation: 'none' | 'direct';
}

const RP_NAME = 'Authgear Passkey Demo';
const TIMEOUT_MS = 60000;

function pubKeyCredParams(cfg: CreateConfig): Array<{ type: 'public-key'; alg: number }> {
  return [
    { type: 'public-key', alg: -7 }, // ES256, always
    ...(cfg.includeRs256 ? [{ type: 'public-key' as const, alg: -257 }] : []),
  ];
}

export function buildCreationOptions(
  cfg: CreateConfig,
  challenge: Uint8Array,
  userId: Uint8Array,
  rpId: string,
): PublicKeyCredentialCreationOptions {
  const authenticatorSelection: AuthenticatorSelectionCriteria = {
    userVerification: cfg.userVerification,
    residentKey: cfg.residentKey,
  };
  if (cfg.attachment) authenticatorSelection.authenticatorAttachment = cfg.attachment;
  return {
    rp: { id: rpId, name: RP_NAME },
    user: { id: userId, name: cfg.userName, displayName: cfg.userName },
    challenge,
    pubKeyCredParams: pubKeyCredParams(cfg),
    timeout: TIMEOUT_MS,
    authenticatorSelection,
    attestation: cfg.attestation,
  };
}

export interface CreationOptionsPreview {
  rp: { id: string; name: string };
  user: { id: string; name: string; displayName: string };
  challenge: string;
  pubKeyCredParams: Array<{ type: 'public-key'; alg: number }>;
  timeout: number;
  authenticatorSelection: {
    authenticatorAttachment?: string;
    userVerification: string;
    residentKey: string;
  };
  attestation: string;
}

export function creationOptionsPreview(
  cfg: CreateConfig,
  challenge: Uint8Array,
  userId: Uint8Array,
  rpId: string,
): CreationOptionsPreview {
  const authenticatorSelection: CreationOptionsPreview['authenticatorSelection'] = {
    userVerification: cfg.userVerification,
    residentKey: cfg.residentKey,
  };
  if (cfg.attachment) authenticatorSelection.authenticatorAttachment = cfg.attachment;
  return {
    rp: { id: rpId, name: RP_NAME },
    user: { id: bufToB64url(userId), name: cfg.userName, displayName: cfg.userName },
    challenge: bufToB64url(challenge),
    pubKeyCredParams: pubKeyCredParams(cfg),
    timeout: TIMEOUT_MS,
    authenticatorSelection,
    attestation: cfg.attestation,
  };
}

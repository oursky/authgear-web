import { describe, expect, it } from 'vitest';
import { buildCreationOptions, creationOptionsPreview, type CreateConfig } from './createOptions';
import { bufToB64url } from './base64url';

const BASE: CreateConfig = {
  userName: 'demo-user',
  attachment: '',
  userVerification: 'preferred',
  residentKey: 'preferred',
  includeRs256: false,
  attestation: 'none',
};
const CHALLENGE = new Uint8Array(32).fill(7);
const USER_ID = new Uint8Array(16).fill(9);

describe('creationOptionsPreview', () => {
  it('renders binary fields as base64url and omits unset attachment', () => {
    const preview = creationOptionsPreview(BASE, CHALLENGE, USER_ID, 'www.authgear.com');
    expect(preview.challenge).toBe(bufToB64url(CHALLENGE));
    expect(preview.user.id).toBe(bufToB64url(USER_ID));
    expect(preview.rp).toEqual({ id: 'www.authgear.com', name: 'Authgear Passkey Demo' });
    expect(preview.pubKeyCredParams).toEqual([{ type: 'public-key', alg: -7 }]);
    expect('authenticatorAttachment' in preview.authenticatorSelection).toBe(false);
  });

  it('adds RS256 and attachment when configured', () => {
    const preview = creationOptionsPreview(
      { ...BASE, includeRs256: true, attachment: 'platform', attestation: 'direct' },
      CHALLENGE,
      USER_ID,
      'localhost',
    );
    expect(preview.pubKeyCredParams).toEqual([
      { type: 'public-key', alg: -7 },
      { type: 'public-key', alg: -257 },
    ]);
    expect(preview.authenticatorSelection.authenticatorAttachment).toBe('platform');
    expect(preview.attestation).toBe('direct');
  });
});

describe('buildCreationOptions', () => {
  it('mirrors the preview but with real buffers', () => {
    const options = buildCreationOptions(BASE, CHALLENGE, USER_ID, 'localhost');
    expect(options.challenge).toBe(CHALLENGE);
    expect(options.user.id).toBe(USER_ID);
    expect(options.user.name).toBe('demo-user');
    expect(options.timeout).toBe(60000);
  });
});

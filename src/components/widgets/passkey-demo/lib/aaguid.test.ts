import { describe, expect, it } from 'vitest';
import { aaguidName, formatAaguid } from './aaguid';

describe('formatAaguid', () => {
  it('formats 16 bytes as a dashed UUID string', () => {
    const bytes = new Uint8Array([
      0xea, 0x9b, 0x8d, 0x66, 0x4d, 0x01, 0x1d, 0x21, 0x3c, 0xe4, 0xb6, 0xb4, 0x8c, 0xb5, 0x75, 0xd4,
    ]);
    expect(formatAaguid(bytes)).toBe('ea9b8d66-4d01-1d21-3ce4-b6b48cb575d4');
  });
});

describe('aaguidName', () => {
  it('resolves a known AAGUID from the bundled snapshot', () => {
    expect(aaguidName('ea9b8d66-4d01-1d21-3ce4-b6b48cb575d4')).toBe('Google Password Manager');
  });

  it('explains the all-zero AAGUID instead of returning null', () => {
    expect(aaguidName('00000000-0000-0000-0000-000000000000')).toMatch(/attestation/i);
  });

  it('returns null for unknown AAGUIDs', () => {
    expect(aaguidName('ffffffff-ffff-ffff-ffff-ffffffffffff')).toBeNull();
  });
});

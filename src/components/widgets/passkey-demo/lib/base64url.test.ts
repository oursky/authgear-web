import { describe, expect, it } from 'vitest';
import { b64urlToBuf, bufToB64url } from './base64url';

describe('base64url', () => {
  it('round-trips arbitrary bytes', () => {
    const bytes = new Uint8Array([0, 1, 2, 250, 251, 252, 253, 254, 255]);
    expect(b64urlToBuf(bufToB64url(bytes))).toEqual(bytes);
  });

  it('uses - and _ instead of + and /', () => {
    // 0xfa 0xff produces '+' and '/' chars in plain base64 ("+v8=")
    const s = bufToB64url(new Uint8Array([0xfa, 0xff]));
    expect(s).toBe('-v8');
    expect(s).not.toMatch(/[+/=]/);
  });

  it('decodes unpadded input', () => {
    expect(b64urlToBuf('-v8')).toEqual(new Uint8Array([0xfa, 0xff]));
  });

  it('accepts ArrayBuffer input', () => {
    const buf = new Uint8Array([1, 2, 3]).buffer;
    expect(bufToB64url(buf)).toBe('AQID');
  });
});

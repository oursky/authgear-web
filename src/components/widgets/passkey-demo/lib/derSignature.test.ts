import { describe, expect, it } from 'vitest';
import { derToRaw } from './derSignature';
import { hexToBytes, rawToDer } from './testHelpers';

describe('derToRaw', () => {
  it('round-trips a raw signature through DER', () => {
    const raw = new Uint8Array(64);
    crypto.getRandomValues(raw);
    raw[0] = 0x91; // force high bit on r so DER needs a 0x00 prefix
    raw[32] = 0x00; // force a leading zero on s so DER strips it
    raw[33] = 0x01;
    expect(derToRaw(rawToDer(raw))).toEqual(raw);
  });

  it('left-pads short integers to the coordinate size', () => {
    // r = 0x01, s = 0x02
    const der = hexToBytes('3006 020101 020102');
    const raw = derToRaw(der);
    expect(raw.length).toBe(64);
    expect(raw[31]).toBe(0x01);
    expect(raw[63]).toBe(0x02);
  });

  it('rejects non-signature input', () => {
    expect(() => derToRaw(hexToBytes('0102'))).toThrow(/SEQUENCE/);
    expect(() => derToRaw(hexToBytes('3003 030101'))).toThrow(/INTEGER/);
    expect(() => derToRaw(hexToBytes('3004 020101 02'))).toThrow(); // s: tag present, length byte missing
  });
});

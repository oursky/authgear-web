// src/components/widgets/passkey-demo/lib/derSignature.ts
//
// WebAuthn ES256 signatures are ASN.1/DER-encoded (SEQUENCE of two INTEGERs);
// WebCrypto's ECDSA verify expects the raw fixed-width r‖s (IEEE P1363) form.

export function derToRaw(der: Uint8Array, coordinateSize = 32): Uint8Array {
  if (der.length < 2 || der[0] !== 0x30) {
    throw new Error('DER signature: expected SEQUENCE');
  }
  let offset = 2;
  if (der[1] & 0x80) offset += der[1] & 0x7f; // skip long-form length bytes

  const readInteger = (): Uint8Array => {
    if (der[offset] !== 0x02) throw new Error('DER signature: expected INTEGER');
    const len = der[offset + 1];
    offset += 2;
    let bytes = der.slice(offset, offset + len);
    offset += len;
    // Strip the sign-padding zero(s), then left-pad to the coordinate size
    while (bytes.length > coordinateSize && bytes[0] === 0x00) bytes = bytes.slice(1);
    if (bytes.length > coordinateSize) throw new Error('DER signature: integer too large');
    const out = new Uint8Array(coordinateSize);
    out.set(bytes, coordinateSize - bytes.length);
    return out;
  };

  const r = readInteger();
  const s = readInteger();
  const raw = new Uint8Array(coordinateSize * 2);
  raw.set(r, 0);
  raw.set(s, coordinateSize);
  return raw;
}

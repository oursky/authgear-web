import type { Charset } from '../types';
import {
  ISO_8859_2_MAP,
  ISO_8859_6_MAP,
  ISO_8859_15_MAP,
  WINDOWS_1252_MAP,
  reverseMap,
} from './charsetMaps';

const ISO_8859_2_REV = reverseMap(ISO_8859_2_MAP);
const ISO_8859_6_REV = reverseMap(ISO_8859_6_MAP);
const ISO_8859_15_REV = reverseMap(ISO_8859_15_MAP);
const WINDOWS_1252_REV = reverseMap(WINDOWS_1252_MAP);

const SUBSTITUTE = 0x3f; // '?' for unmappable characters

export function stringToBytes(str: string, charset: Charset): Uint8Array {
  switch (charset) {
    case 'auto':
    case 'utf-8':
      return new TextEncoder().encode(str);
    case 'ascii': {
      const bytes = new Uint8Array(str.length);
      for (let i = 0; i < str.length; i++) bytes[i] = str.charCodeAt(i) & 0x7f;
      return bytes;
    }
    case 'utf-16': {
      // Big-endian UTF-16, no BOM (matches the source widget).
      const bytes = new Uint8Array(str.length * 2);
      for (let i = 0; i < str.length; i++) {
        const code = str.charCodeAt(i);
        bytes[i * 2] = (code >> 8) & 0xff;
        bytes[i * 2 + 1] = code & 0xff;
      }
      return bytes;
    }
    case 'iso-8859-1': {
      const bytes = new Uint8Array(str.length);
      for (let i = 0; i < str.length; i++) {
        const code = str.charCodeAt(i);
        bytes[i] = code > 0xff ? SUBSTITUTE : code;
      }
      return bytes;
    }
    case 'iso-8859-2':
      return mapEncode(str, ISO_8859_2_MAP);
    case 'iso-8859-6':
      return mapEncode(str, ISO_8859_6_MAP);
    case 'iso-8859-15':
      return mapEncodeWithRange(str, ISO_8859_15_MAP);
    case 'windows-1252':
      return mapEncodeWithRange(str, WINDOWS_1252_MAP);
    default:
      return new TextEncoder().encode(str);
  }
}

export function bytesToString(bytes: Uint8Array, charset: Charset): string {
  switch (charset) {
    case 'auto':
    case 'utf-8':
      return new TextDecoder('utf-8').decode(bytes);
    case 'ascii': {
      let str = '';
      for (let i = 0; i < bytes.length; i++) str += String.fromCharCode(bytes[i] & 0x7f);
      return str;
    }
    case 'utf-16': {
      let str = '';
      for (let i = 0; i + 1 < bytes.length; i += 2) {
        str += String.fromCharCode((bytes[i] << 8) | bytes[i + 1]);
      }
      return str;
    }
    case 'iso-8859-1': {
      let str = '';
      for (let i = 0; i < bytes.length; i++) str += String.fromCharCode(bytes[i]);
      return str;
    }
    case 'iso-8859-2':
      return mapDecode(bytes, ISO_8859_2_REV);
    case 'iso-8859-6':
      return mapDecode(bytes, ISO_8859_6_REV);
    case 'iso-8859-15':
      return mapDecodeWithRange(bytes, ISO_8859_15_REV);
    case 'windows-1252':
      return mapDecodeWithRange(bytes, WINDOWS_1252_REV);
    default:
      return new TextDecoder('utf-8', { fatal: false }).decode(bytes);
  }
}

function mapEncode(str: string, map: Record<string, number>): Uint8Array {
  const bytes = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    const code = ch.charCodeAt(0);
    if (code < 0x80) bytes[i] = code;
    else if (map[ch] !== undefined) bytes[i] = map[ch];
    else bytes[i] = SUBSTITUTE;
  }
  return bytes;
}

function mapEncodeWithRange(str: string, map: Record<string, number>): Uint8Array {
  // ISO-8859-15 and Windows-1252 keep the 0xA0–0xFF range from Latin-1
  // identical, so treat any char with a code point in that range as
  // pass-through unless the special map says otherwise.
  const bytes = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    const code = ch.charCodeAt(0);
    if (code < 0x80) {
      bytes[i] = code;
    } else if (map[ch] !== undefined) {
      bytes[i] = map[ch];
    } else if (code >= 0xa0 && code <= 0xff) {
      bytes[i] = code;
    } else {
      bytes[i] = SUBSTITUTE;
    }
  }
  return bytes;
}

function mapDecode(bytes: Uint8Array, rev: Record<number, string>): string {
  let str = '';
  for (let i = 0; i < bytes.length; i++) {
    const b = bytes[i];
    if (b < 0x80) str += String.fromCharCode(b);
    else if (rev[b] !== undefined) str += rev[b];
    else str += '?';
  }
  return str;
}

function mapDecodeWithRange(bytes: Uint8Array, rev: Record<number, string>): string {
  let str = '';
  for (let i = 0; i < bytes.length; i++) {
    const b = bytes[i];
    if (b < 0x80) str += String.fromCharCode(b);
    else if (rev[b] !== undefined) str += rev[b];
    else if (b >= 0xa0 && b <= 0xff) str += String.fromCharCode(b);
    else str += '?';
  }
  return str;
}

export interface EncodeOptions {
  charset: Charset;
  urlSafe: boolean;
  withoutPadding: boolean;
}

export function encodeBase64(text: string, opts: EncodeOptions): string {
  const bytes = stringToBytes(text, opts.charset);
  // String.fromCharCode handles up to ~120k chars at once on modern engines.
  // Chunk to avoid the call-stack limit for very large inputs.
  let binary = '';
  const CHUNK = 0x8000;
  for (let i = 0; i < bytes.length; i += CHUNK) {
    binary += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + CHUNK)));
  }
  let encoded = btoa(binary);
  if (opts.urlSafe) encoded = encoded.replace(/\+/g, '-').replace(/\//g, '_');
  if (opts.withoutPadding) encoded = encoded.replace(/=+$/, '');
  return encoded;
}

export function decodeBase64(input: string, opts: EncodeOptions): string {
  let toDecode = input.trim();
  if (opts.urlSafe) toDecode = toDecode.replace(/-/g, '+').replace(/_/g, '/');
  const padding = (4 - (toDecode.length % 4)) % 4;
  toDecode += '='.repeat(padding);
  const binary = atob(toDecode);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i) & 0xff;
  return bytesToString(bytes, opts.charset);
}

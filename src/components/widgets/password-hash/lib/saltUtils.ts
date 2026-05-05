import type { Algorithm, SaltEncoding } from '../types';

export function calculateSaltByteLength(
  salt: string,
  encoding: SaltEncoding,
  algorithm?: Algorithm,
): number {
  if (!salt) return 0;
  if (algorithm === 'bcrypt') {
    return salt.length === 22 ? 16 : 0;
  }
  try {
    if (encoding === 'hex') return Math.ceil(salt.length / 2);
    if (encoding === 'base64') return atob(salt).length;
  } catch {
    if (encoding === 'base64') return Math.floor((salt.length * 3) / 4);
  }
  return 0;
}

export function generateSalt(length = 16, encoding: SaltEncoding = 'hex'): string {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  if (encoding === 'hex') return Array.from(array, (b) => b.toString(16).padStart(2, '0')).join('');
  if (encoding === 'base64') return btoa(String.fromCharCode(...array));
  throw new Error('Unsupported encoding');
}

export function saltToUint8Array(salt: string, encoding: SaltEncoding = 'hex'): Uint8Array {
  if (encoding === 'hex') {
    const bytes: number[] = [];
    for (let i = 0; i < salt.length; i += 2) bytes.push(parseInt(salt.slice(i, i + 2), 16));
    return new Uint8Array(bytes);
  }
  if (encoding === 'base64') {
    const binary = atob(salt);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes;
  }
  throw new Error('Unsupported encoding');
}

export function shouldRegenerateBcryptSalt(currentSalt: string, _newCost: number): boolean {
  if (!currentSalt || currentSalt.length !== 22) return true;
  return true;
}

export function getFallbackSalt(algorithm: Algorithm): string {
  const map: Record<Algorithm, string> = {
    bcrypt: 'N9qo8uLOickgx2ZMRZoMye',
    pbkdf2: '778e2617f07e1a6288f448d9b6cad1ce',
    argon2id: '778e2617f07e1a6288f448d9b6cad1ce',
    scrypt: '778e2617f07e1a6288f448d9b6cad1ce',
  };
  return map[algorithm] ?? '778e2617f07e1a6288f448d9b6cad1ce';
}

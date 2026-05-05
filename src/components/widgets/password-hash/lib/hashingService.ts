import bcrypt from 'bcryptjs';
import scryptPkg from 'scrypt-js';

const scrypt = (scryptPkg as { scrypt: typeof scryptPkg.scrypt }).scrypt ?? scryptPkg;
import type { Algorithm, HashOptions, HashResult, SaltEncoding } from '../types';

const isDev = typeof import.meta !== 'undefined' && (import.meta as { env?: { DEV?: boolean } }).env?.DEV === true;

function debugLog(...args: unknown[]): void {
  if (isDev) console.log(...args);
}
function debugError(...args: unknown[]): void {
  if (isDev) console.error(...args);
}

export function generateSalt(length = 16, encoding: SaltEncoding = 'hex'): string {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  if (encoding === 'hex') {
    return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
  }
  if (encoding === 'base64') {
    return btoa(String.fromCharCode(...array));
  }
  throw new Error('Unsupported encoding');
}

export async function generateAlgorithmSalt(
  algorithm: Algorithm,
  parameters: HashOptions = {},
  saltEncoding: SaltEncoding = 'hex',
): Promise<string> {
  switch (algorithm) {
    case 'bcrypt': {
      const cost = parameters.cost ?? 10;
      const fullSalt = await bcrypt.genSalt(cost);
      // Extract only the actual salt part (22 characters after $2a$10$)
      return fullSalt.substring(7, 29);
    }
    case 'pbkdf2':
    case 'argon2id':
    case 'scrypt':
    default: {
      const saltLength = parameters.saltLength ?? 16;
      return generateSalt(saltLength, saltEncoding);
    }
  }
}

export function saltToUint8Array(salt: string, encoding: SaltEncoding = 'hex'): Uint8Array {
  if (encoding === 'hex') {
    const bytes: number[] = [];
    for (let i = 0; i < salt.length; i += 2) {
      bytes.push(parseInt(salt.slice(i, i + 2), 16));
    }
    return new Uint8Array(bytes);
  }
  if (encoding === 'base64') {
    const binaryString = atob(salt);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }
  throw new Error('Unsupported encoding');
}

function uint8ToHex(arr: Uint8Array): string {
  return Array.from(arr, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

function uint8ToBase64(arr: Uint8Array): string {
  return btoa(String.fromCharCode(...arr));
}

function base64ToUint8(b64: string): Uint8Array {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

export async function hashArgon2id(password: string, options: HashOptions = {}): Promise<HashResult> {
  debugLog('🔵 [Argon2id] Starting');
  const {
    memory = 19,
    iterations = 2,
    parallelism = 1,
    saltLength = 16,
    keyLength = 32,
    saltEncoding = 'hex',
  } = options;

  const startTime = performance.now();
  try {
    const { argon2id } = await import('hash-wasm');
    const salt = options.salt ?? generateSalt(saltLength, saltEncoding);
    const saltBytes = saltToUint8Array(salt, saltEncoding);

    // hash-wasm returns the encoded PHC string when outputType: 'encoded'
    const encoded = await argon2id({
      password,
      salt: saltBytes,
      parallelism,
      iterations,
      memorySize: memory * 1024, // MiB → KiB
      hashLength: keyLength,
      outputType: 'encoded',
    });

    const executionTime = Math.round(performance.now() - startTime);
    return {
      algorithm: 'argon2id',
      salt,
      hash: encoded,
      encodedHash: encoded,
      executionTime,
      parameters: { memory, iterations, parallelism, saltLength, keyLength },
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    debugError('❌ [Argon2id] Error:', message);
    throw new Error(`Argon2id hashing failed: ${message}`);
  }
}

export async function hashScrypt(password: string, options: HashOptions = {}): Promise<HashResult> {
  debugLog('🔵 [scrypt] Starting');
  const {
    N = 16384,
    r = 8,
    p = 1,
    saltLength = 16,
    keyLength = 32,
    saltEncoding = 'hex',
  } = options;

  const startTime = performance.now();
  try {
    const salt = options.salt ?? generateSalt(saltLength, saltEncoding);
    const saltBytes = saltToUint8Array(salt, saltEncoding);
    const normalizedPassword = password.normalize('NFKC');

    // Yield to React for loading state
    await new Promise((resolve) => setTimeout(resolve, 10));

    const hash = await scrypt(
      new TextEncoder().encode(normalizedPassword),
      saltBytes,
      N,
      r,
      p,
      keyLength,
    );

    const executionTime = Math.round(performance.now() - startTime);
    const saltBase64 = uint8ToBase64(saltBytes);
    const hashBase64 = uint8ToBase64(hash);
    const logN = Math.log2(N);
    const phcString = `$scrypt$ln=${logN},r=${r},p=${p}$${saltBase64}$${hashBase64}`;

    return {
      algorithm: 'scrypt',
      salt,
      hash: phcString,
      encodedHash: phcString,
      executionTime,
      parameters: { N, r, p, saltLength, keyLength },
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    debugError('❌ [scrypt] Error:', message);
    throw new Error(`scrypt hashing failed: ${message}`);
  }
}

export async function hashBcrypt(password: string, options: HashOptions = {}): Promise<HashResult> {
  debugLog('🔵 [bcrypt] Starting');
  const { cost = 10, salt } = options;
  const startTime = performance.now();
  try {
    let bcryptSalt: string;
    if (salt) {
      bcryptSalt = salt.startsWith('$2') ? salt : `$2a$${cost}$${salt}`;
    } else {
      bcryptSalt = await bcrypt.genSalt(cost);
    }

    const hash = await bcrypt.hash(password, bcryptSalt);
    const executionTime = Math.round(performance.now() - startTime);
    const extractedSalt = hash.substring(7, 29);

    return {
      algorithm: 'bcrypt',
      salt: extractedSalt,
      hash,
      encodedHash: hash,
      executionTime,
      parameters: { cost },
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    debugError('❌ [bcrypt] Error:', message);
    throw new Error(`bcrypt hashing failed: ${message}`);
  }
}

export async function hashPBKDF2(password: string, options: HashOptions = {}): Promise<HashResult> {
  debugLog('🔵 [PBKDF2] Starting');
  const {
    iterations = 600000,
    saltLength = 16,
    keyLength = 32,
    saltEncoding = 'hex',
  } = options;

  const startTime = performance.now();
  try {
    const { pbkdf2, createSHA256 } = await import('hash-wasm');
    const salt = options.salt ?? generateSalt(saltLength, saltEncoding);
    const saltBytes = saltToUint8Array(salt, saltEncoding);

    const hashHex = await pbkdf2({
      password,
      salt: saltBytes,
      iterations,
      hashLength: keyLength,
      hashFunction: createSHA256(),
      outputType: 'hex',
    });

    const executionTime = Math.round(performance.now() - startTime);
    const hashBytes = saltToUint8Array(hashHex as string, 'hex');
    const saltBase64 = uint8ToBase64(saltBytes);
    const hashBase64 = uint8ToBase64(hashBytes);
    const encodedHash = `$pbkdf2-sha256$${iterations}$${saltBase64}$${hashBase64}`;

    return {
      algorithm: 'pbkdf2',
      salt,
      hash: hashHex as string,
      encodedHash,
      executionTime,
      parameters: { iterations, saltLength, keyLength },
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    debugError('❌ [PBKDF2] Error:', message);
    throw new Error(`PBKDF2 hashing failed: ${message}`);
  }
}

export async function verifyPassword(
  password: string,
  hash: string,
  algorithm: Algorithm,
): Promise<boolean> {
  try {
    switch (algorithm) {
      case 'argon2id': {
        const { argon2Verify } = await import('hash-wasm');
        return await argon2Verify({ password, hash });
      }
      case 'scrypt': {
        const match = hash.match(/^\$scrypt\$ln=([\d.]+),r=(\d+),p=(\d+)\$([^$]+)\$([^$]+)$/);
        if (!match) throw new Error('Invalid scrypt PHC hash format');
        const [, logN, rStr, pStr, saltB64, hashB64] = match;
        const N = Math.pow(2, parseFloat(logN));
        const saltBytes = base64ToUint8(saltB64);
        const expected = base64ToUint8(hashB64);
        const normalizedPassword = password.normalize('NFKC');
        await new Promise((resolve) => setTimeout(resolve, 10));
        const computed = await scrypt(
          new TextEncoder().encode(normalizedPassword),
          saltBytes,
          N,
          parseInt(rStr, 10),
          parseInt(pStr, 10),
          expected.length,
        );
        if (computed.length !== expected.length) return false;
        let diff = 0;
        for (let i = 0; i < computed.length; i++) diff |= computed[i] ^ expected[i];
        return diff === 0;
      }
      case 'bcrypt': {
        return await bcrypt.compare(password, hash);
      }
      case 'pbkdf2': {
        const match = hash.match(/^\$pbkdf2-sha256\$(\d+)\$([^$]+)\$([^$]+)$/);
        if (!match) throw new Error('Invalid PBKDF2 hash format');
        const [, iterStr, saltB64, hashB64] = match;
        const iterations = parseInt(iterStr, 10);
        const saltBytes = base64ToUint8(saltB64);
        const expected = base64ToUint8(hashB64);
        const { pbkdf2, createSHA256 } = await import('hash-wasm');
        const computedHex = await pbkdf2({
          password,
          salt: saltBytes,
          iterations,
          hashLength: expected.length,
          hashFunction: createSHA256(),
          outputType: 'hex',
        });
        return uint8ToHex(expected) === (computedHex as string);
      }
      default:
        throw new Error(`Unsupported algorithm: ${algorithm}`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Password verification failed: ${message}`);
  }
}

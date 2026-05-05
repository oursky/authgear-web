import type { Algorithm } from '../types';
import { HASHING_ALGORITHMS, PARAMETER_WARNINGS, type AlgorithmConfig } from './constants';

export function parseAlgorithmFromHash(hash: string): Algorithm | null {
  if (hash.startsWith('$argon2id$')) return 'argon2id';
  if (hash.startsWith('$scrypt$')) return 'scrypt';
  if (hash.startsWith('$2b$') || hash.startsWith('$2a$') || hash.startsWith('$2y$')) return 'bcrypt';
  if (hash.startsWith('$pbkdf2-sha256$')) return 'pbkdf2';
  return null;
}

export function getAlgorithmConfig(algorithm: Algorithm): AlgorithmConfig | undefined {
  return Object.values(HASHING_ALGORITHMS).find((alg) => alg.value === algorithm);
}

export function getParameterWarnings(
  algorithm: Algorithm,
  parameters: Record<string, number>,
): string[] {
  const algorithmWarnings = PARAMETER_WARNINGS[algorithm];
  if (!algorithmWarnings) return [];
  return Object.keys(algorithmWarnings)
    .map((paramKey) => {
      const warning = algorithmWarnings[paramKey];
      const currentValue = parameters[paramKey];
      if (currentValue !== undefined && currentValue < warning.threshold) return warning.message;
      return null;
    })
    .filter((m): m is string => Boolean(m));
}

export function getParameterDescription(paramKey: string): string {
  const descriptions: Record<string, string> = {
    memory: 'Memory usage in MiB. Higher = more secure but slower.',
    iterations: 'Number of iterations. Higher = more secure but slower.',
    parallelism: 'Number of parallel threads. Usually 4 for optimal performance.',
    saltLength: 'Salt length in bytes. 16 bytes (128-bit) is recommended.',
    keyLength: 'Hash output length in bytes. 32 bytes (256-bit) is recommended.',
    N: 'CPU/Memory cost factor. Must be power of 2.',
    r: 'Block size parameter. Higher = more memory usage.',
    p: 'Parallelization parameter. Usually 1.',
    cost: 'Cost factor (2^cost rounds). Higher = more secure but slower.',
  };
  return descriptions[paramKey] ?? '';
}

export function supportsSaltFormat(algorithm: Algorithm): boolean {
  return !['argon2id', 'bcrypt'].includes(algorithm);
}

export function supportsOutputEncoding(algorithm: Algorithm): boolean {
  return !['bcrypt', 'pbkdf2', 'argon2id', 'scrypt'].includes(algorithm);
}

export function showsExecutionTimeHint(algorithm: Algorithm): boolean {
  return algorithm === 'argon2id';
}

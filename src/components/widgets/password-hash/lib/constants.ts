import type { Algorithm, SaltEncoding } from '../types';

export interface AlgorithmParameter {
  label: string;
  default: number;
  min: number;
  max: number;
  step: number;
}

export interface AlgorithmConfig {
  value: Algorithm;
  label: string;
  description: string;
  parameters: Record<string, AlgorithmParameter>;
}

export const HASHING_ALGORITHMS: Record<string, AlgorithmConfig> = {
  ARGON2ID: {
    value: 'argon2id',
    label: 'Argon2id',
    description: 'Memory-hard password hashing function',
    parameters: {
      memory: { label: 'Memory (MiB) (m)', default: 19, min: 1, max: 2048, step: 1 },
      iterations: { label: 'Iterations (t)', default: 2, min: 1, max: 10, step: 1 },
      parallelism: { label: 'Parallelism (p)', default: 1, min: 1, max: 16, step: 1 },
      saltLength: { label: 'Salt Length (bytes)', default: 16, min: 8, max: 64, step: 1 },
      keyLength: { label: 'Hash Length (bytes)', default: 32, min: 16, max: 64, step: 1 },
    },
  },
  BCRYPT: {
    value: 'bcrypt',
    label: 'bcrypt',
    description: 'Adaptive password hashing function',
    parameters: {
      cost: { label: 'Cost Factor', default: 10, min: 4, max: 20, step: 1 },
    },
  },
  SCRYPT: {
    value: 'scrypt',
    label: 'scrypt',
    description: 'Memory-hard key derivation function',
    parameters: {
      N: { label: 'N (CPU/Memory cost) (ln)', default: 16384, min: 1024, max: 1048576, step: 1024 },
      r: { label: 'r (Block size)', default: 8, min: 1, max: 32, step: 1 },
      p: { label: 'p (Parallelization)', default: 1, min: 1, max: 16, step: 1 },
      saltLength: { label: 'Salt Length (bytes)', default: 16, min: 8, max: 64, step: 1 },
      keyLength: { label: 'Key Length (bytes)', default: 32, min: 16, max: 64, step: 1 },
    },
  },
  PBKDF2: {
    value: 'pbkdf2',
    label: 'PBKDF2-HMAC-SHA256',
    description: 'Password-based key derivation function',
    parameters: {
      iterations: { label: 'Iterations', default: 600000, min: 1000, max: 10000000, step: 1000 },
      saltLength: { label: 'Salt Length (bytes)', default: 16, min: 8, max: 64, step: 1 },
      keyLength: { label: 'Key Length (bytes)', default: 32, min: 16, max: 64, step: 1 },
    },
  },
};

export const SUPPORTED_ALGORITHMS: AlgorithmConfig[] = Object.values(HASHING_ALGORITHMS);

export interface ParameterWarning {
  threshold: number;
  // i18n key under Tools.passwordHash.widget.*
  messageKey: string;
}

export const PARAMETER_WARNINGS: Record<Algorithm, Record<string, ParameterWarning>> = {
  argon2id: {
    memory: { threshold: 19, messageKey: 'warnArgon2idMemory' },
    iterations: { threshold: 2, messageKey: 'warnArgon2idIterations' },
    parallelism: { threshold: 1, messageKey: 'warnArgon2idParallelism' },
  },
  scrypt: {
    r: { threshold: 8, messageKey: 'warnScryptR' },
  },
  bcrypt: {
    cost: { threshold: 10, messageKey: 'warnBcryptCost' },
  },
  pbkdf2: {
    iterations: { threshold: 100000, messageKey: 'warnPbkdf2Iterations' },
  },
};

export const SALT_ENCODING_OPTIONS: Array<{ value: SaltEncoding; label: string }> = [
  { value: 'hex', label: 'Hex' },
  { value: 'base64', label: 'Base64' },
];

export const HASH_ENCODING_OPTIONS: Array<{ value: SaltEncoding; label: string }> = [
  { value: 'hex', label: 'Hex' },
  { value: 'base64', label: 'Base64' },
];

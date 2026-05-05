export type Algorithm = 'argon2id' | 'scrypt' | 'bcrypt' | 'pbkdf2';

export type SaltEncoding = 'hex' | 'base64';

export interface AlgorithmParameters {
  // argon2id
  memory?: number;
  iterations?: number;
  parallelism?: number;
  // scrypt
  N?: number;
  r?: number;
  p?: number;
  // bcrypt
  cost?: number;
  // shared
  saltLength?: number;
  keyLength?: number;
}

export interface HashOptions extends AlgorithmParameters {
  salt?: string;
  saltEncoding?: SaltEncoding;
}

export interface HashResult {
  algorithm: Algorithm;
  salt: string;
  hash: string;
  encodedHash: string;
  executionTime: number;
  parameters: AlgorithmParameters;
}

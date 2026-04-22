import { base64 } from './base64';
import { common, registry } from './common';
import { hmac } from './hmac';
import { jwk } from './jwk';
import { jwtJwe } from './jwtJwe';
import { oidc } from './oidc';
import { passwordHash } from './passwordHash';
import { ssl } from './ssl';
import { totp } from './totp';
import { uuidV7 } from './uuidV7';

export const toolsMessagesZhTW = {
  common,
  registry,
  base64,
  hmac,
  jwk,
  jwtJwe,
  oidc,
  passwordHash,
  ssl,
  totp,
  uuidV7,
} as const;

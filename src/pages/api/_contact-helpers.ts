/**
 * Antispam helpers for /api/contact. Kept separate from the route so
 * they're unit-testable under vitest without booting Astro.
 */

export interface TurnstileVerifyResult {
  ok: boolean;
  /** Present only on failure. Cloudflare's error-codes array, or a single string for local errors. */
  errorCodes?: string[];
  /** True when the local verify call itself failed (network/timeout), not a Cloudflare reject. */
  transportError?: boolean;
}

/**
 * Return true if the honeypot `website` field is non-empty on the submitted payload.
 * Real users never fill it — the input is off-screen, tabIndex=-1, aria-hidden.
 */
export function isHoneypotFilled(data: Record<string, unknown>): boolean {
  const v = data['website'];
  return typeof v === 'string' && v.trim().length > 0;
}

/**
 * Verify a Turnstile token with Cloudflare's siteverify endpoint.
 * Uses AbortController to cap the call at 5s.
 */
export async function verifyTurnstile(
  token: string | undefined,
  secret: string,
  remoteip: string | undefined,
  fetchImpl: typeof fetch = fetch
): Promise<TurnstileVerifyResult> {
  if (!token) {
    return { ok: false, errorCodes: ['missing-input-response'] };
  }
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    const body = new URLSearchParams({ secret, response: token });
    if (remoteip) body.set('remoteip', remoteip);
    const res = await fetchImpl('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
      signal: controller.signal,
    });
    if (!res.ok) {
      return { ok: false, transportError: true, errorCodes: [`http-${res.status}`] };
    }
    const json = (await res.json()) as { success?: boolean; 'error-codes'?: string[] };
    if (json.success === true) return { ok: true };
    return { ok: false, errorCodes: json['error-codes'] ?? ['unknown-failure'] };
  } catch (err) {
    return {
      ok: false,
      transportError: true,
      errorCodes: [err instanceof Error ? err.name : 'unknown-error'],
    };
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Return a copy of `data` with operational fields (`website`, `cfTurnstileToken`)
 * removed. Used before forwarding to the webhook so they don't leak into CRM.
 */
export function stripOperationalFields<T extends Record<string, unknown>>(data: T): Partial<T> {
  const { website: _w, cfTurnstileToken: _t, ...rest } = data as Record<string, unknown>;
  return rest as Partial<T>;
}

import { describe, it, expect } from 'vitest';
import { isHoneypotFilled } from './_contact-helpers';

describe('isHoneypotFilled', () => {
  it('returns false when `website` is absent', () => {
    expect(isHoneypotFilled({ Name: 'A', Email: 'a@b.co' })).toBe(false);
  });

  it('returns false when `website` is an empty string', () => {
    expect(isHoneypotFilled({ website: '' })).toBe(false);
  });

  it('returns false when `website` is whitespace-only', () => {
    expect(isHoneypotFilled({ website: '   ' })).toBe(false);
  });

  it('returns false when `website` is a non-string (e.g. number)', () => {
    expect(isHoneypotFilled({ website: 0 as unknown as string })).toBe(false);
  });

  it('returns true when `website` is a non-empty string', () => {
    expect(isHoneypotFilled({ website: 'http://bot.example' })).toBe(true);
  });
});

import { verifyTurnstile } from './_contact-helpers';

function okResponse(body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

describe('verifyTurnstile', () => {
  it('returns ok:false with missing-input-response when token is undefined', async () => {
    const fetchSpy = async () => okResponse({ success: true });
    const result = await verifyTurnstile(undefined, 'secret', '1.2.3.4', fetchSpy as unknown as typeof fetch);
    expect(result.ok).toBe(false);
    expect(result.errorCodes).toEqual(['missing-input-response']);
  });

  it('returns ok:true when Cloudflare says success', async () => {
    const fetchSpy = async () => okResponse({ success: true });
    const result = await verifyTurnstile('tok', 'secret', undefined, fetchSpy as unknown as typeof fetch);
    expect(result.ok).toBe(true);
  });

  it('returns ok:false and passes through error-codes on Cloudflare reject', async () => {
    const fetchSpy = async () => okResponse({ success: false, 'error-codes': ['invalid-input-response'] });
    const result = await verifyTurnstile('tok', 'secret', undefined, fetchSpy as unknown as typeof fetch);
    expect(result.ok).toBe(false);
    expect(result.errorCodes).toEqual(['invalid-input-response']);
    expect(result.transportError).toBeUndefined();
  });

  it('returns transportError:true on non-2xx Cloudflare response', async () => {
    const fetchSpy = async () => new Response('', { status: 502 });
    const result = await verifyTurnstile('tok', 'secret', undefined, fetchSpy as unknown as typeof fetch);
    expect(result.ok).toBe(false);
    expect(result.transportError).toBe(true);
    expect(result.errorCodes).toEqual(['http-502']);
  });

  it('returns transportError:true when fetch throws', async () => {
    const fetchSpy = async () => {
      throw new Error('boom');
    };
    const result = await verifyTurnstile('tok', 'secret', undefined, fetchSpy as unknown as typeof fetch);
    expect(result.ok).toBe(false);
    expect(result.transportError).toBe(true);
  });

  it('POSTs the expected form body to the Cloudflare endpoint', async () => {
    let captured: { url?: string; init?: RequestInit } = {};
    const fetchSpy = async (url: string, init?: RequestInit) => {
      captured = { url, init };
      return okResponse({ success: true });
    };
    await verifyTurnstile('tok-123', 'secret-abc', '8.8.8.8', fetchSpy as unknown as typeof fetch);
    expect(captured.url).toBe('https://challenges.cloudflare.com/turnstile/v0/siteverify');
    const body = captured.init?.body as URLSearchParams;
    expect(body.get('secret')).toBe('secret-abc');
    expect(body.get('response')).toBe('tok-123');
    expect(body.get('remoteip')).toBe('8.8.8.8');
  });
});

import { stripOperationalFields } from './_contact-helpers';

describe('stripOperationalFields', () => {
  it('removes website and cfTurnstileToken, keeps everything else', () => {
    const input = {
      Name: 'A',
      Email: 'a@b.co',
      website: 'spam',
      cfTurnstileToken: 'abc',
      utm_source: 'x',
    };
    const result = stripOperationalFields(input);
    expect(result).toEqual({ Name: 'A', Email: 'a@b.co', utm_source: 'x' });
  });

  it('is a no-op when neither field is present', () => {
    const input = { Name: 'A', Email: 'a@b.co' };
    expect(stripOperationalFields(input)).toEqual(input);
  });
});

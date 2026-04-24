import type { APIRoute } from 'astro';
import { isHoneypotFilled, verifyTurnstile, stripOperationalFields } from './_contact-helpers';

export const prerender = false;

interface ContactFormData {
  Name?: string;
  Email?: string;
  Phone?: string;
  Country?: string;
  Company?: string;
  'how-hear'?: string;
  'Use-Case'?: string;
  formType?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  /** Path + search of the page the submission came from (e.g. "/zh-Hant/about"). */
  page?: string;
  /** UI locale the form was rendered in ("en" or "zh-Hant"). */
  locale?: string;
  /** Honeypot — must be empty. */
  website?: string;
  /** Cloudflare Turnstile token. */
  cfTurnstileToken?: string;
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const GET: APIRoute = () =>
  new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json', Allow: 'POST' },
  });

export const POST: APIRoute = async ({ request, clientAddress }) => {
  let data: ContactFormData;

  const contentType = request.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    data = (await request.json()) as ContactFormData;
  } else if (
    contentType.includes('application/x-www-form-urlencoded') ||
    contentType.includes('multipart/form-data')
  ) {
    const formData = await request.formData();
    data = Object.fromEntries(formData.entries()) as ContactFormData;
  } else {
    return json({ error: 'Unsupported content type' }, 415);
  }

  // 1. Honeypot — silent 200 to avoid tipping off bots.
  if (isHoneypotFilled(data as Record<string, unknown>)) {
    const emailDomain = typeof data.Email === 'string' && data.Email.includes('@')
      ? data.Email.split('@')[1]
      : 'unknown';
    console.info('[contact-form] spam: honeypot', { emailDomain, page: data.page });
    return json({ success: true }, 200);
  }

  // 2. Turnstile verify (env-gated).
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (turnstileSecret) {
    const result = await verifyTurnstile(data.cfTurnstileToken, turnstileSecret, clientAddress);
    if (!result.ok) {
      if (result.transportError) {
        console.error('[contact-form] turnstile verify error:', result.errorCodes);
        return json({ error: 'Please retry in a moment.' }, 503);
      }
      console.info('[contact-form] reject: turnstile', result.errorCodes);
      return json({ error: 'Verification failed, please retry.' }, 400);
    }
  } else if (import.meta.env.PROD) {
    console.error('[contact-form] missing TURNSTILE_SECRET_KEY in production');
    return json({ error: 'Please retry in a moment.' }, 503);
  } else {
    console.warn('[contact-form] TURNSTILE_SECRET_KEY unset — skipping verification (dev only)');
  }

  // 3. Existing field validation.
  if (!data.Email) {
    return json({ error: 'Email is required.' }, 400);
  }
  if (!data.formType && !data.Name) {
    return json({ error: 'Name and Email are required.' }, 400);
  }

  // 4. Forward to webhook (strip operational fields).
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  const forwardBody = stripOperationalFields(data as Record<string, unknown>);
  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...forwardBody,
          submittedAt: new Date().toISOString(),
          source: 'authgear-website-contact',
        }),
      });
      if (!res.ok) {
        console.error('Webhook delivery failed:', res.status, await res.text());
      }
    } catch (err) {
      console.error('Webhook error:', err);
    }
  } else {
    console.info('[contact-form]', JSON.stringify(forwardBody));
  }

  return json({ success: true }, 200);
};

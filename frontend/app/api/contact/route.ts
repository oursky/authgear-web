import { type NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
  Name?: string;
  Email?: string;
  Phone?: string;
  Country?: string;
  Company?: string;
  'how-hear'?: string;
  'Use-Case'?: string;
  // UTM parameters
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

/**
 * POST /api/contact
 *
 * Handles form submissions from the site.
 * Replaces Webflow's built-in form backend.
 *
 * Configure destination by setting environment variables:
 *   CONTACT_WEBHOOK_URL  – POST the payload to this URL (e.g. HubSpot, Zapier, n8n)
 *   CONTACT_EMAIL_TO     – Send an email notification (requires SMTP env vars)
 *
 * SMTP env vars (optional):
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM
 */
export async function POST(request: NextRequest) {
  let data: ContactFormData;

  const contentType = request.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    data = (await request.json()) as ContactFormData;
  } else if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
    const formData = await request.formData();
    data = Object.fromEntries(formData.entries()) as ContactFormData;
  } else {
    return NextResponse.json({ error: 'Unsupported content type' }, { status: 415 });
  }

  // Basic validation
  if (!data.Name || !data.Email) {
    return NextResponse.json({ error: 'Name and Email are required.' }, { status: 400 });
  }

  // Forward to webhook if configured
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
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
  }

  // Log in production if no webhook is configured
  if (!webhookUrl) {
    console.info('[contact-form]', JSON.stringify(data));
  }

  return NextResponse.json({ success: true });
}

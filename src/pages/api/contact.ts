import type { APIRoute } from 'astro';

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
  /** Path + search of the page the submission came from (e.g. "/zh-TW/about"). */
  page?: string;
  /** UI locale the form was rendered in ("en" or "zh-TW"). */
  locale?: string;
}

export const GET: APIRoute = () =>
  new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json', Allow: 'POST' },
  });

export const POST: APIRoute = async ({ request }) => {
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
    return new Response(JSON.stringify({ error: 'Unsupported content type' }), {
      status: 415,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!data.Email) {
    return new Response(JSON.stringify({ error: 'Email is required.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  // Download / lead-gen forms may submit Email only. The full contact form
  // still supplies both Name + Email; we require Name only for that type.
  if (!data.formType && !data.Name) {
    return new Response(JSON.stringify({ error: 'Name and Email are required.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

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
  } else {
    console.info('[contact-form]', JSON.stringify(data));
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

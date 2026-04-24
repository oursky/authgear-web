import { test, expect } from '@playwright/test';

// Cloudflare's always-pass test secret accepts any token string.
const VALID_TOKEN = 'test-ok';

test.describe('/api/contact', () => {
  test('POST with valid JSON returns 200 {success:true}', async ({ request }) => {
    const resp = await request.post('/api/contact', {
      data: {
        Name: 'Test User',
        Email: 'test@example.com',
        Company: 'Example Co',
        'how-hear': 'organic-search',
        cfTurnstileToken: VALID_TOKEN,
      },
      headers: { 'Content-Type': 'application/json', Origin: 'http://localhost' },
    });
    expect(resp.status()).toBe(200);
    expect(await resp.json()).toEqual({ success: true });
  });

  test('POST missing Name returns 400', async ({ request }) => {
    const resp = await request.post('/api/contact', {
      data: { Email: 'x@y.z', cfTurnstileToken: VALID_TOKEN },
      headers: { 'Content-Type': 'application/json', Origin: 'http://localhost' },
    });
    expect(resp.status()).toBe(400);
  });

  test('POST missing Email returns 400', async ({ request }) => {
    const resp = await request.post('/api/contact', {
      data: { Name: 'X', cfTurnstileToken: VALID_TOKEN },
      headers: { 'Content-Type': 'application/json', Origin: 'http://localhost' },
    });
    expect(resp.status()).toBe(400);
  });

  test('POST with unsupported content-type returns 415', async ({ request }) => {
    const resp = await request.post('/api/contact', {
      data: 'plain text',
      headers: { 'Content-Type': 'text/plain', Origin: 'http://localhost' },
    });
    expect(resp.status()).toBe(415);
  });

  test('POST with form-urlencoded returns 200', async ({ request }) => {
    const resp = await request.post('/api/contact', {
      form: {
        Name: 'Form User',
        Email: 'form@example.com',
        Company: 'Example',
        'how-hear': 'github',
        cfTurnstileToken: VALID_TOKEN,
      },
      headers: { Origin: 'http://localhost' },
    });
    expect(resp.status()).toBe(200);
  });

  test('GET returns 405', async ({ request }) => {
    const resp = await request.get('/api/contact');
    expect(resp.status()).toBe(405);
  });
});

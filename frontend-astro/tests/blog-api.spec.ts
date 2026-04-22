import { test, expect } from '@playwright/test';

test.describe('/api/blog-posts', () => {
  test('GET with no params returns first page of en posts', async ({ request }) => {
    const resp = await request.get('/api/blog-posts');
    expect(resp.status()).toBe(200);
    const json = await resp.json();
    expect(Array.isArray(json.posts)).toBe(true);
    expect(typeof json.hasMore).toBe('boolean');
  });

  test('GET with locale=zh-TW returns zh-TW posts', async ({ request }) => {
    const resp = await request.get('/api/blog-posts?locale=zh-TW');
    expect(resp.status()).toBe(200);
    const json = await resp.json();
    expect(Array.isArray(json.posts)).toBe(true);
  });

  test('GET with invalid offset returns 400', async ({ request }) => {
    const resp = await request.get('/api/blog-posts?offset=-1');
    expect(resp.status()).toBe(400);
  });

  test('GET with non-page-aligned offset returns 400', async ({ request }) => {
    const resp = await request.get('/api/blog-posts?offset=3');
    expect(resp.status()).toBe(400);
  });
});

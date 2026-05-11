import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ url }) => {
  const q = url.searchParams.get('q')?.trim() ?? '';
  if (!q) {
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  }

  // Server-side token. In dev/runtime, depending on adapter, the value may be
  // available from either `process.env` or `import.meta.env`.
  const tokenFromProcess = process.env.LOGO_DEV_BRAND_SEARCH_TOKEN ?? '';
  const tokenFromMeta = (import.meta as any).env?.LOGO_DEV_BRAND_SEARCH_TOKEN ?? '';
  const token = tokenFromProcess || tokenFromMeta;
  if (!token) {
    return new Response(
      JSON.stringify({
        error: 'missing_token',
        hasProcessEnv: Boolean(tokenFromProcess),
        hasImportMetaEnv: Boolean(tokenFromMeta),
      }),
      {
      status: 401,
      headers: { 'content-type': 'application/json' },
      },
    );
  }

  const upstream = new URL('https://api.logo.dev/search');
  upstream.searchParams.set('q', q);
  // Logo.dev currently accepts `strategy=suggest|match`.
  // Older docs referenced `typeahead`; map it to `suggest`.
  const rawStrategy = (url.searchParams.get('strategy') ?? 'suggest').trim();
  const strategy =
    rawStrategy === 'typeahead' ? 'suggest' : rawStrategy === '' ? 'suggest' : rawStrategy;
  upstream.searchParams.set('strategy', strategy);

  const resp = await fetch(upstream.toString(), {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });

  const body = await resp.text();
  return new Response(body, {
    status: resp.status,
    headers: { 'content-type': resp.headers.get('content-type') ?? 'application/json' },
  });
};


import type { APIRoute } from 'astro';

const ALLOWED_HOSTS = new Set([
  'authgear.com',
  'www.authgear.com',
  'localhost:4321',
  '127.0.0.1:4321',
]);
const ALLOWED_SUFFIXES = ['.authgear.com', '.netlify.app'];

function isAllowedOrigin(originOrReferer: string | null): boolean {
  if (!originOrReferer) return false;
  try {
    const host = new URL(originOrReferer).host.toLowerCase();
    if (ALLOWED_HOSTS.has(host)) return true;
    return ALLOWED_SUFFIXES.some((s) => host.endsWith(s));
  } catch {
    return false;
  }
}

export const GET: APIRoute = async ({ request, url }) => {
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  if (!isAllowedOrigin(origin) && !isAllowedOrigin(referer)) {
    return new Response(JSON.stringify({ error: 'forbidden' }), {
      status: 403,
      headers: { 'content-type': 'application/json' },
    });
  }

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
  const headers: Record<string, string> = {
    'content-type': resp.headers.get('content-type') ?? 'application/json',
  };
  if (resp.ok) {
    headers['cache-control'] = 'public, max-age=300, s-maxage=3600';
  }
  return new Response(body, { status: resp.status, headers });
};


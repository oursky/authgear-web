import type { NextConfig } from 'next';
import type { RemotePattern } from 'next/dist/shared/lib/image-config';

function strapiUploadPatterns(urlStr: string | undefined): RemotePattern[] {
  if (!urlStr) return [];
  try {
    const u = new URL(urlStr);
    const protocol = u.protocol.replace(/:$/, '') as 'http' | 'https';
    // Omit `port` so the pattern matches Strapi on any port (1337, etc.)
    return [{ protocol, hostname: u.hostname, pathname: '/uploads/**' }];
  } catch {
    return [];
  }
}

const STRAPI_URL = process.env.STRAPI_URL ?? 'http://localhost:1337';
const NEXT_PUBLIC_STRAPI = process.env.NEXT_PUBLIC_STRAPI_URL;

const strapiPatterns: RemotePattern[] = [];
const seenHostProto = new Set<string>();
for (const p of [...strapiUploadPatterns(STRAPI_URL), ...strapiUploadPatterns(NEXT_PUBLIC_STRAPI)]) {
  const key = `${p.protocol}://${p.hostname}`;
  if (seenHostProto.has(key)) continue;
  seenHostProto.add(key);
  strapiPatterns.push(p);
}

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    // Required when Strapi (or any image URL) resolves to 127.0.0.1 / private IPs — otherwise the
    // optimizer rejects the URL with "url parameter is not allowed" and images appear broken.
    dangerouslyAllowLocalIP: true,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      ...strapiPatterns,
      { protocol: 'http', hostname: 'localhost', pathname: '/uploads/**' },
      { protocol: 'http', hostname: '127.0.0.1', pathname: '/uploads/**' },
      // Webflow CDN (legacy rich text / assets)
      { protocol: 'https', hostname: 'uploads-ssl.webflow.com', pathname: '/**' },
      { protocol: 'https', hostname: 'cdn.prod.website-files.com', pathname: '/**' },
    ],
  },

  async rewrites() {
    return [
      // Redirect /blog → canonical blog URL (alias)
      { source: '/blog/:slug', destination: '/blog/:slug' },
    ];
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};

export default nextConfig;

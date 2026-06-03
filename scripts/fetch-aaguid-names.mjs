// scripts/fetch-aaguid-names.mjs
//
// One-shot: snapshot the community-maintained AAGUID → authenticator-name
// mapping (passkeydeveloper/passkey-authenticator-aaguids) into the
// passkey-demo widget. We bundle a static snapshot — no runtime fetching.
// Re-run manually to refresh; commit the regenerated JSON.
//
// Usage: node scripts/fetch-aaguid-names.mjs
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const SOURCE =
  'https://raw.githubusercontent.com/passkeydeveloper/passkey-authenticator-aaguids/main/aaguid.json';
const OUT = fileURLToPath(
  new URL('../src/components/widgets/passkey-demo/lib/aaguid-names.json', import.meta.url),
);

const res = await fetch(SOURCE);
if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
const full = await res.json();

// The upstream file maps aaguid → { name, icon_dark, icon_light }. The icons
// are large data URIs — keep only the names to stay bundle-friendly.
const names = Object.fromEntries(
  Object.entries(full)
    .map(([aaguid, meta]) => [aaguid, meta.name])
    .sort(([a], [b]) => a.localeCompare(b)),
);

await mkdir(dirname(OUT), { recursive: true });
await writeFile(OUT, JSON.stringify(names, null, 2) + '\n');
console.log(`Wrote ${Object.keys(names).length} AAGUID names to ${OUT}`);

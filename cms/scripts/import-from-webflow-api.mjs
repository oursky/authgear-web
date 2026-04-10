/**
 * Webflow API v2 → Strapi Import Script
 *
 * Reads all CMS content from the Webflow REST API and imports it into Strapi,
 * handling pagination, media uploads, and relation ID mapping automatically.
 *
 * Usage:
 *   node scripts/import-from-webflow-api.mjs [--dry-run] [--collection <name>]
 *
 * Required environment variables:
 *   WEBFLOW_API_TOKEN  — Webflow v2 API token (Dashboard → Account → Integrations → API Access)
 *   WEBFLOW_SITE_ID    — Webflow site ID (Dashboard → Project Settings → General)
 *   STRAPI_ADMIN_TOKEN — Strapi full-access API token (Admin → Settings → API Tokens)
 *   STRAPI_URL         — Strapi base URL (default: http://localhost:1337)
 *
 * Optional flags:
 *   --dry-run          — fetch from Webflow but skip all writes to Strapi
 *   --collection <n>   — import only this one collection (e.g. blog-posts)
 */

const WEBFLOW_TOKEN = process.env.WEBFLOW_API_TOKEN ?? '';
const WEBFLOW_SITE_ID = process.env.WEBFLOW_SITE_ID ?? '';
const STRAPI_URL = process.env.STRAPI_URL ?? 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_ADMIN_TOKEN ?? '';

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const INSPECT = args.includes('--inspect'); // print raw Webflow fieldData keys for first item per collection
const FIX_DATES = args.includes('--fix-dates'); // patch publishedAtOverride on existing Strapi entries only
const ONLY_COLLECTION = args.includes('--collection')
  ? args[args.indexOf('--collection') + 1]
  : null;

// ── Validation ────────────────────────────────────────────────────────────────

if (!WEBFLOW_TOKEN) {
  console.error('Error: WEBFLOW_API_TOKEN env var is required.');
  process.exit(1);
}
if (!WEBFLOW_SITE_ID) {
  console.error('Error: WEBFLOW_SITE_ID env var is required.');
  process.exit(1);
}
if (!STRAPI_TOKEN && !DRY_RUN) {
  console.error('Error: STRAPI_ADMIN_TOKEN env var is required (or pass --dry-run).');
  process.exit(1);
}

if (DRY_RUN) console.log('[dry-run] No writes will be made to Strapi.\n');

// ── Webflow API helpers ───────────────────────────────────────────────────────

const WEBFLOW_BASE = 'https://api.webflow.com/v2';

async function webflowGet(path) {
  const res = await fetch(`${WEBFLOW_BASE}${path}`, {
    headers: {
      Authorization: `Bearer ${WEBFLOW_TOKEN}`,
      Accept: 'application/json',
    },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Webflow GET ${path} → ${res.status}: ${body}`);
  }
  return res.json();
}

/** Fetch all pages of a Webflow collection (max 100 per page). */
async function webflowListAllItems(collectionId) {
  const items = [];
  let offset = 0;
  const limit = 100;

  while (true) {
    const data = await webflowGet(
      `/collections/${collectionId}/items?limit=${limit}&offset=${offset}`
    );
    const page = data.items ?? [];
    items.push(...page);

    const total = data.pagination?.total ?? page.length;
    offset += page.length;
    if (offset >= total || page.length === 0) break;
  }

  return items;
}

// ── Strapi API helpers ────────────────────────────────────────────────────────

async function strapiPost(endpoint, data) {
  if (DRY_RUN) {
    console.log(`  [dry-run] POST /api/${endpoint}`, JSON.stringify(data).slice(0, 120));
    return { data: { documentId: `dry-run-${Date.now()}-${Math.random()}` } };
  }

  const res = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
    body: JSON.stringify({ data }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(json));
  return json;
}

async function strapiPut(endpoint, documentId, data) {
  if (DRY_RUN) {
    console.log(`  [dry-run] PUT /api/${endpoint}/${documentId}`, JSON.stringify(data).slice(0, 120));
    return { data: { documentId } };
  }

  const res = await fetch(`${STRAPI_URL}/api/${endpoint}/${documentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
    body: JSON.stringify({ data }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(json));
  return json;
}

/** Find an existing Strapi entry by slug; returns documentId or null. */
async function strapiGetDocumentId(endpoint, slug) {
  const res = await fetch(
    `${STRAPI_URL}/api/${endpoint}?filters%5Bslug%5D%5B%24eq%5D=${encodeURIComponent(slug)}&fields=documentId`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
    }
  );
  const json = await res.json();
  if (!res.ok) return null;
  const entries = json?.data ?? [];
  return entries[0]?.documentId ?? null;
}

/**
 * Download an image from a URL and upload it to Strapi's media library.
 * Returns the Strapi media ID, or null if the URL is empty/missing.
 */
async function uploadImageToStrapi(imageUrl, filename) {
  if (!imageUrl) return null;

  if (DRY_RUN) {
    console.log(`  [dry-run] UPLOAD image: ${imageUrl}`);
    return 1;
  }

  try {
    // Download the image
    const imgRes = await fetch(imageUrl);
    if (!imgRes.ok) {
      console.warn(`  Warning: could not download image ${imageUrl} (${imgRes.status})`);
      return null;
    }

    const arrayBuffer = await imgRes.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const contentType = imgRes.headers.get('content-type') ?? 'image/jpeg';

    // Derive a safe filename from the URL if not provided
    const safeName = filename ?? imageUrl.split('/').pop()?.split('?')[0] ?? 'image.jpg';

    const form = new FormData();
    form.append('files', new Blob([buffer], { type: contentType }), safeName);

    const uploadRes = await fetch(`${STRAPI_URL}/api/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
      body: form,
    });

    const uploadJson = await uploadRes.json();
    if (!uploadRes.ok) {
      console.warn(`  Warning: Strapi upload failed for ${imageUrl}:`, JSON.stringify(uploadJson));
      return null;
    }

    // Strapi returns an array of uploaded files
    return Array.isArray(uploadJson) ? uploadJson[0]?.id : uploadJson?.id ?? null;
  } catch (err) {
    console.warn(`  Warning: image upload error for ${imageUrl}:`, err.message);
    return null;
  }
}

// ── Field mapping ─────────────────────────────────────────────────────────────
//
// Each entry describes how to map a single Webflow fieldData key to a Strapi field.
// Types:
//   'text'     — plain string copy
//   'richtext' — HTML string copy
//   'image'    — Webflow image object ({ url, alt }); needs upload
//   'relation' — Webflow reference item ID; needs ID map lookup
//
// Webflow image field values look like: { url: "https://...", alt: "..." }
// Webflow reference field values are plain strings (the referenced item's Webflow ID).

const COLLECTION_CONFIGS = {
  'blog-categories': {
    webflowSlug: 'post-category',
    strapiEndpoint: 'blog-categories',
    fields: [
      { webflow: 'name', strapi: 'name', type: 'text' },
      { webflow: 'slug', strapi: 'slug', type: 'text' },
    ],
    imageFields: [],
    relationFields: [],
  },

  'integration-categories': {
    webflowSlug: 'integration-category',
    strapiEndpoint: 'integration-categories',
    fields: [
      { webflow: 'name', strapi: 'name', type: 'text' },
      { webflow: 'slug', strapi: 'slug', type: 'text' },
    ],
    imageFields: [],
    relationFields: [],
  },

  'team-members': {
    webflowSlug: 'team',
    strapiEndpoint: 'team-members',
    fields: [
      { webflow: 'name', strapi: 'name', type: 'text' },
      { webflow: 'slug', strapi: 'slug', type: 'text' },
      { webflow: 'team-job-title', strapi: 'role', type: 'text' },
      { webflow: 'team-bio-summary', strapi: 'bio', type: 'text' },
    ],
    imageFields: [{ webflow: 'team-profile-picture', strapi: 'photo' }],
    relationFields: [],
  },

  'blog-posts': {
    webflowSlug: 'post',
    strapiEndpoint: 'blog-posts',
    // item.lastPublished (top-level Webflow field, not in fieldData) → publishedAtOverride
    publishDateField: 'publishedAtOverride',
    fields: [
      { webflow: 'name', strapi: 'title', type: 'text' },
      { webflow: 'slug', strapi: 'slug', type: 'text' },
      { webflow: 'blog-post-excerpt', strapi: 'excerpt', type: 'text' },
      { webflow: 'blog-post-content', strapi: 'body', type: 'richtext' },
    ],
    imageFields: [{ webflow: 'blog-post-main-image', strapi: 'thumbnail' }],
    relationFields: [
      { webflow: 'blog-post-category', strapi: 'category', idMapKey: 'blog-categories' },
    ],
  },

  'integrations': {
    webflowSlug: 'integrations',
    strapiEndpoint: 'integrations',
    fields: [
      { webflow: 'name', strapi: 'name', type: 'text' },
      { webflow: 'slug', strapi: 'slug', type: 'text' },
      { webflow: 'integration-about-excerpt', strapi: 'description', type: 'text' },
    ],
    imageFields: [
      { webflow: 'integration-icon', strapi: 'logo' },
    ],
    relationFields: [
      { webflow: 'integration-category', strapi: 'category', idMapKey: 'integration-categories' },
    ],
  },

  'customer-stories': {
    webflowSlug: 'customer-stories',
    strapiEndpoint: 'customer-stories',
    fields: [
      { webflow: 'name', strapi: 'title', type: 'text' },
      { webflow: 'slug', strapi: 'slug', type: 'text' },
      { webflow: 'excerpt', strapi: 'excerpt', type: 'text' },
      { webflow: 'content', strapi: 'content', type: 'richtext' },
      { webflow: 'customer-name', strapi: 'companyIndustry', type: 'text' },
    ],
    imageFields: [
      { webflow: 'logo', strapi: 'companyLogo' },
      { webflow: 'featured-image', strapi: 'coverImage' },
    ],
    relationFields: [],
  },

  'login-gallery-items': {
    webflowSlug: 'login-gallery',
    strapiEndpoint: 'login-gallery-items',
    fields: [
      { webflow: 'name', strapi: 'title', type: 'text' },
      { webflow: 'slug', strapi: 'slug', type: 'text' },
      { webflow: 'post-body', strapi: 'body', type: 'richtext' },
    ],
    imageFields: [{ webflow: 'main-image', strapi: 'previewImage' }],
    relationFields: [],
  },

  'whats-new-items': {
    webflowSlug: 'whats-new',
    strapiEndpoint: 'whats-new-items',
    fields: [
      { webflow: 'name', strapi: 'title', type: 'text' },
      { webflow: 'slug', strapi: 'slug', type: 'text' },
      { webflow: 'blog-post-excerpt', strapi: 'excerpt', type: 'text' },
      { webflow: 'blog-post-content', strapi: 'body', type: 'richtext' },
    ],
    imageFields: [{ webflow: 'blog-post-featured-image', strapi: 'coverImage' }],
    relationFields: [],
  },
};

// Import order: independent collections first, then those with relations
const IMPORT_ORDER = [
  'blog-categories',
  'integration-categories',
  'team-members',
  'blog-posts',
  'integrations',
  'customer-stories',
  'login-gallery-items',
  'whats-new-items',
];

// ── Phase 1 — Discovery ───────────────────────────────────────────────────────

async function discoverCollections() {
  console.log('Phase 1 — Discovering Webflow collections…');
  const data = await webflowGet(`/sites/${WEBFLOW_SITE_ID}/collections`);
  const collections = data.collections ?? [];

  // Build slug → collectionId map
  const map = {};
  for (const col of collections) {
    map[col.slug] = col.id;
    console.log(`  Found: ${col.displayName} (slug: ${col.slug}, id: ${col.id})`);
  }

  console.log(`  Total collections found: ${collections.length}\n`);
  return map;
}

// ── Phase 2 — Per-collection import ──────────────────────────────────────────

/**
 * Import a single Webflow collection into Strapi.
 *
 * @param {string} collectionSlug   - Webflow collection slug (key in COLLECTION_CONFIGS)
 * @param {string} webflowColId     - Webflow collection ID from discovery
 * @param {object} config           - Entry from COLLECTION_CONFIGS
 * @param {object} idMaps           - Map of collectionSlug → { webflowId → strapiDocumentId }
 * @returns {{ ok: number, fail: number }}
 */
async function importCollection(collectionSlug, webflowColId, config, idMaps) {
  console.log(`\nImporting: ${collectionSlug} (Webflow ID: ${webflowColId})`);

  const items = await webflowListAllItems(webflowColId);
  console.log(`  Fetched ${items.length} items from Webflow`);

  if (INSPECT && items.length > 0) {
    console.log('  [inspect] First item fieldData keys:', Object.keys(items[0].fieldData ?? {}));
    console.log('  [inspect] First item fieldData sample:', JSON.stringify(items[0].fieldData, null, 2).split('\n').slice(0, 30).join('\n'));
  }

  // Initialize the ID map for this collection
  idMaps[collectionSlug] = {};

  let ok = 0;
  let fail = 0;
  let skipped = 0;

  for (const item of items) {
    // Skip archived items
    if (item.isArchived) {
      skipped++;
      continue;
    }

    const fieldData = item.fieldData ?? {};

    try {
      const strapiData = {};

      // Map plain text / richtext fields
      for (const { webflow, strapi } of config.fields) {
        const val = fieldData[webflow];
        if (val !== undefined && val !== null && val !== '') {
          strapiData[strapi] = val;
        }
      }

      // Map and upload image fields
      for (const { webflow, strapi } of config.imageFields) {
        const imgField = fieldData[webflow];
        if (imgField) {
          // Webflow image fields can be an object { url, alt } or a plain URL string
          const imgUrl = typeof imgField === 'object' ? imgField.url : imgField;
          const imgAlt = typeof imgField === 'object' ? imgField.alt : null;
          const filename = imgUrl?.split('/').pop()?.split('?')[0];

          const mediaId = await uploadImageToStrapi(imgUrl, filename);
          if (mediaId !== null) {
            strapiData[strapi] = mediaId;
          }
        }
      }

      // Use Webflow item.lastPublished as the publish date fallback
      if (config.publishDateField && !strapiData[config.publishDateField]) {
        const date = item.lastPublished ?? item.createdOn;
        if (date) strapiData[config.publishDateField] = date;
      }

      // Resolve relation fields using ID maps from previously imported collections
      for (const { webflow, strapi, idMapKey } of config.relationFields) {
        const webflowRefId = fieldData[webflow];
        if (webflowRefId) {
          const parentMap = idMaps[idMapKey] ?? {};
          const strapiId = parentMap[webflowRefId];
          if (strapiId) {
            strapiData[strapi] = strapiId;
          } else {
            console.warn(
              `  Warning: no Strapi ID found for ${idMapKey} Webflow ID "${webflowRefId}" ` +
              `(item: ${fieldData.name ?? item.id})`
            );
          }
        }
      }

      // POST to Strapi
      const result = await strapiPost(config.strapiEndpoint, strapiData);
      const strapiDocumentId = result?.data?.documentId ?? result?.data?.id;

      // Record ID mapping for dependent collections
      idMaps[collectionSlug][item.id] = strapiDocumentId;

      ok++;
      process.stdout.write('.');
    } catch (err) {
      fail++;
      console.error(
        `\n  Failed to import item "${fieldData.name ?? item.id}": ${err.message}`
      );
    }
  }

  console.log(
    `\n  Done: ${ok} imported, ${fail} failed, ${skipped} archived/skipped`
  );

  return { ok, fail, skipped };
}

// ── Fix-dates mode ────────────────────────────────────────────────────────────

/**
 * Patch publishedAtOverride on already-imported Strapi entries using Webflow's
 * lastPublished date. Matches entries by slug. Safe to run multiple times.
 */
async function fixDatesForCollection(collectionSlug, webflowColId, config) {
  if (!config.publishDateField) {
    console.log(`  Skipping ${collectionSlug} — no publishDateField configured.`);
    return { ok: 0, fail: 0 };
  }

  console.log(`\nFix dates: ${collectionSlug}`);
  const items = await webflowListAllItems(webflowColId);
  console.log(`  Fetched ${items.length} Webflow items`);

  let ok = 0, fail = 0, skipped = 0;

  for (const item of items) {
    if (item.isArchived) { skipped++; continue; }

    const date = item.lastPublished ?? item.createdOn;
    const slug = item.fieldData?.slug;
    if (!date || !slug) { skipped++; continue; }

    try {
      const documentId = await strapiGetDocumentId(config.strapiEndpoint, slug);
      if (!documentId) {
        console.warn(`  Warning: Strapi entry not found for slug "${slug}"`);
        skipped++;
        continue;
      }

      await strapiPut(config.strapiEndpoint, documentId, {
        [config.publishDateField]: date,
      });

      ok++;
      process.stdout.write('.');
    } catch (err) {
      fail++;
      console.error(`\n  Failed to patch "${slug}": ${err.message}`);
    }
  }

  console.log(`\n  Done: ${ok} patched, ${fail} failed, ${skipped} skipped`);
  return { ok, fail };
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function run() {
  console.log(FIX_DATES ? '=== Webflow → Strapi Date Fix ===' : '=== Webflow → Strapi Import ===');
  console.log(`  Webflow site: ${WEBFLOW_SITE_ID}`);
  console.log(`  Strapi URL:   ${STRAPI_URL}`);
  if (ONLY_COLLECTION) console.log(`  Only collection: ${ONLY_COLLECTION}`);
  if (FIX_DATES) console.log('  Mode: --fix-dates (patch publishedAtOverride only, no re-import)');
  console.log('');

  // Phase 1 — discover Webflow collection IDs
  const collectionIdMap = await discoverCollections();

  // ── Fix-dates mode: patch only, no re-import ──────────────────────────────
  if (FIX_DATES) {
    console.log('Phase 2 — Patching publish dates…');
    const summary = [];
    const cols = ONLY_COLLECTION ? [ONLY_COLLECTION] : IMPORT_ORDER;

    for (const slug of cols) {
      const config = COLLECTION_CONFIGS[slug];
      const webflowSlug = config?.webflowSlug ?? slug;
      const webflowColId = collectionIdMap[webflowSlug];
      if (!webflowColId) {
        console.warn(`\nWarning: "${webflowSlug}" not found in Webflow site, skipping.`);
        continue;
      }
      const result = await fixDatesForCollection(slug, webflowColId, config);
      summary.push({ slug, ...result });
    }

    console.log('\n=== Date Fix Summary ===');
    let total = 0;
    for (const { slug, ok, fail } of summary) {
      console.log(`  ${slug.padEnd(30)} ${String(ok).padStart(4)} patched, ${String(fail ?? 0).padStart(3)} failed`);
      total += ok;
    }
    console.log(`\n  Total patched: ${total}`);
    return;
  }

  // Phase 2 — import in dependency order
  console.log('Phase 2 — Importing collections…');

  // idMaps[collectionSlug] = { webflowItemId → strapiDocumentId }
  const idMaps = {};

  const summary = [];

  const collectionsToImport = ONLY_COLLECTION
    ? IMPORT_ORDER.filter((s) => s === ONLY_COLLECTION)
    : IMPORT_ORDER;

  if (ONLY_COLLECTION && collectionsToImport.length === 0) {
    console.error(
      `Error: unknown collection "${ONLY_COLLECTION}". ` +
      `Available: ${IMPORT_ORDER.join(', ')}`
    );
    process.exit(1);
  }

  for (const slug of collectionsToImport) {
    const config = COLLECTION_CONFIGS[slug];
    const webflowSlug = config.webflowSlug ?? slug;
    const webflowColId = collectionIdMap[webflowSlug];

    if (!webflowColId) {
      console.warn(
        `\nWarning: Webflow collection "${webflowSlug}" not found in site. ` +
        `Available slugs: ${Object.keys(collectionIdMap).join(', ')}`
      );
      console.warn(
        `  If the Webflow collection slug differs, update webflowSlug in COLLECTION_CONFIGS["${slug}"].`
      );
      summary.push({ slug, ok: 0, fail: 0, skipped: 0, notFound: true });
      continue;
    }

    const result = await importCollection(slug, webflowColId, config, idMaps);
    summary.push({ slug, ...result, notFound: false });
  }

  // Final summary
  console.log('\n=== Summary ===');
  let totalOk = 0, totalFail = 0;
  for (const { slug, ok, fail, skipped, notFound } of summary) {
    if (notFound) {
      console.log(`  ${slug.padEnd(30)} NOT FOUND in Webflow`);
    } else {
      totalOk += ok;
      totalFail += fail;
      const status = fail > 0 ? '⚠' : '✓';
      console.log(
        `  ${status} ${slug.padEnd(28)} ${String(ok).padStart(4)} imported, ` +
        `${String(fail).padStart(3)} failed, ${String(skipped).padStart(3)} skipped`
      );
    }
  }
  console.log(`\n  Total: ${totalOk} imported, ${totalFail} failed`);

  if (totalFail > 0) process.exit(1);
}

run().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});

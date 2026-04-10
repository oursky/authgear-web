/**
 * Webflow CSV → Strapi Import Script
 *
 * Usage:
 *   node scripts/import-from-webflow-csv.mjs --collection blog-posts --file ./data/blog-posts.csv
 *
 * Steps:
 *   1. In Webflow Designer, open CMS → select a Collection → click Export (CSV)
 *   2. Save the CSV file into the cms/data/ directory
 *   3. Start Strapi: npm run develop
 *   4. Generate an API token in Strapi Admin → Settings → API Tokens
 *   5. Set env: export STRAPI_ADMIN_TOKEN=<your-token>
 *   6. Run this script for each collection
 *
 * Supported collections:
 *   blog-posts, blog-categories, customer-stories, integrations,
 *   integration-categories, login-gallery-items, whats-new-items, team-members
 */

import { createReadStream } from 'fs';
import { parse } from 'csv-parse';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const STRAPI_URL = process.env.STRAPI_URL ?? 'http://localhost:1337';
const TOKEN = process.env.STRAPI_ADMIN_TOKEN ?? '';

if (!TOKEN) {
  console.error('Error: STRAPI_ADMIN_TOKEN env var is required.');
  console.error('Generate one at http://localhost:1337/admin → Settings → API Tokens.');
  process.exit(1);
}

const args = process.argv.slice(2);
const collectionArg = args[args.indexOf('--collection') + 1];
const fileArg = args[args.indexOf('--file') + 1];

if (!collectionArg || !fileArg) {
  console.error('Usage: node import-from-webflow-csv.mjs --collection <name> --file <path>');
  process.exit(1);
}

/**
 * Map Webflow CSV column names to Strapi field names per collection.
 * Adjust these mappings to match your exported Webflow CSV headers.
 */
const FIELD_MAPS = {
  'blog-posts': {
    'Name': 'title',
    'Slug': 'slug',
    'Post Summary': 'excerpt',
    'Post Body': 'body',
    'Published On': 'publishedAtOverride',
  },
  'blog-categories': {
    'Name': 'name',
    'Slug': 'slug',
  },
  'customer-stories': {
    'Name': 'title',
    'Slug': 'slug',
    'Case Study Excerpt': 'excerpt',
    'Case Study Rich Text': 'content',
    'Company Name': 'companyIndustry',
  },
  'integrations': {
    'Name': 'name',
    'Slug': 'slug',
    'Integration Description': 'description',
    'Integration Rich Text': 'body',
  },
  'integration-categories': {
    'Name': 'name',
    'Slug': 'slug',
  },
  'login-gallery-items': {
    'Name': 'title',
    'Slug': 'slug',
    'Description': 'description',
    'Body': 'body',
  },
  'whats-new-items': {
    'Name': 'title',
    'Slug': 'slug',
    'Excerpt': 'excerpt',
    'Body': 'body',
  },
  'team-members': {
    'Name': 'name',
    'Slug': 'slug',
    'Role': 'role',
    'Bio': 'bio',
  },
};

const fieldMap = FIELD_MAPS[collectionArg];
if (!fieldMap) {
  console.error(`Unknown collection: ${collectionArg}`);
  console.error(`Available: ${Object.keys(FIELD_MAPS).join(', ')}`);
  process.exit(1);
}

async function postRecord(endpoint, data) {
  const res = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({ data }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(json));
  return json;
}

async function run() {
  const records = [];

  await new Promise((resolve, reject) => {
    createReadStream(fileArg)
      .pipe(parse({ columns: true, skip_empty_lines: true }))
      .on('data', (row) => {
        const mapped = {};
        for (const [csvCol, strapiField] of Object.entries(fieldMap)) {
          if (row[csvCol] !== undefined && row[csvCol] !== '') {
            mapped[strapiField] = row[csvCol];
          }
        }
        records.push(mapped);
      })
      .on('end', resolve)
      .on('error', reject);
  });

  console.log(`Importing ${records.length} records into ${collectionArg}…`);

  let ok = 0, fail = 0;
  for (const record of records) {
    try {
      await postRecord(collectionArg, record);
      ok++;
      process.stdout.write('.');
    } catch (e) {
      fail++;
      console.error(`\nFailed to import: ${JSON.stringify(record)}`);
      console.error(e.message);
    }
  }

  console.log(`\n✓ Imported ${ok} records, ${fail} failed.`);
}

run().catch(console.error);

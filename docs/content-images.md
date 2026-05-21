# Content collection images

Guidelines for images under `src/content/` (blog posts, login gallery, customer stories, what's new).

## Format and size

- Use **WebP** for raster assets (`cover.webp`, `figure-1.webp`, etc.).
- Keep images next to `index.md` and reference them with relative paths (`./cover.webp`).
- Run the optimizer before committing large assets:

  ```bash
  npm run optimize-images
  ```

- Target max dimensions (the script enforces these):

  | Collection | Asset | Max width |
  |------------|-------|-----------|
  | blog-posts | cover | 1280px |
  | blog-posts | figure-* | 1600px |
  | login-gallery | main / slides | 1280px |
  | customer-stories | cover | 1280px |
  | customer-stories | thumbnail | 800px |
  | customer-stories | logo | 400px |
  | whats-new | cover | 1280px |

- Aim for **&lt; 150 KB** per file after optimization. The script skips WebP files already under that threshold at the correct dimensions.

## Traditional Chinese (zh-Hant) locales

For collections with `en/` and `zh-Hant/` trees, **raster images are symlinked** to the matching English asset when content is identical:

```
src/content/blog-posts/zh-Hant/{slug}/figure-1.webp  →  ../../en/{slug}/figure-1.webp
```

- Only `index.md` (and any locale-specific files) live uniquely under `zh-Hant/`.
- Frontmatter and markdown still use `./figure-1.webp` — the symlink satisfies Astro `image()` and markdown paths.
- **Windows:** enable symlink support when cloning: `git config core.symlinks true`.

Recreate symlinks after adding new shared slugs:

```bash
npm run symlink-zh-images
```

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run optimize-images` | Resize + WebP encode for `en/` (and whats-new `en/`) |
| `npm run optimize-images -- --dry-run` | Report savings without writing |
| `npm run optimize-images -- --collection blog-posts` | Single collection |
| `npm run symlink-zh-images` | Deduplicate zh-Hant rasters via symlinks to `en/` |

Manifest written to `scripts/output/image-optimize-manifest.json` after a real optimize run.

## Git history cleanup

Stale large blobs (`cms/`, `public/js/webflow.js`) may remain in git history. See `scripts/git-filter-repo-stale-blobs.sh` and team coordination before force-pushing `live`.

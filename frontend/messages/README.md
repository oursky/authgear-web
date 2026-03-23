# Adding a new locale

1. Copy `en.json` to `<locale>.json` and translate all values.
2. Add the locale string to `LOCALES` in `frontend/lib/i18n.ts`.
3. Update `frontend/middleware.ts` if the locale needs a URL prefix (add handling analogous to the `zh-TW` block).
4. In Strapi Admin → Settings → Internationalization: add the locale.
5. Run `npm run build` to verify.

> Note: `messages/*.json` files are standard JSON — comments are not supported.

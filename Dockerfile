# syntax=docker/dockerfile:1
FROM node:22-alpine AS builder
WORKDIR /app

# PUBLIC_* vars are inlined into the client bundle at build time by Vite/Astro.
# Fly secrets are runtime-only and do NOT reach this step — pass these via
# `fly deploy --build-arg PUBLIC_X=...` for each deploy.
ARG PUBLIC_TURNSTILE_SITE_KEY=""
ARG PUBLIC_GTM_ID=""
ARG PUBLIC_PLAUSIBLE_DOMAIN=""
ARG PUBLIC_GOOGLE_SITE_VERIFICATION=""
ENV PUBLIC_TURNSTILE_SITE_KEY=$PUBLIC_TURNSTILE_SITE_KEY
ENV PUBLIC_GTM_ID=$PUBLIC_GTM_ID
ENV PUBLIC_PLAUSIBLE_DOMAIN=$PUBLIC_PLAUSIBLE_DOMAIN
ENV PUBLIC_GOOGLE_SITE_VERIFICATION=$PUBLIC_GOOGLE_SITE_VERIFICATION

COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
EXPOSE 3000
ENV HOST=0.0.0.0 PORT=3000
CMD ["node", "./dist/server/entry.mjs"]

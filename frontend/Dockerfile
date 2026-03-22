# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Set at build time to match Strapi Cloud or self-hosted CMS URL
ARG STRAPI_URL=http://localhost:1337
ARG NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
ENV STRAPI_URL=$STRAPI_URL
ENV NEXT_PUBLIC_STRAPI_URL=$NEXT_PUBLIC_STRAPI_URL
ENV NEXT_TELEMETRY_DISABLED=1

# Install deps first (better layer caching)
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci

# Copy Next.js source
COPY frontend/ .

# Copy the Webflow export for the static page utility to read at build time
# (build context is the project root when called from docker-compose)
COPY authgear-new.webflow/ /authgear-new.webflow/

RUN npm run build

# Production stage
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy Webflow export for runtime access (getWebflowPageBody reads these files)
COPY --from=builder --chown=nextjs:nodejs /authgear-new.webflow /authgear-new.webflow

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]

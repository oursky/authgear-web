# Build stage — needs all deps (including devDependencies) to compile admin
FROM node:20-alpine AS builder
WORKDIR /opt/app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage — reinstall only prod deps, then overlay build output
FROM node:20-alpine AS runner
WORKDIR /opt/app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 strapi && adduser --system --uid 1001 strapi

COPY --chown=strapi:strapi package.json package-lock.json ./
# Install production deps + tsx for TypeScript config execution
RUN npm ci --omit=dev && npm install --save-prod tsx typescript @types/node

# Copy built application (dist contains both backend and admin panel)
COPY --from=builder --chown=strapi:strapi /opt/app/dist ./dist
# Copy source code (needed for runtime, as Strapi may load some files from src)
COPY --from=builder --chown=strapi:strapi /opt/app/src ./src
# Copy configuration
COPY --from=builder --chown=strapi:strapi /opt/app/config ./config
# Copy public assets
COPY --from=builder --chown=strapi:strapi /opt/app/public ./public
# Copy start wrapper script (from source context)
COPY --chown=strapi:strapi start.sh ./start.sh
RUN chmod +x start.sh

USER strapi
EXPOSE 1337

# Use wrapper script to run Strapi with tsx (handles TypeScript config files)
CMD ["./start.sh"]

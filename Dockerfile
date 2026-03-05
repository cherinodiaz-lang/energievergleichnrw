# Multi-stage Dockerfile für optimale Production Builds

# Stage 1: Dependencies
FROM node:18-alpine AS deps
WORKDIR /app

# Kopiere nur package files für besseres Caching
COPY package.json package-lock.json ./

# Installiere Dependencies
RUN npm ci --only=production && \
    npm cache clean --force

# Stage 2: Builder
FROM node:18-alpine AS builder
WORKDIR /app

# Kopiere Dependencies vom deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Installiere alle Dependencies (inkl. devDependencies)
RUN npm ci

# Type Check & Build
RUN npm run type-check && \
    npm run build

# Stage 3: Runner
FROM node:18-alpine AS runner
WORKDIR /app

# Setze Umgebung auf production
ENV NODE_ENV=production
ENV PORT=4321

# Erstelle non-root user für Security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 astro

# Kopiere nur notwendige Files
COPY --from=builder --chown=astro:nodejs /app/dist ./dist
COPY --from=builder --chown=astro:nodejs /app/package.json ./
COPY --from=deps --chown=astro:nodejs /app/node_modules ./node_modules

# Wechsel zu non-root user
USER astro

# Expose Port
EXPOSE 4321

# Health Check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:4321/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start Application
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "4321"]

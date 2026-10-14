# Stage 1: Build
FROM node:24-alpine AS builder

WORKDIR /app

COPY frontend/package.json frontend/package-lock.json frontend/tsconfig.json frontend/next.config.js ./
RUN npm ci

COPY frontend/src/ src/
COPY frontend/public/ public/
RUN npm run build

# Stage 2: Production
FROM node:24-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

ENV PORT=3000

CMD ["node", "server.js"]
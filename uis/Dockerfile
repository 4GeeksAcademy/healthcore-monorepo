# HealthCore UIs — website (3000) + backoffice (3001)
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
COPY packages/shared packages/shared
COPY uis/website/package.json uis/website/package.json
COPY uis/backoffice/package.json uis/backoffice/package.json
# npm workspaces: npm ci must run at the ROOT, not per-folder
RUN npm ci

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=development NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY package.json package-lock.json ./
COPY packages/shared ./packages/shared
COPY uis ./uis
COPY uis/start.sh /start.sh
RUN chmod +x /start.sh
EXPOSE 3000 3001
CMD ["/start.sh"]

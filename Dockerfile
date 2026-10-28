# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Stage 2: Runtime
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=deps /app/node_modules ./node_modules
COPY package.json package-lock.json ./
COPY src ./src
COPY test ./test
COPY public ./public
COPY docker/scripts/start-app.sh /usr/local/bin/start-app.sh

RUN sed -i 's/\r$//' /usr/local/bin/start-app.sh && chmod +x /usr/local/bin/start-app.sh

EXPOSE 3000

CMD ["/usr/local/bin/start-app.sh"]

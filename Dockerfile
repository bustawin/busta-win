# Keep the container aligned with .node-version.
FROM node:22.23.1-bookworm-slim AS runtime-base

# Runtime libraries required by Pintora's canvas renderer.
RUN apt-get update && apt-get install --yes --no-install-recommends \
    libcairo2 \
    libpango-1.0-0 \
    libjpeg62-turbo \
    libgif7 \
    librsvg2-2 && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

FROM runtime-base AS build-base

# Build packages used if native canvas dependencies need to compile.
RUN apt-get update && apt-get install --yes --no-install-recommends \
    build-essential \
    libcairo2-dev  \
    libpango1.0-dev  \
    libjpeg-dev  \
    libgif-dev  \
    librsvg2-dev && \
    rm -rf /var/lib/apt/lists/*

FROM build-base AS build-packages

COPY package.json package-lock.json ./
RUN npm ci --include=dev --no-audit --no-fund

FROM build-packages AS build
COPY tsconfig.json vite.config.ts react-router.config.ts ./
COPY jutils jutils
COPY src.server src.server
COPY public public
COPY ui ui

RUN npm run build

FROM build-base AS production-packages
ENV NODE_ENV=production

COPY package.json package-lock.json ./
RUN npm ci --omit=dev --no-audit --no-fund

FROM runtime-base AS start

ENV NODE_ENV=production

COPY --from=production-packages /app/node_modules ./node_modules
COPY --from=build /app/build ./build
COPY package.json tsconfig.json server.ts ./
COPY jutils/src jutils/src

ENV PORT=3210
EXPOSE 3210
ENV HOST=0.0.0.0

# Use a non-privileged user: https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md#non-root-user
# Posts are computed on the fly, and the server requires a cache directory
RUN chown -R node:node /app/build/client/posts/
USER node

CMD ["./node_modules/.bin/tsx", "./server.ts"]

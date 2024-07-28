# Use lts node: https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html
FROM node:lts-bookworm-slim AS base

RUN apt update
# Packages required for Pintora
RUN apt install --yes build-essential  \
    libcairo2-dev  \
    libpango1.0-dev  \
    libjpeg-dev  \
    libgif-dev  \
    librsvg2-dev
# Remove apt cache
RUN apt clean autoclean && \
    apt autoremove --yes && \
    rm -rf /var/lib/apt/lists/*

RUN mkdir -p /app
WORKDIR /app

FROM base as packages
ENV NODE_ENV production

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

FROM packages AS build
COPY tsconfig.json vite.config.ts ./
COPY jutils jutils
COPY src.server src.server
COPY public public
COPY ui ui

RUN npm run build

FROM build AS start

COPY server.ts ./

ENV PORT 3210
EXPOSE 3210
ENV HOST '0.0.0.0'

# Use a non-privileged user: https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md#non-root-user
# Posts are computed on the fly, and the server requires a cache directory
RUN chown -R node:node /app/build/client/posts/
USER node

CMD ["./node_modules/.bin/tsx", "./server.ts"]
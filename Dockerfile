FROM node:current-bookworm AS base

# Required for pintora
RUN apt update
# Packages required for pintora
RUN apt install --yes build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev

RUN mkdir -p /app
WORKDIR /app

FROM base as packages
ENV NODE_ENV production

COPY package.json package-lock.json ./
RUN npm install --no-audit --no-fund

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

CMD ["npm", "run", "start"]
FROM node:current-bookworm-slim AS base

RUN mkdir -p /app
WORKDIR /app

FROM base as pro-build
COPY package.json package-lock.json ./
RUN npm install

FROM pro-build AS pro-start

COPY server.ts tsconfig.json vite.config.ts ./

ENV PORT 3210
EXPOSE 3210
ENV HOST '0.0.0.0'

CMD ["npm", "run", "start"]
---
id: ADR-0003
status: accepted
date: 2026-08-03
applies_to:
  - Dockerfile
  - package.json
  - package-lock.json
  - server.ts
  - jutils/src/src.server/service/serve.ts
---

# Separate container build and runtime dependencies

## Context

The application needs Vite, TypeScript, React Router build tooling, compilers,
and native development libraries to build. The running server needs the build
artifacts, production npm dependencies, and Pintora's runtime libraries, but not
the build toolchain.

Previously the final image inherited the build stage, so build-only npm and OS
packages, source, and intermediate state were retained.

## Decision

- Install all dependencies in `build-packages` and produce `/app/build` in the
  `build` stage.
- Perform a separate `npm ci --omit=dev` in `production-packages`.
- Base `start` on `runtime-base`, then copy only production `node_modules`, the
  compiled build, and the files needed to run the server.
- Keep native compiler/header packages in `build-base`; keep only native runtime
  libraries in `runtime-base`.
- Continue running as the non-privileged `node` user.

The duplicated clean install is an accepted cold-build cost. Manifest-keyed
Docker layers make it cheap on normal source-only rebuilds, while the final image
has a smaller dependency and attack surface.

## Guardrails

- Do not copy `node_modules` or secret files from the host build context.
- Do not make the final stage inherit from `build` or `build-base`.
- A package imported by the production server must remain in `dependencies`.
  Compilers, linters, tests, framework build plugins, and type packages belong in
  `devDependencies`.
- If cold builds become a problem, prefer a BuildKit npm cache mount; do not
  retain development dependencies in the final image for speed.
- Preserve the writable posts cache and non-root runtime behavior.

## Verify

Run:

```sh
docker-compose build bustawin
docker-compose up --detach --no-deps bustawin
curl --fail http://127.0.0.1:3210/
```

Also check the container logs, a post route that renders Pintora, and that the
running container does not contain a build-only binary such as `vite`.

## Reconsider when

- The server is compiled into a self-contained artifact that no longer needs
  runtime TypeScript or source files.
- Native production dependencies no longer need a compiler-capable install
  stage.
- Measured cold-build cost outweighs the isolation benefit and an equally clean
  single-install design is available.

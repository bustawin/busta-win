---
id: ADR-0001
status: accepted
date: 2026-08-03
applies_to:
  - package.json
  - package-lock.json
  - .node-version
  - react-router.config.ts
  - vite.config.ts
  - vitest.config.ts
  - eslint.config.js
---

# Isolate major dependency upgrades

## Context

This SSR application combines React Router, React, Vite, MDX compilation,
browser interaction, and a custom server. Updating several major versions at
once makes a regression difficult to attribute.

## Decision

- Upgrade related packages as one compatibility unit, but keep unrelated majors
  in separate commits.
- Establish green verification before the first upgrade and run it after every
  compatibility unit.
- Migrate framework behavior before changing the framework major when the
  framework offers an incremental migration path.
- Do not upgrade a compatible tool major merely because a framework accepts it.
  For example, React Router 8 supports Vite 7, so Vite 8 remains a separate
  decision and failure boundary.
- Keep build-only tools in `devDependencies`; keep only server/runtime imports in
  `dependencies`.

## Guardrails

- Query current engines and peer dependencies before selecting versions.
- Keep React and React DOM aligned. Keep React Router packages aligned.
- Avoid blanket forced audit fixes or unrelated majors in a framework commit.
- A passing typecheck or build is not a substitute for browser and SSR checks.

## Verify

Run:

```sh
npm run verify
npm run build
```

For framework/runtime changes, also start the production server and check at
least the home page and one post route. The Playwright suite already exercises
SSR, client navigation, MDX/Pintora, Plotly, errors, redirects, and the Atom feed.

## Reconsider when

- A security fix requires coupled majors.
- A supported dependency matrix no longer permits the isolated sequence.
- The test suite becomes fast and diagnostic enough to safely combine more
  upgrade units.

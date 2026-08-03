# AGENTS.md

## Project

This is the TypeScript/React Router SSR application for `busta.win`.

- `ui/` contains the React Router app and file-based routes.
- `src.server/` contains the domain, adapters, and server-side services.
- `posts/<slug>/post.mdx` contains blog content; keep post images beside the MDX file.
- `public/` contains intentionally public static files.
- `jutils/` is a pinned Git submodule.

Use the existing `@ui`, `@src`, and `@jutils` aliases instead of adding long relative imports.

## Setup and commands

Use the Node version in `.node-version` (currently 22.14.0).

```sh
./install        # initialize/update the jutils submodule
npm install
npm run dev
```

Run checks proportional to the change:

```sh
npm run typecheck
npm run lint
npm run test:run       # Vitest unit/integration tests
npm run test:e2e       # Playwright; builds and starts production locally
npm run test:all       # complete test suite
```

Do not commit generated output such as `build/`, `.react-router/`, `public/posts/`, or Playwright artifacts.

## Production deployment

Use the repository's `$deploy-production` skill in `.agents/skills/deploy-production/` when deployment is explicitly requested.

## Important behavior

- Posts are compiled from MDX at runtime and cached by file modification time. Published listings exclude directories beginning with `_` and posts with `draft: true`; draft URLs remain directly previewable with `noindex, nofollow`.
- Treat post slugs and request paths as untrusted input. Preserve the direct-child-only validation in `src.server/adapters/posts/posts.ts` and the rule that only `public/` and built client assets are served.
- Changes to post lookup, routing, redirects, Express/static middleware, or public-file handling require both the focused security unit tests and the Playwright security tests.
- Prefer accessible role/name selectors in browser tests. Keep Prettier style: single quotes and no semicolons.
- Do not run Docker redeploy commands unless deployment is explicitly requested.

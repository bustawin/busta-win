# Dependency security review — 2026-09-27

## Result

`npm audit --omit=dev --json` reports zero production vulnerabilities after
these changes. The final application image has zero high or critical findings
from Trivy 0.74.0 (`--ignore-unfixed`).

The pinned cloudflared image has one remaining upstream high finding:
`CVE-2026-14456` in `libssl3t64` 3.5.6-1~deb13u2; Trivy lists
3.5.7-1~deb13u2 as the fix. The latest reviewed cloudflared release
(2026.9.3) has not incorporated that Debian fix. It is not remediable from
this repository; track a new cloudflared release and refresh its digest.

## Implemented updates

| Compatibility unit | Version or change | Commit |
| --- | --- | --- |
| Plotly | `plotly.js` and `plotly.js-basic-dist` 4.1.1; direct peer pinned | `be2d98b` |
| Vitest | 5.0.2 | `0e873b4` |
| Feed | 6.0.0; Atom item IDs are now absolute URLs | `da915d5` |
| cross-env | 10.1.0 | `56124d3` |
| TypeScript | 6.0.3; removed `baseUrl`, paths use `./` targets | `f76b1f3` |
| Express | 5.2.1; jutils catch-all uses `/{*splat}` | `cd07cd1` |
| MDX parsers | `mdx-bundler` 10.1.1; removed unused `gray-matter`; secure `js-yaml` and `toml` overrides | `283a75f` |
| Current-major releases | React/Router, Playwright, TypeScript-ESLint, Morgan, compression, isbot, tsx, types, and lockfile transitives | `8d5b3f1` |
| Node runtime | Node 24.21.0, digest-pinned Bookworm image, npm 12.1.0, esbuild 0.28.2 | `d10d819` |
| Tunnel image | cloudflared 2026.9.3 pinned by immutable digest | `ee08c2b` |

The jutils change is commit `e50a064` on local branch
`dev/express-5-security`. It must be pushed by the user before the parent
branch is pushed, because the parent commit references it.

## Deferred upgrades

- Vite 8.3.1 was built and tested, then reverted. Its Rolldown build made
  MDX post routes recurse in `Post()` until a stack overflow, returning HTTP
  500. Vite remains on 7.3.6; esbuild was independently upgraded to 0.28.2
  and the result passes build, browser, and container checks. Retry Vite 8
  only after the React Router/Rolldown MDX interaction is fixed upstream or a
  minimal reproduction confirms a local migration.
- ESLint 10 remains deferred because the current plugin set does not declare
  consistently compatible peer ranges. ESLint 9.39.5 is current and audited.
- TypeScript 7 remains deferred because TypeScript-ESLint 8.70.1 supports
  TypeScript `< 6.1.0`. TypeScript 6 is the supported upgrade.

Dependabot and CI vulnerability scanning were intentionally not added.

## Verification

- Clean installs were performed for each compatibility unit.
- `npm audit --omit=dev --json` has zero findings.
- `npm run verify` passed after the dependency update. It includes lint,
  typecheck, Vitest, and Playwright, covering Plotly, Atom, MDX/Pintora, SSR,
  redirects, drafts, and static-file protection. Expected 404 log entries
  were produced by the security test paths.
- The Node 24 image was built from fresh layers. It passed local tunnel-free
  checks for home, MDX/Pintora, Plotly SSR, Atom, redirect, secret-file 404,
  non-root execution, writable post cache, and no Vite binary at runtime.
- Trivy 0.74.0 found zero high/critical findings in the final application
  image. The cloudflared residual above is the only high/critical finding in
  the reviewed pinned tunnel image.

## Recommendations

- Refresh the cloudflared digest when a release includes the Debian OpenSSL
  fix, then rerun the image scan.
- Reattempt Vite 8 after its MDX SSR regression is fixed.
- Revisit ESLint 10 and TypeScript 7 when their plugin compatibility is
  declared and tested.

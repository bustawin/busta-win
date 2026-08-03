---
id: ADR-0002
status: accepted
date: 2026-08-03
applies_to:
  - package.json
  - package-lock.json
  - src.server/adapters/posts/posts.ts
  - src.server/adapters/posts/remark-mdx-images.ts
  - src.server/adapters/posts/remark-mdx-toc.ts
  - ui/components/post/toc.tsx
  - tests/e2e/website.spec.ts
---

# Own the small MDX compatibility plugins

## Context

`remark-mdx-images` was deprecated and generated an ESTree import incompatible
with current types. `remark-mdx-toc` depended on an old vulnerable
`estree-util-value-to-estree` with no maintained upgrade path.

The application uses a small part of each package: import relative Markdown
images and export a nested TOC from Markdown headings.

## Decision

Maintain those two transforms as typed local adapters:

- `remark-mdx-images.ts` converts relative Markdown images into imported MDX
  images and emits current ESTree, including import attributes.
- `remark-mdx-toc.ts` collects Markdown headings and exports the nested `toc`
  value using maintained AST utilities.

This replaces the npm packages, not the user-visible image or TOC features.

## Guardrails

- Preserve absolute image URLs and normalize relative image paths.
- Preserve image alt text and optional titles.
- Preserve heading depth, text, attributes, order, and nested TOC structure.
- The local TOC intentionally does not support the old package's optional JSX
  heading/custom-tag feature. Add tested support before introducing such posts.
- Prefer a maintained external package again if it clearly reduces local code
  without reintroducing stale or vulnerable dependencies.

## Verify

Run:

```sh
npm run typecheck
npm run test:run
npm run test:e2e
```

Browser coverage must show a rendered post, a visible table of contents, working
heading navigation, relative post media, and a rendered Pintora diagram.

## Reconsider when

- Posts begin using JSX/custom heading tags.
- MDX or ESTree changes make the local transforms substantially more complex.
- A maintained replacement provides the required behavior and compatibility.

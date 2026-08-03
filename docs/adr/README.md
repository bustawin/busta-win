# Lightweight, AI-first ADRs

These records preserve decisions that are easy to accidentally undo during an
automated change. They are deliberately short and activated by repository paths.

## Activation

1. List the files you expect to change.
2. Read each accepted ADR whose frontmatter `applies_to` glob matches one of
   those paths.
3. Apply all matching guardrails and verification steps.
4. If the intended change invalidates a decision, update it or add a superseding
   ADR rather than working around it.

`AGENTS.md` makes this process part of the repository instructions for AI agents.
Humans can use the same index during review.

## Index

| ADR | Main activation paths | Decision |
| --- | --- | --- |
| [0001](0001-isolate-major-dependency-upgrades.md) | Dependency manifests and framework/tool configuration | Keep major upgrades attributable and independently verified |
| [0002](0002-own-small-mdx-compatibility-plugins.md) | Post compilation, TOC rendering, and dependency manifests | Maintain the small image and TOC transforms locally |
| [0003](0003-separate-container-build-and-runtime-dependencies.md) | Dockerfile, server entrypoint, and dependency manifests | Build with development tooling but ship runtime dependencies only |

## Record shape

Each ADR contains:

- `applies_to`: repository-relative activation globs for agents.
- `decision`: the durable choice.
- `guardrails`: constraints a future change must preserve or consciously revise.
- `verify`: the smallest useful evidence that the decision still works.
- `reconsider_when`: conditions that justify revisiting the choice.

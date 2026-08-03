# Repository instructions

## Path-scoped decisions

Before changing files, read `docs/adr/README.md` and every accepted ADR whose
`applies_to` pattern matches a file in the change. Paths are relative to the
repository root. When several ADRs match, apply all of them.

Treat an accepted ADR as a constraint, not immutable history. If a requested
change conflicts with one, call out the conflict and update or supersede the ADR
in the same change; do not silently bypass it.

Run the matching ADR's verification commands in proportion to the change and
report any checks that were not run.

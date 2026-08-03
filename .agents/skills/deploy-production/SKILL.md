---
name: deploy-production
description: Deploy busta.win changes to production with the appropriate production command. Use when asked to deploy, redeploy, release, or publish busta.win application code, posts, or foundational dependency changes.
---

# Deploy Production

Inspect the changed files before deploying. Deploy only when the user explicitly requests it.

Confirm `npm run test:all` passed recently and after the latest change to the files being deployed. If there is no such passing result, run it before deploying. Stop if it fails.

Choose exactly one command:

- Run `bustawin-pro-posts` when every change being deployed is under `posts/`. It updates production posts without rebuilding the server.
- Run `bustawin-pro` for the normal deployment path. It uses the cached rebuild.
- Run `bustawin-pro-full` only after `bustawin-pro` fails or when foundational dependencies such as Node change. It rebuilds everything from scratch.

Run the command from the busta.win repository root. Report which path was chosen, whether it succeeded, and any production verification performed.

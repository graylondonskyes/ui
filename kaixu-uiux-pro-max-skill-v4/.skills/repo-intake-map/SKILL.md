---
name: repo-intake-map
version: 4.0.0
description: Use before editing any repo to map architecture, frontend entrypoints, routes, build commands, protected files, and dependency boundaries.
---

# Repo Intake Map

## Goal

Prevent wrong-file edits, generic rewrites, and broken plumbing.

## Required Read-Only Pass

Run safe inspection first:

```bash
pwd
git status --short
find . -maxdepth 3 -name package.json -o -name vite.config.* -o -name next.config.* -o -name astro.config.* -o -name svelte.config.* -o -name remix.config.* -o -name netlify.toml -o -name wrangler.toml -o -name wrangler.jsonc -o -name vercel.json
```

Then identify package manager, framework/runtime, entrypoints, components, styles, assets, navigation, API/function/worker folders, env examples, smoke scripts, and protected brand assets.

Before editing, output repo type, entrypoints, likely files to modify, files not to touch, command plan, and open unknowns.

Do not merge whole unrelated projects together. Extract only named modules, normalize into one runtime, one naming system, and one cohesive product.

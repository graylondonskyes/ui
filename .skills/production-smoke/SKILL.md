---
name: production-smoke
version: 4.0.0
description: Use to validate UI upgrades, build readiness, button behavior, route preservation, browser layout, and no-theater claims.
---

# Production Smoke

Run available package scripts: build, test, lint, typecheck, existing smoke scripts, `node scripts/kaixu-uiux-smoke.mjs`, and `node scripts/kaixu-uiux-browser-smoke.mjs --url <local-url>` when Playwright and a local app are available.

If a command does not exist, report it as absent. If browser smoke cannot run, report why. If provider vars are missing, code path can be complete while live-provider proof remains open.

Use ✅ passed/code-backed and ☐ open/not proven. Never use X marks.

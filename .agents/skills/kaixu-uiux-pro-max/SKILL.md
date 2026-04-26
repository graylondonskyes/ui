---
name: kaixu-uiux-pro-max
version: 4.0.0
description: Use for premium website/app UI implementation, MCP-backed visual upgrades, repo-aware frontend work, no-theater cleanup, and browser-smoked UI proof.
---

# kAIxU UI/UX Pro Max v4

## Prime Directive

You are the kAIxU UI/UX Pro Max implementation layer. Make websites and app surfaces visually premium, responsive, accessible, and useful without breaking working code.

This is not a loose prompt. Treat this skill as an execution system.

## Mandatory MCP Rule

✅ Use Context7 MCP for current framework/library documentation before changing framework-specific code, UI library setup, animation code, AI SDK flows, or build configuration.
✅ Use Playwright MCP for rendered browser inspection, button/click proof, viewport checks, and runtime verification.
✅ Use repo files directly for actual implementation truth.
☐ If MCP is not available, report that and continue with local repo inspection plus build/test/smoke.

Do not claim MCP was used unless the MCP tools were visible in the session and actually used.

## Non-Negotiables

✅ Preserve existing branding, product names, routes, handlers, state, API calls, auth gates, storage keys, legal/contact blocks, and deployment assumptions.
✅ Upgrade the real UI layer through the actual repo architecture.
✅ Every visible button/control must perform a real action or be removed.
✅ Client-facing surfaces must stay clean: no implementation notes, dev commentary, TODO labels, chatty instructions, or fake claims inside the UI.
✅ Build/smoke results must be reported honestly.
☐ Live-provider proof remains open until real environment variables and provider accounts are supplied and tested.

## Required First Pass

Before editing, inspect `package.json`, framework config, frontend entrypoints, routes, forms/buttons/panels/modals, state stores, API/server/function/worker routes, deployment config, env examples, and test/smoke scripts.

Then classify the repo using `.kaixu/REPO_DETECTION.md`.

## UI Upgrade Standard

✅ premium hero/header treatment
✅ stronger information hierarchy
✅ responsive layout
✅ clear navigation and CTA structure
✅ readable panels/cards/forms
✅ scrollable overflow regions
✅ minimizable/expandable panels where useful
✅ accessible contrast and focus states
✅ useful loading/error/empty states
✅ safe animation/motion
✅ preserved brand assets and existing visual identity
✅ no fake metrics unless data-backed or explicitly labeled sample mode

## Forbidden

Do not replace a working app with a pretty shell.
Do not remove handlers or state because they are inconvenient.
Do not add dead CTAs, fake dashboards, fake connected statuses, fake AI output, fake checkout success, fake exports, fake auth, fake integrations, or fake smoke proof.
Do not install heavy dependencies blindly.
Do not convert static HTML into React unless explicitly ordered.
Do not call a design pass complete without browser/build proof where possible.
Do not use X marks in trackers.

## MCP Browser Proof Standard

When Playwright MCP is available, verify page load, fatal console errors, desktop viewport, mobile viewport, nav links, visible buttons, actual click behavior, forms, panels, and viewport margins.

## Completion Report Format

✅ Files changed: ...
✅ Commands run: ...
✅ MCP used: Context7 / Playwright / none available
✅ Passed checks: ...
☐ Open gaps: ...

Use only ✅ and ☐ in trackers.

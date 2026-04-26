# Agent Commands

## Main Codex Prompt

```text
Read AGENTS.md. Use repo-intake-map, mcp-website-builder, kaixu-uiux-pro-max, no-theater-implementation, and production-smoke. Confirm MCP with /mcp. Use Context7 for current docs and Playwright for rendered browser inspection when available. Inspect this repo, identify the real frontend entrypoints, then upgrade the website UI without breaking plumbing. Preserve branding. No fake buttons. No demo-only claims. Run build/test/smoke and report ✅ code-backed completions and ☐ open gaps.
```

## Fast UI Upgrade Prompt

```text
Use kaixu-uiux-pro-max and brand-preservation. Upgrade the real frontend UI only. Preserve routes, handlers, API calls, state, storage keys, auth, existing CSS tokens, and brand assets. Every visible control must work or be removed. Run available build and smoke checks.
```

## No-Theater Cleanup Prompt

```text
Use no-theater-implementation. Scan for fake buttons, placeholders, TODO UI, mocked success, dead links, fake exports, fake integrations, and unbacked claims. Fix with real code, remove visible claims, or loud-fail missing config. Run smoke.
```

## Browser Proof Prompt

```text
Use mcp-website-builder and production-smoke. Start the app locally if possible. Use Playwright MCP to inspect desktop and mobile viewports, click visible buttons, verify nav links, and check fatal console errors. Report only what is proven.
```

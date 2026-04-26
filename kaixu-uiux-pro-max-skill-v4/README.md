# kAIxU UI/UX Pro Max Skill Pack v4

A drop-in AI repo skill system for making websites visually premium while preserving real functionality.

v4 adds the missing layer: Codex-native skills plus MCP setup for Context7 and Playwright.

## Install From Repo Root

Copy this ZIP into your repo root, then run:

```bash
unzip kaixu-uiux-pro-max-skill-v4-upgraded.zip
bash kaixu-uiux-pro-max-skill-v4/scripts/install-kaixu-uiux-pro-max-v4.sh --project-mcp
```

Optional global MCP install:

```bash
bash kaixu-uiux-pro-max-skill-v4/scripts/install-kaixu-uiux-pro-max-v4.sh --global-mcp
```

Optional browser install for Playwright smoke:

```bash
bash kaixu-uiux-pro-max-skill-v4/scripts/install-kaixu-uiux-pro-max-v4.sh --project-mcp --install-browser
```

## Verify

```bash
node scripts/kaixu-uiux-smoke.mjs
node scripts/kaixu-no-theater-scan.mjs
node scripts/verify-codex-mcp.mjs
```

The no-theater scanner ignores this skill pack, `.kaixu`, `.agents`, `.skills`, `.claude`, `.codex`, `.mcp`, `docs`, and `templates` by default so it scans client/product code. Use `--include-docs` only when you want docs scanned too.

Start Codex:

```bash
codex
```

Inside Codex:

```text
/mcp
```

## Command To Give Codex

```text
Read AGENTS.md. Use repo-intake-map, mcp-website-builder, kaixu-uiux-pro-max, no-theater-implementation, and production-smoke. Confirm MCP with /mcp. Use Context7 for current docs and Playwright for rendered browser inspection when available. Inspect this repo, identify the real frontend entrypoints, then upgrade the website UI without breaking plumbing. Preserve branding. No fake buttons. No demo-only claims. Run build/test/smoke and report ✅ code-backed completions and ☐ open gaps.
```

## Included

✅ Codex-native `.agents/skills` skills
✅ legacy `.skills` mirror
✅ Claude `.claude/skills` mirror
✅ project `.codex/config.toml` MCP config
✅ Context7 MCP setup
✅ Playwright MCP setup
✅ repo detection rules
✅ UI upgrade playbook
✅ no-theater scanner
✅ upgraded smoke scripts
✅ premium component/style templates
✅ terminal command docs

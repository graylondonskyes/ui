# Terminal Commands

## Install Codex CLI

```bash
npm install -g @openai/codex@latest
```

## Install This Pack Into Current Repo

```bash
unzip kaixu-uiux-pro-max-skill-v4-upgraded.zip
bash kaixu-uiux-pro-max-skill-v4/scripts/install-kaixu-uiux-pro-max-v4.sh --project-mcp
```

## Install MCP Globally Too

```bash
bash kaixu-uiux-pro-max-skill-v4/scripts/install-kaixu-uiux-pro-max-v4.sh --global-mcp
```

## Verify Files

```bash
find .agents/skills -maxdepth 2 -name SKILL.md -print
cat .codex/config.toml
node scripts/kaixu-uiux-smoke.mjs
node scripts/kaixu-no-theater-scan.mjs
node scripts/verify-codex-mcp.mjs
```

## Start Codex

```bash
codex
```

Inside Codex:

```text
/mcp
```

## One-Shot Codex Command

```bash
codex "Read AGENTS.md. Use repo-intake-map, mcp-website-builder, kaixu-uiux-pro-max, no-theater-implementation, and production-smoke. Confirm MCP tools if available. Upgrade the real website UI without breaking plumbing. Preserve branding. No fake buttons. Run build/test/smoke and report ✅ code-backed completions and ☐ open gaps."
```

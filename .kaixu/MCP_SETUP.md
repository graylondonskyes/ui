# MCP Setup — Codex Website Work

Skills tell Codex what workflow to follow. MCP gives Codex extra tools.

For website work, this pack expects:

✅ Context7 MCP for current framework/library documentation.
✅ Playwright MCP for rendered browser inspection and interaction proof.

## Verify in Codex

```bash
codex
```

Inside Codex:

```text
/mcp
```

## Manual Add Commands

```bash
codex mcp add context7 -- npx -y @upstash/context7-mcp
codex mcp add playwright -- npx -y @playwright/mcp@latest
```

Do not claim MCP is working unless `/mcp` shows the servers inside Codex or the session visibly exposes MCP tools.

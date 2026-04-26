# MCP Workflow

## Recommended Codex MCP Servers

```toml
[mcp_servers.context7]
command = "npx"
args = ["-y", "@upstash/context7-mcp"]
startup_timeout_sec = 20
tool_timeout_sec = 90
enabled = true

[mcp_servers.playwright]
command = "npx"
args = ["-y", "@playwright/mcp@latest"]
startup_timeout_sec = 30
tool_timeout_sec = 120
enabled = true
```

Use `/mcp` inside Codex to confirm servers are visible before claiming MCP is available.

#!/usr/bin/env node
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const repoRoot = process.cwd();

const candidateConfigs = [
  path.join(repoRoot, ".codex", "config.toml"),
  path.join(os.homedir(), ".codex", "config.toml"),
];

function safeRead(file) {
  try {
    const st = fs.statSync(file);
    if (!st.isFile()) return null;
    return fs.readFileSync(file, "utf8");
  } catch {
    return null;
  }
}

const readable = candidateConfigs
  .map((file) => ({ file, text: safeRead(file) }))
  .filter((entry) => entry.text);

const merged = readable.map((entry) => entry.text).join("\n\n");

const checks = {
  readable_config_found: readable.length > 0,
  context7_configured:
    merged.includes("[mcp_servers.context7]") &&
    merged.includes("@upstash/context7-mcp"),
  playwright_configured:
    merged.includes("[mcp_servers.playwright]") &&
    merged.includes("@playwright/mcp"),
};

const pass = Object.values(checks).every(Boolean);

console.log(
  JSON.stringify(
    {
      pass,
      checked_configs: candidateConfigs,
      readable_configs: readable.map((entry) => entry.file),
      checks,
      note: "Project .codex/config.toml is optional. This verifier accepts global ~/.codex/config.toml because Codex loads MCP from there by default.",
    },
    null,
    2,
  ),
);

if (!pass) process.exit(1);

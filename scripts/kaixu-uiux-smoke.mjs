#!/usr/bin/env node
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();

function exists(p) {
  try {
    return fs.existsSync(p);
  } catch {
    return false;
  }
}

function isFile(p) {
  try {
    return fs.statSync(p).isFile();
  } catch {
    return false;
  }
}

function read(p) {
  try {
    return fs.readFileSync(p, "utf8");
  } catch {
    return "";
  }
}

function commandExists(cmd) {
  const r = spawnSync("bash", ["-lc", `command -v ${cmd}`], { encoding: "utf8" });
  return r.status === 0;
}

const projectCodex = path.join(root, ".codex", "config.toml");
const globalCodex = path.join(os.homedir(), ".codex", "config.toml");
const codexConfigText = [projectCodex, globalCodex].filter(isFile).map(read).join("\n\n");

const checks = {
  agents_md: exists(path.join(root, "AGENTS.md")),
  kaixu_skill: exists(path.join(root, ".agents", "skills", "kaixu-uiux-pro-max", "SKILL.md")),
  mcp_builder_skill: exists(path.join(root, ".agents", "skills", "mcp-website-builder", "SKILL.md")),
  no_theater_skill: exists(path.join(root, ".agents", "skills", "no-theater-implementation", "SKILL.md")),
  production_smoke_skill: exists(path.join(root, ".agents", "skills", "production-smoke", "SKILL.md")),
  codex_mcp_config:
    codexConfigText.includes("[mcp_servers.context7]") &&
    codexConfigText.includes("@upstash/context7-mcp") &&
    codexConfigText.includes("[mcp_servers.playwright]") &&
    codexConfigText.includes("@playwright/mcp"),
  codex_available: commandExists("codex") || commandExists("npx"),
};

const pass = Object.values(checks).every(Boolean);

for (const [name, ok] of Object.entries(checks)) {
  console.log(`${ok ? "✅" : "☐"} ${name}`);
}

console.log("");
console.log(
  JSON.stringify(
    {
      pass,
      project_codex_config: projectCodex,
      global_codex_config: globalCodex,
      note: "Global ~/.codex/config.toml is valid for MCP. Project .codex/config.toml is optional and unavailable here because /workspaces/ui/.codex is mounted read-only.",
    },
    null,
    2,
  ),
);

if (!pass) process.exit(1);

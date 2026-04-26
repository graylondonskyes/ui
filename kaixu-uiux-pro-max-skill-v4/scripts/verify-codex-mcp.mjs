#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const home = process.env.HOME || '';
const projectConfig = path.join(root, '.codex/config.toml');
const globalConfig = path.join(home, '.codex/config.toml');
const read = (p) => fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : '';
const combined = `${read(projectConfig)}\n${read(globalConfig)}`;
const report = {
  name: 'verify-codex-mcp',
  timestamp: new Date().toISOString(),
  projectConfigExists: fs.existsSync(projectConfig),
  globalConfigExists: fs.existsSync(globalConfig),
  context7Configured: /\[mcp_servers\.context7\]/.test(combined),
  playwrightConfigured: /\[mcp_servers\.playwright\]/.test(combined),
  note: 'Open Codex and type /mcp to confirm runtime visibility.'
};
report.passed = report.context7Configured && report.playwrightConfigured;
console.log(JSON.stringify(report, null, 2));
process.exit(report.passed ? 0 : 1);

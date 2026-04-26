#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const includeDocs = process.argv.includes('--include-docs');
const ignored = new Set([
  'node_modules', '.git', 'dist', 'build', '.next', '.output', 'coverage',
  '.kaixu', '.agents', '.skills', '.claude', '.codex', '.mcp',
  'kaixu-uiux-pro-max-skill-v4', 'kaixu-uiux-pro-max-skill-v3'
]);
if (!includeDocs) {
  ignored.add('docs');
  ignored.add('templates');
}

const exts = ['.js','.jsx','.ts','.tsx','.html','.css','.astro','.svelte','.vue'];
if (includeDocs) exts.push('.md', '.json');

const patterns = [
  ['todo', /\bTODO\b/gi],
  ['fixme', /\bFIXME\b/gi],
  ['placeholder', /placeholder/gi],
  ['coming_soon', /coming soon/gi],
  ['not_implemented', /not implemented/gi],
  ['fake', /\bfake\b/gi],
  ['mock', /\bmock(ed)?\b/gi],
  ['stub', /\bstub\b/gi],
  ['hardcoded_success', /success:\s*true|status:\s*['"]success['"]/gi],
  ['hash_only_link', /href=["']#["']/gi],
  ['javascript_void', /javascript:void\(0\)/gi],
  ['alert_coming_soon', /alert\([^)]*coming soon[^)]*\)/gi]
];

const findings = [];
function walk(abs) {
  if (!fs.existsSync(abs)) return;
  const stat = fs.statSync(abs);
  if (stat.isDirectory()) {
    const name = path.basename(abs);
    if (ignored.has(name)) return;
    for (const child of fs.readdirSync(abs)) walk(path.join(abs, child));
    return;
  }
  if (!exts.some((e) => abs.endsWith(e))) return;
  const rel = path.relative(root, abs);
  if (rel.startsWith('KAIXU_')) return;
  const text = fs.readFileSync(abs, 'utf8');
  const lines = text.split(/\r?\n/);
  for (const [name, re] of patterns) {
    re.lastIndex = 0;
    let match;
    while ((match = re.exec(text))) {
      const before = text.slice(0, match.index);
      const lineNo = before.split(/\r?\n/).length;
      findings.push({ type: name, file: rel, line: lineNo, excerpt: lines[lineNo-1]?.trim().slice(0, 220) || '' });
      if (findings.length > 1000) break;
    }
  }
}

walk(root);

const report = {
  name: 'kaixu-no-theater-scan-v4',
  timestamp: new Date().toISOString(),
  mode: includeDocs ? 'include-docs' : 'client-code-default',
  ignored: [...ignored].sort(),
  findingCount: findings.length,
  findings: findings.slice(0, 300),
  passed: findings.length === 0
};

fs.writeFileSync(path.join(root, 'KAIXU_NO_THEATER_SCAN.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
process.exit(report.passed ? 0 : 1);

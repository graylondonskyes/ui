#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const exists = (p) => fs.existsSync(path.join(root, p));
const read = (p) => exists(p) ? fs.readFileSync(path.join(root, p), 'utf8') : '';
const listFiles = (dir, exts, max = 250) => {
  const out = [];
  const walk = (abs) => {
    if (out.length >= max || !fs.existsSync(abs)) return;
    const stat = fs.statSync(abs);
    if (stat.isDirectory()) {
      for (const name of fs.readdirSync(abs)) {
        if (['node_modules', '.git', 'dist', 'build', '.next', '.output'].includes(name)) continue;
        walk(path.join(abs, name));
      }
    } else if (exts.some((ext) => abs.endsWith(ext))) out.push(path.relative(root, abs));
  };
  walk(path.join(root, dir));
  return out;
};

let repoType = 'UNKNOWN';
if (exists('next.config.js') || exists('next.config.mjs') || exists('next.config.ts')) repoType = exists('app') ? 'NEXT_APP_ROUTER' : 'NEXT_PAGES_ROUTER';
else if (exists('vite.config.js') || exists('vite.config.ts') || exists('vite.config.mjs')) repoType = 'REACT_VITE';
else if (exists('astro.config.js') || exists('astro.config.mjs') || exists('astro.config.ts')) repoType = 'ASTRO';
else if (exists('svelte.config.js') || exists('svelte.config.mjs') || exists('svelte.config.ts')) repoType = 'SVELTEKIT';
else if (exists('index.html')) repoType = 'STATIC_HTML';
else if (exists('package.json')) repoType = 'NODE_PROJECT';

let pkg = null;
try { pkg = exists('package.json') ? JSON.parse(read('package.json')) : null; } catch {}
const scripts = pkg?.scripts ? Object.keys(pkg.scripts) : [];
const frontendFiles = [
  ...listFiles('src', ['.js','.jsx','.ts','.tsx','.css','.html','.astro','.svelte'], 400),
  ...listFiles('app', ['.js','.jsx','.ts','.tsx','.css'], 250),
  ...listFiles('pages', ['.js','.jsx','.ts','.tsx','.css'], 250),
  ...listFiles('components', ['.js','.jsx','.ts','.tsx','.css'], 250),
  ...listFiles('public', ['.html','.css','.js'], 100),
  ...(exists('index.html') ? ['index.html'] : []),
  ...(exists('styles.css') ? ['styles.css'] : [])
];

const textBlob = frontendFiles.slice(0, 500).map((f) => `\n--- ${f}\n${read(f).slice(0, 200000)}`).join('\n');
const deadLinkMatches = [...textBlob.matchAll(/href=["']#["']/g)].length;
const buttonMatches = [...textBlob.matchAll(/<button\b/gi)].length;
const formMatches = [...textBlob.matchAll(/<form\b/gi)].length;
const placeholderMatches = [...textBlob.matchAll(/TODO|FIXME|placeholder|coming soon|not implemented|lorem ipsum/gi)].length;
const likelyHandlerMatches = [...textBlob.matchAll(/onClick=|onclick=|addEventListener\(|type=["']submit["']|href=["'][^#][^"']+["']/gi)].length;

const checks = {
  skill_file_agents: exists('.agents/skills/kaixu-uiux-pro-max/SKILL.md'),
  skill_file_legacy: exists('.skills/kaixu-uiux-pro-max/SKILL.md'),
  install_directive: exists('.kaixu/INSTALL_DIRECTIVE.md'),
  install_sources: exists('.kaixu/INSTALL_SOURCES.md'),
  agent_file: exists('AGENTS.md'),
  codex_mcp_config: exists('.codex/config.toml') || exists(path.join(process.env.HOME || '', '.codex/config.toml')),
  mcp_example: exists('.mcp/kaixu-uiux-pro-max.example.json'),
  smoke_script: exists('scripts/kaixu-uiux-smoke.mjs'),
  no_theater_script: exists('scripts/kaixu-no-theater-scan.mjs'),
  frontend_files_detected: frontendFiles.length > 0,
  build_script_present_or_static: scripts.includes('build') || repoType === 'STATIC_HTML' || repoType === 'UNKNOWN',
  no_obvious_placeholder_text: placeholderMatches === 0,
  no_hash_only_links: deadLinkMatches === 0,
};

const report = {
  name: 'kaixu-uiux-smoke-v4',
  repoType,
  timestamp: new Date().toISOString(),
  packageManager: exists('pnpm-lock.yaml') ? 'pnpm' : exists('yarn.lock') ? 'yarn' : exists('bun.lockb') ? 'bun' : exists('package-lock.json') ? 'npm' : pkg ? 'npm_or_unknown' : 'none',
  packageScripts: scripts,
  frontendFileCount: frontendFiles.length,
  sampledFrontendFiles: frontendFiles.slice(0, 40),
  uiSignals: { buttons: buttonMatches, forms: formMatches, likelyHandlersOrRealLinks: likelyHandlerMatches, hashOnlyLinks: deadLinkMatches, placeholderMatches },
  checks,
  passed: Object.values(checks).every(Boolean)
};

fs.writeFileSync(path.join(root, 'KAIXU_UIUX_SMOKE.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
process.exit(report.passed ? 0 : 1);

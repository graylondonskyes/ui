# kAIxU UI/UX Pro Max v4 Install Directive

This is a strict repo installation and execution directive for AI coding agents.

## Prime Rule

Do not treat this package as a loose prompt. Install it into the target repo, read it, then apply upgrades through the target repo's actual architecture.

## Required Install Locations

```text
.agents/skills/kaixu-uiux-pro-max/SKILL.md
.agents/skills/repo-intake-map/SKILL.md
.agents/skills/mcp-website-builder/SKILL.md
.agents/skills/brand-preservation/SKILL.md
.agents/skills/no-theater-implementation/SKILL.md
.agents/skills/production-smoke/SKILL.md
.agents/skills/component-library-builder/SKILL.md
.agents/skills/threejs-backgrounds/SKILL.md
.agents/skills/landing-page-converter/SKILL.md
.skills/* legacy mirror
.claude/skills/* Claude mirror
.kaixu/* directives and docs
.codex/config.toml project MCP config
.mcp/kaixu-uiux-pro-max.example.json
AGENTS.md
CLAUDE.md
CODEX.md
scripts/kaixu-uiux-smoke.mjs
scripts/kaixu-uiux-browser-smoke.mjs
scripts/kaixu-no-theater-scan.mjs
```

## MCP Wiring

Default install writes project-scoped MCP config:

```text
.codex/config.toml
```

Optional global install writes:

```text
~/.codex/config.toml
```

Truth rule:

☐ MCP remains unproven until Codex `/mcp` shows the servers in-session.

## Dependency Policy

✅ Static HTML: no shadcn install, no React conversion unless explicitly ordered.
✅ React/Vite: shadcn/lucide/motion may be installed if compatible.
✅ Next.js: shadcn may be installed if Tailwind exists or can be safely initialized.
✅ Existing Tailwind: preserve config and extend it.
✅ CSS-only brand system: preserve and enhance.
✅ Theia/IDE projects: add panels/components inside extension/plugin lanes only.

## Smoke Requirement

```bash
npm run build
npm run test
npm run lint
node scripts/kaixu-uiux-smoke.mjs
node scripts/kaixu-no-theater-scan.mjs
```

If a local app can run and Playwright is installed:

```bash
node scripts/kaixu-uiux-browser-smoke.mjs --url http://localhost:3000
```

Do not state deploy-ready unless build/smoke passes.

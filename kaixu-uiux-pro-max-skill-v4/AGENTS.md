# kAIxU Agent Instructions

Read these first:

```text
.kaixu/INSTALL_DIRECTIVE.md
.kaixu/MCP_SETUP.md
.kaixu/REPO_DETECTION.md
.kaixu/UI_UPGRADE_PLAYBOOK.md
.agents/skills/kaixu-uiux-pro-max/SKILL.md
.agents/skills/mcp-website-builder/SKILL.md
.agents/skills/repo-intake-map/SKILL.md
.agents/skills/no-theater-implementation/SKILL.md
.agents/skills/production-smoke/SKILL.md
```

Preserve existing functionality. Upgrade UI/UX only unless explicitly asked to fix logic. No placeholders. No broken controls. No generic replacement shells.

Before editing: detect repo type, inventory routes/buttons/forms/API calls/state/storage, confirm MCP with `/mcp` if using Codex, use Context7 for current docs, use Playwright for rendered inspection when available.

After editing: run available build/test/smoke commands, report only what passed, keep unproven items open.

Never use X marks in trackers.

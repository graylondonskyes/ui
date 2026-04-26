
---

## Website Killer Stack

When building or upgrading websites, use the `website-killer-stack` skill.

Mandatory rules:

✅ Preserve existing branding, CSS, routes, runtime contracts, provider plumbing, deployment paths, and working functionality.
✅ Use real code only.
✅ Every visible button/control must work or be removed.
✅ No fake/demo/theater behavior.
✅ No client-facing dev notes.
✅ Run available build/test/smoke commands.
✅ Report failures honestly.
☐ Live-provider proof remains open until real env vars are supplied and tested.

Use ✅ for complete/code-backed items and ☐ for open items. Never use X marks.

<!-- kAIxU UI/UX Pro Max v4 -->
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
<!-- /kAIxU UI/UX Pro Max v4 -->

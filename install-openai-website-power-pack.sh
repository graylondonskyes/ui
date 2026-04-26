#!/usr/bin/env bash
set -euo pipefail

echo "⚡ Installing OpenAI/Codex website power pack..."

ROOT="$(pwd)"
REF_DIR="$ROOT/.reference/openai-website-power-repos"
SKILL_DIR="$ROOT/.agents/skills/website-killer-stack"

mkdir -p "$REF_DIR"
mkdir -p "$SKILL_DIR"

echo ""
echo "📦 Cloning repo equivalents into: $REF_DIR"
echo ""

clone_or_update() {
  local repo_url="$1"
  local name="$2"
  local target="$REF_DIR/$name"

  if [ -d "$target/.git" ]; then
    echo "✅ Updating $name"
    git -C "$target" pull --ff-only || echo "☐ Could not fast-forward $name; leaving existing clone"
  else
    echo "✅ Cloning $name"
    git clone --depth=1 "$repo_url" "$target"
  fi
}

clone_or_update "https://github.com/openai/codex.git" "openai-codex"
clone_or_update "https://github.com/openai/openai-agents-js.git" "openai-agents-js"
clone_or_update "https://github.com/openai/openai-agents-python.git" "openai-agents-python"
clone_or_update "https://github.com/openai/openai-cookbook.git" "openai-cookbook"
clone_or_update "https://github.com/openai/openai-responses-starter-app.git" "openai-responses-starter-app"
clone_or_update "https://github.com/openai/evals.git" "openai-evals"
clone_or_update "https://github.com/openai/openai-guardrails-js.git" "openai-guardrails-js"
clone_or_update "https://github.com/openai/openai-guardrails-python.git" "openai-guardrails-python"
clone_or_update "https://github.com/vercel/ai.git" "vercel-ai-sdk"
clone_or_update "https://github.com/vercel/ai-elements.git" "vercel-ai-elements"
clone_or_update "https://github.com/shadcn-ui/ui.git" "shadcn-ui"
clone_or_update "https://github.com/magicuidesign/magicui.git" "magicui"
clone_or_update "https://github.com/pmndrs/react-three-fiber.git" "react-three-fiber"
clone_or_update "https://github.com/pmndrs/drei.git" "drei"
clone_or_update "https://github.com/pmndrs/uikit.git" "react-three-uikit"

echo ""
echo "🧠 Writing Codex website skill..."
echo ""

cat > "$SKILL_DIR/SKILL.md" <<'SKILL'
---
name: website-killer-stack
description: Use when building, upgrading, or auditing websites, landing pages, dashboards, SaaS pages, AI app UIs, 3D/animated interfaces, and premium client-facing web surfaces.
---

# Website Killer Stack Skill

## Purpose

Build premium websites without breaking existing plumbing.

This skill uses the local reference repos in `.reference/openai-website-power-repos/` as inspiration and implementation guidance, not as code to blindly dump into the app.

## Local Reference Repos

Use these references when useful:

- `.reference/openai-website-power-repos/openai-codex`
- `.reference/openai-website-power-repos/openai-agents-js`
- `.reference/openai-website-power-repos/openai-agents-python`
- `.reference/openai-website-power-repos/openai-cookbook`
- `.reference/openai-website-power-repos/openai-responses-starter-app`
- `.reference/openai-website-power-repos/openai-evals`
- `.reference/openai-website-power-repos/openai-guardrails-js`
- `.reference/openai-website-power-repos/openai-guardrails-python`
- `.reference/openai-website-power-repos/vercel-ai-sdk`
- `.reference/openai-website-power-repos/vercel-ai-elements`
- `.reference/openai-website-power-repos/shadcn-ui`
- `.reference/openai-website-power-repos/magicui`
- `.reference/openai-website-power-repos/react-three-fiber`
- `.reference/openai-website-power-repos/drei`
- `.reference/openai-website-power-repos/react-three-uikit`

## Mandatory First Pass

Before editing, inspect:

1. `package.json`
2. framework/runtime
3. route structure
4. existing CSS/global styles
5. existing components
6. public/assets directory
7. deployment config
8. env examples
9. build/test/smoke scripts

Do not rewrite the project blindly.

## Website Upgrade Standard

When the user asks for a better website, implement real improvements:

- premium hero section
- strong visual hierarchy
- clean spacing
- responsive layout
- modern nav
- readable sections
- polished cards
- working CTAs
- real forms only when wired
- accessible contrast
- smooth animation only when safe
- mobile-first layout
- SEO metadata where framework supports it
- no fake dashboards
- no fake counters unless clearly backed by data
- no dead buttons

## AI Website/App UI Standard

For AI apps, prefer:

- Vercel AI SDK patterns when building streaming chat or AI UX
- AI Elements patterns for chat/message/status components
- OpenAI Responses/Agents examples for OpenAI-backed flows
- Guardrails examples for validation and safety boundaries
- Evals patterns when proof/testing is requested

## Visual System Standard

For premium UI, adapt ideas from:

- shadcn/ui for accessible component structure
- Magic UI for animated copy/paste effects
- react-three-fiber for React 3D scenes
- drei for helpers, camera, environment, and ready-made abstractions
- react-three-uikit for 3D UI panels when needed

Never add visual effects that block usability.

## Preserve

Always preserve:

- existing brand identity
- existing CSS tokens
- existing logo/image usage
- existing routes
- existing backend calls
- existing auth/billing/provider logic
- existing deployment assumptions
- existing working buttons
- existing working forms
- existing navigation

## Forbidden

Do not:

- add nonfunctional buttons
- add fake provider calls
- add demo-only claims
- remove real plumbing for cosmetic reasons
- replace brand identity with generic template UI
- put developer notes inside client-facing pages
- mark anything complete without code-backed proof
- use X marks in trackers

## Completion Standard

Use this proof style:

✅ code-backed complete
☐ open / not complete

A website pass is complete only when:

✅ files were actually changed
✅ the project still builds or failure is reported honestly
✅ visible controls work or were removed
✅ client-facing UI has no dev notes
✅ responsive layout is checked
✅ no fake functionality was added
SKILL

echo "✅ Skill written: $SKILL_DIR/SKILL.md"

echo ""
echo "🧾 Updating AGENTS.md..."
echo ""

if [ ! -f "$ROOT/AGENTS.md" ]; then
  cat > "$ROOT/AGENTS.md" <<'AGENTS'
# AGENTS.md — Repo Control Layer

## Core Rule

Treat this repo as production infrastructure. Preserve existing branding, CSS, routes, runtime contracts, provider plumbing, deployment paths, and working functionality.

## Website Work

When building or upgrading websites, use the `website-killer-stack` skill.

## Done Means

✅ Real code changed
✅ Existing functionality preserved
✅ Build/test/smoke attempted
✅ Failures reported honestly
✅ No fake/demo/theater behavior
✅ No nonfunctional buttons
✅ No client-facing dev notes

Use ✅ for complete/code-backed items and ☐ for open items. Never use X marks.
AGENTS
  echo "✅ Created AGENTS.md"
else
  if grep -q "website-killer-stack" "$ROOT/AGENTS.md"; then
    echo "✅ AGENTS.md already references website-killer-stack"
  else
    cat >> "$ROOT/AGENTS.md" <<'AGENTS_APPEND'

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
AGENTS_APPEND
    echo "✅ Appended website-killer-stack block to AGENTS.md"
  fi
fi

echo ""
echo "🔍 Verifying install..."
echo ""

echo "Reference repos:"
find "$REF_DIR" -maxdepth 1 -mindepth 1 -type d -printf "✅ %f\n" | sort

echo ""
echo "Skills:"
find "$ROOT/.agents/skills" -maxdepth 2 -name "SKILL.md" -printf "✅ %p\n" | sort

echo ""
echo "Codex check:"
if command -v codex >/dev/null 2>&1; then
  echo "✅ codex installed: $(command -v codex)"
else
  echo "☐ codex command not found"
  echo "Run: npm i -g @openai/codex@latest"
  echo "Or use: npx @openai/codex@latest"
fi

echo ""
echo "🚀 Next command:"
echo ""
echo 'codex "Read AGENTS.md. Use the website-killer-stack skill. Inspect this repo, identify the real frontend entrypoints, then upgrade the website UI without breaking plumbing. Preserve branding. No fake buttons. Run available build/test/smoke commands and report ✅ code-backed completions and ☐ open gaps."'
echo ""
echo "✅ OpenAI/Codex website power pack installed."

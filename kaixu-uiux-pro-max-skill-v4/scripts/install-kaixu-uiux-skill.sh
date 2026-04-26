#!/usr/bin/env bash
set -euo pipefail

ROOT="${1:-$PWD}"
SRC_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

mkdir -p "$ROOT/.skills/kaixu-uiux-pro-max" "$ROOT/.kaixu" "$ROOT/.mcp" "$ROOT/scripts"
cp -R "$SRC_DIR/.skills/kaixu-uiux-pro-max/"* "$ROOT/.skills/kaixu-uiux-pro-max/"
cp "$SRC_DIR/.kaixu/INSTALL_DIRECTIVE.md" "$ROOT/.kaixu/INSTALL_DIRECTIVE.md"
cp "$SRC_DIR/.kaixu/INSTALL_SOURCES.md" "$ROOT/.kaixu/INSTALL_SOURCES.md"
cp "$SRC_DIR/.kaixu/REPO_DETECTION.md" "$ROOT/.kaixu/REPO_DETECTION.md"
cp "$SRC_DIR/.kaixu/UI_UPGRADE_PLAYBOOK.md" "$ROOT/.kaixu/UI_UPGRADE_PLAYBOOK.md"
cp "$SRC_DIR/.mcp/kaixu-uiux-pro-max.example.json" "$ROOT/.mcp/kaixu-uiux-pro-max.example.json"
cp "$SRC_DIR/scripts/kaixu-uiux-smoke.mjs" "$ROOT/scripts/kaixu-uiux-smoke.mjs"

append_block() {
  local file="$1"
  local source_file="$2"
  local marker="kAIxU UI/UX Pro Max"
  if [ -f "$ROOT/$file" ] && grep -q "$marker" "$ROOT/$file"; then
    return 0
  fi
  {
    echo ""
    echo "<!-- kAIxU UI/UX Pro Max -->"
    cat "$SRC_DIR/$source_file"
    echo "<!-- /kAIxU UI/UX Pro Max -->"
  } >> "$ROOT/$file"
}

touch "$ROOT/AGENTS.md" "$ROOT/CLAUDE.md" "$ROOT/CODEX.md"
append_block "AGENTS.md" "AGENTS.md"
append_block "CLAUDE.md" "CLAUDE.md"
append_block "CODEX.md" "CODEX.md"

chmod +x "$ROOT/scripts/kaixu-uiux-smoke.mjs"

echo "kAIxU UI/UX Pro Max skill installed into: $ROOT"
echo "Next: tell your agent to read AGENTS.md and .kaixu/INSTALL_DIRECTIVE.md."

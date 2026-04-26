#!/usr/bin/env bash
set -euo pipefail

ROOT="$PWD"
SRC_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PROJECT_MCP=1
GLOBAL_MCP=0
INSTALL_BROWSER=0

for arg in "$@"; do
  case "$arg" in
    --project-mcp) PROJECT_MCP=1 ;;
    --no-project-mcp) PROJECT_MCP=0 ;;
    --global-mcp) GLOBAL_MCP=1 ;;
    --install-browser) INSTALL_BROWSER=1 ;;
    --target=*) ROOT="${arg#--target=}" ;;
    *) echo "☐ Unknown option: $arg" ;;
  esac
done

mkdir -p "$ROOT/.agents/skills" "$ROOT/.skills" "$ROOT/.claude/skills" "$ROOT/.kaixu" "$ROOT/.mcp" "$ROOT/scripts" "$ROOT/docs"

copy_dir() {
  local from="$1"
  local to="$2"
  mkdir -p "$to"
  cp -R "$from"/* "$to"/
}

for d in "$SRC_DIR/.agents/skills"/*; do
  [ -d "$d" ] || continue
  name="$(basename "$d")"
  copy_dir "$d" "$ROOT/.agents/skills/$name"
  copy_dir "$d" "$ROOT/.skills/$name"
  copy_dir "$d" "$ROOT/.claude/skills/$name"
done

cp -R "$SRC_DIR/.kaixu/"* "$ROOT/.kaixu/"
cp -R "$SRC_DIR/.mcp/"* "$ROOT/.mcp/"
cp -R "$SRC_DIR/templates" "$ROOT/" 2>/dev/null || true
for f in kaixu-uiux-smoke.mjs kaixu-uiux-browser-smoke.mjs kaixu-no-theater-scan.mjs verify-codex-mcp.mjs; do
  cp "$SRC_DIR/scripts/$f" "$ROOT/scripts/$f"
  chmod +x "$ROOT/scripts/$f"
done

append_block() {
  local file="$1"
  local source_file="$2"
  local marker="kAIxU UI/UX Pro Max v4"
  touch "$ROOT/$file"
  if grep -q "$marker" "$ROOT/$file"; then
    echo "✅ $file already has kAIxU v4 block"
    return 0
  fi
  {
    echo ""
    echo "<!-- kAIxU UI/UX Pro Max v4 -->"
    cat "$SRC_DIR/$source_file"
    echo "<!-- /kAIxU UI/UX Pro Max v4 -->"
  } >> "$ROOT/$file"
  echo "✅ Appended $file"
}

append_block "AGENTS.md" "AGENTS.md"
append_block "CLAUDE.md" "CLAUDE.md"
append_block "CODEX.md" "CODEX.md"

merge_codex_config() {
  local dest="$1"
  mkdir -p "$(dirname "$dest")"
  python3 - "$SRC_DIR/.codex/config.toml" "$dest" <<'PY'
from pathlib import Path
import sys
src = Path(sys.argv[1]).read_text()
dest = Path(sys.argv[2])
text = dest.read_text() if dest.exists() else ""

def remove_table_block(s, table):
    lines = s.splitlines()
    out = []
    skip = False
    target = f"[{table}]"
    for line in lines:
        stripped = line.strip()
        if stripped == target:
            skip = True
            continue
        if skip and stripped.startswith("[") and stripped.endswith("]"):
            skip = False
        if not skip:
            out.append(line)
    return "\n".join(out).strip()

for table in ["mcp_servers.context7", "mcp_servers.playwright"]:
    text = remove_table_block(text, table)
final = (text + "\n\n" + src).strip() + "\n"
dest.write_text(final)
print(f"✅ Wrote MCP config: {dest}")
PY
}

if [ "$PROJECT_MCP" = "1" ]; then
  merge_codex_config "$ROOT/.codex/config.toml"
fi

if [ "$GLOBAL_MCP" = "1" ]; then
  merge_codex_config "$HOME/.codex/config.toml"
fi

if command -v codex >/dev/null 2>&1; then
  echo "✅ Codex CLI found: $(command -v codex)"
else
  echo "☐ Codex CLI not found. Install with: npm install -g @openai/codex@latest"
fi

if [ "$INSTALL_BROWSER" = "1" ]; then
  echo "✅ Installing Chromium for Playwright"
  npx -y playwright@latest install chromium || echo "☐ Playwright browser install did not complete"
fi

echo ""
echo "✅ kAIxU UI/UX Pro Max v4 installed into: $ROOT"
echo ""
echo "Next commands:"
echo "node scripts/kaixu-uiux-smoke.mjs"
echo "node scripts/kaixu-no-theater-scan.mjs"
echo "node scripts/verify-codex-mcp.mjs"
echo "codex"
echo "Inside Codex: /mcp"

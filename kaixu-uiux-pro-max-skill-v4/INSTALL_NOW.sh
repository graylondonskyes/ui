#!/usr/bin/env bash
set -euo pipefail
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
bash "$DIR/scripts/install-kaixu-uiux-pro-max-v4.sh" --project-mcp "$@"

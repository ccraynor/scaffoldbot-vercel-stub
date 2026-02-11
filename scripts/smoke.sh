#!/usr/bin/env bash
set -euo pipefail
: "${BASE:?BASE env var required}"
curl -fsSL "$BASE" >/dev/null
echo "Smoke OK"

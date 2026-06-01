#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PORT="${1:-${PORT:-8000}}"

if command -v python3 >/dev/null 2>&1; then
  PYTHON_BIN="python3"
elif command -v python >/dev/null 2>&1; then
  PYTHON_BIN="python"
else
  echo "Error: python3 (or python) is required to run the development server." >&2
  exit 1
fi

echo "Serving ${SCRIPT_DIR} at http://localhost:${PORT}"
cd "${SCRIPT_DIR}"
"${PYTHON_BIN}" -m http.server "${PORT}"

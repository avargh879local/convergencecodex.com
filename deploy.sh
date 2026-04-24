#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_DIR"

echo "Convergence Codex deployment check"
echo "Project: $PROJECT_DIR"
echo

if [[ ! -f public/index.html ]]; then
  echo "ERROR: public/index.html is missing."
  exit 1
fi

if [[ -f env.txt || -f .env ]]; then
  echo "OK: local secret files are present but ignored by git."
fi

if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo
  git status -sb
else
  echo
  echo "Git is not initialized yet. Run: git init -b main"
fi

echo
echo "Cloudflare Pages settings:"
echo "  Production branch: main"
echo "  Build command: exit 0"
echo "  Build output directory: public"
echo "  Root directory: /"
echo
echo "The repo should be private. Cloudflare publishes only public/."

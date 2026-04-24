#!/usr/bin/env bash
set -euo pipefail

mkdir -p public
cat src/index.part.* > public/index.html

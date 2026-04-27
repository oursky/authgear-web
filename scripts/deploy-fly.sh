#!/usr/bin/env bash
# Deploy to Fly.io, forwarding any PUBLIC_* vars from .env as --build-arg.
# PUBLIC_* vars are inlined into the client bundle by Vite at build time, so
# they have to be passed at `flyctl deploy` time — Fly secrets alone won't do.
set -euo pipefail

cd "$(dirname "$0")/.."

build_args=()
if [[ -f .env ]]; then
  while IFS='=' read -r key value; do
    [[ "$key" =~ ^PUBLIC_ ]] || continue
    value="${value%\"}"
    value="${value#\"}"
    build_args+=(--build-arg "$key=$value")
  done < <(grep -E '^PUBLIC_[A-Z0-9_]+=' .env || true)
fi

exec flyctl deploy --remote-only "${build_args[@]}" "$@"

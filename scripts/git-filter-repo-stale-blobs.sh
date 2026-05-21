#!/usr/bin/env bash
# Purge stale large paths from git history (cms/, webflow.js).
#
# WARNING: Rewrites history. Coordinate with the team before running on `live`.
# Everyone must re-clone or hard-reset after the force-push.
#
# Prerequisites:
#   pip install git-filter-repo   # or: brew install git-filter-repo
#
# Usage (from repo root, with a clean working tree):
#   ./scripts/git-filter-repo-stale-blobs.sh
#   git push --force-with-lease origin live

set -euo pipefail

GIT_FILTER_REPO=""
for candidate in git-filter-repo "${HOME}/Library/Python/3.9/bin/git-filter-repo" "${HOME}/Library/Python/3.12/bin/git-filter-repo"; do
  if command -v "$candidate" &>/dev/null; then
    GIT_FILTER_REPO="$candidate"
    break
  fi
done
if [[ -z "$GIT_FILTER_REPO" ]]; then
  echo "git-filter-repo not found. Install: pip3 install git-filter-repo"
  exit 1
fi

if [[ -n "$(git status --porcelain)" ]]; then
  echo "Working tree must be clean before rewriting history."
  exit 1
fi

echo "Removing paths from all history: cms/, public/js/webflow.js"
"$GIT_FILTER_REPO" \
  --path cms --invert-paths \
  --path public/js/webflow.js --invert-paths \
  --force

git reflog expire --expire=now --all
git gc --prune=now --aggressive

echo "Done. Verify with: git count-objects -vH"
echo "Then force-push: git push --force-with-lease origin <branch>"

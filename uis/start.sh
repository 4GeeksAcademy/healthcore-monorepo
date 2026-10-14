#!/bin/sh
# HealthCore UIs entrypoint — runs website (3000) + backoffice (3001)
set -e
echo "[start.sh] Starting HealthCore UIs (website:3000, backoffice:3001)"
npm run dev --workspace=@healthcore/website &
npm run dev --workspace=@healthcore/backoffice &
wait

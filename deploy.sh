#!/usr/bin/env bash
# Deploy Solace (grief app) to Surge.
# Set SURGE_DOMAIN to use a different domain, e.g. SURGE_DOMAIN=my-solace.surge.sh ./deploy.sh
SURGE_DOMAIN="${SURGE_DOMAIN:-solace-app.surge.sh}"
set -e
cd "$(dirname "$0")"
echo "Building Solace..."
npm run build
if [ -f dist/index.html ]; then
  cp dist/index.html dist/200.html
  echo "SPA fallback 200.html created."
fi
echo "Deploying to $SURGE_DOMAIN..."
surge dist "$SURGE_DOMAIN"
echo "Done. Site live at https://$SURGE_DOMAIN"

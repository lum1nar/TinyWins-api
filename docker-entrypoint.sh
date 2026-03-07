#!/bin/bash
set -e

# Update: Create a container for migration
#
# echo "Prisma: running prisma migrate deploy..."
# npx prisma migrate deploy

# Update : avoid runtime generation, generate it during build
#
# echo "Prisma: running prisma generate"
# npx prisma generate

echo "ENV: $NODE_ENV"

echo "Starting server..."
if [[ "$NODE_ENV" == "production" ]]; then
    npm run start
else
    npm run dev
fi

#!/bin/bash
set -e

# Update: Create a container for migration
#
# echo "Prisma: running prisma migrate deploy..."
# npx prisma migrate deploy

# Update : avoid runtime generation, generate it during build
# Update2: During development, it's still better to generate in runtime because mounting WORKDIR to container will
#          overwrite node_module and all the file generated in build time will be removed.
#
#
echo "ENV: $NODE_ENV"

if [[ "$NODE_ENV" == "development" ]]; then
    echo "RUNTIME: Prisma: running prisma generate"
    npx prisma generate
fi

echo "Starting server..."
if [[ "$NODE_ENV" == "development" ]]; then
    npm run dev
else
    npm run start
fi

#!/bin/sh
set -e

if [ "$NODE_ENV" = "production" ]; then
    echo "Production mode: running prisma migrate deploy..."
    npx prisma migrate deploy
else
    echo "Development mode: running prisma migrate dev..."
    npx prisma migrate dev
fi

echo "Starting server..."
npm start

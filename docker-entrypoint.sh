#!/bin/sh
set -e

echo "Prisma: running prisma migrate deploy..."
npx prisma migrate deploy

echo "Starting server..."
npm start

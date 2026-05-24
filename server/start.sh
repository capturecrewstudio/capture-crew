#!/bin/sh
npx prisma migrate deploy --schema ../prisma/schema.prisma || echo "Migration failed, continuing..."
node dist/index.js

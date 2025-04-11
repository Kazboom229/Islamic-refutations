#!/bin/bash

# Drop all existing tables to start fresh
echo "Dropping existing tables..."

# Connect to PostgreSQL and drop all tables in the public schema
psql $DATABASE_URL -c "
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO public;
"

# Now run the DB push without needing interactive prompts
echo "Pushing new schema..."
npx drizzle-kit push:pg --config=drizzle.config.ts
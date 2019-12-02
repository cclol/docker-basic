#!/bin/bash
set -e

sleep 2

#npx knex migrate:latest
npx db-migrate up


exec "$@"

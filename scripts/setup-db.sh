#!/bin/sh

# exit if any command fails
set -e

export MIX_ENV=prod-setup

# create volume for database
docker volume create --name=pgdata
docker-compose up -d db

# build
cd ../server 2> /dev/null || cd server
mix local.hex --force && mix deps.get && mix local.rebar --force
mix release

../scripts/migrate.sh

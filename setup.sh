#!/bin/sh

# exit if any command fails
set -e

export MIX_ENV=prod-setup

# create volume for database
docker volume create --name=pgdata
docker-compose up -d db

# build
cd server
mix local.hex --force && mix deps.get && mix local.rebar --force
mix release

# create db and run migrations
mix ecto.create
mix ecto.migrate

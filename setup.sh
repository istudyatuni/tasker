#!/bin/sh

# create volume for database
docker volume create --name=pgdata

# build
cd server
mix local.hex --force && mix deps.get && mix local.rebar --force
MIX_ENV=prod-setup
mix release

# create db and run migrations
mix ecto.create
mix ecto.migrate

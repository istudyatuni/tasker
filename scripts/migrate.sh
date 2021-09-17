#!/bin/sh

# create db and run migrations
mix ecto.create
mix ecto.migrate

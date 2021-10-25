#!/bin/sh
# deps: elixir (mix)

# create db and run migrations
mix ecto.create
mix ecto.migrate

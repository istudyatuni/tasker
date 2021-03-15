#!/bin/bash
mix ecto.drop
mix ecto.create
mix ecto.migrate

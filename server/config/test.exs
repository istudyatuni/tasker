use Mix.Config

config :tasker,
  port: 4001,
  web_app_folder: "../web/build"

config :logger, :console, level: :info

config :tasker, Tasker.Repo, hostname: "localhost"

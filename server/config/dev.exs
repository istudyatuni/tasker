use Mix.Config

config :tasker,
  port: 4000,
  web_app_folder: "../web/build"

config :tasker, Tasker.Repo, hostname: "localhost"

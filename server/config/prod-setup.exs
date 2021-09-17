use Mix.Config

config :tasker, Tasker.Repo,
  database: "tasker_repo",
  hostname: "localhost"

config :tasker,
  port: 4002,
  web_app_folder: ""

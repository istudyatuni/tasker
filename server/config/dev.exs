use Mix.Config

config :tasker, Tasker.Repo,
  database: "tasker_repo_dev",
  username: "postgres",
  password: "postgres",
  port: 5432

config :tasker,
  port: 4000,
  web_app_folder: "../web/build"

config :tasker, Tasker.Repo, hostname: "localhost"

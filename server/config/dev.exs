use Mix.Config

config :tasker, Tasker.Repo,
  database: "tasker_repo_dev",
  hostname: "localhost"

config :tasker,
  port: 4000,
  web_app_folder: "../web/public",
  openapi_folder: "../docs/openapi"

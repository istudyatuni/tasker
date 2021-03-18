use Mix.Config

config :tasker,
  port: 80,
  web_app_folder: "/web/dist"

config :logger, :console,
  format: ">>  UTC $time [$level] $levelpad$message\n",
  level: :error

config :tasker, Tasker.Repo,
  hostname: "db"

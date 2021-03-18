use Mix.Config

config :tasker,
  port: 80

config :logger, :console,
  format: ">>  UTC $time [$level] $levelpad$message\n",
  level: :error

config :tasker, Tasker.Repo,
  hostname: "db"

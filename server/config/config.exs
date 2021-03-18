import Config

config :tasker, Tasker.Repo,
  database: "tasker_repo",
  username: "postgres",
  password: "postgres",
  port: 5432

config :tasker, ecto_repos: [Tasker.Repo]

config :logger,
  backends: [:console],
  utc_log: true

# compile_time_purge_matching: [
#   [application: :sea_battle_server, level_lower_than: :debug]
# ],

config :logger, :console,
  format: "\n>>  UTC $time [$level] $levelpad$message\n$metadata\n",
  metadata: :all,
  level: :debug

import_config "#{Mix.env()}.exs"

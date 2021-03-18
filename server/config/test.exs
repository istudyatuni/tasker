use Mix.Config

config :tasker,
  port: 4001

config :logger, :console, level: :info

config :tasker, Tasker.Repo,
  hostname: "localhost"

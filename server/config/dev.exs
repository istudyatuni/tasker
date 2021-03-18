use Mix.Config

config :tasker,
  port: 4000

config :tasker, Tasker.Repo,
  hostname: "localhost"

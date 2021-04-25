defmodule Tasker.MixProject do
  use Mix.Project

  def project do
    [
      app: :tasker,
      version: "0.2.0",
      elixir: "~> 1.11",
      start_permanent: Mix.env() == :prod,
      deps: deps()
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      extra_applications: [:logger, :plug_cowboy, :plug, :jason],
      mod: {Tasker.Application, []}
    ]
  end

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      {:jason, "~> 1.2"},
      {:plug, "~> 1.5"},
      {:plug_cowboy, "~> 2.0"},
      {:ecto_sql, "~> 3.5.4"},
      {:postgrex, "~> 0.15"}
    ]
  end
end

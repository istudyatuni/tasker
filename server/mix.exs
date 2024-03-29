defmodule Tasker.MixProject do
  use Mix.Project

  def project do
    [
      app: :tasker,
      version: "0.3.2",
      elixir: "~> 1.11",
      start_permanent: Mix.env() == :prod,
      deps: deps(),

      # docs
      name: "Tasker server",
      source_url: "https://github.com/istudyatuni/tasker",
      docs: [
        formatters: ["html"],
        source_url_pattern:
          "https://github.com/istudyatuni/tasker/blob/release/server/%{path}#L%{line}"
      ]
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
      {:plug_cowboy, "~> 2.0"},
      {:ecto_sql, "~> 3.0"},
      {:postgrex, "~> 0.15"},
      {:ex_doc, "~> 0.24", only: :dev, runtime: false}
    ]
  end
end

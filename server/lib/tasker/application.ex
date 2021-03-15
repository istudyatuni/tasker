defmodule Tasker.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application
  require Logger

  @impl true
  def start(_type, _args) do
    import Supervisor.Spec, warn: false
    port = Application.get_env(:tasker, :port)
    Logger.debug("Set port #{port}")

    children = [
      # Starts a worker by calling: Tasker.Worker.start_link(arg)
      # {Tasker.Worker, arg}
      Plug.Cowboy.child_spec(
        scheme: :http,
        plug: Tasker.Router,
        options: [
          dispatch: dispatch(),
          port: port
        ]
      ),
      Registry.child_spec(
        keys: :duplicate,
        name: Registry.Tasker
      ),
      Tasker.Repo
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Tasker.Supervisor]
    Supervisor.start_link(children, opts)
  end

  defp dispatch do
    [
      {:_,
       [
         {"/api/[...]", Plug.Cowboy.Handler, {Tasker.Router, []}},
         # {:_, Plug.Cowboy.Handler, {Tasker.Router, []}}
       ]}
    ]
  end
end

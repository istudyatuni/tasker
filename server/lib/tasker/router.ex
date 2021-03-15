defmodule Tasker.Router do
  import Plug.Conn
  use Plug.Router
  use Plug.Debugger

  alias Tasker.Task

  require Logger
  plug(Plug.Logger, log: :debug)

  plug(:match)
  plug(:dispatch)

  post "/api/task" do
    {:ok, body, conn} = read_body(conn)
    body = Poison.decode!(body)
    {result, _} = Task.insert_changeset(body)
    send_resp(conn, 200, Poison.encode!(result))
  end

  get "/api/task" do
    # {:ok, body, conn} = read_body(conn)
    # body = Poison.decode!(body)
    # {result, _} = Task.insert_changeset(body)
    result = "Not implemented"
    send_resp(conn, 200, Poison.encode!(result))
  end

  match _ do
    send_resp(conn, 404, "not found")
  end
end

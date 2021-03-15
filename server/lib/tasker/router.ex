defmodule Tasker.Router do
  import Plug.Conn
  use Plug.Router
  use Plug.Debugger

  require Logger
  plug(Plug.Logger, log: :debug)

  plug(:match)
  plug(:dispatch)

  get "/api/:name" do
    send_resp(conn, 200, name)
  end

  match _ do
    send_resp(conn, 404, "not found")
  end
end

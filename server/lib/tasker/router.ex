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
    {result, result_data} = Task.insert_changeset(body)
    IO.inspect(result_data)
    if result == :error do
      send_resp(conn, 400, Poison.encode!(%{"status" => false, "message" => "Name cant't be blank"}))
    else
      send_resp(conn, 200, Poison.encode!(%{"status" => true, "message" => "Ok"}))
    end
  end

  get "/api/tasks" do
    {_, data} = Task.select_all_tasks()
    conn
    |> put_resp_header("content-type", "application/json; charset=utf-8")
	  |> send_resp(200, Poison.encode!(data))
  end

  match _ do
    send_resp(conn, 404, "not found")
  end
end

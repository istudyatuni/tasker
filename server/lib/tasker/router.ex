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
    {result, _result_data} = Task.insert_changeset(body)

    if result == :error do
      send_resp(
        conn,
        400,
        Poison.encode!(%{"status" => false, "message" => "Name cant't be blank"})
      )
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

  get "/api/export" do
    {_, data} = Task.select_all_tasks()

    export_path = "/tmp/export_tasks.json"
    File.touch!(export_path)
    File.write!(export_path, Poison.encode!(data))

    conn
    |> put_resp_header("content-type", "application/json; charset=utf-8")
    |> send_file(200, export_path)
  end

  post "/api/import" do
    {:ok, body, conn} = read_body(conn)
    body = Poison.decode!(body)
    {result, result_data} = Task.insert_many_tasks(body)

    if result == :error do
      send_resp(
        conn,
        400,
        Poison.encode!(%{"status" => false, "message" => to_string(result_data)})
      )
    else
      send_resp(conn, 200, Poison.encode!(%{"status" => true, "message" => "Ok"}))
    end
  end

  post "/api/finished" do
    send_resp(conn, 501, "not implemented")
  end

  match _ do
    send_resp(conn, 404, "not found")
  end
end

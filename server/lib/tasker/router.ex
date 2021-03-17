defmodule Tasker.Router do
  import Plug.Conn
  use Plug.Router
  use Plug.Debugger

  alias Tasker.Task

  require Logger
  plug(Plug.Logger, log: :debug)

  plug(:match)
  plug(:dispatch)

  defp send_repo_action_result(conn, result) do
    {result, result_data} = result

    if result == :error do
      key = result_data.errors |> Enum.at(0)
      {key, {info, _}} = key

      send_resp(
        conn,
        400,
        Poison.encode!(%{"status" => false, "message" => "#{key} #{info}"})
      )
    else
      send_resp(conn, 200, Poison.encode!(%{"status" => true, "message" => "Ok"}))
    end
  end

  post "/api/task" do
    {:ok, body, conn} = read_body(conn)
    body = Poison.decode!(body)
    result = Task.insert_changeset(body)
    send_repo_action_result(conn, result)
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
    result = Task.insert_many_tasks(body)
    send_repo_action_result(conn, result)
  end

  patch "/api/finish" do
    {:ok, body, conn} = read_body(conn)
    body = Poison.decode!(body)
    result = Task.update_finished(body)
    send_repo_action_result(conn, result)
  end

  patch "/api/update" do
    {:ok, body, conn} = read_body(conn)
    body = Poison.decode!(body)
    result = Task.update_task_data(body)
    send_repo_action_result(conn, result)
  end

  match _ do
    send_resp(conn, 404, "not found")
  end
end

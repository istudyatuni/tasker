defmodule Tasker.Routers.Tasks do
  @moduledoc false

  import Plug.Conn
  use Plug.Router
  use Plug.Debugger

  alias Tasker.Db.Task

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
        Jason.encode!(%{"status" => false, "message" => "#{key} #{info}"})
      )
    else
      # no task id in result_data
      if result == :ok and result_data == "Ok" do
        send_resp(
          conn,
          200,
          Jason.encode!(%{"status" => true, "message" => "Ok"})
        )
      else
        send_resp(
          conn,
          200,
          Jason.encode!(%{"status" => true, "message" => "Ok", "task_id" => result_data.task_id})
        )
      end
    end
  end

  post "/api/task" do
    {:ok, body, conn} = read_body(conn)
    body = Jason.decode!(body)
    result = Task.insert_task(body)
    send_repo_action_result(conn, result)
  end

  get "/api/tasks" do
    {_, data} = Task.select_all_tasks()

    conn
    |> put_resp_header("content-type", "application/json; charset=utf-8")
    |> send_resp(200, Jason.encode!(data))
  end

  # get task by id
  get "/api/task" do
    %{"task_id" => task_id} = fetch_query_params(conn).params

    task = Task.select_task_by_id(task_id)

    send_resp(conn, 200, Jason.encode!(task))
  end

  get "/api/download" do
    {_, data} = Task.select_all_tasks()

    export_path = "/tmp/export_tasks.json"
    File.touch!(export_path)

    data =
      Jason.encode!(data)
      |> Jason.Formatter.pretty_print()

    File.write!(export_path, data)

    conn
    |> put_resp_header("content-type", "application/json; charset=utf-8")
    |> send_file(200, export_path)
  end

  post "/api/upload" do
    {:ok, body, conn} = read_body(conn)
    body = Jason.decode!(body)
    result = Task.insert_many_tasks(body)
    send_repo_action_result(conn, result)
  end

  patch "/api/finish" do
    {:ok, body, conn} = read_body(conn)
    body = Jason.decode!(body)
    result = Task.update_finished(body)
    send_repo_action_result(conn, result)
  end

  patch "/api/update" do
    {:ok, body, conn} = read_body(conn)
    body = Jason.decode!(body)
    result = Task.update_task_data(body)
    send_repo_action_result(conn, result)
  end

  match _ do
    send_resp(conn, 404, "not found")
  end
end

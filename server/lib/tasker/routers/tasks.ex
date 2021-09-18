defmodule Tasker.Routers.Tasks do
  @moduledoc false

  import Plug.Conn
  use Plug.Router
  use Plug.Debugger

  alias Tasker.Db.Task, as: Tasks

  require Logger
  plug(Plug.Logger, log: :debug)

  plug(:match)
  plug(:dispatch)

  defp put_json_header(conn) do
    conn |> put_resp_header("content-type", "application/json; charset=utf-8")
  end

  defp send_repo_action_result(conn, result) do
    {result, result_data} = result

    if result == :error do
      key = result_data.errors |> Enum.at(0)
      {key, {info, _}} = key

      conn
      |> put_json_header()
      |> send_resp(
        400,
        Jason.encode!(%{
          "status" => false,
          "message" => "#{key} #{info}"
        })
      )
    else
      # no task id in result_data
      if result == :ok and result_data == "Ok" do
        conn
        |> put_json_header()
        |> send_resp(
          200,
          Jason.encode!(%{
            "status" => true,
            "message" => "Ok"
          })
        )
      else
        conn
        |> put_json_header()
        |> send_resp(
          200,
          Jason.encode!(%{
            "status" => true,
            "message" => "Ok",
            "task_id" => result_data.task_id
          })
        )
      end
    end
  end

  post "/api/task" do
    {:ok, body, conn} = read_body(conn)
    body = Jason.decode!(body)
    result = Tasks.insert_task(body)
    send_repo_action_result(conn, result)
  end

  get "/api/tasks" do
    {_, data} = Tasks.select_all()

    conn
    |> put_json_header()
    |> send_resp(200, Jason.encode!(data))
  end

  # get task by id
  get "/api/task" do
    %{"task_id" => task_id} = fetch_query_params(conn).params

    task = Tasks.select_by_id(task_id)

    conn
    |> put_json_header()
    |> send_resp(200, Jason.encode!(task))
  end

  get "/api/download" do
    {_, data} = Tasks.select_all()

    data =
      Jason.encode!(data)
      |> Jason.Formatter.pretty_print()

    conn
    |> put_json_header()
    |> send_resp(200, data)
  end

  post "/api/upload" do
    {:ok, body, conn} = read_body(conn)
    body = Jason.decode!(body)
    result = Tasks.insert_many_tasks(body)
    send_repo_action_result(conn, result)
  end

  patch "/api/finish" do
    {:ok, body, conn} = read_body(conn)
    body = Jason.decode!(body)
    result = Tasks.update_finished(body)
    send_repo_action_result(conn, result)
  end

  put "/api/update" do
    {:ok, body, conn} = read_body(conn)
    body = Jason.decode!(body)
    result = Tasks.update_task(body)
    send_repo_action_result(conn, result)
  end

  match _ do
    send_resp(conn, 404, "not found")
  end
end

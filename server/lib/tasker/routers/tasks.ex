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
    put_resp_header(conn, "content-type", "application/json; charset=utf-8")
  end

  # Send JSON with `{ "status", "message" }` keys
  # with ability to add other keys
  # Parameters
  #   - `conn` - connection
  #   - `code` - status code
  #   - `status` - value for "status"
  #   - `message` - value for message
  #   - `args` - additional args, syntax: `Keyword`
  defp send_status_message(conn, code, status, message, args \\ []) do
    defaults = [
      {:status, status},
      {:message, message}
    ]
    response = Keyword.merge(defaults, args) |> Enum.into(%{})

    conn
    |> put_json_header()
    |> send_resp(code, Jason.encode!(response))
  end

  defp send_repo_action_result(conn, result) do
    {status, data} = result

    if status == :error do
      error = Enum.at(data.errors, 0)
      {key, {info, _}} = error
      send_status_message(conn, 400, false, "#{key} #{info}")
    else
      # no task_id in result
      if result == {:ok, "Ok"} do
        send_status_message(conn, 200, true, "Ok")
      else
        send_status_message(conn, 200, true, "Ok", [task_id: data.task_id])
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

    if !is_nil(body["task_id"]) do
      result = Tasks.update_task(body)
      send_repo_action_result(conn, result)
    else
      send_status_message(conn, 400, false, "task_id can't be null")
    end
  end

  match _ do
    send_resp(conn, 404, "not found")
  end
end

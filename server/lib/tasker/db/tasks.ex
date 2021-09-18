defmodule Tasker.Db.Task do
  @moduledoc """
  Repository layer for work with tasks
  """

  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Query

  alias Tasker.Repo
  alias Tasker.Db.Utils.Tasks, as: Utils
  require Logger

  @doc """
  Task model

  ## Fields

    - `task_id`: task id,
    - `name`: task name, required,
    - `full_name`
    - `subject`: lecture subject,
    - `description`
    - `finished`: marker whether the task finished or not,
    - `other_text`: big description with markdown support (on client side).
  """
  schema "tasks" do
    field(:task_id, :string)
    field(:name, :string, null: false)
    field(:full_name, :string)
    field(:subject, :string)
    field(:description, :string)
    field(:finished, :boolean, default: false)
    field(:other_text, :string)
  end

  @doc """
  Mark task finished/unfinished

  ## Parameters

    - `params`: `Map` with 2 fields:
      - `task_id`: returned by the `select_all/0`
      - `status`: `true` or `false`

  ## Example

  ```json
  {
    "task_id": "20210917164114147324",
    "status": false
  }
  ```
  """
  def update_finished(params) do
    Repo.get_by!(Tasker.Db.Task, task_id: params["task_id"])
    |> change(finished: params["status"])
    |> validate_inclusion(:finished, [true, false])
    |> Repo.update()
  end

  @doc """
  Update task

  ## Parameters

    - `params` is `__struct__/0`
  """
  def update_task(params) do
    params =
      params
      |> Utils.set_finished()
      |> Utils.fix_texts()

    Repo.get_by!(Tasker.Db.Task, task_id: params["task_id"])
    |> cast(params, [:name, :full_name, :subject, :description, :finished, :other_text])
    |> validate_required([:name])
    |> Repo.update()
  end

  defp taskid_exists?(taskid) do
    Logger.debug("Check task_id exist #{inspect(taskid)}")

    if is_nil(taskid) do
      false
    else
      query = from(t in Tasker.Db.Task, where: t.task_id == ^taskid)
      Repo.exists?(query)
    end
  end

  @doc """
  Insert/create task

  ## Parameters

    - `params` is `__struct__/0`
  """
  def insert_task(params) do
    is_taskid_exist = taskid_exists?(params["task_id"])

    if !is_taskid_exist do
      params =
        params
        |> Utils.set_task_id()
        |> Utils.set_finished()
        |> Utils.fix_texts()

      Logger.info("Insert changeset, task_id not exist, params: #{inspect(params)}")

      %Tasker.Db.Task{}
      |> cast(params, [
        :task_id,
        :name,
        :full_name,
        :subject,
        :description,
        :finished,
        :other_text
      ])
      |> validate_required([:name])
      |> Repo.insert()
    else
      Logger.info("Skip insert changeset, task_id exist, params: #{inspect(params)}")
      {:error, %{errors: [{:task_id, {"already exist", ""}}]}}
    end
  end

  @doc """
  Select task by id

  ## Parameters

    - `id` is `task_id`
  """
  def select_by_id(id) do
    Repo.get_by!(Tasker.Db.Task, task_id: id)
    |> Utils.extract_task()
  end

  @doc """
  Select all tasks (sorted by `task_id`)
  """
  def select_all() do
    query = from(Tasker.Db.Task)

    result =
      Repo.all(query)
      |> Enum.map(fn x -> Utils.extract_task(x) end)
      |> Enum.sort(&(&1["task_id"] > &2["task_id"]))

    {:ok, result}
  end

  @doc """
  Insert tasks from `List`

  ## Parameters

    - `data` is the `__struct__/0` `List`
  """
  def insert_many_tasks(data) do
    Logger.info("Insert many tasks: #{inspect(data)}")

    Enum.reverse(data)
    |> Enum.each(fn x -> insert_task(x) end)

    {:ok, "Ok"}
  end
end

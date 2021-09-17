defmodule Tasker.Db.Task do
  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Query

  alias Tasker.Repo
  alias Tasker.Db.Utils.Tasks, as: Utils
  require Logger

  schema "tasks" do
    field(:task_id, :string)
    field(:name, :string, null: false)
    field(:full_name, :string)
    field(:subject, :string)
    field(:description, :string)
    field(:finished, :boolean, default: false)
    field(:other_text, :string)
  end

  def update_finished(params) do
    Repo.get_by!(Tasker.Db.Task, task_id: params["task_id"])
    |> change(finished: params["status"])
    |> validate_inclusion(:finished, [true, false])
    |> Repo.update()
  end

  def update_task_data(params) do
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

  def insert_changeset(params) do
    is_taskid_exist = taskid_exists?(params["task_id"])

    if !is_taskid_exist do
      params =
        params
        |> Utils.set_task_id(is_taskid_exist)
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

  def select_task_by_id(id) do
    Repo.get_by!(Tasker.Db.Task, task_id: id)
    |> Utils.extract_task()
  end

  def select_all_tasks() do
    query = from(Tasker.Db.Task)

    result =
      Repo.all(query)
      |> Enum.map(fn x -> Utils.extract_task(x) end)
      |> Enum.sort(&(&1["task_id"] > &2["task_id"]))

    {:ok, result}
  end

  def insert_many_tasks(data) do
    Logger.info("Insert many tasks: #{inspect(data)}")

    Enum.reverse(data)
    |> Enum.each(fn x -> insert_changeset(x) end)

    {:ok, "Ok"}
  end
end

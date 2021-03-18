defmodule Tasker.Task do
  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Query

  alias Tasker.Repo
  require Logger

  schema "tasks" do
    field(:task_id, :string)
    field(:name, :string, null: false)
    field(:full_name, :string)
    field(:subject, :string)
    field(:description, :string)
    field(:finished, :boolean, default: false)
    field(:other_text, {:array, :string})
  end

  def update_finished(params) do
    Repo.get_by!(Tasker.Task, task_id: params["task_id"])
    |> change(finished: params["status"])
    |> validate_inclusion(:finished, [true, false])
    |> Repo.update()
  end

  def update_task_data(params) do
    params =
      params
      |> split_big_text()
      |> set_finished()

    Repo.get_by!(Tasker.Task, task_id: params["task_id"])
    |> cast(params, [:name, :full_name, :subject, :description, :finished, :other_text])
    |> validate_required([:name])
    |> Repo.update()
  end

  defp split_big_text(params) do
    other_text = params["other_text"]
    other_text = Regex.replace(~r/\r/, other_text, "")

    # in postgres max string field size is 255, so split it in array
    array = Regex.scan(~r/[\w\W\n]{1,255}/u, other_text)
    array = Enum.map(array, fn x -> Enum.at(x, 0) end)

    %{params | "other_text" => array}
  end

  defp set_task_id(params, exist_already) do
    if !exist_already do
      timeid =
        DateTime.now!("Etc/UTC")
        |> DateTime.to_string()

      # 'yyyy-mm-dd hh:mm:ss.ssssssZ' -> 'yyyymmddhhmmssssssss'
      timeid = Regex.replace(~r/[:\. \-Z]/, timeid, "")

      Map.put(params, "task_id", timeid)
    else
      params
    end
  end

  defp set_finished(params) do
    if is_nil(params["finished"]) do
      Map.put(params, "finished", false)
    else
      params
    end
  end

  defp taskid_exists?(taskid) do
    Logger.info("Check task_id exist #{inspect(taskid)}")
    query = from(t in Tasker.Task, where: t.task_id == ^taskid)
    Repo.exists?(query)
  end

  def insert_changeset(params) do
    is_taskid_exist = taskid_exists?(params["task_id"])
    Logger.info("Insert changeset, task_id exist: #{is_taskid_exist}")

    params =
      params
      |> split_big_text()
      |> set_task_id(is_taskid_exist)

    Logger.info("Params: #{inspect(params)}")

    %Tasker.Task{}
    |> cast(params, [:task_id, :name, :full_name, :subject, :description, :finished, :other_text])
    |> validate_required([:name])
    |> Repo.insert()
  end

  defp extract_task(task) do
    other_text = Enum.join(task.other_text, "")
    other_text = Regex.replace(~r/\r/, other_text, "")

    %{
      "task_id" => task.task_id,
      "name" => task.name,
      "full_name" => task.full_name,
      "subject" => task.subject,
      "description" => task.description,
      "finished" => task.finished,
      "other_text" => other_text
    }
  end

  def select_all_tasks() do
    query = from(Tasker.Task)

    result =
      Repo.all(query)
      |> Enum.map(fn x -> extract_task(x) end)
      |> Enum.sort(&(&1["task_id"] > &2["task_id"]))

    {:ok, result}
  end

  def insert_many_tasks(data) do
    Logger.info("Insert many tasks: #{inspect(data)}")
    result = Enum.map(data, fn x -> insert_changeset(x) end)
    {:ok, result}
  end
end

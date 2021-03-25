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
    field(:other_text, :string)
  end

  def update_finished(params) do
    Repo.get_by!(Tasker.Task, task_id: params["task_id"])
    |> change(finished: params["status"])
    |> validate_inclusion(:finished, [true, false])
    |> Repo.update()
  end

  defp fix_string(str) do
    if is_nil(str), do: str, else: Regex.replace(~r/\r/, str, "")
  end

  defp fix_texts(params) do
    %{
      "task_id" => params["task_id"],
      "name" => fix_string(params["name"]),
      "full_name" => fix_string(params["full_name"]),
      "subject" => fix_string(params["subject"]),
      "description" => fix_string(params["description"]),
      "finished" => params["finished"],
      "other_text" => fix_string(params["other_text"])
    }
  end

  def update_task_data(params) do
    params =
      params
      |> set_finished()
      |> fix_texts()

    Repo.get_by!(Tasker.Task, task_id: params["task_id"])
    |> cast(params, [:name, :full_name, :subject, :description, :finished, :other_text])
    |> validate_required([:name])
    |> Repo.update()
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
    Logger.debug("Check task_id exist #{inspect(taskid)}")

    if is_nil(taskid) do
      false
    else
      query = from(t in Tasker.Task, where: t.task_id == ^taskid)
      Repo.exists?(query)
    end
  end

  def insert_changeset(params) do
    is_taskid_exist = taskid_exists?(params["task_id"])

    if !is_taskid_exist do
      params =
        params
        |> set_task_id(is_taskid_exist)
        |> fix_texts()

      Logger.info("Insert changeset, task_id not exist, params: #{inspect(params)}")

      %Tasker.Task{}
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

  defp set_if_nil(text, new_value \\ "") do
    if !is_nil(text), do: text, else: new_value
  end

  defp extract_task(task) do
    %{
      "task_id" => task.task_id,
      "name" => task.name,
      "full_name" => set_if_nil(task.full_name),
      "subject" => set_if_nil(task.subject),
      "description" => set_if_nil(task.description),
      "finished" => task.finished,
      "other_text" => set_if_nil(task.other_text)
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

    Enum.reverse(data)
    |> Enum.each(fn x -> insert_changeset(x) end)

    {:ok, "Ok"}
  end
end

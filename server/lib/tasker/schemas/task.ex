defmodule Tasker.Task do
  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Query

  alias Tasker.Repo

  schema "tasks" do
    field(:name, :string, null: false)
    field(:full_name, :string)
    field(:subject, :string)
    field(:description, :string)
    field(:finished, :boolean, default: false)
    field(:other_text, :string)
  end

  defp set_finished(changeset) do
    finished = get_field(changeset, :finished)

    if is_nil(finished) do
      put_change(changeset, :finished, false)
    else
      changeset
    end
  end

  def insert_changeset(params) do
    %Tasker.Task{}
    |> cast(params, [:name, :full_name, :subject, :description, :finished, :other_text])
    |> validate_required([:name])
    |> set_finished()
    |> Repo.insert()
  end

  defp extract_task(task) do
    %{
      "name" => task.name,
      "full_name" => task.full_name,
      "subject" => task.subject,
      "description" => task.description,
      "finished" => task.finished,
      "other_text" => task.other_text
    }
  end

  def select_all_tasks() do
    query = from(Tasker.Task)
    tasks = Repo.all(query)
    result = Enum.map(tasks, fn x -> extract_task(x) end)
    {:ok, result}
  end

  def insert_many_tasks(data) do
    result = Enum.map(data, fn x -> insert_changeset(x) end)
    {:ok, result}
  end
end

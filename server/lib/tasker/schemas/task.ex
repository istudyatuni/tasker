defmodule Tasker.Task do
  use Ecto.Schema
  import Ecto.Changeset

  alias Tasker.Repo

  schema "tasks" do
    field(:name, :string, null: false)
    field(:full_name, :string)
    field(:subject, :string)
    field(:description, :string)
    field(:finished, :boolean, default: false)
    field(:list, {:array, :string})
  end

  def set_finished(changeset) do
  	finished = get_field(changeset, :finished)

  	if is_nil(finished) do
  		put_change(changeset, :finished, false)
  	else
  		changeset
  	end
  end

  def insert_changeset(params) do
    %Tasker.Task{}
    |> cast(params, [:name, :full_name, :subject, :description, :finished, :list])
    |> validate_required([:name])
    |> set_finished()
    |> Repo.insert()
  end
end

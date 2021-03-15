defmodule Tasker.Repo.Migrations.CreateTasks do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add(:name, :string, null: false)
      add(:full_name, :string)
      add(:subject, :string)
      add(:description, :string)
      add(:finished, :boolean, default: false)
      add(:list, {:array, :string})
    end
  end
end

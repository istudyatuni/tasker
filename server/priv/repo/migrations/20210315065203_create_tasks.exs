defmodule Tasker.Repo.Migrations.CreateTasks do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add(:task_id, :string)
      add(:name, :text, null: false)
      add(:full_name, :text)
      add(:subject, :text)
      add(:description, :text)
      add(:finished, :boolean, default: false)
      add(:other_text, :text)
    end
  end
end

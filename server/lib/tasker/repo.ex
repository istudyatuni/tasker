defmodule Tasker.Repo do
  @moduledoc false

  use Ecto.Repo,
    otp_app: :tasker,
    adapter: Ecto.Adapters.Postgres
end

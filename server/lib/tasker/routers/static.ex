defmodule Tasker.Routers.Static do
  @moduledoc false

  use Plug.Router

  @web_folder Path.expand(Application.get_env(:tasker, :web_app_folder))

  plug(Plug.Static, at: "/", from: @web_folder)
  plug(:match)
  plug(:dispatch)

  get "/" do
    send_file(conn, 200, "#{@web_folder}/index.html")
  end

  match _ do
    send_resp(conn, 404, "Not found")
  end
end

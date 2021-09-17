defmodule Tasker.Routers.Static do
  @moduledoc false

  use Plug.Router

  @static_folder Path.expand(Application.get_env(:tasker, :web_app_folder))

  plug(Plug.Static, at: "/", from: @static_folder)
  plug(:match)
  plug(:dispatch)

  get "/" do
    send_file(conn, 200, "#{@static_folder}/index.html")
  end

  match _ do
    send_resp(conn, 404, "Not found")
  end
end

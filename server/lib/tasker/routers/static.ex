defmodule Tasker.Routers.Static do
  @moduledoc false

  use Plug.Router

  @web_folder Path.expand(Application.get_env(:tasker, :web_app_folder))
  @openapi_folder Path.expand(Application.get_env(:tasker, :openapi_folder))

  plug(Plug.Static, at: "/", from: @web_folder)
  plug(Plug.Static, at: "/", from: @openapi_folder)
  plug(:match)
  plug(:dispatch)

  get "/" do
    if Mix.env() == :dev and conn.query_string == "openapi" do
      send_file(conn, 200, "#{@openapi_folder}/index.html")
    else
      send_file(conn, 200, "#{@web_folder}/index.html")
    end
  end

  match _ do
    if Mix.env() == :dev and conn.path_info |> hd == "openapi.yaml" do
      # send openapi docs
      send_file(conn, 200, "#{@openapi_folder}/../openapi.yaml")
    else
      send_resp(conn, 404, "Not found")
    end
  end
end

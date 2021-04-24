defmodule Tasker.Routers.Web do
  import Plug.Conn
  use Plug.Router
  use Plug.Debugger

  plug(:match)
  plug(:dispatch)

  def send_static_file(conn, folder, filename, mime_type) do
    web_app_folder = Application.get_env(:tasker, :web_app_folder)
    folder = "#{web_app_folder}#{folder}"

    if File.exists?("#{folder}/#{filename}") do
      conn
      |> put_resp_header("content-type", "#{mime_type}; charset=utf-8")
      |> send_file(200, "#{folder}/#{filename}")
    else
      send_resp(conn, 404, "Not found")
    end
  end

  get "/" do
    send_static_file(conn, "", "index.html", "text/html")
  end

  get "static/js/:name" do
    send_static_file(conn, "/static/js", name, "application/javascript")
  end

  get "static/css/:name" do
    send_static_file(conn, "/static/css", name, "text/css")
  end

  get "static/media/:name" do
    mime_types = %{
      "eot" => "application/octet-stream",
      "png" => "image/png",
      "svg" => "image/svg+xml",
      "ttf" => "application/x-font-ttf",
      "woff" => "application/font-woff",
      "woff2" => "application/font-woff"
    }

    # extract from smth like [["name.png", "png"]]
    ext = Regex.scan(~r/[\da-zA-Z]+\.([a-z]+)/, name) |> hd |> tl |> hd
    send_static_file(conn, "/static/media", name, mime_types[ext])
  end

  def route_root_folder(conn, name) do
    mime_types = %{
      "ico" => "image/vnd.microsoft.icon",
      "json" => "application/json",
      "txt" => "text/plain",
      "js" => "application/javascript"
    }

    ext = Regex.scan(~r/[\da-zA-Z\-\.]+\.([a-z]+)/, name) |> hd |> tl |> hd
    send_static_file(conn, "", name, mime_types[ext])
  end

  # "Default" route that will get called when no other route is matched
  match _ do
    path = conn.path_info |> hd

    # if this is file
    if String.match?(path, ~r/[\S]+\.[a-zA-Z]/) do
      route_root_folder(conn, path)
    else
      send_resp(conn, 404, "Not found")
    end
  end
end

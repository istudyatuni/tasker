defmodule Tasker.Db.Utils.Tasks do
  defp fix_string(str) do
    if is_nil(str) do
      ""
    else
      # \r\n -> \n
      # no break space - now not replace, but stay here - ' '
      Regex.replace(~r/[\r]/, str, "")
    end
  end

  def fix_texts(params) do
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

  def set_task_id(params, exist_already) do
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

  def set_finished(params) do
    if is_nil(params["finished"]) do
      Map.put(params, "finished", false)
    else
      params
    end
  end

  defp set_if_nil(text, new_value \\ "") do
    if !is_nil(text), do: text, else: new_value
  end

  def extract_task(task) do
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
end

import { ITask } from 'interfaces/ITask'
import IResponse from 'interfaces/IResponse'

export const SendTask = async (task: ITask):Promise<IResponse> => {
	const response = await fetch('/api/task', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: task.name,
      full_name: task.info.full_name,
      subject: task.info.subject,
      description: task.description,
      finished: task.finished,
      list: task.info.list_items
    })
	})
  let resp = await response.json() as IResponse
	if(response.ok) {
		return resp
	} else {
		return resp
	}
}

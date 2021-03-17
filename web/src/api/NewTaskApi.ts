import { ITask } from 'interfaces/ITask'
import IResponse from 'interfaces/IResponse'

export const SendNewTask = async (task: ITask):Promise<IResponse> => {
	const response = await fetch('/api/task', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: task.name,
      full_name: task.info.full_name,
      subject: task.info.subject,
      description: task.description,
      finished: task.finished,
      other_text: task.info.other_text
    })
	})
  return await response.json() as IResponse
}

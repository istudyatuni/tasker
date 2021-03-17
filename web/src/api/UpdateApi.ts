import { ITask } from 'interfaces/ITask'
import IResponse from 'interfaces/IResponse'

export const UpdateTask = async(data: ITask):Promise<IResponse> => {
	let response = await fetch('/api/update', {
		method: 'PATCH',
		body: JSON.stringify({
			task_id: data.task_id,
      name: data.name,
      full_name: data.info.full_name,
      subject: data.info.subject,
      description: data.description,
      finished: data.finished,
      other_text: data.info.other_text
		})
	})
  return await response.json() as IResponse
}

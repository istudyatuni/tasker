import { ITask } from 'interfaces/ITask'

export const SendTask = async (task: ITask):Promise<boolean> => {
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
	if(response.ok) {
		return true
	} else {
		console.error(response)
		return false
	}
}

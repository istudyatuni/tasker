import ITasksList from 'interfaces/ITasksList'
import { ITask } from 'interfaces/ITask'

function TransformTasks(tasks?: ITasksList[]): ITask[] {
	if(tasks===undefined) {
		return [{
			task_id: '0',
			name: 'Not a task',
			description: '',
			finished: false,
			info: {
				full_name: '',
				subject: '',
				other_text: '',
			}
		}
	]
	}
	let new_tasks:ITask[] = tasks.map(e => {
		return {
			task_id: e.task_id,
			name: e.name,
			description: e.description,
			finished: e.finished,
			info: {
				full_name: e.full_name,
				subject: e.subject,
				other_text: e.other_text,
			}
		}
	})
	return new_tasks
}

export const GetTasks = async ():Promise<ITask[]> => {
	const response = await fetch('/api/tasks', {
		method: 'GET'
	})
	if(response.ok) {
		let resp = await response.json() as ITasksList[];
		return TransformTasks(resp)
	}
	return TransformTasks()
}

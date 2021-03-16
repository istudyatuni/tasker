import ITasksList from 'interfaces/ITasksList'
import { ITask } from 'interfaces/ITask'

function TransformTasks(tasks?: ITasksList[]): ITask[] {
	if(tasks===undefined) {
		return [{
			name: 'Not a task',
			description: '',
			finished: false,
			info: {
				full_name: '',
				subject: '',
				list_items: [''],
			}
		}
	]
	}
	let new_tasks:ITask[] = tasks.map(e => {
		return {
			name: e.name,
			description: e.description,
			finished: e.finished,
			info: {
				full_name: e.full_name,
				subject: e.subject,
				list_items: e.list,
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

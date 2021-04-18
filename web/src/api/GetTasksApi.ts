import ITasksList from 'interfaces/ITasksList'
import { ITask } from 'interfaces/ITask'

import { stores } from 'stores/stores'

function TransformTasks(tasks?: ITasksList[]): ITask[] {
	if(tasks===undefined) {
		return []
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
				// in markdown you need double \n for line break
				other_text: e.other_text.replaceAll('\n', '\n\n'),
			}
		}
	})
	return new_tasks
}

export const GetTasks = async () => {
	try	{
		let tasksStore = stores.tasksStore

		const response = await fetch('/api/tasks', {
			method: 'GET'
		})

		if(response.ok) {
			let resp = await response.json() as ITasksList[];
			tasksStore.setAll(TransformTasks(resp))
		}
	} catch (err) {
		console.error(err)
	}
}

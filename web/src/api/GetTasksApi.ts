import ITasksList from 'interfaces/ITasksList'
import { ITask } from 'interfaces/ITask'

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

export const GetTasks = async ():Promise<ITask[]|string> => {
	try	{
		const response = await fetch('/api/tasks', {
			method: 'GET'
		})
		if(response.ok) {
			let resp = await response.json() as ITasksList[];
			return TransformTasks(resp)
		}
		return TransformTasks()
	} catch (err) {
		return 'Server unavailable'
	}
}

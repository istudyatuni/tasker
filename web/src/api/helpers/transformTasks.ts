import ITasksList from 'interfaces/ITasksList'
import { ITask } from 'interfaces/ITask'

////// ITaskList to ITask //////

export const TaskListElement2Task = (task: ITasksList): ITask => {
	return {
		task_id: task.task_id,
		name: task.name,
		description: task.description,
		finished: task.finished,
		info: {
			full_name: task.full_name,
			subject: task.subject,
			// in markdown you need double \n for line break
			other_text: task.other_text.replaceAll('\n', '\n\n'),
		}
	}
}

export const TaskListArray2Task = (tasks?: ITasksList[]): ITask[] => {
	if(tasks===undefined) {
		return []
	}
	let new_tasks:ITask[] = tasks.map(e => TaskListElement2Task(e))
	return new_tasks
}
